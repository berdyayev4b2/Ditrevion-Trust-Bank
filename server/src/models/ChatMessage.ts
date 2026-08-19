import mongoose, { Schema, Document } from 'mongoose';

interface IChatMessageDocument extends Document {
  senderId: string;
  recipientId: string;
  message: string;
  type: 'text' | 'file';
  status: 'sent' | 'delivered' | 'read';
  createdAt: Date;
}

const chatMessageSchema = new Schema<IChatMessageDocument>(
  {
    senderId: { type: String, required: true },
    recipientId: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ['text', 'file'], default: 'text' },
    status: { type: String, enum: ['sent', 'delivered', 'read'], default: 'sent' },
  },
  { timestamps: true }
);

export default mongoose.model<IChatMessageDocument>('ChatMessage', chatMessageSchema);
