import React from 'react'

interface HeroButtonProps {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

/**
 * HeroButton Preset Component
 * 
 * A reusable button component styled with:
 * - SF Pro Display font (medium/500)
 * - Gradient: top-left (#BFC9BB) to middle-bottom (#7C9082)
 * - Inner white blurred shadows (stronger on left/right, subtle on top/bottom)
 * - Shine sweep animation on hover
 * - Lift effect on hover
 * 
 * Usage:
 * <HeroButton onClick={handleClick}>Try Now</HeroButton>
 * <HeroButton href="/app">Get Started</HeroButton>
 */
export function HeroButton({ 
  children, 
  onClick, 
  href, 
  className = '',
  type = 'button'
}: HeroButtonProps) {
  const baseClasses = `hero-btn ${className}`

  if (href) {
    return (
      <a href={href} className={baseClasses}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={baseClasses}>
      {children}
    </button>
  )
}

export default HeroButton
