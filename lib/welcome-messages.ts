import type { TimePeriod } from "./moods";

interface WelcomeContext {
  timePeriod: TimePeriod;
  isFirstVisit: boolean;
  streakCount: number;
  isMilestone: boolean;
  streakBroken: boolean;
}

const firstVisitMessages: Record<TimePeriod, string[]> = {
  morning: [
    "¿Primera vez? Buenos días, vamos a encontrar tu sabor.",
    "Hey, bienvenido. Tu mañana está a punto de mejorar.",
  ],
  afternoon: [
    "¿Primera vez? Llegaste en buen momento.",
    "Bienvenido. La tarde pide algo especial.",
  ],
  evening: [
    "¿Primera vez? La noche te va a tratar bien.",
    "Hola. Vamos a cerrar el día con estilo.",
  ],
};

const regularMessages: Record<TimePeriod, string[]> = {
  morning: [
    "Buenos días. ¿Listo para arrancar?",
    "Otro día, otra oportunidad de comer increíble.",
    "La mañana te espera. ¿Cómo te sientes?",
  ],
  afternoon: [
    "Buenas tardes. Recargemos esa energía.",
    "Medio día, medio antojo. Vamos.",
    "La tarde pide algo. ¿Qué será hoy?",
  ],
  evening: [
    "Buenas noches. Te mereces algo bueno.",
    "Final del día. Vamos a consentirte.",
    "La noche es joven. Elige tu vibe.",
  ],
};

const streakMessages: Record<TimePeriod, string[]> = {
  morning: [
    "días seguidos — estás imparable.",
    "días al hilo. La constancia se nota.",
  ],
  afternoon: [
    "días seguidos. Esto ya es un hábito.",
    "días y contando. No aflojes.",
  ],
  evening: [
    "días seguidos — ya eres leyenda.",
    "días al hilo. Nadie te para.",
  ],
};

const milestoneMessages: Record<number, string> = {
  5: "5 días seguidos — ya te ganaste el derecho a presumir. 🔥",
  10: "10 días. Oficialmente eres parte del club. 🏆",
  30: "30 DÍAS. Eres una máquina. Respeto total. 👑",
};

const welcomeBackMessages: Record<TimePeriod, string[]> = {
  morning: [
    "Volviste — arrancamos racha nueva.",
    "De vuelta. La mañana te extrañaba.",
  ],
  afternoon: [
    "Hey, volviste. Arrancamos de nuevo.",
    "Se te extrañó. Vamos con todo.",
  ],
  evening: [
    "Volviste — nueva racha, nueva energía.",
    "De regreso. La noche te recibe.",
  ],
};

function pickRandom(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getWelcomeMessage(context: WelcomeContext): string {
  const { timePeriod, isFirstVisit, streakCount, isMilestone, streakBroken } =
    context;

  if (isFirstVisit) {
    return pickRandom(firstVisitMessages[timePeriod]);
  }

  if (streakBroken) {
    return pickRandom(welcomeBackMessages[timePeriod]);
  }

  if (isMilestone && milestoneMessages[streakCount]) {
    return milestoneMessages[streakCount];
  }

  if (streakCount > 1) {
    return `${streakCount} ${pickRandom(streakMessages[timePeriod])}`;
  }

  return pickRandom(regularMessages[timePeriod]);
}
