interface MatchScoreProps {
  score: number;
}

export function MatchScore({ score }: MatchScoreProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border shadow-sm">
      <span className="text-lg font-bold text-foreground">{score}%</span>
      <span className="text-xs text-muted-foreground uppercase tracking-wider">
        match
      </span>
    </div>
  );
}
