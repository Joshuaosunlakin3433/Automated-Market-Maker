import { Swap } from "@/components/swap";
import { getAllPools } from "@/lib/amm";

export const dynamic = "force-dynamic";

export default async function Home() {
  const allPools = await getAllPools();

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-4 sm:p-8 md:p-16 lg:p-24">
      {allPools.length > 0 ? (
        <Swap pools={allPools} />
      ) : (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-8 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            No pools found. Create a pool first!
          </p>
        </div>
      )}
    </main>
  );
}
