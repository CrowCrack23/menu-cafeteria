"use client";

import { motion } from "framer-motion";
import type { FoodItem } from "@/lib/combo-datasets";

interface ComboItemCardProps {
  item: FoodItem;
}

export function ComboItemCard({ item }: ComboItemCardProps) {
  return (
    <motion.div
      className="flex items-center gap-3 p-3 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-sm"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <span className="text-3xl sm:text-4xl shrink-0">{item.emoji}</span>
      <div className="flex flex-col min-w-0">
        <span className="text-white font-bold text-sm sm:text-base leading-tight">
          {item.name}
        </span>
        <span className="text-white/70 text-xs sm:text-sm leading-tight">
          {item.description}
        </span>
      </div>
    </motion.div>
  );
}
