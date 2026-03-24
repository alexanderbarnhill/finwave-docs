---
title: "Onboarding Overview"
description: "The end-to-end pipeline for getting your image data into finwave"
sidebar:
  order: 1
---

In this guide you will learn:

- The four stages of onboarding: Discovery, Manifesting, Review, and Sync
- What each stage does and what you need to do at each step
- How local and cloud-stored data are handled differently

## What onboarding does

Onboarding is the process of getting your existing image collection into finwave. The desktop app guides you through a structured pipeline that organizes your raw files into encounters, verifies the data, and uploads everything to the server where the ML pipeline processes it.

## The pipeline

### 1. Discovery

Scan your image directories to build a file inventory. Discovery extracts metadata from every image (EXIF dates, GPS, camera info, IPTC creator) and analyzes folder structures and spreadsheets for additional encounter data.

- **Local directories** -- Select folders on your machine or external drives. Scanning runs locally.
- **Azure blob storage** -- Connect a storage account and scan blob containers remotely. A cloud worker processes the files without downloading them to your machine.

[Learn more about Discovery](/desktop/discovery/discovery/)

### 2. Manifesting

Configure how your files are grouped into encounters. A manifest defines the rules for extracting date, location, photographer, and individual IDs from your file metadata.

- Choose a grouping strategy (folder, filename, time proximity, or fusion)
- Configure field source mappings
- Resolve photographer names to finwave user accounts
- Preview the results and refine until the grouping looks correct

[Learn more about Manifesting](/desktop/discovery/manifesting/)

### 3. Pre-Sync Review

After approving a manifest, it is **materialized** into concrete encounter records. The pre-sync review lets you inspect each encounter:

- Verify data completeness (date, location, GPS, photographer)
- Assign licenses (Public, Public+Attribution, or Private)
- Assign organizations
- Approve or deny individual encounters
- Edit encounter data inline if corrections are needed

[Learn more about Pre-Sync Review](/desktop/onboarding/pre-sync-review/)

### 4. Sync

Upload approved encounters and their images to finwave. The sync engine:

- Creates encounter records on the server (or finds existing ones via dedup)
- Uploads images via SAS URIs (local files) or blob-to-blob copy (Azure files)
- Tracks progress per encounter and per image
- Handles retries on transient errors automatically
- Triggers the ML pipeline for each uploaded image

[Learn more about Sync](/desktop/sync/how-sync-works/)

## Resumability

Each stage saves its state. You can close the app and resume later:

- **Scans** persist in the local database
- **Manifests** are saved as you edit them
- **Materialized encounters** persist across sessions
- **Sync progress** is tracked per image -- interrupted syncs resume where they left off

## Local vs. cloud data

| | Local directories | Azure blob storage |
|---|---|---|
| Discovery | Scans locally, fast | Cloud worker, may take hours for large datasets |
| Metadata | Full EXIF/IPTC extraction | Header-only download (128KB per image) |
| Sync upload | Desktop uploads via SAS URI | Server-side blob-to-blob copy (fast, no local bandwidth) |

:::tip
For large datasets stored in Azure, the cloud path (discovery + blob-to-blob sync) avoids downloading any full images to your desktop. Only 128KB headers are used for metadata extraction.
:::

## Related

- [Azure Blob Storage](/desktop/onboarding/azure-storage/) -- Connecting cloud storage
- [Ensure Individuals](/desktop/onboarding/pre-training/) -- Pre-sync individual creation
- [Upload Process](/desktop/onboarding/upload-process/) -- Technical upload details
- [Getting Help](/desktop/getting-started/getting-help/) -- Support and diagnostics
