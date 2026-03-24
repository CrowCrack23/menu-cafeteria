"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { FoodItem } from "@/lib/combo-datasets";
import {
  productCatalog,
  categoryLabels,
  categoryOrder,
} from "@/lib/product-catalog";
import type { CategoryKey } from "@/lib/product-catalog";
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
  const selectedNames = new Set(selectedItems.map((i) => i.name));
  const items = productCatalog.categories[activeTab];

  return (
    <div className="flex flex-col gap-3">
      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {categoryOrder.map((key) => {
          const isActive = key === activeTab;
          return (
            <motion.button
              key={key}
              onClick={() => setActiveTab(key)}
              className="shrink-0 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer"
              style={{
                backgroundColor: isActive
                  ? "rgba(255,255,255,0.25)"
                  : "rgba(255,255,255,0.08)",
                color: isActive
                  ? "rgba(255,255,255,1)"
                  : "rgba(255,255,255,0.6)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              {categoryLabels[key]}
              <span className="ml-1 opacity-60">
                {productCatalog.categories[key].length}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Product list */}
      <div className="flex flex-col gap-1.5 max-h-[40vh] overflow-y-auto pr-1">
        {items.map((item) => (
          <ProductCard
            key={item.name}
            item={item}
            isSelected={selectedNames.has(item.name)}
            onTap={() => !selectedNames.has(item.name) && onAdd(item)}
          />
        ))}
      </div>
    </div>
  );
}
