---
title: "Merging Individuals"
description: "Combine two duplicate individual records into one, with conflict resolution and a full audit trail"
sidebar:
  order: 3
quickRef:
  - "When to use it: two individual records turn out to be the same animal — usually after later evidence reconciles two catalogs"
  - "Entry point: each individual's profile page → 'Merge Profile' button. 1-to-1 only, no multi-merge"
  - "Permission: Professional or Administrator on the population"
  - "You pick a TARGET individual to keep; the source individual is permanently removed after merge"
  - "Encounters, annotations, profile images, file contexts, catalog relationships, and public artifacts all transfer to the target"
  - "Identifier: target's identifier wins. Source's identifier is added to the target's alternate IDs"
  - "Conflict fields (sex, nickname, birth/death, age class) prompt you to pick which value to keep — defaults to target"
  - "Notes are concatenated with a separator marking where the source content was merged in"
  - "Full audit trail per merge: started/completed/failed states, record counts per type, source + target IDs, user, merge ID"
  - "Two-step confirmation prevents accidental merges. Not undoable — there's no rollback once committed"
---

## What you'll learn

- When merging is the right move (and when it isn't)
- How the merge picker, conflict resolution, and confirmation work
- What happens to each kind of related record (encounters, annotations, images, relationships)
- How merge audit logging works and what it records
- Permission gates and recovery options when something goes wrong

## When to merge

Merging is the right action when **two existing individual records turn out to be the same animal**. The classic case: a contributor cataloged a juvenile under one identifier, the population's primary catalog independently recognized it as the offspring of a known matriarch and gave it a different code, and only later did a confirmed match link the two.

Merging is **not** the right action when:

- An individual's identifier needs to change → use the [edit drawer](/web/features/individuals/browsing/#row-actions) on its profile.
- Two records refer to similar-looking but distinct animals → keep both records; if your evidence doesn't support a confident match, don't merge.
- You want to consolidate alternate IDs that already point at the same record → just edit the alternate IDs on the existing record.

## Entry point

Open the [profile page](/web/features/individuals/profiles/) of the individual you want to merge **away** (the *source*). Below the profile management section, you'll see a **Merge Profile** button.

The button only renders for users with **Professional** or **Administrator** roles in the population — it's a destructive operation and not exposed to lower roles.

<!-- screenshot: Profile page Merge Profile button below profile management -->

## The merge flow

Clicking **Merge Profile** expands an inline panel below the button:

1. **Pick the target.** A dropdown loads every individual in the population. Choose the one you want to keep — the *target*. The current animal you're on is the *source* and will be removed.
2. **Review conflicts.** If both records have a value for the same field (e.g. both have a nickname, or both have a birth year), each conflict appears as a radio choice: keep the source's value or keep the target's. The target's value is selected by default.
3. **Review the auto-fill summary.** Fields where only one side has a value (e.g. source has a birth year and target doesn't) are listed as "will fill" — they fill the gap on the target without asking. Fields where neither side has a value are skipped.
4. **Continue.** Click **Continue** to open the confirmation dialog.
5. **Confirm.** The dialog warns: "This will permanently move all data from {source} to {target} and delete {source}. This action cannot be undone." Click **Confirm Merge** to proceed.
6. **Wait briefly.** A spinner runs while the merge service walks every related record type. On success, you're redirected to the target's profile with a success toast. On failure, you stay on the source profile with an error notification.

:::caution
Merging is a one-way action. Once you click **Confirm Merge** the source individual is deleted and there is no built-in undo. If you commit a merge in error, the audit trail tells you what data moved where, but reversing it requires manual cleanup. The two-step confirmation exists for a reason — re-read the dialog before clicking through.
:::

## What transfers

| Record type | What happens |
|---|---|
| **EncounterAnimals** (sighting links) | All transferred. Deduplicated by `(encounter, evidenceTier)` so the target doesn't end up with two identical sightings on one encounter. Different evidence tiers are kept side-by-side. |
| **Annotations** | All transferred. Bounding boxes, side, category, confirmation state — every annotation that pointed at the source now points at the target. |
| **AnimalImages** (raw image attachments) | All transferred. |
| **AnimalProfileImages** (active profile-image picks) | Target wins on Side+Category collisions; source fills any gaps. So if the source had a Left dorsal fin profile image and the target didn't, the target gains it; if both had a Left dorsal fin pick, the target's pick stays. |
| **AnimalFileContexts** | All transferred. |
| **Catalog graph relationships** | All edges that pointed at the source are re-pointed at the target. Edges are deduplicated in both directions, so if the source and target shared an edge with the same partner, the result has one edge, not two. |
| **Public artifacts** | All transferred. |
| **Deferred notifications** | All transferred so nothing pending gets dropped. |

## How conflicts resolve per field

| Field | Behaviour |
|---|---|
| **Identifier** | Target wins. The source's identifier is appended to the target's alternate IDs so it remains searchable. |
| **Alternate IDs** | Union of both lists, plus the source's old primary identifier. The target's own primary identifier is removed from the alt list if it had been there. |
| **Sex** | If both have values and they conflict, you pick at merge time. If one is empty, the non-empty value fills the gap. |
| **Nickname** | Same rule as sex. |
| **Birth date / Death date** | Same rule as sex. |
| **Age class** | Same rule as sex. |
| **Notes** | Concatenated with a separator: `{target notes}\n\n--- Merged from {source identifier} ---\n{source notes}`. Both sides survive in the merged record. |
| **NeedsReview flag** | Logical OR — if either record was flagged for review, the merged record is too. |

The conflict-resolution UI shows you exactly what your choice will produce, so the radio selection plus the auto-fill summary is the full preview.

## The audit trail

Every merge writes a complete audit record via the animal-merge audit service. The record captures:

- **Source** and **target** animal IDs and identifiers
- The **user** who performed the merge (id and username)
- A unique **merge ID** for cross-referencing
- A **state machine**: Started → Completed (with summary) or Started → Failed (with exception details)
- **Per-type record counts** — how many EncounterAnimals, Annotations, AnimalImages, relationships, and public artifacts moved

If the merge fails partway through, the record is marked **Failed** with the exception, and the operation rolls back at the database level. You'll see an error notification in the UI and the source animal will remain intact.

If you ever need to investigate "where did Animal X's data go?", the audit trail is the source of truth.

## Notifications

Two notifications fire as part of the merge:

- **Post-merge** — a confirmation that the merge completed, including the source and target identifiers, sent through the standard notification system to the user who initiated the merge.
- **On failure** — an error notification with enough detail to either retry or escalate.

Both notifications respect each user's notification preferences.

## Permission gates

| Action | Required role |
|---|---|
| See the **Merge Profile** button on a profile | Professional or Administrator |
| Pick a target and run the merge | Professional or Administrator |
| Initiate a merge from the population's individual list | Same — but the entry point in the list is the row-actions menu's "View Profile" → then the merge button |

The backend enforces the same role check, so the UI's role gate isn't the only line of defence. A user without sufficient role calling the merge API directly is rejected with a permission error.

## Related

- [Individual Profiles](/web/features/individuals/profiles/) — where the merge button lives
- [Browsing Individuals](/web/features/individuals/browsing/) — finding the records you want to merge
- [Catalog Builder](/web/workbench/catalog-builder/) — relationships that survive a merge
- [Roles & Permissions](/web/core-concepts/roles-permissions/) — full role matrix
