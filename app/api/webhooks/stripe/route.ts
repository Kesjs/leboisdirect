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
  const session = event.data.object as Stripe.Checkout.Session
  if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!serviceKey) return NextResponse.json({ error: 'SUPABASE_SERVICE_ROLE_NOT_CONFIGURED' }, { status: 503 })
    const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceKey)
    if (session.metadata?.reference) await admin.from('braviko_orders').update({ status: 'confirmed' }).eq('reference', session.metadata.reference)
  }
  if (event.type === 'checkout.session.async_payment_failed' || event.type === 'payment_intent.payment_failed') {
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (serviceKey && session.metadata?.reference) await createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceKey).from('braviko_orders').update({ status: 'cancelled' }).eq('reference', session.metadata.reference)
  }
  return NextResponse.json({ received: true })
}
