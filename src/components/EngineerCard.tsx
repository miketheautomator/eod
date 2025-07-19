'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, User, ArrowRight } from 'lucide-react'
import { Engineer } from '@/types/global'

interface EngineerCardProps {
  engineer: Engineer
  index: number
  onSelect: (engineer: Engineer) => void
}

export default function EngineerCard({ engineer, index, onSelect }: EngineerCardProps) {
  return (
    <motion.div
      key={engineer._id?.toString()}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: engineer.isLocal ? 1 : 0.7, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`w-full min-w-0 h-[700px] border rounded-3xl overflow-hidden transition-all duration-300 shadow-xl ${
        engineer.isLocal 
          ? 'bg-white border-gray-300 hover:bg-gray-50 cursor-pointer' 
          : 'bg-gray-100 border-gray-300 cursor-not-allowed grayscale'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Photo Section */}
        <div className="relative h-64 flex justify-center items-center flex-shrink-0">
          {engineer.photo ? (
            <img 
              src={`/${engineer.photo}`} 
              alt={engineer.name}
              className="w-[90%] h-full object-cover"
            />
          ) : (
            <div className="w-[90%] h-full bg-gray-700 flex items-center justify-center">
              <User className="w-24 h-24 text-gray-300" />
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex items-center text-white">
              <span className="text-lg font-bold">${(engineer.rate / 60).toFixed(1)}/min</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col p-6 min-h-0">
          {/* Content that takes natural space */}
          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex items-baseline justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{engineer.name}</h3>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                    <span className="truncate">{engineer.location.address}</span>
                    {engineer.distance && (
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs flex-shrink-0 ${
                        engineer.isLocal 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-orange-500/20 text-orange-400'
                      }`}>
                        {engineer.distance.toFixed(0)}mi
                      </span>
                    )}
                  </div>
                </div>
                {engineer.yearsExperience && (
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-100 border border-blue-300 rounded-full">
                      <span className="text-sm font-bold text-blue-700">{engineer.yearsExperience}</span>
                    </div>
                    <span className="text-xs text-blue-700">exp</span>
                  </div>
                )}
              </div>
            </div>

            {engineer.bio && (
              <p className="text-gray-700 text-sm leading-relaxed">
                {engineer.bio}
              </p>
            )}

            {engineer.skills && engineer.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {engineer.skills.slice(0, 6).map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                    {skill}
                  </span>
                ))}
                {engineer.skills.length > 6 && (
                  <span className="px-3 py-1.5 bg-gray-200 text-gray-600 text-xs rounded-full">
                    +{engineer.skills.length - 6}
                  </span>
                )}
              </div>
            )}

            {engineer.services && engineer.services.length > 0 && (
              <div>
                <div className="flex flex-wrap gap-1.5 max-h-16 overflow-hidden">
                  {engineer.services.slice(0, 8).map((service, i) => (
                    <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                      {service}
                    </span>
                  ))}
                  {engineer.services.length > 8 && (
                    <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">
                      +{engineer.services.length - 8}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Spacer that grows to push button to bottom */}
          <div className="flex-1"></div>
          
          {/* Button always at bottom */}
          <div className="pt-4">
            <button
              onClick={() => {
                if (engineer.isLocal) {
                  onSelect(engineer)
                }
              }}
              disabled={!engineer.isLocal}
              className={`group w-full py-4 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center space-x-2 ${
                engineer.isLocal
                  ? 'bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white cursor-pointer'
                  : 'text-gray-500 cursor-not-allowed'
              }`}
            >
              <span>
                {engineer.isLocal 
                  ? `Book ${engineer.name.split(' ')[0]} Now`
                  : `Not Available in Your Area`
                }
              </span>
              {engineer.isLocal && (
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}