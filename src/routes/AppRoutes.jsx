import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from '../components/layout/AppLayout'

const Landing = lazy(() => import('../pages/Landing/Landing'))
const Onboarding = lazy(() => import('../pages/Language/Onboarding'))
const LanguagePage = lazy(() => import('../pages/Language/LanguagePage'))
const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard'))
const Balance = lazy(() => import('../pages/Balance/Balance'))
const Transfer = lazy(() => import('../pages/Transfer/Transfer'))
const Learn = lazy(() => import('../pages/Learn/Learn'))
const Safety = lazy(() => import('../pages/Safety/Safety'))
const Nearby = lazy(() => import('../pages/Nearby/Nearby'))
const Voice = lazy(() => import('../pages/Voice/Voice'))
const Help = lazy(() => import('../pages/Help/Help'))
const Settings = lazy(() => import('../pages/Settings/Settings'))

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]" role="status" aria-live="polite">
      <div className="w-10 h-10 rounded-full border-2 border-[var(--saathi-border)] border-t-[var(--saathi-primary)] animate-spin" />
      <span className="sr-only">Loading…</span>
    </div>
  )
}

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Landing />} />
          <Route path="onboarding" element={<Onboarding />} />
          <Route path="language" element={<LanguagePage />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="balance" element={<Balance />} />
          <Route path="transfer" element={<Transfer />} />
          <Route path="learn" element={<Learn />} />
          <Route path="safety" element={<Safety />} />
          <Route path="nearby" element={<Nearby />} />
          <Route path="voice" element={<Voice />} />
          <Route path="help" element={<Help />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
