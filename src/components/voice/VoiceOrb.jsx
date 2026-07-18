import { motion } from 'framer-motion'
import { Mic } from 'lucide-react'
import { cn } from '../../utils/helpers'

export function VoiceOrb({ active = false, onClick, label, size = 'lg' }) {
  const dims = size === 'lg' ? 'w-44 h-44 md:w-52 md:h-52' : 'w-28 h-28'

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        'relative rounded-full flex items-center justify-center transition-transform hover:scale-[1.03]',
        dims
      )}
    >
      {active && (
        <>
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-[var(--saathi-primary)]/40"
            animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
          <motion.span
            className="absolute inset-3 rounded-full border-2 border-[var(--saathi-accent)]/50"
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: 0.2 }}
          />
        </>
      )}
      <span
        className={cn(
          'relative z-10 rounded-full flex items-center justify-center shadow-soft',
          size === 'lg' ? 'w-36 h-36 md:w-40 md:h-40' : 'w-20 h-20',
          active
            ? 'bg-[var(--saathi-primary)] text-white'
            : 'bg-card border border-soft text-brand'
        )}
      >
        <Mic size={size === 'lg' ? 40 : 24} aria-hidden="true" />
      </span>
    </button>
  )
}
