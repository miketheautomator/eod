import Section from '@/components/Section'
import Hero from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import BookingSection from '@/components/BookingSection'
import EarlyAccess from '@/components/EarlyAccess'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <Section id="hero" background="gradient">
        <Hero />
      </Section>

      {/* How It Works Section */}
      <Section id="how-it-works" background="darker">
        <HowItWorks />
      </Section>

      {/* Booking Section */}
      <Section id="booking" background="dark">
        <BookingSection />
      </Section>

      {/* Early Access Section */}
      <Section id="early-access" background="gradient">
        <EarlyAccess />
      </Section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
