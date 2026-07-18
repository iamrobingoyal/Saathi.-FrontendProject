import { useEffect, useRef, useState } from 'react'

/**
 * Soft companion dots that follow the cursor across the site.
 * Two dots = "Saathi by your side" — calm lag, never flashy.
 */
export function CursorDots() {
  const primary = useRef({ x: -100, y: -100 })
  const secondary = useRef({ x: -100, y: -100 })
  const target = useRef({ x: -100, y: -100 })
  const raf = useRef(0)
  const [visible, setVisible] = useState(false)
  const [reduced, setReduced] = useState(false)
  const aRef = useRef(null)
  const bRef = useRef(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const fine = window.matchMedia('(pointer: fine)')
    const update = () => setReduced(mq.matches || !fine.matches)
    update()
    mq.addEventListener('change', update)
    fine.addEventListener('change', update)
    return () => {
      mq.removeEventListener('change', update)
      fine.removeEventListener('change', update)
    }
  }, [])

  useEffect(() => {
    if (reduced) return undefined

    const onMove = (e) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
      setVisible(true)
    }
    const onLeave = () => setVisible(false)

    window.addEventListener('mousemove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)

    const tick = () => {
      primary.current.x += (target.current.x - primary.current.x) * 0.22
      primary.current.y += (target.current.y - primary.current.y) * 0.22
      secondary.current.x += (primary.current.x - secondary.current.x) * 0.12
      secondary.current.y += (primary.current.y - secondary.current.y) * 0.12

      if (aRef.current) {
        aRef.current.style.transform = `translate3d(${primary.current.x}px, ${primary.current.y}px, 0)`
      }
      if (bRef.current) {
        bRef.current.style.transform = `translate3d(${secondary.current.x}px, ${secondary.current.y}px, 0)`
      }
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf.current)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[60] overflow-hidden"
      aria-hidden="true"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.35s ease' }}
    >
      {/* Lead dot — primary green */}
      <span
        ref={aRef}
        className="absolute top-0 left-0 will-change-transform"
        style={{ marginLeft: -7, marginTop: -7 }}
      >
        <span
          className="block w-3.5 h-3.5 rounded-full"
          style={{
            background: 'var(--saathi-primary)',
            boxShadow: '0 0 0 4px color-mix(in srgb, var(--saathi-primary) 18%, transparent)',
          }}
        />
      </span>

      {/* Trailing companion dot — accent gold */}
      <span
        ref={bRef}
        className="absolute top-0 left-0 will-change-transform"
        style={{ marginLeft: -5, marginTop: -5 }}
      >
        <span
          className="block w-2.5 h-2.5 rounded-full"
          style={{
            background: 'var(--saathi-accent)',
            boxShadow: '0 0 0 3px color-mix(in srgb, var(--saathi-accent) 22%, transparent)',
            opacity: 0.9,
          }}
        />
      </span>
    </div>
  )
}
