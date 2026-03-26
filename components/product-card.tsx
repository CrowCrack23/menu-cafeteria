import type { FoodItem } from "@/lib/combo-datasets";
import { getItemPrice } from "@/lib/prices";

interface ProductCardProps {
  item: FoodItem;
  isSelected: boolean;
  onTap: () => void;
  available?: boolean;
}

export function ProductCard({ item, isSelected, onTap, available = true }: ProductCardProps) {
  const price = getItemPrice(item.name);

  return (
    <button
      onClick={onTap}
      disabled={!available && !isSelected}
      className={`flex items-center gap-3 w-full p-3 rounded-xl text-left cursor-pointer border transition-colors ${
        isSelected
          ? "bg-secondary border-border"
          : !available
            ? "bg-white border-transparent opacity-50"
            : "bg-white border-transparent hover:bg-secondary/50"
      }`}
    >
      <span className="text-2xl shrink-0">{item.emoji}</span>
      <div className="flex flex-col min-w-0 flex-1">
        <span className={`text-foreground text-sm font-medium leading-tight truncate ${!available ? "line-through" : ""}`}>
          {item.name}
        </span>
        <span className="text-muted-foreground text-xs leading-tight truncate">
          {item.description}
        </span>
      </div>
      <span className="text-muted-foreground text-xs shrink-0 mr-1">${price}</span>
      {isSelected && (
        <span className="text-sm text-foreground shrink-0">✓</span>
      )}
    </button>
  );
}
