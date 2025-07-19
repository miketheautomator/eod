'use client'

import React, { useState, useEffect } from 'react'
import { getCurrentLocation } from '@/lib/geolocation'
import { Engineer } from '@/types/global'
import BookingSection from './BookingSection'
import RequestEngineerForm from './RequestEngineerForm'

export default function CTASection() {
  const [showRequestForm, setShowRequestForm] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    checkEngineerAvailability()
  }, [])

  const checkEngineerAvailability = async () => {
    try {
      const location = await getCurrentLocation()
      
      const params = new URLSearchParams({
        lat: location.latitude.toString(),
        lng: location.longitude.toString(),
        radius: '1' // 1 mile radius
      })

      const response = await fetch(`/api/engineers?${params}`)
      const data = await response.json()
      
      // If no engineers within 1 mile, show request form
      const hasNearbyEngineers = data.engineers && data.engineers.length > 0 && 
        data.engineers.some((engineer: Engineer) => engineer.distance !== undefined && engineer.distance <= 1)
      
      setShowRequestForm(!hasNearbyEngineers)
    } catch (error) {
      console.log('Error checking engineer availability:', error)
      // Default to showing booking section if we can't determine location
      setShowRequestForm(false)
    } finally {
      setIsChecking(false)
    }
  }

  if (isChecking) {
    return (
      <div className="text-center text-white">
        <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-300">Checking engineer availability in your area...</p>
      </div>
    )
  }

  return (
    <>
      {showRequestForm ? <RequestEngineerForm /> : <BookingSection />}
    </>
  )
}