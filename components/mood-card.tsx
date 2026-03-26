import type { Mood } from "@/lib/moods";

interface MoodCardProps {
  mood: Mood;
  onSelect: (mood: Mood) => void;
  disabled?: boolean;
}

export function MoodCard({ mood, onSelect, disabled }: MoodCardProps) {
  return (
    <button
      onClick={() => !disabled && onSelect(mood)}
      disabled={disabled}
      className="flex flex-col items-center justify-center gap-1.5 rounded-2xl p-4 sm:p-5 bg-white text-foreground shadow-sm border border-border cursor-pointer select-none min-h-[100px] sm:min-h-[120px] w-full active:scale-[0.97] transition-transform"
    >
      <span className="text-3xl sm:text-4xl">{mood.emoji}</span>
      <span className="text-sm sm:text-base font-semibold leading-tight">
        {mood.name}
      </span>
      <span className="text-xs text-muted-foreground leading-tight">
        {mood.description}
      </span>
    </button>
  );
}
