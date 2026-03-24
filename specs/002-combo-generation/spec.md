# Feature Specification: Combo Generation — Mood-Based Personalized Results

**Feature Branch**: `002-combo-generation`
**Created**: 2026-03-24
**Status**: Draft
**Input**: User description: "Flujo de generación de combo personalizado basado en mood con revelación animada, share y regeneración."

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Combo Generation & Progressive Reveal (Priority: P1)

After selecting a mood on the main view, the user arrives at the combo screen and sees an animated "generating" sequence that simulates intelligence. The system then reveals the combo progressively: first the creative combo name, then a personalized message, then each food item one by one (3-4 items), and finally a visual "match score" showing how well the combo fits their mood. Each reveal step has its own entrance animation. The entire experience feels curated and personal, not random.

**Why this priority**: This is the core value proposition — the moment the product delivers on its promise. Without combo generation, mood selection has no payoff. Embodies Principles II (Illusion of Intelligence), IV (Instant Delight), and V (Personality is Mandatory).

**Independent Test**: Navigate to the combo screen with a mood parameter → see generating animation → combo revealed progressively (name → message → items → score). Delivers the emotional payoff independently.

**Acceptance Scenarios**:

1. **Given** a user who selected "Energizado" as their mood, **When** they arrive at the combo screen, **Then** they see a brief generating animation (shimmer/pulse effect) lasting 1-2 seconds before the first element reveals.
2. **Given** the generating animation completes, **When** the combo starts revealing, **Then** elements appear sequentially: combo name first, then message (0.3s delay), then each food item one by one (0.3s delay each), then match score last.
3. **Given** a fully revealed combo, **When** the user reads the content, **Then** the combo name is creative and in Spanish, the message references their mood, the items are food-related with short descriptions, and the match score is visually prominent.
4. **Given** the same mood selected on different occasions, **When** the user generates a combo, **Then** they receive a different combo (not the same name/items every time) to maintain the illusion of intelligence.
5. **Given** any mood, **When** a combo is generated, **Then** the background gradient matches the selected mood's color palette.

---

### User Story 2 — Regenerate Combo ("Otro combo") (Priority: P2)

The user can tap an "Otro combo" button to generate a new combo without going back to mood selection. The current combo fades out, the generating animation replays, and a different combo is revealed. The new combo MUST differ from the previous one.

**Why this priority**: Keeps users engaged without breaking the flow. Fulfills Principle III (Zero Cognitive Load) — the user doesn't need to restart the entire journey to explore. Critical for perceived variety and replayability.

**Independent Test**: After seeing a combo, tap "Otro combo" → previous combo exits → new generating animation → different combo revealed.

**Acceptance Scenarios**:

1. **Given** a fully revealed combo, **When** the user taps "Otro combo", **Then** the current combo fades out with an exit animation and a new generating sequence begins.
2. **Given** the user taps "Otro combo", **When** the new combo is revealed, **Then** it has a different name and different items than the previous combo.
3. **Given** the user taps "Otro combo" multiple times, **When** they have seen all available combos for that mood, **Then** the system cycles back to previously seen combos rather than showing an error or empty state.

---

### User Story 3 — Share Combo (Priority: P3)

The user can tap a "Compartir" button to see a visually polished, shareable version of their combo. The share view is designed to be screenshot-friendly and identity-driven ("this is so me"). It includes the combo name, mood emoji, items, match score, and a branded footer. The user can use the native share functionality or screenshot the view.

**Why this priority**: Fulfills Principle IX (Shareability Built-In). Every result must be visually appealing and easy to share. Lower priority because the core experience works without it, but essential for viral growth.

**Independent Test**: After seeing a combo, tap "Compartir" → shareable card appears → visually polished layout suitable for screenshot or native share.

**Acceptance Scenarios**:

1. **Given** a fully revealed combo, **When** the user taps "Compartir", **Then** a full-screen shareable card appears with the combo name, mood emoji, all items, match score, and a branded footer.
2. **Given** the shareable card is visible, **When** the user takes a screenshot, **Then** the card is visually self-contained (no UI chrome, no cut-off elements) and looks like a designed social media post.
3. **Given** the shareable card is visible, **When** the user taps a "Compartir" action, **Then** the system triggers the native share dialog (Web Share API) if available, or copies the card text as fallback.
4. **Given** the shareable card is visible, **When** the user taps outside the card or a close button, **Then** they return to the combo result view.

---

### User Story 4 — Navigation Back to Mood Selection (Priority: P4)

The user can tap "Cambiar mood" to return to the main view and start over with a different mood. The transition back is animated.

**Why this priority**: Basic navigation requirement. Lowest priority because the app already has browser back navigation, but an explicit button provides a better UX.

**Independent Test**: From the combo screen, tap "Cambiar mood" → animated transition → return to main view with mood cards.

**Acceptance Scenarios**:

