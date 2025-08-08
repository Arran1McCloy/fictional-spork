import { create } from 'zustand'

type User = { user_id: number; full_name: string; role: string; department?: string | null }
type Filter = { field?: string; op?: '=' | 'not in'; vals?: string[] }

type State = {
  user: User | null
  setUser: (u: User | null) => void
  defectFilter: Filter
  setFilter: (f: Filter) => void
}

export const useAppStore = create<State>((set) => ({
  user: null,
  setUser: (u) => set({ user: u }),
  defectFilter: {},
  setFilter: (f) => set({ defectFilter: f })
}))
