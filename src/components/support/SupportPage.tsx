import { useState } from 'react'
import { FiPlus, FiMessageSquare, FiClock, FiCheck, FiX, FiAlertCircle } from 'react-icons/fi'
import type { SupportTicket, CreateTicketRequest } from '../../types/Support'

// Mock data para tickets
const mockTickets: SupportTicket[] = [
  {
    id: 1,
    title: "Realiza un nuevo ticket si tienes dudas",
    description: "Aqui puedes realizar reclamaciones o recibir soporte tecnico",
    category: "Transacciones",
    status: "En Proceso",
    priority: "Alta",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T14:20:00Z",
    userId: 1
  },
]

export function SupportPage() {
  const [tickets, setTickets] = useState<SupportTicket[]>(mockTickets)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<CreateTicketRequest>({
    title: '',
    description: '',
    category: 'General',
    priority: 'Media'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim() || !formData.description.trim()) {
      alert('❌ Por favor completa todos los campos obligatorios')
      return
    }

    const newTicket: SupportTicket = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      status: 'Abierto',
      priority: formData.priority,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: 1
    }

    setTickets(prev => [newTicket, ...prev])
    setFormData({
      title: '',
      description: '',
      category: 'General',
      priority: 'Media'
    })
    setShowForm(false)
    alert('✅ Ticket creado exitosamente')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Abierto':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'En Proceso':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'Resuelto':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'Cerrado':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      default:
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Crítica':
        return 'text-red-400'
      case 'Alta':
        return 'text-orange-400'
      case 'Media':
        return 'text-yellow-400'
      case 'Baja':
        return 'text-green-400'
      default:
        return 'text-gray-400'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Soporte</h1>
          <p className="text-gray-400">
            ¿Necesitas ayuda? Crea un ticket y nuestro equipo te asistirá
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-[#22D3EE] to-[#1E3A8A] text-white px-6 py-3 rounded-xl hover:from-[#1E3A8A] hover:to-[#22D3EE] transition-all duration-300 shadow-lg font-semibold flex items-center gap-2"
        >
          <FiPlus size={20} />
          Nuevo Ticket
        </button>
      </div>

      {/* Formulario de nuevo ticket */}
      {showForm && (
        <div className="bg-gradient-to-r from-[#0A2540] to-[#1E3A8A] p-6 rounded-xl shadow-lg border border-[#22D3EE]/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Crear Nuevo Ticket</h2>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <FiX size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white font-medium mb-2">Título *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Describe brevemente tu problema"
                className="w-full px-4 py-3 bg-[#0A0F1C] border border-[#22D3EE]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#22D3EE] transition-colors duration-200"
                required
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Descripción *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Proporciona detalles sobre tu problema..."
                rows={4}
                className="w-full px-4 py-3 bg-[#0A0F1C] border border-[#22D3EE]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#22D3EE] transition-colors duration-200 resize-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">Categoría</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
                  className="w-full px-4 py-3 bg-[#0A0F1C] border border-[#22D3EE]/20 rounded-lg text-white focus:outline-none focus:border-[#22D3EE] transition-colors duration-200"
                >
                  <option value="General">General</option>
                  <option value="Técnico">Técnico</option>
                  <option value="Cuenta">Cuenta</option>
                  <option value="Transacciones">Transacciones</option>
                </select>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Prioridad</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as any }))}
                  className="w-full px-4 py-3 bg-[#0A0F1C] border border-[#22D3EE]/20 rounded-lg text-white focus:outline-none focus:border-[#22D3EE] transition-colors duration-200"
                >
                  <option value="Baja">Baja</option>
                  <option value="Media">Media</option>
                  <option value="Alta">Alta</option>
                  <option value="Crítica">Crítica</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="bg-[#22D3EE] text-white px-6 py-3 rounded-lg hover:bg-[#1E3A8A] transition-colors duration-200 font-semibold flex items-center gap-2"
              >
                <FiMessageSquare size={16} />
                Crear Ticket
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-[#0A0F1C] text-white px-6 py-3 rounded-lg hover:bg-[#1F2937] transition-colors duration-200 font-semibold"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tabla de tickets */}
      <div className="bg-gradient-to-r from-[#0A2540] to-[#1E3A8A] p-6 rounded-xl shadow-lg border border-[#22D3EE]/20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Mis Tickets</h2>
          <span className="text-[#22D3EE] text-sm font-medium">
            {tickets.length} tickets
          </span>
        </div>

        {tickets.length === 0 ? (
          <div className="text-center py-12">
            <FiMessageSquare size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No hay tickets</h3>
            <p className="text-gray-400">Crea tu primer ticket para obtener ayuda</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#22D3EE]/20">
                  <th className="text-left py-3 px-4 text-[#22D3EE] font-semibold text-sm">ID</th>
                  <th className="text-left py-3 px-4 text-[#22D3EE] font-semibold text-sm">Título</th>
                  <th className="text-left py-3 px-4 text-[#22D3EE] font-semibold text-sm">Categoría</th>
                  <th className="text-left py-3 px-4 text-[#22D3EE] font-semibold text-sm">Prioridad</th>
                  <th className="text-left py-3 px-4 text-[#22D3EE] font-semibold text-sm">Estado</th>
                  <th className="text-left py-3 px-4 text-[#22D3EE] font-semibold text-sm">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.id} className="border-b border-[#22D3EE]/10 hover:bg-[#22D3EE]/5 transition-colors duration-200">
                    <td className="py-4 px-4">
                      <span className="text-white font-mono text-sm">#{ticket.id}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-white font-medium text-sm">{ticket.title}</p>
                        <p className="text-gray-400 text-xs truncate max-w-xs">
                          {ticket.description}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-white text-sm">{ticket.category}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`text-sm font-medium ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-gray-300 text-sm">
                        {formatDate(ticket.createdAt)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Información de contacto */}
      <div className="bg-gradient-to-r from-[#0A2540] to-[#1E3A8A] p-6 rounded-xl shadow-lg border border-[#22D3EE]/20">
        <h3 className="text-lg font-semibold text-white mb-4">Información de Contacto</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-[#22D3EE]/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <FiMessageSquare size={24} className="text-[#22D3EE]" />
            </div>
            <h4 className="text-[#22D3EE] font-medium mb-1">Chat en vivo</h4>
            <p className="text-gray-300 text-sm">Disponible 24/7</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-[#22D3EE]/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <FiClock size={24} className="text-[#22D3EE]" />
            </div>
            <h4 className="text-[#22D3EE] font-medium mb-1">Tiempo de respuesta</h4>
            <p className="text-gray-300 text-sm">Máximo 24 horas</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-[#22D3EE]/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <FiCheck size={24} className="text-[#22D3EE]" />
            </div>
            <h4 className="text-[#22D3EE] font-medium mb-1">Satisfacción garantizada</h4>
            <p className="text-gray-300 text-sm">Resolvemos tu problema</p>
          </div>
        </div>
      </div>
    </div>
  )
} 