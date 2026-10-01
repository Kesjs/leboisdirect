'use client'

import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import Logo from '@/components/Logo'

type Category = { id: string; slug: string; name: string; parent_id?: string | null }
type Product = {
  id: string
  slug: string
  status: 'draft' | 'published' | 'archived'
  featured: boolean
  created_at: string
  braviko_categories: { name: string }[]
  braviko_product_translations: { locale: string; name: string }[]
  braviko_product_variants: { id: string; price: number; stock: number; label: string }[]
}

type CatalogDraft = {
  catalog?: string
  product_count?: number
  products?: Array<{
    sku?: string
    status?: 'draft' | 'published' | 'archived'
    featured?: boolean
    name?: { fr?: string; de?: string; it?: string }
    category?: string
    subcategory?: string
    short_description?: string
    main_characteristics?: string
    packaging?: string
    price?: number | null
    stock?: number | null
    delivery_time?: string
    images?: { main?: string | null; gallery?: string[] }
    slug?: string
  }>
}

const supabase = createClient()

function slugify(value: string) {
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function AdminPage() {
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null)
  const [authorized, setAuthorized] = useState<boolean | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [catalogDraft, setCatalogDraft] = useState<CatalogDraft | null>(null)
  const [importing, setImporting] = useState(false)

  const checkAccess = useCallback(async () => {
    const { data: { user: currentUser } } = await supabase.auth.getUser()
    setUser(currentUser ? { id: currentUser.id, email: currentUser.email } : null)
    if (!currentUser) { setAuthorized(false); setLoading(false); return }
    const { data } = await supabase.from('braviko_admins').select('user_id, active').eq('user_id', currentUser.id).maybeSingle()
    setAuthorized(Boolean(data?.active))
    setLoading(false)
  }, [])

  const loadCatalog = useCallback(async () => {
    setError('')
    const [{ data: productData, error: productError }, { data: categoryData, error: categoryError }] = await Promise.all([
      supabase.from('braviko_products').select('id, slug, status, featured, created_at, braviko_categories(name), braviko_product_translations(locale, name), braviko_product_variants(price, stock, label)').order('created_at', { ascending: false }),
      supabase.from('braviko_categories').select('id, slug, name, parent_id').order('sort_order'),
    ])
    if (productError || categoryError) setError(productError?.message || categoryError?.message || 'Impossible de charger le catalogue.')
    setProducts((productData || []) as Product[])
    setCategories((categoryData || []) as Category[])
  }, [])

  useEffect(() => { checkAccess() }, [checkAccess])
  useEffect(() => { if (authorized) loadCatalog() }, [authorized, loadCatalog])

  if (loading) return <div className="min-h-screen bg-ivory p-8 text-sm text-smoke">Chargement de l’espace admin…</div>
  if (!user) return <Login onSuccess={checkAccess} />
  if (!authorized) return <AccessDenied email={user.email} onSignOut={() => supabase.auth.signOut().then(() => checkAccess())} />

  async function createProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(''); setMessage('')
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') || '').trim()
    const categoryId = String(form.get('category_id') || '')
    if (!name || !categoryId) { setError('Le nom et la catégorie sont obligatoires.'); return }
    const slug = slugify(String(form.get('slug') || name))
    const { data: product, error: productError } = await supabase.from('braviko_products').insert({ slug, category_id: categoryId, status: form.get('status') || 'draft', featured: form.get('featured') === 'on' }).select('id').single()
    if (productError || !product) { setError(productError?.message || 'Création impossible.'); return }
    const locales = ['fr', 'de', 'it']
    const translations = locales.map(locale => ({ product_id: product.id, locale, name: String(form.get(`name_${locale}`) || name), short_description: String(form.get(`short_${locale}`) || '') }))
    const { error: translationError } = await supabase.from('braviko_product_translations').insert(translations)
    const { error: variantError } = await supabase.from('braviko_product_variants').insert({ product_id: product.id, sku: String(form.get('sku') || slug), label: String(form.get('variant') || 'Format standard'), price: Number(form.get('price') || 0), stock: Number(form.get('stock') || 0) })
    if (translationError || variantError) { setError(translationError?.message || variantError?.message || 'Le produit a été créé mais ses détails sont incomplets.'); await loadCatalog(); return }
    const image = form.get('image') as File
    if (image?.size) {
      const ext = image.name.split('.').pop()?.toLowerCase() || 'jpg'
      const path = `${product.id}/${Date.now()}.${ext}`
      const { error: uploadError } = await supabase.storage.from('braviko-product-media').upload(path, image, { upsert: false, contentType: image.type })
      if (!uploadError) await supabase.from('braviko_product_images').insert({ product_id: product.id, storage_path: path, alt_text: name, is_primary: true })
      else setError(`Produit créé, mais l’image n’a pas pu être envoyée : ${uploadError.message}`)
    }
    event.currentTarget.reset(); setMessage('Produit créé dans le catalogue Braviko.'); await loadCatalog()
  }

  async function importCatalogDraft() {
    const entries = catalogDraft?.products || []
    if (!entries.length) return
    setImporting(true); setError(''); setMessage('')
    let imported = 0
    try {
      for (const [index, item] of entries.entries()) {
        const categoryName = item.category?.trim() || 'Autres produits'
        const categorySlug = slugify(categoryName)
        const { data: parent, error: parentError } = await supabase
          .from('braviko_categories')
          .upsert({ slug: categorySlug, name: categoryName, sort_order: index }, { onConflict: 'slug' })
          .select('id')
          .single()
        if (parentError || !parent) throw new Error(parentError?.message || `Catégorie introuvable : ${categoryName}`)
        const knownSubcategorySlugs: Record<string, string> = { 'Bûches': 'buches', 'Bois compressé': 'bois-compresse', 'Granulés': 'granules', 'Bois d’allumage': 'allumage', 'Allume-feu': 'allume-feu', 'Accessoires chauffage': 'accessoires-chauffage', 'Machines agricoles': 'machines-agricoles' }
        const subcategoryName = item.subcategory?.trim()
        const subcategorySlug = subcategoryName ? (knownSubcategorySlugs[subcategoryName] || `${categorySlug}-${slugify(subcategoryName)}`) : categorySlug
        const { data: category, error: categoryError } = await supabase
          .from('braviko_categories')
          .upsert({ slug: subcategorySlug, name: subcategoryName || categoryName, parent_id: subcategoryName ? parent.id : null, sort_order: index }, { onConflict: 'slug' })
          .select('id')
          .single()
        if (categoryError || !category) throw new Error(categoryError?.message || `Sous-catégorie introuvable : ${subcategoryName || categoryName}`)
        const nameFr = item.name?.fr?.trim() || item.slug || `Produit ${index + 1}`
        const slug = slugify(item.slug || nameFr)
        const { data: product, error: productError } = await supabase
          .from('braviko_products')
          .upsert({ slug, category_id: category.id, status: item.status || 'draft', featured: Boolean(item.featured), sort_order: index }, { onConflict: 'slug' })
          .select('id')
          .single()
        if (productError || !product) throw new Error(productError?.message || `Produit impossible à créer : ${nameFr}`)
        const translations = (['fr', 'de', 'it'] as const).map(locale => ({
          product_id: product.id,
          locale,
          name: item.name?.[locale] || nameFr,
          short_description: item.short_description || '',
          description: item.main_characteristics || '',
          conditioning: item.packaging || '',
          delivery_info: item.delivery_time || '',
        }))
        const { error: translationError } = await supabase.from('braviko_product_translations').upsert(translations, { onConflict: 'product_id,locale' })
        if (translationError) throw translationError
        const { error: variantError } = await supabase.from('braviko_product_variants').upsert({ product_id: product.id, sku: item.sku || slug, label: item.packaging || 'Format standard', price: Number(item.price || 0), stock: Number(item.stock || 0) }, { onConflict: 'sku' })
        if (variantError) throw variantError
        imported++
      }
      setMessage(`${imported} produits importés en brouillons. Tu peux maintenant compléter les prix et les images.`)
      setCatalogDraft(null)
      await loadCatalog()
    } catch (importError) {
      setError(importError instanceof Error ? importError.message : 'Import impossible.')
      if (imported) await loadCatalog()
    } finally { setImporting(false) }
  }

  async function readCatalogFile(file: File) {
    setError(''); setMessage('')
    try {
      const parsed = JSON.parse(await file.text()) as CatalogDraft
      if (!Array.isArray(parsed.products) || !parsed.products.length) throw new Error('Le fichier ne contient aucun produit exploitable.')
      setCatalogDraft(parsed)
      setMessage(`${parsed.products.length} produits prêts à être prévisualisés.`)
    } catch (fileError) {
      setCatalogDraft(null)
      setError(fileError instanceof Error ? fileError.message : 'Fichier JSON invalide.')
    }
  }

  async function updateProduct(productId: string, variantId: string | undefined, values: { price: number; stock: number; status: Product['status']; featured: boolean }) {
    setError(''); setMessage('')
    const { error: productError } = await supabase.from('braviko_products').update({ status: values.status, featured: values.featured }).eq('id', productId)
    if (productError) { setError(productError.message); return }
    if (variantId) {
      const { error: variantError } = await supabase.from('braviko_product_variants').update({ price: values.price, stock: values.stock }).eq('id', variantId)
      if (variantError) { setError(variantError.message); return }
    }
    setMessage('Produit mis à jour. Le site reflétera cette modification après actualisation.')
    await loadCatalog()
  }

  return (
    <main className="min-h-screen bg-ivory text-charcoal">
      <header className="border-b border-hairline bg-ivory/95 px-6 py-5 backdrop-blur sm:px-10">
        <div className="mx-auto flex max-w-container items-center justify-between gap-6">
          <div className="flex items-center gap-5"><Logo /><div><p className="text-xs font-semibold uppercase tracking-[0.22em] text-braise">Braviko / Admin</p><h1 className="mt-2 text-2xl font-semibold tracking-tight">Catalogue produits</h1></div></div>
          <div className="flex items-center gap-3"><Link href="/" className="hidden text-sm text-smoke transition hover:text-charcoal sm:block">Voir le site ↗</Link><button onClick={() => supabase.auth.signOut().then(() => checkAccess())} className="rounded-full border border-hairline px-4 py-2 text-sm transition hover:border-charcoal">Déconnexion</button></div>
        </div>
      </header>
      <div className="mx-auto grid max-w-container gap-10 px-6 py-10 lg:grid-cols-[minmax(0,1fr)_380px] sm:px-10">
        <section>
          <div className="mb-5 flex items-end justify-between"><div><p className="text-sm text-smoke">Vue d’ensemble</p><h2 className="mt-1 text-3xl font-semibold tracking-tight">{products.length} produit{products.length > 1 ? 's' : ''}</h2></div><span className="rounded-full bg-forest/10 px-3 py-1 text-xs font-medium text-forest">Base Reachly connectée</span></div>
          {error && <p className="mb-5 rounded-card border border-braise/30 bg-braise/10 p-4 text-sm text-braise-dark">{error}</p>}
          {message && <p className="mb-5 rounded-card border border-forest/20 bg-forest/10 p-4 text-sm text-forest">{message}</p>}
          <div className="overflow-hidden rounded-card border border-hairline bg-white/60">
            <div className="hidden grid-cols-[1fr_170px_130px_110px] gap-4 border-b border-hairline px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-smoke sm:grid"><span>Produit</span><span>Catégorie</span><span>Prix / stock</span><span>État</span></div>
            {products.length === 0 ? <div className="p-10 text-center text-sm text-smoke">Aucun produit pour le moment. Ajoutez le premier à droite.</div> : products.map(product => {
              const fr = product.braviko_product_translations?.find(t => t.locale === 'fr')?.name || product.slug
              const variant = product.braviko_product_variants?.[0]
              return <ProductRow key={product.id} product={product} name={fr} onSave={updateProduct} />
            })}
          </div>
          <CatalogImport draft={catalogDraft} importing={importing} onFile={readCatalogFile} onImport={importCatalogDraft} />
        </section>
        <ProductForm categories={categories} onSubmit={createProduct} />
      </div>
    </main>
  )
}

