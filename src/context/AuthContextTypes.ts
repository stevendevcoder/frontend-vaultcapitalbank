import { createContext } from 'react'
import type { Transaction } from '../types/Transaction'

export interface User {
  id: number
  name: string
  email: string
  role: string
  balance?: number
  accountType?: string
  accountNumber?: string
  accountStatus?: string
  phone?: string
  address?: string
  idNumber?: string
  transactions?: Transaction[]
  createdAt?: string
}

export interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

export const AuthContext = createContext<AuthContextType | null>(null) 