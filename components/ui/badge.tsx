import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap',
  {
    variants: {
      variant: {
        default:    'bg-primary-100 text-primary-800',
        male:       'bg-blue-100 text-blue-700',
        female:     'bg-pink-100 text-pink-700',
        unknown:    'bg-gray-100 text-gray-600',
        plantel:    'bg-primary-100 text-primary-800',
        filhote:    'bg-amber-100 text-amber-700',
        vendido:    'bg-sky-100 text-sky-700',
        obito:      'bg-red-100 text-red-700',
        incubating: 'bg-orange-100 text-orange-700',
        hatched:    'bg-primary-100 text-primary-800',
        lost:       'bg-red-100 text-red-700',
        weaning:    'bg-purple-100 text-purple-700',
        accent:     'bg-accent-500 text-white',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}
