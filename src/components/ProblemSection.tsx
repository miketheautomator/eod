'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Clock, DollarSign, Building } from 'lucide-react'
import { SectionContainer } from './ui/SectionContainer'

export default function ProblemSection() {
  return (
    <SectionContainer background="secondary">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-12"
      >
        <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
          Traditional Hiring is Broken
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          While you're interviewing for months, your competition is shipping features.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
      >
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Clock className="w-8 h-8 text-gray-400" />
            <h3 className="text-xl font-semibold text-white">Takes Forever</h3>
          </div>
          <p className="text-gray-400 text-center">
            2-4 months to find and onboard senior engineers
          </p>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <DollarSign className="w-8 h-8 text-gray-400" />
            <h3 className="text-xl font-semibold text-white">Expensive & Risky</h3>
          </div>
          <p className="text-gray-400 text-center">
            $200K+ salaries plus benefits and management overhead
          </p>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Building className="w-8 h-8 text-gray-400" />
            <h3 className="text-xl font-semibold text-white">Wrong Skills</h3>
          </div>
          <p className="text-gray-400 text-center">
            Need different expertise for every project phase
          </p>
        </div>
      </motion.div>
    </SectionContainer>
  )
}