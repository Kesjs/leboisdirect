import { NextResponse } from 'next/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { stripeClient } from '@/lib/stripe'
import {
  createServerOrder,
  validateCustomerInput,
  type OrderCustomerInput,
  type RequestedOrderItem,
} from '@/lib/server/orders'
import type { Locale } from '@/lib/i18n-context'

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      customer?: OrderCustomerInput
      items?: RequestedOrderItem[]
      locale?: Locale
    }

    if (
      !body.items?.length ||
      body.items.some(
        (item) =>
          !item.productId ||
          typeof item.productId !== 'string' ||
          !Number.isInteger(item.quantity) ||
          item.quantity < 1 ||
          item.quantity > 99,
      )
    ) {
      return NextResponse.json(
        { error: 'INVALID_CHECKOUT', message: 'Il carrello non è valido o è vuoto.' },
        { status: 400 },
      )
    }

    validateCustomerInput(body.customer)

    const stripe = stripeClient()
    const locale: Locale = body.locale || 'it'

    const order = await createServerOrder({
      customer: body.customer,
      items: body.items,
      locale,
      paymentMethod: 'card',
      paymentStatus: 'pending',
    })

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    const admin = createAdminClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })

    const origin = process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin
    const orderMetadata: Record<string, string> = { reference: order.reference }
    if (order.userId) {
      orderMetadata.user_id = order.userId
    }

    const sessionParams = {
      mode: 'payment' as const,
      line_items: order.stripeLineItems,
      adaptive_pricing: { enabled: false },
      allowed_payment_method_types: ['card'],
      wallet_options: { link: { display: 'never' } },
      payment_intent_data: { metadata: orderMetadata },
      customer_email: order.customerEmail,
      metadata: orderMetadata,
      success_url: `${origin}/commande/confirmation?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout?payment=cancelled`,
      locale: locale === 'fr' ? 'fr' : locale === 'de' ? 'de' : 'it',
    } as unknown as Parameters<typeof stripe.checkout.sessions.create>[0]

    let session
    try {
      session = await stripe.checkout.sessions.create(sessionParams)
    } catch (stripeError) {
      await admin.from('braviko_orders').delete().eq('id', order.orderId)
      throw stripeError
    }

    await admin
      .from('braviko_orders')
      .update({ payment_status: 'pending', stripe_session_id: session.id })
      .eq('id', order.orderId)

    return NextResponse.json({ url: session.url, reference: order.reference })
  } catch (error) {
    const code = error instanceof Error ? error.message : 'CHECKOUT_UNAVAILABLE'
    console.error('Stripe checkout error:', code, error)
    const status =
      code === 'STRIPE_NOT_CONFIGURED' ||
      code === 'ORDER_SERVICE_NOT_CONFIGURED' ||
      code === 'GUEST_CHECKOUT_MIGRATION_REQUIRED'
        ? 503
        : code === 'INVALID_CUSTOMER' || code === 'INVALID_CHECKOUT' || code === 'PRODUCT_UNAVAILABLE'
          ? 400
          : 500
    const message =
      code === 'INVALID_CUSTOMER'
        ? 'Verifica i tuoi dati e l’indirizzo di consegna prima di confermare.'
        : code === 'PRODUCT_UNAVAILABLE'
          ? 'Uno dei prodotti nel carrello non è più disponibile.'
          : code === 'STRIPE_NOT_CONFIGURED'
            ? 'Il pagamento con carta non è ancora disponibile.'
            : 'Impossibile avviare il pagamento. Riprova.'
    return NextResponse.json({ error: code, message }, { status })
  }
}

