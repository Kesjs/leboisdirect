import type { Product, ProductVariant } from '@/data/products'
import type { RichProductSpec } from '@/data/product-rich-specs'
import { formatPrice } from '@/lib/utils'

function parseNumericToken(raw: string): number | null {
  const cleaned = raw.replace(/\s+/g, '').replace(',', '.')
  const num = Number(cleaned)
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
    return richSpec?.unitPriceLabel || 'Prix unitaire TTC · Livraison en France'
  }

  const primarySource = variant?.label || product.conditioning || ''
  const combinedSource = normalizeTextSources(product, variant)

  // 1. Vente au stère (priorité à la variante sélectionnée)
  const variantVolume =
    typeof variant?.volume === 'number' && variant.volume > 0
      ? variant.volume
      : null
  const stereMatch =
    primarySource.match(/(\d+(?:[.,]\d+)?)\s*st[eè]res?/i) ||
    combinedSource.match(/(\d+(?:[.,]\d+)?)\s*st[eè]res?/i)
  const steres =
    variantVolume || (stereMatch ? parseNumericToken(stereMatch[1]) : null)

  if (
    steres &&
    (product.category === 'buches' ||
      /st[eè]re/i.test(primarySource) ||
      variantVolume !== null)
  ) {
    const perStere = currentPrice / steres
    const stereText = Number.isInteger(steres)
      ? `${steres}`
      : steres.toString().replace('.', ',')
    return `Soit ${formatPrice(perStere)} / stère (palette de ${stereText} stère${steres > 1 ? 's' : ''})`
  }

  // 2. Vente au poids (granulés / bûches densifiées au kg ou packs)
  const isFuelWeightProduct =
    product.category === 'granules' ||
    product.category === 'bois-compresse' ||
    typeof variant?.weight === 'number' ||
    /\b(kg|tonnes?)\b/i.test(primarySource)

  if (isFuelWeightProduct) {
    const variantWeight =
      typeof variant?.weight === 'number' && variant.weight > 0
        ? variant.weight
        : null

    const packMultiplierMatch = combinedSource.match(
      /(\d[\d\s]*)\s*(sacs?|packs?|cartons?|ballots?)\s*(?:de\s*(\d+(?:[.,]\d+)?)\s*kg)?/i,
    )
    const paletteKgMatch =
      primarySource.match(/(?:palette\s*(?:de\s*)?)?(\d[\d\s.,]*)\s*kg/i) ||
      combinedSource.match(/(\d[\d\s.,]*)\s*kg/i)
    const tonneMatch = combinedSource.match(/(\d+(?:[.,]\d+)?)\s*tonnes?\b/i)

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
    const singularKind = packKind?.startsWith('sac')
      ? 'sac'
      : packKind?.startsWith('pack')
        ? 'pack'
        : packKind?.startsWith('carton')
          ? 'carton'
          : packKind
            ? packKind.replace(/s$/, '')
            : null

    if (totalKg && totalKg > 0) {
      const perKg = formatPrice(currentPrice / totalKg)
      if (packCount && packCount > 1 && singularKind) {
        const perUnit = formatPrice(currentPrice / packCount)
        const packWeightSuffix =
          packMultiplierMatch?.[3] && singularKind === 'sac'
            ? ` de ${packMultiplierMatch[3]} kg`
            : ''
        return `Soit ${perKg} / kg (${perUnit} / ${singularKind}${packWeightSuffix})`
      }
      return `Soit ${perKg} / kg (${Math.round(totalKg).toLocaleString('fr-FR')} kg)`
    }
  }

  // 3. Vente à la bûche / lot quantifié (ex: EO2 520 bûches)
  if (product.category === 'bois-compresse' || /\bb[uû]ches?\b/i.test(primarySource)) {
    const extractLogTotal = (source: string): number | null => {
      const explicitTotals = [...source.matchAll(/(\d[\d\s]*)\s*b[uû]ches?\b/gi)]
        .map((match) => parseNumericToken(match[1]))
        .filter((value): value is number => Boolean(value && value >= 10))
      if (explicitTotals.length > 0) {
        return Math.max(...explicitTotals)
      }
      const packLogs = source.match(
        /(\d[\d\s]*)\s*(?:packs?|cartons?|sacs?)\s*(?:de\s*)?(\d+)\s*b[uû]ches?\b/i,
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
      return `Soit ${formatPrice(currentPrice / count)} / bûche (lot de ${Math.round(count).toLocaleString('fr-FR')} bûches)`
    }
  }

  // 4. Appareils, poêles, braseros, machines & accessoires : valeur unitaire clé + contexte
  if (richSpec?.unitPriceLabel) {
    return richSpec.unitPriceLabel
  }

  if (variant?.label && product.variants && product.variants.length > 1) {
    return `${formatPrice(currentPrice)} / unité — ${variant.label}`
  }

  return 'Prix unitaire TTC · TVA incluse · Livraison suivie'
}
