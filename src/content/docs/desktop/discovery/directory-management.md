---
title: "Directory Management"
description: "Adding and removing directories, start/stop watching, rescan"
sidebar:
  order: 4
---

In this guide you will learn:

- The three watch states and what each one means
- How to add, rescan, and re-manifest directories
- How manifest version history and reverting work
- How to handle path changes when directories move

## The Directories view

The Directories view shows every directory the client monitors, with its status, last scan date, file counts, and current manifest version. From here you can pause or resume watching, trigger a rescan, open the re-manifest flow, or remove a directory.

<!-- screenshot: Directories view showing multiple watched directories with status indicators and action buttons -->

## Watch states

Each directory has one of three states:

### Watching

The directory is actively monitored. The OS-native file watcher is registered and the sync engine processes changes as they appear. This is the default state after a directory is added and its manifest is approved.

### Paused

The file watcher is removed. No new files are detected or processed. Staged or pending encounters remain in their current state. The directory stays in your configuration -- it is just silenced. Pausing is useful when you disconnect an external drive or reorganize files.

### Removed

The directory is removed from the configuration entirely. Scan data and unsynced staged encounters are archived (kept for reference, but no longer active). Previously synced encounters remain in finwave and are unaffected.

:::caution
Removing a directory does not delete any files on your filesystem. It only removes the directory from the desktop client's watch list. Encounters already uploaded to finwave are not affected.
:::

## Adding new directories

After your initial scan, you can add directories at any time:

1. Click **Add Directory** and select a folder.
2. The new directory is scanned using the same [discovery](/desktop/discovery/discovery/) process.
3. If an existing manifest covers the structure, you can apply it directly. Otherwise, create a new manifest through the [manifest editing](/desktop/discovery/manifest-editing/) flow.
4. Once a manifest is approved, the directory begins watching.

:::tip
If your organization uses a consistent folder structure, you can often reuse the same manifest for new directories without modification.
:::

## Rescanning

Rescanning re-runs discovery on a directory that has already been scanned. Use it when you have reorganized folders, added files while paused, connected a new external drive, or need to complete an interrupted scan.

During a rescan, the client identifies **new files**, **changed files** (modified since last scan), and **removed files** (no longer on disk). Previously synced encounters are not re-uploaded -- only new and changed files are eligible for staging. The existing manifest is re-applied automatically, and you receive a summary on completion.

## Re-manifesting

Re-manifesting generates a new manifest version for a directory. Use it when your organization changes its folder naming convention, you want different extraction rules, a new authoritative spreadsheet was created, or the original manifest had errors.

The [manifest editor](/desktop/discovery/manifest-editing/) opens pre-populated with the current rules. You adjust, preview, and save. The new version applies only to **future sync events** -- previously synced encounters are not retroactively changed.

:::note
If you want to re-process historical data with the updated manifest, you can trigger a "re-process" action. This re-stages previously synced encounters using the new mapping. They appear in the confirmation queue as "re-mapped" encounters so you can review them before re-uploading.
:::

## Manifest version history

Each directory maintains a complete manifest version history. You can view it from the Directories view by selecting a directory and opening its history.

<!-- screenshot: Manifest version history showing three versions with dates, change summaries, and approval status -->

The history shows:
- **Version number** and creation date
- **Change summary** -- what was modified from the previous version
- **Approval status** -- who approved it and when
- **Current/superseded indicator** -- which version is active

**Reverting** to an older version does not delete any history. It creates a new version with the old version's rules. For example, reverting from v3 to v1's rules creates v4 with v1's configuration. The full audit trail is always preserved.

## Handling path changes

Directories sometimes move -- drive letters change, mount points shift, or external drives are reconnected with a different path. The client supports:

**Path update:** If a directory moved, you can update its path without losing scan history or manifest configuration. The client re-validates that the expected files still exist at the new location.

**Split:** A single watched directory can be split into multiple entries with different manifests, useful when a folder contains data with different structures (such as survey data and opportunistic sightings in separate subdirectories).

**Merge:** Multiple directories can share the same manifest if they follow the same structure. The manifest is applied independently to each directory, but the rules are shared.

## Related

- [Discovery](/desktop/discovery/discovery/) -- how the initial scan works
- [Manifesting](/desktop/discovery/manifesting/) -- how manifests are generated
- [Manifest Editing](/desktop/discovery/manifest-editing/) -- the editing and approval interface
- [How Sync Works](/desktop/sync/how-sync-works/) -- how watched directories feed into synchronization
