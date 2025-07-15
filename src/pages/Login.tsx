import { useState } from 'react'
import { motion } from 'framer-motion'
import logoDark from '../assets/logo-dark.png'
import logoLight from '../assets/logo-light.png'
import { useAuth } from '../hooks/useAuth'


export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const { login } = useAuth()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login(email, password)
  }

  const bgClass = darkMode ? 'bg-bg-dark text-text-dark' : 'bg-bg-light text-text-light'
  const cardBg = darkMode
    ? 'bg-card-dark border border-card-light'
    : 'bg-card-light border border-secondary'
  const buttonClass = 'bg-primary hover:bg-secondary text-white'
  const logo = darkMode ? logoDark : logoLight

  return (
    <div className={`min-h-screen flex items-center justify-center ${bgClass} transition-colors duration-500`}>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-300 border border-secondary hover:bg-accent/20"
      >
        {darkMode ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
      </button>

      <motion.form
        onSubmit={handleSubmit}
        className={`w-full max-w-md py-8 px-10 rounded-2xl shadow-2xl ${cardBg}`}
      >
        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="Atlas Financial Bank logo" className="w-52 mb-4" />
          <h1 className="text-xl font-bold text-center">
            Iniciar sesión con tu cuenta
          </h1>
        </div>

        <input
          className="w-full mb-4 p-3 rounded-lg bg-transparent border border-secondary text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-sm"
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <div className="relative mb-4">
          <input
            className="w-full p-3 pr-10 rounded-lg bg-transparent border border-secondary text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-sm"
            type={showPassword ? 'text' : 'password'}
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-secondary hover:text-accent"
            aria-label="Mostrar u ocultar contraseña"
          >
            {showPassword ? '' : '👁️'}
          </button>
        </div>

        <div className="text-right mb-4">
          <button
            type="button"
            className="text-sm text-secondary hover:text-accent hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        <button
          type="submit"
          className={`w-full py-3 rounded-lg font-semibold text-sm transition-colors duration-300 ${buttonClass}`}
        >
          Iniciar Sesión
        </button>
      </motion.form>
    </div>
  )
}
