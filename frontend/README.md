# 🏦 Stacks AMM - Decentralized Exchange

A full-featured Automated Market Maker (AMM) decentralized exchange built on the Stacks blockchain. Trade tokens, provide liquidity, and earn fees through a modern, responsive interface.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

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

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- [Leather Wallet](https://leather.io/) or [Hiro Wallet](https://wallet.hiro.so/) browser extension
- STX testnet tokens (get from [Stacks Testnet Faucet](https://explorer.hiro.so/sandbox/faucet))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Joshuaosunlakin3433/Automated-Market-Maker.git
   cd Automated-Market-Maker/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Configuration

Update the contract addresses in `lib/amm.ts` with your deployed contracts:

```typescript
const AMM_CONTRACT_ADDRESS = "YOUR_ADDRESS_HERE";
const AMM_CONTRACT_NAME = "amm";
```

## 📖 How to Use

### 1️⃣ Connect Your Wallet
Click "Connect Wallet" in the navigation bar and approve the connection in your Stacks wallet.

### 2️⃣ Mint Test Tokens
1. Navigate to the "Pools" tab
2. Select a token contract
3. Enter the amount to mint (default: 10,000,000)
4. Click "Mint Tokens" and confirm in your wallet

### 3️⃣ Create a Liquidity Pool
1. Go to "Pools" → "Pool Management"
2. Enter Token 0 and Token 1 contract addresses
3. Set the fee tier (default: 30 basis points = 0.3%)
4. Click "Create Pool" and confirm

### 4️⃣ Swap Tokens
1. On the home page, select tokens to swap
2. Enter the amount
3. Review the estimated output
4. Click "Swap" and confirm the transaction

### 5️⃣ Add Liquidity
1. Navigate to "Pools" tab
2. Select a pool
3. Enter amounts for both tokens
4. Click "Add Liquidity" and confirm

## 🏗️ Project Structure

```
frontend/
├── app/
│   ├── layout.tsx          # Root layout with Toaster and WalletInitializer
│   ├── page.tsx            # Home page with Swap component
│   ├── loading.tsx         # Home page loading skeleton
│   └── pools/
│       ├── page.tsx        # Pools management page
│       └── loading.tsx     # Pools page loading skeleton
├── components/
│   ├── navbar.tsx          # Navigation with wallet connection
│   ├── swap.tsx            # Token swap interface
│   ├── create-pool.tsx     # Pool creation form
│   ├── add-liquidity.tsx   # Add liquidity form
│   ├── remove-liquidity.tsx # Remove liquidity form
│   ├── mint-tokens.tsx     # Token minting interface
│   ├── pools.tsx           # Pools list display
│   └── wallet-initializer.tsx # Wallet session restoration
├── store/
│   └── wallet-store.ts     # Zustand global state store
├── hooks/
│   └── use-stacks.ts       # (Legacy - replaced by Zustand store)
├── lib/
│   ├── amm.ts              # AMM logic and blockchain interactions
│   ├── stx-utils.ts        # Utility functions for Stacks
│   └── toast-helpers.tsx   # Toast notification helpers
└── public/                 # Static assets
```

## 🛠️ Tech Stack

### Frontend
- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling
- **[Zustand](https://zustand-demo.pmnd.rs/)** - State management
- **[React Hot Toast](https://react-hot-toast.com/)** - Toast notifications

### Blockchain
- **[Stacks.js](https://github.com/hirosystems/stacks.js)** - Stacks blockchain SDK
- **[Clarity](https://clarity-lang.org/)** - Smart contract language
- **Stacks Testnet** - Test network for development

## 📚 Key Learning Concepts

This project demonstrates:

### State Management
- **React useState** → Migrated to **Zustand** for global state
- Optimized selectors: `const value = useStore((state) => state.value)`
- Centralized state for wallet, loading, and transaction data

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
- Clickable transaction notifications with Explorer links
- Responsive design with mobile-first approach

### TypeScript
- Interface definitions for type safety
- Generic types for reusable components
- Type inference with Zustand

## 🚧 Future Enhancements

Potential features to add:
- [ ] Transaction history with localStorage
- [ ] Price charts and analytics
- [ ] Slippage tolerance settings
- [ ] Multi-hop swaps
- [ ] Pool statistics (TVL, volume, APY)
- [ ] Wallet balance display
- [ ] Favorites/watchlist
- [ ] Advanced routing algorithms

## 📝 Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- **Live Demo**: [Coming Soon]
- **GitHub**: [https://github.com/Joshuaosunlakin3433/Automated-Market-Maker](https://github.com/Joshuaosunlakin3433/Automated-Market-Maker)
- **Stacks Explorer**: [https://explorer.hiro.so/?chain=testnet](https://explorer.hiro.so/?chain=testnet)

## 👨‍💻 Author

**Joshua Osunlakin**
- GitHub: [@Joshuaosunlakin3433](https://github.com/Joshuaosunlakin3433)

---

Built with ❤️ using Next.js and Stacks blockchain
