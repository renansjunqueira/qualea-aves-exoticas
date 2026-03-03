'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import type { Bird, Species } from '@/types'
import { Button }   from '@/components/ui/button'
import { Input }    from '@/components/ui/input'
import { Select }   from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Label }    from '@/components/ui/label'
import { Badge }    from '@/components/ui/badge'
import { cn }       from '@/lib/utils'
import { Camera, X, ChevronLeft, Save, AlertCircle } from 'lucide-react'
import { saveBird } from '@/lib/actions/birds'

interface Props {
  bird?:    Bird | null
  species:  Species[]
  allBirds: Bird[]   // para selecionar pai/mãe
}

const SEX_OPTIONS = [
  { value: 'M', label: '♂ Macho',       variant: 'male'    as const },
  { value: 'F', label: '♀ Fêmea',       variant: 'female'  as const },
  { value: 'U', label: '🔬 DNA pendente', variant: 'unknown' as const },
]

const STATUS_OPTIONS = [
  { value: 'plantel',   label: 'Plantel',  color: 'bg-primary-100 border-primary-300 text-primary-800' },
  { value: 'filhote',   label: 'Filhote',  color: 'bg-amber-100 border-amber-300 text-amber-800' },
  { value: 'vendido',   label: 'Vendido',  color: 'bg-sky-100 border-sky-300 text-sky-800' },
  { value: 'obito',     label: 'Óbito',    color: 'bg-red-100 border-red-300 text-red-800' },
]

function FormField({ label, required, error, children }: {
  label: string; required?: boolean; error?: string; children: React.ReactNode
}) {
  return (
    <div>
      <Label>
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </Label>
      {children}
      {error && (
        <p className="flex items-center gap-1 mt-1 text-xs text-red-600">
          <AlertCircle size={11} /> {error}
        </p>
      )}
    </div>
  )
}

