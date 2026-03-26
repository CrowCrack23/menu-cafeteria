import type { FoodItem } from "@/lib/combo-datasets";

interface ComboItemCardProps {
  item: FoodItem;
}

export function ComboItemCard({ item }: ComboItemCardProps) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-border">
      <span className="text-2xl sm:text-3xl shrink-0">{item.emoji}</span>
      <div className="flex flex-col min-w-0">
        <span className="text-foreground font-semibold text-sm leading-tight">
          {item.name}
        </span>
        <span className="text-muted-foreground text-xs leading-tight">
          {item.description}
        </span>
      </div>
    </div>
  );
}
