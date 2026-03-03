import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: number | string
  icon: LucideIcon
  trend?: string
  trendUp?: boolean
  color?: 'green' | 'amber' | 'blue' | 'purple' | 'red'
  className?: string
}

const COLOR_MAP = {
  green:  { icon: 'bg-primary-100 text-primary-700', value: 'text-primary-800' },
  amber:  { icon: 'bg-amber-100 text-amber-700',     value: 'text-amber-800' },
  blue:   { icon: 'bg-blue-100 text-blue-700',       value: 'text-blue-800' },
  purple: { icon: 'bg-purple-100 text-purple-700',   value: 'text-purple-800' },
  red:    { icon: 'bg-red-100 text-red-700',         value: 'text-red-800' },
}

export function StatCard({ title, value, icon: Icon, trend, trendUp, color = 'green', className }: StatCardProps) {
  const colors = COLOR_MAP[color]

  return (
    <div className={cn(
      'bg-card rounded-[var(--radius-lg)] border border-border p-5 flex flex-col gap-4 shadow-sm animate-fade-in',
      className
    )}>
      <div className="flex items-start justify-between">
        <div className={cn('w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center flex-shrink-0', colors.icon)}>
          <Icon size={20} strokeWidth={2} />
        </div>
        {trend && (
          <span className={cn(
            'text-xs font-semibold px-2 py-0.5 rounded-full',
            trendUp ? 'bg-primary-100 text-primary-700' : 'bg-red-100 text-red-700'
          )}>
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className={cn('text-3xl font-bold tracking-tight', colors.value)}>{value}</p>
        <p className="text-xs text-muted mt-0.5 font-medium">{title}</p>
      </div>
    </div>
  )
}
