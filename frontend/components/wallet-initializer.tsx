"use client";

import { useEffect } from "react";
import { useWalletStore } from "@/store/wallet-store";

/**
 * This component initializes the wallet store on mount
 * It checks if user was previously connected and restores session
 */
export function WalletInitializer() {
  const loadUserData = useWalletStore((state) => state.loadUserData);

  useEffect(() => {
    // Restore session on mount
    loadUserData();
  }, [loadUserData]);

  // This component doesn't render anything
  return null;
}
