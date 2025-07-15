export interface Transaction {
    id: number
    orderNumber: string
    date: string // ISO date string
    description: string
    amount: number
    type: 'CREDIT' | 'DEBIT'
  }
  