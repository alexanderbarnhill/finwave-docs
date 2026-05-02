---
title: "Troubleshooting"
description: "Common issues with management areas and how to fix them."
sidebar:
  order: 5
quickRef:
  - "Code rejected: empty, whitespace-only, or contains chars outside [A-Z0-9-_]. Often DFO buffer fragments — safe to ignore"
  - "Geometry type error: feature is Point or Line. Filter source data; mapshaper.org can drop non-polygon features"
  - "Self-intersecting geometry: open in QGIS or mapshaper, run 'fix geometry' / 'snap to grid' / 'buffer 0', re-export"
  - "Encounter not auto-tagged: check for real GPS (lat=0,lon=0 = no GPS), Active layers, encounter inside a polygon, recompute job finished"
  - "Polygon in wrong place: source file is non-WGS84. Export from mapshaper as WGS84; for DFO ArcGIS REST append &outSR=4326"
  - "Recompute timeouts on huge populations: reaper resets stale jobs after 30 min; subdivide via per-area recomputes"
  - "Code-already-exists during import: tick Overwrite by code to replace, or delete the existing area first"
  - "Polygon not on encounter map but tagged: layer is Active but Show on encounter map is off — turn that on"
  - "Coordinate sanity check rejects polygons spanning >5° lon/lat. Raise via Max area span setting if intentional"
---

## "Code must be 1-32 chars matching `[A-Z0-9-_]`"

The most common import error. The feature's code resolved to either:

- An empty/whitespace-only string. Often the source data has buffer or edge fragments without labels (DFO ships ~100 of these alongside its real subareas). They're safe to ignore — they're just polygon padding, not actual zones.
- A string with characters outside the allowed set (spaces, slashes, asterisks, accents).

The import error includes the original property value so you can see exactly what was rejected. Either fix the source data or use a different **Code property** that has cleaner values.

## "Geometry must be Polygon or MultiPolygon"

The feature has a Point or Line geometry. The Import dialog only accepts polygon-shaped features. Filter your source data or open it in [mapshaper](https://mapshaper.org/) to drop non-polygon features.

## "Geometry is invalid (self-intersecting or malformed)"

The polygon has a topology issue — usually a vertex chain that crosses itself. Open the file in QGIS or mapshaper, run a "fix geometry" / "snap to grid" / "buffer 0" operation, then re-export and re-import.

## A new encounter wasn't auto-tagged

Check, in order:

1. Does the encounter have GPS? Encounters with `lat=0, lon=0` are treated as "no GPS" and aren't tagged. Open the encounter's location dialog and confirm it has real coordinates.
2. Does the population have any **Active** layers? On the layers list page, the Active toggle on each layer controls whether it contributes to assignment.
3. Does the encounter's GPS actually fall inside any polygon? Open the encounter detail page — the location map shows polygons for active+visible layers. If your encounter sits outside everything, that's expected behaviour.
4. If you just imported or edited a layer, the **recompute job** runs in the background. Check your job menu — assignments appear after the job finishes, not instantly.

## A polygon shows up but in the wrong place

Most likely the source file is in a non-WGS84 projection. Authoritative public datasets use WGS84 by default; if you're working with custom data, run it through mapshaper and explicitly export as WGS84.

If you're working with the DFO ArcGIS REST API, **append `&outSR=4326` to your query URL** to force WGS84. Without it you'll get Web Mercator, which the import treats as out-of-range coordinates.

## Recompute job failed

Open the job from your job menu and look at the error. Common causes:

- **"relation does not exist"** — the database hasn't been migrated to the latest schema. Apply migrations.
- **"could not be translated"** — usually fixed in a backend release; pull latest and redeploy.
- **Connection timeouts** — recomputes time out if a population has hundreds of thousands of encounters. The reaper resets stale jobs every 30 minutes; if you keep hitting this, subdivide by triggering per-area recomputes from individual rows instead of population-wide.

## "Layer X already has an area with code Y"

Codes are unique per layer. Either pick a different code or delete the existing area first.

If you got this during import, it means a previous import (or manual creation) already added that code. Tick **Overwrite by code** in the Import dialog to replace existing areas, or delete the layer and start fresh.

## Polygons don't render on the encounter map

Each layer has two independent toggles: **Active** (participate in assignment) and **Show on encounter map** (render on the per-encounter map overlay). A layer can be active but invisible on encounter maps — useful when you want assignment-driven analytics but don't want the encounter detail page cluttered.

If your polygon isn't showing up on a specific encounter:

1. Confirm the layer's **Show on encounter map** is on.
2. Confirm the encounter has GPS and that the GPS falls inside the polygon.
3. Confirm the layer's **Active** is on (and was on at the time the encounter was last created/updated). If the layer was inactive when the encounter was saved and is now active, run a **Recompute layer** to re-tag.

## I want to start over with a layer

Two options:

- **Refresh in place** — re-import with **Overwrite by code** ticked. Existing areas with the same codes get replaced; new codes get added. Codes that don't appear in the new file are left alone (still in the layer).
- **Delete and recreate** — from the layer's row in the layers list, `⋮` → Delete layer. This cascades through every area in the layer plus their assignments. Then create a fresh layer and import.

Hard delete on a layer is irreversible. The button confirmation tells you the area count and that assignments will be cleared — read it before clicking through.

## Import dialog rejects features that look fine

Two things to check:

- **Coordinate range**: longitude must be in `[-180, 180]`, latitude in `[-90, 90]`. Way more often than not, this means a wrong projection (see "wrong place" above) — Web Mercator coordinates are in the millions of meters, not degrees.
- **Bounding-box span**: by default the importer rejects polygons spanning more than 5° of longitude or latitude (a sanity check against accidentally importing the entire ocean as one zone). Bulk imports bypass this; if you're hitting it on a single-feature manual import, raise the **Max area span (degrees)** in the population's settings.
