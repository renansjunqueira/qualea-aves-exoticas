import Link from 'next/link'
import type { Clutch } from '@/types'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import { Egg } from 'lucide-react'

const STATUS_VARIANT: Record<string, 'incubating' | 'hatched' | 'lost' | 'weaning'> = {
  incubating: 'incubating', hatched: 'hatched', lost: 'lost', weaning: 'weaning',
}
const STATUS_LABEL = { incubating: 'Incubando', hatched: 'Nascidos', lost: 'Perdida', weaning: 'Desmame' }

interface Props { clutches: Clutch[] }

export function ActiveClutchCard({ clutches }: Props) {
  if (!clutches.length) {
    return (
      <div className="flex flex-col items-center gap-2 py-8 text-muted">
        <Egg size={32} strokeWidth={1.2} className="text-border" />
        <p className="text-sm">Nenhuma ninhada ativa.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {clutches.map(c => {
        const male   = c.pair?.male
        const female = c.pair?.female
        const sp     = male?.species
        return (
          <Link key={c.id} href={`/clutches/${c.id}`}
            className="flex items-center gap-3 p-3 rounded-[var(--radius-md)] hover:bg-primary-50 transition-colors border border-border">
            <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 text-lg">
              {sp?.emoji ?? '🥚'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-800 truncate">
                {sp?.common_name ?? '—'} · Viveiro {c.pair?.aviary_number ?? '?'}
              </p>
              <p className="text-[11px] text-muted">
                {male?.ring_number ?? '?'} × {female?.ring_number ?? '?'} · 1º ovo {formatDate(c.first_egg_date)}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              <Badge variant={STATUS_VARIANT[c.status] ?? 'incubating'}>
                {STATUS_LABEL[c.status]}
              </Badge>
              <span className="text-[10px] text-muted">{c.total_eggs} ovos · {c.hatched} nascidos</span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
