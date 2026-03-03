import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Bird, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center p-8 text-center gap-5 min-h-[60vh]">
      <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center">
        <Bird size={36} className="text-primary-600" strokeWidth={1.5} />
      </div>
      <div>
        <h1 className="text-4xl font-bold text-gray-900">404</h1>
        <p className="text-lg font-semibold text-gray-700 mt-1">Página não encontrada</p>
        <p className="text-sm text-muted mt-2 max-w-xs mx-auto">
          Esta ave voou para longe. A página que você procura não existe.
        </p>
      </div>
      <Link href="/">
        <Button><ArrowLeft size={15} /> Voltar ao Dashboard</Button>
      </Link>
    </div>
  )
}
