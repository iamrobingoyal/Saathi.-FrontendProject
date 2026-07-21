import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-soft mt-auto bg-card">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <p className="font-heading text-lg font-semibold text-brand">{t('brand')}</p>
          <p className="text-sm text-muted mt-1">{t('tagline')}</p>
        </div>



        <div className="flex flex-col items-start md:items-end gap-2">
          <p className="text-sm text-muted">{t('footer.rights')}</p>
          <div className="flex gap-4 text-sm text-muted">
            <Link to="/help" className="hover:text-ink">
              {t('footer.privacy')}
            </Link>
            <Link to="/help" className="hover:text-ink">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
