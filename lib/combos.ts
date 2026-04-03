import { getProductById, type Product } from "./products";

export interface ComboItem {
  productId: string;
  quantity: number;
}

export interface Combo {
  id: string;
  name: string;
  description: string;
  priceUSD: number;
  items: ComboItem[];
}

export const combos: Combo[] = [
  {
    id: "economico",
    name: "Combo Economico",
    description: "Lo esencial para empezar la semana",
    priceUSD: 10,
    items: [
      { productId: "yogurt", quantity: 1 },
      { productId: "aceite", quantity: 1 },
      { productId: "carne-rusa", quantity: 1 },
      { productId: "det-polvo", quantity: 1 },
      { productId: "det-liquido", quantity: 1 },
      { productId: "espagueti", quantity: 1 },
      { productId: "centavitos", quantity: 1 },
      { productId: "panquecito", quantity: 1 },
      { productId: "caramelo", quantity: 9 },
    ],
  },
  {
    id: "desayuno",
    name: "Combo Desayuno",
    description: "Para que no falte el desayuno en casa",
    priceUSD: 12,
    items: [
      { productId: "yogurt", quantity: 1 },
      { productId: "aceite", quantity: 1 },
      { productId: "nutella-950", quantity: 1 },
      { productId: "leche-condensada", quantity: 1 },
      { productId: "det-polvo", quantity: 1 },
      { productId: "det-liquido", quantity: 1 },
      { productId: "panquecito", quantity: 1 },
      { productId: "sorbeto", quantity: 1 },
      { productId: "espagueti", quantity: 1 },
      { productId: "botoneta", quantity: 4 },
      { productId: "chicle", quantity: 2 },
      { productId: "caramelo", quantity: 9 },
    ],
  },
  {
    id: "hogar",
    name: "Combo Hogar",
    description: "Los basicos del hogar bien surtidos",
    priceUSD: 15,
    items: [
      { productId: "yogurt", quantity: 2 },
      { productId: "aceite", quantity: 1 },
      { productId: "carne-rusa", quantity: 1 },
      { productId: "nutella-1200", quantity: 1 },
      { productId: "det-polvo", quantity: 1 },
      { productId: "det-liquido", quantity: 1 },
      { productId: "mayonesa", quantity: 1 },
      { productId: "caramelo", quantity: 3 },
    ],
  },
  {
    id: "surtido",
    name: "Combo Surtido",
    description: "Variedad de todo un poco para la familia",
    priceUSD: 18,
    items: [
      { productId: "yogurt", quantity: 2 },
      { productId: "aceite", quantity: 1 },
      { productId: "whisky", quantity: 1 },
      { productId: "nutella-950", quantity: 1 },
      { productId: "det-polvo", quantity: 1 },
      { productId: "det-liquido", quantity: 1 },
      { productId: "coditos", quantity: 1 },
      { productId: "centavitos", quantity: 1 },
      { productId: "sorbeto", quantity: 1 },
      { productId: "panquecito", quantity: 1 },
      { productId: "botoneta", quantity: 1 },
      { productId: "chicle", quantity: 2 },
      { productId: "caramelo", quantity: 6 },
    ],
  },
  {
    id: "especial",
    name: "Combo Especial",
    description: "Un poquito extra para consentirlos",
    priceUSD: 20,
    items: [
      { productId: "yogurt", quantity: 2 },
      { productId: "aceite", quantity: 2 },
      { productId: "carne-rusa", quantity: 1 },
      { productId: "nutella-1200", quantity: 1 },
      { productId: "mayonesa", quantity: 1 },
      { productId: "det-polvo", quantity: 1 },
      { productId: "det-liquido", quantity: 1 },
      { productId: "leche-condensada", quantity: 1 },
      { productId: "sorbeto", quantity: 1 },
      { productId: "botoneta", quantity: 1 },
    ],
  },
  {
    id: "premium",
    name: "Combo Premium",
    description: "Para que no les falte nada",
    priceUSD: 25,
    items: [
      { productId: "yogurt", quantity: 3 },
      { productId: "aceite", quantity: 2 },
      { productId: "whisky", quantity: 1 },
      { productId: "carne-rusa", quantity: 1 },
      { productId: "nutella-950", quantity: 1 },
      { productId: "det-polvo", quantity: 1 },
      { productId: "det-liquido", quantity: 1 },
      { productId: "margarina", quantity: 1 },
      { productId: "espagueti", quantity: 1 },
      { productId: "centavitos", quantity: 1 },
      { productId: "panquecito", quantity: 1 },
      { productId: "sorbeto", quantity: 1 },
      { productId: "botoneta", quantity: 2 },
    ],
  },
  {
    id: "familiar",
    name: "Combo Familiar",
    description: "Pensado para una familia de 4",
    priceUSD: 30,
    items: [
      { productId: "yogurt", quantity: 4 },
      { productId: "aceite", quantity: 3 },
      { productId: "carne-rusa", quantity: 2 },
      { productId: "nutella-1200", quantity: 1 },
      { productId: "det-polvo", quantity: 1 },
      { productId: "det-liquido", quantity: 1 },
      { productId: "mayonesa", quantity: 1 },
      { productId: "maicena", quantity: 1 },
      { productId: "chupa-chupa", quantity: 1 },
      { productId: "caramelo", quantity: 2 },
    ],
  },
  {
    id: "master",
    name: "Combo Master",
    description: "Despensa completa con extras",
    priceUSD: 35,
    items: [
      { productId: "yogurt", quantity: 4 },
      { productId: "aceite", quantity: 4 },
      { productId: "whisky", quantity: 1 },
      { productId: "nutella-1200", quantity: 1 },
      { productId: "carne-rusa", quantity: 1 },
      { productId: "det-polvo", quantity: 1 },
      { productId: "det-liquido", quantity: 1 },
      { productId: "margarina", quantity: 1 },
      { productId: "mayonesa", quantity: 1 },
      { productId: "chupa-chupa", quantity: 3 },
      { productId: "chicle", quantity: 6 },
    ],
  },
  {
    id: "gran-despensa",
    name: "Combo Gran Despensa",
    description: "Para llenar la despensa por semanas",
    priceUSD: 40,
    items: [
      { productId: "yogurt", quantity: 5 },
      { productId: "aceite", quantity: 4 },
      { productId: "carne-rusa", quantity: 2 },
      { productId: "whisky", quantity: 2 },
      { productId: "nutella-950", quantity: 1 },
      { productId: "det-polvo", quantity: 1 },
      { productId: "det-liquido", quantity: 1 },
      { productId: "centavitos", quantity: 1 },
      { productId: "panquecito", quantity: 1 },
      { productId: "sorbeto", quantity: 1 },
      { productId: "botoneta", quantity: 1 },
      { productId: "chicle", quantity: 2 },
    ],
  },
  {
    id: "mega-dueno",
    name: "Combo Mega Dueno",
    description: "El mas grande — para que no pidan mas nada",
    priceUSD: 50,
    items: [
      { productId: "yogurt", quantity: 6 },
      { productId: "aceite", quantity: 5 },
      { productId: "whisky", quantity: 2 },
      { productId: "carne-rusa", quantity: 3 },
      { productId: "nutella-1200", quantity: 1 },
      { productId: "det-polvo", quantity: 1 },
      { productId: "det-liquido", quantity: 1 },
      { productId: "mayonesa", quantity: 1 },
      { productId: "maicena", quantity: 1 },
      { productId: "leche-condensada", quantity: 1 },
      { productId: "botoneta", quantity: 1 },
      { productId: "caramelo", quantity: 1 },
    ],
  },
];

const comboMap = new Map(combos.map((c) => [c.id, c]));

export function getComboById(id: string): Combo | undefined {
  return comboMap.get(id);
}

export function calculateComboTotal(items: ComboItem[]): number {
  return items.reduce((sum, item) => {
    const product = getProductById(item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);
}

export function getComboItemCount(items: ComboItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function getComboEmojis(items: ComboItem[], max = 4): string[] {
  const emojis: string[] = [];
  for (const item of items) {
    if (emojis.length >= max) break;
    const product = getProductById(item.productId);
    if (product) emojis.push(product.emoji);
  }
  return emojis;
}

export function resolveComboItems(items: ComboItem[]): Array<{ product: Product; quantity: number }> {
  return items
    .map((item) => {
      const product = getProductById(item.productId);
      return product ? { product, quantity: item.quantity } : null;
    })
    .filter(Boolean) as Array<{ product: Product; quantity: number }>;
}
