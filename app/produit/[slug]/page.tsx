'use client'

import { useEffect, useRef, useState, use } from 'react'
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
import { getProductReviews } from '@/data/product-reviews'
import { getProductVideo, getYouTubeEmbedUrl, getYouTubeThumbnail } from '@/data/product-videos'
import { getProductRichSpec } from '@/data/product-rich-specs'
import {
  BRAVIKO_ABOUT_CONTENT,
  resolveProductContent,
  type BenefitIconName,
} from '@/data/product-category-content'
import { computeDynamicUnitPriceLabel } from '@/lib/unit-price'
import { PaymentBadgesRow, SecureShieldIcon, DeliveryTruckIcon } from '@/components/PaymentLogos'

function BenefitIcon({ name }: { name: BenefitIconName }) {
  switch (name) {
    case 'truck':
      return <DeliveryTruckIcon className="w-[18px] h-[18px]" />
    case 'humidity':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <path d="M12 3s6 6.7 6 11a6 6 0 1 1-12 0c0-4.3 6-11 6-11Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'flame':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <path d="M12 2.8c2.2 3 4.8 5.3 4.8 9.2a4.8 4.8 0 1 1-9.6 0c0-1.9.7-3.6 1.8-5.1-.1 1.7.8 2.8 1.9 3.2-.5-2.1.2-4.8 1.1-7.3Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'leaf':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <path d="M19 5c-7 0-12 4.3-12 11 0 1.1.2 2.1.6 3 6.7 0 11.4-5 11.4-14Z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6.5 19.5 14 12" strokeLinecap="round" />
        </svg>
      )
    case 'wrench':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'shield':
    default:
      return <SecureShieldIcon className="w-[18px] h-[18px]" />
  }
}

