---
title: "For IT Teams"
description: "Security overview, audit log, permissions model, and deployment"
sidebar:
  order: 4
---

In this guide you will learn:

- What filesystem and network access the desktop client has
- How the Tauri permission model restricts the application
- What the audit log records and how to export it
- How to deploy the client across your organization using silent install, MDM, or group policy
- How credentials and data are secured

## Security posture at a glance

The finwave Desktop client is a background service that scans filesystems, reads image metadata, and uploads data to a cloud API. IT teams should understand exactly what it does and does not do.

| Capability | Status |
|-----------|--------|
| Read user-selected directories | Allowed (user must explicitly grant each directory) |
| Write to user data directories | Denied (enforced by Tauri sandbox) |
| Write to `~/.finwave/` | Allowed (app data only) |
| Network requests | HTTPS to a single configurable API domain only |
| Telemetry or analytics | None. No data sent to third parties. |
| Clipboard, screen capture, email, contacts | Denied (not requested) |
| Audit log | Always on. Cannot be disabled. |

## Tauri permission model

The client is built on Tauri v2, which uses a capability-based permission system enforced at the OS level. The declared permissions are:

- `fs:read-files` -- read files in user-selected directories only
- `fs:read-dirs` -- list directory contents
- `fs:write-app-data` -- write to `~/.finwave/` only
- `dialog:open` -- folder picker dialogs
- `notification:default` -- desktop notifications
- `shell:open` -- open URLs in the default browser
- `http:default` -- HTTPS requests to the configured finwave API domain only
- `os:default` -- OS info (platform, version)
- `autostart:default` -- launch on startup (user-configurable)

Notably absent: no `fs:write-files` for user directories, no `clipboard`, no `shell:execute`, no `global-shortcut`, no `window:allow-screen-capture`. The `fs` scope restriction is OS-level sandboxing, not application-level -- it cannot be bypassed by application code.

## Network transparency

The client communicates exclusively with a single configurable API domain (default: `api.finwave.io`). All traffic is standard HTTPS (TLS 1.2+). There are no third-party analytics services, no crash reporting endpoints, no external telemetry of any kind.

**Certificate pinning** is enabled. The client pins the finwave API's TLS certificate chain to prevent man-in-the-middle attacks. If the certificate does not match, the connection is refused and an error is logged.

Verify the client's network behavior by inspecting the API domain in the app's configuration, monitoring network traffic with your own tools, or reviewing network entries in the audit log.

## Activity audit log

The client maintains a comprehensive, append-only audit log at `~/.finwave/logs/`. Logs are rotated daily. Every significant action is recorded, including:

| Category | What is logged |
|----------|---------------|
| Filesystem | Directory added/removed from watch, scan started/completed with file counts, batched file reads during metadata extraction |
| Network | API request method, endpoint, response code, bytes transferred, upload start/completion, connection state changes |
| Auth | Login, logout, token refresh, token expiry, re-authentication prompts |
| Config | Manifest created/updated/approved, sync config changes, directory watch state changes |
| Sync | Encounter staged/confirmed/skipped/uploaded, duplicate detection, sync cycle summaries |
| Error | Any error with full context (failed uploads, scan errors, permission denied, timeouts) |

The log never contains file contents, pixel data, authentication tokens, or spreadsheet values.

:::tip
Open **Settings > Transparency & Audit** in the desktop client to see a summary of permissions, recent activity, and network requests. Use **Export Full Audit Log** to generate a CSV or JSON file that your SIEM or monitoring platform can ingest.
:::

## Credential storage

API tokens are stored exclusively in OS-native credential storage:

- **macOS:** Keychain Services
- **Windows:** Windows Credential Manager (DPAPI)
- **Linux:** Secret Service API (GNOME Keyring / KDE Wallet)

Credentials are never written to config files, log files, or local databases. They exist only in the OS keychain and in-memory during the session.

## Code-signed builds

All release builds are signed:

- **macOS:** Apple Developer ID, notarized with Apple
- **Windows:** Authenticode EV code signing certificate
- **Linux:** GPG-signed packages

SHA-256 checksums are published with each release for integrity verification. Auto-updates verify the new binary's signature before applying; if verification fails, the update is rejected and an error is logged.

## Silent installation

For deploying across multiple machines, the client supports silent installation with pre-configured settings:

```bash
finwave-desktop install \
  --api-url=https://api.finwave.io \
  --data-dir=/opt/finwave-data \
  --autostart=true \
  --silent
```

## MDM and group policy support

You can lock settings via managed configuration so users cannot change them:

- **Windows:** Group Policy registry keys
- **macOS:** Managed preferences (MDM profile)
- **Linux:** System-wide config file at `/etc/finwave/policy.json`

Locked settings appear grayed out in the app UI with a note: "This setting is managed by your organization."

Lockable settings include: API endpoint URL, autostart behavior, auto-confirm (force off to require manual review), data directory location, bandwidth limits, and allowed directory roots.

## Centralized logging

The audit log can optionally be forwarded to a syslog endpoint or written to a network share, allowing you to aggregate logs from all desktop clients into your SIEM or monitoring platform.

## Related

- [What Is the Desktop Client?](/desktop/getting-started/what-is-it/) -- purpose and design overview
- [Installation](/desktop/getting-started/installation/) -- download and install steps
- [Initial Setup](/desktop/getting-started/setup/) -- first-launch configuration flow
- [Audit Log](/desktop/it-security/audit-log/) -- detailed audit log reference
- [Security Model](/desktop/it-security/security-model/) -- full security architecture
