export interface FoodItem {
  name: string;
  description: string;
  emoji: string;
  category: "main" | "side" | "drink" | "dessert";
}

export interface Combo {
  id: string;
  name: string;
  message: string;
  items: FoodItem[];
  matchScore: number;
  moodId: string;
}

const energizedCombos: Combo[] = [
  {
    id: "energized-01",
    name: "La Descarga Total",
    message: "Tu energía necesita combustible premium",
    moodId: "energized",
    matchScore: 94,
    items: [
      { name: "Wrap de pollo", description: "Proteína pura, cero excusas", emoji: "🌯", category: "main" },
      { name: "Ensalada de quinoa", description: "El superalimento que no falla", emoji: "🥗", category: "side" },
      { name: "Jugo verde", description: "Detox pero con onda", emoji: "🥤", category: "drink" },
      { name: "Barrita energética", description: "El boost final", emoji: "🍫", category: "dessert" },
    ],
  },
  {
    id: "energized-02",
    name: "Turbo Matutino",
    message: "Arranca el día como un cohete",
    moodId: "energized",
    matchScore: 88,
    items: [
      { name: "Tostada de aguacate", description: "El clásico que nunca falla", emoji: "🥑", category: "main" },
      { name: "Fruta picada", description: "Vitaminas al poder", emoji: "🍓", category: "side" },
      { name: "Café americano", description: "Negro como tu determinación", emoji: "☕", category: "drink" },
    ],
  },
  {
    id: "energized-03",
    name: "Power Combo",
    message: "Para los que no paran nunca",
    moodId: "energized",
    matchScore: 91,
    items: [
      { name: "Burrito de carne", description: "Fuerza bruta envuelta", emoji: "🌯", category: "main" },
      { name: "Papas al horno", description: "Carbohidratos con propósito", emoji: "🥔", category: "side" },
      { name: "Smoothie de mango", description: "Tropical y poderoso", emoji: "🥭", category: "drink" },
    ],
  },
  {
    id: "energized-04",
    name: "El Imparable",
    message: "Nada te detiene con esto encima",
    moodId: "energized",
    matchScore: 85,
    items: [
      { name: "Sándwich club", description: "Triple piso de sabor", emoji: "🥪", category: "main" },
      { name: "Mix de frutos secos", description: "Crunch nutritivo", emoji: "🥜", category: "side" },
      { name: "Agua mineral", description: "Pura y simple", emoji: "💧", category: "drink" },
      { name: "Plátano", description: "Potasio para el campeón", emoji: "🍌", category: "dessert" },
    ],
  },
  {
    id: "energized-05",
    name: "Misión Cumplida",
    message: "Combustible para conquistar el mundo",
    moodId: "energized",
    matchScore: 92,
    items: [
      { name: "Bowl de pollo teriyaki", description: "Asia meets energía", emoji: "🍗", category: "main" },
      { name: "Edamame", description: "Snack de guerrero", emoji: "🫛", category: "side" },
      { name: "Té verde", description: "Zen pero despierto", emoji: "🍵", category: "drink" },
    ],
  },
  {
    id: "energized-06",
    name: "Recarga Express",
    message: "5 minutos y vuelves a la acción",
    moodId: "energized",
    matchScore: 87,
    items: [
      { name: "Panini de pavo", description: "Ligero pero potente", emoji: "🥖", category: "main" },
      { name: "Zanahoria con hummus", description: "Dip de campeones", emoji: "🥕", category: "side" },
      { name: "Jugo de naranja", description: "Vitamina C al rescate", emoji: "🍊", category: "drink" },
    ],
  },
  {
    id: "energized-07",
    name: "Alto Voltaje",
    message: "Más cargado que tu celular al 100%",
    moodId: "energized",
    matchScore: 93,
    items: [
      { name: "Ensalada César con pollo", description: "El clásico con proteína", emoji: "🥗", category: "main" },
      { name: "Pan integral", description: "Fibra para el flow", emoji: "🍞", category: "side" },
      { name: "Agua de coco", description: "Hidratación premium", emoji: "🥥", category: "drink" },
      { name: "Yogur con granola", description: "El postre que entrena", emoji: "🥣", category: "dessert" },
    ],
  },
  {
    id: "energized-08",
    name: "Modo Bestia",
    message: "Hoy no hay quien te pare",
    moodId: "energized",
    matchScore: 96,
    items: [
      { name: "Hamburguesa de res", description: "Proteína sin rodeos", emoji: "🍔", category: "main" },
      { name: "Ensalada mixta", description: "Balance es poder", emoji: "🥬", category: "side" },
      { name: "Batido de proteína", description: "Músculo líquido", emoji: "🥤", category: "drink" },
    ],
  },
];

