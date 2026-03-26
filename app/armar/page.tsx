"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  products,
  categoryLabels,
  categoryOrder,
  getProductsByCategory,
  formatCUP,
  cupToUSD,
  type Category,
} from "@/lib/products";
import type { ComboItem } from "@/lib/combos";
import { calculateComboTotal } from "@/lib/combos";
import { useSessionStore } from "@/stores/session-store";
import { useMenuStore } from "@/stores/menu-store";
import { shareCombo } from "@/lib/share-utils";

export default function ArmarPage() {
  const router = useRouter();
  const { hasHydrated, saveCustomCombo } = useSessionStore();
  const { hasHydrated: menuHydrated, unavailableItems } = useMenuStore();
  const unavailableSet = new Set(unavailableItems);

  const [items, setItems] = useState<ComboItem[]>([]);
  const [activeTab, setActiveTab] = useState<Category>("basicos");
  const [toast, setToast] = useState<string | null>(null);

  const total = calculateComboTotal(items);
  const itemMap = new Map(items.map((i) => [i.productId, i.quantity]));

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  }, []);

  const handleQuantityChange = useCallback(
    (productId: string, delta: number) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.productId === productId);
        if (existing) {
          const newQty = existing.quantity + delta;
          if (newQty <= 0) {
            return prev.filter((i) => i.productId !== productId);
          }
          return prev.map((i) =>
            i.productId === productId ? { ...i, quantity: newQty } : i,
          );
        }
        if (delta > 0) {
          return [...prev, { productId, quantity: delta }];
        }
        return prev;
      });
    },
    [],
  );

  const handleSave = useCallback(() => {
    if (items.length === 0) return;
    const id = saveCustomCombo("Mi combo personalizado", items);
    showToast("Combo guardado!");
    router.push(`/combo/${id}`);
  }, [items, saveCustomCombo, showToast, router]);

  const handleShare = useCallback(async () => {
    const result = await shareCombo("Mi combo personalizado", items);
    if (result === "copied") showToast("Copiado!");
    else if (result === "failed") showToast("No se pudo compartir");
  }, [items, showToast]);

  if (!hasHydrated || !menuHydrated) {
    return <div className="flex flex-col flex-1 items-center justify-center min-h-dvh" />;
  }

  const categoryProducts = getProductsByCategory(activeTab);

  return (
    <div className="flex flex-col min-h-dvh px-4 py-6 pb-40">
      <div className="w-full max-w-lg mx-auto">
        {/* Back */}
        <Link href="/" className="text-muted-foreground text-sm mb-4 inline-block">
          ← Volver
        </Link>

        <h1 className="text-xl font-bold text-foreground mb-1">Arma tu combo</h1>
        <p className="text-muted-foreground text-sm mb-5">
          Agrega los productos que necesitas
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

        {/* Products */}
        <div className="flex flex-col gap-1.5">
          {categoryProducts.map((product) => {
            const qty = itemMap.get(product.id) ?? 0;
            const isUnavailable = unavailableSet.has(product.name);

            return (
              <div
                key={product.id}
                className={`flex items-center gap-3 p-3 rounded-xl bg-white border border-border ${
                  isUnavailable ? "opacity-40" : ""
                }`}
              >
                <span className="text-2xl shrink-0">{product.emoji}</span>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-foreground font-semibold text-sm leading-tight">
                    {product.name}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    ${formatCUP(product.price)} CUP
                  </span>
                  {isUnavailable && (
                    <span className="text-red-500 text-xs font-medium">No disponible</span>
                  )}
                </div>

                {!isUnavailable && (
                  <div className="flex items-center gap-2 shrink-0">
                    {qty > 0 && (
                      <button
                        onClick={() => handleQuantityChange(product.id, -1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary text-foreground font-bold cursor-pointer"
                      >
                        −
                      </button>
                    )}
                    {qty > 0 && (
                      <span className="text-foreground font-bold text-sm w-5 text-center">
                        {qty}
                      </span>
                    )}
                    <button
                      onClick={() => handleQuantityChange(product.id, 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-foreground text-primary-foreground font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating bottom bar */}
      {items.length > 0 && (
        <div className="fixed bottom-16 inset-x-0 z-30 px-4 pb-2">
          <div className="w-full max-w-lg mx-auto bg-white border border-border rounded-xl shadow-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                {items.reduce((s, i) => s + i.quantity, 0)} productos
              </span>
              <div className="text-right">
                <span className="text-foreground font-bold">${formatCUP(total)} CUP</span>
                <span className="text-muted-foreground text-xs ml-1.5">~${cupToUSD(total)} USD</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex-1 py-2.5 rounded-xl bg-foreground text-primary-foreground font-semibold text-sm cursor-pointer active:scale-[0.97] transition-transform"
              >
                Guardar
              </button>
              <button
                onClick={handleShare}
                className="px-4 py-2.5 rounded-xl bg-secondary text-foreground text-sm font-medium cursor-pointer active:scale-[0.97] transition-transform"
              >
                Compartir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-36 left-1/2 -translate-x-1/2 px-5 py-2.5 bg-foreground text-primary-foreground rounded-full text-sm font-medium shadow-lg z-60">
          {toast}
        </div>
      )}
    </div>
  );
}
