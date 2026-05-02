---
title: "Manifesting"
description: "How manifests work and the iterative flow"
sidebar:
  order: 2
quickRef:
  - "Manifest = versioned declarative mapping from your folder structure to finwave's encounter schema"
  - "Each encounter field is sourced from one of: EXIF, IPTC, folder name, file name, spreadsheet column"
  - "Default source priority — Date: EXIF DateTimeOriginal first; Location: EXIF GPS first; Photographer: IPTC Creator first; IDs: folder name first"
  - "Iterative flow: Generate (draft) → Review → Refine → Preview (≤20 sample encounters + coverage stats) → Approve"
  - "Each save bumps the manifest version. Old versions retained for revert"
  - "Approval locks rules and records username + timestamp. Doesn't trigger any uploads"
  - "ID parsing uses your population's identifier verifier — manifest editor compiles the regex and shows example IDs"
  - "Detected spreadsheet formats can pre-configure column mappings on generate"
---

In this guide you will learn:

- What a manifest is and why it matters
- How the client maps your data structure to finwave encounters
- How source priority determines where each field comes from
- The iterative propose-review-refine workflow

## What manifesting does

Manifesting takes the results of [discovery](/desktop/discovery/discovery/) and builds a **manifest** -- a versioned, declarative document that describes how to interpret your organization's data as finwave encounters. It answers questions like: "Where does the date come from -- EXIF, folder names, or a spreadsheet?", "How are individual IDs encoded?", and "Which folder level is the encounter boundary?"

The manifest is the bridge between your data structure and finwave's encounter schema.

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
1. EXIF DateTimeOriginal
2. Date pattern in folder name
3. Date pattern in file name

**Location:**
1. EXIF GPS coordinates
2. IPTC location fields
3. Location pattern in folder name

**GPS coordinates:**
1. EXIF GPS
2. Spreadsheet columns (latitude/longitude)

**Photographer:**
1. IPTC Creator field
2. EXIF Artist field
3. Photographer pattern in folder name

**Individual IDs:**
1. ID pattern in folder name
2. ID pattern in file name
3. IPTC keywords or caption

You can override these priorities in the [manifest editor](/desktop/discovery/manifest-editing/).

## Generating a manifest

After discovery completes, click **Generate Manifest** on the scan job detail page. If your organization has multiple populations, choose which population the manifest is for. The client uses the discovery results -- image metadata, spreadsheet analysis, and folder patterns -- to produce a draft manifest with best-guess field mappings.

If discovery detected a known spreadsheet format, the format's column mappings are applied automatically.

## The manifesting workflow

Manifesting is an iterative, user-guided process:

**1. Generate** -- A draft manifest is created from discovery results with initial field mappings.

**2. Review** -- Open the manifest in the [manifest editor](/desktop/discovery/manifest-editing/) to see how fields are mapped. Each field shows its source (EXIF, folder name, IPTC, spreadsheet) and the extraction rule.

**3. Refine** -- Adjust any mapping that is incorrect. Change the source for a field, update path patterns, select different spreadsheet columns, or modify ID extraction rules. Each change creates a new manifest version.

**4. Preview** -- Generate a preview to see up to 20 sample encounters with all mapped fields. Check field coverage statistics to verify the mappings work across your dataset.

**5. Approve** -- When the preview looks correct, approve the manifest. Approval locks the mapping rules and records your username and timestamp.

:::note
Each time you save changes, the manifest version increments. Old versions are retained so you can always view or revert to a previous version.
:::

## ID parsing

If your data includes individual identification codes, the manifest uses your population's identifier verifier configuration to parse them:

- **Pattern** -- a regex compiled from your population's ID verifier rules (for example, `[TGJ]\d{3}[A-Z]?` for Bigg's-style codes)
- **Source** -- where IDs come from (folder name, file name, or IPTC fields)

The manifest editor shows the compiled regex and example IDs so you can verify the pattern matches your data.

## Related

- [Discovery](/desktop/discovery/discovery/) -- how scan results are generated
- [Manifest Editing](/desktop/discovery/manifest-editing/) -- review and adjust draft mappings
- [Directory Management](/desktop/discovery/directory-management/) -- re-manifest and version history
