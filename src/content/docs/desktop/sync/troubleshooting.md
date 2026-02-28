---
title: "Sync Troubleshooting"
description: "Network issues, duplicate detection, and manifest changes"
sidebar:
  order: 3
---

:::note
Automatic synchronization is under active development and not yet available in the desktop client. This page will be populated with troubleshooting guidance when sync ships.
:::

## Current troubleshooting

If you are experiencing issues with the desktop client's current features (scanning, manifesting, or directory management), try these steps:

- **Scan job stuck or errored** -- Check the scan job detail view for error messages. You can delete a failed scan job and create a new one.
- **Directory not showing files** -- Use the rescan option to re-index the directory. Verify the directory path is accessible and contains supported file types.
- **Manifest preview looks wrong** -- Check your field source mappings and regex patterns in the manifest editor. Try adjusting the encounter grouping strategy.
- **Activity log** -- Check the Activity Log (in the sidebar) for a timeline of recent actions and any error events.

## Related

- [Discovery](/desktop/discovery/discovery/) -- How scanning works and supported file types
- [Manifest Editing](/desktop/discovery/manifest-editing/) -- Adjusting manifest rules
- [Directory Management](/desktop/discovery/directory-management/) -- Managing watched directories
