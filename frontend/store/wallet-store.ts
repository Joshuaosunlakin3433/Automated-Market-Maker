"use client";

import { create } from "zustand";
import {
  connect,
  disconnect,
  getLocalStorage,
  isConnected,
  openContractCall,
} from "@stacks/connect";
import { STACKS_TESTNET } from "@stacks/network";
import { PostConditionMode } from "@stacks/transactions";
import {
  addLiquidity,
  createPool,
  mintTokens,
  Pool,
  removeLiquidity,
  swap,
} from "@/lib/amm";
import {
  showSuccessToast,
  showErrorToast,
  showMintSuccessToast,
  showPoolCreatedToast,
} from "@/lib/toast-helpers";

const appDetails = {
  name: "Full Range AMM",
  icon: "https://cryptologos.cc/logos/stacks-stx-logo.png",
};

// 1️⃣ DEFINE THE SHAPE (TypeScript Interface)
interface WalletState {
  // State values
  userData: any;
  isLoading: boolean;

  // Actions (functions that modify state)
  setUserData: (userData: any) => void;
  setIsLoading: (isLoading: boolean) => void;
  loadUserData: () => boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  handleMintTokens: (tokenContract: string, amount: number) => Promise<void>;
  handleCreatePool: (
    token0: string,
    token1: string,
    fee: number
  ) => Promise<void>;
  handleSwap: (
    pool: Pool,
    amount: number,
    zeroForOne: boolean
  ) => Promise<void>;
  handleAddLiquidity: (
    pool: Pool,
    amount0: number,
    amount1: number
  ) => Promise<void>;
  handleRemoveLiquidity: (pool: Pool, liquidity: number) => Promise<void>;
}

// 2️⃣ CREATE THE STORE
export const useWalletStore = create<WalletState>((set, get) => ({
  // Initial state
  userData: null,
  isLoading: false,

  // Simple setters
  setUserData: (userData) => set({ userData }),
  setIsLoading: (isLoading) => set({ isLoading }),

  // Load user data from localStorage
  loadUserData: () => {
    if (isConnected()) {
      const data = getLocalStorage();
      set({ userData: data });
      return true;
    }
    return false;
  },

  // Connect wallet
  connectWallet: async () => {
    const { loadUserData } = get();

    // If already connected, just load the data
    if (loadUserData()) {
      return;
    }

    // Otherwise, initiate connection
    try {
      await connect();
      // Brief delay to ensure local storage is updated
      setTimeout(loadUserData, 100);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  },

  // Disconnect wallet
  disconnectWallet: () => {
    disconnect();
    set({ userData: null });
  },

  // Mint tokens
  handleMintTokens: async (tokenContract: string, amount: number) => {
    const { userData } = get();
    set({ isLoading: true });

    try {
      if (!userData) throw new Error("User not connected");
      const userAddress = userData?.addresses?.stx[0]?.address;
      if (!userAddress) throw new Error("No address found");

      const options = await mintTokens(tokenContract, amount, userAddress);
      await openContractCall({
        ...options,
        appDetails,
        network: STACKS_TESTNET,
        onFinish: (data) => {
          showMintSuccessToast(data.txId, "Tokens minted! 🪙 ");
          console.log(data);
        },
        postConditionMode: PostConditionMode.Allow,
      });
    } catch (_err) {
      const err = _err as Error;
      showErrorToast(err.message);
    } finally {
      set({ isLoading: false });
    }
  },

  // Create pool
  handleCreatePool: async (token0: string, token1: string, fee: number) => {
    const { userData } = get();
    set({ isLoading: true });

    try {
      if (!userData) throw new Error("User not connected");
      const userAddress = userData?.addresses?.stx[0]?.address;
      if (!userAddress) throw new Error("No address found");

      const options = await createPool(token0, token1, fee);
      await openContractCall({
        ...options,
        appDetails,
        network: STACKS_TESTNET,
        onFinish: (data) => {
          showPoolCreatedToast(data.txId, "Pool Successfully created! 🎉");
          console.log(data);
        },
        postConditionMode: PostConditionMode.Allow,
      });
    } catch (_err) {
      const err = _err as Error;
      showErrorToast(err.message);
    } finally {
      set({ isLoading: false });
    }
  },

  // Swap tokens
  handleSwap: async (pool: Pool, amount: number, zeroForOne: boolean) => {
    const { userData } = get();
    if (!userData) return;

    set({ isLoading: true });

    try {
      if (!userData) throw new Error("User not connected");

      const options = await swap(pool, amount, zeroForOne);
      await openContractCall({
        ...options,
        appDetails,
        network: STACKS_TESTNET,
        onFinish: (data) => {
          console.log(data);
          showSuccessToast(data.txId, "Swap successful! 🎉");
        },
        postConditionMode: PostConditionMode.Allow,
      });
    } catch (_err) {
      const err = _err as Error;
      console.log(err);
      showErrorToast(err.message);
    } finally {
      set({ isLoading: false });
    }
  },

  // Add liquidity
  handleAddLiquidity: async (pool: Pool, amount0: number, amount1: number) => {
    const { userData } = get();
    set({ isLoading: true });

    try {
      if (!userData) throw new Error("User not connected");
      const options = await addLiquidity(pool, amount0, amount1);
      await openContractCall({
        ...options,
        appDetails,
        network: STACKS_TESTNET,
        onFinish: (data) => {
          showSuccessToast(data.txId, "Liquidity added! 💧");
          console.log({ data });
        },
        postConditionMode: PostConditionMode.Allow,
      });
    } catch (_err) {
      const err = _err as Error;
      showErrorToast(err.message);
    } finally {
      set({ isLoading: false });
    }
  },

  // Remove liquidity
  handleRemoveLiquidity: async (pool: Pool, liquidity: number) => {
    const { userData } = get();
    set({ isLoading: true });

    try {
      if (!userData) throw new Error("User not connected");
      const options = await removeLiquidity(pool, liquidity);
      await openContractCall({
        ...options,
        appDetails,
        network: STACKS_TESTNET,
        onFinish: (data) => {
          showSuccessToast(data.txId, "Liquidity removed ✅");
          console.log(data);
        },
        postConditionMode: PostConditionMode.Allow,
      });
    } catch (_err) {
      const err = _err as Error;
      showErrorToast(err.message);
    } finally {
      set({ isLoading: false });
    }
  },
}));
