---
title: "Sub-graphs & Graph Links"
description: "Extract a selection into a separate graph and reference it from the parent"
sidebar:
  order: 6
---

## What you'll learn

- The difference between a *sub-graph*, a *graph link*, and a *visual group*
- How to extract a selection into a separate graph
- How to add a graph-link node that references an existing graph
- How to navigate between linked graphs

## Three things that look similar

It's worth being precise here, because three different mechanisms in the Catalog Builder produce visually similar results — a node that "contains" or "stands for" other nodes:

| Concept | What it actually is | Where it lives | When to use |
|---|---|---|---|
| **Visual group** (compound parent node) | A cytoscape compound node that wraps members of one matriline | One graph | Output of [Auto-Associate & Split](/web/workbench/catalog-builder/auto-associate-and-split/). Reorganises a single graph. |
| **Sub-graph** (a separate graph extracted from a selection) | A *separate* graph record in the API, with its own version, lock, and persistence | A new top-level graph in the population | When a subset is interesting enough to warrant its own canvas (e.g. a single matriline you want to view, style, and export independently). |
| **Graph-link node** | A placeholder node on graph A that *references* graph B by id | One graph | When you want a "see also: this other graph" handle on the canvas — clicking it navigates to the other graph. |

The **Group selection to new graph** action (described below) creates a sub-graph **and** drops a graph-link node into the parent graph in one step. Adding a graph link via the **Build** menu only does the second half (it references an *existing* graph, doesn't create a new one).

## Extracting a selection into a sub-graph

1. Select one or more nodes on the canvas (Shift-click or shift-drag for multi-select).
2. **Toolbar → Layout → Group selection to new graph.**
3. A dialog asks for a name (default: `Sub-graph (N)` or `Sub-graph • <identifier>` for a single-node selection).
4. On confirm:
   - finwave creates a **new graph record** in the population with the selected nodes and the edges that ran between them.
   - The new graph has its own id, version, and lock.
   - The selected nodes are **removed** from the current graph.
   - A **graph-link node** replacing them is added to the current graph at the centroid of the previous selection.
   - A snackbar appears with an *Open* action that navigates to the new graph.

If nothing is selected, the menu item shows a "Select one or more nodes first" toast and does nothing.

If the population context isn't set, the action is blocked.

:::caution[The selected nodes leave the parent graph]
Group-to-new-graph is destructive on the parent graph in the sense that the original nodes are removed and replaced by a single graph-link node. You can undo with `Ctrl/Cmd+Z`, which restores the nodes on the parent graph — but the new graph record that was created via the API is not deleted by undo. If you want to fully reverse the action, also delete the newly-created graph from the **Graph** menu.
:::

### Edges between extracted nodes

Edges where **both** endpoints are in the selection travel into the sub-graph along with the nodes.

Edges where **only one** endpoint is in the selection are dropped from the parent graph (they have no remaining target). If preserving cross-cutting relationships matters, draw them again on the parent graph after the split, pointing at the new graph-link node.

## Adding a graph-link node to an existing graph

If you already have two graphs in the population and want to add a "see also" handle from one to the other:

1. **Toolbar → Build → Add graph link.**
2. A dialog lists every other graph in the population (the current graph is filtered out). Search by name. Select one.
3. A graph-link node is added to the active canvas referencing that graph by id and name.

If the population has only one graph, the action shows "No other graphs to link to" and does nothing.

## How a graph-link node behaves

A graph-link node looks like a normal node but:

- Its rendered class is **`graph-link`** rather than the standard node style.
- Right-clicking it shows **Open sub-graph** as an extra context-menu item.
- Selecting it in edge-draw mode and connecting it to another node creates an edge into the link itself — a useful pattern for "this matriline is associated with these other individuals."

The link is by **graph id**, not by name. If the linked graph is renamed later, the link still works (the displayed name on the link node may need a refresh).

If the linked graph is **deleted**, the graph-link node remains as a dead pointer until you remove it manually.

## Navigating between linked graphs

To follow a graph-link node:

- **Right-click → Open sub-graph**, or
- (Some flows expose a click-to-open on the link node itself — check the canvas behaviour for your version.)

When you open a linked graph, finwave loads it through the standard graph-load path — releasing the lock on the previous graph, acquiring a lock on the new one, and showing read-only mode if it's already locked elsewhere.

## Related

- [Working with Graphs (in *Getting Around*)](/web/workbench/catalog-builder/getting-around/#switching-between-graphs) — how to switch graphs without going through a graph-link node.
- [Auto-Associate & Split](/web/workbench/catalog-builder/auto-associate-and-split/) — the visual-group alternative when you don't want separate graph records.
- [Saving, Locks & Collaboration](/web/workbench/catalog-builder/saving-and-locks/) — what happens to the lock when you switch graphs.
