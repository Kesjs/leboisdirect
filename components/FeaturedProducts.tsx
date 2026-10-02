'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import type { Product } from '@/data/products'
import { bravikoCopy } from '@/data/braviko-copy'
import { useI18n } from '@/lib/i18n-context'
import ProductCard from './ProductCard'
import { uiCopy } from '@/data/ui-copy'
import { isHeatingCategory } from '@/data/catalog-taxonomy'
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
  const universeProducts = catalogProducts.filter(product => isHeatingCategory(product.category))
  const availableCategories = Array.from(new Set(universeProducts.map(product => product.category)))
  const visibleProducts = selectedCategory === 'all'
    ? universeProducts
    : universeProducts.filter(product => product.category === selectedCategory)
  const randomizedProducts = useMemo(() => {
    const productsForCategory = selectedCategory === 'all' ? universeProducts : universeProducts.filter(product => product.category === selectedCategory)
    return shuffle(productsForCategory).slice(0, 6)
  }, [universeProducts, selectedCategory])
  useEffect(() => {
    fetch('/api/catalog').then(response => response.ok ? response.json() : Promise.reject(new Error('catalog unavailable'))).then(payload => {
    setCatalogProducts(shuffle(payload.products || []))
    }).catch(() => setCatalogError(true))
  }, [])
  return (
    <section id="selection" className="bk-section bk-container" aria-labelledby="selection-title">
      <div className="bk-selection-heading" data-reveal>
        <div><p className="bk-eyebrow">BRAVIKO · {copy.heating}</p><h2 id="selection-title" className="bk-title">{copy.selection}</h2><p className="bk-lead">{copy.selectionIntro}</p></div>
        <Link href="/boutique" className="bk-text-link">{copy.all}<span aria-hidden="true">↗</span></Link>
      </div>
      {availableCategories.length > 1 && <div className="bk-selection-filters" aria-label={ui.shop.categories}>
        <button type="button" onClick={() => setSelectedCategory('all')} aria-pressed={selectedCategory === 'all'}>
          {ui.shop.allProducts}
        </button>
        <div className="bk-selection-filter-group"><span>{copy.heating}</span><div>{availableCategories.map(category => <button key={category} type="button" onClick={() => setSelectedCategory(category)} aria-pressed={selectedCategory === category}>
              {categoryLabel(category, locale)}
            </button>)}</div>
        </div>
      </div>}
        <motion.div initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.22 }}>
          <div className="bk-products-grid">{randomizedProducts.map(product => <ProductCard key={product.id} product={product} />)}{!catalogProducts.length && <p className="bk-lead">{catalogError ? ui.common.unavailable : ui.common.selectionLoading}</p>}{catalogProducts.length > 0 && !visibleProducts.length && <p className="bk-lead">{ui.common.unavailable}</p>}</div>
        </motion.div>
    </section>
  )
}
