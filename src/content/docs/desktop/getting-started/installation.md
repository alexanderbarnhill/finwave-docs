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
| macOS (Apple Silicon) | `finlaunch_x.x.x_aarch64.dmg` | DMG disk image |
| macOS (Intel) | `finlaunch_x.x.x_x64.dmg` | DMG disk image |
| Linux | `finlaunch_x.x.x_amd64.deb` / `.rpm` / `.AppImage` | Package or portable image |

:::tip
If your operating system warns you about an unverified application during installation, consult your IT team or finwave support for guidance.
:::

## System requirements

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| OS | Windows 10+, macOS 11+, Ubuntu 20.04+ (or equivalent) | Latest stable release |
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

## Install on macOS

1. Open the downloaded `.dmg` file.
2. Drag **FinLaunch** into the **Applications** folder.
3. On first launch, macOS may show a Gatekeeper warning. Right-click the app and select **Open**, then confirm in the dialog.

:::note
Apple Silicon Macs (M1/M2/M3/M4) should use the `aarch64.dmg` build. Intel Macs should use the `x64.dmg` build. The downloads page auto-detects your architecture.
:::

## Install on Linux

### Recommended: Package repository (auto-updates)

The easiest way to install and keep FinLaunch up to date on Linux is through the official package repository. See the [Linux Package Repository](/desktop/getting-started/linux-repo/) guide for full setup instructions.

```bash
# Quick start — Debian/Ubuntu
curl -fsSL https://finwavepublic.blob.core.windows.net/apt/finwave-repo.gpg.key \
  | sudo gpg --dearmor -o /usr/share/keyrings/finwave-archive-keyring.gpg
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/finwave-archive-keyring.gpg] https://finwavepublic.blob.core.windows.net/apt stable main" \
  | sudo tee /etc/apt/sources.list.d/finwave.list
sudo apt update && sudo apt install finlaunch
```

### Manual install

If you prefer to install from a downloaded file:

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

:::tip
The AppImage format supports Tauri's built-in auto-updater. The `.deb` and `.rpm` manual installs do not — use the [package repository](/desktop/getting-started/linux-repo/) for automatic updates with those formats.
:::

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
