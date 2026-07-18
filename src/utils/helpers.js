export function formatRupee(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function getGreetingKey(date = new Date()) {
  const hour = date.getHours()
  if (hour < 12) return 'dashboard.greetingMorning'
  if (hour < 17) return 'dashboard.greetingAfternoon'
  return 'dashboard.greetingEvening'
}

export const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English', flag: '🇬🇧', voice: 'en-IN' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी', flag: '🇮🇳', voice: 'hi-IN' },
  { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ', flag: '🇮🇳', voice: 'pa-IN' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்', flag: '🇮🇳', voice: 'ta-IN' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা', flag: '🇮🇳', voice: 'bn-IN' },
  { code: 'mr', label: 'Marathi', native: 'मराठी', flag: '🇮🇳', voice: 'mr-IN' },
]

export function cn(...parts) {
  return parts.filter(Boolean).join(' ')
}
