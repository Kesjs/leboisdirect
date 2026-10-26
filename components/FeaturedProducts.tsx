'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import type { Product } from '@/data/products'
import { bravikoCopy } from '@/data/braviko-copy'
import { useI18n } from '@/lib/i18n-context'
import ProductCard from './ProductCard'
import { uiCopy } from '@/data/ui-copy'
import { categoryLabel } from '@/data/product-labels'

function shuffle<T>(items: T[]) {
  const shuffled = [...items]
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]]
  }
  return shuffled
}

export default function FeaturedProducts() {
  const { locale } = useI18n()
  const copy = bravikoCopy[locale]
  const ui = uiCopy[locale]
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [catalogProducts, setCatalogProducts] = useState<Product[]>([])
  const [catalogError, setCatalogError] = useState(false)
  const reduced = useReducedMotion()
  const universeProducts = catalogProducts
  const availableCategories = Array.from(new Set(universeProducts.map(product => product.category)))
  const visibleProducts = selectedCategory === 'all'
    ? universeProducts
    : universeProducts.filter(product => product.category === selectedCategory)
  const randomizedProducts = useMemo(() => {
    const productsForCategory = selectedCategory === 'all' ? universeProducts : universeProducts.filter(product => product.category === selectedCategory)
    return shuffle(productsForCategory).slice(0, 3)
  }, [universeProducts, selectedCategory])
  useEffect(() => {
    fetch('/api/catalog').then(response => response.ok ? response.json() : Promise.reject(new Error('catalog unavailable'))).then(payload => {
    setCatalogProducts(shuffle(payload.products || []))
    }).catch(() => setCatalogError(true))
  }, [])
  return (
    <section id="selection" className="bk-section bk-container" aria-labelledby="selection-title">
      <div className="bk-selection-heading" data-reveal>
        <div><p className="bk-eyebrow">BRAVIKO · {copy.heating}</p><h2 id="selection-title" className="bk-title">{copy.selection}</h2></div>
        <Link href="/boutique" className="bk-text-link">{copy.all}<span aria-hidden="true">↗</span></Link>
      </div>
      <div className="bk-selection-context"><span>{copy.heating}</span><span>{universeProducts.length} {ui.shop.product}{universeProducts.length > 1 ? 's' : ''}</span></div>
      <div className="flex flex-wrap gap-8 mt-20" aria-label={ui.shop.categories}>
        <button type="button" onClick={() => setSelectedCategory('all')} className={'px-12 py-8 text-body-sm rounded-card border transition-colors ' + (selectedCategory === 'all' ? 'bg-charcoal text-white border-charcoal' : 'bg-white text-smoke border-hairline hover:border-charcoal')}>{ui.shop.allProducts}</button>
        {availableCategories.map(category => <button type="button" key={category} onClick={() => setSelectedCategory(category)} className={'px-12 py-8 text-body-sm rounded-card border transition-colors ' + (selectedCategory === category ? 'bg-charcoal text-white border-charcoal' : 'bg-white text-smoke border-hairline hover:border-charcoal')}>{categoryLabel(category, locale)}</button>)}
      </div>
        <motion.div initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.22 }}>
          <div className="bk-products-grid">{randomizedProducts.map(product => <ProductCard key={product.id} product={product} />)}{!catalogProducts.length && <p className="bk-lead">{catalogError ? ui.common.unavailable : ui.common.selectionLoading}</p>}{catalogProducts.length > 0 && !visibleProducts.length && <p className="bk-lead">{ui.common.unavailable}</p>}</div>
        </motion.div>
    </section>
  )
}
