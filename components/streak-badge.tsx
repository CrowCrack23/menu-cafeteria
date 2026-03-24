"use client";

import { motion } from "framer-motion";

interface StreakBadgeProps {
  count: number;
  isMilestone: boolean;
}

const MILESTONE_EMOJIS: Record<number, string> = {
  5: "🔥",
  10: "🏆",
  30: "👑",
};

export function StreakBadge({ count, isMilestone }: StreakBadgeProps) {
  const milestoneEmoji = MILESTONE_EMOJIS[count];

  return (
    <motion.div
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.3 }}
    >
      {isMilestone ? (
        <motion.span
          className="text-xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: 2,
            repeatDelay: 0.3,
          }}
        >
          {milestoneEmoji ?? "🔥"}
        </motion.span>
      ) : (
        <span className="text-base">🔥</span>
      )}
      <motion.span
        className="font-bold text-sm"
        key={count}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        {count} {count === 1 ? "día" : "días"}
      </motion.span>
    </motion.div>
  );
}