const chillCombos: Combo[] = [
  {
    id: "chill-01",
    name: "Zen Total",
    message: "Respira, come, repite",
    moodId: "chill",
    matchScore: 95,
    items: [
      { name: "Sopa de tomate", description: "Calidez en cada cucharada", emoji: "🍅", category: "main" },
      { name: "Pan artesanal", description: "Hecho con calma", emoji: "🥖", category: "side" },
      { name: "Té de manzanilla", description: "Relax líquido", emoji: "🍵", category: "drink" },
    ],
  },
  {
    id: "chill-02",
    name: "Sin Prisa",
    message: "El mundo puede esperar",
    moodId: "chill",
    matchScore: 89,
    items: [
      { name: "Quesadilla", description: "Simple y perfecta", emoji: "🧀", category: "main" },
      { name: "Guacamole", description: "Verde que enamora", emoji: "🥑", category: "side" },
      { name: "Limonada natural", description: "Frescura sin complicaciones", emoji: "🍋", category: "drink" },
      { name: "Galleta de avena", description: "Dulzura tranquila", emoji: "🍪", category: "dessert" },
    ],
  },
  {
    id: "chill-03",
    name: "Modo Sofá",
    message: "Netflix y este combo, nada más",
    moodId: "chill",
    matchScore: 91,
    items: [
      { name: "Pasta alfredo", description: "Cremosidad nivel infinito", emoji: "🍝", category: "main" },
      { name: "Palitos de pan", description: "Para mojar sin pensar", emoji: "🥖", category: "side" },
      { name: "Refresco", description: "Burbujas de relax", emoji: "🥤", category: "drink" },
    ],
  },
  {
    id: "chill-04",
    name: "Flotando",
    message: "Cero estrés, puro sabor",
    moodId: "chill",
    matchScore: 86,
    items: [
      { name: "Sándwich de atún", description: "Ligero como tu mood", emoji: "🥪", category: "main" },
      { name: "Chips de plátano", description: "Crunch relajado", emoji: "🍌", category: "side" },
      { name: "Agua con pepino", description: "Spa en un vaso", emoji: "🥒", category: "drink" },
    ],
  },
  {
    id: "chill-05",
    name: "Brisa Suave",
    message: "Como una tarde de domingo",
    moodId: "chill",
    matchScore: 93,
    items: [
      { name: "Crepa de jamón y queso", description: "Francesa y relajada", emoji: "🥞", category: "main" },
      { name: "Fruta de temporada", description: "Lo que la naturaleza diga", emoji: "🍇", category: "side" },
      { name: "Café con leche", description: "Abrazo en taza", emoji: "☕", category: "drink" },
      { name: "Brownie", description: "Chocolate sin culpas", emoji: "🍫", category: "dessert" },
    ],
  },
  {
    id: "chill-06",
    name: "Desconexión",
    message: "Apaga el mundo, prende el sabor",
    moodId: "chill",
    matchScore: 88,
    items: [
      { name: "Bowl de arroz con verduras", description: "Simple y reconfortante", emoji: "🍚", category: "main" },
      { name: "Sopa miso", description: "Japón en tu mesa", emoji: "🍜", category: "side" },
      { name: "Té matcha", description: "Calm but awake", emoji: "🍵", category: "drink" },
    ],
  },
  {
    id: "chill-07",
    name: "Piloto Automático",
    message: "Tu cuerpo sabe lo que necesita",
    moodId: "chill",
    matchScore: 84,
    items: [
      { name: "Taco de frijoles", description: "Comfort food mexicano", emoji: "🌮", category: "main" },
      { name: "Elote", description: "Maíz con actitud", emoji: "🌽", category: "side" },
      { name: "Horchata", description: "Dulce y nostálgica", emoji: "🥛", category: "drink" },
    ],
  },
  {
    id: "chill-08",
    name: "La Pausa Perfecta",
    message: "Date un respiro con estilo",
    moodId: "chill",
    matchScore: 90,
    items: [
      { name: "Ensalada caprese", description: "Italia en modo zen", emoji: "🍅", category: "main" },
      { name: "Focaccia", description: "Pan con personalidad", emoji: "🫓", category: "side" },
      { name: "Smoothie de fresa", description: "Rosa y refrescante", emoji: "🍓", category: "drink" },
      { name: "Helado de vainilla", description: "El clásico eterno", emoji: "🍦", category: "dessert" },
    ],
  },
];

