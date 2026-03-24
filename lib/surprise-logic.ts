import { moods } from "./moods";
import type { Mood, TimePeriod } from "./moods";
import { getTimePeriod } from "./time-utils";

export function selectSurpriseMood(
  lastMoodId: string | null,
  timePeriod?: TimePeriod,
): Mood {
  const period = timePeriod ?? getTimePeriod();

  const candidates = lastMoodId
    ? moods.filter((m) => m.id !== lastMoodId)
    : moods;

  const weights = candidates.map((m) => m.timeWeights[period]);
  const totalWeight = weights.reduce((sum, w) => sum + w, 0);

  let random = Math.random() * totalWeight;

  for (let i = 0; i < candidates.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      return candidates[i];
    }
  }

  return candidates[candidates.length - 1];
}
