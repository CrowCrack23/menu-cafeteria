import type { Combo } from "@/lib/combo-datasets";
import type { Mood } from "@/lib/moods";
import { ComboItemCard } from "./combo-item-card";
import { MatchScore } from "./match-score";

interface ComboResultProps {
  combo: Combo;
  mood: Mood;
}

export function ComboResult({ combo, mood }: ComboResultProps) {
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

      {/* Food items */}
      <div className="flex flex-col gap-2 w-full">
        {combo.items.map((item, i) => (
          <ComboItemCard key={`${combo.id}-item-${i}`} item={item} />
        ))}
      </div>

      {/* Match score */}
      <MatchScore score={combo.matchScore} />
    </div>
  );
}
