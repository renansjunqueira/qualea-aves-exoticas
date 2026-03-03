import Image   from 'next/image'
import { Button } from '@/components/ui/button'
import { Ban }    from 'lucide-react'
import { signOut } from '@/lib/actions/auth'

export const metadata = { title: 'Conta suspensa' }

export default function SuspendedPage() {
  return (
    <div className="w-full max-w-sm text-center">
      <div className="flex flex-col items-center gap-4 mb-6">
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-primary-200">
          <Image src="/logo-final.svg" alt="Qualea Tech" fill className="object-contain" />
        </div>
        <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
          <Ban size={28} className="text-red-600" />
        </div>
      </div>

      <div className="bg-card border border-border rounded-[var(--radius-lg)] p-6 shadow-sm space-y-3">
        <h1 className="text-lg font-bold text-gray-900">Conta suspensa</h1>
        <p className="text-sm text-muted leading-relaxed">
          O acesso a esta conta foi suspenso. Entre em contato com o administrador para mais informações.
        </p>
      </div>

      <form action={signOut} className="mt-4">
        <Button type="submit" variant="secondary" className="w-full">
          Sair
        </Button>
      </form>
    </div>
  )
}
