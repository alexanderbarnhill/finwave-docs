---
title: "Linux Package Repository"
description: "Set up the finwave APT or RPM repository for automatic updates"
sidebar:
  order: 3
---

FinLaunch publishes official APT (Debian/Ubuntu) and RPM (Fedora/RHEL) repositories so you can install and update the desktop client through your system package manager.

## APT (Debian, Ubuntu, Pop!_OS, Mint)

### Add the repository

```bash
# Import the signing key
curl -fsSL https://finwavepublic.blob.core.windows.net/apt/finwave-repo.gpg.key \
  | sudo gpg --dearmor -o /usr/share/keyrings/finwave-archive-keyring.gpg

# Add the repository
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/finwave-archive-keyring.gpg] https://finwavepublic.blob.core.windows.net/apt stable main" \
  | sudo tee /etc/apt/sources.list.d/finwave.list
```

### Install

```bash
sudo apt update
sudo apt install finlaunch
```

### Update

FinLaunch will be updated alongside your other packages:

```bash
sudo apt update && sudo apt upgrade
```

---

## RPM (Fedora, RHEL, CentOS Stream, openSUSE)

### Add the repository

```bash
# Import the signing key
sudo rpm --import https://finwavepublic.blob.core.windows.net/rpm/finwave-repo.gpg.key

# Add the repository
sudo tee /etc/yum.repos.d/finwave.repo <<'EOF'
[finwave]
name=finwave FinLaunch
baseurl=https://finwavepublic.blob.core.windows.net/rpm
enabled=1
gpgcheck=1
gpgkey=https://finwavepublic.blob.core.windows.net/rpm/finwave-repo.gpg.key
EOF
```

### Install

```bash
# Fedora / RHEL 8+
sudo dnf install finlaunch

# Older RHEL / CentOS
sudo yum install finlaunch
```

### Update

FinLaunch will be updated alongside your other packages:

```bash
sudo dnf upgrade finlaunch
```

---

## Verifying the installation

After installing, verify the package is correctly installed:

```bash
finlaunch --version
```

## Switching from manual install

If you previously installed FinLaunch from a downloaded `.deb` or `.rpm` file, adding the repository will take over future updates. Your existing installation and data in `~/.finwave/` are preserved.

## Related

- [Installation guide](/desktop/getting-started/installation/) -- platform-specific install instructions
- [Initial setup](/desktop/getting-started/setup/) -- first-launch configuration
