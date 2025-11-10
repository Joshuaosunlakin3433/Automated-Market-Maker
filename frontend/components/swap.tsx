"use client";

import { Pool } from "@/lib/amm";
import { useWalletStore } from "@/store/wallet-store";
import { useEffect, useMemo, useState } from "react";

export interface SwapProps {
  pools: Pool[];
}

export function Swap({ pools }: SwapProps) {
  // const { handleSwap, isLoading } = useWalletStore();
  const handleSwap = useWalletStore((state) => state.handleSwap);
  const isLoading = useWalletStore((state) => state.isLoading);
  const [fromToken, setFromToken] = useState<string>(pools[0]["token-0"]);
  const [toToken, setToToken] = useState<string>(pools[0]["token-1"]);
  const [fromAmount, setFromAmount] = useState<number>(0);
  const [estimatedToAmount, setEstimatedToAmount] = useState<bigint>(BigInt(0));

  const uniqueTokens = pools.reduce((acc, pool) => {
    const token0 = pool["token-0"];
    const token1 = pool["token-1"];

    if (!acc.includes(token0)) {
      acc.push(token0);
    }

    if (!acc.includes(token1)) {
      acc.push(token1);
    }

    return acc;
  }, [] as string[]);

  const toTokensList = useMemo(() => {
    const poolsWithFromToken = pools.filter(
      (pool) => pool["token-0"] === fromToken || pool["token-1"] === fromToken
    );
    const tokensFromPools = poolsWithFromToken.reduce((acc, pool) => {
      const token0 = pool["token-0"];
      const token1 = pool["token-1"];

      if (!acc.includes(token0) && token0 !== fromToken) {
        acc.push(token0);
      }

      if (!acc.includes(token1) && token1 !== fromToken) {
        acc.push(token1);
      }

      return acc;
    }, [] as string[]);

    return tokensFromPools;
  }, [fromToken]);

  function estimateSwapOutput() {
    const pool = pools.find(
      (p) =>
        (p["token-0"] === fromToken && p["token-1"] === toToken) ||
        (p["token-0"] === toToken && p["token-1"] === fromToken)
    );
    if (!pool) return;

    if (fromAmount === 0) return;

    const x = BigInt(pool["balance-0"]);
    const y = BigInt(pool["balance-1"]);
    const k = x * y;
    const feesFloat = pool.fee / 10_000;

    if (fromToken === pool["token-0"]) {
      const deltaX = BigInt(fromAmount);
      // (x+dx) * (y-dy) = k
      // y-dy = k/(x+dx)
      // dy = y - (k/(x+dx))
      const xPlusDeltaX = x + deltaX;
      const yMinusDeltaY = k / xPlusDeltaX;
      const deltaY = y - yMinusDeltaY;
      const deltaYMinusFees =
        deltaY - BigInt(Math.ceil(Number(deltaY) * feesFloat));
      setEstimatedToAmount(deltaYMinusFees);
    } else {
      // (x-dx) * (y+dy) = k
      // x-dx = k/(y+dy)
      // dx = x - (k/(y+dy))
      const deltaY = BigInt(fromAmount);
      const yPlusDeltaY = y + deltaY;
      const xMinusDeltaX = k / yPlusDeltaY;
      const deltaX = x - xMinusDeltaX;
      const deltaXMinusFees =
        deltaX - BigInt(Math.ceil(Number(deltaX) * feesFloat));
      setEstimatedToAmount(deltaXMinusFees);
    }
  }

  useEffect(() => {
    estimateSwapOutput();
  }, [fromToken, toToken, fromAmount]);

  // Auto-update toToken when fromToken changes
  useEffect(() => {
    if (toTokensList.length > 0 && !toTokensList.includes(toToken)) {
      setToToken(toTokensList[0]);
    }
  }, [toTokensList, toToken]);

  return (
    <div className="flex flex-col max-w-xl w-full gap-4 p-6 bg-white/95 backdrop-blur border border-white/20 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
      <h1 className="text-2xl font-bold text-gray-900">Swap Tokens</h1>

      <div className="flex flex-col gap-2">
        <span className="font-semibold text-gray-700">From</span>
        <select
          className="w-full border-2 border-gray-300 bg-white text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer hover:border-blue-400 font-medium"
          value={fromToken}
          onChange={(e) => setFromToken(e.target.value)}
        >
          {uniqueTokens.map((token) => (
            <option key={token} value={token}>
              {token.split(".")[1]}
            </option>
          ))}
        </select>
        <input
          type="number"
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
          placeholder="Amount"
          value={fromAmount}
          onChange={(e) => setFromAmount(parseInt(e.target.value) || 0)}
        />
      </div>

      {/* Swap Direction Arrow */}
      <div className="flex justify-center">
        <div className="bg-linear-to-br from-blue-100 to-purple-100 rounded-full p-3 shadow-md">
          <svg
            className="w-6 h-6 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="font-semibold text-gray-700">To</span>
        <select
          className="w-full border-2 border-gray-300 bg-white text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer hover:border-blue-400 font-medium"
          value={toToken}
          onChange={(e) => setToToken(e.target.value)}
        >
          {toTokensList.map((token) => (
            <option key={token} value={token}>
              {token.split(".")[1]}
            </option>
          ))}
        </select>
      </div>

      {/* Estimated Output Display */}
      <div className="bg-linear-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-gray-600">
            Estimated Output:
          </span>
          <span className="text-lg font-bold text-blue-600">
            {estimatedToAmount.toString()}
          </span>
        </div>
      </div>

      <button
        className="w-full bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
        disabled={
          estimatedToAmount <= BigInt(0) || fromAmount === 0 || isLoading
        }
        onClick={() => {
          const pool = pools.find(
            (p) =>
              (p["token-0"] === fromToken && p["token-1"] === toToken) ||
              (p["token-0"] === toToken && p["token-1"] === fromToken)
          );
          if (!pool) return;

          const zeroForOne = fromToken === pool["token-0"];
          handleSwap(pool, fromAmount, zeroForOne);
        }}
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
          "Swap"
        )}
      </button>
    </div>
  );
}
