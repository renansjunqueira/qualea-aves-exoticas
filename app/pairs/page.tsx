import { Header }   from '@/components/layout/Header'
import { PairList } from '@/components/pairs/PairList'
import { Button }   from '@/components/ui/button'
import { getPairs }    from '@/lib/queries/pairs'
import { getClutches } from '@/lib/queries/clutches'
import { getSpecies }  from '@/lib/queries/species'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export const metadata = { title: 'Casais' }

export default async function PairsPage() {
  const [pairs, clutches, species] = await Promise.all([
    getPairs(), getClutches(), getSpecies(),
  ])

  return (
    <div className="flex flex-col flex-1">
      <Header
        title="Casais"
        actions={
          <Link href="/pairs/new">
            <Button size="sm"><Plus size={15} />Novo Casal</Button>
          </Link>
        }
      />
      <main className="flex-1 p-4 lg:p-6 animate-fade-in">
        <PairList pairs={pairs} clutches={clutches} species={species} />
      </main>
    </div>
  )
}
