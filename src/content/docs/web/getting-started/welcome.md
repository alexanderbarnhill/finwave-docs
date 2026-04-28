---
title: "Welcome to finwave"
description: "What finwave is, who it's for, and key concepts"
sidebar:
  order: 1
---

## What you'll learn

- What finwave is and what problem it solves
- Who it's for
- The key concepts you'll see again and again
- Where to go next

## What is finwave?

finwave is a platform for **wildlife photo-identification** — the practice of recognising individual animals from photos of their natural markings (dorsal fin nicks, fluke patterns, body scars, eye-patches, and so on).

It is built around three things:

- **Catalogues of individuals** — every recognised animal in a population gets a profile with images, sighting history, and relationships to other individuals.
- **Encounters** — every time an observer photographs a group of animals in the field, the resulting set of photos is recorded as an *encounter*. Encounters are the raw observational record everything else flows from.
- **Identifications** — the link between an individual in the catalogue and a photo in an encounter. finwave uses ML models to propose identifications, but every identification is tracked with an [evidence tier](/web/core-concepts/evidence-tiers/) so you always know how strong the evidence is.

## Who is finwave for?

- **Researchers** running population studies (mark-recapture, social network, predator-prey, distribution).
- **Conservation organisations** maintaining long-running catalogues for a population.
- **Citizen-science contributors** submitting opportunistic encounters to a population they've been invited to.
- **Field photographers** who want their photos turned into useful long-term observational records.

If you're not sure which of these applies to you, **start anyway** — finwave's permission model adapts to your role inside each population.

## Key concepts at a glance

| Concept | One-line summary |
|---|---|
| [Population](/web/core-concepts/populations/) | A bounded study group (e.g. "Southern Resident Killer Whales"). Almost everything in finwave is scoped to a population. |
| [Encounter](/web/core-concepts/encounters/) | One field observation: photographer + location + date + photos. |
| [Individual](/web/core-concepts/individuals/) | A recognised animal with a profile, sighting history, and (optionally) social relationships. |
| [Annotation](/web/core-concepts/annotations/) | A bounding box on a photo identifying which animal is shown. |
| [Evidence tier](/web/core-concepts/evidence-tiers/) | How strong the evidence behind an identification is — Attested, ModelSuggested, ModelCorroborated, or Confirmed. |
| [Organisation](/web/core-concepts/organizations/) | The team or institute under which an encounter was submitted. Controls visibility of private data. |
| [Role](/web/core-concepts/roles-permissions/) | Your permission level inside a population — Novice, Expert, Professional, or Administrator. |

You don't need to memorise these now. They are linked from every page that uses them.

## What's next?

1. [Quick Start](/web/getting-started/quickstart/) — create an account, join a population, and submit your first encounter.
2. [Navigating the App](/web/getting-started/navigation/) — what each section of the sidebar does.
3. [Core Concepts](/web/core-concepts/encounters/) — read in order if you'd like a guided tour.

If you have a backlog of thousands of historical photos sitting in a folder or cloud bucket, also see the [Desktop Client](/desktop/getting-started/what-is-it/) — it is the right tool for bulk onboarding.
