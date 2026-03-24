---
title: "What Is the Desktop Client?"
description: "Purpose, organization-first design, and how it relates to the web app"
sidebar:
  order: 1
---

In this guide you will learn:

- What the desktop client is and how it differs from the finwave web app
- The problems it solves: Discovery, Manifesting, and (coming soon) Onboarding and Synchronization
- How the organization-first model works
- How multiple users share a single installation

## An organization's tool, not "finwave on the desktop"

The finwave web app is user-first. You log in, see your encounters, your submissions, your populations. The desktop client inverts this model entirely. It is **organization-first** -- bound to a single research organization at setup and scoped to that organization's data, populations, and workflows.

Think of it as "the Center for Whale Research's data tool" rather than "Jane's finwave app." The title bar reads **Org Name -- FinLaunch**, the navigation shows your organization's logo, and every screen is filtered to your organization's context. Individual users authenticate to use it, but the client's identity belongs to the organization.

## What it solves

Research organizations coming to finwave often have decades of photo-ID data stored in ad-hoc folder structures, spreadsheets, PowerPoint catalogs, and naming conventions unique to their group. The desktop client handles getting that data into finwave through a staged workflow:

1. **Discovery** -- Scans local directories to find all relevant files (images, spreadsheets, documents) that contain encounter data and individual ID information.
2. **Manifesting** -- Analyzes the discovered data to build a versioned mapping from your organization's data structure to finwave's encounter schema.
3. **Onboarding** *(coming soon)* -- Will upload historical data to finwave using the approved manifest, with optional pre-training of ID models from extracted training data.
4. **Synchronization** *(coming soon)* -- Will watch local directories for new data and continuously sync to finwave using the established manifest.

Today, the desktop client fully supports **Discovery** and **Manifesting**. You can scan your directories, build and refine manifests, and approve encounter mappings. The Onboarding and Synchronization stages are under active development.

## Everything stays local until you approve

All discovery and manifesting runs locally on your machine. The desktop client scans your files, extracts metadata, and builds encounter mappings without sending any data to finwave's servers. Data only leaves your machine when you explicitly approve an upload.

This is critical for organizations with data governance requirements -- you can review exactly what will be uploaded before anything is transmitted.

## Built on Tauri

The desktop client is built on [Tauri](https://tauri.app/), which pairs a Rust backend for filesystem access, local database management, and background processing with your system's native webview running Angular UI components. The Angular components are shared with the finwave web application, so the interface is familiar if you already use finwave in the browser.

Tauri's architecture means the client is lightweight (under 50 MB RAM when idle) and enforces strict permission boundaries at the system level.

## Multi-user support

Because the client is bound to an organization rather than a user, multiple people can use the same installation. This is common in research labs with a shared workstation. Each user logs in with their own finwave credentials, sees the organization's data filtered by their role, and has their actions attributed to their account in the activity log. Logging out does not affect the organization binding or any configuration.

:::note
The organization binding is permanent. If you need to reconfigure the client for a different organization, an organization admin must perform a full reset from Settings. This wipes all local data and returns the client to the first-launch flow.
:::

## Role-based access

Your role within the organization determines what you can do in the desktop client:

| Role | Capabilities |
|------|-------------|
| Organization admin | Full access: discovery, manifesting, directory management, all settings |
| Population admin | Discovery, manifesting for their populations. Cannot change organization-level settings |
| Professional | View scan results and manifests. Cannot change manifests or directory config |
| Expert / Novice | View-only on scan status |

## Current features

The desktop client currently includes:

- **Workspace dashboard** -- Overview of scan jobs, directories, manifests, and recent activity
- **Scan jobs** -- Create and run scans that discover files, extract metadata (EXIF, IPTC, spreadsheet columns), and detect folder naming patterns
- **Manifest editor** -- Build, refine, and approve encounter mappings with source priority, regex patterns, and preview of sample encounters
- **Directory management** -- Add, pause, resume, and rescan watched directories
- **Activity log** -- Audit trail of all actions taken in the client
- **Settings** -- User preferences, organization binding, and developer tools

## Related

- [Installation](/desktop/getting-started/installation/) -- download and install the client
- [Initial Setup](/desktop/getting-started/setup/) -- walk through the first-launch flow
- [For IT Teams](/desktop/getting-started/for-it-teams/) -- security, permissions, and deployment
- [Discovery](/desktop/discovery/discovery/) -- how directory scanning works
