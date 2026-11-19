'use client'

import Link from 'next/link'
import { useI18n, type Locale } from '@/lib/i18n-context'
import { productReviewsData } from '@/data/product-reviews'
import { BRAVIKO_ABOUT_CONTENT } from '@/data/product-category-content'
import { pageCopy } from '@/data/page-copy'
import { PaymentBadgesRow } from '@/components/PaymentLogos'

type FeaturedReviewItem = {
  slug: string
  productLabel: string
  categoryTag: string
  author: string
  city: string
  rating: number
  text: string
  label: string
}

const FEATURED_REVIEW_SLUGS: Array<{ slug: string; productLabel: Record<Locale, string>; categoryTag: Record<Locale, string>; author: string }> = [
  {
    slug: 'bois-de-chauffage-premium-chene-charme-hetre-2-steres-33-cm',
    productLabel: {
      it: 'Legna Quercia, Carpino & Faggio 33 cm',
      fr: 'Bois Chêne, Charme & Hêtre 33 cm',
      de: 'Brennholz Eiche, Buche & Hainbuche 33 cm',
    },
    categoryTag: { it: 'Legna essiccata < 20 %', fr: 'Bois séché < 20 %', de: 'Kammergetrocknet < 20 %' },
    author: 'Cristiano D.',
  },
  {
    slug: 'granules-bois-premium-6mm-palette-990-kg',
    productLabel: {
      it: 'Pellet Premium 6 mm – Bancale 990 kg',
      fr: 'Granulés Premium 6 mm – Palette 990 kg',
      de: 'Holzpellets Premium 6 mm – 990 kg',
    },
    categoryTag: { it: 'Certificato ENplus A1', fr: 'Certifié ENplus A1', de: 'ENplus A1 zertifiziert' },
    author: 'Oliviero D.',
  },
  {
    slug: 'buches-densifiees-premium-palette-1000-kg',
    productLabel: {
      it: 'Tronchetti densificati – Bancale 1000 kg',
      fr: 'Bûches densifiées – Palette 1000 kg',
      de: 'Holzbriketts – Palette 1000 kg',
    },
    categoryTag: { it: 'Alta densità', fr: 'Haute densité', de: 'Hohe Dichte' },
    author: 'Michele C.',
  },
  {
    slug: 'poele-bois-fonte-bronpi-karen-8-kw',
    productLabel: {
      it: 'Stufa a legna in ghisa Bronpi KAREN 8 kW',
      fr: 'Poêle fonte Bronpi KAREN 8 kW',
      de: 'Gusseisen-Kaminofen Bronpi KAREN 8 kW',
    },
    categoryTag: { it: 'Stufa in ghisa 82 %', fr: 'Fonte haut rendement', de: 'Gusseisenofen 82 %' },
    author: 'Pasquale V.',
  },
  {
    slug: 'insert-bois-invicta-p947044-10-kw',
    productLabel: {
      it: 'Inserto camino a legna Invicta 10 kW',
      fr: 'Insert bois Invicta 10 kW',
      de: 'Kamineinsatz Invicta 10 kW',
    },
    categoryTag: { it: 'Inserto ghisa 10 kW', fr: 'Insert fonte 10 kW', de: 'Kamineinsatz 10 kW' },
    author: 'Bernardo P.',
  },
  {
    slug: 'brasero-plancha-le-bigorneau-acier-corten-100-cm',
    productLabel: {
      it: 'Braciere Plancha Corten 100 cm',
      fr: 'Brasero Plancha Corten 100 cm',
      de: 'Feuerschale Plancha Corten 100 cm',
    },
    categoryTag: { it: 'Acciaio Corten', fr: 'Acier Corten', de: 'Cortenstahl' },
    author: 'Nicola V.',
  },
]

