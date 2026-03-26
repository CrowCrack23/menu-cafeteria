import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ComboItem } from "@/lib/combos";

interface HistoryEntry {
  comboId: string; // pre-made combo ID or custom combo ID
  timestamp: number;
}

interface SavedCombo {
  id: string;
  name: string;
  items: ComboItem[];
  createdAt: number;
}

interface SessionState {
  hasHydrated: boolean;
  favoriteComboIds: string[];
  comboHistory: HistoryEntry[];
  savedCombos: SavedCombo[];
}

interface SessionActions {
  setHasHydrated: (hydrated: boolean) => void;
  toggleFavorite: (comboId: string) => void;
  isFavorite: (comboId: string) => boolean;
  addToHistory: (comboId: string) => void;
  clearHistory: () => void;
  saveCustomCombo: (name: string, items: ComboItem[]) => string;
  deleteCustomCombo: (id: string) => void;
  getSavedCombo: (id: string) => SavedCombo | undefined;
}

const MAX_HISTORY = 20;

export type { SavedCombo, HistoryEntry };

export const useSessionStore = create<SessionState & SessionActions>()(
  persist(
    (set, get) => ({
      hasHydrated: false,
      favoriteComboIds: [],
      comboHistory: [],
      savedCombos: [],

      setHasHydrated: (hydrated: boolean) => {
        set({ hasHydrated: hydrated });
      },

      toggleFavorite: (comboId: string) => {
        const state = get();
        const ids = state.favoriteComboIds;
        if (ids.includes(comboId)) {
          set({ favoriteComboIds: ids.filter((id) => id !== comboId) });
        } else {
          set({ favoriteComboIds: [...ids, comboId] });
        }
      },

      isFavorite: (comboId: string) => {
        return get().favoriteComboIds.includes(comboId);
      },

      addToHistory: (comboId: string) => {
        const state = get();
        const filtered = state.comboHistory.filter((e) => e.comboId !== comboId);
        const entry: HistoryEntry = { comboId, timestamp: Date.now() };
        const next = [entry, ...filtered].slice(0, MAX_HISTORY);
        set({ comboHistory: next });
      },

      clearHistory: () => {
        set({ comboHistory: [] });
      },

      saveCustomCombo: (name: string, items: ComboItem[]) => {
        const id = `custom-${Date.now()}`;
        const saved: SavedCombo = { id, name, items, createdAt: Date.now() };
        set({ savedCombos: [...get().savedCombos, saved] });
        return id;
      },

      deleteCustomCombo: (id: string) => {
        const state = get();
        set({
          savedCombos: state.savedCombos.filter((c) => c.id !== id),
          favoriteComboIds: state.favoriteComboIds.filter((fid) => fid !== id),
        });
      },

      getSavedCombo: (id: string) => {
        return get().savedCombos.find((c) => c.id === id);
      },
    }),
    {
      name: "session-storage",
      partialize: (state) => ({
        favoriteComboIds: state.favoriteComboIds,
        comboHistory: state.comboHistory,
        savedCombos: state.savedCombos,
      }),
      storage: {
        getItem: (name) => {
          try {
            const value = localStorage.getItem(name);
            return value ? JSON.parse(value) : null;
          } catch {
            return null;
          }
        },
        setItem: (name, value) => {
          try {
            localStorage.setItem(name, JSON.stringify(value));
          } catch {
            // degrade silently
          }
        },
        removeItem: (name) => {
          try {
            localStorage.removeItem(name);
          } catch {
            // degrade silently
          }
        },
      },
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
