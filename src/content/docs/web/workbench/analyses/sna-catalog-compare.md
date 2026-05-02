---
title: "Catalog vs SNA"
description: "Side-by-side compare view, comparison snapshots, and kinship-weighted Social Network Analysis"
sidebar:
  order: 2
quickRef:
  - "Two views of relationships: catalog (researcher-curated kinship) vs SNA (data-driven co-occurrence)"
  - "Kinship overlay = catalog edges layered on the SNA graph. Missing-endpoint edges land in 'out-of-graph' rather than being silently dropped"
  - "Validation report shows recovery per kin type — how many catalog kin pairs land in the same SNA community"
  - "Mismatches surface bad catalog edges, sparse data, or genuinely finer SNA splits — they're the rows worth investigating"
  - "Side-by-side compare uses the SNA's layout for both panes so the same animal sits in the same spot"
  - "Snapshots pin (catalog version + SNA job + cohort version) by reference — they don't copy data"
  - "Kinship bias adds a per-edge weight bonus (default 5.0) on known kin pairs before community detection — for sparse data"
  - "Bias only uses the 4 hard kinship types (mother/father/sibling/mate). 'association' / 'often-seen-with' are excluded to avoid double-counting"
  - "Bias requires an active catalog graph; submitting without one returns 400 rather than silently no-op-ing"
  - "Don't bias for discovery analyses — biasing hides the associations the catalog doesn't already know about"
---

## What you'll learn

- How the side-by-side compare view contrasts catalog kinship against the data-driven SNA result
- What the validation report tells you about how well the algorithm recovered known structure
- How to save a comparison snapshot for reproducible reference later
- When to enable kinship bias on a new SNA run, and what it does to the algorithm

## Two theories of "who's connected to whom"

finwave records relationships from two complementary angles:

- The **catalog graph** is *researcher-curated*. You declare in the [Catalog Builder](/web/workbench/catalog-builder/) that A is the mother of B, that C and D are siblings, that E and F are mates. These are *structural* claims grounded in your domain knowledge.
- The **Social Network Analysis** is *data-driven*. The algorithm walks your encounter records, builds a graph from co-occurrence, and runs community detection on the result. It infers structure from observed associations.

Both refer to the same animals, but neither is a substitute for the other:

- A correctly-recorded mother-of edge in the catalog isn't observable in the SNA if the pair was never recorded in the same encounter.
- A strong SNA edge between two animals tells you they associate, but doesn't say whether the association is kin, mate, or something looser.

The features on this page exist to make the two views talk to each other.

## Kinship overlay

The SNA result page has a **Show known kinship** toggle in the chart header. Switch it on and finwave fetches the active catalog's relationships and overlays them on the SNA graph as a styled second edge classification:

| Edge style | Catalog type |
|---|---|
| Solid red, with arrowhead | `mother-of` / `father-of` (parent → offspring) |
| Solid amber | `sibling-of` |
| Solid blue | `mate-of` |
| Dashed grey | `association` |
| Dotted grey | `often-seen-with` |

The overlay only renders edges where **both** endpoints exist in the current SNA result. Catalog edges involving an animal that the SNA's filters excluded (min sightings, min encounter size, no co-occurrences in the date range) are listed separately in the validation report as "out-of-graph" relationships — they're not silently dropped.

:::note
The SNA's kinship overlay uses the **active catalog version** at the moment you toggle it on. If the catalog evolves while the SNA result is open, refresh the page to pick up the new edges.
:::

## Validation report

When the kinship overlay is active, a **Catalog vs SNA** card appears below the mixing matrix. It compares each catalog kinship pair against the SNA's community partition and reports per-type recovery:

```
mother-of   9 / 11 in same community     [▸ 2 mismatches]
father-of   3 / 4  in same community     [▸ 1 mismatch]
sibling-of  14 / 18 in same community    [▸ 4 mismatches]
mate-of     6 / 7  in same community     [▸ 1 mismatch]
```

Each row counts how many pairs of that type land in the *same* SNA community. Click the mismatch counter to expand the offenders — animal A in community 2, animal B in community 5. These are the rows worth investigating: either the catalog claim is incorrect, or the SNA has insufficient data to recover the structure, or the algorithm's choice of communities is genuinely capturing a finer split than the kinship category.

The card has a separate **Out-of-graph relationships** collapsible at the bottom. These are the catalog edges whose endpoints didn't make it into the SNA result. Listing them keeps known relationships visible even when they're not contributing to the recovery numbers.

:::tip
The mixing matrix and the validation report don't measure the same thing. The mixing matrix counts cohort co-occurrences derived from encounter data; the recovery report measures whether catalog-asserted kin land in the same algorithmic community. Read them as two views, not as one.
:::

## Side-by-side compare view

For a deeper visual contrast, click the **Compare** button on the SNA chart header. The view swaps the single chart pane for two:

- **Left** — catalog kinship graph, edges styled by relationship type (same legend as the overlay).
- **Right** — SNA co-occurrence graph, edges weighted by frequency, nodes colored by community.

