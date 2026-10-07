import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { stripeClient } from '@/lib/stripe'

export async function POST(request: Request) {
  const signature = request.headers.get('stripe-signature')
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!signature || !secret) return NextResponse.json({ error: 'WEBHOOK_NOT_CONFIGURED' }, { status: 400 })
  let event: Stripe.Event
  try { event = stripeClient().webhooks.constructEvent(await request.text(), signature, secret) }
  catch { return NextResponse.json({ error: 'INVALID_WEBHOOK_SIGNATURE' }, { status: 400 }) }
  if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
    const session = event.data.object as Stripe.Checkout.Session
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!serviceKey) return NextResponse.json({ error: 'SUPABASE_SERVICE_ROLE_NOT_CONFIGURED' }, { status: 503 })
    const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceKey)
    if (session.metadata?.reference) {
      const paymentIntentId = typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id ?? null
      await admin.from('braviko_orders').update({ status: 'confirmed', payment_status: 'paid', payment_method: session.payment_method_types?.[0] ?? 'card', stripe_session_id: session.id, stripe_payment_intent_id: paymentIntentId, paid_at: new Date().toISOString() }).eq('reference', session.metadata.reference)
    }
  }
  if (event.type === 'checkout.session.async_payment_failed' || event.type === 'payment_intent.payment_failed') {
    const paymentObject = event.data.object as Stripe.Checkout.Session | Stripe.PaymentIntent
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    const reference = paymentObject.metadata?.reference
    if (serviceKey && reference) await createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceKey).from('braviko_orders').update({ status: 'cancelled', payment_status: 'failed' }).eq('reference', reference)
  }
  return NextResponse.json({ received: true })
}
