---
title: "Adding & Editing Individuals"
description: "Add individuals to the canvas, edit their fields, mark deceased, and lock positions"
sidebar:
  order: 3
---

## What you'll learn

- How to add individuals to the graph from the population's catalogue
- Every field you can edit on a node and what it stores
- How to mark an individual as deceased
- How to lock a node's position so layout commands skip it
- How to delete a node

## Adding individuals

There are three ways to add an individual to the active graph:

- Toolbar: **Build → Add individual**.
- Right-click the empty canvas: **Add individual**.
- A dedicated *Add individual* event from the canvas (e.g. when a layout has space for one) is also wired to the same picker.

All three open the **animal picker dialog**.

### The animal picker

The picker lists every individual in the population, sorted by identifier. For each one, you see:

- The **identifier**.
- A sex symbol — **♂** for male, **♀** for female (no symbol for unknown).
- The **year of birth**, if recorded.
- A **deceased** badge if applicable.
- A subtle **(on graph)** badge if the individual is already on the active graph — that row's checkbox is disabled to prevent duplicates.

A **search box** at the top filters by identifier, nickname, or alternate IDs (debounced as you type).

A **summary line** at the bottom shows how many rows are currently visible and how many are already on the graph (e.g. *"23 shown, 4 already on graph"*).

A **Select All Visible** button selects everything that *can* be selected in the current filter (i.e. excluding rows that are already on the graph).

Click **Add** to confirm. Selected individuals are placed on the canvas in a tidy grid, each with a unique internal ID, and you can immediately drag them into position.

:::tip
You don't have to add the whole catalogue at once. The graph is meant to grow over time — start with the individuals you know best and build outward.
:::

## Editing an individual: the inspector

Select a node and the right panel's **Inspector** tab populates. The form shows:

| Field | What it does |
|---|---|
| **ID** *(read-only)* | The internal canvas-local id assigned to this node when it was added. Useful as a stable handle if you copy node IDs from the context menu. |
| **Identifier** *(required)* | The catalog identifier shown on the node label (e.g. `T049A2`). This is the primary text users will see. |
| **Sex** | `Female`, `Male`, or `Unknown` (the default). Drives the small ♀/♂ symbol the picker shows and may drive styling. |
| **Birth year** | An integer between 1900 and the current year. Optional. |
| **Alternate IDs** | A chip grid — each chip is one alternate identifier. Press `Enter`, `,`, or `Space` to commit a new chip; click a chip to edit it; click the × to remove. The find overlay searches these. |
| **Note** | Free-text scratch space, multi-line. |

Press **Apply** to commit; **Cancel** discards your edits. Nothing is committed until Apply.

Internally, finwave keeps a **node registry** alongside each graph that stores the catalog fields above (identifier, sex, year of birth, alt IDs, note, deceased flag) keyed by node id, separately from the per-graph **node instance** that stores position, lock state, and any graph-specific classes. Saves persist the subset of the registry referenced by the graph being saved.

## Marking deceased

Two equivalent paths:

- **Right-click the node → Toggle deceased**.
- (No inspector field — deceased is a class, toggled directly.)

Deceased nodes get a separate visual style — *Deceased fill*, *Deceased border*, and *Deceased opacity* sliders in the right panel's **Styles** tab let you tune that style for the whole graph.

`D` is a keyboard shortcut for **Focus deceased**: it zooms to deceased nodes if any exist, or fits all nodes otherwise.

:::note
Deceased nodes are not deleted. They're still part of the catalogue and the graph — they just render differently and can be filtered out by certain operations. [Auto-Associate & Split](/web/workbench/catalog-builder/auto-associate-and-split/), for example, drops deceased individuals from the resulting matrilines *unless* they have living descendants.
:::

## Locking a position

Once you've arranged a node where you want it, you can pin it so layout commands (Organise A–Z, Organise circle, Auto-Associate & Split) leave it alone:

- **Right-click the node → Lock position** (the same menu item turns into *Unlock position* once locked).
- The `lock` icon overlays a locked node.
- You can still select and drag a locked node manually — locking only prevents *automatic* layout from moving it.

## Deleting a node

Select the node and press `Delete`. Selected edges are deleted at the same time. The action is undoable with `Ctrl/Cmd+Z`.

Multi-selection: hold `Shift` and click additional nodes/edges, or shift-drag for a rectangle (standard cytoscape selection).

## What happens to the underlying animal record

When you press **Apply** on a node form, in addition to updating the graph, finwave pushes the edited fields back to the underlying animal record in the population's catalogue — but only if the node is linked to a database animal record (which is the case for any individual added via the picker; manually-created or imported nodes without a backing record are skipped).

The fields synced back to the animal record are:

- `identifier`
- `sex` (skipped if you set it to *Unknown*)
- `dateOfBirth` (constructed as January 1 of the chosen birth year, if any)
- `notes`
- `alternateIds`

This sync is fire-and-forget — a failure logs a warning to the browser console but does not interrupt your editing.

In other words: the Catalog Builder is not just a graph viewer. The Inspector form is one of the surfaces that edits the canonical [Individual profile](/web/core-concepts/individuals/) record for the catalogue.
