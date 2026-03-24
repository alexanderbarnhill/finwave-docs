---
title: "Submissions"
description: "Track your submissions and understand their processing status"
sidebar:
  order: 5
---

## What you'll learn

- How to find and track your submitted encounters
- What each processing status means
- How to handle upload failures and incomplete submissions

## My Submissions

After you submit an encounter, you can track its status from the **My Submissions** view. This view shows all encounters you have submitted to the current population, sorted by most recent first.

Each submission card shows the encounter date, location, image count, and current processing status.

## Processing stages

After submission, each encounter passes through several stages. The status icons on the encounter overview and your submissions view reflect which stage the encounter is in.

### Upload complete

All images have been received by the server. If some images failed to upload during submission, the encounter still exists but with fewer images than intended. You can add missing images later from the [encounter edit page](/web/features/encounters/editing/).

### Analysis in progress

The ML pipeline is actively processing your images. This typically involves three phases running sequentially:

1. **Detection** -- scanning images for identifiable features
2. **Classification** -- determining body side for each detection
3. **Identification** -- comparing detections against known individuals

Processing time depends on the number of images and current system load. A typical encounter with 10--50 images completes within a few minutes.

### Analysis complete

All images have been processed by the ML pipeline. You can now review the results in the [annotator](/web/features/annotator/overview/) -- confirming correct predictions, correcting errors, and adding any identifications the model missed.

## Handling failures

### Image upload failures

If one or more images fail to upload during submission, the progress card offers two options:

- **Retry Failed** -- attempts to upload the failed files again. Network interruptions or temporary server issues are often resolved by retrying.
- **Skip & Continue** -- proceeds without the failed files. The encounter is finalized with whatever images were successfully uploaded. You can add the missing images later.

### Encounter save failure

If the encounter itself fails to save (e.g., due to a network error or plan limit), no images are uploaded and you remain on the submission form with your data intact. The error message explains what went wrong. Common causes include:

- **Network error** -- check your connection and try again
- **Plan limit reached** -- your population has reached its maximum number of encounters. Contact your administrator about upgrading the plan.

## Viewing a submitted encounter

Click any submission to open the full encounter detail page. From there you can:

- Review ML results in the annotator
- Edit encounter metadata (if you have permission)
- Manage the image gallery (delete, find duplicates, set sides)
- View and add comments

## Related

- [Creating Encounters](/web/features/encounters/creating/) -- the submission form and what each field means
- [Browsing Encounters](/web/features/encounters/browsing/) -- finding encounters across the population
- [Annotator Overview](/web/features/annotator/overview/) -- reviewing ML predictions on your submission
- [Editing Encounters](/web/features/encounters/editing/) -- modifying encounter details after submission
