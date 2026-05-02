---
title: "Photographer Resolution"
description: "Map raw photographer names from image metadata to finwave user accounts"
sidebar:
  order: 5
quickRef:
  - "Required step before manifest approval — every encounter must link to a known user"
  - "Appears in manifest editor after a preview is generated. Lists ALL unique names in the manifest, not just preview sample"
  - "Four statuses per name: Resolved (linked), Create on sync (new account at sync time), Rejected (excluded), Unresolved (untouched)"
  - "Create on sync collects first/last/email — useful for bulk onboarding photographers without finwave accounts yet"
  - "Default photographer fallback applies to encounters where no name was detected anywhere"
  - "Aliases are population-scoped: 'BW' → 'Rebecca Wellard' in one population doesn't carry to another"
  - "Resolving a name auto-promotes encounters that were incomplete only because of that name to pending review"
---

In this guide you will learn:

- What photographer resolution does and why it is required
- The four resolution statuses and what each means
- How to use default photographer and create-on-sync
- How aliases work across populations

## What it does

During discovery, finwave extracts photographer names from file metadata and directory structure. These raw names come in many forms -- initials like "BW", full names like "Rebecca Wellard", or compound names like "BW + AW" when multiple photographers are credited.

Photographer resolution maps these raw strings to finwave user accounts. Every encounter must be linked to a known user, so this step is required before you can approve a manifest.

## When it appears

Photographer resolution appears in the manifest editor after a preview has been generated. The section shows **all unique photographer names from the full manifest** -- not just the names visible in the limited preview sample.

<!-- screenshot: Photographer resolution section in the manifest editor -->

You must resolve all photographer names before the manifest can be approved. Encounters with unresolved photographers are marked as **incomplete** and cannot be synced.

## Resolution statuses

Each unique photographer name has one of four statuses:

### Resolved

The name is linked to an existing finwave user. Click the user search field, find the correct user, and select them. The name turns green with a checkmark.

### Create on sync

The name will be used to create a new finwave user account during sync. Set this when the photographer does not have a finwave account yet. You provide:

- **First name** and **Last name** (pre-filled from the raw name when possible)
- **Email** (optional, auto-generated as a placeholder)

:::tip
Create-on-sync is useful for bulk onboarding when you have many photographers who have never used finwave. Their accounts are created automatically during the first sync.
:::

### Rejected

The name is intentionally excluded. Use this for junk entries, test data, or names that should not be associated with any user. Encounters with only rejected photographers will remain incomplete.

### Unresolved

The name has not been acted on yet. You must resolve, create, or reject every name before approval.

## Default photographer

If some encounters have no photographer detected at all (no EXIF creator, no name in the filename), you can set a **default photographer** at the bottom of the resolution section. This fallback is applied to any encounter missing a photographer.

<!-- screenshot: Default photographer dropdown -->

## Aliases are per-population

Photographer aliases are stored **per population**. Resolving "BW" to "Rebecca Wellard" in one population does not affect other populations. This is intentional -- the same initials may refer to different people in different research groups.

## Automatic encounter promotion

When you resolve a photographer, any encounters that were previously marked **incomplete** solely because of that unresolved name are automatically promoted to **pending review**. You do not need to re-materialize the manifest.

:::note
If encounters remain incomplete after resolving all photographers, check the pre-sync review for other missing data (date, location name, GPS coordinates).
:::

## Related

- [Manifest Editing](/desktop/discovery/manifest-editing/) -- The full manifest editor workflow
- [Pre-Sync Review](/desktop/onboarding/pre-sync-review/) -- Reviewing encounters before upload
- [Discovery](/desktop/discovery/discovery/) -- How photographer names are extracted
