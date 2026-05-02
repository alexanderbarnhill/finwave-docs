#!/usr/bin/env node

/**
 * Builds dist/help-manifest.json — a tiny lookup the Hub frontend reads to
 * render in-app help previews. Each entry carries the page's title, the
 * frontmatter description, and a `quickRef` bullet list authored explicitly in
 * frontmatter. We deliberately do NOT ship the full rendered body — keeping
 * payloads bounded by convention (≤10 short bullets per page) means the
 * manifest stays small no matter how long the underlying docs grow.
 *
 * Pages that don't define quickRef are skipped; the Hub falls back to opening
 * the full docs page directly when there's no manifest entry to render.
 *
 * Run after `astro build` so the manifest lands in dist/.
 */

import { readFile, writeFile, readdir, mkdir } from 'node:fs/promises';
import { resolve, dirname, relative } from 'node:path';
import { parse as parseYaml } from 'yaml';

const ROOT = resolve(dirname(new URL(import.meta.url).pathname), '..');
const CONTENT_DIR = resolve(ROOT, 'src', 'content', 'docs');
const OUT_PATH = resolve(ROOT, 'dist', 'help-manifest.json');

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (entry.isFile() && /\.(md|mdx)$/i.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

function parseFrontmatter(raw) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!match) return {};
  try {
    return parseYaml(match[1]) ?? {};
  } catch {
    return {};
  }
}

/** Convert a content file path to its public URL path (matching Starlight's routing). */
function fileToUrlPath(fullPath) {
  let rel = relative(CONTENT_DIR, fullPath).replace(/\\/g, '/');
  rel = rel.replace(/\.(md|mdx)$/i, '');
  rel = rel.replace(/(^|\/)index$/, '');
  return rel ? `/${rel}/` : '/';
}

/** Coerce frontmatter quickRef into a string[] or return null when absent/empty. */
function normalizeQuickRef(value) {
  if (!Array.isArray(value)) return null;
  const cleaned = value
    .map((v) => (typeof v === 'string' ? v.trim() : ''))
    .filter(Boolean);
  return cleaned.length > 0 ? cleaned : null;
}

async function main() {
  const files = await walk(CONTENT_DIR);
  const manifest = {};
  let included = 0;
  let skipped = 0;

  for (const file of files) {
    const raw = await readFile(file, 'utf8');
    const data = parseFrontmatter(raw);
    const quickRef = normalizeQuickRef(data.quickRef);

    if (!quickRef) {
      skipped++;
      continue;
    }

    const urlPath = fileToUrlPath(file);
    manifest[urlPath] = {
      title: typeof data.title === 'string' ? data.title : '',
      description: typeof data.description === 'string' ? data.description : '',
      quickRef,
    };
    included++;
  }

  await mkdir(dirname(OUT_PATH), { recursive: true });
  await writeFile(OUT_PATH, JSON.stringify(manifest), 'utf8');

  console.log(
    `[help-manifest] Wrote ${included} entries (${skipped} pages skipped — no quickRef) to ${relative(ROOT, OUT_PATH)}`
  );
}

await main();
