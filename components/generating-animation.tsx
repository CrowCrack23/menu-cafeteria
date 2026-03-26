export function GeneratingAnimation() {
  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-md mx-auto px-4 py-12">
      <div className="w-10 h-10 border-3 border-border border-t-foreground rounded-full animate-spin" />
      <p className="text-muted-foreground text-sm">
        Preparando tu combo...
      </p>
    </div>
  );
}
