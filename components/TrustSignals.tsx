'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useI18n, type Locale } from '@/lib/i18n-context'
import { HEATING_FILTER_GROUPS, type HeatingGroupId } from '@/data/catalog-taxonomy'

type Props = {
  activeGroup?: HeatingGroupId
  onSelectGroup?: (group: HeatingGroupId) => void
}

const showcaseCopy: Record<Locale, { eyebrow: string; title: string; allCta: string }> = {
  fr: {
    eyebrow: 'Accès rapide · Par besoin',
    title: 'Choisissez selon votre besoin.',
    allCta: 'Voir toute la boutique',
  },
  de: {
    eyebrow: 'Schnellzugriff · Nach Bedarf',
    title: 'Wählen Sie nach Bedarf.',
    allCta: 'Zum gesamten Sortiment',
  },
  it: {
    eyebrow: 'Accesso rapido · Per esigenza',
    title: 'Scegli in base alle tue esigenze.',
    allCta: 'Vedi tutto il negozio',
  },
}

const categoryCards = HEATING_FILTER_GROUPS.filter(group => group.id !== 'all' && group.image)

export default function TrustSignals({ activeGroup = 'all', onSelectGroup }: Props) {
  const { locale } = useI18n()
  const copy = showcaseCopy[locale]

  const handleSelect = (groupId: HeatingGroupId) => {
    onSelectGroup?.(groupId)
    document.getElementById('selection')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="categories" className="bk-category-showcase bk-container" aria-labelledby="category-showcase-title">
      <div className="bk-category-showcase-head" data-reveal>
        <div>
          <p className="bk-eyebrow">{copy.eyebrow}</p>
          <h2 id="category-showcase-title">{copy.title}</h2>
        </div>
        <Link href="/boutique" className="bk-text-link">
          {copy.allCta}<span aria-hidden="true">↗</span>
        </Link>
      </div>
      <div className="bk-category-grid">
        {categoryCards.map(group => {
          const isActive = activeGroup === group.id
          return (
            <button
              key={group.id}
              type="button"
              className={'bk-category-card' + (isActive ? ' is-active' : '')}
              aria-pressed={isActive}
              onClick={() => handleSelect(group.id)}
              data-reveal
            >
              <div className="bk-category-media">
                <Image
                  src={group.image!}
                  alt={group.label[locale]}
                  fill
                  sizes="(max-width: 700px) 46vw, (max-width: 900px) 45vw, 24vw"
                  className="bk-image"
                />
              </div>
              <div className="bk-category-body">
                <div className="bk-category-title-row">
                  <span>{group.shortLabel?.[locale] || group.label[locale]}</span>
                  <span aria-hidden="true">→</span>
                </div>
                {group.description && <p>{group.description[locale]}</p>}
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
