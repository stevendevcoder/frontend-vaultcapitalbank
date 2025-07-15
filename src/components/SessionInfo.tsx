import { useState } from "react"
import { FiUser, FiLogOut, FiChevronDown, FiChevronUp } from "react-icons/fi"
import { useAuth } from "../hooks/useAuth"
import api from "../services/api"

export default function SessionInfo() {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  if (!user) return null

  const handleLogout = async () => {
    if (confirm("¿Estás seguro de que quieres cerrar sesión?")) {
      try {
        await api.post('/auth/logout', {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        localStorage.removeItem("token")
        logout()
      } catch (err) {
        console.error('Error during logout:', err)
        // Aún así, limpiamos el localStorage y redirigimos
        localStorage.removeItem("token")
        logout()
      }
    }
  }

  return (
    <div className="relative">
      {/* Botón principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-gradient-to-r from-[#0A2540] to-[#1E3A8A] text-white px-4 py-2 rounded-lg hover:from-[#1E3A8A] hover:to-[#0A2540] transition-all duration-300 shadow-lg border border-[#22D3EE]/20"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-[#22D3EE] to-[#1E3A8A] rounded-full flex items-center justify-center">
          <FiUser size={16} />
        </div>
        <div className="text-left">
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-xs text-[#22D3EE]">{user.role}</p>
        </div>
        {isOpen ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-gradient-to-br from-[#1F2937] to-[#374151] rounded-xl shadow-2xl border border-[#22D3EE]/20 z-50">
          <div className="p-4">
            {/* Información del usuario */}
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#22D3EE]/20">
              <div className="w-12 h-12 bg-gradient-to-r from-[#22D3EE] to-[#1E3A8A] rounded-full flex items-center justify-center text-white font-bold text-lg">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-white font-semibold">{user.name}</h3>
                <p className="text-gray-300 text-sm">{user.email}</p>
                <span className="inline-block mt-1 px-2 py-1 bg-[#22D3EE]/20 text-[#22D3EE] text-xs rounded-full border border-[#22D3EE]/30">
                  {user.role}
                </span>
              </div>
            </div>

            {/* Opciones */}
            <div className="space-y-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors duration-200"
              >
                <FiLogOut size={16} />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Overlay para cerrar el dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
} 