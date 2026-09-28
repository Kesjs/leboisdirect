'use client'

import { Suspense, useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { products, categories } from '@/data/products'
import { useI18n } from '@/lib/i18n-context'
import { bravikoCopy } from '@/data/braviko-copy'
import { productLabel } from '@/data/product-labels'

type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'name'

function ShopContent() {
  const searchParams = useSearchParams()
  const universe = searchParams.get('universe')
  const query = searchParams.get('q')?.trim().toLocaleLowerCase() ?? ''
  const { locale } = useI18n()
  const copy = bravikoCopy[locale]
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedSpecies, setSelectedSpecies] = useState<string>('all')
  const [sortBy, setSortBy] = useState<SortOption>('relevance')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  useEffect(() => {
    const category = searchParams.get('cat')
    setSelectedCategory(category && categories.some((item) => item.id === category) ? category : 'all')
    setSelectedSpecies('all')
  }, [searchParams])

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products]
    if (query) filtered = filtered.filter(product =>
      (productLabel(product, locale).name + ' ' + product.name + ' ' + product.category).toLocaleLowerCase().includes(query)
    )

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    // Filter by species
    if (selectedSpecies !== 'all') {
      filtered = filtered.filter((p) => p.species === selectedSpecies)
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        // relevance - keep current order
        break
    }

    return filtered
  }, [selectedCategory, selectedSpecies, sortBy, query, locale])

  if (universe === 'agriculture') return (
    <>
      <Header />
      <main id="main-content" className="bk-container bk-section">
        <div className="bk-agriculture-preview">
          <div className="bk-agriculture-photo"><Image src="/images/braviko-hero.jpg" alt="" fill priority sizes="(max-width: 700px) 100vw, 50vw" className="bk-image bk-agri-image" /></div>
          <div><p className="bk-eyebrow">{copy.pendingLabel}</p><h1 className="bk-title">{copy.pendingTitle}</h1><p>{copy.pendingBody}</p><a href="mailto:contact@leboisdirect.fr" className="bk-button">{copy.contact}<span aria-hidden="true">↗</span></a></div>
        </div>
        <Link href="/boutique?universe=heating" className="bk-text-link mt-32">{copy.heating}<span aria-hidden="true">↗</span></Link>
      </main>
      <Footer />
    </>
  )

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-ivory">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-charcoal">
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/photorealistic-perspective-wood-logs.jpg"
              alt="Bois de chauffage premium"
              fill
              priority
              className="object-cover"
              sizes="100vw"
              quality={75}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/20 to-charcoal/60" />
          </div>

          <div className="relative z-10 container-custom text-center">
            <h1 className="text-[48px] sm:text-[56px] md:text-[72px] font-semibold text-white text-balance mb-20 leading-[1.05] tracking-tight">
              Notre boutique
            </h1>
            <p className="text-[16px] sm:text-[18px] text-white/90 text-balance max-w-[520px] mx-auto leading-relaxed">
              Chêne, hêtre, charme : choisissez votre bois de chauffage premium
            </p>
          </div>
        </section>

        {/* Breadcrumb */}
        <div className="bg-white border-b border-hairline">
          <div className="container-custom py-20">
            <nav className="flex items-center gap-12 text-body-sm">
              <Link href="/" className="text-smoke hover:text-braise transition-colors">
                Accueil
              </Link>
              <span className="text-ash">/</span>
              <span className="text-charcoal font-medium">Boutique</span>
            </nav>
          </div>
        </div>

        {/* Header */}
        <div className="bg-white border-b border-hairline">
          <div className="container-custom py-48 md:py-64">
            <h1 className="text-heading-lg md:text-display font-semibold text-charcoal mb-16 tracking-tight">
              Tous nos produits
            </h1>
            <p className="text-body-lg text-smoke max-w-[600px]">
              Découvrez notre gamme complète de bois de chauffage premium. Livraison rapide partout en France.
            </p>
          </div>
        </div>

        {/* Filters & Products */}
        <div className="container-custom py-48">
          <div className="grid md:grid-cols-12 gap-32">
            {/* Desktop Filters */}
            <aside className="hidden md:block md:col-span-3">
              <div className="sticky top-[120px]">
                <div className="bg-white rounded-card border border-hairline p-24 shadow-sm">
                  <div className="flex items-center justify-between mb-20">
                    <h2 className="text-heading-sm font-semibold text-charcoal">Filtres</h2>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ash">
                      <path d="M2 4h12M4.5 8h7M6.5 12h3" strokeLinecap="round" />
                    </svg>
                  </div>

                  {/* Category Filter */}
                  <div className="mb-28 pb-28 border-b border-hairline">
                    <h3 className="text-[11px] font-semibold text-ash uppercase tracking-wide mb-14">Catégorie</h3>
                    <div className="space-y-4">
                      <label className="flex items-center gap-12 cursor-pointer group rounded-md px-8 py-8 -mx-8 hover:bg-mist transition-colors">
                        <input
                          type="radio"
                          name="category"
                          value="all"
                          checked={selectedCategory === 'all'}
                          onChange={() => setSelectedCategory('all')}
                          className="w-16 h-16 accent-braise cursor-pointer"
                        />
                        <span className={`text-body-sm transition-colors ${selectedCategory === 'all' ? 'text-charcoal font-medium' : 'text-smoke group-hover:text-charcoal'}`}>Tous</span>
                      </label>
                      {categories.map((cat) => (
                        <label key={cat.id} className="flex items-center gap-12 cursor-pointer group rounded-md px-8 py-8 -mx-8 hover:bg-mist transition-colors">
                          <input
                            type="radio"
                            name="category"
                            value={cat.id}
                            checked={selectedCategory === cat.id}
                            onChange={() => setSelectedCategory(cat.id)}
                            className="w-16 h-16 accent-braise cursor-pointer"
                          />
                          <span className={`text-body-sm transition-colors ${selectedCategory === cat.id ? 'text-charcoal font-medium' : 'text-smoke group-hover:text-charcoal'}`}>{cat.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Species Filter */}
                  <div>
                    <h3 className="text-[11px] font-semibold text-ash uppercase tracking-wide mb-14">Essence</h3>
                    <div className="space-y-4">
                      <label className="flex items-center gap-12 cursor-pointer group rounded-md px-8 py-8 -mx-8 hover:bg-mist transition-colors">
                        <input
                          type="radio"
                          name="species"
                          value="all"
                          checked={selectedSpecies === 'all'}
                          onChange={() => setSelectedSpecies('all')}
                          className="w-16 h-16 accent-braise cursor-pointer"
                        />
                        <span className={`text-body-sm transition-colors ${selectedSpecies === 'all' ? 'text-charcoal font-medium' : 'text-smoke group-hover:text-charcoal'}`}>Toutes</span>
                      </label>
                      <label className="flex items-center gap-12 cursor-pointer group rounded-md px-8 py-8 -mx-8 hover:bg-mist transition-colors">
                        <input
                          type="radio"
                          name="species"
                          value="chene"
                          checked={selectedSpecies === 'chene'}
                          onChange={() => setSelectedSpecies('chene')}
                          className="w-16 h-16 accent-braise cursor-pointer"
                        />
                        <span className={`text-body-sm transition-colors ${selectedSpecies === 'chene' ? 'text-charcoal font-medium' : 'text-smoke group-hover:text-charcoal'}`}>Chêne</span>
                      </label>
                      <label className="flex items-center gap-12 cursor-pointer group rounded-md px-8 py-8 -mx-8 hover:bg-mist transition-colors">
                        <input
                          type="radio"
                          name="species"
                          value="hetre"
                          checked={selectedSpecies === 'hetre'}
                          onChange={() => setSelectedSpecies('hetre')}
                          className="w-16 h-16 accent-braise cursor-pointer"
                        />
                        <span className={`text-body-sm transition-colors ${selectedSpecies === 'hetre' ? 'text-charcoal font-medium' : 'text-smoke group-hover:text-charcoal'}`}>Hêtre</span>
                      </label>
                      <label className="flex items-center gap-12 cursor-pointer group rounded-md px-8 py-8 -mx-8 hover:bg-mist transition-colors">
                        <input
                          type="radio"
                          name="species"
                          value="charme"
                          checked={selectedSpecies === 'charme'}
                          onChange={() => setSelectedSpecies('charme')}
                          className="w-16 h-16 accent-braise cursor-pointer"
                        />
                        <span className={`text-body-sm transition-colors ${selectedSpecies === 'charme' ? 'text-charcoal font-medium' : 'text-smoke group-hover:text-charcoal'}`}>Charme</span>
                      </label>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedCategory('all')
                      setSelectedSpecies('all')
                    }}
                    className="mt-28 w-full py-10 text-body-sm text-smoke hover:text-braise transition-colors border-t border-hairline pt-20"
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              </div>
            </aside>

            {/* Products */}
            <div className="md:col-span-9">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-32 pb-24 border-b border-hairline">
                <p className="text-body-sm text-smoke">
                  {filteredAndSortedProducts.length} produit{filteredAndSortedProducts.length > 1 ? 's' : ''}
                </p>
                <div className="flex items-center gap-16">
                  <label htmlFor="sort" className="text-body-sm text-smoke">
                    Trier par
                  </label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="px-16 py-8 bg-white border border-hairline rounded-card text-body-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-charcoal"
                  >
                    <option value="relevance">Pertinence</option>
                    <option value="price-asc">Prix croissant</option>
                    <option value="price-desc">Prix décroissant</option>
                    <option value="name">Nom</option>
                  </select>
                </div>
              </div>

              {/* Product Grid */}
              {filteredAndSortedProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-24 md:gap-32">
                  {filteredAndSortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-64">
                  <p className="text-body-lg text-smoke mb-24">Aucun produit ne correspond à vos critères.</p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all')
                      setSelectedSpecies('all')
                    }}
                    className="inline-flex items-center gap-12 px-32 py-12 bg-charcoal text-white rounded-pill hover:bg-charcoal/90 transition-colors font-medium"
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="md:hidden fixed bottom-24 right-24 z-40 px-24 py-16 bg-charcoal text-white rounded-pill shadow-lg flex items-center gap-12 font-medium"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h12M4 10h8M4 14h12" />
            </svg>
            Filtres
          </button>

          {mobileFiltersOpen && (
            <div className="md:hidden fixed inset-0 z-50 bg-charcoal/40" onClick={() => setMobileFiltersOpen(false)}>
              <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-3xl p-24" onClick={(event) => event.stopPropagation()}>
                <div className="flex items-center justify-between mb-24">
                  <h2 className="text-heading-sm font-semibold text-charcoal">Filtres</h2>
                  <button onClick={() => setMobileFiltersOpen(false)} className="text-smoke" aria-label="Fermer les filtres">Fermer</button>
                </div>
                <h3 className="text-[11px] font-semibold text-ash uppercase tracking-wide mb-12">Catégorie</h3>
                <div className="grid grid-cols-2 gap-8 mb-24">
                  {(['all', ...categories.map((cat) => cat.id)] as string[]).map((category) => (
                    <button key={category} onClick={() => setSelectedCategory(category)} className={`text-left px-12 py-10 rounded-md border ${selectedCategory === category ? 'border-braise bg-braise/10 text-charcoal' : 'border-hairline text-smoke'}`}>
                      {category === 'all' ? 'Tous' : categories.find((cat) => cat.id === category)?.name}
                    </button>
                  ))}
                </div>
                <button onClick={() => setMobileFiltersOpen(false)} className="w-full py-12 bg-charcoal text-white rounded-pill">Voir les produits</button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default function ShopPage() {
  return <Suspense fallback={<div className="bk-container bk-section" aria-busy="true">Braviko</div>}><ShopContent /></Suspense>
}
