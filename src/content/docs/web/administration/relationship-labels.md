---
title: "Relationship Labels"
description: "Customise how the six catalog relationship types display in your population"
sidebar:
  order: 10
quickRef:
  - "Per-population display labels for the six relationship types — vocabulary changes only, never structural"
  - "Internal type ids (mother-of, father-of, sibling-of, mate-of, association, often-seen-with) stay stable across populations"
  - "Editor at Settings → Relationship Labels: 6 rows, placeholder shows platform default, leave blank to use default"
  - "Save persists overrides; saving a row with empty value clears that override and reverts to default"
  - "Reset all to defaults clears every input field locally — still need to press Save to commit"
  - "Affects: Catalog Builder edge tooltips, /individuals Relationships buckets, SNA overlay legend, validation report"
  - "Does NOT affect: stored data, comparison snapshots, dispatch payloads, API, cross-population analyses"
  - "Bucket headings get cosmetic transforms: trailing ' of' stripped, plural 's' added for multi-row buckets"
---

## What you'll learn

- Why per-population display labels exist and what they don't change
- How to override the default labels for one of the six relationship types
- Where customised labels surface in the app
- Why internal type ids stay stable across populations

## Why labels are population-scoped

Different populations carry different cetological conventions with them. A "mother-of" edge in a killer whale catalog might read more naturally as "Mother of" or "Dam of" depending on the field's convention; harbor seal researchers might prefer "Pup of"; some teams treat "Often seen with" as "Travel companion" because that's the framing in their published work.

The six [Catalog Builder](/web/workbench/catalog-builder/) relationship types are stable across the platform — that's what lets cross-population analyses, [comparison snapshots](/web/workbench/analyses/sna-catalog-compare/#comparison-snapshots), and the API surface keep working regardless of vocabulary choice. What's locally customisable is the *display label* — the right-hand side of `mother-of` → "Mother of".

| Internal type *(stable)* | Default label | Where the label appears |
|---|---|---|
| `mother-of` | Mother of | Edge tooltips, [individual relationships](/web/features/individuals/profiles/#relationships-catalog-driven), SNA kinship overlay legend, validation report |
| `father-of` | Father of | Same |
| `sibling-of` | Sibling | Same |
| `mate-of` | Mate | Same |
| `association` | Association | Same (soft type) |
| `often-seen-with` | Often seen with | Same (soft type) |

## Editing labels

Navigate to **Administration > Populations > [your population] > Settings > Relationship Labels**.

The page shows six rows, one per type. Each row displays:

- The internal type id as a `<code>` chip — read-only, this is what API consumers, comparison snapshots, and cross-population analyses use.
- A short helper line describing where the label renders.
- An input field whose **placeholder is the platform default**. Type a value to override; leave empty to fall back to the default.

The **Save** action persists the overrides. **Reset all to defaults** clears every input field locally — you still have to press Save to commit.

:::note[Empty fields revert]
Saving a row with an empty (or whitespace-only) value clears that override and restores the platform default for that type. Saving an entirely empty form clears all overrides at once.
:::

## What the customisation affects

Customised labels render wherever finwave shows the *display* form of a relationship:

- **Catalog Builder** — edge tooltips and the relationship-type dropdown.
- **/individuals Relationships section** — bucket headings (with cosmetic transformations: `"Dam of"` → `"Dam"` for the mother bucket; the plural `"s"` is appended for collection buckets so `"Litter mate"` reads as `"Litter mates"`).
- **SNA kinship overlay legend** — the colour-key strip next to the toggle.
- **SNA validation report** — per-type recovery card headings ("9 / 11 in same community").

Labels do **not** affect:

- The catalog graph's stored data — the underlying type id is what's persisted.
- Comparison snapshots, the SNA dispatch payload, or any worker code — internal type ids only.
- Cross-population imports, the API, or any analytical comparison.

This separation means your customised vocabulary is purely a presentation layer: a population renaming `mate-of` to "Pair-bond" doesn't break a comparison study with another population that uses the platform default. The data stays interoperable; the words don't have to.

## Plural forms in bucket headings

The /individuals view applies two cosmetic transforms when rendering bucket headings:

- A trailing `" of"` is stripped — `"Mother of"` becomes `"Mother"` because the bucket lists the *partner* of that relationship, not the relationship name itself.
- An `"s"` is appended for buckets that hold multiple rows (siblings, associations, often-seen-with) when the label doesn't already end in `s`.

Custom labels go through the same transforms. `"Litter mate"` → bucket heading `"Litter mates"`; `"Calf of"` → `"Calf"`; `"Bonded pair"` → `"Bonded pair"` (singular bucket — no transform).

## Related

- [Catalog Builder](/web/workbench/catalog-builder/) — where the relationships these labels describe come from
- [Individual Profiles](/web/features/individuals/profiles/) — the page these labels primarily render on
- [Catalog vs SNA](/web/workbench/analyses/sna-catalog-compare/) — uses display labels in its overlay legend and validation report
