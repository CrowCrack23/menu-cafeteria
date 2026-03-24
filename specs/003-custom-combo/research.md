# Research: Custom Combo — Personalización de Items

**Date**: 2026-03-24
**Branch**: `003-custom-combo`

## Decisions

### 1. Product Catalog Derivation

**Decision**: Build catalog at import time by deduplicating all FoodItems across all combo datasets
**Rationale**: The existing `combo-datasets.ts` already contains all food items. Extract unique items (by name) and group by category. This avoids maintaining a separate product list and ensures the catalog always matches available combo items. ~40-50 unique items across 5 moods.
**Alternatives considered**:
- Separate product master list: Duplication, risk of divergence from combo datasets.
- Dynamic extraction at render time: Unnecessary computation on every render. Better to pre-compute once.

### 2. Simulated Score Recalculation

**Decision**: Hash-based deterministic formula using item IDs + mood ID
**Rationale**: Use a simple string hash of sorted item names + mood ID, then map to the 70-98 range. This produces consistent scores for the same item set (feels deterministic/intelligent) while varying meaningfully when items change. The user perceives the system is "recalculating compatibility."
**Alternatives considered**:
- Random within range: Would feel inconsistent if same items give different scores.
- Category-based weighting: Over-engineered for a simulated score; adds complexity without user-visible benefit.

### 3. Customization Panel UX Pattern

**Decision**: Bottom sheet / slide-up panel with drag-to-dismiss
**Rationale**: Standard mobile pattern for secondary content. The combo result remains partially visible behind the panel, maintaining context. Framer Motion's `AnimatePresence` + `motion.div` with drag gesture handles the slide-up/down animation and dismiss interaction. No route change needed.
**Alternatives considered**:
- Full-screen modal: Loses context of the combo behind it.
- Side drawer: Not mobile-friendly for product browsing.
- Separate route: Breaks the flow, requires state management across routes.

### 4. Category Tabs Implementation

**Decision**: Horizontal scrollable tabs with active state indicator
**Rationale**: 4 categories (Principal, Acompañamiento, Bebida, Postre) fit on most screens but "Acompañamiento" is a long word. Horizontal scroll with snap ensures all tabs are accessible. Active tab gets a visual indicator (underline or background). Product list below filters instantly on tab change.
**Alternatives considered**:
- Accordion per category: Takes more vertical space, harder to browse.
- Grid with category headers: No filtering, overwhelming on mobile.

### 5. Item Limit Enforcement

**Decision**: Disable add when at 4, disable remove when at 3, with animated feedback messages
**Rationale**: Rather than showing error states, disable the action and show a brief, playful Spanish message that auto-dismisses. For add at 4: "Máximo 4 items — quita uno primero". For remove at 3: "Necesitas al menos 3 items". Messages appear as animated toast-like elements near the action area.
**Alternatives considered**:
- Silent disable (no message): User wouldn't understand why action is blocked.
- Alert/modal: Too disruptive for a simple limit.
