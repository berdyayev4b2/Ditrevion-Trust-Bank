import mongoose, { Schema, Document } from 'mongoose';

interface INotificationDocument extends Document {
  userId: string;
  type: 'email' | 'sms' | 'in-app';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

const notificationSchema = new Schema<INotificationDocument>(
  {
    userId: { type: String, required: true },
    type: { type: String, enum: ['email', 'sms', 'in-app'], required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<INotificationDocument>('Notification', notificationSchema);
