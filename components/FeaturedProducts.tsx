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

type FilterGroupId = 'all' | 'combustibles' | 'appareils' | 'exterieur' | 'rangement'

const FILTER_GROUPS: { id: FilterGroupId; label: Record<'fr' | 'de' | 'it', string>; categories?: Set<string> }[] = [
  { id: 'all', label: { fr: 'Toute la sélection', de: 'Gesamte Auswahl', it: 'Tutta la selezione' } },
  {
    id: 'combustibles',
    label: { fr: 'Bûches & granulés', de: 'Brennholz & Pellets', it: 'Legna e pellet' },
    categories: new Set([
      'buches',
      'bois-compresse',
      'granules',
      'allumage',
      'allume-feu',
      'chauffage-au-bois-buches',
      'chauffage-au-bois-bois-compresse',
      'chauffage-au-bois-granules',
      'chauffage-au-bois-preparation',
    ]),
  },
  {
    id: 'appareils',
    label: { fr: 'Poêles & inserts', de: 'Öfen & Kamine', it: 'Stufe e inserti' },
    categories: new Set([
      'poeles-a-bois',
      'poeles-a-granules',
      'inserts-cheminees',
      'foyers-cheminees',
      'cheminees-electriques',
      'chauffage-electrique-interieur',
    ]),
  },
  {
    id: 'exterieur',
    label: { fr: 'Braseros & extérieur', de: 'Feuerschalen & Garten', it: 'Bracieri ed esterni' },
    categories: new Set([
      'braseros-cuisson-exterieure',
      'barbecues-cuisine-exterieure',
      'cuisine-au-feu',
      'accessoires-brasero',
      'accessoires-cuisson-exterieure',
      'chauffage-exterieur',
    ]),
  },
  {
    id: 'rangement',
    label: { fr: 'Abris, fendeuses & rangement', de: 'Holzlager & Spalter', it: 'Portalegna e spaccalegna' },
    categories: new Set([
      'rangement-stockage',
      'rangement-transport-bois',
      'stockage-exterieur',
      'accessoires-chauffage',
    ]),
  },
]

function matchesFilterGroup(category: string, groupId: FilterGroupId) {
  if (groupId === 'all') return true
  if (groupId === 'combustibles' && category.startsWith('chauffage-au-bois')) return true
  const group = FILTER_GROUPS.find(item => item.id === groupId)
  return Boolean(group?.categories?.has(category))
}

export default function FeaturedProducts() {
  const { locale } = useI18n()
  const copy = bravikoCopy[locale]
  const ui = uiCopy[locale]
  const [selectedGroup, setSelectedGroup] = useState<FilterGroupId>('all')
  const [catalogProducts, setCatalogProducts] = useState<Product[]>([])
  const [catalogError, setCatalogError] = useState(false)
  const reduced = useReducedMotion()

  const universeProducts = useMemo(() => {
    const heating = catalogProducts.filter(product => isHeatingCategory(product.category))
    return [...heating].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
  }, [catalogProducts])

  const groupCounts = useMemo(() => {
    return Object.fromEntries(
      FILTER_GROUPS.map(group => [
        group.id,
        universeProducts.filter(product => matchesFilterGroup(product.category, group.id)).length,
      ]),
    ) as Record<FilterGroupId, number>
  }, [universeProducts])

  const filteredProducts = useMemo(
    () => universeProducts.filter(product => matchesFilterGroup(product.category, selectedGroup)),
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
          {FILTER_GROUPS.filter(group => group.id === 'all' || groupCounts[group.id] > 0).map(group => (
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
        <span>{FILTER_GROUPS.find(group => group.id === selectedGroup)?.label[locale]}</span>
        <span>
          {displayedProducts.length} / {filteredProducts.length} {ui.shop.product}{filteredProducts.length > 1 ? 's' : ''}
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
