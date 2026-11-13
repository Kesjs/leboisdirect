'use client'

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import PageSkeleton from '@/components/PageSkeleton'
import type { Product } from '@/data/products'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/lib/cart-context'
import { useToast } from '@/components/Toast'
import { useI18n } from '@/lib/i18n-context'
import { commerceCopy } from '@/data/commerce-copy'
import { productLabel } from '@/data/product-labels'
import { uiCopy } from '@/data/ui-copy'
import { getProductReviews } from '@/data/product-reviews'
import { getProductVideo, getYouTubeEmbedUrl, getYouTubeThumbnail } from '@/data/product-videos'
import { getProductRichSpec } from '@/data/product-rich-specs'
import { PaymentBadgesRow, SecureShieldIcon, DeliveryTruckIcon } from '@/components/PaymentLogos'

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [product, setProduct] = useState<Product | null>(null)
  const [catalogProducts, setCatalogProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [activeAccordion, setActiveAccordion] = useState<string | null>('specs')
  const [isZoomOpen, setIsZoomOpen] = useState(false)

  const { addItem } = useCart()
  const { showToast } = useToast()
  const router = useRouter()
  const { locale } = useI18n()
  const c = commerceCopy[locale]
  const ui = uiCopy[locale]

  useEffect(() => {
    let active = true
    fetch('/api/catalog')
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error('catalog error'))))
      .then((payload) => {
        if (!active) return
        const list = payload.products || []
        setCatalogProducts(list)
        const current = list.find((item: Product) => item.slug === slug)
        setProduct(current || null)
        setLoading(false)
      })
      .catch(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [slug])

  useEffect(() => {
    if (product?.variants?.length) {
      setSelectedVariant(product.variants[0].id)
    }
  }, [product])

  if (loading && !product) return <PageSkeleton variant="product" label={ui.product.loading} />

  if (!product) {
    notFound()
  }

  const richSpec = getProductRichSpec(product.slug)
  const currentVariant = product.variants?.find((v) => v.id === selectedVariant)
  const currentPrice = currentVariant?.price || product.price

  // Cross-selling : priorité aux slugs complémentaires spécifiés, sinon produits de la même catégorie
  let relatedProducts: Product[] = []
  if (richSpec?.relatedSlugs && richSpec.relatedSlugs.length > 0) {
    relatedProducts = richSpec.relatedSlugs
      .map((s) => catalogProducts.find((p) => p.slug === s))
      .filter((p): p is Product => Boolean(p && p.id !== product.id))
  }
  if (relatedProducts.length === 0) {
    relatedProducts = catalogProducts.filter((p) => p.id !== product.id && p.category === product.category)
  }
  if (relatedProducts.length === 0) {
    relatedProducts = catalogProducts.filter((p) => p.id !== product.id)
  }
  relatedProducts = relatedProducts.slice(0, 4)

  const productVideo = getProductVideo(product.slug)
  const videoThumbnail = productVideo?.posterUrl || product.images[0] || product.image
  const galleryItems = [
    ...product.images.map((src) => ({ type: 'image' as const, src })),
    ...(productVideo ? [{ type: 'video' as const, src: productVideo.youtubeId ? getYouTubeThumbnail(productVideo.youtubeId) : videoThumbnail }] : []),
  ]
  const selectedMedia = galleryItems[selectedMediaIndex] || galleryItems[0]
  const productReviews = getProductReviews(product.slug)
  const localizedProduct = productLabel(product, locale)

  const handleAddToCart = () => {
    addItem(product, quantity, selectedVariant || undefined)
    showToast({
      title: 'Ajouté au panier',
      description: `${localizedProduct.name} a été ajouté à votre panier.`,
    })
    setAdded(true)
    window.setTimeout(() => setAdded(false), 2400)
  }

  const handleBuyNow = () => {
    addItem(product, quantity, selectedVariant || undefined)
    router.push('/checkout')
  }

  const toggleAccordion = (id: string) => {
    setActiveAccordion((curr) => (curr === id ? null : id))
  }

  // Schema.org enrichi
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://braviko.fr'
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: localizedProduct.name,
    description: product.longDescription || localizedProduct.description,
    image: product.images?.length ? product.images : [product.image],
    sku: product.id,
    brand: { '@type': 'Brand', name: 'Braviko' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      price: currentPrice.toFixed(2),
      availability: 'https://schema.org/InStock',
      url: `${baseUrl}/produit/${encodeURIComponent(product.slug)}`,
      seller: { '@type': 'Organization', name: 'Braviko' },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '18',
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${baseUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'Boutique', item: `${baseUrl}/boutique` },
      { '@type': 'ListItem', position: 3, name: localizedProduct.name, item: `${baseUrl}/produit/${product.slug}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }}
      />
      <Header />

      <main id="main-content" className="min-h-screen bg-[#FAF9F6] text-charcoal pb-64">
        {/* Fil d'Ariane */}
        <div className="border-b border-hairline bg-white/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="container-custom py-14">
            <nav className="flex items-center gap-8 text-xs text-smoke flex-wrap" aria-label="Fil d'Ariane">
              <Link href="/" className="hover:text-braise transition-colors">
                Accueil
              </Link>
              <span className="text-ash" aria-hidden="true">/</span>
              <Link href="/boutique" className="hover:text-braise transition-colors">
                Boutique
              </Link>
              <span className="text-ash" aria-hidden="true">/</span>
              <span className="text-charcoal font-medium truncate max-w-[280px] sm:max-w-md">
                {localizedProduct.name}
              </span>
            </nav>
          </div>
        </div>

        {/* HERO PRODUIT : 2 Colonnes équilibrées (Visuels à gauche + Achat à droite) */}
        <div className="container-custom pt-32 pb-48">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-32 lg:gap-48 items-start">
            
            {/* COLONNE GAUCHE (7 cols) : Miniatures verticales + Photo principale */}
            <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-16 items-start">
              
              {/* Miniatures verticales à gauche */}
              {galleryItems.length > 1 && (
                <div className="flex sm:flex-col gap-10 overflow-x-auto sm:overflow-y-auto max-h-[540px] w-full sm:w-20 shrink-0 pb-4 sm:pb-0 scrollbar-thin">
                  {galleryItems.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedMediaIndex(idx)}
                      aria-label={`Photo ${idx + 1}`}
                      className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-white ${
                        selectedMediaIndex === idx
                          ? 'border-braise shadow-md ring-2 ring-braise/20 scale-[1.02]'
                          : 'border-hairline hover:border-smoke opacity-80 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={item.src}
                        alt={`${localizedProduct.name} vue ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                      {item.type === 'video' && (
                        <span className="absolute inset-0 bg-black/30 flex items-center justify-center text-white text-xs font-bold">
                          ▶
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Photo principale grand format */}
              <div className="relative flex-1 w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-hairline shadow-sm group">
                {selectedMedia?.type === 'video' && productVideo?.mp4Url ? (
                  <video
                    className="w-full h-full object-cover"
                    src={productVideo.mp4Url}
                    poster={videoThumbnail}
                    controls
                    playsInline
                    preload="metadata"
                  />
                ) : selectedMedia?.type === 'video' && productVideo?.youtubeId ? (
                  <iframe
                    className="w-full h-full"
                    src={getYouTubeEmbedUrl(productVideo.youtubeId)}
                    title={productVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : selectedMedia ? (
                  <>
                    <Image
                      src={selectedMedia.src}
                      alt={localizedProduct.name}
                      fill
                      className="object-cover cursor-zoom-in transition-transform duration-300 group-hover:scale-[1.02]"
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      priority
                      onClick={() => setIsZoomOpen(true)}
                    />
                    <button
                      type="button"
                      onClick={() => setIsZoomOpen(true)}
                      className="absolute bottom-12 right-12 bg-white/90 hover:bg-white text-charcoal px-12 py-6 rounded-lg text-xs font-medium shadow-md backdrop-blur-sm transition-all"
                      aria-label="Agrandir l'image"
                    >
                      🔍 Agrandir
                    </button>
                  </>
                ) : null}
                <span className="absolute top-12 left-12 bg-white/90 backdrop-blur-sm px-10 py-4 rounded-md text-[11px] font-semibold tracking-wider text-smoke uppercase border border-hairline/60">
                  BRAVIKO
                </span>
              </div>
            </div>

            {/* COLONNE DROITE (5 cols) : Informations & Bloc de Conversion */}
            <div className="lg:col-span-5 flex flex-col gap-20">
              
              {/* Titre & Note */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-charcoal leading-snug">
                  {localizedProduct.name}
                </h1>

                {/* Badge disponibilité & étoiles */}
                <div className="flex items-center gap-12 mt-10 text-xs flex-wrap">
                  <span className="inline-flex items-center gap-6 px-10 py-4 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                    {richSpec?.badgeText || '● En stock — Expédié rapidement'}
                  </span>
                  <div className="flex items-center gap-4 text-amber-500 text-sm font-semibold">
                    <span>★★★★★</span>
                    <span className="text-smoke text-xs font-normal">(4.9/5 · 18 avis vérifiés)</span>
                  </div>
                </div>
              </div>

              {/* Bloc Prix conforme & unitaire */}
              <div className="p-16 rounded-xl bg-white border border-hairline shadow-sm">
                <div className="flex items-baseline gap-10">
                  <span className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight">
                    {formatPrice(currentPrice)}
                  </span>
                  <span className="text-sm font-bold text-braise tracking-wide uppercase">
                    TTC
                  </span>
                </div>
                {richSpec?.unitPriceLabel ? (
                  <p className="text-xs font-medium text-emerald-800 mt-6 bg-emerald-50/70 inline-block px-8 py-3 rounded">
                    {richSpec.unitPriceLabel}
                  </p>
                ) : (
                  <p className="text-xs text-smoke mt-4">TVA incluse · Paiement sécurisé</p>
                )}
              </div>

              {/* Description courte d'accroche */}
              <p className="text-sm text-smoke leading-relaxed">
                {product.description || localizedProduct.description}
              </p>

              {/* Sélecteur de variantes si plusieurs options */}
              {product.variants && product.variants.length > 1 && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-smoke mb-8">
                    Sélectionnez votre format :
                  </label>
                  <div className="grid grid-cols-2 gap-8">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariant(v.id)}
                        className={`p-12 rounded-xl border-2 text-left transition-all ${
                          selectedVariant === v.id
                            ? 'border-charcoal bg-charcoal text-white shadow-sm'
                            : 'border-hairline bg-white text-charcoal hover:border-smoke'
                        }`}
                      >
                        <div className="font-semibold text-xs leading-tight">
                          {v.label || (v.volume ? `${v.volume} stère(s)` : 'Format')}
                        </div>
                        <div className={`text-xs mt-4 ${selectedVariant === v.id ? 'text-gray-300' : 'text-smoke'}`}>
                          {formatPrice(v.price)} TTC
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantité & Boutons d'action */}
              <div className="flex flex-col gap-12 pt-4">
                <div className="flex items-center gap-12">
                  <span className="text-xs font-semibold text-smoke">Quantité :</span>
                  <div className="flex items-center rounded-xl border border-hairline bg-white shadow-sm overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-36 h-36 flex items-center justify-center hover:bg-mist text-charcoal font-bold text-base transition-colors"
                      aria-label="Diminuer la quantité"
                    >
                      −
                    </button>
                    <span className="w-40 text-center font-bold text-sm text-charcoal">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-36 h-36 flex items-center justify-center hover:bg-mist text-charcoal font-bold text-base transition-colors"
                      aria-label="Augmenter la quantité"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="w-full py-14 px-20 rounded-xl bg-charcoal hover:bg-black text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-8 active:scale-[0.98]"
                  >
                    <span>{added ? '✓ Ajouté au panier !' : 'Ajouter au Panier'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="w-full py-14 px-20 rounded-xl bg-braise hover:bg-braise-dark text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-8 active:scale-[0.98]"
                  >
                    <span>Commander — {formatPrice(currentPrice * quantity)}</span>
                  </button>
                </div>
              </div>

              {/* ENCADRÉ DE RÉASSURANCE DÉDIÉ (Conforme à votre maquette) */}
              <div className="rounded-2xl p-20 bg-[#F6F4EE] border border-[#E7E2D8] text-xs flex flex-col gap-16 mt-8">
                
                {/* 🚚 Livraison adaptée */}
                <div className="flex items-start gap-12">
                  <span className="p-8 rounded-lg bg-white text-braise shadow-2xs shrink-0 mt-2">
                    <DeliveryTruckIcon className="w-5 h-5" />
                  </span>
                  <div>
                    <strong className="block font-semibold text-charcoal text-[13px]">
                      {richSpec?.delivery.delay || 'Livraison sous 5 à 7 jours ouvrés'}
                    </strong>
                    <p className="text-smoke mt-2 leading-relaxed">
                      {richSpec?.delivery.headline || 'Livraison soignée avec prise de rendez-vous préalable.'}
                    </p>
                  </div>
                </div>

                {/* 🔒 Paiement sécurisé avec vrais logos CB, Visa, Mastercard */}
                <div className="flex items-start gap-12 border-t border-[#E7E2D8] pt-14">
                  <span className="p-8 rounded-lg bg-white text-emerald-700 shadow-2xs shrink-0 mt-2">
                    <SecureShieldIcon className="w-5 h-5" />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-8 flex-wrap">
                      <strong className="font-semibold text-charcoal text-[13px]">
                        Paiement 100% sécurisé
                      </strong>
                      <PaymentBadgesRow className="flex items-center gap-6" />
                    </div>
                    <p className="text-smoke mt-2 leading-relaxed">
                      Transactions chiffrées SSL 256-bit par Carte Bancaire, Visa, Mastercard ou virement.
                    </p>
                  </div>
                </div>

                {/* 🛡️ Service & Garantie */}
                <div className="flex items-center gap-12 border-t border-[#E7E2D8] pt-12 text-smoke">
                  <span className="text-braise font-bold text-sm">✓</span>
                  <span>{richSpec?.warranty || 'Garantie légale de conformité 2 ans'} · Support client en France</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* SECTION INfÉRIEURE PLEINE LARGEUR : Onglets / Accordéons Riches & SEO */}
        <div className="container-custom pt-16">
          <div className="bg-white rounded-3xl border border-hairline shadow-sm overflow-hidden divide-y divide-hairline">
            
            {/* 1. Description & Spécifications techniques */}
            <div className="p-24 sm:p-32">
              <button
                type="button"
                onClick={() => toggleAccordion('specs')}
                className="w-full flex items-center justify-between text-left group"
                aria-expanded={activeAccordion === 'specs'}
              >
                <div>
                  <span className="text-xs uppercase tracking-wider text-braise font-bold block mb-4">
                    Fiche détaillée
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-charcoal group-hover:text-braise transition-colors">
                    Description & Caractéristiques techniques
                  </h2>
                </div>
                <span className="w-32 h-32 rounded-full border border-hairline flex items-center justify-center font-bold text-smoke group-hover:border-braise group-hover:text-braise transition-all shrink-0 ml-16">
                  {activeAccordion === 'specs' ? '−' : '+'}
                </span>
              </button>

              {activeAccordion === 'specs' && (
                <div className="pt-24 mt-16 border-t border-hairline/60">
                  <div className="prose max-w-none text-smoke text-sm leading-relaxed mb-24 whitespace-pre-line">
                    {product.longDescription || product.description}
                  </div>

                  {richSpec?.detailedSpecs && richSpec.detailedSpecs.length > 0 && (
                    <div className="mt-20">
                      <h3 className="text-sm font-bold text-charcoal uppercase tracking-wider mb-12">
                        Tableau des spécifications :
                      </h3>
                      <div className="rounded-xl border border-hairline overflow-hidden">
                        <table className="w-full text-left text-xs sm:text-sm">
                          <tbody>
                            {richSpec.detailedSpecs.map((spec, i) => (
                              <tr
                                key={i}
                                className={i % 2 === 0 ? 'bg-[#FAF9F6]' : 'bg-white'}
                              >
                                <td className="py-10 px-16 font-semibold text-charcoal w-1/3 border-b border-hairline/50">
                                  {spec.label}
                                </td>
                                <td className="py-10 px-16 text-smoke border-b border-hairline/50">
                                  {spec.value}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 2. Conseils d'utilisation & Stockage */}
            <div className="p-24 sm:p-32">
              <button
                type="button"
                onClick={() => toggleAccordion('usage')}
                className="w-full flex items-center justify-between text-left group"
                aria-expanded={activeAccordion === 'usage'}
              >
                <div>
                  <span className="text-xs uppercase tracking-wider text-forest font-bold block mb-4">
                    Guide pratique
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-charcoal group-hover:text-forest transition-colors">
                    Conseils d’utilisation & Stockage optimal
                  </h2>
                </div>
                <span className="w-32 h-32 rounded-full border border-hairline flex items-center justify-center font-bold text-smoke group-hover:border-forest group-hover:text-forest transition-all shrink-0 ml-16">
                  {activeAccordion === 'usage' ? '−' : '+'}
                </span>
              </button>

              {activeAccordion === 'usage' && (
                <div className="pt-24 mt-16 border-t border-hairline/60 text-sm text-smoke flex flex-col gap-20">
                  {richSpec?.usageTips && richSpec.usageTips.length > 0 && (
                    <div>
                      <h4 className="font-bold text-charcoal mb-10">Bonnes pratiques d’utilisation :</h4>
                      <ul className="space-y-8 pl-4">
                        {richSpec.usageTips.map((tip, idx) => (
                          <li key={idx} className="flex items-start gap-10">
                            <span className="text-forest font-bold">✓</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {richSpec?.storageAdvice && (
                    <div className="p-16 rounded-xl bg-[#F4F6F4] border border-[#DCE4DC] text-forest-dark">
                      <strong className="block font-semibold mb-4 text-forest">Conseils de conservation :</strong>
                      <p className="text-xs leading-relaxed">{richSpec.storageAdvice}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 3. Modalités & Conditions de transport */}
            <div className="p-24 sm:p-32">
              <button
                type="button"
                onClick={() => toggleAccordion('delivery')}
                className="w-full flex items-center justify-between text-left group"
                aria-expanded={activeAccordion === 'delivery'}
              >
                <div>
                  <span className="text-xs uppercase tracking-wider text-braise font-bold block mb-4">
                    Logistique
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-charcoal group-hover:text-braise transition-colors">
                    Modalités de livraison & Accès transporteur
                  </h2>
                </div>
                <span className="w-32 h-32 rounded-full border border-hairline flex items-center justify-center font-bold text-smoke group-hover:border-braise group-hover:text-braise transition-all shrink-0 ml-16">
                  {activeAccordion === 'delivery' ? '−' : '+'}
                </span>
              </button>

              {activeAccordion === 'delivery' && (
                <div className="pt-24 mt-16 border-t border-hairline/60 text-sm text-smoke flex flex-col gap-16 leading-relaxed">
                  <p className="font-medium text-charcoal">
                    {richSpec?.delivery.headline}
                  </p>
                  <p>{richSpec?.delivery.carrierNotice}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-8">
                    <div className="p-14 rounded-xl bg-mist border border-hairline">
                      <span className="font-bold text-charcoal block mb-4">1. Prise de rendez-vous</span>
                      <p className="text-xs">Le transporteur vous contacte par téléphone/SMS pour valider le jour exact de livraison selon vos disponibilités.</p>
                    </div>
                    <div className="p-14 rounded-xl bg-mist border border-hairline">
                      <span className="font-bold text-charcoal block mb-4">2. Accès camion</span>
                      <p className="text-xs">Camion porteur 19T. L’accès doit être carrossable et dégagé (pas de voie interdite aux poids lourds sans dérogation).</p>
                    </div>
                    <div className="p-14 rounded-xl bg-mist border border-hairline">
                      <span className="font-bold text-charcoal block mb-4">3. Déchargement sécurisé</span>
                      <p className="text-xs">Le chauffeur dépose la palette au sol au transpalette sur sol plat et dur (goudron, béton, enrobé).</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Avis clients & Expérience */}
            <div className="p-24 sm:p-32">
              <button
                type="button"
                onClick={() => toggleAccordion('reviews')}
                className="w-full flex items-center justify-between text-left group"
                aria-expanded={activeAccordion === 'reviews'}
              >
                <div>
                  <span className="text-xs uppercase tracking-wider text-amber-600 font-bold block mb-4">
                    Retours d’expérience
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-charcoal group-hover:text-amber-600 transition-colors">
                    Avis clients & Engagements qualité
                  </h2>
                </div>
                <span className="w-32 h-32 rounded-full border border-hairline flex items-center justify-center font-bold text-smoke group-hover:border-amber-600 group-hover:text-amber-600 transition-all shrink-0 ml-16">
                  {activeAccordion === 'reviews' ? '−' : '+'}
                </span>
              </button>

              {activeAccordion === 'reviews' && (
                <div className="pt-24 mt-16 border-t border-hairline/60">
                  {productReviews.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                      {productReviews.map((rev, i) => (
                        <div key={i} className="p-16 rounded-xl bg-[#FAF9F6] border border-hairline">
                          <div className="text-amber-500 font-bold mb-6">{'★'.repeat(Math.floor(rev.rating || 5))}</div>
                          <p className="text-xs italic text-charcoal">« {rev.text} »</p>
                          <span className="text-[11px] text-smoke block mt-8 font-medium">— {rev.author} {rev.date ? `· ${rev.date}` : ''}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-20 rounded-2xl bg-[#FBF9F5] border border-[#EDE7DC] text-center max-w-xl mx-auto">
                      <div className="text-amber-500 text-lg mb-6">★★★★★</div>
                      <h4 className="font-bold text-charcoal text-sm mb-6">Engagement Qualité Contrôlée Braviko</h4>
                      <p className="text-xs text-smoke leading-relaxed">
                        Chaque référence fait l’objet d’un contrôle rigoureux du taux d’humidité et du conditionnement avant expédition. Les avis certifiés de nos clients sont publiés après livraison effective de chaque commande.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* SECTION CROSS-SELLING : VOUS AIMEREZ AUSSI... */}
        {relatedProducts.length > 0 && (
          <section className="container-custom pt-64" aria-labelledby="cross-selling-title">
            <div className="text-center mb-36">
              <span className="text-xs font-bold uppercase tracking-widest text-braise">
                Complétez votre équipement
              </span>
              <h2 id="cross-selling-title" className="text-2xl sm:text-3xl font-extrabold text-charcoal tracking-tight mt-6">
                VOUS AIMEREZ AUSSI...
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </section>
        )}

        {/* MODAL ZOOM PHOTO */}
        {isZoomOpen && selectedMedia?.type === 'image' && (
          <div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-16 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsZoomOpen(false)}
          >
            <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
              <button
                type="button"
                onClick={() => setIsZoomOpen(false)}
                className="absolute top-12 right-12 z-10 w-40 h-40 rounded-full bg-white text-charcoal font-bold text-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                aria-label="Fermer le zoom"
              >
                ✕
              </button>
              <div className="relative w-full h-full">
                <Image
                  src={selectedMedia.src}
                  alt={localizedProduct.name}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  quality={90}
                />
              </div>
            </div>
          </div>
        )}

      </main>
      <Footer />
    </>
  )
}
