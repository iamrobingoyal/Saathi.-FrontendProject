import { motion } from 'framer-motion'
import { cn } from '../../utils/helpers'

export function Card({
  children,
  className = '',
  hover = true,
  onClick,
  role,
  tabIndex,
  onKeyDown,
  ...props
}) {
  return (
    <motion.div
      className={cn(
        'bg-card border border-soft shadow-soft radius-card p-5 md:p-6',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      role={role}
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
      whileHover={hover ? { y: -6 } : undefined}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function FeatureCard({ icon, title, description, onClick }) {
  return (
    <Card
      onClick={onClick}
      className="flex flex-col gap-3 h-full group"
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onClick()
              }
            }
          : undefined
      }
    >
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl bg-[color-mix(in_srgb,var(--saathi-primary)_10%,transparent)] transition-transform duration-200 group-hover:rotate-[5deg]"
        aria-hidden="true"
      >
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <p className="text-muted text-sm leading-relaxed">{description}</p>
    </Card>
  )
}

export function ActionCard({ icon, title, onClick, className = '' }) {
  return (
    <Card
      onClick={onClick}
      className={cn('flex flex-col items-start gap-4 min-h-[140px] group', className)}
      role="button"
      tabIndex={0}
      aria-label={title}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick?.()
        }
      }}
    >
      <span
        className="text-3xl transition-transform duration-200 group-hover:rotate-[5deg]"
        aria-hidden="true"
      >
        {icon}
      </span>
      <span className="text-lg font-semibold text-ink">{title}</span>
    </Card>
  )
}
