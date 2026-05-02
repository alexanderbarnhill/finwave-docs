---
title: "Confirming Predictions"
description: "Confirm a machine-generated annotation as a human-verified record"
sidebar:
  order: 2
quickRef:
  - "Confirm button (check_circle icon) appears only on machine-generated annotations that haven't been confirmed yet"
  - "Disabled when the annotation has no animal assigned — you can't confirm an annotation without an identity"
  - "Confirm sets confirmed=true and records you as the annotatedByUser on the annotation record"
  - "Fires an annotation_confirmed usage event (used by ML Center metrics to track human review activity)"
  - "Set as Profile (separate button) requires the annotation to be confirmed AND have a known side (Left/Right) AND a specific category"
  - "No bulk-confirm in the annotator — every confirm is per-annotation. The Confirmation Queue is the prioritised review surface for batches"
  - "No Reject or Skip buttons in the annotator — Delete (warn-coloured trash) removes an annotation entirely"
---

## What you'll learn

- When the Confirm button is offered and when it isn't
- What confirming actually does to the annotation record
- The Set-as-Profile button next to it and how its rules differ
- Where bulk review lives (it's not in the annotator)

## When the Confirm button appears

Each annotation in the right-hand list has a row of action buttons. The Confirm button — a `check_circle` icon — only renders when both of the following are true on the annotation:

- It is **machine-generated** (`isMachine` is `true`)
- It is **not already confirmed** (`confirmed` is `false`)

That means: a fresh ML detection that no human has reviewed yet. Manually drawn annotations are confirmed at create time, so they never show this button. Already-confirmed annotations also don't show it.

The button is **disabled** when the annotation has no animal assigned to it. You can't confirm an unidentified box — confirm it as *what*? Pick an animal first via the Edit (relabel) action, then return to confirm.

## What confirming does

Clicking Confirm runs `onListConfirm(id)` in the workspace. The annotation record gets two field updates:

- `confirmed` is set to `true`
- `annotatedByUser` is set to your user record

The change is persisted via the annotation store's `updateMeta` mutation, which the persistence service batches and ships to the server. A `annotation_confirmed` usage event fires for ML Center metrics, the annotation list re-renders to reflect the new state, and selection / hover styles are reapplied.

That's it on the client. Whatever evidence-tier promotion or downstream effects happen are server-side and aren't documented here — see the [Evidence Tiers](/web/core-concepts/evidence-tiers/) page for the conceptual model.

## Set as Profile (the button next to Confirm)

There's a separate `portrait` icon button — Set as Profile — that picks the annotation's image as the active profile crop for that animal. Its visibility rules are stricter than Confirm:

| Requirement | Why |
|---|---|
| Annotation has an animal id | Profile images belong to an animal |
| `confirmed` is `true` | Only confirmed annotations are promoted to profile |
| Side is `Left` or `Right` (not Unknown) | Profile images are bucketed by side |
| Category is not `unknown` | Profile images are bucketed by category (dorsal fin, fluke, etc.) |

If the annotation fails any of those, the Set as Profile button doesn't render.

## What's not in the annotator

The annotator deliberately does not include:

- **Bulk confirm** — there's no select-multiple-and-confirm here. Each annotation is confirmed individually.
- **Reject / Skip / Mark as disputed** — those are review affordances on the [Confirmation Queue](/web/features/confirmation-queue/), not in the annotator. The annotator's nearest equivalent is the **Delete** button (warn-coloured trash icon), which removes the annotation entirely rather than marking it for later review.

If you're working through a queue of annotations across many encounters, use the Confirmation Queue. The annotator is for reviewing the annotations on a single photo or encounter you're already looking at.

## Related

- [Annotator Overview](/web/features/annotator/overview/) — layout, navigation, and permission gates
- [Editing Annotations](/web/features/annotator/editing/) — change identity, side, category, or box; delete
- [Manual Annotations](/web/features/annotator/manual-annotations/) — drawing a fresh box when the model missed something
- [Evidence Tiers](/web/core-concepts/evidence-tiers/) — how confirmed annotations relate to the four-tier model
- [Confirmation Queue](/web/features/confirmation-queue/) — the prioritised review surface across the population
