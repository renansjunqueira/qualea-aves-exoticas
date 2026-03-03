'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Clutch, Pair } from '@/types'
import { Button }   from '@/components/ui/button'
import { Input }    from '@/components/ui/input'
import { Select }   from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Label }    from '@/components/ui/label'
import { AlertCircle, ChevronLeft, Save } from 'lucide-react'
import { saveClutch } from '@/lib/actions/clutches'
import { cn } from '@/lib/utils'

interface Props {
  clutch?:    Clutch | null
  pairs:      Pair[]
  defaultPairId?: string
}

const STATUS_OPTIONS = [
  { value: 'incubating', label: '🔥 Incubando',         color: 'bg-amber-100 border-amber-300 text-amber-800' },
  { value: 'hatched',    label: '🐣 Filhotes nascidos',  color: 'bg-primary-100 border-primary-300 text-primary-800' },
  { value: 'weaning',    label: '🌱 Em desmame',         color: 'bg-purple-100 border-purple-300 text-purple-800' },
  { value: 'lost',       label: '❌ Ninhada perdida',    color: 'bg-red-100 border-red-300 text-red-800' },
]

export function ClutchForm({ clutch, pairs, defaultPairId }: Props) {
  const router = useRouter()
  const isEdit = !!clutch

  const [form, setForm] = useState({
    pair_id:        clutch?.pair_id        ?? defaultPairId ?? '',
    first_egg_date: clutch?.first_egg_date ?? '',
    total_eggs:     String(clutch?.total_eggs  ?? ''),
    hatched:        String(clutch?.hatched     ?? '0'),
    infertile:      String(clutch?.infertile   ?? '0'),
    status:         clutch?.status         ?? 'incubating',
    notes:          clutch?.notes          ?? '',
  })

  const [errors,  setErrors]  = useState<Partial<Record<keyof typeof form, string>>>({})
  const [loading, setLoading] = useState(false)

  function set<K extends keyof typeof form>(key: K, val: string) {
    setForm(f => ({ ...f, [key]: val }))
    if (errors[key]) setErrors(e => ({ ...e, [key]: undefined }))
  }

  function validate() {
    const errs: typeof errors = {}
    if (!form.pair_id)        errs.pair_id   = 'Selecione o casal'
    if (!form.first_egg_date) errs.first_egg_date = 'Informe a data do primeiro ovo'
    const eggs     = parseInt(form.total_eggs)  || 0
    const hatched  = parseInt(form.hatched)     || 0
    const infertile= parseInt(form.infertile)   || 0
    if (isNaN(eggs) || eggs < 0)            errs.total_eggs = 'Valor inválido'
    if (hatched + infertile > eggs)         errs.hatched    = 'Nascidos + galados não pode superar total de ovos'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      await saveClutch(
        {
          pair_id:        form.pair_id,
          first_egg_date: form.first_egg_date || undefined,
          total_eggs:     parseInt(form.total_eggs) || 0,
          hatched:        parseInt(form.hatched)    || 0,
          infertile:      parseInt(form.infertile)  || 0,
          status:         form.status as 'incubating' | 'hatched' | 'lost' | 'weaning',
          notes:          form.notes || undefined,
        },
        clutch?.id,
      )
      router.push('/clutches')
      router.refresh()
    } catch (err) {
      console.error('Erro ao salvar ninhada:', err)
      alert('Erro ao salvar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  // Calcula previsão de eclosão
  const expectedDate = (() => {
    if (!form.first_egg_date) return null
    const d = new Date(form.first_egg_date + 'T00:00:00')
    d.setDate(d.getDate() + 25)
    return d.toLocaleDateString('pt-BR')
  })()

  const selectedPair = pairs.find(p => p.id === form.pair_id)

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">

      {/* Casal */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-3 pb-2 border-b border-border">Casal</h3>
        <div>
          <Label>Casal <span className="text-red-500">*</span></Label>
          <Select value={form.pair_id} onChange={e => set('pair_id', e.target.value)}
            className={errors.pair_id ? 'border-red-400' : ''}>
            <option value="">Selecione o casal…</option>
            {pairs.map(p => {
              const sp = p.male?.species
              return (
                <option key={p.id} value={p.id}>
                  {sp?.emoji} {p.male?.ring_number ?? '?'} × {p.female?.ring_number ?? '?'}
                  {p.aviary_number ? ` — Viveiro ${p.aviary_number}` : ''}
                </option>
              )
            })}
          </Select>
          {errors.pair_id && (
            <p className="flex items-center gap-1 mt-1 text-xs text-red-600">
              <AlertCircle size={11} />{errors.pair_id}
            </p>
          )}
          {selectedPair && (
            <p className="mt-1.5 text-xs text-primary-600 font-medium">
              {selectedPair.male?.species?.common_name} ·{' '}
              {selectedPair.male?.mutation && <span>{selectedPair.male.mutation} × </span>}
              {selectedPair.female?.mutation}
            </p>
          )}
        </div>
      </section>

      {/* Postura */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-3 pb-2 border-b border-border">Dados da Postura</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>Data do Primeiro Ovo <span className="text-red-500">*</span></Label>
            <Input type="date" value={form.first_egg_date} onChange={e => set('first_egg_date', e.target.value)}
              max={new Date().toISOString().slice(0,10)}
              className={errors.first_egg_date ? 'border-red-400' : ''} />
            {errors.first_egg_date && (
              <p className="flex items-center gap-1 mt-1 text-xs text-red-600">
                <AlertCircle size={11} />{errors.first_egg_date}
              </p>
            )}
            {expectedDate && form.status === 'incubating' && (
              <p className="mt-1 text-xs text-amber-600 font-medium">
                📅 Previsão de eclosão: {expectedDate} (~25 dias)
              </p>
            )}
          </div>

          <div>
            <Label>Total de Ovos</Label>
            <Input type="number" min="0" max="20" value={form.total_eggs}
              onChange={e => set('total_eggs', e.target.value)} placeholder="0"
              className={errors.total_eggs ? 'border-red-400' : ''} />
            {errors.total_eggs && (
              <p className="flex items-center gap-1 mt-1 text-xs text-red-600">
                <AlertCircle size={11} />{errors.total_eggs}
              </p>
            )}
          </div>

          <div>
            <Label>Filhotes Nascidos</Label>
            <Input type="number" min="0" value={form.hatched} onChange={e => set('hatched', e.target.value)}
              placeholder="0" className={errors.hatched ? 'border-red-400' : ''} />
            {errors.hatched && (
              <p className="flex items-center gap-1 mt-1 text-xs text-red-600">
                <AlertCircle size={11} />{errors.hatched}
              </p>
            )}
          </div>

          <div>
            <Label>Ovos Galados (inférteis)</Label>
            <Input type="number" min="0" value={form.infertile} onChange={e => set('infertile', e.target.value)}
              placeholder="0" />
          </div>
        </div>
      </section>

      {/* Status */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-3 pb-2 border-b border-border">Status da Ninhada</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {STATUS_OPTIONS.map(opt => (
            <button key={opt.value} type="button" onClick={() => set('status', opt.value)}
              className={cn(
                'px-3 py-2.5 rounded-[var(--radius-md)] border-2 text-xs font-semibold transition-all text-center leading-tight',
                form.status === opt.value ? `${opt.color} border-current` : 'border-border bg-white text-muted hover:border-gray-300'
              )}>
              {opt.label}
            </button>
          ))}
        </div>
      </section>

      {/* Observações */}
      <div>
        <Label>Observações</Label>
        <Textarea value={form.notes} onChange={e => set('notes', e.target.value)}
          placeholder="Comportamento do casal, temperatura de incubação, perdas, anomalias…" rows={3} />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={() => router.back()}>
          <ChevronLeft size={15} /> Voltar
        </Button>
        <Button type="submit" disabled={loading} className="ml-auto">
          <Save size={15} />
          {loading ? 'Salvando…' : isEdit ? 'Salvar alterações' : 'Registrar ninhada'}
        </Button>
      </div>
    </form>
  )
}
