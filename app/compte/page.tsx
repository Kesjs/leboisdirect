'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageSkeleton, { OrderListSkeleton } from '@/components/PageSkeleton'
import { useAuth } from '@/lib/auth-context'
import { createClient } from '@/lib/supabase/client'
import { useI18n } from '@/lib/i18n-context'
import { accountCopy } from '@/data/account-copy'

type Order = {
  id: string
  reference: string
  status: keyof typeof accountCopy.fr.status
  total: number
  currency: string
  created_at: string
  first_name: string
  last_name: string
  phone: string
  address: string
  postal_code: string
  city: string
  payment_status: 'unpaid' | 'pending' | 'paid' | 'failed' | 'refunded'
  payment_method: string | null
  paid_at: string | null
  braviko_order_items: { id: string; product_name: string; variant_label: string | null; quantity: number; unit_price: number; line_total: number }[] | null
}

type CustomerProfile = {
  first_name: string | null
  last_name: string | null
  phone: string | null
}

export default function AccountPage() {
  const router = useRouter()
  const { user, isAdmin, loading, signOut } = useAuth()
  const { locale } = useI18n()
  const c = accountCopy[locale]
  const supabase = useMemo(() => createClient(), [])
  const [orders, setOrders] = useState<Order[]>([])
  const [profile, setProfile] = useState<CustomerProfile | null>(null)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!loading && !user) router.replace('/connexion?mode=signup&next=/compte')
    if (!loading && user && isAdmin) router.replace('/admin')
  }, [isAdmin, loading, router, user])

  useEffect(() => {
    if (!user) return
    supabase.from('braviko_orders')
      .select('id, reference, status, total, currency, created_at, first_name, last_name, phone, address, postal_code, city, payment_status, payment_method, paid_at, braviko_order_items(id, product_name, variant_label, quantity, unit_price, line_total)')
      .order('created_at', { ascending: false })
      .then(({ data, error: queryError }: { data: Order[] | null; error: { message: string } | null }) => {
        if (queryError) setError(queryError.message)
        else setOrders((data ?? []) as Order[])
        setFetching(false)
      })
    supabase.from('braviko_customer_profiles')
      .select('first_name, last_name, phone')
      .maybeSingle()
      .then(({ data }: { data: CustomerProfile | null }) => setProfile(data))
  }, [supabase, user])

  if (loading || !user || isAdmin) return <PageSkeleton variant="account" label={c.loading as string} />

  const money = (value: number, currency: string) => new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value)
  const displayName = [profile?.first_name || user.user_metadata?.first_name, profile?.last_name || user.user_metadata?.last_name].filter(Boolean).join(' ') || (c.defaultName as string)

  const activeOrders = orders.filter(order => !['delivered', 'cancelled'].includes(order.status)).length
  const deliveredOrders = orders.filter(order => order.status === 'delivered').length

  return <>
    <Header />
    <main id="main-content" className="bk-home bk-container bk-account-page">
      <header className="bk-account-heading">
        <div><p className="bk-eyebrow">BRAVIKO / {c.dashboard}</p><h1>{c.account}</h1><p>{displayName}</p></div>
        <div className="bk-account-heading-actions">
          <Link className="bk-text-link" href="/boutique">{c.shop}<span aria-hidden="true">↗</span></Link>
          <Link className="bk-button" href="/contact">{c.supportLink}<span aria-hidden="true">↗</span></Link>
          <button className="bk-text-link bk-account-logout" type="button" onClick={async () => { await signOut(); router.replace('/connexion') }}>{c.logout}<span aria-hidden="true">↗</span></button>
        </div>
      </header>
      <section className="bk-account-welcome" aria-labelledby="account-welcome-title">
        <div>
          <p className="bk-eyebrow">{c.orders}</p>
          <h2 id="account-welcome-title">{orders.length > 0 ? c.ordersIntro : c.noOrders}</h2>
          <p>{orders.length > 0 ? `${activeOrders} ${c.inProgress.toLocaleLowerCase()} · ${deliveredOrders} ${c.delivered.toLocaleLowerCase()}` : c.signupIntro}</p>
        </div>
        <Link className="bk-account-welcome-link" href={orders.length > 0 ? '#orders-title' : '/boutique'}>{orders.length > 0 ? c.details : c.shop}<span aria-hidden="true">↓</span></Link>
      </section>
      <div className="bk-account-layout">
        <aside className="bk-account-profile">
          <span className="bk-account-avatar" aria-hidden="true">{(displayName || 'B').slice(0, 1).toUpperCase()}</span>
          <p className="bk-eyebrow">{c.profile}</p>
          <strong>{displayName}</strong><span>{user.email}</span>
          {profile?.phone && <span>{profile.phone}</span>}
          <small>{c.memberSince} {new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(new Date(user.created_at))}</small>
        </aside>
        <section className="bk-orders" aria-labelledby="orders-title">
          <div className="bk-account-stats" aria-label={c.dashboard}>
            <div><strong>{fetching ? '—' : orders.length}</strong><span>{c.orders}</span><small>{c.ordersIntro}</small></div>
            <div><strong>{fetching ? '—' : activeOrders}</strong><span>{c.inProgress}</span><small>{c.status.pending}</small></div>
            <div><strong>{fetching ? '—' : deliveredOrders}</strong><span>{c.delivered}</span><small>{c.details}</small></div>
          </div>
          <div className="bk-orders-heading"><div><h2 id="orders-title">{c.orders}</h2><p>{c.ordersIntro}</p></div><Link className="bk-button" href="/boutique">{c.shop}<span aria-hidden="true">↗</span></Link></div>
          {fetching && <OrderListSkeleton />}
          {error && <p className="bk-form-error" role="alert">{error}</p>}
          {!fetching && !error && orders.length === 0 && <div className="bk-orders-empty"><p>{c.noOrders}</p><Link className="bk-text-link" href="/boutique">{c.shop}<span aria-hidden="true">↗</span></Link></div>}
          {orders.map(order => <article className="bk-order-row" key={order.id}>
            <div><p className="bk-eyebrow">{c.order}</p><h3>{order.reference}</h3><p>{new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(new Date(order.created_at))}</p></div>
            <div><span className={`bk-order-status is-${order.status}`}>{c.status[order.status] ?? order.status}</span><p>{order.braviko_order_items?.reduce((total, item) => total + item.quantity, 0) ?? 0} {c.orderedItems}</p></div>
            <strong>{money(Number(order.total), order.currency)}</strong>
            <details className="bk-order-details">
              <summary>{c.details}<span aria-hidden="true">↘</span></summary>
              <div className="bk-order-details-grid">
                <div><p className="bk-eyebrow">{c.orderedItems}</p>{order.braviko_order_items?.map(item => <p key={item.id}>{item.quantity} × {item.product_name}{item.variant_label ? ` — ${item.variant_label}` : ''}</p>)}</div>
                <div><p className="bk-eyebrow">{c.delivery}</p><p>{order.address}<br />{order.postal_code} {order.city}</p>{order.phone && <p>{order.phone}</p>}<p className="bk-eyebrow" style={{ marginTop: '18px' }}>Paiement</p><p>{order.payment_status === 'paid' ? 'Payé' : order.payment_status === 'failed' ? 'Échec du paiement' : 'En attente'}{order.payment_method ? ` · ${order.payment_method === 'card' ? 'Carte bancaire' : order.payment_method}` : ''}{order.paid_at ? ` · ${new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(new Date(order.paid_at))}` : ''}</p></div>
              </div>
            </details>
          </article>)}
        </section>
      </div>
      <section className="bk-account-support" aria-label={c.support}><div><p className="bk-eyebrow">BRAVIKO</p><h2>{c.support}</h2></div><Link className="bk-text-link" href="/contact">{c.supportLink}<span aria-hidden="true">↗</span></Link></section>
    </main>
    <Footer />
  </>
}
