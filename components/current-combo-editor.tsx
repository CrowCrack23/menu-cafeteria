"use client";

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
    <div className="flex gap-2 overflow-x-auto pb-1">
      {items.map((item) => (
        <div
          key={item.name}
          className="shrink-0 flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-full bg-secondary border border-border"
        >
          <span className="text-lg">{item.emoji}</span>
          <span className="text-foreground text-xs font-medium whitespace-nowrap">
            {item.name}
          </span>
          {canRemove && (
            <button
              onClick={() => onRemove(item)}
              className="flex items-center justify-center w-5 h-5 rounded-full bg-border text-muted-foreground text-xs cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
