import { Request, Response } from 'express';
import ChatMessage from '../models/ChatMessage';

interface AuthRequest extends Request {
  userId?: string;
}

export const sendMessage = async (req: AuthRequest, res: Response) => {
  try {
    const { recipientId, message } = req.body;

    if (!recipientId || !message) {
      return res.status(400).json({ error: 'Recipient and message required' });
    }

    const chatMessage = new ChatMessage({
      senderId: req.userId,
      recipientId,
      message,
      type: 'text',
      status: 'sent',
    });

    await chatMessage.save();

    res.status(201).json({
      success: true,
      message: 'Message sent',
      data: chatMessage,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getChatHistory = async (req: AuthRequest, res: Response) => {
  try {
    const { conversationWith, limit = 50, skip = 0 } = req.query;

    const messages = await ChatMessage.find({
      $or: [
        { senderId: req.userId, recipientId: conversationWith },
        { senderId: conversationWith, recipientId: req.userId },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip(Number(skip));

    res.json({
      success: true,
      messages: messages.reverse(),
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const markAsRead = async (req: AuthRequest, res: Response) => {
  try {
    const { messageId } = req.body;

    await ChatMessage.findByIdAndUpdate(messageId, { status: 'read' });

    res.json({ success: true, message: 'Message marked as read' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
