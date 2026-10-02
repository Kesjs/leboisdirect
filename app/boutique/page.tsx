'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import type { Product } from '@/data/products'
import { useI18n } from '@/lib/i18n-context'
import { categoryLabel, productLabel } from '@/data/product-labels'
import { uiCopy } from '@/data/ui-copy'
import { isHeatingCategory } from '@/data/catalog-taxonomy'

type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'name'
type ViewMode = 'grid' | 'list'
const PRODUCTS_PER_PAGE = 6

function shuffle<T>(items: T[]) {
  const shuffled = [...items]
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]]
  }
  return shuffled
}

function ShopContent() {
  const searchParams = useSearchParams()
  const universe = searchParams.get('universe')
  const query = searchParams.get('q')?.trim().toLocaleLowerCase() ?? ''
  const { locale } = useI18n()
  const copy = uiCopy[locale]
  const [catalogProducts, setCatalogProducts] = useState<Product[]>([])
  const [catalogError, setCatalogError] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>('relevance')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [page, setPage] = useState(1)

  useEffect(() => {
    let active = true
    fetch('/api/catalog')
      .then(response => response.ok ? response.json() : Promise.reject(new Error('catalog unavailable')))
      .then(payload => { if (active) setCatalogProducts(shuffle(payload.products || [])) })
      .catch(() => { if (active) setCatalogError(true) })
    return () => { active = false }
  }, [])

  const isHeating = true
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = catalogProducts.filter(product => {
      return isHeatingCategory(product.category)
    })
    if (selectedCategory !== 'all') filtered = filtered.filter(product => product.category === selectedCategory)
    if (query) filtered = filtered.filter(product =>
      (productLabel(product, locale).name + ' ' + product.name + ' ' + product.category).toLocaleLowerCase().includes(query)
    )
    switch (sortBy) {
      case 'price-asc': filtered.sort((a, b) => a.price - b.price); break
      case 'price-desc': filtered.sort((a, b) => b.price - a.price); break
      case 'name': filtered.sort((a, b) => a.name.localeCompare(b.name)); break
    }
    return filtered
  }, [catalogProducts, locale, query, selectedCategory, sortBy])

  const availableCategories = useMemo(() => Array.from(new Set(catalogProducts
    .filter(product => isHeatingCategory(product.category))
    .map(product => product.category))), [catalogProducts])
  const groupedCategories = useMemo(() => {
    const groups = [
      { key: 'heating', title: copy.shop.heating, categories: availableCategories.filter(category => isHeatingCategory(category)) },
    ]
    return groups.filter(group => group.categories.length > 0)
  }, [availableCategories, copy.shop.heating])
  const pageCount = Math.max(1, Math.ceil(filteredAndSortedProducts.length / PRODUCTS_PER_PAGE))
  const pageProducts = filteredAndSortedProducts.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE)

  useEffect(() => { setPage(1); setSelectedCategory('all') }, [universe])
  useEffect(() => { if (page > pageCount) setPage(pageCount) }, [page, pageCount])

  const title = copy.shop.heating
  const intro = copy.shop.heatingIntro

  return <>
    <Header />
    <main id="main-content" className="min-h-screen bg-ivory">
      <section className="relative h-[42vh] min-h-[340px] flex items-center justify-center overflow-hidden bg-charcoal">
        <Image src="/images/photorealistic-perspective-wood-logs.jpg" alt={copy.shop.heatingImage} fill priority className="object-cover" sizes="100vw" quality={75} />
        <div className="absolute inset-0 bg-charcoal/55" />
        <div className="relative z-10 container-custom text-center text-white"><p className="bk-eyebrow text-white/80">BRAVIKO · {title}</p><h1 className="text-[48px] sm:text-[56px] md:text-[72px] font-semibold text-balance leading-[1.05] tracking-tight">{title}</h1><p className="mt-16 text-[16px] sm:text-[18px] text-white/90 max-w-[560px] mx-auto leading-relaxed">{intro}</p></div>
      </section>
      <div className="bg-white border-b border-hairline"><div className="container-custom py-20"><nav className="flex items-center gap-12 text-body-sm"><Link href="/" className="text-smoke hover:text-braise transition-colors">{copy.common.home}</Link><span className="text-ash">/</span><span className="text-charcoal font-medium">{title}</span></nav></div></div>
      <section className="container-custom py-48">
        <div className="grid gap-32 lg:grid-cols-[220px_minmax(0,1fr)]">
          {availableCategories.length > 1 && <aside className="bk-category-filter border-t border-hairline pt-20"><p className="bk-eyebrow">{copy.shop.filter}</p><h2 className="text-heading-sm font-semibold text-charcoal mt-8 mb-16">{copy.shop.categories}</h2><div className="grid gap-20"><button type="button" onClick={() => setSelectedCategory('all')} className={'text-left py-8 text-body-sm transition-colors ' + (selectedCategory === 'all' ? 'font-semibold text-charcoal' : 'text-smoke hover:text-charcoal')}>{copy.shop.allProducts}</button>{groupedCategories.map(group => <details key={group.key} open className="bk-category-group"><summary>{group.title}<span aria-hidden="true">⌄</span></summary><div className="grid gap-4 pt-8">{group.categories.map(category => <button key={category} type="button" onClick={() => setSelectedCategory(category)} className={'text-left py-8 text-body-sm transition-colors ' + (selectedCategory === category ? 'font-semibold text-charcoal text-charcoal' : 'text-smoke hover:text-charcoal')}>{categoryLabel(category, locale)}</button>)}</div></details>)}</div></aside>}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-16 mb-32 pb-24 border-b border-hairline">
              <p className="text-body-sm text-smoke">{filteredAndSortedProducts.length} {copy.shop.product}{filteredAndSortedProducts.length > 1 ? 's' : ''}</p>
              <div className="flex items-center gap-12"><div className="flex rounded-card border border-hairline" aria-label={copy.shop.display}><button type="button" onClick={() => setViewMode('grid')} aria-pressed={viewMode === 'grid'} className={'px-12 py-8 text-body-sm ' + (viewMode === 'grid' ? 'bg-charcoal text-white' : 'text-smoke')}>{copy.shop.grid}</button><button type="button" onClick={() => setViewMode('list')} aria-pressed={viewMode === 'list'} className={'px-12 py-8 text-body-sm ' + (viewMode === 'list' ? 'bg-charcoal text-white' : 'text-smoke')}>{copy.shop.list}</button></div><label htmlFor="sort" className="text-body-sm text-smoke">{copy.shop.sort}</label><select id="sort" value={sortBy} onChange={(event) => setSortBy(event.target.value as SortOption)} className="px-16 py-8 bg-white border border-hairline rounded-card text-body-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-charcoal"><option value="relevance">{copy.shop.relevance}</option><option value="price-asc">{copy.shop.lowPrice}</option><option value="price-desc">{copy.shop.highPrice}</option><option value="name">{copy.shop.name}</option></select></div>
            </div>
            {pageProducts.length > 0 ? <><div className={viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 gap-24 md:gap-32' : 'bk-products-list'}>{pageProducts.map(product => <ProductCard key={product.id} product={product} />)}</div>{pageCount > 1 && <nav className="flex items-center justify-center gap-8 mt-48" aria-label={copy.shop.pagination}><button type="button" onClick={() => setPage(current => Math.max(1, current - 1))} disabled={page === 1} className="px-16 py-10 border border-hairline rounded-card disabled:opacity-40">{copy.shop.previous}</button>{Array.from({ length: pageCount }, (_, index) => index + 1).map(number => <button type="button" key={number} onClick={() => setPage(number)} aria-current={page === number ? 'page' : undefined} className={'w-40 h-40 rounded-card border ' + (page === number ? 'border-charcoal bg-charcoal text-white' : 'border-hairline')}>{number}</button>)}<button type="button" onClick={() => setPage(current => Math.min(pageCount, current + 1))} disabled={page === pageCount} className="px-16 py-10 border border-hairline rounded-card disabled:opacity-40">{copy.shop.next}</button></nav>}</> : <div className="text-center py-64"><p className="text-body-lg text-smoke">{catalogError ? copy.common.unavailable : copy.common.loading}</p></div>}
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
}

export default function ShopPage() {
  return <Suspense fallback={<div className="bk-container bk-section" aria-busy="true">Braviko</div>}><ShopContent /></Suspense>
}
