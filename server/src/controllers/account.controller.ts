import { Request, Response } from 'express';
import User from '../models/User';
import Transaction from '../models/Transaction';

interface AuthRequest extends Request {
  userId?: string;
}

export const getAccount = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        dateOfBirth: user.dateOfBirth,
        address: user.address,
        city: user.city,
        state: user.state,
        zipCode: user.zipCode,
        accountNumber: user.accountNumber,
        accountType: user.accountType,
        balance: user.balance,
        status: user.status,
        kycVerified: user.kycVerified,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getBalance = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      success: true,
      balance: user.balance,
      currency: 'USD',
      accountNumber: user.accountNumber,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getTransactionHistory = async (req: AuthRequest, res: Response) => {
  try {
    const { limit = 50, skip = 0 } = req.query;

    const transactions = await Transaction.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip(Number(skip));

    const total = await Transaction.countDocuments({ userId: req.userId });

    res.json({
      success: true,
      transactions,
      total,
      limit: Number(limit),
      skip: Number(skip),
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const { firstName, lastName, phone, address, city, state, zipCode } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        firstName,
        lastName,
        phone,
        address,
        city,
        state,
        zipCode,
      },
      { new: true }
    ).select('-password');

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const verifyKYC = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      { kycVerified: true },
      { new: true }
    ).select('-password');

    res.json({
      success: true,
      message: 'KYC verified successfully',
      user,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
