'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { QrCode, MapPin, Calendar, CheckCircle } from 'lucide-react'

const steps = [
  {
    icon: QrCode,
    title: "Scan the QR Code",
    description: "Find our engineers wearing branded hoodies in co-working spaces. Scan the QR code on their shirt or table card.",
    color: "blue"
  },
  {
    icon: MapPin,
    title: "Check Location",
    description: "We automatically detect your location to show only engineers within 50 miles of you.",
    color: "purple"
  },
  {
    icon: Calendar,
    title: "Book Instantly",
    description: "Choose your engineer, pick a time slot, and book your session. No contracts, no long-term commitments.",
    color: "green"
  },
  {
    icon: CheckCircle,
    title: "Get Solutions",
    description: "Work directly with expert engineers who can solve problems, build features, or provide technical guidance.",
    color: "orange"
  }
]

export default function HowItWorks() {
  return (
    <div className="text-center text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <h2 className="text-4xl sm:text-5xl font-bold mb-6">
          How It <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Works</span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Get expert engineering help in minutes, not weeks. Our engineers are embedded in co-working spaces, ready to help.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {steps.map((step, index) => {
          const Icon = step.icon
          const getColorClasses = (color: string) => {
            switch (color) {
              case 'blue':
                return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
              case 'purple':
                return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
              case 'green':
                return 'bg-green-500/20 text-green-400 border-green-500/30'
              case 'orange':
                return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
              default:
                return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
            }
          }

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 h-full hover:bg-gray-800/70 transition-all duration-300 group">
                {/* Step number */}
                <div className="absolute -top-4 left-8">
                  <div className="w-8 h-8 bg-gray-900 border-2 border-gray-700 rounded-full flex items-center justify-center text-sm font-bold text-white">
                    {index + 1}
                  </div>
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 mx-auto border ${getColorClasses(step.color)}`}>
                  <Icon className="w-8 h-8" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-gray-100 transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  {step.description}
                </p>
              </div>

              {/* Connector arrow (hidden on last item and mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-gray-600 to-gray-500"></div>
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-500 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-16 p-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl border border-gray-700"
      >
        <h3 className="text-2xl font-semibold mb-4">Ready to get started?</h3>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Find engineers in your area and book your first session. Pay only for the time you use.
        </p>
        <button 
          onClick={() => {
            const bookingSection = document.getElementById('booking')
            if (bookingSection) {
              bookingSection.scrollIntoView({ behavior: 'smooth' })
            }
          }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
        >
          Find Engineers Near You
        </button>
      </motion.div>
    </div>
  )
}