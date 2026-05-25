/**
 * SkeletonCard — animated shimmer placeholder matching the real BookCard layout.
 * Shown while books are loading to prevent layout shift and give premium feel.
 */
const SkeletonCard = () => (
  <div className="flex flex-col bg-white dark:bg-gray-900 rounded-2xl
                  border border-gray-100 dark:border-gray-800 overflow-hidden">
    {/* Top accent */}
    <div className="h-1 shimmer" />

    <div className="flex flex-col flex-1 p-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 space-y-2.5">
          <div className="h-4 shimmer rounded-lg w-4/5" />
          <div className="h-3 shimmer rounded-lg w-1/2" />
        </div>
        <div className="w-10 h-10 shimmer rounded-xl flex-shrink-0" />
      </div>

      {/* Badges */}
      <div className="flex items-center gap-2 mb-4">
        <div className="h-5 w-16 shimmer rounded-full" />
        <div className="h-5 w-12 shimmer rounded-full" />
      </div>

      {/* Description */}
      <div className="space-y-2 mb-4 flex-1">
        <div className="h-3 shimmer rounded w-full" />
        <div className="h-3 shimmer rounded w-11/12" />
        <div className="h-3 shimmer rounded w-4/5" />
      </div>

      {/* Buttons */}
      <div className="flex gap-2 pt-3 border-t border-gray-100 dark:border-gray-800 mt-auto">
        <div className="h-8 shimmer rounded-xl flex-1" />
        <div className="h-8 shimmer rounded-xl flex-1" />
      </div>
    </div>
  </div>
);

export const SkeletonGrid = ({ count = 8 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export default SkeletonCard;
