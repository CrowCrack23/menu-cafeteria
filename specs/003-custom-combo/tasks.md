# Tasks: Custom Combo — Personalización de Items

**Input**: Design documents from `/specs/003-custom-combo/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, quickstart.md

**Tests**: No test framework specified — manual testing only (Phase 1).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup

**Purpose**: No new dependencies — setup is limited to utility files

*(No setup tasks — all dependencies already installed from previous features)*

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core utilities that ALL user stories depend on

**CRITICAL**: No user story work can begin until this phase is complete

- [x] T001 [P] Create product catalog utility — extract all unique FoodItems from combo datasets, deduplicate by name, group by category, export category labels in Spanish (Principal, Acompañamiento, Bebida, Postre) in `lib/product-catalog.ts`
- [x] T002 [P] Create score calculator — deterministic simulated score from sorted item names + mood ID using djb2 hash mapped to 70-98 range in `lib/score-calculator.ts`

**Checkpoint**: Foundation ready — user story implementation can now begin

---

## Phase 3: User Story 1 — Enter Customization & Browse Products (Priority: P1) MVP

**Goal**: User taps "Personalizar", panel slides up showing current combo items and browsable product catalog by category

**Independent Test**: From completed combo → tap "Personalizar" → panel opens with current items + category tabs → browse products → items in combo highlighted

### Implementation for User Story 1

- [x] T003 [P] [US1] Create ProductCard component — individual product display (emoji, name, description) with selected/unselected states, tap handler, uses `style` for rgba colors to avoid oklab Framer Motion issues in `components/product-card.tsx`
- [x] T004 [P] [US1] Create ProductCatalog component — horizontal scrollable category tabs (Principal, Acompañamiento, Bebida, Postre) with active indicator, filtered product list below, receives selectedItems and onAdd callback in `components/product-catalog.tsx`
- [x] T005 [P] [US1] Create CurrentComboEditor component — displays current combo items as removable cards (emoji + name + X button), horizontal scrollable row, receives items and onRemove callback in `components/current-combo-editor.tsx`
- [x] T006 [US1] Create CustomizationPanel component — slide-up bottom sheet with drag-to-dismiss (Framer Motion drag gesture), contains CurrentComboEditor at top + ProductCatalog below + "Listo" button at bottom, backdrop overlay, receives combo + mood + onConfirm + onClose in `components/customization-panel.tsx`
- [x] T007 [US1] Add "Personalizar" button to ComboActions — insert between "Otro combo" and "Compartir" with edit/pencil emoji, same styling pattern in `components/combo-actions.tsx`

**Checkpoint**: User Story 1 functional — user can open panel, browse categories, see current items

---

## Phase 4: User Story 2 — Remove & Add Items (Priority: P2)

**Goal**: User removes/adds items with animations, combo enforces 3-4 limit, match score updates in real time

**Independent Test**: In customization panel → remove an item (animates out) → add a different one (animates in) → score updates → limits enforced with feedback messages

### Implementation for User Story 2

- [x] T008 [US2] Implement add/remove logic in CustomizationPanel — local state for customItems, add handler (check max 4 + no duplicates), remove handler (check min 3), recalculate score via score-calculator on each change, animated feedback messages for limit violations (auto-dismiss after 2s) in `components/customization-panel.tsx`
- [x] T009 [US2] Add animated entrance/exit for items in CurrentComboEditor — Framer Motion AnimatePresence for item add (slide-in) and remove (slide-out) transitions in `components/current-combo-editor.tsx`
- [x] T010 [US2] Wire live match score update — pass recalculated score to a MatchScore component instance inside the customization panel, animate on each change in `components/customization-panel.tsx`

**Checkpoint**: User Stories 1 AND 2 both work — full add/remove with animations and score

---

## Phase 5: User Story 3 — Confirm & Share Custom Combo (Priority: P3)

**Goal**: "Listo" confirms custom combo, result screen updates with personalized name, share shows custom items

**Independent Test**: Customize items → tap "Listo" → panel closes → combo result shows "Tu versión de..." + custom items + new score → "Compartir" reflects changes

### Implementation for User Story 3

- [x] T011 [US3] Integrate customization flow into combo page — add customization state (showCustomPanel, customCombo), "Personalizar" opens panel, "Listo" callback creates CustomCombo with personalized name ("Tu versión de {original}"), updates displayed combo, "Otro combo" discards customization in `app/combo/page.tsx`
- [x] T012 [US3] Ensure share card and share-utils handle custom combos — verify ComboResult, ShareCard, and shareCombo work with modified items/score/name (should work via existing Combo interface, test that personalized name appears correctly) in `components/share-card.tsx` and `components/combo-result.tsx`

**Checkpoint**: All user stories functional — full customization loop with share

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Mobile responsiveness, edge cases, final visual tuning

- [x] T013 [P] Mobile responsiveness pass — verify customization panel at 360px viewport, ensure category tabs scroll horizontally, product cards fit without overflow, "Listo" button always visible above keyboard area in `components/customization-panel.tsx` and `components/product-catalog.tsx`
- [x] T014 [P] Edge case: dismiss without confirm — verify dragging panel down or tapping backdrop discards all changes and restores original combo in `components/customization-panel.tsx`
- [ ] T015 Run quickstart.md validation checklist — manually verify all 15 items pass

---

## Dependencies & Execution Order

### Phase Dependencies

- **Foundational (Phase 2)**: No dependencies — can start immediately
- **User Story 1 (Phase 3)**: Depends on Phase 2 completion
- **User Story 2 (Phase 4)**: Depends on US1 (T006 — CustomizationPanel must exist)
- **User Story 3 (Phase 5)**: Depends on US2 (T008 — add/remove logic must exist)
- **Polish (Phase 6)**: Depends on all user stories being complete

### Within Each User Story

- Utility/logic files before UI components
- Components before page integration
- Core implementation before polish

### Parallel Opportunities

- T001, T002 can run in parallel (Foundational)
- T003, T004, T005 can run in parallel (US1 components)
- T013, T014 can run in parallel (Polish)

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 2: Foundational (product catalog, score calculator)
2. Complete Phase 3: User Story 1 (panel + browse)
3. **STOP and VALIDATE**: Tap "Personalizar", browse products by category
4. Deploy/demo if ready

### Incremental Delivery

1. Foundational → Catalog + score utilities ready
2. User Story 1 → Panel opens, browse products → MVP!
3. User Story 2 → Add/remove items with limits + live score
4. User Story 3 → Confirm + personalized name + share custom combo
5. Polish pass → Mobile, edge cases, validation

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- This feature modifies existing files: `app/combo/page.tsx`, `components/combo-actions.tsx`
- Depends on 002-combo-generation: combo datasets, combo page, share infrastructure, MatchScore component
- Use `style={{ backgroundColor: "rgba(...)" }}` for Framer Motion animated elements (avoid oklab color warnings)
- Commit after each task or logical group