Both panes render the *same* node set with the *same* spatial positions. finwave runs the layout once on the SNA pane (its denser edge set produces the more legible layout), then snapshots every node position and seeds the catalog pane with `layout: 'preset'` from those positions. Same animal, same place across both panes — scan once, see both kinds of relationship.

The footer counts:

- **In both** — animals that appear in both graphs (have a kin tie *and* an SNA edge).
- **Only in SNA** — animals with no recorded kin edges.
- **Only in catalog** — animals the SNA filtered out but who appear in catalog kinship edges. They render as "phantom" greyed nodes on the catalog side.

Clicking a node in either pane highlights the same animal in both panes and pans the other view so the matched node is visible.

## Comparison snapshots

The compare view's header has a **Save snapshot** action. Clicking it pins the current (catalog version, SNA job, age cohort version) tuple together with a name and optional note. Snapshots are reference-only — they don't copy the underlying artefacts, they just record which versions were paired.

Use a snapshot when you want to:

- Cite a specific catalog/SNA contrast in a report or paper.
- Revisit the exact comparison months later, even after the catalog has evolved.
- Share a reproducible reference with collaborators.

### Saving a snapshot

From inside the compare view, click **Save snapshot** in the header. An inline name + note row swaps into the header band:

- **Name** — defaults to `<job name> · <yyyy-mm-dd>` so a hurried save still produces a meaningful row. Override freely.
- **Note** — optional one-liner describing what the comparison answers. Surfaces under the snapshot name in the saved-comparisons panel and in the API response.

Click **Save** to commit. A short success toast appears in the header; the snapshot is immediately listed on the SNA page's saved-comparisons panel.

### Loading a saved snapshot

Below the SNA page's toolbar, a **Saved comparisons** panel renders for any population with at least one snapshot. Each row shows the name, optional note, creator, save date, and the truncated catalog version id the snapshot was pinned to.

Click **Load** on a row to restore the comparison:

1. finwave fetches the SNA result for the snapshot's pinned `snaJobId`.
2. In parallel, it fetches the catalog relationships pinned to the snapshot's `catalogVersionId` (using the read endpoint's `asOfCatalogVersion` parameter, so the result is identical to what the catalog looked like at save time).
3. The compare view opens with both inputs already in place. Cohort filter, kinship overlay, and validation report are computed from the loaded data — exactly as they were when the snapshot was saved.

Click **Delete** on a row to remove the snapshot. The catalog version and SNA result it referenced are not affected.

### Dangling references

If the SNA job or the catalog version is later deleted, the snapshot row stays but its references become dangling. **Load** surfaces this — a missing job produces a "snapshot's SNA job is no longer available — consider removing this snapshot" message and the load aborts cleanly. Use the row's **Delete** action to clean up the dangling row.

## Kinship-weighted SNA

Some populations have data that's too sparse for community detection to recover obvious matrilines on its own — the algorithm fragments related individuals across separate communities purely because they weren't seen together often enough.

The **Bias toward known kinship** toggle on the SNA submit drawer addresses this. When enabled:

1. finwave fetches the active catalog's `mother-of`, `father-of`, `sibling-of`, and `mate-of` edges.
2. For each known kin pair, the worker adds a **per-edge weight bonus** (default 5.0) on top of any observed co-occurrence weight. Pairs with no observed co-occurrence get a new edge added at the bonus weight.
3. Community detection runs on the augmented graph.

The result is a network that respects observed associations *and* keeps known kin together when the data alone would have split them. The bias never invents structure not present in the catalog — it just nudges the algorithm to honour what you've already documented.

:::caution
Soft catalog types (`association`, `often-seen-with`) are *intentionally excluded* from the bias. Those types are themselves observation-based proxies for co-occurrence; including them would double-count what the encounter data already shows. Only the four fixed kinship types contribute.
:::

The bias toggle is a hard requirement gate: if the population has no active catalog graph, submitting with the toggle on returns a 400 telling you to disable the bias or build a catalog first. We refuse rather than silently no-op so the user's instruction can't be quietly ignored.

### When to use kinship bias

- **Sparse populations** — observation density per individual is low, and known matrilines are fragmenting in the unbiased SNA.
- **Reproducibility checks** — re-run with bias on/off to compare how much the data alone supports the catalog structure.
- **Cohesion studies** — when the research question is about within-matriline behaviour, biasing toward known kin sharpens the relevant signal.

When **not** to use it:

- **Discovery analyses** — if the goal is to find associations the catalog *doesn't* know about, biasing toward the catalog hides the very thing you're looking for.
- **Comparative work across populations** — if you bias one population and not another, their SNA results aren't directly comparable. Use the same setting across the comparison set or document the difference.

The job's options blob records whether bias was on plus the catalog version it was based against, so the analysis is reproducible and auditable after the fact.

## Related

- [Social Network Analysis](/web/workbench/analyses/social-network/) — the underlying analysis this page builds on
- [Catalog Builder](/web/workbench/catalog-builder/) — where kinship edges come from
- [Age Cohorts](/web/administration/age-cohorts/) — the third pinned dimension on a comparison snapshot
- [Relationship Labels](/web/administration/relationship-labels/) — per-population display label customisation
