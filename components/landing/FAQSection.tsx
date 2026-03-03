const FAQS = [
  {
    q: 'É fácil usar pelo celular?',
    a: 'Sim. O Qualea Tech foi projetado mobile-first — a interface é otimizada para celular, sem precisar instalar nenhum aplicativo. Basta acessar pelo navegador do seu smartphone diretamente do viveiro.',
  },
  {
    q: 'O cancelamento é difícil?',
    a: 'Não. Você cancela com um clique nas configurações da sua conta, a qualquer momento, sem burocracia e sem precisar ligar para ninguém. Nenhuma multa ou fidelidade.',
  },
  {
    q: 'Meus dados ficam seguros?',
    a: 'Seus dados ficam armazenados em servidores seguros com backup automático diário. Você nunca vai perder o histórico do seu criatório — mesmo que quebre o celular ou troque de aparelho.',
  },
  {
    q: 'Posso cadastrar aves de espécies diferentes?',
    a: 'Sim. O sistema suporta qualquer espécie de psitacídeo. Você mesmo cadastra as espécies que cria — Ringneck, Alexandrina, Periquito Australiano, Calopsita e qualquer outra.',
  },
  {
    q: 'E se eu precisar de ajuda?',
    a: 'Nosso suporte é em português, por WhatsApp e e-mail. Respondemos em até 24 horas nos dias úteis. Você também tem acesso a tutoriais e vídeos de onboarding.',
  },
]

export function FAQSection() {
  return (
    <section id="faq" className="py-20 md:py-28" style={{ background: '#f4f8fb' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
            style={{ background: '#edfbfd', color: '#2087a0', border: '1px solid #9de8f2' }}
          >
            Dúvidas frequentes
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: '#1D2D44' }}>
            Perguntas frequentes
          </h2>
        </div>

        {/* Acordeão */}
        <div className="space-y-3">
          {FAQS.map(({ q, a }) => (
            <details
              key={q}
              className="group rounded-2xl bg-white border border-[#c8d9e6] overflow-hidden open:shadow-md transition-shadow"
            >
              <summary
                className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer select-none list-none font-semibold text-[#1D2D44] hover:text-[#48C0D8] transition-colors"
                style={{ fontSize: '15px' }}
              >
                {q}
                {/* Ícone + / × */}
                <span
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-lg font-light transition-transform group-open:rotate-45"
                  style={{ background: '#edfbfd', color: '#48C0D8' }}
                >
                  +
                </span>
              </summary>
              <div className="px-6 pb-5">
                <p className="text-sm text-[#4a6580] leading-relaxed border-t border-[#c8d9e6] pt-4">
                  {a}
                </p>
              </div>
            </details>
          ))}
        </div>

      </div>
    </section>
  )
}
