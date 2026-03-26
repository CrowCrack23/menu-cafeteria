"use client";

import { use, useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  getComboById,
  calculateComboTotal,
  resolveComboItems,
} from "@/lib/combos";
import type { ComboItem } from "@/lib/combos";
import { formatCUP, cupToUSD, getProductById } from "@/lib/products";
import { useSessionStore } from "@/stores/session-store";
import { useMenuStore } from "@/stores/menu-store";
import { shareCombo } from "@/lib/share-utils";

export default function ComboDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { hasHydrated, toggleFavorite, isFavorite, addToHistory, saveCustomCombo } =
    useSessionStore();
  const { hasHydrated: menuHydrated, unavailableItems } = useMenuStore();

  const combo = getComboById(id);
  const savedCombo = useSessionStore((s) => s.getSavedCombo(id));

  const source = combo
    ? { name: combo.name, items: combo.items, priceUSD: combo.priceUSD }
    : savedCombo
      ? { name: savedCombo.name, items: savedCombo.items, priceUSD: null }
      : null;

  const [editItems, setEditItems] = useState<ComboItem[] | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const isEditing = editItems !== null;
  const currentItems = editItems ?? source?.items ?? [];
  const total = calculateComboTotal(currentItems);
  const resolved = resolveComboItems(currentItems);
  const unavailableSet = new Set(unavailableItems);
  const hasUnavailable = resolved.some((r) => unavailableSet.has(r.product.name));

  // Track view in history
  useEffect(() => {
    if (hasHydrated && source) {
      addToHistory(id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasHydrated, id]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  }, []);

  const handleQuantityChange = useCallback(
    (productId: string, delta: number) => {
      const items = editItems ?? [...(source?.items ?? [])];
      const existing = items.find((i) => i.productId === productId);

      let next: ComboItem[];
      if (existing) {
        const newQty = existing.quantity + delta;
        if (newQty <= 0) {
          next = items.filter((i) => i.productId !== productId);
        } else {
          next = items.map((i) =>
            i.productId === productId ? { ...i, quantity: newQty } : i,
          );
        }
      } else if (delta > 0) {
        next = [...items, { productId, quantity: delta }];
      } else {
        return;
      }

      setEditItems(next);
    },
    [editItems, source],
  );

  const handleSave = useCallback(() => {
    if (!editItems) return;
    const name = source?.name ? `Mi ${source.name}` : "Mi combo";
    const newId = saveCustomCombo(name, editItems);
    showToast("Combo guardado!");
    router.push(`/combo/${newId}`);
  }, [editItems, source, saveCustomCombo, showToast, router]);

  const handleShare = useCallback(async () => {
    const name = source?.name ?? "Mi combo";
    const result = await shareCombo(name, currentItems);
    if (result === "copied") showToast("Copiado!");
    else if (result === "failed") showToast("No se pudo compartir");
  }, [source, currentItems, showToast]);

  if (!hasHydrated || !menuHydrated) {
    return <div className="flex flex-col flex-1 items-center justify-center min-h-dvh" />;
  }

  if (!source) {
    return (
      <div className="flex flex-col items-center justify-center min-h-dvh gap-4 px-4 pb-20">
        <span className="text-4xl">🤔</span>
        <p className="text-lg text-center text-foreground">
          No encontramos este combo.
        </p>
        <Link
          href="/"
          className="mt-4 px-6 py-3 bg-foreground text-primary-foreground rounded-xl font-medium text-sm"
        >
          Ir al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-dvh px-4 py-6 pb-24">
      <div className="w-full max-w-lg mx-auto">
        {/* Back */}
        <Link href="/" className="text-muted-foreground text-sm mb-4 inline-block">
          ← Volver
        </Link>

        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-xl font-bold text-foreground">{source.name}</h1>
          <button
            onClick={() => toggleFavorite(id)}
            className={`text-xl cursor-pointer p-1 ${
              isFavorite(id) ? "text-red-500" : "text-muted-foreground"
            }`}
          >
            {isFavorite(id) ? "♥" : "♡"}
          </button>
        </div>

        {/* Price summary */}
        <div className="flex items-baseline gap-2 mb-5">
          <span className="text-2xl font-bold text-foreground">
            ${formatCUP(total)} CUP
          </span>
          <span className="text-sm text-muted-foreground">
            ~${cupToUSD(total)} USD
          </span>
          {source.priceUSD && !isEditing && (
            <span className="ml-auto px-2 py-0.5 rounded-full bg-secondary text-xs text-muted-foreground">
              Precio fijo: ${source.priceUSD} USD
            </span>
          )}
        </div>

        {/* Unavailability warning */}
        {hasUnavailable && (
          <div className="flex items-center gap-2 w-full px-3 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm mb-4">
            <span>⚠️</span>
            <span>Algunos productos no estan disponibles</span>
          </div>
        )}

        {/* Items */}
        <div className="flex flex-col gap-1.5 mb-6">
          {resolved.map(({ product, quantity }) => {
            const isUnavailable = unavailableSet.has(product.name);
            return (
              <div
                key={product.id}
                className={`flex items-center gap-3 p-3 rounded-xl bg-white border border-border ${
                  isUnavailable ? "opacity-50" : ""
                }`}
              >
                <span className="text-2xl shrink-0">{product.emoji}</span>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className={`text-foreground font-semibold text-sm leading-tight ${isUnavailable ? "line-through" : ""}`}>
                    {product.name}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    ${formatCUP(product.price)} c/u
                  </span>
                  {isUnavailable && (
                    <span className="text-red-500 text-xs font-medium">No disponible</span>
                  )}
                </div>

                {/* Quantity controls */}
                <div className="flex items-center gap-2 shrink-0">
                  {isEditing && (
                    <button
                      onClick={() => handleQuantityChange(product.id, -1)}
                      className="w-7 h-7 flex items-center justify-center rounded-full bg-secondary text-foreground text-sm font-bold cursor-pointer"
                    >
                      −
                    </button>
                  )}
                  <span className="text-foreground font-bold text-sm w-5 text-center">
                    {quantity}
                  </span>
                  {isEditing && (
                    <button
                      onClick={() => handleQuantityChange(product.id, 1)}
                      className="w-7 h-7 flex items-center justify-center rounded-full bg-secondary text-foreground text-sm font-bold cursor-pointer"
                    >
                      +
                    </button>
                  )}
                </div>

                <span className="text-foreground font-semibold text-sm shrink-0 w-16 text-right">
                  ${formatCUP(product.price * quantity)}
                </span>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2.5">
          {!isEditing ? (
            <>
              <button
                onClick={() => setEditItems([...(source.items)])}
                className="w-full py-3 min-h-[48px] rounded-xl bg-foreground text-primary-foreground font-semibold text-sm cursor-pointer active:scale-[0.97] transition-transform"
              >
                Personalizar
              </button>
              <button
                onClick={handleShare}
                className="w-full py-3 min-h-[48px] rounded-xl bg-white border border-border text-foreground font-medium text-sm cursor-pointer active:scale-[0.97] transition-transform"
              >
                Compartir
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSave}
                disabled={currentItems.length === 0}
                className="w-full py-3 min-h-[48px] rounded-xl bg-foreground text-primary-foreground font-semibold text-sm cursor-pointer active:scale-[0.97] transition-transform disabled:opacity-40"
              >
                Guardar mi combo
              </button>
              <button
                onClick={() => setEditItems(null)}
                className="w-full py-3 min-h-[48px] rounded-xl bg-white border border-border text-foreground font-medium text-sm cursor-pointer active:scale-[0.97] transition-transform"
              >
                Cancelar
              </button>
            </>
          )}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 px-5 py-2.5 bg-foreground text-primary-foreground rounded-full text-sm font-medium shadow-lg z-60">
          {toast}
        </div>
      )}
    </div>
  );
}
