import mongoose, { Schema, Document } from 'mongoose';

interface ILoanDocument extends Document {
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

const loanSchema = new Schema<ILoanDocument>(
  {
    userId: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    interestRate: { type: Number, required: true },
    duration: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected', 'active', 'completed'], default: 'pending' },
    purpose: { type: String },
    monthlyEMI: { type: Number },
    totalAmount: { type: Number },
    paidAmount: { type: Number, default: 0 },
    remainingAmount: { type: Number },
    approvedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model<ILoanDocument>('Loan', loanSchema);
