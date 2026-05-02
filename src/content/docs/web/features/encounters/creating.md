---
title: "Creating Encounters"
description: "Upload images, enter metadata, and submit encounters"
sidebar:
  order: 2
quickRef:
  - "Required fields: date (single day, no future dates), location (name + GPS), and at least one image"
  - "Supported image formats: JPEG, PNG, GIF, TIFF, WebP. Duplicates auto-rejected by name + size"
  - "Locations are deduplicated by name + coordinates within ~11m — agree on naming conventions with your team"
  - "Org association is optional and independent of license. 'Organization only' license requires at least one org selected"
  - "License levels: Public (CC-NC), Public + Attribution (contact required), or Organization-only"
  - "Predation events: Yes/No flag plus optional prey targets (species, count, location, time)"
  - "Mark encounter completeness honestly — overstating it biases mark-recapture abundance estimates downward"
  - "Admins/professionals can submit on behalf of another user (existing or new contributor)"
  - "After submit: ML runs detection → classification → identification automatically; you can view the encounter while it processes"
  - "IPTC caption tags can auto-create attested IDs if the population has auto-tagging enabled"
---

## What you'll learn

- What information is required to create an encounter
- What each form field means and how it affects your data downstream
- How licensing and organization association work together
- What happens to your data after you submit

## The submission form

The encounter submission form is organized into five sections: **required information**, **organization association**, **additional details**, **consistency and coverage**, and **rights and licensing**. A summary card and confirmation checkbox appear at the bottom before you can submit.

## Required information

Every encounter requires exactly three things. The submit button remains disabled until all three are provided.

### Date

Select the date the encounter occurred using the date picker. Future dates are not allowed.

The date becomes part of the encounter's identity. It is used throughout finwave for chronological ordering, seasonal filtering, and time-series analyses such as discovery curves and capture history exports. An encounter is confined to a single day -- observations of the same group on a later date are recorded as a separate encounter.

<!-- screenshot: Date picker showing a calendar for selecting the encounter date -->

### Location

You specify the encounter location by providing a **name** and **GPS coordinates**. Both are required.

**Pin drop** -- click on the map at the location where the encounter took place. The latitude and longitude are extracted automatically.

**Manual coordinates** -- enter coordinates directly in Degrees Decimal Minutes (DDM) format if you have precise GPS data from the field.

**Location name** -- a free-text label for the location (e.g., "Salish Sea", "Haro Strait"). If you have used this location before, the name will auto-complete from previous entries.

finwave deduplicates locations behind the scenes: if a location with the same name and coordinates (within ~11 meters) already exists, the existing record is reused rather than creating a duplicate. This keeps your location list clean for filtering.

<!-- screenshot: Location selection showing both the map pin-drop and coordinate entry options -->

:::tip
Consistent location naming makes filtering much more useful. Agree on standard location names with your team before your first season of data entry.
:::

### Images

Upload the photographs from the encounter. Supported formats are **JPEG**, **PNG**, **GIF**, **TIFF**, and **WebP**. You can drag and drop files onto the upload area or click to browse. Duplicate files (same name and size) are automatically rejected.

At least one image is required. There is no upper limit on the number of images, but very large uploads may take time depending on your connection.

After submission, finwave's ML pipeline processes each image through three stages: **detection** (finding identifiable features like dorsal fins), **classification** (determining body side), and **identification** (matching against known individuals). You do not need to do anything to trigger this -- it happens automatically.

## Organization association

Associate the encounter with one or more organizations you belong to. This section is optional but directly affects who can see the encounter.

If you select organizations, anyone in those organizations can see this encounter. If you later choose "organization only" licensing, **at least one organization must be selected** -- otherwise there would be no one to share the data with.

The "Public" organization is never shown in the dropdown. It is a system-level construct and cannot be manually assigned.

If an organization has an active research permit, it is displayed next to the organization name. The permit is recorded on the encounter for compliance tracking.

:::note
Organization association is independent of licensing. You can associate an encounter with an organization and still choose a public license. In that case, both the public and organization members can see the data.
:::

## Additional details

These fields are optional but improve the research value of your data.

### Predation event

Toggle **Yes** if the encounter involved a predation event. When enabled, you can record one or more **prey targets**, each with:

- **Prey species** -- selected from the population's configured prey list (set by your administrator in population settings)
- **Count** -- how many prey were observed (defaults to 1)
- **Location** -- optionally set a separate GPS location for where the predation occurred, if different from the encounter location
- **Time** -- optionally record when the predation was observed, in 15-minute increments

Prey targets can be reordered by dragging. The order is preserved for display and export.

Predation data feeds into behavioral and ecological analyses. It is displayed on the encounter detail page and can be filtered for in encounter searches. If your population studies predator-prey dynamics, recording this consistently is valuable.

### Observed behaviors

Select from the population-specific behavior list defined by your administrator. Behaviors are tags -- you can select multiple. They appear on the encounter detail page and are available as filters in encounter search.

Common examples include foraging, resting, traveling, socializing, and milling, but every population defines its own list. If you do not see a behavior you need, ask your population administrator to add it.

### Encounter notes

A rich-text field for anything else worth recording -- field conditions, water temperature, group composition, equipment used, or notable events. Notes are stored as HTML and displayed on the encounter detail page. There is no strict length limit.

## Consistency and coverage

These two questions are survey-style indicators that help researchers assess the quality and completeness of your data. They are optional but affect how your encounter is interpreted in analyses.

