'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { Clutch, Species } from '@/types'
import { Badge }   from '@/components/ui/badge'
import { Select }  from '@/components/ui/select'
import { Button }  from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import { Egg, Plus, ArrowRight } from 'lucide-react'

const STATUS_VARIANT = {
  incubating: 'incubating', hatched: 'hatched', lost: 'lost', weaning: 'weaning',
} as const
const STATUS_LABEL = { incubating: 'Incubando', hatched: 'Nascidos', lost: 'Perdida', weaning: 'Desmame' }

function EggBar({ total, hatched, infertile }: { total: number; hatched: number; infertile: number }) {
  if (total === 0) return <span className="text-xs text-muted">Sem ovos registrados</span>
  const remaining = total - hatched - infertile
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1 flex-wrap">
        {Array.from({ length: Math.min(hatched,   12) }).map((_, i) => (
          <span key={`h${i}`} className="text-sm">🐣</span>
        ))}
        {Array.from({ length: Math.min(remaining, 12) }).map((_, i) => (
          <span key={`r${i}`} className="text-sm">🥚</span>
        ))}
        {Array.from({ length: Math.min(infertile, 12) }).map((_, i) => (
          <span key={`i${i}`} className="text-sm opacity-40">❌</span>
        ))}
        {total > 12 && <span className="text-xs text-muted">+{total - 12}</span>}
      </div>
    </div>
  )
}

interface Props { clutches: Clutch[]; species: Species[] }

export function ClutchList({ clutches, species }: Props) {
  const [statusFilter, setStatusFilter] = useState('')
  const [spFilter,     setSpFilter]     = useState('')

  const filtered = useMemo(() => clutches.filter(c => {
    const sp = c.pair?.male?.species
    return (
      (!statusFilter || c.status === statusFilter) &&
      (!spFilter     || sp?.id === spFilter)
    )
  }), [clutches, statusFilter, spFilter])

  const hasFilters = !!statusFilter || !!spFilter

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="w-44">
          <option value="">Todos os status</option>
          <option value="incubating">🔥 Incubando</option>
          <option value="hatched">🐣 Nascidos</option>
          <option value="weaning">🌱 Desmame</option>
          <option value="lost">❌ Perdida</option>
        </Select>
        <Select value={spFilter} onChange={e => setSpFilter(e.target.value)} className="w-44">
          <option value="">Todas as espécies</option>
          {species.map(s => <option key={s.id} value={s.id}>{s.emoji} {s.common_name}</option>)}
        </Select>
        {hasFilters && (
          <button onClick={() => { setStatusFilter(''); setSpFilter('') }}
            className="text-xs text-primary-600 hover:underline font-medium self-center">
            Limpar filtros
          </button>
        )}
      </div>

      {/* Stats rápidas */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total',       value: clutches.length,                                    color: 'text-gray-700 bg-gray-50' },
          { label: 'Incubando',   value: clutches.filter(c=>c.status==='incubating').length,  color: 'text-amber-700 bg-amber-50' },
          { label: 'Desmame',     value: clutches.filter(c=>c.status==='weaning').length,     color: 'text-purple-700 bg-purple-50' },
          { label: 'Filhotes',    value: clutches.reduce((s,c)=>s+c.hatched,0),              color: 'text-primary-700 bg-primary-50' },
        ].map(({ label, value, color }) => (
          <div key={label} className={`rounded-[var(--radius-md)] p-3 text-center ${color} border border-current/10`}>
            <p className="text-xl font-bold">{value}</p>
            <p className="text-[11px] font-medium">{label}</p>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center gap-3 py-16 text-muted">
          <Egg size={44} strokeWidth={1} className="text-border" />
          <div className="text-center">
            <p className="font-semibold text-gray-700">Nenhuma ninhada encontrada</p>
            <p className="text-sm mt-1">
              {hasFilters ? 'Tente outros filtros.' : 'Registre a primeira ninhada de um casal.'}
            </p>
          </div>
          {!hasFilters && (
            <Link href="/clutches/new">
              <Button size="sm"><Plus size={14} /> Nova Ninhada</Button>
            </Link>
          )}
        </div>
      )}

      {/* Lista */}
      {filtered.length > 0 && (
        <div className="space-y-3">
          {filtered.map(c => {
            const pair   = c.pair
            const mSp    = pair?.male?.species
            const totalR = c.total_eggs - c.hatched - c.infertile

            return (
              <Link key={c.id} href={`/clutches/${c.id}`}
                className="group flex items-center gap-4 bg-card rounded-[var(--radius-lg)] border border-border shadow-sm p-4 hover:shadow-md hover:border-primary-300 transition-all">

                {/* Espécie emoji */}
                <div className="w-11 h-11 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-2xl flex-shrink-0">
                  {mSp?.emoji ?? '🥚'}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <Badge variant={STATUS_VARIANT[c.status] as any}>{STATUS_LABEL[c.status]}</Badge>
                    {pair?.aviary_number && (
                      <span className="text-[11px] font-semibold text-primary-700 bg-primary-50 px-2 py-0.5 rounded-full border border-primary-200">
                        Viveiro {pair.aviary_number}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {mSp?.common_name ?? '—'} ·{' '}
                    <span className="font-mono text-xs text-primary-700">
                      {pair?.male?.ring_number ?? '?'} × {pair?.female?.ring_number ?? '?'}
                    </span>
                  </p>
                  <div className="mt-1.5">
                    <EggBar total={c.total_eggs} hatched={c.hatched} infertile={c.infertile} />
                  </div>
                </div>

                {/* Right side */}
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  {c.first_egg_date && (
                    <span className="text-[11px] text-muted">{formatDate(c.first_egg_date)}</span>
                  )}
                  <span className="text-xs font-semibold text-gray-700">
                    {c.total_eggs} ovo{c.total_eggs !== 1 ? 's' : ''} · {c.hatched} 🐣
                  </span>
                  <ArrowRight size={14} className="text-muted group-hover:text-primary-600 transition-colors" />
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
