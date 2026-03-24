# Quickstart: Main View — Mood-Driven Entry Experience

**Branch**: `001-main-view`

## Prerequisites

- Node.js 18+
- pnpm (package manager)

## Setup

```bash
# Clone and switch to feature branch
git checkout 001-main-view

# Install dependencies (includes new: zustand, framer-motion)
pnpm install

# Start dev server
pnpm dev
```

App runs at `http://localhost:3000`.

## What You Should See

### First Visit
1. A gradient background with a Spanish welcome message matching the time of day
2. 5 animated mood cards: Energizado ⚡, Chill 😌, Feliz 😄, Hambriento 🍔, Acogedor 🛋️
3. A "Sorpréndeme" button below the cards
4. No streak badge (first visit)

### Interactions to Test
- **Hover** a mood card → subtle lift + glow effect
- **Tap/click** a mood card → scale + color animation → navigates to `/combo?mood={id}`
- **Tap "Sorpréndeme"** → shuffle/reveal animation → auto-selects a mood → navigates
- **Refresh the page** → streak increments (if next calendar day), welcome message updates

### Returning Visit (same day)
- Streak badge visible with count
- Welcome message references streak
- "Sorpréndeme" avoids yesterday's mood

### Milestone Test
To test milestone messages manually, open browser console:
```javascript
// Set a fake 4-day streak, then refresh to trigger day-5 milestone
localStorage.setItem('session-storage', JSON.stringify({
  state: { streakCount: 4, lastVisitDate: '2026-03-23', lastMood: 'chill', totalVisits: 4 },
  version: 0
}));
```

## Key Files

| File | Purpose |
|------|---------|
| `app/page.tsx` | Main view page (mood selection) |
| `components/mood-card.tsx` | Animated mood card component |
| `components/mood-grid.tsx` | Card layout grid |
| `components/surprise-button.tsx` | "Sorpréndeme" with reveal animation |
| `components/welcome-banner.tsx` | Time + streak aware welcome |
| `components/streak-badge.tsx` | Streak counter display |
| `stores/session-store.ts` | Zustand store (persisted) |
| `lib/moods.ts` | Mood dataset (5 moods) |
| `lib/welcome-messages.ts` | Spanish message pool |
| `lib/surprise-logic.ts` | Weighted selection algorithm |
| `lib/time-utils.ts` | Time-of-day helper |

## Validation Checklist

- [ ] Welcome message in Spanish, matches time of day
- [ ] 5 mood cards visible and animated
- [ ] Hover effects work on desktop
- [ ] Tap/click selects mood with animation
- [ ] Navigation to `/combo?mood=X` after selection
- [ ] "Sorpréndeme" selects a mood and navigates
- [ ] Streak persists across page refreshes
- [ ] Streak resets after missed day
- [ ] Milestone message at day 5
- [ ] No traditional menu, product list, or food catalog visible
- [ ] Mobile viewport (360px) renders correctly
- [ ] No placeholder text or broken animations
