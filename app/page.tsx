"use client";

import Link from "next/link";
import { combos, calculateComboTotal, getComboItemCount, getComboEmojis } from "@/lib/combos";
import { formatCUP, cupToUSD } from "@/lib/products";

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh pb-24">
      {/* Compact hero */}
      <div className="bg-gradient-to-b from-[#c2410c] to-[#ea580c] px-4 pt-8 pb-6 text-white">
        <div className="w-full max-w-lg mx-auto">
          <h1 className="text-xl font-bold leading-tight mb-1">
            Cuida a tu familia desde lejos
          </h1>
          <p className="text-xs opacity-80">
            Elige un combo o arma uno a tu medida. Ellos reciben, tu descansas.
          </p>
        </div>
      </div>

      <div className="px-4 -mt-3">
        <div className="w-full max-w-lg mx-auto">
          {/* Build your own CTA */}
          <Link
            href="/armar"
            className="flex items-center justify-between w-full p-4 mb-5 rounded-2xl bg-white border border-border shadow-sm"
          >
            <div>
              <span className="font-bold text-foreground text-sm">Arma un combo especial</span>
              <p className="text-xs text-muted-foreground mt-0.5">
                Elige exactamente lo que necesitan
              </p>
            </div>
            <span className="text-2xl">💝</span>
          </Link>

          {/* Combos list */}
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Combos listos para enviar
          </h2>

          <div className="flex flex-col gap-2.5">
            {combos.map((combo) => {
              const total = calculateComboTotal(combo.items);
              const itemCount = getComboItemCount(combo.items);
              const emojis = getComboEmojis(combo.items, 5);
              const savings = total - combo.priceUSD * 490;

              return (
                <Link
                  key={combo.id}
                  href={`/combo/${combo.id}`}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-border active:scale-[0.98] transition-transform shadow-sm"
                >
                  <div className="flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-secondary shrink-0">
                    <span className="text-lg font-bold text-[#c2410c]">${combo.priceUSD}</span>
                    <span className="text-[10px] text-muted-foreground">USD</span>
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-foreground font-semibold text-sm leading-tight">
                      {combo.name}
                    </span>
                    <span className="text-muted-foreground text-xs mt-0.5">
                      {combo.description}
                    </span>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-sm tracking-tight">
                        {emojis.join("")}
                      </span>
                      <span className="text-muted-foreground text-[10px]">
                        {itemCount} prod.
                      </span>
                      {savings > 0 && (
                        <span className="text-[10px] font-medium text-green-700 bg-green-50 px-1.5 py-0.5 rounded-full">
                          Ahorras ${formatCUP(savings)}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-muted-foreground text-sm mt-1">→</span>
                </Link>
              );
            })}
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-muted-foreground mt-6 leading-relaxed">
            Cada combo es una forma de decir<br />
            <span className="font-medium text-foreground">&ldquo;estoy aqui para ti&rdquo;</span>
          </p>
        </div>
      </div>
    </div>
  );
}
