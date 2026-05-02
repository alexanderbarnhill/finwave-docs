---
title: "Catalog Builder"
description: "Model population relationships as interactive graphs with individual profiles"
sidebar:
  order: 1
  label: "Overview"
quickRef:
  - "What it is: model your population as an interactive graph — individuals as nodes, relationships as typed edges"
  - "Three panes: Toolbar (graph name, undo/redo, save, lock, menus), Canvas (cytoscape graph), Right panel (Inspector + Styles)"
  - "Each population can have many graphs; one is marked 'active' and feeds individual profiles, SNA overlay, validation, and side-by-side compare"
  - "Six relationship types: 4 fixed (mother-of, father-of, sibling-of, mate-of) + 2 soft (association, often-seen-with)"
  - "Two people on the same graph: only one edits, the other is read-only — see Saving, Locks & Collaboration"
  - "Workbench tool — requires finwave Pro and per-role access"
---

## What you'll learn

- What the Catalog Builder is and when to use it
- How its three main panes fit together
- What a "graph" actually contains
- Where to go for each task

## What is the Catalog Builder?

The Catalog Builder lets you model your population as an interactive **graph**. Individuals are **nodes**; relationships between them — *mother-of*, *sibling-of*, *associate*, and so on — are **edges**. You arrange nodes on a canvas, draw edges between them, group them into matrilines or sub-graphs, attach profile images, and style the result for export.

Use it when:

- Your population has meaningful **social structure** (matrilines, family groups, persistent associations) that you want to record alongside the per-individual catalogue.
- You want a **visual reference** of the population you can share with collaborators or include in publications.
- You want to **bulk-bootstrap** parent/sibling links from existing identifier conventions (e.g. `T049` → `T049A` → `T049A2`) using [Auto-Associate & Split](/web/workbench/catalog-builder/auto-associate-and-split/).

If your population is a flat list of individuals with no social structure, the Catalog Builder is optional — the standard [Individuals](/web/core-concepts/individuals/) views may be all you need.

## The three panes

```
┌──────────────────────────────────────────────────────────────┐
│  Toolbar:  graph name · undo/redo · save · lock · menus      │
├──────────────────────────────────────────────────────┬───────┤
│                                                      │       │
│                                                      │  In-  │
│                  Graph canvas                        │ spec- │
│                                                      │ tor / │
│                                                      │ Styles│
│                                                      │       │
└──────────────────────────────────────────────────────┴───────┘
```

- **Toolbar** — graph name, undo/redo, save, lock indicator, save-state indicator, and the **Build / Layout / Associations / Graph** menus. See [Getting Around](/web/workbench/catalog-builder/getting-around/).
- **Canvas** — the cytoscape graph itself. Click-and-drag to move nodes, scroll to zoom, right-click for the context menu.
- **Right panel** — a tabbed sidenav with **Inspector** (edit the selected node or edge) and **Styles** (canvas/node/edge appearance). Toggle it with the icon at the right of the toolbar.

## What a "graph" contains

Every graph belongs to one population. A graph stores:

- **Nodes** — references to individuals in the population, with extra catalog fields you edit *here* (alternate IDs, free-text note, position on the canvas).
- **Edges** — typed relationships between nodes (see [Relationships & Edges](/web/workbench/catalog-builder/relationships/) for the full list).
- **Group nodes** — visual containers that bundle several nodes together as a matriline.
- **Graph-link nodes** — references to a *separate* graph in the same population. Clicking one opens that other graph. See [Sub-graphs & Graph Links](/web/workbench/catalog-builder/sub-graphs-and-graph-links/).
- **Styles** — per-graph canvas background, node geometry and colours, edge curve and colours, deceased-node appearance, and an optional saved profile-image preference.
- **Metadata** — name, optional description, optional category, optional tags, version (for optimistic concurrency on save), and an active-lock holder.

A population can have any number of graphs. Exactly one of them can be marked the **active** graph for the population (see Working with Graphs in [Getting Around](/web/workbench/catalog-builder/getting-around/)).

## How catalog data flows into other tools

The active population graph isn't only a visual reference — its relationships feed several other surfaces in finwave:

- **[Individual profiles](/web/features/individuals/profiles/#relationships-catalog-driven)** — the per-animal Relationships section is bucketed directly from the active graph's edges (mother, father, siblings, mate, offspring, associations, often-seen-with).
- **[SNA kinship overlay](/web/workbench/analyses/sna-catalog-compare/#kinship-overlay)** — Social Network Analysis can render catalog kinship as a styled second edge layer on the SNA graph, so you can see at a glance which known relationships the data-driven analysis recovered.
- **[SNA validation report](/web/workbench/analyses/sna-catalog-compare/#validation-report)** — quantifies how many catalog kinship pairs landed in the same SNA community, with mismatch lists for inspection.
- **[Side-by-side compare](/web/workbench/analyses/sna-catalog-compare/#side-by-side-compare-view)** — two-pane view of catalog kinship vs SNA result with shared spatial layout and synced selection.
- **[Kinship-weighted SNA](/web/workbench/analyses/sna-catalog-compare/#kinship-weighted-sna)** — optional bias on a new SNA submission that adds edge-weight bonuses on known kin pairs before community detection. Useful for sparse populations where Louvain alone fragments matrilines.
- **[Comparison snapshots](/web/workbench/analyses/sna-catalog-compare/#comparison-snapshots)** — pin (catalog version, SNA result, age cohort version) tuples for reproducible comparison studies.

Display labels for the six relationship types are population-customisable via [Relationship Labels](/web/administration/relationship-labels/). The internal type ids stay stable across populations so cross-population analyses keep working regardless of vocabulary choice.

## What you can do

| Task | See |
|---|---|
| Tour the toolbar, panels, and graph switcher | [Getting Around](/web/workbench/catalog-builder/getting-around/) |
| Add individuals; edit identifier, sex, year of birth, alt IDs, notes; mark deceased; lock positions | [Adding & Editing Individuals](/web/workbench/catalog-builder/adding-individuals/) |
| Draw edges by hand, the three context paths, and the relationship-type reference | [Relationships & Edges](/web/workbench/catalog-builder/relationships/) |
| Bulk-build matrilines from identifier patterns | [Auto-Associate & Split](/web/workbench/catalog-builder/auto-associate-and-split/) |
| Extract a selection into a separate graph and reference it as a node | [Sub-graphs & Graph Links](/web/workbench/catalog-builder/sub-graphs-and-graph-links/) |
| Load profile images onto nodes by side and category | [Profile Images](/web/workbench/catalog-builder/profile-images/) |
| Customise canvas/node/edge styling; auto-layout; export PNG/SVG | [Styling, Layout & Export](/web/workbench/catalog-builder/styling-and-export/) |
| Understand autosave, manual save, locks, version conflicts, and read-only mode | [Saving, Locks & Collaboration](/web/workbench/catalog-builder/saving-and-locks/) |
| Reference card for every keyboard shortcut | [Keyboard Shortcuts](/web/workbench/catalog-builder/keyboard-shortcuts/) |

## Access

The Catalog Builder is a Workbench tool that requires **finwave Pro**. Your population administrator controls which roles can access it through [Workbench Access](/web/administration/workbench-access/) settings.

By default, administrators and professionals have access. Experts and novices do not unless explicitly granted.

When two people open the same graph at the same time, only one can edit it. The other gets a read-only view. See [Saving, Locks & Collaboration](/web/workbench/catalog-builder/saving-and-locks/).
