---
title: "Sync Configuration"
description: "Quiet hours, bandwidth limits, and auto-confirm settings"
sidebar:
  order: 2
---

## What you'll learn

- All available sync configuration settings and what they control
- Default values and recommended ranges
- How to configure quiet hours to avoid uploads during peak times
- Which settings can be locked by IT administrators

## Accessing sync settings

Open the desktop client and navigate to **Settings > Sync**. All sync behavior is controlled from this panel. Changes take effect immediately -- you do not need to restart the client or disable sync first.

<!-- screenshot: Sync configuration panel showing all settings -->

## Configuration reference

The table below lists every sync configuration setting, its type, default value, and description.

| Setting | Type | Default | Description |
|---|---|---|---|
| `enabled` | boolean | `true` | Master toggle for the sync system. When `false`, file watching is paused and no new encounters are detected or uploaded. |
| `watched_directories` | string[] | `[]` | List of absolute directory paths the client monitors for new files. Subdirectories are watched recursively. |
| `debounce_seconds` | integer | `300` | How long (in seconds) the client waits after the last file event before processing a batch. Set lower for faster response, higher to avoid processing incomplete file copies. |
| `quiet_hours_start` | time | *none* | Start of the daily quiet period (24-hour format, e.g., `22:00`). During quiet hours, the client continues to detect and stage new encounters but does not upload them. |
| `quiet_hours_end` | time | *none* | End of the daily quiet period (e.g., `06:00`). Uploads resume automatically when quiet hours end. |
| `max_concurrent_uploads` | integer | `2` | The maximum number of image files uploaded simultaneously. Higher values use more bandwidth but complete faster. |
| `bandwidth_limit_mbps` | number \| null | `null` | Maximum upload bandwidth in megabits per second. `null` means unlimited. This cap is shared across all upload activity (both onboarding and sync). |
| `auto_confirm` | boolean | `false` | When `true`, staged encounters are uploaded automatically without waiting for manual confirmation. |
| `notification_style` | string | `"notification"` | How the client alerts you to staged encounters. Options: `"notification"` (desktop notification with details), `"badge_only"` (icon badge, no popup), `"silent"` (no notification). |

## Debounce timing

The `debounce_seconds` setting controls how long the client waits after the last detected file change before processing. The default of 300 seconds (5 minutes) works well for typical workflows where you copy a batch of files from a camera card or external drive.

:::tip
If you work with smaller, frequent additions (one or two images at a time), consider lowering the debounce to 60--120 seconds. If you regularly copy large batches over slow connections, increase it to 600 seconds or more.
:::

## Quiet hours

Quiet hours let you prevent uploads during periods when network bandwidth is needed for other activities. When quiet hours are active:

- File watching and detection continue normally.
- New encounters are staged and you are notified (if notifications are enabled).
- No upload traffic is generated.
- When quiet hours end, all pending uploads resume automatically.

Set both `quiet_hours_start` and `quiet_hours_end` to enable this feature. Leave both unset to disable it.

:::note
Quiet hours use your system's local time zone. If the start time is later than the end time (e.g., 22:00 to 06:00), the quiet period spans midnight.
:::

## Bandwidth limits

The `bandwidth_limit_mbps` setting applies a global cap on upload bandwidth. This is useful on shared or metered connections. The limit is enforced across all concurrent uploads -- if you set 10 Mbps with 2 concurrent uploads, each upload gets up to 5 Mbps.

Set the value to `null` (the default) to use all available bandwidth.

## Auto-confirm

When `auto_confirm` is `false` (the default), every staged encounter requires your explicit approval before uploading. This gives you a chance to review metadata, edit details, or skip encounters that should not be uploaded.

When `auto_confirm` is `true`, staged encounters are uploaded as soon as they pass through the pipeline. You can still review uploaded encounters in the sync history.

:::caution
Enable auto-confirm only if you are confident in your directory structure and naming conventions. Once uploaded, encounters exist on the server and must be managed through the web application.
:::

## Managed settings

If your organization uses group policy or MDM to manage the desktop client, some settings may be locked. Locked settings display a "Managed by your organization" label and cannot be changed in the UI. See [Deployment](/desktop/it-security/deployment/) for details on which settings can be locked.

## Related

- [How Sync Works](/desktop/sync/how-sync-works/) -- The sync pipeline, file watching, and confirmation flow
- [Sync Troubleshooting](/desktop/sync/troubleshooting/) -- Diagnosing sync issues
- [Deployment](/desktop/it-security/deployment/) -- Locking settings via group policy or MDM
- [Network Requirements](/desktop/it-security/network/) -- Bandwidth and connectivity requirements
