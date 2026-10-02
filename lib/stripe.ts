import Stripe from 'stripe'

export function stripeClient() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_NOT_CONFIGURED')
  return new Stripe(key)
}
