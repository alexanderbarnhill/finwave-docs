---
title: "Annotator Overview"
description: "What the annotator does, where it opens from, and the keyboard / mouse model"
sidebar:
  order: 1
quickRef:
  - "Workspace overlay opened over an encounter (or review-task / confirmation-queue) page via /annotate/{fileItemId}"
  - "Layout: Konva image canvas on the left, Material tab group on the right (Annotate, Image Info, Health, Image Meta)"
  - "Image navigation: ← / → arrow keys (or toolbar buttons) move between an encounter's photos"
  - "Canvas zoom: mouse wheel — range 0.25× to 6×, factor 1.07 per tick. Pan: mousedown-drag on empty canvas"
  - "Keyboard: Esc closes (or cancels in-progress label), V toggles box visibility, Delete/Backspace removes selected, Ctrl/Cmd+Z undo, Ctrl/Cmd+Shift+Z (or Ctrl+Y) redo"
  - "Five permission gates from the workspace: canAnnotate, canEditImageInfo, canManageHealthConcerns, canSuggestNewAnimals, canDownloadOriginalImage"
  - "Box drag and resize handles are disabled when canAnnotate is false — the canvas is read-only"
---

## What you'll learn

- Where the annotator opens from and what it shows
- The four sidebar tabs and what each is for
- Keyboard and mouse controls
- Which permissions gate which controls

## What the annotator is

The annotator is a workspace overlay for reviewing the photos in an encounter and the annotations on them. Each annotation is a labelled bounding box that links a feature on a photo (typically a dorsal fin) to an individual in the population catalog.

It opens *inside* a parent page rather than as a route of its own. From any of these surfaces you can launch the annotator on a specific photo:

- **Encounter detail** — `encounters/{encounterId}/annotate/{fileItemId}`
- **Review task** — `review-tasks/{populationId}/{taskId}/annotate/{fileItemId}`
- **Confirmation queue** (Workbench) — opens annotated reviews inside the queue's workspace outlet

In all three cases the parent page stays mounted behind the workspace; closing the annotator (Esc or the close button) drops you back where you started.

## Layout

Two regions side-by-side:

**Canvas (left)** — a Konva stage shows the photo with annotation boxes overlaid. The image fits to the available space and you can pan and zoom independently of the page.

**Sidebar (right)** — a Material tab group with four tabs:

| Tab | What's there |
|---|---|
| **Annotate** | The label-box panel for the current selection plus the annotation list grouped by individual |
| **Image Info** | Image-info panel — IPTC metadata, eyepatch presence, per-individual side flags |
| **Health** | Health-concern records tied to individuals or annotations |
| **Image Meta** | Raw image metadata (EXIF / IPTC / XMP) for the current photo |

A toolbar above the canvas exposes Previous / Next photo buttons, a box visibility toggle, image adjustment controls, and a save-state indicator.

## Keyboard and mouse model

### Photo navigation

- **← / →** move to the previous / next photo in the encounter
- **Esc** closes the annotator (or, if you're in the middle of labelling a fresh box, cancels just that pending label)

### Canvas

- **Mouse wheel** — zoom centred on the cursor. Scale clamps to `[0.25, 6]`, with a factor of `1.07` per wheel tick
- **Click-drag on empty canvas** — pan the stage
- **Click a box** — select that annotation; its label panel populates the right side

### Selection actions

- **Delete** or **Backspace** — remove the currently selected annotation
- **V** — toggle box visibility on the canvas (without changing any data)
- **Ctrl/Cmd+Z** — undo. If a label is in progress, undo cancels the in-flight label first
- **Ctrl/Cmd+Shift+Z** or **Ctrl/Cmd+Y** — redo

## Permissions

Five permission flags from the workspace state determine what the annotator allows. The UI hides or disables controls according to these:

| Flag | What it gates |
|---|---|
| `canAnnotate` | Drawing, dragging, resizing, deleting boxes; creating or editing annotations |
| `canEditImageInfo` | Edits in the Image Info tab |
| `canManageHealthConcerns` | Edits in the Health tab |
| `canSuggestNewAnimals` | Suggesting a new individual when labelling a box rather than picking an existing one |
| `canDownloadOriginalImage` | Access to the original full-resolution image (defaults to admin-only via PermissionSettings on the backend) |

When `canAnnotate` is off, the canvas becomes read-only — boxes don't drag, the transformer doesn't attach, and the toolbar's draw entry is disabled. You can still pan, zoom, switch photos, and inspect metadata.

## Related

- [Confirming Predictions](/web/features/annotator/confirming/) — what the Confirm action does on a machine-generated annotation
- [Editing Annotations](/web/features/annotator/editing/) — resize, relabel, change side or category
- [Manual Annotations](/web/features/annotator/manual-annotations/) — drawing a fresh box when the model missed something
- [Annotations](/web/core-concepts/annotations/) — what an annotation is in the data model
- [Confirmation Queue](/web/features/confirmation-queue/) — the prioritised review surface that often launches into the annotator
