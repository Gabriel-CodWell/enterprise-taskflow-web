import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/useAuthStore'

// ── Login Page ────────────────────────────────────────────────────────

export function LoginPage() {
  const navigate = useNavigate()
  const { login, isLoading, error } = useAuthStore()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await login({ username, password })

    // Check auth state after login attempt
    const isAuthenticated = useAuthStore.getState().isAuthenticated
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-brand-600/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-brand-400/5 blur-3xl" />
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md relative z-10">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-600/20 border border-brand-500/20 mb-4">
            <svg className="w-8 h-8 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Enterprise TaskFlow
          </h1>
          <p className="text-surface-400 text-sm mt-1">
            Sign in to access your dashboard
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-surface-900/80 backdrop-blur-xl border border-surface-700/50 rounded-2xl p-8 shadow-2xl shadow-black/20">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Alert */}
            {error && (
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-danger-500/10 border border-danger-500/20 text-danger-500 text-sm animate-[fadeIn_0.2s_ease-out]">
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Username */}
            <div className="space-y-2">
              <label htmlFor="login-username" className="block text-sm font-medium text-surface-300">
                Username
              </label>
              <input
                id="login-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
                autoFocus
                className="w-full px-4 py-3 rounded-xl bg-surface-800/80 border border-surface-600/50 text-white placeholder-surface-500 
                           outline-none transition-all duration-200
                           focus:border-brand-500/60 focus:ring-2 focus:ring-brand-500/20"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="login-password" className="block text-sm font-medium text-surface-300">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 rounded-xl bg-surface-800/80 border border-surface-600/50 text-white placeholder-surface-500 
                           outline-none transition-all duration-200
                           focus:border-brand-500/60 focus:ring-2 focus:ring-brand-500/20"
              />
            </div>

            {/* Submit Button */}
            <button
              id="login-submit"
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl font-semibold text-white transition-all duration-200
                         bg-brand-600 hover:bg-brand-500 active:scale-[0.98]
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-brand-600
                         shadow-lg shadow-brand-600/25 hover:shadow-brand-500/30
                         cursor-pointer"
            >
              {isLoading ? (
                <span className="inline-flex items-center gap-2">
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 pt-6 border-t border-surface-700/50 text-center">
            <p className="text-xs text-surface-500">
              Protected by JWT Authentication
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-surface-600 mt-6">
          Enterprise TaskFlow &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  )
}
