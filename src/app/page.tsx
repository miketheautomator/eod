import Section from '@/components/Section'
import Hero from '@/components/Hero'
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

      {/* Booking Section */}
      <Section id="booking" background="dark">
        <BookingSection />
      </Section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
