import Image from 'next/image'

interface LogoProps {
  className?: string
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <Image src="/images/braviko-logo.png" alt="Braviko" width={170} height={64} className="h-44 w-auto object-contain" priority />
    </div>
  )
}
