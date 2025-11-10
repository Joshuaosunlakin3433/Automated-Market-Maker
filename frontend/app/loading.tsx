export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-4 sm:p-8 md:p-16 lg:p-24">
      {/* Swap component skeleton */}
      <div className="flex flex-col max-w-md w-full gap-4 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg animate-pulse">
        {/* Title skeleton */}
        <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>

        {/* Token selector skeletons */}
        <div className="h-16 bg-gray-100 dark:bg-gray-750 rounded-xl"></div>
        <div className="h-16 bg-gray-100 dark:bg-gray-750 rounded-xl"></div>

        {/* Swap button skeleton */}
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>

        {/* Info box skeleton */}
        <div className="h-24 bg-blue-50 dark:bg-blue-900/20 rounded-xl"></div>
      </div>
    </main>
  );
}
