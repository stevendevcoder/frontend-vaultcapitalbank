import type { Transaction } from "./Transaction";

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  createdAt: string;
  balance: number;
  role: string;
  phone?: string;
  address?: string;
  idNumber?: string;
  accountType?: string;
  accountNumber?: string;
  accountStatus?: string;
  transactions?: Transaction[];
}

