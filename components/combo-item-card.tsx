import type { FoodItem } from "@/lib/combo-datasets";
import { getItemPrice } from "@/lib/prices";

interface ComboItemCardProps {
  item: FoodItem;
  available?: boolean;
}

export function ComboItemCard({ item, available = true }: ComboItemCardProps) {
  const price = getItemPrice(item.name);

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-xl bg-white border border-border ${
        !available ? "opacity-50" : ""
      }`}
    >
      <span className="text-2xl sm:text-3xl shrink-0">{item.emoji}</span>
      <div className="flex flex-col min-w-0 flex-1">
        <span className={`text-foreground font-semibold text-sm leading-tight ${!available ? "line-through" : ""}`}>
          {item.name}
        </span>
        <span className="text-muted-foreground text-xs leading-tight">
          {item.description}
        </span>
        {!available && (
          <span className="text-red-500 text-xs font-medium mt-0.5">No disponible</span>
        )}
      </div>
      <span className="text-foreground font-semibold text-sm shrink-0">
        ${price}
      </span>
    </div>
  );
}
