export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  accountNumber: string;
  accountType: string;
  balance: number;
  status: string;
  kycVerified: boolean;
}

export interface Transaction {
  _id: string;
  type: 'transfer' | 'deposit' | 'withdrawal' | 'crypto' | 'loan';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  description: string;
  createdAt: string;
}

export interface Transfer {
  _id: string;
  senderId: string;
  recipientId: string;
  amount: number;
  currency: string;
  status: string;
  receiptId: string;
  createdAt: string;
}

export interface Crypto {
  id: string;
  symbol: string;
  quantity: number;
  unitPrice: number;
  totalValue: number;
  gain: number;
  purchaseDate: string;
}

export interface Loan {
  id: string;
  amount: number;
  interestRate: number;
  duration: number;
  monthlyEMI: number;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  status: string;
  purpose: string;
  createdAt: string;
}