function Field({ label, name, type = 'text', required = false, placeholder }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return <label className="grid gap-2 text-sm font-medium">{label}<input name={name} type={type} required={required} placeholder={placeholder} className="h-11 rounded-card border border-hairline bg-ivory px-3 font-normal outline-none transition placeholder:text-ash focus:border-braise focus:ring-2 focus:ring-braise/10" /></label>
}

function CatalogImport({ draft, importing, onFile, onImport }: { draft: CatalogDraft | null; importing: boolean; onFile: (file: File) => void; onImport: () => void }) {
  const products = draft?.products || []
  const categories = [...new Set(products.map(product => product.category).filter(Boolean))]
  return <section className="mt-6 rounded-card border border-braise/30 bg-braise/5 p-6">
    <div className="mb-5"><p className="text-sm font-semibold uppercase tracking-[0.14em] text-braise">Import rapide</p><h2 className="mt-1 text-xl font-semibold">Préremplir depuis un catalogue JSON</h2><p className="mt-2 text-sm leading-6 text-smoke">Le fichier est d’abord analysé localement. L’écriture dans Supabase ne commence qu’après ton clic sur le bouton d’import.</p></div>
    <label className="grid gap-2 text-sm font-medium">Fichier catalogue (.json)<input type="file" accept="application/json,.json" onChange={event => { const file = event.target.files?.[0]; if (file) onFile(file) }} className="block w-full rounded-card border border-hairline bg-white px-3 py-3 text-sm font-normal file:mr-4 file:rounded-full file:border-0 file:bg-charcoal file:px-4 file:py-2 file:text-sm file:font-medium file:text-white" /></label>
    {products.length > 0 && <div className="mt-5 rounded-card border border-hairline bg-white p-4"><div className="flex flex-wrap items-center justify-between gap-3"><p className="text-sm font-semibold">{products.length} fiches prêtes</p><p className="text-xs text-smoke">{categories.length} catégories · toutes en brouillon au départ</p></div><div className="mt-3 max-h-48 overflow-auto border-t border-hairline pt-3 text-sm text-smoke">{products.slice(0, 8).map((product, index) => <p key={product.sku || product.slug || index} className="py-1"><span className="font-medium text-charcoal">{product.name?.fr || product.slug}</span> · {product.category}{product.subcategory ? ` / ${product.subcategory}` : ''}</p>)}{products.length > 8 && <p className="pt-2 text-xs">+ {products.length - 8} autres produits</p>}</div><button type="button" onClick={onImport} disabled={importing} className="mt-5 w-full rounded-full bg-charcoal px-5 py-3 text-sm font-medium text-white transition hover:bg-braise disabled:opacity-50">{importing ? 'Import en cours…' : `Importer ${products.length} produits en brouillons`}</button></div>}
  </section>
}

