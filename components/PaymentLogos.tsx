import React from 'react'

export function CbLogo({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 78"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Carte Bancaire (CB)"
    >
      <rect width="120" height="78" rx="8" fill="#00805E" />
      <path d="M0 8C0 3.58172 3.58172 0 8 0H112C116.418 0 120 3.58172 120 8V39H0V8Z" fill="#003D7A" />
      <text
        x="60"
        y="53"
        fill="#FFFFFF"
        fontFamily="sans-serif"
        fontWeight="800"
        fontSize="44"
        textAnchor="middle"
        letterSpacing="-1"
      >
        CB
      </text>
    </svg>
  )
}

export function VisaLogo({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 78"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Visa"
    >
      <rect width="120" height="78" rx="8" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="2" />
      <path
        d="M50.4 49.6L55.8 28.4H64.4L59 49.6H50.4ZM81.2 28.9C79.5 28.2 76.8 27.5 73.5 27.5C64.6 27.5 58.4 32.2 58.3 38.9C58.2 43.9 62.7 46.7 66.1 48.4C69.6 50.1 70.8 51.2 70.8 52.7C70.7 55.1 67.9 56.1 65.3 56.1C61.4 56.1 59.1 55.5 56.2 54.2L54.7 53.5L53.1 61.2C55.2 62.1 59.2 63 63.3 63C72.8 63 79 58.3 79.1 51C79.2 45.4 75.8 42.4 70.7 39.9C67.6 38.3 65.8 37.3 65.8 35.6C65.9 34.1 67.6 32.5 71.3 32.5C74.3 32.4 76.7 33.1 78.6 33.9L79.5 34.3L81.2 28.9ZM101.4 49.6H109L102.4 28.4H95.4C93.8 28.4 92.5 29.3 91.9 30.7L78.6 62.3H87.3L89 57.6H99.7L101.4 49.6ZM91.4 45.4L95.8 33.3L98.3 45.4H91.4ZM44.2 28.4L35.7 49.6H27.5L20.2 33.5C19.7 31.7 19.3 31 17.8 30.2C15.5 28.9 11.7 27.8 7 26.8L7.3 28.4C12.3 29.4 16.6 31.5 19.4 34.2L26.6 62.3H35.4L48.6 28.4H44.2Z"
        fill="#1434CB"
      />
    </svg>
  )
}

export function MastercardLogo({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 78"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Mastercard"
    >
      <rect width="120" height="78" rx="8" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="2" />
      <circle cx="48" cy="39" r="22" fill="#EB001B" />
      <circle cx="72" cy="39" r="22" fill="#F79E1B" fillOpacity="0.9" />
      <path
        d="M60 21.6C64.9 25.8 68 32 68 39C68 46 64.9 52.2 60 56.4C55.1 52.2 52 46 52 39C52 32 55.1 25.8 60 21.6Z"
        fill="#FF5F00"
      />
    </svg>
  )
}

export function SecureShieldIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}

export function DeliveryTruckIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  )
}

export function PaymentBadgesRow({ className = 'flex items-center gap-2' }: { className?: string }) {
  return (
    <div className={className} aria-label="Moyens de paiement acceptés">
      <CbLogo className="h-7 w-auto shadow-sm rounded" />
      <VisaLogo className="h-7 w-auto shadow-sm rounded" />
      <MastercardLogo className="h-7 w-auto shadow-sm rounded" />
    </div>
  )
}
