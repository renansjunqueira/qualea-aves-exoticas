import { Header }            from '@/components/layout/Header'
import { StatCard }           from '@/components/dashboard/StatCard'
import { SpeciesChart }       from '@/components/dashboard/SpeciesChart'
import { RecentBirdsTable }   from '@/components/dashboard/RecentBirdsTable'
import { ActiveClutchCard }   from '@/components/dashboard/ActiveClutchCard'
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/card'
import { Button }             from '@/components/ui/button'
import { getBirds }          from '@/lib/queries/birds'
import { getPairs }          from '@/lib/queries/pairs'
import { getClutches }       from '@/lib/queries/clutches'
import { getSpecies }        from '@/lib/queries/species'
import { Bird, Heart, Egg, BookOpen, Plus, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata = { title: 'Dashboard' }

async function getDashboardData() {
  const [birds, pairs, clutches, speciesList] = await Promise.all([
    getBirds(), getPairs(), getClutches(), getSpecies(),
  ])

  const speciesCount = speciesList.map(sp => ({
    name:  sp.common_name,
    emoji: sp.emoji,
    count: birds.filter(b => b.species_id === sp.id).length,
  })).sort((a, b) => b.count - a.count)

  return {
    stats: {
      totalBirds:     birds.length,
      activePairs:    pairs.filter(p => p.active).length,
      activeClutches: clutches.filter(c => c.status === 'incubating' || c.status === 'weaning').length,
      chicksSeason:   clutches.reduce((s, c) => s + c.hatched, 0),
      speciesCount:   speciesList.length,
    },
    birds:    birds.slice(0, 6),
    clutches: clutches.filter(c => c.status === 'incubating' || c.status === 'weaning').slice(0, 5),
    species:  speciesCount,
  }
}

export default async function DashboardPage() {
  const { stats, birds, clutches, species } = await getDashboardData()

  return (
    <div className="flex flex-col flex-1">
      <Header
        title="Dashboard"
        actions={
          <Link href="/birds/new">
            <Button size="sm">
              <Plus size={15} />
              Nova Ave
            </Button>
          </Link>
        }
      />

      <main className="flex-1 p-4 lg:p-6 space-y-6 animate-fade-in">

        {/* Boas-vindas */}
        <div className="flex items-center gap-3 p-4 rounded-[var(--radius-lg)] border border-primary-200"
          style={{ background: 'linear-gradient(135deg, #f0faf4 0%, #d9f2e4 100%)' }}>
          <div className="text-3xl">🦜</div>
          <div>
            <h2 className="font-bold text-primary-900 text-base">Bem-vindo, Helinho!</h2>
            <p className="text-sm text-primary-700">
              Seu plantel tem <strong>{stats.totalBirds} aves</strong> e{' '}
              <strong>{stats.activeClutches} ninhadas</strong> ativas hoje.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          <StatCard
            title="Aves no Plantel"
            value={stats.totalBirds}
            icon={Bird}
            trend="+3 este mês"
            trendUp
            color="green"
          />
          <StatCard
            title="Casais Formados"
            value={stats.activePairs}
            icon={Heart}
            color="purple"
          />
          <StatCard
            title="Ninhadas Ativas"
            value={stats.activeClutches}
            icon={Egg}
            color="amber"
          />
          <StatCard
            title="Filhotes na Temporada"
            value={stats.chicksSeason}
            icon={Bird}
            trend="+5 vs ano ant."
            trendUp
            color="blue"
          />
        </div>

        {/* Middle row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Ninhadas ativas */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Ninhadas Ativas</CardTitle>
              <Link href="/clutches" className="text-xs text-primary-600 hover:underline flex items-center gap-1 font-medium">
                Ver todas <ArrowRight size={12} />
              </Link>
            </CardHeader>
            <CardBody>
              <ActiveClutchCard clutches={clutches} />
            </CardBody>
          </Card>

          {/* Espécies */}
          <Card>
            <CardHeader>
              <CardTitle>Aves por Espécie</CardTitle>
              <Link href="/species" className="text-xs text-primary-600 hover:underline flex items-center gap-1 font-medium">
                <BookOpen size={12} /> Gerenciar
              </Link>
            </CardHeader>
            <CardBody>
              <SpeciesChart data={species} />
            </CardBody>
          </Card>
        </div>

        {/* Plantel recente */}
        <Card>
          <CardHeader>
            <CardTitle>Últimas Aves Cadastradas</CardTitle>
            <Link href="/birds" className="text-xs text-primary-600 hover:underline flex items-center gap-1 font-medium">
              Ver plantel completo <ArrowRight size={12} />
            </Link>
          </CardHeader>
          <CardBody className="p-0 pb-1">
            <RecentBirdsTable birds={birds} />
          </CardBody>
        </Card>

      </main>
    </div>
  )
}
