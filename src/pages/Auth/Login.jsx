import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '../../components/buttons/Button'
import { useAuthStore } from '../../store/useAuthStore'
import { useSettingsStore } from '../../store/useStore'
import toast from 'react-hot-toast'

export default function Login() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)
  const recoverPassword = useAuthStore((s) => s.recoverPassword)
  const setUserName = useSettingsStore((s) => s.setUserName)
  const onboardingDone = useSettingsStore((s) => s.onboardingDone)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [recoveryIdentifier, setRecoveryIdentifier] = useState('')
  const [showRecovery, setShowRecovery] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Please enter email/phone and password.')
      return
    }

    setLoading(true)
    const result = login(email, password)
    setLoading(false)

    if (result.success) {
      const currentUser = useAuthStore.getState().currentUser
      if (currentUser) {
        setUserName(currentUser.name)
      }
      toast.success(t('auth.loginSuccess'))
      navigate(onboardingDone ? '/dashboard' : '/onboarding')
    } else {
      if (result.message === 'userNotFound') {
        toast.error(t('auth.userNotFound'))
      } else if (result.message === 'invalidPassword') {
        toast.error(t('auth.invalidPassword'))
      } else {
        toast.error('Login failed. Please try again.')
      }
    }
  }

  const handleRecover = (e) => {
    e.preventDefault()
    if (!recoveryIdentifier) {
      toast.error('Please enter your email or phone number.')
      return
    }
    const result = recoverPassword(recoveryIdentifier)
    if (result.success) {
      toast.success(t('auth.recoverySuccess', { password: result.password }), {
        duration: 8000,
        position: 'bottom-center',
      })
      setShowRecovery(false)
    } else {
      toast.error(t('auth.recoveryFailed'))
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="bg-card border border-soft shadow-soft radius-card max-w-md w-full p-6 md:p-8 flex flex-col gap-6">
        {showRecovery ? (
          <>
            <div className="text-center">
              <h1 className="text-3xl font-semibold text-ink tracking-tight">
                {t('auth.forgotPassword')}
              </h1>
              <p className="mt-2 text-sm text-muted">{t('auth.enterDetails')}</p>
            </div>

            <form onSubmit={handleRecover} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-ink">{t('auth.emailOrPhone')}</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. name@example.com or 9876543210"
                  value={recoveryIdentifier}
                  onChange={(e) => setRecoveryIdentifier(e.target.value)}
                  className="px-4 py-3 radius-input border border-soft bg-surface text-ink transition-all"
                />
              </div>

              <Button type="submit" className="mt-2 w-full justify-center">
                {t('auth.recover')}
              </Button>

              <button
                type="button"
                onClick={() => setShowRecovery(false)}
                className="mt-1 text-sm text-brand font-semibold hover:underline"
              >
                {t('common.back')}
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="text-center">
              <h1 className="text-3xl font-semibold text-ink tracking-tight">{t('auth.login')}</h1>
              <p className="mt-2 text-sm text-muted">{t('tagline')}</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-ink">{t('auth.emailOrPhone')}</label>
                <input
                  type="text"
                  required
                  placeholder="name@example.com or 9876543210"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-3 radius-input border border-soft bg-surface text-ink transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-ink">{t('auth.password')}</label>
                  <button
                    type="button"
                    onClick={() => setShowRecovery(true)}
                    className="text-xs text-brand font-semibold hover:underline"
                  >
                    {t('auth.forgotPassword')}
                  </button>
                </div>
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
                {loading ? t('common.loading') : t('auth.login')}
              </Button>
            </form>
          </>
        )}

        <div className="text-center border-t border-soft pt-4 text-sm text-muted">
          <Link to="/signup" className="text-brand font-semibold hover:underline">
            {t('auth.needAccount')}
          </Link>
        </div>
      </div>
    </div>
  )
}
