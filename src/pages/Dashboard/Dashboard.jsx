import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ActionCard, Card } from '../../components/cards/Card'
import { PageHeader } from '../../components/ui/PageHeader'
import { useBankStore, useSettingsStore } from '../../store/useStore'
import { getGreetingKey } from '../../utils/helpers'
import { Lightbulb, ChevronRight } from 'lucide-react'

export default function Dashboard() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const userName = useSettingsStore((s) => s.userName)
  const progress = useBankStore((s) => s.learningProgress)

  const actions = [
    { icon: '💰', title: t('dashboard.checkBalance'), to: '/balance' },
    { icon: '📤', title: t('dashboard.sendMoney'), to: '/transfer' },
    { icon: '📥', title: t('dashboard.receiveMoney'), to: '/transfer' },
    { icon: '🏦', title: t('dashboard.nearbyAtm'), to: '/nearby' },
    { icon: '📖', title: t('dashboard.learnBanking'), to: '/learn' },
    { icon: '🛡️', title: t('dashboard.staySafe'), to: '/safety' },
    { icon: '🎤', title: t('dashboard.voiceAssistant'), to: '/voice' },
    { icon: '⚙️', title: t('nav.settings'), to: '/settings' },
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 md:px-6 py-10 md:py-14">
      <PageHeader
        title={`${t(getGreetingKey())} 👋`}
        subtitle={`${userName} — ${t('dashboard.helpToday')}`}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {actions.map((a) => (
          <ActionCard
            key={a.to + a.title}
            icon={a.icon}
            title={a.title}
            onClick={() => navigate(a.to)}
          />
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        <Card
          className="flex gap-4 items-start"
          onClick={() => navigate('/safety')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') navigate('/safety')
          }}
        >
          <div
            className="w-12 h-12 rounded-2xl bg-[color-mix(in_srgb,var(--saathi-accent)_25%,transparent)] flex items-center justify-center shrink-0"
            aria-hidden="true"
          >
            <Lightbulb className="text-[var(--saathi-accent)]" size={22} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-brand">{t('dashboard.dailyTip')}</p>
            <p className="mt-1 text-ink">{t('dashboard.tipText')}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm text-brand font-medium">
              {t('dashboard.readMore')} <ChevronRight size={16} />
            </span>
          </div>
        </Card>

        <Card onClick={() => navigate('/learn')} role="button" tabIndex={0}>
          <div className="flex items-center justify-between mb-3">
            <p className="font-semibold text-ink">{t('dashboard.learningJourney')}</p>
            <span className="font-number text-brand font-semibold">{progress}%</span>
          </div>
          <div
            className="h-3 rounded-full bg-[var(--saathi-border)] overflow-hidden"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={t('dashboard.learningJourney')}
          >
            <div
              className="h-full rounded-full bg-[var(--saathi-primary)] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </Card>
      </div>
    </div>
  )
}
