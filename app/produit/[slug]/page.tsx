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
import { categoryLabel, productLabel } from '@/data/product-labels'
import { uiCopy } from '@/data/ui-copy'
import { getProductVideo, getYouTubeEmbedUrl, getYouTubeThumbnail } from '@/data/product-videos'
import { getProductRichSpec } from '@/data/product-rich-specs'
import { computeDynamicUnitPriceLabel } from '@/lib/unit-price'
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
  const [containBySrc, setContainBySrc] = useState<Record<string, boolean>>({})

  const { addItem } = useCart()
  const { showToast } = useToast()
  const router = useRouter()
  const { locale } = useI18n()
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
        setSelectedMediaIndex(0)
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

  useEffect(() => {
    if (!isZoomOpen) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsZoomOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isZoomOpen])

  if (loading && !product) return <PageSkeleton variant="product" label={ui.product.loading} />

  if (!product) {
    notFound()
  }

  const richSpec = getProductRichSpec(product.slug)
  const currentVariant = product.variants?.find((v) => v.id === selectedVariant)
  const currentPrice = currentVariant?.price || product.price

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
    ...(productVideo
      ? [
          {
            type: 'video' as const,
            src: productVideo.youtubeId ? getYouTubeThumbnail(productVideo.youtubeId) : videoThumbnail,
          },
        ]
      : []),
  ]
  const selectedMedia = galleryItems[selectedMediaIndex] || galleryItems[0]
  const dynamicUnitPriceLabel = computeDynamicUnitPriceLabel(
    product,
    currentVariant,
    currentPrice,
    richSpec,
  )
  const localizedProduct = productLabel(product, locale)

  const recordImageAspect = (src: string, img: HTMLImageElement) => {
    if (!img.naturalWidth || !img.naturalHeight) return
    const shouldContain = img.naturalWidth / img.naturalHeight < 1.15
    setContainBySrc((prev) => (prev[src] === shouldContain ? prev : { ...prev, [src]: shouldContain }))
  }

  const keyPoints = richSpec?.detailedSpecs?.length
    ? richSpec.detailedSpecs.slice(0, 4)
    : product.features
        .map((line) => {
          const separator = line.indexOf(':')
          return separator > 0
            ? { label: line.slice(0, separator).trim(), value: line.slice(separator + 1).trim() }
            : null
        })
        .filter((item): item is { label: string; value: string } => Boolean(item))
        .slice(0, 4)

  const statusText = (richSpec?.badgeText || 'En stock — Expédié rapidement').replace(/^●\s*/, '')

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

  const isMainContain = selectedMedia?.src ? Boolean(containBySrc[selectedMedia.src]) : false

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

      <main id="main-content" className="min-h-screen bg-[#FAF9F6] text-[#252823] pb-64">
        {/* Fil d'Ariane */}
        <div className="border-b border-[#DEDFD6] bg-white">
          <div className="container-custom py-[12px]">
            <nav className="flex items-center gap-[8px] text-[12px] text-[#64685F] flex-wrap" aria-label="Fil d'Ariane">
              <Link href="/" className="hover:text-[#995033] transition-colors">
                Accueil
              </Link>
              <span className="text-[#A3A3A3]" aria-hidden="true">/</span>
              <Link href="/boutique" className="hover:text-[#995033] transition-colors">
                Boutique
              </Link>
              <span className="text-[#A3A3A3]" aria-hidden="true">/</span>
              <span className="text-[#252823] font-medium truncate max-w-[260px] sm:max-w-[440px]">
                {localizedProduct.name}
              </span>
            </nav>
          </div>
        </div>

        {/* HERO PRODUIT : 2 Colonnes équilibrées (Galerie + Points clés à gauche / Achat à droite) */}
        <div className="container-custom pt-[28px] lg:pt-[36px] pb-[48px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[28px] lg:gap-[40px] items-start">
            {/* COLONNE GAUCHE (7 cols) : Galerie + Points clés */}
            <div className="lg:col-span-7 lg:sticky lg:top-[104px] min-w-0 flex flex-col gap-[16px]">
              <div className="flex flex-col-reverse sm:flex-row gap-[12px] sm:gap-[16px] items-start">
                {galleryItems.length > 1 && (
                  <div
                    className="flex flex-row sm:flex-col gap-[8px] sm:gap-[10px] w-full sm:w-[88px] shrink-0 overflow-x-auto sm:overflow-y-auto sm:max-h-[480px] pb-[4px] sm:pb-0 scrollbar-hide"
                    aria-label="Galerie d'images du produit"
                  >
                    {galleryItems.map((item, idx) => {
                      const thumbContain = containBySrc[item.src]
                      const isActive = selectedMediaIndex === idx
                      return (
                        <button
                          key={`${item.src}-${idx}`}
                          type="button"
                          onClick={() => setSelectedMediaIndex(idx)}
                          aria-label={item.type === 'video' ? 'Lire la vidéo du produit' : `Afficher la photo ${idx + 1}`}
                          aria-pressed={isActive}
                          className={`relative w-[68px] h-[68px] sm:w-[88px] sm:h-[88px] rounded-[8px] overflow-hidden shrink-0 bg-white transition-all ${
                            isActive
                              ? 'border-2 border-[#995033] ring-2 ring-[#995033]/15 opacity-100'
                              : 'border border-[#DEDFD6] opacity-75 hover:opacity-100 hover:border-[#64685F]'
                          }`}
                        >
                          <Image
                            src={item.src}
                            alt={`${localizedProduct.name} — vue ${idx + 1}`}
                            fill
                            onLoad={(e) => recordImageAspect(item.src, e.currentTarget)}
                            className={thumbContain ? 'object-contain p-[6px]' : 'object-cover'}
                            sizes="88px"
                          />
                          {item.type === 'video' && (
                            <span className="absolute inset-0 bg-[#252823]/40 flex items-center justify-center text-white">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M8 5.5v13l10-6.5-10-6.5z" />
                              </svg>
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                )}

                <div className="relative flex-1 w-full aspect-[4/3] rounded-[8px] overflow-hidden bg-white border border-[#DEDFD6] group">
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
                        key={selectedMedia.src}
                        src={selectedMedia.src}
                        alt={localizedProduct.name}
                        fill
                        priority
                        onLoad={(e) => recordImageAspect(selectedMedia.src, e.currentTarget)}
                        className={
                          isMainContain
                            ? 'object-contain p-[16px] sm:p-[24px] cursor-zoom-in transition-transform duration-300 group-hover:scale-[1.02]'
                            : 'object-cover cursor-zoom-in transition-transform duration-300 group-hover:scale-[1.02]'
                        }
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        onClick={() => setIsZoomOpen(true)}
                      />
                      <button
                        type="button"
                        onClick={() => setIsZoomOpen(true)}
                        className="absolute bottom-[12px] right-[12px] inline-flex items-center gap-[6px] min-h-[38px] px-[12px] py-[6px] rounded-[4px] bg-white/95 hover:bg-white text-[#252823] border border-[#DEDFD6] hover:border-[#252823] text-[12px] font-medium transition-colors"
                        aria-label="Agrandir l'image"
                      >
                        <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                          <circle cx="8.5" cy="8.5" r="5.5" />
                          <path d="m13 13 4 4M8.5 6v5M6 8.5h5" strokeLinecap="round" />
                        </svg>
                        <span>Agrandir</span>
                      </button>
                    </>
                  ) : null}
                </div>
              </div>

              {keyPoints.length > 0 && (
                <div className="rounded-[8px] border border-[#DEDFD6] bg-white overflow-hidden">
                  <div className="flex items-center justify-between gap-[12px] px-[16px] py-[10px] border-b border-[#DEDFD6] bg-[#FAF9F6]">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#64685F]">
                      Points clés · {categoryLabel(product.category, locale)}
                    </span>
                    <a
                      href="#details-fiche"
                      className="text-[12px] font-medium text-[#995033] hover:underline underline-offset-4 whitespace-nowrap"
                    >
                      Fiche complète
                    </a>
                  </div>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 divide-[#DEDFD6]">
                    {keyPoints.map((spec, idx) => (
                      <div
                        key={spec.label}
                        className={`px-[16px] py-[12px] ${idx >= 2 ? 'sm:border-t sm:border-[#DEDFD6]' : ''} ${idx % 2 === 1 ? 'sm:border-l sm:border-[#DEDFD6]' : ''}`}
                      >
                        <dt className="text-[11px] uppercase tracking-[0.08em] text-[#64685F]">
                          {spec.label}
                        </dt>
                        <dd className="mt-[4px] text-[13px] font-medium text-[#252823] leading-snug">
                          {spec.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>

            {/* COLONNE DROITE (5 cols) : Informations & Bloc de Conversion */}
            <div className="lg:col-span-5 min-w-0 flex flex-col gap-[16px]">
              <div>
                <h1 className="text-[26px] sm:text-[32px] font-semibold tracking-tight text-[#252823] leading-[1.16] text-balance">
                  {localizedProduct.name}
                </h1>

                <div className="flex items-center gap-[10px] mt-[10px] text-[12px] flex-wrap">
                  <span className="inline-flex items-center gap-[8px] px-[10px] py-[4px] rounded-[4px] bg-[#EEEEE7] text-[#252823] border border-[#DEDFD6] font-medium">
                    <span className="w-[8px] h-[8px] rounded-full bg-[#34483A] shrink-0" aria-hidden="true" />
                    <span>{statusText}</span>
                  </span>
                  {richSpec?.warranty && (
                    <span className="text-[#64685F] font-medium">
                      {richSpec.warranty}
                    </span>
                  )}
                </div>
                <p className="mt-[8px] text-[12px] text-[#64685F]">
                  Livraison offerte en France métropolitaine · Paiement sécurisé Stripe ou virement SEPA · Retour 14 jours
                </p>
              </div>

              <div className="p-[18px] sm:p-[20px] rounded-[8px] bg-white border border-[#DEDFD6]">
                <div className="flex items-baseline gap-[10px] flex-wrap">
                  <span className="text-[34px] sm:text-[42px] font-bold leading-none text-[#252823] tracking-tight tabular-nums">
                    {formatPrice(currentPrice)}
                  </span>
                  <span className="text-[12px] font-semibold text-[#995033] tracking-[0.08em] uppercase">
                    TTC
                  </span>
                </div>
                <p className="mt-[10px] inline-flex items-center gap-[6px] px-[10px] py-[5px] rounded-[4px] bg-[#EEEEE7] border border-[#DEDFD6] text-[13px] font-semibold text-[#34483A] tabular-nums">
                  {dynamicUnitPriceLabel}
                </p>
                <p className="text-[12px] text-[#64685F] mt-[8px] tabular-nums">
                  {quantity > 1
                    ? `Total pour ${quantity} unités : ${formatPrice(currentPrice * quantity)} TTC · TVA incluse`
                    : 'TVA incluse · Livraison en France'}
                </p>
              </div>

              <p className="text-[14px] sm:text-[15px] text-[#64685F] leading-[1.6]">
                {product.description || localizedProduct.description}
              </p>

              {product.variants && product.variants.length > 1 && (
                <div>
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#64685F] mb-[8px]">
                    Format
                  </span>
                  <div className="grid grid-cols-2 gap-[8px]">
                    {product.variants.map((v) => {
                      const active = selectedVariant === v.id
                      return (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setSelectedVariant(v.id)}
                          aria-pressed={active}
                          className={`min-h-[52px] p-[12px] rounded-[4px] border text-left transition-colors ${
                            active
                              ? 'border-[#252823] bg-[#252823] text-white'
                              : 'border-[#DEDFD6] bg-white text-[#252823] hover:border-[#64685F]'
                          }`}
                        >
                          <div className="font-medium text-[13px] leading-tight">
                            {v.label || (v.volume ? `${v.volume} stère(s)` : 'Format')}
                          </div>
                          <div className={`text-[12px] mt-[4px] tabular-nums ${active ? 'text-white/80' : 'text-[#64685F]'}`}>
                            {formatPrice(v.price)} TTC
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Quantité & Boutons d'action */}
              <div className="flex flex-col gap-[12px] pt-[4px]">
                <div className="flex items-center gap-[12px]">
                  <span className="text-[13px] font-medium text-[#64685F] whitespace-nowrap">Quantité</span>
                  <div className="inline-flex items-center rounded-[4px] border border-[#DEDFD6] bg-white">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-[44px] h-[44px] flex items-center justify-center hover:bg-[#EEEEE7] text-[#252823] transition-colors"
                      aria-label="Diminuer la quantité"
                    >
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                        <path d="M3 8h10" strokeLinecap="round" />
                      </svg>
                    </button>
                    <span className="w-[44px] text-center font-semibold text-[14px] text-[#252823] tabular-nums">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-[44px] h-[44px] flex items-center justify-center hover:bg-[#EEEEE7] text-[#252823] transition-colors"
                      aria-label="Augmenter la quantité"
                    >
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                        <path d="M8 3v10M3 8h10" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px]">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="min-h-[48px] w-full px-[16px] py-[12px] rounded-[4px] border border-[#252823] bg-white hover:bg-[#EEEEE7] text-[#252823] font-medium text-[14px] transition-colors active:translate-y-[1px] flex items-center justify-center gap-[8px]"
                  >
                    {added && (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                        <path d="m3.5 8.5 3 3 6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    <span>{added ? 'Ajouté au panier' : 'Ajouter au panier'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="min-h-[48px] w-full px-[16px] py-[12px] rounded-[4px] bg-[#252823] hover:bg-[#995033] text-white font-medium text-[14px] transition-colors active:translate-y-[1px] flex items-center justify-center gap-[8px] tabular-nums"
                  >
                    <span>Commander — {formatPrice(currentPrice * quantity)}</span>
                  </button>
                </div>
              </div>

              {/* Encadré de réassurance */}
              <div className="rounded-[8px] p-[16px] bg-[#EEEEE7] border border-[#DEDFD6] text-[12px] flex flex-col gap-[12px] mt-[4px]">
                <div className="flex items-start gap-[12px]">
                  <span className="p-[8px] rounded-[4px] bg-white border border-[#DEDFD6] text-[#995033] shrink-0">
                    <DeliveryTruckIcon className="w-[20px] h-[20px]" />
                  </span>
                  <div className="min-w-0">
                    <strong className="block font-semibold text-[#252823] text-[13px]">
                      {richSpec?.delivery.delay || 'Livraison sous 5 à 7 jours ouvrés'}
                    </strong>
                    <p className="text-[#64685F] mt-[4px] leading-[1.5]">
                      {richSpec?.delivery.headline || 'Livraison soignée avec prise de rendez-vous préalable.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-[12px] border-t border-[#DEDFD6] pt-[12px]">
                  <span className="p-[8px] rounded-[4px] bg-white border border-[#DEDFD6] text-[#34483A] shrink-0">
                    <SecureShieldIcon className="w-[20px] h-[20px]" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-[8px] flex-wrap">
                      <strong className="font-semibold text-[#252823] text-[13px]">
                        Paiement sécurisé
                      </strong>
                      <PaymentBadgesRow className="flex items-center gap-[6px]" />
                    </div>
                    <p className="text-[#64685F] mt-[4px] leading-[1.5]">
                      Carte Bancaire, Visa, Mastercard ou virement SEPA avec chiffrement SSL.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-[10px] border-t border-[#DEDFD6] pt-[12px] text-[#64685F]">
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-[#34483A] shrink-0" aria-hidden="true">
                    <path d="m3.5 8.5 3 3 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{richSpec?.warranty || 'Garantie légale de conformité 2 ans'} · Support client en France</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ACCORDÉONS : Fiche complète, utilisation, logistique, engagements */}
        <div id="details-fiche" className="container-custom pt-[16px] scroll-mt-[100px]">
          <div className="bg-white rounded-[8px] border border-[#DEDFD6] overflow-hidden divide-y divide-[#DEDFD6]">
            {/* 1. Description & Spécifications techniques */}
            <div className="px-[20px] py-[16px] sm:px-[28px] sm:py-[20px]">
              <button
                type="button"
                onClick={() => toggleAccordion('specs')}
                className="w-full min-h-[48px] flex items-center justify-between text-left gap-[16px] group"
                aria-expanded={activeAccordion === 'specs'}
              >
                <h2 className="text-[17px] sm:text-[19px] font-semibold text-[#252823] group-hover:text-[#995033] transition-colors">
                  Description & caractéristiques techniques
                </h2>
                <span className="w-[40px] h-[40px] rounded-full border border-[#DEDFD6] flex items-center justify-center text-[#64685F] group-hover:border-[#995033] group-hover:text-[#995033] transition-colors shrink-0">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                    <path d="M3 8h10" strokeLinecap="round" />
                    {activeAccordion !== 'specs' && <path d="M8 3v10" strokeLinecap="round" />}
                  </svg>
                </span>
              </button>

              {activeAccordion === 'specs' && (
                <div className="pt-[20px] mt-[16px] border-t border-[#DEDFD6]">
                  <div className="max-w-[68ch] text-[#64685F] text-[14px] leading-[1.65] mb-[20px] whitespace-pre-line">
                    {product.longDescription || product.description}
                  </div>

                  {richSpec?.detailedSpecs && richSpec.detailedSpecs.length > 0 && (
                    <div className="mt-[16px]">
                      <h3 className="text-[12px] font-semibold text-[#64685F] uppercase tracking-[0.12em] mb-[10px]">
                        Spécifications détaillées
                      </h3>
                      <div className="rounded-[8px] border border-[#DEDFD6] overflow-hidden">
                        <table className="w-full text-left text-[13px]">
                          <tbody>
                            {richSpec.detailedSpecs.map((spec, i) => (
                              <tr
                                key={i}
                                className={i % 2 === 0 ? 'bg-[#FAF9F6]' : 'bg-white'}
                              >
                                <td className="py-[10px] px-[16px] font-medium text-[#252823] w-1/3 border-b border-[#DEDFD6]">
                                  {spec.label}
                                </td>
                                <td className="py-[10px] px-[16px] text-[#64685F] border-b border-[#DEDFD6] tabular-nums">
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
            <div className="px-[20px] py-[16px] sm:px-[28px] sm:py-[20px]">
              <button
                type="button"
                onClick={() => toggleAccordion('usage')}
                className="w-full min-h-[48px] flex items-center justify-between text-left gap-[16px] group"
                aria-expanded={activeAccordion === 'usage'}
              >
                <h2 className="text-[17px] sm:text-[19px] font-semibold text-[#252823] group-hover:text-[#995033] transition-colors">
                  Conseils d’utilisation & stockage optimal
                </h2>
                <span className="w-[40px] h-[40px] rounded-full border border-[#DEDFD6] flex items-center justify-center text-[#64685F] group-hover:border-[#995033] group-hover:text-[#995033] transition-colors shrink-0">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                    <path d="M3 8h10" strokeLinecap="round" />
                    {activeAccordion !== 'usage' && <path d="M8 3v10" strokeLinecap="round" />}
                  </svg>
                </span>
              </button>

              {activeAccordion === 'usage' && (
                <div className="pt-[20px] mt-[16px] border-t border-[#DEDFD6] text-[14px] text-[#64685F] flex flex-col gap-[16px]">
                  {richSpec?.usageTips && richSpec.usageTips.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-[#252823] mb-[10px]">Bonnes pratiques d’utilisation</h3>
                      <ul className="space-y-[8px]">
                        {richSpec.usageTips.map((tip, idx) => (
                          <li key={idx} className="flex items-start gap-[10px]">
                            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-[#34483A] shrink-0 mt-[4px]" aria-hidden="true">
                              <path d="m3.5 8.5 3 3 6-6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {richSpec?.storageAdvice && (
                    <div className="p-[16px] rounded-[8px] bg-[#EEEEE7] border border-[#DEDFD6] text-[#252823]">
                      <strong className="block font-semibold mb-[4px] text-[#34483A]">Conseils de conservation</strong>
                      <p className="text-[13px] leading-[1.6] text-[#64685F]">{richSpec.storageAdvice}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 3. Modalités & Conditions de transport */}
            <div className="px-[20px] py-[16px] sm:px-[28px] sm:py-[20px]">
              <button
                type="button"
                onClick={() => toggleAccordion('delivery')}
                className="w-full min-h-[48px] flex items-center justify-between text-left gap-[16px] group"
                aria-expanded={activeAccordion === 'delivery'}
              >
                <h2 className="text-[17px] sm:text-[19px] font-semibold text-[#252823] group-hover:text-[#995033] transition-colors">
                  Modalités de livraison & accès transporteur
                </h2>
                <span className="w-[40px] h-[40px] rounded-full border border-[#DEDFD6] flex items-center justify-center text-[#64685F] group-hover:border-[#995033] group-hover:text-[#995033] transition-colors shrink-0">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                    <path d="M3 8h10" strokeLinecap="round" />
                    {activeAccordion !== 'delivery' && <path d="M8 3v10" strokeLinecap="round" />}
                  </svg>
                </span>
              </button>

              {activeAccordion === 'delivery' && (
                <div className="pt-[20px] mt-[16px] border-t border-[#DEDFD6] text-[14px] text-[#64685F] flex flex-col gap-[14px] leading-[1.6]">
                  <p className="font-medium text-[#252823]">
                    {richSpec?.delivery.headline}
                  </p>
                  <p>{richSpec?.delivery.carrierNotice}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-[12px] mt-[4px]">
                    <div className="p-[14px] rounded-[8px] bg-[#FAF9F6] border border-[#DEDFD6]">
                      <span className="font-semibold text-[#252823] block mb-[4px]">01. Prise de rendez-vous</span>
                      <p className="text-[12px] leading-[1.5]">Le transporteur vous contacte par téléphone ou SMS pour fixer le jour exact selon vos disponibilités.</p>
                    </div>
                    <div className="p-[14px] rounded-[8px] bg-[#FAF9F6] border border-[#DEDFD6]">
                      <span className="font-semibold text-[#252823] block mb-[4px]">02. Accès véhicule</span>
                      <p className="text-[12px] leading-[1.5]">Porteur adapté avec hayon. L’accès doit être carrossable et dégagé jusqu’au point de dépose.</p>
                    </div>
                    <div className="p-[14px] rounded-[8px] bg-[#FAF9F6] border border-[#DEDFD6]">
                      <span className="font-semibold text-[#252823] block mb-[4px]">03. Déchargement sécurisé</span>
                      <p className="text-[12px] leading-[1.5]">Dépose soignée au transpalette sur surface stable et plane (goudron, béton ou pavés).</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Engagements qualité & Retours */}
            <div className="px-[20px] py-[16px] sm:px-[28px] sm:py-[20px]">
              <button
                type="button"
                onClick={() => toggleAccordion('reviews')}
                className="w-full min-h-[48px] flex items-center justify-between text-left gap-[16px] group"
                aria-expanded={activeAccordion === 'reviews'}
              >
                <h2 className="text-[17px] sm:text-[19px] font-semibold text-[#252823] group-hover:text-[#995033] transition-colors">
                  Engagements qualité & retours produit
                </h2>
                <span className="w-[40px] h-[40px] rounded-full border border-[#DEDFD6] flex items-center justify-center text-[#64685F] group-hover:border-[#995033] group-hover:text-[#995033] transition-colors shrink-0">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                    <path d="M3 8h10" strokeLinecap="round" />
                    {activeAccordion !== 'reviews' && <path d="M8 3v10" strokeLinecap="round" />}
                  </svg>
                </span>
              </button>

              {activeAccordion === 'reviews' && (
                <div className="pt-[20px] mt-[16px] border-t border-[#DEDFD6]">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-[12px]">
                    <div className="p-[16px] rounded-[8px] bg-[#FAF9F6] border border-[#DEDFD6]">
                      <span className="font-semibold text-[#252823] text-[13px] block mb-[6px]">01. Contrôle qualité avant départ</span>
                      <p className="text-[12px] text-[#64685F] leading-[1.55]">
                        Chaque référence sélectionnée par Braviko est vérifiée sur son conditionnement, ses caractéristiques techniques et ses accessoires avant remise au transporteur.
                      </p>
                    </div>
                    <div className="p-[16px] rounded-[8px] bg-[#FAF9F6] border border-[#DEDFD6]">
                      <span className="font-semibold text-[#252823] text-[13px] block mb-[6px]">02. Garanties légales & constructeurs</span>
                      <p className="text-[12px] text-[#64685F] leading-[1.55]">
                        {richSpec?.warranty ? `${richSpec.warranty}. ` : ''}Tous nos appareils et équipements neufs bénéficient de la garantie légale de conformité de 2 ans.
                      </p>
                    </div>
                    <div className="p-[16px] rounded-[8px] bg-[#FAF9F6] border border-[#DEDFD6]">
                      <span className="font-semibold text-[#252823] text-[13px] block mb-[6px]">03. Rétractation & support 14 jours</span>
                      <p className="text-[12px] text-[#64685F] leading-[1.55]">
                        Droit de rétractation légal de 14 jours calendaires après réception sur produit non utilisé et complet, avec service client joignable sur contact@braviko.fr.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SECTION CROSS-SELLING */}
        {relatedProducts.length > 0 && (
          <section className="container-custom pt-[56px]" aria-labelledby="cross-selling-title">
            <div className="mb-[24px]">
              <p className="bk-eyebrow">Complétez votre équipement</p>
              <h2 id="cross-selling-title" className="text-[26px] sm:text-[34px] font-medium text-[#252823] tracking-tight">
                Dans le même univers
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px]">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </section>
        )}

        {/* MODAL ZOOM PHOTO */}
        {isZoomOpen && selectedMedia?.type === 'image' && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={localizedProduct.name}
            className="fixed inset-0 z-50 bg-[#252823]/85 flex items-center justify-center p-[16px] backdrop-blur-sm"
            onClick={() => setIsZoomOpen(false)}
          >
            <div
              className="relative max-w-4xl max-h-[90dvh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsZoomOpen(false)}
                className="absolute top-[12px] right-[12px] z-10 w-[44px] h-[44px] rounded-full bg-white border border-[#DEDFD6] text-[#252823] hover:bg-[#EEEEE7] flex items-center justify-center transition-colors"
                aria-label="Fermer l'agrandissement"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                  <path d="M4 4l10 10M14 4L4 14" strokeLinecap="round" />
                </svg>
              </button>
              <div className="relative w-full h-full">
                <Image
                  key={selectedMedia.src}
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
