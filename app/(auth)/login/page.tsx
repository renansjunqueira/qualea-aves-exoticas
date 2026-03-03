'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Input }  from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label }  from '@/components/ui/label'
import { AlertCircle, LogIn } from 'lucide-react'
import { signIn } from '@/lib/actions/auth'

export default function LoginPage() {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const result = await signIn(email, password)
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
          <Image src="/logo-final.svg" alt="Qualea Tech" fill className="object-contain" />
        </div>
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-900">Qualea Tech</h1>
          <p className="text-sm text-muted">Acesse sua conta</p>
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
            autoComplete="current-password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        {error && (
          <p className="flex items-center gap-1.5 text-sm text-red-600">
            <AlertCircle size={14} /> {error}
          </p>
        )}

        <Button type="submit" disabled={loading} className="w-full">
          <LogIn size={15} />
          {loading ? 'Entrando…' : 'Entrar'}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-muted">
        Não tem conta?{' '}
        <Link href="/signup" className="text-primary-600 font-semibold hover:underline">
          Criar conta
        </Link>
      </p>
    </div>
  )
}
