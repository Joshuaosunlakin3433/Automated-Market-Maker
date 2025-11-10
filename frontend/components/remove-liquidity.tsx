"use client";

import { getUserLiquidity, Pool } from "@/lib/amm";
import { useWalletStore } from "@/store/wallet-store";
import { useEffect, useState } from "react";

export interface RemoveLiquidityProps {
  pools: Pool[];
}

export function RemoveLiquidity({ pools }: RemoveLiquidityProps) {
  // const { userData, handleRemoveLiquidity, isLoading } = useWalletStore();
  const userData = useWalletStore((state) => state.userData);
  const handleRemoveLiquidity = useWalletStore(
    (state) => state.handleRemoveLiquidity
  );
  const isLoading = useWalletStore((state) => state.isLoading);
  const [selectedPool, setSelectedPool] = useState<Pool>(pools[0]);
  const [liquidity, setLiquidity] = useState(0);
  const [userTotalLiquidity, setUserTotalLiquidity] = useState(0);

  async function fetchUserLiquidity() {
    const stxAddress = userData?.addresses?.stx[0].address;
    if (!stxAddress) return;

    getUserLiquidity(selectedPool, stxAddress).then((liquidity) => {
      setUserTotalLiquidity(liquidity);
    });
  }

  useEffect(() => {
    fetchUserLiquidity();
  }, [selectedPool, userData]);

  return (
    <div className="flex flex-col max-w-md w-full gap-4 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Remove Liquidity
      </h1>
      <div className="flex flex-col gap-2">
        <span className="font-semibold text-gray-700 dark:text-gray-300">
          Pool ID
        </span>
        <select
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer"
          onChange={(e) => {
            const poolId = e.target.value;
            setSelectedPool(pools.find((pool) => pool.id === poolId)!);
          }}
        >
          {pools.map((pool) => (
            <option key={pool.id} value={pool.id}>
              {pool.id}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            Liquidity
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Max: {userTotalLiquidity}
          </span>
        </div>
        <input
          type="number"
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
          value={liquidity}
          onChange={(e) => setLiquidity(parseInt(e.target.value) || 0)}
        />
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Withdraw {selectedPool["token-0"].split(".")[1]}:
          </span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {selectedPool.liquidity > 0
              ? (
                  (liquidity / selectedPool.liquidity) *
                  selectedPool["balance-0"]
                ).toFixed(2)
              : 0}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Withdraw {selectedPool["token-1"].split(".")[1]}:
          </span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {selectedPool.liquidity > 0
              ? (
                  (liquidity / selectedPool.liquidity) *
                  selectedPool["balance-1"]
                ).toFixed(2)
              : 0}
          </span>
        </div>
      </div>

      <button
        className="w-full bg-linear-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-xl disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
        disabled={liquidity > userTotalLiquidity || isLoading}
        onClick={() => handleRemoveLiquidity(selectedPool, liquidity)}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Processing...
          </span>
        ) : (
          "Remove Liquidity"
        )}
      </button>
    </div>
  );
}
