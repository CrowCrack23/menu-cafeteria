import { comboDatasets } from "./combo-datasets";
import type { FoodItem } from "./combo-datasets";

export type CategoryKey = "main" | "side" | "drink" | "dessert";

export const categoryLabels: Record<CategoryKey, string> = {
  main: "Principal",
  side: "Acompañamiento",
  drink: "Bebida",
  dessert: "Postre",
};

export const categoryOrder: CategoryKey[] = [
  "main",
  "side",
  "drink",
  "dessert",
];

interface ProductCatalog {
  categories: Record<CategoryKey, FoodItem[]>;
  allItems: FoodItem[];
  itemCount: number;
}

function buildCatalog(): ProductCatalog {
  const seen = new Set<string>();
  const categories: Record<CategoryKey, FoodItem[]> = {
    main: [],
    side: [],
    drink: [],
    dessert: [],
  };

  for (const combos of Object.values(comboDatasets)) {
    for (const combo of combos) {
      for (const item of combo.items) {
        if (!seen.has(item.name)) {
          seen.add(item.name);
          categories[item.category].push(item);
        }
      }
    }
  }

  const allItems = [
    ...categories.main,
    ...categories.side,
    ...categories.drink,
    ...categories.dessert,
  ];

  return {
    categories,
    allItems,
    itemCount: allItems.length,
  };
}

export const productCatalog = buildCatalog();
