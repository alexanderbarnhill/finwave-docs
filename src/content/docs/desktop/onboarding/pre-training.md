---
title: "Ensure Individuals"
description: "Creating individual records on the server before syncing encounters"
sidebar:
  order: 4
quickRef:
  - "Pre-sync step that creates individual records on finwave for every ID found in the manifest"
  - "Run once per manifest before first sync. Re-run only if you add new IDs by re-materializing"
  - "Inline progress: count + total + current individual name (e.g. '12 / 45 — Nebula')"
  - "Result summary: found / already existed / created / failed"
  - "All-already-exist message is normal for repeat syncs or shared populations"
  - "Disabled if API key isn't provisioned. 'access denied' = pop admin needs to enable Desktop Sync"
  - "Without this step, encounters still upload but the individual links may take longer to appear"
---

In this guide you will learn:

- What "Ensure Individuals" does and why it matters
- When to run it in the onboarding workflow
- How to interpret the results

## What it does

Ensure Individuals is a pre-sync step that creates individual records on the finwave server for every individual ID found in your manifest. This ensures that when encounters are uploaded, the server already knows about each individual and can link images correctly for downstream identification matching.

Without this step, encounters referencing unknown individuals would still upload successfully, but the individual associations might be delayed until the server creates them on the fly during ingestion.

<!-- screenshot: Ensure Individuals button on a manifest row in the sync page -->

## When to run it

Run Ensure Individuals **once before your first sync** for a manifest. You do not need to run it again unless you add new individual IDs to your manifest (for example, by re-materializing with updated data).

The button appears on each manifest row in the sync page. Click it to start the process.

## How it works

1. The desktop app scans all approved encounters in the manifest and collects unique individual IDs.
2. For each individual, it sends a request to the finwave server to create or confirm the record.
3. Progress is shown inline: `12 / 45 -- Nebula` (current count, total, and the individual being processed).

## Interpreting results

When the process finishes, you see a summary:

- **X individuals found** -- Total unique IDs in your manifest.
- **Y already existed** -- These were already on the server (no action needed).
- **Z created** -- New individual records created on the server.
- **W failed** -- Could not be created (check the error details below the summary).

:::tip
If all individuals already exist, you will see "All individuals already exist on the server." This is normal for subsequent syncs or when another user has already uploaded data for the same population.
:::

:::caution
If the Ensure button is disabled, check that your API key is provisioned (shown in the global status bar at the top of the sync page). If the API key shows "access denied," ask your population admin to enable Desktop Sync in population settings.
:::

## Related

- [How Sync Works](/desktop/sync/how-sync-works/) -- The full sync pipeline
- [Pre-Sync Review](/desktop/onboarding/pre-sync-review/) -- Reviewing encounters before upload
- [Sync Configuration](/desktop/sync/configuration/) -- API key and concurrency settings
