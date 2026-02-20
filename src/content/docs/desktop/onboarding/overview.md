---
title: "Onboarding Overview"
description: "The upload pipeline and what to expect"
sidebar:
  order: 1
---

## What you'll learn

- What onboarding is and when you use it
- The steps in the upload pipeline
- How background processing, resumability, and throttling work
- How the desktop client tracks onboarding state

## What is onboarding?

Onboarding is the process of uploading your existing encounter data from local directories into finwave. After you have used the discovery and manifesting steps to organize your images and metadata, onboarding takes each encounter in your manifest and pushes it to the finwave server -- creating the encounter record, uploading its images, associating individual IDs, and triggering the ML pipeline.

<!-- screenshot: Onboarding dashboard showing encounter progress -->

You start onboarding from the manifest view after you have reviewed and confirmed your encounters. The desktop client handles everything from there.

## The upload pipeline

For each encounter in your manifest, the desktop client follows these steps in order:

1. **Create encounter** -- A new encounter record is created in finwave with the metadata from your manifest (date, location, species, notes).
2. **Upload images** -- Each image associated with the encounter is uploaded to the server. Uploads are chunked and verified with checksums.
3. **Associate IDs** -- If your manifest includes individual ID assignments, those are linked to the newly created encounter.
4. **Mark as imported** -- The encounter is flagged as imported in your local onboarding state so it will not be processed again.
5. **Trigger ML pipeline** -- finwave's server-side ML pipeline is notified to process the new images through detection, classification, and identification.

This pipeline runs for every encounter sequentially. Within each encounter, images upload in parallel (up to 2 concurrent uploads by default).

## Background processing

Onboarding runs entirely in the background. You can minimize the desktop client or continue working in other sections while uploads proceed. The client maintains a persistent connection to the server and resumes automatically if interrupted.

:::tip
You do not need to keep the onboarding screen open. A system tray indicator shows upload progress, and you will receive a desktop notification when onboarding completes or if an error requires attention.
:::

## Resumability

If you close the desktop client, lose network connectivity, or pause onboarding manually, the process picks up exactly where it left off. The client tracks which encounters have been created and which images have been uploaded. When you resume, it skips completed work and continues from the next pending item.

## Throttling

To avoid saturating your network, the desktop client limits concurrent uploads to 2 by default. You can also set a bandwidth cap in megabits per second. Both settings are configurable in the sync configuration.

:::note
Throttling settings apply to both onboarding uploads and ongoing sync uploads. If you set a bandwidth limit, it is shared across all upload activity.
:::

## Onboarding state

The desktop client tracks the status of each encounter through the `OnboardingState` model, which has five possible values:

| Status | Meaning |
|---|---|
| `pending` | Encounter is queued but upload has not started |
| `in_progress` | Encounter creation or image upload is actively running |
| `paused` | You paused onboarding, or the client was closed mid-upload |
| `completed` | All images uploaded and ML pipeline triggered |
| `failed` | Upload failed after all retry attempts; requires manual review |

You can view the current state of every encounter on the onboarding dashboard. Failed encounters can be retried individually or in bulk.

<!-- screenshot: Onboarding state table showing encounters in various states -->

## Related

- [Upload Process](/desktop/onboarding/upload-process/) -- Progress tracking, pausing, error handling, and conflict detection
- [Pre-Training](/desktop/onboarding/pre-training/) -- Optional step to train an ID model before onboarding
- [Discovery](/desktop/discovery/discovery/) -- How the desktop client finds your images and data
- [Manifesting](/desktop/discovery/manifesting/) -- Organizing discovered data into uploadable encounters
- [Sync Configuration](/desktop/sync/configuration/) -- Adjusting bandwidth and concurrency settings
