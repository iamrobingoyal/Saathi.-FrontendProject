import { Link } from 'react-router-dom'
import { ALargeSmall, Contrast, Mic } from 'lucide-react'
import { useSettingsStore } from '../../store/useStore'
import { useTranslation } from 'react-i18next'

export function AccessibilityBar() {
  const { t } = useTranslation()
  const fontScale = useSettingsStore((s) => s.fontScale)
  const setFontScale = useSettingsStore((s) => s.setFontScale)
  const highContrast = useSettingsStore((s) => s.highContrast)
  const toggleHighContrast = useSettingsStore((s) => s.toggleHighContrast)
  const voiceMode = useSettingsStore((s) => s.voiceMode)
  const toggleVoiceMode = useSettingsStore((s) => s.toggleVoiceMode)

  return (
    <div
      className="border-b border-soft bg-card"
      role="region"
      aria-label={t('settings.accessibility')}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-2 flex flex-wrap items-center gap-3 text-sm">
        <span className="text-muted font-medium">{t('settings.accessibility')}</span>

        <div className="flex items-center gap-1" role="group" aria-label={t('settings.fontSize')}>
          <ALargeSmall size={16} className="text-muted" aria-hidden="true" />
          <button
            type="button"
            className="px-2 py-1 rounded-lg hover:bg-[var(--saathi-border)]/50 text-xs"
            aria-label="Decrease font size"
            onClick={() => setFontScale(Math.max(0.9, Number((fontScale - 0.1).toFixed(1))))}
          >
            {t('settings.smaller')}−
          </button>
          <span className="font-number text-xs text-muted w-10 text-center" aria-live="polite">
            {Math.round(fontScale * 100)}%
          </span>
          <button
            type="button"
            className="px-2 py-1 rounded-lg hover:bg-[var(--saathi-border)]/50 text-base"
            aria-label="Increase font size"
            onClick={() => setFontScale(Math.min(1.4, Number((fontScale + 0.1).toFixed(1))))}
          >
            {t('settings.larger')}+
          </button>
        </div>

        <button
          type="button"
          onClick={toggleHighContrast}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${
            highContrast
              ? 'bg-[var(--saathi-primary)] text-white'
              : 'hover:bg-[var(--saathi-border)]/50 text-muted'
          }`}
          aria-pressed={highContrast}
        >
          <Contrast size={14} aria-hidden="true" />
          {t('settings.highContrast')}
        </button>

        <button
          type="button"
          onClick={toggleVoiceMode}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${
            voiceMode
              ? 'bg-[var(--saathi-primary)] text-white'
              : 'hover:bg-[var(--saathi-border)]/50 text-muted'
          }`}
          aria-pressed={voiceMode}
        >
          <Mic size={14} aria-hidden="true" />
          {t('settings.voiceMode')}
        </button>

        <Link to="/settings" className="ml-auto text-brand text-xs font-medium hover:underline">
          {t('nav.settings')}
        </Link>
      </div>
    </div>
  )
}