### Location precision

**"Is the location you've chosen the exact coordinates of the encounter?"**

- **Yes, exact** -- the GPS coordinates represent the actual location of the encounter (e.g., from a handheld GPS or boat GPS log)
- **No, approximate** -- the coordinates are an approximation (e.g., a general area selected on the map from memory)

This flag is displayed on the encounter detail page as "exact" or "approximate" and can influence how researchers weight location data in spatial analyses.

### Encounter completeness

**"Does this encounter include images of every individual present?"**

- **Yes** -- all individuals in the group were photographed
- **No** -- some individuals were present but not photographed (partial coverage)
- **Not sure** -- you cannot determine whether the coverage was complete

This is critical for mark-recapture analyses. A "complete" encounter means the entire group was sampled, which affects capture probability calculations. If you are unsure, select "Not sure" -- overstating completeness produces worse statistical results than admitting uncertainty.

:::caution
Encounter completeness directly affects the validity of population size estimates derived from capture history data. Mark-recapture models assume that within a "complete" encounter, every individual present had an equal chance of being photographed. If you mark encounters as complete when they are not, abundance estimates will be biased downward.
:::

## Rights and licensing

Licensing determines who can see and use your data. This section is required -- you must select a license before submitting.

### Public visibility

**"Can your data be publicly viewed?"**

- **Yes, public** -- any authenticated population member can see your encounter. The data is protected by a **Creative Commons Non-Commercial** license.
- **No, organization only** -- only members of the organizations you selected above can see the encounter. **You must have at least one organization selected** for this option to be valid.

### Attribution requirement (public only)

If you chose public visibility, a follow-up question appears:

**"Should you be contacted before your data is used?"**

- **No, no contact needed** -- your data may be used for conservation, science, and education without contacting you. This is the most permissive option and maximizes the reach of your contribution.
- **Yes, contact me** -- anyone wishing to use your data beyond viewing must contact you first. This provides more control but may reduce how often your data is cited or used in collaborative studies.

### How the three license levels work

| Public? | Contact required? | License level | Who can see it |
|---------|-------------------|---------------|----------------|
| Yes | No | Public (CC-NC) | All population members |
| Yes | Yes | Public + Attribution | All population members; usage requires contacting you |
| No | N/A | Organization only | Only members of selected organizations |

The selected license is displayed in the summary with its Creative Commons logo. The license is applied to the encounter and all its images. It can be changed later from the encounter edit page.

### Rights confirmation

You must check the confirmation box before submitting:

> *"I confirm that I have the legal right to submit these images and data, and I agree to the selected license terms."*

This is a legal acknowledgment. Do not submit data you do not own or have authorization to share.

## Submission summary

Before submitting, review the summary card at the bottom of the form. It shows all the information you have entered: photographer, date, location (with precision tag), image count, completeness, organizations, predation targets, behaviors, notes, and license.

If anything shows **"Not set"** in red, that field is missing and must be completed.

## Submitting on behalf of another user

If you are a **population administrator** or **professional**, an additional section appears at the top of the form allowing you to submit encounters on behalf of another contributor.

You can:
- **Search for an existing user** by name
- **Create a new contributor** by entering their name and email

If the contributor does not yet have a finwave account, one is created automatically. You can optionally send them a welcome email. The encounter will be credited to the selected contributor, not to you.

This is useful for onboarding historical data from field photographers who are not yet on the platform, or for centralizing data entry when contributors prefer to hand off their images.

## What happens after submission

### Step 1: Encounter saved

The encounter record is created with all metadata, organization links, behavioral observations, and predation targets in a single database transaction.

### Step 2: Image upload

Images are uploaded individually with per-file progress tracking. If any upload fails, you can **retry** or **skip and continue**. Failed uploads do not prevent the encounter from being created -- you can add missing images later from the encounter edit page.

### Step 3: ML pipeline triggered

Once all images are uploaded, finwave notifies the ML pipeline. Processing proceeds through three stages:

1. **Detection** -- the model scans each image for identifiable features (typically dorsal fins). Detected features become bounding-box annotations.
2. **Classification** -- each detected feature is classified by body side (left, right, or unknown).
3. **Identification** -- detected features are compared against the population's catalog of known individuals. The model suggests possible matches ranked by confidence.

You can monitor the analysis status from the encounter overview page. When analysis is complete, the encounter shows a green status indicator and you can review results in the [annotator](/web/features/annotator/overview/).

:::note
If your population has auto-tagging enabled and your images contain IPTC caption metadata with known individual identifiers, finwave can automatically assign identities during detection. This is useful for onboarding historical data where identifications were already recorded in image metadata.
:::

### Step 4: View encounter

After submission completes, click **View Encounter** to go to the encounter detail page. Images may still be processing in the background -- the ML pipeline runs asynchronously and results appear as they become available.

## Related

- [Encounters](/web/core-concepts/encounters/) -- what encounters represent in finwave
- [Browsing Encounters](/web/features/encounters/browsing/) -- finding and filtering encounters
- [Editing Encounters](/web/features/encounters/editing/) -- modifying encounter details after submission
- [Gallery Management](/web/features/encounters/gallery-management/) -- bulk image management after submission
- [Annotator Overview](/web/features/annotator/overview/) -- reviewing and confirming ML results
- [Roles & Permissions](/web/core-concepts/roles-permissions/) -- who can submit on behalf of others
- [Organizations](/web/core-concepts/organizations/) -- how organization membership affects data visibility
