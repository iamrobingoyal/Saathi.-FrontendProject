import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LanguageGrid } from '../../components/language/LanguageGrid'
import { PageHeader } from '../../components/ui/PageHeader'
import { Button } from '../../components/buttons/Button'
import { useSettingsStore } from '../../store/useStore'
import i18n from '../../i18n'
import toast from 'react-hot-toast'

export default function LanguagePage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const language = useSettingsStore((s) => s.language)
  const setLanguage = useSettingsStore((s) => s.setLanguage)

  const select = async (code) => {
    setLanguage(code)
    await i18n.changeLanguage(code)
    toast.success(t('language.title'))
  }

  return (
    <div className="mx-auto max-w-4xl px-4 md:px-6 py-10 md:py-14">
      <PageHeader title={t('language.title')} subtitle={t('language.subtitle')} backTo="/" />
      <LanguageGrid selected={language} onSelect={select} />
      <div className="mt-8 flex justify-center">
        <Button onClick={() => navigate('/dashboard')}>{t('onboarding.continue')}</Button>
      </div>
    </div>
  )
}
