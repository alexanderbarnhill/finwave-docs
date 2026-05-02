---
title: "Browsing Individuals"
description: "Search, sort, and navigate the population's catalog of individuals"
sidebar:
  order: 1
quickRef:
  - "Single list view of every individual in the active population, sortable by every column"
  - "Columns: Identifier, Alternate IDs, Sex, Birth, Death, plus a row-actions menu"
  - "Identifier sort uses natural sort — CA2 sorts before CA10, not after"
  - "One free-text filter searches identifier AND alternate IDs (case-insensitive substring)"
  - "Pagination: 25 default, options 10/25/50/100/500"
  - "Identifier validation (Pro) shows a live ✓/error icon next to the field as you edit"
  - "No bulk actions — every action is per-row via the more_vert menu"
  - "Row actions: View Profile (→ /individuals/{id}), Edit (drawer), Set Hero Image, Delete"
  - "Filter state is ephemeral — it doesn't persist across page reloads"
---

## What you'll learn

- Where the individuals list lives
- What each column shows and how sorting works
- How the search filter behaves
- What you can do from the row-actions menu

## The list view

Every population has an Individuals page that lists every cataloged animal. Reach it from the population sidebar — **Individuals → Browse** in the standard navigation, or from any administrative drilldown into the population.

The page is a single sortable table with a search filter at the top right. It is intentionally simple; the deep stuff lives on each individual's [profile page](/web/features/individuals/profiles/).

<!-- screenshot: Individuals list showing five columns and the row-actions menu -->

## Columns

| Column | What it shows |
|---|---|
| **Identifier** | The primary identifier for the animal. Click to open the edit drawer. |
| **Alternate IDs** | Any other identifiers this animal goes by, joined with " / ". Used by other research groups, legacy catalogs, or external databases. |
| **Sex** | A coloured badge — Male, Female, or "—" for Unknown. |
| **Birth** | The recorded birth year, if known. The full date is editable on the profile but only the year shows in the list. |
| **Death** | Recorded year of death, if known. Same display rule as Birth. |
| (no header) | The row-actions menu — see below. |

Every column is sortable. The Identifier column uses **natural sort** — the kind of sort that puts `CA2` before `CA10` instead of treating them as strings — so identifier-prefix conventions like `T049 / T049A / T049A2` come out in the right order.

## Searching

A single free-text search box filters the list as you type. It does a case-insensitive substring match across:

- Primary identifier
- Every alternate identifier on the animal

So searching `T049` matches any animal whose primary identifier *or* an alt ID contains `T049`. Searching `Bigg` matches anything mentioning that prefix in either field.

There are no quick-filter chips for sex, status, evidence tier, or cohort — those slice into the data via [Workbench analyses](/web/workbench/overview/) rather than the list view.

:::tip
Filter state isn't persisted between page reloads. If you've narrowed the list to find one animal and you reload, you'll be back at the full list. For repeated lookups, bookmark the animal's profile page directly (`/individuals/{id}`) rather than re-searching every time.
:::

## Pagination

The default page size is **25 rows**. Options are 10, 25, 50, 100, and 500. Page size is remembered for the current session via the table component's defaults.

## Identifier validation

If your population has the Pro identifier verifier enabled, the edit drawer's identifier field shows a live validation indicator as you type — a ✓ check when the value matches your population's identifier convention, or an error icon with the rule it violated. The list view itself doesn't render the indicator; it surfaces only inside the edit form.

## Row actions

The `more_vert` icon at the end of each row opens a menu with these options. Availability depends on your role.

- **View Profile** — navigates to `/individuals/{id}`, the [profile page](/web/features/individuals/profiles/) with sighting history, relationships, and image management.
- **Edit** — opens the inline edit drawer for this animal. You can change identifier, sex, dates, alternate IDs, and notes. Changes propagate to the underlying catalog record.
- **Set Hero Image** — pick which image represents this animal in catalog views. Only Professional and Administrator roles see this option.
- **Delete** — permanently removes the individual record. Administrator-only. Annotations referencing this animal become orphaned; consider [merging](/web/features/individuals/merging/) instead when two records turn out to be the same animal.

There are no bulk-select operations in the list. Every action is per-row.

## Click-through to profile

Clicking the **identifier text** on a row opens the edit drawer (for in-line metadata changes). Clicking **View Profile** in the row-actions menu navigates to the full profile page. The two are deliberate — the inline edit is for quick fixes; the profile page is for review, sighting history, and management actions like merging and image curation.

## Permission notes

- Anyone with population membership can view the list.
- Editing identifier / metadata is gated to Professional and Administrator on the API side; the drawer shows the controls regardless and the save will fail with a permission error if your role isn't sufficient. Most teams configure roles so this isn't ambiguous in practice.
- Deleting an individual is Administrator-only.

For the full role matrix, see [Roles & Permissions](/web/core-concepts/roles-permissions/).

## Related

- [Individual Profiles](/web/features/individuals/profiles/) — the per-animal profile page
- [Merging Individuals](/web/features/individuals/merging/) — combining duplicate records
- [Individuals (concept)](/web/core-concepts/individuals/) — what an individual record represents
- [Catalog Builder](/web/workbench/catalog-builder/) — model relationships between individuals as a graph
