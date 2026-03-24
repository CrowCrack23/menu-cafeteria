# Quickstart: Combo Generation — Mood-Based Personalized Results

**Branch**: `002-combo-generation`

## Prerequisites

- Node.js 18+
- pnpm
- 001-main-view feature completed (mood data, session store, gradients)

## Setup

```bash
git checkout 002-combo-generation
pnpm install
pnpm dev
```

App runs at `http://localhost:3000`.

## What You Should See

### Combo Screen (via mood selection)
1. Select any mood on the main view → navigate to `/combo?mood={id}`
2. See a skeleton shimmer animation with mood gradient colors (~1.5s)
3. Combo reveals progressively:
   - Creative name in Spanish (e.g., "La Descarga Total")
   - Personalized message referencing the mood
   - 3-4 food items appearing one by one with entrance animation
   - Animated circular match score meter filling to the percentage
4. Action buttons appear: "Otro combo", "Compartir", "Cambiar mood"
5. Background gradient matches the selected mood

### Interactions to Test

- **Tap "Otro combo"** → current combo fades out → new shimmer → different combo revealed
- **Tap "Otro combo" rapidly** → only one regeneration runs (debounce)
- **Tap "Compartir"** → shareable card overlay with combo details + branded footer
- **On share card, tap "Compartir"** → native share dialog (mobile) or "Copiado" toast (desktop)
- **Close share card** → return to combo view
- **Tap "Cambiar mood"** → animated transition back to main view

### Direct URL Test
- Navigate to `http://localhost:3000/combo` (no mood) → friendly error + "Ir al inicio" button
- Navigate to `http://localhost:3000/combo?mood=invalid` → same error state

### Variety Test
- Select the same mood 5+ times → each combo should differ from the previous
- After seeing all combos for a mood, the cycle restarts

## Key Files

| File | Purpose |
|------|---------|
| `app/combo/page.tsx` | Combo page (replaces placeholder) |
| `components/combo-result.tsx` | Full combo display layout |
| `components/combo-item-card.tsx` | Individual food item card |
| `components/match-score.tsx` | Animated circular meter |
| `components/generating-animation.tsx` | Skeleton shimmer loading |
| `components/share-card.tsx` | Shareable card overlay |
| `components/combo-actions.tsx` | Action buttons bar |
| `lib/combo-datasets.ts` | Predefined combo pools (8-10 per mood) |
| `lib/combo-generator.ts` | Selection logic with cycling |
| `lib/share-utils.ts` | Web Share API + clipboard fallback |

## Validation Checklist

- [ ] Generating animation plays on arrival (1-2s shimmer)
- [ ] Combo reveals progressively (name → message → items → score)
- [ ] Combo name is creative and in Spanish
- [ ] Message references the selected mood
- [ ] 3-4 food items with descriptions and emojis
- [ ] Match score shows animated circular meter with percentage
- [ ] Background gradient matches selected mood
- [ ] "Otro combo" generates a different combo
- [ ] "Otro combo" debounces rapid taps
- [ ] "Compartir" shows shareable card overlay
- [ ] Share uses Web Share API or clipboard fallback with "Copiado" toast
- [ ] "Cambiar mood" navigates back to main view
- [ ] Missing/invalid mood shows error with navigation button
- [ ] Mobile viewport (360px) renders correctly
- [ ] No placeholder text, broken animations, or static elements
