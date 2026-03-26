import { moods } from "@/lib/moods";
import type { Mood } from "@/lib/moods";
import { MoodCard } from "./mood-card";

interface MoodGridProps {
  onSelect: (mood: Mood) => void;
  disabled?: boolean;
}

export function MoodGrid({ onSelect, disabled }: MoodGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 w-full max-w-md mx-auto sm:grid-cols-3 sm:max-w-lg">
      {moods.map((mood) => (
        <MoodCard key={mood.id} mood={mood} onSelect={onSelect} disabled={disabled} />
      ))}
    </div>
  );
}
