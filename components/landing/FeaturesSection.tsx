import { Bird, Heart, Egg, LayoutDashboard, ShieldCheck, Smartphone } from 'lucide-react'

const FEATURES = [
  {
    icon: Bird,
    color: '#48C0D8',
    bg: '#edfbfd',
    title: 'Gestão Completa de Plantel',
    description:
      'Cadastre cada ave com anel, espécie, mutação, sexo, fotos e histórico de saúde. Tudo em um lugar, acessível de qualquer dispositivo.',
  },
  {
    icon: Heart,
    color: '#E63946',
    bg: '#fff0f1',
    title: 'Controle Genético de Casais',
    description:
      'Monte casais com segurança. O sistema cruza a genealogia e te avisa antes de qualquer risco de consanguinidade no criatório.',
  },
  {
    icon: Egg,
    color: '#f59e0b',
    bg: '#fffbeb',
    title: 'Acompanhamento de Ninhadas',
    description:
      'Registre postura, acompanhe a incubação e nunca mais esqueça uma data de eclosão. Receba alertas na palma da mão.',
  },
  {
    icon: LayoutDashboard,
    color: '#48C0D8',
    bg: '#edfbfd',
    title: 'Dashboard em Tempo Real',
    description:
      'Visualize de relance o estado do criatório: aves ativas, casais formados, filhotes da temporada e ninhadas em andamento.',
  },
  {
    icon: ShieldCheck,
    color: '#10b981',
    bg: '#ecfdf5',
    title: 'Dados Seguros e com Backup',
    description:
      'Sua informação fica na nuvem com backup automático. Sem risco de perder o histórico de anos de trabalho em um disco rígido.',
  },
  {
    icon: Smartphone,
    color: '#8b5cf6',
    bg: '#f5f3ff',
    title: 'Feito para o Celular',
    description:
      'Use direto do viveiro, pelo celular, sem instalar nada. Interface pensada para dedos e telas pequenas, sem complicação.',
  },
]

export function FeaturesSection() {
  return (
    <section id="recursos" className="py-20 md:py-28" style={{ background: '#f4f8fb' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Cabeçalho */}
        <div className="text-center mb-14">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
            style={{ background: '#edfbfd', color: '#2087a0', border: '1px solid #9de8f2' }}
          >
            Recursos
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4" style={{ color: '#1D2D44' }}>
            Tudo que o seu criatório precisa,{' '}
            <span style={{ color: '#48C0D8' }}>em um só lugar</span>
          </h2>
          <p className="text-lg text-[#4a6580] max-w-2xl mx-auto">
            Chega de planilha do Excel e caderno de anotações. O Qualea Tech foi construído do zero
            para criadores de psitacídeos — cada funcionalidade pensada no dia a dia do viveiro.
          </p>
        </div>

        {/* Grid de features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(({ icon: Icon, color, bg, title, description }) => (
            <div
              key={title}
              className="group rounded-2xl p-6 bg-white border border-[#c8d9e6] hover:border-[#48C0D8] hover:shadow-lg transition-all duration-200"
            >
              <div
                className="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-4"
                style={{ background: bg }}
              >
                <Icon size={22} style={{ color }} strokeWidth={2} />
              </div>
              <h3 className="font-bold text-base mb-2" style={{ color: '#1D2D44' }}>{title}</h3>
              <p className="text-sm text-[#4a6580] leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
