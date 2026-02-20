---
title: "How Sync Works"
description: "File watching, encounter detection, and confirmation flow"
sidebar:
  order: 1
---

## What you'll learn

- How the desktop client watches your directories for new files
- The full sync pipeline from detection to upload
- How the user confirmation flow works
- What triggers sync and what does not

## File watching

After you configure one or more watched directories, the desktop client monitors them for new files using OS-native file system APIs:

- **Linux** -- inotify
- **macOS** -- FSEvents
- **Windows** -- ReadDirectoryChangesW

These APIs notify the client in real time when files are created or modified, without polling or scanning. This keeps CPU and disk usage negligible even when watching large directory trees.

### What triggers sync

The client responds to two types of file system events:

- **New image files** -- A new JPEG, PNG, TIFF, or other supported image file appears in a watched directory.
- **New or modified spreadsheets** -- A CSV, XLSX, or other supported data file is created or updated in a watched directory.

### What does not trigger sync

- **Deletions** -- Removing a file from a watched directory has no effect. finwave does not delete server-side data based on local file removal.
- **Modifications to existing images** -- If you overwrite an image file that was already synced, the change is ignored. Only new images trigger the pipeline.

:::note
This design is intentional. Sync is additive only -- it creates new encounters from new data. It never modifies or removes data that already exists on the server.
:::

## The sync pipeline

When new files are detected, they pass through a multi-step pipeline before reaching the server:

1. **Detect** -- The file watcher registers one or more new or changed files.
2. **Debounce** -- The client waits for the debounce period (5 minutes by default) to allow batch file copies to finish. The timer resets each time a new file event arrives in the same directory.
3. **Classify** -- The client determines each file's type (image, spreadsheet, or unsupported) and groups them by directory structure.
4. **Group** -- Files are organized into candidate encounters based on directory hierarchy and any metadata found in spreadsheets.
5. **Extract** -- Metadata is extracted from spreadsheets and image EXIF data (date, GPS coordinates, camera model).
6. **Stage** -- The candidate encounters are placed in a staging area for your review.
7. **Confirm** -- You review the staged encounters and decide what to upload (see below).
8. **Upload** -- Confirmed encounters are uploaded to finwave using the same pipeline as onboarding.

<!-- screenshot: Sync pipeline visualization showing staged encounters waiting for confirmation -->

## User confirmation

By default, the desktop client does not upload anything automatically. When new encounters are staged, you are notified and asked to review them before they go to the server.

For each staged encounter, you have four options:

| Action | Effect |
|---|---|
| **Confirm** | Upload this encounter to finwave |
| **Edit** | Modify encounter metadata (date, location, IDs) before uploading |
| **Skip** | Ignore this encounter; it will not be uploaded or re-detected |
| **Confirm All** | Upload all staged encounters without individual review |

<!-- screenshot: Confirmation dialog showing staged encounter with Confirm, Edit, Skip, and Confirm All buttons -->

Staged encounters also appear as a desktop notification (depending on your notification style setting), so you know new data is waiting even if you are not looking at the app.

:::tip
If you trust your directory structure and naming conventions, you can enable **auto-confirm** in the sync configuration. This skips the confirmation step and uploads new encounters as soon as they are staged. You can always review what was uploaded in the sync history.
:::

## Debounce behavior

The debounce timer prevents the client from processing a batch of files before you have finished copying them. If you copy 200 images into a watched directory over the course of 3 minutes, the client waits until 5 minutes after the last file event before starting the classify step.

You can adjust the debounce period in the [sync configuration](/desktop/sync/configuration/). Shorter values make sync more responsive; longer values reduce the chance of processing an incomplete copy.

## Related

- [Sync Configuration](/desktop/sync/configuration/) -- Debounce, bandwidth, auto-confirm, and quiet hours settings
- [Sync Troubleshooting](/desktop/sync/troubleshooting/) -- Common sync issues and how to resolve them
- [Onboarding Overview](/desktop/onboarding/overview/) -- The initial bulk upload pipeline that sync builds on
- [Directory Management](/desktop/discovery/directory-management/) -- Adding and removing watched directories
