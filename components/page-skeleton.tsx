export function PageSkeleton() {
  return (
    <div className="flex flex-col min-h-dvh px-4 py-6 pb-24">
      <div className="w-full max-w-lg mx-auto">
        {/* Title skeleton */}
        <div className="h-6 w-40 bg-muted rounded-lg mb-2 animate-pulse" />
        <div className="h-4 w-56 bg-muted rounded-lg mb-6 animate-pulse" />

        {/* Card skeletons */}
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-border mb-2.5"
          >
            <div className="w-14 h-14 rounded-xl bg-muted animate-pulse shrink-0" />
            <div className="flex flex-col gap-2 flex-1">
              <div className="h-4 w-32 bg-muted rounded animate-pulse" />
              <div className="h-3 w-48 bg-muted rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
