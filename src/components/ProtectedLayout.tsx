import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContextTypes'
import Navbar from './Navbar'

export default function ProtectedLayout() {
  const { user } = useAuth()

  // Si no hay usuario autenticado, redirigir al login
  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F1C] to-[#1F2937] text-white">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
