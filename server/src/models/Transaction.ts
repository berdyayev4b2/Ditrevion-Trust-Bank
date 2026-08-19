import mongoose, { Schema, Document } from 'mongoose';

interface ITransactionDocument extends Document {
  userId: string;
  type: 'transfer' | 'deposit' | 'withdrawal' | 'crypto' | 'loan';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  description: string;
  fromAccount?: string;
  toAccount?: string;
  transactionId: string;
  createdAt: Date;
}

const transactionSchema = new Schema<ITransactionDocument>(
  {
    userId: { type: String, required: true },
    type: { type: String, enum: ['transfer', 'deposit', 'withdrawal', 'crypto', 'loan'], required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    description: { type: String },
    fromAccount: { type: String },
    toAccount: { type: String },
    transactionId: { type: String, unique: true },
  },
  { timestamps: true }
);

export default mongoose.model<ITransactionDocument>('Transaction', transactionSchema);
