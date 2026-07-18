import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Volume2, CheckCircle2, X } from 'lucide-react'
import { PageHeader } from '../../components/ui/PageHeader'
import { Card } from '../../components/cards/Card'
import { Button } from '../../components/buttons/Button'
import { learnTopics } from '../../data/content'
import { useBankStore, useSettingsStore } from '../../store/useStore'
import { speak } from '../../services/speech'
import { LANGUAGES, cn } from '../../utils/helpers'
import toast from 'react-hot-toast'

const icons = {
  upi: '📱',
  atm: '🏧',
  pin: '🔢',
  otp: '🔐',
  interest: '📈',
  loan: '🏦',
  insurance: '☂️',
}

export default function Learn() {
  const { t } = useTranslation()
  const [active, setActive] = useState(null)
  const [quizOpen, setQuizOpen] = useState(false)
  const [quizAnswer, setQuizAnswer] = useState(null)
  const completed = useBankStore((s) => s.completedLessons)
  const markLessonComplete = useBankStore((s) => s.markLessonComplete)
  const language = useSettingsStore((s) => s.language)
  const voice = LANGUAGES.find((l) => l.code === language)?.voice || 'en-IN'

  const openLesson = (id) => setActive(id)

  const listen = () => {
    if (!active) return
    speak(`${t(`learn.${active}.title`)}. ${t(`learn.${active}.desc`)}`, voice)
  }

  const complete = () => {
    markLessonComplete(active)
    toast.success(t('learn.completed'))
    setActive(null)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 md:px-6 py-10 md:py-14">
      <PageHeader
        title={t('learn.title')}
        subtitle={t('learn.subtitle')}
        backTo="/dashboard"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {learnTopics.map((id) => (
          <Card
            key={id}
            className="relative group"
            onClick={() => openLesson(id)}
            role="button"
            tabIndex={0}
            aria-label={t(`learn.${id}.title`)}
            onKeyDown={(e) => e.key === 'Enter' && openLesson(id)}
          >
            {completed.includes(id) && (
              <CheckCircle2
                className="absolute top-4 right-4 text-brand"
                size={20}
                aria-label={t('learn.completed')}
              />
            )}
            <span className="text-3xl transition-transform group-hover:rotate-[5deg] inline-block" aria-hidden>
              {icons[id]}
            </span>
            <h3 className="mt-3 text-lg font-semibold">{t(`learn.${id}.title`)}</h3>
            <p className="mt-1 text-sm text-muted line-clamp-2">{t(`learn.${id}.desc`)}</p>
          </Card>
        ))}
      </div>

      {/* Lesson modal */}
      {active && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lesson-title"
          onClick={() => setActive(null)}
        >
          <div
            className="bg-card radius-card shadow-soft w-full max-w-lg p-6 md:p-8 border border-soft"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start gap-3">
              <div>
                <span className="text-4xl" aria-hidden>
                  {icons[active]}
                </span>
                <h2 id="lesson-title" className="mt-3 text-2xl font-semibold">
                  {t(`learn.${active}.title`)}
                </h2>
              </div>
              <button
                type="button"
                className="p-2 rounded-xl hover:bg-[var(--saathi-border)]/50"
                aria-label={t('common.close')}
                onClick={() => setActive(null)}
              >
                <X size={20} />
              </button>
            </div>
            <p className="mt-4 text-muted leading-relaxed text-lg">{t(`learn.${active}.desc`)}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="secondary" onClick={listen}>
                <Volume2 size={18} aria-hidden />
                {t('learn.listen')}
              </Button>
              <Button onClick={complete}>{t('learn.completed')}</Button>
              <Button variant="ghost" onClick={() => setQuizOpen(true)}>
                {t('learn.quiz')}
              </Button>
            </div>

            {quizOpen && (
              <div className="mt-6 pt-6 border-t border-soft">
                <p className="font-medium mb-3">
                  {active === 'otp'
                    ? 'Should you share your OTP with a caller?'
                    : 'Is this lesson about staying safer with money?'}
                </p>
                <div className="flex gap-2">
                  {['Yes', 'No'].map((opt, i) => (
                    <button
                      key={opt}
                      type="button"
                      className={cn(
                        'flex-1 py-3 radius-btn border border-soft font-medium',
                        quizAnswer === i && 'ring-2 ring-[var(--saathi-primary)]'
                      )}
                      onClick={() => {
                        setQuizAnswer(i)
                        const correct = active === 'otp' ? i === 1 : i === 0
                        toast[correct ? 'success' : 'error'](
                          correct ? 'Correct!' : 'Try again — Saathi believes in you.'
                        )
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
