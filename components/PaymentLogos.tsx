import React from 'react'

export function CbLogo({ className = 'h-[24px] w-auto' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 80"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Carta Bancaire (CB)"
    >
      <rect width="120" height="80" rx="6" fill="url(#braviko-cb-grad)" />
      <path
        d="M104 28.7501C104 27.5001 103.75 26.2501 103.25 25.0001C102.75 23.7501 102 22.7501 101.25 22.0001C100.25 21.0001 99.2505 20.2501 98.0005 20.0001C96.7505 19.5001 95.2505 19.5001 93.2505 19.5001H65.7505V28.7501V38.0001H93.0005C95.0005 38.0001 96.7505 37.7501 97.7505 37.5001C99.0005 37.0001 100 36.5001 101 35.5001C102 34.5001 102.5 33.5001 103 32.5001C103.75 31.2501 104 30.0001 104 28.7501Z"
        fill="#FFFFFF"
      />
      <path
        d="M104 51.5001C104 50.2501 103.75 49.0001 103.25 47.7501C102.75 46.5001 102 45.5001 101.25 44.7501C100.25 43.7501 99.2505 43.0001 98.0005 42.7501C96.7505 42.2501 95.2505 42.2501 93.2505 42.2501H65.7505V51.5001V60.7501H93.0005C95.0005 60.7501 96.7505 60.5001 97.7505 60.2501C99.0005 59.7501 100 59.2501 101 58.2501C102 57.2501 102.5 56.2501 103 55.2501C103.75 54.0001 104 52.7501 104 51.5001Z"
        fill="#FFFFFF"
      />
      <path
        d="M62.0005 38C61.0005 26 52.5005 18 39.0005 18C24.7505 18 16.0005 26.75 16.0005 40C16.0005 53.75 25.2505 62 39.0005 62C52.5005 62 61.0005 54.25 62.0005 42H38.7505V37.75H62.0005V38Z"
        fill="#FFFFFF"
      />
      <defs>
        <linearGradient id="braviko-cb-grad" x1="0" y1="80" x2="120" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#239942" />
          <stop offset="0.489583" stopColor="#0F7B9D" />
          <stop offset="1" stopColor="#0D2553" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function VisaLogo({ className = 'h-[24px] w-auto' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 80"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Visa"
    >
      <rect x="0.75" y="0.75" width="118.5" height="78.5" rx="6" fill="#FFFFFF" stroke="#DEDFD6" strokeWidth="1.5" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M86.6666 44.9375L90.3239 35.0625L92.3809 44.9375H86.6666ZM100.952 52.8375L95.8086 27.1625H88.7383C86.3525 27.1625 85.7723 29.0759 85.7723 29.0759L76.1904 52.8375H82.8868L84.2269 49.0244H92.3947L93.1479 52.8375H100.952Z"
        fill="#1434CB"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M77.1866 33.5711L78.0952 28.244C78.0952 28.244 75.2896 27.1625 72.3648 27.1625C69.2031 27.1625 61.6955 28.5638 61.6955 35.3738C61.6955 41.7825 70.5071 41.8621 70.5071 45.2266C70.5071 48.5912 62.6034 47.9901 59.9955 45.8676L59.0476 51.4362C59.0476 51.4362 61.8919 52.8375 66.2397 52.8375C70.5869 52.8375 77.1467 50.5544 77.1467 44.3455C77.1467 37.8964 68.2552 37.296 68.2552 34.4921C68.2552 31.6882 74.4602 32.0484 77.1866 33.5711Z"
        fill="#1434CB"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M54.6517 52.8375H47.6191L52.0144 27.1625H59.0477L54.6517 52.8375Z"
        fill="#1434CB"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M42.3113 27.1625L35.9217 44.8213L35.1663 41.0185L35.167 41.0199L32.9114 29.4749C32.9114 29.4749 32.6394 27.1625 29.7324 27.1625H19.1709L19.0476 27.5966C19.0476 27.5966 22.2782 28.2669 26.057 30.5326L31.8793 52.8375H38.8617L49.5238 27.1625H42.3113Z"
        fill="#1434CB"
      />
    </svg>
  )
}

export function MastercardLogo({ className = 'h-[24px] w-auto' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 80"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Mastercard"
    >
      <rect x="0.75" y="0.75" width="118.5" height="78.5" rx="6" fill="#FFFFFF" stroke="#DEDFD6" strokeWidth="1.5" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M49.6521 58.595H70.3479V21.4044H49.6521V58.595Z"
        fill="#FF5F00"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M98.2675 40.0003C98.2675 53.063 87.6791 63.652 74.6171 63.652C69.0996 63.652 64.0229 61.7624 60 58.5956C65.5011 54.2646 69.0339 47.5448 69.0339 40.0003C69.0339 32.4552 65.5011 25.7354 60 21.4044C64.0229 18.2376 69.0996 16.348 74.6171 16.348C87.6791 16.348 98.2675 26.937 98.2675 40.0003Z"
        fill="#F79E1B"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M50.966 40.0003C50.966 32.4552 54.4988 25.7354 59.9999 21.4044C55.977 18.2376 50.9003 16.348 45.3828 16.348C32.3208 16.348 21.7324 26.937 21.7324 40.0003C21.7324 53.063 32.3208 63.652 45.3828 63.652C50.9003 63.652 55.977 61.7624 59.9999 58.5956C54.4988 54.2646 50.966 47.5448 50.966 40.0003Z"
        fill="#EB001B"
      />
    </svg>
  )
}

export function SecureShieldIcon({ className = 'w-[20px] h-[20px]' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}

export function DeliveryTruckIcon({ className = 'w-[20px] h-[20px]' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
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

export function PaymentBadgesRow({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex flex-row flex-wrap items-center gap-[8px] ${className}`.trim()}
      aria-label="Metodi di pagamento accettati"
    >
      <CbLogo className="h-[26px] w-auto shrink-0 rounded-[4px]" />
      <VisaLogo className="h-[26px] w-auto shrink-0 rounded-[4px]" />
      <MastercardLogo className="h-[26px] w-auto shrink-0 rounded-[4px]" />
    </div>
  )
}