export function BirdForm({ bird, species, allBirds }: Props) {
  const router = useRouter()
  const isEdit = !!bird
  const fileRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState({
    ring_number: bird?.ring_number  ?? '',
    species_id:  bird?.species_id   ?? '',
    mutation:    bird?.mutation     ?? '',
    sex:         bird?.sex          ?? 'U',
    status:      bird?.status       ?? 'plantel',
    birth_date:  bird?.birth_date   ?? '',
    father_id:   bird?.father_id    ?? '',
    mother_id:   bird?.mother_id    ?? '',
    notes:       bird?.notes        ?? '',
  })

  const [photoPreview, setPhotoPreview] = useState<string | null>(bird?.photo_url ?? null)
  const [errors, setErrors]   = useState<Partial<Record<keyof typeof form, string>>>({})
  const [loading, setLoading] = useState(false)

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm(f => ({ ...f, [key]: value }))
    if (errors[key]) setErrors(e => ({ ...e, [key]: undefined }))
  }

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => setPhotoPreview(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  function validate() {
    const errs: typeof errors = {}
    if (!form.ring_number.trim()) errs.ring_number = 'Anilha é obrigatória'
    if (!form.species_id)         errs.species_id  = 'Selecione a espécie'
    if (!form.sex)                errs.sex         = 'Selecione o sexo'
    if (form.father_id && form.father_id === form.mother_id) {
      errs.mother_id = 'Pai e mãe não podem ser a mesma ave'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      await saveBird(
        {
          ring_number: form.ring_number,
          species_id:  form.species_id,
          mutation:    form.mutation   || undefined,
          sex:         form.sex        as 'M' | 'F' | 'U',
          status:      form.status     as 'plantel' | 'filhote' | 'vendido' | 'obito',
          birth_date:  form.birth_date || undefined,
          father_id:   form.father_id  || undefined,
          mother_id:   form.mother_id  || undefined,
          notes:       form.notes      || undefined,
          photo_url:   photoPreview,
        },
        bird?.id,
      )
      router.push('/birds')
      router.refresh()
    } catch (err) {
      console.error('Erro ao salvar ave:', err)
      alert('Erro ao salvar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  // Filtrar aves por sexo para o seletor de pai/mãe
  const potentialFathers = allBirds.filter(b => b.sex === 'M' && b.id !== bird?.id)
  const potentialMothers = allBirds.filter(b => b.sex === 'F' && b.id !== bird?.id)

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">

      {/* Foto */}
      <div className="flex items-center gap-5">
        <div
          onClick={() => fileRef.current?.click()}
          className="relative w-20 h-20 rounded-full bg-primary-100 border-2 border-dashed border-primary-300 flex items-center justify-center cursor-pointer hover:bg-primary-200 transition-colors overflow-hidden flex-shrink-0"
        >
          {photoPreview ? (
            <Image src={photoPreview} alt="Preview" fill className="object-cover" />
          ) : (
            <div className="flex flex-col items-center gap-1 text-muted">
              <Camera size={20} />
              <span className="text-[10px] font-medium">Foto</span>
            </div>
          )}
        </div>
        <div className="text-sm text-muted space-y-1">
          <button type="button" onClick={() => fileRef.current?.click()}
            className="text-primary-600 font-semibold hover:underline text-sm">
            {photoPreview ? 'Trocar foto' : 'Adicionar foto'}
          </button>
          <p className="text-xs">JPG ou PNG, até 5 MB</p>
          {photoPreview && (
            <button type="button" onClick={() => { setPhotoPreview(null); if (fileRef.current) fileRef.current.value = '' }}
              className="flex items-center gap-1 text-xs text-red-500 hover:underline">
              <X size={11} /> Remover foto
            </button>
          )}
        </div>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
      </div>

      {/* Identificação */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-3 pb-2 border-b border-border">Identificação</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Anilha / Microchip" required error={errors.ring_number}>
            <Input
              value={form.ring_number}
              onChange={e => set('ring_number', e.target.value)}
              placeholder="Ex: QAE-2025-001"
              className={errors.ring_number ? 'border-red-400' : ''}
            />
          </FormField>

          <FormField label="Espécie" required error={errors.species_id}>
            <Select
              value={form.species_id}
              onChange={e => set('species_id', e.target.value)}
              className={errors.species_id ? 'border-red-400' : ''}
            >
              <option value="">Selecione a espécie…</option>
              {species.map(s => (
                <option key={s.id} value={s.id}>
                  {s.emoji} {s.common_name}{s.sci_name ? ` — ${s.sci_name}` : ''}
                </option>
              ))}
            </Select>
          </FormField>

          <FormField label="Mutação / Cor">
            <Input
              value={form.mutation}
              onChange={e => set('mutation', e.target.value)}
              placeholder="Ex: Lutino, Albino, Azul, Normal…"
            />
          </FormField>

          <FormField label="Data de Nascimento">
            <Input
              type="date"
              value={form.birth_date}
              onChange={e => set('birth_date', e.target.value)}
              max={new Date().toISOString().slice(0, 10)}
            />
          </FormField>
        </div>
      </section>

      {/* Sexo */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-3 pb-2 border-b border-border">Sexo</h3>
        <div className="flex flex-wrap gap-2">
          {SEX_OPTIONS.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => set('sex', opt.value)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-[var(--radius-md)] border-2 text-sm font-medium transition-all',
                form.sex === opt.value
                  ? 'border-primary-600 bg-primary-50 text-primary-800'
                  : 'border-border bg-white text-muted hover:border-primary-300'
              )}
            >
              <Badge variant={opt.variant}>{opt.label}</Badge>
            </button>
          ))}
        </div>
        {errors.sex && <p className="mt-1 text-xs text-red-600 flex items-center gap-1"><AlertCircle size={11} />{errors.sex}</p>}
      </section>

      {/* Status */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-3 pb-2 border-b border-border">Status no Plantel</h3>
        <div className="flex flex-wrap gap-2">
          {STATUS_OPTIONS.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => set('status', opt.value)}
              className={cn(
                'px-4 py-2 rounded-[var(--radius-md)] border-2 text-sm font-semibold transition-all',
                form.status === opt.value
                  ? `${opt.color} border-current`
                  : 'border-border bg-white text-muted hover:border-gray-300'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </section>

      {/* Filiação */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-3 pb-2 border-b border-border">
          Filiação <span className="font-normal text-muted">(opcional — para rastreio genético)</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Pai (Macho)">
            <Select value={form.father_id} onChange={e => set('father_id', e.target.value)}>
              <option value="">Selecionar pai…</option>
              {potentialFathers.map(b => (
                <option key={b.id} value={b.id}>
                  {b.ring_number} — {b.species?.common_name} {b.mutation ? `(${b.mutation})` : ''}
                </option>
              ))}
            </Select>
          </FormField>

          <FormField label="Mãe (Fêmea)" error={errors.mother_id}>
            <Select value={form.mother_id} onChange={e => set('mother_id', e.target.value)}
              className={errors.mother_id ? 'border-red-400' : ''}>
              <option value="">Selecionar mãe…</option>
              {potentialMothers.map(b => (
                <option key={b.id} value={b.id}>
                  {b.ring_number} — {b.species?.common_name} {b.mutation ? `(${b.mutation})` : ''}
                </option>
              ))}
            </Select>
          </FormField>
        </div>
      </section>

      {/* Observações */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-3 pb-2 border-b border-border">Observações</h3>
        <FormField label="Notas gerais / histórico">
          <Textarea
            value={form.notes}
            onChange={e => set('notes', e.target.value)}
            placeholder="Comportamento, histórico de saúde, observações gerais…"
            rows={4}
          />
        </FormField>
      </section>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={() => router.back()}>
          <ChevronLeft size={15} /> Voltar
        </Button>
        <Button type="submit" disabled={loading} className="ml-auto">
          <Save size={15} />
          {loading ? 'Salvando…' : isEdit ? 'Salvar alterações' : 'Cadastrar ave'}
        </Button>
      </div>

    </form>
  )
}
