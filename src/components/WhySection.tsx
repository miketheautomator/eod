'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Zap, 
  DollarSign, 
  Clock, 
  Users, 
  Target,
  Rocket,
  Building
} from 'lucide-react'

export default function WhySection() {
  return (
    <div className="relative text-center text-white">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-3xl blur-3xl" />
      
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
            Perfect for Startups & Small Teams
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Move fast, stay lean, and access world-class engineering without the overhead.
          </p>
        </motion.div>

        {/* Problem/Solution Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-12 mb-16"
        >
          {/* Problems */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-300 mb-6">Traditional Hiring Problems</h3>
            
            <div className="space-y-4">
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-gray-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Hiring Takes Forever</h4>
                    <p className="text-gray-400 text-sm">2-4 months to find, interview, and onboard senior engineers. Your competition ships features while you&apos;re still interviewing.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <DollarSign className="w-6 h-6 text-gray-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Expensive & Risky</h4>
                    <p className="text-gray-400 text-sm">$200K+ salaries, benefits, equity, and management overhead. Bad hires cost 3x their salary.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Building className="w-6 h-6 text-gray-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Skill Mismatches</h4>
                    <p className="text-gray-400 text-sm">Need React today, AI next month, DevOps next quarter? Good luck finding one person who&apos;s expert at everything.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Solutions */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-300 mb-6">Engineer On Demand Solution</h3>
            
            <div className="space-y-4">
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Zap className="w-6 h-6 text-gray-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Start Building Today</h4>
                    <p className="text-gray-400 text-sm">Book an engineer in minutes. Start working immediately. Ship features while competitors are still posting job ads.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Target className="w-6 h-6 text-gray-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Pay for Results Only</h4>
                    <p className="text-gray-400 text-sm">$2.50/minute. No salaries, no benefits, no management. Pay for productive work, not meetings and overhead.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-gray-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Right Expert, Right Time</h4>
                    <p className="text-gray-400 text-sm">Need different skills? Switch engineers instantly. Frontend expert for UI, backend specialist for APIs, DevOps guru for scaling.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Use Cases */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-semibold text-white text-center mb-8">Perfect For These Situations</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center">
              <Rocket className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h4 className="font-semibold text-white mb-2">MVP Development</h4>
              <p className="text-gray-400 text-sm">Build your prototype with senior engineers without long-term commitments</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center">
              <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <h4 className="font-semibold text-white mb-2">Critical Fixes</h4>
              <p className="text-gray-400 text-sm">Production down? Get expert help immediately, not in 3 months</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center">
              <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <h4 className="font-semibold text-white mb-2">Scaling Challenges</h4>
              <p className="text-gray-400 text-sm">Handle traffic spikes and performance issues with experienced architects</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center">
              <Users className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <h4 className="font-semibold text-white mb-2">Team Augmentation</h4>
              <p className="text-gray-400 text-sm">Temporarily boost your team&apos;s capacity for big projects or tight deadlines</p>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center space-y-6"
        >
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-8">
            <h3 className="text-2xl font-semibold text-white mb-4">Ready to Move Fast?</h3>
            <p className="text-gray-300 mb-6">
              Stop waiting for the perfect hire. Start building with world-class engineers today.
            </p>
            <div className="text-gray-400 text-sm mb-6">
              Want to join our Engineer as a Service platform? Contact us at{' '}
              <a 
                href="mailto:hello+eaas-request@whytilt.com" 
                className="text-blue-400 hover:text-blue-300 underline transition-colors"
              >
                hello+eaas-request@whytilt.com
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}