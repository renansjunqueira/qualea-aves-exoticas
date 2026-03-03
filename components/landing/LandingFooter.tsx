import Image from 'next/image'
import Link from 'next/link'
import { Mail, MessageCircle, ShieldCheck, Lock } from 'lucide-react'

export function LandingFooter() {
  return (
    <footer style={{ background: '#1D2D44' }}>

      {/* CTA banner final */}
      <div
        className="border-b"
        style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'linear-gradient(135deg, #152235 0%, #1D2D44 100%)' }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 tracking-tight">
            Pronto para transformar seu criatório?
          </h2>
          <p className="text-[#ADC1D6] mb-7 text-base">
            Junte-se a criadores que já deixaram o caderno para trás.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-bold text-white transition-all hover:opacity-90 hover:-translate-y-0.5 active:scale-95"
            style={{ background: '#E63946' }}
          >
            Começar 7 dias grátis — R$ 0,00
          </Link>
          <p className="text-[#ADC1D6]/60 text-xs mt-3">Sem cartão de crédito · Cancele quando quiser</p>
        </div>
      </div>

      {/* Links do footer */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

          {/* Logo + tagline */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 flex-shrink-0">
                <Image src="/logo-final.svg" alt="Qualea Tech" fill className="object-contain" />
              </div>
              <span className="font-bold text-white text-base tracking-tight">
                Qualea<span style={{ color: '#48C0D8' }}>Tech</span>
              </span>
            </div>
            <p className="text-[#ADC1D6]/70 text-xs max-w-[200px] leading-relaxed">
              Gestão inteligente para criatórios de psitacídeos.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-[#ADC1D6]/70">
            <a href="#recursos" className="hover:text-white transition-colors">Recursos</a>
            <a href="#preco" className="hover:text-white transition-colors">Preço</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <Link href="/login" className="hover:text-white transition-colors">Entrar</Link>
            <Link href="/signup" className="hover:text-white transition-colors">Criar conta</Link>
          </div>

          {/* Contato */}
          <div className="flex flex-col gap-2 text-sm text-[#ADC1D6]/70">
            <a href="mailto:contato@qualeatech.com.br" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail size={14} /> contato@qualeatech.com.br
            </a>
            <a href="https://wa.me/5511999999999" className="flex items-center gap-2 hover:text-white transition-colors">
              <MessageCircle size={14} /> WhatsApp
            </a>
          </div>
        </div>

        {/* Divisor */}
        <div className="border-t mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <p className="text-xs text-[#ADC1D6]/40">
            © {new Date().getFullYear()} Qualea Tech. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4 text-xs text-[#ADC1D6]/40">
            <span className="flex items-center gap-1"><Lock size={10} /> Dados criptografados</span>
            <span className="flex items-center gap-1"><ShieldCheck size={10} /> Backup automático</span>
          </div>
        </div>
      </div>

    </footer>
  )
}
