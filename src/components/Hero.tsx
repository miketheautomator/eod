'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Code, Zap, Users } from 'lucide-react'

export default function Hero() {
  return (
    <div className="relative text-center text-white">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl" />
      
      <div className="relative z-10">
        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">
            Engineers
            <br />
            <span className="text-gray-300">On Demand</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Instant access to skilled engineers in co-working spaces. 
            <br className="hidden sm:block" />
            No hiring, no contracts. Just solutions by the minute.
          </p>
        </motion.div>

        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto"
        >
          <div className="flex flex-col items-center space-y-3">
            <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-gray-300" />
            </div>
            <span className="text-gray-300 font-medium">Instant Access</span>
          </div>
          
          <div className="flex flex-col items-center space-y-3">
            <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
              <Code className="w-6 h-6 text-gray-300" />
            </div>
            <span className="text-gray-300 font-medium">Expert Engineers</span>
          </div>
          
          <div className="flex flex-col items-center space-y-3">
            <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-gray-300" />
            </div>
            <span className="text-gray-300 font-medium">Local Co-working</span>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button 
            onClick={() => {
              const bookingSection = document.getElementById('booking')
              if (bookingSection) {
                bookingSection.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="group bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center space-x-2 mx-auto"
          >
            <span>Find an Engineer</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Trusted by section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 pt-8 border-t border-gray-800"
        >
          <p className="text-gray-400 text-sm mb-6">Trusted by startups and enterprises</p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            {/* Placeholder for company logos */}
            <div className="w-24 h-8 bg-gray-700 rounded opacity-50" />
            <div className="w-24 h-8 bg-gray-700 rounded opacity-50" />
            <div className="w-24 h-8 bg-gray-700 rounded opacity-50" />
            <div className="w-24 h-8 bg-gray-700 rounded opacity-50" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}