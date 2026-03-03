'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export function LandingHeader() {
  const [scrolled,   setScrolled]   = useState(false)
  const [menuOpen,   setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="relative w-9 h-9 flex-shrink-0">
            <Image src="/logo-final.svg" alt="Qualea Tech" fill className="object-contain" />
          </div>
          <span
            className="font-bold text-[#1D2D44] text-lg tracking-tight"
            style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
          >
            Qualea<span style={{ color: '#48C0D8' }}>Tech</span>
          </span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#1D2D44]/70">
          <a href="#recursos" className="hover:text-[#48C0D8] transition-colors">Recursos</a>
          <a href="#beneficios" className="hover:text-[#48C0D8] transition-colors">Benefícios</a>
          <a href="#preco" className="hover:text-[#48C0D8] transition-colors">Preço</a>
        </nav>

        {/* CTAs desktop */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-semibold text-[#1D2D44] hover:text-[#48C0D8] transition-colors"
          >
            Entrar
          </Link>
          <Link
            href="/signup"
            className="px-5 py-2 text-sm font-bold rounded-xl text-white transition-all hover:opacity-90 active:scale-95"
            style={{ background: '#E63946' }}
          >
            Começar Agora
          </Link>
        </div>

        {/* Hamburger mobile */}
        <button
          className="md:hidden p-2 rounded-lg text-[#1D2D44] hover:bg-[#1D2D44]/5 transition-colors"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#c8d9e6] px-4 py-4 flex flex-col gap-4 shadow-lg">
          <nav className="flex flex-col gap-3 text-sm font-medium text-[#1D2D44]/70">
            <a href="#recursos" onClick={() => setMenuOpen(false)} className="hover:text-[#48C0D8]">Recursos</a>
            <a href="#beneficios" onClick={() => setMenuOpen(false)} className="hover:text-[#48C0D8]">Benefícios</a>
            <a href="#preco" onClick={() => setMenuOpen(false)} className="hover:text-[#48C0D8]">Preço</a>
          </nav>
          <div className="flex flex-col gap-2 pt-2 border-t border-[#c8d9e6]">
            <Link href="/login" className="text-center py-2.5 text-sm font-semibold text-[#1D2D44] border border-[#c8d9e6] rounded-xl">
              Entrar
            </Link>
            <Link
              href="/signup"
              className="text-center py-2.5 text-sm font-bold text-white rounded-xl"
              style={{ background: '#E63946' }}
            >
              Começar Agora
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
