import Link from 'next/link'
import type { Pair, Clutch } from '@/types'
import { BirdAvatar } from '@/components/birds/BirdAvatar'
import { Badge }      from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import { Heart, Egg, Home, Calendar } from 'lucide-react'

interface Props {
  pair:     Pair
  clutches: Clutch[]
}

const CLUTCH_VARIANT = {
  incubating: 'incubating', hatched: 'hatched', lost: 'lost', weaning: 'weaning',
} as const

const CLUTCH_LABEL = {
  incubating: 'Incubando', hatched: 'Nascidos', lost: 'Perdida', weaning: 'Desmame',
}

export function PairCard({ pair, clutches }: Props) {
  const male   = pair.male
  const female = pair.female
  const mSp    = male?.species
  const fSp    = female?.species

  const activeClutch = clutches.find(c =>
    c.pair_id === pair.id && (c.status === 'incubating' || c.status === 'weaning')
  )
  const totalClutches  = clutches.filter(c => c.pair_id === pair.id).length
  const totalHatched   = clutches
    .filter(c => c.pair_id === pair.id)
    .reduce((s, c) => s + c.hatched, 0)

  return (
    <Link
      href={`/pairs/${pair.id}`}
      className="group block bg-card rounded-[var(--radius-lg)] border border-border shadow-sm hover:shadow-md hover:border-primary-300 transition-all duration-200 overflow-hidden"
    >
      {/* Aviary tag */}
      {pair.aviary_number && (
        <div className="px-4 pt-3 pb-0">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary-700 bg-primary-50 px-2.5 py-0.5 rounded-full border border-primary-200">
            <Home size={10} /> Viveiro {pair.aviary_number}
          </span>
        </div>
      )}

      {/* Pair visual */}
      <div className="flex items-center gap-2 px-4 py-4">
        {/* Macho */}
        <div className="flex flex-col items-center gap-1.5 flex-1 min-w-0">
          <BirdAvatar photoUrl={male?.photo_url} speciesEmoji={mSp?.emoji} size="md" />
          <Badge variant="male" className="text-[10px]">♂ Macho</Badge>
          <p className="font-mono text-[11px] font-bold text-primary-700 truncate w-full text-center">
            {male?.ring_number ?? '—'}
          </p>
          <p className="text-[11px] text-muted truncate w-full text-center">
            {mSp?.common_name ?? '—'}
          </p>
          {male?.mutation && (
            <p className="text-[10px] text-muted-light truncate w-full text-center">{male.mutation}</p>
          )}
        </div>

        {/* Heart */}
        <div className="flex flex-col items-center gap-1 flex-shrink-0">
          <Heart size={20} className="text-pink-400 fill-pink-400" />
          {activeClutch && (
            <Badge variant={CLUTCH_VARIANT[activeClutch.status] as any} className="text-[9px] px-1.5">
              {CLUTCH_LABEL[activeClutch.status]}
            </Badge>
          )}
        </div>

        {/* Fêmea */}
        <div className="flex flex-col items-center gap-1.5 flex-1 min-w-0">
          <BirdAvatar photoUrl={female?.photo_url} speciesEmoji={fSp?.emoji} size="md" />
          <Badge variant="female" className="text-[10px]">♀ Fêmea</Badge>
          <p className="font-mono text-[11px] font-bold text-primary-700 truncate w-full text-center">
            {female?.ring_number ?? '—'}
          </p>
          <p className="text-[11px] text-muted truncate w-full text-center">
            {fSp?.common_name ?? '—'}
          </p>
          {female?.mutation && (
            <p className="text-[10px] text-muted-light truncate w-full text-center">{female.mutation}</p>
          )}
        </div>
      </div>

      {/* Footer stats */}
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-border bg-surface text-xs text-muted">
        <span className="flex items-center gap-1">
          <Calendar size={11} />
          {pair.formed_at ? formatDate(pair.formed_at) : 'Data não informada'}
        </span>
        <span className="flex items-center gap-2">
          <span className="flex items-center gap-1">
            <Egg size={11} /> {totalClutches} ninhada{totalClutches !== 1 ? 's' : ''}
          </span>
          {totalHatched > 0 && (
            <span className="text-primary-600 font-semibold">· {totalHatched} filhote{totalHatched !== 1 ? 's' : ''}</span>
          )}
        </span>
      </div>
    </Link>
  )
}
