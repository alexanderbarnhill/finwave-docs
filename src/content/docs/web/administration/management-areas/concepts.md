---
title: "Concepts: layers, areas, sub-areas"
description: "How management areas are structured, how the assignment tie-breaker works, and what the per-layer toggles do."
sidebar:
  order: 1
quickRef:
  - "Layer = versioned zone set from one source. Has Active toggle (assigns) and Show on encounter map (renders) — independent"
  - "Area = one polygon in a layer. Codes unique per layer; same code in different layers = no conflict"
  - "Sub-area = an area whose parent is another area. Parent and child must be in the same layer; depth is unbounded"
  - "Geometry is WGS84 lon/lat. Polygon or MultiPolygon (split-by-water zones)"
  - "Assignment algorithm: per active layer, find all containing polygons, pick smallest km². 0 or 1 per layer"
  - "Polygon edits trigger area-scoped recompute. Layer-level edits trigger layer-scoped recompute. Recompute all sweeps everything"
  - "Recomputes run in background — appear in user's job menu. Old assignments aren't auto-updated row by row"
  - "Encounter detail map shows polygons for layers that are both Active AND Show on encounter map"
---

## Layers

A **layer** is a named, versioned collection of zones from one source. Think of layers as independent tracings on transparent sheets, stacked over your study area. The DFO sheet has its 600-odd subareas; the NOAA sheet has its stocks; your internal sheet has whatever zones you defined.

Each layer has:

- A **name** (`DFO Pacific Fisheries Management Areas 2024`) and an optional **source label** (`DFO`, `NOAA`, `Internal`, anything you want).
- A **color** that applies to every area in it by default — areas can override.
- Two independent toggles:
  - **Active** — when on, this layer participates in encounter assignment. Turning it off freezes assignments where they are; future encounters get nothing from this layer.
  - **Show on encounter map** — when on, this layer's polygons render on the per-encounter map (in the encounter sidebar). Independent from Active so you can keep a layer assigning silently in the background without cluttering per-encounter views.

Multiple layers can be active in the same population at once, and they're allowed to overlap. An encounter that falls inside polygons from three active layers ends up with three assignments, one per layer.

## Areas

An **area** is one polygon inside a layer. Each area has:

- A **Code** — a short stable identifier (e.g. `28`, `PFMA-19`, `INTERNAL-A`). Codes are unique per layer, so the same code can appear in two different layers without conflict.
- A **Name** — the human-readable label (`Subarea 28-1`, `Strait of Georgia North`).
- A **Geometry** — the polygon itself, in WGS84 (longitude/latitude). Areas can be a single Polygon or a MultiPolygon (for zones split by water etc.).
- A **Color** — overrides the layer default. Used both on the canvas and on the encounter map.
- **Active** — soft-deleting an area sets this to false; it stops contributing to assignment but stays in the database for history.

## Sub-areas (parent / child)

An area can point at another area as its **parent**, forming a tree. DFO publishes Subarea 28-1 as a child of Area 28; your internal zone might split into Region A, Region B, etc.

The hierarchy is **per-layer** — parents and children must live in the same layer. This keeps the model simple and the UI predictable.

Hierarchy depth is unbounded. In practice DFO uses one level (Area → Subarea); FinWave doesn't preclude deeper nesting if some scheme needs it.

## How assignment works

When an encounter is created or its location changes, FinWave runs this for every active layer in the population:

1. Take the encounter's GPS as a point in WGS84.
2. Find all active polygons in this layer whose geometry contains the point.
3. Pick the one with the **smallest area in km²** — this naturally surfaces the most-specific subarea when an encounter sits inside both a parent and a child.
4. Record one assignment row: `(encounter, layer, area)`.

So an encounter that falls inside `Area 28` *and* its `Subarea 28-1` ends up tagged with `28-1` (smaller). An encounter that falls inside `Area 28` only ends up tagged with `28`.

Each layer contributes 0 or 1 assignments — never more than one per layer. The encounter detail page surfaces all assignments simultaneously.

### Re-running assignment

When polygons change (you edit a vertex, add a new area, import a fresh layer), existing encounters' assignments aren't auto-updated row by row. Instead:

- **Per-area edits** trigger a recompute job scoped to that area — only encounters that *were* in it or *could now be* in it are re-evaluated.
- **Layer-level edits** (import, recompute layer button) trigger a layer-scoped recompute.
- The **Recompute all** button on the layers list does a population-wide sweep across every active layer.

Recompute jobs run in the background; their progress and results show up in the user's job menu.

## What encounters see

When you open an encounter detail page, the location map shows one polygon overlay per active+visible layer that the encounter falls inside, each in its layer's color. Below the map you'll see a small list:

```
Management area
DFO PFMA: 28-1 — Subarea 28-1
Internal Study: A — Region A
```

If a layer is active but its **Show on encounter map** toggle is off, it still tags the encounter behind the scenes — it just doesn't show up here.
