"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getMoodById } from "@/lib/moods";
import { getComboForMood, isMoodValid } from "@/lib/combo-generator";
import { useSessionStore } from "@/stores/session-store";
import type { Combo, FoodItem } from "@/lib/combo-datasets";
import type { Mood } from "@/lib/moods";
import { GeneratingAnimation } from "@/components/generating-animation";
import { ComboResult } from "@/components/combo-result";
import { ComboActions } from "@/components/combo-actions";
import { ShareCard } from "@/components/share-card";
import { CustomizationPanel } from "@/components/customization-panel";
import Link from "next/link";

function ComboContent() {
  const searchParams = useSearchParams();
  const moodId = searchParams.get("mood");
  const { hasHydrated, getNextComboIndex, setLastCombo } = useSessionStore();

  const [loading, setLoading] = useState(true);
  const [combo, setCombo] = useState<Combo | null>(null);
  const [displayCombo, setDisplayCombo] = useState<Combo | null>(null);
  const [mood, setMood] = useState<Mood | null>(null);
  const [showShare, setShowShare] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);

  const generateCombo = useCallback(() => {
    if (!moodId || !isMoodValid(moodId)) return;

    setLoading(true);

    const index = getNextComboIndex(moodId);
    const newCombo = getComboForMood(moodId, index);
    if (newCombo) {
      setCombo(newCombo);
      setDisplayCombo(newCombo);
      setLastCombo(moodId, newCombo.id);
    }
    setLoading(false);
  }, [moodId, getNextComboIndex, setLastCombo]);

  useEffect(() => {
    if (!hasHydrated) return;
    if (!moodId || !isMoodValid(moodId)) return;

    const m = getMoodById(moodId);
    if (m) setMood(m);
    generateCombo();
  }, [hasHydrated, moodId, generateCombo]);

  const handleRegenerate = useCallback(() => {
    generateCombo();
  }, [generateCombo]);

  const handleCustomize = useCallback(() => {
    setShowCustomize(true);
  }, []);

  const handleCustomizeConfirm = useCallback(
    (items: FoodItem[], score: number) => {
      if (!combo) return;

      const hasChanges = items.some(
        (item, i) => combo.items[i]?.name !== item.name,
      ) || items.length !== combo.items.length;

      if (hasChanges) {
        const customCombo: Combo = {
          ...combo,
          id: `${combo.id}-custom`,
          name: `Tu version de ${combo.name}`,
          items,
          matchScore: score,
        };
        setDisplayCombo(customCombo);
      }

      setShowCustomize(false);
    },
    [combo],
  );

  if (!moodId || (hasHydrated && !isMoodValid(moodId))) {
    return (
      <div className="flex flex-col items-center justify-center min-h-dvh gap-4 px-4">
        <span className="text-4xl">🤔</span>
        <p className="text-lg text-center text-foreground">
          No encontramos tu mood. Vamos a elegir uno.
        </p>
        <Link
          href="/"
          className="mt-4 px-6 py-3 bg-foreground text-primary-foreground rounded-xl font-medium text-sm"
        >
          Ir al inicio
        </Link>
      </div>
    );
  }

  if (!hasHydrated || !mood) {
    return <div className="flex flex-col flex-1 items-center justify-center min-h-dvh" />;
  }

  return (
    <div className="flex flex-col items-center min-h-dvh px-4 py-8 sm:py-12 sm:justify-center">
      <div className="flex flex-col items-center gap-6 sm:gap-8 w-full max-w-md my-auto">
        {loading || !displayCombo ? (
          <GeneratingAnimation />
        ) : (
          <>
            <ComboResult combo={displayCombo} mood={mood} />
            <ComboActions
              onRegenerate={handleRegenerate}
              onCustomize={handleCustomize}
              onShare={() => setShowShare(true)}
            />
          </>
        )}
      </div>

      {showShare && displayCombo && mood && (
        <ShareCard
          combo={displayCombo}
          mood={mood}
          onClose={() => setShowShare(false)}
        />
      )}

      {showCustomize && displayCombo && mood && (
        <CustomizationPanel
          combo={displayCombo}
          mood={mood}
          onConfirm={handleCustomizeConfirm}
          onClose={() => setShowCustomize(false)}
        />
      )}
    </div>
  );
}

export default function ComboPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-dvh" />
      }
    >
      <ComboContent />
    </Suspense>
  );
}
