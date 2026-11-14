import { NextResponse } from 'next/server'
import { createServerOrder, type OrderCustomerInput, type RequestedOrderItem } from '@/lib/server/orders'
import { createBankRevealToken, getMaskedBankTransferDetails } from '@/lib/server/bank-transfer'
import type { Locale } from '@/lib/i18n-context'

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      customer?: OrderCustomerInput
      items?: RequestedOrderItem[]
      locale?: Locale
    }

    const order = await createServerOrder({
      customer: body.customer,
      items: body.items,
      locale: body.locale || 'it',
      paymentMethod: 'bank_transfer',
      paymentStatus: 'pending',
    })

    const maskedDetails = getMaskedBankTransferDetails()
    const revealToken = createBankRevealToken(order.reference)

    return NextResponse.json(
      {
        ok: true,
        reference: order.reference,
        total: order.total,
        maskedDetails,
        revealToken,
      },
      { headers: { 'Cache-Control': 'private, no-store' } },
    )
  } catch (error) {
    const code = error instanceof Error ? error.message : 'BANK_TRANSFER_UNAVAILABLE'
    console.error('Bank transfer checkout error:', code, error)
    const status =
      code === 'ORDER_SERVICE_NOT_CONFIGURED' || code === 'GUEST_CHECKOUT_MIGRATION_REQUIRED'
        ? 503
        : code === 'INVALID_CUSTOMER' || code === 'INVALID_CHECKOUT' || code === 'PRODUCT_UNAVAILABLE'
          ? 400
          : 500

    const message =
      code === 'INVALID_CUSTOMER'
        ? 'Verifica i tuoi dati e l’indirizzo di consegna prima di confermare.'
        : code === 'PRODUCT_UNAVAILABLE'
          ? 'Uno dei prodotti nel carrello non è più disponibile.'
          : 'Impossibile preparare il bonifico. Riprova.'

    return NextResponse.json({ error: code, message }, { status })
  }
}
