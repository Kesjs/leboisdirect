import Image from 'next/image'

interface LogoProps {
  className?: string
}

export default function Logo({ className = 'h-16 w-[180px] shrink-0' }: LogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <Image src="/images/braviko-pets-logo.svg" alt="Braviko, prodotti per animali" width={260} height={62} className="h-auto w-full object-contain" priority />
    </div>
  )
}
