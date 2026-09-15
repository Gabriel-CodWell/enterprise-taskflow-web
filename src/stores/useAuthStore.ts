import { create } from 'zustand'
import api from '@/services/api'
import type { LoginRequest, LoginResponse } from '@/types'

// ── Auth State Interface ──────────────────────────────────────────────

interface AuthState {
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null

  login: (credentials: LoginRequest) => Promise<void>
  logout: () => void
  hydrate: () => void
}

// ── Auth Store ────────────────────────────────────────────────────────

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (credentials: LoginRequest) => {
    set({ isLoading: true, error: null })

    try {
      const { data } = await api.post<LoginResponse>('/auth/login', credentials)

      localStorage.setItem('token', data.token)
      set({ token: data.token, isAuthenticated: true, isLoading: false })
    } catch {
      set({
        error: 'Invalid credentials. Please try again.',
        isLoading: false,
      })
    }
  },

  logout: () => {
    localStorage.removeItem('token')
    set({ token: null, isAuthenticated: false, error: null })
  },

  hydrate: () => {
    const token = localStorage.getItem('token')

    if (token) {
      set({ token, isAuthenticated: true })
    }
  },
}))
