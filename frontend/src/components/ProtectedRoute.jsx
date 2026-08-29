import { Navigate } from 'react-router-dom'

/**
 * Composant qui protège les routes admin.
 * Redirige vers /login si aucun token JWT n'est présent.
 */
export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}
