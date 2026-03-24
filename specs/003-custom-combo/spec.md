# Feature Specification: Custom Combo — Personalización de Items

**Feature Branch**: `003-custom-combo`
**Created**: 2026-03-24
**Status**: Draft
**Input**: User description: "Personalización de combo: el usuario puede quitar y agregar items de una lista organizada por categoría, manteniendo 3-4 items, con match score simulado y share."

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Enter Customization Mode & Browse Products (Priority: P1)

From the combo result screen, the user taps a "Personalizar" button. A customization panel slides up showing their current combo items at the top and the full product catalog below, organized by category tabs (Principal, Acompañamiento, Bebida, Postre). Each product shows its name, emoji, and witty description. The user can scroll through products in each category. The current combo items are visually highlighted.

**Why this priority**: This is the foundation — users must be able to see both their current combo and the available products before they can make changes. Embodies Principles III (Zero Cognitive Load) and VI (Micro-Interactions First).

**Independent Test**: From a completed combo, tap "Personalizar" → panel appears with current items highlighted and full product catalog browsable by category.

**Acceptance Scenarios**:

1. **Given** a fully revealed combo on the combo screen, **When** the user taps "Personalizar", **Then** a customization panel slides up showing the current combo items at the top and category tabs below.
2. **Given** the customization panel is open, **When** the user taps a category tab (e.g., "Bebida"), **Then** the product list filters to show only items in that category with name, emoji, and description.
3. **Given** the customization panel is open, **When** the user looks at their current combo items, **Then** each item has a visible "remove" affordance (e.g., an X or minus icon).
4. **Given** the product catalog, **When** an item is already in the current combo, **Then** it appears visually marked/highlighted (e.g., checkmark, different opacity) to distinguish it from available items.

---

### User Story 2 — Remove & Add Items (Priority: P2)

The user can remove an item from their current combo by tapping the remove button on it. They can add a new item from the catalog by tapping on it. The combo MUST maintain 3-4 items at all times — the user cannot go below 3 or above 4 items. Each add/remove triggers a micro-interaction (item animates in/out). The match score updates in real time with each change (simulated recalculation).

**Why this priority**: This is the core interaction — without add/remove, customization has no purpose. Fulfills Principle VI (Micro-Interactions First) and II (Illusion of Intelligence) via score recalculation.

**Independent Test**: Open customization → remove an item → add a different one → see combo update in real time with animated transitions and updated match score.

**Acceptance Scenarios**:

1. **Given** a combo with 4 items, **When** the user taps remove on one item, **Then** the item animates out, the combo now shows 3 items, and the match score updates.
2. **Given** a combo with 3 items, **When** the user tries to remove an item, **Then** the remove action is blocked (3 is the minimum) and a subtle feedback message appears (e.g., "Necesitas al menos 3 items").
3. **Given** a combo with 3 items, **When** the user taps an item from the catalog, **Then** the item animates into the combo (now 4 items) and the match score updates.
4. **Given** a combo with 4 items, **When** the user taps an item from the catalog, **Then** the add action is blocked (4 is the maximum) and a subtle feedback message appears (e.g., "Máximo 4 items — quita uno primero").
5. **Given** any item change, **When** the combo updates, **Then** the match score meter animates to a new value within 300ms.
6. **Given** an item already in the combo, **When** the user taps it in the catalog, **Then** nothing happens (cannot add duplicates) — the item appears as already selected.

---

### User Story 3 — Confirm & Share Custom Combo (Priority: P3)

After making changes, the user taps a "Listo" button to confirm their custom combo. The customization panel closes, and the combo result screen updates to show the personalized combo with its new items and recalculated match score. The combo name changes to reflect it's customized (e.g., adds a "Tu versión de..." prefix or generates a new name). The custom combo can be shared via the existing "Compartir" flow.

**Why this priority**: Closes the customization loop — without confirmation, changes are ephemeral. Shares the custom combo via the existing share infrastructure. Fulfills Principle IX (Shareability Built-In).

**Independent Test**: Customize a combo → tap "Listo" → see updated combo on result screen → tap "Compartir" → share card shows custom items.

**Acceptance Scenarios**:

