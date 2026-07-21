import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      currentUser: null,
      users: [], // Mock database: array of { name, email, phone, password }

      register: (name, email, phone, password) => {
        const { users } = get()
        const normalizedEmail = email.trim().toLowerCase()
        if (users.some((u) => u.email === normalizedEmail)) {
          return { success: false, message: 'emailExists' }
        }
        const newUser = { name, email: normalizedEmail, phone: phone.trim(), password }
        set({
          users: [...users, newUser],
          currentUser: newUser,
        })
        return { success: true }
      },

      login: (identifier, password) => {
        const { users } = get()
        const clean = identifier.trim().toLowerCase()
        const found = users.find((u) => u.email === clean || u.phone === clean)
        if (!found) {
          return { success: false, message: 'userNotFound' }
        }
        if (found.password !== password) {
          return { success: false, message: 'invalidPassword' }
        }
        set({ currentUser: found })
        return { success: true }
      },

      recoverPassword: (identifier) => {
        const { users } = get()
        const clean = identifier.trim().toLowerCase()
        const found = users.find(
          (u) => u.email === clean || u.phone === clean
        )
        if (!found) {
          return { success: false }
        }
        return { success: true, password: found.password }
      },

      logout: () => {
        set({ currentUser: null })
      },
    }),
    { name: 'saathi-auth' }
  )
)