function StarRatingRow({ rating, size = 15 }: { rating: number; size?: number }) {
  const filledCount = Math.max(0, Math.min(5, Math.round(rating)))
  return (
    <span className="inline-flex items-center gap-[2px]" aria-label={`${filledCount} su 5`}>
      {Array.from({ length: 5 }, (_, index) => {
        const filled = index < filledCount
        return (
          <svg
            key={index}
            width={size}
            height={size}
            viewBox="0 0 20 20"
            fill={filled ? '#FBBF24' : 'none'}
            stroke="#B45309"
            strokeWidth="1.4"
            aria-hidden="true"
          >
            <path d="M10 2.5l2.32 4.7 5.18.75-3.75 3.65.88 5.16L10 14.32l-4.63 2.44.88-5.16L2.5 7.95l5.18-.75L10 2.5z" />
          </svg>
        )
      })}
    </span>
  )
}

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [product, setProduct] = useState<Product | null>(null)
  const [catalogProducts, setCatalogProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [isZoomOpen, setIsZoomOpen] = useState(false)
  const [containBySrc, setContainBySrc] = useState<Record<string, boolean>>({})
  const [showStickyBar, setShowStickyBar] = useState(false)
  const buyActionsRef = useRef<HTMLDivElement>(null)

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

  // Barre d'achat mobile : visible seulement quand les vrais boutons sont hors écran
  useEffect(() => {
    const target = buyActionsRef.current
    if (!target || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyBar(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [product])

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
  const productReviews = getProductReviews(product.slug)
  const reviewCount = productReviews.length
  const averageRating =
    reviewCount > 0
      ? productReviews.reduce((sum, review) => sum + (review.rating ?? 5), 0) / reviewCount
      : 0
  const formattedRating = averageRating.toFixed(1).replace('.', ',')
  const dynamicUnitPriceLabel = computeDynamicUnitPriceLabel(
    product,
    currentVariant,
    currentPrice,
    richSpec,
  )
  const localizedProduct = productLabel(product, locale)
  const resolvedContent = resolveProductContent(product, richSpec)

  const recordImageAspect = (src: string, img: HTMLImageElement) => {
    if (!img.naturalWidth || !img.naturalHeight) return
    const shouldContain = img.naturalWidth / img.naturalHeight < 1.15
    setContainBySrc((prev) => (prev[src] === shouldContain ? prev : { ...prev, [src]: shouldContain }))
  }

  const normalizeSpecKey = (label: string) => {
    const clean = label.toLowerCase().trim()
    if (clean.startsWith('marca')) return 'marca'
    if (clean === 'combustibile' || clean === 'energia') return 'combustibile'
    if (clean.startsWith('piastra')) return 'piastra'
    if (clean.startsWith('sku')) return 'sku'
    if (clean.startsWith('categoria')) return 'categoria'
    if (clean.startsWith('potenza')) return 'potenza'
    if (clean.startsWith('lunghezza')) return 'lunghezza'
    if (clean.startsWith('diametro')) return 'diametro'
    if (clean.startsWith('umidit')) return 'umidita'
    if (clean.startsWith('garanzia')) return 'garanzia'
    if (clean.startsWith('uscita') || clean.startsWith('scarico')) return 'uscita_fumi'
    return clean.replace(/[^a-z0-9]/g, '')
  }

  const parsedFeatureSpecs = product.features
    .map((line) => {
      const separator = line.indexOf(':')
      return separator > 0
        ? { label: line.slice(0, separator).trim(), value: line.slice(separator + 1).trim() }
        : null
    })
    .filter((item): item is { label: string; value: string } => Boolean(item))

  const mergedSpecs: Array<{ label: string; value: string }> = []
  const seenSpecKeys = new Set<string>()
  for (const spec of [...(richSpec?.detailedSpecs || []), ...parsedFeatureSpecs]) {
    const key = normalizeSpecKey(spec.label)
    if (key === 'categoria' || seenSpecKeys.has(key)) continue
    seenSpecKeys.add(key)
    mergedSpecs.push(spec)
  }

  const keyPoints = mergedSpecs.slice(0, 4)

  const rawLongDesc = product.longDescription || ''
  const isKeyValueDump = rawLongDesc
    .split('\n')
    .filter((line) => line.trim().length > 0)
    .every((line) => /^[^:]{2,40}:\s+\S/.test(line.trim()))

  const editorialSource = !isKeyValueDump && rawLongDesc.trim()
    ? rawLongDesc
    : product.description || localizedProduct.description

  const descriptionParagraphs = editorialSource
    .split(/\n\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)

  const summaryHighlights = [
    richSpec?.unitPriceLabel,
    ...mergedSpecs.slice(0, 3).map((s) => `${s.label}: ${s.value}`),
  ].filter((item, idx, arr): item is string => Boolean(item) && arr.indexOf(item) === idx).slice(0, 4)

  const statusText = (richSpec?.badgeText || 'Disponibile — Spedizione rapida').replace(/^●\s*/, '')

  const handleAddToCart = () => {
    addItem(product, quantity, selectedVariant || undefined)
    showToast({
      title: 'Aggiunto al carrello',
      description: `${localizedProduct.name} è stato aggiunto al carrello.`,
    })
    setAdded(true)
    window.setTimeout(() => setAdded(false), 2400)
  }

  const handleBuyNow = () => {
    addItem(product, quantity, selectedVariant || undefined)
    router.push('/checkout')
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://braviko.fr'
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: localizedProduct.name,
    description: editorialSource.replace(/\s+/g, ' ').trim(),
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
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${baseUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'Negozio', item: `${baseUrl}/boutique` },
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
            <nav className="flex items-center gap-[8px] text-[12px] text-[#64685F] flex-wrap" aria-label="Percorso di navigazione">
              <Link href="/" className="hover:text-[#995033] transition-colors">
                Home
              </Link>
              <span className="text-[#A3A3A3]" aria-hidden="true">/</span>
              <Link href="/boutique" className="hover:text-[#995033] transition-colors">
                Negozio
              </Link>
              <span className="text-[#A3A3A3]" aria-hidden="true">/</span>
              <span className="text-[#252823] font-medium truncate max-w-[260px] sm:max-w-[440px]">
                {localizedProduct.name}
              </span>
            </nav>
          </div>
        </div>

        {/* HERO PRODOTTO : 2 colonne bilanciate */}
        <div className="container-custom pt-[28px] lg:pt-[36px] pb-[48px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[28px] lg:gap-[40px] items-start">
            <div className="lg:col-span-7 lg:sticky lg:top-[104px] min-w-0 flex flex-col gap-[16px]">
              <div className="flex flex-col-reverse sm:flex-row gap-[12px] sm:gap-[16px] items-start">
                {galleryItems.length > 1 && (
                  <div
                    className="flex flex-row sm:flex-col gap-[8px] sm:gap-[10px] w-full sm:w-[88px] shrink-0 overflow-x-auto sm:overflow-y-auto sm:max-h-[480px] pb-[4px] sm:pb-0 scrollbar-hide"
                    aria-label="Galleria immagini del prodotto"
                  >
                    {galleryItems.map((item, idx) => {
                      const thumbContain = containBySrc[item.src]
                      const isActive = selectedMediaIndex === idx
                      return (
                        <button
                          key={`${item.src}-${idx}`}
                          type="button"
                          onClick={() => setSelectedMediaIndex(idx)}
                          aria-label={item.type === 'video' ? 'Riproduci il video del prodotto' : `Mostra foto ${idx + 1}`}
                          aria-pressed={isActive}
                          className={`relative w-[68px] h-[68px] sm:w-[88px] sm:h-[88px] rounded-[8px] overflow-hidden shrink-0 bg-white transition-all ${
                            isActive
                              ? 'border-2 border-[#995033] ring-2 ring-[#995033]/15 opacity-100'
                              : 'border border-[#DEDFD6] opacity-75 hover:opacity-100 hover:border-[#64685F]'
                          }`}
                        >
                          <Image
                            src={item.src}
                            alt={`${localizedProduct.name} — vista ${idx + 1}`}
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
                        aria-label="Ingrandisci immagine"
                      >
                        <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                          <circle cx="8.5" cy="8.5" r="5.5" />
                          <path d="m13 13 4 4M8.5 6v5M6 8.5h5" strokeLinecap="round" />
                        </svg>
                        <span>Ingrandisci</span>
                      </button>
                    </>
                  ) : null}
                </div>
              </div>

              {keyPoints.length > 0 && (
                <div className="rounded-[8px] border border-[#DEDFD6] bg-white overflow-hidden">
                  <div className="flex items-center justify-between gap-[12px] px-[16px] py-[10px] border-b border-[#DEDFD6] bg-[#FAF9F6]">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#64685F]">
                      Punti chiave · {categoryLabel(product.category, locale)}
                    </span>
                    <a
                      href="#details-fiche"
                      className="text-[12px] font-medium text-[#995033] hover:underline underline-offset-4 whitespace-nowrap"
                    >
                      Scheda completa
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

                {reviewCount > 0 && (
                  <div className="mt-[10px]">
                    <a
                      href="#testimonianze-clienti"
                      className="inline-flex items-center gap-[8px] px-[10px] py-[6px] rounded-[6px] bg-white border border-[#DEDFD6] hover:border-[#FBBF24] transition-colors"
                    >
                      <StarRatingRow rating={averageRating} size={16} />
                      <strong className="text-[13px] font-semibold text-[#252823] tabular-nums">
                        {formattedRating}/5
                      </strong>
                      <span className="text-[12px] text-[#64685F]">
                        · {reviewCount} testimonianze clienti
                      </span>
                    </a>
                  </div>
                )}

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
                  Spedizione gratuita in tutta Italia · Pagamento sicuro Stripe o bonifico SEPA · Reso 14 giorni
                </p>
              </div>

              <div className="p-[18px] sm:p-[20px] rounded-[8px] bg-white border border-[#DEDFD6]">
                <div className="flex items-baseline gap-[10px] flex-wrap">
                  <span className="text-[34px] sm:text-[42px] font-bold leading-none text-[#252823] tracking-tight tabular-nums">
                    {formatPrice(currentPrice)}
                  </span>
                  <span className="text-[12px] font-semibold text-[#995033] tracking-[0.08em] uppercase">
                    IVA incl.
                  </span>
                </div>
                <p className="mt-[10px] inline-flex items-center gap-[6px] px-[10px] py-[5px] rounded-[4px] bg-[#EEEEE7] border border-[#DEDFD6] text-[13px] font-semibold text-[#34483A] tabular-nums">
                  {dynamicUnitPriceLabel}
                </p>
                <p className="text-[12px] text-[#64685F] mt-[8px] tabular-nums">
                  {quantity > 1
                    ? `Totale per ${quantity} unità: ${formatPrice(currentPrice * quantity)} IVA inclusa`
                    : 'IVA inclusa · Spedizione in tutta Italia'}
                </p>
              </div>

              <p className="text-[14px] sm:text-[15px] text-[#64685F] leading-[1.6]">
                {product.description || localizedProduct.description}
              </p>

              {product.variants && product.variants.length > 1 && (
                <div>
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#64685F] mb-[8px]">
                    Formato
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
                            {v.label || (v.volume ? `${v.volume} ${v.volume > 1 ? 'steri' : 'stero'}` : 'Formato')}
                          </div>
                          <div className={`text-[12px] mt-[4px] tabular-nums ${active ? 'text-white/80' : 'text-[#64685F]'}`}>
                            {formatPrice(v.price)} IVA incl.
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Quantità e azioni */}
              <div className="flex flex-col gap-[12px] pt-[4px]">
                <div className="flex items-center gap-[12px]">
                  <span className="text-[13px] font-medium text-[#64685F] whitespace-nowrap">Quantità</span>
                  <div className="inline-flex items-center rounded-[4px] border border-[#DEDFD6] bg-white">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-[44px] h-[44px] flex items-center justify-center hover:bg-[#EEEEE7] text-[#252823] transition-colors"
                      aria-label="Diminuisci quantità"
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
                      aria-label="Aumenta quantità"
                    >
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                        <path d="M8 3v10M3 8h10" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div ref={buyActionsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-[10px]">
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
                    <span>{added ? 'Aggiunto al carrello' : 'Aggiungi al carrello'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="min-h-[48px] w-full px-[16px] py-[12px] rounded-[4px] bg-[#252823] hover:bg-[#995033] text-white font-medium text-[14px] transition-colors active:translate-y-[1px] flex items-center justify-center gap-[8px] tabular-nums"
                  >
                    <span>Acquista ora — {formatPrice(currentPrice * quantity)}</span>
                  </button>
                </div>
              </div>

              {resolvedContent.quickBenefits.length > 0 && (
                <div
                  className="grid grid-cols-2 gap-[8px]"
                  aria-label="Vantaggi principali"
                >
                  {resolvedContent.quickBenefits.map((benefit) => (
                    <div
                      key={benefit.label}
                      className="flex items-start gap-[10px] rounded-[8px] border border-[#DEDFD6] bg-white p-[12px]"
                    >
                      <span className="p-[6px] rounded-[4px] bg-[#FAF9F6] border border-[#DEDFD6] text-[#995033] shrink-0">
                        <BenefitIcon name={benefit.icon} />
                      </span>
                      <div className="min-w-0">
                        <strong className="block text-[12px] font-semibold text-[#252823] leading-snug">
                          {benefit.label}
                        </strong>
                        <span className="block text-[11px] text-[#64685F] mt-[2px] leading-snug">
                          {benefit.detail}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="rounded-[8px] p-[16px] bg-[#EEEEE7] border border-[#DEDFD6] text-[12px] flex flex-col gap-[12px] mt-[4px]">
                <div className="flex items-start gap-[12px]">
                  <span className="p-[8px] rounded-[4px] bg-white border border-[#DEDFD6] text-[#995033] shrink-0">
                    <DeliveryTruckIcon className="w-[20px] h-[20px]" />
                  </span>
                  <div className="min-w-0">
                    <strong className="block font-semibold text-[#252823] text-[13px]">
                      {resolvedContent.delivery.delay}
                    </strong>
                    <p className="text-[#64685F] mt-[4px] leading-[1.5]">
                      {resolvedContent.delivery.headline}
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
                        Pagamento sicuro
                      </strong>
                      <PaymentBadgesRow className="flex items-center gap-[6px]" />
                    </div>
                    <p className="text-[#64685F] mt-[4px] leading-[1.5]">
                      Carta bancaria, Visa, Mastercard o bonifico SEPA con crittografia SSL.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-[10px] border-t border-[#DEDFD6] pt-[12px] text-[#64685F]">
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-[#34483A] shrink-0" aria-hidden="true">
                    <path d="m3.5 8.5 3 3 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{resolvedContent.warranty} · Assistenza clienti in italiano</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 1. DESCRIZIONE, PERCHÉ SCEGLIERE & SPECIFICHE TECNICHE (sempre visibile) */}
        <section id="details-fiche" className="container-custom pt-[16px] scroll-mt-[110px]" aria-labelledby="specs-section-title">
          <div className="rounded-[12px] bg-white border border-[#DEDFD6] p-[20px] sm:p-[32px]">
            <div className="pb-[18px] border-b border-[#DEDFD6]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#995033]">
                Scheda tecnica e vantaggi
              </p>
              <h2 id="specs-section-title" className="mt-[4px] text-[22px] sm:text-[26px] font-semibold text-[#252823] tracking-tight">
                Descrizione, benefici e caratteristiche
              </h2>
            </div>

            <div className="pt-[24px] grid grid-cols-1 lg:grid-cols-12 gap-[28px] lg:gap-[40px] items-start">
              <div className={`${mergedSpecs.length > 0 ? 'lg:col-span-5' : 'lg:col-span-12'} min-w-0`}>
                <h3 className="text-[11px] font-semibold text-[#995033] uppercase tracking-[0.12em] mb-[12px]">
                  Descrizione
                </h3>
                <div className="space-y-[12px] max-w-[60ch] text-[#3F433B] text-[14px] sm:text-[15px] leading-[1.7]">
                  {descriptionParagraphs.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                <div className="mt-[24px] pt-[20px] border-t border-[#DEDFD6]">
                  <h3 className="text-[11px] font-semibold text-[#34483A] uppercase tracking-[0.12em] mb-[12px]">
                    {resolvedContent.whyChooseTitle}
                  </h3>
                  <ul className="space-y-[10px]">
                    {resolvedContent.whyChoosePoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-[10px] text-[13px] sm:text-[14px] text-[#252823] leading-[1.55]">
                        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.9" className="text-[#995033] shrink-0 mt-[4px]" aria-hidden="true">
                          <path d="m3.5 8.5 3 3 6-6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {summaryHighlights.length > 0 && (
                  <div className="mt-[22px] pt-[18px] border-t border-[#DEDFD6]">
                    <h4 className="text-[11px] font-semibold text-[#64685F] uppercase tracking-[0.12em] mb-[10px]">
                      In sintesi
                    </h4>
                    <ul className="space-y-[8px]">
                      {summaryHighlights.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-[10px] text-[13px] text-[#252823] leading-[1.5]">
                          <span className="w-[14px] h-[1px] bg-[#995033] shrink-0 mt-[10px]" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {mergedSpecs.length > 0 && (
                <div className="lg:col-span-7 min-w-0">
                  <h3 className="text-[11px] font-semibold text-[#64685F] uppercase tracking-[0.12em] mb-[12px]">
                    Specifiche tecniche
                  </h3>
                  <div className="rounded-[8px] border border-[#DEDFD6] overflow-hidden bg-white">
                    <table className="w-full text-left text-[13px]">
                      <tbody>
                        {mergedSpecs.map((spec, i) => (
                          <tr
                            key={`${spec.label}-${i}`}
                            className={i % 2 === 0 ? 'bg-[#FAF9F6]' : 'bg-white'}
                          >
                            <td className="py-[10px] px-[16px] font-medium text-[#252823] w-[42%] border-b border-[#DEDFD6] align-top">
                              {spec.label}
                            </td>
                            <td className="py-[10px] px-[16px] text-[#52564E] border-b border-[#DEDFD6] tabular-nums">
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
          </div>
        </section>

        {/* 2. CONDIZIONI, CONSIGLI D'USO E CONSERVAZIONE (sempre visibile) */}
        <section id="condizioni-uso" className="container-custom pt-[28px] sm:pt-[36px] scroll-mt-[110px]" aria-labelledby="usage-section-title">
          <div className="rounded-[12px] bg-white border border-[#DEDFD6] p-[20px] sm:p-[32px]">
            <div className="pb-[18px] border-b border-[#DEDFD6]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#995033]">
                Guida pratica
              </p>
              <h2 id="usage-section-title" className="mt-[4px] text-[22px] sm:text-[26px] font-semibold text-[#252823] tracking-tight">
                Condizioni e consigli d’uso
              </h2>
            </div>

            <div className="pt-[24px] grid grid-cols-1 lg:grid-cols-12 gap-[24px] lg:gap-[36px] items-start">
              <div className="lg:col-span-7 min-w-0 divide-y divide-[#DEDFD6]">
                {resolvedContent.usageTips.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-[14px] py-[14px] first:pt-0 last:pb-0">
                    <span className="text-[12px] font-semibold tabular-nums text-[#995033] pt-[2px] shrink-0">
                      0{idx + 1}.
                    </span>
                    <p className="text-[14px] sm:text-[15px] text-[#252823] leading-[1.65]">
                      {tip}
                    </p>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-5 min-w-0 flex flex-col gap-[14px]">
                <div className="p-[18px] rounded-[8px] bg-[#EEEEE7] border border-[#DEDFD6]">
                  <h3 className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#34483A] mb-[6px]">
                    {resolvedContent.usageConditionTitle}
                  </h3>
                  <p className="text-[13px] leading-[1.65] text-[#252823]">
                    {resolvedContent.usageConditionNote}
                  </p>
                </div>

                <div className="p-[18px] rounded-[8px] bg-[#FAF9F6] border border-[#DEDFD6]">
                  <h3 className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#252823] mb-[6px]">
                    Conservazione e stoccaggio
                  </h3>
                  <p className="text-[13px] leading-[1.65] text-[#52564E]">
                    {resolvedContent.storageAdvice}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. CONSEGNA, ACCESSO CORRIERE & GARANZIE (sempre visibile) */}
        <section id="consegna-garanzie" className="container-custom pt-[28px] sm:pt-[36px] scroll-mt-[110px]" aria-labelledby="delivery-section-title">
          <div className="rounded-[12px] bg-white border border-[#DEDFD6] p-[20px] sm:p-[32px]">
            <div className="pb-[18px] border-b border-[#DEDFD6] flex flex-col sm:flex-row sm:items-end sm:justify-between gap-[10px]">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#995033]">
                  Spedizione e tutela acquirente
                </p>
                <h2 id="delivery-section-title" className="mt-[4px] text-[22px] sm:text-[26px] font-semibold text-[#252823] tracking-tight">
                  Consegna, accesso e garanzie
                </h2>
              </div>
              <span className="text-[13px] font-medium text-[#34483A]">
                {resolvedContent.delivery.delay}
              </span>
            </div>

            <div className="pt-[22px] space-y-[20px]">
              <div className="max-w-[74ch]">
                <p className="font-semibold text-[15px] text-[#252823]">
                  {resolvedContent.delivery.headline}
                </p>
                <p className="mt-[6px] text-[14px] text-[#52564E] leading-[1.65]">
                  {resolvedContent.delivery.carrierNotice}
                </p>
              </div>

              {!resolvedContent.isTestProduct && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-[12px]">
                  {resolvedContent.delivery.type === 'parcel' ? (
                    <>
                      <div className="p-[16px] rounded-[8px] bg-[#FAF9F6] border border-[#DEDFD6]">
                        <span className="font-semibold text-[#252823] text-[13px] block mb-[4px]">01. Imballo protetto</span>
                        <p className="text-[12px] text-[#52564E] leading-[1.55]">Preparazione entro 48 ore lavorative con protezione rinforzata antiurto.</p>
                      </div>
                      <div className="p-[16px] rounded-[8px] bg-[#FAF9F6] border border-[#DEDFD6]">
                        <span className="font-semibold text-[#252823] text-[13px] block mb-[4px]">02. Tracciamento corriere</span>
                        <p className="text-[12px] text-[#52564E] leading-[1.55]">Codice di tracking inviato via email e SMS alla partenza dal magazzino.</p>
                      </div>
                      <div className="p-[16px] rounded-[8px] bg-[#FAF9F6] border border-[#DEDFD6]">
                        <span className="font-semibold text-[#252823] text-[13px] block mb-[4px]">03. Recapito gratuito</span>
                        <p className="text-[12px] text-[#52564E] leading-[1.55]">Consegna inclusa in tutta Italia in 3–5 giorni lavorativi senza supplementi.</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p-[16px] rounded-[8px] bg-[#FAF9F6] border border-[#DEDFD6]">
                        <span className="font-semibold text-[#252823] text-[13px] block mb-[4px]">01. Appuntamento preventivo</span>
                        <p className="text-[12px] text-[#52564E] leading-[1.55]">Il trasportatore concorda il giorno esatto di passaggio telefonicamente o via SMS.</p>
                      </div>
                      <div className="p-[16px] rounded-[8px] bg-[#FAF9F6] border border-[#DEDFD6]">
                        <span className="font-semibold text-[#252823] text-[13px] block mb-[4px]">02. Accesso veicolo</span>
                        <p className="text-[12px] text-[#52564E] leading-[1.55]">Mezzo con sponda idraulica: la via di accesso deve risultare carrabile e libera.</p>
                      </div>
                      <div className="p-[16px] rounded-[8px] bg-[#FAF9F6] border border-[#DEDFD6]">
                        <span className="font-semibold text-[#252823] text-[13px] block mb-[4px]">03. Scarico sicuro</span>
                        <p className="text-[12px] text-[#52564E] leading-[1.55]">Movimentazione con transpallet su pavimento piano e stabile (asfalto o cemento).</p>
                      </div>
                    </>
                  )}
                </div>
              )}

              <div className="pt-[18px] border-t border-[#DEDFD6] grid grid-cols-1 md:grid-cols-3 gap-[16px]">
                <div>
                  <strong className="block text-[13px] font-semibold text-[#252823]">Controllo pre-partenza</strong>
                  <p className="mt-[4px] text-[12px] text-[#52564E] leading-[1.55]">Verifica di imballo, dati tecnici e dotazioni prima dell’affidamento al vettore.</p>
                </div>
                <div>
                  <strong className="block text-[13px] font-semibold text-[#252823]">Garanzia inclusa</strong>
                  <p className="mt-[4px] text-[12px] text-[#52564E] leading-[1.55]">{resolvedContent.warranty}. Garanzia legale di conformità 2 anni sui prodotti nuovi.</p>
                </div>
                <div>
                  <strong className="block text-[13px] font-semibold text-[#252823]">Diritto di recesso 14 giorni</strong>
                  <p className="mt-[4px] text-[12px] text-[#52564E] leading-[1.55]">Reso entro 14 giorni di calendario su articolo integro con assistenza su contact@braviko.fr.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. CHI SIAMO · IMPEGNI BRAVIKO (sempre visibile) */}
        <section id="chi-siamo" className="container-custom pt-[28px] sm:pt-[36px] scroll-mt-[110px]" aria-labelledby="about-braviko-title">
          <div className="rounded-[12px] bg-[#252823] text-[#FAF9F6] p-[24px] sm:p-[36px] grid grid-cols-1 lg:grid-cols-12 gap-[28px] lg:gap-[40px] items-start">
            <div className="lg:col-span-5 min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#E49E7F]">
                {BRAVIKO_ABOUT_CONTENT.eyebrow}
              </p>
              <h2 id="about-braviko-title" className="mt-[8px] text-[22px] sm:text-[28px] font-semibold tracking-tight leading-[1.18] text-white">
                {BRAVIKO_ABOUT_CONTENT.title}
              </h2>
              <p className="mt-[14px] text-[14px] leading-[1.7] text-[#D8D7CE]">
                {BRAVIKO_ABOUT_CONTENT.intro}
              </p>
            </div>

            <div className="lg:col-span-7 min-w-0 divide-y divide-white/15">
              {BRAVIKO_ABOUT_CONTENT.pillars.map((pillar, idx) => (
                <div key={pillar.title} className="py-[14px] first:pt-0 last:pb-0 flex items-start gap-[14px]">
                  <span className="text-[12px] font-semibold tabular-nums text-[#E49E7F] pt-[2px] shrink-0">
                    0{idx + 1}.
                  </span>
                  <div>
                    <h3 className="text-[15px] font-semibold text-white">
                      {pillar.title}
                    </h3>
                    <p className="mt-[4px] text-[13px] leading-[1.6] text-[#D8D7CE]">
                      {pillar.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. MINI-FAQ SUL PRODOTTO (sempre visibile senza accordeon) */}
        {resolvedContent.faqItems.length > 0 && (
          <section id="domande-frequenti" className="container-custom pt-[28px] sm:pt-[36px] scroll-mt-[110px]" aria-labelledby="product-faq-title">
            <div className="rounded-[12px] bg-white border border-[#DEDFD6] p-[20px] sm:p-[32px]">
              <div className="pb-[18px] border-b border-[#DEDFD6] flex flex-col sm:flex-row sm:items-end sm:justify-between gap-[10px]">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#995033]">
                    Risposte rapide
                  </p>
                  <h2 id="product-faq-title" className="mt-[4px] text-[22px] sm:text-[26px] font-semibold text-[#252823] tracking-tight">
                    Domande frequenti sull’articolo
                  </h2>
                </div>
                <Link
                  href="/faq"
                  className="text-[13px] font-medium text-[#995033] hover:underline underline-offset-4 whitespace-nowrap"
                >
                  Tutte le FAQ ↗
                </Link>
              </div>

              <div className="pt-[22px] grid grid-cols-1 md:grid-cols-2 gap-[20px] sm:gap-[28px]">
                {resolvedContent.faqItems.map((faq, idx) => (
                  <div key={idx} className="pb-[18px] border-b border-[#DEDFD6] last:border-b-0 md:[&:nth-last-child(-n+2)]:border-b-0 md:pb-0">
                    <h3 className="text-[15px] font-semibold text-[#252823] leading-snug">
                      {faq.question}
                    </h3>
                    <p className="mt-[8px] text-[13px] sm:text-[14px] text-[#52564E] leading-[1.65]">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {reviewCount > 0 && (
          <section
            id="testimonianze-clienti"
            className="container-custom pt-[40px] sm:pt-[48px] scroll-mt-[110px]"
            aria-labelledby="testimonials-title"
          >
            <div className="rounded-[12px] bg-white border border-[#DEDFD6] p-[20px] sm:p-[28px]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[12px] pb-[18px] border-b border-[#DEDFD6]">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#995033]">
                    Esperienze sull’articolo
                  </p>
                  <h2 id="testimonials-title" className="mt-[4px] text-[20px] sm:text-[24px] font-semibold text-[#252823] tracking-tight">
                    Testimonianze dei clienti
                  </h2>
                </div>
                <div className="inline-flex items-center gap-[8px] self-start sm:self-auto px-[12px] py-[8px] rounded-[6px] bg-[#FAF9F6] border border-[#DEDFD6]">
                  <StarRatingRow rating={averageRating} size={16} />
                  <strong className="text-[14px] font-semibold text-[#252823] tabular-nums">
                    {formattedRating}/5
                  </strong>
                  <span className="text-[12px] text-[#64685F]">
                    ({reviewCount} opinioni)
                  </span>
                </div>
              </div>

              <div
                className={`mt-[18px] grid grid-cols-1 gap-[14px] ${
                  reviewCount === 4 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'
                }`}
              >
                {productReviews.map((rev, i) => (
                  <article
                    key={i}
                    className="p-[16px] sm:p-[18px] rounded-[8px] bg-[#FAF9F6] border border-[#DEDFD6] flex flex-col justify-between gap-[14px]"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-[8px] mb-[10px]">
                        <StarRatingRow rating={rev.rating || 5} size={15} />
                        {rev.label && (
                          <span className="text-[11px] font-medium px-[8px] py-[2px] rounded-[4px] bg-[#EEEEE7] text-[#34483A] border border-[#DEDFD6]">
                            {rev.label}
                          </span>
                        )}
                      </div>
                      <p className="text-[13px] sm:text-[14px] text-[#252823] leading-[1.6]">
                        « {rev.text} »
                      </p>
                    </div>
                    <div className="pt-[10px] border-t border-[#DEDFD6]/70 flex items-center justify-between gap-[8px] text-[12px]">
                      <strong className="font-semibold text-[#252823]">
                        {rev.author}
                      </strong>
                      {rev.city && (
                        <span className="text-[#64685F]">
                          {rev.city}
                        </span>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {relatedProducts.length > 0 && (
          <section className="container-custom pt-[56px]" aria-labelledby="cross-selling-title">
            <div className="mb-[24px]">
              <p className="bk-eyebrow">Completa la tua dotazione</p>
              <h2 id="cross-selling-title" className="text-[26px] sm:text-[34px] font-medium text-[#252823] tracking-tight">
                Della stessa selezione
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px]">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </section>
        )}

      </main>
      <Footer />

      {/* Espace pour que la barre mobile ne cache pas le bas de page */}
      <div className="h-[72px] lg:hidden" aria-hidden="true" />

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
              aria-label="Chiudi ingrandimento"
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

      {/* Barre d'achat collante (mobile uniquement) */}
      <div
        aria-hidden={!showStickyBar}
        className={`lg:hidden fixed inset-x-0 bottom-0 z-40 bg-white border-t border-[#DEDFD6] px-[16px] pt-[10px] flex items-center gap-[12px] transition-transform duration-200 ${
          showStickyBar ? 'translate-y-0' : 'translate-y-full pointer-events-none'
        }`}
        style={{ paddingBottom: 'calc(10px + env(safe-area-inset-bottom, 0px))' }}
      >
        <div className="min-w-0 shrink-0 tabular-nums">
          <div className="text-[18px] font-semibold text-[#252823] leading-tight">
            {formatPrice(currentPrice * quantity)}
          </div>
          <div className="text-[11px] text-[#64685F]">IVA incl.</div>
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          tabIndex={showStickyBar ? 0 : -1}
          className="min-h-[48px] flex-1 px-[16px] rounded-[4px] bg-[#252823] hover:bg-[#995033] text-white font-medium text-[14px] transition-colors active:translate-y-[1px] flex items-center justify-center gap-[8px]"
        >
          {added && (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="m3.5 8.5 3 3 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          <span>{added ? 'Aggiunto al carrello' : 'Aggiungi al carrello'}</span>
        </button>
      </div>
    </>
  )
}
