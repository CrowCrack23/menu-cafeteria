# Data Model: Custom Combo — Personalización de Items

**Date**: 2026-03-24
**Branch**: `003-custom-combo`

## Entities

### ProductCatalog

Derived at build time from all combo datasets. Not persisted.

| Field | Type | Description |
|-------|------|-------------|
| categories | Record<CategoryKey, FoodItem[]> | Products grouped by category |
| allItems | FoodItem[] | Flat list of all unique products |
| itemCount | number | Total unique products |

**CategoryKey**: `"main"` | `"side"` | `"drink"` | `"dessert"`

**Category labels (Spanish)**:

| Key | Label |
|-----|-------|
| main | Principal |
| side | Acompañamiento |
| drink | Bebida |
| dessert | Postre |

**Constraints**:
- Products are deduplicated by name across all combo datasets
- Each product appears in exactly one category
- Expected: ~40-50 unique products total

### CustomCombo

Extends the existing Combo entity with customization state.

| Field | Type | Description |
|-------|------|-------------|
| originalCombo | Combo | Reference to the generated combo before customization |
| items | FoodItem[] | Current modified item list (3-4 items) |
| matchScore | number | Recalculated simulated score (70-98) |
| name | string | Personalized name (e.g., "Tu versión de La Descarga Total") |
| isCustomized | boolean | `true` if any items differ from original |

**Constraints**:
- `items.length` MUST be 3 or 4 at all times
- `matchScore` range: 70-98
- No duplicate items (by name) within the combo
- `name` format: `"Tu versión de {originalCombo.name}"` when customized

### Score Calculation (Simulated)

```
Input: sorted item names + mood ID → string
Hash: simple djb2 or similar → number
Map: hash % 29 + 70 → score in [70, 98]
```

Always deterministic: same items + mood = same score.

## State Transitions

### Customization Flow

```
User on combo result screen (stage = "complete"):
  → Taps "Personalizar"
  → Open customization panel (slide up)
  → Initialize custom items = [...currentCombo.items]
  → Initialize custom score = currentCombo.matchScore

In customization panel:
  → User browses categories via tabs
  → User taps item in catalog:
      IF item already in combo → no action (already selected)
      IF combo has 4 items → show "Máximo 4 items" feedback
      ELSE → add item (animate in), recalculate score

  → User taps remove on combo item:
      IF combo has 3 items → show "Necesitas al menos 3" feedback
      ELSE → remove item (animate out), recalculate score

  → User taps "Listo":
      IF items changed from original:
        → Create CustomCombo with personalized name
        → Update combo result screen
        → Close panel (slide down)
      ELSE:
        → Close panel, keep original combo

  → User taps close/backdrop or drags down:
      → Discard changes
      → Close panel, keep original combo

After customization confirmed:
  → "Compartir" shows custom items + score
  → "Otro combo" discards customization, generates new combo
```
