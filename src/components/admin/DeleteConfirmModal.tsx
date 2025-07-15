import { FiAlertTriangle, FiX } from "react-icons/fi"
import type { User } from "../../types/User"

interface Props {
  user: User | null
  onClose: () => void
  onConfirm: () => void
  isLoading?: boolean
}

export default function DeleteConfirmModal({ user, onClose, onConfirm, isLoading = false }: Props) {
  if (!user) return null

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-gradient-to-br from-[#1F2937] to-[#374151] p-8 rounded-2xl w-full max-w-md relative border border-red-500/20 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
        >
          <FiX size={24} />
        </button>
        
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/30">
            <FiAlertTriangle size={32} className="text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Eliminar Usuario</h2>
          <p className="text-gray-400">Esta acción no se puede deshacer</p>
        </div>

        <div className="bg-[#0A0F1C] p-4 rounded-lg border border-red-500/20 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[#22D3EE] to-[#1E3A8A] rounded-full flex items-center justify-center text-white font-bold text-sm">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-white font-semibold">{user.name}</h3>
              <p className="text-gray-300 text-sm">{user.email}</p>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            <p>• Se eliminarán todas las transacciones asociadas</p>
            <p>• Se perderá toda la información del usuario</p>
            <p>• Esta acción es permanente</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancelar
          </button>
          <button
            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Eliminando..." : "Eliminar Usuario"}
          </button>
        </div>
      </div>
    </div>
  )
} 