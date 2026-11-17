import type { ItalianProductOverride } from '@/data/product-italian-overrides'
import type { RichProductSpec } from '@/data/product-rich-specs'
import type { ProductReview } from '@/data/product-reviews'
import type { ProductVideo } from '@/data/product-videos'

export type BatchReviewEntry = ProductReview & { matches: string[] }

export type ExtraCatalogProduct = {
  id: string
  slug: string
  category: string
  featured: boolean
  sortOrder: number
  variants: Array<{
    id: string
    sku: string
    label: string
    price: number
  }>
  images: [string, string, string, string]
  italianOverride: ItalianProductOverride
  richSpec: RichProductSpec
  reviews: BatchReviewEntry[]
  video?: ProductVideo
}
