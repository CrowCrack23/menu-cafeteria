# Quickstart: Custom Combo — Personalización de Items

**Branch**: `003-custom-combo`

## Prerequisites

- Node.js 18+, pnpm
- 001-main-view and 002-combo-generation features completed

## Setup

```bash
git checkout 003-custom-combo
pnpm install
pnpm dev
```

## What You Should See

### Customization Entry
1. Select a mood → see combo generate → after reveal completes
2. "Personalizar" button visible alongside "Otro combo" and "Compartir"
3. Tap "Personalizar" → panel slides up from bottom

### Customization Panel
1. **Top section**: Current combo items with remove (X) buttons
2. **Category tabs**: Principal, Acompañamiento, Bebida, Postre (horizontally scrollable)
3. **Product list**: Items in selected category with emoji, name, description
4. Items already in combo appear highlighted/checked

### Interactions to Test

- **Tap a product** → adds to combo (if < 4 items), animates in, score updates
- **Tap remove on combo item** → removes (if > 3 items), animates out, score updates
- **Try to add when at 4 items** → playful message "Máximo 4 items — quita uno primero"
- **Try to remove when at 3 items** → playful message "Necesitas al menos 3 items"
- **Tap already-selected item** → no action (visually marked as selected)
- **Switch category tabs** → product list filters instantly
- **Tap "Listo"** → panel closes, combo result updates with custom items + personalized name
- **Tap "Listo" without changes** → panel closes, original combo preserved
- **Drag panel down or tap backdrop** → panel closes, changes discarded
- **After customizing, tap "Compartir"** → share card shows custom items + updated score
- **After customizing, tap "Otro combo"** → custom changes discarded, new combo generated

## Key Files

| File | Purpose |
|------|---------|
| `app/combo/page.tsx` | Modified — customization state + panel integration |
| `components/customization-panel.tsx` | Slide-up panel container |
| `components/product-catalog.tsx` | Category tabs + product list |
| `components/product-card.tsx` | Individual product card |
| `components/current-combo-editor.tsx` | Current items with remove buttons |
| `components/combo-actions.tsx` | Modified — added "Personalizar" button |
| `lib/product-catalog.ts` | Product deduplication + category grouping |
| `lib/score-calculator.ts` | Deterministic simulated score |

## Validation Checklist

- [ ] "Personalizar" button visible after combo reveal
- [ ] Panel slides up on tap with current items + catalog
- [ ] Category tabs filter products correctly
- [ ] Products already in combo appear highlighted
- [ ] Adding item animates in + score updates
- [ ] Removing item animates out + score updates
- [ ] Cannot go below 3 items (feedback message)
- [ ] Cannot exceed 4 items (feedback message)
- [ ] Cannot add duplicate items
- [ ] "Listo" confirms changes + personalized name
- [ ] Close without "Listo" discards changes
- [ ] Share card reflects custom items
- [ ] "Otro combo" discards customization
- [ ] Mobile viewport (360px) renders correctly
- [ ] All text in Spanish with playful tone
