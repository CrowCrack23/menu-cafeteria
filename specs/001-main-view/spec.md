# Feature Specification: Main View — Mood-Driven Entry Experience

**Feature Branch**: `001-main-view`
**Created**: 2026-03-24
**Status**: Draft
**Input**: User description: "Vista principal del AI Combo Experience: pantalla de inicio emocional con selección de mood, micro-interacciones, transiciones animadas, tono playful, path Surprise Me, bienvenida personalizada, streak, mobile-first con gradientes."

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Mood Selection Flow (Priority: P1)

A user opens the app and is greeted with a personalized welcome message that reflects the time of day and their visit streak. Instead of a menu, they see a set of mood options (max 5) presented as visually rich, animated cards. They tap the mood that resonates with how they feel right now. Each card reacts to hover and tap with micro-interactions (scale, glow, haptic-style feedback). After selecting a mood, a smooth animated transition moves them to the next step in the combo generation flow.

**Why this priority**: This is the core entry point of the entire product. Without mood selection, nothing else works. It embodies Principles I (Emotion Over Functionality), III (Zero Cognitive Load), and VI (Micro-Interactions First).

**Independent Test**: Can be fully tested by opening the app, seeing the welcome message, browsing the mood cards, and selecting one. Delivers the emotional first impression and validates the guided-flow paradigm.

**Acceptance Scenarios**:

1. **Given** a first-time visitor at 9 AM, **When** they open the app, **Then** they see a morning-themed welcome message in Spanish (e.g., "Buenos días, vamos a encender tu vibe") and 5 animated mood cards.
2. **Given** a returning visitor with a 3-day streak, **When** they open the app, **Then** the welcome message references their streak in Spanish (e.g., "3 días seguidos — estás on fire") and the streak indicator is visible.
3. **Given** a user viewing mood cards on mobile, **When** they tap a mood card, **Then** the card plays a selection animation (scale + color shift), a confirmation appears briefly, and a smooth transition begins to the next screen within 300ms.
4. **Given** a user hovering over a mood card on desktop, **When** they hover, **Then** the card responds with a visual effect (subtle lift, glow, or gradient shift).
5. **Given** any user on the main view, **When** they look at the screen, **Then** no traditional menu, product list, or food catalog is visible — only mood-driven options.

---

### User Story 2 — "Surprise Me" Path (Priority: P2)

A user who doesn't want to think about their mood can tap a prominent "Surprise Me" button. The system selects a mood on their behalf using weighted randomness (not pure random) based on time of day and any available localStorage history. The experience feels intentional and curated, not arbitrary. The transition to the next step is immediate and delightful.

**Why this priority**: Fulfills Principle III (Zero Cognitive Load) — always provide defaults. Captures users who would otherwise bounce due to decision fatigue. Critical for the "zero friction" promise.

**Independent Test**: Can be tested by tapping "Surprise Me" without any prior interaction. The system assigns a mood and transitions forward. Delivers value as a standalone shortcut to the combo flow.

**Acceptance Scenarios**:

1. **Given** a user on the main view, **When** they tap "Surprise Me", **Then** a mood is auto-selected with a playful reveal animation (e.g., a spinning/shuffling effect that lands on a mood) and the transition to the next step begins within 3 seconds.
2. **Given** a user who taps "Surprise Me" on consecutive days, **When** they tap it today, **Then** the selected mood differs from yesterday's (stored in localStorage) to avoid obvious repetition.
3. **Given** a user at 10 PM, **When** they tap "Sorpréndeme", **Then** the auto-selected mood skews toward evening-appropriate options (e.g., "Chill" or "Cozy" rather than "Energized").

---

### User Story 3 — Personalized Welcome & Streak Display (Priority: P3)

A returning user sees a welcome message that feels personal: it reflects the time of day, acknowledges their streak, and may include a small reward message at milestone streaks (e.g., day 5, 10, 30). The streak counter is always visible on the main view. First-time visitors see a warm intro message that sets the tone without referencing streaks.

**Why this priority**: Supports Principle VIII (Designed for Habit) and V (Personality is Mandatory). Retention mechanics are simulated but drive repeat engagement. Lower priority because the core flow works without it.

**Independent Test**: Can be tested by visiting the app at different times and with different streak states in localStorage. Delivers the habit-forming and personality layer independently.

**Acceptance Scenarios**:

1. **Given** a first-time visitor (no localStorage data), **When** they open the app, **Then** they see a warm, witty intro message in Spanish (e.g., "¿Primera vez? Vamos a encontrar tu sabor.") with no streak counter.
2. **Given** a returning visitor with a 5-day streak, **When** they open the app, **Then** they see a milestone message in Spanish (e.g., "5 días seguidos — ya te ganaste el derecho a presumir") and the streak badge shows "5" with a celebratory micro-animation.
3. **Given** a visitor who missed a day (streak broken), **When** they open the app, **Then** the streak resets to 1 with an encouraging message in Spanish (e.g., "Volviste — arrancamos racha nueva") rather than a punitive one.
4. **Given** any time of day, **When** the user opens the app, **Then** the welcome message tone matches the time period: morning (energizing), afternoon (upbeat), evening (relaxed/cozy).