const happyCombos: Combo[] = [
  {
    id: "happy-01",
    name: "Pura Vibra",
    message: "Sonríe que la comida llegó",
    moodId: "happy",
    matchScore: 94,
    items: [
      { name: "Pizza margarita", description: "Felicidad en triángulo", emoji: "🍕", category: "main" },
      { name: "Ensalada colorida", description: "Un arcoíris comestible", emoji: "🌈", category: "side" },
      { name: "Limonada rosa", description: "Dulce como tu día", emoji: "🍹", category: "drink" },
    ],
  },
  {
    id: "happy-02",
    name: "Fiesta en la Boca",
    message: "Cada bocado es una celebración",
    moodId: "happy",
    matchScore: 91,
    items: [
      { name: "Tacos al pastor", description: "México celebra contigo", emoji: "🌮", category: "main" },
      { name: "Nachos con queso", description: "Compartir es vivir", emoji: "🧀", category: "side" },
      { name: "Agua de jamaica", description: "Roja como tu alegría", emoji: "🌺", category: "drink" },
      { name: "Churros", description: "Azúcar y sonrisas", emoji: "🍩", category: "dessert" },
    ],
  },
  {
    id: "happy-03",
    name: "Good Vibes Only",
    message: "La vida es corta, come rico",
    moodId: "happy",
    matchScore: 88,
    items: [
      { name: "Hamburguesa clásica", description: "Nada como lo OG", emoji: "🍔", category: "main" },
      { name: "Papas fritas", description: "El sidekick perfecto", emoji: "🍟", category: "side" },
      { name: "Milkshake de fresa", description: "Nostalgia en vaso", emoji: "🥤", category: "drink" },
    ],
  },
  {
    id: "happy-04",
    name: "Día Brillante",
    message: "Todo sabe mejor cuando estás feliz",
    moodId: "happy",
    matchScore: 92,
    items: [
      { name: "Wrap mediterráneo", description: "Vacaciones en cada mordida", emoji: "🌯", category: "main" },
      { name: "Hummus con pita", description: "Dip de la felicidad", emoji: "🫓", category: "side" },
      { name: "Jugo de piña", description: "Tropical y optimista", emoji: "🍍", category: "drink" },
    ],
  },
  {
    id: "happy-05",
    name: "Sonrisa Garantizada",
    message: "Este combo viene con guarantee de felicidad",
    moodId: "happy",
    matchScore: 95,
    items: [
      { name: "Pollo empanizado", description: "Crujiente como tu risa", emoji: "🍗", category: "main" },
      { name: "Puré de papa", description: "Suave como tu mood", emoji: "🥔", category: "side" },
      { name: "Jugo de manzana", description: "Dulce y natural", emoji: "🍎", category: "drink" },
      { name: "Flan", description: "El broche de oro", emoji: "🍮", category: "dessert" },
    ],
  },
  {
    id: "happy-06",
    name: "Alto Ánimo",
    message: "Que nada baje esta energía",
    moodId: "happy",
    matchScore: 87,
    items: [
      { name: "Sushi variado", description: "Rolls de buen humor", emoji: "🍣", category: "main" },
      { name: "Edamame", description: "Pop pop felicidad", emoji: "🫛", category: "side" },
      { name: "Té de frutas", description: "Aromas que alegran", emoji: "🍵", category: "drink" },
    ],
  },
  {
    id: "happy-07",
    name: "Confeti Comestible",
    message: "Hoy es día de celebrar",
    moodId: "happy",
    matchScore: 90,
    items: [
      { name: "Hot dog", description: "Diversión sin pretensiones", emoji: "🌭", category: "main" },
      { name: "Aros de cebolla", description: "Crunch festivo", emoji: "🧅", category: "side" },
      { name: "Refresco de uva", description: "Morado y feliz", emoji: "🍇", category: "drink" },
      { name: "Paleta de hielo", description: "Frescura de niño", emoji: "🍭", category: "dessert" },
    ],
  },
  {
    id: "happy-08",
    name: "Endorfinas al Plato",
    message: "La comida que tu cerebro pedía",
    moodId: "happy",
    matchScore: 93,
    items: [
      { name: "Pasta pesto", description: "Verde esperanza", emoji: "🍝", category: "main" },
      { name: "Bruschetta", description: "Italia sonríe contigo", emoji: "🍅", category: "side" },
      { name: "Agua mineral con limón", description: "Burbujas de joy", emoji: "🫧", category: "drink" },
    ],
  },
];

