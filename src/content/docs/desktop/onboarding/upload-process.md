---
title: "Upload Process"
description: "Progress, pausing, resuming, and error handling"
sidebar:
  order: 3
---

## What you'll learn

- How to read the progress dashboard during onboarding
- How to pause and resume uploads
- How conflict detection prevents duplicate images
- How the client handles errors and retries

## Progress tracking

While onboarding is running, the desktop client displays a real-time progress dashboard with four key metrics:

- **Encounters created** -- The number of encounter records successfully created on the server out of the total in your manifest.
- **Images uploaded** -- The count of images that have finished uploading, plus how many remain.
- **Estimated time** -- A rolling estimate of how long until onboarding completes, based on recent upload speed and remaining work.
- **Errors** -- The number of items that have failed after all retry attempts.

<!-- screenshot: Onboarding progress dashboard showing all four metrics -->

The progress view also shows a per-encounter breakdown so you can see exactly which encounter is currently being processed and the status of each one.

:::tip
If the estimated time is longer than expected, check whether you have a bandwidth limit set in your sync configuration. Removing or increasing the cap will speed up uploads.
:::

## Pausing and resuming

You can pause onboarding at any time from the progress dashboard. When you pause:

- The currently uploading images finish their in-flight chunks, then upload activity stops.
- No new encounters are created on the server.
- The onboarding state is saved to disk so it survives application restarts.

To resume, return to the onboarding screen and select **Resume**. The client picks up from the exact point where it paused -- it does not re-upload completed images or re-create completed encounters.

If the application closes unexpectedly (crash, power loss, or forced quit), the client treats this the same as a pause. On next launch, it detects the interrupted onboarding and prompts you to resume.

## Conflict detection

Before uploading an image, the desktop client computes a SHA-256 hash of the file and checks it against images already stored on the server for that population. If a matching hash is found, the image is a duplicate and the client skips it automatically.

This means:

- If you accidentally include the same image in two encounters in your manifest, it is uploaded only once.
- If you re-run onboarding after a partial failure, images that were already uploaded successfully are not re-uploaded.
- The hash check happens server-side, so it catches duplicates even if the files have different names.

:::note
Conflict detection is based on file content, not file name or path. Two different files with different names but identical pixel data will produce the same hash and be treated as duplicates.
:::

## Error handling

When an upload or encounter creation fails, the desktop client retries up to 3 times with exponential backoff (the wait time doubles between each attempt). If all retries fail, the client:

1. Marks the encounter or image as `failed` in the onboarding state.
2. Logs the error details to the audit log.
3. Continues processing the remaining encounters.

Onboarding does not stop when individual items fail. The client processes everything it can and reports failures at the end.

<!-- screenshot: Failed encounter list with retry button -->

### Reviewing and retrying failures

After onboarding completes (or when you check progress mid-run), any failed items appear in a dedicated error list. Each entry shows:

- The encounter name and image file (if applicable)
- The error message from the server or network layer
- The number of retry attempts made

You can retry individual items or select **Retry All Failed** to re-attempt everything. Common causes of failure include:

| Cause | Resolution |
|---|---|
| Network timeout | Check your connection and retry |
| Server error (5xx) | Wait a few minutes and retry; the server may be temporarily overloaded |
| Authentication expired | Sign in again; the client will resume automatically |
| File read error | Verify the source file still exists and is readable |

:::caution
If an encounter creation succeeded but its image uploads failed, the encounter exists on the server with partial data. Retrying will upload the remaining images -- it will not create a duplicate encounter.
:::

## Related

- [Onboarding Overview](/desktop/onboarding/overview/) -- The full pipeline and onboarding state model
- [Pre-Training](/desktop/onboarding/pre-training/) -- Optional model training before onboarding
- [Sync Configuration](/desktop/sync/configuration/) -- Adjusting bandwidth limits and concurrency
- [Audit Log](/desktop/it-security/audit-log/) -- Where upload errors and retries are logged
- [Network Requirements](/desktop/it-security/network/) -- Connection requirements and certificate pinning
