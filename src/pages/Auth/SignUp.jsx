import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '../../components/buttons/Button'
import { useAuthStore } from '../../store/useAuthStore'
import { useSettingsStore } from '../../store/useStore'
import toast from 'react-hot-toast'

export default function SignUp() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const register = useAuthStore((s) => s.register)
  const setUserName = useSettingsStore((s) => s.setUserName)
  const onboardingDone = useSettingsStore((s) => s.onboardingDone)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !email || !phone || !password) {
      toast.error('Please fill in all fields.')
      return
    }

    setLoading(true)
    const result = register(name, email, phone, password)
    setLoading(false)

    if (result.success) {
      setUserName(name)
      toast.success(t('auth.signupSuccess'))
      navigate(onboardingDone ? '/dashboard' : '/onboarding')
    } else {
      if (result.message === 'emailExists') {
        toast.error('An account with this email already exists.')
      } else {
        toast.error('Sign up failed. Please try again.')
      }
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="bg-card border border-soft shadow-soft radius-card max-w-md w-full p-6 md:p-8 flex flex-col gap-6">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-ink tracking-tight">{t('auth.signup')}</h1>
          <p className="mt-2 text-sm text-muted">{t('tagline')}</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-ink">{t('auth.name')}</label>
            <input
              type="text"
              required
              placeholder="e.g. Robin"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-4 py-3 radius-input border border-soft bg-surface text-ink transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-ink">{t('auth.phone')}</label>
            <input
              type="tel"
              required
              placeholder="e.g. 9876543210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="px-4 py-3 radius-input border border-soft bg-surface text-ink transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-ink">{t('auth.email')}</label>
            <input
              type="email"
              required
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 radius-input border border-soft bg-surface text-ink transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-ink">{t('auth.password')}</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-3 radius-input border border-soft bg-surface text-ink transition-all"
            />
          </div>

          <Button type="submit" disabled={loading} className="mt-2 w-full justify-center">
            {loading ? t('common.loading') : t('auth.signup')}
          </Button>
        </form>

        <div className="text-center border-t border-soft pt-4 text-sm text-muted">
          <Link to="/login" className="text-brand font-semibold hover:underline">
            {t('auth.haveAccount')}
          </Link>
        </div>
      </div>
    </div>
  )
}
