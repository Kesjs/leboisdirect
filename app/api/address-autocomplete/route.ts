import { NextResponse } from 'next/server'
import { getCountryByName, type CountryIso } from '@/lib/countries'

export type AddressSuggestion = {
  id: string
  streetLine: string
  postalCode: string
  city: string
  region: string
  label: string
  countryCode: CountryIso
}

type PhotonFeature = {
  geometry?: { coordinates?: [number, number] }
  properties?: {
    osm_id?: number
    osm_type?: string
    osm_key?: string
    osm_value?: string
    type?: string
    countrycode?: string
    name?: string
    street?: string
    housenumber?: string
    postcode?: string
    city?: string
    town?: string
    village?: string
    municipality?: string
    county?: string
    state?: string
  }
}

type BanFeature = {
  properties?: {
    id?: string
    label?: string
    name?: string
    postcode?: string
    city?: string
    context?: string
    type?: string
  }
}

type NominatimItem = {
  place_id?: number
  display_name?: string
  address?: {
    road?: string
    pedestrian?: string
    footway?: string
    street?: string
    house_number?: string
    postcode?: string
    city?: string
    town?: string
    village?: string
    municipality?: string
    county?: string
    state?: string
    country_code?: string
  }
}

const COUNTRY_ENGLISH: Record<CountryIso, string> = {
  IT: 'Italy',
  FR: 'France',
  CH: 'Switzerland',
  DE: 'Germany',
  BE: 'Belgium',
  LU: 'Luxembourg',
}

const CACHE_TTL_MS = 5 * 60 * 1000
const MAX_CACHE_ENTRIES = 200
const responseCache = new Map<string, { expiresAt: number; suggestions: AddressSuggestion[] }>()

function extractTypedHouseNumber(query: string): string | null {
  const trailing = query.trim().match(/\s+(\d{1,5}[a-zA-Z]?(?:\/\d{1,4})?)$/)
  if (trailing) return trailing[1]
  const leading = query.trim().match(/^(\d{1,5}[a-zA-Z]?)\s+/)
  if (leading && query.trim().length > leading[1].length + 3) return leading[1]
  return null
}

function isPostalQuery(q: string): boolean {
  return /^(?:L-?)?\d{4,5}$/i.test(q.trim())
}

function deduplicateSuggestions(items: AddressSuggestion[]): AddressSuggestion[] {
  const seen = new Set<string>()
  const out: AddressSuggestion[] = []
  for (const item of items) {
    const key = `${item.streetLine.toLowerCase()}|${item.postalCode.toLowerCase()}|${item.city.toLowerCase()}`
    if (seen.has(key) || !item.streetLine || !item.city) continue
    seen.add(key)
    out.push(item)
    if (out.length >= 7) break
  }
  return out
}

async function fetchWithTimeout(url: string, headers: Record<string, string> = {}, timeoutMs = 3500) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(url, {
      headers,
      signal: controller.signal,
      cache: 'no-store',
    })
  } finally {
    clearTimeout(timer)
  }
}

async function queryFranceBan(q: string): Promise<AddressSuggestion[]> {
  const url = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(q)}&limit=7&autocomplete=1`
  const res = await fetchWithTimeout(url)
  if (!res.ok) return []
  const data = (await res.json()) as { features?: BanFeature[] }
  const out: AddressSuggestion[] = []
  for (const feature of data.features ?? []) {
    const p = feature.properties
    if (!p?.name || !p?.city) continue
    const postalCode = p.postcode?.trim() || ''
    const streetLine = p.name.trim()
    const city = p.city.trim()
    const region = p.context?.split(',').pop()?.trim() || ''
    out.push({
      id: p.id || `${streetLine}-${postalCode}-${city}`,
      streetLine,
      postalCode,
      city,
      region,
      label: [streetLine, [postalCode, city].filter(Boolean).join(' '), region].filter(Boolean).join(', '),
      countryCode: 'FR',
    })
  }
  return deduplicateSuggestions(out)
}

async function queryPhoton(
  q: string,
  iso: CountryIso,
  lat: number,
  lon: number,
  typedNumber: string | null,
): Promise<AddressSuggestion[]> {
  const lang = iso === 'DE' || iso === 'CH' ? 'de' : iso === 'IT' ? 'it' : 'fr'
  const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(q)}&limit=15&lang=${lang}&lat=${lat}&lon=${lon}`
  const res = await fetchWithTimeout(url, { Accept: 'application/json' })
  if (!res.ok) return []
  const data = (await res.json()) as { features?: PhotonFeature[] }
  const out: AddressSuggestion[] = []

  for (const feature of data.features ?? []) {
    const p = feature.properties
    if (!p) continue
    if (p.countrycode?.toUpperCase() !== iso) continue

    const isHighwayOrHouse =
      Boolean(p.street) || p.type === 'house' || p.type === 'street' || p.osm_key === 'highway'
    const baseStreet = (p.street || (isHighwayOrHouse ? p.name : '') || '').trim()
    const resolvedNumber = (p.housenumber || (isHighwayOrHouse && typedNumber ? typedNumber : '') || '').trim()

    let streetLine = baseStreet
    if (baseStreet && resolvedNumber) {
      streetLine = iso === 'FR' || iso === 'BE' || iso === 'LU'
        ? `${resolvedNumber} ${baseStreet}`
        : `${baseStreet} ${resolvedNumber}`
    } else if (!streetLine && p.name) {
      streetLine = p.name.trim()
    }

    const placeFallbackCity =
      p.type === 'city' || p.type === 'district' || p.type === 'locality' || p.osm_key === 'place'
        ? p.name || ''
        : ''
    const city = (p.city || p.town || p.village || p.municipality || placeFallbackCity || '').trim()
    const postalCode = (p.postcode || '').trim()
    const region = (p.county || p.state || '').trim()

    if (!streetLine && city && isPostalQuery(q)) {
      streetLine = city
    }
    if (!streetLine || !city) continue

    out.push({
      id: `${p.osm_type || 'x'}-${p.osm_id || `${streetLine}-${postalCode}-${city}`}`,
      streetLine,
      postalCode,
      city,
      region: region && region.toLowerCase() !== city.toLowerCase() ? region : '',
      label: [
        streetLine,
        [postalCode, city].filter(Boolean).join(' '),
        region && region.toLowerCase() !== city.toLowerCase() ? region : '',
      ]
        .filter(Boolean)
        .join(', '),
      countryCode: iso,
    })
  }

  return deduplicateSuggestions(out)
}

