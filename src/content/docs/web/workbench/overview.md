---
title: "Workbench Overview"
description: "What the Workbench is, which tools it includes, and how access works"
sidebar:
  order: 1
quickRef:
  - "What it is: population-scoped power tools beyond browse/submit/view — modeling, review, and analysis"
  - "Three tool categories: Catalog (Catalog Builder), Review (Review Queue), Analysis (Social Network, Discovery Curve, Composition, Capture History)"
  - "Requires finwave Pro. Free-tier admins see an upgrade prompt; non-admins on Free see nothing"
  - "Access is per-role per-population. Admins always have full access; pros default to all tools; experts/novices start with none"
  - "Sidebar entry only appears when you have access to ≥1 tool. Hidden entirely otherwise"
  - "Fastest cross-population switching: user-menu Workbench area lists tools grouped by population"
---

## What you'll learn

- What the Workbench is and how it fits into finwave
- The three categories of Workbench tools
- How to find the Workbench in the navigation
- How access is granted and what requires finwave Pro

## What is the Workbench?

The Workbench is a collection of population-scoped power features that go beyond the standard browse, submit, and view workflows. It is the part of finwave where research teams model relationships, run analyses, and systematically review data. The Workbench is the core of finwave Pro.

Unlike the administration section, which focuses on managing population settings and members, the Workbench is where analytical and operational work happens. You use it to build catalog graphs, assign and complete review tasks, and generate statistical analyses of your population data.

:::note
The Workbench requires a finwave Pro plan. If your population is on the Free tier, administrators will see the Workbench section with an upgrade prompt. Non-admin users on Free-tier populations will not see the section at all.
:::

## Tool categories

Workbench tools are organized into three categories:

### Catalog

- **[Catalog Builder](/web/workbench/catalog-builder/)** -- Model your population as an interactive graph. Define relationships between individuals, organize sub-graphs, and manage profile images.

### Review

- **[Review Queue](/web/workbench/review-queue/)** -- Generate review tasks from search parameters, assign them to team members, and monitor progress. Used for labelling, quality assurance, and systematic photo review.

### Analysis

- **[Social Network Analysis](/web/workbench/analyses/social-network/)** -- Generate social network graphs from co-occurrence data with community detection.
- **[Discovery Curves](/web/workbench/analyses/discovery-curve/)** -- Visualize how quickly new individuals are being discovered over time.
- **[Composition Analysis](/web/workbench/analyses/composition/)** -- Break down your population by age and sex demographics.
- **[Capture History Export](/web/workbench/analyses/capture-history/)** -- Generate capture history matrices for mark-recapture population analysis.

## Finding the Workbench

The Workbench appears as its own section in the population sidebar navigation, below the standard features (encounters, individuals, comments) and above administration.

<!-- screenshot: Workbench section in the population sidebar showing Catalog Builder, Review Queue, and Analyses sub-group -->

Within the Workbench section, Catalog Builder and Review Queue appear as top-level entries. The three analysis tools are grouped under an "Analyses" parent since they are conceptually related.

You can also access your Workbench tools from the user menu in the top-right corner of the screen. The menu includes a Workbench area that lists your available tools grouped by population. Hovering over a population name reveals the tools you have access to, and clicking a tool takes you directly to it.

<!-- screenshot: User menu showing Workbench quick-jump with populations and their available tools -->

:::tip
The user menu quick-jump is the fastest way to switch between Workbench tools across different populations without navigating through each population's sidebar.
:::

## How access works

Access to each Workbench tool is granted per role, per population. Population administrators always have full access to every tool implicitly -- no configuration is needed.

For other roles (professional, expert, novice), a population administrator must explicitly grant access to each tool. By default, professionals receive access to all tools when a population is created or upgraded to Pro. Experts and novices start with no Workbench access.

The Workbench section in the sidebar is only visible if you have access to at least one tool. Individual tool links only appear if you have access to that specific tool. If you have access to zero tools, the entire section is hidden.

:::caution
Workbench access depends on both your role permissions and the population's plan. Even if an administrator has granted your role access to a tool, you will not be able to use it unless the population is on the Pro plan.
:::

To learn how administrators configure these permissions, see [Workbench Access](/web/administration/workbench-access/).

## Related

- [Workbench Access](/web/administration/workbench-access/) -- configuring which roles can use each tool
- [Roles & Permissions](/web/core-concepts/roles-permissions/) -- understanding the role hierarchy
- [Catalog Builder](/web/workbench/catalog-builder/) -- modeling population relationships
- [Review Queue](/web/workbench/review-queue/) -- systematic review workflows
