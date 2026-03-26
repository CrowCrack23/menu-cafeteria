import type { Combo } from "@/lib/combo-datasets";
import type { Mood } from "@/lib/moods";
import { getComboTotal } from "@/lib/prices";
import { ComboItemCard } from "./combo-item-card";
import { MatchScore } from "./match-score";

interface ComboResultProps {
  combo: Combo;
  mood: Mood;
  unavailableItems?: Set<string>;
}

export function ComboResult({ combo, mood, unavailableItems }: ComboResultProps) {
  const total = getComboTotal(combo.items);
  const hasUnavailable = unavailableItems && combo.items.some((item) => unavailableItems.has(item.name));

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-md mx-auto">
      {/* Header */}
      <div className="text-center">
        <span className="text-4xl mb-2 block">{mood.emoji}</span>
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">
          {combo.name}
        </h1>
      </div>

      {/* Message */}
      <p className="text-muted-foreground text-center text-sm italic">
        &ldquo;{combo.message}&rdquo;
      </p>

      {/* Unavailability warning */}
      {hasUnavailable && (
        <div className="flex items-center gap-2 w-full px-3 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm">
          <span>⚠️</span>
          <span>Algunos productos no estan disponibles hoy</span>
        </div>
      )}

      {/* Food items */}
      <div className="flex flex-col gap-2 w-full">
        {combo.items.map((item, i) => (
          <ComboItemCard
            key={`${combo.id}-item-${i}`}
            item={item}
            available={!unavailableItems?.has(item.name)}
          />
        ))}
      </div>

      {/* Total + Match */}
      <div className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl bg-white border border-border">
        <span className="text-foreground font-bold text-base">
          Total: ${total} CUP
        </span>
        <MatchScore score={combo.matchScore} />
      </div>
    </div>
  );
}
