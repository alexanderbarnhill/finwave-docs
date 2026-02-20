---
title: "Revision Rate"
description: "What revision rate measures and how it differs from accuracy metrics"
sidebar:
  order: 5
---

## What you'll learn

- What revision rate is and how it is calculated
- How revision rate differs from precision, recall, and accuracy
- How to interpret high and low revision rates
- Why unreviewed annotations matter for this metric

## Overview

Revision rate measures the overall human correction effort required for a given model. While metrics like precision and accuracy focus on specific types of errors, revision rate gives you a single number that captures how much work humans are doing to fix what the model produces.

## The formula

> RevisionRate = RevisedAnnotations / TotalAnnotations x 100

Where:

- **RevisedAnnotations** = the number of distinct ML annotations that have at least one non-Confirmed revision (such as Deleted, BoxResized, SideChanged, AnimalIdChanged, or HumanAdded).
- **TotalAnnotations** = all `IsMachine` annotations attributed to this model, whether they have been reviewed or not.

<!-- screenshot: revision rate card in the ML Center -->

## How revision rate differs from other metrics

The key distinction is in the denominator. Precision, recall, and accuracy only count **reviewed** annotations -- they tell you about model quality among the annotations that humans have actually looked at. Revision rate counts **all** ML annotations, including those not yet reviewed.

This matters because it reflects the real-world burden on your team:

| Metric | Denominator | What it tells you |
|--------|-------------|-------------------|
| Precision | Confirmed + Deleted | How often the model detects something real (among reviewed) |
| Recall | Confirmed + HumanAdded | How often the model finds everything (among reviewed) |
| Side Accuracy | Confirmed | How often the side is correct (among reviewed) |
| ID Accuracy | Confirmed | How often the ID is correct (among reviewed) |
| **Revision Rate** | **All ML annotations** | **How much of the model's total output required human correction** |

:::note
An annotation counts as "revised" if it has any non-Confirmed revision. An annotation that was both resized and had its side changed still counts as one revised annotation, not two.
:::

## Interpreting the values

- **Low revision rate** (e.g., 5-10%) -- The model's output is largely correct. Most annotations either pass through review without changes or have not yet needed review.
- **Moderate revision rate** (e.g., 15-25%) -- A meaningful portion of annotations require correction. This is common for actively reviewed populations where the team is thorough.
- **High revision rate** (e.g., 30%+) -- Humans are spending significant effort correcting the model. This suggests the model may benefit from retraining, or that the population's data has characteristics the model was not trained to handle.

:::tip
Revision rate naturally increases as your team reviews more annotations, because unreviewed annotations start in the denominator but do not appear in the numerator. A rising revision rate does not always mean the model is getting worse -- it can also mean your team is catching up on reviews.
:::

## Revision rate and review progress

Because TotalAnnotations includes unreviewed annotations, revision rate is influenced by how much of your data has been reviewed. Consider two scenarios:

**Scenario A:** 1,000 total ML annotations, 500 reviewed, 50 revised. Revision rate = 50 / 1,000 = 5%.

**Scenario B:** 1,000 total ML annotations, 900 reviewed, 90 revised. Revision rate = 90 / 1,000 = 9%.

Both populations have the same underlying correction rate among reviewed annotations (10%), but Scenario B shows a higher revision rate because more annotations have been reviewed. As you review more data, revision rate converges toward the true correction rate.

:::caution
If your revision rate is very low but your team has only reviewed a small fraction of total annotations, the number is not yet meaningful. Check the review count alongside the rate. The "Preliminary" badge appears when fewer than the configured threshold of annotations have been reviewed.
:::

## When revision rate is most useful

Revision rate is particularly valuable for:

- **Comparing models over time** -- If revision rate trends upward across daily snapshots, the model may be degrading relative to incoming data.
- **Estimating review workload** -- A revision rate of 20% means roughly one in five annotations will need human correction. This helps plan reviewer time.
- **Justifying retraining** -- A consistently high revision rate provides concrete evidence that a model retrain would save human effort.

## Related

- [ML Center Overview](/web/ml-center/overview/) -- How the ML Center works and how metrics are refreshed
- [Detection Metrics](/web/ml-center/detection-metrics/) -- Precision, recall, F1, and bounding box quality
- [Classification Metrics](/web/ml-center/classification-metrics/) -- Side accuracy
- [Identification Metrics](/web/ml-center/identification-metrics/) -- ID accuracy
- [Manual Annotations](/web/features/annotator/manual-annotations/) -- Adding annotations the model missed
