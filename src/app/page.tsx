import ScrollSnapWrapper from '@/components/ScrollSnapWrapper'
import Section from '@/components/Section'
import Hero from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import BookingSection from '@/components/BookingSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <ScrollSnapWrapper>
      {/* Section 1: Hero */}
      <Section id="hero" background="gradient">
        <Hero />
      </Section>

      {/* Section 2: Positioning */}
      <Section background="darker">
        <HowItWorks />
      </Section>

      {/* Section 3: Hire an engineer per minute */}
      <Section background="dark">
        <BookingSection />
      </Section>

      {/* Section 4: Footer */}
      <Section background="darker">
        <Footer />
      </Section>
    </ScrollSnapWrapper>
  )
}