1. **Given** a user on the combo screen, **When** they tap "Cambiar mood", **Then** the combo screen fades out and the main view appears with an animated transition.
2. **Given** a user who navigates back, **When** they arrive at the main view, **Then** all mood cards are visible and functional, and the streak/welcome state is preserved (no re-increment).

---

### Edge Cases

- What happens if the user navigates directly to `/combo` without a mood parameter? The system shows a friendly message in Spanish and a button to go to mood selection.
- What happens if the mood parameter is invalid (not one of the 5 moods)? Same behavior as missing mood — redirect to mood selection.
- What happens if the user rapidly taps "Otro combo" multiple times? Only one regeneration runs at a time; taps during the generating animation are ignored.
- What happens on very slow devices? The generating animation degrades gracefully (simpler shimmer) and the combo still appears within 3 seconds total.
- What happens if the Web Share API is not available? The share button falls back to copying combo text to clipboard with a "Copiado" confirmation toast.

## Clarifications

### Session 2026-03-24

- Q: Match score visual format? → A: Animated circular/radial meter with percentage inside
- Q: Combo item category structure? → A: Flexible mix of categories, 3-4 items total (no fixed structure required)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The combo screen MUST accept a mood identifier and display a combo tailored to that mood.
- **FR-002**: The system MUST show a generating animation (1-2 seconds) before revealing the combo, simulating intelligent processing.
- **FR-003**: The combo MUST be revealed progressively: name → message → items (one by one) → match score, with animated entrance for each element.
- **FR-004**: Each combo MUST include: a unique creative name in Spanish, a personalized message referencing the mood (playful/witty tone), 3-4 food items with short descriptions, and a visual match score displayed as an animated circular/radial meter with the percentage (0-100%) inside.
- **FR-005**: The system MUST use deterministic logic with predefined datasets to generate combos. No pure randomness — output MUST be influenced by the selected mood.
- **FR-006**: Consecutive combo generations for the same mood MUST produce different results (no immediate repeats of name or item set).
- **FR-007**: The combo screen MUST include an "Otro combo" button that regenerates without returning to mood selection.
- **FR-008**: During regeneration, the current combo MUST exit with an animation before the new generating sequence begins.
- **FR-009**: The combo screen MUST include a "Compartir" button that presents a shareable, screenshot-friendly card view.
- **FR-010**: The shareable card MUST include: combo name, mood emoji, all items, match score, and a branded footer ("AI Combo Experience").
- **FR-011**: The share action MUST use the Web Share API when available, falling back to clipboard copy with a "Copiado" confirmation.
- **FR-012**: The combo screen MUST include a "Cambiar mood" button that navigates back to the main view with an animated transition.
- **FR-013**: The combo screen background MUST use the gradient colors of the selected mood.
- **FR-014**: All text on the combo screen MUST be in Spanish with a playful, confident, slightly witty tone.
- **FR-015**: If the mood parameter is missing or invalid, the system MUST show a friendly error message and a button to navigate to mood selection.
- **FR-016**: Rapid taps on "Otro combo" MUST be debounced — only one regeneration at a time.

### Key Entities

- **Combo**: A generated food combination. Attributes: unique name (Spanish, creative), personalized message, list of 3-4 food items, match score (0-100), associated mood ID.
- **FoodItem**: An individual item within a combo. Attributes: name, short description (witty), emoji/icon, category (main/side/drink/dessert). Category mix within a combo is flexible — no fixed structure required, as long as there are 3-4 items total.
- **ComboDataset**: Predefined pool of combos per mood. Attributes: mood ID, list of available combos, generation rules (which items pair with which moods).
- **ShareCard**: Visual representation of a combo for sharing. Attributes: combo data, mood gradient, branded layout, self-contained visual design.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users see the first combo element (name) within 3 seconds of arriving at the combo screen.
- **SC-002**: The full combo reveal (name through match score) completes within 5 seconds.
- **SC-003**: Regeneration via "Otro combo" delivers a visibly different combo within 3 seconds.
- **SC-004**: The shareable card renders as a self-contained visual within 1 second of tapping "Compartir".
- **SC-005**: 80% of users who see a combo attempt at least one regeneration ("Otro combo"), indicating engagement.
- **SC-006**: No user ever sees the same combo name + items combination twice in a row for the same mood.
- **SC-007**: Every interactive element on the combo screen provides visual feedback within 100ms of user action.
- **SC-008**: The combo screen renders correctly on mobile viewports (360px+) without horizontal overflow or cut-off elements.

### Assumptions

- Each mood has a pool of at least 8-10 unique combos to ensure sufficient variety before cycling.
- Match scores are predetermined per combo (not dynamically calculated) — they are part of the illusion of intelligence.
- Food items are cafeteria-appropriate (sandwiches, drinks, sides, snacks, desserts) — not gourmet or restaurant-level.
- The "Compartir" share card is a UI overlay/modal, not a separate route.
- The combo generation happens entirely client-side with no network requests.
- This feature depends on the mood data and session store from the 001-main-view feature.
