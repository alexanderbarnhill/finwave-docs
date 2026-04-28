---
title: "Quick Start"
description: "Create an account, join a population, and log your first encounter"
sidebar:
  order: 2
---

This page walks you from "I have nothing" to "I have a submitted encounter that the ML pipeline is processing." It should take about 10 minutes.

## What you'll learn

- How to create an account and sign in
- How to be added to (or join) a population
- How to submit your first encounter
- What happens after submission

## 1. Create an account

Go to [app.finwave.io](https://app.finwave.io/) and sign up with your email address. You'll receive a verification email — click the link to activate the account, then sign in.

Your account is independent of any population. Once it exists, you can be invited into one or more populations and one or more organisations.

## 2. Join a population

You need to be a member of at least one population before you can do useful work. There are two ways this happens:

- **Invitation** — a population administrator adds you. You'll receive an email and the population will appear in the population switcher at the top of the sidebar.
- **Self-join** — for populations that allow public sign-up, you can request to join from the population's landing page. An administrator approves the request.

If you're not sure which population to join, ask the person who pointed you at finwave. Most working groups have a designated administrator.

:::tip
The **population switcher** in the top-left of the sidebar is your single most important navigation control. Almost every screen in finwave changes its contents depending on which population is active.
:::

## 3. Submit your first encounter

From the sidebar, choose **Encounters → New Encounter**. Three things are required:

1. **Date** — when the observation happened.
2. **Location** — drop a pin on the map, or enter coordinates and a name.
3. **At least one image** — drag and drop your photos into the upload area.

Everything else (organisation, predation flag, behaviours, license) is optional but improves the research value of your data. See [Creating Encounters](/web/features/encounters/creating/) for a full walkthrough of every field.

Click **Submit**. You'll see a per-image upload progress card. When all images have been received, the encounter card shows the **Upload complete** status.

## 4. Watch the ML pipeline work

After submission, finwave automatically pushes your images through three ML stages:

1. **Detection** — the model finds candidate animals in each photo (typically by dorsal fin).
2. **Classification** — body side (left / right / unknown) is assigned to each detection.
3. **Identification** — each detection is compared against the population's catalogue of known individuals.

You don't have to do anything to trigger this. Status indicators on the encounter overview update as each phase completes — typically a few minutes for a small encounter.

:::tip
**Photos may take a moment to populate** in the encounter view after upload — the gallery, thumbnails, and ML results stream in asynchronously. Give it a minute or two before you assume something went wrong, especially for larger encounters.
:::

## 5. Review the results

Once the pipeline has finished, open the encounter and click **Annotator**. You'll see:

- Bounding boxes the model drew.
- The model's top guesses for each box, with confidence.
- A path to **confirm** correct identifications, **correct** wrong ones, or **add** ones the model missed.

Confirmed identifications are what turn raw photos into long-term population data. See [Annotator Overview](/web/features/annotator/overview/) for how the review interface works.

## What's next?

- [Navigating the App](/web/getting-started/navigation/) — orient yourself in the sidebar and top bar.
- [Core Concepts → Encounters](/web/core-concepts/encounters/) — the deeper model behind what you just did.
- [Core Concepts → Evidence Tiers](/web/core-concepts/evidence-tiers/) — why finwave tracks four levels of confidence in every identification.
- [Submissions](/web/features/submissions/) — track everything you've submitted and watch its processing status.
