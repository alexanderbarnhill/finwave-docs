---
title: "Getting source data: GeoJSON files"
description: "What GeoJSON is, where to find it for DFO/NOAA/BC datasets, and what fields to look for when you open one."
sidebar:
  order: 2
quickRef:
  - "GeoJSON = JSON with shapes. finwave's import takes it directly — no shapefile conversion needed"
  - "DFO PFMAs source: BC Data Catalogue 'DFO Fisheries Management Sub Areas', download as GeoJSON"
  - "DFO mapping: Code = LABEL, Name = MANAGEMENT_AREA_NAME, Parent code = MANAGEMENT_AREA"
  - "DFO ships at subarea level (~480 real + ~100 buffer fragments). Importer auto-skips empty-label rows"
  - "Setting Parent code = MANAGEMENT_AREA on DFO import auto-synthesizes the ~42 parent areas by unioning children"
  - "NOAA: Fisheries Maps and GIS, Office for Coastal Management. Open Maps Canada for federal data"
  - "Convert shapefiles or KML/KMZ to GeoJSON with mapshaper.org — free, browser-based, no third-party upload"
  - "Coordinates must be WGS84 lon/lat. DFO ArcGIS REST: append &outSR=4326 or you'll get Web Mercator"
  - "Default property fallbacks: Code tries code/id/PFMA_NAME/AREA_NAME; Name tries name/NAME/AREA_NAME"
---

## What is GeoJSON?

**GeoJSON** is a plain-text format for describing geographic shapes — points, lines, polygons. It's just JSON with a known structure. Most fisheries and marine boundary datasets are published in either GeoJSON or shapefile format; you usually want GeoJSON because finwave's import dialog accepts it directly without conversion.

A minimal GeoJSON file looks like:

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[ -123.5, 49.0 ], [ -123.0, 49.0 ], [ -123.0, 49.5 ], [ -123.5, 49.5 ], [ -123.5, 49.0 ]]]
      },
      "properties": {
        "AREA": 28,
        "SUBAREA": 1,
        "NAME": "Subarea 28-1",
        "LABEL": "28-1"
      }
    }
  ]
}
```

Each `Feature` is one zone. Its `geometry` carries the polygon coordinates (as `[longitude, latitude]` pairs). Its `properties` carry everything else — codes, names, descriptions, parent IDs, anything the publisher decided was relevant.

## Where to find it

### DFO Pacific Fisheries Management Areas (Canada)

The authoritative source is the **BC Data Catalogue**:

- [DFO Fisheries Management Sub Areas](https://catalogue.data.gov.bc.ca/dataset/dfo-fisheries-management-sub-areas)

Click "Access / Download" → custom download → choose **GeoJSON** as the format. You'll get a zipped file containing `pfma.geojson`. Unzip and use that file with finwave's import dialog.

Property names you'll see in the DFO file:

| Property | Use it as |
|---|---|
| `LABEL` | Code (`28-1`, `102-3` — short, unique within the layer) |
| `MANAGEMENT_AREA_NAME` | Name (`Subarea 28-1`) |
| `MANAGEMENT_AREA` | Parent code (`28`, `102` — the integer that subareas roll up to) |
| `MANAGEMENT_SUBAREA` | The subarea number — usually combined with `MANAGEMENT_AREA` to form the LABEL |

Note: DFO ships the dataset at **subarea** granularity. There are ~480 real subareas plus ~100 unlabeled buffer/edge fragments (where `MANAGEMENT_AREA = 0` and `LABEL` is empty). The import dialog will skip the unlabeled rows automatically.

If you want **parent-area** polygons (the ~42 numbered areas like `28`, `121`, `142`), import the subarea file with **Parent code property** = `MANAGEMENT_AREA` — finwave will synthesize the parent polygons by unioning the children of each parent code. You then get a clean two-level hierarchy in one import.

### NOAA / US sources

- [NOAA Fisheries Maps and GIS](https://www.fisheries.noaa.gov/topic/maps) — stock assessment areas, EFH boundaries, etc.
- [NOAA Office for Coastal Management](https://coast.noaa.gov/digitalcoast/data/) — many marine boundary datasets in GeoJSON / shapefile.

### Other Canadian data

- [Open Maps Canada](https://open.canada.ca/data/en/dataset?q=&collection=fgp&_collection_limit=0) — federal datasets, many with GeoJSON downloads.
- DFO's [ArcGIS REST service](https://gisp.dfo-mpo.gc.ca/arcgis/rest/services) for direct API access if you're scripting imports.

### Internal data

If you've got polygons in a **shapefile** (`.shp`), convert to GeoJSON with [mapshaper](https://mapshaper.org/) — drop the `.shp`, `.dbf`, `.prj`, `.shx` files in, then export as GeoJSON. Free, browser-based, no upload to a third party.

If you've got polygons in a **KML / KMZ**, the same mapshaper tool handles those too.

If you have **just coordinates in a spreadsheet**, draw the polygons on the map directly using finwave's draw tool — see [Drawing & editing](../drawing/).

## What to look for when opening a file

Before importing, open the file in a text editor (or a JSON viewer) and skim the first feature. Ask:

- **What property holds a unique short code per zone?** That's your **Code property**. Good codes are short (under ~10 chars), use only letters/digits/dashes/underscores. Bad codes have spaces, slashes, or are missing entirely.
- **What property holds the human-readable name?** That's your **Name property**. Falls back to the Code if missing.
- **Is there a parent-pointer property?** A column that names another zone — like DFO's `MANAGEMENT_AREA` integer pointing at the parent of each subarea. If yes, you'll use that as your **Parent code property** during import to wire up the hierarchy in one shot.
- **Is the geometry in WGS84?** Every authoritative source publishes in WGS84 (the standard "lon/lat" projection). If you're not sure, the import dialog will reject features whose coordinates obviously aren't in `[-180, 180]` × `[-90, 90]` range.

If you're stuck identifying which property is which, just drop the file in the Import dialog without filling any property override — finwave's defaults try `code` / `id` / `PFMA_NAME` / `AREA_NAME` for the Code, and `name` / `NAME` / `AREA_NAME` for the Name. The result table will show what got picked; if it's wrong, set the override and retry.
