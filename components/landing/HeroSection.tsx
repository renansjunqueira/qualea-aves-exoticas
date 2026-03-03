import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Star } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">

      {/* Fundo gradiente sutil */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: 'linear-gradient(160deg, #edfbfd 0%, #ffffff 45%, #f4f8fb 100%)',
        }}
      />
      {/* Blob decorativo superior direito */}
      <div
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full -z-10 opacity-30"
        style={{ background: 'radial-gradient(circle, #48C0D8 0%, transparent 70%)' }}
      />
      {/* Blob decorativo inferior esquerdo */}
      <div
        className="absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full -z-10 opacity-20"
        style={{ background: 'radial-gradient(circle, #ADC1D6 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* ── Coluna de texto ── */}
          <div className="flex-1 text-center lg:text-left">

            {/* Badge social proof */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{ background: '#edfbfd', color: '#2087a0', border: '1px solid #9de8f2' }}>
              <span className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={10} fill="#48C0D8" className="text-[#48C0D8]" />
                ))}
              </span>
              Usado por criadores em todo o Brasil
            </div>

            {/* Título principal */}
            <h1
              className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold leading-[1.1] tracking-tight mb-5"
              style={{ color: '#1D2D44' }}
            >
              Chega de caderno.{' '}
              <span style={{ color: '#48C0D8' }}>
                Seu plantel merece tecnologia.
              </span>
            </h1>

            {/* Subtítulo com dores */}
            <p className="text-lg text-[#4a6580] leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              Controle genético de casais, acompanhamento de ninhadas, histórico completo de cada ave —
              tudo em um sistema que cabe no bolso. Nunca mais perca uma data de eclosão ou arrisque
              consanguinidade no seu criatório.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <Link
                href="/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-bold text-white shadow-lg shadow-red-200 transition-all hover:opacity-90 hover:-translate-y-0.5 active:scale-95"
                style={{ background: '#E63946' }}
              >
                Começar grátis por 7 dias
                <ArrowRight size={17} />
              </Link>
              <a
                href="#recursos"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold border-2 transition-all hover:bg-[#edfbfd]"
                style={{ borderColor: '#48C0D8', color: '#1D2D44' }}
              >
                Ver recursos
              </a>
            </div>

            {/* Micro-credenciais */}
            <p className="mt-5 text-sm text-[#7a96b0]">
              Sem cartão de crédito · Cancele quando quiser · Suporte em português
            </p>
          </div>

          {/* ── Mockup ── */}
          <div className="flex-1 w-full max-w-md lg:max-w-none">
            <div
              className="relative mx-auto w-full max-w-sm lg:max-w-full rounded-[28px] overflow-hidden shadow-2xl"
              style={{
                background: 'linear-gradient(145deg, #1D2D44 0%, #152235 100%)',
                aspectRatio: '9 / 16',
                maxHeight: '560px',
              }}
            >
              {/* Status bar simulada */}
              <div className="flex justify-between items-center px-5 pt-4 pb-2">
                <span className="text-xs text-white/50 font-medium">9:41</span>
                <div className="flex gap-1.5 items-center">
                  <div className="w-1 h-1 bg-white/40 rounded-full" />
                  <div className="w-1 h-1 bg-white/40 rounded-full" />
                  <div className="w-1 h-1 bg-white/40 rounded-full" />
                </div>
              </div>

              {/* Header do app simulado */}
              <div className="flex items-center gap-2 px-4 pb-3 border-b border-white/10">
                <div className="relative w-7 h-7">
                  <Image src="/logo-final.svg" alt="Qualea" fill className="object-contain" />
                </div>
                <span className="text-white font-semibold text-sm">Qualea<span style={{ color: '#48C0D8' }}>Tech</span></span>
              </div>

              {/* Conteúdo mockup */}
              <div className="px-4 py-4 space-y-3">
                {/* Boas-vindas */}
                <div className="rounded-xl p-3" style={{ background: 'rgba(72,192,216,0.12)', border: '1px solid rgba(72,192,216,0.2)' }}>
                  <p className="text-white/60 text-[11px]">Bem-vindo de volta</p>
                  <p className="text-white font-bold text-sm">Seu plantel hoje</p>
                </div>

                {/* Stats cards */}
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Aves', value: '47', color: '#48C0D8' },
                    { label: 'Casais', value: '12', color: '#ADC1D6' },
                    { label: 'Ninhadas', value: '5', color: '#48C0D8' },
                    { label: 'Filhotes', value: '18', color: '#E63946' },
                  ].map(s => (
                    <div key={s.label} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <p className="text-white/50 text-[10px] mb-0.5">{s.label}</p>
                      <p className="font-extrabold text-lg" style={{ color: s.color }}>{s.value}</p>
                    </div>
                  ))}
                </div>

                {/* Lista de aves */}
                <div className="rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <p className="text-white/50 text-[10px] font-semibold uppercase tracking-wider px-3 pt-2.5 pb-1.5">Plantel recente</p>
                  {[
                    { ring: 'A-0042', species: 'Alexandrina Opalina', sex: 'M' },
                    { ring: 'A-0041', species: 'Ringneck Cleartail',   sex: 'F' },
                    { ring: 'A-0039', species: 'Alexandrina Lutino',   sex: 'M' },
                  ].map(b => (
                    <div key={b.ring} className="flex items-center gap-2.5 px-3 py-2 border-t border-white/5">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{ background: b.sex === 'M' ? 'rgba(72,192,216,0.2)' : 'rgba(230,57,70,0.2)', color: b.sex === 'M' ? '#48C0D8' : '#E63946' }}>
                        {b.sex}
                      </div>
                      <div className="min-w-0">
                        <p className="text-white text-xs font-semibold truncate">{b.ring}</p>
                        <p className="text-white/40 text-[10px] truncate">{b.species}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reflexo/brilho no topo */}
              <div
                className="absolute top-0 inset-x-0 h-32 pointer-events-none"
                style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%)' }}
              />
            </div>

            {/* Sombra flutuante */}
            <div
              className="mx-auto mt-2 w-48 h-5 rounded-full blur-xl opacity-30"
              style={{ background: '#48C0D8' }}
            />
          </div>

        </div>
      </div>
    </section>
  )
}
