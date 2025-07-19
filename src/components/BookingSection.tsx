'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getCurrentLocation } from '@/lib/geolocation'
import { Engineer } from '@/types/global'
import { MapPin, DollarSign, Star, User, ArrowRight } from 'lucide-react'
import { validateEmail, validatePhone, validateName, validateCompany, validateDescription } from '@/lib/validation'
import Modal from './Modal'
import EngineerCard from './EngineerCard'

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
  isSubmitting: boolean
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
    showBookingForm: false,
    isSubmitting: false
  })

  const [showLocationPrompt, setShowLocationPrompt] = useState(false)


  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    companyName: '',
    description: ''
  })

  const [validationErrors, setValidationErrors] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    companyName: '',
    description: ''
  })

  const [modal, setModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info' as 'success' | 'error' | 'warning' | 'info'
  })

  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1280,
    maxEngineers: 3
  })

  useEffect(() => {
    detectLocationAndFetchEngineers()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth
      const maxEngineers = width <= 640 ? 1 : width < 1280 ? 2 : 3
      setScreenSize({ width, maxEngineers })
    }

    updateScreenSize()
    window.addEventListener('resize', updateScreenSize)
    return () => window.removeEventListener('resize', updateScreenSize)
  }, [])

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
        radius: '15'
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
    if (!state.selectedEngineer || !state.selectedDate) return
    if (state.selectedDate !== 'asap' && !state.selectedTime) return

    setState(prev => ({ ...prev, isSubmitting: true }))

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          engineerId: state.selectedEngineer._id,
          engineerName: state.selectedEngineer.name,
          engineerRate: state.selectedEngineer.rate,
          clientName: formData.clientName,
          clientEmail: formData.clientEmail,
          clientPhone: formData.clientPhone.replace(/\D/g, ''), // Send unformatted phone number
          companyName: formData.companyName,
          date: state.selectedDate,
          startTime: state.selectedTime,
          endTime: state.selectedTime ? addHour(state.selectedTime) : undefined,
          description: formData.description,
          location: state.location
        })
      })

      if (response.ok) {
        setModal({
          isOpen: true,
          title: 'Booking Submitted!',
          message: 'Your booking request has been submitted successfully! We will contact you shortly to confirm the details.',
          type: 'success'
        })
        setState(prev => ({ 
          ...prev, 
          showBookingForm: false,
          selectedEngineer: null,
          selectedDate: '',
          selectedTime: '',
          isSubmitting: false
        }))
        setFormData({ 
          clientName: '', 
          clientEmail: '', 
          clientPhone: '', 
          companyName: '',
          description: '' 
        })
      } else {
        const error = await response.json()
        if (error.details) {
          // Show validation errors
          const newErrors = { clientName: '', clientEmail: '', clientPhone: '', companyName: '', description: '' }
          error.details.forEach((detail: { field: string; message: string }) => {
            if (detail.field in newErrors) {
              newErrors[detail.field as keyof typeof newErrors] = detail.message
            }
          })
          setValidationErrors(newErrors)
        } else {
          setModal({
            isOpen: true,
            title: 'Booking Failed',
            message: error.message || error.error || 'Unable to submit booking request',
            type: 'error'
          })
        }
      }
    } catch {
      setModal({
        isOpen: true,
        title: 'Network Error',
        message: 'Failed to submit booking request. Please check your connection and try again.',
        type: 'error'
      })
    } finally {
      setState(prev => ({ ...prev, isSubmitting: false }))
    }
  }

  const addHour = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number)
    const newHours = hours + 1
    return `${newHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
  }

  const formatPhoneNumber = (value: string) => {
    // Remove all non-numeric characters
    const phoneNumber = value.replace(/\D/g, '')
    
    // Format as (XXX) XXX-XXXX
    if (phoneNumber.length <= 3) {
      return phoneNumber
    } else if (phoneNumber.length <= 6) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
    } else {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
    }
  }

  const handleFieldChange = (field: string, value: string) => {
    let processedValue = value
    
    // Special handling for phone number formatting
    if (field === 'clientPhone') {
      processedValue = formatPhoneNumber(value)
    }
    
    setFormData(prev => ({ ...prev, [field]: processedValue }))
    
    // Clear validation error when user starts typing
    if (validationErrors[field as keyof typeof validationErrors]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleFieldBlur = (field: string, value: string) => {
    // Validate on blur (when user tabs out)
    let isValid = true
    let errorMessage = ''
    
    switch (field) {
      case 'clientName':
        isValid = validateName(value)
        if (!isValid && value.length > 0) errorMessage = 'Name must be 2-50 characters, letters only'
        break
      case 'clientEmail':
        isValid = validateEmail(value)
        if (!isValid && value.length > 0) errorMessage = 'Please enter a valid email address'
        break
      case 'clientPhone':
        // For phone validation, check the unformatted number
        const unformattedPhone = value.replace(/\D/g, '')
        isValid = validatePhone(unformattedPhone)
        if (!isValid && unformattedPhone.length > 0) errorMessage = 'Please enter a valid 10-digit phone number'
        break
      case 'companyName':
        isValid = validateCompany(value)
        if (!isValid && value.length > 0) errorMessage = 'Company name must be 2-100 characters'
        break
      case 'description':
        isValid = validateDescription(value)
        if (!isValid && value.length > 0) errorMessage = 'Description must be 60-2000 characters'
        break
    }
    
    if (!isValid && value.length > 0) {
      setValidationErrors(prev => ({ ...prev, [field]: errorMessage }))
    }
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
          Book an Engineer
        </h2>
        {state.location?.zipCode && (
          <p className="text-gray-400 mt-2">Location: {state.location.zipCode}</p>
        )}
      </motion.div>

      {!state.showBookingForm ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {state.engineers.slice(0, screenSize.maxEngineers).map((engineer, index) => (
            <EngineerCard
              key={engineer._id?.toString()}
              engineer={engineer}
              index={index}
              onSelect={(engineer) => {
                setState(prev => ({ 
                  ...prev, 
                  selectedEngineer: engineer, 
                  showBookingForm: true 
                }))
              }}
            />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden booking-form"
        >
          {/* Header */}
          <div className="bg-gray-800 p-6 text-center">
            <h3 className="text-2xl font-bold text-white mb-1">
              {state.selectedEngineer?.name}
            </h3>
            <p className="text-gray-300">${state.selectedEngineer?.rate ? (state.selectedEngineer.rate / 60).toFixed(1) : '0'}/min</p>
          </div>

          <div className="p-8 space-y-6">
            {/* Contact Info */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    value={formData.clientName}
                    onChange={(e) => handleFieldChange('clientName', e.target.value)}
                    onBlur={(e) => handleFieldBlur('clientName', e.target.value)}
                    className={`w-full bg-gray-700 border-0 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${validationErrors.clientName ? 'focus:ring-red-500 ring-1 ring-red-500' : 'focus:ring-gray-500'}`}
                    placeholder="First name"
                  />
                  {validationErrors.clientName && (
                    <p className="text-red-400 text-xs mt-1">{validationErrors.clientName}</p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    value={formData.companyName || ''}
                    onChange={(e) => handleFieldChange('companyName', e.target.value)}
                    onBlur={(e) => handleFieldBlur('companyName', e.target.value)}
                    className={`w-full bg-gray-700 border-0 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${validationErrors.companyName ? 'focus:ring-red-500 ring-1 ring-red-500' : 'focus:ring-gray-500'}`}
                    placeholder="Company name"
                  />
                  {validationErrors.companyName && (
                    <p className="text-red-400 text-xs mt-1">{validationErrors.companyName}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="email"
                    value={formData.clientEmail}
                    onChange={(e) => handleFieldChange('clientEmail', e.target.value)}
                    onBlur={(e) => handleFieldBlur('clientEmail', e.target.value)}
                    className={`w-full bg-gray-700 border-0 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${validationErrors.clientEmail ? 'focus:ring-red-500 ring-1 ring-red-500' : 'focus:ring-gray-500'}`}
                    placeholder="Email"
                  />
                  {validationErrors.clientEmail && (
                    <p className="text-red-400 text-xs mt-1">{validationErrors.clientEmail}</p>
                  )}
                </div>
                <div>
                  <input
                    type="tel"
                    value={formData.clientPhone}
                    onChange={(e) => handleFieldChange('clientPhone', e.target.value)}
                    onBlur={(e) => handleFieldBlur('clientPhone', e.target.value)}
                    className={`w-full bg-gray-700 border-0 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${validationErrors.clientPhone ? 'focus:ring-red-500 ring-1 ring-red-500' : 'focus:ring-gray-500'}`}
                    placeholder="Phone"
                  />
                  {validationErrors.clientPhone && (
                    <p className="text-red-400 text-xs mt-1">{validationErrors.clientPhone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Timing Options */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">When?</h4>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setState(prev => ({ ...prev, selectedDate: 'asap', selectedTime: '' }))}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    state.selectedDate === 'asap'
                      ? 'border-white bg-white/10 text-white'
                      : 'border-gray-600 bg-gray-700/50 text-gray-300 hover:border-gray-500'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">⚡</div>
                    <div className="font-semibold">ASAP</div>
                    <div className="text-xs opacity-80">Right now</div>
                  </div>
                </button>
                <button
                  onClick={() => setState(prev => ({ ...prev, selectedDate: new Date().toISOString().split('T')[0] }))}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    state.selectedDate !== 'asap' && state.selectedDate !== ''
                      ? 'border-white bg-white/10 text-white'
                      : 'border-gray-600 bg-gray-700/50 text-gray-300 hover:border-gray-500'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">📅</div>
                    <div className="font-semibold">Schedule</div>
                    <div className="text-xs opacity-80">Pick time</div>
                  </div>
                </button>
              </div>
              
              {state.selectedDate !== 'asap' && state.selectedDate !== '' && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <input
                    type="date"
                    value={state.selectedDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setState(prev => ({ ...prev, selectedDate: e.target.value }))}
                    className="w-full bg-gray-700 border-0 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <select
                    value={state.selectedTime}
                    onChange={(e) => setState(prev => ({ ...prev, selectedTime: e.target.value }))}
                    className="w-full bg-gray-700 border-0 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Time</option>
                    {generateTimeSlots().map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <textarea
                value={formData.description}
                onChange={(e) => handleFieldChange('description', e.target.value)}
                onBlur={(e) => handleFieldBlur('description', e.target.value)}
                rows={4}
                className={`w-full bg-gray-700 border-0 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 resize-none ${validationErrors.description ? 'focus:ring-red-500 ring-1 ring-red-500' : 'focus:ring-gray-500'}`}
                placeholder="What do you need help with? (minimum 60 characters)"
              />
              {validationErrors.description && (
                <p className="text-red-400 text-xs mt-1">{validationErrors.description}</p>
              )}
              <div className="text-right text-xs mt-1">
                <span className={formData.description.length >= 60 ? 'text-green-400' : 'text-gray-400'}>
                  {formData.description.length}/60 characters
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={() => setState(prev => ({ ...prev, showBookingForm: false }))}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-4 rounded-xl font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleBooking}
                disabled={
                  state.isSubmitting ||
                  !state.selectedDate || 
                  (state.selectedDate !== 'asap' && !state.selectedTime) || 
                  !validateName(formData.clientName) || 
                  !validateCompany(formData.companyName) ||
                  !validateEmail(formData.clientEmail) || 
                  !validatePhone(formData.clientPhone.replace(/\D/g, '')) ||
                  !validateDescription(formData.description) ||
                  Object.values(validationErrors).some(error => error !== '')
                }
                className="flex-1 bg-white text-gray-900 hover:bg-gray-100 active:bg-gray-200 disabled:bg-gray-600 disabled:text-gray-400 py-4 rounded-xl font-semibold transition-all duration-300 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 flex items-center justify-center"
              >
                {state.isSubmitting ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full mr-2"></div>
                    Requesting...
                  </>
                ) : (
                  'Confirm'
                )}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
    </>
  )
}