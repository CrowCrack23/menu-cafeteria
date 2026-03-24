"use client";

import { motion } from "framer-motion";
import type { Mood } from "@/lib/moods";

interface MoodCardProps {
  mood: Mood;
  onSelect: (mood: Mood) => void;
  disabled?: boolean;
}

export function MoodCard({ mood, onSelect, disabled }: MoodCardProps) {
  return (
    <motion.button
      onClick={() => !disabled && onSelect(mood)}
      disabled={disabled}
      className="relative flex flex-col items-center justify-center gap-1.5 sm:gap-3 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white shadow-lg cursor-pointer select-none overflow-hidden min-h-[110px] sm:min-h-[140px] w-full"
      style={{
        background: `linear-gradient(135deg, ${mood.gradient[0]}, ${mood.gradient[1]})`,
      }}
      whileHover={{
        scale: 1.05,
        y: -4,
        boxShadow: `0 20px 40px ${mood.gradient[0]}40`,
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      <span className="text-3xl sm:text-4xl">{mood.emoji}</span>
      <span className="text-base sm:text-lg font-bold tracking-wide leading-tight">
        {mood.name}
      </span>
      <span className="text-xs sm:text-sm opacity-80 leading-tight">
        {mood.description}
      </span>
    </motion.button>
  );
}
