import { useContext } from 'react'
import { AuthContext } from '../context/AuthContextTypes'

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth debe estar dentro de AuthProvider')
  return context
} 