---

### Edge Cases

- What happens when localStorage is cleared or unavailable (e.g., incognito mode)? The app treats the user as a first-time visitor with no streak, and all features remain functional.
- What happens when the user rapidly taps multiple mood cards? Only the first tap registers; subsequent taps are debounced until the transition animation completes.
- What happens on extremely slow devices or networks? The main view renders with content visible within 1 second; animations degrade gracefully (reduce complexity) rather than blocking the UI.
- What happens if all 5 mood options feel irrelevant to the user? The "Surprise Me" button is always visible as an escape hatch.
- What happens at exactly midnight (time boundary)? The welcome message uses the new day's time period (morning) and increments the streak if the previous visit was the day before.

## Clarifications

### Session 2026-03-24

- Q: What are the 5 predefined moods? → A: Energized, Chill, Happy, Hungry, Cozy
- Q: What language for all UI copy? → A: Spanish only (all copy, mood names, messages in Spanish)
- Q: What happens after mood selection? → A: Navigate to a new page/route (main view hands off; combo flow is a separate screen)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The main view MUST display a personalized welcome message based on the current time of day (morning/afternoon/evening) using the device's local clock.
- **FR-002**: The main view MUST present exactly 5 mood selection options as visually distinct, animated cards.
- **FR-003**: Every mood card MUST respond to hover (desktop) with a visual effect and to tap/click with a selection animation and confirmation feedback.
- **FR-004**: The main view MUST include a "Sorpréndeme" button that auto-selects a mood using weighted logic (time-of-day influence, no repeat from previous day).
- **FR-005**: The system MUST persist visit streak data across sessions and display a streak counter for returning visitors.
- **FR-006**: The system MUST show milestone messages at streak thresholds (days 5, 10, 30) with celebratory micro-animations.
- **FR-007**: The system MUST reset the streak to 1 (not 0) when a day is missed, with an encouraging (not punitive) message.
- **FR-008**: After mood selection, the system MUST navigate to a separate page/route for the combo generation flow. The transition MUST be animated and complete within 300ms perceived time.
- **FR-009**: The main view MUST NOT display any traditional menu, product list, or food catalog.
- **FR-010**: The main view MUST be fully functional on mobile viewports (360px+) with touch-optimized interactions.
- **FR-011**: The main view MUST use gradient-driven backgrounds with bold, modern styling.
- **FR-012**: All text on the main view MUST be in Spanish, using a playful, confident, slightly witty tone — never robotic, generic, or formal.
- **FR-013**: When localStorage is unavailable, the system MUST degrade gracefully: treat the user as a first-time visitor with all features operational.
- **FR-014**: Rapid/duplicate taps on mood cards MUST be debounced to prevent double-selection.

### Key Entities

- **Mood**: Represents an emotional state the user selects. The 5 predefined moods are: Energized, Chill, Happy, Hungry, Cozy. Attributes: unique identifier, display name, emoji/icon, color palette/gradient, associated energy level, time-of-day weight (e.g., Energized skews morning, Cozy skews evening).
- **UserSession**: Persisted visitor state. Attributes: current streak count, last visit date, last selected mood, total visit count.
- **WelcomeMessage**: Time-and-context-aware greeting. Attributes: time period (morning/afternoon/evening), streak-aware variant, first-visit variant, milestone variant.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users reach mood selection (or tap "Surprise Me") within 5 seconds of opening the app on first visit.
- **SC-002**: Every interactive element on the main view provides visual feedback within 100ms of user action.
- **SC-003**: The main view renders with all content visible within 1 second on a standard mobile connection.
- **SC-004**: 90% of users complete mood selection on their first visit without requiring help or backtracking.
- **SC-005**: Returning visitors see their correct streak count 100% of the time (no data loss or miscalculation).
- **SC-006**: The "Surprise Me" path delivers a mood selection and transition within 3 seconds.
- **SC-007**: No user ever sees placeholder text, broken animations, or static unresponsive UI elements on the main view.

### Assumptions

- The 5 mood options are: Energized, Chill, Happy, Hungry, Cozy. They are predefined and do not change dynamically in Phase 1.
- Time-of-day boundaries: morning (5:00–11:59), afternoon (12:00–17:59), evening (18:00–4:59).
- Streak logic: a "day" is defined by the device's local calendar date. Visiting twice in the same day does not increment the streak.
- Milestone thresholds (5, 10, 30) are initial values and may be adjusted without spec changes.
- After mood selection, the app navigates to a separate page/route. The combo generation flow will be specified in a separate feature.
