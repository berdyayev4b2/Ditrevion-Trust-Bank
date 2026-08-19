import { Request, Response } from 'express';
import Crypto from '../models/Crypto';
import User from '../models/User';
import Transaction from '../models/Transaction';

interface AuthRequest extends Request {
  userId?: string;
}

// Mock crypto prices
const cryptoPrices: Record<string, number> = {
  BTC: 43500,
  ETH: 2300,
  XRP: 2.5,
  LTC: 95,
  ADA: 0.95,
};

export const getPrices = async (req: Request, res: Response) => {
  try {
    const prices = Object.entries(cryptoPrices).map(([symbol, price]) => ({
      symbol,
      price,
      change24h: (Math.random() * 10 - 5).toFixed(2),
      marketCap: (price * Math.random() * 1000000000).toFixed(0),
    }));

    res.json({ success: true, prices });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const buyCrypto = async (req: AuthRequest, res: Response) => {
  try {
    const { symbol, quantity } = req.body;

    if (!symbol || !quantity || quantity <= 0) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    const price = cryptoPrices[symbol];
    if (!price) {
      return res.status(400).json({ error: 'Cryptocurrency not found' });
    }

    const totalCost = price * quantity;

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.balance < totalCost) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    // Deduct from balance
    user.balance -= totalCost;
    await user.save();

    // Create crypto record
    const crypto = new Crypto({
      userId: req.userId,
      symbol,
      quantity,
      purchasePrice: price,
      currentPrice: price,
      totalValue: totalCost,
    });
    await crypto.save();

    // Create transaction
    const transactionId = `TXN${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
    await Transaction.create({
      userId: req.userId,
      type: 'crypto',
      amount: totalCost,
      currency: 'USD',
      status: 'completed',
      description: `Bought ${quantity} ${symbol}`,
      transactionId,
    });

    res.json({
      success: true,
      message: 'Crypto purchased successfully',
      crypto: {
        id: crypto._id,
        symbol,
        quantity,
        unitPrice: price,
        totalCost,
        timestamp: crypto.purchaseDate,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const sellCrypto = async (req: AuthRequest, res: Response) => {
  try {
    const { cryptoId, quantity } = req.body;

    const crypto = await Crypto.findById(cryptoId);
    if (!crypto) {
      return res.status(404).json({ error: 'Crypto not found' });
    }

    if (crypto.quantity < quantity) {
      return res.status(400).json({ error: 'Insufficient crypto balance' });
    }

    const currentPrice = cryptoPrices[crypto.symbol] || crypto.currentPrice;
    const totalProceeds = currentPrice * quantity;

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update crypto
    crypto.quantity -= quantity;
    if (crypto.quantity === 0) {
      await Crypto.deleteOne({ _id: cryptoId });
    } else {
      crypto.currentPrice = currentPrice;
      crypto.totalValue = crypto.quantity * currentPrice;
      await crypto.save();
    }

    // Add to balance
    user.balance += totalProceeds;
    await user.save();

    // Create transaction
    const transactionId = `TXN${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
    await Transaction.create({
      userId: req.userId,
      type: 'crypto',
      amount: totalProceeds,
      currency: 'USD',
      status: 'completed',
      description: `Sold ${quantity} ${crypto.symbol}`,
      transactionId,
    });

    res.json({
      success: true,
      message: 'Crypto sold successfully',
      proceeds: totalProceeds,
      newBalance: user.balance,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCryptoWallet = async (req: AuthRequest, res: Response) => {
  try {
    const cryptoHoldings = await Crypto.find({ userId: req.userId });

    const wallet = cryptoHoldings.map((holding) => ({
      id: holding._id,
      symbol: holding.symbol,
      quantity: holding.quantity,
      unitPrice: holding.currentPrice,
      totalValue: holding.quantity * holding.currentPrice,
      purchaseDate: holding.purchaseDate,
      gain: holding.quantity * holding.currentPrice - holding.totalValue,
    }));

    const totalValue = wallet.reduce((sum, item) => sum + item.totalValue, 0);

    res.json({
      success: true,
      wallet,
      totalValue,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
