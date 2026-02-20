---
title: "Deployment"
description: "Silent install, MDM/group policy, and locked settings"
sidebar:
  order: 3
---

## What you'll learn

- How to perform a silent (unattended) installation
- How to configure the client via group policy or MDM
- Which settings can be locked by administrators
- How locked settings appear to end users

## Silent installation

The finwave desktop client supports fully unattended installation for large-scale deployments. Use the `install` command with the `--silent` flag to suppress all UI prompts:

```bash
finwave-desktop install \
  --api-url https://api.yourorg.finwave.io \
  --data-dir ~/.finwave \
  --autostart \
  --silent
```

### Install parameters

| Flag | Required | Description |
|---|---|---|
| `--api-url` | Yes | The finwave API endpoint the client connects to |
| `--data-dir` | No | Override the default application data directory (default: `~/.finwave/`) |
| `--autostart` | No | Register the client to start automatically at system login |
| `--silent` | No | Suppress all installation dialogs and prompts |

:::tip
Combine `--silent` with your deployment tool's package distribution (SCCM, Jamf, Ansible, etc.) for zero-touch rollouts. The client is ready to use immediately after install -- users just need to sign in.
:::

## Group policy and MDM

After installation, you can centrally manage client settings through your organization's policy framework. The client reads managed settings from platform-specific locations:

| Platform | Policy source |
|---|---|
| **Windows** | Registry keys under `HKLM\SOFTWARE\Policies\finwave\Desktop` |
| **macOS** | Managed preferences via MDM profile (domain: `io.finwave.desktop`) |
| **Linux** | JSON policy file at `/etc/finwave/policy.json` |

### Policy file format (Linux)

```json
{
  "api_url": {
    "value": "https://api.yourorg.finwave.io",
    "locked": true
  },
  "autostart": {
    "value": true,
    "locked": true
  },
  "auto_confirm": {
    "value": false,
    "locked": true
  },
  "bandwidth_limit_mbps": {
    "value": 50,
    "locked": false
  }
}
```

Each setting has a `value` and a `locked` flag. When `locked` is `true`, the user cannot change the setting in the UI.

:::note
Windows registry keys and macOS managed preferences follow the same structure -- each setting has a value and a corresponding `_locked` flag. Consult your MDM documentation for the specific key format.
:::

## Lockable settings

The following settings can be centrally managed and optionally locked:

| Setting | Type | Description |
|---|---|---|
| `api_url` | string | The finwave API server URL |
| `autostart` | boolean | Whether the client starts at system login |
| `auto_confirm` | boolean | Whether staged encounters upload without user confirmation |
| `data_dir` | string | The application data directory path |
| `bandwidth_limit_mbps` | number \| null | Upload bandwidth cap in Mbps |
| `allowed_directory_roots` | string[] | Restrict which directories users can add as watched directories. If set, users can only select subdirectories of these roots. |

### Managed vs. locked

There is a distinction between managed and locked settings:

- **Managed** -- The organization provides a default value. The user can still change it.
- **Locked** -- The organization provides a value and prevents the user from changing it.

Set `locked: true` only for settings that must be enforced (such as the API URL or directory restrictions). Leave other settings managed-but-unlocked to give users flexibility while establishing sensible defaults.

## How locked settings appear

When a setting is locked, the corresponding control in the settings UI is disabled and displays a label: **"Managed by your organization."** The user can see the current value but cannot modify it.

<!-- screenshot: Settings panel showing a locked API URL field with "Managed by your organization" label -->

:::caution
If you lock `allowed_directory_roots`, users will only be able to add watched directories under the specified paths. Make sure the roots you configure include all locations where your researchers store field data.
:::

## Verifying deployment

After deploying the client, you can verify the configuration on any machine by:

1. Opening the desktop client and navigating to **Settings > IT Dashboard**.
2. Checking the permissions summary to confirm the expected Tauri capabilities.
3. Reviewing the configuration section to confirm managed and locked settings are applied.
4. Checking the audit log for the initial `config` entries written at first launch.

## Related

- [Security Model](/desktop/it-security/security-model/) -- Tauri permissions, filesystem scope, and sandboxing
- [Audit Log](/desktop/it-security/audit-log/) -- Reviewing client activity and exporting logs
- [Network Requirements](/desktop/it-security/network/) -- Allowed domains and firewall rules
- [Sync Configuration](/desktop/sync/configuration/) -- All sync settings that can be managed via policy
- [For IT Teams](/desktop/getting-started/for-it-teams/) -- Quick-start guide for IT administrators
