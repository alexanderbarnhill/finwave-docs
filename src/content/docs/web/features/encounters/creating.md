---
title: "Creating Encounters"
description: "Upload images, enter metadata, and submit encounters"
sidebar:
  order: 2
---

## What you'll learn

- What information is required to create an encounter
- How to select a date and location
- How to attach images and optional metadata
- What happens after submission

## Required information

Every encounter submission requires three things:

1. **Date** -- when the encounter took place
2. **Location** -- where the encounter took place
3. **Images** -- the photographs from the encounter

All other metadata is optional but helps organize your data and makes it more useful for analysis.

## Date selection

Select the date the encounter occurred. The date must be in the past -- future dates are not allowed.

<!-- screenshot: Date picker showing a calendar for selecting the encounter date -->

## Location selection

You can specify the encounter location in two ways:

**Pin drop** -- click on the map at the location where the encounter took place. The latitude and longitude will be extracted automatically from the map position.

**Manual coordinates** -- enter coordinates directly in Degrees Decimal Minutes (DDM) format if you have precise GPS data from the field.

In either case, you must also provide a location name. This name is used for display and filtering throughout finwave. If you have visited this location before, the name will auto-complete from previous entries.

<!-- screenshot: Location selection showing both the map pin-drop and coordinate entry options -->

:::tip
Consistent location naming makes filtering much more useful. Agree on standard location names with your team before your first season of data entry.
:::

## Images

Upload the photographs from the encounter. finwave accepts standard image formats (JPEG, PNG, TIFF). There is no limit on the number of images per encounter, but very large uploads may take time depending on your connection.

Once uploaded, finwave's ML pipeline will automatically process the images -- detecting features, classifying sides, and suggesting identifications. You can monitor the analysis status from the encounter detail page.

## Optional metadata

The following information is optional but valuable:

- **Organization** -- associate the encounter with one of your organizations. This controls who can see the encounter based on organizational membership.
- **Predation information** -- flag the encounter as a predation event if applicable.
- **Behavioral observations** -- select from the population-specific behaviors defined by your administrator.
- **Prey observations** -- record prey species observed during the encounter.
- **Notes** -- free-text notes about the encounter, field conditions, or anything else relevant.

## After submission

Once submitted, the encounter enters the ML processing pipeline:

1. **Detection** -- the model scans images for identifiable features (typically dorsal fins)
2. **Classification** -- detected features are classified by body side (left, right, etc.)
3. **Identification** -- the model compares detected features against known individuals and suggests matches

You can check the analysis status from the encounter overview page. When analysis is complete, the encounter will show a green status indicator and you can review the results in the annotator.

:::note
If your population has auto-tagging enabled and your images contain IPTC caption metadata with known individual identifiers, finwave can automatically assign identities during the detection phase. This is useful for onboarding historical data where identifications were already recorded in image metadata. Auto-tagging works when an image contains a single detected feature and the caption contains a single known individual ID.
:::

## Related

- [Encounters](/web/core-concepts/encounters/) -- what encounters represent in finwave
- [Browsing Encounters](/web/features/encounters/browsing/) -- finding and filtering encounters
- [Editing Encounters](/web/features/encounters/editing/) -- modifying encounter details after submission
- [Annotator Overview](/web/features/annotator/overview/) -- reviewing and confirming ML results
