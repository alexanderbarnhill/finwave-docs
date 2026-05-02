---
title: "Organization Settings"
description: "Configure your organization's profile, branding, members, permits, and data preferences"
sidebar:
  order: 4
quickRef:
  - "Reachable at /organization/{id}/settings (or /administration/organizations/{id} from platform admin)"
  - "Organization-administrator only — non-admins are bounced to the public profile with a snackbar"
  - "Seven sections in a sidebar: Logo, Banner, Profile, Members, Permits, Data Preferences, Danger"
  - "Section state is local to the page — there's no URL fragment for the active section, so deep-links land on Logo by default"
  - "Admin gate is checked via the userOrganizationService.isUserAdministrator endpoint before any settings render"
  - "Profile is the basic identity section (name/description/contact); Permits manages active research permits"
  - "Data Preferences and Danger are separate sections — Danger contains destructive actions"
---

## What you'll learn

- Where the page is and who can open it
- The seven sections you'll find on it
- How the admin gate works

## Where to find it

Two URLs both render the same component:

- **`/organization/{organizationid}/settings`** — the standard path users reach from their organization profile
- **`/administration/organizations/{organizationid}`** — the platform-admin entry that lands on the same page (the component flags `fromAdmin = true` based on the URL prefix)

In either case the component receives the organization id from the route param and loads the organization's profile.

## The admin gate

Before showing any editable settings, the page calls `userOrganizationService.isUserAdministrator(organizationId)`. While that's resolving, the page is in an `authorizing` state and shows nothing editable. The result drives what happens next:

- **You are an org admin** → the loader fetches the organization profile and the section sidebar renders
- **You are not an org admin** → a snackbar reads "Only organization administrators can change these settings." and the router navigates you to `/organization/{id}` (the public profile)
- **The check fails (network or server error)** → a different snackbar reads "Could not verify your access to this organization." and you're bounced to the public profile the same way

This is a hard client-side gate — non-admins never see the editable forms at all.

## Sections

The settings sidebar has seven sections. Selecting one swaps the right pane to that section's component:

| Section | Component | What it covers |
|---|---|---|
| **Logo** | `app-org-settings-logo` | Square logo image used in the public profile, organization cards, and footer placements |
| **Banner** | `app-org-settings-banner` | Wide banner image used on the org profile and public-page representations |
| **Profile** | `app-org-settings-profile` | Core identity fields — name, description, contact info |
| **Members** | `app-org-settings-members` | Add and remove organization members and administrators |
| **Permits** | `app-org-settings-permits` | Active research permits associated with the organization |
| **Data Preferences** | `app-org-settings-data-preferences` | Defaults that apply when this organization submits encounters |
| **Danger** | `app-org-settings-danger` | Destructive actions, isolated from the main flow |

The default selected section is **Logo**. Section state is local to the page — switching doesn't update the URL, so a refresh always lands on Logo.

## Saving state and feedback

The page tracks `savingProfile` and `savingDataPreferences` flags separately. Other sections handle their own save state via their own components.

When the organization profile loads it populates a single `OrganizationProfileDto` that the section components edit in place. The dto is dispatched back to the API per-section as you save.

## Related

- [Organizations](/web/core-concepts/organizations/) — what an organization represents
- [Organization Verification](/web/core-concepts/organization-verification/) — how the verified badge is granted
- [Member Management](/web/administration/member-management/) — population-level member management (different surface)
