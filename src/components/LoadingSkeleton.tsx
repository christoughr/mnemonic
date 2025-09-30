'use client';

export function SearchSkeleton() {
  return (
    <div className="space-y-4 sm:space-y-6 animate-pulse">
      {/* Search Form Skeleton */}
      <div className="space-y-3 sm:space-y-4">
        <div className="relative">
          <div className="w-full h-12 sm:h-14 bg-gray-200 rounded-lg"></div>
          <div className="absolute right-2 top-2 bottom-2 w-16 sm:w-20 bg-gray-300 rounded-md"></div>
        </div>
      </div>

      {/* Results Skeleton */}
      <div className="space-y-4 sm:space-y-6">
        {/* Answer Skeleton */}
        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
          <div className="h-6 bg-gray-200 rounded w-20 mb-3 sm:mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>

        {/* Expert Skeleton */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6">
          <div className="h-5 bg-blue-200 rounded w-24 mb-2"></div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <div className="space-y-1">
              <div className="h-4 bg-blue-200 rounded w-32"></div>
              <div className="h-3 bg-blue-200 rounded w-20"></div>
            </div>
            <div className="h-8 bg-blue-200 rounded w-24"></div>
          </div>
        </div>

        {/* Sources Skeleton */}
        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
          <div className="h-5 bg-gray-200 rounded w-16 mb-3 sm:mb-4"></div>
          <div className="space-y-3 sm:space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-l-4 border-gray-200 pl-3 sm:pl-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 space-y-1 sm:space-y-0">
                  <div className="h-3 bg-gray-200 rounded w-32"></div>
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                </div>
                <div className="space-y-1">
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="space-y-4 sm:space-y-6 animate-pulse">
      <div className="text-center">
        <div className="h-6 bg-gray-200 rounded w-48 mx-auto mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-64 mx-auto"></div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-20"></div>
                <div className="h-8 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="h-8 w-8 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Skeleton */}
      <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
        <div className="h-5 bg-gray-200 rounded w-40 mb-3 sm:mb-4"></div>
        <div className="space-y-2 sm:space-y-3">
          {[1, 2].map((i) => (
            <div key={i}>
              <div className="flex justify-between mb-1">
                <div className="h-3 bg-gray-200 rounded w-24"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gray-300 h-2 rounded-full" style={{ width: `${i * 30}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AdminSkeleton() {
  return (
    <div className="space-y-6 sm:space-y-8 animate-pulse">
      <div className="text-center">
        <div className="h-6 bg-gray-200 rounded w-32 mx-auto mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-64 mx-auto"></div>
      </div>

      {/* Slack Integration Skeleton */}
      <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
        <div className="flex items-center mb-3 sm:mb-4">
          <div className="h-6 w-6 bg-gray-200 rounded mr-2 sm:mr-3"></div>
          <div className="h-5 bg-gray-200 rounded w-32"></div>
        </div>
        <div className="space-y-3 sm:space-y-4">
          <div>
            <div className="h-4 bg-gray-200 rounded w-24 mb-1 sm:mb-2"></div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>
          <div>
            <div className="h-4 bg-gray-200 rounded w-32 mb-1 sm:mb-2"></div>
            <div className="h-10 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-full"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
      </div>

      {/* Notion Integration Skeleton */}
      <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
        <div className="flex items-center mb-3 sm:mb-4">
          <div className="h-6 w-6 bg-gray-200 rounded mr-2 sm:mr-3"></div>
          <div className="h-5 bg-gray-200 rounded w-36"></div>
        </div>
        <div className="space-y-3 sm:space-y-4">
          <div>
            <div className="h-4 bg-gray-200 rounded w-24 mb-1 sm:mb-2"></div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>
          <div>
            <div className="h-4 bg-gray-200 rounded w-28 mb-1 sm:mb-2"></div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      <div className="w-full px-4 py-4 sm:py-6 lg:py-8">
        <div className="text-center mb-4 sm:mb-6 lg:mb-8">
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-2 sm:mb-3 lg:mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-96 mx-auto px-2"></div>
        </div>

        <div className="flex justify-center mb-4 sm:mb-6 lg:mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-1 w-full max-w-sm sm:max-w-md">
            <div className="grid grid-cols-3 gap-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-8 bg-gray-200 rounded-md"></div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full max-w-4xl mx-auto">
          <div className="h-96 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
