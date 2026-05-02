---
title: "Identification Metrics"
description: "ID accuracy metric for individual identification models"
sidebar:
  order: 4
quickRef:
  - "ID accuracy = (Confirmed - AnimalIdChanged) / Confirmed × 100"
  - "Only annotations where the model actually predicted an individual count — 'unknown' predictions are excluded"
  - "Question it answers: 'when the model claims to recognize an individual, how often is it right?'"
  - "Doesn't measure: how often the model misses individuals it should recognize"
  - "Trend down over time often signals retraining is due — common triggers: new individuals, catalog growth, equipment changes"
  - "Distinguish gradual decline (retrain) from a one-time dip (unusual batch of images)"
  - "Researcher review thoroughness directly affects metric reliability — accepted-but-wrong IDs underreport error"
---

## What you'll learn

- What ID accuracy measures and how it is calculated
- Which predictions are included and which are excluded
- What low accuracy means for your identification workflow

## Overview

Identification is the final phase of finwave's ML pipeline. After a feature is detected and its side is classified, an identification model compares the annotation against known individuals in the population and predicts which animal it belongs to. The identification metrics track how often those predictions are correct.

## ID Accuracy

**What it measures:** Of all confirmed ML annotations where the model predicted a specific individual, how many had the correct ID without needing a human correction.

> Accuracy = (Confirmed - AnimalIdChanged) / Confirmed x 100

When a researcher reviews an ML annotation and changes the predicted individual ID before confirming, that generates an AnimalIdChanged revision. The metric subtracts those corrections from the total to determine how often the model's ID prediction was right.

<!-- screenshot: identification accuracy card in the ML Center -->

### What is included

Only annotations where the model **actually predicted an individual** are counted. If the model returned "unknown" or made no ID prediction, that annotation is excluded from the accuracy calculation. This keeps the metric focused on the quality of the model's positive predictions rather than penalizing it for being appropriately uncertain.

Specifically:

- AnimalIdChanged revisions are only counted when the `OldValue` (the model's original prediction) is not null -- meaning the model did predict a specific individual.
- If a researcher changes an ID from "unknown" to a specific individual, that is not counted as a model error because the model did not claim to know who it was.

:::note
This means ID accuracy answers the question: "When the model says it recognizes an individual, how often is it right?" It does not measure how often the model fails to recognize individuals it should know.
:::

### Interpreting the values

- **High accuracy** (e.g., 90%+) -- When the model predicts an individual, it is usually correct. Researchers can trust the suggestions and focus their review on confirming rather than correcting.
- **Moderate accuracy** (e.g., 70-90%) -- The model makes useful predictions but requires regular correction. Researchers should always verify ID suggestions against the catalog.
- **Low accuracy** (below 70%) -- The model frequently misidentifies individuals. This could indicate that the catalog has grown or changed significantly since the model was last trained, or that image quality varies widely.

:::caution
ID accuracy reflects only the cases where a researcher actively changed the predicted individual. If researchers sometimes accept an incorrect ID without noticing, the true accuracy may be lower than reported. Thorough review practices are essential for both data quality and metric reliability.
:::

### Null values

If no annotations with model-predicted IDs have been confirmed yet (Confirmed = 0), the metric displays as "---". A "Preliminary" badge appears when the number of reviewed annotations falls below the sample threshold (default: 100).

## When to consider retraining

A drop in ID accuracy over time -- visible in the ML Center's trend charts -- often signals that the model needs retraining. Common triggers include:

- **New individuals** added to the population that the model has never seen.
- **Catalog growth** that increases the number of possible matches, making the task harder.
- **Changing image conditions** such as new camera equipment or different survey locations.

The trend data in the ML Center helps you distinguish between a gradual decline (likely needs retraining) and a one-time dip (possibly a batch of unusual images).

## Related

- [ML Center Overview](/web/ml-center/overview/) -- How the ML Center works and how metrics are refreshed
- [Detection Metrics](/web/ml-center/detection-metrics/) -- Precision, recall, and bounding box quality
- [Classification Metrics](/web/ml-center/classification-metrics/) -- Side accuracy for classification models
- [Revision Rate](/web/ml-center/revision-rate/) -- Overall human correction effort
- [Individual Profiles](/web/features/individuals/profiles/) -- How individuals are tracked in the catalog
