"use client";

import { useSessionStore } from "@/stores/session-store";
import { getComboById } from "@/lib/combo-lookup";
import { getMoodById } from "@/lib/moods";
import { getComboTotal } from "@/lib/prices";
import Link from "next/link";

export default function FavoritosPage() {
  const { hasHydrated, favoriteComboIds, toggleFavorite } = useSessionStore();

  if (!hasHydrated) {
    return <div className="flex flex-col flex-1 items-center justify-center min-h-dvh" />;
  }

  const favorites = favoriteComboIds
    .map((id) => {
      const combo = getComboById(id);
      if (!combo) return null;
      const mood = getMoodById(combo.moodId);
      return { combo, mood };
    })
    .filter(Boolean) as Array<{ combo: NonNullable<ReturnType<typeof getComboById>>; mood: NonNullable<ReturnType<typeof getMoodById>> }>;

  return (
    <div className="flex flex-col min-h-dvh px-4 py-8 pb-24">
      <div className="w-full max-w-lg mx-auto">
        <h1 className="text-xl font-bold text-foreground mb-6">Favoritos</h1>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <span className="text-4xl">♡</span>
            <p className="text-muted-foreground text-sm">
              Aun no tienes favoritos. Marca un combo con el corazon para guardarlo aqui.
            </p>
            <Link
              href="/"
              className="mt-2 px-5 py-2.5 bg-foreground text-primary-foreground rounded-xl font-medium text-sm"
            >
              Buscar combos
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {favorites.map(({ combo, mood }) => (
              <div
                key={combo.id}
                className="flex items-center gap-3 p-4 rounded-xl bg-white border border-border"
              >
                <span className="text-3xl shrink-0">{mood.emoji}</span>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-foreground font-semibold text-sm leading-tight truncate">
                    {combo.name}
                  </span>
                  <span className="text-muted-foreground text-xs leading-tight">
                    {combo.items.length} items · ${getComboTotal(combo.items)} CUP
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/combo?mood=${combo.moodId}&id=${combo.id}`}
                    className="px-3 py-1.5 bg-foreground text-primary-foreground rounded-lg text-xs font-medium"
                  >
                    Ver
                  </Link>
                  <button
                    onClick={() => toggleFavorite(combo.id)}
                    className="p-1.5 text-red-400 cursor-pointer"
                  >
                    ♥
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
