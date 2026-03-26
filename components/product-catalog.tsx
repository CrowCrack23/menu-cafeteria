"use client";

import { useState } from "react";
import type { FoodItem } from "@/lib/combo-datasets";
import {
  productCatalog,
  categoryLabels,
  categoryOrder,
} from "@/lib/product-catalog";
import type { CategoryKey } from "@/lib/product-catalog";
import { useMenuStore } from "@/stores/menu-store";
import { ProductCard } from "./product-card";

interface ProductCatalogProps {
  selectedItems: FoodItem[];
  onAdd: (item: FoodItem) => void;
}

export function ProductCatalogView({
  selectedItems,
  onAdd,
}: ProductCatalogProps) {
  const [activeTab, setActiveTab] = useState<CategoryKey>("main");
  const { unavailableItems } = useMenuStore();
  const unavailableSet = new Set(unavailableItems);
  const selectedNames = new Set(selectedItems.map((i) => i.name));
  const items = productCatalog.categories[activeTab];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {categoryOrder.map((key) => {
          const isActive = key === activeTab;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer transition-colors ${
                isActive
                  ? "bg-foreground text-primary-foreground"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {categoryLabels[key]}
              <span className="ml-1 opacity-60">
                {productCatalog.categories[key].length}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-1 max-h-[40vh] overflow-y-auto">
        {items.map((item) => (
          <ProductCard
            key={item.name}
            item={item}
            isSelected={selectedNames.has(item.name)}
            onTap={() => !selectedNames.has(item.name) && !unavailableSet.has(item.name) && onAdd(item)}
            available={!unavailableSet.has(item.name)}
          />
        ))}
      </div>
    </div>
  );
}
