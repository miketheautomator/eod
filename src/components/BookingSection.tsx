'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getCurrentLocation } from '@/lib/geolocation'
import { Engineer } from '@/types/global'
import { MapPin, DollarSign, Star, User } from 'lucide-react'

interface BookingState {
  location: {
    latitude: number
    longitude: number
    zipCode?: string
  } | null
  engineers: Engineer[]
  selectedEngineer: Engineer | null
  selectedDate: string
  selectedTime: string
  isLoading: boolean
  error: string | null
  showBookingForm: boolean
}

export default function BookingSection() {
  const [state, setState] = useState<BookingState>({
    location: null,
    engineers: [],
    selectedEngineer: null,
    selectedDate: '',
    selectedTime: '',
    isLoading: false,
    error: null,
    showBookingForm: false
  })

  const [showLocationPrompt, setShowLocationPrompt] = useState(false)


  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    description: ''
  })

  useEffect(() => {
    detectLocationAndFetchEngineers()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const detectLocationAndFetchEngineers = async () => {
    console.log('detectLocationAndFetchEngineers called')
    setState(prev => ({ ...prev, isLoading: true, error: null }))
    setShowLocationPrompt(false)
    
    try {
      console.log('About to call getCurrentLocation()')
      const location = await getCurrentLocation()
      console.log('Location detected in component:', location)
      setState(prev => ({ ...prev, location }))
      
      await fetchEngineers(location)
    } catch (error) {
      console.log('Error in detectLocationAndFetchEngineers:', error)
      setState(prev => ({ 
        ...prev, 
        error: 'Unable to detect your location. Please enable location services.',
        isLoading: false 
      }))
      setShowLocationPrompt(true)
    }
  }

  const fetchEngineers = async (location: { latitude: number; longitude: number; zipCode?: string }) => {
    try {
      const params = new URLSearchParams({
        lat: location.latitude.toString(),
        lng: location.longitude.toString(),
        radius: '50'
      })

      console.log('Fetching engineers with params:', params.toString())
      const response = await fetch(`/api/engineers?${params}`)
      console.log('Engineers API response status:', response.status)
      
      const data = await response.json()
      console.log('Engineers API response data:', data)

      if (data.engineers) {
        setState(prev => ({ 
          ...prev, 
          engineers: data.engineers,
          isLoading: false 
        }))
      } else {
        setState(prev => ({ 
          ...prev, 
          engineers: [],
          isLoading: false 
        }))
      }
    } catch (error) {
      console.log('Fetch engineers error:', error)
      setState(prev => ({ 
        ...prev, 
        error: 'Failed to load engineers in your area.',
        isLoading: false 
      }))
    }
  }

  const generateTimeSlots = () => {
    const slots = []
    for (let hour = 9; hour <= 17; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`)
      if (hour < 17) {
        slots.push(`${hour.toString().padStart(2, '0')}:30`)
      }
    }
    return slots
  }

  const handleBooking = async () => {
    if (!state.selectedEngineer || !state.selectedDate || !state.selectedTime) return

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          engineerId: state.selectedEngineer._id,
          clientName: formData.clientName,
          clientEmail: formData.clientEmail,
          clientPhone: formData.clientPhone,
          date: state.selectedDate,
          startTime: state.selectedTime,
          endTime: addHour(state.selectedTime),
          description: formData.description,
          location: state.location
        })
      })

      if (response.ok) {
        alert('Booking request submitted successfully!')
        setState(prev => ({ 
          ...prev, 
          showBookingForm: false,
          selectedEngineer: null,
          selectedDate: '',
          selectedTime: ''
        }))
        setFormData({ clientName: '', clientEmail: '', clientPhone: '', description: '' })
      } else {
        const error = await response.json()
        alert(`Booking failed: ${error.error}`)
      }
    } catch {
      alert('Failed to submit booking request')
    }
  }

  const addHour = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number)
    const newHours = hours + 1
    return `${newHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
  }

  if (showLocationPrompt) {
    return (
      <div className="text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-900/20 border border-blue-500/30 rounded-2xl p-8 max-w-2xl mx-auto"
        >
          <MapPin className="w-16 h-16 text-blue-400 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold mb-4">Find Engineers Near You</h3>
          <p className="text-gray-300 mb-6">
            We need to access your location to show you engineers in your area.
          </p>
          <p className="text-orange-300 text-sm mb-6 font-medium">
            👆 Enable the browser location request above to see engineers in your area!
          </p>
          
          <button 
            onClick={detectLocationAndFetchEngineers}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
          >
            <MapPin className="w-5 h-5 inline mr-2" />
            Share My Location
          </button>
          
          <p className="text-gray-400 text-sm mt-4">
            Your location is only used to find nearby engineers and is not stored.
          </p>
        </motion.div>
      </div>
    )
  }

  if (state.isLoading) {
    return (
      <div className="text-center text-white">
        <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-300">Finding engineers in your area...</p>
        <p className="text-orange-300 text-sm mt-2">Enable the browser location request above to see engineers in your area!</p>
      </div>
    )
  }

  if (state.error) {
    return (
      <div className="text-center text-white">
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-red-300 mb-4">{state.error}</p>
          <button 
            onClick={detectLocationAndFetchEngineers}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (state.engineers.length === 0) {
    return (
      <div className="text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-orange-900/20 border border-orange-500/30 rounded-2xl p-8 max-w-2xl mx-auto"
        >
          <MapPin className="w-16 h-16 text-orange-400 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold mb-4">No Engineers in Your Area Yet</h3>
          <p className="text-gray-300 mb-6">
            We don&apos;t have engineers within 50 miles of your location yet, but we&apos;re expanding rapidly!
          </p>
          <p className="text-gray-400 text-sm mb-6">
            Your location: {state.location?.zipCode || 'Unknown'}
          </p>
          
          {/* Early Access CTA */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h4 className="text-lg font-medium mb-4">Request Early Access</h4>
            <p className="text-gray-300 text-sm mb-4">
              Be the first to know when engineers are available in your area.
            </p>
            <button 
              onClick={() => {
                const earlyAccessSection = document.getElementById('early-access')
                if (earlyAccessSection) {
                  earlyAccessSection.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
            >
              Get Early Access
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
          Book an Engineer
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Found {state.engineers.length} engineer{state.engineers.length !== 1 ? 's' : ''} in your area
        </p>
        {state.location?.zipCode && (
          <p className="text-gray-400 mt-2">Location: {state.location.zipCode}</p>
        )}
      </motion.div>

      {!state.showBookingForm ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {state.engineers.map((engineer, index) => (
            <motion.div
              key={engineer._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:bg-gray-800/70 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mr-4">
                  <User className="w-6 h-6 text-gray-300" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{engineer.name}</h3>
                  <div className="flex items-center text-yellow-400">
                    <Star className="w-4 h-4 mr-1" />
                    <span className="text-sm">4.9 (23 reviews)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-300">
                  <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
                  <span>${engineer.hourlyRate}/hour</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{engineer.location.address || engineer.location.zipCode}</span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-400 mb-2">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {engineer.skills.slice(0, 3).map((skill, i) => (
                    <span key={i} className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                      {skill}
                    </span>
                  ))}
                  {engineer.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-600/50 text-gray-400 text-xs rounded-full">
                      +{engineer.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={() => setState(prev => ({ 
                  ...prev, 
                  selectedEngineer: engineer, 
                  showBookingForm: true 
                }))}
                className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white py-3 rounded-lg font-medium transition-all duration-300"
              >
                Book Now
              </button>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold mb-2">
              Book session with {state.selectedEngineer?.name}
            </h3>
            <p className="text-gray-300">${state.selectedEngineer?.hourlyRate}/hour</p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <input
                  type="date"
                  value={state.selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setState(prev => ({ ...prev, selectedDate: e.target.value }))}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Time</label>
                <select
                  value={state.selectedTime}
                  onChange={(e) => setState(prev => ({ ...prev, selectedTime: e.target.value }))}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select time</option>
                  {generateTimeSlots().map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Your Name</label>
              <input
                type="text"
                value={formData.clientName}
                onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                placeholder="Full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={formData.clientEmail}
                onChange={(e) => setFormData(prev => ({ ...prev, clientEmail: e.target.value }))}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input
                type="tel"
                value={formData.clientPhone}
                onChange={(e) => setFormData(prev => ({ ...prev, clientPhone: e.target.value }))}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                placeholder="(555) 123-4567"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">What do you need help with?</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                placeholder="Describe your project or what you need help with..."
              />
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setState(prev => ({ ...prev, showBookingForm: false }))}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-medium transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleBooking}
                disabled={!state.selectedDate || !state.selectedTime || !formData.clientName || !formData.clientEmail}
                className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 text-white py-3 rounded-lg font-medium transition-all duration-300 disabled:cursor-not-allowed"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}