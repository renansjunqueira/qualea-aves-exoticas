import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Header }    from '@/components/layout/Header'
import { Badge }     from '@/components/ui/badge'
import { Button }    from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/card'
import { BirdAvatar } from '@/components/birds/BirdAvatar'
import { formatDate, calcAge, SEX_LABEL, STATUS_LABEL } from '@/lib/utils'
import { getBirdById, getBirds } from '@/lib/queries/birds'
import { getPairs }              from '@/lib/queries/pairs'
import { getClutches }           from '@/lib/queries/clutches'
import {
  Pencil, Calendar, Dna, Tag, Home, Info,
  Bird as BirdIcon, Heart, Egg, ArrowLeft, FileText,
} from 'lucide-react'

const SEX_VARIANT    = { M: 'male', F: 'female', U: 'unknown' } as const
const STATUS_VARIANT = { plantel: 'plantel', filhote: 'filhote', vendido: 'vendido', obito: 'obito' } as const

function DetailRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: React.ReactNode }) {
  if (!value) return null
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-border last:border-0">
      <div className="w-7 h-7 rounded-[var(--radius-sm)] bg-primary-50 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon size={13} className="text-primary-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-semibold text-muted uppercase tracking-wide">{label}</p>
        <div className="text-sm text-gray-800 mt-0.5">{value}</div>
      </div>
    </div>
  )
}

