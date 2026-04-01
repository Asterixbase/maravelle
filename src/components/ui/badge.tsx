import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-medium tracking-wider uppercase font-body',
  {
    variants: {
      variant: {
        gold: 'bg-[#d4952a]/20 text-[#d4952a] border border-[#d4952a]/40',
        forest: 'bg-[#1a4d33]/60 text-[#f0ebe0] border border-[#2d6b4a]/40',
        cream: 'bg-[#f0ebe0]/10 text-[#f0ebe0] border border-white/10',
        sale: 'bg-red-900/60 text-red-200 border border-red-700/40',
        new: 'bg-[#1a4d33]/80 text-[#f0ebe0]',
      },
    },
    defaultVariants: { variant: 'gold' },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}
