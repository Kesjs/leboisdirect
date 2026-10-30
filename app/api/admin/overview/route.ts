import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

type OrderRow = {
  id: string
  reference: string
  status: string
  payment_status: string
  total: number | string
  customer_email: string
  first_name: string
  last_name: string
  created_at: string
}

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Non autorizzato.' }, { status: 401 })

  const { data: admin } = await supabase
    .from('braviko_admins')
    .select('active')
    .eq('user_id', user.id)
    .eq('active', true)
    .maybeSingle()
  if (!admin) return NextResponse.json({ error: 'Accesso amministratore richiesto.' }, { status: 403 })

  const [ordersResult, customersResult, productsResult] = await Promise.all([
    supabase
      .from('braviko_orders')
      .select('id, reference, status, payment_status, total, customer_email, first_name, last_name, created_at')
      .order('created_at', { ascending: false }),
    supabase
      .from('braviko_customer_profiles')
      .select('user_id, email, first_name, last_name, created_at', { count: 'exact' })
      .order('created_at', { ascending: false })
      .limit(8),
    supabase
      .from('braviko_products')
      .select('id, status', { count: 'exact' }),
  ])

  const firstError = ordersResult.error || customersResult.error || productsResult.error
  if (firstError) return NextResponse.json({ error: firstError.message }, { status: 500 })

  const orders = (ordersResult.data || []) as OrderRow[]
  const paidOrders = orders.filter((order) => order.payment_status === 'paid')
  const revenue = paidOrders.reduce((sum, order) => sum + Number(order.total || 0), 0)
  const statusCounts = orders.reduce<Record<string, number>>((counts, order) => {
    counts[order.status] = (counts[order.status] || 0) + 1
    return counts
  }, {})

  return NextResponse.json({
    metrics: {
      customers: customersResult.count || 0,
      orders: orders.length,
      revenue,
      paidOrders: paidOrders.length,
      products: productsResult.count || 0,
      publishedProducts: (productsResult.data || []).filter((product) => product.status === 'published').length,
    },
    statusCounts,
    recentOrders: orders.slice(0, 8),
    recentCustomers: customersResult.data || [],
  })
}
