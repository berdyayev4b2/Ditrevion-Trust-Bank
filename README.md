# DITREVION Trust Bank - Full Stack Banking Application

## 🏦 Project Overview

DITREVION Trust Bank is a **comprehensive full-stack banking application demo** featuring realistic banking operations, cryptocurrency trading, loan management, and live customer support.

**⚠️ DISCLAIMER:** This is an educational/demo project with mock data and simulated transactions. Not for production use with real money.

## 🎯 Features

### Authentication & User Management
- ✅ User registration with verification
- ✅ Secure login/logout
- ✅ JWT token-based authentication
- ✅ Profile management
- ✅ KYC (Know Your Customer) information

### Banking Features
- ✅ Account dashboard with balance
- ✅ Money transfers between accounts
- ✅ Payment processing
- ✅ Transaction history
- ✅ Receipt generation & printing
- ✅ Account statements

### Cryptocurrency
- ✅ Mock crypto trading (Bitcoin, Ethereum, etc.)
- ✅ Real-time price simulation
- ✅ Buy & sell crypto
- ✅ Crypto wallet management
- ✅ Transaction history

### Loans
- ✅ Loan application form
- ✅ Real-time loan calculator
- ✅ EMI calculation
- ✅ Loan status tracking
- ✅ Repayment schedule

### Communications
- ✅ Live chat support with agents
- ✅ Email notifications
- ✅ SMS alerts
- ✅ Transaction notifications
- ✅ Security alerts

### Additional Features
- ✅ Responsive design (Mobile & Desktop)
- ✅ Dark/Light mode
- ✅ Multi-currency support
- ✅ Real-time updates (Socket.io)
- ✅ Comprehensive admin dashboard

## 🏗️ Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB (with Mongoose)
- **Authentication:** JWT (jsonwebtoken)
- **Real-time:** Socket.io
- **Email:** Nodemailer
- **Validation:** Joi

### Frontend
- **Framework:** React 18+
- **Meta-framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/ui
- **State Management:** Zustand
- **Real-time:** Socket.io Client
- **Charts:** Chart.js / Recharts
- **Icons:** Lucide React

### DevOps
- **Package Manager:** npm
- **Environment:** Development

## 📁 Project Structure

```
ditrevion-trust-bank/
├── server/                 # Backend
│   ├── src/
│   │   ├── config/        # Configuration files
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── controllers/   # Route handlers
│   │   ├── middleware/    # Express middleware
│   │   ├── services/      # Business logic
│   │   ├── utils/         # Utility functions
│   │   └── index.ts       # Entry point
│   ├── .env.example
│   └── package.json
├── client/                # Frontend
│   ├── src/
│   │   ├── app/          # Next.js app directory
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Pages
│   │   ├── hooks/        # Custom hooks
│   │   ├── store/        # Zustand stores
│   │   ├── types/        # TypeScript types
│   │   ├── utils/        # Utility functions
│   │   └── styles/       # Global styles
│   ├── public/           # Static assets
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- MongoDB (local or cloud)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/berdyayev4b2/ditrevion-trust-bank.git
cd ditrevion-trust-bank
```

2. **Install backend dependencies**
```bash
cd server
npm install
```

3. **Install frontend dependencies**
```bash
cd ../client
npm install
```

4. **Setup environment variables**

**Backend (.env):**
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/ditrevion-bank
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
SMTP_SERVICE=gmail
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_password
API_BASE_URL=http://localhost:5000
```

**Frontend (.env.local):**
```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

5. **Run the application**
```bash
npm run dev
```

Backend runs on `http://localhost:5000`
Frontend runs on `http://localhost:3000`

## 📚 API Documentation

### Authentication Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh JWT token

### Account Routes
- `GET /api/accounts/me` - Get user account
- `GET /api/accounts/balance` - Get account balance
- `GET /api/accounts/transactions` - Get transaction history
- `PUT /api/accounts/profile` - Update profile

### Transfer Routes
- `POST /api/transfers/send` - Send money
- `POST /api/transfers/request` - Request money
- `GET /api/transfers/history` - Transfer history

### Cryptocurrency Routes
- `GET /api/crypto/prices` - Get crypto prices
- `POST /api/crypto/buy` - Buy cryptocurrency
- `POST /api/crypto/sell` - Sell cryptocurrency
- `GET /api/crypto/wallet` - Get crypto wallet

### Loan Routes
- `POST /api/loans/apply` - Apply for loan
- `GET /api/loans/status` - Get loan status
- `GET /api/loans/calculate` - Loan EMI calculator
- `POST /api/loans/repay` - Make repayment

### Chat Routes
- `WS /socket.io` - WebSocket for live chat
- `POST /api/chat/send` - Send message
- `GET /api/chat/history` - Chat history

## 🎨 UI/UX Features

- **Responsive Design:** Works on mobile, tablet, and desktop
- **Dark Mode:** Toggle between light and dark themes
- **Real-time Updates:** Live notifications and transaction updates
- **Accessibility:** WCAG 2.1 compliant
- **Modern UI:** Clean, professional banking interface

## 🔐 Security Features

- JWT authentication
- Password hashing (bcrypt)
- Rate limiting
- Input validation & sanitization
- CORS protection
- SQL injection prevention
- XSS protection
- CSRF tokens

## 📱 Screenshots & Demo

### Dashboard
- Account overview
- Quick stats
- Recent transactions

### Money Transfer
- Recipient selection
- Amount input
- Confirmation screen
- Receipt generation

### Cryptocurrency Trading
- Market overview
- Buy/Sell interface
- Portfolio tracking
- Price charts

### Loans
- Application form
- EMI calculator
- Loan status dashboard
- Repayment schedule

### Live Chat
- Real-time messaging
- Agent assignment
- Chat history
- File sharing support

## 🧪 Testing

Demo Credentials:
```
Email: demo@ditrevion.com
Password: Demo123456!

Email: user@ditrevion.com
Password: User123456!
```

## 🤝 Contributing

Feel free to fork, modify, and contribute to this project.

## 📝 License

MIT License - See LICENSE file for details

## ⚠️ Important Notes

1. **Demo Only:** All transactions are simulated and no real money is involved
2. **Mock Data:** All financial data is generated for demonstration purposes
3. **Not for Production:** Do not use this for actual banking operations
4. **Educational Purpose:** Designed to learn full-stack development with banking features
5. **Compliance:** Real banking requires extensive regulatory compliance not included here

## 🆘 Support

For issues or questions, please create an issue on GitHub.

## 🚀 Future Enhancements

- [ ] Advanced analytics & reporting
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Advanced security features
- [ ] AI-powered fraud detection
- [ ] Investment portfolio management
- [ ] Bill payment integration
- [ ] Insurance products

---

**Built with ❤️ by berdyayev4b2**
