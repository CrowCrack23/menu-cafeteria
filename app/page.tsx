"use client";

import Link from "next/link";
import { combos, calculateComboTotal, getComboItemCount } from "@/lib/combos";
import { formatCUP } from "@/lib/products";

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh px-4 py-6 pb-24">
      <div className="w-full max-w-lg mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Mi Combo</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Elige un combo o arma el tuyo
          </p>
        </div>

        {/* Build your own CTA */}
        <Link
          href="/armar"
          className="flex items-center justify-between w-full p-4 mb-4 rounded-xl bg-foreground text-primary-foreground"
        >
          <div>
            <span className="font-bold text-base">Arma tu combo</span>
            <p className="text-xs opacity-70 mt-0.5">Elige los productos que necesitas</p>
          </div>
          <span className="text-2xl">🛒</span>
        </Link>

        {/* Combos list */}
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
          Combos disponibles
        </h2>

        <div className="flex flex-col gap-2.5">
          {combos.map((combo) => {
            const total = calculateComboTotal(combo.items);
            const itemCount = getComboItemCount(combo.items);

            return (
              <Link
                key={combo.id}
                href={`/combo/${combo.id}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-white border border-border active:scale-[0.98] transition-transform"
              >
                <div className="flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-secondary shrink-0">
                  <span className="text-lg font-bold text-foreground">${combo.priceUSD}</span>
                  <span className="text-[10px] text-muted-foreground">USD</span>
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-foreground font-semibold text-sm leading-tight">
                    {combo.name}
                  </span>
                  <span className="text-muted-foreground text-xs mt-0.5">
                    {itemCount} productos · ${formatCUP(total)} CUP
                  </span>
                </div>
                <span className="text-muted-foreground text-sm">→</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
