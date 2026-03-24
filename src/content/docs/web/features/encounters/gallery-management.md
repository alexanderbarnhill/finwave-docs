---
title: "Gallery Management"
description: "Select, delete, find duplicates, and set sides for images in bulk"
sidebar:
  order: 4
---

## What you'll learn

- How to enter gallery edit mode and select images
- How to delete images in bulk with confirmation
- How to detect and remove duplicate images
- How to assign fin sides to multiple images at once

## Gallery edit mode

When you have permission to edit an encounter, you can enter **gallery edit mode** to manage the encounter's images in bulk. From the encounter page, open the **actions panel** and click **Edit Gallery**.

In edit mode, each image gains a selection checkbox in its top-left corner. A toolbar appears above the gallery with all available actions. Click **Done** when you are finished to exit edit mode and return to normal viewing.

<!-- screenshot: Gallery in edit mode showing checkboxes on image thumbnails and the toolbar above -->

## Selecting images

Click any image or its checkbox to select it. Selected images show a highlighted border to confirm your selection.

Use the **Select All** button in the toolbar to select every image in the encounter at once, or **Deselect All** to clear the selection. The toolbar displays a running count of how many images are currently selected.

:::tip
You can combine individual clicks with Select All. For example, Select All and then deselect the few images you want to keep is faster than individually selecting the many images you want to remove.
:::

## Deleting images

With one or more images selected, click **Delete Selected** in the toolbar. A confirmation dialog appears showing:

- Thumbnail previews of the images you are about to delete (up to 12, with a "+N more" indicator for larger selections)
- A count of how many confirmed annotations will be permanently lost
- **Cancel** and **Delete** buttons

:::caution
Deleting images is permanent. Any confirmed annotations on those images are also permanently removed. This action cannot be undone.
:::

The annotation warning is important for research integrity -- if an image has confirmed identifications, deleting it removes those records from your population's sighting history.

## Finding duplicates

Click **Find Duplicates** in the toolbar to scan for duplicate images within the encounter. The system uses two detection methods:

1. **Hash matching** -- compares the SHA-256 file hash of each image. Identical files are always detected, regardless of filename.
2. **Metadata matching** -- groups images with the same filename, dimensions, and creation date. This catches re-encoded duplicates that have different file hashes but are visually identical.

When duplicates are found, the gallery enters **duplicate review mode**. Duplicate groups are visually highlighted, and the system pre-selects one copy from each group for removal (keeping the other). You can override the pre-selection by clicking to change which copy to keep.

<!-- screenshot: Duplicate review mode showing two groups of duplicates with one image in each group pre-selected for removal -->

Click **Remove Duplicates** to delete the selected copies, or **Done** to cancel and exit without changes.

:::note
Duplicate detection compares images within a single encounter only. It does not scan across encounters.
:::

## Setting fin sides

Select one or more images, then click **Set Side** to assign a fin side (left, right, or unknown) to all selected images at once. This is useful when importing a batch of images that were all photographed from the same angle.

Side assignment affects how annotations on those images are categorized, which matters for analyses that distinguish left-side and right-side catalogs.

## Who can use this

Gallery edit mode requires **encounter edit permission** for the encounter. Typically this means you are either a population administrator, the encounter's submitter, or a member with the appropriate role. Authentication alone is not sufficient -- you must have explicit edit access.

## Related

- [Editing Encounters](/web/features/encounters/editing/) -- modifying encounter details and metadata
- [Browsing Encounters](/web/features/encounters/browsing/) -- finding encounters to manage
- [Annotations](/web/core-concepts/annotations/) -- understanding what annotations are attached to images
