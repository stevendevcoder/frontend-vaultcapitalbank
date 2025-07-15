export interface SupportTicket {
  id: number
  title: string
  description: string
  category: 'Técnico' | 'Cuenta' | 'Transacciones' | 'General'
  status: 'Abierto' | 'En Proceso' | 'Resuelto' | 'Cerrado'
  priority: 'Baja' | 'Media' | 'Alta' | 'Crítica'
  createdAt?: string
  updatedAt: string
  userId: number
}

export interface CreateTicketRequest {
  title: string
  description: string
  category: 'Técnico' | 'Cuenta' | 'Transacciones' | 'General'
  priority: 'Baja' | 'Media' | 'Alta' | 'Crítica'
} 