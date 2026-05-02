---
title: "Organizations"
description: "Organization membership, roles, and data ownership"
sidebar:
  order: 4
quickRef:
  - "What it is: a real-world entity (research group, NGO, company) that owns submitted data"
  - "Two roles: Member (log + view) and Administrator (everything Member can + manage people, edit profile, set licensing)"
  - "Any registered user can create one. Others request to join, or admins invite directly"
  - "Org membership is independent from population membership — one doesn't imply the other"
  - "Encounters submitted under an org inherit its license + visibility; private = visible only to org members (and pop admins)"
  - "Used for data-sharing workflows: keep encounters internal during review, then expand visibility later"
---

## What you'll learn

- What organizations are and how they relate to populations
- How organizational membership works
- What Organization Members and Administrators can do
- How organizations affect encounter visibility

## What is an organization?

An organization in finwave represents a real-world research group, conservation body, whale-watching company, or other entity that contributes data to populations. Organizations are the ownership layer between users and the data they submit.

When you submit an encounter, you can associate it with one of your organizations. This determines who can see the encounter based on organizational membership and license settings.

## Creating and joining organizations

Any registered user can create an organization. Once created, other users can request to join, or the organization administrator can invite them directly.

Organizations have a profile page that shows their name, description, logo, member list, and the populations they contribute to.

## Organization roles

There are two roles within an organization:

**Organization Member** -- can log encounters under the organization and view organization data.

**Organization Administrator** -- can do everything a member can, plus manage people (add and remove members), edit the organization profile, and configure license information. Organization Administrators inherit all member permissions.

## How organizations affect data

When an encounter is submitted under an organization, the organization's license and visibility settings apply. Encounters marked as private are only visible to members of the submitting organization (plus population administrators, who can see all encounters).

This means organizations serve as a natural grouping for data access. Research teams that need to share data internally before making it public can use organizational privacy to control the workflow.

:::note
Organization membership is separate from population membership. You can be a member of an organization without being a member of any population that organization contributes to, and vice versa. The two systems are complementary -- organizations control data ownership, populations control research scope.
:::

## Related

- [Roles & Permissions](/web/core-concepts/roles-permissions/) -- the full permission matrix
- [Organization Settings](/web/administration/organization-settings/) -- managing your organization
- [Populations](/web/core-concepts/populations/) -- how populations relate to organizations
