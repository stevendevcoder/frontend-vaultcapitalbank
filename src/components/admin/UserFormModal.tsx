import { FiX } from "react-icons/fi"
import { useState } from "react"
import type { User } from "../../types/User"
import api from "../../services/api"

interface Props {
  onClose: () => void
  onCreated: () => void
}

export default function UserFormModal({ onClose, onCreated }: Props) {
  const [newUser, setNewUser] = useState<Partial<User>>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleCreate = async () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      alert("Por favor completa todos los campos requeridos")
      return
    }

    setIsLoading(true)
    try {
      await api.post("/admin/users", newUser, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      alert("✅ Usuario creado exitosamente")
      onCreated()
      onClose()
    } catch (err) {
      alert("❌ Error al crear usuario")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 px-10">
      <div className="bg-gradient-to-br from-[#1F2937] to-[#374151] p-8 rounded-2xl w-full max-w-md relative border border-[#22D3EE]/20 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
        >
          <FiX size={24} />
        </button>
        
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-[#22D3EE] to-[#1E3A8A] rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-white font-bold">+</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Crear Nuevo Usuario</h2>
          <p className="text-gray-400">Completa la información del usuario</p>
        </div>

        <div className="space-y-4">
          {[
            { key: "name", label: "Nombre Completo", type: "text", required: true },
            { key: "email", label: "Correo Electrónico", type: "email", required: true },
            { key: "password", label: "Contraseña", type: "password", required: true },
            { key: "phone", label: "Teléfono", type: "tel", required: false },
            { key: "address", label: "Dirección", type: "text", required: false },
            { key: "idNumber", label: "N° Identificación", type: "text", required: false },
          ].map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {field.label}
                {field.required && <span className="text-red-400 ml-1">*</span>}
              </label>
              <input
                className="w-full p-3 bg-[#0A0F1C] border border-[#22D3EE]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-transparent transition-all duration-200"
                placeholder={`Ingresa ${field.label.toLowerCase()}`}
                type={field.type}
                value={(newUser as any)[field.key] || ""}
                onChange={(e) =>
                  setNewUser({ ...newUser, [field.key]: e.target.value })
                }
                required={field.required}
              />
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-8">
          <button
            className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancelar
          </button>
          <button
            className="flex-1 bg-gradient-to-r from-[#22D3EE] to-[#1E3A8A] text-white py-3 rounded-lg hover:from-[#1E3A8A] hover:to-[#22D3EE] transition-all duration-300 font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleCreate}
            disabled={isLoading}
          >
            {isLoading ? "Creando..." : "Crear Usuario"}
          </button>
        </div>
      </div>
    </div>
  )
}
