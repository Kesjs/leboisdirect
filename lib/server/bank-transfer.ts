import { createHmac, timingSafeEqual } from 'crypto'
import { bankTransferDetails as fallbackBankDetails } from '@/data/bank-transfer'

export type BankTransferRawDetails = {
  accountHolder: string
  iban: string
  bic: string
}

export function getServerBankTransferDetails(): BankTransferRawDetails {
  return {
    accountHolder:
      process.env.BANK_TRANSFER_HOLDER?.trim() || fallbackBankDetails.accountHolder,
    iban: process.env.BANK_TRANSFER_IBAN?.trim() || fallbackBankDetails.iban,
    bic: process.env.BANK_TRANSFER_BIC?.trim() || fallbackBankDetails.bic,
  }
}

export function maskAccountHolder(holder: string): string {
  return holder
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => {
      if (part.length <= 2) return `${part[0]}•`
      return `${part[0]}${'•'.repeat(Math.min(7, part.length - 1))}`
    })
    .join(' ')
}

export function maskIban(iban: string): string {
  const compact = iban.replace(/\s+/g, '').toUpperCase()
  if (compact.length <= 8) return '•••• ••••'
  const prefix = compact.slice(0, 4)
  const suffix = compact.slice(-3)
  return `${prefix} •••• •••• •••• ${suffix}`
}

export function maskBic(bic: string): string {
  const compact = bic.replace(/\s+/g, '').toUpperCase()
  if (compact.length <= 6) return '••••••••'
  return `${compact.slice(0, 4)}••••${compact.slice(-3)}`
}

export function getMaskedBankTransferDetails(): BankTransferRawDetails {
  const details = getServerBankTransferDetails()
  return {
    accountHolder: maskAccountHolder(details.accountHolder),
    iban: maskIban(details.iban),
    bic: maskBic(details.bic),
  }
}

function getRevealSecret(): string | null {
  return (
    process.env.BANK_TRANSFER_TOKEN_SECRET?.trim() ||
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
    process.env.STRIPE_SECRET_KEY?.trim() ||
    null
  )
}

export function createBankRevealToken(reference: string, ttlSeconds = 86400): string {
  const secret = getRevealSecret()
  if (!secret) {
    throw new Error('ORDER_SERVICE_NOT_CONFIGURED')
  }
  const expiresAt = Math.floor(Date.now() / 1000) + ttlSeconds
  const payload = `${reference}:${expiresAt}`
  const sig = createHmac('sha256', secret).update(payload).digest('base64url')
  return `${expiresAt}.${sig}`
}

export function verifyBankRevealToken(reference: string, token: string): boolean {
  if (!reference || !token || typeof token !== 'string') return false
  const secret = getRevealSecret()
  if (!secret) return false
  const parts = token.split('.')
  if (parts.length !== 2) return false
  const [expStr, providedSig] = parts
  const expiresAt = Number(expStr)
  if (!Number.isInteger(expiresAt) || expiresAt < Math.floor(Date.now() / 1000)) {
    return false
  }
  const payload = `${reference}:${expiresAt}`
  const expectedSig = createHmac('sha256', secret).update(payload).digest('base64url')
  const providedBuf = Buffer.from(providedSig)
  const expectedBuf = Buffer.from(expectedSig)
  if (providedBuf.length !== expectedBuf.length) return false
  return timingSafeEqual(providedBuf, expectedBuf)
}
