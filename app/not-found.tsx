'use client'

import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { uiCopy } from '@/data/ui-copy'
import { useI18n } from '@/lib/i18n-context'

export default function NotFound() {
  const { locale } = useI18n(); const c = uiCopy[locale].notFound
  return <><Header /><main id="main-content" className="bk-home bk-container bk-section"><p className="bk-eyebrow">404 / BRAVIKO</p><h1 className="bk-title">{c.title}</h1><p className="bk-lead">{c.body}</p><div className="flex gap-16" style={{marginTop:'32px'}}><Link href="/boutique" className="bk-button">{c.shop} <span aria-hidden="true">↗</span></Link><Link href="/" className="bk-text-link">{c.home} <span aria-hidden="true">↗</span></Link></div></main><Footer /></>
}
