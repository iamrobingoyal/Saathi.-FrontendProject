import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSettingsStore } from '../store/useStore'
import { speak } from '../services/speech'
import { LANGUAGES } from '../utils/helpers'

const titles = {
  '/': 'landing.heroTitle',
  '/dashboard': 'dashboard.helpToday',
  '/balance': 'balance.title',
  '/transfer': 'transfer.title',
  '/learn': 'learn.title',
  '/safety': 'safety.title',
  '/nearby': 'nearby.title',
  '/voice': 'voice.title',
  '/help': 'help.title',
  '/settings': 'settings.title',
  '/language': 'language.title',
  '/onboarding': 'onboarding.welcome',
}

export function useVoiceAnnounce() {
  const location = useLocation()
  const { t } = useTranslation()
  const voiceMode = useSettingsStore((s) => s.voiceMode)
  const language = useSettingsStore((s) => s.language)

  useEffect(() => {
    if (!voiceMode) return
    const key = titles[location.pathname]
    if (!key) return
    const voice = LANGUAGES.find((l) => l.code === language)?.voice || 'en-IN'
    const timer = setTimeout(() => speak(t(key), voice), 400)
    return () => clearTimeout(timer)
  }, [location.pathname, voiceMode, language, t])
}