const hungryCombos: Combo[] = [
  {
    id: "hungry-01",
    name: "Emergencia Saciada",
    message: "Tu estómago puede dejar de gritar",
    moodId: "hungry",
    matchScore: 96,
    items: [
      { name: "Doble hamburguesa", description: "Porque una no es suficiente", emoji: "🍔", category: "main" },
      { name: "Papas fritas grandes", description: "Sin medias tintas", emoji: "🍟", category: "side" },
      { name: "Refresco grande", description: "A lo grande", emoji: "🥤", category: "drink" },
      { name: "Brownie doble chocolate", description: "El remate perfecto", emoji: "🍫", category: "dessert" },
    ],
  },
  {
    id: "hungry-02",
    name: "Operación Llenura",
    message: "Misión: que no quepa ni un bocado más",
    moodId: "hungry",
    matchScore: 93,
    items: [
      { name: "Burrito XL", description: "Tamaño ambición", emoji: "🌯", category: "main" },
      { name: "Nachos con todo", description: "Queso, frijoles, jalapeños", emoji: "🧀", category: "side" },
      { name: "Horchata grande", description: "Para bajar todo eso", emoji: "🥛", category: "drink" },
    ],
  },
  {
    id: "hungry-03",
    name: "Sin Piedad",
    message: "Hoy no es día de ensaladas",
    moodId: "hungry",
    matchScore: 90,
    items: [
      { name: "Milanesa con papas", description: "El platillo que abraza", emoji: "🍖", category: "main" },
      { name: "Sopa de fideos", description: "Entrada de calentamiento", emoji: "🍜", category: "side" },
      { name: "Agua de horchata", description: "Cremosa y satisfactoria", emoji: "🥛", category: "drink" },
    ],
  },
  {
    id: "hungry-04",
    name: "Máxima Capacidad",
    message: "Tu tanque va a quedar al 100%",
    moodId: "hungry",
    matchScore: 94,
    items: [
      { name: "Plato combinado", description: "De todo un poco, mucho de todo", emoji: "🍱", category: "main" },
      { name: "Pan de ajo", description: "Porque sí cabe más", emoji: "🧄", category: "side" },
      { name: "Jugo natural", description: "Vitaminas post-festín", emoji: "🧃", category: "drink" },
      { name: "Pastel de chocolate", description: "El cierre épico", emoji: "🍰", category: "dessert" },
    ],
  },
  {
    id: "hungry-05",
    name: "Modo Aspiradora",
    message: "Todo lo que veas, es tuyo",
    moodId: "hungry",
    matchScore: 88,
    items: [
      { name: "Torta de jamón", description: "Generosa y sin culpa", emoji: "🥖", category: "main" },
      { name: "Esquites", description: "El snack que no puede faltar", emoji: "🌽", category: "side" },
      { name: "Café con leche grande", description: "Energía extra incluida", emoji: "☕", category: "drink" },
    ],
  },
  {
    id: "hungry-06",
    name: "Banquete Express",
    message: "Un festín en tiempo récord",
    moodId: "hungry",
    matchScore: 91,
    items: [
      { name: "Pollo rostizado", description: "Clásico irresistible", emoji: "🍗", category: "main" },
      { name: "Arroz con frijoles", description: "La dupla imbatible", emoji: "🍚", category: "side" },
      { name: "Limonada", description: "Fresca para el balance", emoji: "🍋", category: "drink" },
      { name: "Gelatina", description: "Siempre hay espacio", emoji: "🍮", category: "dessert" },
    ],
  },
  {
    id: "hungry-07",
    name: "Hambre Cero",
    message: "Después de esto, nada te falta",
    moodId: "hungry",
    matchScore: 85,
    items: [
      { name: "Enchiladas verdes", description: "Salsa, queso, crema — triple amenaza", emoji: "🫔", category: "main" },
      { name: "Frijoles refritos", description: "El complemento obligatorio", emoji: "🫘", category: "side" },
      { name: "Agua fresca de tamarindo", description: "Agridulce perfección", emoji: "🥤", category: "drink" },
    ],
  },
  {
    id: "hungry-08",
    name: "El Demoledor",
    message: "Para hambre grandes, combos grandes",
    moodId: "hungry",
    matchScore: 97,
    items: [
      { name: "Pizza familiar (2 rebanadas)", description: "Compartir es opcional", emoji: "🍕", category: "main" },
      { name: "Alitas BBQ", description: "Salsa hasta los codos", emoji: "🍗", category: "side" },
      { name: "Refresco", description: "Burbujas de satisfacción", emoji: "🥤", category: "drink" },
      { name: "Helado", description: "El premio final", emoji: "🍦", category: "dessert" },
    ],
  },
];

