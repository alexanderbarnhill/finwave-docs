---
title: "Onboarding Overview"
description: "The upload pipeline and what to expect"
sidebar:
  order: 1
---

:::note
Onboarding is under active development and not yet available in the desktop client. This page describes the planned functionality.
:::

## What onboarding will do

Onboarding is the planned process for uploading your existing encounter data from local directories into finwave. After you have used the [discovery](/desktop/discovery/discovery/) and [manifesting](/desktop/discovery/manifesting/) steps to organize your images and metadata, onboarding will take each encounter in your approved manifest and push it to the finwave server -- creating the encounter record, uploading its images, associating individual IDs, and triggering the ML pipeline.

## Planned upload pipeline

For each encounter in your manifest, the desktop client will:

1. **Create encounter** -- A new encounter record is created in finwave with the metadata from your manifest (date, location, species, notes).
2. **Upload images** -- Each image associated with the encounter is uploaded to the server. Uploads will be chunked and verified with checksums.
3. **Associate IDs** -- If your manifest includes individual ID assignments, those will be linked to the newly created encounter.
4. **Mark as imported** -- The encounter is flagged locally so it will not be processed again.
5. **Trigger ML pipeline** -- finwave's server-side ML pipeline is notified to process the new images through detection, classification, and identification.

## What you can do now

While onboarding is not yet available, you can complete the full discovery and manifesting workflow:

1. [Scan your directories](/desktop/discovery/discovery/) to build a file inventory
2. [Generate a manifest](/desktop/discovery/manifesting/) to map your data to finwave encounters
3. [Review and approve](/desktop/discovery/manifest-editing/) the encounter mappings

Once onboarding ships, you will be able to upload your approved manifests without redoing any of the preparation work.

## Related

- [Discovery](/desktop/discovery/discovery/) -- How the desktop client finds your images and data
- [Manifesting](/desktop/discovery/manifesting/) -- Organizing discovered data into uploadable encounters
- [Manifest Editing](/desktop/discovery/manifest-editing/) -- Reviewing and approving encounter mappings
