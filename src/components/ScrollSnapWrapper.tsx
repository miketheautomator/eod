'use client'

import React from 'react'

interface ScrollSnapWrapperProps {
  children: React.ReactNode
}

export const scrollToNextSection = () => {
  const ctaSection = document.querySelector('[data-section="cta"]')
  if (ctaSection) {
    ctaSection.scrollIntoView({ behavior: 'smooth' })
  }
}

export default function ScrollSnapWrapper({ children }: ScrollSnapWrapperProps) {
  return (
    <div 
      className="scroll-snap-container"
      style={{
        height: '100vh',
        overflowY: 'auto',
        scrollSnapType: 'y mandatory'
      }}
    >
      {React.Children.map(children, (child, index) => (
        <div
          data-section={index === 0 ? 'hero' : index === 1 ? 'cta' : 'footer'}
          className="scroll-snap-section"
          style={{
            height: '100vh',
            scrollSnapAlign: 'start'
          }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}