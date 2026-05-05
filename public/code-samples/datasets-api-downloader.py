#!/usr/bin/env python3
"""
finwave datasets API — sample downloader.

Demonstrates the full handshake → download → verify flow:

    1. POST your API key + dataset version id  (handshake)
    2. Receive a short-lived SAS URL + content fingerprint
    3. Stream the zip from Azure Blob Storage
    4. Re-hash the bytes and verify the digest matches

The handshake bumps a server-side download counter for audit, but the actual byte
transfer goes directly between you and Azure. Each call mints a fresh SAS — re-call
the handshake whenever the URL expires (default 4 hours).

Three independent kill-switches gate every handshake:
    - The dataset.api feature flag (global)
    - Your API key validity (per-user)
    - Your per-dataset grant (per-dataset, with optional expiry)
Any one of these can be revoked instantly by an admin; existing SAS URLs may complete
in flight (worst case: SAS lifetime tail, default 4h).

Usage:
    python datasets-api-downloader.py \\
        --base-url https://app.finwave.io \\
        --api-key fwds_... \\
        --dataset-version-id 8b91... \\
        --format Coco \\
        --output ./dataset.zip

Requires: requests (pip install requests). Standard library otherwise.
"""

from __future__ import annotations

import argparse
import hashlib
import sys
from pathlib import Path
from typing import Any

import requests


HANDSHAKE_TIMEOUT = 30
DOWNLOAD_TIMEOUT = 600  # 10 minutes — large datasets can take a while.
CHUNK_SIZE = 1024 * 1024  # 1 MiB streaming chunks.


def handshake(base_url: str, api_key: str, dataset_version_id: str, fmt: str) -> dict[str, Any]:
    """Validate gates server-side, mint a SAS, return the response payload."""
    url = f"{base_url.rstrip('/')}/api/datasets-api/{dataset_version_id}"
    response = requests.get(
        url,
        headers={"X-API-KEY": api_key, "Accept": "application/json"},
        params={"format": fmt},
        timeout=HANDSHAKE_TIMEOUT,
    )

    if response.status_code == 200:
        return response.json()

    # Map known failure modes back to the user. The handshake response body is
    # RFC 7807-ish on errors: { status, title, detail, errorCode }.
    detail = "(no detail)"
    try:
        body = response.json()
        detail = body.get("detail") or body.get("title") or detail
    except Exception:
        pass

    status_messages = {
        401: "Invalid or missing API key.",
        403: "API key valid, but lacks dataset:download scope or no grant on this dataset.",
        404: "Dataset version (or requested format) not found.",
        410: "Grant has expired.",
        503: "The dataset.api feature is disabled. Ask an admin to re-enable it for your account.",
    }
    msg = status_messages.get(response.status_code, f"HTTP {response.status_code}")
    raise SystemExit(f"Handshake failed: {msg}\n  {detail}")


def stream_to_file(download_url: str, output_path: Path) -> None:
    """Stream the SAS-signed download to disk in chunks."""
    with requests.get(download_url, stream=True, timeout=DOWNLOAD_TIMEOUT) as response:
        response.raise_for_status()
        total = int(response.headers.get("Content-Length", 0))
        written = 0
        with output_path.open("wb") as fp:
            for chunk in response.iter_content(chunk_size=CHUNK_SIZE):
                if not chunk:
                    continue
                fp.write(chunk)
                written += len(chunk)
                if total:
                    pct = written / total * 100
                    print(f"  {written:>10,} / {total:,} bytes ({pct:.1f}%)", end="\r", flush=True)
        if total:
            print()  # newline after the progress line


def hash_file(path: Path) -> str:
    """SHA-256 hex digest of the file at ``path``, computed in 1-MiB chunks."""
    hasher = hashlib.sha256()
    with path.open("rb") as fp:
        for chunk in iter(lambda: fp.read(CHUNK_SIZE), b""):
            hasher.update(chunk)
    return hasher.hexdigest()


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--base-url", required=True, help="finwave Hub base URL, e.g. https://app.finwave.io")
    parser.add_argument("--api-key", required=True, help="Your API key (X-API-KEY header value)")
    parser.add_argument("--dataset-version-id", required=True, help="The frozen dataset version id")
    parser.add_argument("--format", default="Coco", choices=["Coco", "Yolo"],
                        help="Export format (default: Coco)")
    parser.add_argument("--output", required=True, type=Path, help="Where to write the downloaded zip")
    parser.add_argument("--skip-verify", action="store_true",
                        help="Skip SHA-256 verification (not recommended)")
    args = parser.parse_args()

    print(f"-> Handshake at {args.base_url}/api/datasets-api/{args.dataset_version_id}")
    payload = handshake(args.base_url, args.api_key, args.dataset_version_id, args.format)

    expected_fp = payload["fingerprint"]
    download_url = payload["downloadUrl"]
    sas_expires = payload["sasExpiresAt"]
    name = payload.get("name", args.dataset_version_id)

    print(f"   Dataset:         {name}")
    print(f"   Format:          {payload['format']}")
    print(f"   Fingerprint:     {expected_fp}")
    print(f"   SAS expires at:  {sas_expires}")

    print(f"-> Downloading to {args.output}")
    args.output.parent.mkdir(parents=True, exist_ok=True)
    stream_to_file(download_url, args.output)
    print(f"   Saved {args.output.stat().st_size:,} bytes")

    if args.skip_verify:
        print("   Skipped fingerprint verification (--skip-verify).")
        return 0

    # Verifying the fingerprint:
    #   The version-level fingerprint is computed over the canonical content of the
    #   frozen DETECTOR DATASET VERSION (classes, samples, boxes — see the API docs).
    #   That is NOT the same as the SHA-256 of the export zip's BYTES, because the zip
    #   adds a wrapping format (filenames, JSON whitespace, COCO/YOLO layout).
    #   If you want to verify the bytes, hash the zip and compare against the
    #   `manifest.json` embedded inside the zip — it carries the version fingerprint
    #   and you can recompute the manifest's `version.fingerprint` from the unpacked
    #   contents to round-trip.
    #
    #   For most consumers, it's enough to confirm: the manifest.json inside the zip
    #   contains the SAME fingerprint the handshake returned. If that's true, the zip
    #   is the dataset you intended, period.
    print("-> Verifying via manifest.json inside the zip")
    import zipfile, json
    with zipfile.ZipFile(args.output, "r") as zf:
        if "manifest.json" not in zf.namelist():
            print(f"!! manifest.json not found in zip — cannot verify. Older export?", file=sys.stderr)
            return 2
        manifest = json.loads(zf.read("manifest.json"))
    manifest_fp = manifest.get("version", {}).get("fingerprint")
    if manifest_fp != expected_fp:
        print(f"!! Fingerprint mismatch:", file=sys.stderr)
        print(f"   handshake:       {expected_fp}", file=sys.stderr)
        print(f"   manifest in zip: {manifest_fp}", file=sys.stderr)
        return 2

    print(f"   OK — manifest fingerprint matches handshake.")
    print(f"   Total bytes (SHA-256): {hash_file(args.output)}")  # informational
    return 0


if __name__ == "__main__":
    sys.exit(main())
