import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function PageHeader({ title, subtitle, backTo }) {
  const { t } = useTranslation()

  return (
    <div className="mb-8 md:mb-10">
      {backTo && (
        <Link
          to={backTo}
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink mb-4"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          {t('common.back')}
        </Link>
      )}
      <h1 className="text-3xl md:text-4xl font-semibold text-ink tracking-tight">{title}</h1>
      {subtitle && <p className="mt-2 text-muted max-w-xl leading-relaxed">{subtitle}</p>}
    </div>
  )
}
