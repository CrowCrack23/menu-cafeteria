export interface Product {
  id: string;
  name: string;
  emoji: string;
  price: number; // CUP
  category: Category;
}

export type Category =
  | "basicos"
  | "pastas"
  | "untables"
  | "dulces"
  | "limpieza"
  | "bebidas";

export const categoryLabels: Record<Category, string> = {
  basicos: "Basicos",
  untables: "Untables",
  pastas: "Pastas",
  bebidas: "Bebidas",
  limpieza: "Limpieza",
  dulces: "Dulces",
};

export const categoryOrder: Category[] = [
  "basicos",
  "untables",
  "pastas",
  "bebidas",
  "limpieza",
  "dulces",
];

export const products: Product[] = [
  // Basicos
  { id: "yogurt", name: "Yogurt", emoji: "🥛", price: 1300, category: "basicos" },
  { id: "aceite", name: "Aceite", emoji: "🫒", price: 1500, category: "basicos" },
  { id: "carne-rusa", name: "Carne Rusa", emoji: "🥫", price: 860, category: "basicos" },
  { id: "mayonesa", name: "Mayonesa", emoji: "🫙", price: 850, category: "basicos" },
  { id: "margarina", name: "Margarina", emoji: "🧈", price: 500, category: "basicos" },
  { id: "leche-condensada", name: "Leche Condensada", emoji: "🥛", price: 550, category: "basicos" },

  // Untables
  { id: "nutella-950", name: "Nutella 950g", emoji: "🍫", price: 950, category: "untables" },
  { id: "nutella-1200", name: "Nutella 1200g", emoji: "🍫", price: 1200, category: "untables" },

  // Pastas
  { id: "espagueti", name: "Espagueti", emoji: "🍝", price: 300, category: "pastas" },
  { id: "coditos", name: "Coditos", emoji: "🍝", price: 330, category: "pastas" },
  { id: "maicena", name: "Maicena", emoji: "🌽", price: 600, category: "pastas" },

  // Bebidas
  { id: "whisky", name: "Whisky", emoji: "🥃", price: 1650, category: "bebidas" },

  // Limpieza
  { id: "det-polvo", name: "Det. Polvo", emoji: "🧹", price: 300, category: "limpieza" },
  { id: "det-liquido", name: "Det. Liquido", emoji: "🧴", price: 260, category: "limpieza" },

  // Dulces
  { id: "centavitos", name: "Centavitos", emoji: "🍬", price: 160, category: "dulces" },
  { id: "panquecito", name: "Panquecito", emoji: "🧁", price: 140, category: "dulces" },
  { id: "sorbeto", name: "Sorbeto", emoji: "🍦", price: 130, category: "dulces" },
  { id: "botoneta", name: "Botoneta", emoji: "🍬", price: 50, category: "dulces" },
  { id: "caramelo", name: "Caramelo", emoji: "🍭", price: 10, category: "dulces" },
  { id: "chicle", name: "Chicle", emoji: "🫧", price: 30, category: "dulces" },
  { id: "chupa-chupa", name: "Chupa Chupa", emoji: "🍭", price: 50, category: "dulces" },
  { id: "galleta", name: "Galleta", emoji: "🍪", price: 90, category: "dulces" },
  { id: "galleta-dulce", name: "Galleta Dulce", emoji: "🍪", price: 120, category: "dulces" },
];

export const CUP_PER_USD = 490;

const productMap = new Map(products.map((p) => [p.id, p]));

export function getProductById(id: string): Product | undefined {
  return productMap.get(id);
}

export function getProductsByCategory(cat: Category): Product[] {
  return products.filter((p) => p.category === cat);
}

export function formatCUP(amount: number): string {
  return amount.toLocaleString("es-CU");
}

export function cupToUSD(cup: number): number {
  return Math.round((cup / CUP_PER_USD) * 100) / 100;
}
