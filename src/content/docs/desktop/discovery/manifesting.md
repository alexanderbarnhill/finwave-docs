---
title: "Manifesting"
description: "How manifests work and the iterative flow"
sidebar:
  order: 2
---

In this guide you will learn:

- What a manifest is and why it matters
- How the client maps your data structure to finwave encounters
- The four encounter grouping strategies
- How source priority determines where each field comes from
- The iterative propose-review-refine workflow

## What manifesting does

Manifesting takes the results of [discovery](/desktop/discovery/discovery/) and builds a **manifest** -- a versioned, declarative document that describes how to interpret your organization's data as finwave encounters. It answers questions like: "Which folder level is the encounter boundary?", "Where does the date come from -- EXIF, folder names, or a spreadsheet?", and "How are individual IDs encoded?"

The manifest is the bridge between your data structure and finwave's schema. Once approved, it drives both historical [onboarding](/desktop/onboarding/overview/) and ongoing [synchronization](/desktop/sync/how-sync-works/).

## finwave's encounter schema

An encounter in finwave requires:

- **Images** -- one or more image files
- **Date and time** -- when the sighting occurred
- **Location** -- coordinates and/or a place name (optional)
- **Photographer** -- who took the photos (optional)
- **Individuals** -- which animals were identified, using your organization's ID codes (optional)

Manifesting determines, for each potential encounter in your scanned data, where to find values for these fields -- or whether a field cannot be reliably extracted.

## Source priority

Each encounter field can come from multiple sources. The manifest records which source is authoritative for each field. The general priority order, from most to least reliable:

**Date and time:**
1. Spreadsheet or database sighting date column
2. EXIF DateTimeOriginal
3. Date pattern in folder name
4. Date pattern in file name
5. File modified date (least reliable)

**Location:**
1. Spreadsheet or database location column
2. EXIF GPS coordinates
3. IPTC location fields
4. Location pattern in folder name

**Photographer:**
1. Spreadsheet or database photographer column
2. IPTC Creator field
3. EXIF Artist field
4. Photographer pattern in folder name

**Individual IDs:**
1. Spreadsheet or database ID column
2. IPTC keywords (if IDs are stored as keywords)
3. ID pattern in folder name
4. ID pattern in file name

You can override these priorities during [manifest editing](/desktop/discovery/manifest-editing/).

## Encounter grouping strategies

The most challenging part of manifesting is determining which images belong to the same encounter. The client supports four strategies:

### Folder-based grouping

Each folder at a specified depth represents one encounter. You tell the client which folder level is the encounter boundary.

```
/Photos/2024/2024-07-15_HaroStrait/   <-- this folder = one encounter
  IMG_001.jpg
  IMG_002.jpg
  IMG_003.jpg
```

### Spreadsheet-referenced grouping

A spreadsheet contains one row per encounter, with a column referencing image filenames or a folder path. The client maps each row to its corresponding images.

### Time-proximity grouping

Images are grouped by EXIF timestamp within a configurable window (for example, all photos within two hours at the same GPS location form one encounter). This is the fallback when no folder or spreadsheet structure exists.

### Hybrid grouping

Folder structure defines the encounter boundary, but metadata (date, GPS) is cross-referenced for validation. If a folder contains images spanning three different days, the client flags it for your review.

## The manifesting workflow

Manifesting is an iterative, user-guided process with five stages:

**1. Analyze** -- The client examines scan results, detects folder naming patterns, identifies spreadsheet structures, and scores each data source by likely usefulness.

**2. Propose** -- A draft manifest is generated with best-guess mappings. You see a summary like: "We found 12,340 images across 847 folders. Based on your folder structure, each dated folder appears to be one encounter. We found a spreadsheet with columns that match encounter fields."

**3. Review** -- You examine sample encounters (10 to 20) with all mapped fields visible. Each field shows its value and which source it came from.

**4. Refine** -- You correct anything that is wrong. "The date should come from the folder name, not the spreadsheet." "Individual IDs are in the IPTC keywords field." Each correction creates a new manifest version.

**5. Validate** -- The approved manifest runs against the full dataset. You see a report: encounters created, images mapped, images unmapped, and any warnings (missing dates, duplicate assignments, date mismatches between sources).

:::note
Each time you make a correction, the manifest version increments and the preview updates. Old versions are retained so you can always revert. See [Manifest Editing](/desktop/discovery/manifest-editing/) for details on the editing interface.
:::

## Manifest storage

Manifests are stored locally in `~/.finwave/manifests/{population_id}/` as versioned JSON files. Every revision is kept, so you can roll back to any previous version. The approved manifest is also sent to the finwave backend (encrypted, associated with the population) for reference during onboarding and synchronization.

## ID parsing

If your data includes individual identification codes, the manifest records how to parse them:

- **Pattern** -- a regex for extracting IDs (for example, `[TGJ]\d{3}[A-Z]?` for Bigg's-style codes)
- **Separator** -- how multiple IDs are delimited in a single field (comma, semicolon, newline)
- **Source** -- where IDs come from (spreadsheet column, folder name, file name, or IPTC keywords)

## Related

- [Discovery](/desktop/discovery/discovery/) -- how scan results are generated
- [Manifest Editing](/desktop/discovery/manifest-editing/) -- review and adjust draft mappings
- [Directory Management](/desktop/discovery/directory-management/) -- re-manifest and version history
- [Onboarding](/desktop/onboarding/overview/) -- upload data using the approved manifest
