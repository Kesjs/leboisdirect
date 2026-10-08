import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { stripeClient } from '@/lib/stripe'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const sessionId = new URL(request.url).searchParams.get('session_id')
  const headers = { 'Cache-Control': 'private, no-store' }
  if (!sessionId || !/^cs_(test|live)_[A-Za-z0-9]{20,200}$/.test(sessionId)) {
    return NextResponse.json({ error: 'INVALID_SESSION' }, { status: 400, headers })
  }
  try {
    const session = await stripeClient().checkout.sessions.retrieve(sessionId, { expand: ['line_items'] })
    const reference = session.metadata?.reference
    const userId = session.metadata?.user_id
    if (!reference || !userId) return NextResponse.json({ error: 'ORDER_NOT_FOUND' }, { status: 404, headers })
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!serviceKey) throw new Error('ORDER_LOOKUP_UNAVAILABLE')
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
    const { data: order, error } = await supabase.from('braviko_orders')
      .select('reference, payment_status, stripe_session_id')
      .eq('reference', reference).eq('user_id', userId).maybeSingle()
    if (error) throw error
    if (!order || (order.stripe_session_id && order.stripe_session_id !== session.id)) {
      return NextResponse.json({ error: 'ORDER_NOT_FOUND' }, { status: 404, headers })
    }
    // This unguessable session URL exposes only a minimal receipt, never
    // customer identity, contact details or delivery information.
    return NextResponse.json({
      reference: order.reference,
      paid: session.payment_status === 'paid' && order.payment_status === 'paid',
      failed: session.status === 'expired' || order.payment_status === 'failed',
      refunded: order.payment_status === 'refunded',
      testMode: !session.livemode,
      amount: session.amount_total,
      currency: session.currency,
      items: session.line_items?.data.map(item => ({ name: item.description, quantity: item.quantity })),
    }, { headers })
  } catch (error) {
    const invalidSession = typeof error === 'object' && error !== null && 'code' in error && error.code === 'resource_missing'
    return NextResponse.json({ error: invalidSession ? 'ORDER_NOT_FOUND' : 'CONFIRMATION_UNAVAILABLE' }, {
      status: invalidSession ? 404 : 503, headers,
    })
  }
}
