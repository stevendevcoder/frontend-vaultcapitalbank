import { FiUser, FiMail, FiPhone, FiMapPin, FiCreditCard, FiShield, FiCalendar, FiDollarSign } from 'react-icons/fi'
import type { User } from '../../types/User'

interface Props {
  user: User
}

export function AccountInfoPage({ user }: Props) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'activa':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'inactiva':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'bloqueada':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      default:
        return 'bg-green-500/20 text-green-400 border-green-500/30'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Información de Cuenta</h1>
        <p className="text-gray-400">
          Revisa todos los detalles de tu cuenta bancaria
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Información Personal */}
        <div className="bg-gradient-to-r from-[#0A2540] to-[#1E3A8A] p-6 rounded-xl shadow-lg border border-[#22D3EE]/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#22D3EE]/20 rounded-full flex items-center justify-center">
              <FiUser size={20} className="text-[#22D3EE]" />
            </div>
            <h2 className="text-xl font-semibold text-white">Información Personal</h2>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-[#0A0F1C] rounded-lg">
              <div className="flex items-center gap-3">
                <FiUser size={16} className="text-[#22D3EE]" />
                <span className="text-gray-300">Nombre completo:</span>
              </div>
              <span className="text-white font-medium">{user.name}</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-[#0A0F1C] rounded-lg">
              <div className="flex items-center gap-3">
                <FiMail size={16} className="text-[#22D3EE]" />
                <span className="text-gray-300">Correo electrónico:</span>
              </div>
              <span className="text-white font-medium">{user.email}</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-[#0A0F1C] rounded-lg">
              <div className="flex items-center gap-3">
                <FiPhone size={16} className="text-[#22D3EE]" />
                <span className="text-gray-300">Teléfono:</span>
              </div>
              <span className="text-white font-medium">
                {user.phone || 'No registrado'}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-[#0A0F1C] rounded-lg">
              <div className="flex items-center gap-3">
                <FiMapPin size={16} className="text-[#22D3EE]" />
                <span className="text-gray-300">Dirección:</span>
              </div>
              <span className="text-white font-medium text-right max-w-xs">
                {user.address || 'No registrada'}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-[#0A0F1C] rounded-lg">
              <div className="flex items-center gap-3">
                <FiShield size={16} className="text-[#22D3EE]" />
                <span className="text-gray-300">Número de identificación:</span>
              </div>
              <span className="text-white font-medium">
                {user.idNumber || 'No registrado'}
              </span>
            </div>
          </div>
        </div>

        {/* Información Bancaria */}
        <div className="bg-gradient-to-r from-[#0A2540] to-[#1E3A8A] p-6 rounded-xl shadow-lg border border-[#22D3EE]/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#22D3EE]/20 rounded-full flex items-center justify-center">
              <FiCreditCard size={20} className="text-[#22D3EE]" />
            </div>
            <h2 className="text-xl font-semibold text-white">Información Bancaria</h2>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-[#0A0F1C] rounded-lg">
              <div className="flex items-center gap-3">
                <FiCreditCard size={16} className="text-[#22D3EE]" />
                <span className="text-gray-300">Número de cuenta:</span>
              </div>
              <span className="text-white font-medium font-mono">
                {user.accountNumber ? `****-****-${user.accountNumber.slice(-4)}` : 'No asignado'}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-[#0A0F1C] rounded-lg">
              <div className="flex items-center gap-3">
                <FiCreditCard size={16} className="text-[#22D3EE]" />
                <span className="text-gray-300">Tipo de cuenta:</span>
              </div>
              <span className="text-white font-medium">
                {user.accountType || 'Corriente'}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-[#0A0F1C] rounded-lg">
              <div className="flex items-center gap-3">
                <FiShield size={16} className="text-[#22D3EE]" />
                <span className="text-gray-300">Estado de la cuenta:</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(user.accountStatus || 'Activa')}`}>
                {user.accountStatus || 'Activa'}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-[#0A0F1C] rounded-lg">
              <div className="flex items-center gap-3">
                <FiDollarSign size={16} className="text-[#22D3EE]" />
                <span className="text-gray-300">Saldo actual:</span>
              </div>
              <span className="text-white font-bold text-lg">
                ${(user.balance || 0).toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-[#0A0F1C] rounded-lg">
              <div className="flex items-center gap-3">
                <FiCalendar size={16} className="text-[#22D3EE]" />
                <span className="text-gray-300">Miembro desde:</span>
              </div>
              <span className="text-white font-medium">
                {user.createdAt ? formatDate(user.createdAt) : 'No disponible'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Información adicional */}
      <div className="bg-gradient-to-r from-[#0A2540] to-[#1E3A8A] p-6 rounded-xl shadow-lg border border-[#22D3EE]/20">
        <h3 className="text-lg font-semibold text-white mb-4">Información Adicional</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-[#0A0F1C] rounded-lg border border-[#22D3EE]/20">
            <p className="text-gray-300 text-sm mb-2">Rol de usuario:</p>
            <p className="text-white font-medium">{user.role}</p>
          </div>
          <div className="p-4 bg-[#0A0F1C] rounded-lg border border-[#22D3EE]/20">
            <p className="text-gray-300 text-sm mb-2">ID de usuario:</p>
            <p className="text-white font-medium font-mono">#{user.id}</p>
          </div>
        </div>
      </div>
    </div>
  )
} 