'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
}

export default function Modal({ isOpen, onClose, title, message, type = 'info' }: ModalProps) {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-8 h-8 text-green-400" />
      case 'error':
        return <AlertCircle className="w-8 h-8 text-red-400" />
      case 'warning':
        return <AlertTriangle className="w-8 h-8 text-orange-400" />
      default:
        return <AlertCircle className="w-8 h-8 text-blue-400" />
    }
  }

  const getColors = () => {
    switch (type) {
      case 'success':
        return 'border-green-500/30 bg-green-900/20'
      case 'error':
        return 'border-red-500/30 bg-red-900/20'
      case 'warning':
        return 'border-orange-500/30 bg-orange-900/20'
      default:
        return 'border-blue-500/30 bg-blue-900/20'
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`relative w-full max-w-md bg-gray-800 border rounded-2xl p-6 ${getColors()}`}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                {getIcon()}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {message}
                </p>
              </div>
            </div>

            {/* Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
              >
                OK
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}