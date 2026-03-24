---
title: "External Sighting Intelligence"
description: "Import and manage external sighting data from public databases like OBIS-SEAMAP and GBIF"
sidebar:
  order: 7
---

## What you'll learn

- What External Sighting Intelligence (ESI) is and why it matters
- How to import sighting data from OBIS-SEAMAP, GBIF, and OBIS
- How to map external individuals to your finwave catalog
- How gap analysis highlights areas your population data does not cover
- What data is imported and what is not

## What is External Sighting Intelligence?

External Sighting Intelligence (ESI) is a population administration feature that brings public cetacean sighting data from external databases into finwave as a **contextual overlay**. It answers the question: "What sightings of this species exist outside of what we have collected ourselves?"

External sightings are kept strictly separate from your population's encounter data. They never appear in your encounter list, statistics, or exports. Instead, they provide geographic and temporal context that helps you understand coverage gaps, discover contributor networks, and see how your population moves beyond your own survey area.

:::note
External sighting data is metadata only -- dates, locations, species, group sizes, and observer names. No images are imported. Photographs remain on the source platform.
:::

## Supported data sources

ESI supports three public biodiversity databases:

| Source | Method | Best for |
|--------|--------|----------|
| **OBIS-SEAMAP** | CSV upload | Primary source for marine mammal sightings, including Happywhale datasets |
| **GBIF** | API import | Large-scale biodiversity occurrence data with automated download |
| **OBIS** | API import | Ocean biodiversity, supplementary to OBIS-SEAMAP |

Each source has different licensing terms. OBIS-SEAMAP and GBIF data typically uses **CC BY-NC** (Creative Commons Attribution-NonCommercial), which requires proper attribution on every view. finwave handles attribution display automatically.

## Getting started

Navigate to **Population Settings > External Sighting Intelligence** to access the ESI Center.

<!-- screenshot: ESI Center overview showing source summary cards and import history -->

The overview shows:

- **Total external sightings** -- the cumulative count of imported records
- **Source breakdown** -- how many sightings came from each data source
- **Import history** -- a timeline of past imports with status, record counts, and deduplication results
- **Map** -- a geographic view of all external sightings plotted alongside your population's encounters

## Importing data

### CSV import (OBIS-SEAMAP)

1. Download a CSV dataset from OBIS-SEAMAP for your species and region.
2. In the ESI Center, click **Import > CSV Upload**.
3. Select the CSV file and confirm the source type.
4. finwave parses the CSV, maps columns to its internal schema, and begins deduplication.

### API import (GBIF / OBIS)

1. In the ESI Center, click **Import > GBIF** or **Import > OBIS**.
2. Configure filters: species, geographic bounding box, date range.
3. Click **Start Import**. finwave queries the API, downloads matching records asynchronously, and imports them.

GBIF imports may take several minutes for large datasets because the GBIF API uses an asynchronous bulk download system. You will see progress updates as the import proceeds.

### Deduplication

Every import runs automatic deduplication against existing records. Duplicates are detected at four confidence tiers:

| Tier | Criteria | Action |
|------|----------|--------|
| **Exact match** | Same date, location within 1 km | Skip (do not re-import) |
| **Probable match** | Same date, location within 5 km, group size within 50% | Skip |
| **Possible match** | Same date, location within 20 km | Flag for review |
| **No match** | No overlapping criteria | Import as new |

The import summary shows how many records fell into each tier so you can assess data quality.

## Individual mapping

Some external datasets include individual identification codes -- for example, Happywhale assigns IDs like `HW-MN0001` to identified humpback whales. If your finwave population tracks the same individuals, you can create **individual mappings** that link the external ID to your finwave individual.

Navigate to **ESI Center > Individual Mappings** to manage these links.

<!-- screenshot: Individual mapping table showing external IDs linked to finwave individuals -->

Mappings enable:

- **Cross-reference** -- see which of your cataloged individuals also appear in external databases
- **Sighting enrichment** -- view external sighting history on an individual's profile page
- **Auto-matching** -- once a mapping is created, future imports automatically associate new sightings with the linked finwave individual

:::tip
Start by mapping your most frequently sighted individuals. Even a small set of mappings dramatically increases the value of the external data because those individuals often appear across multiple datasets.
:::

## Gap analysis

The gap analysis compares your finwave encounter data with the external sighting layer to reveal:

- **Spatial gaps** -- regions where external sightings exist but you have no encounters. These are areas where your species is present but you are not surveying.
- **Temporal gaps** -- time periods with external activity but no encounters from your team. These may indicate seasonal movements you are missing.

Gap analysis helps prioritize survey effort and is valuable context for grant applications that need to justify expanding coverage.

<!-- screenshot: Gap analysis map showing your encounters in blue and external-only areas highlighted in amber -->

## External sighting history on individual profiles

When an individual has a mapping to an external ID, their profile page gains an **External Sighting History** section. This shows all external sighting records linked to that individual, including date, location, source, and group size -- providing a more complete picture of the individual's range and movement patterns.

:::note
External sighting history is only visible to population members with appropriate roles. It does not appear on public pages.
:::

## What is not imported

To keep your population data clean and trustworthy:

- **No images** -- external sightings are metadata only
- **No encounters created** -- external records never become finwave encounters
- **No statistical mixing** -- external data is excluded from all population statistics, exports, and analyses
- **No automatic trust** -- external records are contextual references, not verified identifications

## Data licensing

External sighting data carries licensing obligations from the source platform. finwave displays attribution information (dataset name, citation, and license type) on every view of external data. You do not need to manage this manually -- the system tracks provenance per record and renders it automatically.

:::caution
If your population uses external sighting data in publications or grant applications, you must cite the original dataset per the license terms. finwave provides the citation text on the ESI Center overview for easy copying.
:::

## Related

- [Population Settings](/web/administration/population-settings/) -- general population configuration
- [Encounters](/web/core-concepts/encounters/) -- how finwave encounters differ from external sightings
- [Individual Profiles](/web/features/individuals/profiles/) -- where external sighting history appears
- [Public Pages](/web/administration/public-pages/) -- external data visibility on public landing pages
