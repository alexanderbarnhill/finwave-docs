---
title: "Datasets API"
description: "External API for downloading frozen detector dataset versions — handshake auth, content fingerprints, and per-user grants"
sidebar:
  order: 12
quickRef:
  - "Platform-admin only — manage at Platform Administration → Datasets"
  - "Three independent kill-switches gate every download: feature flag, API key, per-dataset grant. Revoking any one immediately blocks new downloads."
  - "Auth is the standard X-API-KEY header. Each user gets one key minted automatically when they're granted their first dataset; visible in /settings → API Keys."
  - "Handshake URL: GET /api/datasets-api/{versionId}?format=Coco — returns a short-lived SAS URL + content fingerprint. Default SAS lifetime: 4 hours."
  - "Each handshake call mints a fresh SAS — re-call when it expires. Existing SAS URLs may complete in flight after revocation (worst case: SAS lifetime tail)."
  - "Fingerprint is SHA-256 over canonical version content. The export zip embeds the same fingerprint in manifest.json so you can verify the bytes."
  - "Revocation: rotate the key, revoke the per-dataset grant, or flip the feature flag. Pick the smallest hammer."
  - "Sample Python downloader at /code-samples/datasets-api-downloader.py"
---

## What is the Datasets API?

A small external API that lets approved partners download frozen finwave datasets — initially detector training datasets, with room to grow. It's deliberately separate from the V1 partner API at `/api/v1/...` because the threat model is different: V1 is read-only access to your population's data; this is bulk transfer of training-grade artifacts that took real human labour to assemble.

The flow has three steps:

1. **Handshake.** Caller hits `/api/datasets-api/{versionId}` with their `X-API-KEY` header. The Hub validates three gates (feature flag, key, per-dataset grant), bumps a download counter, and returns a short-lived SAS URL pointing at Azure Blob Storage along with the dataset's content fingerprint.
2. **Download.** Caller fetches the bytes directly from Azure using the SAS URL. The Hub is not in the byte path — your bandwidth, Azure's CDN, your wallet (well, ours).
3. **Verify.** Caller re-reads the fingerprint from the `manifest.json` inside the downloaded zip and confirms it matches what the handshake returned. If they match, the zip is the dataset the admin intended you to receive.

## Three independent kill-switches

Access requires *all three* of these to be true. An admin can pull any one immediately to revoke access without touching the others:

| Switch | Scope | Revoke when |
|---|---|---|
| **`dataset.api` feature flag** | Global | You want to lock everyone out of the API at once (incident response, maintenance) |
| **API key** (`Invalid=true`) | Per-user | A specific user's key is compromised — they lose access to *every* dataset |
| **`DatasetAccessGrant.RevokedAt`** | Per `(user, version)` | A specific user shouldn't have access to a specific dataset anymore |

The handshake checks all three on every call. SAS URLs already issued can complete in flight (worst case: the per-grant SAS lifetime, default 4 hours).

> **Why not instant SAS revocation?** Azure can only revoke individual user-delegation SAS URLs by rotating the underlying user delegation key, which would invalidate *every* SAS we've issued — including for unrelated features. Per-grant short SAS lifetimes (4h default, 1–24h configurable) are the right tradeoff: you accept a small window for in-flight downloads in exchange for blast radius isolation. Don't store the SAS URL — re-handshake each time.

## Granting a user access

Platform admins go to **Platform Administration → Datasets**, click the dataset, and use **Grant access**:

1. Search for the user by email or name.
2. Optionally override the expiry (default 30 days from now) or the SAS lifetime (default 4 hours).
3. Click **Grant access**.

What happens server-side:

- If the user has no API key with the `dataset:download` scope, one is minted with that scope and a 1-year expiry.
- A user-level `dataset.api` feature grant is added (so they pass the global gate).
- A `DatasetAccessGrant` row is created (or refreshed if a revoked one existed).

The user can immediately see their key in **/settings → API Keys**, copy it, and start calling the API.

## Auditing

