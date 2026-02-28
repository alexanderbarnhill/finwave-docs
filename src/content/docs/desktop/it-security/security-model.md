---
title: "Security Model"
description: "Tauri permissions, filesystem access, and local data encryption"
sidebar:
  order: 1
---

In this guide you will learn:

- How the Tauri capability model restricts the desktop client
- What filesystem and network permissions are declared
- How the local database is encrypted
- How authentication tokens are handled

## Overview

The finwave desktop client is built on Tauri v2, which uses a capability-based permission model. Permissions are declared in the application's capability manifests and enforced by the Tauri framework at the webview boundary.

## Declared capabilities

The client declares the following Tauri permissions:

| Permission | Purpose |
|---|---|
| `core:default` | Standard Tauri window and event management |
| `fs:allow-read-file` | Read image files and spreadsheets from directories |
| `fs:allow-read-dir` | List directory contents for scanning |
| `fs:allow-write-file` | Write application data (logs, config, database) |
| `dialog:allow-open` | Show native folder picker dialogs |
| `notification:default` | Desktop notifications |
| `shell:allow-open` | Open URLs in the default browser |
| `http:default` | Make HTTPS requests to the finwave API |
| `os:default` | Read basic OS information for diagnostics |
| `autostart:default` | Register/unregister the client for system login startup |

Capabilities intentionally excluded:

- **`clipboard`** -- The client cannot read or write the system clipboard.
- **`shell:execute`** -- The client cannot launch programs, scripts, or shell commands.
- **`global-shortcut`** -- No system-wide keyboard shortcuts are registered.

## Filesystem access

The client reads files from directories you select through the folder picker or configure as watched directories. It writes application data (the encrypted database, audit logs, and configuration) to its application data directory.

:::note
The client reads your image files and spreadsheets to extract metadata during discovery. It does not modify, rename, or delete any files in your data directories.
:::

## Local database encryption

The client stores scan results, manifests, and configuration in a local SQLite database encrypted with SQLCipher:

- A 256-bit random encryption key is generated when the database is first created
- The key is stored in a file with restricted permissions (`0600` on Unix) in the application data directory
- The database is unlocked when you sign in and select your organization, and locked (connection closed, key dropped from memory) when you sign out
- If the client detects an older unencrypted database from a previous version, it automatically migrates the data to the encrypted format and removes the plaintext copy

## Authentication

The client uses JWT-based authentication:

1. You sign in with your finwave credentials on the login screen
2. The JWT token is stored in the browser's local storage within the Tauri webview
3. The token is attached to API requests automatically and refreshed when it expires
4. On sign-out, the database connection is closed and the token is cleared

After signing in, you must bind the client to an organization and one or more populations before the workspace becomes available.

## What the client does not do

- **No telemetry** -- The client sends no analytics, usage metrics, or crash reports to any service
- **No third-party connections** -- All network traffic goes to your configured finwave API domain
- **No background uploads** -- Upload functionality is not yet available (see [Onboarding](/desktop/onboarding/overview/))
- **No arbitrary code execution** -- The Tauri framework prevents the webview from launching processes

## Related

- [Audit Log](/desktop/it-security/audit-log/) -- What the client logs and how to export activity
- [Network Requirements](/desktop/it-security/network/) -- Allowed domains and firewall rules
- [Deployment](/desktop/it-security/deployment/) -- Installing and configuring the client
