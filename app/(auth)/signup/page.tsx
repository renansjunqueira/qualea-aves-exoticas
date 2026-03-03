'use client'
import { useState } from 'react'
import Link  from 'next/link'
import Image from 'next/image'
import { Input }    from '@/components/ui/input'
import { Button }   from '@/components/ui/button'
import { Label }    from '@/components/ui/label'
import { Select }   from '@/components/ui/select'
import { AlertCircle, UserPlus, CheckCircle2, Circle } from 'lucide-react'
import { signUp } from '@/lib/actions/auth'

const BR_STATES = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO']
const HOW_FOUND = ['Instagram','Facebook','Indicação de amigo','Google','YouTube','Feira / Evento','Outro']

const PWD_RULES = [
  { label: 'Mínimo 8 caracteres',         test: (p: string) => p.length >= 8 },
  { label: 'Uma letra maiúscula (A-Z)',    test: (p: string) => /[A-Z]/.test(p) },
  { label: 'Uma letra minúscula (a-z)',    test: (p: string) => /[a-z]/.test(p) },
  { label: 'Um número (0-9)',             test: (p: string) => /[0-9]/.test(p) },
  { label: 'Um caractere especial (!@#$%^&*)', test: (p: string) => /[!@#$%^&*]/.test(p) },
]

function passwordValid(p: string) { return PWD_RULES.every(r => r.test(p)) }

export default function SignupPage() {
  const [form, setForm] = useState({
    name: '', email: '', password: '',
    cpf: '', phone: '', address: '', city: '', state: '', how_found: '',
  })
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  function set(key: keyof typeof form, value: string) {
    setForm(f => ({ ...f, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!form.name.trim()) { setError('Nome completo é obrigatório'); return }
    if (!form.cpf.trim())  { setError('CPF é obrigatório'); return }
    if (!form.phone.trim()){ setError('Telefone é obrigatório'); return }
    if (!passwordValid(form.password)) { setError('A senha não atende aos requisitos de segurança'); return }
    setLoading(true)
    const result = await signUp(form.email, form.password, {
      name: form.name, cpf: form.cpf, phone: form.phone,
      address: form.address, city: form.city, state: form.state, how_found: form.how_found,
    })
    if (result?.error) { setError(result.error); setLoading(false) }
  }

  return (
    <div className="w-full max-w-lg">
      {/* Logo */}
      <div className="flex flex-col items-center gap-3 mb-6">
        <div className="relative w-14 h-14 rounded-full overflow-hidden border-4 border-primary-200">
          <Image src="/logo.png" alt="Qualea Tech" fill className="object-contain" />
        </div>
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-900">Qualea Tech</h1>
          <p className="text-sm text-muted">Crie sua conta</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-[var(--radius-lg)] p-6 shadow-sm space-y-5">

        {/* Seção: Conta */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">Dados de acesso</p>
          <div className="space-y-3">
            <div>
              <Label htmlFor="name">Nome completo *</Label>
              <Input id="name" required value={form.name} onChange={e => set('name', e.target.value)} placeholder="Seu nome completo" />
            </div>
            <div>
              <Label htmlFor="email">E-mail *</Label>
              <Input id="email" type="email" autoComplete="email" required value={form.email} onChange={e => set('email', e.target.value)} placeholder="seu@email.com" />
            </div>
            <div>
              <Label htmlFor="password">Senha *</Label>
              <Input
                id="password" type="password" autoComplete="new-password" required
                value={form.password}
                onChange={e => set('password', e.target.value)}
                onFocus={() => setPwdFocus(true)}
                placeholder="Crie uma senha segura"
              />
              {/* Checklist de requisitos */}
              {(pwdFocus || form.password.length > 0) && (
                <ul className="mt-2 space-y-1">
                  {PWD_RULES.map(rule => {
                    const ok = rule.test(form.password)
                    return (
                      <li key={rule.label} className={`flex items-center gap-1.5 text-xs ${ok ? 'text-green-600' : 'text-muted'}`}>
                        {ok ? <CheckCircle2 size={12} /> : <Circle size={12} />}
                        {rule.label}
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-border" />

        {/* Seção: Dados adicionais */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">Dados adicionais</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label htmlFor="cpf">CPF *</Label>
              <Input id="cpf" required value={form.cpf} onChange={e => set('cpf', e.target.value)} placeholder="000.000.000-00" />
            </div>
            <div>
              <Label htmlFor="phone">Telefone *</Label>
              <Input id="phone" required value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="(11) 99999-9999" />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="address">Endereço</Label>
              <Input id="address" value={form.address} onChange={e => set('address', e.target.value)} placeholder="Rua, número, complemento" />
            </div>
            <div>
              <Label htmlFor="city">Cidade</Label>
              <Input id="city" value={form.city} onChange={e => set('city', e.target.value)} placeholder="Sua cidade" />
            </div>
            <div>
              <Label htmlFor="state">Estado</Label>
              <Select id="state" value={form.state} onChange={e => set('state', e.target.value)}>
                <option value="">Selecione…</option>
                {BR_STATES.map(uf => <option key={uf} value={uf}>{uf}</option>)}
              </Select>
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="how_found">Como conheceu a Qualea Tech?</Label>
              <Select id="how_found" value={form.how_found} onChange={e => set('how_found', e.target.value)}>
                <option value="">Selecione…</option>
                {HOW_FOUND.map(h => <option key={h} value={h}>{h}</option>)}
              </Select>
            </div>
          </div>
        </div>

        {error && (
          <p className="flex items-center gap-1.5 text-sm text-red-600">
            <AlertCircle size={14} /> {error}
          </p>
        )}

        <Button type="submit" disabled={loading || !passwordValid(form.password)} className="w-full">
          <UserPlus size={15} />
          {loading ? 'Criando conta…' : 'Criar conta'}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-muted">
        Já tem conta?{' '}
        <Link href="/login" className="text-primary-600 font-semibold hover:underline">Entrar</Link>
      </p>
    </div>
  )
}
