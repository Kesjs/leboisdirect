'use client'

import { useState, type FormEvent } from 'react'
import { useI18n, type Locale } from '@/lib/i18n-context'
import { DeliveryCountrySelect } from '@/components/CountrySelect'
import {
  getCountryByIso,
  validatePostalCodeForCountry,
  type CountryIso,
  type EuropeanCountry,
} from '@/lib/countries'
import type { AddressSuggestion } from '@/app/api/address-autocomplete/route'

type CheckerResult = {
  postalCode: string
  country: EuropeanCountry
  cityLabel: string | null
  delayText: string
  islandNote: string | null
}

const checkerCopy: Record<
  Locale,
  {
    eyebrow: string
    title: string
    subtitle: string
    countryLabel: string
    postalLabel: string
    submit: string
    checking: string
    freeBadge: string
    browseCta: string
    appointmentNote: string
  }
> = {
  it: {
    eyebrow: 'Verifica immediata · Consegna gratuita',
    title: 'Controlla la consegna al tuo CAP.',
    subtitle:
      'Inserisci il codice postale per verificare copertura, modalità di scarico con sponda idraulica e tempi indicativi. Trasporto sempre gratuito.',
    countryLabel: 'Paese',
    postalLabel: 'CAP / Codice postale',
    submit: 'Verifica zona',
    checking: 'Verifica…',
    freeBadge: 'Trasporto 0,00 € · Consegna gratuita attiva',
    browseCta: 'Scopri i prodotti disponibili',
    appointmentNote: 'Spedizione entro 48 ore lavorative · Preavviso telefonico incluso per bancali e stufe.',
  },
  fr: {
    eyebrow: 'Vérification immédiate · Livraison offerte',
    title: 'Vérifiez la livraison à votre code postal.',
    subtitle:
      'Indiquez votre code postal pour confirmer la couverture, le déchargement par hayon et les délais estimés. Livraison toujours gratuite.',
    countryLabel: 'Pays',
    postalLabel: 'Code postal',
    submit: 'Vérifier',
    checking: 'Vérification…',
    freeBadge: 'Livraison 0,00 € · Offerte sans minimum',
    browseCta: 'Voir les produits disponibles',
    appointmentNote: 'Expédition sous 48 h ouvrées · Prise de rendez-vous téléphonique incluse pour les palettes.',
  },
  de: {
    eyebrow: 'Schnellprüfung · Gratis Versand',
    title: 'Lieferung für Ihre Postleitzahl prüfen.',
    subtitle:
      'Geben Sie Ihre Postleitzahl ein, um Zustellung per Hebebühne und voraussichtliche Lieferzeit zu bestätigen. Immer versandkostenfrei.',
    countryLabel: 'Land',
    postalLabel: 'Postleitzahl',
    submit: 'Prüfen',
    checking: 'Wird geprüft…',
    freeBadge: 'Versand 0,00 € · Kostenlos ohne Mindestbestellwert',
    browseCta: 'Verfügbare Produkte ansehen',
    appointmentNote: 'Versand binnen 48 Werkstunden · Telefonische Terminabsprache bei Paletten inklusive.',
  },
}

function isItalianIslandPostal(postal: string): boolean {
  const num = Number.parseInt(postal, 10)
  if (Number.isNaN(num)) return false
  const sicily = num >= 90010 && num <= 98168
  const sardinia = num >= 7010 && num <= 9170
  return sicily || sardinia
}

