---
title: "Onboarding"
description: "Guides for contributors getting their data into finwave"
sidebar:
  order: 1
---

These guides walk contributors through the steps for handing data over to finwave. There are two onboarding paths — pick the one that matches how you were contacted.

## Which path is mine?

| | **Azure Storage Explorer + SAS link** | **finwave Desktop App** |
|---|---|---|
| You install | Microsoft's free Azure Storage Explorer | The finwave desktop client |
| Your credential | A one-time SAS link we email you | Your finwave login |
| Best for | One-off batch uploads of an existing dataset | Ongoing libraries that change over time |
| Discovery / scanning | None — you just upload | Scans your folders for EXIF, GPS, and encounter structure |
| Manifest + review | We do it on our side after upload | You do it locally before sync, with progress and resume |
| Picks up where it left off | No — re-uploading is your job | Yes — every stage is resumable |

**Use the SAS-link path if:** we sent you an email with a link ending in `?sv=…&sig=…` and asked you to upload files.

**Use the desktop app path if:** you have an active research collection that grows over time, you want finwave to discover and group your images automatically, or you want sync that resumes after disconnection.

## Guides

- **[Uploading via Azure Storage Explorer](/onboarding/azure-storage-explorer/)** — You received a SAS link from us. Install Microsoft's tool, attach the container, drag and drop your files. No Azure account or finwave login required.
- **[Desktop Client Onboarding](/desktop/onboarding/overview/)** — Install the finwave desktop app, run discovery on your image directories, build a manifest, and sync. Designed for long-lived collections.
