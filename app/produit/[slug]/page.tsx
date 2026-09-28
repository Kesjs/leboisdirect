'use client'

import { useState } from 'react'
import { use } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import { products } from '@/data/products'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/lib/cart-context'
import { useI18n } from '@/lib/i18n-context'
import { commerceCopy } from '@/data/commerce-copy'
import { categoryLabels, productLabel } from '@/data/product-labels'

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const product = products.find((p) => p.slug === slug)

  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0]?.id || '')
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const { addItem } = useCart()
  const { locale } = useI18n()
  const c = commerceCopy[locale]

  if (!product) {
    notFound()
  }

  const currentVariant = product.variants?.find((v) => v.id === selectedVariant)
  const currentPrice = currentVariant?.price || product.price

  const handleAddToCart = () => {
    addItem(product, quantity, selectedVariant || undefined)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 2200)
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
                Accueil
              </Link>
              <span className="text-ash">/</span>
              <Link href="/boutique" className="text-smoke hover:text-braise transition-colors">
                Boutique
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
                  />
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
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <p className="bk-eyebrow" style={{ color: 'var(--bk-accent)' }}>
                {categoryLabels[locale][product.category]}
              </p>

              <h1 className="text-heading-lg md:text-display font-semibold text-charcoal mb-20 tracking-tight leading-tight">
                {productLabel(product, locale).name}
              </h1>

              {product.species && (
                <p className="text-body text-smoke mb-16 capitalize">
                  Essence : {product.species === 'chene' && 'Chêne'}
                  {product.species === 'hetre' && 'Hêtre'}
                  {product.species === 'charme' && 'Charme'}
                </p>
              )}

              <p className="text-body-lg text-smoke mb-16 leading-relaxed">{product.description}</p>
              <p className="text-body-sm text-ash mb-32">{product.conditioning ? `${c.conditioning} : ${productLabel(product, locale).conditioning}` : ''}</p>

              <div className="mb-40 pb-40 border-b border-hairline">
                <div className="text-[48px] font-semibold text-charcoal tracking-tight mb-8">
                  {formatPrice(currentPrice)}
                </div>
                <p className="text-body-sm text-ash">{product.deliveryInfo}</p>
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
                        <div className="font-semibold">{variant.volume} stère{variant.volume && variant.volume > 1 ? 's' : ''}</div>
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
              <Button size="lg" className="w-full mb-16" onClick={handleAddToCart}>
                {added ? c.added : `${c.add} — ${formatPrice(currentPrice * quantity)}`}
              </Button>
              <p className="text-caption text-ash text-center" aria-live="polite">{added ? c.added : ''}</p>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div className="mt-48 pt-48 border-t border-hairline">
                  <h2 className="text-heading-sm font-semibold text-charcoal mb-20">{c.details}</h2>
                  <ul className="space-y-12">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-12">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          className="flex-shrink-0 mt-2"
                        >
                          <circle cx="10" cy="10" r="10" fill="#B85C3A" opacity="0.1" />
                          <path
                            d="M6 10l2.5 2.5L14 7"
                            stroke="#B85C3A"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-body-sm text-smoke">{feature}</span>
                      </li>
                    ))}
                  </ul>
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
                    {product.conditioning && (
                      <div>
                        <dt className="text-body-sm font-semibold text-charcoal">{c.conditioning}</dt>
                        <dd className="text-body-sm text-smoke mt-4">{product.conditioning}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
