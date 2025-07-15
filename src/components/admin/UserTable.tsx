import type { User } from '../../types/User'
import { FiTrash2, FiEdit } from 'react-icons/fi'

interface Props {
  users: User[]
  onSelect: (user: User) => void
  onDelete: (user: User) => void
}

export default function UserTable({ users, onSelect, onDelete }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gradient-to-r from-[#0A2540] to-[#1E3A8A] text-white">
            <th className="p-4 text-left font-semibold border-b border-[#22D3EE]/30">Nombre</th>
            <th className="p-4 text-left font-semibold border-b border-[#22D3EE]/30">Email</th>
            <th className="p-4 text-left font-semibold border-b border-[#22D3EE]/30">Teléfono</th>
            <th className="p-4 text-left font-semibold border-b border-[#22D3EE]/30">Fecha</th>
            <th className="p-4 text-left font-semibold border-b border-[#22D3EE]/30">Saldo</th>
            <th className="p-4 text-left font-semibold border-b border-[#22D3EE]/30">Estado</th>
            <th className="p-4 text-center font-semibold border-b border-[#22D3EE]/30">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, index) => (
            <tr
              key={u.id}
              className={`cursor-pointer transition-all duration-200 hover:bg-[#22D3EE]/10 hover:shadow-lg ${
                index % 2 === 0 ? 'bg-[#1F2937]' : 'bg-[#374151]'
              }`}
              onClick={() => onSelect(u)}
            >
              <td className="p-4 border-b border-[#22D3EE]/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#22D3EE] to-[#1E3A8A] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {u.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium text-white">{u.name}</span>
                </div>
              </td>
              <td className="p-4 border-b border-[#22D3EE]/10 text-gray-300">{u.email}</td>
              <td className="p-4 border-b border-[#22D3EE]/10 text-gray-300">
                {u.phone || 'No especificado'}
              </td>
              <td className="p-4 border-b border-[#22D3EE]/10 text-gray-300">
                {new Date(u.createdAt).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </td>
              <td className="p-4 border-b border-[#22D3EE]/10">
                <span className={`font-bold ${
                  u.balance >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  ${u.balance.toFixed(2)} USD
                </span>
              </td>
                          <td className="p-4 border-b border-[#22D3EE]/10">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                u.accountStatus === 'activa' 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : u.accountStatus === 'bloqueada'
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
              }`}>
                {u.accountStatus || 'Pendiente'}
              </span>
            </td>
            <td className="p-4 border-b border-[#22D3EE]/10">
              <div className="flex justify-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onSelect(u)
                  }}
                  className="p-2 text-[#22D3EE] hover:bg-[#22D3EE]/10 rounded-lg transition-colors duration-200"
                  title="Editar usuario"
                >
                  <FiEdit size={16} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete(u)
                  }}
                  className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors duration-200"
                  title="Eliminar usuario"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
      
      {users.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <div className="text-6xl mb-4">👥</div>
          <p className="text-lg">No hay usuarios registrados</p>
          <p className="text-sm">Crea el primer usuario para comenzar</p>
        </div>
      )}
    </div>
  )
}
