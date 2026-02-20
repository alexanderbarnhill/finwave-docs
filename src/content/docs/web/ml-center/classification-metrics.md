---
title: "Classification Metrics"
description: "Side accuracy metric for left/right classification models"
sidebar:
  order: 3
---

## What you'll learn

- What side accuracy measures and why it matters
- How the metric is calculated from human corrections
- What low accuracy indicates about your classification model

## Overview

After a detection model locates a feature in an image, a classification model determines which **side** of the animal it belongs to -- left or right. This applies primarily to dorsal fin annotations, where side determination is essential for matching individuals across encounters. The classification metrics page tracks how often the model gets this right.

## Side Accuracy

**What it measures:** Of all confirmed ML annotations, how many had the correct side assignment without needing a human correction.

> Accuracy = (Confirmed - SideChanged) / Confirmed x 100

Every time a researcher reviews an ML annotation and changes its side from left to right (or vice versa) before confirming, that generates a SideChanged revision. The metric subtracts those corrections from the total confirmed count to determine how many the model got right on its own.

<!-- screenshot: classification accuracy card in the ML Center -->

### Interpreting the values

- **High accuracy** (e.g., 97%) -- The model reliably distinguishes left from right. Researchers rarely need to flip the side assignment.
- **Moderate accuracy** (e.g., 85-95%) -- The model is mostly correct but makes occasional errors. You may notice certain angles or lighting conditions cause more confusion.
- **Low accuracy** (below 85%) -- The model frequently confuses left and right sides. This adds significant manual effort to the review process and may warrant model retraining.

:::caution
Low side accuracy does not just mean extra clicks for reviewers. Incorrect side assignments that slip through review can affect individual identification, since matching algorithms rely on comparing the same side across encounters. If you see accuracy dropping, prioritize careful side verification during annotation review.
:::

### What counts and what does not

- Only `IsMachine = true` annotations are included -- human-created annotations are excluded.
- Only dorsal fin annotations (or other categories where side is relevant) contribute to this metric.
- If no annotations have been confirmed yet (Confirmed = 0), the metric displays as "---".

:::note
A "Preliminary" badge appears when fewer than the configured sample threshold (default: 100) annotations have been reviewed. The accuracy value is still computed but may shift as more data comes in.
:::

## Common causes of low side accuracy

Side classification errors are often caused by:

- **Ambiguous images** -- When the animal is photographed from directly above or behind, the distinction between left and right becomes difficult even for ML models.
- **Unusual body posture** -- Animals rolling, breaching, or turning can present a side view that contradicts the actual orientation.
- **Training data imbalance** -- If the model was trained on significantly more left-side images than right-side (or vice versa), it may be biased toward predicting the more common class.

Reviewing the specific encounters where side corrections were made can help identify whether errors follow a pattern.

## Related

- [ML Center Overview](/web/ml-center/overview/) -- How the ML Center works and how metrics are refreshed
- [Detection Metrics](/web/ml-center/detection-metrics/) -- Precision, recall, and bounding box quality
- [Identification Metrics](/web/ml-center/identification-metrics/) -- Accuracy of individual ID predictions
- [Revision Rate](/web/ml-center/revision-rate/) -- Overall human correction effort
- [Confirming Annotations](/web/features/annotator/confirming/) -- The review workflow that generates metric data
