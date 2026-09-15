import { useEffect } from 'react'
import { AppRouter } from '@/routes'
import { useAuthStore } from '@/stores/useAuthStore'

function App() {
  const hydrate = useAuthStore((state) => state.hydrate)

  // Restore auth session from localStorage on mount
  useEffect(() => {
    hydrate()
  }, [hydrate])

  return <AppRouter />
}

export default App
