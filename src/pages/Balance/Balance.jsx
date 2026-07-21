import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '../../components/ui/PageHeader'
import { Card } from '../../components/cards/Card'
import { useBankStore } from '../../store/useStore'
import { formatRupee } from '../../utils/helpers'
import { ArrowDownLeft, ArrowUpRight, Eye, EyeOff } from 'lucide-react'

export default function Balance() {
  const { t } = useTranslation()
  const [showBalance, setShowBalance] = useState(false)
  const balance = useBankStore((s) => s.balance)
  const transactions = useBankStore((s) => s.transactions)

  return (
    <div className="mx-auto max-w-3xl px-4 md:px-6 py-10 md:py-14">
      <PageHeader title={t('balance.title')} backTo="/dashboard" />

      <div className="bg-[var(--saathi-primary)] text-white radius-card p-5 md:p-6 shadow-soft mb-8 relative">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-white/80 text-sm">{t('balance.savings')}</p>
            <p className="mt-2 text-sm text-white/70">{t('balance.available')}</p>
          </div>
          <button
            type="button"
            onClick={() => setShowBalance(!showBalance)}
            className="p-2 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors"
            aria-label={showBalance ? 'Hide balance' : 'Show balance'}
          >
            {showBalance ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <p className="mt-2 font-number text-4xl md:text-5xl font-semibold tracking-tight">
          {showBalance ? formatRupee(balance) : '••••••'}
        </p>
      </div>

      {/* Quick Navigation Panel */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <Link
          to="/dashboard"
          className="flex flex-col items-center justify-center p-4 bg-card border border-soft hover:border-[var(--saathi-primary)] transition-colors radius-card text-center gap-2 group"
        >
          <span className="text-2xl group-hover:scale-110 transition-transform" aria-hidden="true">
            🏠
          </span>
          <span className="text-xs font-semibold text-ink">{t('nav.home')}</span>
        </Link>
        <Link
          to="/transfer"
          className="flex flex-col items-center justify-center p-4 bg-card border border-soft hover:border-[var(--saathi-primary)] transition-colors radius-card text-center gap-2 group"
        >
          <span className="text-2xl group-hover:scale-110 transition-transform" aria-hidden="true">
            📤
          </span>
          <span className="text-xs font-semibold text-ink">{t('dashboard.sendMoney')}</span>
        </Link>
        <Link
          to="/safety"
          className="flex flex-col items-center justify-center p-4 bg-card border border-soft hover:border-[var(--saathi-primary)] transition-colors radius-card text-center gap-2 group"
        >
          <span className="text-2xl group-hover:scale-110 transition-transform" aria-hidden="true">
            🛡️
          </span>
          <span className="text-xs font-semibold text-ink">{t('dashboard.staySafe')}</span>
        </Link>
      </div>

      <h2 className="text-xl font-semibold text-ink mb-4">{t('balance.transactions')}</h2>
      <ol className="relative border-l border-soft ml-3 space-y-0">
        {transactions.map((tx) => (
          <li key={tx.id} className="relative pl-8 pb-6">
            <span
              className={`absolute -left-3 top-1 w-6 h-6 rounded-full flex items-center justify-center ${
                tx.type === 'credit'
                  ? 'bg-[color-mix(in_srgb,var(--saathi-primary)_15%,transparent)] text-brand'
                  : 'bg-[color-mix(in_srgb,var(--saathi-accent)_20%,transparent)] text-[var(--saathi-ink)]'
              }`}
              aria-hidden="true"
            >
              {tx.type === 'credit' ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}
            </span>
            <Card hover={false} className="!p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-ink">{tx.title}</p>
                  <p className="text-sm text-muted mt-0.5">
                    {tx.date} · {tx.category}
                  </p>
                </div>
                <p
                  className={`font-number font-semibold shrink-0 ${
                    tx.type === 'credit' ? 'text-brand' : 'text-ink'
                  }`}
                >
                  {tx.type === 'credit' ? '+' : '−'}
                  {formatRupee(tx.amount)}
                </p>
              </div>
              <span className="sr-only">
                {tx.type === 'credit' ? t('balance.credit') : t('balance.debit')}
              </span>
            </Card>
          </li>
        ))}
      </ol>
    </div>
  )
}
