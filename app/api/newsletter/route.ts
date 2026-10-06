import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''
  const locale = body?.locale
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !['fr', 'de', 'it'].includes(locale)) return NextResponse.json({ error: 'invalid_request' }, { status: 400 })
  const supabase = await createClient()
  const { error } = await supabase.from('braviko_newsletter_subscribers').insert({ email, locale, source: 'footer' })
  if (error && error.code !== '23505') return NextResponse.json({ error: 'subscription_failed' }, { status: 500 })
  return NextResponse.json({ ok: true })
}
