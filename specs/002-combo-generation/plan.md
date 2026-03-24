# Implementation Plan: Combo Generation — Mood-Based Personalized Results

**Branch**: `002-combo-generation` | **Date**: 2026-03-24 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-combo-generation/spec.md`

## Summary

Replace the placeholder combo page with the full combo generation experience. When a user arrives at `/combo?mood={id}`, they see a simulated "generating" animation followed by a progressive reveal of a personalized combo: creative name → witty message → food items one by one → animated circular match score meter. Includes "Otro combo" (regenerate), "Compartir" (shareable card with Web Share API fallback), and "Cambiar mood" (navigate back). All combos from predefined datasets, deterministic logic, Spanish copy, mood-gradient backgrounds. Depends on 001-main-view (moods, session store, gradients).

## Technical Context

**Language/Version**: TypeScript 5.x on Next.js 16.2.1 (App Router)
**Primary Dependencies**: React 19, Next.js 16, Tailwind CSS 4, Zustand (installed), Framer Motion (installed), shadcn/ui (installed)
**Storage**: localStorage via Zustand persist middleware (existing from 001-main-view)
**Testing**: Manual testing (Phase 1)
**Target Platform**: Web — mobile-first (360px+), desktop responsive
**Project Type**: Web application (frontend-only, no backend in Phase 1)
**Performance Goals**: First combo element visible < 3s, full reveal < 5s, regeneration < 3s, share card < 1s
**Constraints**: No backend, no API calls, all data local, Spanish-only UI, 8-10 combos per mood minimum
**Scale/Scope**: Single page replacing existing placeholder, ~50 food items across 5 mood datasets

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| # | Principle | Gate Question | Status |
|---|-----------|--------------|--------|
| I | Emotion Over Functionality | Does the combo screen center on the user's emotional state? | PASS — Combo is tailored to selected mood, message references feeling |
| II | Illusion of Intelligence | Does combo generation use controlled logic, not pure random? | PASS — Predefined datasets, no-repeat logic, mood-influenced output |
| III | Zero Cognitive Load | Are user options minimal and clear? | PASS — 3 action buttons (Otro combo, Compartir, Cambiar mood) |
| IV | Instant Delight | Is time to emotional payoff < 3s? | PASS — Generating animation + first element within 3s |
| V | Personality is Mandatory | Is tone playful, confident, witty? | PASS — All copy in Spanish, personality-driven messages per combo |
| VI | Micro-Interactions First | Does every action trigger feedback? | PASS — Progressive reveal animations, button hover/tap states |
| VII | Experience Over Accuracy | Is perceived relevance prioritized? | PASS — Match score is predetermined for illusion, not calculated |
| VIII | Designed for Habit | Are retention mechanics present? | PASS — Session store persists last combo for continuity |
| IX | Shareability Built-In | Is the result shareable and identity-driven? | PASS — Shareable card with branded layout, native share + clipboard fallback |
| X | Performance is Non-Negotiable | Mobile-first, no blocking UI? | PASS — All targets defined, mobile-first design |

**Gate result**: PASS — All 10 principles satisfied.

## Project Structure

### Documentation (this feature)

```text
specs/002-combo-generation/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
app/
├── combo/
│   └── page.tsx                  # Combo generation page (replace existing placeholder)
components/
├── combo-result.tsx              # Full combo display (name, message, items, score)
├── combo-item-card.tsx           # Individual food item card with entrance animation
├── match-score.tsx               # Animated circular/radial meter with percentage
├── generating-animation.tsx      # Shimmer/pulse "generating" loading state
├── share-card.tsx                # Screenshot-friendly shareable card overlay
├── combo-actions.tsx             # Action buttons bar (Otro combo, Compartir, Cambiar mood)
lib/
├── combo-datasets.ts             # Predefined combo pools per mood (8-10 combos each)
├── combo-generator.ts            # Selection logic (mood-based, no-repeat, cycling)
├── share-utils.ts                # Web Share API wrapper with clipboard fallback
stores/
└── session-store.ts              # (existing) Add lastComboIndex per mood for no-repeat
```

**Structure Decision**: Extends existing Next.js App Router structure from 001-main-view. New components and lib files at root level. Replaces the existing placeholder `app/combo/page.tsx`. No new routes needed.

## Complexity Tracking

> No Constitution Check violations — this section is intentionally empty.
