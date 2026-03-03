'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { Pair, Clutch, Species } from '@/types'
import { PairCard } from '@/components/pairs/PairCard'
import { Input }    from '@/components/ui/input'
import { Select }   from '@/components/ui/select'
import { Button }   from '@/components/ui/button'
import { useDebounce } from '@/hooks/useDebounce'
import { Search, Plus, Heart } from 'lucide-react'

interface Props {
  pairs:    Pair[]
  clutches: Clutch[]
  species:  Species[]
}

export function PairList({ pairs, clutches, species }: Props) {
  const [query,    setQuery]    = useState('')
  const [spFilter, setSpFilter] = useState('')

  const debouncedQuery = useDebounce(query, 250)

  const filtered = useMemo(() => {
    const q = debouncedQuery.toLowerCase()
    return pairs.filter(p => {
      const text = [
        p.male?.ring_number, p.female?.ring_number,
        p.male?.species?.common_name, p.female?.species?.common_name,
        p.male?.mutation, p.female?.mutation,
        p.aviary_number, p.notes,
      ].join(' ').toLowerCase()
      return (
        (!q || text.includes(q)) &&
        (!spFilter || p.male?.species_id === spFilter || p.female?.species_id === spFilter)
      )
    })
  }, [pairs, debouncedQuery, spFilter])

  const hasFilters = !!query || !!spFilter

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
          <Input className="pl-9" placeholder="Buscar por anilha, espécie, viveiro…"
            value={query} onChange={e => setQuery(e.target.value)} />
        </div>
        <Select value={spFilter} onChange={e => setSpFilter(e.target.value)} className="w-44">
          <option value="">Todas as espécies</option>
          {species.map(s => <option key={s.id} value={s.id}>{s.emoji} {s.common_name}</option>)}
        </Select>
      </div>

      {/* Results info */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted">
          {filtered.length === pairs.length
            ? `${pairs.length} casal${pairs.length !== 1 ? 'is' : ''}`
            : `${filtered.length} de ${pairs.length} casais`}
        </p>
        {hasFilters && (
          <button onClick={() => { setQuery(''); setSpFilter('') }}
            className="text-xs text-primary-600 hover:underline font-medium">
            Limpar filtros
          </button>
        )}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center gap-3 py-16 text-muted">
          <Heart size={44} strokeWidth={1} className="text-border" />
          <div className="text-center">
            <p className="font-semibold text-gray-700">Nenhum casal encontrado</p>
            <p className="text-sm mt-1">
              {hasFilters ? 'Tente ajustar os filtros.' : 'Comece formando o primeiro casal.'}
            </p>
          </div>
          {!hasFilters && (
            <Link href="/pairs/new">
              <Button size="sm"><Plus size={14} />Novo Casal</Button>
            </Link>
          )}
        </div>
      )}

      {/* Grid */}
      {filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(p => <PairCard key={p.id} pair={p} clutches={clutches} />)}
        </div>
      )}
    </div>
  )
}
