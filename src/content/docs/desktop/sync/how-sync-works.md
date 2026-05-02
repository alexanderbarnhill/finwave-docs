---
title: "How Sync Works"
description: "Upload approved encounters and images to the finwave server"
sidebar:
  order: 1
quickRef:
  - "Sync page = card grid (one per population) with manifest rows: Review / Ensure Individuals / Reset / Sync buttons"
  - "Per-encounter flow: dedup match (by date+location+photographer) → upload images → commit → mark synced"
  - "Encounter dedup means re-running sync after partial uploads doesn't create duplicates — it fills in missing images"
  - "Image idempotency: server tracks per-key upload session; re-uploading the same image returns Complete instantly"
  - "Reset button on a manifest row resets synced encounters to pending — useful when server-side data was deleted"
  - "Errors group per encounter; Retry uploads only the failed images, not the whole encounter"
  - "Auto-retry on transient errors: upload sessions 1×, commits 3×, blob copies 3×, blob uploads 3× (with backoff)"
  - "Partial sync = some images succeeded, some failed. Successful images aren't lost; Retry only re-attempts failures"
---

In this guide you will learn:

- The sync page layout and what each element shows
- How encounters are created and deduplicated on the server
- How images are uploaded and committed
- How progress tracking, errors, and retries work

## The sync page

The sync page shows a **card grid** with one card per population. Each card displays:

- **Population name** and a syncing indicator if a sync is in progress
- **Status counts** -- pending and synced encounters and images
- **Manifest list** -- each approved manifest with its version, scan job name, encounter count, and image count
- **Action buttons** per manifest: Review, Ensure Individuals, Reset, and Sync

<!-- screenshot: Sync page showing population cards with manifest rows -->

A **global status bar** at the top shows server connection, API key status, and the concurrency selector (1-4 parallel uploads).

## Sync flow

When you click **Sync** on a manifest, the engine processes each approved encounter:

1. **Create or find encounter** -- The engine checks if the encounter already exists on the server (matching by date, location, and photographer). If found, it reuses the existing encounter. If not, it creates a new one.
2. **Upload images** -- Each image is uploaded via a SAS URI (for local files) or copied server-side (for Azure blob storage). Already-uploaded images are recognized by their idempotency key and skipped.
3. **Commit** -- After images are uploaded, a commit request triggers server-side processing: blob verification, resize variant generation (thumbnails, previews), FileItem creation, and ML pipeline.
4. **Mark synced** -- On success, the encounter and its scans are marked as synced locally.

## Deduplication

The sync engine prevents duplicate encounters and images:

- **Encounter dedup** -- Before creating an encounter, the engine searches the server for an existing match. If found, it proceeds directly to image upload, filling in any missing images.
- **Image idempotency** -- Each image has a unique idempotency key. The server tracks upload sessions by key, so re-syncing the same image returns "Complete" without re-uploading.

:::tip
If you deleted an encounter on the server and need to re-send it, use the **Reset** button on the manifest row to reset synced encounters back to pending. The next sync will recreate the encounter and upload all images.
:::

## Progress tracking

During sync, the population card shows:

- A progress bar with encounter and image counts
- The current encounter being processed (name, location, photographer)
- Individual image upload statuses (expandable)
- A link to view the encounter on the server once created

## Error handling

Errors are grouped by encounter and shown in an expandable section:

- **Actionable errors** -- Upload failures, server errors, authentication issues. Click **Retry** to re-upload only the failed images.
- **Skipped errors** -- Informational (e.g., duplicate encounters that were expected). No action needed.

The retry button uploads only images that failed. Already-uploaded images are not duplicated.

## Transient error recovery

The sync engine automatically retries on transient server errors (502, 503, 5xx):

- **Upload sessions** -- 1 retry on 5xx
- **Commits** -- 3 retries with exponential backoff (2s, 4s)
- **Blob copies** -- 3 retries with exponential backoff (2s, 4s)
- **Blob uploads** -- 3 retries with jittered exponential backoff (5s, 10s)

If all retries fail, the encounter is marked as failed and you can retry manually.

## Partial sync

If some images in an encounter fail but others succeed, the encounter is marked **partial**. The successfully uploaded images are not lost. Click Retry to re-upload only the failures.

## Related

- [Sync Configuration](/desktop/sync/configuration/) -- API key, concurrency, and settings
- [Upload Process](/desktop/onboarding/upload-process/) -- Technical details of SAS upload and blob copy
- [Sync Troubleshooting](/desktop/sync/troubleshooting/) -- Fixing common sync errors
- [Pre-Sync Review](/desktop/onboarding/pre-sync-review/) -- Reviewing encounters before sync
