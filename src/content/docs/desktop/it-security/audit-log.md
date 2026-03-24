---
title: "Activity Log"
description: "What the client logs and how to review and export activity"
sidebar:
  order: 2
---

In this guide you will learn:

- What the desktop client records in its activity log
- How to filter and browse log entries
- How to export logs for review or compliance

## What gets logged

The FinLaunch client maintains a local activity log that records significant actions. Every log entry includes a timestamp, category, action description, and optional detail fields. Log entries are written as JSON lines to daily log files in the application data directory.

Logged events include:

| Category | What is recorded |
|---|---|
| `config` | Application startup |
| `filesystem` | Directory scans, file writes to application data |
| `database` | Database open, close, migration, and reset events |
| `auth` | Keychain access (set, delete) |
| `error` | Application errors |

:::note
The activity log is append-only. The client never modifies or deletes existing log entries. Each calendar day gets its own log file.
:::

## Viewing the activity log

Open **Settings > Activity Log** from the sidebar. The log viewer shows entries in reverse chronological order (newest first), with each entry displaying:

- Timestamp
- Category (color-coded by type)
- Action
- Detail (file paths, error messages, or other context)

You can filter entries by category using the category dropdown, and by date range using the date picker. The viewer loads entries in pages of 50, with a **Load more** button to see older entries.

## Exporting logs

Click the **Export** button to save the current filtered log entries as a file. You can choose between:

- **JSON** -- Machine-readable format for programmatic analysis
- **CSV** -- For spreadsheet review or import into reporting tools

The export uses a native save dialog so you can choose the file location.

## Log file location

Log files are stored in the application data directory under `logs/`. Each file is named with the date: `audit.YYYY-MM-DD.log`. The files are standard JSON lines format (one JSON object per line).

## What is not logged

- File contents, pixel data, or spreadsheet values
- Authentication tokens
- Network request or response bodies

## Related

- [Security Model](/desktop/it-security/security-model/) -- Tauri permissions and local encryption
- [Network Requirements](/desktop/it-security/network/) -- Network traffic and firewall rules
