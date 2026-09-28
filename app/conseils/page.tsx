'use client'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useI18n } from '@/lib/i18n-context'
import { contentPages } from '@/data/content-pages'

export default function TipsPage() {
  const { locale } = useI18n(); const c = contentPages[locale].advice
  return <><Header /><main id="main-content" className="bk-home"><section className="bk-section bk-container"><p className="bk-eyebrow">{c.eyebrow}</p><h1 className="bk-title">{c.title}</h1><p className="bk-lead">{c.intro}</p></section><section className="bk-section bk-container"><div className="bk-quality-grid">{c.sections.map(([title, body], i) => <article key={title}><span className="bk-quality-index">0{i + 1}</span><h2>{title}</h2><p>{body}</p></article>)}</div></section><section className="bk-final bk-container"><div className="bk-final-copy"><p className="bk-eyebrow">BRAVIKO</p><h2>{c.cta}</h2><Link className="bk-button" href="/faq">{c.ctaLabel}<span aria-hidden="true">↗</span></Link></div><div className="bk-final-copy"><p className="bk-lead">{c.intro}</p></div></section></main><Footer /></>
}
