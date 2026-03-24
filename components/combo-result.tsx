"use client";

import { motion } from "framer-motion";
import type { Combo } from "@/lib/combo-datasets";
import type { Mood } from "@/lib/moods";
import { ComboItemCard } from "./combo-item-card";
import { MatchScore } from "./match-score";

interface ComboResultProps {
  combo: Combo;
  mood: Mood;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const itemsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export function ComboResult({ combo, mood }: ComboResultProps) {
  return (
    <motion.div
      className="flex flex-col items-center gap-5 sm:gap-6 w-full max-w-md mx-auto px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Combo name */}
      <motion.div className="text-center" variants={itemVariants}>
        <span className="text-4xl mb-2 block">{mood.emoji}</span>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          {combo.name}
        </h1>
      </motion.div>

      {/* Message */}
      <motion.p
        className="text-white/80 text-center text-base sm:text-lg italic"
        variants={itemVariants}
      >
        &ldquo;{combo.message}&rdquo;
      </motion.p>

      {/* Food items */}
      <motion.div
        className="flex flex-col gap-3 w-full"
        variants={itemsContainerVariants}
      >
        {combo.items.map((item, i) => (
          <motion.div key={`${combo.id}-item-${i}`} variants={itemVariants}>
            <ComboItemCard item={item} />
          </motion.div>
        ))}
      </motion.div>

      {/* Match score */}
      <motion.div
        className="flex flex-col items-center gap-1"
        variants={itemVariants}
      >
        <MatchScore score={combo.matchScore} color={mood.gradient[1]} />
      </motion.div>
    </motion.div>
  );
}
