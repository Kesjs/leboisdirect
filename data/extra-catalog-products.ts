import { batch1Products } from './batches/batch-1'
import { batch2Products } from './batches/batch-2'
import { batch3Products } from './batches/batch-3'
import { batch4Products } from './batches/batch-4'
import { batch5Products } from './batches/batch-5'
import { batch6Products } from './batches/batch-6'
import { batch7Products } from './batches/batch-7'
import type { ExtraCatalogProduct } from './batches/types'
import type { ItalianProductOverride } from './product-italian-overrides'
import type { RichProductSpec } from './product-rich-specs'
import type { ProductVideo } from './product-videos'
import type { BatchReviewEntry } from './batches/types'

export const EXTRA_CATALOG_PRODUCTS: ExtraCatalogProduct[] = [
  ...batch1Products,
  ...batch2Products,
  ...batch3Products,
  ...batch4Products,
  ...batch5Products,
  ...batch6Products,
  ...batch7Products,
]

export const EXTRA_ITALIAN_OVERRIDES: Record<string, ItalianProductOverride> = Object.fromEntries(
  EXTRA_CATALOG_PRODUCTS.map((item) => [item.slug, item.italianOverride]),
)

export const EXTRA_CLEAN_IMAGES_BY_SLUG: Record<string, string[]> = Object.fromEntries(
  EXTRA_CATALOG_PRODUCTS.map((item) => [item.slug, [...item.images]]),
)

export const EXTRA_RICH_SPECS: Record<string, RichProductSpec> = Object.fromEntries(
  EXTRA_CATALOG_PRODUCTS.map((item) => [item.slug, item.richSpec]),
)

export const EXTRA_PRODUCT_REVIEWS: BatchReviewEntry[] = EXTRA_CATALOG_PRODUCTS.flatMap(
  (item) => item.reviews,
)

export const EXTRA_VIDEOS_BY_SLUG: Record<string, ProductVideo> = Object.fromEntries(
  EXTRA_CATALOG_PRODUCTS.filter((item): item is ExtraCatalogProduct & { video: ProductVideo } =>
    Boolean(item.video),
  ).map((item) => [item.slug, item.video]),
)

export function formatExtraProductForCatalog(item: ExtraCatalogProduct) {
  const override = item.italianOverride
  const localizedVariants = item.variants.map((variant) => ({
    id: variant.id,
    price: Number(variant.price),
    label: variant.label,
  }))

  return {
    id: item.id,
    slug: item.slug,
    featured: Boolean(item.featured),
    name: override.name,
    category: item.category,
    description: override.description,
    features: override.features,
    longDescription: override.longDescription || override.description,
    price: Number(item.variants[0]?.price || 0),
    image: item.images[0],
    images: [...item.images],
    conditioning: override.conditioning,
    deliveryInfo: override.deliveryInfo,
    variants: localizedVariants,
    translations: {
      de: override.name,
      it: override.name,
      description: {
        de: override.description,
        it: override.description,
      },
      conditioning: {
        de: override.conditioning,
        it: override.conditioning,
      },
      delivery: {
        de: override.deliveryInfo,
        it: override.deliveryInfo,
      },
    },
  }
}
