import { comboDatasets } from "./combo-datasets";
import type { Combo } from "./combo-datasets";

export function getComboForMood(moodId: string, index: number): Combo | null {
  const pool = comboDatasets[moodId];
  if (!pool || pool.length === 0) return null;
  return pool[index % pool.length];
}

export function getComboPoolSize(moodId: string): number {
  return comboDatasets[moodId]?.length ?? 0;
}

export function isMoodValid(moodId: string): boolean {
  return moodId in comboDatasets;
}
