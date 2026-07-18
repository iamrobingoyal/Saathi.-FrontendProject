import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '../../components/ui/PageHeader'
import { VoiceOrb } from '../../components/voice/VoiceOrb'
import { Card } from '../../components/cards/Card'
import { Button } from '../../components/buttons/Button'
import { startListening, speak, mockVoiceReply } from '../../services/speech'
import { useSettingsStore } from '../../store/useStore'
import { LANGUAGES } from '../../utils/helpers'

export default function Voice() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [status, setStatus] = useState('idle')
  const [transcript, setTranscript] = useState('')
  const [reply, setReply] = useState('')
  const language = useSettingsStore((s) => s.language)
  const voice = LANGUAGES.find((l) => l.code === language)?.voice || 'en-IN'

  const listen = () => {
    setStatus('listening')
    setTranscript('')
    setReply('')
    startListening({
      lang: voice,
      onResult: (text) => {
        setTranscript(text)
        setStatus('processing')
        const result = mockVoiceReply(text)
        setTimeout(() => {
          setReply(result.reply)
          setStatus('idle')
          speak(result.reply, voice)
        }, 600)
      },
      onEnd: () => setStatus((s) => (s === 'listening' ? 'idle' : s)),
      onError: (err) => {
        setStatus('idle')
        const fallback = mockVoiceReply('help')
        setReply(
          typeof err === 'string' && err.includes('not supported')
            ? `${err} Showing a sample response instead.`
            : fallback.reply
        )
        setTranscript('Check my balance')
        speak(fallback.reply, voice)
      },
    })
  }

  const goFromReply = () => {
    const result = mockVoiceReply(transcript || 'help')
    if (result.route) navigate(result.route)
  }

  return (
    <div className="mx-auto max-w-2xl px-4 md:px-6 py-10 md:py-14 text-center">
      <PageHeader
        title={t('voice.title')}
        subtitle={t('voice.subtitle')}
        backTo="/dashboard"
      />

      <div className="flex flex-col items-center py-8">
        <VoiceOrb
          active={status === 'listening'}
          onClick={listen}
          label={t('voice.press')}
        />
        <p className="mt-6 text-lg font-medium text-ink" aria-live="polite">
          {status === 'listening' && t('voice.listening')}
          {status === 'processing' && t('voice.processing')}
          {status === 'idle' && t('voice.press')}
        </p>
        <p className="mt-2 text-sm text-muted">{t('voice.hint')}</p>
      </div>

      {(transcript || reply) && (
        <Card hover={false} className="text-left space-y-4">
          {transcript && (
            <div>
              <p className="text-xs font-semibold text-muted uppercase tracking-wide">You</p>
              <p className="mt-1 text-ink">{transcript}</p>
            </div>
          )}
          {reply && (
            <div>
              <p className="text-xs font-semibold text-brand uppercase tracking-wide">Saathi</p>
              <p className="mt-1 text-ink leading-relaxed">{reply}</p>
            </div>
          )}
          {reply && (
            <Button onClick={goFromReply} className="w-full sm:w-auto">
              {t('onboarding.continue')}
            </Button>
          )}
        </Card>
      )}
    </div>
  )
}
