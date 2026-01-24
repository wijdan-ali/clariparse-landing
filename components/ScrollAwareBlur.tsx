'use client';

import { useEffect, useRef, useState } from 'react';
import GradualBlur from '@/components/ui/GradualBlur';

export default function ScrollAwareBlur() {
  const [opacity, setOpacity] = useState(1);
  const footerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!footerRef.current) {
        // Find footer element
        footerRef.current = document.querySelector('footer') as HTMLElement;
      }

      if (!footerRef.current) return;

      const footerTop = footerRef.current.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;
      
      // Start fading when footer is within 2 viewport heights from bottom
      const fadeStartDistance = viewportHeight * 2;
      const fadeEndDistance = viewportHeight * 0.5; // Fully faded when footer is 0.5 viewport heights away
      
      // Calculate distance from bottom of viewport to footer
      const distanceToFooter = footerTop;
      
      let newOpacity = 1;
      
      if (distanceToFooter < fadeStartDistance) {
        // Start fading
        const fadeRange = fadeStartDistance - fadeEndDistance;
        const fadeProgress = Math.max(0, Math.min(1, (fadeStartDistance - distanceToFooter) / fadeRange));
        newOpacity = 1 - fadeProgress;
      }
      
      setOpacity(Math.max(0, Math.min(1, newOpacity)));
    };

    // Initial check
    handleScroll();
    
    // Throttle scroll events for performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <GradualBlur
      target="page"
      position="bottom"
      height="7rem"
      strength={2}
      divCount={5}
      curve="bezier"
      exponential
      opacity={opacity}
      style={{
        transition: 'opacity 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
    />
  );
}
