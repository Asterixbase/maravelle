import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-body text-sm font-medium tracking-widest uppercase transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#d4952a] disabled:pointer-events-none disabled:opacity-40',
  {
    variants: {
      variant: {
        gold:
          'bg-[#d4952a] text-[#06090c] hover:bg-[#e8b84b] shadow-[0_4px_16px_rgba(212,149,42,0.3)]',
        outline:
          'border border-[#d4952a] text-[#d4952a] hover:bg-[#d4952a] hover:text-[#06090c]',
        ghost:
          'text-[#f0ebe0] hover:text-[#d4952a] hover:bg-white/5',
        forest:
          'bg-[#1a4d33] text-[#f0ebe0] hover:bg-[#2d6b4a]',
        destructive:
          'bg-red-900 text-[#f0ebe0] hover:bg-red-800',
        link:
          'text-[#d4952a] underline-offset-4 hover:underline p-0 h-auto',
      },
      size: {
        sm: 'h-8 px-4 text-xs',
        md: 'h-11 px-6 text-sm',
        lg: 'h-13 px-8 text-sm',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'gold',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled ?? loading}
        {...props}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
            </svg>
            {children}
          </span>
        ) : (
          children
        )}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { buttonVariants }
