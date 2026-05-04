---
title: "Onboarding"
description: "Guides for contributors getting their data into finwave"
sidebar:
  order: 1
quickRef:
  - "Three ways in: web Submit Encounter form (one at a time), Azure Storage Explorer + SAS link (batch), or the finwave desktop app (ongoing libraries)"
  - "Submit Encounter is the form you're already on — best for a handful of encounters with hand-entered metadata"
  - "SAS-link path: we email you a link, you install Microsoft's free tool, drag and drop. No finwave login required"
  - "Desktop app: discovers EXIF / GPS / folder structure automatically, runs a resumable sync. Best for collections that grow over time"
  - "Pick by volume: a few encounters → web form; hundreds in a one-off batch → SAS link; long-lived archive → desktop app"
---

These guides walk contributors through the steps for handing data over to finwave. There are three onboarding paths — pick the one that matches how you'll be working with finwave.

## Which path is mine?

| | **Web — Submit Encounter** | **Azure Storage Explorer + SAS link** | **finwave Desktop App** |
|---|---|---|---|
| You install | Nothing — it's a page in the finwave web app | Microsoft's free Azure Storage Explorer | The finwave desktop client |
| Your credential | Your finwave login | A one-time SAS link we email you | Your finwave login |
| Best for | Submitting encounters one at a time, with full metadata | One-off batch uploads of an existing dataset | Ongoing libraries that change over time |
| Volume | A handful of encounters | Hundreds to thousands of files in a single dataset | Long-lived collections of any size |
| Metadata | You fill in date, location, license, organization, behaviors per encounter | We do it on our side after upload | Discovered automatically from EXIF / GPS / folder structure |
| Manifest + review | Not needed — you ARE the review | We do it on our side after upload | You do it locally before sync, with progress and resume |
| Picks up where it left off | Browser remembers an in-progress draft | No — re-uploading is your job | Yes — every stage is resumable |

**Use the web Submit Encounter form if:** you have a few encounters to log right now and want full control over each one's metadata, license, and organization. This is the same form you use day-to-day in the app.

**Use the SAS-link path if:** we sent you an email with a link ending in `?sv=…&sig=…` and asked you to upload a batch of files.

**Use the desktop app path if:** you have an active research collection that grows over time, you want finwave to discover and group your images automatically, or you want sync that resumes after disconnection.

## Guides

- **[Submit Encounter (web)](/web/features/encounters/creating/)** — Use the in-app submission form to log a single encounter with images, location, license, and other metadata.
- **[Uploading via Azure Storage Explorer](/onboarding/azure-storage-explorer/)** — You received a SAS link from us. Install Microsoft's tool, attach the container, drag and drop your files. No Azure account or finwave login required.
- **[Desktop Client Onboarding](/desktop/onboarding/overview/)** — Install the finwave desktop app, run discovery on your image directories, build a manifest, and sync. Designed for long-lived collections.
