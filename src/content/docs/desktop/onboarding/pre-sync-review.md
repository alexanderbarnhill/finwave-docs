---
title: "Pre-Sync Review"
description: "Review, approve, and configure encounters before uploading to finwave"
sidebar:
  order: 3
quickRef:
  - "Shows materialized encounters from an approved manifest — concrete records ready to review"
  - "Required fields: date, location name, GPS coords, resolved photographer, license"
  - "Statuses: Pending (review-ready), Approved (will sync), Denied (excluded), Incomplete (missing data)"
  - "Incomplete encounters show specific reason ('missing GPS', 'photographer not resolved') — fix in manifest editor or inline"
  - "Three license options: Public, Public + Attribution, Private within Organization"
  - "Approve All requires all pending encounters to have a license — assign in bulk first"
  - "Inline editing for date/location/GPS/photographer/notes; known individuals edited as chips (Enter/comma to add, × to remove). Fixing missing data auto-promotes Incomplete to Pending"
  - "Banner appears at the top if any source files have been moved/renamed/deleted since the last discovery scan — sync will skip those files until you re-run discovery"
  - "Photographer-to-org auto-apply: if a photographer is in an org, their encounters can auto-assign to it"
  - "Filter by All / Pending / Approved / Denied; header shows status counts and approval %"
---

In this guide you will learn:

- What the pre-sync review shows and how encounters get there
- Encounter completeness requirements
- How to approve, deny, and edit encounters
- License and organization assignment
- Bulk actions and filtering

## What it shows

The pre-sync review displays all **materialized encounters** from an approved manifest. Materialization takes the manifest's grouping rules and creates concrete encounter records with their associated images, metadata, and review status.

Each encounter row shows: image count, date, photographer, location name, GPS coordinates, review status, sync status, and license.

<!-- screenshot: Pre-sync review page showing encounter list with status badges -->

## Encounter completeness

An encounter must have all required fields before it can be approved:

| Field | Required | How to fix if missing |
|-------|----------|----------------------|
| Date | Yes | Edit the encounter inline or fix in the manifest |
| Location name | Yes | Set a location override in the manifest editor |
| GPS coordinates | Yes | Edit inline or set a GPS override in the manifest |
| Photographer (resolved) | Yes | Go to Photographer Resolution in the manifest editor |
| License | Yes (for sync) | Assign via the license dropdown |

Encounters missing any of these are marked **Incomplete** with a specific reason (e.g., "missing GPS" or "photographer not resolved"). Incomplete encounters cannot be approved.

## Review statuses

- **Pending** -- Ready for review. All required fields are present.
- **Approved** -- Will be included in the next sync.
- **Denied** -- Excluded from sync. Use this for encounters you do not want to upload.
- **Incomplete** -- Missing required data. Cannot be approved until fixed.

## Approving and denying

Select encounters using the checkboxes, then use the toolbar buttons:

- **Approve Selected** -- Mark selected encounters as approved
- **Deny Selected** -- Mark selected encounters as denied
- **Approve All** -- Approve all pending encounters (requires all to have licenses)
- **Reset All** -- Reset all encounters back to pending

You can also approve or deny individual encounters using the buttons in each row.

:::caution
"Approve All" will fail if any pending encounters are missing a license. Assign licenses first using the bulk license tool.
:::

## License assignment

Every encounter needs a license before it can be synced. Three options are available:

- **Public** -- Data is freely available
- **Public + Attribution** -- Data is available with attribution required
- **Private within Organization** -- Data is restricted to your organization

Use the **License** dropdown in the toolbar to bulk-assign a license to all encounters, or set it per-encounter in the row.

## Organization assignment

Each encounter can be assigned to one or more organizations. This determines who owns and can access the data in finwave.

Organizations can be auto-applied by photographer -- if a photographer belongs to a specific organization, their encounters are automatically assigned to it.

## Editing encounters

Click an encounter to expand its detail view. You can edit:

- Date and time
- Location name
- GPS coordinates (latitude/longitude)
- Photographer name
- Internal notes
- **Known individuals** (see below)

Changes are saved immediately. If editing fixes a completeness issue (e.g., adding missing GPS), the encounter is promoted from Incomplete to Pending.

### Editing known individuals

Each encounter has a list of known individuals -- the animals the contributor reports were present. The discovery pass extracts these from folder names, file names, or IPTC keywords (per the manifest's [Individuals source](/desktop/discovery/manifest-editing/#individuals)). When that misses one, you can add it directly in the review row:

- **Add** -- type a name into the chip input and press <kbd>Enter</kbd> or <kbd>,</kbd>. The name becomes a chip.
- **Remove** -- click the × on a chip.
- Multiple chips can be entered in one save.

When you save the encounter, the desktop app sends the chip list to the server, which performs a **get-or-create** against the population's catalog: existing IDs are matched and reused; new names are created as catalog entries on the next sync. The new individuals are persisted as **Attested** evidence on the encounter -- the contributor's claim, not an ML prediction.

:::tip
The chip grid is the right tool when discovery already ran but missed an individual (typo in folder name, mixed-case mismatch, individual added after a folder was named, etc.). If your *whole* manifest is mis-extracting individuals, fix the rule in the [manifest editor](/desktop/discovery/manifest-editing/) instead and re-materialize -- the chip grid is per-encounter only.
:::

## Files moved or renamed since the last scan

If you renamed, moved, or deleted source files after running discovery, the review page surfaces an amber banner at the top of the page:

> **N files moved or renamed since the last scan.** *Sync will skip these files until discovery runs again.* &nbsp;&nbsp; **[Re-run discovery]**

This is detection-on-open: every time you open the review page, the desktop app checks each file the manifest references and counts the ones that no longer exist on disk. The banner only appears when at least one file is missing.

Click **Re-run discovery** to jump back to the originating scan job, where you can run the scan again. After discovery finishes, return to the manifest editor, regenerate the manifest, and re-materialize -- the new filenames will be picked up.

:::caution
Sync does not fail loudly when a file is missing -- it skips silently and the encounter ends up partially synced. The banner is the only place in the UI that flags this proactively, so it is worth fixing before you click Sync.
:::

## Filtering

Use the filter bar to show specific subsets:

- **All** -- Every encounter
- **Pending** -- Ready for review
- **Approved** -- Marked for sync
- **Denied** -- Excluded encounters

The header shows counts for each status and an approval percentage.

## Related

- [Photographer Resolution](/desktop/discovery/photographer-resolution/) -- Resolving photographer names
- [How Sync Works](/desktop/sync/how-sync-works/) -- What happens after approval
- [Ensure Individuals](/desktop/onboarding/pre-training/) -- Creating individual records before sync
- [Manifest Editing](/desktop/discovery/manifest-editing/) -- Adjusting manifest rules
