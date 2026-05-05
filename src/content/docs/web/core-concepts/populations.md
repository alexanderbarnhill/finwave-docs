---
title: "Populations"
description: "What a population is, including species and regions"
sidebar:
  order: 3
quickRef:
  - "What it is: the primary scoping unit. Encounters, individuals, annotations, and analyses all belong to one population"
  - "Maps to a real-world study population: species + region + identified animals"
  - "Browse + join populations at /populations — every population on finwave is listed there with a state badge per card"
  - "Four states: Member (green) / Open to join (blue, one click) / Request to join (amber, admin approves) / Request pending (grey, awaiting review)"
  - "Don't 'Create a new population' to join an existing study — that creates a brand-new one. Use Join / Request to join on the existing card instead"
  - "Anyone can request to create one. System admin approval required. Requester becomes first population admin"
  - "Four population roles: Viewer, Expert, Professional, Administrator. Each inherits everything below"
  - "Users can be in multiple populations with different roles in each — no cross-pollination"
  - "ML models are trained and evaluated per-population — moving an encounter cross-population doesn't carry annotations the same way"
---

## What you'll learn

- What a population represents in finwave
- How populations are created and managed
- How population membership works
- How populations relate to organizations and encounters

## What is a population?

A population in finwave represents a defined group of individuals of a species that researchers study and track over time. It is the primary organizational unit for all data -- encounters, individuals, annotations, and analyses are all scoped to a population.

A population typically corresponds to a real-world study population: bottlenose dolphins in a specific bay, humpback whales in a breeding ground, or orcas in a particular region. The population defines the species, the geographic scope, and the catalog of known individuals.

## Creating a population

Any registered user can request to create a new population. The request includes basic information about the species, location, and purpose of the study. A system administrator reviews and approves the request.

Once approved, the requesting user becomes the population's first administrator and can begin configuring settings, inviting members, and uploading data.

## Joining a population

Every population on finwave is listed at **[/populations](/web/getting-started/welcome/)** -- the populations index page. Each card shows a **state badge** in the top-right corner indicating your current relationship to that population, plus a primary action button driven by that state.

### The four states

| Badge | What it means | What to click |
|---|---|---|
| 🟢 **Member** | You're already a member. | **Open population** — switches your workspace into it. |
| 🔵 **Open to join** | The population accepts public sign-ups; no admin approval needed. | **Join population** — one click and you're in. |
| 🟠 **Request to join** | Admin-gated: an administrator has to approve you. | **Request to join** — opens a short form for an optional message. |
| ⚪ **Request pending** | You've already submitted a request and it's awaiting review. | Disabled. Wait for the admin to respond. |

### What happens after submitting a request

For request-gated populations, the population's administrators receive a notification with your message. They review and either approve (you become a member with a Viewer role by default) or reject. You'll get an email either way. If you don't hear back within a few days, contact the population administrator directly — there's no auto-escalation.

:::caution[Don't create a new population to join an existing study]
Creating a population is for starting a **brand-new** tracked population (new species, new region, etc.). If the working group you want to contribute to already has a population on finwave, find their card on the `/populations` page and use **Join** or **Request to join** instead. Creating a duplicate splits the catalog and the encounters across two populations that researchers then have to merge.
:::

### Other ways to become a member

- **Direct invitation** — a population administrator adds you. You'll receive an email and the population shows up immediately under "Your populations" in the workspace switcher (top-left of the sidebar).
- **Role assignment** — when an administrator adds you (via invite or by approving a request), they pick a role: Viewer, Expert, Professional, or Administrator. See [Roles & Permissions](/web/core-concepts/roles-permissions/) for what each role can do.

### Switching between your populations

Once you're a member of one or more populations, the **workspace switcher** in the top-left corner of the app lets you flip between them. Almost every screen in finwave is scoped to the active population, so the switcher is the single most important navigation control.

## Population membership and roles

Every member of a population has one of four roles: Viewer, Expert, Professional, or Population Administrator. These roles determine what the member can see and do within the population. See [Roles & Permissions](/web/core-concepts/roles-permissions/) for the full breakdown.

## Population settings

Population administrators configure the population through the settings interface, which includes modules for general settings, individuals management, ML configuration, data access, public pages, community management, and more. See [Population Settings](/web/administration/population-settings/) for a full guide.

## How populations connect to the rest of finwave

- **Encounters** are submitted to a population and contain the raw photographic observations
- **Individuals** are cataloged within a population and identified across encounters
- **Organizations** contribute data to populations but are managed independently
- **Analyses** (discovery curves, composition breakdowns, capture histories, social networks) are all scoped to a single population
- **ML models** are trained and evaluated per population

:::note
A user can be a member of multiple populations, potentially with different roles in each. Your role in one population has no bearing on your role in another.
:::

## Related

- [Population Settings](/web/administration/population-settings/) -- configuring your population
- [Roles & Permissions](/web/core-concepts/roles-permissions/) -- what each role can do
- [Organizations](/web/core-concepts/organizations/) -- how organizations relate to populations
- [Encounters](/web/core-concepts/encounters/) -- the data that lives within populations
