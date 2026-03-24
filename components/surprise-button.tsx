"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [shuffleIndex, setShuffleIndex] = useState(0);

  const handleSurprise = useCallback(() => {
    if (disabled || isRevealing) return;

    setIsRevealing(true);

    const selectedMood = selectSurpriseMood(lastMoodId);

    let count = 0;
    const totalShuffles = 12;
    const interval = setInterval(() => {
      setShuffleIndex(Math.floor(Math.random() * moods.length));
      count++;

      if (count >= totalShuffles) {
        clearInterval(interval);
        const finalIndex = moods.findIndex((m) => m.id === selectedMood.id);
        setShuffleIndex(finalIndex >= 0 ? finalIndex : 0);

        setTimeout(() => {
          onSelect(selectedMood);
        }, 600);
      }
    }, 150);
  }, [disabled, isRevealing, lastMoodId, onSelect]);

  const currentMood = moods[shuffleIndex];

  return (
    <motion.button
      onClick={handleSurprise}
      disabled={disabled || isRevealing}
      className="relative flex items-center justify-center gap-3 w-full max-w-xs sm:w-auto px-8 py-4 min-h-[48px] rounded-full text-white font-bold text-base sm:text-lg cursor-pointer select-none overflow-hidden"
      style={{
        background: isRevealing
          ? `linear-gradient(135deg, ${currentMood.gradient[0]}, ${currentMood.gradient[1]})`
          : "rgba(255, 255, 255, 0.15)",
        backdropFilter: isRevealing ? "none" : "blur(10px)",
      }}
      whileHover={
        !isRevealing
          ? { scale: 1.05 }
          : {}
      }
      whileTap={!isRevealing ? { scale: 0.95 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <AnimatePresence mode="wait">
        {isRevealing ? (
          <motion.span
            key={shuffleIndex}
            className="text-xl sm:text-2xl"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            {currentMood.emoji}
          </motion.span>
        ) : (
          <motion.span
            key="dice"
            className="text-xl sm:text-2xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            🎲
          </motion.span>
        )}
      </AnimatePresence>
      <span>{isRevealing ? currentMood.name : "Sorpréndeme"}</span>
    </motion.button>
  );
}
