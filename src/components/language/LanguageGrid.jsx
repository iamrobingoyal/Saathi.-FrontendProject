import { Volume2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { LANGUAGES } from '../../utils/helpers'
import { speak } from '../../services/speech'
import { cn } from '../../utils/helpers'

export function LanguageGrid({ selected, onSelect, showHear = true }) {
  const { t } = useTranslation()

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      role="listbox"
      aria-label={t('language.title')}
    >
      {LANGUAGES.map((lang) => {
        const isSelected = selected === lang.code
        return (
          <div key={lang.code} className="relative" role="option" aria-selected={isSelected}>
            <button
              type="button"
              onClick={() => onSelect(lang.code)}
              className={cn(
                'w-full text-left bg-card border shadow-soft radius-card p-5 md:p-6 transition-all duration-200 hover:scale-[1.02] hover:-translate-y-1 min-h-[110px]',
                isSelected
                  ? 'border-[var(--saathi-primary)] ring-2 ring-[var(--saathi-primary)]/30'
                  : 'border-soft'
              )}
            >
              <span className="text-3xl" aria-hidden="true">
                {lang.flag}
              </span>
              <p className="mt-3 text-xl font-semibold text-ink font-heading">{lang.native}</p>
              <p className="text-sm text-muted">{lang.label}</p>
            </button>
            {showHear && (
              <button
                type="button"
                className="absolute top-4 right-4 p-2 rounded-xl bg-[color-mix(in_srgb,var(--saathi-primary)_10%,transparent)] text-brand hover:scale-105"
                aria-label={`${t('language.hear')} ${lang.native}`}
                onClick={(e) => {
                  e.stopPropagation()
                  speak(lang.native, lang.voice)
                }}
              >
                <Volume2 size={18} />
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}
