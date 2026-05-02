---
title: "Populations"
description: "What a population is, including species and regions"
sidebar:
  order: 3
quickRef:
  - "What it is: the primary scoping unit. Encounters, individuals, annotations, and analyses all belong to one population"
  - "Maps to a real-world study population: species + region + identified animals"
  - "Anyone can request to create one. System admin approval required. Requester becomes first population admin"
  - "Join policies: Open (anyone joins), Request-based (admin approves), or invitation-only via admin"
  - "Four population roles: Viewer, Expert, Professional, Administrator. Each inherits everything below"
  - "Independent from organizations — orgs contribute data but population membership is its own thing"
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

Populations can be configured with different join policies:

- **Open** -- any user can join directly
- **Request-based** -- users submit a join request that must be approved by a population administrator

Population administrators can also directly invite users and assign them a role.

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
