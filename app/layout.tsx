import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: { default: 'Qualea Tech', template: '%s · Qualea Tech' },
  description: 'Sistema de gestão de plantel de psitacídeos — Qualea Tech',
  manifest: '/manifest.json',
  icons: { icon: '/logo-final.svg' },
}

export const viewport: Viewport = {
  themeColor: '#1D2D44',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="font-sans antialiased min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
