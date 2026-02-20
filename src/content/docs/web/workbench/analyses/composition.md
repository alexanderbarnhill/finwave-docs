---
title: "Composition Analysis"
description: "Analyze the age and sex breakdown of your population"
sidebar:
  order: 3
---

## What you'll learn

- What Composition Analysis shows and why it matters
- How age and sex data are used in the analysis
- How to interpret demographic breakdowns
- What the results tell you about population health

## What is Composition Analysis?

Composition Analysis produces a demographic breakdown of your population by age class and sex. It shows you the proportions of males, females, juveniles, adults, and other categories within your population -- giving you a snapshot of the population's demographic structure.

Understanding composition is essential for assessing population health, reproductive potential, and long-term viability. A population skewed toward older individuals or one sex may face different conservation challenges than a balanced one.

<!-- screenshot: Composition Analysis showing bar charts of age class and sex distribution -->

## How it works

The analysis draws on the age class and sex attributes recorded for each individual in your population. These attributes are assigned when individuals are created or updated in finwave -- typically based on field observations, morphological assessment, or genetic data.

The tool aggregates these attributes across all individuals in the population and presents the results as proportional breakdowns.

:::note
Individuals with unknown age class or sex are included in the analysis as a separate "unknown" category. If a large proportion of your population has unclassified demographics, the results will be less informative. Improving data completeness directly improves the value of this analysis.
:::

## Interpreting the results

### Age class breakdown

The age class breakdown shows how your population is distributed across life stages. Common age classes include calf/juvenile, sub-adult, and adult, though the specific categories depend on how your population is configured.

A healthy, growing population typically has representation across all age classes, with a reasonable proportion of juveniles indicating ongoing recruitment. A population dominated by adults with few juveniles may indicate low reproductive success.

### Sex ratio

The sex ratio shows the proportion of males to females in the population. In many species, a roughly balanced sex ratio is expected, though natural variation exists.

Significant skew in the sex ratio can indicate:

- **Sampling bias** -- one sex may be easier to identify or more frequently encountered
- **Differential mortality** -- one sex may face higher mortality rates
- **Natural variation** -- some species naturally show skewed ratios

:::tip
When interpreting sex ratios, consider how sex is determined for your study species. If sex identification relies on visual cues that are difficult to assess in the field, you may have a high proportion of "unknown" entries that skew the apparent ratio. Factor in the unknowns before drawing conclusions.
:::

## Using composition data

Composition Analysis is most valuable when tracked over time. A single snapshot tells you the current state, but repeated analyses reveal trends:

- Is the population aging without replacement?
- Are juvenile recruitment rates stable, increasing, or declining?
- Has the sex ratio shifted in recent years?

These trends inform conservation decisions and help you measure the impact of management interventions.

<!-- screenshot: Side-by-side composition charts from two different time periods showing a shift in age class distribution -->

## Access

Composition Analysis is a Workbench tool that requires finwave Pro. Your population administrator controls which roles can access it through the [Workbench Access](/web/administration/workbench-access/) settings.

By default, administrators and professionals have access. Experts and novices do not unless explicitly granted.

## Related

- [Workbench Overview](/web/workbench/overview/) -- all Workbench tools and how access works
- [Discovery Curves](/web/workbench/analyses/discovery-curve/) -- tracking new individual discovery rates
- [Social Network Analysis](/web/workbench/analyses/social-network/) -- association patterns and community detection
- [Individuals](/web/core-concepts/individuals/) -- how individuals are represented in finwave
