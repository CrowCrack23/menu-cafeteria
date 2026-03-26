"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Mood } from "@/lib/moods";
import { useSessionStore } from "@/stores/session-store";
import { getTimePeriod } from "@/lib/time-utils";
import { getWelcomeMessage } from "@/lib/welcome-messages";
import { WelcomeBanner } from "@/components/welcome-banner";
import { MoodGrid } from "@/components/mood-grid";
import { SurpriseButton } from "@/components/surprise-button";
import { StreakBadge } from "@/components/streak-badge";

export default function Home() {
  const router = useRouter();
  const { hasHydrated, updateStreak, setLastMood, lastMood, streakCount } =
    useSessionStore();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [visitInfo, setVisitInfo] = useState<{
    isFirstVisit: boolean;
    isMilestone: boolean;
    streakBroken: boolean;
  } | null>(null);

  useEffect(() => {
    if (!hasHydrated) return;

    const info = updateStreak();
    setVisitInfo(info);

    const currentStreak = useSessionStore.getState().streakCount;

    setWelcomeMessage(
      getWelcomeMessage({
        timePeriod: getTimePeriod(),
        isFirstVisit: info.isFirstVisit,
        streakCount: currentStreak,
        isMilestone: info.isMilestone,
        streakBroken: info.streakBroken,
      }),
    );

    setSubtitle(
      info.isFirstVisit
        ? "Elige tu mood y te armamos el combo perfecto"
        : "¿Cómo te sientes hoy?",
    );
  }, [hasHydrated, updateStreak]);

  const handleMoodSelect = useCallback(
    (mood: Mood) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setLastMood(mood.id);
      router.push(`/combo?mood=${mood.id}`);
    },
    [isTransitioning, setLastMood, router],
  );

  if (!hasHydrated || !visitInfo) {
    return <div className="flex flex-col flex-1 items-center justify-center min-h-dvh" />;
  }

  return (
    <div className="flex flex-col flex-1 items-center min-h-dvh px-4 py-8 pb-24 sm:py-12 sm:justify-center">
      <div className="flex flex-col items-center gap-6 sm:gap-10 w-full max-w-lg my-auto">
        {!visitInfo.isFirstVisit && streakCount > 0 && (
          <StreakBadge count={streakCount} />
        )}
        <WelcomeBanner message={welcomeMessage} subtitle={subtitle} />
        <MoodGrid onSelect={handleMoodSelect} disabled={isTransitioning} />
        <SurpriseButton
          lastMoodId={lastMood}
          onSelect={handleMoodSelect}
          disabled={isTransitioning}
        />
      </div>
    </div>
  );
}
