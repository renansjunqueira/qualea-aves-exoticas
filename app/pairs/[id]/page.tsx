import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Header }     from '@/components/layout/Header'
import { Badge }      from '@/components/ui/badge'
import { Button }     from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/card'
import { BirdAvatar } from '@/components/birds/BirdAvatar'
import { formatDate } from '@/lib/utils'
import { getPairById }       from '@/lib/queries/pairs'
import { getClutchesByPair } from '@/lib/queries/clutches'
import {
  Heart, Egg, Home, Calendar, ArrowLeft, Pencil, Plus,
  CheckCircle2, XCircle, Clock,
} from 'lucide-react'

const CLUTCH_STATUS_VARIANT = {
  incubating: 'incubating', hatched: 'hatched', lost: 'lost', weaning: 'weaning',
} as const
const CLUTCH_STATUS_LABEL = {
  incubating: 'Incubando', hatched: 'Nascidos', lost: 'Perdida', weaning: 'Desmame',
}

// Calcula previsão de eclosão (~25 dias de incubação médio em psitacídeos)
function expectedHatch(firstEggDate: string | null): string | null {
  if (!firstEggDate) return null
  const d = new Date(firstEggDate + 'T00:00:00')
  d.setDate(d.getDate() + 25)
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function EggVisual({ total, hatched, infertile }: { total: number; hatched: number; infertile: number }) {
  const remaining = total - hatched - infertile
  return (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {Array.from({ length: hatched   }).map((_, i) => (
        <div key={`h${i}`} className="w-5 h-5 rounded-full bg-primary-500 border border-primary-600 flex items-center justify-center" title="Nascido">
          <span className="text-[8px]">🐣</span>
        </div>
      ))}
      {Array.from({ length: remaining }).map((_, i) => (
        <div key={`r${i}`} className="w-5 h-5 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center" title="Em incubação">
          <span className="text-[8px]">🥚</span>
        </div>
      ))}
      {Array.from({ length: infertile }).map((_, i) => (
        <div key={`i${i}`} className="w-5 h-5 rounded-full bg-red-100 border border-red-300 flex items-center justify-center" title="Galado">
          <span className="text-[8px]">❌</span>
        </div>
      ))}
    </div>
  )
}

export default async function PairDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [pair, clutches] = await Promise.all([getPairById(id), getClutchesByPair(id)])
  if (!pair) notFound()

  const male   = pair.male
  const female = pair.female
  const mSp    = male?.species
  const fSp    = female?.species

  const totalEggs    = clutches.reduce((s, c) => s + c.total_eggs, 0)
  const totalHatched = clutches.reduce((s, c) => s + c.hatched, 0)
  const activeClutch = clutches.find(c => c.status === 'incubating' || c.status === 'weaning')

  return (
    <div className="flex flex-col flex-1">
      <Header
        title={`Casal · ${pair.aviary_number ?? 'Sem viveiro'}`}
        actions={
          <Button size="sm" variant="secondary"><Pencil size={14} /> Editar</Button>
        }
      />

      <main className="flex-1 p-4 lg:p-6 space-y-5 max-w-3xl mx-auto w-full animate-fade-in">

        <Link href="/pairs" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary-700 font-medium transition-colors">
          <ArrowLeft size={15} /> Casais
        </Link>

        {/* Hero do casal */}
        <Card className="overflow-hidden">
          <div className="h-16 w-full" style={{ background: 'linear-gradient(135deg, #1c5e40 0%, #f4a261 100%)' }} />
          <div className="p-5">
            {/* Aves */}
            <div className="flex items-center gap-4 -mt-10 mb-5">
              <div className="border-4 border-white rounded-full shadow">
                <BirdAvatar photoUrl={male?.photo_url} speciesEmoji={mSp?.emoji} size="lg" />
              </div>
              <div className="flex-1" />
              <Heart size={28} className="text-pink-400 fill-pink-400 -mt-4 flex-shrink-0" />
              <div className="flex-1" />
              <div className="border-4 border-white rounded-full shadow">
                <BirdAvatar photoUrl={female?.photo_url} speciesEmoji={fSp?.emoji} size="lg" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              {/* Macho info */}
              <div>
                <Badge variant="male" className="mb-1.5">♂ Macho</Badge>
                <Link href={`/birds/${male?.id}`} className="block font-mono font-bold text-primary-700 hover:underline">
                  {male?.ring_number ?? '—'}
                </Link>
                <p className="text-muted text-xs">{mSp?.common_name}</p>
                {male?.mutation && <p className="text-muted-light text-xs">{male.mutation}</p>}
              </div>
              {/* Fêmea info */}
              <div className="text-right">
                <Badge variant="female" className="mb-1.5">♀ Fêmea</Badge>
                <Link href={`/birds/${female?.id}`} className="block font-mono font-bold text-primary-700 hover:underline">
                  {female?.ring_number ?? '—'}
                </Link>
                <p className="text-muted text-xs">{fSp?.common_name}</p>
                {female?.mutation && <p className="text-muted-light text-xs">{female.mutation}</p>}
              </div>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-border text-xs text-muted">
              {pair.aviary_number && (
                <span className="flex items-center gap-1.5"><Home size={12} /> Viveiro {pair.aviary_number}</span>
              )}
              {pair.formed_at && (
                <span className="flex items-center gap-1.5"><Calendar size={12} /> Desde {formatDate(pair.formed_at)}</span>
              )}
              <span className="flex items-center gap-1.5"><Egg size={12} /> {clutches.length} ninhada{clutches.length !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </Card>

        {/* Alerta de ninhada ativa */}
        {activeClutch && (
          <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-amber-50 border border-amber-200">
            <Egg size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-800">
                {activeClutch.status === 'incubating' ? '🔥 Ninhada em incubação' : '🐣 Filhotes em desmame'}
              </p>
              <p className="text-xs text-amber-700 mt-0.5">
                {activeClutch.total_eggs} ovo{activeClutch.total_eggs !== 1 ? 's' : ''} ·
                {activeClutch.status === 'incubating' && activeClutch.first_egg_date
                  ? ` Previsão de eclosão: ${expectedHatch(activeClutch.first_egg_date)}`
                  : ` ${activeClutch.hatched} filhote${activeClutch.hatched !== 1 ? 's' : ''} nascido${activeClutch.hatched !== 1 ? 's' : ''}`}
              </p>
            </div>
          </div>
        )}

        {/* Estatísticas */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Ninhadas',   value: clutches.length,  icon: Egg,           color: 'text-primary-600 bg-primary-50 border-primary-100' },
            { label: 'Total ovos', value: totalEggs,         icon: Clock,         color: 'text-amber-600 bg-amber-50 border-amber-100' },
            { label: 'Filhotes',   value: totalHatched,      icon: CheckCircle2,  color: 'text-green-600 bg-green-50 border-green-100' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className={`rounded-[var(--radius-lg)] border p-4 text-center ${color}`}>
              <Icon size={16} className="mx-auto mb-1" />
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-[11px] font-medium mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Histórico de ninhadas */}
        <Card>
          <CardHeader>
            <CardTitle>Ninhadas ({clutches.length})</CardTitle>
            <Link href={`/clutches/new?pair=${id}`}>
              <Button size="sm"><Plus size={14} /> Nova Ninhada</Button>
            </Link>
          </CardHeader>
          <CardBody className={clutches.length ? 'p-0' : ''}>
            {clutches.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-10 text-muted">
                <Egg size={36} strokeWidth={1} className="text-border" />
                <p className="text-sm">Nenhuma ninhada registrada para este casal.</p>
                <Link href={`/clutches/new?pair=${id}`}>
                  <Button size="sm" variant="secondary"><Plus size={14} /> Registrar primeira ninhada</Button>
                </Link>
              </div>
            ) : (
              clutches.map((c, idx) => (
                <Link key={c.id} href={`/clutches/${c.id}`}
                  className="flex items-start gap-4 p-4 border-b border-border last:border-0 hover:bg-primary-50/40 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center flex-shrink-0 text-sm font-bold text-amber-700">
                    {clutches.length - idx}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant={CLUTCH_STATUS_VARIANT[c.status] as any}>
                          {CLUTCH_STATUS_LABEL[c.status]}
                        </Badge>
                        {c.first_egg_date && (
                          <span className="text-xs text-muted">1º ovo: {formatDate(c.first_egg_date)}</span>
                        )}
                      </div>
                      {c.status === 'incubating' && (
                        <span className="text-[11px] text-amber-600 font-medium flex-shrink-0">
                          Prev. {expectedHatch(c.first_egg_date)}
                        </span>
                      )}
                    </div>
                    <EggVisual total={c.total_eggs} hatched={c.hatched} infertile={c.infertile} />
                    <p className="text-xs text-muted mt-1.5">
                      {c.total_eggs} ovo{c.total_eggs !== 1 ? 's' : ''} ·{' '}
                      {c.hatched} nascido{c.hatched !== 1 ? 's' : ''} ·{' '}
                      {c.infertile} galado{c.infertile !== 1 ? 's' : ''}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </CardBody>
        </Card>

        {pair.notes && (
          <Card>
            <CardHeader><CardTitle>Observações</CardTitle></CardHeader>
            <CardBody>
              <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{pair.notes}</p>
            </CardBody>
          </Card>
        )}

      </main>
    </div>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const pair = await getPairById(id)
  return { title: pair ? `Casal · ${pair.aviary_number ?? pair.id}` : 'Casal não encontrado' }
}
