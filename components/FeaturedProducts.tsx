'use client'

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { Product } from '@/data/products'
import { bravikoCopy } from '@/data/braviko-copy'
import { useI18n } from '@/lib/i18n-context'
import ProductCard from './ProductCard'
import { uiCopy } from '@/data/ui-copy'
import { isAgricultureCategory, isHeatingCategory } from '@/data/catalog-taxonomy'
import { categoryLabels } from '@/data/product-labels'

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
  const [tab, setTab] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [catalogProducts, setCatalogProducts] = useState<Product[]>([])
  const [catalogError, setCatalogError] = useState(false)
  const tabs = useRef<Array<HTMLButtonElement | null>>([])
  const reduced = useReducedMotion()
  const universeProducts = catalogProducts.filter(product => tab === 0 ? isHeatingCategory(product.category) : isAgricultureCategory(product.category))
  const availableCategories = Array.from(new Set(universeProducts.map(product => product.category)))
  const visibleProducts = selectedCategory === 'all'
    ? universeProducts
    : universeProducts.filter(product => product.category === selectedCategory)
  const randomizedProducts = useMemo(() => shuffle(visibleProducts).slice(0, 6), [catalogProducts, tab, selectedCategory])
  const categoryGroups = tab === 0
    ? [['Bois & chauffage', ['buches', 'bois-compresse', 'granules']], ['Allumage & accessoires', ['allumage', 'allume-feu', 'accessoires-chauffage']]]
    : [['Machines & terrain', ['machines-agricoles']]]
  const changeByKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    const target = event.key === 'Home' ? 0 : event.key === 'End' ? 1 : ['ArrowLeft', 'ArrowRight'].includes(event.key) ? 1 - tab : null
    if (target === null) return
    event.preventDefault()
    setTab(target)
    tabs.current[target]?.focus()
  }
  useEffect(() => {
    fetch('/api/catalog').then(response => response.ok ? response.json() : Promise.reject(new Error('catalog unavailable'))).then(payload => {
    setCatalogProducts(shuffle(payload.products || []))
    }).catch(() => setCatalogError(true))
  }, [])
  useEffect(() => {
    setSelectedCategory('all')
  }, [tab])
  return (
    <section id="selection" className="bk-section bk-container" aria-labelledby="selection-title">
      <div className="bk-selection-heading" data-reveal>
        <div><p className="bk-eyebrow">BRAVIKO · {copy.shop}</p><h2 id="selection-title" className="bk-title">{copy.selection}</h2><p className="bk-lead">{tab === 0 ? copy.selectionIntro : copy.agricultureSelectionIntro}</p></div>
        <Link href="/boutique" className="bk-text-link">{copy.all}<span aria-hidden="true">↗</span></Link>
      </div>
      <div role="tablist" aria-label={copy.universes} className="bk-tabs">
        {[copy.heating, copy.agriculture].map((label, index) => (
          <button key={index} ref={node => { tabs.current[index] = node }} role="tab" id={'universe-tab-' + index} aria-selected={tab === index} aria-controls={'universe-panel-' + index} tabIndex={tab === index ? 0 : -1} onClick={() => setTab(index)} onKeyDown={changeByKey}>
            {label}
            {tab === index && <motion.span className="bk-tab-underline" layoutId="universe-underline" transition={{ duration: reduced ? 0 : 0.25 }} />}
          </button>
        ))}
      </div>
      {availableCategories.length > 1 && <div className="bk-selection-filters" aria-label={ui.shop.categories}>
        <button type="button" onClick={() => setSelectedCategory('all')} aria-pressed={selectedCategory === 'all'}>
          {ui.shop.allProducts}
        </button>
        {categoryGroups.map(([group, categories]) => {
          const groupCategories = (categories as string[]).filter(category => availableCategories.includes(category))
          if (!groupCategories.length) return null
          return <div className="bk-selection-filter-group" key={group as string}>
            <span>{group as string}</span>
            <div>{groupCategories.map(category => <button key={category} type="button" onClick={() => setSelectedCategory(category)} aria-pressed={selectedCategory === category}>
              {categoryLabels[locale][category] || category.replace(/-/g, ' ')}
            </button>)}</div>
          </div>
        })}
      </div>}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={tab} role="tabpanel" id={'universe-panel-' + tab} aria-labelledby={'universe-tab-' + tab} tabIndex={0}
          initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: reduced ? 1 : 0 }} transition={{ duration: reduced ? 0 : 0.22 }}>
          <div className="bk-products-grid">{randomizedProducts.map(product => <ProductCard key={product.id} product={product} />)}{!catalogProducts.length && <p className="bk-lead">{catalogError ? ui.common.unavailable : ui.common.selectionLoading}</p>}{catalogProducts.length > 0 && !visibleProducts.length && <p className="bk-lead">{ui.common.unavailable}</p>}</div>
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
