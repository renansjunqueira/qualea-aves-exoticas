import { Header }    from '@/components/layout/Header'
import { BirdForm }  from '@/components/birds/BirdForm'
import { Card, CardBody } from '@/components/ui/card'
import { getBirds }   from '@/lib/queries/birds'
import { getSpecies } from '@/lib/queries/species'

export const metadata = { title: 'Nova Ave' }

export default async function NewBirdPage() {
  const [species, allBirds] = await Promise.all([getSpecies(), getBirds()])

  return (
    <div className="flex flex-col flex-1">
      <Header title="Nova Ave" />
      <main className="flex-1 p-4 lg:p-6 max-w-2xl mx-auto w-full animate-fade-in">
        <Card>
          <CardBody>
            <BirdForm species={species} allBirds={allBirds} />
          </CardBody>
        </Card>
      </main>
    </div>
  )
}
