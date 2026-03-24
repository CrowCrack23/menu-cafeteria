<!--
Sync Impact Report
===================
- Version change: 0.0.0 → 1.0.0
- Rationale: Initial constitution ratification (MAJOR)
- Modified principles: N/A (initial creation)
- Added sections:
  - 10 Core Principles (Emotion Over Functionality through
    Performance is Non-Negotiable)
  - Fake Intelligence Layer (Phase 1 Rules)
  - UX/UI & Interaction Standards
  - Governance
- Removed sections: None
- Templates requiring updates:
  - .specify/templates/plan-template.md — ⚠ pending
    (Constitution Check gates must be derived from these
    principles at plan time)
  - .specify/templates/spec-template.md — ✅ no changes needed
    (spec structure is generic enough)
  - .specify/templates/tasks-template.md — ✅ no changes needed
    (task phases remain generic)
- No command files found to update.
- Follow-up TODOs: None.
-->

# AI Combo Experience Constitution

## Core Principles

### I. Emotion Over Functionality

Every screen MUST start from how the user feels, not what they
want to buy.

- No traditional menus as an entry point
- Mood selection is mandatory or strongly encouraged
- The UI MUST guide, not ask
- We do not sell food — we create emotionally engaging,
  low-friction experiences

### II. Illusion of Intelligence

Even without AI or backend, the system MUST feel smart.

- Responses MUST feel contextual
- Combos MUST feel "chosen for me"
- Randomness that feels fake is prohibited
- All combos MUST be generated using controlled logic:
  predefined datasets, weighted randomness, context-based
  variations
- Use mood, energy, and craving inputs to simulate intelligence;
  output MUST reflect inputs clearly
- Every generated combo MUST include a unique name, a short
  personality-driven message, and a clear structure (items + tone)
- Never expose `random()`, placeholder text, or obvious
  repetition patterns

### III. Zero Cognitive Load

Users MUST never think too much.

- Max 3-5 options per step
- Always provide defaults
- Include a "Surprise Me" path
- Guided flows, not forms
- Progressive disclosure (step-by-step)

### IV. Instant Delight

Time to emotional payoff MUST be < 3 seconds.

- Fast transitions
- Immediate feedback on every interaction
- No dead time or blank states
- Animated transitions between states

### V. Personality is Mandatory

The product MUST have a clear, consistent voice.

- **Tone**: Playful, confident, slightly witty
- **Never**: Robotic, generic, or overly formal
- Every generated combo narrative MUST maintain this voice

### VI. Micro-Interactions First

Every user action MUST trigger feedback.

- Hover triggers a visual response
- Click triggers an animation
- Selection triggers a confirmation
- No static UI is allowed

### VII. Experience Over Accuracy

Perfect recommendations are not required.

- Perceived relevance > actual correctness
- The product MUST feel personalized even when logic is
  deterministic

### VIII. Designed for Habit

Even in Phase 1, the system MUST simulate retention mechanics.

- Fake streaks via localStorage
- Daily messages
- Subtle "come back" cues
- All simulated mechanics MUST feel real, not fake

### IX. Shareability Built-In

Every result MUST be:

- Visually appealing
- Identity-driven ("this is so me")
- Easy to share

### X. Performance is Non-Negotiable

Speed is part of the experience.

- No blocking UI
- Transitions MUST feel instant
- Optimize for mobile first
- Bold, modern, playful visual style
- Gradient-driven backgrounds
- Clean layouts with strong hierarchy

## Fake Intelligence Layer (Phase 1 Rules)

Phase 1 operates without a backend. Perception is reality.

1. **Deterministic Generation**: All combos MUST use controlled
   logic — predefined datasets, weighted randomness,
   context-based variations. No true randomness.
2. **Believable Personalization**: Mood, energy, and craving
   inputs MUST visibly influence output. Users MUST perceive
   the system as responding to them.
3. **Consistent Narrative**: Every combo MUST include a unique
   name, a personality-driven message, and a structured item
   list with tone.
4. **No Broken Illusions**: Never expose `random()`, placeholder
   text, or obvious repetition patterns. If the illusion breaks,
   the product fails.

## UX/UI & Interaction Standards

### Visual Style

- Bold, modern, playful
- Gradient-driven backgrounds
- Clean layouts with strong hierarchy

### Interaction Style

- Guided flows, not forms
- Progressive disclosure (step-by-step)
- Animated transitions between states

### Emotional Design

Each screen MUST answer: "What should the user feel right now?"

### State Management

- Use local state or lightweight stores (e.g., Zustand)
- Persist key data in localStorage: streaks, last combo, user
  preferences
- State MUST enhance continuity across sessions

### Gamification (Simulated)

- Show streaks
- Trigger rewards
- Unlock messages
- All MUST feel real, not fake

## Governance

This constitution supersedes all other practices for the
AI Combo Experience project.

### Amendment Procedure

1. Propose changes with rationale in writing
2. Document impact on existing features
3. Update this constitution with new version number
4. Propagate changes to dependent templates

### Versioning Policy

- **MAJOR**: Backward-incompatible principle removals or
  redefinitions
- **MINOR**: New principle/section added or materially expanded
- **PATCH**: Clarifications, wording, non-semantic refinements

### Compliance Review

- Every feature spec MUST be validated against these principles
- Every implementation plan MUST include a Constitution Check gate
- UI/UX decisions MUST reference the relevant principle by number

**Version**: 1.0.0 | **Ratified**: 2026-03-24 | **Last Amended**: 2026-03-24
