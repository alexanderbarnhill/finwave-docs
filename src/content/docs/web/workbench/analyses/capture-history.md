---
title: "Capture History Export"
description: "Generate capture history matrices for mark-recapture population analysis"
sidebar:
  order: 4
quickRef:
  - "What it produces: a binary individuals × periods matrix where 1 = sighted in period, 0 = not"
  - "Standard input for capture-mark-recapture (CMR) tools: Program MARK, R packages RMark and marked"
  - "Only confirmed (human-verified) annotations count. Machine-only annotations and hidden encounters are excluded"
  - "Period types: Monthly (default), Yearly, or Per-encounter (each unique date is its own occasion)"
  - "Optional filters: sex, age class, side (Left/Right) for laterally-asymmetric species"
  - "Four export formats: MARK .inp, CSV matrix, R-ready CSV (single ch column), JSON. Conversion is in-browser"
  - "Summary stats include mean capture probability — low values + many periods = sparse data, less precise estimates"
  - "Workbench tool — requires finwave Pro and per-role access in Workbench Access settings"
---

## What you'll learn

- What a capture history matrix is and why it matters
- How sampling periods are defined
- How to filter and customize the matrix
- What export formats are available and which tools they work with

## What is a capture history?

A capture history is a binary matrix of individuals and sampling periods. Each row represents one identified individual, and each column represents one sampling period. A cell contains 1 if the individual was sighted during that period and 0 if it was not.

This matrix is the standard input for capture-mark-recapture (CMR) population models. It is used by tools such as Program MARK, R packages RMark and marked, and other population analysis software to estimate population size, survival rates, and detection probability.

<!-- screenshot: Capture history matrix preview showing individuals as rows and monthly periods as columns with 0/1 values -->

## How it works

The analysis examines every confirmed annotation in your population within the date range you specify. It identifies which individuals were observed during which encounters, then groups those encounters into sampling periods based on your chosen period type.

The result is a binary matrix: for each individual and each period, the tool checks whether there is at least one confirmed sighting. If so, the cell is 1; otherwise, it is 0.

:::note
Only confirmed, human-verified annotations are included. Machine-generated annotations that have not been confirmed are excluded, as are annotations linked to encounters marked for deletion or hidden from view.
:::

## Sampling periods

You choose how encounters are grouped into sampling periods when creating the analysis.

**Monthly** -- encounters are grouped by calendar month. This is the most common choice and works well for populations with regular survey effort throughout the year.

**Yearly** -- encounters are grouped by calendar year. Use this for long-term studies where monthly resolution is not needed or where survey effort is sparse.

**Per encounter** -- each unique encounter date becomes its own sampling occasion. This gives the finest resolution but produces the widest matrices. It is useful when you need occasion-level detail or when your survey design treats each trip as a distinct sampling event.

:::tip
The choice of period type affects model assumptions. Most CMR models assume that capture occasions are discrete and that the population is "closed" within each occasion. Monthly periods are a reasonable default, but consult your study design and modeling framework to determine the appropriate granularity.
:::

## Filters

You can narrow the matrix to specific subsets of the population using optional filters.

**Sex** -- include only males, females, or individuals with unknown sex. Useful for sex-specific survival analysis.

**Age class** -- include only individuals of a specific age class (e.g., Adult, Juvenile). Useful for stage-structured models.

**Side** -- include only sightings where the annotation was on a specific body side (Left or Right). This is relevant for species identified by laterally asymmetric markings, where left-side and right-side catalogs may be analyzed separately.

## Export formats

After the analysis completes, you can download the matrix in four formats. The conversion happens in your browser -- no additional server requests are needed.

### MARK (.inp)

The native input format for Program MARK. Each line contains the capture history string followed by a frequency count (always 1 for photo-ID data) and a semicolon. Individual metadata is included as comments.

```
1101001 1;
/* HW-001, Sex: Female, Age: Adult */
0110110 1;
/* HW-002, Sex: Male, Age: Juvenile */
```

### CSV matrix

A standard CSV file with one row per individual and one column per period. The first columns contain individual metadata (ID, identifier, sex, age class), followed by the period columns with 0/1 values.

```
id,identifier,sex,age_class,2024-01,2024-02,2024-03,...
abc123,HW-001,Female,Adult,1,1,0,...
```

### R-ready CSV

A CSV designed for direct import into R with the RMark or marked packages. Instead of separate period columns, the capture history is a single string in the `ch` column -- the format these packages expect.

```
id,identifier,sex,age_class,ch
abc123,HW-001,Female,Adult,1101001
def456,HW-002,Male,Juvenile,0110110
```

### JSON

The raw results from the analysis, including the full matrix, period metadata, summary statistics, and diagnostic counts. Useful for custom processing or integration with other tools.

## Summary statistics

The results panel shows key summary statistics:

- **Total individuals** -- the number of unique individuals in the matrix
- **Total periods** -- the number of sampling periods
- **Total sightings** -- the sum of all 1s in the matrix
- **Mean capture probability** -- the average proportion of periods in which an individual was sighted (total sightings divided by individuals times periods)

A low mean capture probability combined with many periods suggests sparse data, which affects the precision of CMR estimates. Consider using coarser period types or narrower date ranges if the matrix is very sparse.

## Access

Capture History Export is a Workbench tool that requires finwave Pro. Your population administrator controls which roles can access it through the [Workbench Access](/web/administration/workbench-access/) settings.

By default, administrators and professionals have access. Experts and novices do not unless explicitly granted.

## Related

- [Workbench Overview](/web/workbench/overview/) -- all Workbench tools and how access works
- [Discovery Curves](/web/workbench/analyses/discovery-curve/) -- tracking new individual discovery rates
- [Composition Analysis](/web/workbench/analyses/composition/) -- demographic breakdown of the population
- [Individuals](/web/core-concepts/individuals/) -- how individuals are represented in finwave
