---
title: "Discovery"
description: "Scanning directories, what's detected, and supported file types"
sidebar:
  order: 1
---

In this guide you will learn:

- How discovery scans your directories to build a file inventory
- Which file types are classified and what metadata is extracted
- How folder structure analysis detects patterns in your naming conventions
- What happens during and after a scan

## What discovery does

Discovery scans one or more directories you select and builds a structured inventory of everything it finds. It classifies files by type, extracts metadata from images, and analyzes folder naming patterns to understand how your data is organized.

All of this happens locally. No data leaves your machine during discovery.

## Selecting directories to scan

You start by selecting one or more root directories through a folder picker. Common patterns include:

- A single top-level "Photos" folder with year, date, or location subfolders
- Multiple drives or external hard drives covering different years
- A mix of image folders and spreadsheet or document folders in different locations

Discovery scans all selected roots recursively. You can exclude specific subdirectories (such as "Processed," "Backup," or "Personal") before or during the scan by right-clicking any folder in the tree view.

<!-- screenshot: Root directory selection with folder picker and estimated file counts -->

## Supported file types

Every file found during scanning is classified into one of these categories:

| Category | Extensions | What is extracted |
|----------|-----------|-------------------|
| Image | `.jpg`, `.jpeg`, `.png`, `.tif`, `.tiff`, `.bmp` | EXIF/IPTC metadata, pixel dimensions, thumbnail |
| RAW Image | `.cr2`, `.nef`, `.arw`, `.dng`, `.orf`, `.rw2` | EXIF/IPTC metadata, pixel dimensions, thumbnail |
| Spreadsheet | `.xlsx`, `.xls`, `.csv`, `.tsv` | Column headers, row counts, cell samples |
| Document | `.docx`, `.doc`, `.pdf` | Text extraction (for ID catalogs, field notes) |
| Presentation | `.pptx`, `.ppt` | Slide text and embedded images (for visual catalogs) |
| Database | `.mdb`, `.accdb`, `.sqlite`, `.db` | Table schemas, row counts |
| Irrelevant | Everything else | Ignored |

:::tip
RAW image formats are fully supported because many researchers shoot in RAW. EXIF extraction works on RAW files using the same libraries as standard image formats.
:::

## Image metadata extraction

For every image file, discovery extracts the following metadata when available:

**EXIF data:**
- Date and time (DateTimeOriginal or DateTimeDigitized)
- GPS coordinates (latitude and longitude)
- Camera make and model
- Lens and focal length

**IPTC / XMP data:**
- Caption or description
- Keywords
- Creator (photographer name)
- Location and city

**Derived data:**
- Pixel dimensions (width and height)
- A small thumbnail for preview display

This metadata feeds directly into the [manifesting](/desktop/discovery/manifesting/) process, where it helps determine encounter dates, locations, and photographer attribution.

## Folder structure analysis

Beyond individual files, discovery analyzes folder names for encoded encounter information. Many organizations use structured naming conventions for their directories. Discovery detects patterns including:

- **Date patterns** -- ISO dates, US-format dates, year-month-day variants
- **GPS coordinate patterns** -- latitude and longitude embedded in folder names
- **Individual ID patterns** -- if you provide a pattern (such as `T###X` for Bigg's orcas or `J##` for Southern Residents), discovery matches them in folder names
- **Location name patterns** -- matched against a user-provided location list, or treated as free text
- **Photographer name patterns** -- names embedded in folder or subfolder names

For example, discovery recognizes structure in folders like:
```
/Photos/2024/2024-07-15_HaroStrait_JSmith/
/Surveys/Survey_2023-08-20_T002B_T036A/
/Data/NorthernResidents/2022/July/Trip3/
```

This analysis uses pattern matching and regex, not machine learning. Detected patterns are presented to you during [manifesting](/desktop/discovery/manifesting/) for confirmation.

## Spreadsheet and document scanning

For non-image files, discovery extracts enough structure to understand their contents:

- **Spreadsheets:** Column headers and a sample of rows (first 50 and last 50). Discovery looks for columns matching encounter fields: dates, locations, GPS coordinates, photographer names, individual IDs, and image file references.
- **Documents and presentations:** Text content is extracted and scanned for patterns suggesting ID catalogs, field notes, or sighting logs.
- **Databases:** Table schemas and sample rows are read, with the same column-matching logic as spreadsheets.

## During the scan

Discovery runs in the background and does not block the UI. While a scan is running, you see:

- A file count and current directory indicator
- A progress bar showing overall completion
- Live results populating as files are discovered -- you can browse images and spreadsheets before the scan finishes
- The option to exclude folders by right-clicking them in the tree view

<!-- screenshot: Discovery progress view with live file count and directory tree -->

:::note
For large collections (100,000+ images), discovery may take minutes to hours. You can pause and resume the scan at any time. Scan progress is saved locally, so closing the application does not lose work.
:::

## Scan results

When discovery completes, you see a summary including:

- Total files found, broken down by type
- Total image count and cumulative file size
- Date range of your data (from EXIF or folder dates)
- Detected folder naming patterns
- Candidate data sources -- spreadsheets or databases that appear to be sighting logs, ranked by likely usefulness

Scan results are stored locally in `~/.finwave/` and persist between sessions. You can rescan a directory at any time from the [Directory Management](/desktop/discovery/directory-management/) view.

## Related

- [Manifesting](/desktop/discovery/manifesting/) -- turn scan results into encounter mappings
- [Manifest Editing](/desktop/discovery/manifest-editing/) -- review and adjust the draft manifest
- [Directory Management](/desktop/discovery/directory-management/) -- add, pause, and rescan directories
- [What Is the Desktop Client?](/desktop/getting-started/what-is-it/) -- overview of the four-stage workflow
