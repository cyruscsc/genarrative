import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { User } from './types'

type State = {
  user: User | null
}

type Actions = {
  setUser: (user: User) => void
  clearUser: () => void
}

const initialState: State = { user: null }

export const useUserStore = create<State & Actions>()(
  persist(
    (set) => ({
      ...initialState,
      setUser: (user) => set({ user }),
      clearUser: () => set(initialState),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
