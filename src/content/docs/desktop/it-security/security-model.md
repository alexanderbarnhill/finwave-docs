---
title: "Security Model"
description: "Permissions, sandboxing, and filesystem access scope"
sidebar:
  order: 1
---

## What you'll learn

- How the finwave desktop client restricts its own access to your system
- What Tauri capabilities are used and what they permit
- How filesystem scope is enforced
- What the client explicitly cannot do

## Overview

The finwave desktop client is built on Tauri, a framework that uses a capability-based permission model. Rather than granting the application broad access to your system, each permission is declared explicitly and scoped as narrowly as possible. The client operates on a principle of minimal privilege: it reads your data where you tell it to, and writes only to its own application directory.

## Filesystem access

The client's filesystem access follows two strict rules:

1. **Read-only access to user directories** -- The client can read files and list directories, but only within paths you have explicitly selected (watched directories and any directories you open via the file dialog). It cannot read arbitrary locations on your system.

2. **Write access limited to application data** -- The client can write files only within `~/.finwave/`. This is where it stores configuration, training data crops, logs, and cached state. It never writes to your image directories, documents folder, or any other user-owned location.

<!-- screenshot: Permissions summary in the IT Dashboard showing read/write scope -->

## Tauri capability permissions

The desktop client declares the following Tauri capabilities:

| Permission | Purpose |
|---|---|
| `fs:read-files` | Read image files and spreadsheets from user-selected directories |
| `fs:read-dirs` | List directory contents to discover images and build manifests |
| `fs:write-app-data` | Write configuration, logs, training crops, and state to `~/.finwave/` |
| `dialog:open` | Show native file/folder picker dialogs for directory selection |
| `notification:default` | Send desktop notifications for sync events and upload progress |
| `shell:open` | Open URLs in the default browser (e.g., links to the web application) |
| `http:default` | Make HTTPS requests to the configured finwave API server |
| `os:default` | Read basic OS information (platform, version) for diagnostics |
| `autostart:default` | Register/unregister the client to start at system login |

## What the client cannot do

The following capabilities are intentionally excluded:

- **`fs:write-files` for user directories** -- The client cannot modify, rename, or delete your images, spreadsheets, or any other files outside `~/.finwave/`.
- **Clipboard access** -- The client cannot read from or write to your system clipboard.
- **`shell:execute`** -- The client cannot launch other programs, scripts, or shell commands on your system.

:::note
These restrictions are enforced at the framework level by Tauri's capability system, not by application-level code. Even if a bug existed in the client logic, the framework would block any unauthorized operation.
:::

## Filesystem scope

Beyond the capability permissions, the client applies an additional filesystem scope restriction. The directories the client can access are limited to:

- **User-selected directories** -- Any directory you have explicitly chosen through the file dialog or configured as a watched directory.
- **`~/.finwave/`** -- The application's own data directory.

The client cannot enumerate or access directories you have not selected, even if the `fs:read-dirs` permission would technically allow it. The scope acts as a second layer of access control.

:::tip
You can review exactly which directories the client has access to at any time under **Settings > Permissions**. Removing a directory from your watched list also revokes read access to it.
:::

## For IT administrators

If you are evaluating the desktop client for deployment in your organization, the key points are:

- The client never writes outside `~/.finwave/`. Your users' data directories are read-only.
- No shell execution means the client cannot be used as a vector to run arbitrary commands.
- No clipboard access means sensitive data cannot be exfiltrated through copy/paste interception.
- All network traffic goes to a single configurable API domain. There is no telemetry or third-party communication.
- The full list of permissions is auditable in the Tauri capability manifest shipped with the application binary.

For deployment options including silent install, group policy, and lockable settings, see [Deployment](/desktop/it-security/deployment/).

## Related

- [Audit Log](/desktop/it-security/audit-log/) -- What the client logs and how to review activity
- [Network Requirements](/desktop/it-security/network/) -- Allowed domains, certificate pinning, and request logging
- [Deployment](/desktop/it-security/deployment/) -- Silent install, MDM, and managed settings
- [For IT Teams](/desktop/getting-started/for-it-teams/) -- Quick-start guide for IT administrators
