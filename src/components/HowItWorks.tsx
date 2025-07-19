'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Code, Zap, Users } from 'lucide-react'

export default function HowItWorks() {
  return (
    <div className="relative text-center text-white">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl blur-3xl" />
      
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
            How It Works
          </h2>
          
          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our founders are sitting in your co-working space right now. 
            <br className="hidden sm:block" />
            No waiting, no travel time, no contracts.
          </p>
        </motion.div>

        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto"
        >
          <div className="group relative flex flex-col items-center space-y-3 cursor-pointer">
            <div className="w-12 h-12 bg-gray-700 group-hover:bg-gray-600 rounded-lg flex items-center justify-center transition-all duration-300">
              <Users className="w-6 h-6 text-gray-300 group-hover:text-white" />
            </div>
            <span className="text-gray-300 font-medium group-hover:text-white transition-colors">Spot the Founder</span>
            
            {/* Hover details */}
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-800 rounded-lg p-4 shadow-xl z-10 w-64">
              <p className="text-sm text-gray-200">
                Look for Engineer on Demand hoodies, t-shirts, or hats. QR codes are visible on the back of their clothing and on cards at their desk.
              </p>
            </div>
          </div>
          
          <div className="group relative flex flex-col items-center space-y-3 cursor-pointer">
            <div className="w-12 h-12 bg-gray-700 group-hover:bg-gray-600 rounded-lg flex items-center justify-center transition-all duration-300">
              <Zap className="w-6 h-6 text-gray-300 group-hover:text-white" />
            </div>
            <span className="text-gray-300 font-medium group-hover:text-white transition-colors">Scan & Book</span>
            
            {/* Hover details */}
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-800 rounded-lg p-4 shadow-xl z-10 w-64">
              <p className="text-sm text-gray-200">
                Scan the QR code with your phone camera. Book them for immediate help (ASAP) or schedule an appointment for later.
              </p>
            </div>
          </div>
          
          <div className="group relative flex flex-col items-center space-y-3 cursor-pointer">
            <div className="w-12 h-12 bg-gray-700 group-hover:bg-gray-600 rounded-lg flex items-center justify-center transition-all duration-300">
              <Code className="w-6 h-6 text-gray-300 group-hover:text-white" />
            </div>
            <span className="text-gray-300 font-medium group-hover:text-white transition-colors">Get Help Now</span>
            
            {/* Hover details */}
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-800 rounded-lg p-4 shadow-xl z-10 w-64">
              <p className="text-sm text-gray-200">
                Pay only for the minutes you use. Get help with coding, debugging, architecture decisions, or any technical challenge.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}