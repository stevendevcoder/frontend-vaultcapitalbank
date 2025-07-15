import { useState, useMemo } from 'react'
import { FiSearch, FiFilter, FiDownload } from 'react-icons/fi'
import type { Transaction } from '../../types/Transaction'
import { TransactionTable } from '../dashboard/TransactionTable'

interface Props {
  transactions: Transaction[]
}

export function TransactionsPage({ transactions }: Props) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'CREDIT' | 'DEBIT'>('all')

  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           transaction.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesFilter = filterType === 'all' || transaction.type === filterType
      
      return matchesSearch && matchesFilter
    })
  }, [transactions, searchTerm, filterType])

  const handleExport = () => {
    // En una implementación real, aquí se exportarían las transacciones
    alert('📊 Función de exportación próximamente disponible')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Transacciones</h1>
          <p className="text-gray-400">
            Gestiona y revisa todas tus transacciones financieras
          </p>
        </div>
        <button
          onClick={handleExport}
          className="bg-gradient-to-r from-[#22D3EE] to-[#1E3A8A] text-white px-4 py-2 rounded-lg hover:from-[#1E3A8A] hover:to-[#22D3EE] transition-all duration-300 shadow-lg font-semibold flex items-center gap-2"
        >
          <FiDownload size={16} />
          Exportar
        </button>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-gradient-to-r from-[#0A2540] to-[#1E3A8A] p-6 rounded-xl shadow-lg border border-[#22D3EE]/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Barra de búsqueda */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar por descripción o número de orden..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#0A0F1C] border border-[#22D3EE]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#22D3EE] transition-colors duration-200"
            />
          </div>

          {/* Filtro por tipo */}
          <div className="relative">
            <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as 'all' | 'CREDIT' | 'DEBIT')}
              className="w-full pl-10 pr-4 py-3 bg-[#0A0F1C] border border-[#22D3EE]/20 rounded-lg text-white focus:outline-none focus:border-[#22D3EE] transition-colors duration-200 appearance-none cursor-pointer"
            >
              <option value="all">Todos los tipos</option>
              <option value="CREDIT">Solo ingresos</option>
              <option value="DEBIT">Solo gastos</option>
            </select>
          </div>

          {/* Estadísticas rápidas */}
          <div className="flex items-center justify-center">
            <div className="text-center">
              <p className="text-[#22D3EE] text-sm font-medium">Transacciones encontradas</p>
              <p className="text-2xl font-bold text-white">{filteredTransactions.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de transacciones */}
      <TransactionTable transactions={filteredTransactions} />
    </div>
  )
} 