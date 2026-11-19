import type { CountryIso } from '@/lib/countries'

type CountryFlagProps = {
  country: Lowercase<CountryIso> | CountryIso
  className?: string
  size?: 'sm' | 'md'
}

export default function CountryFlag({ country, className = '', size = 'md' }: CountryFlagProps) {
  const code = country.toLowerCase() as Lowercase<CountryIso>
  const dimensions = size === 'sm' ? 'w-[20px] h-[14px]' : 'w-[24px] h-[16px]'

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[3px] shadow-[0_0_0_1px_rgba(37,40,35,0.16)] ${dimensions} ${className}`.trim()}
      aria-hidden="true"
    >
      {code === 'it' && (
        <svg viewBox="0 0 24 16" className="h-full w-full block">
          <rect width="8" height="16" x="0" fill="#009246" />
          <rect width="8" height="16" x="8" fill="#FFFFFF" />
          <rect width="8" height="16" x="16" fill="#CE2B37" />
        </svg>
      )}
      {code === 'fr' && (
        <svg viewBox="0 0 24 16" className="h-full w-full block">
          <rect width="8" height="16" x="0" fill="#002395" />
          <rect width="8" height="16" x="8" fill="#FFFFFF" />
          <rect width="8" height="16" x="16" fill="#ED2939" />
        </svg>
      )}
      {code === 'ch' && (
        <svg viewBox="0 0 24 16" className="h-full w-full block">
          <rect width="24" height="16" fill="#D52B1E" />
          <rect width="10" height="3.2" x="7" y="6.4" fill="#FFFFFF" />
          <rect width="3.2" height="10" x="10.4" y="3" fill="#FFFFFF" />
        </svg>
      )}
      {code === 'de' && (
        <svg viewBox="0 0 24 16" className="h-full w-full block">
          <rect width="24" height="5.33" y="0" fill="#181818" />
          <rect width="24" height="5.34" y="5.33" fill="#DD0000" />
          <rect width="24" height="5.33" y="10.67" fill="#FFCE00" />
        </svg>
      )}
      {code === 'be' && (
        <svg viewBox="0 0 24 16" className="h-full w-full block">
          <rect width="8" height="16" x="0" fill="#181818" />
          <rect width="8" height="16" x="8" fill="#FDDA24" />
          <rect width="8" height="16" x="16" fill="#EF3340" />
        </svg>
      )}
      {code === 'lu' && (
        <svg viewBox="0 0 24 16" className="h-full w-full block">
          <rect width="24" height="5.33" y="0" fill="#ED2939" />
          <rect width="24" height="5.34" y="5.33" fill="#FFFFFF" />
          <rect width="24" height="5.33" y="10.67" fill="#00A1DE" />
        </svg>
      )}
    </span>
  )
}
