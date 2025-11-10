export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col gap-8 p-4 sm:p-8 md:p-16 lg:p-24">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-10 w-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
      </div>

      {/* Pools list skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg animate-pulse"
          ></div>
        ))}
      </div>

      <hr className="border-gray-300 dark:border-gray-700" />

      {/* Management section skeleton */}
      <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="h-96 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg animate-pulse"
          ></div>
        ))}
      </div>
    </main>
  );
}
