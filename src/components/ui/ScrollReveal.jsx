import { useEffect, useRef, useState } from 'react'

/**
 * ScrollReveal component to add smooth scroll-triggered animations.
 * Uses native IntersectionObserver and CSS transitions to guarantee
 * zero layout flash (FOUC) and high-performance rendering.
 */
export function ScrollReveal({
  children,
  mode = 'single', // retained for compatibility, treated as item
  direction = 'up', // 'up', 'down', 'left', 'right', 'fade'
  delay = 0, // delay in seconds
  duration = 0.8, // Slowed down from 0.35s to 0.8s for smooth, elegant feel
  distance = 20, // distance in pixels
  threshold = 0.05,
  className = '',
  ...props
}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false)

  // Listen to prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setShouldReduceMotion(mq.matches)
    const listener = (e) => setShouldReduceMotion(e.matches)
    mq.addEventListener('change', listener)
    return () => mq.removeEventListener('change', listener)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el) // Animate only once
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -20px 0px', // Trigger slightly before element is fully in view
      }
    )

    observer.observe(el)

    return () => {
      if (el) observer.unobserve(el)
    }
  }, [threshold])

  // Get initial transform style based on direction and distance
  const getTransform = () => {
    if (shouldReduceMotion) return 'none'
    const dist = `${distance}px`
    switch (direction) {
      case 'up':
        return `translateY(${dist})`
      case 'down':
        return `translateY(-${dist})`
      case 'left':
        return `translateX(${dist})`
      case 'right':
        return `translateX(-${dist})`
      case 'fade':
      default:
        return 'none'
    }
  }

  // Styles applied inline immediately to prevent flash of content on mount
  const style = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'none' : getTransform(),
    transition: shouldReduceMotion
      ? `opacity 0.3s ease`
      : `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
    willChange: 'transform, opacity',
  }

  // Support container mode by rendering children without double-wrapping
  if (mode === 'container') {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    )
  }

  return (
    <div
      ref={ref}
      style={style}
      className={className}
      {...props}
    >
      {children}
    </div>
  )
}
