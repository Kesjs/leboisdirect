'use client'

import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

type Category = { id: string; slug: string; name: string }
type Product = {
  id: string
  slug: string
  status: 'draft' | 'published' | 'archived'
  featured: boolean
  created_at: string
  braviko_categories: { name: string }[]
  braviko_product_translations: { locale: string; name: string }[]
  braviko_product_variants: { price: number; stock: number; label: string }[]
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
      supabase.from('braviko_categories').select('id, slug, name').order('sort_order'),
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

  return (
    <main className="min-h-screen bg-ivory text-charcoal">
      <header className="border-b border-hairline bg-ivory/95 px-6 py-5 backdrop-blur sm:px-10">
        <div className="mx-auto flex max-w-container items-center justify-between gap-6">
          <div><p className="text-xs font-semibold uppercase tracking-[0.22em] text-braise">Braviko / Admin</p><h1 className="mt-2 text-2xl font-semibold tracking-tight">Catalogue produits</h1></div>
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
              return <div key={product.id} className="grid gap-3 border-b border-hairline px-5 py-5 last:border-0 sm:grid-cols-[1fr_170px_130px_110px] sm:items-center sm:gap-4"><div><p className="font-medium">{fr}</p><p className="mt-1 text-xs text-smoke">/{product.slug}</p></div><p className="text-sm text-smoke">{product.braviko_categories?.[0]?.name || '—'}</p><p className="text-sm">{variant ? `${Number(variant.price).toFixed(2)} € · ${variant.stock}` : '—'}</p><span className={`w-fit rounded-full px-2.5 py-1 text-xs font-medium ${product.status === 'published' ? 'bg-forest/10 text-forest' : 'bg-black/5 text-smoke'}`}>{product.status === 'published' ? 'Publié' : 'Brouillon'}</span></div>
            })}
          </div>
        </section>
        <ProductForm categories={categories} onSubmit={createProduct} />
      </div>
    </main>
  )
}

function Field({ label, name, type = 'text', required = false, placeholder }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return <label className="grid gap-2 text-sm font-medium">{label}<input name={name} type={type} required={required} placeholder={placeholder} className="h-11 rounded-card border border-hairline bg-ivory px-3 font-normal outline-none transition placeholder:text-ash focus:border-braise focus:ring-2 focus:ring-braise/10" /></label>
}

function ProductForm({ categories, onSubmit }: { categories: Category[]; onSubmit: (event: FormEvent<HTMLFormElement>) => void }) {
  return <section className="rounded-card border border-hairline bg-white/70 p-6"><div className="mb-6"><p className="text-sm text-smoke">Ajouter au catalogue</p><h2 className="mt-1 text-xl font-semibold">Nouveau produit</h2></div><form onSubmit={onSubmit} className="grid gap-4"><Field label="Nom français" name="name" required placeholder="Bûches de chêne 33 cm" /><div className="grid gap-4 sm:grid-cols-2"><Field label="Nom allemand" name="name_de" required placeholder="Eichenholz 33 cm" /><Field label="Nom italien" name="name_it" required placeholder="Legna di quercia 33 cm" /></div><div className="grid gap-4 sm:grid-cols-2"><label className="grid gap-2 text-sm font-medium">Catégorie<select name="category_id" required className="h-11 rounded-card border border-hairline bg-ivory px-3 font-normal outline-none focus:border-braise"><option value="">Choisir…</option>{categories.map(category => <option value={category.id} key={category.id}>{category.name}</option>)}</select></label><label className="grid gap-2 text-sm font-medium">État<select name="status" className="h-11 rounded-card border border-hairline bg-ivory px-3 font-normal outline-none focus:border-braise"><option value="draft">Brouillon</option><option value="published">Publié</option></select></label></div><div className="grid gap-4 sm:grid-cols-2"><Field label="Prix (€)" name="price" type="number" required placeholder="89.00" /><Field label="Stock" name="stock" type="number" required placeholder="12" /></div><div className="grid gap-4 sm:grid-cols-2"><Field label="SKU" name="sku" required placeholder="BRV-CHENE-33" /><Field label="Format" name="variant" required placeholder="Palette de 1 stère" /></div><Field label="Image produit" name="image" type="file" /><label className="flex items-center gap-2 text-sm text-smoke"><input type="checkbox" name="featured" className="accent-braise" /> Mettre en avant sur la boutique</label><button type="submit" className="mt-2 rounded-full bg-charcoal px-5 py-3 text-sm font-medium text-white transition hover:bg-braise">Créer le produit <span aria-hidden="true">↗</span></button></form></section>
}

function Login({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState(''); const [busy, setBusy] = useState(false)
  async function submit(event: FormEvent) { event.preventDefault(); setBusy(true); setError(''); const { error: authError } = await supabase.auth.signInWithPassword({ email, password }); if (authError) setError(authError.message); else onSuccess(); setBusy(false) }
  return <main className="grid min-h-screen place-items-center bg-ivory px-6"><form onSubmit={submit} className="w-full max-w-md rounded-card border border-hairline bg-white/70 p-8 shadow-sm"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-braise">Braviko / Admin</p><h1 className="mt-3 text-3xl font-semibold tracking-tight">Espace catalogue</h1><p className="mt-3 text-sm leading-6 text-smoke">Connectez-vous avec votre compte administrateur Supabase.</p><div className="mt-8 grid gap-4"><Field label="Email" name="email" type="email" required /><Field label="Mot de passe" name="password" type="password" required /></div>{error && <p className="mt-4 text-sm text-braise-dark">{error}</p>}<button disabled={busy} className="mt-6 w-full rounded-full bg-charcoal px-5 py-3 text-sm font-medium text-white transition hover:bg-braise disabled:opacity-50">{busy ? 'Connexion…' : 'Se connecter'}</button></form></main>
}

function AccessDenied({ email, onSignOut }: { email?: string; onSignOut: () => void }) {
  return <main className="grid min-h-screen place-items-center bg-ivory px-6"><div className="w-full max-w-md rounded-card border border-hairline bg-white/70 p-8"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-braise">Accès limité</p><h1 className="mt-3 text-3xl font-semibold tracking-tight">Compte non autorisé</h1><p className="mt-3 text-sm leading-6 text-smoke">{email || 'Ce compte'} est bien connecté, mais ne fait pas encore partie des administrateurs Braviko.</p><button onClick={onSignOut} className="mt-6 rounded-full border border-charcoal px-5 py-3 text-sm font-medium">Changer de compte</button></div></main>
}
