import React from 'react'

interface HeroHeadingProps {
  children: React.ReactNode
  className?: string
}

/**
 * HeroHeading Preset Component
 * 
 * A reusable heading component styled with:
 * - SF Pro Display font (bold/700)
 * - Gradient: black (top) to slight grey (#5a5a5a) at bottom
 * - Responsive sizing with clamp
 * - Tight letter spacing (-0.02em)
 * 
 * Usage:
 * <HeroHeading>Turn Clutter into Clarity</HeroHeading>
 */
export function HeroHeading({ children, className = '' }: HeroHeadingProps) {
  return (
    <h1 
      className={`hero-heading ${className}`}
      style={{
        background: 'linear-gradient(180deg, #000000 0%, #000000 40%, #949494 100%)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      {children}
    </h1>
  )
}

export default HeroHeading
