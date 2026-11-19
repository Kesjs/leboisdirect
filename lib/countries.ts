import type { Locale } from '@/lib/i18n-context'

export type CountryIso = 'IT' | 'FR' | 'CH' | 'DE' | 'BE' | 'LU'

export type EuropeanCountry = {
  iso: CountryIso
  flag: Lowercase<CountryIso>
  dialCode: string
  name: Record<Locale, string>
  phonePlaceholder: string
  phoneExample: string
  phoneMinDigits: number
  phoneMaxDigits: number
  phoneInputMaxLength: number
  addressPlaceholder: string
  postalPlaceholder: string
  cityPlaceholder: string
  postalRegex: RegExp
  postalHint: Record<Locale, string>
  deliveryDelay: Record<Locale, string>
  geoBias: { lat: number; lon: number }
}

export const EUROPEAN_COUNTRIES: EuropeanCountry[] = [
  {
    iso: 'IT',
    flag: 'it',
    dialCode: '+39',
    name: { it: 'Italia', fr: 'Italie', de: 'Italien' },
    phonePlaceholder: '333 123 4567',
    phoneExample: '333 123 4567',
    phoneMinDigits: 8,
    phoneMaxDigits: 11,
    phoneInputMaxLength: 16,
    addressPlaceholder: 'Via Roma 12',
    postalPlaceholder: '00100',
    cityPlaceholder: 'Roma',
    postalRegex: /^\d{5}$/,
    postalHint: {
      it: 'CAP italiano a 5 cifre (es. 00100 o 20121)',
      fr: 'Code postal italien à 5 chiffres (ex. 00100)',
      de: 'Italienische Postleitzahl, 5 Ziffern (z. B. 00100)',
    },
    deliveryDelay: {
      it: 'Consegna gratuita in 3–8 gg lavorativi (5–12 gg su bancale)',
      fr: 'Livraison offerte en 3–8 j ouvrés (5–12 j sur palette)',
      de: 'Kostenlose Lieferung in 3–8 Werktagen (5–12 Tage per Palette)',
    },
    geoBias: { lat: 42.5, lon: 12.5 },
  },
  {
    iso: 'FR',
    flag: 'fr',
    dialCode: '+33',
    name: { it: 'Francia', fr: 'France', de: 'Frankreich' },
    phonePlaceholder: '06 12 34 56 78',
    phoneExample: '06 12 34 56 78',
    phoneMinDigits: 9,
    phoneMaxDigits: 10,
    phoneInputMaxLength: 15,
    addressPlaceholder: '12 Rue de Rivoli',
    postalPlaceholder: '75001',
    cityPlaceholder: 'Parigi',
    postalRegex: /^\d{5}$/,
    postalHint: {
      it: 'Codice postale francese a 5 cifre (es. 75001)',
      fr: 'Code postal français à 5 chiffres (ex. 75001)',
      de: 'Französische Postleitzahl, 5 Ziffern (z. B. 75001)',
    },
    deliveryDelay: {
      it: 'Consegna gratuita in 3–8 gg lavorativi (5–12 gg su bancale)',
      fr: 'Livraison offerte en 3–8 j ouvrés (5–12 j sur palette)',
      de: 'Kostenlose Lieferung in 3–8 Werktagen (5–12 Tage per Palette)',
    },
    geoBias: { lat: 46.6, lon: 2.4 },
  },
  {
    iso: 'CH',
    flag: 'ch',
    dialCode: '+41',
    name: { it: 'Svizzera', fr: 'Suisse', de: 'Schweiz' },
    phonePlaceholder: '079 123 45 67',
    phoneExample: '079 123 45 67',
    phoneMinDigits: 9,
    phoneMaxDigits: 10,
    phoneInputMaxLength: 15,
    addressPlaceholder: 'Bahnhofstrasse 12',
    postalPlaceholder: '8001',
    cityPlaceholder: 'Zurigo',
    postalRegex: /^\d{4}$/,
    postalHint: {
      it: 'NPA svizzero a 4 cifre (es. 8001)',
      fr: 'NPA suisse à 4 chiffres (ex. 8001)',
      de: 'Schweizer PLZ, 4 Ziffern (z. B. 8001)',
    },
    deliveryDelay: {
      it: 'Consegna gratuita in 4–9 gg lavorativi su appuntamento',
      fr: 'Livraison offerte en 4–9 j ouvrés sur rendez-vous',
      de: 'Kostenlose Lieferung in 4–9 Werktagen mit Termin',
    },
    geoBias: { lat: 46.8, lon: 8.2 },
  },
  {
    iso: 'DE',
    flag: 'de',
    dialCode: '+49',
    name: { it: 'Germania', fr: 'Allemagne', de: 'Deutschland' },
    phonePlaceholder: '0151 23456789',
    phoneExample: '0151 23456789',
    phoneMinDigits: 7,
    phoneMaxDigits: 13,
    phoneInputMaxLength: 18,
    addressPlaceholder: 'Friedrichstraße 12',
    postalPlaceholder: '10115',
    cityPlaceholder: 'Berlino',
    postalRegex: /^\d{5}$/,
    postalHint: {
      it: 'Codice postale tedesco a 5 cifre (es. 10115)',
      fr: 'Code postal allemand à 5 chiffres (ex. 10115)',
      de: 'Deutsche PLZ, 5 Ziffern (z. B. 10115)',
    },
    deliveryDelay: {
      it: 'Consegna gratuita in 4–9 gg lavorativi su appuntamento',
      fr: 'Livraison offerte en 4–9 j ouvrés sur rendez-vous',
      de: 'Kostenlose Lieferung in 4–9 Werktagen mit Termin',
    },
    geoBias: { lat: 51.1, lon: 10.4 },
  },
  {
    iso: 'BE',
    flag: 'be',
    dialCode: '+32',
    name: { it: 'Belgio', fr: 'Belgique', de: 'Belgien' },
    phonePlaceholder: '0470 12 34 56',
    phoneExample: '0470 12 34 56',
    phoneMinDigits: 8,
    phoneMaxDigits: 10,
    phoneInputMaxLength: 15,
    addressPlaceholder: 'Rue Neuve 12',
    postalPlaceholder: '1000',
    cityPlaceholder: 'Bruxelles',
    postalRegex: /^\d{4}$/,
    postalHint: {
      it: 'Codice postale belga a 4 cifre (es. 1000)',
      fr: 'Code postal belge à 4 chiffres (ex. 1000)',
      de: 'Belgische PLZ, 4 Ziffern (z. B. 1000)',
    },
    deliveryDelay: {
      it: 'Consegna gratuita in 4–8 gg lavorativi su appuntamento',
      fr: 'Livraison offerte en 4–8 j ouvrés sur rendez-vous',
      de: 'Kostenlose Lieferung in 4–8 Werktagen mit Termin',
    },
    geoBias: { lat: 50.85, lon: 4.35 },
  },
  {
    iso: 'LU',
    flag: 'lu',
    dialCode: '+352',
    name: { it: 'Lussemburgo', fr: 'Luxembourg', de: 'Luxemburg' },
    phonePlaceholder: '621 123 456',
    phoneExample: '621 123 456',
    phoneMinDigits: 6,
    phoneMaxDigits: 12,
    phoneInputMaxLength: 16,
    addressPlaceholder: 'Grand-Rue 12',
    postalPlaceholder: '1009',
    cityPlaceholder: 'Lussemburgo',
    postalRegex: /^(?:L-?)?\d{4}$/i,
    postalHint: {
      it: 'Codice postale lussemburghese a 4 cifre (es. 1009)',
      fr: 'Code postal luxembourgeois à 4 chiffres (ex. 1009)',
      de: 'Luxemburgische PLZ, 4 Ziffern (z. B. 1009)',
    },
    deliveryDelay: {
      it: 'Consegna gratuita in 4–8 gg lavorativi su appuntamento',
      fr: 'Livraison offerte en 4–8 j ouvrés sur rendez-vous',
      de: 'Kostenlose Lieferung in 4–8 Werktagen mit Termin',
    },
    geoBias: { lat: 49.81, lon: 6.13 },
  },
]

