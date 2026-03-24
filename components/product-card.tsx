"use client";

import { motion } from "framer-motion";
import type { FoodItem } from "@/lib/combo-datasets";

interface ProductCardProps {
  item: FoodItem;
  isSelected: boolean;
  onTap: () => void;
}

export function ProductCard({ item, isSelected, onTap }: ProductCardProps) {
  return (
    <motion.button
      onClick={onTap}
      className="flex items-center gap-3 w-full p-3 rounded-xl text-left cursor-pointer"
      style={{
        backgroundColor: isSelected
          ? "rgba(255,255,255,0.2)"
          : "rgba(255,255,255,0.05)",
      }}
      whileTap={!isSelected ? { scale: 0.97 } : {}}
      layout
    >
      <span className="text-2xl shrink-0">{item.emoji}</span>
      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-white text-sm font-medium leading-tight truncate">
          {item.name}
        </span>
        <span className="text-white/60 text-xs leading-tight truncate">
          {item.description}
        </span>
      </div>
      {isSelected && (
        <motion.span
          className="text-sm shrink-0"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          ✓
        </motion.span>
      )}
    </motion.button>
  );
}
