import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { stripeClient } from '@/lib/stripe'

type RequestedItem = { productId: string; variantId?: string | null; quantity: number }

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'AUTH_REQUIRED' }, { status: 401 })
    const body = await request.json() as { reference?: string; items?: RequestedItem[]; locale?: 'fr' | 'de' | 'it' }
    if (!body.reference || !body.items?.length || body.items.some(item => !item.productId || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 99)) return NextResponse.json({ error: 'INVALID_CHECKOUT' }, { status: 400 })
    const variantIds = body.items.map(item => item.variantId).filter((id): id is string => Boolean(id))
    const { data: variants, error } = await supabase.from('braviko_product_variants').select('id, product_id, price').in('id', variantIds)
    if (error) throw error
    const { data: translations, error: translationError } = await supabase.from('braviko_product_translations').select('product_id, locale, name').in('product_id', body.items.map(item => item.productId))
    if (translationError) throw translationError
    const locale = body.locale || 'fr'
    const lineItems = body.items.map(item => {
      const variant = variants?.find(value => value.id === item.variantId)
      if (!variant || variant.product_id !== item.productId) throw new Error('PRODUCT_UNAVAILABLE')
      const name = translations?.find(value => value.product_id === item.productId && value.locale === locale)?.name || translations?.find(value => value.product_id === item.productId && value.locale === 'fr')?.name
      if (!name) throw new Error('PRODUCT_UNAVAILABLE')
      return { price_data: { currency: 'eur', product_data: { name }, unit_amount: Math.round(Number(variant.price) * 100) }, quantity: item.quantity }
    })
    const stripe = stripeClient()
    const origin = process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin
    const session = await stripe.checkout.sessions.create({ mode: 'payment', line_items: lineItems, customer_email: user.email, metadata: { reference: body.reference, user_id: user.id }, success_url: `${origin}/commande/confirmation?payment=success&session_id={CHECKOUT_SESSION_ID}`, cancel_url: `${origin}/checkout?payment=cancelled`, locale: locale === 'fr' ? 'fr' : locale === 'de' ? 'de' : 'it' })
    return NextResponse.json({ url: session.url })
  } catch (error) {
    const code = error instanceof Error ? error.message : 'CHECKOUT_UNAVAILABLE'
    return NextResponse.json({ error: code }, { status: code === 'STRIPE_NOT_CONFIGURED' ? 503 : 400 })
  }
}
