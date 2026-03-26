"use client";

import { useState } from "react";
import { useMenuStore } from "@/stores/menu-store";
import {
  productCatalog,
  categoryLabels,
  categoryOrder,
} from "@/lib/product-catalog";
import type { CategoryKey } from "@/lib/product-catalog";
import { getItemPrice } from "@/lib/prices";

export default function MenuPage() {
  const { hasHydrated, unavailableItems, toggleAvailability, resetAll } =
    useMenuStore();
  const [activeTab, setActiveTab] = useState<CategoryKey>("main");

  if (!hasHydrated) {
    return <div className="flex flex-col flex-1 items-center justify-center min-h-dvh" />;
  }

  const unavailableSet = new Set(unavailableItems);
  const items = productCatalog.categories[activeTab];
  const totalUnavailable = unavailableItems.length;

  return (
    <div className="flex flex-col min-h-dvh px-4 py-8 pb-24">
      <div className="w-full max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-bold text-foreground">Menu del dia</h1>
          {totalUnavailable > 0 && (
            <button
              onClick={resetAll}
              className="text-xs text-muted-foreground cursor-pointer"
            >
              Marcar todos disponibles
            </button>
          )}
        </div>

        {totalUnavailable > 0 && (
          <p className="text-xs text-muted-foreground mb-4">
            {totalUnavailable} producto{totalUnavailable !== 1 ? "s" : ""} no disponible{totalUnavailable !== 1 ? "s" : ""}
          </p>
        )}

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-4">
          {categoryOrder.map((key) => {
            const isActive = key === activeTab;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer transition-colors ${
                  isActive
                    ? "bg-foreground text-primary-foreground"
                    : "bg-white border border-border text-muted-foreground"
                }`}
              >
                {categoryLabels[key]}
              </button>
            );
          })}
        </div>

        {/* Items list */}
        <div className="flex flex-col gap-1">
          {items.map((item) => {
            const isUnavailable = unavailableSet.has(item.name);
            return (
              <button
                key={item.name}
                onClick={() => toggleAvailability(item.name)}
                className={`flex items-center gap-3 w-full p-3 rounded-xl text-left cursor-pointer transition-colors ${
                  isUnavailable
                    ? "bg-red-50 border border-red-100"
                    : "bg-white border border-border"
                }`}
              >
                {/* Status dot */}
                <span
                  className={`w-3 h-3 rounded-full shrink-0 ${
                    isUnavailable ? "bg-red-400" : "bg-green-400"
                  }`}
                />
                <span className="text-2xl shrink-0">{item.emoji}</span>
                <div className="flex flex-col min-w-0 flex-1">
                  <span
                    className={`text-sm font-medium leading-tight truncate ${
                      isUnavailable
                        ? "text-muted-foreground line-through"
                        : "text-foreground"
                    }`}
                  >
                    {item.name}
                  </span>
                  <span className="text-muted-foreground text-xs leading-tight truncate">
                    {item.description}
                  </span>
                </div>
                <span className="text-muted-foreground text-xs shrink-0">
                  ${getItemPrice(item.name)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
