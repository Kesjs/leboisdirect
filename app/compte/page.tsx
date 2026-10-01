'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
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
  braviko_order_items: { id: string }[] | null
}

export default function AccountPage() {
  const router = useRouter()
  const { user, loading, signOut } = useAuth()
  const { locale } = useI18n()
  const c = accountCopy[locale]
  const supabase = useMemo(() => createClient(), [])
  const [orders, setOrders] = useState<Order[]>([])
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!loading && !user) router.replace('/connexion?next=/compte')
  }, [loading, router, user])

  useEffect(() => {
    if (!user) return
    supabase.from('braviko_orders')
      .select('id, reference, status, total, currency, created_at, braviko_order_items(id)')
      .order('created_at', { ascending: false })
      .then(({ data, error: queryError }: { data: Order[] | null; error: { message: string } | null }) => {
        if (queryError) setError(queryError.message)
        else setOrders((data ?? []) as Order[])
        setFetching(false)
      })
  }, [supabase, user])

  if (loading || !user) return <><Header /><main id="main-content" className="bk-home bk-container bk-section"><p className="bk-lead">{c.loading}</p></main></>

  const money = (value: number, currency: string) => new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value)
  const displayName = [user.user_metadata?.first_name, user.user_metadata?.last_name].filter(Boolean).join(' ') || user.email

  return <>
    <Header />
    <main id="main-content" className="bk-home bk-container bk-account-page">
      <header className="bk-account-heading">
        <div><p className="bk-eyebrow">BRAVIKO / {c.dashboard}</p><h1>{c.account}</h1><p>{displayName}</p></div>
        <button className="bk-text-link" onClick={async () => { await signOut(); router.replace('/') }}>{c.logout}<span aria-hidden="true">↗</span></button>
      </header>
      <div className="bk-account-layout">
        <aside className="bk-account-profile">
          <span className="bk-account-avatar" aria-hidden="true">{(displayName || 'B').slice(0, 1).toUpperCase()}</span>
          <p className="bk-eyebrow">{c.profile}</p>
          <strong>{displayName}</strong><span>{user.email}</span>
          <small>{c.memberSince} {new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(new Date(user.created_at))}</small>
        </aside>
        <section className="bk-orders" aria-labelledby="orders-title">
          <div className="bk-orders-heading"><div><p className="bk-eyebrow">{orders.length.toString().padStart(2, '0')}</p><h2 id="orders-title">{c.orders}</h2><p>{c.ordersIntro}</p></div><Link className="bk-button" href="/boutique">{c.shop}<span aria-hidden="true">↗</span></Link></div>
          {fetching && <p className="bk-lead">{c.loading}</p>}
          {error && <p className="bk-form-error" role="alert">{error}</p>}
          {!fetching && !error && orders.length === 0 && <div className="bk-orders-empty"><p>{c.noOrders}</p><Link className="bk-text-link" href="/boutique">{c.shop}<span aria-hidden="true">↗</span></Link></div>}
          {orders.map(order => <article className="bk-order-row" key={order.id}>
            <div><p className="bk-eyebrow">{c.order}</p><h3>{order.reference}</h3><p>{new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(new Date(order.created_at))}</p></div>
            <div><span className={`bk-order-status is-${order.status}`}>{c.status[order.status] ?? order.status}</span><p>{order.braviko_order_items?.length ?? 0} {c.items}</p></div>
            <strong>{money(Number(order.total), order.currency)}</strong>
          </article>)}
        </section>
      </div>
    </main>
    <Footer />
  </>
}
