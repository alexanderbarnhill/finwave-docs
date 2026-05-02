---
title: "Saving, Locks & Collaboration"
description: "Autosave timing, manual save, the lock model, version conflicts, and read-only mode"
sidebar:
  order: 9
quickRef:
  - "Save state cloud icons: cloud_done (saved) / cloud_queue (pending) / cloud_off (error) / sync_problem (version conflict)"
  - "Autosave fires after 30s of inactivity — debounces on every change. Skipped if read-only or never saved"
  - "Manual save (Ctrl/Cmd+S) is required for: first save of a new graph, or to persist before navigating away"
  - "One editor at a time per graph. Loading auto-acquires the lock; if denied you enter read-only mode"
  - "Lock heartbeats every 2 minutes; failed heartbeat = lock lost = switch to read-only"
  - "Force-acquire the lock by clicking the lock icon — confirmation prompt warns that the other user may lose unsaved work"
  - "Version conflict (rare with locks) = reload graph and re-apply edits. No auto-merge"
  - "Switching graphs while dirty triggers an autosave first, but check the indicator — switch may proceed if save fails"
  - "Read-only mode: Save disabled, write actions blocked, but pan/zoom/search/export still work"
---

## What you'll learn

- When changes are saved automatically and when you need to save manually
- The lock model — why only one editor at a time, how locks expire, and how to take a lock from someone else
- Every save state the toolbar shows and what triggers each one
- How version conflicts are detected and what to do
- How to recover when you've lost the lock mid-edit

## The save lifecycle

The toolbar's save indicator (the cloud icon to the right of the Save button) is the most reliable way to know what state you're in. The four states it can show:

| Icon | State | Meaning |
|---|---|---|
| `cloud_done` | **saved** | Everything is on the server. |
| `cloud_queue` | **pending** | You have unsaved changes; autosave is queued. |
| `cloud_off` | **error** | A save attempt failed (network, server, or lock error). The graph is editable but new changes haven't been persisted. |
| `sync_problem` | **conflict** | The server's version has moved on since you loaded — your save would clobber someone else's work. |

A small spinner appears in the toolbar during the save itself.

## Autosave

While the graph is open and you have the lock:

- Every change marks the graph **dirty** (`saveState: 'pending'`).
- After **30 seconds** of inactivity, an autosave fires and pushes the changes to the server.
- Autosave is skipped if the graph is read-only, has no unsaved changes, or has never been saved to the API at all (a brand-new "(unsaved)" graph requires a manual first save — see below).

Autosave debounces — every additional change resets the 30-second timer. If you're typing in a note and you stop for 30 s, the save fires; if you keep editing, it waits.

## Manual save

Press **`Ctrl/Cmd+S`** or click the **Save** button at any time to save immediately. Manual save is the only way to:

- Persist a brand-new "(unsaved)" graph for the first time. The first manual save creates the API record, gives the graph a stable id, and acquires a lock.
- Force a save right now (e.g. before navigating away) without waiting for the 30 s autosave timer.

## Renaming, cloning, deleting

These three operations live in the **Graph** menu and on the title itself:

- **Rename** — click the graph name in the toolbar (or press the rename action). Available only after the first save.
- **Clone graph** — creates a copy of the current graph with a new name. Available only after the first save (the API needs an id to clone from).
- **Delete graph** — opens a confirmation dialog and, on confirm, releases the lock and deletes the API record. Deletion shows a snackbar with an undo affordance for a short window.

## The lock model

Only **one editor at a time** can modify a saved graph. The lock model is built around three states from your perspective:

| Lock state | Toolbar shows | What you can do |
|---|---|---|
| **You hold it** | `lock_open` icon | Full edit access. Changes save normally. |
| **Someone else holds it** | `lock` icon (clickable) | The graph is **read-only**. You can browse, search, and export — but Save is disabled and most edit actions are blocked. Click the lock icon to take it over. |
| **No one holds it** | (no lock icon yet — typical for a brand-new unsaved graph) | n/a |

### When the lock is acquired

- **Loading an existing graph**: finwave automatically requests the lock as part of the load. If granted, you have the lock for the session. If denied, you enter read-only mode.
- **First save of a new graph**: as part of creating the API record, finwave acquires a fresh lock.

### How the lock stays alive: heartbeats

