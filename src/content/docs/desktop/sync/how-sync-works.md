---
title: "How Sync Works"
description: "File watching, encounter detection, and confirmation flow"
sidebar:
  order: 1
---

:::note
Automatic synchronization is under active development and not yet available in the desktop client. This page describes the planned functionality. Directory management (adding, pausing, and rescanning directories) is available now.
:::

## What sync will do

Synchronization is the planned process for continuously monitoring your watched directories and automatically detecting new encounter data. When new image files appear in a watched directory, the sync pipeline will classify them, group them into candidate encounters using your approved manifest rules, and stage them for your review before uploading to finwave.

## What is available now

The desktop client currently supports **directory management**:

- **Add directories** -- Select directories through a folder picker to register them with the client.
- **Pause and resume** -- Temporarily stop watching a directory without removing it.
- **Rescan** -- Manually trigger a rescan of a directory to pick up new files since the last scan.
- **Link to scan jobs** -- Associate directories with scan jobs and manifests for your populations.

You can manage your directories from the **Directories** section in the sidebar. Each directory shows its file count, image count, and last scan date.

## Planned sync pipeline

When automatic sync is available, new files detected in watched directories will pass through these steps:

1. **Detect** -- The file watcher registers new files using OS-native APIs (inotify on Linux, FSEvents on macOS, ReadDirectoryChangesW on Windows).
2. **Debounce** -- The client waits for a configurable quiet period to allow batch file copies to finish.
3. **Classify** -- Files are categorized by type and grouped by directory structure.
4. **Group** -- Files are organized into candidate encounters based on your manifest rules.
5. **Stage** -- Candidate encounters are placed in a staging area for review.
6. **Confirm** -- You review staged encounters and decide what to upload.
7. **Upload** -- Confirmed encounters are sent to finwave.

## Related

- [Directory Management](/desktop/discovery/directory-management/) -- Adding and managing watched directories
- [Discovery](/desktop/discovery/discovery/) -- How directory scanning works
- [Manifesting](/desktop/discovery/manifesting/) -- How manifest rules define encounter grouping
