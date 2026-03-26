"use client";

import { useSessionStore } from "@/stores/session-store";
import { getComboById, calculateComboTotal, getComboItemCount } from "@/lib/combos";
import { formatCUP, cupToUSD } from "@/lib/products";
import Link from "next/link";

function formatTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Ahora";
  if (minutes < 60) return `${minutes} min`;
  if (hours < 24) return `${hours}h`;
  if (days === 1) return "Ayer";
  if (days < 7) return `${days}d`;
  return new Date(timestamp).toLocaleDateString("es-CU", {
    day: "numeric",
    month: "short",
  });
}

export default function HistorialPage() {
  const { hasHydrated, comboHistory, clearHistory, savedCombos } =
    useSessionStore();

  if (!hasHydrated) {
    return <div className="flex flex-col flex-1 items-center justify-center min-h-dvh" />;
  }

  const entries = comboHistory
    .map((entry) => {
      const premade = getComboById(entry.comboId);
      if (premade) {
        const total = calculateComboTotal(premade.items);
        return {
          ...entry,
          name: premade.name,
          total,
          count: getComboItemCount(premade.items),
        };
      }
      const saved = savedCombos.find((c) => c.id === entry.comboId);
      if (saved) {
        const total = calculateComboTotal(saved.items);
        const count = saved.items.reduce((s, i) => s + i.quantity, 0);
        return { ...entry, name: saved.name, total, count };
      }
      return null;
    })
    .filter(Boolean) as Array<{
      comboId: string;
      timestamp: number;
      name: string;
      total: number;
      count: number;
    }>;

  return (
    <div className="flex flex-col min-h-dvh px-4 py-6 pb-24">
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
              Tu historial esta vacio.
            </p>
            <Link
              href="/"
              className="mt-2 px-5 py-2.5 bg-foreground text-primary-foreground rounded-xl font-medium text-sm"
            >
              Ver combos
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {entries.map((entry) => (
              <Link
                key={`${entry.comboId}-${entry.timestamp}`}
                href={`/combo/${entry.comboId}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-white border border-border"
              >
                <span className="text-2xl shrink-0">📦</span>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-foreground font-semibold text-sm leading-tight truncate">
                    {entry.name}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {entry.count} prod. · ${formatCUP(entry.total)} CUP · ~${cupToUSD(entry.total)} USD
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
