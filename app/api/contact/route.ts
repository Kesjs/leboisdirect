import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isMissingContactTable(error: { code?: string; message?: string } | null) {
  if (!error) return false
  return (
    error.code === 'PGRST205' ||
    error.code === '42P01' ||
    (error.message ?? '').includes('braviko_contact_messages')
  )
}

export async function POST(request: NextRequest) {
  let payload: Record<string, unknown>
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }

  const name = String(payload.name ?? '').trim().slice(0, 120)
  const email = String(payload.email ?? '').trim().toLowerCase().slice(0, 200)
  const subject = String(payload.subject ?? '').trim().slice(0, 200)
  const message = String(payload.message ?? '').trim().slice(0, 5000)
  const orderRef = String(payload.orderRef ?? '').trim().slice(0, 100)
  const locale = ['fr', 'de', 'it'].includes(String(payload.locale))
    ? String(payload.locale)
    : 'fr'

  if (!name || !EMAIL_PATTERN.test(email) || !subject || message.length < 5) {
    return NextResponse.json({ error: 'invalid_fields' }, { status: 400 })
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) {
    return NextResponse.json({ error: 'contact_storage_unavailable' }, { status: 503 })
  }

  const supabase = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  const { data, error } = await supabase
    .from('braviko_contact_messages')
    .insert({
      name,
      email,
      subject,
      message,
      order_ref: orderRef || null,
      locale,
    })
    .select('id')
    .single()

  if (error) {
    if (isMissingContactTable(error)) {
      return NextResponse.json({ error: 'contact_storage_unavailable' }, { status: 503 })
    }
    return NextResponse.json({ error: 'contact_submit_failed' }, { status: 500 })
  }

  return NextResponse.json({ ok: true, id: data.id }, { status: 201 })
}
