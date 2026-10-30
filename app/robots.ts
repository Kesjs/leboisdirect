import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://braviko.it'
  const disallow = ['/admin', '/api/', '/compte', '/connexion', '/checkout', '/commande/']

  return {
    rules: [
      { userAgent: 'Googlebot', allow: '/', disallow },
      { userAgent: 'Googlebot-Image', allow: '/', disallow },
      { userAgent: '*', allow: '/', disallow },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
