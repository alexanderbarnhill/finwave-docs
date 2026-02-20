---
title: "Social Network Analysis"
description: "Generate social network graphs from co-occurrence data with community detection"
sidebar:
  order: 1
---

## What you'll learn

- What Social Network Analysis shows and why it matters
- How co-occurrence data drives the network graph
- What the Louvain algorithm detects in your data
- How to interpret the in-browser visualization

## What is Social Network Analysis?

Social Network Analysis generates an interactive network graph of your population based on co-occurrence data. Individuals who have been observed together appear as connected nodes, and the strength of their connection reflects how frequently they co-occur. The tool also runs community detection to identify clusters of individuals that associate more closely with each other than with the rest of the population.

This is valuable for understanding social structure -- identifying stable social groups, tracking changes in association patterns over time, and discovering which individuals serve as connectors between groups.

<!-- screenshot: Social network graph showing clusters of connected individuals with color-coded communities -->

## How it works

The analysis builds the network from your population's co-occurrence records. Each time two individuals appear in the same encounter, that counts as a co-occurrence. The more frequently two individuals are observed together, the stronger their connection in the network.

The resulting graph shows:

- **Nodes** -- one per individual, sized or labeled by name or ID
- **Edges** -- connections between individuals who have co-occurred, with thickness reflecting frequency
- **Communities** -- color-coded clusters identified by the detection algorithm

:::note
The quality of the network graph depends on the quantity and consistency of your encounter data. Populations with sparse observation records will produce less informative networks. The more encounters you record, the more meaningful the social structure becomes.
:::

## Community detection

The tool uses the Louvain algorithm to detect communities within the network. Louvain is a widely used method for finding groups of nodes that are more densely connected to each other than to the rest of the network.

Communities are displayed as color-coded groups in the visualization. Each community represents a cluster of individuals that associate more frequently with each other. These often correspond to real social units -- family groups, foraging parties, or other stable associations.

:::tip
Compare the detected communities against your existing knowledge of the population's social structure. Unexpected groupings can reveal associations you had not previously documented, while expected groups that fail to appear may indicate gaps in your observation data.
:::

## Using the visualization

The social network graph renders in your browser as an interactive visualization. You can:

- **Pan and zoom** to explore different areas of the network
- **Hover over nodes** to see individual details and their connections
- **Identify peripheral individuals** who have few connections, which may indicate solitary behavior or insufficient observation data
- **Spot bridge individuals** who connect otherwise separate communities

<!-- screenshot: Zoomed-in view of the network showing a bridge individual connecting two communities -->

## Access

Social Network Analysis is a Workbench tool that requires finwave Pro. Your population administrator controls which roles can access it through the [Workbench Access](/web/administration/workbench-access/) settings.

By default, administrators and professionals have access. Experts and novices do not unless explicitly granted.

## Related

- [Workbench Overview](/web/workbench/overview/) -- all Workbench tools and how access works
- [Discovery Curves](/web/workbench/analyses/discovery-curve/) -- tracking new individual discovery rates
- [Composition Analysis](/web/workbench/analyses/composition/) -- demographic breakdown of the population
- [Individuals](/web/core-concepts/individuals/) -- how individuals are represented in finwave
