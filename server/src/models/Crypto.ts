import mongoose, { Schema, Document } from 'mongoose';

interface ICryptoDocument extends Document {
  userId: string;
  symbol: string;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
  totalValue: number;
  purchaseDate: Date;
}

const cryptoSchema = new Schema<ICryptoDocument>(
  {
    userId: { type: String, required: true },
    symbol: { type: String, required: true },
    quantity: { type: Number, required: true },
    purchasePrice: { type: Number, required: true },
    currentPrice: { type: Number, required: true },
    totalValue: { type: Number },
    purchaseDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<ICryptoDocument>('Crypto', cryptoSchema);
