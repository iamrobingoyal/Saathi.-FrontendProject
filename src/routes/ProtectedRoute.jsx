import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

export function ProtectedRoute() {
  const currentUser = useAuthStore((s) => s.currentUser)

  if (!currentUser) {
    // If not authenticated, redirect to login
    return <Navigate to="/login" replace />
  }

  // Render child routes
  return <Outlet />
}