The dataset detail page shows every grant ever issued for the dataset, with:

- Who granted it, when, and to whom.
- Effective status (Active / Inactive / Revoked). "Inactive" means a higher gate is blocking — usually the user invalidated their own key, or the feature flag is off.
- Per-grant download count + last download timestamp + last download IP.
- A revoke action.

The download count is a *handshake count*, not a byte-count of completed downloads — it tells you how many times the user pulled a fresh SAS, which is the meaningful audit signal.

## Sample downloader

A Python reference implementation is published at [`/code-samples/datasets-api-downloader.py`](/code-samples/datasets-api-downloader.py). It handles the full flow: handshake, streaming download, manifest fingerprint verification.

```bash
python datasets-api-downloader.py \
    --base-url https://app.finwave.io \
    --api-key fwds_... \
    --dataset-version-id 8b91... \
    --format Coco \
    --output ./dataset.zip
```

Requires only `requests` (otherwise standard library).

## API reference

### `GET /api/datasets-api/{versionId}` — handshake

Headers:
- `X-API-KEY: <your key>` (required)
- `Accept: application/json`

Query parameters:
- `format` — `Coco` or `Yolo` (default `Coco`)

Success (`200 OK`):
```json
{
  "datasetVersionId": "8b91...",
  "parentDatasetId": "cf2a...",
  "name": "Orca Detector v3",
  "versionNumber": 3,
  "fingerprint": "ad5e3b...",
  "format": "Coco",
  "downloadUrl": "https://...blob.core.windows.net/...?<SAS>",
  "sasExpiresAt": "2026-05-05T17:00:00Z",
  "grantExpiresAt": "2026-06-04T13:00:00Z"
}
```

Error responses:

| Status | Meaning |
|---|---|
| `401` | Missing or invalid `X-API-KEY` |
| `403` | Key valid but missing `dataset:download` scope, *or* no grant on this dataset |
| `404` | Dataset version doesn't exist, *or* the requested format hasn't been exported yet |
| `410` | Grant has expired |
| `503` | The `dataset.api` feature flag is globally disabled |

### `GET /api/datasets-api/{versionId}/manifest` — manifest only

Same auth as the handshake. Returns the version's metadata + fingerprint + list of available formats *without* minting a SAS URL. Use as a cheap preflight check.

```json
{
  "datasetVersionId": "8b91...",
  "parentDatasetId": "cf2a...",
  "name": "Orca Detector v3",
  "versionNumber": 3,
  "fingerprint": "ad5e3b...",
  "sampleCount": 5000,
  "annotationCount": 9821,
  "includesNegatives": false,
  "frozenAt": "2026-05-01T08:30:00Z",
  "availableFormats": ["Coco", "Yolo"]
}
```

## Verifying the download

The handshake returns a **content fingerprint** — SHA-256 over the canonical version content (sorted classes, sorted samples with rounded box coordinates). It is *not* the same as the SHA-256 of the export zip's bytes — the zip adds a wrapping format (file names, JSON whitespace, image filenames) that's reproducible but not byte-identical to the canonical input.

Practical verification: the export zip embeds a `manifest.json` at its root containing the same fingerprint. Compare the two:

```python
import zipfile, json

with zipfile.ZipFile("dataset.zip") as zf:
    manifest = json.loads(zf.read("manifest.json"))

assert manifest["version"]["fingerprint"] == handshake_response["fingerprint"]
```

If the two match, the zip is the version the admin granted you, with no tampering in flight.

## Choosing the right revocation

| You want to… | Pull this switch |
|---|---|
| Lock everyone out of the API for incident response | Disable the `dataset.api` feature flag |
| Rotate a single user's compromised key | Have them rotate it from /settings, or invalidate from the admin user-management page |
| Take one user off one dataset | Revoke the per-dataset grant from the dataset detail page |
| Wind down a partnership | Revoke all of that user's per-dataset grants and invalidate their key |

Picking the smallest hammer keeps blast radius proportional to the threat.
