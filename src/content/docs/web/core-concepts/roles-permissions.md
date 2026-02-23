---
title: "Roles & Permissions"
description: "Role hierarchy and what each role can do"
sidebar:
  order: 6
---

## What you'll learn

- The different role scopes in finwave (system, organization, population)
- What each role can do
- How roles inherit from each other
- Where to manage role assignments

## Role scopes

finwave has three scopes of roles, each governing a different level of the platform.

**System roles** apply globally across the platform. Every registered user has a system role.

**Organization roles** apply within a specific organization. A user can hold different organization roles in different organizations.

**Population roles** apply within a specific population. A user can hold different population roles in different populations, and these are the roles that determine day-to-day permissions for encounter management, annotation, analysis, and data access.

## System roles

| Action | System User | System Administrator |
|---|---|---|
| Join populations | Yes | Yes |
| Request new population | Yes | Yes |
| Approve new populations | No | Yes |
| Delete populations | No | Yes |
| Update own profile | Yes | Yes |
| Join organizations | Yes | Yes |
| Create organizations | Yes | Yes |
| Delete user accounts | No | Yes |

System Administrator is a superset of System User. Most users are System Users -- the System Administrator role is reserved for platform operators.

## Organization roles

| Action | Organization Member | Organization Administrator |
|---|---|---|
| Log encounters under the organization | Yes | Yes |
| Add people to the organization | No | Yes |
| Remove people from the organization | No | Yes |
| Edit organization profile | No | Yes |
| Set organization license information | No | Yes |

Organization Administrators inherit all Organization Member permissions.

## Population roles

Population roles are the most granular and the ones most relevant to daily work. There are four population roles, listed from lowest to highest privilege.

### Viewer

Viewers can browse and search encounters and individuals, submit new encounters, and edit metadata on their own encounters. They cannot annotate images or access analytical tools.

### Expert

Experts have everything Viewers have, plus the ability to annotate images in the annotator. They can draw bounding boxes, assign identities, and confirm or reject ML predictions.

### Professional

Professionals have everything Experts have, plus access to ML predictions, the ability to edit metadata on any encounter (not just their own), and the ability to set profile images on individuals.

### Population Administrator

Population Administrators have full control over the population. In addition to all Professional permissions, they can manage individuals, configure settings, manage members, control data visibility, run exports, and access all encounters including private ones.

## Detailed population permission matrix

| Action | Viewer | Expert | Professional | Admin |
|---|---|---|---|---|
| Add encounters | Yes | Yes | Yes | Yes |
| Update own encounter metadata / add images | Yes | Yes | Yes | Yes |
| View public encounters | Yes | Yes | Yes | Yes |
| Search encounters | Yes | Yes | Yes | Yes |
| Search individuals | Yes | Yes | Yes | Yes |
| Annotate images in encounters | No | Yes | Yes | Yes |
| Set profile images on individuals | No | No | Yes | Yes |
| Update metadata on any encounter | No | No | Yes | Yes |
| See ML predictions | No | No | Yes | Yes |
| See all encounters (including private) | No | No | No | Yes |
| Add / update individuals | No | No | No | Yes |
| Move encounters to another population | No | No | No | Yes |
| Add / update / delete prey targets | No | No | No | Yes |
| Add / update / delete behavioral categories | No | No | No | Yes |
| Update population details | No | No | No | Yes |
| Update contributor information | No | No | No | Yes |
| Update location information | No | No | No | Yes |
| Set population join policy | No | No | No | Yes |
| Configure data visibility / permissions | No | No | No | Yes |
| Export data as CSV | No | No | No | Yes |
| Download encounter / extracted images (bulk) | No | No | No | Yes |
| Export / generate ML image datasets | No | No | No | Yes |
| Create social network graphs | No | No | No | Yes |
| Add / update population banner image | No | No | No | Yes |
| Add people / approve join requests | No | No | No | Yes |
| Remove people from the population | No | No | No | Yes |
| Update population user roles | No | No | No | Yes |

:::note
Only Population Administrators can view private encounters. All other roles see encounters according to the population's visibility settings.
:::

## Workbench access

Workbench tools (Catalog Builder, Review Queue, Analyses) use an additional layer of role-based access that population administrators configure separately. By default, Professionals receive access to all Workbench tools when a population upgrades to finwave Pro. Experts and Viewers start with no Workbench access.

See [Workbench Access](/web/administration/workbench-access/) for details on how administrators configure these permissions.

## Summary table

| Scope | Roles | Inherits |
|---|---|---|
| System | System User, System Administrator | Admin inherits User |
| Organization | Organization Member, Organization Administrator | Admin inherits Member |
| Population | Viewer, Expert, Professional, Population Administrator | Each inherits all below |

## Related

- [Workbench Access](/web/administration/workbench-access/) -- configuring which roles can use each Workbench tool
- [Member Management](/web/administration/member-management/) -- inviting members and assigning roles
- [Organizations](/web/core-concepts/organizations/) -- organization membership and roles
- [Populations](/web/core-concepts/populations/) -- what a population is
