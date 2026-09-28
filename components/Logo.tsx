interface LogoProps {
  className?: string
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-8 ${className}`}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0" aria-hidden="true">
        <path d="M16 3 27 9.2v13.6L16 29 5 22.8V9.2L16 3Z" fill="#2F5141" fillOpacity=".1" stroke="#1D1D1D" strokeWidth="1.25" strokeLinejoin="round" />
        <path d="M16 3v13m0 0 11-6.8M16 16 5 9.2" stroke="#1D1D1D" strokeWidth="1.25" strokeLinejoin="round" />
        <path d="M16 22.8c2.7-4.9 5.5-6.5 8.2-7.2-1.1 4.7-3.9 7.5-8.2 8.3-1.1-4.5-3.6-7.1-7.4-8.1 1 4.3 3.5 6.6 7.4 7Z" fill="#B85C3A" />
      </svg>
      <span className="font-semibold text-[20px] tracking-tight text-charcoal">
        Braviko
      </span>
    </div>
  )
}
