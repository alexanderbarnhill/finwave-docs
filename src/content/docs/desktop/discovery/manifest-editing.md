---
title: "Manifest Editing"
description: "Adjusting rules, previewing, and approving manifests"
sidebar:
  order: 3
---

In this guide you will learn:

- How to read the manifest preview and sample encounters
- What confidence indicators mean and how to act on them
- How to change field sources, regex patterns, and grouping strategy
- How versioning works and how to approve a manifest

## The manifest preview

The manifest preview is the core of the editing experience. After the client generates a draft manifest, you see a preview showing how your data would map to finwave encounters. This preview updates in real time as you make changes.

<!-- screenshot: Manifest preview showing sample encounters with mapped fields -->

The preview displays:

- **Sample encounters** -- 10 to 20 encounters shown as cards or table rows with all mapped fields visible
- **Source indicators** -- each field value shows where it came from (for example, "2024-07-15 -- from folder name" or "Haro Strait -- from spreadsheet column D")
- **Confidence indicators** -- color-coded signals for each field showing extraction reliability
- **Unmapped items** -- images or spreadsheet rows that did not map to any encounter
- **Field source summary** -- aggregate statistics showing the breakdown of sources across all encounters

## Confidence indicators

Each mapped field displays a confidence indicator:

| Color | Meaning | Action |
|-------|---------|--------|
| Green | Exact match from structured data (spreadsheet cell, EXIF field) | No action needed |
| Yellow | Pattern-matched from a folder name or file name | Verify a few samples to confirm the pattern is correct |
| Red | Missing or ambiguous -- the field could not be reliably extracted | Provide a different source or accept that this field will be empty |

:::tip
Focus your review on yellow and red indicators. Green fields are extracted from structured sources and are almost always correct. Yellow fields depend on pattern matching, which works well but benefits from a quick spot-check. Red fields need your input to resolve.
:::

<!-- screenshot: Close-up of encounter card showing green/yellow/red confidence indicators with source labels -->

## Editing field sources

You can change the source for any encounter field. For each field (date, location, photographer, individuals), you choose:

- **Which source to use** -- EXIF, IPTC, folder name, file name, spreadsheet column, database table, or manual entry
- **Which specific data point** -- for example, which spreadsheet column or which regex pattern to apply
- **A fallback source** -- if the primary source is empty for a given encounter, the client tries the fallback

<!-- screenshot: Field source editor showing dropdown for date source selection -->

## Editing regex patterns

When a field is extracted from folder names or file names using pattern matching, you can adjust the regex pattern. The client shows:

- The current pattern and what it matches
- A sample of folder names with highlighted matches
- Unmatched folder names so you can see what the pattern misses

For individual ID parsing, you set:

- **The ID pattern** -- a regex that matches your organization's ID codes (for example, `[TGJ]\d{3}[A-Z]?` for codes like T002B)
- **The separator** -- how multiple IDs are delimited in a single value (comma, semicolon, newline)

:::caution
Changes to regex patterns affect all encounters that rely on pattern-matched fields. Review the updated preview carefully after modifying a pattern, paying attention to encounters that previously matched correctly.
:::

## Changing the grouping strategy

You can switch between the four encounter grouping strategies:

- **Folder-based** -- set which folder depth represents the encounter boundary
- **Spreadsheet-referenced** -- select the spreadsheet and map its columns to encounter fields
- **Time-proximity** -- configure the time window (in minutes) and GPS proximity radius (in kilometers) for grouping
- **Hybrid** -- use folder boundaries with metadata cross-referencing for validation

When you change the grouping strategy, the preview regenerates to show how encounters would be formed under the new strategy. Compare the encounter count and mapping quality before committing.

## Versioning

Every edit you make creates a new manifest version. The client saves all previous versions automatically, so you never lose work.

- **Version numbers** increment sequentially (v1, v2, v3, and so on)
- **All versions are retained** in `~/.finwave/manifests/{population_id}/`
- **Reverting** to an older version creates a new version with the old version's rules, preserving the full audit trail

You can view the complete version history from the [Directory Management](/desktop/discovery/directory-management/) view.

## Unmapped items

The preview includes an unmapped section showing images not assigned to any encounter and spreadsheet rows referencing files the scan did not find. Review these to determine whether you need to adjust the grouping strategy, add a directory, or accept that some items are not relevant.

## Approving the manifest

When you are satisfied with the mapping, click **Approve** to finalize the manifest. Approval records your username and the timestamp. The approved manifest is then used for:

- [Onboarding](/desktop/onboarding/overview/) -- uploading historical data to finwave
- [Synchronization](/desktop/sync/how-sync-works/) -- interpreting new files detected in watched directories

:::note
Approving a manifest does not trigger any uploads. It only finalizes the mapping rules. You initiate onboarding or synchronization separately.
:::

## Validation report

After approval, the client runs the manifest against the full dataset and produces a validation report:

- Total encounters the manifest would create
- Total images mapped to encounters
- Images that remain unmapped
- Warnings: encounters with no date, encounters with no images, duplicate image assignments, date mismatches between sources

Review the validation report before proceeding to onboarding.

## Related

- [Manifesting](/desktop/discovery/manifesting/) -- how manifests are generated and the iterative workflow
- [Discovery](/desktop/discovery/discovery/) -- how scan results feed into manifesting
- [Directory Management](/desktop/discovery/directory-management/) -- version history, rescanning, and re-manifesting
- [Onboarding](/desktop/onboarding/overview/) -- using the approved manifest to upload data
