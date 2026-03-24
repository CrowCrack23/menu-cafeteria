"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { FoodItem } from "@/lib/combo-datasets";

interface CurrentComboEditorProps {
  items: FoodItem[];
  onRemove: (item: FoodItem) => void;
  canRemove: boolean;
}

export function CurrentComboEditor({
  items,
  onRemove,
  canRemove,
}: CurrentComboEditorProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      <AnimatePresence mode="popLayout">
        {items.map((item) => (
          <motion.div
            key={item.name}
            className="shrink-0 flex items-center gap-2 pl-3 pr-2 py-2 rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
            layout
            initial={{ opacity: 0, scale: 0.8, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <span className="text-lg">{item.emoji}</span>
            <span className="text-white text-xs font-medium whitespace-nowrap">
              {item.name}
            </span>
            {canRemove && (
              <motion.button
                onClick={() => onRemove(item)}
                className="flex items-center justify-center w-5 h-5 rounded-full text-white/60 text-xs cursor-pointer"
                style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                whileTap={{ scale: 0.85 }}
              >
                ✕
              </motion.button>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
