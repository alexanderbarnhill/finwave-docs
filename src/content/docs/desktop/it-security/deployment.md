---
title: "Deployment"
description: "Installing the desktop client in your organization"
sidebar:
  order: 3
---

:::note
Enterprise deployment features (silent installation, MDM/group policy integration, and managed settings) are under active development and not yet available. This page describes the current installation process and will be updated when enterprise deployment ships.
:::

## Current installation

The desktop client is installed using the standard installer for your platform:

- **Windows:** Run the `.exe` installer and follow the setup wizard
- **macOS:** Open the `.dmg` and drag the application to your Applications folder
- **Linux:** Install the `.deb` or `.rpm` package, or use the portable `.AppImage`

See [Installation](/desktop/getting-started/installation/) for step-by-step instructions.

After installation, each user signs in with their finwave credentials and selects their organization and populations during the [initial setup](/desktop/getting-started/setup/) flow.

## Application data

The client stores all local data in its application data directory:

| Data | Location |
|---|---|
| Encrypted database | Application data directory |
| Audit logs | `logs/` subdirectory (daily JSON files) |
| Database encryption keys | `.db_keys/` subdirectory (restricted file permissions) |

The client does not write to any user data directories. See [Security Model](/desktop/it-security/security-model/) for details on encryption and file permissions.

## Planned enterprise features

The following features are planned for future releases:

- **Silent installation** with pre-configured API URL and settings
- **MDM and group policy** support for centrally managed settings
- **Lockable settings** that users cannot override
- **Auto-update** with signature verification

## Related

- [Installation](/desktop/getting-started/installation/) -- Download and install steps
- [Initial Setup](/desktop/getting-started/setup/) -- First-launch configuration
- [Security Model](/desktop/it-security/security-model/) -- Permissions and local data security
