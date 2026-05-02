---
title: "Sync Troubleshooting"
description: "Fixing common sync errors, recovery from failures, and re-syncing"
sidebar:
  order: 3
quickRef:
  - "502 / 503 / generic 5xx: transient. Retried 3× automatically; click Retry on the population card to resume"
  - "403 CannotVerifyCopySource (blob-to-blob): check SAS in Settings — needs Read+List, srt=sco, no IP restrictions"
  - "'Failed to save upload session': stale session in unexpected state. Click Retry — current server handles it"
  - "Encounters marked 'Conflict' (legacy): just hit Sync again. Newer engine reuses existing encounter and fills missing images"
  - "'Photographer not resolved': open manifest editor → Resolve Photographers → link/create/reject"
  - "Incomplete reasons: missing date / missing location / missing GPS / photographer not resolved — fix in pre-sync review or manifest"
  - "Missing images after sync: Reset → Sync. Already-uploaded come back as Complete instantly; missing get uploaded"
  - "Cloud discovery 'failed' on big datasets often means polling timed out but worker is still chunking — check worker logs"
---

In this guide you will learn:

- How to diagnose and fix the most common sync errors
- How to recover from partial syncs and server errors
- When and how to use the Reset and Retry buttons

## 502 / 503 errors (Bad Gateway / Service Unavailable)

These are transient server errors -- the finwave server was temporarily overloaded or restarting.

**What happens:** The sync engine retries up to 3 times with exponential backoff (2-second, then 4-second delays). If all retries fail, the encounter is marked as failed.

**Fix:** Click **Retry** on the population card. The engine will resume from where it left off -- already-uploaded images are not re-sent.

## 403 CannotVerifyCopySource

This error occurs during blob-to-blob sync when the finwave server cannot read from your Azure source storage.

**Causes:**
- SAS token has expired
- SAS token lacks Read permission
- SAS token has IP restrictions (the server's IP is blocked)
- SAS token has wrong resource types (needs `srt=sco`)

**Fix:** Go to **Settings > Azure Storage Connections** and update the SAS token. Generate a new one with Read + List permissions, `srt=sco`, and no IP restrictions.

## "Failed to save upload session"

A database constraint error on the server, usually caused by a previous upload session with the same idempotency key in an unexpected state.

**Fix:** Click **Retry**. The server now handles all existing session statuses correctly and will not produce duplicate key errors on retry.

## Encounters marked "Conflict"

The sync engine found the encounter already exists on the server (via dedup check) during a previous sync attempt.

**Fix:** Just click **Sync** again. Conflict encounters are included in the sync queue. The engine will find the existing encounter on the server and proceed to check for missing images.

:::note
Conflict status was set by an older version of the sync engine that skipped duplicate encounters. The current version reuses existing encounters and uploads missing images instead of skipping.
:::

## "Photographer not resolved"

The encounter's photographer name does not have a resolved alias in the photographer resolution table.

**Fix:**
1. Open the manifest in the editor
2. Go to the **Resolve Photographers** section
3. Find the unresolved name and link it to a user, mark it for creation, or reject it
4. After resolving, encounters are automatically promoted from Incomplete to Pending

## Encounters stuck as "Incomplete"

Check the pre-sync review for the specific reason shown next to each incomplete encounter:

| Reason | Fix |
|--------|-----|
| missing date | Edit the encounter in the pre-sync review |
| missing location name | Set a location override in the manifest editor |
| missing GPS | Edit GPS coordinates in the pre-sync review or set a GPS override |
| photographer not resolved | Resolve the photographer (see above) |

## Missing images after sync

If an encounter synced but some images are not visible on the server:

1. Click **Reset** on the manifest row to reset synced encounters to pending
2. Click **Sync** -- the engine will check each image against the server
3. Already-uploaded images return as "Complete" instantly
4. Missing images are uploaded normally

## Cloud discovery job stuck or failed

Cloud scans of large Azure containers (100K+ images) take several hours. The desktop app may show "failed" due to a polling timeout, but the worker may still be processing.

**Check:** Ask your admin to check the worker logs. Progress is logged every 500 files (e.g., "Downloaded 50000/132565 files..."). The worker processes in chunks of 10,000 files.

**If the worker crashed:** It will be restarted and pick up the job again from Service Bus. No data is lost.

## Related

- [How Sync Works](/desktop/sync/how-sync-works/) -- Understanding the sync pipeline
- [Sync Configuration](/desktop/sync/configuration/) -- API key and concurrency settings
- [Azure Blob Storage](/desktop/onboarding/azure-storage/) -- Storage connection setup
- [Getting Help](/desktop/getting-started/getting-help/) -- Reporting issues
