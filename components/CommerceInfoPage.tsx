'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useI18n } from '@/lib/i18n-context'
import { commerceInfoCopy, type CommerceInfoDocument } from '@/data/commerce-info-copy'

export default function CommerceInfoPage({ document }: { document: keyof typeof commerceInfoCopy }) {
  const { locale } = useI18n()
  const copy: CommerceInfoDocument = commerceInfoCopy[document][locale]
  return <><Header /><main id="main-content" className="bk-home bk-container bk-legal-page"><header><p className="bk-eyebrow">{copy.eyebrow}</p><h1 className="bk-title">{copy.title}</h1><p className="bk-lead">{copy.intro}</p><small>{copy.updated}</small></header><div className="bk-legal-sections">{copy.sections.map((section, index) => <section key={section.title}><span>{String(index + 1).padStart(2, '0')}</span><div><h2>{section.title}</h2><p>{section.body}</p></div></section>)}</div></main><Footer /></>
}
