'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Input }  from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label }  from '@/components/ui/label'
import { AlertCircle, UserPlus } from 'lucide-react'
import { signUp } from '@/lib/actions/auth'

export default function SignupPage() {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres')
      return
    }
    setLoading(true)
    const result = await signUp(email, password)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-sm">
      {/* Logo */}
      <div className="flex flex-col items-center gap-3 mb-8">
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-primary-200">
          <Image src="/logo.jpg" alt="Qualea" fill className="object-cover" />
        </div>
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-900">Qualea Aves Exóticas</h1>
          <p className="text-sm text-muted">Crie sua conta</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-[var(--radius-lg)] p-6 space-y-4 shadow-sm">
        <div>
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="seu@email.com"
          />
        </div>

        <div>
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Mínimo 6 caracteres"
          />
        </div>

        {error && (
          <p className="flex items-center gap-1.5 text-sm text-red-600">
            <AlertCircle size={14} /> {error}
          </p>
        )}

        <Button type="submit" disabled={loading} className="w-full">
          <UserPlus size={15} />
          {loading ? 'Criando conta…' : 'Criar conta'}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-muted">
        Já tem conta?{' '}
        <Link href="/login" className="text-primary-600 font-semibold hover:underline">
          Entrar
        </Link>
      </p>
    </div>
  )
}
