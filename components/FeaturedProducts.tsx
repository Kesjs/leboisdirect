'use client'

import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { Product } from '@/data/products'
import { bravikoCopy } from '@/data/braviko-copy'
import { useI18n } from '@/lib/i18n-context'
import ProductCard from './ProductCard'
import { uiCopy } from '@/data/ui-copy'

export default function FeaturedProducts() {
  const { locale } = useI18n()
  const copy = bravikoCopy[locale]
  const ui = uiCopy[locale]
  const [tab, setTab] = useState(0)
  const [catalogProducts, setCatalogProducts] = useState<Product[]>([])
  const [catalogError, setCatalogError] = useState(false)
  const tabs = useRef<Array<HTMLButtonElement | null>>([])
  const reduced = useReducedMotion()
  const universeProducts = catalogProducts.filter(product => tab === 0 ? product.category !== 'machines-agricoles' : product.category === 'machines-agricoles')
  const changeByKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    const target = event.key === 'Home' ? 0 : event.key === 'End' ? 1 : ['ArrowLeft', 'ArrowRight'].includes(event.key) ? 1 - tab : null
    if (target === null) return
    event.preventDefault()
    setTab(target)
    tabs.current[target]?.focus()
  }
  useEffect(() => {
    fetch('/api/catalog').then(response => response.ok ? response.json() : Promise.reject(new Error('catalog unavailable'))).then(payload => {
      setCatalogProducts(payload.products || [])
    }).catch(() => setCatalogError(true))
  }, [])
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
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={tab} role="tabpanel" id={'universe-panel-' + tab} aria-labelledby={'universe-tab-' + tab} tabIndex={0}
          initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: reduced ? 1 : 0 }} transition={{ duration: reduced ? 0 : 0.22 }}>
          <div className="bk-products-grid">{universeProducts.slice(0, 6).map(product => <ProductCard key={product.id} product={product} />)}{!catalogProducts.length && <p className="bk-lead">{catalogError ? ui.common.unavailable : ui.common.selectionLoading}</p>}</div>
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