function ProductRow({ product, name, onSave }: { product: Product; name: string; onSave: (productId: string, variantId: string | undefined, values: { price: number; stock: number; status: Product['status']; featured: boolean }) => Promise<void> }) {
  const variant = product.braviko_product_variants?.[0]
  const [price, setPrice] = useState(String(variant?.price ?? 0))
  const [stock, setStock] = useState(String(variant?.stock ?? 0))
  const [status, setStatus] = useState<Product['status']>(product.status)
  const [featured, setFeatured] = useState(product.featured)
  return <details className="border-b border-hairline px-5 py-5 last:border-0">
    <summary className="grid cursor-pointer list-none gap-3 sm:grid-cols-[1fr_170px_130px_110px] sm:items-center sm:gap-4"><div><p className="font-medium">{name}</p><p className="mt-1 text-xs text-smoke">/{product.slug}</p></div><p className="text-sm text-smoke">{product.braviko_categories?.[0]?.name || '—'}</p><p className="text-sm">{variant ? `${Number(variant.price).toFixed(2)} € · ${variant.stock}` : '—'}</p><span className={`w-fit rounded-full px-2.5 py-1 text-xs font-medium ${product.status === 'published' ? 'bg-forest/10 text-forest' : 'bg-black/5 text-smoke'}`}>{product.status === 'published' ? 'Publié' : 'Brouillon'}</span></summary>
    <form className="mt-5 grid gap-4 rounded-card bg-ivory p-4 sm:grid-cols-4" onSubmit={event => { event.preventDefault(); void onSave(product.id, variant?.id, { price: Number(price || 0), stock: Number(stock || 0), status, featured }) }}><label className="grid gap-1 text-xs font-semibold">Prix (€)<input type="number" min="0" step="0.01" value={price} onChange={event => setPrice(event.target.value)} className="h-10 rounded-card border border-hairline bg-white px-3 text-sm font-normal" /></label><label className="grid gap-1 text-xs font-semibold">Stock<input type="number" min="0" step="1" value={stock} onChange={event => setStock(event.target.value)} className="h-10 rounded-card border border-hairline bg-white px-3 text-sm font-normal" /></label><label className="grid gap-1 text-xs font-semibold">État<select value={status} onChange={event => setStatus(event.target.value as Product['status'])} className="h-10 rounded-card border border-hairline bg-white px-3 text-sm font-normal"><option value="draft">Brouillon</option><option value="published">Publié</option><option value="archived">Archivé</option></select></label><label className="flex items-center gap-2 self-end text-sm"><input type="checkbox" checked={featured} onChange={event => setFeatured(event.target.checked)} className="accent-braise" /> À la une</label><button type="submit" className="rounded-full bg-charcoal px-4 py-2 text-sm font-medium text-white transition hover:bg-braise sm:col-span-4">Enregistrer les modifications</button></form>
  </details>
}

