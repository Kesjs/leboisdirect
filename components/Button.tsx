import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'rounded-pill font-medium transition-all duration-200',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'focus:outline-none focus:ring-2 focus:ring-charcoal focus:ring-offset-2',
          {
            'bg-charcoal text-white hover:bg-charcoal/90': variant === 'primary',
            'bg-transparent border border-charcoal text-charcoal hover:bg-charcoal/5':
              variant === 'secondary',
            'bg-transparent text-charcoal hover:bg-charcoal/5': variant === 'ghost',
          },
          {
            'px-20 py-8 text-body-sm': size === 'sm',
            'px-32 py-12 text-body': size === 'md',
            'px-40 py-16 text-body-lg': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
