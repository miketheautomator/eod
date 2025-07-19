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
          <div className="group relative flex flex-col items-center space-y-3 cursor-pointer">
            <div className="w-12 h-12 bg-gray-700 group-hover:bg-gray-600 rounded-lg flex items-center justify-center transition-all duration-300">
              <Zap className="w-6 h-6 text-gray-300 group-hover:text-white" />
            </div>
            <span className="text-gray-300 font-medium group-hover:text-white transition-colors">Instant Access</span>
            
            {/* Hover details */}
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-800 rounded-lg p-4 shadow-xl z-10 w-64">
              <p className="text-sm text-gray-200">
                Book engineers immediately or schedule for later. No waiting lists, no lengthy hiring process.
              </p>
            </div>
          </div>
          
          <div className="group relative flex flex-col items-center space-y-3 cursor-pointer">
            <div className="w-12 h-12 bg-gray-700 group-hover:bg-gray-600 rounded-lg flex items-center justify-center transition-all duration-300">
              <Code className="w-6 h-6 text-gray-300 group-hover:text-white" />
            </div>
            <span className="text-gray-300 font-medium group-hover:text-white transition-colors">Expert Engineers</span>
            
            {/* Hover details */}
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-800 rounded-lg p-4 shadow-xl z-10 w-64">
              <p className="text-sm text-gray-200">
                Company founders with years of experience across multiple technologies and industries.
              </p>
            </div>
          </div>
          
          <div className="group relative flex flex-col items-center space-y-3 cursor-pointer">
            <div className="w-12 h-12 bg-gray-700 group-hover:bg-gray-600 rounded-lg flex items-center justify-center transition-all duration-300">
              <Users className="w-6 h-6 text-gray-300 group-hover:text-white" />
            </div>
            <span className="text-gray-300 font-medium group-hover:text-white transition-colors">Local Co-working</span>
            
            {/* Hover details */}
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-800 rounded-lg p-4 shadow-xl z-10 w-64">
              <p className="text-sm text-gray-200">
                Engineers already working in your exact co-working space. No travel time, immediate availability.
              </p>
            </div>
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

      </div>
    </div>
  )
}