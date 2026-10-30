import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

// The existing Resend workspace's General audience is the newsletter list.
// It can be overridden per environment when a dedicated audience is created.
const RESEND_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID || '76667ac9-f4b0-4c42-94a3-ae04c377065c'

function isDuplicateContact(error: { message?: string; statusCode?: number | null } | null) {
  return Boolean(error && (error.statusCode === 409 || /already exists|already been added|duplicate/i.test(error.message ?? '')))
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''
  const locale = body?.locale
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !['fr', 'de', 'it'].includes(locale)) return NextResponse.json({ error: 'invalid_request' }, { status: 400 })
  const supabase = await createClient()
  const { error } = await supabase.from('braviko_newsletter_subscribers').insert({ email, locale, source: 'footer' })
  if (error && error.code !== '23505') return NextResponse.json({ error: 'subscription_failed' }, { status: 500 })

  if (process.env.RESEND_API_KEY && RESEND_AUDIENCE_ID) {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error: resendError } = await resend.contacts.create({
      audienceId: RESEND_AUDIENCE_ID,
      email,
      unsubscribed: false,
    })
    if (resendError && !isDuplicateContact(resendError)) {
      // Supabase remains the source of truth; a temporary Resend outage must not
      // make an otherwise successful subscription look like it failed.
      console.error('Newsletter Resend sync failed', resendError)
    }
  }

  return NextResponse.json({ ok: true })
}
