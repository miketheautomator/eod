import ScrollSnapWrapper from '@/components/ScrollSnapWrapper'
import Section from '@/components/Section'
import Hero from '@/components/Hero'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <ScrollSnapWrapper>
      {/* Hero Section */}
      <Section id="hero" background="gradient">
        <Hero />
      </Section>

      {/* CTA Section */}
      <Section background="dark">
        <CTASection />
      </Section>

      {/* Footer */}
      <Section background="darker">
        <Footer />
      </Section>
    </ScrollSnapWrapper>
  )
}
