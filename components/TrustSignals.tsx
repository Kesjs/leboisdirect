'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n-context'
import { bravikoCopy } from '@/data/braviko-copy'

export default function TrustSignals() {
  const { locale } = useI18n()
  const copy = bravikoCopy[locale]

  return (
    <section id="preuves" className="bk-trust-signals bk-container" aria-labelledby="trust-signals-title">
      <div className="bk-trust-heading" data-reveal>
        <p className="bk-eyebrow">{copy.trustEyebrow}</p>
        <h2 id="trust-signals-title">{copy.trustTitle}</h2>
        <p>{copy.trustIntro}</p>
      </div>
      <div className="bk-trust-metrics" aria-label={copy.trustTitle}>
        {copy.trustMetrics.map(([value, label]) => (
          <div className="bk-trust-metric" data-reveal key={`${value}-${label}`}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <div className="bk-trust-source" data-reveal>
        <p>{copy.trustSource}</p>
        <Link href="/boutique" className="bk-text-link">
          {copy.trustCta}<span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  )
}
