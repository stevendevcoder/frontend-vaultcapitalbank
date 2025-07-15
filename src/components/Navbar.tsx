import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { useNavigate, useLocation } from "react-router-dom"
import { FiHome, FiUsers, FiBarChart, FiSettings, FiMenu, FiX, FiCreditCard, FiUser, FiShield, FiHelpCircle } from "react-icons/fi"
import logo from "../assets/logo-dark.png"
import SessionInfo from "./SessionInfo"

export default function Navbar() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  if (!user) return null

  const navigationItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: FiHome,
      showFor: ["USER"]
    },
    {
      name: "Transacciones",
      path: "/transactions",
      icon: FiCreditCard,
      showFor: ["USER"]
    },
    {
      name: "Cuenta",
      path: "/account",
      icon: FiUser,
      showFor: ["USER"]
    },
    {
      name: "Verificación",
      path: "/verification",
      icon: FiShield,
      showFor: ["USER"]
    },
    {
      name: "Soporte",
      path: "/support",
      icon: FiHelpCircle,
      showFor: ["USER"]
    },
    {
      name: "Administración",
      path: "/admin",
      icon: FiUsers,
      showFor: ["ADMIN"]
    }
  ]

  const filteredItems = navigationItems.filter(item => 
    item.showFor.includes(user.role)
  )

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="bg-gradient-to-r from-[#0A2540] to-[#1E3A8A] shadow-lg border-b border-[#22D3EE]/20">
      <div className="max-w-7xl mx-auto px-4 py-5 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center h-16">
          {/* Logo y navegación principal */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img src={logo} alt="Vault Logo" className="h-15 w-auto" />
            </div>
            
            {/* Navegación desktop */}
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                {filteredItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.name}
                      onClick={() => navigate(item.path)}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        isActive(item.path)
                          ? "bg-[#22D3EE] text-white shadow-lg"
                          : "text-gray-300 hover:text-white hover:bg-[#22D3EE]/20"
                      }`}
                    >
                      <Icon size={16} className="mr-2" />
                      {item.name}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Información de sesión */}
          <div className="hidden md:block">
            <SessionInfo />
          </div>

          {/* Botón de menú móvil */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-[#0A2540] to-[#1E3A8A] border-t border-[#22D3EE]/20">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {filteredItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.path)
                    setIsMobileMenuOpen(false)
                  }}
                  className={`flex items-center w-full px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? "bg-[#22D3EE] text-white"
                      : "text-gray-300 hover:text-white hover:bg-[#22D3EE]/20"
                  }`}
                >
                  <Icon size={18} className="mr-3" />
                  {item.name}
                </button>
              )
            })}
            <div className="pt-4 border-t border-[#22D3EE]/20">
              <SessionInfo />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
} 