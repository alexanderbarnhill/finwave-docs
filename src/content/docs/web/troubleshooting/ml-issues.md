---
title: "ML Issues"
description: "When the ML Center looks broken — what each empty/placeholder state actually means"
sidebar:
  order: 3
quickRef:
  - "Metrics shown as '—' (em-dash) mean the metric is null/undefined for that model — not zero. The model may simply not have any reviewed annotations yet"
  - "'Preliminary' badge: the model has fewer than the configured threshold of reviewed annotations (default 100). Numbers can swing significantly until you cross that line"
  - "ML Center metrics are materialized nightly. New reviews you just did won't show until the next refresh — the page banner shows the 'Last updated' timestamp"
  - "Admin Refresh queues an immediate recomputation; the snackbar 'Metrics refresh queued. Results will update shortly.' confirms it was accepted"
  - "Fusion shadow card showing 'No shadow data yet for the last N days' — fusion hasn't been observed running on any encounter yet in that window"
  - "Junk Review showing 'No rejected detections recorded yet' — gate models haven't rejected anything, which is fine, not an error"
  - "Fusion debounce queue showing 'No fusion fires pending' — there are no pending re-runs; this is the steady state"
  - "If a metric you expect to see is missing entirely (no row, not '—'), the model probably isn't in your population's catalog — check Active Models"
---

## What you'll learn

- How to tell an empty state from a real problem on the ML Center
- Where the placeholder text on each subpage actually comes from
- When to refresh and when to wait

## Read this first

The ML Center has many empty states by design. A model with no reviews shows "—". A new population with no junk-bucketed detections shows "No rejected detections recorded yet." A queue with no debounce timers active shows "No fusion fires pending." None of these are errors — they are accurate steady states.

Before reporting an issue, match what you see against the table below.

## Common placeholder states

### "—" instead of a percentage

`formatMetric` renders `null` or `undefined` numeric metrics as `—` (a single em-dash) so you can tell *no data* from a real `0%` or `100%`. If a column shows `—`:

- The model has no reviewed annotations contributing to that metric, **or**
- The metric isn't applicable to that model (e.g., a side-classification metric on an identification model)

Wait for reviews to accumulate, or pick a different model — there isn't an action you take to "fix" this.

### "Preliminary" badge

The badge appears next to a model row when the count of reviewed annotations is below the population's `metricSampleThreshold` (default **100**). The tooltip reads:

> Fewer than 100 annotations. Metrics are preliminary.

The threshold is configurable on the population's ML settings — bigger populations may want a higher bar. Below it, swings of a few reviews change the metrics noticeably; above it, the numbers stabilise.

### "Last updated" is in the past

ML Center metrics are *materialized* — a nightly job aggregates revisions into model-level snapshots. The page reads those snapshots; it does not recompute on load. So:

- Reviews you just did won't appear until the next nightly run
- The header shows the timestamp the snapshot was last refreshed
- An admin can press **Refresh** to queue an immediate recomputation; you'll see the snackbar `Metrics refresh queued. Results will update shortly.` Watch the timestamp to know when it lands.

If Refresh fails, the snackbar reads `mlCenter.refreshFailed` — usually a transient backend error; retry.

### Fusion shadow: "No shadow data yet for the last N days"

The fusion potential-lift card shows this exact message when no encounter has been scored under shadow mode in the configured window. The remediation is the literal next sentence in the message:

> Run an encounter through the pipeline to populate this.

It's not an error — it just means the data hasn't accumulated yet on this population.

### Junk Review: "No rejected detections recorded yet"

This empty state on the Junk Review page reads:

> No rejected detections recorded yet. Buckets fill as gate models reject upstream detections.

A gate-model rejection is what populates the junk buckets. If your population has no gates configured, or gates haven't fired, this list will stay empty — and that's expected.

### Fusion debounce queue: "No fusion fires pending"

When the debounce queue is empty, you see:

> No fusion fires pending. Confirm an annotation to see one queued here.

The queue polls every 2 seconds. Confirming any annotation in the annotator should produce a queued entry within a few seconds — if you're testing the system, this is how to verify it.

## When something genuinely looks wrong

If you see a state that doesn't match any of the above, capture:

- The model name and id (visible on the row)
- The exact text of any empty state or error
- The `Last updated` timestamp shown on the page
- Whether refreshing changes anything

For metric definitions (what each percentage actually counts), don't troubleshoot by guessing — the metric pages document each formula:

- [Detection Metrics](/web/ml-center/detection-metrics/) — precision, recall, IoU
- [Classification Metrics](/web/ml-center/classification-metrics/) — side accuracy
- [Identification Metrics](/web/ml-center/identification-metrics/) — top-1, top-N, mAP@K
- [Revision Rate](/web/ml-center/revision-rate/) — overall human-correction effort

## Related

- [ML Center Overview](/web/ml-center/overview/) — what the page is and how the metrics are computed
- [Common Issues](/web/troubleshooting/common-issues/) — generic HTTP error toasts (Refresh failures often surface here too)
