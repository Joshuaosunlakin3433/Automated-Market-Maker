import { AddLiquidity } from "@/components/add-liquidity";
import { CreatePool } from "@/components/create-pool";
import { MintTokens } from "@/components/mint-tokens";
import { PoolsList } from "@/components/pools";
import { RemoveLiquidity } from "@/components/remove-liquidity";
import { getAllPools } from "@/lib/amm";

export default async function Pools() {
  const allPools = await getAllPools();

  return (
    <main className="flex min-h-screen flex-col gap-8 p-4 sm:p-8 md:p-16 lg:p-24">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Liquidity Pools</h1>
      </div>
      
      <PoolsList pools={allPools} />
      
      <hr className="border-gray-300 dark:border-gray-700" />
      
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Pool Management</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <MintTokens />
        <CreatePool />
        {allPools.length > 0 ? (
          <>
            <AddLiquidity pools={allPools} />
            <RemoveLiquidity pools={allPools} />
          </>
        ) : null}
      </div>
    </main>
  );
}
