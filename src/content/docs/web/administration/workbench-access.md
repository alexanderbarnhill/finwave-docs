---
title: "Workbench Access"
description: "Configure which roles can access each Workbench tool"
sidebar:
  order: 3
---

## What you'll learn

- How the Workbench permission model works
- How to use the permission matrix to grant or revoke tool access
- What the default permissions are
- How plan status affects permissions

## Who can configure Workbench access?

Only population administrators can view and modify Workbench access settings. You will find this page under **Administration > Workbench Access** within your population.

:::note
This page is about configuring who can use Workbench tools. If you are looking for information about what the Workbench tools do, see the [Workbench Overview](/web/workbench/overview/).
:::

## The permission matrix

The Workbench Access page presents a checkbox matrix with tools on the rows and non-admin roles on the columns. Each checkbox controls whether members with that role can access that tool.

<!-- screenshot: Workbench Access permission matrix showing tools grouped by category with checkboxes for Professional, Expert, and Novice roles -->

Tools are grouped by category:

| Category | Tools |
|----------|-------|
| **Catalog** | Catalog Builder |
| **Review** | Review Queue |
| **Analysis** | Social Network Analysis, Discovery Curve, Composition Analysis |

For each tool, you can enable or disable access independently for three roles:

- **Professional** -- experienced researchers trusted with significant data access
- **Expert** -- skilled contributors with reliable data submissions
- **Novice** -- new or casual contributors with basic access

Administrators are not shown in the matrix because they always have full access to every Workbench tool. There is no way to restrict administrator access.

## Default permissions

When a population is created or upgraded to Pro, the default permissions are:

| Tool | Professional | Expert | Novice |
|------|:---:|:---:|:---:|
| Catalog Builder | Granted | Not granted | Not granted |
| Review Queue | Granted | Not granted | Not granted |
| Social Network Analysis | Granted | Not granted | Not granted |
| Discovery Curve | Granted | Not granted | Not granted |
| Composition Analysis | Granted | Not granted | Not granted |

Professionals receive access to all tools by default. Experts and novices start with no Workbench access. You can adjust these from the permission matrix at any time.

## Making changes

Toggle the checkboxes to grant or revoke access, then save. Changes take effect immediately -- affected users will see the Workbench section appear or disappear in their navigation on their next page load.

:::caution
Revoking access to a tool does not delete any data or in-progress work. For example, removing a user's Review Queue access does not delete their assigned tasks. If you restore access later, their tasks will still be there.
:::

When you grant a role access to at least one tool, members with that role will see the Workbench section in the population sidebar. They will only see links to the specific tools they have access to. If you revoke all tool access for a role, the Workbench section disappears entirely for those members.

## Pro plan requirement

Workbench access requires the population to be on the finwave Pro plan. If the population is on the Free tier:

- Administrators see the Workbench section with locked tool entries and an upgrade prompt
- Non-admin users do not see the Workbench section at all
- Permission grants that you have configured are preserved even if the plan lapses

This means you do not need to reconfigure permissions if you temporarily downgrade and later re-upgrade. Your permission settings are retained and take effect again as soon as the Pro plan is active.

:::tip
If you are evaluating whether to upgrade to Pro, you can review the available tools in the [Workbench Overview](/web/workbench/overview/) to understand what your team would gain access to.
:::

## Related

- [Workbench Overview](/web/workbench/overview/) -- what each Workbench tool does
- [Member Management](/web/administration/member-management/) -- inviting members and assigning roles
- [Roles & Permissions](/web/core-concepts/roles-permissions/) -- understanding the role hierarchy
- [Population Settings](/web/administration/population-settings/) -- other population configuration options
