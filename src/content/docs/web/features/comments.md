---
title: "Comments"
description: "Threaded comments on encounters with rich-text content"
sidebar:
  order: 6
quickRef:
  - "Comments live on encounters — there's a comments section on every encounter page"
  - "Rich-text editor: CKEditor 5 ClassicEditor. Saves the editor's HTML directly as the comment content"
  - "Posting requires being signed in. The component checks via the comment service's getUser endpoint"
  - "Three per-comment actions: Reply (any signed-in user), Edit and Delete (only on comments you authored — gated by isLoggedUserComment)"
  - "Replies build a thread: the new comment's responseID is set to the parent comment's id"
  - "Editing reopens the same editor pre-filled with the existing content; save calls updateComment"
  - "Deleting sets the comment's deleted flag and calls deleteComment; deleted comments don't render"
  - "Recent comments dashboard widget aggregates the most recent comments — separate from the per-encounter view"
---

## What you'll learn

- Where comments appear and what they store
- How the rich-text editor works and what gets saved
- The actions available per comment and who can do what
- How replies build a thread

## Where comments appear

Comments are scoped to encounters. The encounter detail page renders the comments section as a child component (`<app-encounter-comments>`); there is no comments surface on individuals, populations, or anywhere else in the current code. A "recent comments" widget on the dashboard lists the most recent activity across the populations you have access to, but it's a feed, not a place to post.

## The editor

Comments are authored in **CKEditor 5 ClassicEditor**. When you click into the editor, type your comment, and submit, the HTML output of the editor is what gets saved as the comment content — markdown is not used. The editor's full toolbar is available: bold, italic, lists, links, and the rest of the ClassicEditor defaults.

The displayed content is rendered with `[innerHTML]` binding on the comment template. Whatever the editor produces is what readers see.

## Posting

To post a top-level comment on an encounter, you need to be signed in. The encounter-comments component calls the comment service's `getUser` endpoint at init; if it succeeds, an editor opens at the bottom of the comments section when you click the "add comment" affordance. If it fails (no auth), the editor doesn't surface.

A `postDateTime` is set client-side at submit and sent with the comment. The server's record is what eventually drives the display, but the client-side timestamp is what's submitted in the create request.

## Per-comment actions

Each rendered comment has its own toolbar. Visibility depends on whether you authored that specific comment:

| Action | When it shows | What it does |
|---|---|---|
| **Reply** | Always (for signed-in viewers) | Opens an editor below the comment. On submit, creates a new comment whose `responseID` is the parent comment's id, threading them together. |
| **Edit** | Only if `isLoggedUserComment` is true (you authored this comment) | Opens the editor pre-filled with the existing content. Save calls the comment service's `updateComment` endpoint with the comment id and your new content. The local copy's `content` updates immediately. |
| **Delete** | Only if `isLoggedUserComment` is true | Calls `deleteComment` with the comment id. The component flips the comment's local `deleted` flag, hiding it from the rendered tree. |

There is no separate role-based override in the client component — Edit and Delete render only for the comment's author. Anything else (admin moderation, etc.) would happen server-side.

## Threads

Threading is purely structural. A comment is a reply when its `responseID` points at another comment's id. The encounter-comments component builds a tree from the flat list and renders nested `<app-comment-template>` instances, passing `currentUserID` and `currentUserImage` down so the per-comment toolbars know whose comment they're rendering.

There's no explicit depth limit visible in the component — replies can chain as deep as the server returns.

## What isn't here

The current implementation doesn't include:

- **Likes / upvotes / reactions** — the template has commented-out placeholders (`like dislike comment follow ...`) but no active UI
- **@mentions or notifications on mention** — not present in the comment editor or the post payload
- **Attachments** — text only, no file upload

If a future release adds any of these, this page will need an update.

## Related

- [Encounters](/web/core-concepts/encounters/) — what encounters are
- [Browsing Encounters](/web/features/encounters/browsing/) — how to find an encounter to comment on
- [Editing Encounters](/web/features/encounters/editing/) — admin/professional metadata edits, separate from comments
