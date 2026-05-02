---
title: "Editing Encounters"
description: "Edit encounter details, add or remove images"
sidebar:
  order: 3
quickRef:
  - "Edit drawer slides in from the right on the encounter page — not a separate route"
  - "Editable like creation: date, location, description, behaviors, completeness, predation/prey, license, organizations"
  - "Edit-only fields: analyst notes (internal), submission user reassignment, population transfer (admin only)"
  - "Permission gates: edit at all = encounter owner; reassign user / change population = admin or professional"
  - "Reassigning the photographer can optionally email the new submitter via the 'inform user' flag"
  - "Population transfer fires a backend queue job after a confirmation dialog — encounters move populations asynchronously"
  - "ML side effects: setting status → Finished triggers cleanupPredictions(). Annotations are NOT auto-rerun on metadata edits"
  - "Image add/remove: separate from the drawer — use Add Images dialog or Edit Gallery (bulk delete + dedup + side-set)"
  - "Encounter split mode: opens the same drawer in 'split' mode to carve a subset of photos into a new encounter"
---

## What you'll learn

- Where the encounter edit experience lives
- Which fields are editable and which require admin or professional rights
- How edits interact with annotations, ML, and the encounter's status
- The split flow for partitioning one encounter into two

## Where editing happens

Editing is a **right-side slide-over drawer**, not a separate page. From any encounter you have permission to modify, open the encounter detail view and trigger **Edit** from the action panel. The drawer slides in from the right with the encounter pre-loaded; the gallery and metadata behind it remain visible so you keep your context.

Image management — adding, deleting, finding duplicates, setting fin sides — is a separate surface. See [Gallery Management](/web/features/encounters/gallery-management/). The edit drawer is for metadata; the gallery view is for photos.

## Editable fields

These mirror the [creation form](/web/features/encounters/creating/) and are available to anyone who can edit the encounter:

- **Date** — full date picker
- **Location** — opens the location picker dialog; you can reassign to a different existing location or create a new one
- **Description** — encounter notes shown publicly with the encounter (10,000-character limit)
- **Behaviors** — multi-select from the population's behavior list
- **Completeness** — Complete / Incomplete / Unknown radio
- **Predation event** — flag plus optional prey targets (species, count, location, time)
- **License** — change the encounter's data-limitation license

:::tip
Completeness is editable post-submission for a reason. Experts who later recognise the social context of an encounter (e.g. that a known matriline must have been present) should revise the flag and add a comment explaining the reasoning. See [Encounters](/web/core-concepts/encounters/) for why this matters for mark-recapture analyses.
:::

### Admin- and professional-only fields

These render only when your role grants edit access beyond the standard owner level:

- **Submission user** — reassign the encounter to a different photographer. Optionally check **Inform user** to email the new submitter when the change is saved. Useful when an encounter was originally submitted on someone's behalf and the real photographer's account becomes available later.
- **Organizations** — multi-select; controls who can see the encounter when the license is organisation-restricted.
- **Analyst notes** — separate field from Description; intended for internal commentary that shouldn't appear in public-facing views. 10,000-character limit.
- **Population transfer** — move the encounter to another population entirely. This fires a backend queue job after a warning dialog; the move runs asynchronously so the UI doesn't block.

## Permission rules

| Capability | Required role |
|---|---|
| Edit standard fields | Encounter owner, Professional, or Administrator |
| Reassign submission user | Professional or Administrator |
| Change organizations | Professional or Administrator |
| Move to another population | Professional or Administrator |
| Edit gallery / add or remove images | See [Gallery Management](/web/features/encounters/gallery-management/) |

The drawer hides controls you don't have access to rather than showing them disabled, so the form you see is your effective permission set.

## How edits interact with ML and annotations

Metadata edits do **not** automatically re-run the ML pipeline. Changing the date or location doesn't invalidate any existing annotations, and the model isn't asked to re-evaluate the images.

Two related actions sit nearby and *do* affect ML state:

- **Setting status to Finished** triggers `cleanupPredictions` — extraneous unconfirmed model predictions are removed once the encounter is considered done. This is a one-way transition tied to the status change, not to general edits.
- **Re-queue annotations** is available on the encounter action panel below the drawer (`Re-queue unfinished` and `Re-queue all`). These force the pipeline to re-process — useful after gallery changes or model upgrades. They are not in the edit drawer because they're a workflow action, not a metadata edit.

If an encounter was merged or split, the **Re-associate** action reconciles its annotations against the new individual layout. This is also outside the edit drawer.

## Splitting an encounter

The same drawer reopens in **split mode** when you start a split from the gallery. Split mode lets you select a subset of photos and carve them into a new encounter — useful when a single submission accidentally bundled two distinct observations (e.g. two non-interacting groups photographed on the same day).

The flow:

1. From the gallery, choose **Split encounter**.
2. The drawer opens with the parent encounter's metadata pre-filled and a photo picker.
3. Pick the photos that belong to the new (child) encounter.
4. Adjust any metadata that should differ for the child (date, location, behaviors).
5. Save. The child encounter is created; the picked photos and any of their confirmed annotations move with it.

The parent encounter keeps its remaining photos and metadata. ML annotations on photos that moved travel with their images.

## Side effects when you save

- **Submission-user change with "Inform user"** sends an email notification to the newly assigned photographer.
- **Status change to Finished** runs prediction cleanup (described above) and fires the encounter-status-change notification.
- **Population transfer** queues a backend migration job; you'll see the encounter disappear from the current population's lists once the job completes.
- **Standard edits** are persisted via the encounter update API and logged for audit.

The drawer also surfaces a **Delete** action for administrators, in a clearly-marked danger zone. Deleting an encounter is permanent and removes its annotations from the population's sighting record.

## Related

- [Creating Encounters](/web/features/encounters/creating/) — the original submission form
- [Gallery Management](/web/features/encounters/gallery-management/) — bulk image actions in edit mode
- [Encounters](/web/core-concepts/encounters/) — what encounters represent
- [Roles & Permissions](/web/core-concepts/roles-permissions/) — who can edit what
