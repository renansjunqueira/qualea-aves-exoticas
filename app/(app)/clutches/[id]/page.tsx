import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Header }   from '@/components/layout/Header'
import { Badge }    from '@/components/ui/badge'
import { Button }   from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/card'
import { BirdAvatar } from '@/components/birds/BirdAvatar'
import { formatDate } from '@/lib/utils'
import { getClutchById } from '@/lib/queries/clutches'
import {
  ArrowLeft, Pencil, Egg, Home, Calendar,
  CheckCircle2, XCircle, Clock, Heart,
} from 'lucide-react'

const STATUS_VARIANT = {
  incubating: 'incubating', hatched: 'hatched', lost: 'lost', weaning: 'weaning',
} as const
const STATUS_LABEL = { incubating: 'Incubando', hatched: 'Filhotes Nascidos', lost: 'Ninhada Perdida', weaning: 'Em Desmame' }

function expectedHatch(firstEggDate: string | null): string | null {
  if (!firstEggDate) return null
  const d = new Date(firstEggDate + 'T00:00:00')
  d.setDate(d.getDate() + 25)
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function daysUntil(dateStr: string | null): number | null {
  if (!dateStr) return null
  const target = new Date(dateStr + 'T00:00:00')
  const now    = new Date()
  now.setHours(0,0,0,0)
  return Math.ceil((target.getTime() - now.getTime()) / 86400000)
}

export default async function ClutchDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const clutch = await getClutchById(id)
  if (!clutch) notFound()

  const pair   = clutch.pair
  const male   = pair?.male
  const female = pair?.female
  const mSp    = male?.species
  const fSp    = female?.species

  const remaining = clutch.total_eggs - clutch.hatched - clutch.infertile
  const hatchDate = expectedHatch(clutch.first_egg_date)
  const daysLeft  = clutch.status === 'incubating' ? daysUntil(hatchDate ? hatchDate.split('/').reverse().join('-') : null) : null

  return (
    <div className="flex flex-col flex-1">
      <Header
        title="Ninhada"
        actions={
          <Button size="sm" variant="secondary"><Pencil size={14} /> Editar</Button>
        }
      />

      <main className="flex-1 p-4 lg:p-6 space-y-5 max-w-2xl mx-auto w-full animate-fade-in">

        <Link href="/clutches" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary-700 font-medium transition-colors">
          <ArrowLeft size={15} /> Ninhadas
        </Link>

        {/* Status hero */}
        <Card className="overflow-hidden">
          <div className="h-2 w-full" style={{
            background: clutch.status === 'incubating' ? 'linear-gradient(90deg,#f59e0b,#fbbf24)'
              : clutch.status === 'hatched'   ? 'linear-gradient(90deg,#2d9165,#74c69d)'
              : clutch.status === 'weaning'   ? 'linear-gradient(90deg,#7c3aed,#a78bfa)'
              : 'linear-gradient(90deg,#ef4444,#fca5a5)'
          }} />
          <CardBody>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <Badge variant={STATUS_VARIANT[clutch.status] as any} className="text-sm px-3 py-1 mb-2">
                  {STATUS_LABEL[clutch.status]}
                </Badge>
                <p className="text-2xl font-bold text-gray-900">
                  {mSp?.emoji} {mSp?.common_name ?? '—'}
                </p>
                {pair?.aviary_number && (
                  <p className="flex items-center gap-1.5 text-sm text-muted mt-1">
                    <Home size={13} /> Viveiro {pair.aviary_number}
                  </p>
                )}
              </div>
              {/* Countdown */}
              {clutch.status === 'incubating' && daysLeft !== null && (
                <div className="text-center p-3 rounded-[var(--radius-lg)] bg-amber-50 border border-amber-200 flex-shrink-0">
                  <p className="text-2xl font-bold text-amber-700">{Math.max(0, daysLeft)}</p>
                  <p className="text-[11px] font-medium text-amber-600">
                    {daysLeft > 0 ? 'dias p/ eclosão' : 'dias (overdue)'}
                  </p>
                </div>
              )}
            </div>

            {/* Egg visualization */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">Ovos</p>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: clutch.hatched   }).map((_, i) => (
                  <div key={`h${i}`} className="w-10 h-10 rounded-full bg-primary-100 border-2 border-primary-400 flex items-center justify-center text-xl" title="Nascido">🐣</div>
                ))}
                {Array.from({ length: remaining        }).map((_, i) => (
                  <div key={`r${i}`} className="w-10 h-10 rounded-full bg-amber-50 border-2 border-amber-300 flex items-center justify-center text-xl" title="Em incubação">🥚</div>
                ))}
                {Array.from({ length: clutch.infertile }).map((_, i) => (
                  <div key={`i${i}`} className="w-10 h-10 rounded-full bg-red-50 border-2 border-red-200 flex items-center justify-center text-xl opacity-50" title="Galado">❌</div>
                ))}
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Total',    value: clutch.total_eggs,  icon: Egg,           color: 'text-gray-700  bg-gray-50   border-gray-200'  },
                { label: 'Nascidos', value: clutch.hatched,     icon: CheckCircle2,  color: 'text-primary-700 bg-primary-50 border-primary-200' },
                { label: 'Galados',  value: clutch.infertile,   icon: XCircle,       color: 'text-red-600   bg-red-50    border-red-200'    },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className={`rounded-[var(--radius-md)] border p-3 text-center ${color}`}>
                  <Icon size={14} className="mx-auto mb-1" />
                  <p className="text-xl font-bold">{value}</p>
                  <p className="text-[11px] font-medium">{label}</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Datas */}
        <Card>
          <CardHeader><CardTitle><Calendar size={14} className="inline mr-1.5" />Datas</CardTitle></CardHeader>
          <CardBody className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted font-medium">1º ovo</span>
              <span className="font-semibold text-gray-800">{formatDate(clutch.first_egg_date)}</span>
            </div>
            {hatchDate && (
              <div className="flex justify-between text-sm">
                <span className="text-muted font-medium">Previsão de eclosão <span className="font-normal">(~25 dias)</span></span>
                <span className="font-semibold text-amber-700">{hatchDate}</span>
              </div>
            )}
          </CardBody>
        </Card>

        {/* Casal */}
        <Card>
          <CardHeader>
            <CardTitle><Heart size={14} className="inline mr-1.5 text-pink-500" />Casal</CardTitle>
            {pair && <Link href={`/pairs/${pair.id}`} className="text-xs text-primary-600 hover:underline font-medium">Ver casal</Link>}
          </CardHeader>
          <CardBody>
            <div className="flex items-center gap-6 justify-center py-2">
              <Link href={`/birds/${male?.id}`} className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity">
                <BirdAvatar photoUrl={male?.photo_url} speciesEmoji={mSp?.emoji} size="lg" />
                <Badge variant="male">♂ Macho</Badge>
                <p className="font-mono text-xs font-bold text-primary-700">{male?.ring_number}</p>
                <p className="text-xs text-muted">{male?.mutation ?? mSp?.common_name}</p>
              </Link>
              <Heart size={24} className="text-pink-400 fill-pink-400 flex-shrink-0" />
              <Link href={`/birds/${female?.id}`} className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity">
                <BirdAvatar photoUrl={female?.photo_url} speciesEmoji={fSp?.emoji} size="lg" />
                <Badge variant="female">♀ Fêmea</Badge>
                <p className="font-mono text-xs font-bold text-primary-700">{female?.ring_number}</p>
                <p className="text-xs text-muted">{female?.mutation ?? fSp?.common_name}</p>
              </Link>
            </div>
          </CardBody>
        </Card>

        {clutch.notes && (
          <Card>
            <CardHeader><CardTitle>Observações</CardTitle></CardHeader>
            <CardBody>
              <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{clutch.notes}</p>
            </CardBody>
          </Card>
        )}

      </main>
    </div>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const c = await getClutchById(id)
  if (!c) return { title: 'Ninhada não encontrada' }
  return { title: `Ninhada · ${c.pair?.male?.species?.common_name ?? 'Ave'} · ${formatDate(c.first_egg_date)}` }
}
