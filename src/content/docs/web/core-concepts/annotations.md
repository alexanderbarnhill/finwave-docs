---
title: "Annotations"
description: "What annotations are, ML vs human annotations, and the annotator"
sidebar:
  order: 5
quickRef:
  - "What it is: a labeled bounding box on an encounter image — links a feature (usually a dorsal fin) to an individual"
  - "Records location (box), category (e.g. dorsal fin), side (L/R/F/B), individual if identified, confidence"
  - "Two sources: machine (ML pipeline, has confidence score) or human (created or confirmed in the annotator)"
  - "Only confirmed annotations contribute to discovery curves, composition, capture history, etc."
  - "Same encounter can hold annotations of multiple individuals; same individual appears across many encounters — many-to-many"
  - "Workflow: encounter submitted → ML creates machine annotations → expert reviews/corrects/adds in annotator → confirmed records flow into population analyses"
---

## What you'll learn

- What an annotation is and what it represents
- The difference between machine and human annotations
- How annotations connect encounters to individuals
- What the confirmation workflow looks like

## What is an annotation?

An annotation is a labeled region on an encounter image that identifies a specific feature of an individual animal -- typically a dorsal fin. Annotations are the link between raw photographs (encounters) and the population catalog (individuals).

Each annotation records:

- **Location** -- a bounding box on the image
- **Category** -- what kind of feature it is (e.g., dorsal fin)
- **Side** -- which side of the animal is visible (left, right, front, back)
- **Individual** -- which individual from the catalog this feature belongs to (if identified)
- **Confidence** -- how certain the identification is

## Machine vs human annotations

Annotations come from two sources:

**Machine annotations** are created by finwave's ML pipeline when an encounter is processed. The models detect features in images, classify their side, and suggest individual identifications. Machine annotations have a confidence score between 0 and 1 representing the model's certainty.

**Human annotations** are created or confirmed by users in the annotator. When a human confirms a machine annotation, it becomes a confirmed annotation. Humans can also create annotations manually for features the model missed.

:::note
Only confirmed annotations (those verified by a human) are used in population analyses like discovery curves, composition breakdowns, and capture history exports. Unconfirmed machine annotations are treated as suggestions until reviewed.
:::

## The confirmation workflow

The typical workflow is:

1. An encounter is submitted and the ML pipeline creates machine annotations
2. An expert or professional opens the encounter in the annotator
3. They review each machine annotation -- confirming correct ones, correcting wrong ones, and adding any the model missed
4. Confirmed annotations become part of the population's sighting record

This human-in-the-loop approach combines the speed of ML processing with the accuracy of expert review.

## How annotations connect encounters to individuals

When an annotation is confirmed with an individual identity, it creates a sighting record: "Individual X was observed in Encounter Y." This is the fundamental data relationship in finwave.

Multiple annotations in the same encounter can link to different individuals (multiple animals in one sighting event). The same individual can be annotated across many encounters over time. This many-to-many relationship between encounters and individuals, mediated by annotations, is what enables population-level analyses.

## Related

- [Annotator Overview](/web/features/annotator/overview/) -- how to use the annotation tool
- [Confirming Annotations](/web/features/annotator/confirming/) -- reviewing ML predictions
- [Encounters](/web/core-concepts/encounters/) -- the images that contain annotations
- [Individuals](/web/core-concepts/individuals/) -- the catalog entries that annotations link to