export function getCountryByIso(iso?: string | null): EuropeanCountry {
  const upper = iso?.trim().toUpperCase()
  return EUROPEAN_COUNTRIES.find((c) => c.iso === upper) ?? EUROPEAN_COUNTRIES[0]
}

export function getCountryByDialCode(dialCode?: string | null): EuropeanCountry {
  const trimmed = dialCode?.trim()
  return EUROPEAN_COUNTRIES.find((c) => c.dialCode === trimmed) ?? EUROPEAN_COUNTRIES[0]
}

export function getCountryByName(name?: string | null): EuropeanCountry {
  const normalized = name?.trim().toLowerCase()
  if (!normalized) return EUROPEAN_COUNTRIES[0]
  return (
    EUROPEAN_COUNTRIES.find(
      (c) =>
        c.iso.toLowerCase() === normalized ||
        c.name.it.toLowerCase() === normalized ||
        c.name.fr.toLowerCase() === normalized ||
        c.name.de.toLowerCase() === normalized,
    ) ?? EUROPEAN_COUNTRIES[0]
  )
}

export function sanitizePhoneInput(raw: string): string {
  return raw.replace(/[^\d\s().-]/g, '')
}

export function validatePhoneForCountry(iso: CountryIso, rawPhone: string, locale: Locale = 'it'): string | null {
  const country = getCountryByIso(iso)
  const trimmed = rawPhone.trim()
  if (!trimmed) {
    if (locale === 'fr') return 'Saisissez votre numéro de téléphone pour le rendez-vous transporteur.'
    if (locale === 'de') return 'Bitte geben Sie Ihre Telefonnummer für die Lieferankündigung an.'
    return 'Inserisci il numero di telefono per l’appuntamento con il corriere.'
  }

  if (/[a-zA-Z]/.test(trimmed)) {
    if (locale === 'fr') return 'Le numéro de téléphone ne doit contenir que des chiffres.'
    if (locale === 'de') return 'Die Telefonnummer darf nur Ziffern enthalten.'
    return 'Il numero di telefono deve contenere solo cifre.'
  }

  const digits = trimmed.replace(/\D/g, '')

  if (country.iso === 'FR') {
    const validFr =
      (digits.length === 10 && digits.startsWith('0') && digits[1] !== '0') ||
      (digits.length === 9 && !digits.startsWith('0'))
    if (!validFr) {
      if (locale === 'fr') {
        return `Numéro invalide pour France (${country.dialCode}) : saisissez 9 ou 10 chiffres (ex. ${country.phoneExample}).`
      }
      if (locale === 'de') {
        return `Ungültige Nummer für Frankreich (${country.dialCode}): 9–10 Ziffern eingeben (z. B. ${country.phoneExample}).`
      }
      return `Numero non valido per Francia (${country.dialCode}): inserisci 9 o 10 cifre (es. ${country.phoneExample}).`
    }
    return null
  }

  if (country.iso === 'CH') {
    const validCh =
      (digits.length === 10 && digits.startsWith('0') && digits[1] !== '0') ||
      (digits.length === 9 && !digits.startsWith('0'))
    if (!validCh) {
      if (locale === 'fr') {
        return `Numéro invalide pour Suisse (${country.dialCode}) : saisissez 9 ou 10 chiffres (ex. ${country.phoneExample}).`
      }
      if (locale === 'de') {
        return `Ungültige Nummer für Schweiz (${country.dialCode}): 9–10 Ziffern eingeben (z. B. ${country.phoneExample}).`
      }
      return `Numero non valido per Svizzera (${country.dialCode}): inserisci 9 o 10 cifre (es. ${country.phoneExample}).`
    }
    return null
  }

  if (digits.length < country.phoneMinDigits || digits.length > country.phoneMaxDigits) {
    if (locale === 'fr') {
      return `Numéro invalide pour ${country.name.fr} (${country.dialCode}) : attendu ${country.phoneMinDigits} à ${country.phoneMaxDigits} chiffres (ex. ${country.phoneExample}).`
    }
    if (locale === 'de') {
      return `Ungültige Nummer für ${country.name.de} (${country.dialCode}): ${country.phoneMinDigits}–${country.phoneMaxDigits} Ziffern erwartet (z. B. ${country.phoneExample}).`
    }
    return `Numero non valido per ${country.name.it} (${country.dialCode}): inserisci da ${country.phoneMinDigits} a ${country.phoneMaxDigits} cifre (es. ${country.phoneExample}).`
  }

  return null
}

export function validatePostalCodeForCountry(countryNameOrIso: string, rawPostal: string, locale: Locale = 'it'): string | null {
  const country = getCountryByName(countryNameOrIso)
  const trimmed = rawPostal.trim()
  if (!trimmed) {
    if (locale === 'fr') return 'Saisissez votre code postal.'
    if (locale === 'de') return 'Bitte geben Sie Ihre Postleitzahl ein.'
    return 'Inserisci il CAP / codice postale di consegna.'
  }

  if (!country.postalRegex.test(trimmed)) {
    return country.postalHint[locale]
  }
  return null
}
