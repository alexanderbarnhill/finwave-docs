---
title: "Getting Around"
description: "Tour the toolbar, the canvas, and the graph switcher"
sidebar:
  order: 2
---

## What you'll learn

- What every menu, button, and indicator in the toolbar does
- How the graph name, save status, and lock status are surfaced
- How to switch between graphs in the same population
- How to find a node anywhere on the canvas
- How the right panel's Inspector and Styles tabs work

## The toolbar

The toolbar is split into two rows: a **status row** (graph name, undo/redo, save, lock) and a **menu row** (Build, Layout, Associations, Graph, plus quick actions on the right).

### Status row

- **Graph name** — click to rename (only available once the graph has been saved at least once). An "(unsaved)" tag appears next to the name until the first save. A small `edit` icon next to the name reminds you it's clickable.
- **Undo** (`Ctrl/Cmd+Z`) and **Redo** (`Ctrl/Cmd+Shift+Z`) — the toolbar icons are equivalent to the keyboard shortcuts.
- **Save** (`Ctrl/Cmd+S`) — manual save. Disabled in read-only mode.
- **Save state indicator** — a cloud icon to the right of Save:
  - `cloud_done` (saved) — all changes are saved.
  - `cloud_queue` (pending) — unsaved changes; autosave will run shortly.
  - `cloud_off` (error) — last save failed; tooltip describes why.
  - `sync_problem` (conflict) — version conflict, the graph was modified elsewhere; refresh.
- **Lock indicator** — appears once the graph has been saved:
  - `lock_open` (you have the lock) — you can edit.
  - `lock` (someone else has the lock) — clicking it asks the server to take the lock from them. The graph is read-only until you do.
- **Read-only badge** — visible when you don't hold the lock.
- A small **spinner** appears whenever a save is in flight.

See [Saving, Locks & Collaboration](/web/workbench/catalog-builder/saving-and-locks/) for the full lock model.

### Menu row

| Menu | Items |
|---|---|
| **Build** | *Add individual* · *Add graph link* · *Load profile images…* · *Clear images* · *Connect nodes* (`E`) · *Start edge from selection* (`Shift+E`) · *Cancel edge* (`Esc`) |
| **Layout** | *Organise A–Z* · *Organise circle* · *Fit all* · *Fit largest* (`L`) · *Focus deceased* (`D`) · *Group selection to new graph* |
| **Associations** | *Auto-associate & split* |
| **Graph** | *New graph* · *Clone graph* · *Delete graph* |

The right side of the menu row holds quick actions:

- **Switch graph** (`Ctrl/Cmd+K`) — opens the [graph quick-switcher](#switching-between-graphs).
- **Category** (label icon) — assign or remove a category for the current graph, or create a new one inline.
- **Export** — PNG / SVG, each with a transparent-background variant. See [Styling, Layout & Export](/web/workbench/catalog-builder/styling-and-export/).
- **Zoom out** (`-`), **Zoom in** (`+`), **Fit all** (`O`).
- **Toggle right panel** — show/hide the Inspector & Styles sidenav.

When you enter edge-draw mode, an **Edge Drawing Mode** sub-bar appears underneath the menu row with a *Start from selection* button, an `Esc to cancel` hint, and a Cancel button. See [Relationships & Edges](/web/workbench/catalog-builder/relationships/).

## The canvas

The canvas is a cytoscape graph that fills the main area. Standard interactions:

- **Click** a node or edge to select it (the right panel's Inspector tab populates).
- **Click-and-drag** a node to move it.
- **Click-and-drag** the empty canvas to pan.
- **Scroll** to zoom.
- **Right-click** an empty area for the canvas context menu.
- **Right-click** a node for the node context menu.

### Canvas context menu (right-click empty area)

- *Add individual* — opens the picker.
- *Enter / Exit edge draw* — toggles edge-draw mode.
- *Organise A → Z* — grid layout sorted by identifier.
- *Organise circle* — circular layout.
- *Fit overview* — frame all nodes.
- *Fit largest component* — frame only the largest connected component.
- *Clear selection*.
- *Export PNG* / *Export SVG*.

### Node context menu (right-click a node)

- *Copy node ID* — the internal node id (the canvas-local identifier).
- *Copy identifier* — the catalog identifier you see on the node label.
- *Zoom to node*.
- *Start edge from here* — begins drawing an edge with this node as the source.
- *Lock position* / *Unlock position* — pins the node so layout commands won't move it.
- *Toggle deceased* — flips the deceased flag (see [Adding & Editing Individuals](/web/workbench/catalog-builder/adding-individuals/)).
- *Open sub-graph* — visible only on **graph-link** nodes; navigates to the linked graph.

## Switching between graphs

A population can have many graphs. There are two ways to switch:

- **Graph quick-switcher** (`Ctrl/Cmd+K`, or the `swap_horiz` icon in the toolbar) — opens a search dialog that lists every graph in the population, filterable by graph name *or* by node identifier (so you can find "the graph that contains T049"). The active graph is highlighted; node counts are shown on each row. Click a result to switch.
- **Graph menu → New graph / Clone graph / Delete graph** — for graph lifecycle, not switching.

If the current graph has unsaved changes, the persistence layer runs an autosave before switching.

## Finding a node on the canvas

Press `Ctrl/Cmd+F` or `/` to open the **Find** overlay. Type any of the following, and matching nodes are highlighted live (the search box debounces by ~120 ms):

- Identifier (e.g. `T049A2`)
- Display label (e.g. a nickname, if you've stored one as the identifier)
- Any **alternate ID** stored on the node

The canvas zooms to the matched nodes. Press `Esc` or click the close button to exit.

## The right panel: Inspector and Styles

The right panel is a tabbed sidenav. Press the toolbar's `tune` / `chevron_right` icon, or `Esc` while the panel has focus, to toggle it.

### Inspector tab

Shows controls for the **currently selected** item:

- **Nothing selected** — a hint: *"Select a node or edge to edit its details."*
- **Node selected** — see [Adding & Editing Individuals](/web/workbench/catalog-builder/adding-individuals/#editing-an-individual-the-inspector).
- **Edge selected** — see [Relationships & Edges](/web/workbench/catalog-builder/relationships/#editing-an-edge).

Both forms have **Cancel** and **Apply** buttons. Changes are not committed until you press Apply.

### Styles tab

Per-graph appearance controls (canvas background, node geometry, deceased styling, edge curve and colours). See [Styling, Layout & Export](/web/workbench/catalog-builder/styling-and-export/) for the full list.

There's an **Apply to all graphs** button that copies the current style block to every graph in the population, and a **Reset** button that returns to finwave defaults.
