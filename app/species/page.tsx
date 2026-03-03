import Link from 'next/link'
import { Header }  from '@/components/layout/Header'
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/card'
import { Badge }   from '@/components/ui/badge'
import { Button }  from '@/components/ui/button'
import { getSpecies } from '@/lib/queries/species'
import { getBirds }   from '@/lib/queries/birds'
import { Plus, Bird, Pencil } from 'lucide-react'

export const metadata = { title: 'Espécies' }

export default async function SpeciesPage() {
  const [species, birds] = await Promise.all([getSpecies(), getBirds()])

  const speciesWithCount = species.map(sp => ({
    ...sp,
    count:   birds.filter(b => b.species_id === sp.id).length,
    males:   birds.filter(b => b.species_id === sp.id && b.sex === 'M').length,
    females: birds.filter(b => b.species_id === sp.id && b.sex === 'F').length,
  })).sort((a, b) => b.count - a.count)

  return (
    <div className="flex flex-col flex-1">
      <Header
        title="Espécies"
        actions={
          <Button size="sm"><Plus size={15} /> Nova Espécie</Button>
        }
      />
      <main className="flex-1 p-4 lg:p-6 space-y-4 animate-fade-in">

        {/* Grid de cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {speciesWithCount.map(sp => (
            <Card key={sp.id} className="overflow-hidden">
              {/* Cor de topo */}
              <div className="h-1.5 w-full bg-gradient-to-r from-primary-600 to-primary-400" />
              <CardBody>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-[var(--radius-md)] bg-primary-50 border border-primary-200 flex items-center justify-center text-3xl flex-shrink-0">
                      {sp.emoji}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-gray-900 truncate">{sp.common_name}</p>
                      <p className="text-xs text-muted italic truncate">{sp.sci_name}</p>
                    </div>
                  </div>
                  <button className="text-muted hover:text-primary-700 transition-colors flex-shrink-0">
                    <Pencil size={14} />
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex gap-2">
                    <Badge variant="male">♂ {sp.males}</Badge>
                    <Badge variant="female">♀ {sp.females}</Badge>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-primary-700">
                    <Bird size={14} />
                    {sp.count} ave{sp.count !== 1 ? 's' : ''}
                  </div>
                </div>

                <div className="mt-3 h-1.5 rounded-full bg-primary-50 overflow-hidden">
                  <div className="h-full rounded-full bg-primary-500 transition-all duration-700"
                    style={{ width: `${Math.max(4, Math.round((sp.count / Math.max(...speciesWithCount.map(s => s.count), 1)) * 100))}%` }} />
                </div>

                <Link href={`/birds?species=${sp.id}`}
                  className="mt-3 flex items-center justify-center w-full text-xs text-primary-600 hover:text-primary-800 font-medium py-1.5 rounded-[var(--radius-sm)] hover:bg-primary-50 transition-colors">
                  Ver aves desta espécie →
                </Link>
              </CardBody>
            </Card>
          ))}

          {/* Card de adicionar */}
          <button className="group flex flex-col items-center justify-center gap-3 bg-card rounded-[var(--radius-lg)] border-2 border-dashed border-border hover:border-primary-400 p-8 text-muted hover:text-primary-700 transition-all">
            <Plus size={28} strokeWidth={1.5} />
            <span className="text-sm font-medium">Adicionar espécie</span>
          </button>
        </div>

        {/* Tabela completa */}
        <Card>
          <CardHeader><CardTitle>Todas as Espécies</CardTitle></CardHeader>
          <CardBody className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary-50/50 border-b border-border">
                    <th className="text-left text-xs font-semibold text-muted px-5 py-3">Espécie</th>
                    <th className="text-left text-xs font-semibold text-muted px-3 py-3 hidden sm:table-cell">Nome Científico</th>
                    <th className="text-center text-xs font-semibold text-muted px-3 py-3">Machos</th>
                    <th className="text-center text-xs font-semibold text-muted px-3 py-3">Fêmeas</th>
                    <th className="text-center text-xs font-semibold text-muted px-3 py-3">Total</th>
                    <th className="w-10" />
                  </tr>
                </thead>
                <tbody>
                  {speciesWithCount.map(sp => (
                    <tr key={sp.id} className="border-b border-border last:border-0 hover:bg-primary-50/30 transition-colors">
                      <td className="px-5 py-3">
                        <span className="flex items-center gap-2 font-semibold text-gray-800">
                          <span className="text-xl">{sp.emoji}</span>
                          {sp.common_name}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-muted italic hidden sm:table-cell">{sp.sci_name}</td>
                      <td className="px-3 py-3 text-center"><Badge variant="male">{sp.males}</Badge></td>
                      <td className="px-3 py-3 text-center"><Badge variant="female">{sp.females}</Badge></td>
                      <td className="px-3 py-3 text-center">
                        <span className="font-bold text-primary-700">{sp.count}</span>
                      </td>
                      <td className="px-3 py-3">
                        <button className="text-muted hover:text-primary-700 transition-colors">
                          <Pencil size={13} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>

      </main>
    </div>
  )
}
