'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/data/products'
import { categoryLabel, productLabel } from '@/data/product-labels'
import { bravikoCopy } from '@/data/braviko-copy'
import { useI18n } from '@/lib/i18n-context'
import { useCart } from '@/lib/cart-context'

export default function ProductCard({ product }: { product: Product }) {
  const { locale } = useI18n()
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const [animating, setAnimating] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [displayImage, setDisplayImage] = useState(product.image)
  const timer = useRef<ReturnType<typeof setTimeout>>()
  const copy = bravikoCopy[locale]
  const label = productLabel(product, locale)
  const variant = product.variants?.[0]
  const price = new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(variant?.price ?? product.price)
  useEffect(() => () => clearTimeout(timer.current), [])
  useEffect(() => {
    const images = Array.from(new Set([product.image, ...product.images].filter(Boolean)))
    setDisplayImage(images[Math.floor(Math.random() * images.length)] || product.image)
    setImageLoaded(false)
  }, [product.image, product.images])
  const add = () => {
    addItem(product, 1, variant?.id)
    setAdded(true)
    setAnimating(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setAdded(false), 2200)
    window.setTimeout(() => setAnimating(false), 650)
  }
  const handleImageError = () => {
    if (displayImage !== product.image) {
      setDisplayImage(product.image)
      setImageLoaded(false)
    }
  }
  return (
    <article className="bk-product">
      <Link href={'/produit/' + product.slug} className="bk-product-link">
        <div className={'bk-product-photo' + (imageLoaded ? ' is-loaded' : '')}>
          {!imageLoaded && <span className="bk-image-placeholder" aria-hidden="true" />}
          <Image onLoad={() => setImageLoaded(true)} onError={handleImageError} src={displayImage} alt={label.name} fill sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw" className="bk-image bk-product-front" quality={70} />
          {displayImage.startsWith('/images/') && <span className="bk-watermark" aria-hidden="true">braviko</span>}
          {product.images[1] && <Image src={product.images[1]} alt="" fill sizes="(max-width: 600px) 100vw, 33vw" className="bk-image bk-product-back" quality={75} />}
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
