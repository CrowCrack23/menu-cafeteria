import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MenuState {
  unavailableItems: string[];
  lastUpdated: string | null;
  hasHydrated: boolean;
}

interface MenuActions {
  toggleAvailability: (itemName: string) => void;
  isAvailable: (itemName: string) => boolean;
  resetAll: () => void;
  setHasHydrated: (h: boolean) => void;
}

export const useMenuStore = create<MenuState & MenuActions>()(
  persist(
    (set, get) => ({
      unavailableItems: [],
      lastUpdated: null,
      hasHydrated: false,

      setHasHydrated: (h: boolean) => {
        set({ hasHydrated: h });
      },

      toggleAvailability: (itemName: string) => {
        const state = get();
        const items = state.unavailableItems;
        const next = items.includes(itemName)
          ? items.filter((n) => n !== itemName)
          : [...items, itemName];
        set({
          unavailableItems: next,
          lastUpdated: new Date().toISOString(),
        });
      },

      isAvailable: (itemName: string) => {
        return !get().unavailableItems.includes(itemName);
      },

      resetAll: () => {
        set({
          unavailableItems: [],
          lastUpdated: new Date().toISOString(),
        });
      },
    }),
    {
      name: "menu-storage",
      partialize: (state) => ({
        unavailableItems: state.unavailableItems,
        lastUpdated: state.lastUpdated,
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
            // localStorage unavailable — degrade silently
          }
        },
        removeItem: (name) => {
          try {
            localStorage.removeItem(name);
          } catch {
            // localStorage unavailable — degrade silently
          }
        },
      },
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
