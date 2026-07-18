import { useTranslation } from 'react-i18next'
import { PageHeader } from '../../components/ui/PageHeader'
import { Card } from '../../components/cards/Card'
import { useBankStore } from '../../store/useStore'
import { formatRupee } from '../../utils/helpers'
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'

export default function Balance() {
  const { t } = useTranslation()
  const balance = useBankStore((s) => s.balance)
  const transactions = useBankStore((s) => s.transactions)

  return (
    <div className="mx-auto max-w-3xl px-4 md:px-6 py-10 md:py-14">
      <PageHeader title={t('balance.title')} backTo="/dashboard" />

      <Card hover={false} className="bg-[var(--saathi-primary)] text-white border-0 mb-8">
        <p className="text-white/80 text-sm">{t('balance.savings')}</p>
        <p className="mt-2 text-sm text-white/70">{t('balance.available')}</p>
        <p className="mt-1 font-number text-4xl md:text-5xl font-semibold tracking-tight">
          {formatRupee(balance)}
        </p>
      </Card>

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
