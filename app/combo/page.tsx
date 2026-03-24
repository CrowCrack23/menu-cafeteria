"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";
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

type Stage = "generating" | "revealing" | "complete" | "exiting";

function ComboContent() {
  const searchParams = useSearchParams();
  const moodId = searchParams.get("mood");
  const { hasHydrated, getNextComboIndex, setLastCombo } = useSessionStore();

  const [stage, setStage] = useState<Stage>("generating");
  const [combo, setCombo] = useState<Combo | null>(null);
  const [displayCombo, setDisplayCombo] = useState<Combo | null>(null);
  const [mood, setMood] = useState<Mood | null>(null);
  const [showShare, setShowShare] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);

  const generateCombo = useCallback(() => {
    if (!moodId || !isMoodValid(moodId)) return;

    setStage("generating");
    setCombo(null);
    setDisplayCombo(null);

    setTimeout(() => {
      const index = getNextComboIndex(moodId);
      const newCombo = getComboForMood(moodId, index);
      if (newCombo) {
        setCombo(newCombo);
        setDisplayCombo(newCombo);
        setLastCombo(moodId, newCombo.id);
        setStage("revealing");

        const totalItems = newCombo.items.length;
        const revealTime = 300 + 300 + totalItems * 150 + 300 + 500;
        setTimeout(() => setStage("complete"), revealTime);
      }
    }, 1500);
  }, [moodId, getNextComboIndex, setLastCombo]);

  useEffect(() => {
    if (!hasHydrated) return;
    if (!moodId || !isMoodValid(moodId)) return;

    const m = getMoodById(moodId);
    if (m) setMood(m);
    generateCombo();
  }, [hasHydrated, moodId, generateCombo]);

  const handleRegenerate = useCallback(() => {
    if (stage !== "complete") return;
    setStage("exiting");
    setTimeout(() => generateCombo(), 300);
  }, [stage, generateCombo]);

  const handleCustomize = useCallback(() => {
    if (stage !== "complete") return;
    setShowCustomize(true);
  }, [stage]);

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
          name: `Tu versión de ${combo.name}`,
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
      <div className="flex flex-col items-center justify-center min-h-dvh bg-gray-900 text-white gap-4 px-4">
        <span className="text-5xl">🤔</span>
        <p className="text-xl text-center">
          No encontramos tu mood. Vamos a elegir uno.
        </p>
        <Link
          href="/"
          className="mt-4 px-6 py-3 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
        >
          Ir al inicio
        </Link>
      </div>
    );
  }

  if (!hasHydrated || !mood) {
    return (
      <div
        className="flex flex-col flex-1 items-center justify-center min-h-dvh"
        style={{
          background: `linear-gradient(135deg, var(--page-gradient-from), var(--page-gradient-via), var(--page-gradient-to))`,
        }}
      />
    );
  }

  return (
    <div
      className="flex flex-col items-center min-h-dvh px-4 py-8 sm:py-12 sm:justify-center"
      style={{
        background: `linear-gradient(135deg, ${mood.gradient[0]}, ${mood.gradient[1]})`,
        paddingTop: "max(2rem, env(safe-area-inset-top))",
        paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
      }}
    >
      <div className="flex flex-col items-center gap-6 sm:gap-8 w-full max-w-md my-auto">
        <AnimatePresence mode="wait">
          {(stage === "generating" || !displayCombo) && (
            <GeneratingAnimation
              key="generating"
              gradient={mood.gradient}
            />
          )}
          {displayCombo && (stage === "revealing" || stage === "complete") && (
            <ComboResult
              key={displayCombo.id}
              combo={displayCombo}
              mood={mood}
            />
          )}
        </AnimatePresence>

        {stage === "complete" && displayCombo && (
          <ComboActions
            onRegenerate={handleRegenerate}
            onCustomize={handleCustomize}
            onShare={() => setShowShare(true)}
          />
        )}
      </div>

      <AnimatePresence>
        {showShare && displayCombo && (
          <ShareCard
            combo={displayCombo}
            mood={mood}
            onClose={() => setShowShare(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCustomize && displayCombo && mood && (
          <CustomizationPanel
            combo={displayCombo}
            mood={mood}
            onConfirm={handleCustomizeConfirm}
            onClose={() => setShowCustomize(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ComboPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-dvh bg-gray-900" />
      }
    >
      <ComboContent />
    </Suspense>
  );
}
