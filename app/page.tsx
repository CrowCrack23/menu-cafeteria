"use client";

import Link from "next/link";
import { combos, calculateComboTotal, getComboItemCount } from "@/lib/combos";
import { formatCUP } from "@/lib/products";

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh pb-24">
      {/* Hero */}
      <div className="bg-gradient-to-b from-[#c2410c] to-[#ea580c] px-4 pt-10 pb-8 text-white">
        <div className="w-full max-w-lg mx-auto">
          <p className="text-sm opacity-80 mb-1">CubaCombo</p>
          <h1 className="text-2xl font-bold leading-tight mb-2">
            Cuida a tu familia<br />desde cualquier parte del mundo
          </h1>
          <p className="text-sm opacity-80 leading-relaxed">
            Elige un combo con todo lo que necesitan, o arma uno a tu medida. Ellos reciben, tu descansas tranquilo.
          </p>
        </div>
      </div>

      <div className="px-4 -mt-4">
        <div className="w-full max-w-lg mx-auto">
          {/* Build your own CTA */}
          <Link
            href="/armar"
            className="flex items-center justify-between w-full p-4 mb-5 rounded-2xl bg-white border border-border shadow-sm"
          >
            <div>
              <span className="font-bold text-foreground text-base">Arma un combo especial</span>
              <p className="text-xs text-muted-foreground mt-0.5">
                Elige exactamente lo que tu familia necesita
              </p>
            </div>
            <span className="text-3xl">💝</span>
          </Link>

          {/* Combos list */}
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Combos listos para enviar
          </h2>

          <div className="flex flex-col gap-2.5">
            {combos.map((combo) => {
              const total = calculateComboTotal(combo.items);
              const itemCount = getComboItemCount(combo.items);

              return (
                <Link
                  key={combo.id}
                  href={`/combo/${combo.id}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-border active:scale-[0.98] transition-transform shadow-sm"
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
                      {itemCount} productos · ${formatCUP(total)} CUP
                    </span>
                  </div>
                  <span className="text-muted-foreground text-sm">→</span>
                </Link>
              );
            })}
          </div>

          {/* Footer message */}
          <p className="text-center text-xs text-muted-foreground mt-6 leading-relaxed">
            Cada combo es una forma de decir<br />
            <span className="font-medium text-foreground">&ldquo;estoy aqui para ti&rdquo;</span>
          </p>
        </div>
      </div>
    </div>
  );
}
