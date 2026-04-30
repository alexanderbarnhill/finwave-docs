---
title: "Encounters"
description: "What an encounter is and how images, metadata, and IDs relate"
sidebar:
  order: 1
---

## What you'll learn

- What an encounter represents in finwave
- What metadata is associated with an encounter
- How encounters relate to individuals and annotations
- How encounter status is tracked

## What is an encounter?

An encounter is a collection of photographs from a single observation event at a specific time and location. It may be defined as the period starting and ending when a group of individuals were first and last photographed by an individual photographer on a given day. It is the fundamental unit of data in finwave -- everything else (annotations, identifications, individual sighting histories) flows from encounters.

Each encounter represents a single bout of field observations. A whale-watching trip or research expedition that produces 200 photos of the same group of whales on one date is one encounter. If the same excursion photographs another non-interacting group of whales at a different location on the same day, that is a different encounter. Likewise, if the same group is photographed again later in the day after individuals have joined or left, that later observation is a separate encounter.

:::note
Encounters from different photographers that include the same group of whales on the same day may be merged outside of finwave prior to some formal analyses.
:::

## Encounter metadata

Every encounter carries the following metadata:

- **Date** -- when the encounter took place
- **Location** -- where the encounter took place (name and coordinates)
- **Photographer** -- who captured the images
- **Images** -- the photographs associated with the encounter
- **Organization** -- optionally, the organization under which the encounter was submitted

Additional optional metadata includes behavioral observations, predation event flags, prey information, and notes.

## Status indicators

Encounters display status indicators that provide a quick visual summary.

### Analysis status

The analysis of the encounter is performed by human experts and supported by machine learning tools. The various phases of the analysis process are as follows:

- **Complete (green)** -- analysis has finished and results are available
- **In progress (yellow)** -- analysis is currently running
- **New (red)** -- the encounter has been uploaded but analysis has not started

### Encounter completeness

- **Complete** -- all individuals present during the encounter were photographed
- **Incomplete** -- not all individuals present were photographed
- **Unknown** -- it is not known whether all individuals were photographed

This distinction matters for population analysis. Complete encounters are more valuable for mark-recapture models because absence from a complete encounter is informative (the individual was genuinely not present), while absence from an incomplete encounter is ambiguous.

:::note[Experts may revise completeness after the fact]
The submitting photographer makes the initial call, but completeness is not necessarily fixed at submission. An **expert** or **administrator** with knowledge of the population can update the completeness flag later — for example, after recognising regular associates of the individuals already identified in the encounter and concluding the rest of the social group must have been present (or absent). The completeness flag should reflect the best current understanding, not just the photographer's first impression in the field.

If you change a completeness value after submission, prefer adding a comment on the encounter explaining the reasoning, so downstream analysts can see why the flag was revised.
:::

### Predation events

An encounter can be flagged as a predation event, which adds a predation icon to the encounter card. This is used to track predation observations as part of behavioral and ecological monitoring.

### License and visibility

Each encounter has visibility and license settings:

- **Public / Creative Commons** -- shared publicly with a Creative Commons license
- **Non-commercial** -- available for non-commercial use only
- **Attribution required** -- the photographer must be credited
- **Private** -- visible only to members of the submitting organization

## How encounters connect to individuals

When images in an encounter are processed -- either by finwave's ML models or by human annotators -- annotations are placed on identified features (typically dorsal fins). Each annotation can be linked to an individual in the population catalog. This creates a sighting record: individual X was seen in encounter Y.

A single encounter can contain sightings of multiple individuals. An individual can appear in many encounters over time. This many-to-many relationship between encounters and individuals is what makes population-level analyses possible.

:::note
Encounters are the raw observational record. They are immutable in the sense that they represent something that happened in the field. Annotations and identifications are the interpretive layer that sits on top of encounters and can be updated as knowledge improves.
:::

## Related

- [Creating Encounters](/web/features/encounters/creating/) -- how to upload images and submit encounters
- [Browsing Encounters](/web/features/encounters/browsing/) -- searching, filtering, and viewing encounters
- [Annotations](/web/core-concepts/annotations/) -- what annotations are and how they link encounters to individuals
- [Individuals](/web/core-concepts/individuals/) -- individual profiles and sighting histories
