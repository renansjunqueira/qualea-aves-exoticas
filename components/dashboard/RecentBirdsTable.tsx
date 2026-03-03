import Link from 'next/link'
import type { Bird } from '@/types'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'

interface Props {
  birds: Bird[]
}

const SEX_VARIANT: Record<string, 'male' | 'female' | 'unknown'> = {
  M: 'male', F: 'female', U: 'unknown',
}
const SEX_LABEL = { M: '♂ Macho', F: '♀ Fêmea', U: 'DNA' }
const STATUS_VARIANT: Record<string, 'plantel' | 'filhote' | 'vendido' | 'obito'> = {
  plantel: 'plantel', filhote: 'filhote', vendido: 'vendido', obito: 'obito',
}
const STATUS_LABEL = { plantel: 'Plantel', filhote: 'Filhote', vendido: 'Vendido', obito: 'Óbito' }

export function RecentBirdsTable({ birds }: Props) {
  if (!birds.length) {
    return <p className="text-sm text-muted text-center py-6">Nenhuma ave cadastrada.</p>
  }

  return (
    <div className="overflow-x-auto -mx-5">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-primary-50/50">
            <th className="text-left text-xs font-semibold text-muted px-5 py-2.5">Anilha</th>
            <th className="text-left text-xs font-semibold text-muted px-3 py-2.5 hidden sm:table-cell">Espécie</th>
            <th className="text-left text-xs font-semibold text-muted px-3 py-2.5">Sexo</th>
            <th className="text-left text-xs font-semibold text-muted px-3 py-2.5 hidden md:table-cell">Mutação</th>
            <th className="text-left text-xs font-semibold text-muted px-3 py-2.5">Status</th>
          </tr>
        </thead>
        <tbody>
          {birds.map(bird => (
            <tr key={bird.id} className="border-b border-border last:border-0 hover:bg-primary-50/40 transition-colors">
              <td className="px-5 py-3">
                <Link href={`/birds/${bird.id}`} className="font-mono text-primary-700 font-semibold hover:underline text-xs">
                  {bird.ring_number}
                </Link>
              </td>
              <td className="px-3 py-3 hidden sm:table-cell">
                <span className="flex items-center gap-1.5">
                  <span>{bird.species?.emoji}</span>
                  <span className="text-gray-700">{bird.species?.common_name ?? '—'}</span>
                </span>
              </td>
              <td className="px-3 py-3">
                <Badge variant={SEX_VARIANT[bird.sex] ?? 'unknown'}>
                  {SEX_LABEL[bird.sex]}
                </Badge>
              </td>
              <td className="px-3 py-3 text-gray-600 hidden md:table-cell">
                {bird.mutation ?? '—'}
              </td>
              <td className="px-3 py-3">
                <Badge variant={STATUS_VARIANT[bird.status] ?? 'plantel'}>
                  {STATUS_LABEL[bird.status]}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
