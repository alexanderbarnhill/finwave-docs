---
title: "Individuals"
description: "Individual profiles, ID codes, and life history"
sidebar:
  order: 2
quickRef:
  - "What it is: a single identified animal in the population catalog — the unit photo-ID research builds toward"
  - "Required: a primary identifier (e.g. HW-001). Everything else (sex, birth year, nickname, profile image) is optional"
  - "Alternative IDs let you bridge naming conventions across research groups — displayed as 'Main / Alt1 / Alt2'"
  - "Provisional animals: when a non-admin creates a new ID during annotation, it queues for admin approval before joining the catalog"
  - "Sighting history accumulates from confirmed annotations on encounter images"
  - "Only Professionals or Administrators can set profile images"
  - "Sighting history is the foundation for analyses (discovery curves, capture history, composition, etc.)"
---

## What you'll learn

- What an individual represents in finwave
- How individuals are identified and cataloged
- What attributes are tracked for each individual
- How alternative IDs work

## What is an individual?

An individual in finwave represents a single identified animal in a population's catalog. Each individual has a unique identifier and a profile that accumulates sighting history, demographic data, and photographs over time.

Individuals are the core of photo-identification research. The goal of the annotation workflow is to link observations (annotations on encounter photos) to individuals, building up each animal's sighting history.

## Individual attributes

Each individual can have the following attributes:

- **Identifier** -- the primary ID code used by the research team (e.g., "HW-001", "DN-042")
- **Alternative IDs** -- additional identifiers used by other organizations or studies, displayed as "Main ID / Alt ID 1 / Alt ID 2"
- **Nickname** -- an optional friendly name
- **Sex** -- male, female, or unknown
- **Age** -- derived, based on known year of birth
- **Birth year** -- if known
- **Estimated year of death** -- if known
- **Notes** -- free-text notes
- **Profile image** -- a representative photograph (set by Professionals or Administrators)

## Creating individuals

Population administrators can create individuals through the population settings interface. At minimum, an identifier must be provided. Other attributes can be added at creation time or updated later.

:::note
When non-admin users identify a new animal during annotation that does not exist in the catalog, the system can create a provisional animal record. These provisional animals appear in the Review Animals queue for administrator approval before being fully added to the catalog.
:::

## Alternative IDs

Different research groups often use different naming conventions for the same individuals. finwave supports alternative IDs to bridge these naming systems. Administrators can add one or more alternative IDs to any individual, and these are displayed alongside the primary identifier throughout the interface.

This is especially useful when multiple organizations contribute to the same population and have historically used different catalogs.

## Sighting history

Each time an individual is identified in an encounter (via a confirmed annotation), a sighting record is created. Over time, this builds up the individual's sighting history -- a chronological record of when and where the animal was observed. This history is the foundation for analyses like discovery curves and capture history matrices.

## Related

- [Individual Profiles](/web/features/individuals/profiles/) -- viewing an individual's full profile
- [Browsing Individuals](/web/features/individuals/browsing/) -- searching and filtering the catalog
- [Merging Individuals](/web/features/individuals/merging/) -- combining duplicate records
- [Encounters](/web/core-concepts/encounters/) -- the observations that generate sighting records
- [Annotations](/web/core-concepts/annotations/) -- how observations are linked to individuals
