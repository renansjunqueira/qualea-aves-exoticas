import { Header }     from '@/components/layout/Header'
import { ClutchList } from '@/components/clutches/ClutchList'
import { Button }     from '@/components/ui/button'
import { getClutches } from '@/lib/queries/clutches'
import { getSpecies }  from '@/lib/queries/species'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export const metadata = { title: 'Ninhadas' }

export default async function ClutchesPage() {
  const [clutches, species] = await Promise.all([getClutches(), getSpecies()])

  return (
    <div className="flex flex-col flex-1">
      <Header
        title="Ninhadas"
        actions={
          <Link href="/clutches/new">
            <Button size="sm"><Plus size={15} /> Nova Ninhada</Button>
          </Link>
        }
      />
      <main className="flex-1 p-4 lg:p-6 animate-fade-in">
        <ClutchList clutches={clutches} species={species} />
      </main>
    </div>
  )
}
