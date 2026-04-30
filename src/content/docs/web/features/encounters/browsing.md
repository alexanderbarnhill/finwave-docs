---
title: "Browsing Encounters"
description: "Search, filter, sort, and map view for encounters"
sidebar:
  order: 1
---

## What you'll learn

- How the encounter overview page is organized
- What information is shown on each encounter card
- How to use search and filter options
- What the status icons mean

## Encounter overview

The encounter overview page displays the most recent encounters for your population. Each encounter appears as a card with a thumbnail image overlaid with key information.

<!-- screenshot: Encounter overview page showing a grid of encounter cards with overlaid metadata -->

## Encounter cards

Each encounter card shows:

- **Date** -- when the encounter occurred
- **Location** -- where the encounter took place
- **Photographer** -- who captured the images
- **Image count** -- the total number of images in the encounter
- **Confirmed identities** -- the identities that have been confirmed by annotators

Clicking a card opens the full encounter detail page with all images, metadata, annotations, and identification results.

## Status icons

Each encounter card displays status icons on the right side of the overlay.

**Analysis status** indicates the ML processing state:
- Green circle -- analysis complete
- Yellow circle -- analysis in progress
- Red circle -- new encounter, analysis has not started

**Completeness** indicates whether all individuals present were photographed:
- Filled circle -- complete encounter (all individuals photographed)
- Partial circle -- incomplete encounter (not all individuals photographed)
- Filled circle with a question mark -- unknown completeness

**Predation** -- a knife-and-fork icon indicates that the encounter involved a predation event.

**License** indicates the encounter's sharing terms:
- CC icon -- public domain or Creative Commons
- Non-commercial icon -- non-commercial use only
- Attribution icon -- photographer attribution required
- Private icon -- visible only to members of the submitting organization

## Search and filter

The encounter overview provides a search and filter interface for narrowing results.

### Data source

- **All public data** -- encounters accessible to any population member
- **Data from my organizations** -- encounters submitted by your organizations
- **Both** -- combine public and organization data

### Filters

- **Encounter completeness** -- filter by complete, incomplete, or unknown
- **Behavioral annotations** -- filter by population-specific behaviors defined by your administrator
- **Analysis status** -- filter by new, in progress, or finished
- **Individuals of interest** -- multi-select to find encounters containing specific individuals
- **Photographers** -- multi-select to filter by photographer
- **Locations** -- multi-select to filter by location
- **Date range** -- restrict to encounters within a specific time period

:::tip
Combining the "individuals of interest" filter with a date range is a quick way to review the sighting history of specific animals over a season.
:::

## Related

- [Encounters](/web/core-concepts/encounters/) -- what encounters represent in finwave
- [Creating Encounters](/web/features/encounters/creating/) -- uploading images and submitting encounters
- [Editing Encounters](/web/features/encounters/editing/) -- modifying encounter details
