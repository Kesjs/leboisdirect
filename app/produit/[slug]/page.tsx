'use client'

import { useEffect, useState } from 'react'
import { use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import ProductCard from '@/components/ProductCard'
import type { Product } from '@/data/products'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/lib/cart-context'
import { useI18n } from '@/lib/i18n-context'
import { commerceCopy } from '@/data/commerce-copy'
import { categoryLabels, hasMeaningfulConditioning, productLabel } from '@/data/product-labels'
import { uiCopy } from '@/data/ui-copy'
import { getProductReviews } from '@/data/product-reviews'

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [product, setProduct] = useState<Product | null>(null)
  const [catalogProducts, setCatalogProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const { addItem } = useCart()
  const router = useRouter()
  const { locale } = useI18n()
  const c = commerceCopy[locale]
  const ui = uiCopy[locale]

  useEffect(() => {
    let active = true
    fetch('/api/catalog')
      .then(response => response.ok ? response.json() : Promise.reject(new Error('product unavailable')))
      .then(payload => {
        if (!active) return
        setCatalogProducts(payload.products || [])
        const current = payload.products?.find((item: Product) => item.slug === slug)
        setProduct(current || null)
        setLoading(false)
      })
      .catch(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [slug])

  useEffect(() => {
    setSelectedVariant(product?.variants?.[0]?.id || '')
  }, [product])

  if (loading && !product) return <main className="bk-product-loading" aria-busy="true" aria-label={ui.product.loading}><div className="bk-product-loading-media" /><div className="bk-product-loading-copy"><span /><span /><span /><span /></div></main>

  if (!product) {
    notFound()
  }

  const currentVariant = product.variants?.find((v) => v.id === selectedVariant)
  const currentPrice = currentVariant?.price || product.price
  const relatedProducts = catalogProducts
    .filter((item) => item.id !== product.id && item.category === product.category)
    .slice(0, 6)
  const productReviews = getProductReviews(product.name)

  const reviewsCopy = {
    fr: { eyebrow: 'Avis clients', title: 'Les avis sur ce produit', empty: 'Les premiers avis clients seront affichés ici après les premières commandes.' },
    de: { eyebrow: 'Kundenbewertungen', title: 'Bewertungen zu diesem Produkt', empty: 'Die ersten Kundenbewertungen werden nach den ersten Bestellungen hier angezeigt.' },
    it: { eyebrow: 'Recensioni clienti', title: 'Le recensioni di questo prodotto', empty: 'Le prime recensioni saranno mostrate qui dopo i primi ordini.' },
  }[locale]

  const productReviewCopy = {
    fr: {
      eyebrow: 'Le regard Braviko',
      title: 'Ce qu’il faut retenir',
      intro: 'Une lecture claire de cette référence à partir de ses caractéristiques, de son conditionnement et de son usage prévu.',
      items: product.category === 'machines-agricoles'
        ? [
            ['Pour quel besoin ?', 'Une référence pensée pour les travaux courants du terrain et les utilisateurs qui recherchent un équipement adapté à un usage régulier.'],
            ['Le point à vérifier', 'Avant de commander, comparez la puissance, les dimensions et les accessoires inclus avec votre installation.'],
            ['Notre conseil', 'Préparez la surface à travailler et l’accès de livraison afin de choisir la configuration la plus pratique.'],
          ]
        : [
            ['Le format', `Cette référence est proposée en ${productLabel(product, locale).conditioning || 'conditionnement indiqué sur la fiche produit'}.`],
            ['L’usage', productLabel(product, locale).description || 'Une solution de chauffage à choisir selon votre appareil, votre espace de stockage et votre besoin de combustion.'],
            ['La livraison', productLabel(product, locale).delivery || 'La livraison est organisée selon la zone et le conditionnement sélectionné.'],
          ],
    },
    de: {
      eyebrow: 'Braviko Einschätzung',
      title: 'Das Wichtigste auf einen Blick',
      intro: 'Eine klare Einordnung dieser Referenz anhand ihrer Eigenschaften, Verpackung und vorgesehenen Nutzung.',
      items: product.category === 'machines-agricoles'
        ? [
            ['Für welchen Bedarf?', 'Eine Referenz für typische Arbeiten auf dem Grundstück und einen regelmäßigen Einsatz.'],
            ['Was ist zu prüfen?', 'Vergleichen Sie vor der Bestellung Leistung, Maße und enthaltenes Zubehör mit Ihrer Ausstattung.'],
            ['Unser Tipp', 'Planen Sie die zu bearbeitende Fläche und den Lieferzugang vorab.'],
          ]
        : [
            ['Das Format', `Diese Referenz wird in ${productLabel(product, locale).conditioning || 'der auf der Produktseite angegebenen Verpackung'} angeboten.`],
            ['Der Einsatz', productLabel(product, locale).description || 'Eine Heizlösung, die passend zu Ofen, Lagerplatz und gewünschter Brenndauer ausgewählt wird.'],
            ['Die Lieferung', productLabel(product, locale).delivery || 'Die Lieferung richtet sich nach Lieferzone und gewählter Verpackung.'],
          ],
    },
    it: {
      eyebrow: 'Il punto di vista Braviko',
      title: 'Cosa sapere prima di scegliere',
      intro: 'Una lettura chiara della referenza a partire da caratteristiche, confezione e utilizzo previsto.',
      items: product.category === 'machines-agricoles'
        ? [
            ['Per quale esigenza?', 'Una referenza pensata per i lavori più comuni sul terreno e per un uso regolare.'],
            ['Cosa verificare?', 'Prima dell’ordine, confronta potenza, dimensioni e accessori inclusi con la tua attrezzatura.'],
            ['Il nostro consiglio', 'Prepara la superficie da lavorare e l’accesso per la consegna.'],
          ]
        : [
            ['Il formato', `Questa referenza è proposta in ${productLabel(product, locale).conditioning || 'la confezione indicata nella scheda prodotto'}.`],
            ['L’utilizzo', productLabel(product, locale).description || 'Una soluzione da scegliere in base al proprio apparecchio, allo spazio disponibile e alla durata desiderata.'],
            ['La consegna', productLabel(product, locale).delivery || 'La consegna dipende dalla zona e dalla confezione selezionata.'],
          ],
    },
  }[locale]

  const faqCopy = {
    fr: {
      eyebrow: 'Avant de choisir',
      title: 'Les questions utiles',
      intro: 'Les réponses essentielles pour choisir sereinement et préparer votre livraison.',
      questions: product.category === 'machines-agricoles'
        ? [
            ['À quel usage ce produit est-il destiné ?', 'Cette référence est sélectionnée pour les travaux courants du terrain. Consultez les caractéristiques de la fiche pour vérifier la puissance, les dimensions et l’usage adapté à votre besoin.'],
            ['Que comprend le conditionnement ?', `Le conditionnement prévu est : ${productLabel(product, locale).conditioning}.`],
            ['Comment se passe la livraison ?', `La livraison est généralement organisée sous 5 à 10 jours. ${productLabel(product, locale).delivery}`],
            ['Besoin d’aide avant de commander ?', 'Contactez-nous avec la surface à travailler et votre usage. Nous vous aiderons à comparer les références disponibles.'],
          ]
        : [
            ['Quel format choisir pour mon installation ?', `Le format proposé pour cette référence est : ${productLabel(product, locale).conditioning}. Vérifiez toujours les dimensions acceptées par votre appareil.`],
            ['Comment se passe la livraison ?', `La livraison est généralement organisée sous 5 à 10 jours. ${productLabel(product, locale).delivery}`],
            ['Le produit est-il prêt à être utilisé ?', 'Chaque fiche précise le conditionnement et les caractéristiques utiles. Conservez les produits à l’abri de l’humidité et préparez un accès dégagé pour le déchargement.'],
            ['Besoin d’un conseil personnalisé ?', 'Contactez-nous avec votre appareil, votre quantité habituelle et votre zone de livraison. Nous vous orienterons vers le bon format.'],
          ],
    },
    de: {
      eyebrow: 'Vor der Auswahl',
      title: 'Wichtige Fragen',
      intro: 'Die wichtigsten Antworten für eine sichere Auswahl und eine gut vorbereitete Lieferung.',
      questions: product.category === 'machines-agricoles'
        ? [
            ['Für welchen Einsatz ist das Produkt gedacht?', 'Diese Referenz eignet sich für typische Arbeiten auf dem Grundstück. Prüfen Sie Leistung, Maße und den vorgesehenen Einsatz in den Produktdetails.'],
            ['Was ist im Lieferumfang enthalten?', `Die Verpackung ist: ${productLabel(product, locale).conditioning}.`],
            ['Wie läuft die Lieferung ab?', `Die Lieferung wird normalerweise innerhalb von 5 bis 10 Tagen organisiert. ${productLabel(product, locale).delivery}`],
            ['Brauchen Sie Hilfe vor der Bestellung?', 'Nennen Sie uns die zu bearbeitende Fläche und Ihren Einsatz. Wir helfen Ihnen beim Vergleich der verfügbaren Produkte.'],
          ]
        : [
            ['Welches Format passt zu meiner Anlage?', `Das Format dieser Referenz ist: ${productLabel(product, locale).conditioning}. Prüfen Sie immer die Maße Ihres Geräts.`],
            ['Wie läuft die Lieferung ab?', `Die Lieferung wird normalerweise innerhalb von 5 bis 10 Tagen organisiert. ${productLabel(product, locale).delivery}`],
            ['Ist das Produkt sofort einsatzbereit?', 'Verpackung und Eigenschaften finden Sie auf dieser Produktseite. Lagern Sie die Produkte trocken und halten Sie den Abladeort frei.'],
            ['Brauchen Sie eine persönliche Beratung?', 'Nennen Sie uns Ihr Gerät, Ihre übliche Menge und Ihren Lieferort. Wir helfen Ihnen beim richtigen Format.'],
          ],
    },
    it: {
      eyebrow: 'Prima di scegliere',
      title: 'Le domande utili',
      intro: 'Le risposte essenziali per scegliere con serenità e preparare la consegna.',
      questions: product.category === 'machines-agricoles'
        ? [
            ['Per quale utilizzo è pensato?', 'Questa referenza è adatta ai lavori più comuni sul terreno. Verifica potenza, dimensioni e uso previsto nella scheda prodotto.'],
            ['Cosa comprende la confezione?', `Il formato previsto è: ${productLabel(product, locale).conditioning}.`],
            ['Come funziona la consegna?', `La consegna viene normalmente organizzata in 5-10 giorni. ${productLabel(product, locale).delivery}`],
            ['Serve aiuto prima dell’ordine?', 'Indicaci la superficie da lavorare e l’uso previsto. Ti aiuteremo a confrontare le referenze disponibili.'],
          ]
        : [
            ['Quale formato scegliere per il mio impianto?', `Il formato di questa referenza è: ${productLabel(product, locale).conditioning}. Verifica sempre le dimensioni ammesse dal tuo apparecchio.`],
            ['Come funziona la consegna?', `La consegna viene normalmente organizzata in 5-10 giorni. ${productLabel(product, locale).delivery}`],
            ['Il prodotto è pronto all’uso?', 'La scheda indica confezione e caratteristiche utili. Conserva i prodotti al riparo dall’umidità e prepara un accesso libero per lo scarico.'],
            ['Serve un consiglio personalizzato?', 'Indicaci il tuo apparecchio, la quantità abituale e la zona di consegna. Ti aiuteremo a scegliere il formato giusto.'],
          ],
    },
  }[locale]

  const handleAddToCart = () => {
    addItem(product, quantity, selectedVariant || undefined)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 2200)
  }

  const handleBuyNow = () => {
    addItem(product, quantity, selectedVariant || undefined)
    router.push('/checkout')
  }

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-ivory">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-hairline">
          <div className="container-custom py-20">
            <nav className="flex items-center gap-12 text-body-sm flex-wrap">
              <Link href="/" className="text-smoke hover:text-braise transition-colors">
                {ui.common.home}
              </Link>
              <span className="text-ash">/</span>
              <Link href="/boutique" className="text-smoke hover:text-braise transition-colors">
                {ui.common.shop}
              </Link>
              <span className="text-ash">/</span>
              <span className="text-charcoal font-medium">{productLabel(product, locale).name}</span>
            </nav>
          </div>
        </div>

        {/* Product Detail */}
        <div className="container-custom py-64">
          <div className="grid md:grid-cols-2 gap-48 md:gap-64">
            {/* Gallery */}
            <div>
              <div className="sticky top-[120px]">
                <div className="relative aspect-[4/3] rounded-card overflow-hidden bg-white border border-hairline mb-20">
                  <Image
                    src={product.images[selectedImageIndex]}
                    alt={productLabel(product, locale).name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    onError={(event) => {
                      if (product.image && event.currentTarget.src !== product.image) {
                        event.currentTarget.src = product.image
                      }
                    }}
                  />
                  {product.images[selectedImageIndex].startsWith('/images/') && <span className="bk-detail-watermark" aria-hidden="true">BRAVIKO</span>}
                </div>
                {product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-12">
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`relative aspect-square rounded-card overflow-hidden border-2 transition-all ${
                          selectedImageIndex === idx
                            ? 'border-braise'
                            : 'border-hairline hover:border-smoke'
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`${productLabel(product, locale).name} - ${idx + 1}`}
                          fill
                          className="object-cover"
                          sizes="200px"
                          onError={(event) => {
                            if (product.image && event.currentTarget.src !== product.image) {
                              event.currentTarget.src = product.image
                            }
                          }}
                        />
                        {img.startsWith('/images/') && <span className="bk-detail-thumb-watermark" aria-hidden="true">B</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <p className="bk-eyebrow" style={{ color: 'var(--bk-accent)' }}>
                {categoryLabels[locale][product.category] || product.category.replace(/-/g, ' ')}
              </p>

              <h1 className="text-heading-lg md:text-display font-semibold text-charcoal mb-20 tracking-tight leading-tight">
                {productLabel(product, locale).name}
              </h1>

              {product.species && (
                <p className="text-body text-smoke mb-16 capitalize">
                  {ui.product.species} : {ui.product.speciesNames[product.species]}
                </p>
              )}

              <p className="text-body-lg text-smoke mb-16 leading-relaxed">{product.longDescription || productLabel(product, locale).description}</p>
              {hasMeaningfulConditioning(productLabel(product, locale).conditioning) && (
                <p className="text-body-sm text-ash mb-32">{c.conditioning} : {productLabel(product, locale).conditioning}</p>
              )}

              <div className="mb-40 pb-40 border-b border-hairline">
                <div className="text-[48px] font-semibold text-charcoal tracking-tight mb-8">
                  {formatPrice(currentPrice)}
                </div>
                <p className="text-body-sm text-ash">{productLabel(product, locale).delivery}</p>
              </div>

              {/* Variants */}
              {product.variants && product.variants.length > 1 && (
                <div className="mb-32">
                  <label className="block text-body font-semibold text-charcoal mb-16">{c.volume}</label>
                  <div className="grid grid-cols-3 gap-12">
                    {product.variants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant.id)}
                        className={`px-20 py-16 rounded-card border-2 transition-all text-center ${
                          selectedVariant === variant.id
                            ? 'border-charcoal bg-charcoal text-white'
                            : 'border-hairline hover:border-smoke bg-white text-charcoal'
                        }`}
                      >
                        <div className="font-semibold">{variant.volume} {variant.volume && variant.volume > 1 ? ui.product.units : ui.product.unit}</div>
                        <div className="text-[13px] mt-4 opacity-80">{formatPrice(variant.price)}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-40">
                <label htmlFor="quantity" className="block text-body font-semibold text-charcoal mb-16">
                  {c.quantity}
                </label>
                <div className="flex items-center gap-16">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-48 h-48 rounded-card border border-hairline hover:border-smoke transition-colors flex items-center justify-center text-charcoal font-semibold"
                    aria-label={c.decrease}
                  >
                    −
                  </button>
                  <input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-80 h-48 rounded-card border border-hairline text-center text-body font-semibold text-charcoal focus:outline-none focus:ring-2 focus:ring-charcoal"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-48 h-48 rounded-card border border-hairline hover:border-smoke transition-colors flex items-center justify-center text-charcoal font-semibold"
                    aria-label={c.increase}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="bk-product-actions">
                <Button size="md" className="bk-product-buy" onClick={handleBuyNow}>
                  Acheter maintenant — {formatPrice(currentPrice * quantity)}
                </Button>
                <button type="button" className="bk-product-cart" onClick={handleAddToCart}>
                  {added ? c.added : c.add}
                </button>
              </div>
              <p className="text-caption text-ash text-center" aria-live="polite">{added ? c.added : ''}</p>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div className="mt-48 pt-48 border-t border-hairline">
                  <h2 className="text-heading-sm font-semibold text-charcoal mb-20">{c.details}</h2>
                  <ul className="space-y-12">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-12">
                        <span className="bk-feature-marker" aria-hidden="true" />
                        <span className="text-body-sm text-smoke">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {(hasMeaningfulConditioning(productLabel(product, locale).conditioning) || productLabel(product, locale).delivery) && (
                <div className="mt-40 pt-40 border-t border-hairline">
                  <h2 className="sr-only">{c.details}</h2>
                  <dl className="grid gap-16 sm:grid-cols-2">
                    {hasMeaningfulConditioning(productLabel(product, locale).conditioning) && (
                      <div>
                        <dt className="text-body-sm font-semibold text-charcoal">{c.conditioning}</dt>
                        <dd className="text-body-sm text-smoke mt-4">{productLabel(product, locale).conditioning}</dd>
                      </div>
                    )}
                    {productLabel(product, locale).delivery && (
                      <div>
                        <dt className="text-body-sm font-semibold text-charcoal">{c.delivery}</dt>
                        <dd className="text-body-sm text-smoke mt-4">{productLabel(product, locale).delivery}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              )}

              {/* Specs */}
              {(product.humidity || product.calorificValue || product.origin) && (
                <div className="mt-40 pt-40 border-t border-hairline">
                  <h2 className="text-heading-sm font-semibold text-charcoal mb-20">{c.specifications}</h2>
                  <dl className="space-y-16">
                    {product.humidity && (
                      <div>
                        <dt className="text-body-sm font-semibold text-charcoal">{c.humidity}</dt>
                        <dd className="text-body-sm text-smoke mt-4">{product.humidity}</dd>
                      </div>
                    )}
                    {product.calorificValue && (
                      <div>
                        <dt className="text-body-sm font-semibold text-charcoal">{c.calorific}</dt>
                        <dd className="text-body-sm text-smoke mt-4">{product.calorificValue}</dd>
                      </div>
                    )}
                    {product.origin && (
                      <div>
                        <dt className="text-body-sm font-semibold text-charcoal">{c.origin}</dt>
                        <dd className="text-body-sm text-smoke mt-4">{product.origin}</dd>
                      </div>
                    )}
                    {hasMeaningfulConditioning(productLabel(product, locale).conditioning) && (
                      <div>
                        <dt className="text-body-sm font-semibold text-charcoal">{c.conditioning}</dt>
                        <dd className="text-body-sm text-smoke mt-4">{productLabel(product, locale).conditioning}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              )}
            </div>
          </div>

          <section className="bk-product-insight" aria-labelledby="product-insight-title">
            <div className="bk-product-section-heading">
              <p className="bk-eyebrow">{productReviewCopy.eyebrow}</p>
              <h2 id="product-insight-title">{productReviewCopy.title}</h2>
              <p>{productReviewCopy.intro}</p>
            </div>
            <div className="bk-product-insight-grid">
              {productReviewCopy.items.map(([title, text]) => (
                <article key={title} className="bk-product-insight-card">
                  <span aria-hidden="true">•</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="bk-product-reviews" aria-labelledby="product-reviews-title">
            <div className="bk-product-section-heading">
              <p className="bk-eyebrow">{reviewsCopy.eyebrow}</p>
              <h2 id="product-reviews-title">{reviewsCopy.title}</h2>
            </div>
            {productReviews.length > 0 ? (
              <div className="bk-product-review-list">
                {productReviews.map((review, index) => (
                  <article key={`${review.author || 'review'}-${index}`} className="bk-product-review-card">
                    <div className="bk-product-review-meta">
                      {review.rating !== undefined && <span aria-label={`${review.rating} sur 5`}>{'★'.repeat(Math.floor(review.rating))}{review.rating % 1 ? '½' : ''}</span>}
                      <span>{review.label}</span>
                    </div>
                    {review.text && <p>« {review.text} »</p>}
                    <footer>{review.author || 'Source externe'}{review.date ? ` · ${review.date}` : ''}</footer>
                  </article>
                ))}
              </div>
            ) : (
              <p className="bk-product-reviews-empty">{reviewsCopy.empty}</p>
            )}
          </section>

          <section className="bk-product-faq" aria-labelledby="product-faq-title">
            <div className="bk-product-section-heading">
              <p className="bk-eyebrow">{faqCopy.eyebrow}</p>
              <h2 id="product-faq-title">{faqCopy.title}</h2>
              <p>{faqCopy.intro}</p>
            </div>
            <div className="bk-product-faq-list">
              {faqCopy.questions.map(([question, answer]) => (
                <details key={question}>
                  <summary>{question}<span aria-hidden="true">+</span></summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </section>

          {relatedProducts.length > 0 && (
            <section className="bk-related-products" aria-labelledby="related-products-title">
              <div className="bk-product-section-heading bk-related-heading">
                <div>
                  <p className="bk-eyebrow">{ui.product.relatedEyebrow}</p>
                  <h2 id="related-products-title">{ui.product.relatedTitle}</h2>
                </div>
                <Link href={`/boutique?cat=${encodeURIComponent(product.category)}`} className="bk-text-link">
                  {ui.product.viewCategory} <span aria-hidden="true">↗</span>
                </Link>
              </div>
              <div className="bk-related-scroller">
                {relatedProducts.map((relatedProduct) => <ProductCard key={relatedProduct.id} product={relatedProduct} />)}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
