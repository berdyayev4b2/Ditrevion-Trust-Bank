import mongoose from 'mongoose';
import User from '../models/User';
import Crypto from '../models/Crypto';
import Loan from '../models/Loan';

export const seedDatabase = async () => {
  try {
    const existingUsers = await User.countDocuments();

    if (existingUsers > 0) {
      console.log('Database already seeded');
      return;
    }

    // Create demo users
    const users = await User.insertMany([
      {
        email: 'demo@ditrevion.com',
        password: 'Demo123456!',
        firstName: 'John',
        lastName: 'Doe',
        phone: '555-0001',
        dateOfBirth: new Date('1990-01-15'),
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA',
        accountNumber: `DTB${Date.now()}001`,
        accountType: 'checking',
        balance: 50000,
        status: 'active',
        kycVerified: true,
      },
      {
        email: 'user@ditrevion.com',
        password: 'User123456!',
        firstName: 'Jane',
        lastName: 'Smith',
        phone: '555-0002',
        dateOfBirth: new Date('1992-05-20'),
        address: '456 Oak Ave',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90001',
        country: 'USA',
        accountNumber: `DTB${Date.now()}002`,
        accountType: 'savings',
        balance: 75000,
        status: 'active',
        kycVerified: true,
      },
    ]);

    console.log(`✅ Seeded ${users.length} users`);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
};
