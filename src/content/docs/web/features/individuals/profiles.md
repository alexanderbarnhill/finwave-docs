---
title: "Individual Profiles"
description: "The per-individual profile page — sighting history, relationships, profile images, and management actions"
sidebar:
  order: 2
quickRef:
  - "Stable URL pattern: /individuals/{id}. Reachable from list, encounter cards, comments, deep-links"
  - "Page is single scrolling column: header, profile mgmt (admin), health (admin), sighting history, Relationships, Co-occurrence, External sightings, Profile image mgmt"
  - "Relationships section (catalog) is researcher-curated — only shows what's drawn in the Catalog Builder"
  - "Co-occurrence section is data-driven — derived from encounter records regardless of catalog status. Complementary, not redundant"
  - "Buckets: Mother (mother-of source), Father, Siblings, Mate, Offspring (target of mother/father-of), Associations, Often seen with"
  - "Bucket headings respect per-population label customisation (Relationship Labels admin page)"
  - "Hidden gracefully when no catalog graph exists or no relationships are recorded — no error, just absent section"
  - "Profile image management lets you set the active crop per side+category combo (dorsal fin, fluke, eye patch, etc.)"
  - "Edit identifier/nickname/dates/notes and manage profile images: Administrator or Professional only"
---

## What you'll learn

- What appears on an individual's profile page and where each section comes from
- How catalog-driven Relationships differ from Co-occurrence
- How to manage profile images and pick which crop represents the animal
- Which actions are gated to which roles

## Opening a profile

Every individual has a stable profile URL: `/individuals/{id}`. Reach it from:

- The **Individuals** page list
- A click on any animal name or identifier in encounters, comments, or the catalog
- A direct deep-link from notifications and emails

The page loads the animal's display details, sighting record, relationships, and (for users with the right permissions) management controls.

## Page layout

The profile page is a single scrollable column with several stacked sections. Some sections only render when there's relevant data.

### Profile header

Identifier, nickname, sex, dates of birth/death, and the population the animal belongs to. If a profile image is set, it renders here.

### Profile management *(admin / professional only)*

Edit identifier, nickname, alternate IDs, sex, birth/death dates, and notes. Changes are audited.

### Health concerns *(admin / professional only)*

Add or update health observations recorded against this individual.

### Sighting history

A by-encounter list of every recorded sighting of this animal, with date, location, and a link to the encounter. The yearly breakdown drives the year selector used by the Co-occurrence section below.

### Relationships *(catalog-driven)*

A bucketed view of every relationship the [Catalog Builder](/web/workbench/catalog-builder/) records for this animal:

| Bucket | Source |
|---|---|
| **Mother** | The animal at the *source* end of an incoming `mother-of` edge. |
| **Father** | Source of an incoming `father-of` edge. |
| **Siblings** | Either endpoint of a `sibling-of` edge involving this animal (undirected). |
| **Mate** | Either endpoint of a `mate-of` edge (undirected). |
| **Offspring** | The *target* of an outgoing `mother-of` or `father-of` edge — derived from the directed kin types, no separate "child-of" type required. |
| **Associations** | `association` soft-edge partners. |
| **Often seen with** | `often-seen-with` soft-edge partners. |

Each row shows the related animal's identifier, nickname (if set), sex tag, and a deceased marker (†) when applicable. Click any row to navigate to that animal's profile.

The bucket headings respect any [per-population label customisation](/web/administration/relationship-labels/) — if your population calls mother edges "Dam of", the bucket will read "Dam".

The section is hidden when the population has no catalog graph yet, or when the animal has no recorded relationships. It will not show an error in either case — absence of data is a normal state, not a failure.

:::note[Catalog vs Co-occurrence]
The **Relationships** section is the *researcher-curated* view: it shows only what's been explicitly drawn in the Catalog Builder. The **Co-occurrence** section below it is *data-driven* — it derives from encounter records and shows everyone seen with this animal, regardless of whether anyone has codified the relationship. They're complementary, not redundant.
:::

### Co-occurrence

A horizontal bar chart of which other individuals have been observed in the same encounters as this one. Toggle between **All Time** and **By Year** views; click a bar to navigate to that animal's profile. The chart's heading carries a small subtitle clarifying the data source ("Encounter co-presence — derived from this animal's sighting record").

### External sightings

Sightings of this individual recorded in external databases via [ESI](/web/administration/esi-center/), if any.

### Profile image management *(admin / professional only)*

Pick which crop represents this animal in catalog views, encounter previews, and the public page. Multiple crops can be assigned across different sides and categories (dorsal fin, fluke, eye patch, etc.) — the active selection per side/category drives what renders elsewhere.

## Roles and permissions

| Action | Role required |
|---|---|
| View the profile | Any role with population membership (or a public viewer if the animal is on a public page) |
| Edit identifier / nickname / dates / notes | Administrator, Professional |
| Manage profile images | Administrator, Professional |
| Add health concerns | Administrator, Professional (configurable per-population) |
| Edit catalog relationships | Catalog Builder access — see [Catalog Builder](/web/workbench/catalog-builder/) |

## Related

- [Browsing Individuals](/web/features/individuals/browsing/) — the Individuals list view
- [Merging Individuals](/web/features/individuals/merging/) — when two profiles turn out to be the same animal
- [Catalog Builder](/web/workbench/catalog-builder/) — where the Relationships section's data comes from
- [Relationship Labels](/web/administration/relationship-labels/) — customise the display labels per population
