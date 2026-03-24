---
title: "Sync Configuration"
description: "API key provisioning, concurrency, and sync settings"
sidebar:
  order: 2
---

In this guide you will learn:

- How the API key is provisioned and what the statuses mean
- How to configure upload concurrency
- What the Ensure Individuals and Reset actions do
- Where to find sync settings

## API key

The desktop app needs an API key to authenticate with the finwave server during sync. The key is **auto-provisioned** when you first open the sync page.

The global status bar shows the current API key status:

| Status | Meaning |
|--------|---------|
| API key ready | Key is provisioned and valid. You can sync. |
| API key not provisioned | Key has not been created yet. Open the sync page to trigger provisioning. |
| Provisioning... | Key creation is in progress. |
| API key invalid | Key exists but the server rejected it. Try re-provisioning from Settings. |
| Access denied | Desktop sync is not enabled for your population. Ask your admin to enable it in population settings (Administration > Sync & Identification Settings). |

:::caution
If the API key shows "access denied," you cannot sync until your population admin enables the Desktop Sync feature gate. This is a population-level setting, not a user-level one.
:::

## Upload concurrency

The concurrency selector in the global status bar controls how many images are uploaded in parallel per encounter. Options are 1 through 4.

- **1 (Sequential)** -- Safest for slow or unstable connections
- **2 (Default)** -- Good balance of speed and bandwidth usage
- **3-4** -- Faster uploads on high-bandwidth connections

The setting is saved locally and persists across sessions.

<!-- screenshot: Global status bar showing concurrency selector -->

## Ensure Individuals

The **Ensure** button on each manifest row runs a pre-sync step that creates individual records on the finwave server. For each unique individual ID in the manifest:

- If the individual already exists on the server, it is skipped
- If not, a new individual record is created

Run this **once before your first sync** for a manifest. Progress is shown inline with a count and the current individual name.

:::tip
You do not need to run Ensure again unless you add new individual IDs to the manifest. Re-running is safe -- it simply confirms all individuals exist.
:::

## Reset sync status

The **Reset** button (shown when a manifest has synced encounters) resets all synced encounters back to pending. Use this when:

- You deleted encounters on the finwave server and need to re-send them
- A sync completed but images are missing and you want to retry the full upload
- You need to re-upload with different settings

After resetting, click Sync to re-process all encounters. The engine will check what already exists on the server and only upload missing data.

## Server connection

The server URL is shown in the global status bar and is auto-detected from the app configuration. If it shows the wrong server, check your configuration in Settings.

## Related

- [How Sync Works](/desktop/sync/how-sync-works/) -- The sync pipeline overview
- [Ensure Individuals](/desktop/onboarding/pre-training/) -- Details on the ensure step
- [Sync Troubleshooting](/desktop/sync/troubleshooting/) -- Fixing sync errors
- [Getting Help](/desktop/getting-started/getting-help/) -- Diagnosing issues
