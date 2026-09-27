interface LogoProps {
  className?: string
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-8 ${className}`}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <path
          d="M16 2L4 8v12l12 6 12-6V8L16 2z"
          fill="#B85C3A"
          fillOpacity="0.1"
        />
        <path
          d="M16 2L4 8v12l12 6V2z"
          fill="#B85C3A"
          fillOpacity="0.2"
        />
        <path
          d="M16 14l-8-4v8l8 4v-8z"
          fill="#B85C3A"
        />
        <path
          d="M16 2v12l12-6L16 2z"
          stroke="#1D1D1D"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <path
          d="M16 14v12l12-6V8l-12 6z"
          stroke="#1D1D1D"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-semibold text-[20px] tracking-tight text-charcoal">
        LeBoisDirect
      </span>
    </div>
  )
}
