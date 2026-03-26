"use client";

import { useState } from "react";
import type { Combo } from "@/lib/combo-datasets";
import type { Mood } from "@/lib/moods";
import { getItemPrice, getComboTotal } from "@/lib/prices";
import { shareCombo } from "@/lib/share-utils";

interface ShareCardProps {
  combo: Combo;
  mood: Mood;
  onClose: () => void;
}

export function ShareCard({ combo, mood, onClose }: ShareCardProps) {
  const [toast, setToast] = useState<string | null>(null);
  const total = getComboTotal(combo.items);

  const handleShare = async () => {
    const result = await shareCombo(combo);
    if (result === "copied") {
      setToast("Copiado!");
      setTimeout(() => setToast(null), 2000);
    } else if (result === "failed") {
      setToast("No se pudo compartir");
      setTimeout(() => setToast(null), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div
        className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center gap-3 p-6">
          <span className="text-4xl">{mood.emoji}</span>
          <h2 className="text-lg font-bold text-foreground text-center">
            {combo.name}
          </h2>
          <p className="text-muted-foreground text-xs italic text-center">
            &ldquo;{combo.message}&rdquo;
          </p>

          <div className="flex flex-col gap-1.5 w-full mt-2">
            {combo.items.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <span className="text-lg">{item.emoji}</span>
                <span className="font-medium text-foreground flex-1">{item.name}</span>
                <span className="text-muted-foreground text-xs">${getItemPrice(item.name)}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between w-full mt-2 pt-2 border-t border-border">
            <span className="font-bold text-foreground">Total: ${total} CUP</span>
            <div className="flex items-center gap-1.5 text-sm">
              <span className="font-bold text-foreground">{combo.matchScore}%</span>
              <span className="text-muted-foreground text-xs uppercase">match</span>
            </div>
          </div>

          <div className="w-full pt-2 mt-1 border-t border-border">
            <p className="text-muted-foreground text-xs text-center">Mi Combo</p>
          </div>
        </div>

        <div className="flex gap-2 p-4 pt-0">
          <button
            onClick={handleShare}
            className="flex-1 py-2.5 min-h-[44px] rounded-xl bg-foreground text-primary-foreground font-semibold text-sm cursor-pointer active:scale-[0.97] transition-transform"
          >
            Compartir
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 min-h-[44px] rounded-xl bg-secondary text-foreground text-sm cursor-pointer active:scale-[0.97] transition-transform"
          >
            Cerrar
          </button>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 px-5 py-2.5 bg-foreground text-primary-foreground rounded-full text-sm font-medium shadow-lg z-60">
          {toast}
        </div>
      )}
    </div>
  );
}
