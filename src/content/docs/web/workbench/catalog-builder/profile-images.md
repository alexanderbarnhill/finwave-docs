---
title: "Profile Images"
description: "Load and clear profile images on graph nodes; how side and category filters work"
sidebar:
  order: 7
---

## What you'll learn

- How profile images get attached to nodes
- The side/category filters and the fallback option
- How the image preference is saved per-graph and auto-restored
- How nodes resolve to animals in the population catalogue

## Loading profile images

**Toolbar → Build → Load profile images…** opens the **Load Profile Images** dialog.

The dialog has three controls:

| Control | Options | Effect |
|---|---|---|
| **Side** | Any · Left · Right · Front · Back · Other | Restricts to images annotated with that body side. *Any* means no filter. |
| **Category** | Any · Dorsal Fin · Eye Patch · Body · Fluke · Other | Restricts to images annotated with that body part. *Any* means no filter. |
| **Show any available if preferred not found** | Checkbox (on by default) | If a node has no image matching the side/category filter, fall back to any image at all. |

Click **Load** to fetch and apply.

### How nodes get matched to animals

For each node on the active graph, finwave resolves it to an animal in the population catalogue:

1. If the node was added via the picker, it already has an explicit `animalId` and that's used directly.
2. Otherwise, finwave looks up the population animals and matches by **identifier** (case-insensitive).
3. If the node has neither — or it's a [graph-link node](/web/workbench/catalog-builder/sub-graphs-and-graph-links/#how-a-graph-link-node-behaves) — it's skipped.

Nodes that can't be resolved to any animal are silently skipped (you'll see them in the snackbar's "without photos" count).

### What happens during load

1. finwave queries the population's animals and builds an identifier → animalId map.
2. For every node it can resolve, it requests images filtered by your selected side and category.
3. **First pass**: only images matching both filters are considered. The first matching image per animal wins.
4. **Fallback pass** (if enabled and at least one filter was set): for animals that didn't get a match in the first pass, finwave queries again with no filters and fills in the gaps.
5. The resulting image URLs are applied as background images on each node, with the image cropped to fit (`background-fit: cover`). Nodes without an image get a placeholder icon.

A snackbar reports how many individuals got images (and how many didn't). Typical messages:

- *"Loaded images for 14 individual(s)"*
- *"Loaded images for 12 individual(s) (2 without photos)"*
- *"No images found for 19 individual(s)"*
- *"No animals found on graph"* — none of the nodes could be resolved to an animal.
- *"No population context"* — the builder isn't bound to a population.

## The saved image preference

When you load images, the side / category / fallback choices are saved to the **graph's styles** as an `imagePreference`:

```
{ enabled: true, side: 'left', category: 'dorsal-fin', fallback: true }
```

This means:

- Re-opening the graph **automatically re-loads images** with the same preference. You don't have to re-trigger Load each session.
- Each graph has its own preference. A different graph in the same population can use a completely different side/category combo.
- Loading images marks the graph dirty, so the preference saves with the next autosave/manual save.

## Clearing images

**Toolbar → Build → Clear images** removes all background images from nodes on the active graph and clears the saved preference. The graph is marked dirty so the cleared preference persists.

This only affects the current graph — images on other graphs are unaffected.

## Where the images come from

The images are pulled from finwave's **animal image search**, which is the same backend the rest of the app uses. Any image attached to an animal in the population catalogue (typically from confirmed [annotations](/web/core-concepts/annotations/) in encounters) is eligible.

This means:

- Newly-confirmed annotations on an individual become available to the Catalog Builder automatically.
- If an individual has no confirmed annotations yet, the Catalog Builder won't find an image for them — even with the fallback option.
- The image search respects whatever filtering finwave applies to the calling user (visibility, organisation, license).

## Display details

- Images render as a **cover-fit background** on the node. The node's width and height are determined by the styles tab; the image is cropped to fit, not letterboxed.
- The node label still renders on top of the image. Adjust **Text colour** in the styles tab if the default is hard to read against your image set.
- If you change node geometry (width / height) in the styles tab after loading images, you may want to clear and reload to recompute the crop framing.

## Related

- [Adding & Editing Individuals](/web/workbench/catalog-builder/adding-individuals/) — node geometry, deceased styling.
- [Styling, Layout & Export](/web/workbench/catalog-builder/styling-and-export/) — node width/height and text styling.
- [Annotations](/web/core-concepts/annotations/) — how images get associated with individuals in the first place.
