"use client";

import { useStacks } from "@/hooks/use-stacks";
import { useState } from "react";

export function CreatePool() {
  const { handleCreatePool } = useStacks();
  const [token0, setToken0] = useState("");
  const [token1, setToken1] = useState("");
  const [fee, setFee] = useState(30);

  return (
    <div className="flex flex-col max-w-md w-full gap-4 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Pool</h1>
      <div className="flex flex-col gap-2">
        <span className="font-semibold text-gray-700 dark:text-gray-300">Token 0</span>
        <input
          type="text"
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
          placeholder="Token 0"
          value={token0}
          onChange={(e) => setToken0(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-semibold text-gray-700 dark:text-gray-300">Token 1</span>
        <input
          type="text"
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
          placeholder="Token 1"
          value={token1}
          onChange={(e) => setToken1(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-semibold text-gray-700 dark:text-gray-300">Fee (basis points)</span>
        <input
          type="number"
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
          placeholder="Fee"
          max={10_000}
          min={0}
          value={fee}
          onChange={(e) => setFee(parseInt(e.target.value))}
        />
        <span className="text-xs text-gray-500 dark:text-gray-400">Default: 30 (0.3%)</span>
      </div>

      <button
        onClick={() => handleCreatePool(token0, token1, fee)}
        className="w-full bg-linear-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
      >
        Create Pool
      </button>
    </div>
  );
}
