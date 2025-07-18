'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Code, Mail, MapPin, Clock, ExternalLink } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-950 border-t border-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-1 lg:col-span-2"
          >
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Engineer OnDemand</h3>
                <p className="text-sm text-gray-400">Rent engineers by the minute</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 max-w-md">
              Connecting businesses with expert engineers in co-working spaces. 
              Get instant technical help without the hassle of hiring or contracts.
            </p>

            <div className="space-y-3">
              <div className="flex items-center text-gray-400">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">Available in 12+ cities nationwide</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Clock className="w-4 h-4 mr-2" />
                <span className="text-sm">Engineers available 9 AM - 6 PM local time</span>
              </div>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Web Development</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Mobile Apps</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">DevOps & Cloud</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Data Science</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">AI & Machine Learning</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Technical Consulting</a></li>
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">For Engineers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Co-working Partners</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Press</a></li>
            </ul>
          </motion.div>
        </div>

        {/* Contact & Social */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 pt-8 border-t border-gray-800"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 mb-4 sm:mb-0">
              <a 
                href="mailto:hello@engineerondemand.com" 
                className="flex items-center text-gray-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 mr-2" />
                <span>hello@engineerondemand.com</span>
              </a>
            </div>

            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                Status
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 pt-6 border-t border-gray-800 text-center"
        >
          <p className="text-gray-400 text-sm">
            © {currentYear} Engineer OnDemand. All rights reserved. Built by engineers, for engineers.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}