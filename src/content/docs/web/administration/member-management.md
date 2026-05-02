---
title: "Member Management"
description: "Invite members, assign roles, and confirm new joiners for a population"
sidebar:
  order: 2
quickRef:
  - "Members table shows Name, Email, Role, Joined, and Status (Confirmed or Confirm button)"
  - "Invite Member opens a drawer with required First Name, Last Name, Email, plus a Role select and an optional personalised Message"
  - "The role select lists only roles your current role can assign (from the population's getUserAssignableRoles endpoint)"
  - "New invitations default to the last (lowest-tier) role in the assignable list — adjust before sending"
  - "Existing members can be edited via the row's name link → drawer in 'edit' mode → change role → Save Changes"
  - "Pending members show a Confirm button inline. Clicking it calls confirmPopulationMember and stamps confirmedOn"
  - "Remove a member from the row-actions menu → calls removeMember(populationId, userId) and drops them from the list"
  - "Default invite message: 'We're looking forward to your contribution!' — overridable in the textarea"
---

## What you'll learn

- Where the members page is and what it shows
- The invite flow and what fields are required
- How role changes and confirmations work
- How to remove a member

## The members page

Population administration → Members renders a sortable table powered by the population-members component. Columns:

| Column | What it shows |
|---|---|
| **Name** | First and last name, linked to the edit drawer |
| **Email** | The member's account email |
| **Role** | Their current role in the population |
| **Joined** | The `memberSince` date, formatted via the date service |
| **Status** | A green Confirmed badge with the confirmedOn date — or, for unconfirmed members, an inline Confirm button |

Default page size is 25 with options 10/25/50. Above the table sits an **Invite Member** primary button.

## Inviting a new member

Click **Invite Member**. The drawer opens in `new` mode with the title "Invite New Member" and the **Send Invitation** action button (disabled until the form is valid).

The form has five fields:

| Field | Required | Notes |
|---|---|---|
| **First Name** | Yes | Free text |
| **Last Name** | Yes | Free text |
| **Email** | Yes | The address the invitation goes to |
| **Assigned Role** | Yes | Dropdown of roles your account can assign — pulled from the population's `getUserAssignableRoles` endpoint at drawer open |
| **Personalize your invitation** | Optional | Textarea pre-filled with `We're looking forward to your contribution!` |

The default selected role is the **last** entry in the assignable list — typically the lowest-tier role (e.g. Novice or Viewer). Adjust before sending if you want to grant more.

Submit calls `populationService.inviteMember` with a `UserCreationInvitationDto` carrying the user details, the personalised message, the population id, and the chosen role id. On success the drawer closes and the toast confirms the invitation; the new member appears in the list once they accept and join.

## Editing a member's role

Click the member's **name** in the table (or the row's edit action) to open the drawer in `edit` mode. The title reads `Edit {firstName} {lastName}`.

The drawer surfaces the role selector for that member. Save changes calls `populationService.updatePopulationUserRole` with the member and the new role; on success the role updates in place and the drawer closes.

## Confirming a pending member

Some join paths leave members in an unconfirmed state — they appear in the table with **no Confirmed badge** and an inline Confirm button instead. Clicking that button calls `confirmPopulationMember(userProfileDto, population)`. On success the badge flips to Confirmed and `confirmedOn` is set to the current date.

There's no separate confirmation queue page for population membership in the client component; the inline button on each row is the surface.

## Removing a member

The row-actions menu has a **Remove** option. Clicking it calls `removeMember(populationId, userId)`; on success the member is spliced out of the table immediately.

Removal does not delete the user account itself — only the member's relationship with this population. The same user can be re-invited later or could continue as a member of other populations.

## Permission notes

The page is reached via the population's administration sidebar. The set of roles available in the invite drawer's Assigned Role dropdown is determined server-side by `getUserAssignableRoles`, which returns only the roles your role is allowed to assign. There's no client-side override.

For the broader role matrix (System / Organization / Population scopes), see [Roles & Permissions](/web/core-concepts/roles-permissions/).

## Related

- [Roles & Permissions](/web/core-concepts/roles-permissions/) — what each role can do
- [Workbench Access](/web/administration/workbench-access/) — per-tool permissions on top of role
- [Population Settings](/web/administration/population-settings/) — the broader population administration surface
