import type { ComboItem } from "./combos";
import { calculateComboTotal, resolveComboItems } from "./combos";
import { formatCUP, cupToUSD } from "./products";

function formatComboText(name: string, items: ComboItem[]): string {
  const resolved = resolveComboItems(items);
  const itemsText = resolved
    .map((r) => `${r.product.emoji} ${r.quantity}x ${r.product.name} — $${formatCUP(r.product.price * r.quantity)}`)
    .join("\n");
  const total = calculateComboTotal(items);

  return [
    `📦 ${name}`,
    "",
    itemsText,
    "",
    `Total: $${formatCUP(total)} CUP (~$${cupToUSD(total)} USD)`,
    "",
    "— Mi Combo",
  ].join("\n");
}

export async function shareCombo(
  name: string,
  items: ComboItem[],
): Promise<"shared" | "copied" | "failed"> {
  const text = formatComboText(name, items);

  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({ title: name, text });
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
