---
title: "Sync Configuration"
description: "Quiet hours, bandwidth limits, and auto-confirm settings"
sidebar:
  order: 2
---

:::note
Sync configuration is under active development and not yet available in the desktop client. This page describes planned settings.
:::

## Planned configuration options

When synchronization ships, the following settings are planned:

- **Debounce period** -- How long to wait after the last file event before processing (default: 5 minutes). Shorter values make sync more responsive; longer values reduce the chance of processing an incomplete copy.
- **Bandwidth limit** -- Maximum upload bandwidth in megabits per second to avoid saturating your network.
- **Concurrent uploads** -- Number of simultaneous image uploads (default: 2).
- **Auto-confirm** -- When enabled, skips the manual confirmation step and uploads new encounters as soon as they are staged.
- **Quiet hours** -- Time ranges during which sync pauses uploads (useful for shared network environments).

## Related

- [How Sync Works](/desktop/sync/how-sync-works/) -- Overview of the planned sync pipeline
- [Directory Management](/desktop/discovery/directory-management/) -- Managing watched directories (available now)
