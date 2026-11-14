import { NextResponse } from 'next/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { getServerBankTransferDetails, verifyBankRevealToken } from '@/lib/server/bank-transfer'

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      reference?: string
      revealToken?: string
    }

    const reference = typeof body.reference === 'string' ? body.reference.trim() : ''
    const revealToken = typeof body.revealToken === 'string' ? body.revealToken.trim() : ''

    if (!reference || !revealToken || !verifyBankRevealToken(reference, revealToken)) {
      return NextResponse.json(
        { error: 'INVALID_REVEAL_TOKEN', message: 'Token di accesso scaduto o non valido.' },
        { status: 403, headers: { 'Cache-Control': 'private, no-store' } },
      )
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json(
        { error: 'BANK_TRANSFER_NOT_CONFIGURED' },
        { status: 503, headers: { 'Cache-Control': 'private, no-store' } },
      )
    }

    const admin = createAdminClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })

    const { data: order, error } = await admin
      .from('braviko_orders')
      .select('reference, payment_method')
      .eq('reference', reference)
      .maybeSingle()

    if (error) throw error
    if (!order || order.payment_method !== 'bank_transfer') {
      return NextResponse.json(
        { error: 'ORDER_NOT_FOUND' },
        { status: 404, headers: { 'Cache-Control': 'private, no-store' } },
      )
    }

    const details = getServerBankTransferDetails()

    return NextResponse.json(details, {
      headers: { 'Cache-Control': 'private, no-store' },
    })
  } catch (error) {
    console.error('Bank transfer reveal error:', error)
    return NextResponse.json(
      { error: 'REVEAL_UNAVAILABLE' },
      { status: 500, headers: { 'Cache-Control': 'private, no-store' } },
    )
  }
}
