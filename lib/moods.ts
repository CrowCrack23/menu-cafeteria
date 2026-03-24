export type TimePeriod = "morning" | "afternoon" | "evening";

export interface Mood {
  id: string;
  name: string;
  emoji: string;
  gradient: [string, string];
  energyLevel: number;
  timeWeights: Record<TimePeriod, number>;
  description: string;
}

export const moods: Mood[] = [
  {
    id: "energized",
    name: "Energizado",
    emoji: "⚡",
    gradient: ["#f97316", "#eab308"],
    energyLevel: 5,
    timeWeights: { morning: 0.35, afternoon: 0.2, evening: 0.05 },
    description: "A tope, sin frenos",
  },
  {
    id: "chill",
    name: "Chill",
    emoji: "😌",
    gradient: ["#6366f1", "#8b5cf6"],
    energyLevel: 2,
    timeWeights: { morning: 0.1, afternoon: 0.2, evening: 0.35 },
    description: "Relax, sin prisa",
  },
  {
    id: "happy",
    name: "Feliz",
    emoji: "😄",
    gradient: ["#f472b6", "#fb923c"],
    energyLevel: 4,
    timeWeights: { morning: 0.25, afternoon: 0.3, evening: 0.2 },
    description: "De buen rollo total",
  },
  {
    id: "hungry",
    name: "Hambriento",
    emoji: "🍔",
    gradient: ["#ef4444", "#f97316"],
    energyLevel: 3,
    timeWeights: { morning: 0.2, afternoon: 0.2, evening: 0.2 },
    description: "Necesito algo ya",
  },
  {
    id: "cozy",
    name: "Acogedor",
    emoji: "🛋️",
    gradient: ["#a78bfa", "#6366f1"],
    energyLevel: 1,
    timeWeights: { morning: 0.1, afternoon: 0.1, evening: 0.2 },
    description: "Modo comfort activado",
  },
];

export function getMoodById(id: string): Mood | undefined {
  return moods.find((m) => m.id === id);
}
