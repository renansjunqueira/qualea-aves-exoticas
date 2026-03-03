'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { Bird, Species } from '@/types'
import { BirdCard } from '@/components/birds/BirdCard'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { useDebounce } from '@/hooks/useDebounce'
import { formatDate, calcAge } from '@/lib/utils'
import { Search, LayoutGrid, List, Plus, Bird as BirdIcon, SlidersHorizontal } from 'lucide-react'

type ViewMode = 'grid' | 'table'

const SEX_VARIANT  = { M: 'male', F: 'female', U: 'unknown' } as const
const SEX_LABEL    = { M: '♂ Macho', F: '♀ Fêmea', U: 'DNA' }
const STATUS_VARIANT = { plantel: 'plantel', filhote: 'filhote', vendido: 'vendido', obito: 'obito' } as const
const STATUS_LABEL = { plantel: 'Plantel', filhote: 'Filhote', vendido: 'Vendido', obito: 'Óbito' }

interface Props {
  birds: Bird[]
  species: Species[]
}

export function BirdGrid({ birds, species }: Props) {
  const [query,     setQuery]     = useState('')
  const [sexFilter, setSexFilter] = useState('')
  const [spFilter,  setSpFilter]  = useState('')
  const [stFilter,  setStFilter]  = useState('')
  const [view,      setView]      = useState<ViewMode>('grid')

  const debouncedQuery = useDebounce(query, 250)

  const filtered = useMemo(() => {
    const q = debouncedQuery.toLowerCase()
    return birds.filter(b => {
      const sp   = b.species
      const text = `${b.ring_number} ${sp?.common_name ?? ''} ${sp?.sci_name ?? ''} ${b.mutation ?? ''}`.toLowerCase()
      return (
        (!q          || text.includes(q)) &&
        (!sexFilter  || b.sex === sexFilter) &&
        (!spFilter   || b.species_id === spFilter) &&
        (!stFilter   || b.status === stFilter)
      )
    })
  }, [birds, debouncedQuery, sexFilter, spFilter, stFilter])

  const hasFilters = !!query || !!sexFilter || !!spFilter || !!stFilter

  function clearFilters() {
    setQuery(''); setSexFilter(''); setSpFilter(''); setStFilter('')
  }

  return (
    <div className="space-y-4">

      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
          <Input
            className="pl-9"
            placeholder="Buscar por anilha, espécie, mutação…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>

        {/* Filters row */}
        <div className="flex items-center gap-2 flex-wrap">
          <Select value={spFilter} onChange={e => setSpFilter(e.target.value)} className="w-40">
            <option value="">Todas espécies</option>
            {species.map(s => <option key={s.id} value={s.id}>{s.emoji} {s.common_name}</option>)}
          </Select>

          <Select value={sexFilter} onChange={e => setSexFilter(e.target.value)} className="w-32">
            <option value="">Todos sexos</option>
            <option value="M">♂ Macho</option>
            <option value="F">♀ Fêmea</option>
            <option value="U">DNA</option>
          </Select>

          <Select value={stFilter} onChange={e => setStFilter(e.target.value)} className="w-32">
            <option value="">Todos status</option>
            <option value="plantel">Plantel</option>
            <option value="filhote">Filhote</option>
            <option value="vendido">Vendido</option>
            <option value="obito">Óbito</option>
          </Select>

          {/* View toggle */}
          <div className="flex border border-border rounded-[var(--radius-md)] overflow-hidden">
            <button
              onClick={() => setView('grid')}
              className={`p-2 transition-colors ${view === 'grid' ? 'bg-primary-700 text-white' : 'text-muted hover:bg-surface'}`}
              title="Grade"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setView('table')}
              className={`p-2 transition-colors ${view === 'table' ? 'bg-primary-700 text-white' : 'text-muted hover:bg-surface'}`}
              title="Tabela"
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Results info */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted">
          {filtered.length === birds.length
            ? `${birds.length} ave${birds.length !== 1 ? 's' : ''} no plantel`
            : `${filtered.length} resultado${filtered.length !== 1 ? 's' : ''} de ${birds.length}`}
        </p>
        {hasFilters && (
          <button onClick={clearFilters} className="text-xs text-primary-600 hover:underline font-medium">
            Limpar filtros
          </button>
        )}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center gap-3 py-16 text-muted">
          <BirdIcon size={44} strokeWidth={1} className="text-border" />
          <div className="text-center">
            <p className="font-semibold text-gray-700">Nenhuma ave encontrada</p>
            <p className="text-sm mt-1">
              {hasFilters ? 'Tente ajustar os filtros.' : 'Comece cadastrando a primeira ave do plantel.'}
            </p>
          </div>
          {!hasFilters && (
            <Link href="/birds/new">
              <Button size="sm"><Plus size={14} />Nova Ave</Button>
            </Link>
          )}
        </div>
      )}

      {/* Grid view */}
      {filtered.length > 0 && view === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(b => <BirdCard key={b.id} bird={b} />)}
        </div>
      )}

      {/* Table view */}
      {filtered.length > 0 && view === 'table' && (
        <div className="bg-card rounded-[var(--radius-lg)] border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary-50/60 border-b border-border">
                  <th className="text-left text-xs font-semibold text-muted px-4 py-3">Anilha</th>
                  <th className="text-left text-xs font-semibold text-muted px-3 py-3">Espécie</th>
                  <th className="text-left text-xs font-semibold text-muted px-3 py-3 hidden sm:table-cell">Mutação</th>
                  <th className="text-left text-xs font-semibold text-muted px-3 py-3">Sexo</th>
                  <th className="text-left text-xs font-semibold text-muted px-3 py-3 hidden md:table-cell">Nascimento</th>
                  <th className="text-left text-xs font-semibold text-muted px-3 py-3">Status</th>
                  <th className="w-10" />
                </tr>
              </thead>
              <tbody>
                {filtered.map(b => (
                  <tr key={b.id} className="border-b border-border last:border-0 hover:bg-primary-50/40 transition-colors">
                    <td className="px-4 py-3">
                      <Link href={`/birds/${b.id}`} className="font-mono text-xs font-bold text-primary-700 hover:underline">
                        {b.ring_number}
                      </Link>
                    </td>
                    <td className="px-3 py-3">
                      <span className="flex items-center gap-1.5 text-gray-700">
                        <span>{b.species?.emoji}</span>
                        <span className="hidden lg:inline">{b.species?.common_name}</span>
                      </span>
                    </td>
                    <td className="px-3 py-3 text-gray-600 hidden sm:table-cell">{b.mutation ?? '—'}</td>
                    <td className="px-3 py-3">
                      <Badge variant={SEX_VARIANT[b.sex] as any}>{SEX_LABEL[b.sex]}</Badge>
                    </td>
                    <td className="px-3 py-3 text-gray-600 hidden md:table-cell">
                      {b.birth_date ? (
                        <span>{formatDate(b.birth_date)} <span className="text-muted">({calcAge(b.birth_date)})</span></span>
                      ) : '—'}
                    </td>
                    <td className="px-3 py-3">
                      <Badge variant={STATUS_VARIANT[b.status] as any}>{STATUS_LABEL[b.status]}</Badge>
                    </td>
                    <td className="px-2 py-3">
                      <Link href={`/birds/${b.id}`} className="text-xs text-primary-600 hover:underline font-medium">Ver</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
