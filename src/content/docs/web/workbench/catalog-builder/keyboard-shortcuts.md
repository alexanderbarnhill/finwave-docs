---
title: "Keyboard Shortcuts"
description: "Every keyboard shortcut the Catalog Builder responds to"
sidebar:
  order: 10
quickRef:
  - "Shortcuts only fire when no text input is focused — typing in inspector/find/chip-grid uses normal text editing"
  - "Editing: Ctrl/Cmd+Z undo, Ctrl/Cmd+Shift+Z redo, Ctrl/Cmd+S save, Delete to remove selection"
  - "Edges: E toggles edge-draw mode, Shift+E starts edge from selection, Esc cancels"
  - "View: + zoom in, - zoom out, O fit all, L fit largest connected component, D focus deceased"
  - "Navigation: Ctrl/Cmd+K opens graph quick-switcher, Ctrl/Cmd+F or / opens find-on-canvas"
  - "Browser shortcuts (Ctrl+S, Ctrl+F) are intercepted only when canvas is focused — text inputs still get the browser default"
  - "Ctrl and Cmd are interchangeable across platforms (Cmd on macOS)"
---

Shortcuts only fire when no text input is focused. Typing in the inspector, the find overlay, the chip-grid alt-IDs editor, or any other text field uses normal text editing — your shortcut won't trigger.

`Ctrl` and `Cmd` are interchangeable (`Cmd` on macOS).

## Editing

| Shortcut | Action |
|---|---|
| `Ctrl/Cmd+Z` | Undo |
| `Ctrl/Cmd+Shift+Z` | Redo |
| `Ctrl/Cmd+S` | Save now (creates the API record on first save) |
| `Delete` | Delete the selected node(s) and edge(s) |
| `Esc` | Cancel edge-draw mode if active; otherwise close the right panel if focused |

## Drawing edges

| Shortcut | Action |
|---|---|
| `E` | Toggle edge-draw mode |
| `Shift+E` | Start an edge from the currently-selected node |
| `Esc` | Cancel edge-draw |

See [Relationships & Edges](/web/workbench/catalog-builder/relationships/) for the three concrete paths.

## Zoom and view

| Shortcut | Action |
|---|---|
| `+` or `=` | Zoom in |
| `-` | Zoom out |
| `O` | Fit all nodes |
| `L` | Fit largest connected component |
| `D` | Focus deceased nodes (or fit all if none are deceased) |

## Navigation

| Shortcut | Action |
|---|---|
| `Ctrl/Cmd+K` | Open the graph quick-switcher |
| `Ctrl/Cmd+F` | Open the find-on-canvas overlay |
| `/` | Open the find-on-canvas overlay (alternative) |

## Notes

- The toolbar's redo button advertises `Ctrl+Y` in its tooltip, but the keyboard listener only responds to `Ctrl/Cmd+Shift+Z`. Use either the button or `Ctrl/Cmd+Shift+Z`.
- Shortcuts are listed alongside their actions in the toolbar tooltips and menu items, e.g. *"Connect nodes (E)"*, *"Fit largest (L)"*.
- Some shortcuts overlap with browser shortcuts (`Ctrl+S`, `Ctrl+F`). The Catalog Builder calls `preventDefault` on the browser default so its own behaviour takes effect — but only when a text input is **not** focused, so the browser's Find dialog will still come up if your cursor is in (say) the inspector's note field.
