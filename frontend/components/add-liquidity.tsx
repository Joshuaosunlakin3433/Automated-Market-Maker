"use client";

import { useStacks } from "@/hooks/use-stacks";
import { Pool } from "@/lib/amm";
import { useState } from "react";

export interface AddLiquidityProps {
  pools: Pool[];
}

export function AddLiquidity({ pools }: AddLiquidityProps) {
  const [selectedPool, setSelectedPool] = useState<Pool>(pools[0]);
  const [amount0, setAmount0] = useState<number>(0);
  const [amount1, setAmount1] = useState<number>(0);
  const { handleAddLiquidity } = useStacks();

  return (
    <div className="flex flex-col max-w-md w-full gap-4 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Add Liquidity
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
        <span className="font-semibold text-gray-700 dark:text-gray-300">
          Token 0 ({selectedPool["token-0"].split(".")[1]}) Amount
        </span>
        <input
          type="number"
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
          placeholder="Token 0"
          value={amount0}
          onChange={(e) => setAmount0(parseInt(e.target.value) || 0)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-semibold text-gray-700 dark:text-gray-300">
          Token 1 ({selectedPool["token-1"].split(".")[1]}) Amount
        </span>
        <input
          type="number"
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
          placeholder="Token 1"
          value={amount1}
          onChange={(e) => setAmount1(parseInt(e.target.value) || 0)}
        />
      </div>

      <button
        onClick={() => handleAddLiquidity(selectedPool, amount0, amount1)}
        className="w-full bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
      >
        Add Liquidity
      </button>
    </div>
  );
}
