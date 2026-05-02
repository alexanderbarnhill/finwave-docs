---
title: "Auto-Associate & Split"
description: "Bulk-build matrilines from systematic identifier patterns"
sidebar:
  order: 5
quickRef:
  - "What it does: parses identifiers like T049 → T049A → T049A2 to infer matrilines and group them visually"
  - "Splitting is visual within the active graph (compound group nodes), not separate graph records — despite the name"
  - "Identifier pattern: <root><segments> where root = letters + optional separator + digits, segments alternate letter/digit runs"
  - "Sibling chaining links siblings A — B — C — D (chain), not as a fully-connected clique"
  - "Deceased filter: kept only if at least one living descendant exists; filtered ones stay on the canvas but outside the group"
  - "Mother/sibling edges drive the layout but are NOT added to the saved graph — draw them by hand if you want them persisted"
  - "Action is non-destructive but stacks groups on repeated runs — undo or delete old groups before re-running"
  - "Best fit: populations with prefixed identifiers encoding kinship. Useless on opaque/random tag IDs"
---

## What you'll learn

- What Auto-Associate & Split actually does
- The identifier pattern it expects, and exactly how it parses one
- How deceased individuals are handled
- What the output looks like on the canvas
- When to use it and when not to

:::note[Naming]
The name *"Auto-Associate & Split"* describes the **intent** of the feature — infer matrilines from identifiers and split them into separate graphs. In the current implementation, the splitting happens **visually within the active graph** (each matriline becomes a compound group node), not as a population of separate graph records. Treat this as a fast organisation tool for one canvas, not a multi-graph factory.
:::

## What it does

Open: **Toolbar → Associations → Auto-associate & split**.

When you trigger it, finwave does the following on the active graph:

1. **Reads every non-group node** on the canvas and parses each one's identifier.
2. **Builds a lineage tree** from the identifier patterns. For each node, it finds the parent identifier (the immediately shorter prefix) on the same canvas and treats that as the parent.
3. **Filters deceased members** out of each matriline, *unless* a deceased individual has at least one living descendant somewhere down the tree (in which case they're kept so the lineage can be drawn).
4. **Computes a hierarchical layout** per matriline using the inferred parent-child relationships, sorted by year of birth where available.
5. **Adds a compound "group" node** to the active graph for each matriline, named `Matriline <root>` (e.g. `Matriline T049`), and re-parents every member of the matriline into that group at the computed positions.
6. Shows a snackbar: *"Organized into N matriline(s)."*
7. Marks the graph dirty so autosave picks it up.

The result is a canvas where each matriline is visually self-contained, laid out top-down by parentage, and labelled.

## The identifier pattern

The lineage parser looks for an identifier shaped like:

```
<root><segment><segment>…
```

Where:

- **Root** = letters + an optional `-` or `_` + digits. Examples: `T049`, `CA172`, `J-25`, `SRKW_42`.
- **Segments** = alternating letter-runs and digit-runs after the root. Separators (`-`, `_`, `.`, etc.) are stripped before splitting.

The full lineage chain is the root, then the root + first segment, then the root + first two segments, and so on. So:

| Identifier | Parsed lineage |
|---|---|
| `T049` | `[T049]` (root only — no parent on the canvas) |
| `T049A` | `[T049, T049A]` — parent is `T049` |
| `T049A2` | `[T049, T049A, T049A2]` — parent is `T049A` |
| `T049A2B` | `[T049, T049A, T049A2, T049A2B]` — parent is `T049A2` |
| `T049-A2` | Same as `T049A2` (separators stripped after the root) |

A node is wired up to its parent **only if a node with the parent identifier is on the same canvas**. If the parent isn't present, the child still belongs to the matriline (under the root) but has no mother-of relationship inferred.

If an identifier doesn't match the pattern at all (no leading letters + digits root), the whole identifier is treated as its own root and the node ends up alone in its matriline.

## Sibling chaining

When **Create sibling edges** is enabled (it is by default), the algorithm walks each set of children that share an immediate parent — sorted by identifier — and links them in a **chain**:

> A — B — C — D

…not as a fully-connected clique. So three siblings of the same mother get two sibling edges (A–B, B–C), not three (A–B, B–C, A–C). This keeps the visual graph readable and avoids implying every pair of siblings was personally observed together.

## Deceased filtering

For each matriline, finwave keeps a deceased individual *only if* at least one living descendant exists somewhere down their inferred subtree.

- A deceased matriarch with three living daughters: **kept** (she's the structural root).
- A deceased calf with no descendants and no offspring of its own: **filtered out** of the layout.
- A living animal: always **kept**.

The filtering applies only to the layout produced by Auto-Associate & Split. The deceased individuals are *not* deleted from the population catalogue or from the graph's node set — they just aren't included in the matriline group node.

## What ends up on the canvas

After running, you'll see, in the same active graph:

- One **compound group node** per matriline, labelled `Matriline <root>`.
- Each member node re-parented into its group, positioned hierarchically.
- Living and "kept" deceased members visible; filtered deceased members remain on the canvas but are not inside any group.

You can still:

- Click a group label to select the whole matriline.
- Drag a group to move all its members at once.
- Right-click a member node and *Lock position* to stop it being moved by future layout passes.

## Mother-of and sibling-of edges

The algorithm computes a candidate set of mother-of and sibling-of edges that *could* describe each matriline. In the current implementation those edges are used to drive the per-matriline hierarchical layout but are **not added as graph edges on the canvas**. If you want explicit mother-of / sibling-of edges in the saved graph, draw them manually after the matrilines are organised — or use the inferred layout as a starting point and add the formal edges where you want them.

## When to use it

Good fit:

- Populations using systematic prefixed identifiers (`T049`, `CA172`, `SRKW_42`) where parentage is implicitly encoded.
- The first time you build a catalog graph for a population — gives you a much better starting layout than the default grid.
- After bulk-importing many new individuals — re-run to regroup them.

Less useful:

- Populations using opaque or non-hierarchical identifiers (e.g. random tag IDs).
- Populations where the prefix convention does *not* encode kinship (the algorithm will still group by prefix and produce nonsense matrilines).
- Cases where you want explicit edges saved into the graph immediately — you'll still need a manual pass.

## Re-running

The action is idempotent in the sense that it re-derives the matrilines from current identifiers each time. But it **does not** undo previous matriline groupings before adding new ones — repeated runs can stack groups. Use **Undo** (`Ctrl/Cmd+Z`) before re-running, or delete the existing group nodes first.

## Related

- [Relationships & Edges](/web/workbench/catalog-builder/relationships/) — what mother-of and sibling-of edges look like in the saved graph.
- [Sub-graphs & Graph Links](/web/workbench/catalog-builder/sub-graphs-and-graph-links/) — how to extract a matriline as a separate graph if you need that.
- [Adding & Editing Individuals](/web/workbench/catalog-builder/adding-individuals/) — locking nodes so layout passes leave them alone.