async function queryNominatim(
  q: string,
  iso: CountryIso,
  typedNumber: string | null,
): Promise<AddressSuggestion[]> {
  const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&countrycodes=${iso.toLowerCase()}&limit=6&q=${encodeURIComponent(q)}`
  const res = await fetchWithTimeout(url, {
    Accept: 'application/json',
    'User-Agent': 'BravikoStorefront/1.0 (https://braviko.fr)',
    'Accept-Language': iso === 'DE' || iso === 'CH' ? 'de' : iso === 'IT' ? 'it' : 'fr',
  })
  if (!res.ok) return []
  const items = (await res.json()) as NominatimItem[]
  const out: AddressSuggestion[] = []

  for (const item of items) {
    const a = item.address
    if (!a) continue
    const road = (a.road || a.pedestrian || a.footway || a.street || '').trim()
    const number = (a.house_number || (road && typedNumber ? typedNumber : '') || '').trim()
    const city = (a.city || a.town || a.village || a.municipality || a.county || '').trim()
    const streetLine = road
      ? number
        ? iso === 'FR' || iso === 'BE' || iso === 'LU'
          ? `${number} ${road}`
          : `${road} ${number}`
        : road
      : (item.display_name?.split(',')[0] || city || '').trim()
    const postalCode = (a.postcode || '').trim()
    const region = (a.county || a.state || '').trim()

    if (!streetLine || !city) continue

    out.push({
      id: `nom-${item.place_id || `${streetLine}-${postalCode}-${city}`}`,
      streetLine,
      postalCode,
      city,
      region: region && region.toLowerCase() !== city.toLowerCase() ? region : '',
      label: [
        streetLine,
        [postalCode, city].filter(Boolean).join(' '),
        region && region.toLowerCase() !== city.toLowerCase() ? region : '',
      ]
        .filter(Boolean)
        .join(', '),
      countryCode: iso,
    })
  }

  return deduplicateSuggestions(out)
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const rawQuery = (searchParams.get('q') || '').trim().slice(0, 140)
  const countryParam = searchParams.get('country') || 'IT'
  const country = getCountryByName(countryParam)

  if (rawQuery.length < 3) {
    return NextResponse.json({ suggestions: [] }, { headers: { 'Cache-Control': 'private, max-age=30' } })
  }

  const cacheKey = `${country.iso}:${rawQuery.toLowerCase()}`
  const cached = responseCache.get(cacheKey)
  if (cached && cached.expiresAt > Date.now()) {
    return NextResponse.json(
      { suggestions: cached.suggestions },
      { headers: { 'Cache-Control': 'private, max-age=60' } },
    )
  }

  const typedNumber = extractTypedHouseNumber(rawQuery)
  let suggestions: AddressSuggestion[] = []

  try {
    if (country.iso === 'FR') {
      suggestions = await queryFranceBan(rawQuery)
    }

    if (suggestions.length === 0) {
      suggestions = await queryPhoton(
        rawQuery,
        country.iso,
        country.geoBias.lat,
        country.geoBias.lon,
        typedNumber,
      )
    }

    if (suggestions.length === 0) {
      suggestions = await queryPhoton(
        `${rawQuery} ${COUNTRY_ENGLISH[country.iso]}`,
        country.iso,
        country.geoBias.lat,
        country.geoBias.lon,
        typedNumber,
      )
    }

    if (suggestions.length === 0) {
      suggestions = await queryNominatim(rawQuery, country.iso, typedNumber)
    }
  } catch {
    suggestions = []
  }

  if (responseCache.size >= MAX_CACHE_ENTRIES) {
    const oldestKey = responseCache.keys().next().value
    if (oldestKey) responseCache.delete(oldestKey)
  }
  responseCache.set(cacheKey, {
    expiresAt: Date.now() + CACHE_TTL_MS,
    suggestions,
  })

  return NextResponse.json(
    { suggestions },
    { headers: { 'Cache-Control': 'private, max-age=60' } },
  )
}
