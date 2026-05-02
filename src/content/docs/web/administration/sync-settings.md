---
title: "Sync & Identification Settings"
description: "Configure desktop sync and constrained identification thresholds"
sidebar:
  order: 6
quickRef:
  - "Sync Enabled toggle: turns FinLaunch desktop sync on/off for this population (use to pause incoming data)"
  - "Auto-confirm threshold gates 'constrained matching' — auto-confirms ML predictions that agree with attested IDs above the score"
  - "Threshold range: 50%–100%. Recommended starting point: 95%"
  - "100% effectively disables auto-confirm; 50% is aggressive — only for mature populations with strong contributor data"
  - "Auto-confirm promotes the record to Confirmed (Tier 3) and extracts the image crop into the individual's collection"
  - "Auto-confirmed revisions are flagged so you can separate them from human confirmations in ML Center metrics"
  - "Wrong auto-confirms put a bad image into the corpus — start conservative and lower as model accuracy proves out"
  - "Found at Administration → Populations → [Your Population] → Sync → Settings"
---

## What you'll learn

- What sync settings control and where to find them
- How to enable or disable desktop sync for a population
- What constrained matching is and how the auto-confirm threshold works
- Practical guidance for choosing a threshold value

## Where to find these settings

Sync and identification settings are configured per population. Navigate to **Administration > Populations > [Your Population] > Sync** and select the **Settings** tab.

## Sync Enabled

The **Sync Enabled** toggle controls whether the finwave desktop client (FinLaunch) can sync encounters to this population. When disabled, the desktop app will not upload new encounters or sync changes for this population.

Turn this off if you need to temporarily pause incoming data -- for example, during a data cleanup or migration.

## Auto-Confirm Threshold

The auto-confirm threshold controls **constrained matching** -- the process by which ML identifications are automatically confirmed when they agree with contributor-provided records.

### How it works

When an encounter is synced from the desktop client, the contributor's data often includes information about which individuals were present (from their catalog, field notes, or spreadsheets). These are recorded as [attested identifications](/web/core-concepts/evidence-tiers/).

When finwave's ML models subsequently process the encounter images, they detect animals and predict identities. If a model prediction matches an attested individual **and** the model's confidence score meets the auto-confirm threshold, the identification is automatically confirmed without requiring manual review.

### The threshold slider

The threshold ranges from **50%** to **100%**:

| Threshold | Effect |
|-----------|--------|
| **95%** (recommended starting point) | Only very high-confidence matches are auto-confirmed. Most identifications still require manual review. |
| **80%** | More identifications are auto-confirmed, speeding up onboarding. Suitable for populations where the model performs well. |
| **100%** | Effectively disables auto-confirmation. Every identification requires manual review regardless of model confidence. |
| **50%** | Very aggressive auto-confirmation. Only appropriate for well-established populations with mature models and strong contributor data. |

:::tip[Start conservative]
For new populations, start with a threshold of **95%** and lower it as you gain confidence in the model's performance. You can monitor model accuracy in the [ML Center](/web/ml-center/overview/) to inform this decision.
:::

:::caution
Lowering the threshold speeds up onboarding but increases the risk of incorrect auto-confirmations. An incorrectly confirmed identification places a wrong image in an individual's photo collection, which can affect future ML predictions. See [Evidence Tiers](/web/core-concepts/evidence-tiers/) for why this matters.
:::

### What happens when an identification is auto-confirmed

1. The identification is promoted to **Confirmed** (Tier 3)
2. The image crop is extracted and added to the individual's photo collection
3. An annotation revision is recorded, flagged as auto-confirmed so it can be distinguished from human confirmations in the [ML Center](/web/ml-center/overview/)

Identifications that do not meet the threshold remain in the [confirmation queue](/web/features/confirmation-queue/) for manual review.

## Related

- [Evidence Tiers](/web/core-concepts/evidence-tiers/) -- understanding the identification confidence levels
- [Confirmation Queue](/web/features/confirmation-queue/) -- reviewing identifications that were not auto-confirmed
- [ML Center Overview](/web/ml-center/overview/) -- monitoring model performance
- [Population Settings](/web/administration/population-settings/) -- other population configuration options
