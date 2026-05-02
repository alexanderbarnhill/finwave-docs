---
title: "Review Queue"
description: "Generate review tasks, assign them to team members, and track progress"
sidebar:
  order: 3
quickRef:
  - "What it does: turns a search into assignable review tasks with progress tracking"
  - "Common uses: labelling unannotated photos, QA on existing annotations, systematic batch review"
  - "Workflow: define search → pick granularity (per encounter / per image / per criterion) → assign → track"
  - "Granularity sets task size — narrow scope first to gauge per-task effort before scaling"
  - "Only users with Review Queue access can be assigned tasks"
  - "Dashboard shows complete / in-progress / not-started counts per batch and per reviewer"
  - "Today everyone with access has full create+assign+work powers; split is on the roadmap"
  - "Workbench tool — requires finwave Pro and per-role access in Workbench Access settings"
---

## What you'll learn

- What the Review Queue does and common use cases
- How to generate review tasks from search parameters
- How to assign tasks and monitor progress
- How task granularity works

## What is the Review Queue?

The Review Queue is a workflow tool for systematic photo review. You define what needs to be reviewed by setting search parameters, generate a set of tasks from those results, assign tasks to team members, and track their progress to completion.

Common use cases include:

- **Labelling** -- systematically label photos that have not yet been annotated
- **Quality assurance** -- review existing annotations for accuracy
- **Systematic photo review** -- work through a defined set of encounters or images methodically, ensuring nothing is missed

<!-- screenshot: Review Queue showing a list of active review tasks with progress bars and assignees -->

## Generating review tasks

To create a review batch, you start by defining search parameters that specify which data should be reviewed. These parameters work similarly to finwave's standard search -- you can filter by date range, location, species, annotation status, or any combination of criteria.

Once you have defined your search, you configure the task granularity. Granularity determines how the search results are divided into individual tasks. For example, you might create one task per encounter, one task per image, or one task per set of images matching a criterion.

<!-- screenshot: Review task creation form showing search parameter fields and granularity options -->

:::tip
Start with a narrow search scope for your first review batch to get a sense of how many tasks are generated and how long each takes. You can always create additional batches to cover more data.
:::

## Assigning tasks

After generating a review batch, you assign tasks to team members. Each task is assigned to a specific person who is responsible for completing the review work.

You can see at a glance who is assigned to which tasks and redistribute work if needed. Only users who have Review Queue access in the population can be assigned tasks.

<!-- screenshot: Task assignment view showing team members and their assigned task counts -->

## Working tasks

When you open an assigned task, you see the specific data that needs to be reviewed based on the search parameters and granularity that defined the batch. You work through the items, performing the required action (labelling, verifying annotations, reviewing photos), and mark the task as complete when finished.

## Monitoring progress

The Review Queue provides a progress overview for each batch of review tasks. You can see:

- How many tasks are complete, in progress, and not yet started
- Which team members are actively working and their completion rates
- Overall batch progress as a percentage

This makes it straightforward to identify bottlenecks, redistribute work if someone falls behind, and know when a review effort is complete.

<!-- screenshot: Review batch progress dashboard showing completion percentages and per-reviewer stats -->

:::note
Currently, all users with Review Queue access have full capabilities: creating tasks, assigning them, and working them. A future update may introduce a split between management capabilities (creating and assigning tasks) and worker capabilities (completing assigned tasks only).
:::

## Access

The Review Queue is a Workbench tool that requires finwave Pro. Your population administrator controls which roles can access it through the [Workbench Access](/web/administration/workbench-access/) settings.

By default, administrators and professionals have access. Experts and novices do not unless explicitly granted.

## Related

- [Workbench Overview](/web/workbench/overview/) -- all Workbench tools and how access works
- [Annotations](/web/core-concepts/annotations/) -- how annotations work in finwave
- [Encounters](/web/core-concepts/encounters/) -- understanding encounter data
- [Workbench Access](/web/administration/workbench-access/) -- configuring tool permissions
