---
title: "ML Center Overview"
description: "What the ML Center shows, how metrics are computed, and how to interpret model performance"
sidebar:
  order: 1
quickRef:
  - "What it is: per-model performance dashboard fed by every human review action in the annotator"
  - "Three pipeline phases tracked: Detection (where), Classification (left/right side), Identification (which animal)"
  - "Metrics are materialized nightly — page loads instant, shows 'Last updated' timestamp"
  - "Admin Refresh button queues an immediate recomputation when you need fresh numbers"
  - "Baseline date marks where tracking started; pre-baseline annotations are excluded from metrics"
  - "Preliminary badge shows on models with <100 reviewed annotations — numbers can shift a lot still"
  - "Null metrics render as '---' rather than 0%/100% so you can tell empty from extreme"
  - "Found at Administration → ML Center on any population with active models"
---

## What you'll learn

- What the ML Center is and why it exists
- How finwave's ML pipeline processes encounter images in three phases
- How metrics are computed and refreshed
- What the baseline date means for your data

## What is the ML Center?

The ML Center is an administration page that tracks how well your population's ML models perform. Every time a researcher reviews an ML-generated annotation in the annotator -- confirming it, correcting it, or deleting it -- that action becomes a data point. The ML Center aggregates those data points into performance metrics so you can see whether your models are improving, degrading, or ready for retraining.

<!-- screenshot: ML Center dashboard showing model cards with metrics -->

You find the ML Center under **Administration > ML Center** for any population that has active ML models.

## The three phases of ML processing

When you upload encounter images, finwave runs them through up to three ML phases:

1. **Detection** -- Object detection models locate features of interest in each image (dorsal fins, eye patches, or other category-specific markers) and draw bounding boxes around them.
2. **Classification** -- Side determination models classify each detection as left or right. This applies primarily to dorsal fin annotations.
3. **Identification** -- Identification models compare each detection against known individuals in the population and predict which animal it belongs to.

Each phase has its own set of metrics. Detection models are measured by precision, recall, and bounding box accuracy. Classification models are measured by side accuracy. Identification models are measured by ID accuracy. All models also have a revision rate that captures overall human correction effort.

## How metrics are computed

Metrics are **materialized**, not computed on the fly. A background job runs nightly to aggregate all human corrections (called **revisions**) into a snapshot for each model. This means:

- The ML Center loads instantly -- it reads pre-computed results, not raw data.
- You see a **"Last updated"** timestamp showing when metrics were last computed (e.g., "Metrics as of Feb 19, 2026, 3:00 AM UTC").
- Daily snapshots accumulate over time, enabling trend charts that show how model performance changes day by day.

:::tip
If you need fresh numbers before the next nightly run, use the **Refresh** button. This is an admin-only action that queues an immediate recomputation for your population. The page will indicate when the refresh is complete.
:::

## The baseline date

When metric tracking is first enabled for a population, a **baseline date** is set. Only human corrections recorded after this date are included in metrics. The ML Center displays this as "Metrics tracked since [date]."

This exists because earlier annotation reviews may not have had their corrections fully tracked. The baseline ensures your metrics reflect accurate, complete data.

:::note
As new annotations are reviewed, pre-baseline data quickly becomes a small fraction of the total. Within a few weeks of active use, your metrics will represent the vast majority of your annotation history.
:::

## Reading the dashboard

Each model appears as a card on the ML Center dashboard. Here is what to look for:

- **Metric values** -- Percentages and scores for the model's phase (detection, classification, or identification).
- **"Preliminary" badge** -- If a model has fewer than the sample threshold (default: 100 reviewed annotations), its metrics are flagged as preliminary. The numbers are still computed and shown, but they may shift significantly as more data comes in.
- **Null values shown as "---"** -- If there is not enough data to compute a metric (for example, zero confirmed annotations), the metric displays a dash instead of a misleading 0% or 100%.

<!-- screenshot: model card showing preliminary badge and null metric value -->

## Related

- [Detection Metrics](/web/ml-center/detection-metrics/) -- Precision, recall, F1, IoU, and box correction rate
- [Classification Metrics](/web/ml-center/classification-metrics/) -- Side accuracy
- [Identification Metrics](/web/ml-center/identification-metrics/) -- ID accuracy
- [Revision Rate](/web/ml-center/revision-rate/) -- Overall correction effort per model
- [Confirming Annotations](/web/features/annotator/confirming/) -- How reviewing annotations generates metric data
