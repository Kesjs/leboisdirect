'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageSkeleton from '@/components/PageSkeleton'
import { useI18n } from '@/lib/i18n-context'
import { uiCopy } from '@/data/ui-copy'

type Receipt = {
  reference: string
  paid: boolean
  failed: boolean
  refunded: boolean
  testMode: boolean
  amount: number | null
  currency: string | null
  items?: { name: string; quantity: number | null }[]
}

type GoogleTagWindow = Window & {
  gtag?: (...args: unknown[]) => void
}

export default function OrderConfirmationPage() {
  const [receipt, setReceipt] = useState<Receipt | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [missing, setMissing] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const { locale } = useI18n()
  const c = uiCopy[locale].confirmation
  const trackedConversion = useRef<string | null>(null)

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get('session_id')
    if (!sessionId) { setMissing(true); setLoading(false); return }
    let active = true
    let timer: ReturnType<typeof setTimeout> | undefined
    const controller = new AbortController()
    setLoading(true)
    setError(false)
    setReceipt(null)
    const load = async (remaining: number) => {
      try {
        const response = await fetch(`/api/stripe/checkout/status?session_id=${encodeURIComponent(sessionId)}`, {
          cache: 'no-store', signal: controller.signal,
        })
        if (!response.ok) throw new Error('CONFIRMATION_UNAVAILABLE')
        const result: Receipt = await response.json()
        if (!active) return
        setReceipt(result)
        setLoading(false)
        if (!result.paid && !result.failed && !result.refunded && remaining > 0) {
          timer = setTimeout(() => { void load(remaining - 1) }, 1500)
        }
      } catch {
        if (active) { setError(true); setLoading(false) }
      }
    }
    void load(4)
    return () => { active = false; controller.abort(); if (timer) clearTimeout(timer) }
  }, [attempt])

  useEffect(() => {
    if (!receipt?.paid || receipt.testMode || receipt.amount == null) return
    const sessionId = new URLSearchParams(window.location.search).get('session_id')
    if (!sessionId || trackedConversion.current === sessionId) return
    const storageKey = `braviko-google-ads-conversion:${sessionId}`
    if (window.sessionStorage.getItem(storageKey)) return
    const gtag = (window as GoogleTagWindow).gtag
    if (!gtag) return
    gtag('event', 'conversion', {
      send_to: 'AW-18503582950/lSoBCLCd-ZYdEOaJmfdE',
      value: receipt.amount / 100,
      currency: receipt.currency || 'EUR',
      transaction_id: sessionId,
    })
    window.sessionStorage.setItem(storageKey, '1')
    trackedConversion.current = sessionId
  }, [receipt])

  if (loading) return <PageSkeleton variant="page" label={c.loading} />
  const title = receipt?.refunded ? c.refundedTitle : receipt?.paid ? (receipt.testMode ? c.recordedTitle : c.paidTitle) : receipt?.failed ? c.failedTitle : c.title
  const body = receipt?.refunded ? c.refundedBody : receipt?.paid ? (receipt.testMode ? c.recordedBody : c.paidBody) : receipt?.failed ? c.failedBody : c.body
  const amount = receipt?.amount != null && receipt.currency
    ? new Intl.NumberFormat(locale, { style: 'currency', currency: receipt.currency }).format(receipt.amount / 100)
    : null

  return <><Header /><main id="main-content" className="bk-home bk-container bk-section">
    <p className="bk-eyebrow">{c.eyebrow}</p>
    <h1 className="bk-title">{error ? c.errorTitle : missing ? c.missingTitle : title}</h1>
    <p className="bk-lead" role="status">{error ? c.errorBody : missing ? c.missing : body}</p>
    {receipt && <section className="bk-order-receipt" aria-labelledby="order-summary">
        <div><p className="bk-eyebrow">{c.reference}</p><h2 id="order-summary">{receipt.reference}</h2></div>
        <div className="bk-order-receipt-items"><p className="bk-eyebrow">{c.items}</p>
          {receipt.items?.map((item, index) => <p key={`${item.name}-${index}`}>{item.quantity} × {item.name}</p>)}
        </div>
        {amount && <div className="bk-order-receipt-total"><span>{c.total}</span><strong>{amount}</strong></div>}
    </section>}
    <div className="flex flex-wrap gap-16">
      {(error || (receipt && !receipt.paid && !receipt.failed && !receipt.refunded)) &&
        <button className="bk-button" type="button" onClick={() => setAttempt(value => value + 1)}>{c.retry}</button>}
      <Link href="/compte" className="bk-button">{c.account}<span aria-hidden="true">↗</span></Link>
      <Link href="/boutique" className="bk-text-link">{c.continue}</Link>
    </div>
  </main><Footer /></>
}
