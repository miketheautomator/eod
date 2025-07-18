'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface SectionProps {
  children: React.ReactNode
  id?: string
  className?: string
  background?: 'dark' | 'darker' | 'gradient'
}

export default function Section({ 
  children, 
  id, 
  className = '', 
  background = 'dark' 
}: SectionProps) {
  const getBackgroundClass = () => {
    switch (background) {
      case 'darker':
        return 'bg-gray-950'
      case 'gradient':
        return 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
      default:
        return 'bg-gray-900'
    }
  }

  return (
    <motion.section
      id={id}
      className={`min-h-screen w-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 ${getBackgroundClass()} ${className}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl w-full mx-auto">
        {children}
      </div>
    </motion.section>
  )
}