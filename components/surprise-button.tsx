"use client";

import { useState, useCallback } from "react";
import { moods } from "@/lib/moods";
import type { Mood } from "@/lib/moods";
import { selectSurpriseMood } from "@/lib/surprise-logic";

interface SurpriseButtonProps {
  lastMoodId: string | null;
  onSelect: (mood: Mood) => void;
  disabled?: boolean;
}

export function SurpriseButton({
  lastMoodId,
  onSelect,
  disabled,
}: SurpriseButtonProps) {
  const [isRevealing, setIsRevealing] = useState(false);
  const [revealedMood, setRevealedMood] = useState<Mood | null>(null);

  const handleSurprise = useCallback(() => {
    if (disabled || isRevealing) return;

    setIsRevealing(true);
    const selectedMood = selectSurpriseMood(lastMoodId);
    setRevealedMood(selectedMood);

    setTimeout(() => {
      onSelect(selectedMood);
    }, 400);
  }, [disabled, isRevealing, lastMoodId, onSelect]);

  return (
    <button
      onClick={handleSurprise}
      disabled={disabled || isRevealing}
      className="flex items-center justify-center gap-2 w-full max-w-xs px-6 py-3 min-h-[48px] rounded-xl bg-white border border-border text-foreground font-semibold text-sm cursor-pointer select-none shadow-sm active:scale-[0.97] transition-transform"
    >
      {isRevealing && revealedMood ? (
        <>
          <span className="text-xl">{revealedMood.emoji}</span>
          <span>{revealedMood.name}</span>
        </>
      ) : (
        <>
          <span className="text-lg">🎲</span>
          <span>Sorprendeme</span>
        </>
      )}
    </button>
  );
}
