'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center text-white w-full"
    >
      <div className="mb-8">
        <div className="flex items-center justify-center mb-4">
          <img 
            src="https://whytilt.com/logo.png" 
            alt="Tilt Logo" 
            className="h-10 w-auto mr-4"
          />
          <div className="text-left">
            <h3 className="text-2xl font-bold">Engineer OnDemand</h3>
            <p className="text-sm text-gray-400">Rent engineers by the minute</p>
          </div>
        </div>
      </div>

      <p className="text-gray-300 text-lg mb-6">
        Coming to a co-work location near you!
      </p>

      <hr className="w-4/5 mx-auto border-gray-600 mb-6" />

      <div className="mb-6 space-y-2">
        <a 
          href="mailto:hello@whytilt.com" 
          className="flex items-center justify-center text-gray-300 hover:text-white transition-colors"
        >
          <Mail className="w-4 h-4 mr-2" />
          <span>hello@whytilt.com</span>
        </a>
        
        <div className="flex items-center justify-center space-x-4 text-sm">
          <a 
            href="https://whytilt.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            whytilt.com
          </a>
          <span className="text-gray-600">•</span>
          <a 
            href="https://whytilt.com/engineer-on-demand" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            whytilt.com/engineer-on-demand
          </a>
        </div>
      </div>

      <p className="text-gray-400 text-sm">
        © {currentYear} Tilt. All rights reserved.
      </p>
    </motion.div>
  )
}