const sectionCopy: Record<
  Locale,
  {
    reviewsEyebrow: string
    reviewsTitle: string
    reviewsIntro: string
    exploreCatalog: string
    reviewsLink: string
    ratingOf5: string
    guaranteesEyebrow: string
    guaranteesTitle: string
    guaranteesBody: string
    guaranteesItems: Array<[string, string]>
    paymentTitle: string
    paymentBody: string
    aboutEyebrow: string
    aboutIntro: string
    aboutMore: string
    specsMore: string
    faqEyebrow: string
    faqTitle: string
    faqIntro: string
    faqAll: string
    adviceLink: string
  }
> = {
  it: {
    reviewsEyebrow: 'Esperienze sui nostri prodotti',
    reviewsTitle: 'Cosa raccontano i clienti sulle nostre forniture.',
    reviewsIntro:
      'Estratti delle valutazioni pubblicate direttamente sulle schede dei nostri articoli più richiesti: dalla consegna su bancale alla resa nel focolare.',
    exploreCatalog: 'Esplora il catalogo',
    reviewsLink: 'Vedi scheda prodotto',
    ratingOf5: 'su 5',
    guaranteesEyebrow: 'Trasparenza · Pagamenti e tutele',
    guaranteesTitle: 'Acquisti protetti, costi chiari fin dal primo clic.',
    guaranteesBody:
      'Nessun costo nascosto al momento del pagamento: il prezzo esposto include IVA e spedizione gratuita su tutto il catalogo, con assistenza diretta prima e dopo la consegna.',
    guaranteesItems: [
      ['Spedizione 0 € garantita', 'Consegna gratuita su tutto il catalogo senza soglia minima e senza supplementi al checkout.'],
      ['Preavviso corriere incluso', 'Per bancali e stufe, il trasportatore concorda il passaggio per telefono prima di scaricare con sponda idraulica.'],
      ['Recesso 14 giorni e garanzia 2–5 anni', 'Diritto di recesso legale di 14 giorni su articoli integri più garanzie dei costruttori sugli apparecchi.'],
      ['Assistenza diretta Braviko', 'Risposta dedicata su dubbi tecnici, accesso stradale e fatturazione tramite contact@braviko.fr.'],
    ],
    paymentTitle: 'Pagamenti accettati & crittografati',
    paymentBody: 'Carta di credito/debito via Stripe 3D Secure oppure bonifico bancario SEPA.',
    aboutEyebrow: BRAVIKO_ABOUT_CONTENT.eyebrow,
    aboutIntro: BRAVIKO_ABOUT_CONTENT.intro,
    aboutMore: 'Scopri chi siamo',
    specsMore: 'Stato e dettagli prodotti',
    faqEyebrow: 'Domande frequenti prima dell’ordine',
    faqTitle: 'Risposte dirette su legna, consegna e pagamenti.',
    faqIntro: 'Tutti i punti pratici da verificare prima di confermare il tuo bancale o apparecchio.',
    faqAll: 'Apri tutte le FAQ',
    adviceLink: 'Consigli su scelta e stoccaggio',
  },
  fr: {
    reviewsEyebrow: 'Retours sur nos références',
    reviewsTitle: 'Ce que nos clients apprécient à l’usage.',
    reviewsIntro:
      'Extraits des retours publiés sur les fiches de nos références phares : qualité du séchage, tenue des braises et déchargement sur palette.',
    exploreCatalog: 'Parcourir le catalogue',
    reviewsLink: 'Voir la fiche',
    ratingOf5: 'sur 5',
    guaranteesEyebrow: 'Transparence · Paiement & garanties',
    guaranteesTitle: 'Des achats encadrés, sans frais cachés.',
    guaranteesBody:
      'Le tarif affiché inclut la TVA et la livraison gratuite sans minimum d’achat, avec accompagnement direct avant et après la réception.',
    guaranteesItems: [
      ['Livraison 0 € incluse', 'Livraison offerte sur tout le catalogue, sans minimum ni supplément au paiement.'],
      ['Prise de RDV incluse', 'Pour palettes et poêles, le transporteur vous appelle avant le déchargement au hayon.'],
      ['Rétractation 14 j & garanties', '14 jours de rétractation légale plus garanties constructeurs 2 à 5 ans sur les appareils.'],
      ['Support direct Braviko', 'Équipe joignable sur contact@braviko.fr pour toute question technique ou logistique.'],
    ],
    paymentTitle: 'Paiements sécurisés acceptés',
    paymentBody: 'Carte bancaire via Stripe 3D Secure ou virement bancaire SEPA.',
    aboutEyebrow: 'À propos · Braviko',
    aboutIntro:
      'Braviko sélectionne combustibles certifiés, poêles et équipements de chauffage avec des fiches techniques vérifiées et une livraison gratuite organisée sans surprise.',
    aboutMore: 'Découvrir Braviko',
    specsMore: 'Conformité & détails produits',
    faqEyebrow: 'Questions fréquentes',
    faqTitle: 'Les réponses clés avant de commander.',
    faqIntro: 'Les points essentiels sur l’humidité du bois, l’accès camion et le règlement.',
    faqAll: 'Toutes les FAQ',
    adviceLink: 'Guides choix & stockage',
  },
  de: {
    reviewsEyebrow: 'Kundenstimmen zu unseren Artikeln',
    reviewsTitle: 'Rückmeldungen aus dem Alltag.',
    reviewsIntro:
      'Auszüge direkt aus unseren Produktbewertungen zu Restfeuchte, Brennverhalten und Anlieferung per Hebebühne.',
    exploreCatalog: 'Zum gesamten Sortiment',
    reviewsLink: 'Zum Produkt',
    ratingOf5: 'von 5',
    guaranteesEyebrow: 'Transparenz · Zahlung & Schutz',
    guaranteesTitle: 'Klar kalkuliert, ohne versteckte Gebühren.',
    guaranteesBody:
      'Alle Preise verstehen sich inklusive Mehrwertsteuer und kostenlosem Versand ohne Mindestbestellwert.',
    guaranteesItems: [
      ['0 € Versand garantiert', 'Kostenlose Lieferung für das gesamte Sortiment ohne Aufpreis an der Kasse.'],
      ['Telefonische Terminabsprache', 'Bei Paletten und Öfen meldet sich der Spediteur vorab zur Abstimmung.'],
      ['14 Tage Widerruf & Garantie', 'Gesetzliches Widerrufsrecht plus 2–5 Jahre Herstellergarantie je nach Gerät.'],
      ['Direkter Kundenservice', 'Persönliche Unterstützung unter contact@braviko.fr.'],
    ],
    paymentTitle: 'Sichere Zahlungsarten',
    paymentBody: 'Kreditkarte über Stripe 3D Secure oder SEPA-Banküberweisung.',
    aboutEyebrow: 'Über uns · Braviko',
    aboutIntro:
      'Braviko wählt geprüfte Brennstoffe, Kaminöfen und Zubehör mit klaren technischen Daten und planbarer kostenloser Lieferung aus.',
    aboutMore: 'Über Braviko',
    specsMore: 'Produktdetails & Normen',
    faqEyebrow: 'Häufige Fragen',
    faqTitle: 'Klare Antworten vor der Bestellung.',
    faqIntro: 'Alles Wichtige zu Restfeuchte, Zufahrt per Lkw und Zahlung.',
    faqAll: 'Alle FAQ öffnen',
    adviceLink: 'Ratgeber zu Wahl & Lagerung',
  },
}

