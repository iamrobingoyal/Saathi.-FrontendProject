import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, Moon, Sun, X, Globe } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSettingsStore } from '../../store/useStore'
import { Button } from '../buttons/Button'

const links = [
  { to: '/', key: 'home', end: true },
  { to: '/learn', key: 'learn' },
  { to: '/safety', key: 'safety' },
  { to: '/help', key: 'support' },
]

export function Navbar() {
  const { t } = useTranslation()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const darkMode = useSettingsStore((s) => s.darkMode)
  const toggleDarkMode = useSettingsStore((s) => s.toggleDarkMode)

  const hideOn = ['/language', '/onboarding']
  if (hideOn.includes(location.pathname)) return null

  return (
    <header className="sticky top-0 z-50 border-b border-soft bg-[color-mix(in_srgb,var(--saathi-bg)_92%,transparent)] backdrop-blur-md">
      <nav
        className="mx-auto max-w-6xl px-4 md:px-6 h-16 flex items-center justify-between gap-4"
        aria-label="Main"
      >
        <Link
          to="/"
          className="font-heading text-xl md:text-2xl font-semibold text-brand tracking-tight"
        >
          {t('brand')}
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-brand bg-[color-mix(in_srgb,var(--saathi-primary)_10%,transparent)]'
                      : 'text-muted hover:text-ink'
                  }`
                }
              >
                {t(`nav.${link.key}`)}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            to="/language"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-muted hover:text-ink"
            aria-label={t('nav.language')}
          >
            <Globe size={18} aria-hidden="true" />
            {t('nav.language')}
          </Link>

          <button
            type="button"
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl text-muted hover:text-ink hover:bg-[var(--saathi-border)]/40"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Link to="/dashboard" className="hidden sm:block">
            <Button size="sm">{t('nav.dashboard')}</Button>
          </Link>

          <button
            type="button"
            className="md:hidden p-2.5 rounded-xl"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-soft overflow-hidden bg-surface"
          >
            <ul className="px-4 py-3 flex flex-col gap-1">
              {links.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.end}
                    onClick={() => setOpen(false)}
                    className="block px-3 py-3 rounded-xl text-ink font-medium"
                  >
                    {t(`nav.${link.key}`)}
                  </NavLink>
                </li>
              ))}
              <li>
                <NavLink
                  to="/language"
                  onClick={() => setOpen(false)}
                  className="block px-3 py-3 rounded-xl text-ink font-medium"
                >
                  {t('nav.language')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard"
                  onClick={() => setOpen(false)}
                  className="block px-3 py-3 rounded-xl text-brand font-semibold"
                >
                  {t('nav.dashboard')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/settings"
                  onClick={() => setOpen(false)}
                  className="block px-3 py-3 rounded-xl text-ink font-medium"
                >
                  {t('nav.settings')}
                </NavLink>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
