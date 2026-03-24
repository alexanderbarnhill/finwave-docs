---
title: "Evidence Tiers"
description: "How finwave tracks the strength of evidence behind each identification"
sidebar:
  order: 7
---

## What you'll learn

- What evidence tiers are and why finwave uses them
- The four tiers and what each one means
- Which tiers appear in sighting histories and which do not
- Why only confirmed identifications produce images in an individual's profile
- How the confirmation queue helps work through the backlog

## Why evidence tiers?

In finwave, an identification is the link between an individual animal and an encounter -- it says "this animal was present at this sighting event." But not all identifications carry the same weight of evidence.

Some identifications come from decades of contributor knowledge -- a researcher's catalog that says "individual X was photographed here on this date." Others come from ML models that detected and recognized an animal in a photo. And some come from a human expert who drew a bounding box on a specific image and confirmed the identity.

These are all valid forms of evidence, but they have very different confidence levels. Evidence tiers let finwave track the distinction rather than erasing it.

:::note[The core principle]
**The history can tolerate uncertainty. The image corpus cannot.** An animal's sighting timeline can include records of varying confidence -- that's just good provenance tracking. But an animal's image collection (the crops used as profile images and reference data for future identifications) must never contain a wrongly-attributed photo. One bad image corrupts the reference set that all future IDs depend on.
:::

## The four tiers

| Tier | Name | How it's created | Has bounding box? | Images extracted? | In sighting history? |
|------|------|------------------|-------------------|-------------------|----------------------|
| 0 | **Attested** | Imported from contributor's historical records | No | No | Yes |
| 1 | **ModelSuggested** | ML model proposed an ID without corroboration | Yes (unconfirmed) | No | **No** |
| 2 | **ModelCorroborated** | ML model matched + attested records agree | Yes (unconfirmed) | No | Yes |
| 3 | **Confirmed** | Human reviewed and confirmed the box and identity | Yes (confirmed) | **Yes** | Yes |

### Attested (Tier 0)

An attested identification is a claim that "this animal was at this encounter," backed by the contributor's authority. It comes from the contributor's existing records -- catalog entries, field notes, spreadsheets -- imported during onboarding.

Attested records have no bounding box and no image crop. The photos from the encounter are available for inspection, but no specific region of any photo has been identified as showing the animal. Despite this, attested records appear in the animal's sighting history immediately, so contributors see their knowledge reflected in finwave from day one.

### ModelSuggested (Tier 1)

A model-suggested identification means an ML model detected an animal in a photo and proposed an identity, but there is no corroborating evidence from the contributor's records. This is a candidate for review, not a historical record.

:::caution
ModelSuggested identifications do **not** appear in an animal's sighting history. They exist only in the [confirmation queue](/web/features/confirmation-queue/) until a human reviews them. This prevents unreliable model predictions from polluting an animal's timeline.
:::

### ModelCorroborated (Tier 2)

A model-corroborated identification means an ML model found an animal in a photo **and** the contributor's attested records agree that this animal was present at the encounter. The model's confidence must meet the population's corroboration threshold.

This is the strongest evidence short of human confirmation. It appears in sighting histories but does not produce image crops until a human confirms it.

### Confirmed (Tier 3)

A confirmed identification means a human has reviewed the bounding box and the identity and verified both are correct. This is the only tier that triggers image extraction -- the crop enters the animal's image collection and can be used as a profile image or reference data for future identifications.

## Key rules

- **Tiers only move upward.** An attested record can be promoted to model-corroborated or confirmed. A model-suggested record can be promoted to model-corroborated or confirmed. Records never demote -- if a confirmation is later found to be wrong, the identification is deleted and recreated at the correct tier.

- **Image extraction happens exclusively at Tier 3.** No crop enters an animal's image collection until a human has confirmed the bounding box and identity. This is the hard rule that protects the image corpus.

- **Multiple tiers can coexist.** The same animal can have both an attested and a model-suggested record for the same encounter. These are merged when one is promoted.

## The confirmation queue

Identifications at tiers 0 through 2 enter the [confirmation queue](/web/features/confirmation-queue/) -- a prioritized work queue where experts review and confirm identifications. The queue is ordered so that the easiest items to confirm (model-corroborated, which just need a human to verify the box) are reviewed first.

Over time, as identifications are confirmed, the animal's sighting history fills in with photo-backed records and the individual's image collection grows.

## How tiers appear in the UI

In the encounter sidebar, animals are shown with visual indicators of their evidence tier:

- **Confirmed** identifications appear as normal animal pills
- **Attested** identifications show a person icon, indicating contributor-reported presence without photo annotation
- **ModelCorroborated** identifications show a sparkle icon, indicating ML agreement awaiting human review
- **ModelSuggested** identifications show a question mark icon (visible in the confirmation queue, not in sighting history)

## Related

- [Confirmation Queue](/web/features/confirmation-queue/) -- reviewing and confirming identifications
- [Annotations](/web/core-concepts/annotations/) -- how bounding boxes and identifications work
- [Sync & Identification Settings](/web/administration/sync-settings/) -- configuring auto-confirm thresholds
- [Individuals](/web/core-concepts/individuals/) -- individual profiles and sighting history
