import mongoose, { Schema, Document } from 'mongoose';

interface ITransferDocument extends Document {
  senderId: string;
  recipientId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  description: string;
  receiptId: string;
  createdAt: Date;
}

const transferSchema = new Schema<ITransferDocument>(
  {
    senderId: { type: String, required: true },
    recipientId: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    description: { type: String },
    receiptId: { type: String, unique: true },
  },
  { timestamps: true }
);

export default mongoose.model<ITransferDocument>('Transfer', transferSchema);
