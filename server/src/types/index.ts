export interface IUser {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: Date;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  accountNumber: string;
  accountType: 'savings' | 'checking' | 'business';
  balance: number;
  status: 'active' | 'inactive' | 'suspended';
  kycVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITransaction {
  _id: string;
  userId: string;
  type: 'transfer' | 'deposit' | 'withdrawal' | 'crypto' | 'loan';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  description: string;
  fromAccount?: string;
  toAccount?: string;
  timestamp: Date;
}

export interface ITransfer {
  _id: string;
  senderId: string;
  recipientId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  description: string;
  receiptId: string;
  createdAt: Date;
}

export interface ICrypto {
  _id: string;
  userId: string;
  symbol: string;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
  totalValue: number;
  purchaseDate: Date;
}

export interface ILoan {
  _id: string;
  userId: string;
  amount: number;
  currency: string;
  interestRate: number;
  duration: number;
  status: 'pending' | 'approved' | 'rejected' | 'active' | 'completed';
  purpose: string;
  monthlyEMI: number;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  createdAt: Date;
  approvedAt?: Date;
}

export interface IChatMessage {
  _id: string;
  senderId: string;
  recipientId: string;
  message: string;
  type: 'text' | 'file';
  status: 'sent' | 'delivered' | 'read';
  createdAt: Date;
}

export interface INotification {
  _id: string;
  userId: string;
  type: 'email' | 'sms' | 'in-app';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
}
