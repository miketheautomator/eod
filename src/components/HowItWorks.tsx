'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Zap, Clock, DollarSign, Code, Shield, TrendingUp } from 'lucide-react'

export default function HowItWorks() {
  return (
    <div className="relative text-center text-white">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl blur-3xl" />
      
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">
            <span className="hidden sm:inline">The Future of Technical Hiring</span>
            <span className="sm:hidden">Better Way to Hire</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            <span className="hidden sm:inline">Stop wasting months on hiring. </span>Start building today.
          </p>
        </motion.div>

        {/* Feature grid - show 3 on mobile, all on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16"
        >
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 sm:p-6 hover:border-gray-600 transition-all duration-300">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Zap className="w-8 h-8 text-gray-400" />
              <h3 className="text-lg sm:text-xl font-semibold text-white">Pre Screened and Verified</h3>
            </div>
            <p className="text-gray-400 text-sm sm:text-base text-center">
              <span className="sm:hidden">Carefully vetted engineers</span>
              <span className="hidden sm:inline">We prescreen and verify the skills and locations of the engineers carefully. We verify location and nationality - no more unqualified offshore low quality engineers</span>
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 sm:p-6 hover:border-gray-600 transition-all duration-300">
            <div className="flex items-center justify-center gap-3 mb-3">
              <DollarSign className="w-8 h-8 text-gray-400" />
              <h3 className="text-lg sm:text-xl font-semibold text-white">Transparent Pricing</h3>
            </div>
            <p className="text-gray-400 text-sm sm:text-base text-center">
              <span className="sm:hidden">Billed by the minute, no hidden fees</span>
              <span className="hidden sm:inline">Fair hourly rates. Billed by the minute. No hidden fees, no surprises.</span>
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 sm:p-6 hover:border-gray-600 transition-all duration-300">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Code className="w-8 h-8 text-gray-400" />
              <h3 className="text-lg sm:text-xl font-semibold text-white">Senior Only</h3>
            </div>
            <p className="text-gray-400 text-sm sm:text-base text-center">
              <span className="sm:hidden">10+ years experience minimum</span>
              <span className="hidden sm:inline">All engineers have 10+ years experience and have built companies.</span>
            </p>
          </div>

          {/* Hide these on mobile */}
          <div className="hidden sm:block bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 sm:p-6 hover:border-gray-600 transition-all duration-300">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Clock className="w-8 h-8 text-gray-400" />
              <h3 className="text-lg sm:text-xl font-semibold text-white">Flexible</h3>
            </div>
            <p className="text-gray-400 text-sm sm:text-base text-center">
              Need help for an hour? A day? A month? Scale up or down anytime.
            </p>
          </div>

          <div className="hidden lg:block bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 sm:p-6 hover:border-gray-600 transition-all duration-300">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Shield className="w-8 h-8 text-gray-400" />
              <h3 className="text-lg sm:text-xl font-semibold text-white">Zero Risk</h3>
            </div>
            <p className="text-gray-400 text-sm sm:text-base text-center">
              No contracts. No commitments. Stop anytime. Only pay for value delivered.
            </p>
          </div>

          <div className="hidden lg:block bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 sm:p-6 hover:border-gray-600 transition-all duration-300">
            <div className="flex items-center justify-center gap-3 mb-3">
              <TrendingUp className="w-8 h-8 text-gray-400" />
              <h3 className="text-lg sm:text-xl font-semibold text-white">Scale With You</h3>
            </div>
            <p className="text-gray-400 text-sm sm:text-base text-center">
              From MVP to IPO. Get the right expertise at the right time.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  )
}