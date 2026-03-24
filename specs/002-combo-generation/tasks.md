# Tasks: Combo Generation — Mood-Based Personalized Results

**Input**: Design documents from `/specs/002-combo-generation/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, quickstart.md

**Tests**: No test framework specified — manual testing only (Phase 1).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup

**Purpose**: Extend existing project with combo generation infrastructure

- [x] T001 Extend Zustand session store with `comboIndices` (Record<string, number>) and `lastCombo` fields, plus `getNextComboIndex` and `setLastCombo` actions in `stores/session-store.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core data and utilities that ALL user stories depend on

**CRITICAL**: No user story work can begin until this phase is complete

- [x] T002 [P] Create full combo datasets (8-10 combos per mood, each with id, name, message, items[], matchScore) for all 5 moods in `lib/combo-datasets.ts` per data-model.md sample structure
- [x] T003 [P] Create combo generator logic (select combo by mood + cycling index, no-repeat via index increment, wrap on pool exhaustion) in `lib/combo-generator.ts`
- [x] T004 [P] Create share utilities (Web Share API wrapper with `navigator.share()` when available, `navigator.clipboard.writeText()` fallback, returns status for toast) in `lib/share-utils.ts`

**Checkpoint**: Foundation ready — user story implementation can now begin

---

## Phase 3: User Story 1 — Combo Generation & Progressive Reveal (Priority: P1) MVP

**Goal**: User arrives at combo screen, sees generating animation, then combo reveals progressively (name → message → items → score)

**Independent Test**: Navigate to `/combo?mood=energized` → see shimmer → combo reveals step by step → all elements visible with mood gradient background

### Implementation for User Story 1

- [x] T005 [P] [US1] Create GeneratingAnimation component — skeleton shimmer placeholders (rounded rects for name, message, items, score) with mood gradient shimmer effect, 1.5s duration in `components/generating-animation.tsx`
- [x] T006 [P] [US1] Create ComboItemCard component — individual food item display (emoji, name, description) with Framer Motion entrance animation (opacity + translateY) in `components/combo-item-card.tsx`
- [x] T007 [P] [US1] Create MatchScore component — SVG circle with animated stroke-dashoffset via Framer Motion, percentage text centered inside, mood gradient stroke color in `components/match-score.tsx`
- [x] T008 [US1] Create ComboResult component — orchestrates progressive reveal with staggered children (name at 0s, message at 0.3s, items at 0.3s each, score last), receives combo data + mood as props in `components/combo-result.tsx`
- [x] T009 [US1] Build combo page (`app/combo/page.tsx`) — replace existing placeholder, implement state machine (generating → revealing → complete), read mood from query param, call combo generator, show GeneratingAnimation then ComboResult, mood gradient background, handle missing/invalid mood with error state + "Ir al inicio" link

**Checkpoint**: User Story 1 functional — user can see a generated combo with full progressive reveal

---

## Phase 4: User Story 2 — Regenerate Combo ("Otro combo") (Priority: P2)

**Goal**: User taps "Otro combo", current combo exits, new generating animation plays, different combo appears

**Independent Test**: After seeing a combo, tap "Otro combo" → fade out → shimmer → different combo revealed

### Implementation for User Story 2

- [x] T010 [P] [US2] Create ComboActions component — action buttons bar with "Otro combo" (primary), "Compartir", "Cambiar mood" buttons with Framer Motion hover/tap micro-interactions, appears after reveal completes in `components/combo-actions.tsx`
- [x] T011 [US2] Integrate regeneration into combo page (`app/combo/page.tsx`) — "Otro combo" handler: set stage to "exiting" (AnimatePresence exit), then "generating", then reveal next combo from generator. Debounce: ignore taps when stage != "complete"

**Checkpoint**: User Stories 1 AND 2 both work — user can view and regenerate combos

---

## Phase 5: User Story 3 — Share Combo (Priority: P3)

**Goal**: User taps "Compartir", sees a polished shareable card overlay, can native-share or copy to clipboard

**Independent Test**: After seeing a combo, tap "Compartir" → modal overlay with branded card → tap share action → native dialog or "Copiado" toast → close returns to combo

### Implementation for User Story 3

- [x] T012 [US3] Create ShareCard component — full-screen modal overlay with branded combo card (combo name, mood emoji, all items, circular match score, "AI Combo Experience" footer), mood gradient background, close button (X or tap outside), uses Framer Motion for entrance/exit in `components/share-card.tsx`
- [x] T013 [US3] Integrate share flow into combo page (`app/combo/page.tsx`) — "Compartir" button opens ShareCard modal, share action calls `lib/share-utils.ts`, show "Copiado" toast on clipboard fallback, close returns to combo view

**Checkpoint**: User Stories 1, 2, AND 3 all work — full combo experience with share

---

## Phase 6: User Story 4 — Navigation Back (Priority: P4)

**Goal**: "Cambiar mood" button navigates back to main view with animated transition

**Independent Test**: From combo screen, tap "Cambiar mood" → fade out → main view appears with mood cards

### Implementation for User Story 4

- [x] T014 [US4] Integrate "Cambiar mood" navigation into combo page (`app/combo/page.tsx`) — wire button in ComboActions to router.push('/') with fade-out transition, ensure streak/welcome state not re-incremented on return

**Checkpoint**: All user stories functional

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Mobile responsiveness, edge cases, final visual tuning

- [x] T015 [P] Mobile responsiveness pass — verify combo page at 360px viewport, ensure progressive reveal fits without overflow, action buttons are full-width touch targets (≥48px), share card fits screen in `app/combo/page.tsx` and all `components/*.tsx`
- [x] T016 [P] Edge case: missing/invalid mood — verify error state renders correctly with friendly Spanish message and "Ir al inicio" button in `app/combo/page.tsx`
- [x] T017 [P] Edge case: combo cycling — verify that after viewing all combos for a mood, system wraps to beginning without errors in `lib/combo-generator.ts`
- [ ] T018 Run quickstart.md validation checklist — manually verify all 15 items pass — manually verify all 15 items pass

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — extends existing session store
- **Foundational (Phase 2)**: Depends on T001 — BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Phase 2 completion
- **User Story 2 (Phase 4)**: Depends on US1 (T009 — combo page must exist)
- **User Story 3 (Phase 5)**: Depends on US2 (T010 — ComboActions must exist for "Compartir" button)
- **User Story 4 (Phase 6)**: Depends on US2 (T010 — ComboActions must exist for "Cambiar mood" button)
- **Polish (Phase 7)**: Depends on all user stories being complete

### Within Each User Story

- Data/logic files before UI components
- Components before page integration
- Core implementation before polish

### Parallel Opportunities

- T002, T003, T004 can all run in parallel (Foundational)
- T005, T006, T007 can all run in parallel (US1 components)
- T015, T016, T017 can all run in parallel (Polish)

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (session store extension)
2. Complete Phase 2: Foundational (datasets, generator, share utils)
3. Complete Phase 3: User Story 1 (progressive reveal)
4. **STOP and VALIDATE**: Open app, select mood, see combo generate and reveal
5. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. User Story 1 → Combo generation works → MVP!
3. User Story 2 → "Otro combo" regeneration works
4. User Story 3 → Share card with Web Share / clipboard
5. User Story 4 → "Cambiar mood" navigation
6. Polish pass → Mobile, edge cases, validation

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- This feature replaces the existing placeholder at `app/combo/page.tsx`
- Depends on 001-main-view: mood data (`lib/moods.ts`), session store (`stores/session-store.ts`), gradients (`app/globals.css`)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
