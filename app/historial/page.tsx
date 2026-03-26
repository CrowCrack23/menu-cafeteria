"use client";

import { useSessionStore } from "@/stores/session-store";
import { getComboById } from "@/lib/combo-lookup";
import { getMoodById } from "@/lib/moods";
import { getComboTotal } from "@/lib/prices";
import Link from "next/link";

function formatTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Ahora mismo";
  if (minutes < 60) return `Hace ${minutes} min`;
  if (hours < 24) return `Hace ${hours}h`;
  if (days === 1) return "Ayer";
  if (days < 7) return `Hace ${days} dias`;
  return new Date(timestamp).toLocaleDateString("es-CU", {
    day: "numeric",
    month: "short",
  });
}

export default function HistorialPage() {
  const { hasHydrated, comboHistory, clearHistory } = useSessionStore();

  if (!hasHydrated) {
    return <div className="flex flex-col flex-1 items-center justify-center min-h-dvh" />;
  }

  const entries = comboHistory
    .map((entry) => {
      const combo = getComboById(entry.comboId);
      if (!combo) return null;
      const mood = getMoodById(entry.moodId);
      return { ...entry, combo, mood };
    })
    .filter(Boolean) as Array<{
      comboId: string;
      moodId: string;
      timestamp: number;
      combo: NonNullable<ReturnType<typeof getComboById>>;
      mood: NonNullable<ReturnType<typeof getMoodById>>;
    }>;

  return (
    <div className="flex flex-col min-h-dvh px-4 py-8 pb-24">
      <div className="w-full max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-foreground">Historial</h1>
          {entries.length > 0 && (
            <button
              onClick={clearHistory}
              className="text-xs text-muted-foreground cursor-pointer"
            >
              Borrar todo
            </button>
          )}
        </div>

        {entries.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <span className="text-4xl">📋</span>
            <p className="text-muted-foreground text-sm">
              Tu historial esta vacio. Los combos que veas apareceran aqui.
            </p>
            <Link
              href="/"
              className="mt-2 px-5 py-2.5 bg-foreground text-primary-foreground rounded-xl font-medium text-sm"
            >
              Buscar combos
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {entries.map((entry) => (
              <Link
                key={`${entry.comboId}-${entry.timestamp}`}
                href={`/combo?mood=${entry.moodId}&id=${entry.comboId}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-white border border-border"
              >
                <span className="text-2xl shrink-0">{entry.mood.emoji}</span>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-foreground font-semibold text-sm leading-tight truncate">
                    {entry.combo.name}
                  </span>
                  <span className="text-muted-foreground text-xs leading-tight">
                    {entry.combo.items.length} items · ${getComboTotal(entry.combo.items)} CUP
                  </span>
                </div>
                <span className="text-muted-foreground text-xs shrink-0">
                  {formatTime(entry.timestamp)}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