1. **Given** a user with modified combo items, **When** they tap "Listo", **Then** the customization panel closes with a slide-down animation and the combo result screen shows the updated items and score.
2. **Given** a customized combo, **When** the user views the result, **Then** the combo name indicates it's been personalized (e.g., "Tu versión de La Descarga Total").
3. **Given** a customized combo, **When** the user taps "Compartir", **Then** the share card shows the custom items, updated match score, and personalized combo name.
4. **Given** a user in customization mode, **When** they tap "Listo" without making any changes, **Then** the panel closes and the original combo remains unchanged.

---

### Edge Cases

- What happens if the user opens customization and taps the back/close button without confirming? The panel closes and the original combo is preserved — no changes applied.
- What happens if the product catalog has items that belong to multiple categories? Each item appears in exactly one category based on its primary category.
- What happens if the user removes all items of one category and adds items of another? The combo updates normally — there is no required category mix (flexible structure per clarification from 002-combo-generation).
- What happens if the user taps "Otro combo" after customizing? The customization is discarded and a new generated combo replaces it.
- What happens if the same product appears in multiple predefined combos? The catalog shows each unique product only once, regardless of how many combos use it.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The combo result screen MUST include a "Personalizar" button visible after the combo is fully revealed.
- **FR-002**: Tapping "Personalizar" MUST open a customization panel showing the current combo items and a browsable product catalog.
- **FR-003**: The product catalog MUST be organized by category tabs: Principal, Acompañamiento, Bebida, Postre.
- **FR-004**: Each product in the catalog MUST display its name, emoji, and witty description in Spanish.
- **FR-005**: Items currently in the combo MUST be visually distinguished in the catalog (e.g., checkmark, highlighted state).
- **FR-006**: The user MUST be able to remove items from the combo with an animated exit transition.
- **FR-007**: The user MUST be able to add items from the catalog with an animated entrance transition.
- **FR-008**: The combo MUST maintain a minimum of 3 and maximum of 4 items at all times.
- **FR-009**: Attempts to go below 3 items MUST be blocked with a friendly Spanish feedback message.
- **FR-010**: Attempts to exceed 4 items MUST be blocked with a friendly Spanish feedback message.
- **FR-011**: Duplicate items MUST NOT be allowed in the same combo.
- **FR-012**: The match score MUST visually update (animated) in real time after each item change.
- **FR-013**: The match score recalculation MUST be simulated (deterministic, not truly calculated) to maintain the illusion of intelligence.
- **FR-014**: A "Listo" button MUST confirm the customization, close the panel, and update the combo result screen.
- **FR-015**: Closing the panel without confirming MUST preserve the original combo unchanged.
- **FR-016**: Customized combos MUST display a modified name indicating personalization (e.g., "Tu versión de [original name]").
- **FR-017**: Customized combos MUST be shareable through the existing "Compartir" flow with the updated items and score.
- **FR-018**: All text and feedback messages MUST be in Spanish with a playful, confident, slightly witty tone.

### Key Entities

- **ProductCatalog**: The complete list of unique food items available for customization. Derived from all items across all combo datasets, deduplicated. Organized by category.
- **CustomCombo**: An extended Combo entity where the user has modified the item list. Attributes: original combo reference, modified items list, recalculated match score, personalized name.
- **CategoryTab**: A UI grouping for the product catalog. Values: Principal (main), Acompañamiento (side), Bebida (drink), Postre (dessert).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The customization panel opens within 500ms of tapping "Personalizar".
- **SC-002**: Each item add/remove updates the combo display and match score within 300ms.
- **SC-003**: 100% of item changes are reflected in the combo without page reload.
- **SC-004**: Users can complete a full customization (remove 1 item + add 1 item + confirm) in under 15 seconds.
- **SC-005**: The customized combo is correctly reflected in the share card with all modified items and updated score.
- **SC-006**: No user ever sees a combo with fewer than 3 or more than 4 items during or after customization.
- **SC-007**: The customization panel renders correctly on mobile viewports (360px+) without overflow or cut-off product cards.

### Assumptions

- The product catalog is derived from all unique FoodItems across all combo datasets (deduplication by name).
- Match score "recalculation" uses a simple deterministic formula (e.g., hash-based on item IDs) that always produces a value between 70-98 — it does not need to be semantically meaningful.
- The customization panel is a slide-up overlay on the combo screen, not a separate route.
- If the user taps "Otro combo" after customizing, the custom changes are discarded.
- This feature depends on the combo datasets and share infrastructure from 002-combo-generation.
- Category names in tabs use Spanish labels: Principal, Acompañamiento, Bebida, Postre.
