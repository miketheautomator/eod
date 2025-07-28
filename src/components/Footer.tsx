'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center text-white"
    >
      <div className="text-2xl font-bold mb-2">tilt</div>
      <div className="text-gray-400 text-sm mb-8">
        World-class engineers built for speed
      </div>
      
      <div className="text-gray-400 text-sm">
        © {currentYear} Tilt. All rights reserved.
      </div>
    </motion.div>
  )
}