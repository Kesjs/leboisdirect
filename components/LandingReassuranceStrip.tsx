'use client'

import { useI18n, type Locale } from '@/lib/i18n-context'

type Pillar = {
  icon: 'truck' | 'flame' | 'shield' | 'card'
  title: string
  subtitle: string
}

const stripCopy: Record<Locale, Pillar[]> = {
  it: [
    {
      icon: 'truck',
      title: 'Spedizione gratuita 100 %',
      subtitle: 'Su tutto il catalogo, senza minimo d’ordine',
    },
    {
      icon: 'flame',
      title: 'Legna < 20 % & ENplus A1',
      subtitle: 'Combustibili naturali senza leganti né colle',
    },
    {
      icon: 'shield',
      title: 'Sponda idraulica su RDV',
      subtitle: 'Il corriere ti contatta prima dello scarico',
    },
    {
      icon: 'card',
      title: 'Stripe 3DS, SEPA & reso 14 gg',
      subtitle: 'Pagamento protetto e assistenza diretta',
    },
  ],
  fr: [
    {
      icon: 'truck',
      title: 'Livraison gratuite 100 %',
      subtitle: 'Sur tout le catalogue, sans minimum d’achat',
    },
    {
      icon: 'flame',
      title: 'Bois < 20 % & ENplus A1',
      subtitle: 'Combustibles 100 % naturels sans liant',
    },
    {
      icon: 'shield',
      title: 'Hayon & RDV téléphonique',
      subtitle: 'Déchargement soigné avec transpallet',
    },
    {
      icon: 'card',
      title: 'Stripe 3DS, SEPA & retour 14 j',
      subtitle: 'Paiement sécurisé et SAV réactif',
    },
  ],
  de: [
    {
      icon: 'truck',
      title: '100 % gratis Versand',
      subtitle: 'Für das gesamte Sortiment ohne Mindestwert',
    },
    {
      icon: 'flame',
      title: 'Holz < 20 % & ENplus A1',
      subtitle: 'Naturreine Brennstoffe ohne Bindemittel',
    },
    {
      icon: 'shield',
      title: 'Hebebühne nach Termin',
      subtitle: 'Telefonische Abstimmung vor Anlieferung',
    },
    {
      icon: 'card',
      title: 'Stripe 3DS, SEPA & 14 Tage Widerruf',
      subtitle: 'Geschützte Zahlung und direkter Support',
    },
  ],
}

function StripIcon({ icon }: { icon: Pillar['icon'] }) {
  switch (icon) {
    case 'truck':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 6h11v10H3zM14 10h4l3 3v3h-7z" />
          <circle cx="7" cy="18" r="2" />
          <circle cx="18" cy="18" r="2" />
        </svg>
      )
    case 'flame':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2c.7 3.6 3.5 5.4 3.5 8.8A3.5 3.5 0 0 1 12 14.3a3.5 3.5 0 0 1-3.5-3.5c0-1.3.4-2.4 1-3.3C7.2 8.7 5.5 11.2 5.5 14a6.5 6.5 0 0 0 13 0c0-4.8-3.4-8.4-6.5-12Z" />
        </svg>
      )
    case 'shield':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 3 5 6v5c0 4.6 2.9 8.2 7 10 4.1-1.8 7-5.4 7-10V6l-7-3Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      )
    case 'card':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 10h18M7 15h4" />
        </svg>
      )
  }
}

export default function LandingReassuranceStrip() {
  const { locale } = useI18n()
  const pillars = stripCopy[locale]

  return (
    <section className="bk-reassurance-strip bk-container" aria-label="Garanzie principali Braviko">
      <div className="bk-reassurance-grid">
        {pillars.map((pillar) => (
          <div key={pillar.title} className="bk-reassurance-item">
            <span className="bk-reassurance-icon">
              <StripIcon icon={pillar.icon} />
            </span>
            <div>
              <strong>{pillar.title}</strong>
              <p>{pillar.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
