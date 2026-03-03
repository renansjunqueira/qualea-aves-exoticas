import { notFound }  from 'next/navigation'
import { Header }    from '@/components/layout/Header'
import { BirdForm }  from '@/components/birds/BirdForm'
import { Card, CardBody } from '@/components/ui/card'
import { getBirdById, getBirds } from '@/lib/queries/birds'
import { getSpecies } from '@/lib/queries/species'

export const metadata = { title: 'Editar Ave' }

export default async function EditBirdPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [bird, species, allBirds] = await Promise.all([getBirdById(id), getSpecies(), getBirds()])

  if (!bird) notFound()

  return (
    <div className="flex flex-col flex-1">
      <Header title={`Editar — ${bird.ring_number}`} />
      <main className="flex-1 p-4 lg:p-6 max-w-2xl mx-auto w-full animate-fade-in">
        <Card>
          <CardBody>
            <BirdForm bird={bird} species={species} allBirds={allBirds} />
          </CardBody>
        </Card>
      </main>
    </div>
  )
}
