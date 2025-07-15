import { useState, useEffect } from 'react'
import { FiX, FiPlus, FiEdit, FiTrash2, FiSave, FiCalendar } from 'react-icons/fi'
import type { Transaction } from '../../types/Transaction'
import api from '../../services/api'

interface TransactionFormData {
  orderNumber: string
  date: string
  description: string
  amount: number
  type: 'CREDIT' | 'DEBIT'
}

interface Props {
  userId: number
  isOpen: boolean
  onClose: () => void
  onTransactionAdded: () => void
  editingTransaction?: Transaction | null
}

export default function TransactionModal({ 
  userId, 
  isOpen, 
  onClose, 
  onTransactionAdded, 
  editingTransaction 
}: Props) {
  const [formData, setFormData] = useState<TransactionFormData>({
    orderNumber: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    amount: 0,
    type: 'CREDIT'
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (editingTransaction) {
      setFormData({
        orderNumber: editingTransaction.orderNumber,
        date: new Date(editingTransaction.date).toISOString().split('T')[0],
        description: editingTransaction.description,
        amount: editingTransaction.amount,
        type: editingTransaction.type
      })
      setIsEditing(true)
    } else {
      setFormData({
        orderNumber: `ORD-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        description: '',
        amount: 0,
        type: 'CREDIT'
      })
      setIsEditing(false)
    }
  }, [editingTransaction])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.orderNumber.trim() || !formData.description.trim() || formData.amount <= 0) {
      alert('❌ Por favor completa todos los campos correctamente')
      return
    }

    setIsLoading(true)
    try {
      if (isEditing && editingTransaction) {
        // Actualizar transacción existente
        await api.put(`/admin/transactions/${editingTransaction.id}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        alert("✅ Transacción actualizada exitosamente")
      } else {
        // Crear nueva transacción
        await api.post(`/admin/users/${userId}/transactions`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        alert("✅ Transacción creada exitosamente")
      }
      
      onTransactionAdded()
      onClose()
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || "Error al procesar la transacción"
      alert(`❌ ${errorMessage}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!editingTransaction) return
    
    if (!confirm('¿Estás seguro de que quieres eliminar esta transacción?')) {
      return
    }

    setIsLoading(true)
    try {
      await api.delete(`/admin/transactions/${editingTransaction.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      alert("✅ Transacción eliminada exitosamente")
      onTransactionAdded()
      onClose()
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || "Error al eliminar la transacción"
      alert(`❌ ${errorMessage}`)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-gradient-to-r from-[#0A2540] to-[#1E3A8A] rounded-xl shadow-xl border border-[#22D3EE]/20 w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#22D3EE]/20">
          <h2 className="text-xl font-semibold text-white">
            {isEditing ? 'Editar Transacción' : 'Nueva Transacción'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Número de orden */}
          <div>
            <label className="block text-white font-medium mb-2">Número de Orden *</label>
            <input
              type="text"
              value={formData.orderNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, orderNumber: e.target.value }))}
              className="w-full px-4 py-3 bg-[#0A0F1C] border border-[#22D3EE]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#22D3EE] transition-colors duration-200"
              placeholder="ORD-123456"
              required
            />
          </div>

          {/* Fecha */}
          <div>
            <label className="block text-white font-medium mb-2">Fecha *</label>
            <div className="relative">
              <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 bg-[#0A0F1C] border border-[#22D3EE]/20 rounded-lg text-white focus:outline-none focus:border-[#22D3EE] transition-colors duration-200"
                required
              />
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-white font-medium mb-2">Descripción *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-3 bg-[#0A0F1C] border border-[#22D3EE]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#22D3EE] transition-colors duration-200 resize-none"
              rows={3}
              placeholder="Descripción de la transacción..."
              required
            />
          </div>

          {/* Monto */}
          <div>
            <label className="block text-white font-medium mb-2">Monto *</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
              className="w-full px-4 py-3 bg-[#0A0F1C] border border-[#22D3EE]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#22D3EE] transition-colors duration-200"
              placeholder="0.00"
              required
            />
          </div>

          {/* Tipo */}
          <div>
            <label className="block text-white font-medium mb-2">Tipo *</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as 'CREDIT' | 'DEBIT' }))}
              className="w-full px-4 py-3 bg-[#0A0F1C] border border-[#22D3EE]/20 rounded-lg text-white focus:outline-none focus:border-[#22D3EE] transition-colors duration-200"
            >
              <option value="CREDIT">Ingreso (CREDIT)</option>
              <option value="DEBIT">Gasto (DEBIT)</option>
            </select>
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-4">
            {isEditing && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={isLoading}
                className="flex-1 bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition-colors duration-200 font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <FiTrash2 size={16} />
                Eliminar
              </button>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-[#22D3EE] text-white px-4 py-3 rounded-lg hover:bg-[#1E3A8A] transition-colors duration-200 font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : isEditing ? (
                <>
                  <FiSave size={16} />
                  Guardar
                </>
              ) : (
                <>
                  <FiPlus size={16} />
                  Crear
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 bg-[#0A0F1C] text-white px-4 py-3 rounded-lg hover:bg-[#1F2937] transition-colors duration-200 font-semibold disabled:opacity-50"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 