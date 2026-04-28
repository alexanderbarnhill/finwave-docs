---
title: "Relationships & Edges"
description: "Three ways to draw edges, the relationship-type reference, and how to edit existing edges"
sidebar:
  order: 4
---

## What you'll learn

- The three concrete paths for creating an edge between individuals
- Every supported relationship type and what it means
- The difference between *fixed* and *soft* relationship types
- How directed vs undirected edges render
- How to edit or delete an existing edge

## Three ways to create an edge

### 1. Edge-draw mode (drag from one node to another)

Switch the canvas into **edge-draw mode** and click-and-drag from one node to another to create an edge between them. Three equivalent entry points:

- **Toolbar → Build → Connect nodes**.
- **Right-click empty canvas → Enter edge draw**.
- Press **`E`**.

While in edge-draw mode, the toolbar shows a yellow **Edge Drawing Mode** sub-bar with a *Cancel* button and an `Esc to cancel` hint. Each successful click-drag creates a new edge.

To leave edge-draw mode, press `Esc`, click *Cancel* in the sub-bar, or right-click the canvas and choose *Exit edge draw*.

### 2. Start from a selected node

If you've already selected a node and want to draw an edge from it without first switching modes:

- **Right-click the node → Start edge from here**, or
- Press **`Shift+E`** with the node selected, or
- **Toolbar → Build → Start edge from selection**.

Your cursor is now bound to the node as the source of an edge — click any other node to complete it.

### 3. Auto-Associate & Split (bulk)

If your population uses systematic identifiers (like `T049` → `T049A` → `T049A2`), you can let finwave infer mother-of and sibling-of edges from the identifier patterns and split the result into per-matriline graphs in one step. See the dedicated page: [Auto-Associate & Split](/web/workbench/catalog-builder/auto-associate-and-split/).

:::caution[If "Auto-Associate & Split" is the only association control you can find]
The hand-drawing controls live in the **Build** menu and the **right-click context menu** — not in a top-level "Associations" toolbar button. The *Associations* menu contains only the Auto-Associate & Split bulk action. If your only visible association control is Auto-Associate & Split, open the Build menu or right-click the canvas to surface the per-edge drawing options described above.
:::

## What gets stored when you draw an edge

When you create an edge by drawing it, finwave initially classifies it as an **`association`** edge. You can then change the type from the Inspector — the relationship-type dropdown in the right panel offers all six supported types. Edges of any type can carry a free-text **note**.

## Relationship types

There are six supported relationship types, in two categories.

### Fixed types (stored in the edge registry)

| Type | Display label | Directed? | Default colour |
|---|---|---|---|
| `mother-of` | Mother of | **Directed** (mother → calf) | "Mother" colour from styles (default `#64748b`) |
| `father-of` | Father of | **Directed** (father → calf) | "Mother" colour |
| `sibling-of` | Sibling | Undirected | "Sibling" colour (default `#94a3b8`) |
| `mate-of` | Mate | Undirected | "Sibling" colour |

These four types are *fixed* — they are stored in the persistent edge registry alongside their endpoints, type, note, and timestamps. They survive serialization and are the basis for cross-graph reasoning (e.g. matriline grouping).

### Soft types (inline / local)

| Type | Display label | Directed? | Default colour |
|---|---|---|---|
| `association` | Association | Undirected | "Assoc" colour (default `#94a3b8`) |
| `often-seen-with` | Often seen with | Undirected | "Assoc" colour |

These types are *soft* — they live as inline edges on the graph. They're the right choice when you want to record that two animals are seen together without making a structural claim about kinship.

### Picking a type

A useful default mapping when you're starting out:

- Recording a known **family link** → `mother-of` or `father-of` (directed) or `sibling-of` (undirected).
- Recording **pair-bond / breeding pair** observations → `mate-of`.
- Recording **co-occurrence above chance** without a kin claim → `association`.
- Recording **frequent co-sighting** as opposed to a one-off pairing → `often-seen-with`.

When in doubt, use `association` — it's the catch-all and it's also what unrecognised relationship strings normalise to on import.

## Editing an edge

Click an edge to select it. The right panel's **Inspector** tab shows the **edge form**:

| Field | What it does |
|---|---|
| **ID** *(read-only)* | The edge's stable id — useful as a handle. |
| **Relationship type** | Dropdown of all six types listed above. Changing this re-types the edge and re-styles it accordingly. |
| **Note** | Free-text scratch space, multi-line. |

Press **Apply** to commit; **Cancel** to discard.

## Multiple edges between the same pair

You can define **more than one edge** between the same pair of individuals if the relationship is multifaceted. For example, `sibling-of` and `often-seen-with` between the same two animals are both valid.

## Deleting an edge

Select the edge and press `Delete`. Undoable with `Ctrl/Cmd+Z`.

## How edges render

Visual styling for edges is controlled by the **Styles** tab in the right panel:

- **Edge curve**: *Straight*, *Bezier*, or *Bundled Bezier* (cytoscape `unbundled-bezier` — bundles parallel edges).
- **Edge width** in pixels.
- Three colour pickers: **Mother**, **Sibling**, **Assoc** — applied by relationship type.

Directed edges (`mother-of`, `father-of`) render with an arrowhead pointing from source to target. Undirected edges have no arrowhead.

The relationship-type label is also rendered on the edge so you can read the graph at a glance.

## Related

- [Adding & Editing Individuals](/web/workbench/catalog-builder/adding-individuals/) — the other half of every edge.
- [Auto-Associate & Split](/web/workbench/catalog-builder/auto-associate-and-split/) — bulk-create mother and sibling edges from identifier patterns.
- [Styling, Layout & Export](/web/workbench/catalog-builder/styling-and-export/) — full styling reference.
