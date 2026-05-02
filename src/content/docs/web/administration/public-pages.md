---
title: "Public Pages"
description: "Configuring public population landing pages"
sidebar:
  order: 5
quickRef:
  - "What it is: a search-indexed, shareable population landing page at {slug}.finwave.io"
  - "Visitors see curated content + aggregate stats only — no search, filter, or export"
  - "Slug rules: 3–24 chars, lowercase letters/numbers/hyphens, unique. Approved once and not changeable"
  - "Sections: hero (your image), stats bar (auto), about, featured individuals, highlights feed, CTA, footer"
  - "Featured individuals: pick 4–8 manually, or skip and the top-4-most-encountered are auto-selected"
  - "Highlights are typed: Story / Paper / Announcement / Milestone. Pinned ones always show first"
  - "Hidden from public by design: GPS coordinates, contributor names, full image library, encounter records, data export"
  - "Locations are shown by general name only (e.g. 'Salish Sea') — never raw lat/long"
---

## What you'll learn

- What public population pages are and what they show
- How to enable and configure a public page
- How to select featured individuals and customize the call to action
- How to create and manage highlights
- What data is and is not exposed publicly

## What are public pages?

Every finwave population can have a publicly accessible landing page at its own subdomain -- for example, `srkw.finwave.io`. These pages give your population a search-engine-indexed, shareable web presence separate from the authenticated finwave app. They help visitors discover your research, learn about your population, and sign up as contributors.

:::note
Public pages are not part of the finwave app. Visitors see curated highlights and aggregate statistics, not raw datasets. They cannot search, filter, or export data.
:::

## Enabling a public page

Navigate to **Population Settings > Public Page** to get started.

<!-- screenshot: Public Page settings panel showing the enable toggle and slug field -->

1. Toggle **Enable public page** on.
2. Enter a **subdomain slug** -- this becomes the `{slug}.finwave.io` URL.
3. Submit the slug for platform admin approval.

The slug must be 3--24 characters, lowercase letters, numbers, and hyphens only, and unique across all populations. Examples: `srkw`, `biggs`, `norkw`.

:::caution
Once your slug is approved, it cannot be changed. Changing it would break external links and search engine rankings. Choose carefully before submitting for approval.
:::

## Page sections

Your public page displays the following sections from top to bottom. Some are auto-generated; others you configure directly.

<!-- screenshot: Full public page showing hero, stats bar, about, featured individuals, highlights, and CTA -->

- **Hero** -- Full-width image with your population name, species, and region overlaid. You upload the hero image and provide an image credit in the Public Page settings. If no image is set, a default gradient is used.
- **Stats bar** -- Key metrics computed automatically from your data: known individuals, encounters, images, contributors, and tracking period.
- **About** -- Your population description (from Population Settings) followed by organization cards showing each managing organization's logo, name, and website.
- **Featured individuals** -- A grid of 4--8 individuals you select via the multi-select picker in **Public Page > Featured Individuals**. Each card shows the profile image, name or alpha code, encounter count, and first-seen date. If you select none, the four most-encountered individuals are shown automatically.
- **Highlights feed** -- The three most recent published highlights. See [Managing highlights](#managing-highlights) below.
- **Call to action** -- A prominent CTA encouraging visitors to contribute. You can customize the text, button label, and button URL. Defaults point to the finwave registration page with your population pre-selected.
- **Footer** -- Links to the main finwave site, terms, privacy policy, and any social links you have configured (website, Instagram, Twitter, Facebook).

:::tip
Choose featured individuals that represent the diversity of your population -- a mix of well-known animals, recently discovered individuals, or those with compelling stories makes the strongest impression.
:::

## Managing highlights

Highlights let you share news, papers, and milestones on your public page. You manage them from **Population Settings > Highlights**.

To create a highlight, click **New Highlight** and fill in the form:

- **Type** -- Story, paper, announcement, or milestone.
- **Title** -- A short headline (up to 200 characters).
- **Summary** -- A brief description (up to 1,000 characters).
- **Image** and **External link** -- Both optional. For papers, link to the DOI.
- **Published** -- Toggle on when you are ready for the highlight to appear publicly. Leave off to save as a draft.
- **Pinned** -- Pinned highlights always appear first, regardless of date.

<!-- screenshot: New Highlight form showing type dropdown, title, summary, and publish toggle -->

| Type | Use case |
|------|----------|
| Story | Field reports, seasonal updates, general news |
| Paper | Published research papers citing your population data |
| Announcement | Events, calls for contributors, funding news |
| Milestone | New individual discovered, encounter count milestone |

## What is not exposed publicly

Public pages limit what is visible to protect sensitive data:

- **No GPS coordinates** -- Locations use general names (e.g., "Salish Sea"), never raw latitude/longitude.
- **No contributor information** -- Only an aggregate count, never names or contact details.
- **No full image library** -- Only admin-selected images appear. The library is not browsable.
- **No encounter details** -- Encounters appear as aggregate counts, not individual records.
- **No data export** -- No download or export capability.

## Related

- [Population Settings](/web/administration/population-settings/) -- editing the population description and other settings used by the public page
- [Member Management](/web/administration/member-management/) -- managing who can administer the population
- [Organization Settings](/web/administration/organization-settings/) -- configuring the organization cards shown on the public page
