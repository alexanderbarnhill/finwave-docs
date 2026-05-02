---
title: "Editing Annotations"
description: "Resize the box, change identity / side / category, or delete an annotation"
sidebar:
  order: 3
quickRef:
  - "Resize: select an annotation, then drag the Konva transformer's corner anchors. Aspect ratio is locked, rotation is disabled"
  - "Change identity (relabel): row Edit button → label-box-panel → pick an existing animal or type a new identifier; saving also confirms the annotation if you weren't already confirmed"
  - "Change category: category buttons in the label-box-panel; emits an updateMeta mutation. Box stroke colour follows the category"
  - "Three side-change paths: per-annotation (label-box-panel), image-wide (lock-side toggle in Image Info), per-individual (per-individual side overrides in Image Info)"
  - "Delete: row Delete button (warn-coloured trash) — emits a remove mutation with reason 'user_deleted'. Reversible via Ctrl/Cmd+Z while the workspace is open"
  - "Duplicate-category guard: you can't have two annotations on the same image with the same animal in the same category"
  - "New-animal creation requires canSuggestNewAnimals. With ProIdVerifier active, the identifier is validated against the population's verifier config before the animal is created"
  - "Client emits one of seven mutation kinds: add, updateBox, updateMeta, updateSide, updateSideAll, updateSideByIdentifier, remove"
---

## What you'll learn

- How to resize a box, change the assigned animal, change category, change side, or delete
- The three different ways to set side, and which one to use
- What happens when you commit a label change on an unconfirmed machine annotation
- The guard rails the editor enforces

## Resizing a box

Select an annotation by clicking it. The Konva transformer attaches with eight resize anchors at the corners and edges. Drag any anchor to resize.

Two constraints are enforced at the transformer level:

- **Aspect ratio is locked** (`keepRatio: true`)
- **Rotation is disabled** (`rotateEnabled: false`)

Anchors are 7px with 3px of padding around the box. When you finish dragging, the box's new dimensions are written back to the annotation store via the `updateBox` mutation, which carries both the new and previous box for undo.

You can also drag the box itself to move it (when `canAnnotate` is true; when read-only, dragging is disabled).

## Changing the assigned animal (relabel)

Click an annotation, then the row's pencil-icon **Edit** button. The label-box-panel opens with:

- **Identifier autocomplete** — type to search existing animals in the population
- **Category buttons** — toggle which body feature this annotation represents
- A **Save** action that commits both

When you save with an existing animal selected, the workspace calls `updateAnimal(imageKey, id, animal, currentUser)`. Because the current user is passed in, this single action also sets `confirmed: true` and records you as the `annotatedByUser`. So relabelling a machine annotation in one step both reassigns it and confirms it.

If you type an identifier that doesn't exist, two things happen:

1. **Permission check** — the `canSuggestNewAnimals` flag must be true. Otherwise you get an error toast and the new animal isn't created.
2. **Identifier validation** — if the population has the `ProIdVerifier` feature active and the verifier config is enabled, the identifier you typed is validated against the population's rule. Invalid identifiers produce an error toast and the animal isn't created.

If both checks pass, a new (provisional) animal is created via the animal API, and the annotation is then committed against that new animal.

## Changing the category

Categories represent the body feature the box outlines (`dorsal-fin`, `eye-patch`, etc., as configured per population). Two ways to change it:

- **From the label-box-panel** when you're relabelling — click the category button before saving.
- **Directly on a selected annotation** — `onPanelCategoryChange` updates the existing record by emitting `updateMeta(imageKey, id, { category })` and recolours the on-canvas box stroke to match.

A duplicate-category guard prevents two annotations on the same image from having both the same animal and the same category. If you try to create such a duplicate, the change is rejected.

## Changing side

Side is one of `Left`, `Right`, or `Unknown`. There are **three places** the side can be changed, each with different scope:

| Where | Scope | What it calls |
|---|---|---|
| Label-box-panel (relabel flow) | Single annotation | `updateSide(imageKey, id, side)` → `updateSide` mutation |
| Image Info tab → "lock side" toggle | Every annotation on the current image | `updateSideForAll(imageKey, side)` → `updateSideAll` mutation |
| Image Info tab → per-individual overrides | Every annotation tagged with a given identifier on this image | `updateSideForIdentifier(imageKey, identifier, side)` → `updateSideByIdentifier` mutation |

Use the per-annotation control when one box was assigned the wrong side. Use lock-side when every animal in the photo was shot from the same angle. Use the per-individual override when one animal in a multi-animal photo needs its side overridden specifically.

## Deleting an annotation

Click the row's warn-coloured trash icon, or select an annotation on the canvas and press `Delete` / `Backspace`. The deletion calls `removeWithReason(imageKey, id, 'user_deleted')` and emits a `remove` mutation carrying the removed record plus the reason.

Deletes are undoable while the workspace is open — `Ctrl/Cmd+Z` restores the annotation. Undo history is kept per workspace session.

## What the client actually emits

Every change in the annotator boils down to one of seven mutation kinds the annotation store emits. The persistence service batches and ships them to the server.

| Mutation kind | Triggered by |
|---|---|
| `add` | Creating a new annotation (manual draw, see [Manual Annotations](/web/features/annotator/manual-annotations/)) |
| `updateBox` | Resize complete on an existing annotation |
| `updateMeta` | Confirm; relabel; category change; arbitrary metadata update |
| `updateSide` | Per-annotation side change |
| `updateSideAll` | Image-wide side lock |
| `updateSideByIdentifier` | Per-individual side override |
| `remove` | Delete (carries the previous record and a reason) |

Server-side translation of these mutations into evidence-tier promotion or revision records is not documented here — see the [Evidence Tiers](/web/core-concepts/evidence-tiers/) and [ML Center metrics](/web/ml-center/overview/) pages for the conceptual model.

## Related

- [Annotator Overview](/web/features/annotator/overview/) — layout, navigation, permission gates
- [Confirming Predictions](/web/features/annotator/confirming/) — confirming a fresh ML annotation without changing it
- [Manual Annotations](/web/features/annotator/manual-annotations/) — drawing a fresh box from scratch
- [Annotations](/web/core-concepts/annotations/) — what an annotation represents
