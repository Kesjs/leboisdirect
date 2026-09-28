import type { CartItem } from '@/lib/cart-context'

export type OrderDraft = {
  reference: string
  createdAt: string
  customer: { email: string; firstName: string; lastName: string; address: string; city: string; postalCode: string; phone: string }
  items: CartItem[]
  subtotal: number
}

const orderKey = 'braviko-last-order'

export function createOrderDraft(customer: OrderDraft['customer'], items: CartItem[], subtotal: number): OrderDraft {
  return { reference: `BRV-${Date.now().toString(36).toUpperCase()}`, createdAt: new Date().toISOString(), customer, items, subtotal }
}

export function saveOrderDraft(order: OrderDraft) {
  try { window.localStorage.setItem(orderKey, JSON.stringify(order)) } catch { /* The confirmation still works in the active session. */ }
}

export function readOrderDraft(): OrderDraft | null {
  try {
    const value = window.localStorage.getItem(orderKey)
    if (!value) return null
    const parsed: unknown = JSON.parse(value)
    if (typeof parsed === 'object' && parsed && Array.isArray((parsed as OrderDraft).items) && typeof (parsed as OrderDraft).reference === 'string') return parsed as OrderDraft
  } catch { /* Ignore unavailable or malformed browser storage. */ }
  return null
}