export default function LandingTrustSections() {
  const { locale } = useI18n()
  const copy = sectionCopy[locale]
  const faqData = pageCopy[locale].faq

  const resolvedReviews: FeaturedReviewItem[] = FEATURED_REVIEW_SLUGS.map((entry) => {
    const match = productReviewsData.find(
      (r) => r.matches.includes(entry.slug) && r.author === entry.author,
    )
    return {
      slug: entry.slug,
      productLabel: entry.productLabel[locale],
      categoryTag: entry.categoryTag[locale],
      author: match?.author || entry.author,
      city: match?.city || 'Italia',
      rating: match?.rating ?? 5,
      text: match?.text || '',
      label: match?.label || '',
    }
  }).filter((item) => item.text.length > 0)

  const categories = faqData.categories as Array<[string, Array<[string, string]>]>
  const homeFaqItems = categories.flatMap(([, pairs]) => pairs).slice(0, 6)

  return (
    <div className="bk-trust-stack">
      {/* 1. Buyer feedback excerpts grounded in catalog reviews */}
      <section className="bk-section bk-container bk-reviews-home" aria-labelledby="home-reviews-title">
        <div className="bk-selection-heading">
          <div>
            <p className="bk-eyebrow">{copy.reviewsEyebrow}</p>
            <h2 id="home-reviews-title" className="bk-title">
              {copy.reviewsTitle}
            </h2>
            <p className="bk-lead">{copy.reviewsIntro}</p>
          </div>
          <Link href="/boutique" className="bk-text-link">
            {copy.exploreCatalog}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <div className="bk-home-reviews-grid">
          {resolvedReviews.map((item) => (
            <article key={`${item.slug}-${item.author}`} className="bk-home-review-card">
              <div className="bk-home-review-top">
                <span className="bk-home-review-stars" aria-label={`${item.rating} ${copy.ratingOf5}`}>
                  {'★★★★★'.slice(0, item.rating)}
                </span>
                <span className="bk-home-review-tag">{item.categoryTag}</span>
              </div>
              <p className="bk-home-review-quote">“{item.text}”</p>
              <div className="bk-home-review-foot">
                <div>
                  <strong>{item.author}</strong>
                  <span>
                    {item.city} · {item.label}
                  </span>
                </div>
                <Link href={`/produit/${item.slug}`} className="bk-home-review-link">
                  {copy.reviewsLink} ↗
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 2. Chi siamo + Buyer Guarantees & Payments */}
      <section className="bk-home-about-band" aria-labelledby="home-about-title">
        <div className="bk-container bk-home-about-grid">
          <div className="bk-home-about-copy">
            <p className="bk-eyebrow">{copy.aboutEyebrow}</p>
            <h2 id="home-about-title">{copy.guaranteesTitle}</h2>
            <p className="bk-home-about-lead">{copy.aboutIntro}</p>
            <p className="bk-home-about-sub">{copy.guaranteesBody}</p>

            <div className="bk-home-about-links">
              <Link href="/notre-histoire" className="bk-button">
                {copy.aboutMore}
                <span aria-hidden="true">↗</span>
              </Link>
              <Link href="/informations-produits" className="bk-text-link">
                {copy.specsMore}
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>

          <div className="bk-home-guarantees-card">
            <div className="bk-home-guarantees-list">
              {copy.guaranteesItems.map(([title, body]) => (
                <div key={title} className="bk-home-guarantee-row">
                  <span className="bk-home-guarantee-check" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bk-home-payment-box">
              <div>
                <strong>{copy.paymentTitle}</strong>
                <p>{copy.paymentBody}</p>
              </div>
              <PaymentBadgesRow />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Homepage Interactive Mini-FAQ & Guides */}
      <section className="bk-section bk-container bk-home-faq" aria-labelledby="home-faq-title">
        <div className="bk-home-faq-layout">
          <div className="bk-home-faq-intro">
            <p className="bk-eyebrow">{copy.faqEyebrow}</p>
            <h2 id="home-faq-title" className="bk-title">
              {copy.faqTitle}
            </h2>
            <p className="bk-lead">{copy.faqIntro}</p>
            <div className="bk-home-faq-actions">
              <Link href="/faq" className="bk-text-link">
                {copy.faqAll}
                <span aria-hidden="true">↗</span>
              </Link>
              <Link href="/conseils" className="bk-text-link">
                {copy.adviceLink}
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>

          <div className="bk-product-faq-list bk-home-faq-list">
            {homeFaqItems.map(([question, answer]) => (
              <details key={question}>
                <summary>
                  {question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
