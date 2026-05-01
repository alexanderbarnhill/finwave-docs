---
title: "Age Cohorts"
description: "Define population-specific age and sex bins to drive composition breakdowns and social network analyses"
sidebar:
  order: 9
---

## What you'll learn

- What age cohorts are and why every population defines its own
- How to author a cohort version, what each field means, and the order matters
- Why every cohort set must include an "Unknown" fallback
- Where cohorts are applied across finwave (composition, social network analysis, exports)
- How versioning works so historical analyses stay reproducible

## What is an age cohort?

An **age cohort** is a labelled bucket that groups individuals by sex and an age range. Cohorts are the building block finwave uses to ask population-level questions like:

- "What is the breakdown of mature females vs. juveniles in this population?"
- "Are calves more associated with reproductive females than with adult males?"
- "How has the sub-adult class changed over the last ten years?"

Different populations carry their cetological conventions with them — a sub-adult male killer whale and a sub-adult harbor porpoise are not the same biological category and should not be lumped together. Rather than ship a single platform-wide schema, finwave lets each population administrator define a cohort set that matches the literature and field practice for that species.

## Cohort fields

Each cohort row carries the following fields:

| Field | Required | Purpose |
|---|---|---|
| **Key** | yes | Stable internal identifier (e.g. `subadult_male`). Used in API payloads and analysis exports. Must be unique within a version. |
| **Label** | yes | Display name shown in charts, tooltips, and exports (e.g. "Sub-adult male"). |
| **Sex** | optional | Restrict matching to one sex, or leave as **Any** to match all. |
| **Min age (inclusive)** | optional | Animals with this estimated age or older match. Leave empty for "no lower bound". |
| **Max age (exclusive)** | optional | Animals with an estimated age below this match. Leave empty for "no upper bound". |
| **Description** | optional | Free-text notes — e.g. "Reproductive females aged 10+". Surfaced as tooltip help. |

Ages are evaluated in years.

## Order matters — first-match wins

Cohort matching is **ordered**. When finwave classifies an individual it walks the list top-to-bottom and assigns them to the first cohort whose sex + age range fits. That means overlapping or open-ended ranges are not a bug — they're how you express precedence.

A typical orca cohort set for one sex might look like:

| Order | Key | Sex | Min age | Max age | Notes |
|---|---|---|---|---|---|
| 1 | `calf` | any | – | 1 | Calves of either sex |
| 2 | `juvenile` | any | 1 | 10 | |
| 3 | `subadult_male` | Male | 10 | 18 | Male-only sub-adult range |
| 4 | `adult_male` | Male | 18 | – | All other males |
| 5 | `subadult_female` | Female | 10 | 12 | |
| 6 | `adult_female` | Female | 12 | – | |
| 7 | `unknown` | any | – | – | **Required** — see below |

You can drag rows in the editor to reorder them. The order is persisted with the version.

## The "Unknown" cohort is mandatory

Every cohort version **must** include exactly one cohort marked as **Unknown**. This is the fallback bucket that catches individuals whose sex or age cannot be determined from the catalog data. Without an unknown cohort, individuals with missing age information would silently drop out of every composition chart, biasing the result.

The unknown cohort has no age bounds and no sex filter — it is matched only when no other cohort applies. The editor exposes a dedicated **Add Unknown Cohort** button to make this explicit.

## Versioning — analyses stay reproducible

Cohort definitions evolve over time as research conventions shift. To prevent old analyses from quietly changing meaning when an admin redefines cohorts, finwave **never edits a cohort set in place**. Every save creates a new immutable version.

The Versions panel at the left of the page shows:

- **Active** version — the one applied to *new* analyses, exports, and dashboards
- All previous versions, ordered by creation date, with the author's note

To switch which version is applied, click the version row and choose **Activate**. The new version takes effect immediately for any subsequent analysis run; previously-saved analysis snapshots keep referencing the version they were generated against, so historical comparisons remain valid.

You can delete inactive versions, but the active version is locked — you must activate a different version first.

## Where cohorts are applied

| Feature | How cohorts are used |
|---|---|
| **Composition Breakdown** (Population Analysis) | Renders the population's age/sex pyramid. The active cohort version determines the bins; the chart legend shows each cohort's label and color. |
| **Social Network Analysis** (Population Analysis) | Optional cohort filter restricts SNA edges to associations between specific cohorts (e.g. "calf ↔ adult female" only). The dropdown lists the active version's cohorts. |
| **Catalog browsing** | The Individuals filter "by cohort" surfaces the active version's cohorts as a quick filter. |
| **Reports & exports** | Composition and SNA exports embed the cohort version ID and its label set so downstream consumers can reproduce the bins. |

Cohorts are population-scoped — they do not propagate to other populations even within the same organization.

## Authoring workflow

1. Open **Administration > Populations > [your population] > Settings > Age Cohorts**.
2. Click **New Version**. If an active version already exists, the editor pre-fills with its cohorts so you can edit incrementally rather than starting blank.
3. For each cohort, fill in the key, label, sex, and age bounds. Drag rows to set the matching priority.
4. Click **Add Unknown Cohort** if your draft does not already include one.
5. Add a short note describing what changed (e.g. "Split sub-adult class by sex"). The note is shown on the version row.
6. Click **Save New Version**. The new version is created in *inactive* state — your existing analyses keep using whatever was active before.
7. When you're ready, click **Activate** on the new version's row.

## Validation rules

The editor blocks saves that violate any of these rules:

- At least one cohort is required.
- Exactly one cohort must be marked **Unknown**.
- Every cohort needs a **key** and a **label**.
- Cohort keys must be unique within a version.
- For age-bounded cohorts, **min age must be less than max age**.

Validation errors are listed in a banner at the top of the editor before the save button is enabled.

## Common patterns

### Splitting an existing class by sex

You have a flat `subadult` class and want to track males and females separately for the next analysis.

1. Click **New Version** (pre-fills from active).
2. Edit the existing `subadult` row to be `subadult_female`, set sex = Female, and tighten its age range if needed.
3. **Add Cohort**, set key = `subadult_male`, sex = Male, mirror the age bounds.
4. Drag both rows so they land *before* any catch-all rows for their sex.
5. Save → activate.

### Backfilling an unknown cohort on a legacy population

You inherited a cohort set that pre-dates the unknown-required validation.

1. Click **New Version**.
2. Click **Add Unknown Cohort**.
3. Save. Save will succeed even with no other changes — the unknown-only diff is enough to satisfy validation.

## Related

- [Population Settings](/web/administration/population-settings/) — the parent page these cohorts live on
- Composition Breakdown analysis (in-app, **Population Settings > Analysis**)
- Social Network Analysis (in-app, **Population Settings > Analysis**)
