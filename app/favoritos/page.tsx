"use client";

import { useSessionStore } from "@/stores/session-store";
import { getComboById, calculateComboTotal, getComboItemCount } from "@/lib/combos";
import { formatCUP, cupToUSD } from "@/lib/products";
import Link from "next/link";

export default function FavoritosPage() {
  const { hasHydrated, favoriteComboIds, toggleFavorite, savedCombos } =
    useSessionStore();

  if (!hasHydrated) {
    return <div className="flex flex-col flex-1 items-center justify-center min-h-dvh" />;
  }

  const favorites = favoriteComboIds
    .map((id) => {
      const premade = getComboById(id);
      if (premade) {
        const total = calculateComboTotal(premade.items);
        return { id, name: premade.name, total, count: getComboItemCount(premade.items) };
      }
      const saved = savedCombos.find((c) => c.id === id);
      if (saved) {
        const total = calculateComboTotal(saved.items);
        const count = saved.items.reduce((s, i) => s + i.quantity, 0);
        return { id, name: saved.name, total, count };
      }
      return null;
    })
    .filter(Boolean) as Array<{ id: string; name: string; total: number; count: number }>;

  return (
    <div className="flex flex-col min-h-dvh px-4 py-6 pb-24">
      <div className="w-full max-w-lg mx-auto">
        <h1 className="text-xl font-bold text-foreground mb-1">Tus favoritos</h1>
        <p className="text-muted-foreground text-xs mb-6">
          Los combos que guardaste para enviar de nuevo
        </p>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <span className="text-5xl">💝</span>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Todavia no guardaste ninguno.<br />
              Cuando encuentres el combo perfecto,<br />
              toca el corazon para guardarlo aqui.
            </p>
            <Link
              href="/"
              className="mt-3 px-5 py-2.5 bg-[#c2410c] text-white rounded-xl font-medium text-sm"
            >
              Explorar combos
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {favorites.map((fav) => (
              <div
                key={fav.id}
                className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-border shadow-sm"
              >
                <span className="text-2xl shrink-0">📦</span>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-foreground font-semibold text-sm leading-tight truncate">
                    {fav.name}
                  </span>
                  <span className="text-muted-foreground text-xs mt-0.5">
                    {fav.count} productos · ~${cupToUSD(fav.total)} USD
                  </span>
                </div>
                <Link
                  href={`/combo/${fav.id}`}
                  className="px-3 py-1.5 bg-[#c2410c] text-white rounded-lg text-xs font-medium shrink-0"
                >
                  Enviar
                </Link>
                <button
                  onClick={() => toggleFavorite(fav.id)}
                  className="p-1.5 text-red-400 cursor-pointer shrink-0 text-lg"
                >
                  ♥
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
