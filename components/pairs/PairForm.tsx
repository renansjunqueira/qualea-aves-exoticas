'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Pair, Bird } from '@/types'
import { Button }   from '@/components/ui/button'
import { Input }    from '@/components/ui/input'
import { Select }   from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Label }    from '@/components/ui/label'
import { BirdAvatar } from '@/components/birds/BirdAvatar'
import { AlertCircle, ChevronLeft, Save, Heart } from 'lucide-react'
import { savePair } from '@/lib/actions/pairs'

interface Props {
  pair?:   Pair | null
  males:   Bird[]
  females: Bird[]
}

function BirdOption({ bird }: { bird: Bird }) {
  const sp = bird.species
  return (
    <div className="flex items-center gap-2">
      <span>{sp?.emoji ?? '🐦'}</span>
      <span>{bird.ring_number}</span>
      <span className="text-muted">— {sp?.common_name}</span>
      {bird.mutation && <span className="text-muted">({bird.mutation})</span>}
    </div>
  )
}

export function PairForm({ pair, males, females }: Props) {
  const router = useRouter()
  const isEdit = !!pair

  const [form, setForm] = useState({
    male_id:       pair?.male_id       ?? '',
    female_id:     pair?.female_id     ?? '',
    aviary_number: pair?.aviary_number ?? '',
    formed_at:     pair?.formed_at     ?? '',
    notes:         pair?.notes         ?? '',
  })

  const [errors,  setErrors]  = useState<Partial<Record<keyof typeof form, string>>>({})
  const [loading, setLoading] = useState(false)

  function set<K extends keyof typeof form>(key: K, val: string) {
    setForm(f => ({ ...f, [key]: val }))
    if (errors[key]) setErrors(e => ({ ...e, [key]: undefined }))
  }

  function validate() {
    const errs: typeof errors = {}
    if (!form.male_id)   errs.male_id   = 'Selecione o macho'
    if (!form.female_id) errs.female_id = 'Selecione a fêmea'
    if (form.male_id && form.male_id === form.female_id)
      errs.female_id = 'Macho e fêmea devem ser diferentes'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      await savePair(
        {
          male_id:       form.male_id,
          female_id:     form.female_id,
          aviary_number: form.aviary_number || undefined,
          formed_at:     form.formed_at     || undefined,
          notes:         form.notes         || undefined,
        },
        pair?.id,
      )
      router.push('/pairs')
      router.refresh()
    } catch (err) {
      console.error('Erro ao salvar casal:', err)
      alert('Erro ao salvar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const selectedMale   = males.find(b => b.id === form.male_id)
  const selectedFemale = females.find(b => b.id === form.female_id)

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">

      {/* Preview do casal selecionado */}
      {(selectedMale || selectedFemale) && (
        <div className="flex items-center justify-center gap-6 p-5 rounded-[var(--radius-lg)] bg-primary-50 border border-primary-200">
          <div className="flex flex-col items-center gap-1.5">
            <BirdAvatar speciesEmoji={selectedMale?.species?.emoji} size="lg" />
            <p className="text-xs font-bold text-primary-700">{selectedMale?.ring_number ?? '…'}</p>
            <p className="text-[11px] text-muted">{selectedMale?.species?.common_name}</p>
          </div>
          <Heart size={28} className="text-pink-400 fill-pink-400 flex-shrink-0" />
          <div className="flex flex-col items-center gap-1.5">
            <BirdAvatar speciesEmoji={selectedFemale?.species?.emoji} size="lg" />
            <p className="text-xs font-bold text-primary-700">{selectedFemale?.ring_number ?? '…'}</p>
            <p className="text-[11px] text-muted">{selectedFemale?.species?.common_name}</p>
          </div>
        </div>
      )}

      {/* Seleção das aves */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-3 pb-2 border-b border-border">Aves do Casal</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>Macho <span className="text-red-500">*</span></Label>
            <Select value={form.male_id} onChange={e => set('male_id', e.target.value)}
              className={errors.male_id ? 'border-red-400' : ''}>
              <option value="">Selecione o macho…</option>
              {males.map(b => (
                <option key={b.id} value={b.id}>
                  ♂ {b.ring_number} — {b.species?.common_name}{b.mutation ? ` (${b.mutation})` : ''}
                </option>
              ))}
            </Select>
            {errors.male_id && (
              <p className="flex items-center gap-1 mt-1 text-xs text-red-600">
                <AlertCircle size={11} />{errors.male_id}
              </p>
            )}
            {males.length === 0 && (
              <p className="mt-1 text-xs text-amber-600">Nenhum macho ativo cadastrado.</p>
            )}
          </div>

          <div>
            <Label>Fêmea <span className="text-red-500">*</span></Label>
            <Select value={form.female_id} onChange={e => set('female_id', e.target.value)}
              className={errors.female_id ? 'border-red-400' : ''}>
              <option value="">Selecione a fêmea…</option>
              {females.map(b => (
                <option key={b.id} value={b.id}>
                  ♀ {b.ring_number} — {b.species?.common_name}{b.mutation ? ` (${b.mutation})` : ''}
                </option>
              ))}
            </Select>
            {errors.female_id && (
              <p className="flex items-center gap-1 mt-1 text-xs text-red-600">
                <AlertCircle size={11} />{errors.female_id}
              </p>
            )}
            {females.length === 0 && (
              <p className="mt-1 text-xs text-amber-600">Nenhuma fêmea ativa cadastrada.</p>
            )}
          </div>
        </div>
      </section>

      {/* Detalhes */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-3 pb-2 border-b border-border">Detalhes do Casal</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>Número do Viveiro / Gaiola</Label>
            <Input value={form.aviary_number} onChange={e => set('aviary_number', e.target.value)}
              placeholder="Ex: V-01, Gaiola 3…" />
          </div>
          <div>
            <Label>Data de Formação</Label>
            <Input type="date" value={form.formed_at} onChange={e => set('formed_at', e.target.value)}
              max={new Date().toISOString().slice(0, 10)} />
          </div>
        </div>
      </section>

      <div>
        <Label>Observações</Label>
        <Textarea value={form.notes} onChange={e => set('notes', e.target.value)}
          placeholder="Comportamento do casal, observações sobre adaptação…" rows={3} />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={() => router.back()}>
          <ChevronLeft size={15} /> Voltar
        </Button>
        <Button type="submit" disabled={loading} className="ml-auto">
          <Save size={15} />
          {loading ? 'Salvando…' : isEdit ? 'Salvar alterações' : 'Formar casal'}
        </Button>
      </div>
    </form>
  )
}
