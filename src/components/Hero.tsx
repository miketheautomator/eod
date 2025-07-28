'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Gauge } from 'lucide-react'
import { scrollToNextSection } from './ScrollSnapWrapper'
import { SectionContainer } from './ui/SectionContainer'

export default function Hero() {
  return (
    <SectionContainer background="hero">
        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* AWS-style badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-2 mb-6"
          >
            <Gauge className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">Engineering as a Service (EaaS)</span>
          </motion.div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
            Engineer
            <br />
            <span className="text-gray-300">as a Service</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-4">
            Like AWS for infrastructure, but for engineering expertise.
            <br className="hidden sm:block" />
            Spin up senior engineers instantly. Scale down when done.
          </p>

          <p className="text-base text-gray-400 max-w-2xl mx-auto">
            No hiring process. No contracts. No commitments.
            <br />
            Just world-class engineering, priced fairly.
          </p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button 
              onClick={scrollToNextSection}
              className="group bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-3 mx-auto"
            >
              <span>See How It Works</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </motion.div>
    </SectionContainer>
  )
}