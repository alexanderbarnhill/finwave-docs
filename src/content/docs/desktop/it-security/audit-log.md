---
title: "Audit Log"
description: "What's logged, how to export, and the IT dashboard"
sidebar:
  order: 2
---

## What you'll learn

- What the desktop client records in the audit log
- The log format and entry categories
- How to use the IT dashboard to review activity
- How to export logs for compliance or troubleshooting

## What gets logged

The finwave desktop client maintains an append-only audit log that records every significant action the application takes. This includes file system reads, network requests, authentication events, configuration changes, sync activity, and errors. The log is designed for IT review and compliance -- it provides a complete record of what the client did, when, and why.

The audit log is stored at `~/.finwave/logs/audit.log` and is rotated daily. Previous days' logs are preserved as timestamped files in the same directory.

:::note
The audit log is append-only. The client never modifies or deletes existing log entries. Log rotation creates a new file for each day; it does not discard old data.
:::

## Log entry format

Each audit log entry contains the following fields:

| Field | Description |
|---|---|
| `timestamp` | UTC timestamp of the event (ISO 8601 format) |
| `category` | The event category (see table below) |
| `action` | A short description of what happened (e.g., `file_read`, `upload_start`, `auth_refresh`) |
| `detail` | Additional context such as file path, endpoint URL, or error message |
| `scope` | The directory or resource scope the action applies to |
| `bytes` | Number of bytes transferred, if applicable |
| `user` | The authenticated finwave user account |

## Categories

Events are grouped into six categories:

| Category | What it covers |
|---|---|
| `filesystem` | File reads, directory listings, and training data writes to `~/.finwave/` |
| `network` | HTTP requests to the finwave API (method, endpoint, response code, bytes transferred) |
| `auth` | Login, logout, token refresh, and authentication failures |
| `config` | Changes to sync settings, watched directories, or other configuration |
| `sync` | Encounter detection, staging, confirmation, and upload events |
| `error` | Application errors, failed retries, and unhandled exceptions |

## The IT dashboard

The desktop client includes a built-in IT dashboard that provides a visual summary of audit log data. You find it under **Settings > IT Dashboard**.

<!-- screenshot: IT Dashboard showing permissions summary, activity summary, and network log -->

The dashboard has three sections:

### Permissions summary

A table showing every Tauri capability the client has, what it permits, and the current filesystem scope (which directories the client can access). This is the same information described in the [Security Model](/desktop/it-security/security-model/), presented in a compact, auditable format.

### Activity summary (24 hours)

A breakdown of the last 24 hours of audit log activity, grouped by category. This gives you a quick answer to "what has this client been doing?" without reading raw log lines. Typical entries include:

- Number of files read
- Number of network requests sent
- Number of encounters synced
- Number of errors

### Network log

A filtered view showing only `network` category entries. Each row shows the HTTP method, endpoint path, response status code, and bytes transferred. Request and response bodies are never logged.

:::tip
Use the network log to verify that the client is communicating only with your expected API domain. If you see requests to any domain other than your configured API URL, something is misconfigured.
:::

## Exporting logs

You can export audit log data from the IT dashboard in two formats:

- **CSV** -- For spreadsheet analysis or import into reporting tools
- **JSON** -- For programmatic analysis or ingestion into log management systems (SIEM, Splunk, ELK)

The export includes all entries for the selected date range. You can filter by category before exporting if you only need a subset of events.

<!-- screenshot: Export dialog with date range picker and format selection -->

## Log rotation

Audit logs rotate daily at midnight UTC. The current day's log is always at `~/.finwave/logs/audit.log`. Previous days are stored as `~/.finwave/logs/audit-YYYY-MM-DD.log`. The client does not automatically delete old log files -- they accumulate until you or your organization's log management policy removes them.

## Related

- [Security Model](/desktop/it-security/security-model/) -- Tauri permissions and filesystem scope
- [Network Requirements](/desktop/it-security/network/) -- What network traffic the client generates
- [Deployment](/desktop/it-security/deployment/) -- Managing the client across your organization
- [For IT Teams](/desktop/getting-started/for-it-teams/) -- Quick-start guide for IT administrators
