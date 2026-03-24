# Implementation Plan: Custom Combo — Personalización de Items

**Branch**: `003-custom-combo` | **Date**: 2026-03-24 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-custom-combo/spec.md`

## Summary

Add a "Personalizar" button to the combo result screen. When tapped, a slide-up panel shows the current combo items and a full product catalog organized by category tabs (Principal, Acompañamiento, Bebida, Postre). Users can remove/add items (3-4 limit enforced), the match score animates in real time, and the customized combo gets a personalized name and is shareable via the existing flow. All data derived from existing combo datasets, no new dependencies needed.

## Technical Context

**Language/Version**: TypeScript 5.x on Next.js 16.2.1 (App Router)
**Primary Dependencies**: React 19, Next.js 16, Tailwind CSS 4, Zustand (installed), Framer Motion (installed)
**Storage**: localStorage via Zustand persist middleware (existing)
**Testing**: Manual testing (Phase 1)
**Target Platform**: Web — mobile-first (360px+), desktop responsive
**Project Type**: Web application (frontend-only)
**Performance Goals**: Panel open < 500ms, item changes reflected < 300ms, customization flow < 15s
**Constraints**: No backend, all data local, Spanish-only UI, product catalog derived from existing combo datasets
**Scale/Scope**: Single panel overlay on existing combo page, ~40-50 unique products across categories

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| # | Principle | Gate Question | Status |
|---|-----------|--------------|--------|
| I | Emotion Over Functionality | Does customization start from user feeling, not a product list? | PASS — Triggered from an emotion-based combo, catalog enhances personal expression |
| II | Illusion of Intelligence | Does score recalculation feel smart? | PASS — Simulated deterministic score, animates as if recalculating |
| III | Zero Cognitive Load | Are options manageable? | PASS — Category tabs limit visible options, 3-4 item limit, clear add/remove |
| IV | Instant Delight | Is feedback immediate? | PASS — Item changes animate < 300ms, score updates in real time |
| V | Personality is Mandatory | Is tone maintained? | PASS — All product descriptions witty/Spanish, feedback messages playful |
| VI | Micro-Interactions First | Does every action trigger feedback? | PASS — Add/remove animations, score animation, blocked-action feedback |
| VII | Experience Over Accuracy | Is perceived relevance prioritized? | PASS — Score is simulated, always 70-98 range, feels meaningful |
| VIII | Designed for Habit | Are retention mechanics present? | PASS — Custom combos stored, shareable — increases return motivation |
| IX | Shareability Built-In | Is the custom result shareable? | PASS — Uses existing share flow with updated items/score |
| X | Performance is Non-Negotiable | Mobile-first, no blocking UI? | PASS — Panel is overlay, no route change, all interactions instant |

**Gate result**: PASS — All 10 principles satisfied.

## Project Structure

### Documentation (this feature)

```text
specs/003-custom-combo/
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
│   └── page.tsx                  # (modify) Add "Personalizar" button + customization state
components/
├── customization-panel.tsx       # Slide-up panel with current items + catalog
├── product-catalog.tsx           # Category tabs + product list
├── product-card.tsx              # Individual product in catalog (add/select state)
├── current-combo-editor.tsx      # Current combo items with remove buttons
├── combo-actions.tsx             # (modify) Add "Personalizar" button
lib/
├── product-catalog.ts            # Deduplicate products from all combo datasets, organize by category
├── score-calculator.ts           # Deterministic simulated score from item set
```

**Structure Decision**: Extends existing combo page with new components. No new routes — customization is a panel overlay. Reuses existing share infrastructure and combo datasets.

## Complexity Tracking

> No Constitution Check violations — this section is intentionally empty.
