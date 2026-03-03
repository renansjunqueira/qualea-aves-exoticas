import { LandingHeader }   from '@/components/landing/LandingHeader'
import { HeroSection }     from '@/components/landing/HeroSection'
import { FeaturesSection } from '@/components/landing/FeaturesSection'
import { PricingSection }  from '@/components/landing/PricingSection'
import { FAQSection }      from '@/components/landing/FAQSection'
import { LandingFooter }   from '@/components/landing/LandingFooter'

export const metadata = {
  title: 'Qualea Tech — Sistema de Gestão para Criatórios de Aves Exóticas',
  description:
    'Controle genético, acompanhamento de ninhadas, plantel completo e dashboard em tempo real. O sistema que os maiores criadores de psitacídeos do Brasil usam. R$ 19,90/mês.',
}

export default function LandingPage() {
  return (
    <>
      <LandingHeader />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <FAQSection />
      <LandingFooter />
    </>
  )
}
