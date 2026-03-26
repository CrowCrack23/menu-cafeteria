import Link from "next/link";

interface ComboActionsProps {
  onRegenerate: () => void;
  onCustomize: () => void;
  onShare: () => void;
  onToggleFavorite: () => void;
  isFavorite: boolean;
}

export function ComboActions({
  onRegenerate,
  onCustomize,
  onShare,
  onToggleFavorite,
  isFavorite,
}: ComboActionsProps) {
  return (
    <div className="flex flex-col gap-2.5 w-full max-w-xs sm:max-w-sm">
      <div className="flex gap-2.5">
        <button
          onClick={onRegenerate}
          className="flex-1 flex items-center justify-center gap-2 py-3 min-h-[48px] rounded-xl bg-foreground text-primary-foreground font-semibold text-sm cursor-pointer active:scale-[0.97] transition-transform"
        >
          Otro combo
        </button>
        <button
          onClick={onToggleFavorite}
          className={`flex items-center justify-center w-12 min-h-[48px] rounded-xl border cursor-pointer active:scale-[0.97] transition-transform ${
            isFavorite
              ? "bg-red-50 border-red-200 text-red-500"
              : "bg-white border-border text-muted-foreground"
          }`}
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>
      <button
        onClick={onCustomize}
        className="flex items-center justify-center gap-2 w-full py-3 min-h-[48px] rounded-xl bg-white border border-border text-foreground font-medium text-sm cursor-pointer active:scale-[0.97] transition-transform"
      >
        Personalizar
      </button>
      <button
        onClick={onShare}
        className="flex items-center justify-center gap-2 w-full py-3 min-h-[48px] rounded-xl bg-white border border-border text-foreground font-medium text-sm cursor-pointer active:scale-[0.97] transition-transform"
      >
        Compartir
      </button>
      <Link
        href="/"
        className="flex items-center justify-center w-full py-3 min-h-[44px] text-muted-foreground text-sm"
      >
        ← Cambiar mood
      </Link>
    </div>
  );
}
