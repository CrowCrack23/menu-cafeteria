import type { Combo } from "./combo-datasets";
import { getMoodById } from "./moods";

function formatComboText(combo: Combo): string {
  const mood = getMoodById(combo.moodId);
  const itemsText = combo.items
    .map((item) => `${item.emoji} ${item.name} — ${item.description}`)
    .join("\n");

  return [
    `${mood?.emoji ?? ""} ${combo.name}`,
    combo.message,
    "",
    itemsText,
    "",
    `Match: ${combo.matchScore}%`,
    "",
    "— AI Combo Experience",
  ].join("\n");
}

export async function shareCombo(
  combo: Combo,
): Promise<"shared" | "copied" | "failed"> {
  const text = formatComboText(combo);

  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({
        title: combo.name,
        text,
      });
      return "shared";
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        return "failed";
      }
    }
  }

  if (typeof navigator !== "undefined" && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      return "copied";
    } catch {
      return "failed";
    }
  }

  return "failed";
}
