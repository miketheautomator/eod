'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Bell, CheckCircle } from 'lucide-react'

export default function EarlyAccess() {
  const [formData, setFormData] = useState({
    email: '',
    zipCode: '',
    requestedSkills: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/early-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          zipCode: formData.zipCode,
          requestedSkills: formData.requestedSkills.split(',').map(s => s.trim()).filter(s => s)
        })
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to submit request')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center text-white max-w-2xl mx-auto"
      >
        <div className="bg-green-900/20 border border-green-500/30 rounded-2xl p-8">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold mb-4">You&apos;re on the list!</h3>
          <p className="text-gray-300 mb-6">
            We&apos;ll notify you as soon as engineers are available in your area. 
            You&apos;ll be among the first to get access to our service.
          </p>
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <p className="text-sm text-gray-400">
              We&apos;re expanding to new cities every month. 
              Follow us for updates on when we&apos;re coming to your area.
            </p>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="text-white max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <Bell className="w-16 h-16 text-orange-400 mx-auto mb-6" />
        <h2 className="text-4xl sm:text-5xl font-bold mb-6">
          Get <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Early Access</span>
        </h2>
        <p className="text-xl text-gray-300">
          Be the first to know when engineers are available in your area
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        onSubmit={handleSubmit}
        className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 flex items-center">
              <Mail className="w-4 h-4 mr-2 text-blue-400" />
              Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-green-400" />
              Your Zip Code
            </label>
            <input
              type="text"
              required
              value={formData.zipCode}
              onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="12345"
              pattern="[0-9]{5}"
              maxLength={5}
            />
            <p className="text-xs text-gray-400 mt-1">
              We&apos;ll prioritize expansion to areas with the most interest
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Skills You Need (Optional)
            </label>
            <input
              type="text"
              value={formData.requestedSkills}
              onChange={(e) => setFormData(prev => ({ ...prev, requestedSkills: e.target.value }))}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="React, Python, AWS, Machine Learning"
            />
            <p className="text-xs text-gray-400 mt-1">
              Separate multiple skills with commas
            </p>
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 disabled:from-gray-600 disabled:to-gray-600 text-white py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                Submitting...
              </div>
            ) : (
              'Notify Me When Available'
            )}
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-400">50+</div>
              <div className="text-sm text-gray-400">Cities Planned</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">1000+</div>
              <div className="text-sm text-gray-400">Engineers Ready</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">24/7</div>
              <div className="text-sm text-gray-400">Availability Soon</div>
            </div>
          </div>
        </div>
      </motion.form>
    </div>
  )
}