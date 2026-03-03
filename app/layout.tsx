import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Sidebar }   from '@/components/layout/Sidebar'
import { BottomNav } from '@/components/layout/BottomNav'
import { createClient } from '@/lib/supabase/server'
import { getProfile }   from '@/lib/queries/users'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: { default: 'Qualea Aves Exóticas', template: '%s · Qualea' },
  description: 'Sistema de gestão de plantel de psitacídeos — Qualea Aves Exóticas · Guará/SP',
  manifest: '/manifest.json',
  icons: { icon: '/logo.jpg' },
}

export const viewport: Viewport = {
  themeColor: '#1c5e40',
  width: 'device-width',
  initialScale: 1,
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const profile  = user ? await getProfile(user.id) : null
  const isAdmin  = profile?.role === 'admin'

  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="font-sans antialiased bg-surface min-h-screen" suppressHydrationWarning>
        <Sidebar userEmail={user?.email} isAdmin={isAdmin} />
        {/* Conteúdo principal com offset da sidebar */}
        <div className="lg:pl-60 min-h-screen flex flex-col">
          {children}
          {/* Espaço para o BottomNav no mobile */}
          <div className="h-16 lg:hidden flex-shrink-0" aria-hidden />
        </div>
        <BottomNav />
      </body>
    </html>
  )
}
