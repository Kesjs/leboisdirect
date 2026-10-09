import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'AUTH_REQUIRED' }, { status: 401 })

    const body = await request.json() as { reference?: string }
    if (!body.reference) return NextResponse.json({ error: 'INVALID_REFERENCE' }, { status: 400 })

    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!serviceKey) return NextResponse.json({ error: 'BANK_TRANSFER_NOT_CONFIGURED' }, { status: 503 })

    const admin = createAdminClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceKey)
    const { error } = await admin
      .from('braviko_orders')
      .update({ payment_status: 'pending', payment_method: 'bank_transfer' })
      .eq('reference', body.reference)
      .eq('user_id', user.id)

    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Bank transfer checkout error:', error)
    return NextResponse.json({ error: 'BANK_TRANSFER_UNAVAILABLE' }, { status: 500 })
  }
}
