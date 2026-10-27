'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import PageSkeleton from '@/components/PageSkeleton'
import type { Product } from '@/data/products'
import { useI18n } from '@/lib/i18n-context'
import { categoryLabel, productLabel } from '@/data/product-labels'
import { uiCopy } from '@/data/ui-copy'

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
  const [catalogLoading, setCatalogLoading] = useState(true)
  const [catalogError, setCatalogError] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>('relevance')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [page, setPage] = useState(1)

  useEffect(() => {
    let active = true
    fetch('/api/catalog')
      .then(response => response.ok ? response.json() : Promise.reject(new Error('catalog unavailable')))
      .then(payload => { if (active) { setCatalogProducts(shuffle(payload.products || [])); setCatalogLoading(false) } })
      .catch(() => { if (active) { setCatalogError(true); setCatalogLoading(false) } })
    return () => { active = false }
  }, [])

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...catalogProducts]
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

  const availableCategories = useMemo(() => Array.from(new Set(catalogProducts.map(product => product.category))), [catalogProducts])
  const groupedCategories = useMemo(() => {
    const groups = [
      { key: 'animals', title: copy.shop.categories, categories: availableCategories },
    ]
    return groups.filter(group => group.categories.length > 0)
  }, [availableCategories, copy.shop.categories])
  const pageCount = Math.max(1, Math.ceil(filteredAndSortedProducts.length / PRODUCTS_PER_PAGE))
  const pageProducts = filteredAndSortedProducts.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE)
  const paginationItems = useMemo<Array<number | 'ellipsis'>>(() => {
    if (pageCount <= 5) return Array.from({ length: pageCount }, (_, index) => index + 1)
    if (page <= 3) return [1, 2, 3, 'ellipsis', pageCount]
    if (page >= pageCount - 2) return [1, 'ellipsis', pageCount - 2, pageCount - 1, pageCount]
    return [1, 'ellipsis', page, pageCount]
  }, [page, pageCount])

  useEffect(() => { setPage(1); setSelectedCategory('all') }, [universe])
  useEffect(() => { setPage(1) }, [query, selectedCategory, sortBy])
  useEffect(() => { if (page > pageCount) setPage(pageCount) }, [page, pageCount])

  const title = copy.shop.heating
  const intro = copy.shop.heatingIntro

  return <>
    <Header />
    <main id="main-content" className="min-h-screen bg-ivory">
      <section className="bk-boutique-hero relative h-[42vh] min-h-[340px] flex items-center justify-center overflow-hidden bg-charcoal">
        <Image src="/images/pet-boutique-hero-v2.png" alt={copy.shop.heatingImage} fill priority className="object-cover" sizes="100vw" quality={85} />
        <div className="absolute inset-0 bg-charcoal/55" />
        <div className="relative z-10 container-custom text-center text-white"><p className="bk-eyebrow text-white/80">BRAVIKO · {title}</p><h1 className="text-[48px] sm:text-[56px] md:text-[72px] font-semibold text-balance leading-[1.05] tracking-tight">{title}</h1><p className="mt-16 text-[16px] sm:text-[18px] text-white/90 max-w-[560px] mx-auto leading-relaxed">{intro}</p></div>
      </section>
      <div className="bg-white border-b border-hairline"><div className="container-custom py-20"><nav className="flex items-center gap-12 text-body-sm"><Link href="/" className="text-smoke hover:text-braise transition-colors">{copy.common.home}</Link><span className="text-ash">/</span><span className="text-charcoal font-medium">{title}</span></nav></div></div>
      <section className="bk-boutique-content container-custom py-48">
        <div className="grid gap-32 lg:grid-cols-[220px_minmax(0,1fr)]">
          {catalogLoading ? <aside className="bk-category-filter bk-category-filter-skeleton border-t border-hairline pt-20" aria-hidden="true"><span className="bk-skeleton-line bk-category-skeleton-kicker" /><span className="bk-skeleton-line bk-category-skeleton-title" /><div className="bk-category-skeleton-list"><span className="bk-skeleton-line" /><span className="bk-skeleton-line" /><span className="bk-skeleton-line" /><span className="bk-skeleton-line" /><span className="bk-skeleton-line" /></div></aside> : availableCategories.length > 1 && <aside className={'bk-category-filter border-t border-hairline pt-20' + (mobileCategoriesOpen ? ' is-mobile-open' : '')}><p className="bk-eyebrow">{copy.shop.filter}</p><h2 className="text-heading-sm font-semibold text-charcoal mt-8 mb-16">{copy.shop.categories}</h2><button type="button" className="bk-mobile-category-trigger" aria-expanded={mobileCategoriesOpen} aria-controls="mobile-category-options" onClick={() => setMobileCategoriesOpen(current => !current)}><span>{copy.shop.categories}</span><span aria-hidden="true">⌄</span></button><div id="mobile-category-options" className="bk-category-filter-content"><div className="grid gap-20"><button type="button" onClick={() => { setSelectedCategory('all'); setMobileCategoriesOpen(false) }} className={'text-left py-8 text-body-sm transition-colors ' + (selectedCategory === 'all' ? 'font-semibold text-charcoal' : 'text-smoke hover:text-charcoal')}>{copy.shop.allProducts}</button>{groupedCategories.map(group => <details key={group.key} open className="bk-category-group"><summary>{group.title}<span className="bk-category-chevron" aria-hidden="true" /></summary><div className="grid gap-4 pt-8">{group.categories.map(category => <button key={category} type="button" onClick={() => { setSelectedCategory(category); setMobileCategoriesOpen(false) }} className={'text-left py-8 text-body-sm transition-colors ' + (selectedCategory === category ? 'font-semibold text-charcoal text-charcoal' : 'text-smoke hover:text-charcoal')}>{categoryLabel(category, locale)}</button>)}</div></details>)}</div></div></aside>}
          <div>
            <div className="bk-boutique-toolbar flex flex-wrap items-center justify-between gap-16 mb-32 pb-24 border-b border-hairline">
              <div className="flex items-center gap-12"><div className="bk-view-toggle" aria-label={copy.shop.display}><button type="button" onClick={() => setViewMode('grid')} aria-pressed={viewMode === 'grid'} className="bk-view-toggle-button">{copy.shop.grid}</button><button type="button" onClick={() => setViewMode('list')} aria-pressed={viewMode === 'list'} className="bk-view-toggle-button">{copy.shop.list}</button></div><label htmlFor="sort" className="text-body-sm text-smoke">{copy.shop.sort}</label><select id="sort" value={sortBy} onChange={(event) => setSortBy(event.target.value as SortOption)} className="px-16 py-8 bg-white border border-hairline rounded-card text-body-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-charcoal"><option value="relevance">{copy.shop.relevance}</option><option value="price-asc">{copy.shop.lowPrice}</option><option value="price-desc">{copy.shop.highPrice}</option><option value="name">{copy.shop.name}</option></select></div>
            </div>
            {catalogLoading ? <div className="bk-product-skeleton-grid" aria-label={copy.common.loading} aria-busy="true">{Array.from({ length: 6 }, (_, index) => <article className="bk-product-skeleton" key={index}><span className="bk-skeleton-media" /><span className="bk-skeleton-line bk-skeleton-line-category" /><span className="bk-skeleton-line bk-skeleton-line-title" /><span className="bk-skeleton-line bk-skeleton-line-description" /><div className="bk-product-skeleton-purchase"><span className="bk-skeleton-line bk-skeleton-line-price" /><span className="bk-skeleton-add" /></div></article>)}</div> : pageProducts.length > 0 ? <><div className={viewMode === 'grid' ? 'bk-products-grid grid-cols-2 md:grid-cols-3 gap-24 md:gap-32' : 'bk-products-list'}>{pageProducts.map(product => <ProductCard key={product.id} product={product} />)}</div>{pageCount > 1 && <nav className="bk-pagination" aria-label={copy.shop.pagination}><button type="button" onClick={() => setPage(current => Math.max(1, current - 1))} disabled={page === 1} className="bk-pagination-arrow" aria-label={copy.shop.previous}><span className="bk-pagination-arrow-label">{copy.shop.previous}</span><span className="bk-pagination-arrow-icon" aria-hidden="true">←</span></button>{paginationItems.map((item, index) => item === 'ellipsis' ? <span className="bk-pagination-ellipsis" key={`ellipsis-${index}`} aria-hidden="true">…</span> : <button type="button" key={item} onClick={() => setPage(item)} aria-current={page === item ? 'page' : undefined} aria-label={`${copy.shop.pagination} ${item}`} className="bk-pagination-page">{item}</button>)}<button type="button" onClick={() => setPage(current => Math.min(pageCount, current + 1))} disabled={page === pageCount} className="bk-pagination-arrow" aria-label={copy.shop.next}><span className="bk-pagination-arrow-label">{copy.shop.next}</span><span className="bk-pagination-arrow-icon" aria-hidden="true">→</span></button></nav>}</> : catalogError ? <div className="text-center py-64"><p className="text-body-lg text-smoke">{copy.common.unavailable}</p></div> : <div className="text-center py-64"><p className="text-body-lg text-smoke">Nessun prodotto corrisponde alla ricerca.</p></div>}
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
}

export default function ShopPage() {
  return <Suspense fallback={<PageSkeleton variant="products" label="Caricamento dei prodotti" />}><ShopContent /></Suspense>
}
