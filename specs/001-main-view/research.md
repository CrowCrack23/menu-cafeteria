# Research: Main View — Mood-Driven Entry Experience

**Date**: 2026-03-24
**Branch**: `001-main-view`

## Decisions

### 1. Animation Library

**Decision**: Framer Motion
**Rationale**: Best-in-class React animation library. Supports layout animations, gesture recognition (hover, tap, drag), spring physics, and exit animations. Integrates seamlessly with React 19 and Next.js App Router. The `motion` component API maps directly to the micro-interaction requirements (hover → whileHover, tap → whileTap, selection → animate).
**Alternatives considered**:
- CSS animations only: Insufficient for orchestrated multi-step transitions (mood card selection → route transition). No gesture API.
- React Spring: Comparable quality but Framer Motion has better layout animation support and simpler API for the card-based interactions needed here.
- GSAP: Overkill for this scope, heavier bundle, imperative API doesn't align with React declarative model.

### 2. State Management

**Decision**: Zustand with `persist` middleware (localStorage)
**Rationale**: Constitution mandates Zustand + localStorage. Minimal boilerplate, no providers needed, works with React 19 concurrent features. The `persist` middleware handles serialization/deserialization and storage gracefully. Supports `partialize` to persist only streak/session data while keeping UI state ephemeral.
**Alternatives considered**:
- React Context + useReducer: More boilerplate, no built-in persistence, context re-renders all consumers.
- Jotai/Recoil: Atomic model unnecessary for this simple store shape.

### 3. Styling Approach

**Decision**: Tailwind CSS 4 + CSS custom properties for gradients
**Rationale**: Already installed. Tailwind 4 supports dynamic gradients via CSS variables. Combined with `tw-animate-css` (installed) for base animation utilities and Framer Motion for complex interactions. shadcn/ui components available for any UI primitives needed.
**Alternatives considered**:
- CSS Modules: Would lose utility-first speed and consistency with existing project setup.
- Styled Components: Runtime CSS-in-JS adds bundle weight and conflicts with React Server Components.

### 4. Routing After Mood Selection

**Decision**: Next.js App Router navigation (`router.push('/combo?mood=X')`)
**Rationale**: The spec requires navigating to a separate page/route after mood selection. Using query params to pass the selected mood keeps it simple, bookmarkable, and stateless (the combo page can also read from the Zustand store as fallback). Next.js App Router handles prefetching and transitions natively.
**Alternatives considered**:
- Store-only (no URL param): Breaks if user refreshes the combo page.
- Dynamic route `/combo/[mood]`: Slightly cleaner URLs but adds a dynamic segment for only 5 values — unnecessary complexity.

### 5. Weighted Random Algorithm for "Sorpréndeme"

**Decision**: Time-of-day weighted selection with history exclusion
**Rationale**: Each mood has a weight per time period (morning/afternoon/evening). The algorithm: (1) get current time period, (2) load weights for that period, (3) exclude yesterday's mood from candidates, (4) select using weighted random from remaining candidates. This satisfies the "no repeat from previous day" and "time-appropriate" requirements while feeling curated.
**Alternatives considered**:
- Pure random with exclusion: Would feel arbitrary at certain times (e.g., "Energized" at 11 PM).
- Round-robin: Too predictable, breaks the "illusion of intelligence."

### 6. Streak Calculation

**Decision**: Calendar-date comparison using device local time
**Rationale**: Spec defines a "day" as device local calendar date. On each visit: compare `lastVisitDate` to today. If same day → no change. If yesterday → increment streak. If older → reset to 1. Store as ISO date string in localStorage via Zustand persist.
**Alternatives considered**:
- UTC-based dates: Would cause streak breaks near midnight for users in negative UTC offsets.
- Timestamp-based (24h window): Ambiguous — visiting at 8 AM then 9 AM next day is < 24h but should count as consecutive days.
