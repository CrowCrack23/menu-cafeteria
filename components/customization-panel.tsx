"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Combo, FoodItem } from "@/lib/combo-datasets";
import type { Mood } from "@/lib/moods";
import { calculateMatchScore } from "@/lib/score-calculator";
import { CurrentComboEditor } from "./current-combo-editor";
import { ProductCatalogView } from "./product-catalog";
import { MatchScore } from "./match-score";

interface CustomizationPanelProps {
  combo: Combo;
  mood: Mood;
  onConfirm: (items: FoodItem[], score: number) => void;
  onClose: () => void;
}

const MIN_ITEMS = 3;
const MAX_ITEMS = 4;

export function CustomizationPanel({
  combo,
  mood,
  onConfirm,
  onClose,
}: CustomizationPanelProps) {
  const [customItems, setCustomItems] = useState<FoodItem[]>([...combo.items]);
  const [score, setScore] = useState(combo.matchScore);
  const [feedback, setFeedback] = useState<string | null>(null);

  const showFeedback = useCallback((msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 2000);
  }, []);

  const handleAdd = useCallback(
    (item: FoodItem) => {
      if (customItems.length >= MAX_ITEMS) {
        showFeedback("Máximo 4 items — quita uno primero 👆");
        return;
      }
      if (customItems.some((i) => i.name === item.name)) return;

      const next = [...customItems, item];
      setCustomItems(next);
      setScore(calculateMatchScore(next, mood.id));
    },
    [customItems, mood.id, showFeedback],
  );

  const handleRemove = useCallback(
    (item: FoodItem) => {
      if (customItems.length <= MIN_ITEMS) {
        showFeedback("Necesitas al menos 3 items 🤏");
        return;
      }

      const next = customItems.filter((i) => i.name !== item.name);
      setCustomItems(next);
      setScore(calculateMatchScore(next, mood.id));
    },
    [customItems, mood.id, showFeedback],
  );

  const handleConfirm = useCallback(() => {
    onConfirm(customItems, score);
  }, [customItems, score, onConfirm]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Panel */}
      <motion.div
        className="relative rounded-t-3xl overflow-hidden max-h-[85vh] flex flex-col"
        style={{
          background: `linear-gradient(180deg, ${mood.gradient[0]}ee, ${mood.gradient[1]}ee)`,
          backdropFilter: "blur(20px)",
        }}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        drag="y"
        dragConstraints={{ top: 0 }}
        dragElastic={0.1}
        onDragEnd={(_, info) => {
          if (info.offset.y > 100) onClose();
        }}
      >
        {/* Drag handle */}
        <div className="flex justify-center py-3">
          <div
            className="w-10 h-1 rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
          />
        </div>

        <div className="flex flex-col gap-4 px-4 pb-4 overflow-y-auto flex-1">
          {/* Header + score */}
          <div className="flex items-center justify-between">
            <h2 className="text-white font-bold text-lg">
              Personaliza tu combo
            </h2>
            <MatchScore score={score} color={mood.gradient[1]} />
          </div>

          {/* Current items */}
          <div>
            <p className="text-white/60 text-xs mb-2 uppercase tracking-wider">
              Tu combo actual
            </p>
            <CurrentComboEditor
              items={customItems}
              onRemove={handleRemove}
              canRemove={customItems.length > MIN_ITEMS}
            />
          </div>

          {/* Catalog */}
          <div>
            <p className="text-white/60 text-xs mb-2 uppercase tracking-wider">
              Productos disponibles
            </p>
            <ProductCatalogView
              selectedItems={customItems}
              onAdd={handleAdd}
            />
          </div>
        </div>

        {/* Listo button */}
        <div className="px-4 pb-4" style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}>
          <motion.button
            onClick={handleConfirm}
            className="w-full py-3.5 min-h-[48px] rounded-full text-white font-bold text-base cursor-pointer"
            style={{ backgroundColor: "rgba(255,255,255,0.25)" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            ✓ Listo
          </motion.button>
        </div>
      </motion.div>

      {/* Feedback toast */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            className="fixed top-8 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full text-sm font-medium shadow-lg z-60 whitespace-nowrap"
            style={{
              backgroundColor: "rgba(0,0,0,0.8)",
              color: "rgba(255,255,255,0.9)",
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {feedback}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
