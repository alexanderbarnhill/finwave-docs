---
title: "Catalog Builder"
description: "Model population relationships as interactive graphs with individual profiles"
sidebar:
  order: 2
---

## What you'll learn

- What the Catalog Builder does and when to use it
- How to create and manage population graphs
- How to define relationships between individuals
- How sub-graphs and custom groupings work

## What is the Catalog Builder?

The Catalog Builder lets you model your population as an interactive graph. You define the relationships between individuals, organize them into meaningful groupings, and attach profile images -- creating a visual, navigable map of your population's social structure.

This is particularly useful for populations where social bonds, family groups, or other relationships are a key part of the research. Instead of maintaining relationships in spreadsheets or notes, you build them directly in finwave as a structured, interactive graph.

<!-- screenshot: Catalog Builder showing a population graph with connected individuals and relationship lines -->

## Creating a graph

When you open the Catalog Builder for a population, you work with a graph canvas where individuals are represented as nodes and relationships are represented as edges connecting them.

To add individuals to your graph, search for them by name or ID and place them on the canvas. You can arrange nodes freely to create a layout that reflects the population's structure -- for example, positioning family groups together or arranging individuals by social affiliation.

<!-- screenshot: Adding an individual to the graph canvas via the search panel -->

:::tip
Start with the individuals you know best and build outward. You do not need to add every individual at once. The graph is a living document that grows as your knowledge of the population develops.
:::

## Defining relationships

Once individuals are on the canvas, you create relationships between them by drawing edges. Each relationship can carry metadata describing the nature of the connection -- for example, mother-calf, associate, or sibling.

Relationships are bidirectional by default. When you connect two individuals, the relationship is visible from either node. You can define multiple relationships between the same pair if the connection is multifaceted.

## Sub-graphs and custom groupings

Not every research question requires the full population graph. The Catalog Builder supports sub-graphs that let you focus on a subset of individuals and their relationships.

**Full population graph** -- the complete set of individuals and relationships for the population. This is the primary graph that serves as the canonical reference.

**Sub-graphs** -- focused views that include only a subset of individuals. Use sub-graphs to model transient relationships (such as seasonal associations), research cohorts, or any grouping that does not apply to the entire population.

**Custom groupings** -- organize nodes within a graph into named groups. This is a visual and organizational tool for clustering related individuals without creating a separate sub-graph.

<!-- screenshot: A sub-graph showing a family group extracted from the full population graph -->

## Profile images

You can load profile images for individuals directly within the Catalog Builder. These images appear on the graph nodes, making it easier to visually identify individuals as you work with the graph.

Profile images set in the Catalog Builder are used throughout finwave wherever that individual's profile is displayed.

:::note
The Catalog Builder currently provides full edit access to all users who have permission to use it. A future update may introduce a view-only mode for users who need to explore the graph without modifying it.
:::

## Access

The Catalog Builder is a Workbench tool that requires finwave Pro. Your population administrator controls which roles can access it through the [Workbench Access](/web/administration/workbench-access/) settings.

By default, administrators and professionals have access. Experts and novices do not unless explicitly granted.

## Related

- [Workbench Overview](/web/workbench/overview/) -- all Workbench tools and how access works
- [Individuals](/web/core-concepts/individuals/) -- how individuals are represented in finwave
- [Workbench Access](/web/administration/workbench-access/) -- configuring tool permissions
