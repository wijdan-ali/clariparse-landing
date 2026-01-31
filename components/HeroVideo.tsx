'use client'

import { useRef, useEffect } from 'react'

/**
 * Hero demo area: placeholder styling (border-radius, box-shadow) with hero.webm
 * video inside. Video starts playing when the hero-screen-animate (3D zoom-in)
 * animation completes; loops and stays muted for autoplay policies.
 */
export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const hasStarted = useRef(false)

  const playVideo = () => {
    if (hasStarted.current) return
    hasStarted.current = true
    videoRef.current?.play().catch(() => {})
  }

  const handleAnimationEnd = () => playVideo()

  // Fallback: if animation doesn't run (e.g. prefers-reduced-motion), start after same timeline
  useEffect(() => {
    const t = setTimeout(playVideo, 4400)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      className="relative z-10 hero-screen-animate mt-12"
      onAnimationEnd={handleAnimationEnd}
    >
      <div className="demo-placeholder w-full aspect-[16/9] overflow-hidden">
        <video
          ref={videoRef}
          src="/assets/hero.webm"
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
        />
      </div>
    </div>
  )
}
