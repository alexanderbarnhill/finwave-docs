---
title: "Navigating the App"
description: "App layout, sidebar, top navigation, and user menu"
sidebar:
  order: 3
quickRef:
  - "Four regions: top bar (population switcher, search, notifications, account), sidebar, main content, contextual side panels"
  - "Population switcher in top-left is the most important control — switching it changes everything"
  - "If a screen looks empty or a feature is missing: check the population switcher first"
  - "Standard sidebar sections: Encounters, Individuals, Confirmation Queue, Workbench (Pro), ML Center (admin), Administration (admin), Troubleshooting"
  - "Sidebar contents adapt to your role + population's plan — sections you can't access are hidden"
  - "Top-bar search is scoped to the active population: encounters, individuals, locations"
  - "Account menu: profile, notification preferences, sign out"
  - "Many screens use right-side panels (encounter detail, annotator, individual profile) instead of full-page navigation"
---

## What you'll learn

- The four regions of the finwave web app
- What the population switcher does and why it's the most important control in the UI
- Which sidebar sections you'll use most often
- Where to find your account, organisations, and population administration settings

## The four regions

```
┌─────────────────────────────────────────────────────────────┐
│  Top bar:  population switcher · search · notifications · me │
├──────────────┬──────────────────────────────────────────────┤
│              │                                              │
│   Sidebar    │                Main content                  │
│              │                                              │
│              │                                              │
└──────────────┴──────────────────────────────────────────────┘
```

- **Top bar** — population switcher, global search, notifications, account menu.
- **Sidebar** — the main navigation tree. Contents change depending on the active population and your role.
- **Main content** — whatever screen you're currently on.
- **Right-side panels** — many screens (encounter detail, annotator, individual profile) open contextual side panels rather than navigating to a new page.

## The population switcher

In the top-left, the **population switcher** shows the active population. Almost every screen in finwave is scoped to a single active population — your encounters, the catalogue you see, the analyses you can run, and the permissions you have.

If you belong to more than one population, you change context here. The sidebar updates to reflect the new population's available features.

:::tip
If a screen looks empty or a feature appears missing, check the population switcher first. You may be looking at a different population than you think.
:::

## Sidebar sections

The exact sidebar depends on your role in the active population, but the standard layout is:

### Encounters
Submit, browse, and manage encounters. This is where most contributors spend their time.

- **New Encounter** — the submission form.
- **My Submissions** — everything you've submitted, with processing status. See [Submissions](/web/features/submissions/).
- **Browse Encounters** — search and filter all encounters in the population you have permission to see.

### Individuals
The catalogue of recognised animals in the population.

- **Browse** — paginated list with quick filters (status, side, ID).
- **Profile** — full sighting history, image collection, social relationships, and identifying marks for one individual.

### Confirmation Queue
The work queue of identifications waiting for human review. Identifications at every [evidence tier](/web/core-concepts/evidence-tiers/) below "Confirmed" appear here, ordered so the easiest items come first. Most experts and professionals work through this regularly.

### Workbench (Pro)
Advanced tools — Catalog Builder, Review Queue, and population analyses (social network, capture history, discovery curves, etc.). Access is controlled per-role by your administrator.

### ML Center (Admin)
Configure which models run on your population and review their performance metrics.

### Administration (Admin)
Population-level settings — members, roles, organisation verification, sync settings, behaviours and prey list, ESI sources.

### Troubleshooting
Self-service help for common issues like upload failures and ML errors.

## The account menu

Click your avatar in the top-right for:

- **Profile** — your name, email, and per-organisation membership.
- **Notifications preferences** — which events email you.
- **Sign out**.

## Search

The search box in the top bar searches across **encounters, individuals, and locations** within the active population. Use it as the fastest way to jump to a known record.

## What's next?

- [Core Concepts → Encounters](/web/core-concepts/encounters/) — start the guided concept tour.
- [Quick Start](/web/getting-started/quickstart/) — if you haven't submitted your first encounter yet.
- [Roles & Permissions](/web/core-concepts/roles-permissions/) — what each role can and can't do, and why some sidebar sections are hidden.
