import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { Navbar } from '../navbar/Navbar'
import { Footer } from '../footer/Footer'
import { AccessibilityBar } from '../accessibility/AccessibilityBar'
import { CursorDots } from '../ui/CursorDots'
import { useSettingsStore } from '../../store/useStore'
import { useTranslation } from 'react-i18next'
import { useVoiceAnnounce } from '../../hooks/useVoiceAnnounce'

export function AppLayout() {
  const location = useLocation()
  const { t } = useTranslation()
  const darkMode = useSettingsStore((s) => s.darkMode)
  const highContrast = useSettingsStore((s) => s.highContrast)
  const fontScale = useSettingsStore((s) => s.fontScale)
  useVoiceAnnounce()

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', darkMode)
    root.classList.toggle('high-contrast', highContrast)
    root.style.setProperty('--saathi-font-scale', String(fontScale))
  }, [darkMode, highContrast, fontScale])

  return (
    <div className="min-h-screen flex flex-col bg-surface text-ink">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <CursorDots />
      <Navbar />
      <AccessibilityBar />
      <AnimatePresence mode="wait">
        <motion.main
          id="main-content"
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      {location.pathname === '/' && <Footer />}
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            borderRadius: '16px',
            background: 'var(--saathi-card)',
            color: 'var(--saathi-ink)',
            border: '1px solid var(--saathi-border)',
            boxShadow: '0 8px 30px rgba(0,0,0,.06)',
          },
        }}
      />
      <span className="sr-only" aria-live="polite">
        {t('brand')} {t('tagline')}
      </span>
    </div>
  )
}
