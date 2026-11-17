import { NextRequest, NextResponse } from 'next/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/server'

const ALLOWED_STATUSES = ['new', 'read', 'replied', 'archived'] as const
type MessageStatus = (typeof ALLOWED_STATUSES)[number]

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

async function requireAdminServiceClient() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { error: NextResponse.json({ error: 'Connexion administrateur requise.' }, { status: 401 }) }
  }

  const { data: admin } = await supabase
    .from('braviko_admins')
    .select('active')
    .eq('user_id', user.id)
    .maybeSingle()

  if (!admin?.active) {
    return { error: NextResponse.json({ error: 'Accès administrateur requis.' }, { status: 403 }) }
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) {
    return { error: NextResponse.json({ error: 'Stockage contact indisponible.' }, { status: 503 }) }
  }

  const service = createAdminClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  return { service }
}

export async function GET() {
  const auth = await requireAdminServiceClient()
  if ('error' in auth && auth.error) return auth.error

  const { data, error } = await auth.service
    .from('braviko_contact_messages')
    .select('id, name, email, order_ref, subject, message, locale, status, created_at')
    .order('created_at', { ascending: false })
    .limit(200)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(
    { messages: data || [] },
    { headers: { 'Cache-Control': 'private, no-store' } },
  )
}

export async function PATCH(request: NextRequest) {
  const auth = await requireAdminServiceClient()
  if ('error' in auth && auth.error) return auth.error

  let body: { id?: unknown; status?: unknown }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Requête JSON invalide.' }, { status: 400 })
  }

  const id = typeof body.id === 'string' ? body.id.trim() : ''
  const status = typeof body.status === 'string' ? (body.status.trim() as MessageStatus) : ('' as MessageStatus)

  if (!UUID_REGEX.test(id) || !ALLOWED_STATUSES.includes(status)) {
    return NextResponse.json({ error: 'Identifiant ou statut invalide.' }, { status: 400 })
  }

  const { data, error } = await auth.service
    .from('braviko_contact_messages')
    .update({ status })
    .eq('id', id)
    .select('id, name, email, order_ref, subject, message, locale, status, created_at')
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(
    { message: data },
    { headers: { 'Cache-Control': 'private, no-store' } },
  )
}
