# 🏦 Stacks AMM - Decentralized Exchange

A full-featured Automated Market Maker (AMM) decentralized exchange built on the Stacks blockchain. Trade tokens, provide liquidity, and earn fees through a modern, responsive interface.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Clarity](https://img.shields.io/badge/Clarity-Smart_Contracts-purple)

## ✨ Features

### 🔄 Core DEX Functionality

- **Token Swapping** - Swap between any tokens in available pools with real-time price estimation
- **Liquidity Pools** - Create and manage liquidity pools with custom fee tiers
- **Add/Remove Liquidity** - Provide liquidity to earn trading fees
- **Token Minting** - Mint test tokens for development and testing

### 🎨 Modern UX/UI

- **Loading States** - Smooth loading indicators on all transactions
- **Toast Notifications** - Real-time transaction feedback with clickable Explorer links
- **Skeleton Screens** - Professional loading skeletons during data fetching
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Dark Mode** - Full dark mode support with smooth transitions

### 🛠️ Technical Features

- **Zustand State Management** - Global state management with optimized selectors
- **TypeScript** - Full type safety across the entire application
- **Next.js 16** - Latest Next.js with App Router and React Server Components
- **Stacks Integration** - Direct integration with Stacks blockchain via Stacks.js
- **Clarity Smart Contracts** - Secure, auditable smart contracts for AMM logic

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** and npm
- **[Leather Wallet](https://leather.io/)** or **[Hiro Wallet](https://wallet.hiro.so/)** browser extension
- **STX testnet tokens** from [Stacks Testnet Faucet](https://explorer.hiro.so/sandbox/faucet)

### Installation

```bash
# Clone the repository
git clone https://github.com/Joshuaosunlakin3433/Automated-Market-Maker.git
cd Automated-Market-Maker

# Install frontend dependencies
cd frontend
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app!

### Configuration

Update contract addresses in `frontend/lib/amm.ts`:

```typescript
const AMM_CONTRACT_ADDRESS = "YOUR_ADDRESS_HERE";
const AMM_CONTRACT_NAME = "amm";
```

## 📖 How to Use

### 1️⃣ Connect Your Wallet

Click **"Connect Wallet"** in the navigation bar and approve the connection.

### 2️⃣ Mint Test Tokens

1. Navigate to **"Pools"** tab
2. Select a token contract
3. Enter amount (default: 10,000,000)
4. Click **"Mint Tokens"** and confirm

### 3️⃣ Create a Liquidity Pool

1. Go to **"Pools"** → **"Pool Management"**
2. Enter Token 0 and Token 1 addresses
3. Set fee tier (default: 30 basis points = 0.3%)
4. Click **"Create Pool"** and confirm

### 4️⃣ Swap Tokens

1. Select tokens to swap on home page
2. Enter amount
3. Review estimated output
4. Click **"Swap"** and confirm

### 5️⃣ Add Liquidity

1. Navigate to **"Pools"** tab
2. Select a pool
3. Enter amounts for both tokens
4. Click **"Add Liquidity"** and confirm

## 🏗️ Project Structure

```
amm/
├── contracts/              # Clarity smart contracts
│   ├── amm.clar           # Main AMM contract
│   └── mock-token.clar    # Test token contracts
├── tests/                 # Contract tests
│   └── amm.test.ts
├── frontend/              # Next.js frontend application
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   ├── store/           # Zustand state management
│   ├── lib/             # Utility functions and blockchain logic
│   └── hooks/           # Custom React hooks
└── settings/            # Clarinet configuration
```

## 🛠️ Tech Stack

### Frontend

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling
- **[Zustand](https://zustand-demo.pmnd.rs/)** - State management
- **[React Hot Toast](https://react-hot-toast.com/)** - Notifications

### Blockchain

- **[Clarity](https://clarity-lang.org/)** - Smart contract language
- **[Stacks.js](https://github.com/hirosystems/stacks.js)** - Stacks blockchain SDK
- **[Clarinet](https://github.com/hirosystems/clarinet)** - Smart contract development tool
- **Stacks Testnet** - Test network for development

### Smart Contracts

- **AMM Contract** (`amm.clar`)

  - Pool creation with custom fees
  - Token swapping with automated pricing
  - Liquidity provision and removal
  - Event logging for pool activities

- **Mock Token Contracts** (`mock-token.clar`)
  - SIP-010 fungible token standard
  - Minting functionality for testing
  - Transfer and balance operations

## 📚 Key Learning Concepts

### State Management

- Migrated from React `useState` to **Zustand** for global state
- Optimized selectors: `const value = useStore((state) => state.value)`
- Centralized state for wallet, loading, and transactions

### Async Patterns

- Loading states with `finally` blocks for cleanup
- Error handling with try/catch
- Toast notifications on transaction completion

### Next.js Features

- App Router with server components
- Automatic `loading.tsx` for skeleton screens
- File-based routing

### UX Patterns

- Skeleton screens during data fetching
- Loading spinners on buttons
- Clickable transaction notifications
- Mobile-first responsive design

### Blockchain Integration

- Stacks wallet connection
- Contract call execution
- Post-conditions for security
- Transaction monitoring

## 🧪 Testing

### Smart Contracts

```bash
# Run contract tests with Clarinet
clarinet test

# Check contracts for errors
clarinet check
```

### Frontend

```bash
cd frontend
npm run lint        # Run ESLint
npm run build       # Test production build
```

## 🚧 Future Enhancements

Potential features to add:

- [ ] Transaction history with localStorage
- [ ] Price charts and analytics
- [ ] Slippage tolerance settings
- [ ] Multi-hop swaps (route through multiple pools)
- [ ] Pool statistics (TVL, volume, APY)
- [ ] Wallet balance display
- [ ] Favorites/watchlist
- [ ] Advanced routing algorithms
- [ ] Limit orders
- [ ] Liquidity mining rewards

## 📝 Available Scripts

```bash
# Frontend
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Smart Contracts
clarinet test        # Run contract tests
clarinet check       # Check contract syntax
clarinet console     # Interactive contract console
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- **Live Demo**: [Coming Soon]
- **GitHub**: [https://github.com/Joshuaosunlakin3433/Automated-Market-Maker](https://github.com/Joshuaosunlakin3433/Automated-Market-Maker)
- **Stacks Explorer**: [https://explorer.hiro.so/?chain=testnet](https://explorer.hiro.so/?chain=testnet)
- **Stacks Documentation**: [https://docs.stacks.co/](https://docs.stacks.co/)
- **Clarity Documentation**: [https://docs.stacks.co/clarity](https://docs.stacks.co/clarity)

## 👨‍💻 Author

**Joshua Osunlakin**

- GitHub: [@Joshuaosunlakin3433](https://github.com/Joshuaosunlakin3433)

## 🙏 Acknowledgments

- Built during Stacks Internship program
- Inspired by Uniswap V2 AMM design
- Thanks to the Stacks and Clarity communities

---

**Built with ❤️ using Next.js, React, and Stacks blockchain**

⭐ Star this repo if you found it helpful!
