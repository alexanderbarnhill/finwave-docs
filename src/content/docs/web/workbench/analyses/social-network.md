---
title: "Social Network Analysis"
description: "Generate social network graphs from co-occurrence data with community detection"
sidebar:
  order: 1
quickRef:
  - "What it shows: clusters of densely-connected animals based on co-occurrence in encounters"
  - "Edge weight = how many encounters two animals share. Singleton encounters produce no edges"
  - "Requires an active age cohort version — every edge instance gets cohort-tagged at the encounter date"
  - "Min sightings filter drops long-tail individuals; min encounter size drops thin sightings"
  - "Three algorithms: Louvain (default, fast), edge betweenness (classical, slower), label propagation (non-deterministic, sanity check)"
  - "Modularity > ~0.4 typically indicates meaningful community structure"
  - "Cohort filter has 3 modes: All edges (legend only), Touching any selected, Between selected. Matrix follows the same filter"
  - "Communities + modularity are computed once at run time — they don't recompute under client-side filtering"
  - "Click an existing job to view; clicking a job's row reopens the submit drawer pre-filled (read-only) for cloning with one tweak"
  - "Workbench tool — requires finwave Pro and per-role access"
---

## What you'll learn

- What Social Network Analysis (SNA) shows and why it matters
- How co-occurrence data drives the network graph
- Which tuning knobs are available and what they affect
- How community detection works and which algorithms are supported
- How cohorts filter what edges you see
- How to compare the SNA result against your catalog kinship graph

## What is Social Network Analysis?

Social Network Analysis builds an interactive network graph of your population from encounter co-occurrence data. Two animals seen in the same encounter form a network edge; the more frequently they co-occur, the heavier the edge. A community-detection algorithm groups densely-connected nodes into clusters that often correspond to real social units — family groups, foraging parties, persistent associations.

This is valuable for:

- Identifying stable social groups
- Tracking changes in association patterns over time
- Discovering which individuals serve as connectors between groups
- Validating known social structure against the data

<!-- screenshot: Social network graph showing clusters of connected individuals with color-coded communities -->

## Pre-requisites

Before you can run an SNA:

1. **Encounter data with multiple identified animals per encounter.** Singletons produce no edges by definition.
2. **An active [age cohort version](/web/administration/age-cohorts/) for the population.** SNA is cohort-aware — every edge instance carries the cohort each endpoint was in *at the encounter date*. The submit drawer disables when no cohort version exists.
3. **(Optional) An active [catalog graph](/web/workbench/catalog-builder/)** if you want to run the kinship overlay, validation report, side-by-side compare, or kinship-weighted bias features documented in [Catalog vs SNA](/web/workbench/analyses/sna-catalog-compare/).

## Submitting a new analysis

The **New analysis** drawer collects four blocks of input:

### Date range and name

Pick a name and the encounter window the analysis should cover. Edges are constructed only from encounters whose date falls in the window.

### Age cohort version

The cohort version anchors how each edge instance is labelled by sex/age. The version is *snapshotted* into the result — later changes to the cohort definition don't retroactively affect this analysis. See [Age Cohorts](/web/administration/age-cohorts/) for details.

### Network parameters

Three tuning knobs let you trade noise for signal:

| Knob | What it does | Default |
|---|---|---|
| **Min sightings per individual** | Drop animals seen in fewer than N distinct encounters before edge construction. Removes long-tail singletons that distort the layout. | 1 (no filter) |
| **Min encounter size** | Ignore encounters with fewer than N identified individuals. Singletons make no edges anyway; raising this drops "two-animal-only" sightings if you don't trust them as social signal. | 2 |
| **Community detection algorithm** | Which method partitions the graph (see below). | Louvain |

### Bias toward known kinship (optional)

When enabled, finwave fetches the active catalog's mother-of, father-of, sibling-of, and mate-of edges and the worker adds a per-edge weight bonus to those pairs before community detection. Use this when sparse data is fragmenting known matrilines. Full details: [Kinship-weighted SNA](/web/workbench/analyses/sna-catalog-compare/#kinship-weighted-sna).

## Community detection

Three algorithms are supported. They all partition nodes into communities; they differ in how they decide where to cut.

| Algorithm | Best for | Notes |
|---|---|---|
| **Louvain** *(default)* | Most populations. Fast, scales well, good modularity on dense networks. | Greedy modularity optimisation. |
| **Edge betweenness** | Smaller, more deeply-structured networks where the *boundary* between groups matters more than raw modularity. | Slower (O(VE) per partition step). Closer to the classical Girvan–Newman approach. |
| **Label propagation** | Quick exploratory partitions. Useful as a sanity check against Louvain. | Non-deterministic — different runs can produce different communities. |

