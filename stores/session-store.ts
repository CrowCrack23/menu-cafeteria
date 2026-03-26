import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getTodayDateString, getYesterdayDateString } from "@/lib/time-utils";

interface HistoryEntry {
  comboId: string;
  moodId: string;
  timestamp: number;
}

interface SessionState {
  streakCount: number;
  lastVisitDate: string | null;
  lastMood: string | null;
  totalVisits: number;
  hasHydrated: boolean;
  comboIndices: Record<string, number>;
  lastCombo: { moodId: string; comboId: string } | null;
  favoriteComboIds: string[];
  comboHistory: HistoryEntry[];
}

interface SessionActions {
  updateStreak: () => {
    isFirstVisit: boolean;
    isMilestone: boolean;
    streakBroken: boolean;
  };
  setLastMood: (moodId: string) => void;
  setHasHydrated: (hydrated: boolean) => void;
  getNextComboIndex: (moodId: string) => number;
  setLastCombo: (moodId: string, comboId: string) => void;
  toggleFavorite: (comboId: string) => void;
  isFavorite: (comboId: string) => boolean;
  addToHistory: (comboId: string, moodId: string) => void;
  clearHistory: () => void;
}

const MILESTONE_DAYS = [5, 10, 30];
const MAX_HISTORY = 20;

export const useSessionStore = create<SessionState & SessionActions>()(
  persist(
    (set, get) => ({
      streakCount: 0,
      lastVisitDate: null,
      lastMood: null,
      totalVisits: 0,
      hasHydrated: false,
      comboIndices: {},
      lastCombo: null,
      favoriteComboIds: [],
      comboHistory: [],

      setHasHydrated: (hydrated: boolean) => {
        set({ hasHydrated: hydrated });
      },

      updateStreak: () => {
        const state = get();
        const today = getTodayDateString();
        const yesterday = getYesterdayDateString();

        if (state.lastVisitDate === null) {
          set({
            streakCount: 1,
            lastVisitDate: today,
            totalVisits: 1,
          });
          return { isFirstVisit: true, isMilestone: false, streakBroken: false };
        }

        if (state.lastVisitDate === today) {
          set({ totalVisits: state.totalVisits + 1 });
          return {
            isFirstVisit: false,
            isMilestone: MILESTONE_DAYS.includes(state.streakCount),
            streakBroken: false,
          };
        }

        if (state.lastVisitDate === yesterday) {
          const newStreak = state.streakCount + 1;
          set({
            streakCount: newStreak,
            lastVisitDate: today,
            totalVisits: state.totalVisits + 1,
          });
          return {
            isFirstVisit: false,
            isMilestone: MILESTONE_DAYS.includes(newStreak),
            streakBroken: false,
          };
        }

        set({
          streakCount: 1,
          lastVisitDate: today,
          totalVisits: state.totalVisits + 1,
        });
        return { isFirstVisit: false, isMilestone: false, streakBroken: true };
      },

      setLastMood: (moodId: string) => {
        set({ lastMood: moodId });
      },

      getNextComboIndex: (moodId: string) => {
        const state = get();
        const current = state.comboIndices[moodId] ?? 0;
        set({
          comboIndices: { ...state.comboIndices, [moodId]: current + 1 },
        });
        return current;
      },

      setLastCombo: (moodId: string, comboId: string) => {
        set({ lastCombo: { moodId, comboId } });
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

      addToHistory: (comboId: string, moodId: string) => {
        const state = get();
        const filtered = state.comboHistory.filter((e) => e.comboId !== comboId);
        const entry: HistoryEntry = { comboId, moodId, timestamp: Date.now() };
        const next = [entry, ...filtered].slice(0, MAX_HISTORY);
        set({ comboHistory: next });
      },

      clearHistory: () => {
        set({ comboHistory: [] });
      },
    }),
    {
      name: "session-storage",
      partialize: (state) => ({
        streakCount: state.streakCount,
        lastVisitDate: state.lastVisitDate,
        lastMood: state.lastMood,
        totalVisits: state.totalVisits,
        comboIndices: state.comboIndices,
        lastCombo: state.lastCombo,
        favoriteComboIds: state.favoriteComboIds,
        comboHistory: state.comboHistory,
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
            // localStorage unavailable (incognito, quota exceeded) — degrade silently
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
