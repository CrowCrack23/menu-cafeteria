"use client";

import { useState, useCallback } from "react";
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
        showFeedback("Maximo 4 items — quita uno primero");
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
        showFeedback("Necesitas al menos 3 items");
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
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative rounded-t-2xl overflow-hidden max-h-[85vh] flex flex-col bg-[#f8f9fa] border-t border-border">
        {/* Drag handle */}
        <div className="flex justify-center py-3">
          <div className="w-10 h-1 rounded-full bg-border" />
        </div>

        <div className="flex flex-col gap-4 px-4 pb-4 overflow-y-auto flex-1">
          {/* Header + score */}
          <div className="flex items-center justify-between">
            <h2 className="text-foreground font-bold text-lg">
              Personaliza tu combo
            </h2>
            <MatchScore score={score} />
          </div>

          {/* Current items */}
          <div>
            <p className="text-muted-foreground text-xs mb-2 uppercase tracking-wider font-medium">
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
            <p className="text-muted-foreground text-xs mb-2 uppercase tracking-wider font-medium">
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
          <button
            onClick={handleConfirm}
            className="w-full py-3 min-h-[48px] rounded-xl bg-foreground text-primary-foreground font-semibold text-sm cursor-pointer active:scale-[0.97] transition-transform"
          >
            Listo
          </button>
        </div>
      </div>

      {/* Feedback toast */}
      {feedback && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full text-sm font-medium shadow-lg z-60 bg-foreground text-primary-foreground whitespace-nowrap">
          {feedback}
        </div>
      )}
    </div>
  );
}
