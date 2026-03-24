"use client";

import { motion } from "framer-motion";
import { moods } from "@/lib/moods";
import type { Mood } from "@/lib/moods";
import { MoodCard } from "./mood-card";

interface MoodGridProps {
  onSelect: (mood: Mood) => void;
  disabled?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function MoodGrid({ onSelect, disabled }: MoodGridProps) {
  return (
    <motion.div
      className="flex flex-col gap-3 w-full max-w-md mx-auto sm:grid sm:grid-cols-3 sm:gap-4 sm:max-w-lg lg:grid-cols-5 lg:max-w-4xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* First row: 2 cards side by side on mobile */}
      <div className="grid grid-cols-2 gap-3 sm:contents">
        {moods.slice(0, 2).map((mood) => (
          <motion.div key={mood.id} variants={itemVariants}>
            <MoodCard mood={mood} onSelect={onSelect} disabled={disabled} />
          </motion.div>
        ))}
      </div>
      {/* Second row: 2 cards side by side on mobile */}
      <div className="grid grid-cols-2 gap-3 sm:contents">
        {moods.slice(2, 4).map((mood) => (
          <motion.div key={mood.id} variants={itemVariants}>
            <MoodCard mood={mood} onSelect={onSelect} disabled={disabled} />
          </motion.div>
        ))}
      </div>
      {/* Last card: centered and wider on mobile */}
      <div className="flex justify-center sm:contents">
        <motion.div variants={itemVariants} className="w-1/2 sm:w-full">
          <MoodCard
            mood={moods[4]}
            onSelect={onSelect}
            disabled={disabled}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
