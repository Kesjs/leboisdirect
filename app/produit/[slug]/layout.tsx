import type { Metadata } from 'next'

type CatalogProduct = {
  slug: string
  name: string
  description?: string
  image?: string
  price?: number
  variants?: Array<{ price: number }>
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://leboisdirect.vercel.app'

  try {
    const response = await fetch(`${baseUrl}/api/catalog?slug=${encodeURIComponent(slug)}`, { next: { revalidate: 300 } })
    const payload = response.ok ? await response.json() as { products?: CatalogProduct[] } : null
    const product = payload?.products?.[0]
    if (product) {
      const description = (product.description || `Découvrez ${product.name} chez Braviko.`).slice(0, 160)
      return {
        title: `${product.name} | Braviko`,
        description,
        alternates: { canonical: `/produit/${encodeURIComponent(product.slug)}` },
        openGraph: {
          type: 'website',
          title: `${product.name} | Braviko`,
          description,
          url: `/produit/${encodeURIComponent(product.slug)}`,
          images: product.image ? [{ url: product.image, alt: product.name }] : undefined,
        },
      }
    }
  } catch {
    // Fall back to the root metadata for an unavailable catalog.
  }

  return {
    title: 'Produit | Braviko',
    alternates: { canonical: `/produit/${encodeURIComponent(slug)}` },
  }
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return children
}
