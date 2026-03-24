---
title: "Usage Metrics"
description: "Platform-wide activity analytics and engagement tracking for administrators"
sidebar:
  order: 8
---

## What you'll learn

- What the usage metrics dashboard shows
- How activity trends and engagement are measured
- How to use the geographic and temporal heatmaps
- What the workflow funnel reveals about your platform

## What are usage metrics?

The usage metrics dashboard gives platform administrators a comprehensive view of how finwave is being used across all populations and organizations. It tracks user activity, engagement patterns, and workflow throughput to help you understand adoption, identify bottlenecks, and demonstrate platform value.

:::note
Usage metrics is a **platform administration** feature. It is only accessible to finwave platform administrators, not population-level administrators. Population-specific analytics are available through the Workbench analysis tools.
:::

## Accessing the dashboard

Navigate to **Platform Administration > Usage Metrics**. The dashboard loads automatically with data from all populations.

<!-- screenshot: Usage metrics dashboard showing recent activity cards, DAU trend, and event breakdown -->

## Recent activity summary

The top of the dashboard shows activity counts for three time windows: **24 hours**, **7 days**, and **30 days**. Each card includes a **period-over-period comparison** (e.g., "+12% vs previous 7 days") so you can see whether activity is trending up or down at a glance.

## Daily active users

A line chart shows the number of distinct users active each day over the selected period. This is the most direct measure of platform adoption and is useful for spotting seasonal patterns or the impact of onboarding campaigns.

## New users per day

A separate chart tracks new user registrations by day. Combined with the DAU trend, this helps you distinguish between new user growth and returning user engagement.

## Event breakdown

A categorized view of all tracked event types (image uploads, catalog saves, annotations presented, searches performed, comments added, and more) with counts for the selected period. This reveals which features are most used and which may need attention or promotion.

## Top users

A ranked list of the 15 most active users by total event count. This helps identify power users who might be good candidates for early feedback on new features or for helping onboard other team members.

:::note
Usage metrics show aggregate activity patterns. They are designed for understanding platform health, not for evaluating individual performance. Use this data responsibly.
:::

## Population breakdown

A table showing activity metrics broken down by population: events, active users, images uploaded, and annotations reviewed. This helps identify which populations are most active and which may need engagement support.

## Hourly heatmap

A day-of-week by hour-of-day heatmap showing when activity peaks occur. Each cell is shaded by event density. This visualization reveals usage patterns -- for example, whether most activity happens during business hours, whether weekends show field data uploads, or whether a specific population works in a different time zone.

<!-- screenshot: Hourly heatmap showing darker cells during weekday afternoons -->

## Engagement distribution

Users are grouped into engagement buckets based on their activity level:

| Bucket | Description |
|--------|-------------|
| **Casual** | Occasional logins, minimal interaction |
| **Light** | Regular visits, some uploads or reviews |
| **Active** | Consistent daily use with multiple feature interactions |
| **Heavy** | High-volume activity across multiple features |
| **Power** | Top-percentile users driving significant platform throughput |

This distribution helps you understand whether your user base is broadly engaged or concentrated among a few power users.

## Workflow funnel

A funnel visualization tracking data as it flows through the platform pipeline:

**Encounters → Images → Annotations → Reviews → Matches**

Each stage shows the count and the conversion rate to the next stage. A drop-off between "Annotations" and "Reviews" might indicate that reviewers need encouragement or that the review queue is not being used. A drop-off between "Reviews" and "Matches" might indicate that the ML models need retraining for that population.

## Feature adoption trends

A weekly trend chart showing the top 10 event types over time. This helps you see whether newly launched features are gaining traction or whether usage is concentrated in a few core workflows.

## Geographic activity

A map visualization powered by Leaflet showing where platform activity originates geographically. Events with location data (encounter uploads, searches with geographic context) are plotted as points or clusters.

## Platform breakdown

A breakdown of activity by platform type: **desktop web**, **mobile web**, and **desktop app**. This shows how users access finwave and can inform decisions about where to invest in UX improvements.

## Peak hours analysis

A summary of the busiest hours and days, helping you plan maintenance windows, release schedules, and support availability around actual usage patterns.

## Filtering

The dashboard supports optional filters to narrow the view:

- **Population** -- focus on a single population's activity
- **Role** -- filter by user role to compare how different roles engage with the platform

## Related

- [Population Settings](/web/administration/population-settings/) -- per-population configuration
- [Member Management](/web/administration/member-management/) -- managing platform users
- [Workbench Overview](/web/workbench/overview/) -- population-level analysis tools
- [ML Center Overview](/web/ml-center/overview/) -- ML model performance metrics
