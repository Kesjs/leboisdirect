import { randomBytes } from 'crypto'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { createClient as createServerSupabase } from '@/lib/supabase/server'
import type { Locale } from '@/lib/i18n-context'

export type RequestedOrderItem = {
  productId: string
  variantId?: string | null
  quantity: number
}

export type OrderCustomerInput = {
  email?: string
  firstName?: string
  lastName?: string
  phone?: string
  address?: string
  addressComplement?: string
  country?: string
  postalCode?: string
  city?: string
}

export type CreatedServerOrder = {
  orderId: string
  reference: string
  total: number
  userId: string | null
  customerEmail: string
  stripeLineItems: Array<{
    price_data: {
      currency: 'eur'
      product_data: { name: string }
      unit_amount: number
    }
    quantity: number
  }>
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function cleanText(value: unknown, maxLength: number): string {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

export function validateCustomerInput(input?: OrderCustomerInput) {
  const email = cleanText(input?.email, 160)
  const firstName = cleanText(input?.firstName, 80)
  const lastName = cleanText(input?.lastName, 80)
  const phone = cleanText(input?.phone, 40)
  const street = cleanText(input?.address, 160)
  const complement = cleanText(input?.addressComplement, 120)
  const country = cleanText(input?.country, 60) || 'Italia'
  const postalCode = cleanText(input?.postalCode, 16)
  const city = cleanText(input?.city, 100)

  const phoneDigits = phone.replace(/\D/g, '')

  if (
    !email ||
    !EMAIL_REGEX.test(email) ||
    firstName.length < 2 ||
    lastName.length < 2 ||
    phoneDigits.length < 8 ||
    phoneDigits.length > 16 ||
    street.length < 4 ||
    postalCode.length < 3 ||
    city.length < 2
  ) {
    throw new Error('INVALID_CUSTOMER')
  }

  return {
    email,
    firstName,
    lastName,
    phone,
    fullAddress: [street, complement, country].filter(Boolean).join(', '),
    postalCode,
    city,
  }
}

export async function createServerOrder(params: {
  customer?: OrderCustomerInput
  items?: RequestedOrderItem[]
  locale?: Locale
  paymentMethod: 'card' | 'bank_transfer'
  paymentStatus: 'pending' | 'unpaid'
}): Promise<CreatedServerOrder> {
  const { items, locale = 'it', paymentMethod, paymentStatus } = params

  if (
    !items?.length ||
    items.some(
      (item) =>
        !item.productId ||
        typeof item.productId !== 'string' ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1 ||
        item.quantity > 99,
    )
  ) {
    throw new Error('INVALID_CHECKOUT')
  }

  const customer = validateCustomerInput(params.customer)

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !serviceKey) {
    throw new Error('ORDER_SERVICE_NOT_CONFIGURED')
  }

  let userId: string | null = null
  try {
    const supabase = await createServerSupabase()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    userId = user?.id ?? null
  } catch {
    userId = null
  }

  const admin = createAdminClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  const productIds = [...new Set(items.map((item) => item.productId))]
  const [
    { data: dbProducts, error: productError },
    { data: variants, error: variantError },
    { data: translations, error: translationError },
  ] = await Promise.all([
    admin
      .from('braviko_products')
      .select('id, slug')
      .in('id', productIds),
    admin
      .from('braviko_product_variants')
      .select('id, product_id, price, label')
      .in('product_id', productIds),
    admin
      .from('braviko_product_translations')
      .select('product_id, locale, name')
      .in('product_id', productIds),
  ])

  if (productError) throw productError
  if (variantError) throw variantError
  if (translationError) throw translationError

  const { getItalianProductOverride, translateVariantLabel } = await import('@/data/product-italian-overrides')
  const { EXTRA_CATALOG_PRODUCTS } = await import('@/data/extra-catalog-products')
  const extraByProductId = new Map(EXTRA_CATALOG_PRODUCTS.map((p) => [p.id, p]))
  const slugByProductId = new Map((dbProducts || []).map((p) => [p.id, p.slug]))

  const resolvedItems = items.map((item) => {
    const extraProduct = extraByProductId.get(item.productId)
    const dbProductVariants = (variants || []).filter((v) => v.product_id === item.productId)
    const productVariants = (
      dbProductVariants.length > 0
        ? dbProductVariants
        : extraProduct
          ? extraProduct.variants.map((v) => ({
              id: v.id,
              product_id: extraProduct.id,
              price: v.price,
              label: v.label,
            }))
          : []
    ).sort((a, b) => Number(a.price) - Number(b.price))

    const variant =
      (item.variantId ? productVariants.find((v) => v.id === item.variantId) : undefined) ||
      productVariants[0]

    if (!variant) {
      throw new Error('PRODUCT_UNAVAILABLE')
    }

    const slug = slugByProductId.get(item.productId) || extraProduct?.slug
    const override = getItalianProductOverride(slug)
    const name =
      (locale === 'it' ? override?.name : undefined) ||
      translations?.find((t) => t.product_id === item.productId && t.locale === locale)?.name ||
      override?.name ||
      extraProduct?.italianOverride.name ||
      translations?.find((t) => t.product_id === item.productId && t.locale === 'it')?.name ||
      translations?.find((t) => t.product_id === item.productId && t.locale === 'fr')?.name
    if (!name) {
      throw new Error('PRODUCT_UNAVAILABLE')
    }

    const unitPrice = Number(Number(variant.price).toFixed(2))
    const lineTotal = Number((unitPrice * item.quantity).toFixed(2))

    return {
      product_id: item.productId,
      variant_id: variant.id,
      product_name: name,
      variant_label: variant.label ? translateVariantLabel(variant.label, slug) : null,
      quantity: item.quantity,
      unit_price: unitPrice,
      line_total: lineTotal,
    }
  })

  const total = Number(
    resolvedItems.reduce((sum, item) => sum + item.line_total, 0).toFixed(2),
  )

  const reference = `BRV-${Date.now().toString(36).toUpperCase()}-${randomBytes(2).toString('hex').toUpperCase()}`

  const { data: insertedOrder, error: orderError } = await admin
    .from('braviko_orders')
    .insert({
      user_id: userId,
      reference,
      subtotal: total,
      delivery_amount: 0,
      total,
      currency: 'EUR',
      customer_email: customer.email,
      first_name: customer.firstName,
      last_name: customer.lastName,
      phone: customer.phone,
      address: customer.fullAddress,
      postal_code: customer.postalCode,
      city: customer.city,
      payment_status: paymentStatus,
      payment_method: paymentMethod,
    })
    .select('id, reference')
    .single()

  if (orderError) {
    if (orderError.code === '23502' && orderError.message?.includes('user_id')) {
      throw new Error('GUEST_CHECKOUT_MIGRATION_REQUIRED')
    }
    throw orderError
  }

  const { error: itemsError } = await admin.from('braviko_order_items').insert(
    resolvedItems.map((line) => ({
      order_id: insertedOrder.id,
      ...line,
    })),
  )

  if (itemsError) {
    await admin.from('braviko_orders').delete().eq('id', insertedOrder.id)
    throw itemsError
  }

  return {
    orderId: insertedOrder.id,
    reference: insertedOrder.reference,
    total,
    userId,
    customerEmail: customer.email,
    stripeLineItems: resolvedItems.map((line) => ({
      price_data: {
        currency: 'eur' as const,
        product_data: { name: line.product_name },
        unit_amount: Math.round(line.unit_price * 100),
      },
      quantity: line.quantity,
    })),
  }
}
