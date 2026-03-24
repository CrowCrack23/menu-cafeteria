import type { FoodItem } from "./combo-datasets";

function djb2Hash(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return hash >>> 0;
}

export function calculateMatchScore(
  items: FoodItem[],
  moodId: string,
): number {
  const key = [...items.map((i) => i.name).sort(), moodId].join("|");
  const hash = djb2Hash(key);
  return (hash % 29) + 70; // Range: 70-98
}
