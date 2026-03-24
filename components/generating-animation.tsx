"use client";

import { motion } from "framer-motion";

interface GeneratingAnimationProps {
  gradient: [string, string];
}

const shimmer = {
  animate: {
    opacity: [0.3, 0.6, 0.3],
  },
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

export function GeneratingAnimation({ gradient }: GeneratingAnimationProps) {
  return (
    <motion.div
      className="flex flex-col gap-4 w-full max-w-md mx-auto px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Name placeholder */}
      <motion.div
        className="h-10 rounded-xl w-3/4 mx-auto"
        style={{ background: `linear-gradient(135deg, ${gradient[0]}80, ${gradient[1]}80)` }}
        animate={shimmer.animate}
        transition={shimmer.transition}
      />
      {/* Message placeholder */}
      <motion.div
        className="h-6 rounded-lg w-2/3 mx-auto"
        style={{ background: `linear-gradient(135deg, ${gradient[0]}60, ${gradient[1]}60)` }}
        animate={shimmer.animate}
        transition={{ ...shimmer.transition, delay: 0.2 }}
      />
      {/* Item placeholders */}
      <div className="flex flex-col gap-3 mt-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="h-16 rounded-2xl"
            style={{ background: `linear-gradient(135deg, ${gradient[0]}40, ${gradient[1]}40)` }}
            animate={shimmer.animate}
            transition={{ ...shimmer.transition, delay: 0.1 * (i + 3) }}
          />
        ))}
      </div>
      {/* Score placeholder */}
      <motion.div
        className="h-24 w-24 rounded-full mx-auto mt-4"
        style={{ background: `linear-gradient(135deg, ${gradient[0]}50, ${gradient[1]}50)` }}
        animate={shimmer.animate}
        transition={{ ...shimmer.transition, delay: 0.6 }}
      />
      <motion.p
        className="text-white/50 text-sm text-center mt-2"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Analizando tu vibe...
      </motion.p>
    </motion.div>
  );
}
