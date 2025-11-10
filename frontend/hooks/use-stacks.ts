"use client";

import {
  addLiquidity,
  createPool,
  mintTokens,
  Pool,
  removeLiquidity,
  swap,
} from "@/lib/amm";
import {
  connect,
  disconnect,
  getLocalStorage,
  isConnected,
  openContractCall,
} from "@stacks/connect";
import { STACKS_TESTNET } from "@stacks/network";
import { PostConditionMode } from "@stacks/transactions";
import { useEffect, useState } from "react";
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

export function useStacks() {
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Single source of truth for loading data
  const loadUserData = () => {
    if (isConnected()) {
      const data = getLocalStorage();
      setUserData(data);
      return true;
    }
    return false;
  };

  async function connectWallet() {
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
  }

  function disconnectWallet() {
    disconnect();
    setUserData(null);
  }

  async function handleMintTokens(tokenContract: string, amount: number) {
    setIsLoading(true);
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
      setIsLoading(false);
    }
  }

  async function handleCreatePool(token0: string, token1: string, fee: number) {
    setIsLoading(true);
    try {
      if (!userData) throw new Error("User not connected");
      const userAddress = userData?.addresses?.stx[0]?.address;
      if (!userAddress) throw new Error("No address found");

      const options = await createPool(token0, token1, fee);
      await openContractCall({
        ...options,
        appDetails,
        network: STACKS_TESTNET, // Explicitly set testnet
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
      setIsLoading(false);
    }
  }

  async function handleSwap(pool: Pool, amount: number, zeroForOne: boolean) {
    if (!userData) return;

    setIsLoading(true);

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
      setIsLoading(false);
    }
  }

  async function handleAddLiquidity(
    pool: Pool,
    amount0: number,
    amount1: number
  ) {
    setIsLoading(true);
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
      setIsLoading(false);
    }
  }

  async function handleRemoveLiquidity(pool: Pool, liquidity: number) {
    setIsLoading(true);
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
      setIsLoading(false);
    }
  }

  // Restore session on mount
  useEffect(() => {
    loadUserData();
  }, []);

  // Debug logging
  useEffect(() => {
    if (userData) {
      console.log("🔍 FULL userData:", userData);
      console.log(
        "📍 Address from userData:",
        userData?.addresses?.stx[0]?.address
      );
    }
  }, [userData]);

  return {
    userData,
    isLoading,
    handleCreatePool,
    handleSwap,
    handleAddLiquidity,
    handleRemoveLiquidity,
    handleMintTokens,
    connectWallet,
    disconnectWallet,
  };
}
