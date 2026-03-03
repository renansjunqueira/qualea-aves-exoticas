import Link from 'next/link'
import { Check, ArrowRight, Zap, Clock, TrendingUp, ChevronRight } from 'lucide-react'

const PLAN_STARTER = [
  'Aves, casais e ninhadas ilimitados',
  'Dashboard com indicadores em tempo real',
  'Controle genético e alerta de consanguinidade',
  'Alertas de datas de eclosão',
  'Backup automático na nuvem',
  'Acesso em celular, tablet e computador',
  'Suporte em português',
  'Atualizações constantes incluídas',
]

const PLAN_BUSINESS_ROADMAP = [
  { label: 'Tudo do Plano Criador', included: true },
  { label: 'Plano de negócios do criatório', included: false },
  { label: 'Previsão de faturamento e lucratividade', included: false },
  { label: 'Relatórios financeiros avançados', included: false },
  { label: 'Dicas de manejo personalizadas por IA', included: false },
  { label: 'Análise de mercado para venda de filhotes', included: false },
  { label: 'Painel de metas e resultados anuais', included: false },
  { label: 'Suporte prioritário dedicado', included: false },
  { label: 'Acesso antecipado a novas funcionalidades', included: false },
]

export function PricingSection() {
  return (
    <section id="preco" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Cabeçalho */}
        <div className="text-center mb-6">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
            style={{ background: '#edfbfd', color: '#2087a0', border: '1px solid #9de8f2' }}
          >
            Preço
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4" style={{ color: '#1D2D44' }}>
            Invista no crescimento do seu criatório
          </h2>
          <p className="text-lg text-[#4a6580] max-w-xl mx-auto">
            Planos com desconto de lançamento. Garanta o seu antes que os preços normais voltem.
          </p>
        </div>

        {/* Banner de desconto */}
        <div
          className="max-w-2xl mx-auto mb-10 rounded-2xl px-5 py-3 flex items-center justify-center gap-2 text-sm font-semibold"
          style={{ background: 'linear-gradient(90deg, #fff7ed, #fff0f1)', border: '1px solid #fcd9d9', color: '#c42b38' }}
        >
          <Zap size={14} fill="#E63946" className="text-[#E63946] flex-shrink-0" />
          Preços promocionais de lançamento — economize até 83% enquanto durar
        </div>

        {/* Grid de cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">

          {/* ── Plano Criador ── */}
          <div
            className="relative rounded-3xl overflow-hidden shadow-xl flex flex-col"
            style={{ background: 'linear-gradient(145deg, #1D2D44 0%, #152235 100%)' }}
          >
            {/* Badge */}
            <div className="absolute top-5 right-5">
              <span
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold"
                style={{ background: '#E63946', color: '#fff' }}
              >
                <Zap size={10} fill="white" /> Mais popular
              </span>
            </div>

            <div className="p-7 flex flex-col flex-1">
              <p className="text-[#48C0D8] font-bold text-xs uppercase tracking-widest mb-5">
                Plano Criador
              </p>

              {/* Preço riscado */}
              <p className="text-white/40 text-sm line-through mb-1">R$ 119,90 / mês</p>

              {/* Preço atual */}
              <div className="flex items-end gap-1.5 mb-2">
                <span className="text-white/60 text-base font-semibold">R$</span>
                <span className="text-white font-extrabold" style={{ fontSize: '3.5rem', lineHeight: 1 }}>
                  19
                </span>
                <span className="text-white/60 text-xl font-semibold mb-1">,90</span>
                <span className="text-white/50 text-sm mb-2">/ mês</span>
              </div>

              {/* Desconto */}
              <span
                className="inline-block px-2 py-0.5 rounded-full text-xs font-bold mb-4 w-fit"
                style={{ background: 'rgba(72,192,216,0.15)', color: '#48C0D8' }}
              >
                83% de desconto no lançamento
              </span>

              <p className="text-[#ADC1D6] text-sm mb-5 leading-snug">
                Mais barato que um pacote de ração premium —{' '}
                <span className="text-white font-semibold">e transforma o seu criatório.</span>
              </p>

              <div className="border-t border-white/10 mb-5" />

              <ul className="space-y-2.5 mb-7 flex-1">
                {PLAN_STARTER.map(b => (
                  <li key={b} className="flex items-start gap-3 text-sm text-white/80">
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                      style={{ background: 'rgba(72,192,216,0.2)' }}
                    >
                      <Check size={11} className="text-[#48C0D8]" strokeWidth={3} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              <Link
                href="/signup"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 hover:-translate-y-0.5 active:scale-95"
                style={{ background: '#E63946', boxShadow: '0 8px 24px rgba(230,57,70,0.35)' }}
              >
                Começar 7 dias grátis
                <ArrowRight size={16} />
              </Link>

              <p className="text-center text-white/30 text-xs mt-3">
                Sem cartão de crédito · Cancele quando quiser
              </p>
            </div>
          </div>

          {/* ── Plano Business (Roadmap) ── */}
          <div
            className="relative rounded-3xl overflow-hidden shadow-xl flex flex-col border-2"
            style={{
              background: 'linear-gradient(145deg, #0d1520 0%, #0a1018 100%)',
              borderColor: 'rgba(255,215,0,0.25)',
            }}
          >
            {/* Badge Em Breve */}
            <div className="absolute top-5 right-5">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                style={{ background: 'rgba(255,215,0,0.1)', color: '#fbbf24', border: '1px solid rgba(255,215,0,0.3)' }}
              >
                <Clock size={10} /> Em breve
              </span>
            </div>

            {/* Faixa de brilho dourada */}
            <div
              className="absolute top-0 inset-x-0 h-0.5"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.6), transparent)' }}
            />

            <div className="p-7 flex flex-col flex-1">
              <p
                className="font-bold text-xs uppercase tracking-widest mb-5"
                style={{ color: '#fbbf24' }}
              >
                Plano Business
              </p>

              {/* Preço riscado */}
              <p className="text-white/40 text-sm line-through mb-1">R$ 499,00 / mês</p>

              {/* Preço atual */}
              <div className="flex items-end gap-1.5 mb-2">
                <span className="text-white/60 text-base font-semibold">R$</span>
                <span className="text-white font-extrabold" style={{ fontSize: '3.5rem', lineHeight: 1 }}>
                  199
                </span>
                <span className="text-white/60 text-xl font-semibold mb-1">,00</span>
                <span className="text-white/50 text-sm mb-2">/ mês</span>
              </div>

              {/* Desconto */}
              <span
                className="inline-block px-2 py-0.5 rounded-full text-xs font-bold mb-4 w-fit"
                style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.2)' }}
              >
                60% de desconto no lançamento
              </span>

              <p className="text-white/50 text-sm mb-5 leading-snug">
                Para quem quer transformar o criatório em{' '}
                <span className="text-white font-semibold">um negócio lucrativo e escalável.</span>
              </p>

              <div className="border-t mb-5" style={{ borderColor: 'rgba(255,215,0,0.1)' }} />

              <ul className="space-y-2.5 mb-7 flex-1">
                {PLAN_BUSINESS_ROADMAP.map(({ label, included }) => (
                  <li key={label} className="flex items-start gap-3 text-sm">
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                      style={{
                        background: included ? 'rgba(72,192,216,0.2)' : 'rgba(251,191,36,0.1)',
                      }}
                    >
                      {included
                        ? <Check size={11} className="text-[#48C0D8]" strokeWidth={3} />
                        : <TrendingUp size={10} style={{ color: '#fbbf24' }} strokeWidth={2.5} />
                      }
                    </span>
                    <span className={included ? 'text-white/80' : 'text-white/60'}>
                      {label}
                      {!included && (
                        <span
                          className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded-md"
                          style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24' }}
                        >
                          em breve
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA de captura de lead */}
              <a
                href="https://wa.me/5511941996923?text=Ol%C3%A1!%20Tenho%20interesse%20no%20Plano%20Business%20da%20Qualea%20Tech."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold transition-all hover:opacity-90 hover:-translate-y-0.5 active:scale-95 border"
                style={{
                  background: 'rgba(251,191,36,0.08)',
                  borderColor: 'rgba(251,191,36,0.35)',
                  color: '#fbbf24',
                }}
              >
                Quero acesso antecipado
                <ChevronRight size={16} />
              </a>

              <p className="text-center text-white/30 text-xs mt-3">
                Nossa equipe vai entrar em contato com você
              </p>
            </div>
          </div>

        </div>

        {/* Garantia */}
        <p className="text-center text-sm text-[#4a6580] mt-8">
          Plano Criador: 7 dias de teste. Não está satisfeito? Devolvemos o valor integral, sem perguntas.
        </p>

      </div>
    </section>
  )
}
