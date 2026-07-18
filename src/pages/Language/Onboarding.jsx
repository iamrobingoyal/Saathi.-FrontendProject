import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { LanguageGrid } from '../../components/language/LanguageGrid'
import { Button } from '../../components/buttons/Button'
import { useSettingsStore } from '../../store/useStore'
import { LANGUAGES } from '../../utils/helpers'
import i18n from '../../i18n'
import { speak } from '../../services/speech'
import { FamilyIllustration } from '../../components/ui/FamilyIllustration'

export default function Onboarding() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const language = useSettingsStore((s) => s.language)
  const setLanguage = useSettingsStore((s) => s.setLanguage)
  const completeOnboarding = useSettingsStore((s) => s.completeOnboarding)

  const applyLanguage = async (code) => {
    setLanguage(code)
    await i18n.changeLanguage(code)
    const meta = LANGUAGES.find((l) => l.code === code)
    speak(t('onboarding.greeting', { lng: code }), meta?.voice || 'en-IN')
  }

  const finish = () => {
    completeOnboarding()
    navigate('/dashboard')
  }

  return (
    <div className="min-h-[80vh] mx-auto max-w-3xl px-4 md:px-6 py-12 md:py-20 flex flex-col items-center justify-center">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="text-center w-full"
          >
            <FamilyIllustration className="w-56 mx-auto mb-8 opacity-90" />
            <h1 className="text-3xl md:text-4xl font-semibold text-ink">{t('onboarding.welcome')}</h1>
            <p className="mt-3 text-muted text-lg">{t('tagline')}</p>
            <Button size="lg" className="mt-10" onClick={() => setStep(1)}>
              {t('onboarding.continue')}
            </Button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="lang"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="w-full"
          >
            <h1 className="text-3xl md:text-4xl font-semibold text-ink text-center mb-2">
              {t('onboarding.askLanguage')}
            </h1>
            <p className="text-center text-muted mb-8">{t('language.subtitle')}</p>
            <LanguageGrid
              selected={language}
              onSelect={async (code) => {
                await applyLanguage(code)
                setStep(2)
              }}
            />
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="greet"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center max-w-xl"
          >
            <div
              className="w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--saathi-primary)] text-white flex items-center justify-center text-2xl font-heading"
              aria-hidden="true"
            >
              S
            </div>
            <p className="text-xl md:text-2xl text-ink leading-relaxed">{t('onboarding.greeting')}</p>
            <Button size="lg" className="mt-10" onClick={finish}>
              {t('onboarding.continue')}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