export default async function BirdDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [bird, allBirds, allPairs, allClutches] = await Promise.all([
    getBirdById(id), getBirds(), getPairs(), getClutches(),
  ])
  if (!bird) notFound()

  const sp     = bird.species
  const father = bird.father as any
  const mother = bird.mother as any

  const birdPairs = allPairs.filter(p => p.male_id === id || p.female_id === id)
  const offspring = allBirds.filter(b => b.father_id === id || b.mother_id === id)
  const clutches  = allClutches.filter(c => birdPairs.some(p => p.id === c.pair_id))

  return (
    <div className="flex flex-col flex-1">
      <Header
        title={bird.ring_number}
        actions={
          <Link href={`/birds/${id}/edit`}>
            <Button size="sm" variant="secondary">
              <Pencil size={14} /> Editar
            </Button>
          </Link>
        }
      />

      <main className="flex-1 p-4 lg:p-6 space-y-5 max-w-3xl mx-auto w-full animate-fade-in">

        {/* Voltar */}
        <Link href="/birds" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary-700 font-medium transition-colors">
          <ArrowLeft size={15} /> Plantel
        </Link>

        {/* Hero Card */}
        <Card className="overflow-hidden">
          {/* Banner gradient */}
          <div className="h-20 w-full" style={{ background: 'linear-gradient(135deg, #1c5e40 0%, #52b788 100%)' }} />

          <div className="px-5 pb-5">
            {/* Avatar + nome */}
            <div className="flex items-end gap-4 -mt-9 mb-4">
              <div className="border-4 border-white rounded-full shadow-md">
                <BirdAvatar photoUrl={bird.photo_url} speciesEmoji={sp?.emoji} size="xl" />
              </div>
              <div className="mb-1 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={SEX_VARIANT[bird.sex] as any}>{SEX_LABEL[bird.sex]}</Badge>
                  <Badge variant={STATUS_VARIANT[bird.status] as any}>{STATUS_LABEL[bird.status]}</Badge>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mt-1 truncate">{bird.ring_number}</h2>
                <p className="text-sm text-muted">{sp?.common_name ?? '—'}</p>
              </div>
              <Link href={`/birds/${id}/edit`} className="hidden sm:block">
                <Button variant="secondary" size="sm"><Pencil size={14} /> Editar</Button>
              </Link>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Casais',    value: birdPairs.length,  icon: Heart },
                { label: 'Ninhadas',  value: clutches.length,   icon: Egg },
                { label: 'Filhotes',  value: offspring.length,  icon: BirdIcon },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="text-center p-3 rounded-[var(--radius-md)] bg-primary-50 border border-primary-100">
                  <Icon size={16} className="mx-auto text-primary-600 mb-1" />
                  <p className="text-lg font-bold text-primary-800">{value}</p>
                  <p className="text-[11px] text-primary-600 font-medium">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Detalhes + Filiação */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Dados da ave */}
          <Card>
            <CardHeader><CardTitle>Dados da Ave</CardTitle></CardHeader>
            <CardBody className="py-0 px-5">
              <DetailRow icon={BirdIcon}  label="Espécie"
                value={sp ? <>{sp.emoji} <strong>{sp.common_name}</strong> <em className="text-muted font-normal">({sp.sci_name})</em></> : '—'} />
              <DetailRow icon={Tag}       label="Mutação / Cor"    value={bird.mutation} />
              <DetailRow icon={Dna}       label="Sexo"
                value={<Badge variant={SEX_VARIANT[bird.sex] as any}>{SEX_LABEL[bird.sex]}</Badge>} />
              <DetailRow icon={Calendar}  label="Nascimento"
                value={bird.birth_date ? `${formatDate(bird.birth_date)} (${calcAge(bird.birth_date)})` : null} />
              <DetailRow icon={Home}      label="Status"
                value={<Badge variant={STATUS_VARIANT[bird.status] as any}>{STATUS_LABEL[bird.status]}</Badge>} />
            </CardBody>
          </Card>

          {/* Filiação */}
          <Card>
            <CardHeader><CardTitle>Filiação</CardTitle></CardHeader>
            <CardBody className="space-y-3">
              {father ? (
                <Link href={`/birds/${father.id}`} className="flex items-center gap-3 p-3 rounded-[var(--radius-md)] border border-border hover:bg-primary-50 transition-colors">
                  <BirdAvatar speciesEmoji={father.species?.emoji} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-muted uppercase mb-0.5">Pai</p>
                    <p className="text-sm font-semibold text-gray-800 truncate">{father.ring_number}</p>
                    <p className="text-xs text-muted">{father.species?.common_name} {father.mutation ? `· ${father.mutation}` : ''}</p>
                  </div>
                  <Badge variant="male">♂</Badge>
                </Link>
              ) : (
                <div className="p-3 rounded-[var(--radius-md)] border border-dashed border-border text-center text-xs text-muted">Pai não informado</div>
              )}

              {mother ? (
                <Link href={`/birds/${mother.id}`} className="flex items-center gap-3 p-3 rounded-[var(--radius-md)] border border-border hover:bg-primary-50 transition-colors">
                  <BirdAvatar speciesEmoji={mother.species?.emoji} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-muted uppercase mb-0.5">Mãe</p>
                    <p className="text-sm font-semibold text-gray-800 truncate">{mother.ring_number}</p>
                    <p className="text-xs text-muted">{mother.species?.common_name} {mother.mutation ? `· ${mother.mutation}` : ''}</p>
                  </div>
                  <Badge variant="female">♀</Badge>
                </Link>
              ) : (
                <div className="p-3 rounded-[var(--radius-md)] border border-dashed border-border text-center text-xs text-muted">Mãe não informada</div>
              )}

              {offspring.length > 0 && (
                <div className="pt-2 border-t border-border">
                  <p className="text-[11px] font-semibold text-muted uppercase mb-2">
                    {offspring.length} Filhote{offspring.length !== 1 ? 's' : ''} registrado{offspring.length !== 1 ? 's' : ''}
                  </p>
                  <div className="space-y-1.5">
                    {offspring.slice(0, 3).map(o => (
                      <Link key={o.id} href={`/birds/${o.id}`}
                        className="flex items-center gap-2 text-xs text-primary-700 hover:underline font-medium">
                        <BirdIcon size={11} /> {o.ring_number}
                        <span className="text-muted font-normal">{o.species?.common_name}</span>
                      </Link>
                    ))}
                    {offspring.length > 3 && (
                      <p className="text-xs text-muted">+{offspring.length - 3} mais…</p>
                    )}
                  </div>
                </div>
              )}
            </CardBody>
          </Card>
        </div>

        {/* Observações */}
        {bird.notes && (
          <Card>
            <CardHeader><CardTitle><FileText size={14} className="inline mr-1.5" />Observações</CardTitle></CardHeader>
            <CardBody>
              <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{bird.notes}</p>
            </CardBody>
          </Card>
        )}

        {/* Casais e ninhadas */}
        {birdPairs.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Reprodução</CardTitle>
              <Link href="/pairs" className="text-xs text-primary-600 hover:underline font-medium">Ver casais</Link>
            </CardHeader>
            <CardBody className="space-y-3">
              {birdPairs.map(pair => {
                const partner = pair.male_id === id ? pair.female : pair.male
                const pairClutches = clutches.filter(c => c.pair_id === pair.id)
                return (
                  <div key={pair.id} className="p-3 rounded-[var(--radius-md)] border border-border">
                    <div className="flex items-center gap-3 mb-2">
                      <Heart size={14} className="text-primary-500" />
                      <span className="text-sm font-semibold text-gray-800">
                        Par com {partner?.ring_number ?? '?'}
                      </span>
                      {pair.aviary_number && (
                        <Badge variant="default">Viveiro {pair.aviary_number}</Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {pairClutches.map(c => (
                        <Link key={c.id} href={`/clutches/${c.id}`}>
                          <Badge variant={c.status as any} className="cursor-pointer hover:opacity-80">
                            🥚 {c.total_eggs} ovos · {c.hatched} nascidos
                          </Badge>
                        </Link>
                      ))}
                      {pairClutches.length === 0 && (
                        <span className="text-xs text-muted">Nenhuma ninhada registrada</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </CardBody>
          </Card>
        )}

      </main>
    </div>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const bird = await getBirdById(id)
  return { title: bird ? `${bird.ring_number} — ${bird.species?.common_name}` : 'Ave não encontrada' }
}
