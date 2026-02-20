---
title: "Discovery Curves"
description: "Visualize new individual discovery rates and assess population saturation"
sidebar:
  order: 2
---

## What you'll learn

- What a discovery curve shows and why it matters
- How to interpret the curve shape
- What the curve tells you about population saturation
- How discovery rate data is calculated

## What is a discovery curve?

A discovery curve plots the rate at which new individuals are identified in your population over time. The x-axis represents time (typically in survey effort or chronological order), and the y-axis shows the cumulative number of unique individuals discovered.

This is one of the most fundamental analyses in population ecology. It tells you whether you are still finding new members of the population or whether you have identified most of them.

<!-- screenshot: Discovery curve chart showing cumulative new individuals over time with the curve beginning to flatten -->

## How it works

The analysis examines the chronological record of when each individual was first identified in your population. It then plots these first-identification events cumulatively to produce the curve.

The data comes directly from your population's encounter and individual records. Each individual's earliest encounter date determines when they appear on the curve.

:::note
The accuracy of the discovery curve depends on your encounter data having reliable dates. If historical sighting dates are approximate or missing, the early portion of the curve may not reflect actual discovery patterns.
:::

## Interpreting the curve shape

The shape of the discovery curve tells you about the state of your population knowledge.

**Steep and rising** -- you are still discovering new individuals at a high rate. This is typical for populations where survey effort is increasing or where the population is large relative to your observation coverage. There are likely many more individuals to find.

**Flattening (approaching an asymptote)** -- the rate of new discoveries is slowing. You are beginning to reach saturation, meaning you have identified a large proportion of the population. The curve's asymptote gives a rough estimate of total population size.

**Flat (plateau)** -- you have not discovered new individuals for an extended period. This suggests you have identified nearly all individuals in the population, or that your survey effort has stopped.

**Stepped** -- periods of rapid discovery followed by plateaus. This often reflects seasonal survey patterns or intermittent research campaigns. The plateaus correspond to off-seasons or gaps in effort.

:::tip
A curve that never flattens does not necessarily mean the population is enormous. It may indicate inconsistent survey effort or a highly mobile population that moves through your study area unpredictably. Consider pairing discovery curve analysis with survey effort data for a more complete picture.
:::

## What saturation means

When the discovery curve begins to flatten, you are approaching population saturation -- the point at which additional survey effort yields diminishing returns in terms of new individuals. This is informative for:

- **Estimating population size** -- the asymptote of the curve provides a rough ceiling estimate
- **Planning survey effort** -- if the curve is still steep, continued effort is likely to be productive
- **Assessing catalog completeness** -- a flattened curve suggests your catalog is a good representation of the actual population

<!-- screenshot: Discovery curve with an annotation showing the asymptote region and estimated population size -->

## Access

Discovery Curves is a Workbench tool that requires finwave Pro. Your population administrator controls which roles can access it through the [Workbench Access](/web/administration/workbench-access/) settings.

By default, administrators and professionals have access. Experts and novices do not unless explicitly granted.

## Related

- [Workbench Overview](/web/workbench/overview/) -- all Workbench tools and how access works
- [Composition Analysis](/web/workbench/analyses/composition/) -- demographic breakdown of the population
- [Social Network Analysis](/web/workbench/analyses/social-network/) -- association patterns and community detection
- [Individuals](/web/core-concepts/individuals/) -- how individuals are represented in finwave
