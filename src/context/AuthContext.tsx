import { useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { AuthContext, type AuthContextType, type User } from './AuthContextTypes'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  const login = async (email: string, password: string) => {
    try {
      const res = await api.post('/auth/login', { email, password })
  
      // Establecer el token primero
      setToken(res.data.token)
      localStorage.setItem('token', res.data.token)
  
      // Cargar información completa del usuario
      const userRes = await api.get('/auth/me', {
        headers: {
          Authorization: `Bearer ${res.data.token}`,
        },
      })
      
      setUser(userRes.data.user)
  
      if (userRes.data.user.role === 'ADMIN') {
        navigate('/admin')
      } else {
        navigate('/dashboard')
      }
    } catch (err: any) {
      const message = err.response?.data?.error || 'Error de conexión'
      alert(message)
    }
  }

  const loadCurrentUser = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      setIsLoading(false)
      return
    }

    try {
      const res = await api.get('/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setUser(res.data.user)
      setToken(token)
    } catch (err) {
      console.error('Error loading user:', err)
      localStorage.removeItem('token')
      setToken(null)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    navigate('/')
  }

  useEffect(() => {
    loadCurrentUser()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A0F1C] to-[#1F2937] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#22D3EE] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
