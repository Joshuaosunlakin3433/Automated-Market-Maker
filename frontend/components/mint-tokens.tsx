"use client";

import { useStacks } from "@/hooks/use-stacks";
import { useState } from "react";

const TOKEN_CONTRACTS = [
  "ST1XF7QZ52F6WYHKP9NKR869NNN3ZEY6SXHQ9E497.mock-token",
  "ST1XF7QZ52F6WYHKP9NKR869NNN3ZEY6SXHQ9E497.mock-token-2",
];

export function MintTokens() {
  const { handleMintTokens } = useStacks();
  const [selectedToken, setSelectedToken] = useState(TOKEN_CONTRACTS[0]);
  const [amount, setAmount] = useState(10000000); // 10 million by default

  return (
    <div className="flex flex-col max-w-md w-full gap-4 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mint Test Tokens</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Mint tokens to your wallet for testing the DEX
      </p>

      <div className="flex flex-col gap-2">
        <span className="font-semibold text-gray-700 dark:text-gray-300">Token</span>
        <select
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer"
          value={selectedToken}
          onChange={(e) => setSelectedToken(e.target.value)}
        >
          {TOKEN_CONTRACTS.map((contract) => (
            <option key={contract} value={contract}>
              {contract.split(".")[1]}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <span className="font-semibold text-gray-700 dark:text-gray-300">Amount</span>
        <input
          type="number"
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
        />
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Suggested: 10000000 (10 million)
        </span>
      </div>

      <button
        onClick={() => handleMintTokens(selectedToken, amount)}
        className="w-full bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
      >
        Mint Tokens
      </button>
    </div>
  );
}
