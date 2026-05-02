---
title: "Upload Process"
description: "How images are uploaded, committed, and processed during sync"
sidebar:
  order: 5
quickRef:
  - "Two upload paths: SAS URI direct upload (local files) vs blob-to-blob server-side copy (Azure files)"
  - "Local flow: create upload session → upload image to Azure via SAS → commit → server resizes + triggers ML"
  - "Azure flow: generate read SAS for source → server uses SyncCopyFromUri → commit + ingest. Image bytes never touch the desktop"
  - "Idempotency keys (encounter id + scan id) make re-syncs safe — already-uploaded images return 'Complete' instantly"
  - "Concurrency configurable 1-4 parallel uploads per encounter (default 2)"
  - "Image upload retry: 3 attempts with jittered backoff (5s, 10s)"
  - "Status lifecycle per image: Pending → Uploading → Committed → Complete (or Error)"
  - "Partial encounters happen when some images fail; Retry uploads only the failed ones, no duplicates"
  - "Expired SAS during upload auto-refreshes — no manual recovery needed"
---

In this guide you will learn:

- The two upload paths: direct SAS upload and blob-to-blob copy
- How upload sessions, commits, and ingestion work
- How the sync engine handles interruptions and retries

## Overview

When you click **Sync** on a manifest, the desktop app uploads each approved encounter and its images to the finwave server. The exact upload mechanism depends on where your images are stored.

## Local images: SAS URI upload

For images stored on local disk (or external drives), the upload flow is:

1. **Create upload sessions** -- The desktop sends a batch request to the server with file names and sizes. The server returns a pre-signed SAS URI for each file, pointing to a temporary blob in the encounter's storage container.
2. **Upload to blob storage** -- The desktop uploads each image directly to Azure Blob Storage using the SAS URI. This is a PUT request with the image bytes. Large files get a scaled timeout (60s base + ~10s per MB).
3. **Commit** -- After all images in a batch are uploaded, the desktop sends a commit request. The server verifies the blobs, creates FileItem records, generates resize variants (thumbnails, previews), and triggers the ML pipeline.

<!-- screenshot: Sync progress showing image upload status per encounter -->

Each upload has an **idempotency key** (based on the encounter ID and scan ID). If you re-sync, the server recognizes already-uploaded images and returns `Complete` without re-uploading.

:::tip
Upload concurrency is configurable (1-4 parallel uploads per encounter). Higher values upload faster but use more bandwidth. The default of 2 works well for most connections.
:::

## Azure images: blob-to-blob copy

For images stored in Azure Blob Storage (discovered via cloud scanning), a faster path is used:

1. **Generate read SAS** -- The desktop generates a short-lived read-only SAS URL for each source blob using your stored Azure credentials.
2. **Server-side copy** -- The desktop sends these SAS URLs to the finwave server, which copies blobs directly between storage accounts using `SyncCopyFromUri`. No image data passes through the desktop.
3. **Commit and ingest** -- Same as local uploads: the server creates FileItems, resizes, and triggers ML.

This is significantly faster for large datasets since images move between Azure data centers without touching your local network.

:::caution
For blob-to-blob copy to work, the source SAS token must not have IP restrictions. The finwave server (not your desktop) reads from the source, so an IP-restricted token will fail with a 403 error.
:::

## Retry and resumability

The sync engine is designed to handle interruptions gracefully:

- **Transient errors (5xx)** -- Upload sessions, commits, and blob copies retry up to 3 times with exponential backoff (2s, 4s delays).
- **Interrupted sync** -- If you close the app mid-sync, the encounter's remote ID is saved locally. On the next sync, the engine skips encounter creation and resumes image upload.
- **Partial success** -- If some images in an encounter fail, the encounter is marked "partial." Click **Retry** to re-upload only the failed images. Already-uploaded images are not duplicated.
- **SAS URI expiry** -- If a SAS URI expires during upload (403 with "Signature not valid"), the engine refreshes the URI automatically.

## Upload session lifecycle

Each image goes through these statuses:

| Status | Meaning |
|--------|---------|
| Pending | Upload session created, SAS URI issued |
| Uploading | Bytes being sent to blob storage |
| Committed | Upload confirmed, blob verified |
| Complete | Ingestion done: FileItem created, resized, ML triggered |
| Error | Upload or ingestion failed (see error detail) |

## Related

- [How Sync Works](/desktop/sync/how-sync-works/) -- The full sync pipeline overview
- [Azure Blob Storage](/desktop/onboarding/azure-storage/) -- Setting up cloud storage connections
- [Sync Troubleshooting](/desktop/sync/troubleshooting/) -- Fixing common upload errors
- [Sync Configuration](/desktop/sync/configuration/) -- Concurrency and API key settings
