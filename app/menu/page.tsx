"use client";

import { useState } from "react";
import { useMenuStore } from "@/stores/menu-store";
import {
  products,
  categoryLabels,
  categoryOrder,
  getProductsByCategory,
  formatCUP,
  type Category,
} from "@/lib/products";

export default function MenuPage() {
  const { hasHydrated, unavailableItems, toggleAvailability, resetAll } =
    useMenuStore();
  const [activeTab, setActiveTab] = useState<Category>("basicos");

  if (!hasHydrated) {
    return <div className="flex flex-col flex-1 items-center justify-center min-h-dvh" />;
  }

  const unavailableSet = new Set(unavailableItems);
  const items = getProductsByCategory(activeTab);
  const totalUnavailable = unavailableItems.length;

  return (
    <div className="flex flex-col min-h-dvh px-4 py-6 pb-24">
      <div className="w-full max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-bold text-foreground">Disponibilidad</h1>
          {totalUnavailable > 0 && (
            <button
              onClick={resetAll}
              className="text-xs text-muted-foreground cursor-pointer"
            >
              Todo disponible
            </button>
          )}
        </div>

        {totalUnavailable > 0 && (
          <p className="text-xs text-muted-foreground mb-4">
            {totalUnavailable} producto{totalUnavailable !== 1 ? "s" : ""} no disponible{totalUnavailable !== 1 ? "s" : ""}
          </p>
        )}

        <p className="text-muted-foreground text-xs mb-4">
          Toca un producto para marcar si esta disponible o no.
        </p>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-4">
          {categoryOrder.map((key) => {
            const isActive = key === activeTab;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${
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

        <div className="flex flex-col gap-1">
          {items.map((product) => {
            const isUnavailable = unavailableSet.has(product.name);
            return (
              <button
                key={product.id}
                onClick={() => toggleAvailability(product.name)}
                className={`flex items-center gap-3 w-full p-3 rounded-xl text-left cursor-pointer transition-colors ${
                  isUnavailable
                    ? "bg-red-50 border border-red-100"
                    : "bg-white border border-border"
                }`}
              >
                <span
                  className={`w-3 h-3 rounded-full shrink-0 ${
                    isUnavailable ? "bg-red-400" : "bg-green-400"
                  }`}
                />
                <span className="text-2xl shrink-0">{product.emoji}</span>
                <div className="flex flex-col min-w-0 flex-1">
                  <span
                    className={`text-sm font-medium leading-tight ${
                      isUnavailable
                        ? "text-muted-foreground line-through"
                        : "text-foreground"
                    }`}
                  >
                    {product.name}
                  </span>
                </div>
                <span className="text-muted-foreground text-xs shrink-0">
                  ${formatCUP(product.price)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
