import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { X, ShieldAlert } from 'lucide-react'
import toast from 'react-hot-toast'
import { PageHeader } from '../../components/ui/PageHeader'
import { Card } from '../../components/cards/Card'
import { Button } from '../../components/buttons/Button'
import { quizQuestions } from '../../data/content'
import { cn } from '../../utils/helpers'

const scams = [
  { id: 'fakeCalls', icon: '📞' },
  { id: 'otpScam', icon: '🔐' },
  { id: 'qrScam', icon: '📷' },
  { id: 'lotteryScam', icon: '🎁' },
]

export default function Safety() {
  const { t } = useTranslation()
  const [active, setActive] = useState(null)
  const [quizIdx, setQuizIdx] = useState(0)
  const [showQuiz, setShowQuiz] = useState(false)
  const [score, setScore] = useState(0)

  const q = quizQuestions[quizIdx]

  const answer = (i) => {
    const correct = i === q.answer
    if (correct) {
      setScore((s) => s + 1)
      toast.success('Safe choice!')
    } else {
      toast.error('Not safe — remember Saathi’s tip.')
    }
    if (quizIdx < quizQuestions.length - 1) {
      setQuizIdx((n) => n + 1)
    } else {
      toast.success(`Quiz done! Score: ${score + (correct ? 1 : 0)}/${quizQuestions.length}`)
      setShowQuiz(false)
      setQuizIdx(0)
      setScore(0)
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 md:px-6 py-10 md:py-14">
      <PageHeader
        title={t('safety.title')}
        subtitle={t('safety.subtitle')}
        backTo="/dashboard"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
        {scams.map((s) => (
          <Card
            key={s.id}
            className="group min-h-[150px]"
            onClick={() => setActive(s.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setActive(s.id)}
          >
            <span className="text-3xl inline-block transition-transform group-hover:rotate-[5deg]" aria-hidden>
              {s.icon}
            </span>
            <h3 className="mt-3 text-xl font-semibold">{t(`safety.${s.id}.title`)}</h3>
            <p className="mt-2 text-sm text-muted line-clamp-2">
              {t(`safety.${s.id}.story`)}
            </p>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Button size="lg" onClick={() => setShowQuiz(true)}>
          <ShieldAlert size={18} aria-hidden />
          {t('safety.practice')}
        </Button>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40"
          role="dialog"
          aria-modal="true"
          onClick={() => setActive(null)}
        >
          <div
            className="bg-card radius-card shadow-soft w-full max-w-lg p-6 md:p-8 border border-soft"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between">
              <h2 className="text-2xl font-semibold">{t(`safety.${active}.title`)}</h2>
              <button
                type="button"
                aria-label={t('common.close')}
                className="p-2 rounded-xl"
                onClick={() => setActive(null)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="mt-6 space-y-5">
              <div>
                <p className="text-sm font-semibold text-brand mb-1">{t('safety.whatHappened')}</p>
                <p className="text-ink leading-relaxed">{t(`safety.${active}.story`)}</p>
              </div>
              <div className="p-4 rounded-2xl bg-[color-mix(in_srgb,var(--saathi-primary)_8%,transparent)]">
                <p className="text-sm font-semibold text-brand mb-1">{t('safety.whatToDo')}</p>
                <p className="text-ink leading-relaxed">{t(`safety.${active}.action`)}</p>
              </div>
            </div>
            <Button className="mt-6 w-full" onClick={() => setActive(null)}>
              {t('common.close')}
            </Button>
          </div>
        </div>
      )}

      {showQuiz && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-card radius-card shadow-soft w-full max-w-lg p-6 md:p-8 border border-soft">
            <p className="text-sm text-muted font-number mb-2">
              {quizIdx + 1} / {quizQuestions.length}
            </p>
            <h2 className="text-xl font-semibold mb-6">{q.question}</h2>
            <div className="space-y-3">
              {q.options.map((opt, i) => (
                <button
                  key={opt}
                  type="button"
                  className={cn(
                    'w-full text-left p-4 radius-btn border border-soft hover:border-[var(--saathi-primary)] transition-colors'
                  )}
                  onClick={() => answer(i)}
                >
                  {opt}
                </button>
              ))}
            </div>
            <Button variant="ghost" className="mt-4" onClick={() => setShowQuiz(false)}>
              {t('common.close')}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
