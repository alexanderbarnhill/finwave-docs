---
title: "Installation"
description: "Download, install, and system requirements"
sidebar:
  order: 2
---

In this guide you will learn:

- Where to download the desktop client
- System requirements for Windows, macOS, and Linux
- How to verify the download and complete installation
- What to expect on first launch

## Download

Download the FinLaunch installer from the [downloads page](/desktop/download/). Choose the installer for your operating system:

| Platform | Installer | Format |
|----------|-----------|--------|
| Windows | `finlaunch_x.x.x_x64-setup.exe` | EXE installer |
| Windows | `finlaunch_x.x.x_x64_en-US.msi` | MSI installer |
| Linux | `finlaunch_x.x.x_amd64.deb` / `.rpm` / `.AppImage` | Package or portable image |

:::tip
If your operating system warns you about an unverified application during installation, consult your IT team or finwave support for guidance.
:::

## System requirements

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| OS | Windows 10+, Ubuntu 20.04+ (or equivalent) | Latest stable release |
| RAM | 4 GB | 8 GB+ (for large scans with 100K+ images) |
| Disk space | 200 MB for the application | Additional space for local scan data and training crops in `~/.finwave/` |
| Display | 1280 x 720 | 1920 x 1080+ |
| Network | Required for authentication | Broadband recommended for future upload features |
| Webview | System webview (Edge WebView2 on Windows, WebKit on macOS/Linux) | Kept up to date by your OS |

:::note
Discovery and manifesting work entirely offline after you sign in. You only need a network connection for authentication.
:::

## Install on Windows

1. Run the downloaded `.exe` installer.
2. Follow the setup wizard prompts. The default installation directory is fine for most users.
3. When prompted, allow the installer to install Microsoft Edge WebView2 if it is not already present.
4. Click **Finish** to complete installation.

<!-- screenshot: Windows installer setup wizard -->

## Install on Linux

Install using your distribution's package manager:

```bash
# Debian / Ubuntu
sudo dpkg -i finlaunch_x.x.x_amd64.deb

# Fedora / RHEL
sudo rpm -i finlaunch-x.x.x.x86_64.rpm
```

Alternatively, use the `.AppImage` for a portable installation that does not require root access. Make it executable and run it directly:

```bash
chmod +x finlaunch_x.x.x_amd64.AppImage
./finlaunch_x.x.x_amd64.AppImage
```

## First launch

When you open the desktop client for the first time, it opens in a full window (not minimized to the system tray). You will be guided through the [Initial Setup](/desktop/getting-started/setup/) flow to authenticate, select your organization, and configure which populations the client manages.

On subsequent launches, the client resumes from its previous state.

:::caution
Do not close the setup window before completing the initial configuration. The client cannot operate until it is bound to an organization.
:::

## Related

- [Initial Setup](/desktop/getting-started/setup/) -- complete the first-launch configuration
- [What Is the Desktop Client?](/desktop/getting-started/what-is-it/) -- purpose and design overview
- [For IT Teams](/desktop/getting-started/for-it-teams/) -- deployment, security, and compliance
