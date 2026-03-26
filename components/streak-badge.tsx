interface StreakBadgeProps {
  count: number;
}

export function StreakBadge({ count }: StreakBadgeProps) {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-border text-sm shadow-sm">
      <span>🔥</span>
      <span className="font-semibold text-foreground">
        {count} {count === 1 ? "dia" : "dias"}
      </span>
    </div>
  );
}
