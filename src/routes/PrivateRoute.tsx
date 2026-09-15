import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/stores/useAuthStore'

// ── Private Route Guard ───────────────────────────────────────────────
// Wraps authenticated routes. Redirects to /login if no valid session.

export function PrivateRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}
