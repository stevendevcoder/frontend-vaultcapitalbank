import { useState } from "react"
import { FiX, FiSave, FiEye, FiEyeOff, FiPlus, FiEdit, FiTrash2 } from "react-icons/fi"
import type { User } from "../../types/User"
import api from "../../services/api"
import TransactionModal from "./TransactionModal"
import type { Transaction } from "../../types/Transaction"

interface Props {
  user: User
  onClose: () => void
  onUpdated: () => void
  onDelete: (user: User) => void
}

export default function UserDrawer({ user, onClose, onUpdated, onDelete }: Props) {
  const [formData, setFormData] = useState<User>(user)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showTransactionModal, setShowTransactionModal] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // Preparar datos para enviar
      const dataToSend = { ...formData }
      
      // Si la contraseña está vacía, no la enviar para mantener la actual
      if (!dataToSend.password || dataToSend.password.trim() === '') {
        delete dataToSend.password
      }
      
      console.log('Enviando datos:', dataToSend)
      const response = await api.put(`/admin/users/${user.id}`, dataToSend, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      console.log('Respuesta del servidor:', response.data)
      alert("✅ Cambios guardados exitosamente")
      onUpdated()
    } catch (err: any) {
      console.error('Error al guardar:', err)
      const errorMessage = err.response?.data?.error || err.message || "Error al guardar cambios"
      alert(`❌ ${errorMessage}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddTransaction = () => {
    setEditingTransaction(null)
    setShowTransactionModal(true)
  }

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction)
    setShowTransactionModal(true)
  }

  const handleDeleteTransaction = async (transaction: Transaction) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta transacción?')) {
      return
    }

    try {
      await api.delete(`/admin/transactions/${transaction.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      alert("✅ Transacción eliminada exitosamente")
      onUpdated()
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || "Error al eliminar transacción"
      alert(`❌ ${errorMessage}`)
    }
  }

  const handleTransactionModalClose = () => {
    setShowTransactionModal(false)
    setEditingTransaction(null)
  }

  const handleDeleteUser = () => {
    onDelete(user)
  }

  return (
    <>
      {!showTransactionModal && (
        <div className="fixed inset-0  bg-opacity-50 z-40" onClick={onClose}></div>
      )}
      <div className="fixed right-0 top-0 h-full w-full md:w-[500px] bg-gradient-to-b from-[#0A2540] to-[#1E3A8A] shadow-xl z-50 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Editar Usuario</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Formulario */}
          <div className="space-y-6">
            {/* Información básica */}
            <div className="bg-gradient-to-r from-[#0A2540] to-[#1E3A8A] p-4 rounded-xl border border-[#22D3EE]/20">
              <h3 className="text-lg font-semibold text-white mb-4">Información Básica</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Nombre *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 bg-[#0A0F1C] border border-[#22D3EE]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#22D3EE] transition-colors duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 bg-[#0A0F1C] border border-[#22D3EE]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#22D3EE] transition-colors duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Contraseña</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password || ""}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      className="w-full px-3 py-2 pr-10 bg-[#0A0F1C] border border-[#22D3EE]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#22D3EE] transition-colors duration-200"
                      placeholder="Dejar vacío para mantener la actual"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Información de contacto */}
            <div className="bg-gradient-to-r from-[#0A2540] to-[#1E3A8A] p-4 rounded-xl border border-[#22D3EE]/20">
              <h3 className="text-lg font-semibold text-white mb-4">Información de Contacto</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Teléfono</label>
                  <input
                    type="tel"
                    value={formData.phone || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 bg-[#0A0F1C] border border-[#22D3EE]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#22D3EE] transition-colors duration-200"
                    placeholder="+1234567890"
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Dirección</label>
                  <textarea
                    value={formData.address || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full px-3 py-2 bg-[#0A0F1C] border border-[#22D3EE]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#22D3EE] transition-colors duration-200 resize-none"
                    rows={2}
                    placeholder="Dirección completa"
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Número de Identificación</label>
                  <input
                    type="text"
                    value={formData.idNumber || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, idNumber: e.target.value }))}
                    className="w-full px-3 py-2 bg-[#0A0F1C] border border-[#22D3EE]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#22D3EE] transition-colors duration-200"
                    placeholder="Cédula, pasaporte, etc."
                  />
                </div>
              </div>
            </div>

            {/* Información bancaria */}
            <div className="bg-gradient-to-r from-[#0A2540] to-[#1E3A8A] p-4 rounded-xl border border-[#22D3EE]/20">
              <h3 className="text-lg font-semibold text-white mb-4">Información Bancaria</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Número de Cuenta</label>
                  <input
                    type="text"
                    value={formData.accountNumber || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, accountNumber: e.target.value }))}
                    className="w-full px-3 py-2 bg-[#0A0F1C] border border-[#22D3EE]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#22D3EE] transition-colors duration-200"
                    placeholder="1234567890"
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Tipo de Cuenta</label>
                  <select
                    value={formData.accountType || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, accountType: e.target.value }))}
                    className="w-full px-3 py-2 bg-[#0A0F1C] border border-[#22D3EE]/20 rounded-lg text-white focus:outline-none focus:border-[#22D3EE] transition-colors duration-200"
                  >
                    <option value="">Seleccionar tipo</option>
                    <option value="Corriente">Corriente</option>
                    <option value="Ahorro">Ahorro</option>
                    <option value="Empresarial">Empresarial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Estado de la Cuenta</label>
                  <select
                    value={formData.accountStatus || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, accountStatus: e.target.value }))}
                    className="w-full px-3 py-2 bg-[#0A0F1C] border border-[#22D3EE]/20 rounded-lg text-white focus:outline-none focus:border-[#22D3EE] transition-colors duration-200"
                  >
                    <option value="">Seleccionar estado</option>
                    <option value="Activa">Activa</option>
                    <option value="Inactiva">Inactiva</option>
                    <option value="Bloqueada">Bloqueada</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Saldo</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.balance || 0}
                    onChange={(e) => setFormData(prev => ({ ...prev, balance: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 bg-[#0A0F1C] border border-[#22D3EE]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#22D3EE] transition-colors duration-200"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            {/* Transacciones */}
            <div className="bg-gradient-to-r from-[#0A2540] to-[#1E3A8A] p-4 rounded-xl border border-[#22D3EE]/20">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Transacciones</h3>
                <button
                  className="text-sm bg-[#22D3EE] text-white px-3 py-1 rounded-lg hover:bg-[#1E3A8A] transition-colors duration-200 flex items-center gap-1"
                  onClick={handleAddTransaction}
                >
                  <FiPlus size={14} />
                  Agregar
                </button>
              </div>

              <div className="max-h-60 overflow-y-auto space-y-2">
                {formData?.transactions?.length > 0 ? (
                  formData.transactions.map((t) => (
                    <div key={t.id} className="bg-[#0A0F1C] p-3 rounded-lg border border-[#22D3EE]/20">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="text-white font-medium text-sm">#{t.orderNumber}</p>
                          <p className="text-gray-400 text-xs">{t.description}</p>
                          <p className="text-gray-500 text-xs">
                            {new Date(t.date).toLocaleDateString('es-ES')}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className={`font-bold text-sm ${
                            t.type === 'CREDIT' ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {t.type === 'CREDIT' ? '+' : '-'}${t.amount.toFixed(2)}
                          </span>
                          <button
                            onClick={() => handleEditTransaction(t)}
                            className="text-[#22D3EE] hover:text-white transition-colors duration-200 p-1"
                          >
                            <FiEdit size={12} />
                          </button>
                          <button
                            onClick={() => handleDeleteTransaction(t)}
                            className="text-red-400 hover:text-red-300 transition-colors duration-200 p-1"
                          >
                            <FiTrash2 size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <div className="text-4xl mb-2">💳</div>
                    <p className="text-sm">No hay transacciones</p>
                    <p className="text-xs">Agrega la primera transacción</p>
                  </div>
                )}
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="flex-1 bg-[#22D3EE] text-white py-3 px-4 rounded-lg hover:bg-[#1E3A8A] transition-colors duration-200 font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <FiSave size={16} />
                    Guardar
                  </>
                )}
              </button>
              <button
                onClick={handleDeleteUser}
                className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200 font-semibold flex items-center justify-center gap-2"
              >
                <FiTrash2 size={16} />
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de transacciones */}
      <TransactionModal
        userId={user.id}
        isOpen={showTransactionModal}
        onClose={handleTransactionModalClose}
        onTransactionAdded={onUpdated}
        editingTransaction={editingTransaction}
      />
    </>
  )
}
