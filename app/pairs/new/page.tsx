import { Header }   from '@/components/layout/Header'
import { PairForm } from '@/components/pairs/PairForm'
import { Card, CardBody } from '@/components/ui/card'
import { getBirds } from '@/lib/queries/birds'

export const metadata = { title: 'Novo Casal' }

export default async function NewPairPage() {
  const allBirds = await getBirds()
  const males    = allBirds.filter(b => b.sex === 'M' && b.status === 'plantel')
  const females  = allBirds.filter(b => b.sex === 'F' && b.status === 'plantel')

  return (
    <div className="flex flex-col flex-1">
      <Header title="Novo Casal" />
      <main className="flex-1 p-4 lg:p-6 max-w-2xl mx-auto w-full animate-fade-in">
        <Card>
          <CardBody>
            <PairForm males={males} females={females} />
          </CardBody>
        </Card>
      </main>
    </div>
  )
}
