import { AddLiquidity } from "@/components/add-liquidity";
import { CreatePool } from "@/components/create-pool";
import { MintTokens } from "@/components/mint-tokens";
import { PoolsList } from "@/components/pools";
import { RemoveLiquidity } from "@/components/remove-liquidity";
import { getAllPools } from "@/lib/amm";

export default async function Pools() {
  const allPools = await getAllPools();

  return (
    <main className="flex min-h-screen flex-col gap-8 p-4 sm:p-8 md:p-18 lg:p-24">
      <h1 className="text-3xl font-bold">Pools</h1>
      <PoolsList pools={allPools} />
      <hr />
      <div className="flex justify-center gap-8 flex-wrap">
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
