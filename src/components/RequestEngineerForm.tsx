'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Mail, Building, User } from 'lucide-react'
import Modal from './Modal'

export default function RequestEngineerForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    location: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [modal, setModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info' as 'success' | 'error' | 'warning' | 'info'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // TODO: Submit to your API
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      
      setModal({
        isOpen: true,
        title: 'Request Submitted!',
        message: 'We\'ll reach out to discuss placing an engineer at your co-working location.',
        type: 'success'
      })
      
      setFormData({ name: '', email: '', company: '', location: '', message: '' })
    } catch (error) {
      setModal({
        isOpen: true,
        title: 'Submission Failed',
        message: 'Unable to submit your request. Please try again.',
        type: 'error'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Modal
        isOpen={modal.isOpen}
        onClose={() => setModal(prev => ({ ...prev, isOpen: false }))}
        title={modal.title}
        message={modal.message}
        type={modal.type}
      />
      
      <div className="text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
            Request an Engineer
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            No engineers in your area yet? Let us know where you&apos;d like one placed!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden booking-form"
        >
          <div className="bg-gray-800 p-6 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">
              Get an Engineer at Your Co-working Location
            </h3>
            <p className="text-gray-300">We&apos;ll work with you to place an engineer where you need them</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-gray-700 border-0 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full bg-gray-700 border-0 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Email address"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  className="w-full bg-gray-700 border-0 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Company name"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full bg-gray-700 border-0 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Co-working space location"
                  required
                />
              </div>
            </div>

            <div>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                rows={4}
                className="w-full bg-gray-700 border-0 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Tell us about your technical needs and ideal schedule..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-gray-900 hover:bg-gray-100 active:bg-gray-200 disabled:bg-gray-600 disabled:text-gray-400 py-4 rounded-xl font-semibold transition-all duration-300 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full mr-2"></div>
                  Submitting...
                </>
              ) : (
                'Request Engineer Placement'
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </>
  )
}