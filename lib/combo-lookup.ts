import { comboDatasets } from "./combo-datasets";
import type { Combo } from "./combo-datasets";

let comboMap: Map<string, Combo> | null = null;

function buildMap(): Map<string, Combo> {
  const map = new Map<string, Combo>();
  for (const combos of Object.values(comboDatasets)) {
    for (const combo of combos) {
      map.set(combo.id, combo);
    }
  }
  return map;
}

export function getComboById(comboId: string): Combo | null {
  if (!comboMap) {
    comboMap = buildMap();
  }
  return comboMap.get(comboId) ?? null;
}
