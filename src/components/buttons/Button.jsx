import { cn } from '../../utils/helpers'

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  const variants = {
    primary:
      'bg-[var(--saathi-primary)] text-white hover:opacity-95 active:scale-[0.98]',
    secondary:
      'bg-[var(--saathi-card)] text-[var(--saathi-primary)] border border-[var(--saathi-border)] hover:border-[var(--saathi-secondary)]',
    ghost:
      'bg-transparent text-[var(--saathi-ink)] hover:bg-[var(--saathi-border)]/50',
    accent:
      'bg-[var(--saathi-accent)] text-[var(--saathi-ink)] hover:opacity-95',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm min-h-10',
    md: 'px-6 py-3 text-base min-h-12',
    lg: 'px-8 py-4 text-lg min-h-14',
  }

  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium radius-btn transition-transform duration-200 hover:scale-[1.03] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
