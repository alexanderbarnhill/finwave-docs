---
title: "Styling, Layout & Export"
description: "Style controls for the canvas, layout commands, search, and PNG/SVG export"
sidebar:
  order: 8
quickRef:
  - "Styles tab: per-graph canvas, node, deceased-variant, and edge controls. All changes save with the graph"
  - "Edge curve: Straight / Bezier / Bundled Bezier (last bundles parallel edges between same pair)"
  - "Edge colours by type: Mother (mother/father-of), Sibling (sibling/mate-of), Assoc (association/often-seen-with)"
  - "Deceased nodes auto-render with a † dagger prefix and tunable fill/border/opacity"
  - "Apply to all graphs button copies styles population-wide. Reset returns to finwave defaults"
  - "Three layouts: Organise A–Z (grid), Organise circle, Auto-Associate matriline hierarchy. Locked nodes are skipped"
  - "View actions don't move nodes: Fit all (O), Fit largest (L), Focus deceased (D)"
  - "Find on canvas: Ctrl/Cmd+F or /. Searches identifier, label, AND alternate IDs"
  - "Export: PNG or SVG, each with transparent-bg variant. PNG renders at 2× scale; full graph not just viewport"
  - "Background colour from the Styles tab is what non-transparent exports use"
---

## What you'll learn

- Every control in the **Styles** tab and what it does
- How to apply one graph's styles to every other graph in the population
- The available auto-layouts and what each one does
- How to export a graph as PNG or SVG, with or without a background

## The Styles tab

Open the right panel (`tune` icon in the toolbar) and switch to **Styles** for per-graph appearance controls. Every change takes effect immediately on the canvas. Changes are saved with the graph's metadata.

### Canvas

- **Background** — colour picker for the canvas background. Used as the default background for non-transparent exports.

### Node styles

Sliders, with the ranges shown:

| Control | Range | Notes |
|---|---|---|
| **Width** | 100–360 px (step 10) | The node's drawn width. |
| **Height** | 48–200 px (step 8) | The node's drawn height. |
| **Font size** | 8–24 px (step 1) | Label font size. |
| **Border width** | 0–6 px (step 0.5) | Set 0 to hide the border. |
| **Text max width** | 80–320 px (step 10) | Text wraps once it exceeds this width. |

Plus three colour pickers:

- **Fill** — node background colour.
- **Border** — node border colour.
- **Text** — label colour.

### Deceased variant

Separate controls for nodes flagged as deceased:

- **Deceased fill** — colour picker.
- **Deceased border** — colour picker.
- **Deceased opacity** — 0–1 slider (step 0.05).

Deceased nodes also get a **dagger marker** (`†`) prepended to their label automatically.

### Edge styles

| Control | Options |
|---|---|
| **Edge curve** | *Straight*, *Bezier*, or *Bundled Bezier* (cytoscape `unbundled-bezier`, which bundles parallel edges between the same pair) |
| **Edge width** | 1–6 px slider (step 0.5) |
| **Mother colour** | Colour picker — applied to `mother-of` and `father-of` edges |
| **Sibling colour** | Colour picker — applied to `sibling-of` and `mate-of` edges |
| **Assoc colour** | Colour picker — applied to `association` and `often-seen-with` edges |

### Style actions

Two buttons at the bottom of the panel:

- **Apply to all graphs** — copies the current style block to every graph in the population. Useful when you've found a colour scheme that should be the population standard.
- **Reset** — returns to finwave's defaults (which differ slightly between dark and light theme).

## Default styles

For reference, finwave's defaults are roughly:

- **Dark theme**: dark slate canvas (`#262626`), white nodes with slate borders, subdued grey edges.
- **Light theme**: white canvas, dark slate nodes, similar grey edges.

The full default values are defined in the `defaultGraphStyles` function in the catalog-builder library and applied automatically to new graphs.

## Layouts

Three auto-layouts are available from **Toolbar → Layout** or the canvas right-click menu:

| Layout | What it does |
|---|---|
| **Organise A–Z** | Grid layout sorted by identifier. Useful for a clean reference view. |
| **Organise circle** | Circular layout — every node placed evenly around a circle. |
| Output of [Auto-Associate & Split](/web/workbench/catalog-builder/auto-associate-and-split/) | Per-matriline hierarchical layout, top-down by parentage. |

Plus three "view" actions that don't move nodes — they only change zoom and pan:

- **Fit all** (`O`) — frame every node on the canvas.
- **Fit largest** (`L`) — frame only the largest connected component (handy on graphs with disconnected fragments).
- **Focus deceased** (`D`) — zoom to deceased nodes, or fit all if no deceased nodes exist.

### Locking nodes against layout

A layout will move every node *unless* it is locked. Lock a node from its right-click context menu (**Lock position**). Locked nodes also display a `lock` icon and stay where you put them.

## Find on canvas

Press `Ctrl/Cmd+F` or `/` to open the **Find** overlay above the canvas. The matching set updates as you type (debounced) and the canvas zooms to fit the matches. Search is matched against:

- **Identifier** (the catalog identifier).
- **Display label** (the rendered node text — same as identifier for most nodes).
- **Alternate IDs** stored on the node.

`Esc` or the close button dismisses the overlay.

## Export

**Toolbar → Export** offers four options:

| Item | Format | Background |
|---|---|---|
| Export PNG | PNG | Canvas background colour (from styles) |
| Export SVG | SVG | Canvas background colour |
| Export PNG (transparent bg) | PNG | Transparent |
| Export SVG (transparent bg) | SVG | Transparent |

All four export the **full** graph (not just the visible viewport). PNG exports render at 2× scale for sharpness. The downloaded file is named after the graph.

:::tip[Choosing a format]
- **PNG** — best for slides, posters, print. Cleaner edges at large sizes thanks to the 2× rendering, but pixel-based.
- **SVG** — best for figures in publications you'll continue to edit (Adobe Illustrator, Inkscape). Vector-based; scales without loss.
- **Transparent variants** — use when you'll composite the graph onto a non-white background or another design.
:::

## Related

- [Profile Images](/web/workbench/catalog-builder/profile-images/) — image rendering interacts with node geometry.
- [Auto-Associate & Split](/web/workbench/catalog-builder/auto-associate-and-split/) — the third layout, by matriline.
- [Keyboard Shortcuts](/web/workbench/catalog-builder/keyboard-shortcuts/) — every shortcut listed in one place.
