---
title: "Network Requirements"
description: "Allowed domains, firewall rules, and telemetry policy"
sidebar:
  order: 4
quickRef:
  - "Single endpoint: your configured finwave API server. No telemetry, analytics, CDN, or crash-reporting calls"
  - "Firewall: outbound HTTPS port 443 to your finwave API domain. No inbound rules required"
  - "All transport HTTPS only — no fallback to HTTP, ever"
  - "JWT auth, refreshed automatically. No telemetry opt-in/opt-out toggle because there's no telemetry system"
  - "Discovery and manifest editing work fully offline; only sign-in (and future sync) need network"
---

In this guide you will learn:

- What network endpoints the desktop client connects to
- What firewall rules are required
- That the client sends no telemetry or analytics data

## Single API domain

The FinLaunch client communicates with exactly one network endpoint: your configured finwave API server. There are no other outbound connections. The client does not contact:

- Telemetry or analytics services
- Third-party APIs or CDNs
- Crash reporting endpoints

## No telemetry

The desktop client collects and transmits no telemetry, analytics, usage metrics, or crash reports. All data the client sends goes to your finwave API server and consists exclusively of API requests for authentication and data operations.

There is no opt-in or opt-out telemetry toggle because there is no telemetry system.

## Transport security

All communication between the desktop client and the finwave API uses HTTPS. The client does not fall back to unencrypted HTTP.

## Authentication

The client authenticates using JWT tokens. The sign-in flow is a standard credentials form within the application. The token is refreshed automatically when it expires.

## Firewall rules

If you need to configure your network to allow the desktop client, here are the requirements:

| Direction | Protocol | Port | Destination |
|---|---|---|---|
| Outbound | HTTPS | 443 | Your finwave API domain |

No inbound rules are required. The client does not listen on any ports or accept incoming connections.

:::tip
For firewall configuration, you only need to allow HTTPS traffic (port 443) to your finwave API domain. No other outbound rules are required.
:::

## Discovery works offline

Directory scanning, metadata extraction, and manifest editing all run locally. You only need a network connection for signing in and for future features like onboarding and synchronization.

## Related

- [Security Model](/desktop/it-security/security-model/) -- Tauri permissions and local data encryption
- [Activity Log](/desktop/it-security/audit-log/) -- Reviewing client activity
- [Deployment](/desktop/it-security/deployment/) -- Installing the client
