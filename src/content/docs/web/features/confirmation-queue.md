---
title: "Confirmation Queue"
description: "Reviewing and confirming identifications that need human review"
sidebar:
  order: 7
quickRef:
  - "What's in it: identifications at evidence tiers 0-2 that need human review before becoming Confirmed"
  - "Items above the auto-confirm threshold skip the queue entirely"
  - "Priority order: ModelCorroborated (highest, easy verify) > ModelSuggested > Attested (lowest, most work)"
  - "Attested records have no bounding box — reviewer must draw one before confirming"
  - "ModelSuggested/Corroborated come with a box; reviewer can confirm, adjust box, change identity, or reject"
  - "Disputed = reviewer thinks record is wrong; removed from history but retained for audit"
  - "Unverifiable = record may be right but animal can't be positively identified in the photos; stays in history with a flag"
  - "Only Confirmed (Tier 3) extracts image crops — Disputed and Unverifiable never produce profile images"
  - "Skipping deprioritizes an item but doesn't remove it from the queue"
---

## What you'll learn

- What the confirmation queue is and why it exists
- How identifications enter the queue
- How items are prioritized for review
- What actions are available for each evidence tier
- What Disputed and Unverifiable mean

## What is the confirmation queue?

The confirmation queue is a prioritized work queue containing identifications that need human review before they become fully confirmed. It replaces the implicit "go find unconfirmed stuff" workflow with an explicit, filterable list ordered by review priority.

The queue contains identifications at [evidence tiers](/web/core-concepts/evidence-tiers/) 0 through 2 -- attested records from contributor data, model suggestions, and model-corroborated matches that haven't yet been confirmed by a human.

## How identifications enter the queue

Identifications arrive in the queue through three paths:

- **Attested (Tier 0)** -- created during onboarding when a contributor's historical records indicate an individual was present at an encounter. These have no bounding box.
- **ModelSuggested (Tier 1)** -- created when an ML model detects and identifies an animal but there is no corroborating evidence from the contributor's records.
- **ModelCorroborated (Tier 2)** -- created when an ML model's prediction agrees with the contributor's attested records and the model confidence meets the population's corroboration threshold.

Identifications that meet the [auto-confirm threshold](/web/administration/sync-settings/) skip the queue entirely and are confirmed automatically.

## Priority scoring

The queue is ordered so that the easiest and most valuable items are reviewed first:

| Priority | Tier | Why |
|----------|------|-----|
| **Highest** | ModelCorroborated | Least effort -- has a bounding box and corroborating evidence. Just needs a human to verify. |
| **Medium** | ModelSuggested | Has a bounding box but no corroborating evidence. Needs more careful review. |
| **Lower** | Attested | Most effort -- no bounding box exists. The reviewer must find the animal in the encounter's photos and draw a box from scratch. |

Within each tier, more recent encounters and individuals flagged as active research subjects are prioritized higher.

:::tip
Attested records may benefit from waiting -- if a model becomes available or improves, it may produce a bounding box that promotes the attested record to model-corroborated, making confirmation much faster.
:::

## Review actions

The actions available depend on the identification's evidence tier.

### Attested records (no bounding box)

When reviewing an attested identification, the reviewer sees the encounter's photos and the reported individual. Available actions:

- **Draw a bounding box and confirm** -- find the animal in one of the encounter photos, draw a box around the identifying feature, and confirm the identity. This promotes the record to Confirmed (Tier 3) and extracts the image crop.
- **Skip** -- leave the item in the queue for later review. It will be deprioritized.
- **Mark as Disputed** -- the reviewer believes the attested record is wrong and the animal was not actually present.
- **Mark as Unverifiable** -- the reviewer believes the record may be correct but the animal cannot be identified in any of the encounter's photos (e.g., poor photo quality or the animal was not clearly captured).

### ModelSuggested and ModelCorroborated records (has bounding box)

When reviewing a model-assisted identification, the reviewer sees the staged crop alongside the full encounter photo. Available actions:

- **Confirm** -- the box and identity are correct. Promotes to Confirmed (Tier 3) and extracts the image crop.
- **Adjust box and confirm** -- the identity is correct but the box needs resizing. Creates a box-resized revision and promotes to Confirmed.
- **Change identity** -- the box is good but the model identified the wrong individual. Updates the identity, creates a revision, and promotes to Confirmed.
- **Reject** -- the detection is wrong (not a real animal feature, or completely misidentified). Deletes the record.
- **Skip** -- leave for later review.

## Disputed and Unverifiable states

Two states exist for identifications that cannot be confirmed:

### Disputed

A disputed identification means the reviewer believes the original record is wrong -- the animal was not at this encounter. The record is removed from the animal's sighting history but retained internally for audit purposes. The original metadata is preserved so the discrepancy can be investigated with the contributor.

### Unverifiable

An unverifiable identification means the reviewer believes the record may be correct, but the animal cannot be positively identified in any of the encounter's photos. The record remains in the animal's sighting history with a visual indicator that it is unverifiable. This is common for historical data where photo quality is poor or the animal was present but not captured clearly enough for annotation.

:::note
Neither Disputed nor Unverifiable identifications produce image crops. Only Confirmed identifications add images to an individual's collection.
:::

## Related

- [Evidence Tiers](/web/core-concepts/evidence-tiers/) -- understanding the tier system
- [Sync & Identification Settings](/web/administration/sync-settings/) -- configuring auto-confirm thresholds
- [Annotator Overview](/web/features/annotator/overview/) -- using the annotation tool to draw bounding boxes
- [Individual Profiles](/web/features/individuals/profiles/) -- where confirmed identifications appear
