'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import type { Product } from '@/data/products'
import { bravikoCopy } from '@/data/braviko-copy'
import { useI18n } from '@/lib/i18n-context'
import ProductCard from './ProductCard'
import { uiCopy } from '@/data/ui-copy'
import {
  HEATING_FILTER_GROUPS,
  isHeatingCategory,
  matchesHeatingGroup,
  type HeatingGroupId,
} from '@/data/catalog-taxonomy'

type Props = {
  selectedGroup?: HeatingGroupId
  onSelectGroup?: (group: HeatingGroupId) => void
}

export default function FeaturedProducts({
  selectedGroup: controlledGroup,
  onSelectGroup,
}: Props = {}) {
  const { locale } = useI18n()
  const copy = bravikoCopy[locale]
  const ui = uiCopy[locale]
  const [internalGroup, setInternalGroup] = useState<HeatingGroupId>('all')
  const selectedGroup = controlledGroup ?? internalGroup
  const setSelectedGroup = onSelectGroup ?? setInternalGroup

  const [catalogProducts, setCatalogProducts] = useState<Product[]>([])
  const [catalogError, setCatalogError] = useState(false)
  const reduced = useReducedMotion()

  const universeProducts = useMemo(() => {
    const heating = catalogProducts.filter(
      product => product.slug !== 'test-paiement-1-euro' && isHeatingCategory(product.category),
    )
    return [...heating].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
  }, [catalogProducts])

  const groupCounts = useMemo(() => {
    return Object.fromEntries(
      HEATING_FILTER_GROUPS.map(group => [
        group.id,
        universeProducts.filter(product => matchesHeatingGroup(product.category, group.id)).length,
      ]),
    ) as Record<HeatingGroupId, number>
  }, [universeProducts])

  const filteredProducts = useMemo(
    () => universeProducts.filter(product => matchesHeatingGroup(product.category, selectedGroup)),
    [universeProducts, selectedGroup],
  )

  const displayedProducts = useMemo(() => filteredProducts.slice(0, 9), [filteredProducts])

  useEffect(() => {
    fetch('/api/catalog')
      .then(response => (response.ok ? response.json() : Promise.reject(new Error('catalog unavailable'))))
      .then(payload => {
        setCatalogProducts(payload.products || [])
      })
      .catch(() => setCatalogError(true))
  }, [])

  return (
    <section id="selection" className="bk-section bk-container" aria-labelledby="selection-title">
      <div className="bk-selection-heading" data-reveal>
        <div><p className="bk-eyebrow">BRAVIKO · {copy.heating}</p><h2 id="selection-title" className="bk-title">{copy.selection}</h2></div>
        <Link href="/boutique" className="bk-text-link">{copy.all}<span aria-hidden="true">↗</span></Link>
      </div>
      {universeProducts.length > 0 && (
        <div className="bk-selection-filters" role="group" aria-label={copy.selection}>
          {HEATING_FILTER_GROUPS.filter(group => group.id === 'all' || groupCounts[group.id] > 0).map(group => (
            <button
              key={group.id}
              type="button"
              aria-pressed={selectedGroup === group.id}
              onClick={() => setSelectedGroup(group.id)}
            >
              {group.label[locale]} ({groupCounts[group.id]})
            </button>
          ))}
        </div>
      )}
      <div className="bk-selection-context">
        <span>{HEATING_FILTER_GROUPS.find(group => group.id === selectedGroup)?.label[locale]}</span>
        <span>
          {displayedProducts.length} / {filteredProducts.length}{' '}
          {filteredProducts.length === 1 ? ui.shop.product : ui.shop.products}
        </span>
      </div>
      <motion.div key={selectedGroup} initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.22 }}>
        <div className="bk-products-grid">
          {displayedProducts.map(product => <ProductCard key={product.id} product={product} />)}
          {!catalogProducts.length && <p className="bk-lead">{catalogError ? ui.common.unavailable : ui.common.selectionLoading}</p>}
          {catalogProducts.length > 0 && !filteredProducts.length && <p className="bk-lead">{ui.common.unavailable}</p>}
        </div>
      </motion.div>
    </section>
  )
}
