'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard, Bird, Heart, Egg, BookOpen, Settings,
} from 'lucide-react'

const NAV = [
  { href: '/',          label: 'Dashboard',  icon: LayoutDashboard },
  { href: '/birds',     label: 'Plantel',    icon: Bird },
  { href: '/pairs',     label: 'Casais',     icon: Heart },
  { href: '/clutches',  label: 'Ninhadas',   icon: Egg },
  { href: '/species',   label: 'Espécies',   icon: BookOpen },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex flex-col fixed inset-y-0 left-0 w-60 z-40" style={{ background: 'var(--color-primary-800)' }}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5" style={{ background: 'var(--color-primary-900)' }}>
        <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-white/20 flex-shrink-0">
          <Image src="/logo.jpg" alt="Qualea" fill className="object-cover" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-white font-bold text-[15px] leading-tight">Qualea</span>
          <span className="text-xs leading-tight" style={{ color: 'var(--color-primary-300)' }}>
            Aves Exóticas
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="text-[10px] font-semibold uppercase tracking-widest px-3 pb-2" style={{ color: 'var(--color-primary-400)' }}>
          Menu
        </p>
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== '/' && pathname.startsWith(href))
          return (
            <Link key={href} href={href} className={cn('nav-link', active && 'active')}>
              <Icon size={17} strokeWidth={active ? 2.2 : 1.8} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <Link href="/settings" className="nav-link">
          <Settings size={17} strokeWidth={1.8} />
          Configurações
        </Link>
        <p className="text-[10px] px-3 pt-3" style={{ color: 'var(--color-primary-500)' }}>
          HELINHO · GUARÁ/SP
        </p>
      </div>
    </aside>
  )
}
