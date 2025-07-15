import type { Transaction } from '../../types/Transaction'
import { FiTrendingUp, FiTrendingDown, FiCalendar, FiHash } from 'react-icons/fi'

interface Props {
  transactions: Transaction[]
}

export function TransactionTable({ transactions }: Props) {
  if (transactions.length === 0) {
    return (
      <div className="bg-gradient-to-r from-[#0A2540] to-[#1E3A8A] p-8 rounded-xl shadow-lg border border-[#22D3EE]/20">
        <div className="text-center">
          <div className="text-6xl mb-4">💳</div>
          <h3 className="text-xl font-semibold text-white mb-2">No hay transacciones</h3>
          <p className="text-gray-400">Aún no se han registrado transacciones en tu cuenta</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-[#0A2540] to-[#1E3A8A] p-6 rounded-xl shadow-lg border border-[#22D3EE]/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Transacciones Recientes</h2>
        <span className="text-[#22D3EE] text-sm font-medium">
          {transactions.length} transacciones
        </span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#22D3EE]/20">
              <th className="text-left py-3 px-4 text-[#22D3EE] font-semibold text-sm">
                <div className="flex items-center gap-2">
                  <FiHash size={14} />
                  Orden
                </div>
              </th>
              <th className="text-left py-3 px-4 text-[#22D3EE] font-semibold text-sm">
                <div className="flex items-center gap-2">
                  <FiCalendar size={14} />
                  Fecha
                </div>
              </th>
              <th className="text-left py-3 px-4 text-[#22D3EE] font-semibold text-sm">
                Descripción
              </th>
              <th className="text-right py-3 px-4 text-[#22D3EE] font-semibold text-sm">
                Monto
              </th>
              <th className="text-center py-3 px-4 text-[#22D3EE] font-semibold text-sm">
                Tipo
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b border-[#22D3EE]/10 hover:bg-[#22D3EE]/5 transition-colors duration-200">
                <td className="py-4 px-4">
                  <span className="text-white font-mono text-sm bg-[#0A0F1C] px-2 py-1 rounded">
                    #{transaction.orderNumber}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="text-white text-sm">
                    {new Date(transaction.date).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="text-gray-400 text-xs">
                    {new Date(transaction.date).toLocaleTimeString('es-ES', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-white font-medium text-sm">
                    {transaction.description}
                  </div>
                </td>
                <td className="py-4 px-4 text-right">
                  <div className={`font-bold text-lg ${
                    transaction.type === 'CREDIT' 
                      ? 'text-green-400' 
                      : 'text-red-400'
                  }`}>
                    {transaction.type === 'CREDIT' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                  </div>
                </td>
                <td className="py-4 px-4 text-center">
                  <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                    transaction.type === 'CREDIT'
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {transaction.type === 'CREDIT' ? (
                      <FiTrendingUp size={12} />
                    ) : (
                      <FiTrendingDown size={12} />
                    )}
                    {transaction.type === 'CREDIT' ? 'Ingreso' : 'Gasto'}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
