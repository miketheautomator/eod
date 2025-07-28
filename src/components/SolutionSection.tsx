'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Zap, Target, Users } from 'lucide-react'
import { SectionContainer } from './ui/SectionContainer'
import { scrollToNextSection } from './ScrollSnapWrapper'

export default function SolutionSection() {
  return (
    <SectionContainer background="tertiary">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-12"
      >
        <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
          The Engineer as a Service Solution
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Start building today. Pay only for results. Scale instantly.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12"
      >
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Zap className="w-8 h-8 text-gray-400" />
            <h3 className="text-xl font-semibold text-white">Start Today</h3>
          </div>
          <p className="text-gray-400 text-center">
            Book an engineer in minutes, start working immediately
          </p>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Target className="w-8 h-8 text-gray-400" />
            <h3 className="text-xl font-semibold text-white">Pay for Results</h3>
          </div>
          <p className="text-gray-400 text-center">
            Fair rates by the minute. No salaries, benefits, or management overhead
          </p>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Users className="w-8 h-8 text-gray-400" />
            <h3 className="text-xl font-semibold text-white">Right Expert</h3>
          </div>
          <p className="text-gray-400 text-center">
            Switch engineers instantly based on project needs
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center"
      >
        <button 
          onClick={scrollToNextSection}
          className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
        >
          Try It Now
        </button>
      </motion.div>
    </SectionContainer>
  )
}