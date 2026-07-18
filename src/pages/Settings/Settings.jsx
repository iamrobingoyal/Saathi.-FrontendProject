import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '../../components/ui/PageHeader'
import { Card } from '../../components/cards/Card'
import { Button } from '../../components/buttons/Button'
import { LanguageGrid } from '../../components/language/LanguageGrid'
import { useSettingsStore } from '../../store/useStore'
import i18n from '../../i18n'
import { cn } from '../../utils/helpers'
import toast from 'react-hot-toast'

function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={cn(
        'relative w-12 h-7 rounded-full transition-colors',
        checked ? 'bg-[var(--saathi-primary)]' : 'bg-[var(--saathi-border)]'
      )}
    >
      <span
        className={cn(
          'absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow transition-transform',
          checked && 'translate-x-5'
        )}
      />
    </button>
  )
}

export default function Settings() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const {
    language,
    setLanguage,
    darkMode,
    toggleDarkMode,
    highContrast,
    toggleHighContrast,
    fontScale,
    setFontScale,
    voiceMode,
    toggleVoiceMode,
    notifications,
    toggleNotifications,
    resetOnboarding,
  } = useSettingsStore()

  const selectLang = async (code) => {
    setLanguage(code)
    await i18n.changeLanguage(code)
    toast.success(t('language.title'))
  }

  return (
    <div className="mx-auto max-w-3xl px-4 md:px-6 py-10 md:py-14">
      <PageHeader title={t('settings.title')} backTo="/dashboard" />

      <section className="mb-10" aria-labelledby="lang-heading">
        <h2 id="lang-heading" className="text-lg font-semibold mb-4">
          {t('settings.language')}
        </h2>
        <LanguageGrid selected={language} onSelect={selectLang} showHear={false} />
      </section>

      <section className="space-y-3" aria-labelledby="a11y-heading">
        <h2 id="a11y-heading" className="text-lg font-semibold mb-4">
          {t('settings.accessibility')}
        </h2>

        <Card hover={false} className="!p-4 flex items-center justify-between gap-4">
          <span className="font-medium">{t('settings.darkMode')}</span>
          <Toggle checked={darkMode} onChange={toggleDarkMode} label={t('settings.darkMode')} />
        </Card>

        <Card hover={false} className="!p-4 flex items-center justify-between gap-4">
          <span className="font-medium">{t('settings.highContrast')}</span>
          <Toggle
            checked={highContrast}
            onChange={toggleHighContrast}
            label={t('settings.highContrast')}
          />
        </Card>

        <Card hover={false} className="!p-4 flex items-center justify-between gap-4">
          <span className="font-medium">{t('settings.voiceMode')}</span>
          <Toggle checked={voiceMode} onChange={toggleVoiceMode} label={t('settings.voiceMode')} />
        </Card>

        <Card hover={false} className="!p-4 flex items-center justify-between gap-4">
          <span className="font-medium">{t('settings.notifications')}</span>
          <Toggle
            checked={notifications}
            onChange={toggleNotifications}
            label={t('settings.notifications')}
          />
        </Card>

        <Card hover={false} className="!p-4">
          <div className="flex items-center justify-between gap-4 mb-3">
            <span className="font-medium">{t('settings.fontSize')}</span>
            <span className="font-number text-sm text-muted">{Math.round(fontScale * 100)}%</span>
          </div>
          <label className="block">
            <span className="sr-only">{t('settings.fontSize')}</span>
            <input
              type="range"
              min="0.9"
              max="1.4"
              step="0.1"
              value={fontScale}
              onChange={(e) => setFontScale(Number(e.target.value))}
              className="w-full accent-[var(--saathi-primary)]"
            />
          </label>
        </Card>
      </section>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button
          variant="secondary"
          onClick={() => {
            resetOnboarding()
            navigate('/onboarding')
          }}
        >
          {t('settings.resetTour')}
        </Button>
        <Button onClick={() => navigate('/dashboard')}>{t('common.save')}</Button>
      </div>
    </div>
  )
}
