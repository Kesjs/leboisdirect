'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/data/products'
import { categoryLabels, hasMeaningfulConditioning, productLabel } from '@/data/product-labels'
import { bravikoCopy } from '@/data/braviko-copy'
import { useI18n } from '@/lib/i18n-context'
import { useCart } from '@/lib/cart-context'

export default function ProductCard({ product }: { product: Product }) {
  const { locale } = useI18n()
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
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
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setAdded(false), 2200)
  }
  return (
    <article className="bk-product">
      <Link href={'/produit/' + product.slug} className="bk-product-link">
        <div className={'bk-product-photo' + (imageLoaded ? ' is-loaded' : '')}>
          {!imageLoaded && <span className="bk-image-placeholder" aria-hidden="true" />}
          <Image onLoad={() => setImageLoaded(true)} src={displayImage} alt={label.name} fill sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw" className="bk-image bk-product-front" quality={70} />
          {displayImage.startsWith('/images/') && <span className="bk-watermark" aria-hidden="true">braviko</span>}
          {product.images[1] && <Image src={product.images[1]} alt="" fill sizes="(max-width: 600px) 100vw, 33vw" className="bk-image bk-product-back" quality={75} />}
          <span className="bk-product-view">{copy.details} <span aria-hidden="true">↗</span></span>
        </div>
        <p className="bk-product-category">{categoryLabels[locale][product.category] || product.category.replace(/-/g, ' ')}</p>
        <h3>{label.name}</h3>
        <p className="bk-product-excerpt">{label.description.split('. ')[0]}.</p>
        {hasMeaningfulConditioning(label.conditioning) && <p className="bk-product-conditioning">{label.conditioning}</p>}
      </Link>
      <div className="bk-product-purchase">
        <div><span className="bk-product-price">{price}</span><p>{label.delivery}</p></div>
        <button className={'bk-product-add' + (added ? ' is-added' : '')} type="button" onClick={add} aria-label={copy.add + ' : ' + label.name}>
          <span aria-hidden="true">{added ? '✓' : '+'}</span>
        </button>
      </div>
      <span className="bk-product-feedback" role="status">{added ? copy.added : ''}</span>
    </article>
  )
}
