---
title: "Manual Annotations"
description: "Drawing a fresh annotation when the model didn't catch a feature"
sidebar:
  order: 4
quickRef:
  - "Two ways to start a draw: click-and-drag on empty canvas, or hold Shift and click-drag anywhere (works over existing boxes too)"
  - "While dragging the box renders dashed white at 2px stroke; aspect ratio is honoured if a fixed aspect is configured"
  - "Boxes smaller than 10px on screen, OR smaller than the configured minimum image-pixel size, are rejected and discarded"
  - "Coordinates are converted to image-pixel space and clamped to the image bounds before being passed to the label panel"
  - "After draw completes, the label-box-panel opens to collect category, identifier, and side. Cancel via Esc or Ctrl/Cmd+Z"
  - "Saving a manually-drawn annotation creates it with isMachine=false, confirmed=true, and you as annotatedByUser — no separate confirm step"
  - "Identifier autocomplete searches existing animals; typing a new identifier requires canSuggestNewAnimals (and passes ProIdVerifier validation if active)"
  - "Duplicate-category guard rejects a save where the same animal already has an annotation in the same category on this image"
  - "Drawing is one-shot — after save (or cancel), the draw tool disposes; the workspace re-enables it for the next box"
---

## What you'll learn

- How to start drawing a new bounding box
- What size limits the draw tool enforces
- The label-and-save flow
- What an annotation looks like after you save it manually

## Starting a draw

A new bounding box starts on **mousedown**. The annotator accepts the start in two cases:

- **Click on empty canvas** — the mousedown target is the stage or the image background, not an existing box
- **Shift + click-drag** — works anywhere, including over an existing box

Both paths require `canAnnotate` to be true (see [Annotator Overview → Permissions](/web/features/annotator/overview/#permissions)). If your role doesn't permit annotation, the draw tool is gated off entirely.

## What you see while dragging

While you hold the mouse and move it, the in-progress box renders as a **dashed white rectangle**, 2px stroke. The size follows your cursor in real time.

If the population (or this encounter) has a **fixed aspect ratio** configured, the box is constrained to that ratio while you drag — width and height grow together.

You can drop the mouse to commit the box. If you change your mind mid-drag, drag back to a point that produces too small a box (under the size threshold below) and the box is discarded automatically on mouseup.

## Size guards

Two minimums are enforced when you release the mouse:

- **Stage minimum** — default 10 pixels on screen. Boxes that are too small visually are rejected so accidental clicks don't create stray annotations.
- **Image minimum** — at least the configured minimum size in image-pixel space (1px floor). After zooming, what looks reasonable on screen may still be too small in image pixels; this guard catches that.

A rejected box destroys the in-progress group and triggers the workspace's `onBoxTooSmall` handler so you can show a hint if needed.

## Coordinate conversion

When the box is accepted, the draw tool converts its dimensions from stage space (which accounts for current pan and zoom) to **image-pixel space**, clamps the result to the image's natural bounds, and passes a `{ x, y, w, h }` payload (in image pixels) to the workspace. The workspace then converts to relative `[0, 1]` coordinates for storage.

This means drawing at high zoom produces the same final box you'd get drawing at low zoom — only the precision differs.

## The label-box-panel

After a successful draw, the **label-box-panel** opens in the right-hand sidebar. It collects:

- **Category** — buttons for the population's enabled categories (e.g. `dorsal-fin`, `eye-patch`, etc., as configured per encounter or per population)
- **Identifier** — autocomplete that searches existing animals in the population by identifier or alternate IDs. Typing a value not in the list opens the path to create a new animal.
- **Side** — the current image-info side seeds this; you can override per annotation

Click **Save** in the panel to commit. **Cancel** (the panel's cancel button, `Esc`, or `Ctrl/Cmd+Z` while the panel is open) discards the pending box.

### Creating a new animal mid-draw

If you type an identifier that doesn't match any existing animal:

- The action requires the `canSuggestNewAnimals` permission. Without it, save returns an error toast.
- If the population has the `ProIdVerifier` feature active and a verifier config is enabled, the typed identifier is validated against the population's identifier rule. Invalid identifiers produce an error and the animal isn't created.
- If both checks pass, the animal API creates a provisional record and the new animal is then used as the annotation's identity.

## What gets saved

When you save, the workspace runs the duplicate-category guard first:

> Reject the save if this image already has an annotation with the same animal *and* the same category.

If the guard passes, the box's stroke switches from dashed white to the category's solid colour, an identifier label is attached above the box, and a new annotation is added via `annStore.add(key, …)` with these fields:

| Field | Value |
|---|---|
| `id` | A fresh client-side id (`ann-` + base36 timestamp + random suffix) |
| `box` | The relative box you drew |
| `animal` | The picked or newly-created animal |
| `category` | The chosen category |
| `isMachine` | `false` |
| `confirmed` | `true` |
| `annotatedByUser` | The current user |
| `side` | The side selected in the label panel |
| `createdAt` | Now |

So manually-drawn annotations land already-confirmed and credited to you in one save. There is no separate confirm step (see [Confirming Predictions](/web/features/annotator/confirming/) for the machine-annotation path).

## After save

The draw controller is disposed (the listeners detach). To draw another box, the workspace re-enables the draw tool — typically by clicking on empty canvas again, or by Shift+clicking. The label-box-panel closes, the pending state clears, and the saved annotation appears in the right-hand list.

## Related

- [Annotator Overview](/web/features/annotator/overview/) — layout, navigation, and permission gates
- [Confirming Predictions](/web/features/annotator/confirming/) — confirming machine-generated annotations
- [Editing Annotations](/web/features/annotator/editing/) — relabel, change side or category, delete
- [Annotations](/web/core-concepts/annotations/) — what an annotation represents in the data model
