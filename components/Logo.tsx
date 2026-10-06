import Image from 'next/image'

interface LogoProps {
  className?: string
}

export default function Logo({ className = 'h-12 w-auto object-contain' }: LogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <Image src="/images/braviko-logo.png" alt="Braviko" width={170} height={64} className="h-full w-auto object-contain" priority />
    </div>
  )
}
