export function speak(text, lang = 'en-IN') {
  if (typeof window === 'undefined' || !window.speechSynthesis) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = lang
  utterance.rate = 0.95
  window.speechSynthesis.speak(utterance)
}

export function stopSpeaking() {
  if (typeof window === 'undefined' || !window.speechSynthesis) return
  window.speechSynthesis.cancel()
}

export function startListening({ onResult, onEnd, onError, lang = 'en-IN' }) {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition
  if (!SpeechRecognition) {
    onError?.('Speech recognition is not supported in this browser.')
    return null
  }

  const recognition = new SpeechRecognition()
  recognition.lang = lang
  recognition.interimResults = false
  recognition.maxAlternatives = 1

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript
    onResult?.(transcript)
  }
  recognition.onerror = (event) => onError?.(event.error)
  recognition.onend = () => onEnd?.()
  recognition.start()
  return recognition
}

export function mockVoiceReply(transcript) {
  const text = (transcript || '').toLowerCase()
  if (text.includes('balance') || text.includes('बैलेंस') || text.includes('paisa')) {
    return { reply: 'Your savings balance is ₹12,450. Would you like to see recent transactions?', route: '/balance' }
  }
  if (text.includes('send') || text.includes('भेज') || text.includes('transfer')) {
    return { reply: 'Sure. I will open Send Money. Choose a person, then enter the amount.', route: '/transfer' }
  }
  if (text.includes('safe') || text.includes('scam') || text.includes('सुरक्ष')) {
    return { reply: 'Opening Safety Center. Remember: never share your OTP with anyone.', route: '/safety' }
  }
  if (text.includes('learn') || text.includes('upi') || text.includes('सीख')) {
    return { reply: 'Let us learn banking together. Opening Learn Banking.', route: '/learn' }
  }
  if (text.includes('near') || text.includes('atm') || text.includes('bank')) {
    return { reply: 'I will show nearby ATMs and banks on the map.', route: '/nearby' }
  }
  return {
    reply: 'I can help you check balance, send money, learn banking, or stay safe. What would you like?',
    route: null,
  }
}
