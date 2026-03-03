import { Header }   from '@/components/layout/Header'
import { BirdGrid } from '@/components/birds/BirdGrid'
import { Button }   from '@/components/ui/button'
import { getBirds }   from '@/lib/queries/birds'
import { getSpecies } from '@/lib/queries/species'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export const metadata = { title: 'Plantel' }

async function getData() {
  const [birds, species] = await Promise.all([getBirds(), getSpecies()])
  return { birds, species }
}

export default async function BirdsPage() {
  const { birds, species } = await getData()

  return (
    <div className="flex flex-col flex-1">
      <Header
        title="Plantel"
        actions={
          <Link href="/birds/new">
            <Button size="sm">
              <Plus size={15} /> Nova Ave
            </Button>
          </Link>
        }
      />
      <main className="flex-1 p-4 lg:p-6 animate-fade-in">
        <BirdGrid birds={birds} species={species} />
      </main>
    </div>
  )
}
