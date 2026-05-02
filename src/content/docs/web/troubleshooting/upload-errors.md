---
title: "Upload Errors"
description: "What can go wrong during encounter image upload, and what each fallback control does"
sidebar:
  order: 2
quickRef:
  - "Pre-upload validation: only image MIMEs and .tif/.tiff/.jpg/.jpeg/.png/.gif extensions accepted; the dropzone summary lists 'Supported: JPG, PNG, GIF, TIFF'"
  - "Duplicates (same filename + size already in the selection) are rejected with '\"name\" already added.'"
  - "Two upload paths: default TUS chunked uploads, or direct-to-blob if the BetaDirectUpload feature is on for your population"
  - "TUS retries are automatic on transient failures with backoff [0s, 3s, 5s, 10s, 20s, 60s, 10min]; chunk size 5MB"
  - "Each failed file gets its own refresh icon in the progress list — click it to retry just that one file"
  - "When the upload pass finishes with any failures, a banner offers Retry Failed (re-runs only the failed ones) or Skip & Continue (finalizes the encounter with only the successful files)"
  - "Direct-blob path: a batch-commit failure flips every successfully-uploaded file back to failed — the bytes are in storage but not registered with the encounter, so retry"
  - "Finalization failure after uploads succeed: encounter is saved, but the post-save feed entry didn't write — you can still open the encounter"
---

## What you'll learn

- The two failure surfaces during a submission: file-selection validation and the upload pass itself
- What the per-file retry button does vs. the aggregate Retry Failed / Skip & Continue buttons
- What "Failed to prepare uploads" and a finalization failure mean

## File selection

Before any bytes leave your machine, the dropzone validates each file you add:

- **Type check** — accepts anything whose MIME starts with `image/` or whose filename ends in `.tif`, `.tiff`, `.jpg`, `.jpeg`, `.png`, or `.gif`. Anything else is rejected with `"name" is not a supported image type.`
- **Duplicate check** — if a file with the same name *and* size is already in the selection, it's rejected with `"name" already added.` (Different size with the same name is treated as a new file.)

The dropzone surfaces the first rejected file's reason, plus `(+N more)` if there were others. Removing the file from the system file picker won't clear the message — re-drop or re-browse to retry.

## The upload pass

Two upload mechanisms are wired in. Which one runs is decided by the `BetaDirectUpload` feature flag on your population:

| Path | When it's used | How it works |
|---|---|---|
| **TUS** (default) | `BetaDirectUpload` is **off** | The browser sends each file in 5 MB chunks to the Hub's TUS endpoint. The TUS client retries transient failures automatically with delays of `[0s, 3s, 5s, 10s, 20s, 60s, 10 min]` before giving up. |
| **Direct-to-blob** | `BetaDirectUpload` is **on** | The Hub mints SAS-token sessions, the browser uploads each file directly to Azure Blob Storage in 4 MB blocks (2 in flight per file), then the Hub commits the batch. |

Concurrency is controlled by `maxConcurrentUploads` in the server's UI settings (default 10): files are uploaded in chunks of that size in sequence.

The TUS path also enforces a 30-minute wall-clock timeout per concurrency chunk. If a chunk hasn't finished by then, any remaining in-flight uploads in that chunk are marked failed and the next chunk starts.

## Per-file retry

Every failed file in the live progress list shows a refresh icon next to it. Clicking it calls the upload function again for just that one file. This is the right control to use for a single transient blip — there's no banner, no batch logic, just one file retried in place.

## When the upload pass finishes with failures

If at the end of a complete pass any file is still failed, the workflow pauses and a banner appears with the count and two buttons:

- **Retry Failed** — re-uploads only the files marked failed. On the direct-blob path, this also requests fresh SAS sessions for those files. After retry, the same banner reappears if anything still failed (`"Some uploads still failed."`).
- **Skip & Continue** — moves on to finalize the encounter using only the files that uploaded successfully. The encounter is created with that subset; the failed files are not retried later automatically.

If you choose Skip & Continue and need those photos, you can submit them as a follow-up — see [Adding Photos to an Existing Encounter](/web/features/encounters/adding-photos/).

## "Failed to prepare uploads"

This message appears only on the direct-to-blob path, when the very first request — for SAS upload sessions — fails. The Hub's response didn't come back successfully, so no file has been attempted yet. Every file is then marked failed, which puts the page into the same Retry Failed / Skip & Continue state as a regular upload failure.

This is usually a network blip or a backend hiccup. Retry is the right action.

## Batch commit failure

Direct-to-blob uploads finish with a `batchCommit` call that registers the uploaded blobs with the encounter. If that call fails (after the bytes have already arrived in storage), every file that had been marked as `done` is flipped back to `failed`. The reason is intentional: from the encounter's perspective, those files don't yet exist, so the safe thing is to retry the commit — which Retry Failed will do.

## Finalization failure

After all files upload successfully, one final step writes a feed entry for the encounter and starts the ML pipeline (`feedService.createFeedEntry(populationId, encounterId, fileCount)`). If that call fails, the message is:

> Finalization failed. You can still view your encounter.

The encounter itself was saved earlier, before any file was uploaded, so it is not lost. The post-save feed entry that flags the encounter for ML processing is what failed. Opening the encounter from the View Encounter button is safe; if the ML pipeline didn't start, raising it through support with the encounter id is the next step.

## A note on processing time

A successful submission ends with this banner:

> Images may take a few moments to finish processing after you view the encounter.

That is expected. Newly-uploaded photos are flagged for the ML pipeline, and the annotation/identification work happens asynchronously. See [Submissions](/web/features/submissions/) for what each pipeline stage means.

## Related

- [Common Issues](/web/troubleshooting/common-issues/) — generic HTTP error toast mappings (also covers the encounter-creation failure that happens *before* uploads start)
- [Creating Encounters](/web/features/encounters/creating/) — the full submission flow these errors interrupt
- [Submissions](/web/features/submissions/) — what happens to your photos after upload
