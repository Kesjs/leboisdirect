'use client'

import { useRef, useState, type KeyboardEvent } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { products } from '@/data/products'
import { bravikoCopy } from '@/data/braviko-copy'
import { useI18n } from '@/lib/i18n-context'
import ProductCard from './ProductCard'

export default function FeaturedProducts() {
  const { locale } = useI18n()
  const copy = bravikoCopy[locale]
  const [tab, setTab] = useState(0)
  const tabs = useRef<Array<HTMLButtonElement | null>>([])
  const reduced = useReducedMotion()
  const changeByKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    const target = event.key === 'Home' ? 0 : event.key === 'End' ? 1 : ['ArrowLeft', 'ArrowRight'].includes(event.key) ? 1 - tab : null
    if (target === null) return
    event.preventDefault()
    setTab(target)
    tabs.current[target]?.focus()
  }
  return (
    <section id="selection" className="bk-section bk-container" aria-labelledby="selection-title">
      <div className="bk-selection-heading" data-reveal>
        <div><p className="bk-eyebrow">BRAVIKO · {copy.shop}</p><h2 id="selection-title" className="bk-title">{copy.selection}</h2><p className="bk-lead">{copy.selectionIntro}</p></div>
        <Link href="/boutique" className="bk-text-link">{copy.all}<span aria-hidden="true">↗</span></Link>
      </div>
      <div role="tablist" aria-label={copy.universes} className="bk-tabs">
        {[copy.heating, copy.agriculture].map((label, index) => (
          <button key={index} ref={node => { tabs.current[index] = node }} role="tab" id={'universe-tab-' + index} aria-selected={tab === index} aria-controls={'universe-panel-' + index} tabIndex={tab === index ? 0 : -1} onClick={() => setTab(index)} onKeyDown={changeByKey}>
            {label}<span aria-hidden="true">{index === 0 ? '06' : '↗'}</span>
            {tab === index && <motion.span className="bk-tab-underline" layoutId="universe-underline" transition={{ duration: reduced ? 0 : 0.25 }} />}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={tab} role="tabpanel" id={'universe-panel-' + tab} aria-labelledby={'universe-tab-' + tab} tabIndex={0}
          initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: reduced ? 1 : 0 }} transition={{ duration: reduced ? 0 : 0.22 }}>
          {tab === 0 ? <div className="bk-products-grid">{products.slice(0, 6).map(product => <ProductCard key={product.id} product={product} />)}</div> : (
            <div className="bk-agriculture-preview">
              <div className="bk-agriculture-photo"><Image src="/images/braviko-hero.jpg" alt="" fill sizes="(max-width: 700px) 100vw, 50vw" className="bk-image bk-agri-image" /></div>
              <div><p className="bk-eyebrow">{copy.pendingLabel}</p><h3>{copy.pendingTitle}</h3><p>{copy.pendingBody}</p><Link className="bk-button" href="/boutique?universe=agriculture">{copy.agriculture}<span aria-hidden="true">↗</span></Link></div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
