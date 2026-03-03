import Link from 'next/link'
import type { Bird } from '@/types'
import { Badge } from '@/components/ui/badge'
import { BirdAvatar } from '@/components/birds/BirdAvatar'
import { calcAge, formatDate } from '@/lib/utils'
import { Calendar, Tag } from 'lucide-react'

const SEX_VARIANT = { M: 'male', F: 'female', U: 'unknown' } as const
const SEX_LABEL   = { M: '♂ Macho', F: '♀ Fêmea', U: 'DNA pendente' }
const STATUS_VARIANT = {
  plantel: 'plantel', filhote: 'filhote', vendido: 'vendido', obito: 'obito',
} as const
const STATUS_LABEL = { plantel: 'Plantel', filhote: 'Filhote', vendido: 'Vendido', obito: 'Óbito' }

export function BirdCard({ bird }: { bird: Bird }) {
  const sp = bird.species
  return (
    <Link
      href={`/birds/${bird.id}`}
      className="group block bg-card rounded-[var(--radius-lg)] border border-border shadow-sm hover:shadow-md hover:border-primary-300 transition-all duration-200 overflow-hidden"
    >
      {/* Color bar */}
      <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #2d9165, #74c69d)' }} />

      <div className="p-4">
        <div className="flex items-start gap-3">
          <BirdAvatar
            photoUrl={bird.photo_url}
            speciesEmoji={sp?.emoji}
            size="md"
          />
          <div className="flex-1 min-w-0">
            <p className="font-mono text-xs font-bold text-primary-700 truncate">{bird.ring_number}</p>
            <p className="text-sm font-semibold text-gray-800 truncate mt-0.5">
              {sp?.common_name ?? '—'}
            </p>
            {bird.mutation && (
              <p className="text-xs text-muted truncate">{bird.mutation}</p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-3">
          <Badge variant={SEX_VARIANT[bird.sex]}>{SEX_LABEL[bird.sex]}</Badge>
          <Badge variant={STATUS_VARIANT[bird.status]}>{STATUS_LABEL[bird.status]}</Badge>
        </div>

        <div className="mt-3 space-y-1">
          {bird.birth_date && (
            <div className="flex items-center gap-1.5 text-xs text-muted">
              <Calendar size={11} />
              <span>{formatDate(bird.birth_date)}</span>
              <span className="text-muted-light">· {calcAge(bird.birth_date)}</span>
            </div>
          )}
          {bird.mutation && (
            <div className="flex items-center gap-1.5 text-xs text-muted">
              <Tag size={11} />
              <span className="truncate">{bird.mutation}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
