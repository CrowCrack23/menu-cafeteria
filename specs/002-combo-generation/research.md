# Research: Combo Generation — Mood-Based Personalized Results

**Date**: 2026-03-24
**Branch**: `002-combo-generation`

## Decisions

### 1. Combo Dataset Structure

**Decision**: Flat array of combo objects per mood, indexed for cycling
**Rationale**: Each mood has 8-10 predefined combos stored as a typed array. A cycling index (persisted in session store) tracks which combo to show next, ensuring no immediate repeats. When the index exceeds the array length, it wraps to 0. Simple, deterministic, and the dataset is small enough (~50 combos total) to be a single TypeScript file.
**Alternatives considered**:
- Compositional generation (mix-and-match items dynamically): More variety but harder to ensure quality combo names/messages stay coherent with the item set. Risk of "broken illusions."
- JSON file loaded at runtime: Adds unnecessary complexity for a static dataset. TypeScript file gives type safety and tree-shaking.

### 2. Animated Circular Meter (Match Score)

**Decision**: SVG circle with stroke-dashoffset animation via Framer Motion
**Rationale**: An SVG `<circle>` with `stroke-dasharray` and animated `stroke-dashoffset` is the standard approach for radial progress indicators. Framer Motion can animate the dashoffset from 100% to the target percentage with spring/tween physics. The percentage text renders as a centered `<text>` element inside the SVG. Lightweight, no extra dependencies.
**Alternatives considered**:
- Canvas-based: Overkill for a single meter, harder to animate declaratively with React.
- CSS conic-gradient: Browser support is good but harder to animate smoothly and not as precise for the "filling" effect.
- Third-party library (react-circular-progressbar): Adds a dependency for one component. SVG approach is ~30 lines.

### 3. Progressive Reveal Strategy

**Decision**: Framer Motion staggered animation with state-driven stages
**Rationale**: Use a state machine with stages: "generating" → "revealing" → "complete". In the "revealing" stage, Framer Motion's `staggerChildren` on a container animates each child (name, message, items, score) with cascading delays. Each element uses `initial={{ opacity: 0, y: 20 }}` → `animate={{ opacity: 1, y: 0 }}`. The generating phase uses a shimmer/pulse animation on placeholder shapes.
**Alternatives considered**:
- setTimeout chain: Imperative, harder to orchestrate exit animations for regeneration.
- CSS keyframe animations: Less control over stagger timing and exit animations.

### 4. Share Implementation

**Decision**: Web Share API with clipboard text fallback + toast notification
**Rationale**: `navigator.share()` is supported on mobile Safari, Chrome Android, and Edge. For desktop or unsupported browsers, fall back to `navigator.clipboard.writeText()` with the combo text formatted as a shareable message. Show a "Copiado" toast (Framer Motion animated) on clipboard success. The share card itself is a modal overlay with the branded layout — not rendered to an image (too complex for Phase 1).
**Alternatives considered**:
- html2canvas (render card to image): Heavy dependency (~200KB), performance issues on mobile, and canvas taint issues with gradients. Deferred to Phase 2.
- Share URL with query params: No backend to host a shared page. Deferred.

### 5. No-Repeat Logic

**Decision**: Per-mood cycling index stored in Zustand session store
**Rationale**: Each mood tracks a `comboIndex` (number). On generation: return `combos[moodId][comboIndex % combos[moodId].length]`, then increment. On regeneration ("Otro combo"): same logic, next index. The index persists across sessions via localStorage, so returning users see a different combo. When index wraps, the cycle restarts — this is acceptable given 8-10 combos per mood.
**Alternatives considered**:
- Shuffle array on first load: Loses persistence across sessions.
- Track "seen" set: More complex state for minimal benefit with only 8-10 combos.

### 6. Generating Animation

**Decision**: Skeleton shimmer with mood gradient colors
**Rationale**: Show placeholder shapes (rounded rectangles for name, message, items) with a shimmer animation that uses the mood's gradient colors. This feels like the system is "thinking" about the user's mood specifically. After 1.5s, transition to the reveal. Framer Motion's `AnimatePresence` handles the exit of skeleton → entrance of real content.
**Alternatives considered**:
- Spinner/loading indicator: Too generic, breaks "Personality is Mandatory" principle.
- Typing effect: Only works for text, doesn't cover the item cards or score meter.
