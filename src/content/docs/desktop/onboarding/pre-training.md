---
title: "Pre-Training"
description: "Optional ID model pre-training and training data extraction"
sidebar:
  order: 2
---

## What you'll learn

- What pre-training is and when to use it
- How the desktop client extracts training crops from your images
- How the three-tier detection system classifies training data quality
- How to review the training data quality report
- How to upload training data to start model training

## What is pre-training?

Pre-training is an optional step you can run before onboarding. If you have a collection of labeled historical images -- photos where you already know which individual animal is in each image -- you can use pre-training to build an identification model for your population before uploading your full dataset.

This means that when your encounters are onboarded, the ML pipeline already has a trained ID model ready to suggest identifications, rather than starting from scratch.

:::tip
Pre-training is most valuable when you have a substantial back-catalog of labeled images (hundreds or more). If you are starting a new population with no historical data, skip this step and let the ID model train naturally as you confirm annotations in the web app.
:::

## How training data extraction works

The desktop client uses a local YOLOv8 object detection model to find features of interest (dorsal fins, eye patches, or other markers) in your labeled images. This detection runs entirely on your machine using ONNX Runtime on CPU -- no GPU is required, and no images are sent to the server during this step.

For each image, the detector produces zero or more bounding box detections. The client then crops each detection from the original image and pairs it with the individual ID label you provided. These cropped images become the training data that will later be uploaded to finwave's training pipeline.

Crops are stored locally at `~/.finwave/populations/{population-id}/training-data/`.

## The tier system

Not every image produces a clean, unambiguous training sample. The desktop client classifies each image into one of three tiers based on how many detections were found and how confident the detector is:

### Tier 1 -- Clean pairs

A single detection is found in the image. Since only one feature of interest is present, it maps directly to the labeled individual ID. These are high-confidence training samples.

### Tier 2 -- Prominent detection

Multiple detections are found, but one is clearly dominant. The client scores each detection using a combination of bounding box area, proximity to image center, and model confidence. If the top-scoring detection exceeds the prominence threshold (default: 0.7), it is selected as the training sample. The remaining detections are discarded.

### Tier 3 -- Ambiguous

Multiple detections are found with no clearly dominant one, or no detection meets the prominence threshold. These images are skipped entirely and do not contribute to training data.

:::note
Tier 3 images are not wasted. They will still be uploaded during onboarding and processed by the ML pipeline on the server, where human reviewers can manually annotate them.
:::

## The training data quality report

After extraction completes, the desktop client shows a quality report summarizing your training data:

<!-- screenshot: Training data quality report showing tier breakdown -->

- **Tier breakdown** -- How many images fell into each tier, shown as counts and percentages
- **Unique individuals** -- The number of distinct individual IDs in your training set
- **Samples per individual** -- A distribution showing how many training crops each individual has, highlighting individuals with very few samples

Review this report before uploading. A healthy training set has most images in Tier 1 or Tier 2, covers many unique individuals, and has at least several samples per individual.

:::caution
If the majority of your images land in Tier 3, your images may contain multiple animals per frame or the detection model may not be well-suited to your species. Consider reviewing your image selection or contacting support.
:::

## Uploading training data

Once you are satisfied with the quality report, you upload the training data to finwave. The server queues a model training job for your population. Training runs on finwave's infrastructure, and you will receive a notification when the model is deployed and ready.

After the model is deployed, any encounters you onboard will benefit from ID predictions immediately.

## Related

- [Onboarding Overview](/desktop/onboarding/overview/) -- The full upload pipeline and onboarding state
- [Upload Process](/desktop/onboarding/upload-process/) -- Progress tracking and error handling during onboarding
- [Identification Metrics](/web/ml-center/identification-metrics/) -- How to evaluate your ID model's performance after deployment
