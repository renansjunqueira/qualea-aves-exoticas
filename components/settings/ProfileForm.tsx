'use client'
import { useState } from 'react'
import { Input }    from '@/components/ui/input'
import { Button }   from '@/components/ui/button'
import { Label }    from '@/components/ui/label'
import { Select }   from '@/components/ui/select'
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/card'
import { AlertCircle, CheckCircle2, Circle, Save } from 'lucide-react'
import { updateProfile, updatePassword } from '@/lib/actions/profile'
import type { Profile } from '@/types'

const BR_STATES = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO']
const HOW_FOUND = ['Instagram','Facebook','Indicação de amigo','Google','YouTube','Feira / Evento','Outro']

const PWD_RULES = [
  { label: 'Mínimo 8 caracteres',              test: (p: string) => p.length >= 8 },
  { label: 'Uma letra maiúscula (A-Z)',         test: (p: string) => /[A-Z]/.test(p) },
  { label: 'Uma letra minúscula (a-z)',         test: (p: string) => /[a-z]/.test(p) },
  { label: 'Um número (0-9)',                  test: (p: string) => /[0-9]/.test(p) },
  { label: 'Um caractere especial (!@#$%^&*)', test: (p: string) => /[!@#$%^&*]/.test(p) },
]

function passwordValid(p: string) { return PWD_RULES.every(r => r.test(p)) }

interface Props { profile: Profile | null }

export function ProfileForm({ profile }: Props) {
  const [form, setForm] = useState({
    name:      profile?.name      ?? '',
    cpf:       profile?.cpf       ?? '',
    phone:     profile?.phone     ?? '',
    address:   profile?.address   ?? '',
    city:      profile?.city      ?? '',
    state:     profile?.state     ?? '',
    how_found: profile?.how_found ?? '',
  })
  const [profileStatus, setProfileStatus] = useState<'idle'|'saving'|'saved'|'error'>('idle')
  const [profileError,  setProfileError]  = useState('')

  const [newPassword,     setNewPassword]     = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [pwdFocus,        setPwdFocus]        = useState(false)
  const [pwdStatus,       setPwdStatus]       = useState<'idle'|'saving'|'saved'|'error'>('idle')
  const [pwdError,        setPwdError]        = useState('')

  function set(key: keyof typeof form, value: string) {
    setForm(f => ({ ...f, [key]: value }))
  }

  async function handleProfileSave(e: React.FormEvent) {
    e.preventDefault()
    setProfileStatus('saving')
    setProfileError('')
    const result = await updateProfile(form)
    if (result.error) { setProfileError(result.error); setProfileStatus('error') }
    else setProfileStatus('saved')
  }

  async function handlePasswordSave(e: React.FormEvent) {
    e.preventDefault()
    setPwdError('')
    if (!passwordValid(newPassword)) { setPwdError('A senha não atende aos requisitos'); return }
    if (newPassword !== confirmPassword) { setPwdError('As senhas não coincidem'); return }
    setPwdStatus('saving')
    const result = await updatePassword(newPassword)
    if (result.error) { setPwdError(result.error); setPwdStatus('error') }
    else { setPwdStatus('saved'); setNewPassword(''); setConfirmPassword('') }
  }

  return (
    <div className="space-y-6">

      {/* Dados pessoais */}
      <Card>
        <CardHeader><CardTitle>Dados pessoais</CardTitle></CardHeader>
        <CardBody>
          <form onSubmit={handleProfileSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input id="name" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Seu nome completo" />
              </div>
              <div>
                <Label htmlFor="cpf">CPF</Label>
                <Input id="cpf" value={form.cpf} onChange={e => set('cpf', e.target.value)} placeholder="000.000.000-00" />
              </div>
              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="(11) 99999-9999" />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="how_found">Como conheceu a Qualea Tech?</Label>
                <Select id="how_found" value={form.how_found} onChange={e => set('how_found', e.target.value)}>
                  <option value="">Selecione…</option>
                  {HOW_FOUND.map(h => <option key={h} value={h}>{h}</option>)}
                </Select>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">Endereço</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              </div>
            </div>

            {profileError && (
              <p className="flex items-center gap-1.5 text-sm text-red-600"><AlertCircle size={14} /> {profileError}</p>
            )}
            {profileStatus === 'saved' && (
              <p className="flex items-center gap-1.5 text-sm text-green-600"><CheckCircle2 size={14} /> Dados salvos com sucesso!</p>
            )}
            <Button type="submit" disabled={profileStatus === 'saving'}>
              <Save size={15} />
              {profileStatus === 'saving' ? 'Salvando…' : 'Salvar dados'}
            </Button>
          </form>
        </CardBody>
      </Card>

      {/* Alterar senha */}
      <Card>
        <CardHeader><CardTitle>Alterar senha</CardTitle></CardHeader>
        <CardBody>
          <form onSubmit={handlePasswordSave} className="space-y-4">
            <div>
              <Label htmlFor="new-password">Nova senha</Label>
              <Input
                id="new-password" type="password" autoComplete="new-password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                onFocus={() => setPwdFocus(true)}
                placeholder="Crie uma senha segura"
              />
              {(pwdFocus || newPassword.length > 0) && (
                <ul className="mt-2 space-y-1">
                  {PWD_RULES.map(rule => {
                    const ok = rule.test(newPassword)
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
            <div>
              <Label htmlFor="confirm-password">Confirmar nova senha</Label>
              <Input
                id="confirm-password" type="password" autoComplete="new-password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Repita a nova senha"
              />
            </div>
            {pwdError && (
              <p className="flex items-center gap-1.5 text-sm text-red-600"><AlertCircle size={14} /> {pwdError}</p>
            )}
            {pwdStatus === 'saved' && (
              <p className="flex items-center gap-1.5 text-sm text-green-600"><CheckCircle2 size={14} /> Senha alterada com sucesso!</p>
            )}
            <Button
              type="submit"
              disabled={pwdStatus === 'saving' || !passwordValid(newPassword) || newPassword !== confirmPassword}
            >
              <Save size={15} />
              {pwdStatus === 'saving' ? 'Salvando…' : 'Alterar senha'}
            </Button>
          </form>
        </CardBody>
      </Card>

    </div>
  )
}
