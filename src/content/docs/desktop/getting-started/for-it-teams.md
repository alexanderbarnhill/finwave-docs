---
title: "For IT Teams"
description: "Security overview, audit log, and network requirements"
sidebar:
  order: 4
---

In this guide you will learn:

- What filesystem and network access the desktop client has
- How the Tauri permission model restricts the application
- How local data is encrypted
- What the activity log records and how to export it

## Security posture at a glance

The finwave Desktop client scans local directories, extracts image metadata, and builds manifests that map your data to finwave's encounter format. All scanning and manifesting runs locally -- no data leaves your machine during these operations.

| Capability | Status |
|-----------|--------|
| Read user-selected directories | Allowed (user selects directories through folder picker) |
| Write to application data directory | Allowed (encrypted database, logs, config) |
| Network requests | HTTPS to a single configurable API domain only |
| Telemetry or analytics | None. No data sent to third parties. |
| Clipboard, screen capture, shell execution | Not permitted (capabilities not declared) |
| Activity log | Always on. Cannot be disabled. |

## Tauri permission model

The client is built on Tauri v2, which uses a capability-based permission system. The declared permissions are:

- `fs:allow-read-file` -- Read files in directories selected by the user
- `fs:allow-read-dir` -- List directory contents for scanning
- `fs:allow-write-file` -- Write application data (database, logs, config)
- `dialog:allow-open` -- Native folder picker dialogs
- `notification:default` -- Desktop notifications
- `shell:allow-open` -- Open URLs in the default browser
- `http:default` -- HTTPS requests to the finwave API
- `os:default` -- OS information for diagnostics
- `autostart:default` -- Launch on system startup (user-configurable)

Notably excluded: `clipboard`, `shell:execute`, `global-shortcut`.

## Local data encryption

The client stores scan data and manifests in a local SQLite database encrypted with SQLCipher:

- 256-bit random key generated per organization
- Key stored with restricted file permissions (`0600` on Unix)
- Database unlocked on sign-in, locked (connection closed) on sign-out
- Automatic migration from any unencrypted legacy database

## Network transparency

The client communicates exclusively with your configured finwave API domain. All traffic is HTTPS. There are no third-party analytics, crash reporting, or telemetry endpoints.

For firewall rules, allow outbound HTTPS (port 443) to your finwave API domain. No inbound rules are required.

## Activity log

The client maintains an append-only activity log recording application startup, filesystem operations, database events, and errors. Logs are stored as daily JSON line files in the application data directory.

Users can review, filter, and export the log from **Settings > Activity Log** in the application. Exports are available in JSON or CSV format.

The log never contains file contents, authentication tokens, or spreadsheet values.

## Authentication

The client uses JWT-based authentication with the finwave API. Users sign in with their finwave credentials. After signing in, users bind the client to their organization and selected populations.

## Current feature scope

The desktop client currently supports:

- **Discovery** -- Scanning directories, extracting image metadata, analyzing spreadsheets and folder patterns
- **Manifesting** -- Building and editing encounter field mappings with versioning and preview
- **Directory management** -- Adding, pausing, resuming, removing, and rescanning directories

**Not yet available:** Onboarding (uploading encounters to finwave) and automatic synchronization are under development.

## Enterprise deployment

Enterprise deployment features (silent installation, MDM/group policy, managed settings) are planned but not yet available. See [Deployment](/desktop/it-security/deployment/) for current installation steps.

## Related

- [Security Model](/desktop/it-security/security-model/) -- Full security architecture and encryption details
- [Activity Log](/desktop/it-security/audit-log/) -- Detailed activity log reference
- [Network Requirements](/desktop/it-security/network/) -- Firewall rules and telemetry policy
- [Installation](/desktop/getting-started/installation/) -- Download and install steps