function ProductForm({ categories, onSubmit }: { categories: Category[]; onSubmit: (event: FormEvent<HTMLFormElement>) => void }) {
  return <section className="rounded-card border border-hairline bg-white/70 p-6"><div className="mb-6"><p className="text-sm text-smoke">Ajouter au catalogue</p><h2 className="mt-1 text-xl font-semibold">Nouveau produit</h2></div><form onSubmit={onSubmit} className="grid gap-4"><Field label="Nom français" name="name" required placeholder="Bûches de chêne 33 cm" /><div className="grid gap-4 sm:grid-cols-2"><Field label="Nom allemand" name="name_de" required placeholder="Eichenholz 33 cm" /><Field label="Nom italien" name="name_it" required placeholder="Legna di quercia 33 cm" /></div><div className="grid gap-4 sm:grid-cols-2"><label className="grid gap-2 text-sm font-medium">Catégorie<select name="category_id" required className="h-11 rounded-card border border-hairline bg-ivory px-3 font-normal outline-none focus:border-braise"><option value="">Choisir…</option>{categories.map(category => <option value={category.id} key={category.id}>{category.name}</option>)}</select></label><label className="grid gap-2 text-sm font-medium">État<select name="status" className="h-11 rounded-card border border-hairline bg-ivory px-3 font-normal outline-none focus:border-braise"><option value="draft">Brouillon</option><option value="published">Publié</option></select></label></div><div className="grid gap-4 sm:grid-cols-2"><Field label="Prix (€)" name="price" type="number" required placeholder="89.00" /><Field label="Stock" name="stock" type="number" required placeholder="12" /></div><div className="grid gap-4 sm:grid-cols-2"><Field label="SKU" name="sku" required placeholder="BRV-CHENE-33" /><Field label="Format" name="variant" required placeholder="Palette de 1 stère" /></div><Field label="Image produit" name="image" type="file" /><label className="flex items-center gap-2 text-sm text-smoke"><input type="checkbox" name="featured" className="accent-braise" /> Mettre en avant sur la boutique</label><button type="submit" className="mt-2 rounded-full bg-charcoal px-5 py-3 text-sm font-medium text-white transition hover:bg-braise">Créer le produit <span aria-hidden="true">↗</span></button></form></section>
}

