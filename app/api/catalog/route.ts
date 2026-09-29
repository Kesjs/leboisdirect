import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getCatalogClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

  if (!url || !key) throw new Error('La configuration du catalogue est absente.')
  return createClient(url, key)
}

export async function GET(request: NextRequest) {
  const supabase = getCatalogClient()
  const slug = request.nextUrl.searchParams.get('slug')
  let query = supabase
    .from('braviko_products')
    .select(`
      id, slug, status, featured, sort_order,
      braviko_categories ( id, slug, name ),
      braviko_product_translations ( locale, name, short_description, conditioning, delivery_info ),
      braviko_product_variants ( id, sku, label, price, compare_at_price, stock ),
      braviko_product_images ( storage_path, alt_text, sort_order, is_primary )
    `)
    .eq('status', 'published')
    .order('sort_order', { ascending: true })

  if (slug) query = query.eq('slug', slug)
  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const products = (data || []).map((item: any) => {
    const translations = Object.fromEntries((item.braviko_product_translations || []).map((translation: any) => [translation.locale, translation]))
    const fr = translations.fr || translations.de || translations.it || {}
    const variants = [...(item.braviko_product_variants || [])].sort((a: any, b: any) => Number(a.price) - Number(b.price))
    const images = [...(item.braviko_product_images || [])]
      .sort((a: any, b: any) => Number(b.is_primary) - Number(a.is_primary) || Number(a.sort_order) - Number(b.sort_order))
      .map((image: any) => image.storage_path)
      .filter(Boolean)

    return {
      id: item.id,
      slug: item.slug,
      featured: Boolean(item.featured),
      name: fr.name || item.slug,
      category: item.braviko_categories?.slug || 'buches',
      description: fr.short_description || '',
      features: [],
      price: Number(variants[0]?.price || 0),
      image: images[0] || '/images/photorealistic-perspective-wood-logs.jpg',
      images: images.length ? images : ['/images/photorealistic-perspective-wood-logs.jpg'],
      conditioning: fr.conditioning || variants[0]?.label || '',
      deliveryInfo: fr.delivery_info || '',
      variants: variants.map((variant: any) => ({ id: variant.id, price: Number(variant.price), stock: variant.stock, label: variant.label })),
      translations: {
        de: translations.de?.name || fr.name || item.slug,
        it: translations.it?.name || fr.name || item.slug,
        description: { de: translations.de?.short_description || '', it: translations.it?.short_description || '' },
        conditioning: { de: translations.de?.conditioning || '', it: translations.it?.conditioning || '' },
        delivery: { de: translations.de?.delivery_info || '', it: translations.it?.delivery_info || '' },
      },
    }
  })

  const categories = [...new Map(products.map((product: any) => [product.category, { id: product.category, name: product.category }])).values()]
  return NextResponse.json({ products, categories }, {
    headers: { 'Cache-Control': 'no-store' },
  })
}
