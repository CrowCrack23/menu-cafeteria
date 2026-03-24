# Data Model: Combo Generation — Mood-Based Personalized Results

**Date**: 2026-03-24
**Branch**: `002-combo-generation`

## Entities

### FoodItem

An individual food item that can appear in a combo.

| Field | Type | Description |
|-------|------|-------------|
| name | string | Display name in Spanish (e.g., "Sándwich Club") |
| description | string | Short witty description in Spanish |
| emoji | string | Emoji representing the item |
| category | "main" \| "side" \| "drink" \| "dessert" | Item category (flexible mix) |

### Combo

A complete food combination tailored to a mood.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier (e.g., "energized-01") |
| name | string | Creative combo name in Spanish (e.g., "La Descarga Total") |
| message | string | Personalized witty message referencing the mood |
| items | FoodItem[] | 3-4 food items (flexible category mix) |
| matchScore | number | Predetermined match percentage (70-98) |
| moodId | string | Associated mood ID from 001-main-view |

**Constraints**:
- `items` array MUST contain 3 or 4 elements
- `matchScore` range: 70-98 (always high to maintain positive experience; never 100 to feel realistic)
- `name` MUST be unique within the same mood's combo pool
- All text fields MUST be in Spanish with playful/witty tone

### ComboDataset (per mood)

Predefined pool of combos for a single mood.

| Field | Type | Description |
|-------|------|-------------|
| moodId | string | Links to Mood entity from 001-main-view |
| combos | Combo[] | Array of 8-10 predefined combos |

**Constraints**:
- Minimum 8 combos per mood
- Combos within the same mood MUST have distinct names and item sets
- Items MAY overlap across combos within a mood (e.g., same drink in multiple combos)

### Session Store Extension

Add to existing UserSession (from 001-main-view):

| Field | Type | Description |
|-------|------|-------------|
| comboIndices | Record<string, number> | Per-mood cycling index (e.g., `{ "energized": 3, "chill": 1 }`) |
| lastCombo | { moodId: string, comboId: string } \| null | Last viewed combo for continuity |

## Sample Combo Dataset (Energizado mood)

| # | Name | Message | Items | Score |
|---|------|---------|-------|-------|
| 1 | La Descarga Total | Tu energía necesita combustible premium | Wrap de pollo + Ensalada de quinoa + Jugo verde + Barrita energética | 94% |
| 2 | Turbo Matutino | Arranca el día como un cohete | Tostada de aguacate + Fruta picada + Café americano | 88% |
| 3 | Power Combo | Para los que no paran | Burrito de carne + Papas al horno + Smoothie de mango | 91% |
| 4 | El Imparable | Nada te detiene con esto | Sándwich club + Mix de frutos secos + Agua mineral + Plátano | 85% |

*(8-10 combos per mood in full implementation)*

## State Transitions

### Combo Generation Flow

```
User arrives at /combo?mood={id}:
  IF mood is missing or invalid:
    → Show error state with "Ir al inicio" button

  ELSE:
    → Set stage = "generating"
    → Show skeleton shimmer (1.5s)

    → Set stage = "revealing"
    → Get comboIndex for this mood from session store
    → Select combo = dataset[moodId][comboIndex % pool.length]
    → Increment comboIndex in store
    → Progressive reveal: name (0s) → message (0.3s) → items (0.3s each) → score (0.3s)

    → Set stage = "complete"
    → Show action buttons (Otro combo, Compartir, Cambiar mood)

User taps "Otro combo":
  IF stage != "complete": ignore (debounce)
  → Set stage = "exiting"
  → Current combo fades out (0.3s)
  → Set stage = "generating"
  → Repeat generation flow with next comboIndex

User taps "Compartir":
  → Show share card modal overlay
  → User can: tap native share, or close modal

User taps "Cambiar mood":
  → Fade out combo screen
  → Navigate to / (main view)
```
