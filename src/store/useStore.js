import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useSettingsStore = create(
  persist(
    (set, get) => ({
      language: 'en',
      onboardingDone: false,
      darkMode: false,
      highContrast: false,
      fontScale: 1,
      voiceMode: false,
      notifications: true,
      userName: 'Robin',

      setLanguage: (language) => set({ language }),
      completeOnboarding: () => set({ onboardingDone: true }),
      resetOnboarding: () => set({ onboardingDone: false }),
      toggleDarkMode: () => set({ darkMode: !get().darkMode }),
      setDarkMode: (darkMode) => set({ darkMode }),
      toggleHighContrast: () => set({ highContrast: !get().highContrast }),
      setFontScale: (fontScale) => set({ fontScale }),
      toggleVoiceMode: () => set({ voiceMode: !get().voiceMode }),
      setVoiceMode: (voiceMode) => set({ voiceMode }),
      toggleNotifications: () => set({ notifications: !get().notifications }),
      setUserName: (userName) => set({ userName }),
    }),
    { name: 'saathi-settings' }
  )
)

export const useBankStore = create(
  persist(
    (set, get) => ({
      balance: 12450,
      learningProgress: 65,
      completedLessons: ['upi', 'otp'],
      transactions: [
        {
          id: '1',
          type: 'credit',
          title: 'Salary Credit',
          amount: 8500,
          date: '2026-07-15',
          category: 'Income',
        },
        {
          id: '2',
          type: 'debit',
          title: 'Grocery Store',
          amount: 420,
          date: '2026-07-14',
          category: 'Shopping',
        },
        {
          id: '3',
          type: 'debit',
          title: 'Electricity Bill',
          amount: 680,
          date: '2026-07-12',
          category: 'Bills',
        },
        {
          id: '4',
          type: 'credit',
          title: 'From Priya',
          amount: 500,
          date: '2026-07-10',
          category: 'Transfer',
        },
        {
          id: '5',
          type: 'debit',
          title: 'Mobile Recharge',
          amount: 199,
          date: '2026-07-08',
          category: 'Recharge',
        },
      ],
      contacts: [
        { id: '1', name: 'Priya Sharma', upi: 'priya@okbank', initial: 'P' },
        { id: '2', name: 'Amit Kumar', upi: 'amit@upi', initial: 'A' },
        { id: '3', name: 'Meera Devi', upi: 'meera@paytm', initial: 'M' },
        { id: '4', name: 'Ravi Singh', upi: 'ravi@ybl', initial: 'R' },
      ],

      sendMoney: (amount, contactName) => {
        const numeric = Number(amount)
        if (!numeric || numeric <= 0 || numeric > get().balance) return false
        const tx = {
          id: String(Date.now()),
          type: 'debit',
          title: `To ${contactName}`,
          amount: numeric,
          date: new Date().toISOString().slice(0, 10),
          category: 'Transfer',
        }
        set({
          balance: get().balance - numeric,
          transactions: [tx, ...get().transactions],
        })
        return true
      },

      markLessonComplete: (id) => {
        const done = get().completedLessons
        if (done.includes(id)) return
        const next = [...done, id]
        set({
          completedLessons: next,
          learningProgress: Math.min(100, Math.round((next.length / 7) * 100)),
        })
      },
    }),
    { name: 'saathi-bank' }
  )
)
