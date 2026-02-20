---
title: "Detection Metrics"
description: "Precision, recall, F1, average IoU, and box correction rate for object detection models"
sidebar:
  order: 2
---

## What you'll learn

- What precision, recall, and F1 measure for detection models
- How average IoU and box correction rate assess bounding box quality
- What high and low values mean for each metric
- How null values and edge cases are handled

## Overview

Detection metrics evaluate how well your object detection models find features in encounter images. These models draw bounding boxes around dorsal fins, eye patches, or other markers. The metrics answer two questions: **did the model find the right things?** and **did it draw the boxes in the right places?**

All detection metrics are derived from human corrections in the annotator. When a researcher confirms, deletes, resizes, or adds annotations, those actions become the ground truth that metrics are computed against.

## Precision

**What it measures:** Of everything the model detected, how much was correct.

> Precision = Confirmed / (Confirmed + Deleted) x 100

When a researcher confirms an ML annotation, that counts as a correct detection. When they delete one (because the model marked something that is not actually a feature of interest), that counts as a false positive.

- **High precision** (e.g., 95%) -- The model rarely detects things that are not there. Researchers spend little time deleting spurious annotations.
- **Low precision** (e.g., 70%) -- The model frequently flags non-features. Researchers must delete many incorrect annotations per encounter.

:::note
If no annotations have been either confirmed or deleted (both counts are zero), precision displays as "---" because there is no data to compute it from.
:::

## Recall

**What it measures:** Of everything that should have been detected, how much did the model actually find.

> Recall = Confirmed / (Confirmed + HumanAdded) x 100

HumanAdded counts annotations that a researcher created manually on images where the model had already run -- features the model missed.

- **High recall** (e.g., 95%) -- The model rarely misses features. Researchers seldom need to add annotations by hand.
- **Low recall** (e.g., 70%) -- The model misses a significant number of features. Researchers must manually annotate what was overlooked.

:::caution
Recall depends on researchers actually adding annotations for features the model missed. If your team tends to skip missed features rather than adding them, recall will appear artificially high.
:::

## F1 Score

**What it measures:** The balance between precision and recall, combined into a single number.

> F1 = 2 x (Precision x Recall) / (Precision + Recall)

F1 is useful as a single summary of detection quality. It is high only when both precision and recall are high. If either one drops, F1 drops with it.

- **F1 above 90** -- The model performs well on both finding features and avoiding false detections.
- **F1 below 80** -- There is meaningful room for improvement in either precision, recall, or both.

## Average IoU

**What it measures:** How closely the model's bounding boxes match where humans think the box should be, measured only on boxes that were corrected.

> AvgIoU = mean of IoU values from all BoxResized revisions

IoU (Intersection over Union) compares the overlap between the original model-drawn box and the human-corrected box. A value of 1.0 means they are identical; a value of 0.0 means they do not overlap at all.

- **High AvgIoU** (e.g., 0.85) -- When boxes do need correction, the model was already close. Researchers are making minor adjustments.
- **Low AvgIoU** (e.g., 0.50) -- Corrected boxes were significantly off. The model is finding the right features but placing boxes poorly.

:::tip
Average IoU only includes boxes that a researcher actually resized. Boxes that were confirmed without changes are excluded. This means AvgIoU reflects "how off were the boxes that needed fixing," not overall box quality. Pair it with box correction rate for the full picture.
:::

## Box Correction Rate

**What it measures:** What percentage of confirmed detections required a bounding box resize.

> BoxCorrectionRate = BoxResized / Confirmed x 100

- **Low rate** (e.g., 5%) -- Almost all boxes were accepted as-is. The model draws accurate boxes.
- **High rate** (e.g., 30%) -- Nearly a third of confirmed detections needed their boxes adjusted. Researchers are spending time on box corrections.

Together, box correction rate and average IoU give you the full localization picture: the rate tells you **how often** boxes need fixing, and the average IoU tells you **how far off** they were when they did.

## Related

- [ML Center Overview](/web/ml-center/overview/) -- How the ML Center works and how metrics are refreshed
- [Classification Metrics](/web/ml-center/classification-metrics/) -- Side accuracy for classification models
- [Revision Rate](/web/ml-center/revision-rate/) -- Overall human correction effort across all revision types
- [Editing Annotations](/web/features/annotator/editing/) -- How to resize boxes and make corrections in the annotator
