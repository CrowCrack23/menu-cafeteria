# Data Model: Main View — Mood-Driven Entry Experience

**Date**: 2026-03-24
**Branch**: `001-main-view`

## Entities

### Mood

Represents one of the 5 predefined emotional states the user can select.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier (e.g., `"energized"`, `"chill"`) |
| name | string | Display name in Spanish (e.g., `"Energizado"`, `"Chill"`) |
| emoji | string | Emoji/icon representing the mood |
| gradient | [string, string] | Start and end colors for the card gradient |
| energyLevel | number (1-5) | Relative energy level (1 = low, 5 = high) |
| timeWeights | { morning: number, afternoon: number, evening: number } | Selection weight per time period for "Sorpréndeme" |
| description | string | Short witty tagline in Spanish |

**Constraints**:
- Exactly 5 moods exist in Phase 1 (hardcoded dataset)
- Each `id` is unique
- `timeWeights` values are positive numbers; higher = more likely to be selected in that period
- All text fields MUST be in Spanish

### Predefined Mood Dataset

| ID | Name | Emoji | Energy | Morning Weight | Afternoon Weight | Evening Weight |
|----|------|-------|--------|----------------|------------------|----------------|
| energized | Energizado | ⚡ | 5 | 0.35 | 0.20 | 0.05 |
| chill | Chill | 😌 | 2 | 0.10 | 0.20 | 0.35 |
| happy | Feliz | 😄 | 4 | 0.25 | 0.30 | 0.20 |
| hungry | Hambriento | 🍔 | 3 | 0.20 | 0.20 | 0.20 |
| cozy | Acogedor | 🛋️ | 1 | 0.10 | 0.10 | 0.20 |

*Note*: Weights per column sum to 1.0. These are initial values subject to tuning.

### UserSession (Persisted in localStorage)

Represents the visitor's persisted state across sessions.

| Field | Type | Description |
|-------|------|-------------|
| streakCount | number | Current consecutive visit days (min 1) |
| lastVisitDate | string (ISO date) | Last visit calendar date (e.g., `"2026-03-24"`) |
| lastMood | string \| null | ID of last selected mood (for "Sorpréndeme" exclusion) |
| totalVisits | number | Lifetime visit count |

**Constraints**:
- `streakCount` is never 0; resets to 1 on missed day
- `lastVisitDate` uses device local calendar date in ISO format
- `lastMood` is `null` for first-time visitors

### WelcomeMessage

Not persisted — derived at render time from UserSession + current time.

| Field | Type | Description |
|-------|------|-------------|
| timePeriod | `"morning"` \| `"afternoon"` \| `"evening"` | Derived from device clock |
| isFirstVisit | boolean | `true` if no UserSession exists |
| isMilestone | boolean | `true` if streakCount is 5, 10, or 30 |
| streakCount | number | Current streak (0 if first visit) |

**Time period boundaries**:
- Morning: 05:00 – 11:59
- Afternoon: 12:00 – 17:59
- Evening: 18:00 – 04:59

## State Transitions

### Streak Logic

```
On app open:
  IF no UserSession exists:
    → Create session: { streakCount: 1, lastVisitDate: today, lastMood: null, totalVisits: 1 }
    → Show first-visit welcome

  ELSE IF lastVisitDate == today:
    → No streak change (same-day revisit)
    → Increment totalVisits

  ELSE IF lastVisitDate == yesterday:
    → streakCount += 1
    → lastVisitDate = today
    → Increment totalVisits
    → IF streakCount in [5, 10, 30]: show milestone message

  ELSE (missed day):
    → streakCount = 1
    → lastVisitDate = today
    → Increment totalVisits
    → Show "welcome back" message
```

### Mood Selection Flow

```
User on main view:
  → Sees welcome banner + streak badge + 5 mood cards + "Sorpréndeme" button

  IF user taps mood card:
    → Debounce further taps
    → Play selection animation (300ms)
    → Store lastMood = selected mood ID
    → Navigate to /combo?mood={id}

  IF user taps "Sorpréndeme":
    → Get current time period
    → Load time weights for all 5 moods
    → Exclude lastMood from candidates (if not null)
    → Weighted random selection from remaining
    → Play reveal animation (≤ 3s)
    → Store lastMood = selected mood ID
    → Navigate to /combo?mood={id}
```
