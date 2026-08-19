import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import User from '../models/User';
import Transfer from '../models/Transfer';
import Transaction from '../models/Transaction';

interface AuthRequest extends Request {
  userId?: string;
}

export const sendMoney = async (req: AuthRequest, res: Response) => {
  try {
    const { recipientEmail, amount, description } = req.body;

    // Validate input
    if (!recipientEmail || !amount) {
      return res.status(400).json({ error: 'Recipient email and amount required' });
    }

    if (amount <= 0) {
      return res.status(400).json({ error: 'Amount must be greater than 0' });
    }

    // Get sender
    const sender = await User.findById(req.userId);
    if (!sender) {
      return res.status(404).json({ error: 'Sender not found' });
    }

    // Check balance
    if (sender.balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    // Get recipient
    const recipient = await User.findOne({ email: recipientEmail });
    if (!recipient) {
      return res.status(404).json({ error: 'Recipient not found' });
    }

    // Create transfer
    const receiptId = `RCP${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
    const transfer = new Transfer({
      senderId: req.userId,
      recipientId: recipient._id,
      amount,
      currency: 'USD',
      description,
      receiptId,
      status: 'completed',
    });

    // Update balances
    sender.balance -= amount;
    recipient.balance += amount;

    await sender.save();
    await recipient.save();
    await transfer.save();

    // Create transactions
    const transactionId = `TXN${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
    await Transaction.create({
      userId: req.userId,
      type: 'transfer',
      amount,
      currency: 'USD',
      status: 'completed',
      description,
      fromAccount: sender.accountNumber,
      toAccount: recipient.accountNumber,
      transactionId,
    });

    res.json({
      success: true,
      message: 'Money transferred successfully',
      transfer: {
        id: transfer._id,
        receiptId,
        amount,
        recipientName: `${recipient.firstName} ${recipient.lastName}`,
        timestamp: transfer.createdAt,
        status: 'completed',
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getTransferHistory = async (req: AuthRequest, res: Response) => {
  try {
    const { limit = 50, skip = 0 } = req.query;

    const transfers = await Transfer.find({
      $or: [{ senderId: req.userId }, { recipientId: req.userId }],
    })
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip(Number(skip));

    res.json({
      success: true,
      transfers,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getReceipt = async (req: AuthRequest, res: Response) => {
  try {
    const { receiptId } = req.params;

    const transfer = await Transfer.findOne({ receiptId });
    if (!transfer) {
      return res.status(404).json({ error: 'Receipt not found' });
    }

    const sender = await User.findById(transfer.senderId);
    const recipient = await User.findById(transfer.recipientId);

    res.json({
      success: true,
      receipt: {
        receiptId: transfer.receiptId,
        from: {
          name: `${sender?.firstName} ${sender?.lastName}`,
          account: sender?.accountNumber,
          email: sender?.email,
        },
        to: {
          name: `${recipient?.firstName} ${recipient?.lastName}`,
          account: recipient?.accountNumber,
          email: recipient?.email,
        },
        amount: transfer.amount,
        currency: transfer.currency,
        description: transfer.description,
        status: transfer.status,
        timestamp: transfer.createdAt,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
