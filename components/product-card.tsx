import type { FoodItem } from "@/lib/combo-datasets";

interface ProductCardProps {
  item: FoodItem;
  isSelected: boolean;
  onTap: () => void;
}

export function ProductCard({ item, isSelected, onTap }: ProductCardProps) {
  return (
    <button
      onClick={onTap}
      className={`flex items-center gap-3 w-full p-3 rounded-xl text-left cursor-pointer border transition-colors ${
        isSelected
          ? "bg-secondary border-border"
          : "bg-white border-transparent hover:bg-secondary/50"
      }`}
    >
      <span className="text-2xl shrink-0">{item.emoji}</span>
      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-foreground text-sm font-medium leading-tight truncate">
          {item.name}
        </span>
        <span className="text-muted-foreground text-xs leading-tight truncate">
          {item.description}
        </span>
      </div>
      {isSelected && (
        <span className="text-sm text-foreground shrink-0">✓</span>
      )}
    </button>
  );
}
