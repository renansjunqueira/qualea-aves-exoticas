'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Menu } from 'lucide-react'

interface HeaderProps {
  title: string
  actions?: React.ReactNode
}

export function Header({ title, actions }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-border px-4 lg:px-6 h-14 flex items-center gap-3">
      {/* Logo visível só no mobile */}
      <div className="lg:hidden flex items-center gap-2 flex-1 min-w-0">
        <div className="relative w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
          <Image src="/logo-misto.png" alt="Qualea Tech" fill className="object-contain" />
        </div>
        <span className="font-bold text-primary-800 text-sm truncate">{title}</span>
      </div>

      {/* Título só no desktop */}
      <h1 className="hidden lg:block text-base font-semibold text-gray-800 flex-1">{title}</h1>

      {/* Ações */}
      {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
    </header>
  )
}
