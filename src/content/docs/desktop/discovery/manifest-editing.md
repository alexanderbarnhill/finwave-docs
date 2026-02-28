---
title: "Manifest Editing"
description: "Adjusting rules, previewing, and approving manifests"
sidebar:
  order: 3
---

In this guide you will learn:

- How the manifest editor is structured
- How to configure field sources for each encounter property
- How path patterns and ID verifier integration work
- How to preview, approve, and version manifests

## The manifest editor

The manifest editor is where you define how your data maps to finwave encounters. Each manifest is linked to a scan job and a population, and consists of field mapping rules that tell the client where to find each encounter property -- dates, locations, photographer names, and individual IDs.

The editor has two main areas: the **field configuration panel** on the left, and the **preview panel** on the right.

## Field sources

For each encounter property, you choose a **source** that tells the client where to extract the value from. The available sources vary by field.

### Date and time

| Source | How it works |
|--------|-------------|
| EXIF | Uses DateTimeOriginal or DateTimeDigitized from image EXIF data |
| Folder name | Extracts a date from the folder name using a path pattern and date format |
| File name | Extracts a date from the image file name using a path pattern and date format |

When using folder or file name sources, you also select a **date format** to tell the client how to parse the extracted string. Supported formats include `YYYY-MM-DD`, `YYYYMMDD`, `DD-MM-YYYY`, `MM-DD-YYYY`, and variants with underscores or dots as separators.

### Location

| Source | How it works |
|--------|-------------|
| EXIF | Uses GPS coordinates from image EXIF data |
| Folder name | Extracts a location name from the folder path using a path pattern |
| IPTC | Uses the Location or City field from IPTC metadata |

### GPS coordinates

| Source | How it works |
|--------|-------------|
| EXIF | Uses GPS latitude and longitude from image EXIF data |
| Spreadsheet | Maps latitude and longitude from spreadsheet columns you select |

When using the spreadsheet source, you choose which columns contain the latitude and longitude values from the columns detected during discovery.

### Photographer

| Source | How it works |
|--------|-------------|
| IPTC | Uses the Creator or Caption field from IPTC metadata |
| EXIF | Uses the Artist field from EXIF data |
| Folder name | Extracts a photographer name from the folder path using a path pattern |

### Individuals

| Source | How it works |
|--------|-------------|
| Folder name | Extracts individual IDs from folder names using a path pattern |
| File name | Extracts individual IDs from file names using a path pattern |
| IPTC | Extracts IDs from the Caption or Keywords IPTC fields |

## Path patterns

When a field source is set to "folder name" or "file name," you define a **path pattern** that tells the client which part of the path contains the relevant data. Path patterns use a segment-based syntax to match directory levels and extract values.

For example, if your folders are structured as `/Photos/2024/2024-07-15_HaroStrait/`, you would define a pattern that extracts the date from the third segment.

The editor shows sample paths from your scan results so you can see what the pattern matches.

## ID verifier integration

If your population has an identifier verifier configured (defining the format of individual ID codes like `T002B` or `J047`), the manifest editor automatically loads it and compiles a regex pattern. This pattern is used to extract and validate individual IDs from whatever source you choose (folder names, file names, or IPTC data).

The editor shows the compiled regex and example IDs that the pattern would match.

## Previewing the manifest

Click **Preview** to generate a sample of up to 20 encounters using your current field mappings. The preview shows:

- **Sample encounters** with all mapped fields visible
- **Field coverage statistics** -- what percentage of encounters have a value for each field
- How each field was extracted (which source provided the value)

Review the preview to verify your mappings are producing correct results before approving.

## Versioning

Manifests support versioning. Each time you save changes, a new version is created. You can view all versions of a manifest for a given scan job, and each version shows its status (draft or approved).

The sidebar shows the active manifest version for each scan job, along with the encounter count badge if a preview has been generated.

## Approving the manifest

When you are satisfied with the mapping, click **Approve** to finalize the manifest. Approval records your username and a timestamp. You can revert an approved manifest back to draft if you need to make further changes.

:::note
Approving a manifest does not trigger any uploads. It only finalizes the mapping rules. Upload functionality will be available when [onboarding](/desktop/onboarding/overview/) ships.
:::

## Related

- [Manifesting](/desktop/discovery/manifesting/) -- how manifests are generated and the iterative workflow
- [Discovery](/desktop/discovery/discovery/) -- how scan results feed into manifesting
- [Directory Management](/desktop/discovery/directory-management/) -- version history, rescanning, and re-manifesting
