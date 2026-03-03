'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { LayoutDashboard, Bird, Heart, Egg, BookOpen } from 'lucide-react'

const NAV = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/birds',    label: 'Plantel',   icon: Bird },
  { href: '/pairs',    label: 'Casais',    icon: Heart },
  { href: '/clutches', label: 'Ninhadas',  icon: Egg },
  { href: '/species',  label: 'Espécies',  icon: BookOpen },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-border flex items-center safe-area-inset-bottom">
      {NAV.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || pathname.startsWith(href + '/')
        return (
          <Link key={href} href={href} className={cn('bottom-nav-item', active && 'active')}>
            <Icon size={22} strokeWidth={active ? 2.2 : 1.6} />
            <span>{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
