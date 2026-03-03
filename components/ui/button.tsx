'use client'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'
import { type ButtonHTMLAttributes, forwardRef } from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-md)] text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
  {
    variants: {
      variant: {
        default:   'bg-primary-700 text-white hover:bg-primary-800 shadow-sm',
        secondary: 'bg-white text-primary-800 border border-border hover:bg-primary-50 shadow-sm',
        ghost:     'text-primary-700 hover:bg-primary-50 hover:text-primary-800',
        danger:    'bg-danger-100 text-danger-700 hover:bg-danger-500 hover:text-white',
        accent:    'bg-accent-500 text-white hover:bg-accent-600 shadow-sm',
        outline:   'border border-primary-700 text-primary-700 hover:bg-primary-50',
      },
      size: {
        sm:   'h-8  px-3 text-xs',
        md:   'h-9  px-4',
        lg:   'h-11 px-6 text-base',
        icon: 'h-9 w-9 p-0',
      },
    },
    defaultVariants: { variant: 'default', size: 'md' },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  }
)
Button.displayName = 'Button'
export { Button, buttonVariants }
