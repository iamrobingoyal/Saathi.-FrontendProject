import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Globe, Mic, Shield, MapPin } from 'lucide-react'
import { Button } from '../../components/buttons/Button'
import { FeatureCard, Card } from '../../components/cards/Card'
import { useSettingsStore } from '../../store/useStore'

const featureIcons = [
  <Globe key="g" className="text-brand" size={22} />,
  <Mic key="m" className="text-brand" size={22} />,
  <Shield key="s" className="text-brand" size={22} />,
  <MapPin key="p" className="text-brand" size={22} />,
]

function JourneyCard({ index, title, desc }) {
  return (
    <div className="bg-card border border-soft shadow-soft rounded-2xl p-5 md:p-6">
      <div className="flex items-center gap-3 mb-2">
        <span className="w-8 h-8 rounded-full bg-[var(--saathi-primary)] text-white flex items-center justify-center font-number text-sm font-semibold shrink-0">
          {index}
        </span>
        <h3 className="text-lg font-semibold text-ink">{title}</h3>
      </div>
      <p className="text-muted text-sm leading-relaxed md:pl-11">{desc}</p>
    </div>
  )
}

export default function Landing() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const onboardingDone = useSettingsStore((s) => s.onboardingDone)

  const start = () => {
    navigate(onboardingDone ? '/dashboard' : '/onboarding')
  }

  const journeySteps = [1, 2, 3, 4, 5].map((n) => ({
    title: t(`landing.step${n}`),
    desc: t(`landing.step${n}Desc`),
  }))
  const testimonials = [1, 2, 3]

  return (
    <div>
      {/* Hero — centered, calm, companion dots live site-wide */}
      <section className="relative min-h-[78vh] flex items-center justify-center px-4 md:px-6 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-brand font-medium mb-4 tracking-wide">{t('tagline')}</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-ink leading-[1.08] tracking-tight">
            {t('landing.heroTitle')}
          </h1>
          <p className="mt-6 text-base md:text-lg text-muted leading-relaxed max-w-xl mx-auto">
            {t('landing.heroSubtitle')}
          </p>
          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            <Button size="lg" onClick={start}>
              {t('landing.getStarted')}
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() =>
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              {t('landing.explore')}
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="bg-card border-y border-soft py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-ink mb-8">
            {t('landing.featuresTitle')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {[1, 2, 3, 4].map((n, i) => (
              <FeatureCard
                key={n}
                icon={featureIcons[i]}
                title={t(`landing.feature${n}Title`)}
                description={t(`landing.feature${n}Desc`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Saathi — alternating timeline */}
      <section className="bg-[color-mix(in_srgb,var(--saathi-bg)_100%,transparent)] py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-ink tracking-tight">
              {t('landing.whyTitle')}
            </h2>
            <p className="mt-3 text-muted text-base md:text-lg">
              {t('landing.whySubtitle')}
            </p>
          </div>

          <ol className="relative">
            <span
              className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px -translate-x-1/2 bg-[var(--saathi-border)]"
              aria-hidden="true"
            />
            <span
              className="md:hidden absolute left-[15px] top-4 bottom-4 w-px bg-[var(--saathi-border)]"
              aria-hidden="true"
            />

            {journeySteps.map((step, i) => {
              const isLeft = i % 2 === 0
              return (
                <li
                  key={step.title}
                  className="relative flex gap-4 md:grid md:grid-cols-2 md:gap-x-16 mb-8 md:mb-12 last:mb-0"
                >
                  <span
                    className="absolute left-[10px] md:left-1/2 md:-translate-x-1/2 top-6 z-10 w-3.5 h-3.5 rounded-full bg-[var(--saathi-primary)] ring-[6px] ring-[var(--saathi-bg)]"
                    aria-hidden="true"
                  />

                  <div
                    className={`pl-10 md:pl-0 w-full ${
                      isLeft
                        ? 'md:col-start-1 md:pr-8 md:text-left'
                        : 'md:col-start-2 md:pl-8'
                    }`}
                  >
                    <JourneyCard index={i + 1} title={step.title} desc={step.desc} />
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-card border-y border-soft py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-ink mb-8">
            {t('landing.testimonialsTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {testimonials.map((n) => (
              <Card key={n} hover={false}>
                <p className="text-ink leading-relaxed">&ldquo;{t(`landing.t${n}Text`)}&rdquo;</p>
                <p className="mt-4 text-sm font-semibold text-brand">{t(`landing.t${n}Name`)}</p>
              </Card>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button size="lg" onClick={start}>
              {t('landing.getStarted')}
            </Button>
            <p className="mt-3 text-sm text-muted">
              <Link to="/dashboard" className="text-brand hover:underline">
                {t('nav.dashboard')}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
