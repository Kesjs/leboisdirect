import type { MetadataRoute } from 'next'

const staticRoutes = [
  '/', '/boutique', '/livraison', '/expedition', '/faq', '/conseils',
  '/informations-produits', '/notre-histoire', '/assurance', '/contact',
  '/mentions-legales', '/conditions-generales', '/confidentialite', '/cookies',
  '/retours-remboursements', '/tva',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://leboisdirect.vercel.app'
  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: route === '/' || route === '/boutique' ? 'daily' : 'monthly',
    priority: route === '/' ? 1 : route === '/boutique' ? 0.9 : 0.5,
  }))

  try {
    const response = await fetch(`${baseUrl}/api/catalog`, { next: { revalidate: 300 } })
    if (response.ok) {
      const payload = await response.json() as { products?: Array<{ slug: string }> }
      for (const product of payload.products || []) {
        entries.push({
          url: `${baseUrl}/produit/${encodeURIComponent(product.slug)}`,
          changeFrequency: 'weekly',
          priority: 0.8,
        })
      }
    }
  } catch {
    // Keep the static sitemap available if the catalog is temporarily unavailable.
  }

  return entries
}