Communities render as colour-coded clusters in the visualization. Each community represents a group of animals that associate more frequently with each other than with the rest of the population. Modularity (a single number reported under the graph) measures how cleanly-separated those communities are: higher = stronger community structure, with values above ~0.4 typically considered meaningful.

:::tip
Compare detected communities against your existing knowledge of the population. Unexpected groupings can reveal associations you hadn't documented; expected groups that fail to appear may indicate gaps in observation data.
:::

## The chart area

When the analysis completes, the chart area renders below the jobs table.

### Top row controls

- **Node opacity / Edge opacity** sliders — fade either the nodes or the edges to focus on the other layer.
- **Fit to view** — recenter the camera on the full graph.
- **Compare** — swap the chart for the [side-by-side catalog comparison view](/web/workbench/analyses/sna-catalog-compare/#side-by-side-compare-view).
- **PNG / SVG export** — save the current rendering to disk.

### Show known kinship overlay

The **Show known kinship** toggle in the chart header adds catalog-curated kinship edges as a styled second edge layer. See [Kinship overlay](/web/workbench/analyses/sna-catalog-compare/#kinship-overlay) for the full reference.

### Cohort filter

When the analysis has cohort data, a unified **Show** dropdown sits above the graph:

| Mode | What it shows |
|---|---|
| **All edges** | Every edge in the network, regardless of which cohorts are selected. The cohort chips are a colour legend only. |
| **Edges touching any selected cohort** | Edges where at least one encounter had at least one endpoint in the currently-selected cohort chips. Surfaces *boundary* edges between selected cohorts and the rest. |
| **Edges between selected cohorts** | Edges where at least one encounter had *both* endpoints in selected cohorts. Surfaces *within-group* structure. |

The chip selection is the dropdown's argument: in **All edges** mode the chips are disabled (legend only); in the other two modes they're toggleable filters. A help line below the row explains the current state ("Showing every edge — switch the mode to filter by cohort" / "No cohorts selected — graph and matrix are empty").

### Mixing matrix

The matrix below the graph shows raw or row-normalised co-occurrence counts between every cohort pair. The matrix follows the cohort filter — it counts only the same instances that the rendered graph shows, so the two views can never disagree. A small subtitle on the matrix header reads either "All co-occurrences" or "Matches the current edge filter" so the coupling is unambiguous.

The **Row-normalized** toggle switches between absolute co-occurrence counts and per-row fractions (what fraction of cohort X's co-occurrences were with cohort Y).

### Diagnostics strip

Under the matrix:

- **Nodes** / **Edges** counts follow the filter; a faint `/ total` suffix shows when the filter is restricting the visible count.
- **Communities** / **Modularity** are computed at analysis time on the full network and don't recompute under client-side filtering. They display with a small `info_outline` icon and tooltip explaining this.

### Catalog vs SNA card

When the kinship overlay is on, a [validation report card](/web/workbench/analyses/sna-catalog-compare/#validation-report) appears beneath the matrix with per-type recovery numbers and an out-of-graph relationships list.

## Reviewing past analyses

The jobs table below the chart lists every previous run. Click a job's name to render its result. Click the row's actions menu to view details (parameters, completion time) or delete the job.

When you click **View details** on an existing job, the submit drawer reopens with the job's parameters pre-populated — useful for cloning a run with one parameter changed. The drawer is read-only for completed jobs; there's no in-place edit since the result is already pinned to a specific parameter set.

## Access

Social Network Analysis is a Workbench tool that requires finwave Pro. Your population administrator controls which roles can access it through the [Workbench Access](/web/administration/workbench-access/) settings. By default, administrators and professionals have access; experts and novices do not unless explicitly granted.

## Related

- [Catalog vs SNA](/web/workbench/analyses/sna-catalog-compare/) — kinship overlay, validation report, side-by-side compare, snapshots, and kinship-weighted bias
- [Age Cohorts](/web/administration/age-cohorts/) — the cohort version is required input
- [Catalog Builder](/web/workbench/catalog-builder/) — where kinship data comes from
- [Composition Analysis](/web/workbench/analyses/composition/) — demographic breakdown
- [Discovery Curves](/web/workbench/analyses/discovery-curve/) — tracking new individual discovery rates
- [Capture History Export](/web/workbench/analyses/capture-history/) — capture history matrices for mark-recapture
- [Workbench Overview](/web/workbench/overview/) — all Workbench tools and how access works
