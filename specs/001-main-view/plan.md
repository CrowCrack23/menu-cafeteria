# Implementation Plan: Main View — Mood-Driven Entry Experience

**Branch**: `001-main-view` | **Date**: 2026-03-24 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-main-view/spec.md`

## Summary

Build the main entry view of the AI Combo Experience — a mood-driven landing screen that replaces traditional menus with an emotional, guided selection flow. The user sees a personalized welcome message (time-of-day + streak), picks one of 5 animated mood cards (or taps "Sorpréndeme"), and navigates to the combo generation route. All state persisted via Zustand + localStorage. All copy in Spanish. Mobile-first, gradient-driven, micro-interactions on every element.

## Technical Context

**Language/Version**: TypeScript 5.x on Next.js 16.2.1 (App Router)
**Primary Dependencies**: React 19, Next.js 16, Tailwind CSS 4, Zustand (to install), Framer Motion (to install), shadcn/ui (installed), Radix UI (installed), tw-animate-css (installed)
**Storage**: localStorage via Zustand persist middleware (no backend)
**Testing**: Manual testing (Phase 1 — no test framework specified)
**Target Platform**: Web — mobile-first (360px+), desktop responsive
**Project Type**: Web application (frontend-only, no backend in Phase 1)
**Performance Goals**: First paint < 1s, interaction feedback < 100ms, transitions < 300ms
**Constraints**: No backend, no API calls, all data local, Spanish-only UI
**Scale/Scope**: Single-page entry view, 5 mood cards, 1 route transition

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| # | Principle | Gate Question | Status |
|---|-----------|--------------|--------|
| I | Emotion Over Functionality | Does the entry point start from user emotion, not a product menu? | PASS — Mood cards as sole entry, no menu |
| II | Illusion of Intelligence | Does "Sorpréndeme" use controlled logic, not pure random? | PASS — Weighted by time-of-day + history |
| III | Zero Cognitive Load | Are options ≤ 5 per step with defaults? | PASS — 5 moods + "Sorpréndeme" default |
| IV | Instant Delight | Is time to emotional payoff < 3s? | PASS — Welcome + mood cards visible on load |
| V | Personality is Mandatory | Is tone playful, confident, witty in Spanish? | PASS — All copy spec'd in Spanish with tone |
| VI | Micro-Interactions First | Does every action trigger feedback? | PASS — Hover, click, selection all animated |
| VII | Experience Over Accuracy | Is perceived relevance prioritized? | PASS — Mood-driven, not accuracy-driven |
| VIII | Designed for Habit | Are streak/retention mechanics present? | PASS — localStorage streaks + milestones |
| IX | Shareability Built-In | N/A for main view (applies to combo results) | DEFERRED — Will apply in combo feature |
| X | Performance is Non-Negotiable | Mobile-first, no blocking UI, instant transitions? | PASS — Performance targets defined in spec |

**Gate result**: PASS — No violations. Principle IX deferred to combo generation feature.

## Project Structure

### Documentation (this feature)

```text
specs/001-main-view/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
app/
├── layout.tsx                    # Root layout (existing, update lang to "es")
├── page.tsx                      # Main view — mood selection (replace existing)
├── combo/
│   └── page.tsx                  # Combo generation route (placeholder)
├── globals.css                   # Global styles (existing, extend with gradients)
components/
├── mood-card.tsx                 # Individual mood card with micro-interactions
├── mood-grid.tsx                 # Grid/layout of 5 mood cards
├── surprise-button.tsx           # "Sorpréndeme" button with reveal animation
├── welcome-banner.tsx            # Personalized welcome message
├── streak-badge.tsx              # Streak counter display
lib/
├── moods.ts                      # Mood data (5 moods, weights, colors, emojis)
├── welcome-messages.ts           # Spanish message pool (time-of-day × streak)
├── surprise-logic.ts             # Weighted mood selection algorithm
├── time-utils.ts                 # Time-of-day detection (morning/afternoon/evening)
stores/
└── session-store.ts              # Zustand store with localStorage persist
```

**Structure Decision**: Next.js App Router structure. Components, lib, and stores at root level using `@/*` path alias. No `src/` directory (matching existing project convention). No contracts directory needed — this is a frontend-only feature with no external interfaces.

## Complexity Tracking

> No Constitution Check violations — this section is intentionally empty.
