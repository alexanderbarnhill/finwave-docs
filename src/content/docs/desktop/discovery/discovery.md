---
title: "Discovery"
description: "Scanning directories, what's detected, and supported file types"
sidebar:
  order: 1
quickRef:
  - "Two phases: scan job (file inventory + classification) → discovery (deeper extraction)"
  - "All local — no data leaves your machine during scan or discovery"
  - "File classification: Image (jpg/png/tif), RAW Image (cr2/nef/arw/dng), Spreadsheet (xlsx/csv), Document (docx/pdf), Data (sqlite/mdb), Other"
  - "RAW formats fully supported — same EXIF extraction as standard images"
  - "Discovery extracts: image EXIF/IPTC, spreadsheet column headers + sample rows + candidate columns, folder pattern detection"
  - "Pattern detection finds: dates (ISO/US/year-month), locations, individual IDs (matched against population's verifier), photographer names"
  - "Each detected pattern carries a confidence score so you can judge reliability"
  - "Format detection banner appears for known spreadsheet formats — accept to pre-configure manifest, dismiss if wrong"
  - "Large collections (100K+ images) can take minutes-to-hours — progress bar shows current phase + file"
---

In this guide you will learn:

- How discovery scans your directories to build a file inventory
- Which file types are classified and what metadata is extracted
- How folder structure analysis detects patterns in your naming conventions
- What happens during and after a scan

## What discovery does

Discovery is a two-phase process. First, a **scan job** walks one or more directories you select and builds a file tree, classifying every file by type and counting totals. Then, a **discovery phase** digs deeper -- extracting EXIF metadata from images, analyzing spreadsheet structures, and detecting folder naming patterns.

All of this happens locally. No data leaves your machine during discovery.

## Creating a scan job

![Scan jobs list (empty state) — once you create a scan job from this page or the sidebar, runs appear here with their progress bar, completion status, and links to the resulting manifest.](/screenshots/desktop/desktop/05-scan-jobs-empty.png)

You create a scan job from the workspace or the sidebar. You select one or more root directories through a folder picker and optionally filter by file type. Common patterns include:

- A single top-level "Photos" folder with year, date, or location subfolders
- Multiple drives or external hard drives covering different years
- A mix of image folders and spreadsheet or document folders in different locations

The scan runs in the background and does not block the UI. While running, you see a progress bar and live file count.

## Supported file types

Every file found during scanning is classified into one of these categories:

| Category | Extensions | What is extracted |
|----------|-----------|-------------------|
| Image | `.jpg`, `.jpeg`, `.png`, `.tif`, `.tiff`, `.bmp` | EXIF/IPTC metadata, pixel dimensions |
| RAW Image | `.cr2`, `.nef`, `.arw`, `.dng`, `.orf`, `.rw2` | EXIF/IPTC metadata, pixel dimensions |
| Spreadsheet | `.xlsx`, `.xls`, `.csv`, `.tsv` | Column headers, row counts, sample rows, candidate columns |
| Document | `.docx`, `.doc`, `.pdf` | Text extraction (for ID catalogs, field notes) |
| Data | `.mdb`, `.accdb`, `.sqlite`, `.db` | Table schemas, row counts |
| Other | Everything else | Counted but not processed further |

:::tip
RAW image formats are fully supported because many researchers shoot in RAW. EXIF extraction works on RAW files using the same libraries as standard image formats.
:::

## Scan results: the file tree

When the scan completes, you see a summary card with the total file count, total size, and a breakdown by category. You can click any category card to filter the results.

Below the summary, the **file tree** shows every file and directory found during the scan. You can expand and collapse directories, filter by category, and use Expand All / Collapse All buttons to navigate large trees. Each directory shows its file count and total size.

## Running discovery

After a scan completes, click **Run Discovery** to start the deeper analysis phase. Discovery processes the scan results in two passes:

**Image metadata extraction** -- For every image file, discovery extracts:

- **EXIF data:** Date and time (DateTimeOriginal or DateTimeDigitized), GPS coordinates, camera make and model, lens and focal length
- **IPTC / XMP data:** Caption, keywords, creator (photographer name), location

**Spreadsheet analysis** -- For each spreadsheet, discovery extracts:

- Column headers and sheet names
- Sample rows (for previewing content)
- **Candidate columns** -- columns that likely contain encounter-relevant data (dates, GPS coordinates, individual IDs, photographer names). These are highlighted in the UI to help you understand which spreadsheets are useful.

**Folder pattern detection** -- Discovery analyzes folder names for encoded encounter information:

- **Date patterns** -- ISO dates, US-format dates, year-month-day variants
- **Location patterns** -- place names or GPS coordinates in folder names
- **Individual ID patterns** -- matched against your population's identifier format
- **Photographer patterns** -- names embedded in folder or subfolder names

Each detected pattern shows a confidence score so you can judge its reliability.

## Discovery results

After discovery completes, three summary cards appear:

- **Images** -- Total images, how many have GPS, how many have DateTime, date range of your data, and camera models used. Click to expand a detailed metadata table with filtering (All / Has GPS / No GPS).
- **Spreadsheets** -- Total spreadsheet count. Click to expand details showing column headers, sample rows, candidate columns, and any extraction errors.
- **Folder Patterns** -- Total patterns detected, grouped by type (date, location, individual, photographer). Click to expand the full pattern list with confidence scores and matched folder paths.

:::note
For large collections (100,000+ images), discovery may take minutes to hours depending on how many images need EXIF extraction. You can monitor progress through the progress bar, which shows the current phase, count, and the file being processed.
:::

## Format detection

If discovery finds spreadsheets that match a known data format (for example, a specific research organization's standard sighting log structure), a **format detection banner** appears. You can accept a detected format to pre-configure your manifest with the correct column mappings, or dismiss it if the detection is wrong.

## Generating a manifest

Once discovery is complete, click **Generate Manifest** to create a draft manifest from the discovery results. If your organization has multiple populations, you choose which population the manifest is for. The manifest is created as a draft that you can then review and refine in the [manifest editor](/desktop/discovery/manifest-editing/).

## Related

- [Manifesting](/desktop/discovery/manifesting/) -- turn discovery results into encounter mappings
- [Manifest Editing](/desktop/discovery/manifest-editing/) -- review and adjust the draft manifest
- [Directory Management](/desktop/discovery/directory-management/) -- add, pause, and rescan directories
- [What Is the Desktop Client?](/desktop/getting-started/what-is-it/) -- overview of the staged workflow
