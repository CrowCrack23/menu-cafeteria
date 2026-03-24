# Tasks: Main View — Mood-Driven Entry Experience

**Input**: Design documents from `/specs/001-main-view/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, quickstart.md

**Tests**: No test framework specified — manual testing only (Phase 1).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup

**Purpose**: Install dependencies and create project structure

- [x] T001 Install zustand and framer-motion via `pnpm add zustand framer-motion`
- [x] T002 [P] Update `app/layout.tsx` — change `lang="en"` to `lang="es"`, update metadata title to "AI Combo Experience" and description
- [x] T003 [P] Create directory structure: `components/`, `lib/`, `stores/` at project root
- [x] T004 [P] Extend `app/globals.css` with gradient CSS custom properties and base animation variables for mood card gradients

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core data, utilities, and state store that ALL user stories depend on

**CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 [P] Create mood dataset with 5 moods (id, name, emoji, gradient colors, energyLevel, timeWeights) in `lib/moods.ts` per data-model.md predefined dataset table
- [x] T006 [P] Create time-of-day utility (getTimePeriod returning "morning"/"afternoon"/"evening" based on device clock boundaries 5-11/12-17/18-4) in `lib/time-utils.ts`
- [x] T007 [P] Create Zustand session store with persist middleware (streakCount, lastVisitDate, lastMood, totalVisits) including streak update logic (same-day/consecutive/missed) in `stores/session-store.ts`
- [x] T008 Create Spanish welcome message pool (time-of-day × streak variants: first-visit, regular, milestone days 5/10/30, welcome-back) with getMessage function in `lib/welcome-messages.ts`

**Checkpoint**: Foundation ready — user story implementation can now begin

---

## Phase 3: User Story 1 — Mood Selection Flow (Priority: P1) MVP

**Goal**: User sees 5 animated mood cards, taps one, and navigates to `/combo?mood={id}` with animated transition

**Independent Test**: Open app → see welcome message + 5 mood cards → tap a card → selection animation plays → navigates to `/combo?mood={id}`

### Implementation for User Story 1

- [x] T009 [P] [US1] Create MoodCard component with Framer Motion micro-interactions (whileHover: lift+glow, whileTap: scale, selection: color shift + confirmation) in `components/mood-card.tsx`
- [x] T010 [P] [US1] Create MoodGrid component — responsive grid layout for 5 MoodCards (mobile: stacked/2-col, desktop: row), gradient background in `components/mood-grid.tsx`
- [x] T011 [US1] Create WelcomeBanner component — reads session store + time-of-day, displays basic Spanish greeting (full personalization in US3) in `components/welcome-banner.tsx`
- [x] T012 [US1] Build main page (`app/page.tsx`) — compose WelcomeBanner + MoodGrid, implement mood selection handler with debounce, animated navigation to `/combo?mood={id}` via router.push
- [x] T013 [US1] Create placeholder combo route (`app/combo/page.tsx`) — reads `mood` query param, displays selected mood name/emoji as confirmation that navigation worked

**Checkpoint**: At this point, User Story 1 should be fully functional — user can select a mood and navigate

---

## Phase 4: User Story 2 — "Sorpréndeme" Path (Priority: P2)

**Goal**: User taps "Sorpréndeme" button, system auto-selects a mood using weighted logic, plays reveal animation, navigates

**Independent Test**: Open app → tap "Sorpréndeme" → see shuffle/reveal animation → mood auto-selected → navigates to `/combo?mood={id}`

### Implementation for User Story 2

- [x] T014 [P] [US2] Create weighted mood selection algorithm (get time period → load weights → exclude lastMood → weighted random pick) in `lib/surprise-logic.ts`
- [x] T015 [US2] Create SurpriseButton component with Framer Motion reveal animation (shuffle/spin effect landing on a mood, ≤ 3s total) in `components/surprise-button.tsx`
- [x] T016 [US2] Integrate SurpriseButton into main page (`app/page.tsx`) — place below MoodGrid, wire to surprise logic + session store (save lastMood) + navigation

**Checkpoint**: User Stories 1 AND 2 both work independently

---

## Phase 5: User Story 3 — Personalized Welcome & Streak Display (Priority: P3)

**Goal**: Welcome message is fully personalized (time + streak + milestones), streak badge visible for returning visitors

**Independent Test**: Manipulate localStorage streak data → refresh → verify correct welcome message variant and streak badge display for each scenario (first visit, regular, milestone, welcome back)

### Implementation for User Story 3

- [x] T017 [P] [US3] Create StreakBadge component with streak count display and Framer Motion milestone celebration animation (pulse/bounce at days 5, 10, 30) in `components/streak-badge.tsx`
- [x] T018 [US3] Enhance WelcomeBanner (`components/welcome-banner.tsx`) — integrate full welcome-messages pool, show time-aware + streak-aware + milestone messages, handle first-visit vs returning vs welcome-back variants
- [x] T019 [US3] Integrate StreakBadge into main page (`app/page.tsx`) — show for returning visitors, hide for first-time, trigger milestone animation when applicable

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Mobile responsiveness, graceful degradation, edge cases, final visual tuning

- [x] T020 [P] Mobile responsiveness pass — verify and fix all components at 360px viewport, ensure touch targets ≥ 44px, gradient backgrounds render correctly on mobile in `app/page.tsx` and all `components/*.tsx`
- [x] T021 [P] localStorage graceful degradation — wrap session store reads in try/catch, ensure app works fully when localStorage is unavailable (incognito mode) in `stores/session-store.ts`
- [x] T022 [P] Edge case: tap debounce — ensure rapid taps on mood cards are debounced (disable interaction during transition animation) in `components/mood-card.tsx` and `app/page.tsx`
- [x] T023 Run quickstart.md validation checklist — manually verify all 12 items pass

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on T001 (dependencies installed) — BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Phase 2 completion
- **User Story 2 (Phase 4)**: Depends on Phase 2 completion — can run in parallel with US1 but T016 integrates into page.tsx from T012
- **User Story 3 (Phase 5)**: Depends on Phase 2 completion — can run in parallel with US1/US2 but T018-T019 build on T011-T012
- **Polish (Phase 6)**: Depends on all user stories being complete

### Within Each User Story

- Data/logic files before UI components
- Components before page integration
- Core implementation before polish

### Parallel Opportunities

- T002, T003, T004 can all run in parallel (Setup)
- T005, T006, T007 can all run in parallel (Foundational)
- T009, T010 can run in parallel (US1 components)
- T014 can run in parallel with US1 tasks (different file)
- T017 can run in parallel with US1/US2 tasks (different file)
- T020, T021, T022 can all run in parallel (Polish)

---

## Parallel Example: Phase 2 (Foundational)

```bash
# Launch all foundational tasks together:
Task: "Create mood dataset in lib/moods.ts"
Task: "Create time-of-day utility in lib/time-utils.ts"
Task: "Create Zustand session store in stores/session-store.ts"
# Then sequentially (depends on time-utils):
Task: "Create welcome message pool in lib/welcome-messages.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL — blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Open app, select a mood, confirm navigation works
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → MVP!
3. Add User Story 2 → Test "Sorpréndeme" independently
4. Add User Story 3 → Test streak/welcome personalization independently
5. Polish pass → Mobile, edge cases, final validation

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- No test tasks included — manual testing per quickstart.md checklist
