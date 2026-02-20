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

Download the finwave Desktop installer from your organization's finwave admin panel, or from the downloads page at [finwave.io/download](https://finwave.io/download). Choose the installer for your operating system:

| Platform | Installer | Format |
|----------|-----------|--------|
| Windows | `finwave-Desktop-x.x.x-setup.exe` | Authenticode-signed EXE |
| macOS | `finwave-Desktop-x.x.x.dmg` | Apple-notarized DMG |
| Linux | `finwave-desktop_x.x.x_amd64.deb` / `.rpm` / `.AppImage` | GPG-signed package |

:::tip
All release builds are code-signed. Your operating system should verify the signature automatically during installation. If you see a warning about an unsigned or unverified application, do not proceed -- contact your IT team or finwave support.
:::

## System requirements

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| OS | Windows 10+, macOS 12+, Ubuntu 20.04+ (or equivalent) | Latest stable release |
| RAM | 4 GB | 8 GB+ (for large scans with 100K+ images) |
| Disk space | 200 MB for the application | Additional space for local scan data and training crops in `~/.finwave/` |
| Display | 1280 x 720 | 1920 x 1080+ |
| Network | Required for onboarding and sync | Broadband recommended for large uploads |
| Webview | System webview (Edge WebView2 on Windows, WebKit on macOS/Linux) | Kept up to date by your OS |

:::note
Discovery and manifesting work entirely offline. You only need a network connection for authentication, onboarding, and synchronization.
:::

## Install on Windows

1. Run the downloaded `.exe` installer.
2. Follow the setup wizard prompts. The default installation directory is fine for most users.
3. When prompted, allow the installer to install Microsoft Edge WebView2 if it is not already present.
4. Click **Finish** to complete installation.

<!-- screenshot: Windows installer setup wizard -->

## Install on macOS

1. Open the downloaded `.dmg` file.
2. Drag **finwave Desktop** into your **Applications** folder.
3. On first launch, macOS may ask you to confirm that you want to open an application downloaded from the internet. Click **Open**. The app is notarized with Apple, so this prompt appears only once.

<!-- screenshot: macOS drag-to-install DMG window -->

## Install on Linux

Install using your distribution's package manager:

```bash
# Debian / Ubuntu
sudo dpkg -i finwave-desktop_x.x.x_amd64.deb

# Fedora / RHEL
sudo rpm -i finwave-desktop-x.x.x.x86_64.rpm
```

Alternatively, use the `.AppImage` for a portable installation that does not require root access. Make it executable and run it directly:

```bash
chmod +x finwave-Desktop-x.x.x.AppImage
./finwave-Desktop-x.x.x.AppImage
```

## Verify the download

If your IT team requires build verification, you can compare the installer's checksum against the published hash on the finwave releases page. Each release includes SHA-256 checksums for every platform artifact.

```bash
sha256sum finwave-Desktop-x.x.x-setup.exe
```

Compare the output against the value listed on the release page.

## First launch

When you open the desktop client for the first time, it opens in a full window (not minimized to the system tray). You will be guided through the [Initial Setup](/desktop/getting-started/setup/) flow to authenticate, select your organization, and configure which populations the client manages.

On subsequent launches, the client starts minimized to the system tray and resumes from its previous state. You can configure whether the client launches automatically at system startup in Settings.

:::caution
Do not close the setup window before completing the initial configuration. The client cannot operate until it is bound to an organization.
:::

## Silent installation

For IT teams deploying across multiple machines, the client supports silent installation with pre-configured settings. See [For IT Teams](/desktop/getting-started/for-it-teams/) for details on command-line flags, MDM profiles, and group policy support.

## Related

- [Initial Setup](/desktop/getting-started/setup/) -- complete the first-launch configuration
- [What Is the Desktop Client?](/desktop/getting-started/what-is-it/) -- purpose and design overview
- [For IT Teams](/desktop/getting-started/for-it-teams/) -- deployment, security, and compliance
