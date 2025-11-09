import { Pool } from "@/lib/amm";
import { abbreviateAddress } from "@/lib/stx-utils";
import Link from "next/link";

export interface PoolsListProps {
  pools: Pool[];
}

export function PoolsList({ pools }: PoolsListProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Desktop Table Header - Hidden on mobile */}
      <div className="hidden md:grid grid-cols-4 place-items-center w-full bg-linear-to-r from-blue-500 to-purple-600 rounded-xl p-4 font-semibold text-white shadow-lg">
        <span>ID</span>
        <span>Token Pair</span>
        <span>Fee</span>
        <span>Liquidity</span>
      </div>

      {/* Pool Items */}
      {pools.map((pool) => (
        <PoolListItem
          key={`pool-${pool["token-0"]}-${pool["token-1"]}`}
          pool={pool}
        />
      ))}
    </div>
  );
}

export function PoolListItem({ pool }: { pool: Pool }) {
  const token0Name = pool["token-0"].split(".")[1];
  const token1Name = pool["token-1"].split(".")[1];
  const feesInPercentage = pool.fee / 10_000;

  return (
    <>
      {/* Desktop View - Table Row */}
      <div className="hidden md:grid grid-cols-4 place-items-center w-full bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
        <span
          className="font-mono text-sm text-gray-700 dark:text-gray-300"
          title={pool.id}
        >
          {abbreviateAddress(pool.id)}
        </span>
        <div className="flex items-center gap-2 text-gray-900 dark:text-white font-medium">
          <Link
            href={`https://explorer.hiro.so/txid/${pool["token-0"]}?chain=testnet`}
            target="_blank"
            className="hover:text-blue-500 transition-colors"
          >
            {token0Name}
          </Link>
          <span className="text-gray-400">/</span>
          <Link
            href={`https://explorer.hiro.so/txid/${pool["token-1"]}?chain=testnet`}
            target="_blank"
            className="hover:text-blue-500 transition-colors"
          >
            {token1Name}
          </Link>
        </div>
        <span className="text-gray-700 dark:text-gray-300">
          {feesInPercentage}%
        </span>
        <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          {pool["balance-0"]} {token0Name} / {pool["balance-1"]} {token1Name}
        </div>
      </div>

      {/* Mobile View - Card Layout */}
      <div className="md:hidden bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700 space-y-3">
        {/* Pool ID */}
        <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
          <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            Pool ID
          </span>
          <span
            className="font-mono text-sm text-gray-900 dark:text-white"
            title={pool.id}
          >
            {abbreviateAddress(pool.id)}
          </span>
        </div>

        {/* Token Pair */}
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            Token Pair
          </span>
          <div className="flex items-center gap-2 text-gray-900 dark:text-white font-medium">
            <Link
              href={`https://explorer.hiro.so/txid/${pool["token-0"]}?chain=testnet`}
              target="_blank"
              className="hover:text-blue-500 transition-colors"
            >
              {token0Name}
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href={`https://explorer.hiro.so/txid/${pool["token-1"]}?chain=testnet`}
              target="_blank"
              className="hover:text-blue-500 transition-colors"
            >
              {token1Name}
            </Link>
          </div>
        </div>

        {/* Fee */}
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            Fee
          </span>
          <span className="text-gray-900 dark:text-white font-medium">
            {feesInPercentage}%
          </span>
        </div>

        {/* Liquidity */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
          <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            Liquidity
          </span>
          <div className="text-right text-sm text-gray-900 dark:text-white font-medium">
            <div>
              {pool["balance-0"]} {token0Name}
            </div>
            <div>
              {pool["balance-1"]} {token1Name}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
