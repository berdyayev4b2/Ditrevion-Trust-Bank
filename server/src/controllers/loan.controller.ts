import { Request, Response } from 'express';
import Loan from '../models/Loan';
import User from '../models/User';
import Transaction from '../models/Transaction';

interface AuthRequest extends Request {
  userId?: string;
}

// EMI Calculator
const calculateEMI = (principal: number, rate: number, months: number): number => {
  const monthlyRate = rate / 12 / 100;
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);
  return Math.round(emi * 100) / 100;
};

export const applyLoan = async (req: AuthRequest, res: Response) => {
  try {
    const { amount, interestRate, duration, purpose } = req.body;

    if (!amount || !interestRate || !duration || !purpose) {
      return res.status(400).json({ error: 'All fields required' });
    }

    // Calculate EMI
    const monthlyEMI = calculateEMI(amount, interestRate, duration);
    const totalAmount = monthlyEMI * duration;

    const loan = new Loan({
      userId: req.userId,
      amount,
      currency: 'USD',
      interestRate,
      duration,
      purpose,
      monthlyEMI,
      totalAmount,
      remainingAmount: totalAmount,
      status: 'pending',
    });

    await loan.save();

    res.status(201).json({
      success: true,
      message: 'Loan application submitted',
      loan: {
        id: loan._id,
        amount,
        interestRate,
        duration,
        monthlyEMI,
        totalAmount,
        status: 'pending',
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getLoanStatus = async (req: AuthRequest, res: Response) => {
  try {
    const loans = await Loan.find({ userId: req.userId });

    res.json({
      success: true,
      loans: loans.map((loan) => ({
        id: loan._id,
        amount: loan.amount,
        interestRate: loan.interestRate,
        duration: loan.duration,
        monthlyEMI: loan.monthlyEMI,
        totalAmount: loan.totalAmount,
        paidAmount: loan.paidAmount,
        remainingAmount: loan.remainingAmount,
        status: loan.status,
        purpose: loan.purpose,
        createdAt: loan.createdAt,
        approvedAt: loan.approvedAt,
      })),
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const calculateLoanEMI = async (req: Request, res: Response) => {
  try {
    const { amount, interestRate, duration } = req.query;

    if (!amount || !interestRate || !duration) {
      return res.status(400).json({ error: 'Amount, interest rate, and duration required' });
    }

    const monthlyEMI = calculateEMI(
      Number(amount),
      Number(interestRate),
      Number(duration)
    );
    const totalAmount = monthlyEMI * Number(duration);
    const totalInterest = totalAmount - Number(amount);

    res.json({
      success: true,
      calculation: {
        principal: Number(amount),
        interestRate: Number(interestRate),
        durationMonths: Number(duration),
        monthlyEMI,
        totalAmount,
        totalInterest,
        breakdown: Array.from({ length: Math.min(Number(duration), 12) }, (_, i) => ({
          month: i + 1,
          emi: monthlyEMI,
          principalComponent: (Number(amount) / Number(duration)).toFixed(2),
          interestComponent: (monthlyEMI - Number(amount) / Number(duration)).toFixed(2),
        })),
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const repayLoan = async (req: AuthRequest, res: Response) => {
  try {
    const { loanId, amount } = req.body;

    const loan = await Loan.findById(loanId);
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }

    if (loan.userId !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const user = await User.findById(req.userId);
    if (!user || user.balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    // Deduct from balance
    user.balance -= amount;
    await user.save();

    // Update loan
    loan.paidAmount += amount;
    loan.remainingAmount = Math.max(0, loan.remainingAmount - amount);
    if (loan.remainingAmount === 0) {
      loan.status = 'completed';
    }
    await loan.save();

    // Create transaction
    const transactionId = `TXN${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
    await Transaction.create({
      userId: req.userId,
      type: 'loan',
      amount,
      currency: 'USD',
      status: 'completed',
      description: `Loan repayment for ${loan.purpose}`,
      transactionId,
    });

    res.json({
      success: true,
      message: 'Loan repayment successful',
      loan: {
        id: loan._id,
        paidAmount: loan.paidAmount,
        remainingAmount: loan.remainingAmount,
        status: loan.status,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
