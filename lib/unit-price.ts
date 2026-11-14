import type { Product, ProductVariant } from '@/data/products'
import type { RichProductSpec } from '@/data/product-rich-specs'
import { formatPrice } from '@/lib/utils'

function parseNumericToken(raw: string): number | null {
  const compact = raw.replace(/\s+/g, '')
  const normalized = /^\d{1,3}(?:\.\d{3})+(?:,\d+)?$/.test(compact)
    ? compact.replaceAll('.', '').replace(',', '.')
    : compact.replace(',', '.')
  const num = Number(normalized)
  return Number.isFinite(num) && num > 0 ? num : null
}

function normalizeTextSources(
  product: Product,
  variant?: ProductVariant,
): string {
  return [
    variant?.label,
    product.conditioning,
    product.name,
    product.slug.replace(/-/g, ' '),
  ]
    .filter(Boolean)
    .join(' · ')
}

export function computeDynamicUnitPriceLabel(
  product: Product,
  variant: ProductVariant | undefined,
  currentPrice: number,
  richSpec?: RichProductSpec,
): string {
  if (!Number.isFinite(currentPrice) || currentPrice <= 0) {
    return richSpec?.unitPriceLabel || 'Prezzo unitario IVA inclusa · Spedizione in Italia'
  }

  const primarySource = variant?.label || product.conditioning || ''
  const combinedSource = normalizeTextSources(product, variant)

  // 1. Vendita a stero
  const variantVolume =
    typeof variant?.volume === 'number' && variant.volume > 0
      ? variant.volume
      : null
  const stereMatch =
    primarySource.match(/(\d+(?:[.,]\d+)?)\s*st(?:er[oi]|[eè]res?)/i) ||
    combinedSource.match(/(\d+(?:[.,]\d+)?)\s*st(?:er[oi]|[eè]res?)/i)
  const steres =
    variantVolume || (stereMatch ? parseNumericToken(stereMatch[1]) : null)

  if (
    steres &&
    (product.category === 'buches' ||
      /st(?:er[oi]|[eè]res?)/i.test(primarySource) ||
      variantVolume !== null)
  ) {
    const perStere = currentPrice / steres
    const stereText = Number.isInteger(steres)
      ? `${steres}`
      : steres.toString().replace('.', ',')
    return `Ovvero ${formatPrice(perStere)} / stero (bancale da ${stereText} ${steres > 1 ? 'steri' : 'stero'})`
  }

  // 2. Vendita a peso (pellet / tronchetti densificati a kg o confezioni)
  const isFuelWeightProduct =
    product.category === 'granules' ||
    product.category === 'bois-compresse' ||
    typeof variant?.weight === 'number' ||
    /\b(kg|tonnellat[ae]|tonnes?)\b/i.test(primarySource)

  if (isFuelWeightProduct) {
    const variantWeight =
      typeof variant?.weight === 'number' && variant.weight > 0
        ? variant.weight
        : null

    const packMultiplierMatch = combinedSource.match(
      /(\d[\d\s.]*)\s*(sacch[oi]|confezion[ei]|pacc[ohi]|sacs?|packs?|cartons?|ballots?)\s*(?:d[ae]\s*(\d+(?:[.,]\d+)?)\s*kg)?/i,
    )
    const paletteKgMatch =
      primarySource.match(/(?:(?:bancale|palette)\s*(?:d[ae]\s*)?)?(\d[\d\s.,]*)\s*kg/i) ||
      combinedSource.match(/(\d[\d\s.,]*)\s*kg/i)
    const tonneMatch = combinedSource.match(/(\d+(?:[.,]\d+)?)\s*(?:tonnellat[ae]|tonnes?)\b/i)

    let totalKg = variantWeight
    if (!totalKg && paletteKgMatch) {
      totalKg = parseNumericToken(paletteKgMatch[1])
    }
    if (!totalKg && tonneMatch) {
      const t = parseNumericToken(tonneMatch[1])
      if (t) totalKg = t * 1000
    }
    if (
      packMultiplierMatch &&
      packMultiplierMatch[1] &&
      packMultiplierMatch[3]
    ) {
      const count = parseNumericToken(packMultiplierMatch[1])
      const perPack = parseNumericToken(packMultiplierMatch[3])
      if (count && perPack && (!totalKg || totalKg === perPack)) {
        totalKg = count * perPack
      }
    }

    const packCount = packMultiplierMatch
      ? parseNumericToken(packMultiplierMatch[1])
      : null
    const packKind = packMultiplierMatch?.[2]?.toLowerCase()
    const singularKind = packKind?.startsWith('sacc') || packKind?.startsWith('sac')
      ? 'sacco'
      : packKind?.startsWith('confezion') || packKind?.startsWith('pack')
        ? 'confezione'
        : packKind?.startsWith('pacc')
          ? 'pacco'
          : packKind?.startsWith('carton')
            ? 'cartone'
            : packKind
              ? packKind.replace(/s$/, '')
              : null

    if (totalKg && totalKg > 0) {
      const perKg = formatPrice(currentPrice / totalKg)
      if (packCount && packCount > 1 && singularKind) {
        const perUnit = formatPrice(currentPrice / packCount)
        const packWeightSuffix =
          packMultiplierMatch?.[3] && singularKind === 'sacco'
            ? ` da ${packMultiplierMatch[3]} kg`
            : ''
        return `Ovvero ${perKg} / kg (${perUnit} / ${singularKind}${packWeightSuffix})`
      }
      return `Ovvero ${perKg} / kg (${Math.round(totalKg).toLocaleString('it-IT')} kg)`
    }
  }

  // 3. Vendita a tronchetto / lotto quantificato (es. EO2 520 tronchetti)
  if (
    product.category === 'bois-compresse' ||
    /\b(?:b[uû]ches?|tronchett[oi]|pezz[oi])\b/i.test(primarySource)
  ) {
    const extractLogTotal = (source: string): number | null => {
      const explicitTotals = [
        ...source.matchAll(/(\d[\d\s.]*)\s*(?:b[uû]ches?|tronchett[oi]|pezz[oi])\b/gi),
      ]
        .map((match) => parseNumericToken(match[1]))
        .filter((value): value is number => Boolean(value && value >= 10))
      if (explicitTotals.length > 0) {
        return Math.max(...explicitTotals)
      }
      const packLogs = source.match(
        /(\d[\d\s.]*)\s*(?:confezioni|pacchi|sacchi|packs?|cartons?|sacs?)\s*(?:d[ae]\s*)?(\d+)\s*(?:b[uû]ches?|tronchett[oi]|pezz[oi])\b/i,
      )
      if (packLogs) {
        const packs = parseNumericToken(packLogs[1])
        const perPack = parseNumericToken(packLogs[2])
        if (packs && perPack && packs * perPack >= 10) return packs * perPack
      }
      return null
    }

    const count = extractLogTotal(primarySource) ?? extractLogTotal(combinedSource)
    if (count && count >= 10) {
      return `Ovvero ${formatPrice(currentPrice / count)} / tronchetto (lotto da ${Math.round(count).toLocaleString('it-IT')} tronchetti)`
    }
  }

  // 4. Apparecchi, stufe, bracieri, macchine e accessori
  if (richSpec?.unitPriceLabel) {
    return richSpec.unitPriceLabel
  }

  if (variant?.label && product.variants && product.variants.length > 1) {
    return `${formatPrice(currentPrice)} / unità — ${variant.label}`
  }

  return 'Prezzo unitario IVA inclusa · Spedizione tracciata'
}