function Login({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState(''); const [busy, setBusy] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError('')
    const form = new FormData(event.currentTarget)
    const loginEmail = String(form.get('email') || '').trim()
    const loginPassword = String(form.get('password') || '')
    if (!loginEmail || !loginPassword) { setError('Renseignez votre email et votre mot de passe.'); setBusy(false); return }
    const { error: authError } = await supabase.auth.signInWithPassword({ email: loginEmail, password: loginPassword })
    if (authError) setError(authError.message); else onSuccess()
    setBusy(false)
  }
  return <main className="grid min-h-screen place-items-center bg-ivory px-6"><form onSubmit={submit} className="w-full max-w-md rounded-card border border-hairline bg-white/70 p-8 shadow-sm"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-braise">Braviko / Admin</p><h1 className="mt-3 text-3xl font-semibold tracking-tight">Espace catalogue</h1><p className="mt-3 text-sm leading-6 text-smoke">Connectez-vous avec votre compte administrateur Supabase.</p><div className="mt-8 grid gap-4"><label className="grid gap-2 text-sm font-medium">Email<input name="email" type="email" value={email} onChange={event => setEmail(event.target.value)} required autoComplete="email" className="h-11 rounded-card border border-hairline bg-ivory px-3 font-normal outline-none transition placeholder:text-ash focus:border-braise focus:ring-2 focus:ring-braise/10" /></label><label className="grid gap-2 text-sm font-medium">Mot de passe<div className="relative"><input name="password" type={showPassword ? 'text' : 'password'} value={password} onChange={event => setPassword(event.target.value)} required autoComplete="current-password" className="h-11 w-full rounded-card border border-hairline bg-ivory px-3 pr-11 font-normal outline-none transition placeholder:text-ash focus:border-braise focus:ring-2 focus:ring-braise/10" /><button type="button" onClick={() => setShowPassword(value => !value)} aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'} className="absolute inset-y-0 right-0 grid w-11 place-items-center text-smoke transition hover:text-charcoal">{showPassword ? <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M3 3l18 18" /><path d="M10.6 10.7a2 2 0 0 0 2.7 2.7" /><path d="M9.9 4.2A10.8 10.8 0 0 1 12 4c5.2 0 8.7 4 10 8a16 16 0 0 1-3.1 5.2M6.2 6.2C3.8 7.8 2.5 10.4 2 12c1.3 4 4.8 8 10 8 1.1 0 2.1-.2 3-.5" /></svg> : <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="2.5" /></svg>}</button></div></label></div>{error && <p className="mt-4 text-sm text-braise-dark">{error}</p>}<button disabled={busy} className="mt-6 w-full rounded-full bg-charcoal px-5 py-3 text-sm font-medium text-white transition hover:bg-braise disabled:opacity-50">{busy ? 'Connexion…' : 'Se connecter'}</button></form></main>
}

function AccessDenied({ email, onSignOut }: { email?: string; onSignOut: () => void }) {
  return <main className="grid min-h-screen place-items-center bg-ivory px-6"><div className="w-full max-w-md rounded-card border border-hairline bg-white/70 p-8"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-braise">Accès limité</p><h1 className="mt-3 text-3xl font-semibold tracking-tight">Compte non autorisé</h1><p className="mt-3 text-sm leading-6 text-smoke">{email || 'Ce compte'} est bien connecté, mais ne fait pas encore partie des administrateurs Braviko.</p><button onClick={onSignOut} className="mt-6 rounded-full border border-charcoal px-5 py-3 text-sm font-medium">Changer de compte</button></div></main>
}