Once you have the lock, the client sends a **heartbeat every 2 minutes** to keep it alive. If the heartbeat ever fails (server unreachable, network drop, or backend says no), the client treats the lock as lost and switches the graph to read-only.

If you're idle for a long time and the server-side lock expires before the heartbeat catches up, the next save attempt may fail with `LOCK_EXPIRED` or `NO_LOCK`. In that case, finwave automatically tries to **re-acquire the lock and retry the save once** before reporting failure.

### Force-acquiring (taking the lock from someone else)

If the lock is held by another user and they appear to have stepped away, you can take the lock:

1. Click the `lock` icon in the toolbar.
2. A confirmation appears: the other user may lose unsaved changes.
3. Confirm to send a force-acquire request. If the server agrees, the lock transfers to you and the graph becomes editable.

The other user, on their next heartbeat, will get a "Lock lost" notification and their graph will switch to read-only.

:::caution[Coordinate with the other user]
Force-acquiring is for the case where someone else genuinely abandoned the graph. If the other user is actively editing, force-acquiring will likely lose their work. Prefer to ask them to release first.
:::

### When the lock is released

- When you close the graph (navigate away, switch graphs, sign out).
- When you delete the graph.
- When the heartbeat fails or the server times out the session.

## Read-only mode

You enter read-only mode whenever you don't hold the lock — either because someone else has it, or because you lost it. In read-only mode:

- The **Read-only** badge appears next to the lock icon.
- The **Save** button is disabled.
- Most write actions are blocked at the persistence layer (e.g. category changes are silently ignored if `isReadOnly` is true).
- You can still: pan, zoom, search, switch graphs, open the inspector, change styles temporarily *in the UI* (these won't persist), and export PNG/SVG.

To leave read-only mode, click the lock icon and force-acquire (if the previous holder is gone), or close and re-open the graph after they release.

## Version conflicts

The persistence layer uses **optimistic concurrency** — every save includes the version you loaded. If the server's version is newer (because someone else saved in between), the server returns `VERSION_CONFLICT` or `CONCURRENT_MODIFICATION` and the toolbar switches to the `sync_problem` icon (`saveState: 'conflict'`).

This is rare in practice because the lock prevents simultaneous edits. It can happen when:

- Network split: two clients both believed they had the lock for a while.
- Server restart that re-bumped versions while a client was offline.

To resolve, **reload the graph**. The Catalog Builder doesn't currently merge changes — the safe path is reload, re-apply your edits, and save again.

## Switching graphs while dirty

If you switch graphs (via `Ctrl/Cmd+K` or the Graph menu) while the current graph has pending changes, the persistence layer fires a save before unloading. If the save fails, you'll see the error state — switching may still proceed, but check the indicator before assuming your changes landed.

## What survives a session

Persisted to the server with each save:

- Nodes, edges, group nodes, graph-link nodes.
- Per-node positions, locks, classes.
- Per-graph styles (canvas / node / edge / deceased) and image preference.
- Graph metadata (name, description, category, tags, version).

The viewport (zoom and pan) is also saved with the graph, so re-opening drops you back where you left off.

## Error codes you might see

If a save fails with a specific error code, the toolbar's tooltip will display it. The codes the persistence layer recognises:

| Code | Meaning | Recovery |
|---|---|---|
| `NO_LOCK` | The server doesn't think you have the lock at all. | Auto-retry: re-acquire and try again once. If that fails, you're in read-only — click the lock icon to force-acquire. |
| `LOCK_EXPIRED` | Your lock timed out before the heartbeat refreshed it. | Same as above. |
| `LOCK_HELD_BY_OTHER` | Someone else holds the lock. | You're in read-only. Force-acquire if appropriate. |
| `LOCK_LOST` | Internal: detected by the heartbeat watch. | The graph switched to read-only automatically. Force-acquire to continue. |
| `VERSION_CONFLICT` / `CONCURRENT_MODIFICATION` | Another save raced yours. | Reload the graph and re-apply your edits. |

Other errors (network, 5xx) show a generic *"Failed to save"* and stay in the **error** state until your next change triggers a retry.

## Related

- [Getting Around](/web/workbench/catalog-builder/getting-around/#status-row) — toolbar indicators reference.
- [Sub-graphs & Graph Links](/web/workbench/catalog-builder/sub-graphs-and-graph-links/) — switching between graphs and what happens to locks.