const cozyCombos: Combo[] = [
  {
    id: "cozy-01",
    name: "Abrazo Comestible",
    message: "Esto es como una cobija en forma de comida",
    moodId: "cozy",
    matchScore: 95,
    items: [
      { name: "Sopa de pollo", description: "La receta de la abuela", emoji: "🍲", category: "main" },
      { name: "Pan recién horneado", description: "Calorcito en las manos", emoji: "🍞", category: "side" },
      { name: "Chocolate caliente", description: "Líquido reconfortante", emoji: "☕", category: "drink" },
    ],
  },
  {
    id: "cozy-02",
    name: "Noche de Invierno",
    message: "Perfecto para acurrucarse",
    moodId: "cozy",
    matchScore: 92,
    items: [
      { name: "Mac & Cheese", description: "Queso derretido, corazón derretido", emoji: "🧀", category: "main" },
      { name: "Palitos de pan", description: "Para mojar y disfrutar", emoji: "🥖", category: "side" },
      { name: "Leche con canela", description: "Dulzura de hogar", emoji: "🥛", category: "drink" },
      { name: "Galletas de chocolate", description: "El cierre perfecto", emoji: "🍪", category: "dessert" },
    ],
  },
  {
    id: "cozy-03",
    name: "Comfort Zone",
    message: "Quédate donde estás cómodo",
    moodId: "cozy",
    matchScore: 89,
    items: [
      { name: "Grilled cheese", description: "Simplicidad deliciosa", emoji: "🧀", category: "main" },
      { name: "Sopa de tomate", description: "El dúo legendario", emoji: "🍅", category: "side" },
      { name: "Té chai", description: "Especias que abrazan", emoji: "🍵", category: "drink" },
    ],
  },
  {
    id: "cozy-04",
    name: "Tarde de Lluvia",
    message: "Mejor adentro con esto que afuera sin nada",
    moodId: "cozy",
    matchScore: 91,
    items: [
      { name: "Crema de champiñones", description: "Aterciopelada y perfecta", emoji: "🍄", category: "main" },
      { name: "Crostini", description: "Crunch reconfortante", emoji: "🫓", category: "side" },
      { name: "Café latte", description: "Espuma de nubes", emoji: "☕", category: "drink" },
      { name: "Muffin de arándano", description: "Esponjoso como almohada", emoji: "🧁", category: "dessert" },
    ],
  },
  {
    id: "cozy-05",
    name: "Nostalgia Feliz",
    message: "Como los domingos de la infancia",
    moodId: "cozy",
    matchScore: 94,
    items: [
      { name: "Caldo de res", description: "Tradición en cada cucharada", emoji: "🥘", category: "main" },
      { name: "Arroz blanco", description: "El acompañante fiel", emoji: "🍚", category: "side" },
      { name: "Agua de limón tibia", description: "Calidez desde adentro", emoji: "🍋", category: "drink" },
    ],
  },
  {
    id: "cozy-06",
    name: "Modo Hibernación",
    message: "Come, descansa, repite",
    moodId: "cozy",
    matchScore: 87,
    items: [
      { name: "Molletes", description: "México en modo comfort", emoji: "🫘", category: "main" },
      { name: "Plátano frito", description: "Dulce y calientito", emoji: "🍌", category: "side" },
      { name: "Atole", description: "Tradición que calienta", emoji: "🥛", category: "drink" },
    ],
  },
  {
    id: "cozy-07",
    name: "Refugio Interior",
    message: "Tu propio rincón de paz con sabor",
    moodId: "cozy",
    matchScore: 90,
    items: [
      { name: "Lasaña", description: "Capas de felicidad", emoji: "🍝", category: "main" },
      { name: "Ensalada tibia", description: "Verde pero acogedor", emoji: "🥗", category: "side" },
      { name: "Vino caliente (sin alcohol)", description: "Especias festivas", emoji: "🍷", category: "drink" },
      { name: "Arroz con leche", description: "El postre de la abuela", emoji: "🍚", category: "dessert" },
    ],
  },
  {
    id: "cozy-08",
    name: "Calma y Sabor",
    message: "Para cuando el alma pide calidez",
    moodId: "cozy",
    matchScore: 93,
    items: [
      { name: "Tamales", description: "Amor envuelto en hoja", emoji: "🫔", category: "main" },
      { name: "Frijoles de olla", description: "Caldosos y perfectos", emoji: "🫘", category: "side" },
      { name: "Champurrado", description: "Chocolate espeso de hogar", emoji: "☕", category: "drink" },
    ],
  },
];

export const comboDatasets: Record<string, Combo[]> = {
  energized: energizedCombos,
  chill: chillCombos,
  happy: happyCombos,
  hungry: hungryCombos,
  cozy: cozyCombos,
};
