'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/data/products'
import { categoryLabel, productLabel } from '@/data/product-labels'
import { bravikoCopy } from '@/data/braviko-copy'
import { useI18n } from '@/lib/i18n-context'
import { useCart } from '@/lib/cart-context'
import { useToast } from '@/components/Toast'

export default function ProductCard({ product }: { product: Product }) {
  const fallbackImage = '/images/photorealistic-perspective-wood-logs.jpg'
  const { locale } = useI18n()
  const { addItem } = useCart()
  const { showToast } = useToast()
  const [added, setAdded] = useState(false)
  const [animating, setAnimating] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [displayImage, setDisplayImage] = useState(product.image)
  const timer = useRef<ReturnType<typeof setTimeout>>()
  const copy = bravikoCopy[locale]
  const label = productLabel(product, locale)
  const variant = product.variants?.[0]
  const price = new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(variant?.price ?? product.price)
  const embeddedWatermarkProducts = new Set([
    'cheminee-electrique-purline-verre-noir-2000w',
    'insert-bois-invicta-p947044-10-kw',
    'ofyr-wood-storage-corten-100-range-buches',
  ])
  useEffect(() => () => clearTimeout(timer.current), [])
  useEffect(() => {
    setDisplayImage(product.image || fallbackImage)
    setImageLoaded(false)
  }, [product.image])
  const add = () => {
    addItem(product, 1, variant?.id)
    showToast({ title: copy.added, description: `${label.name} a été ajouté à votre panier.` })
    setAdded(true)
    setAnimating(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setAdded(false), 2200)
    window.setTimeout(() => setAnimating(false), 650)
  }
  const handleImageError = () => {
    if (displayImage !== fallbackImage) {
      setDisplayImage(fallbackImage)
      setImageLoaded(false)
    }
  }
  return (
    <article className="bk-product">
      <Link href={'/produit/' + product.slug} className="bk-product-link">
        <div className={'bk-product-photo' + (imageLoaded ? ' is-loaded' : '')}>
          {!imageLoaded && <span className="bk-image-placeholder" aria-hidden="true" />}
          <Image onLoad={() => setImageLoaded(true)} onError={handleImageError} src={displayImage} alt={label.name} fill sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw" className="bk-image bk-product-front" quality={70} />
          {!embeddedWatermarkProducts.has(product.slug) && !displayImage.includes('/watermarked-') && <span className="bk-watermark" aria-hidden="true">braviko</span>}
          <span className="bk-product-view">{copy.details} <span aria-hidden="true">↗</span></span>
        </div>
        <p className="bk-product-category">{categoryLabel(product.category, locale)}</p>
        <h3>{label.name}</h3>
        <p className="bk-product-excerpt">{label.description}</p>
      </Link>
      <div className="bk-product-purchase">
        <div><span className="bk-product-price">{price}</span><p>{label.delivery}</p></div>
        <button className={'bk-product-add' + (added ? ' is-added' : '') + (animating ? ' is-animating' : '')} type="button" onClick={add} aria-label={copy.add + ' : ' + label.name} title={copy.add}>
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M3 5h2l2.1 10.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 8H6" /><circle cx="10" cy="20" r="1.2" /><circle cx="18" cy="20" r="1.2" />{added && <path className="bk-cart-check" d="m9 11 2 2 4-4" strokeWidth="2" />}</svg>
        </button>
      </div>
      <span className="bk-product-feedback" role="status">{added ? copy.added : ''}</span>
    </article>
  )
}
