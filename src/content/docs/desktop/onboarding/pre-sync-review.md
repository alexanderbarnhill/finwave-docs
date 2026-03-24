---
title: "Pre-Sync Review"
description: "Review, approve, and configure encounters before uploading to finwave"
sidebar:
  order: 3
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

Changes are saved immediately. If editing fixes a completeness issue (e.g., adding missing GPS), the encounter is promoted from Incomplete to Pending.

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
