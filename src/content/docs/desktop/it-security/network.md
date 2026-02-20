---
title: "Network Requirements"
description: "Allowed domains, certificate pinning, and telemetry policy"
sidebar:
  order: 4
---

## What you'll learn

- What network endpoints the desktop client connects to
- How certificate pinning works and why it matters
- That the client sends no telemetry or analytics data
- How all network activity is logged
- Authentication and transport security details

## Single API domain

The finwave desktop client communicates with exactly one network endpoint: your configured finwave API server. By default, this is `api.finwave.io`. If your organization hosts a private instance, this is the custom domain your administrator configured during deployment.

There are no other outbound connections. The client does not contact:

- Telemetry or analytics services
- Third-party APIs
- CDNs or asset servers
- Crash reporting endpoints

:::tip
For firewall configuration, you only need to allow HTTPS traffic (port 443) to your finwave API domain. No other outbound rules are required.
:::

## Certificate pinning

The desktop client uses certificate pinning to protect against man-in-the-middle attacks. On first connection, the client pins either the server's TLS certificate or its CA chain (depending on your deployment configuration). Subsequent connections are verified against the pinned certificate.

If the server presents a certificate that does not match the pin, the connection is refused and an `error` category entry is written to the audit log.

:::caution
If your organization rotates TLS certificates, you need to update the certificate pin in the client configuration before the old certificate expires. A mismatched pin will block all API communication until resolved.
:::

## No telemetry

The desktop client collects and transmits no telemetry, analytics, usage metrics, or crash reports. All data the client sends goes to your finwave API server and consists exclusively of:

- Encounter and image data you explicitly upload
- Authentication tokens for your user session
- API requests for sync, onboarding, and configuration

There is no opt-in or opt-out telemetry toggle because there is no telemetry system to toggle.

## Request logging

Every HTTP request the client makes is recorded in the audit log under the `network` category. Each entry includes:

| Field | Logged | Example |
|---|---|---|
| HTTP method | Yes | `POST` |
| Endpoint path | Yes | `/api/v1/encounters` |
| Response status code | Yes | `201` |
| Bytes transferred | Yes | `245832` |
| Request body | **No** | -- |
| Response body | **No** | -- |

Request and response bodies are never logged. This means image data, metadata content, and authentication tokens do not appear in the audit log. The log captures enough detail to verify what the client communicated and to whom, without exposing sensitive payload data.

You can review the network log in the [IT Dashboard](/desktop/it-security/audit-log/) or export it as CSV/JSON for analysis.

## Authentication

The desktop client uses OAuth 2.0 with JWT tokens for authentication. Here is how the authentication flow works:

1. You sign in through a browser-based OAuth flow. The client opens your default browser to the finwave login page.
2. After successful authentication, the client receives an access token and a refresh token.
3. Tokens are stored in the operating system's native keychain (Keychain on macOS, Credential Manager on Windows, Secret Service on Linux).
4. The access token is sent with every API request. When it expires, the client uses the refresh token to obtain a new one automatically.

:::note
Tokens are never stored in plain text on disk. The OS keychain provides encrypted storage with access restricted to the finwave desktop client process.
:::

## Transport security

All communication between the desktop client and the finwave API uses HTTPS with the following requirements:

- **TLS 1.2 or higher** -- The client does not accept TLS 1.0 or 1.1 connections.
- **Chunked uploads** -- Large image files are uploaded in chunks. Each chunk is verified with a SHA-256 checksum to detect corruption or tampering in transit.
- **No downgrade** -- The client will not fall back to unencrypted HTTP under any circumstances.

## Firewall rules summary

If you need to configure your network to allow the desktop client, here are the minimum requirements:

| Direction | Protocol | Port | Destination |
|---|---|---|---|
| Outbound | HTTPS | 443 | Your finwave API domain (e.g., `api.finwave.io`) |

No inbound rules are required. The client does not listen on any ports or accept incoming connections.

## Related

- [Security Model](/desktop/it-security/security-model/) -- Tauri permissions and filesystem sandboxing
- [Audit Log](/desktop/it-security/audit-log/) -- Full audit log format and the IT dashboard
- [Deployment](/desktop/it-security/deployment/) -- Configuring the API URL during deployment
- [Upload Process](/desktop/onboarding/upload-process/) -- How uploads use chunked transfer with checksums
