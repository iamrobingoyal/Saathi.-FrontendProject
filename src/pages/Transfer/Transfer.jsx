import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { Check } from 'lucide-react'
import { PageHeader } from '../../components/ui/PageHeader'
import { Card } from '../../components/cards/Card'
import { Button } from '../../components/buttons/Button'
import { useBankStore } from '../../store/useStore'
import { formatRupee, cn } from '../../utils/helpers'

const STEPS = ['step1', 'step2', 'step3', 'step4']

export default function Transfer() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [contact, setContact] = useState(null)
  const contacts = useBankStore((s) => s.contacts)
  const balance = useBankStore((s) => s.balance)
  const sendMoney = useBankStore((s) => s.sendMoney)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { amount: '' } })

  const amount = watch('amount')

  const confirm = () => {
    const ok = sendMoney(amount, contact.name)
    if (!ok) {
      toast.error('Insufficient balance or invalid amount')
      return
    }
    toast.success(t('transfer.success'))
    setStep(3)
  }

  return (
    <div className="mx-auto max-w-2xl px-4 md:px-6 py-10 md:py-14">
      <PageHeader title={t('transfer.title')} backTo="/dashboard" />

      {/* Stepper */}
      <nav aria-label="Transfer steps" className="mb-10">
        <ol className="flex items-center justify-between gap-2">
          {STEPS.map((key, i) => (
            <li key={key} className="flex-1 flex flex-col items-center gap-2">
              <span
                className={cn(
                  'w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold font-number',
                  i < step
                    ? 'bg-[var(--saathi-primary)] text-white'
                    : i === step
                      ? 'bg-[var(--saathi-primary)] text-white ring-4 ring-[var(--saathi-primary)]/20'
                      : 'bg-[var(--saathi-border)] text-muted'
                )}
                aria-current={i === step ? 'step' : undefined}
              >
                {i < step ? <Check size={16} /> : i + 1}
              </span>
              <span className="text-xs text-muted text-center hidden sm:block">
                {t(`transfer.${key}`)}
              </span>
            </li>
          ))}
        </ol>
      </nav>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="c"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
          >
            <h2 className="text-2xl font-semibold mb-5">{t('transfer.chooseContact')}</h2>
            <div className="grid gap-3">
              {contacts.map((c) => (
                <Card
                  key={c.id}
                  className={cn(
                    '!p-4 flex items-center gap-4',
                    contact?.id === c.id && 'ring-2 ring-[var(--saathi-primary)]'
                  )}
                  onClick={() => setContact(c)}
                  role="button"
                  tabIndex={0}
                  aria-pressed={contact?.id === c.id}
                >
                  <span
                    className="w-12 h-12 rounded-full bg-[var(--saathi-primary)] text-white flex items-center justify-center font-semibold text-lg"
                    aria-hidden="true"
                  >
                    {c.initial}
                  </span>
                  <div>
                    <p className="font-semibold text-ink">{c.name}</p>
                    <p className="text-sm text-muted font-number">{c.upi}</p>
                  </div>
                </Card>
              ))}
            </div>
            <Button
              className="mt-6 w-full"
              size="lg"
              disabled={!contact}
              onClick={() => setStep(1)}
            >
              {t('transfer.next')}
            </Button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.form
            key="a"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            onSubmit={handleSubmit(() => setStep(2))}
          >
            <h2 className="text-2xl font-semibold mb-2">{t('transfer.enterAmount')}</h2>
            <p className="text-muted mb-6">
              {t('balance.available')}:{' '}
              <span className="font-number text-ink">{formatRupee(balance)}</span>
            </p>
            <label className="block">
              <span className="sr-only">{t('transfer.amount')}</span>
              <div className="flex items-center gap-2 bg-card border border-soft radius-input px-5 py-4 shadow-soft">
                <span className="text-3xl text-muted" aria-hidden="true">
                  ₹
                </span>
                <input
                  type="number"
                  inputMode="numeric"
                  className="w-full bg-transparent font-number text-4xl md:text-5xl font-semibold text-ink outline-none"
                  placeholder="0"
                  aria-invalid={!!errors.amount}
                  {...register('amount', {
                    required: true,
                    min: 1,
                    max: balance,
                    valueAsNumber: true,
                  })}
                />
              </div>
            </label>
            {errors.amount && (
              <p className="mt-2 text-sm text-red-600" role="alert">
                Enter a valid amount within your balance.
              </p>
            )}
            <div className="mt-6 flex gap-3">
              <Button variant="secondary" onClick={() => setStep(0)}>
                {t('transfer.back')}
              </Button>
              <Button type="submit" className="flex-1" size="lg">
                {t('transfer.next')}
              </Button>
            </div>
          </motion.form>
        )}

        {step === 2 && (
          <motion.div
            key="confirm"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
          >
            <h2 className="text-2xl font-semibold mb-6">{t('transfer.confirmTitle')}</h2>
            <Card hover={false} className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted">{t('transfer.to')}</span>
                <span className="font-semibold">{contact?.name}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-muted">{t('transfer.amount')}</span>
                <span className="font-number text-3xl font-semibold text-brand">
                  {formatRupee(Number(amount))}
                </span>
              </div>
            </Card>
            <div className="mt-6 flex gap-3">
              <Button variant="secondary" onClick={() => setStep(1)}>
                {t('transfer.back')}
              </Button>
              <Button className="flex-1" size="lg" onClick={confirm}>
                {t('transfer.confirmBtn')}
              </Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div
              className="w-20 h-20 mx-auto rounded-full bg-[var(--saathi-primary)] text-white flex items-center justify-center mb-6"
              aria-hidden="true"
            >
              <Check size={36} />
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-ink">{t('transfer.success')}</h2>
            <p className="mt-3 text-muted">{t('transfer.successDesc')}</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="secondary"
                onClick={() => {
                  setStep(0)
                  setContact(null)
                }}
              >
                {t('transfer.another')}
              </Button>
              <Button onClick={() => navigate('/dashboard')}>{t('transfer.backHome')}</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