export default function DeliveryCheckerSection() {
  const { locale } = useI18n()
  const copy = checkerCopy[locale]

  const [countryIso, setCountryIso] = useState<CountryIso>('IT')
  const [postalCode, setPostalCode] = useState('')
  const [error, setError] = useState('')
  const [checking, setChecking] = useState(false)
  const [result, setResult] = useState<CheckerResult | null>(null)

  const selectedCountry = getCountryByIso(countryIso)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const cleanPostal = postalCode.trim()
    const validationError = validatePostalCodeForCountry(selectedCountry.iso, cleanPostal, locale)
    if (validationError) {
      setError(validationError)
      setResult(null)
      return
    }

    setError('')
    setChecking(true)

    let detectedCity: string | null = null
    try {
      const res = await fetch(
        `/api/address-autocomplete?q=${encodeURIComponent(cleanPostal)}&country=${encodeURIComponent(selectedCountry.iso)}`,
      )
      if (res.ok) {
        const data = (await res.json()) as { suggestions?: AddressSuggestion[] }
        const first = data.suggestions?.[0]
        if (first?.city) {
          detectedCity = first.region ? `${first.city} (${first.region})` : first.city
        }
      }
    } catch {
      detectedCity = null
    } finally {
      setChecking(false)
    }

    const island = selectedCountry.iso === 'IT' && isItalianIslandPostal(cleanPostal)
    setResult({
      postalCode: cleanPostal,
      country: selectedCountry,
      cityLabel: detectedCity,
      delayText: island
        ? locale === 'fr'
          ? 'Livraison offerte en 6–12 j ouvrés (liaison insulaire)'
          : locale === 'de'
            ? 'Gratis Lieferung in 6–12 Werktagen (Inselregion)'
            : 'Consegna gratuita in 6–12 gg lavorativi (tratta marittima inclusa)'
        : selectedCountry.deliveryDelay[locale],
      islandNote: island
        ? locale === 'it'
          ? 'Nessun supplemento per isole: il trasporto resta 100 % gratuito.'
          : null
        : null,
    })
  }

  return (
    <section id="verifica-consegna" className="bk-cap-section bk-container" aria-labelledby="cap-checker-title">
      <div className="bk-cap-card">
        <div className="bk-cap-copy">
          <p className="bk-eyebrow">{copy.eyebrow}</p>
          <h2 id="cap-checker-title">{copy.title}</h2>
          <p>{copy.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="bk-cap-form" noValidate>
          <div className="bk-cap-inputs">
            <div className="bk-cap-country">
              <label htmlFor="home-cap-country" className="sr-only">
                {copy.countryLabel}
              </label>
              <DeliveryCountrySelect
                id="home-cap-country"
                value={countryIso}
                onChange={(country) => {
                  setCountryIso(country.iso)
                  setError('')
                  setResult(null)
                }}
                ariaLabel={copy.countryLabel}
                freeShippingBadge={locale === 'it' ? 'Gratuita' : locale === 'fr' ? 'Offerte' : 'Gratis'}
              />
            </div>

            <div className="bk-cap-postal-wrap">
              <label htmlFor="home-cap-postal" className="sr-only">
                {copy.postalLabel}
              </label>
              <input
                id="home-cap-postal"
                type="text"
                inputMode="numeric"
                value={postalCode}
                onChange={(e) => {
                  setPostalCode(e.target.value)
                  if (error) setError('')
                }}
                maxLength={10}
                placeholder={selectedCountry.postalPlaceholder}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? 'home-cap-error' : undefined}
                className={error ? 'has-error' : ''}
              />
            </div>

            <button type="submit" className="bk-button bk-cap-submit" disabled={checking}>
              {checking ? copy.checking : copy.submit}
              <span aria-hidden="true">↗</span>
            </button>
          </div>

          {error && (
            <p id="home-cap-error" role="alert" className="bk-cap-error">
              {error}
            </p>
          )}

          {result && (
            <div className="bk-cap-result" role="status">
              <div className="bk-cap-result-head">
                <span className="bk-cap-badge">{copy.freeBadge}</span>
                <strong>
                  {result.country.name[locale]} · CAP {result.postalCode}
                  {result.cityLabel ? ` — ${result.cityLabel}` : ''}
                </strong>
              </div>
              <p>
                {result.delayText}. {copy.appointmentNote}
                {result.islandNote ? ` ${result.islandNote}` : ''}
              </p>
              <a
                href="#selection"
                className="bk-text-link"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('selection')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
              >
                {copy.browseCta}
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          )}
        </form>
      </div>
    </section>
  )
}
