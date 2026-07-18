import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Phone, MessageCircle, AlertTriangle, HelpCircle, ChevronDown } from 'lucide-react'
import toast from 'react-hot-toast'
import { PageHeader } from '../../components/ui/PageHeader'
import { Card } from '../../components/cards/Card'
import { Button } from '../../components/buttons/Button'
import { cn } from '../../utils/helpers'

export default function Help() {
  const { t } = useTranslation()
  const [openFaq, setOpenFaq] = useState(0)

  const actions = [
    {
      icon: <Phone className="text-brand" size={24} />,
      title: t('help.call'),
      desc: '1800-SAATHI (demo)',
      action: () => toast.success('Calling support… (demo)'),
    },
    {
      icon: <MessageCircle className="text-brand" size={24} />,
      title: t('help.chat'),
      desc: 'Usually replies in minutes',
      action: () => toast.success('Live chat opened (demo)'),
    },
    {
      icon: <AlertTriangle className="text-[var(--saathi-accent)]" size={24} />,
      title: t('help.emergency'),
      desc: 'Report fraud immediately',
      action: () => toast.error('Emergency line: contact your bank + cybercrime.gov.in'),
    },
  ]

  const faqs = [1, 2, 3]

  return (
    <div className="mx-auto max-w-3xl px-4 md:px-6 py-10 md:py-14">
      <PageHeader title={t('help.title')} subtitle={t('help.subtitle')} backTo="/dashboard" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {actions.map((a) => (
          <Card
            key={a.title}
            className="text-center"
            onClick={a.action}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && a.action()}
          >
            <div className="flex justify-center" aria-hidden>
              {a.icon}
            </div>
            <h3 className="mt-3 font-semibold">{a.title}</h3>
            <p className="mt-1 text-sm text-muted">{a.desc}</p>
          </Card>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <HelpCircle size={20} className="text-brand" aria-hidden />
        {t('help.faqs')}
      </h2>

      <div className="space-y-3">
        {faqs.map((n, i) => {
          const isOpen = openFaq === i
          return (
            <Card key={n} hover={false} className="!p-0 overflow-hidden">
              <button
                type="button"
                className="w-full flex items-center justify-between gap-3 p-5 text-left"
                aria-expanded={isOpen}
                onClick={() => setOpenFaq(isOpen ? -1 : i)}
              >
                <span className="font-medium text-ink">{t(`help.faq${n}q`)}</span>
                <ChevronDown
                  size={18}
                  className={cn('text-muted transition-transform', isOpen && 'rotate-180')}
                  aria-hidden
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-muted leading-relaxed border-t border-soft pt-3">
                  {t(`help.faq${n}a`)}
                </div>
              )}
            </Card>
          )
        })}
      </div>

      <div className="mt-8">
        <Button variant="secondary" onClick={() => toast.success('Support ticket filed (demo)')}>
          {t('help.call')}
        </Button>
      </div>
    </div>
  )
}
