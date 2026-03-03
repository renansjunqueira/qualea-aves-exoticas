import { Header }      from '@/components/layout/Header'
import { ClutchForm }  from '@/components/clutches/ClutchForm'
import { Card, CardBody } from '@/components/ui/card'
import { getPairs } from '@/lib/queries/pairs'

export const metadata = { title: 'Nova Ninhada' }

export default async function NewClutchPage({
  searchParams,
}: {
  searchParams: Promise<{ pair?: string }>
}) {
  const { pair: defaultPairId } = await searchParams
  const pairs = await getPairs()

  return (
    <div className="flex flex-col flex-1">
      <Header title="Nova Ninhada" />
      <main className="flex-1 p-4 lg:p-6 max-w-2xl mx-auto w-full animate-fade-in">
        <Card>
          <CardBody>
            <ClutchForm pairs={pairs} defaultPairId={defaultPairId} />
          </CardBody>
        </Card>
      </main>
    </div>
  )
}
