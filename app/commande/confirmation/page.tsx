'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageSkeleton from '@/components/PageSkeleton'
import { readOrderDraft, type OrderDraft } from '@/lib/order'
import { formatPrice } from '@/lib/utils'
import { useI18n } from '@/lib/i18n-context'
import { uiCopy } from '@/data/ui-copy'
import { productLabel } from '@/data/product-labels'

export default function OrderConfirmationPage() {
  const [order, setOrder] = useState<OrderDraft | null>(null)
  const [loading, setLoading] = useState(true)
  const { locale } = useI18n(); const c = uiCopy[locale].confirmation
  useEffect(() => { setOrder(readOrderDraft()); setLoading(false) }, [])
  if (loading) return <PageSkeleton variant="page" label={c.title} />
  return <><Header /><main id="main-content" className="bk-home bk-container bk-section"><p className="bk-eyebrow">{c.eyebrow}</p><h1 className="bk-title">{c.title}</h1><p className="bk-lead">{c.body}</p>{order ? <section className="bk-section" aria-labelledby="order-summary"><div className="bk-agriculture-preview"><div><p className="bk-eyebrow">{c.reference}</p><h2 id="order-summary">{order.reference}</h2><p>{c.created} {new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(new Date(order.createdAt))} {c.for} {order.customer.firstName} {order.customer.lastName}.</p></div><div><p className="bk-eyebrow">{c.items}</p>{order.items.map(item => <p key={item.product.id + item.variantId}>{item.quantity} × {productLabel(item.product, locale).name}</p>)}<p style={{marginTop:'20px'}}><strong>{formatPrice(order.subtotal)}</strong></p></div></div></section> : <p className="bk-lead">{c.missing}</p>}<div className="flex gap-16"><Link href="/boutique" className="bk-button">{c.continue} <span aria-hidden="true">↗</span></Link><Link href="/" className="bk-text-link">{c.home} <span aria-hidden="true">↗</span></Link></div></main><Footer /></>
}
