#!/usr/bin/env node

/**
 * finwave docs generation script.
 *
 * Reads docs-mapping.yaml, extracts spec sections, calls the Anthropic API
 * with the appropriate prompt template, and writes output markdown.
 *
 * Usage:
 *   node scripts/generate.mjs --page <path>     Generate a single page
 *   node scripts/generate.mjs --all              Generate all spec-backed pages
 *   node scripts/generate.mjs --help             Show usage
 *
 * Requires ANTHROPIC_API_KEY environment variable.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { parseArgs } from 'node:util';
import { parse as parseYaml } from 'yaml';
import Anthropic from '@anthropic-ai/sdk';

const ROOT = resolve(dirname(new URL(import.meta.url).pathname), '..');
const SPECS_DIR = resolve(ROOT, '..', 'Specs');
const CONTENT_DIR = resolve(ROOT, 'src', 'content', 'docs');
const MAPPING_PATH = resolve(ROOT, 'docs-mapping.yaml');
const PROMPTS_DIR = resolve(ROOT, 'scripts', 'prompts');

const MODEL_MAP = {
  haiku: 'claude-haiku-4-5-20251001',
  sonnet: 'claude-sonnet-4-6',
};

// ── CLI ─────────────────────────────────────────────────────────────────

function printUsage() {
  console.log(`
finwave Docs Generator

Usage:
  node scripts/generate.mjs --page <output-path>   Generate a single page
  node scripts/generate.mjs --all                   Generate all spec-backed pages
  node scripts/generate.mjs --list                  List all mappable pages
  node scripts/generate.mjs --help                  Show this message

Options:
  --page <path>   Output path relative to src/content/docs/ (e.g. web/workbench/overview.md)
  --all           Generate every page that has a spec source
  --dry-run       Show what would be generated without calling the API
  --list          List all pages in the mapping

Environment:
  ANTHROPIC_API_KEY   Required for generation (not needed for --list, --dry-run, --help)
  `.trim());
}

const { values: args } = parseArgs({
  options: {
    page: { type: 'string' },
    all: { type: 'boolean', default: false },
    'dry-run': { type: 'boolean', default: false },
    list: { type: 'boolean', default: false },
    help: { type: 'boolean', default: false },
  },
  strict: true,
});

if (args.help) {
  printUsage();
  process.exit(0);
}

// ── Load mapping ────────────────────────────────────────────────────────

const mapping = parseYaml(readFileSync(MAPPING_PATH, 'utf-8'));
const pages = mapping.pages;

if (args.list) {
  console.log('Pages in docs-mapping.yaml:\n');
  for (const p of pages) {
    const src = p.spec ? `${p.spec} § ${p.section}` : '(human-written)';
    console.log(`  ${p.output.padEnd(50)} ${p.type.padEnd(14)} ${p.model ?? '—'.padEnd(8)}  ${src}`);
  }
  console.log(`\nTotal: ${pages.length} pages`);
  process.exit(0);
}

// ── Determine which pages to generate ───────────────────────────────────

let targets;

if (args.all) {
  targets = pages.filter((p) => p.spec && p.model);
} else if (args.page) {
  const match = pages.find((p) => p.output === args.page);
  if (!match) {
    console.error(`Page "${args.page}" not found in docs-mapping.yaml`);
    process.exit(1);
  }
  if (!match.spec || !match.model) {
    console.error(`Page "${args.page}" is marked as human-written (no spec/model)`);
    process.exit(1);
  }
  targets = [match];
} else {
  printUsage();
  process.exit(1);
}

if (args['dry-run']) {
  console.log('Dry run — would generate:\n');
  for (const t of targets) {
    console.log(`  ${t.output}  (${t.model}, ${t.type}, from ${t.spec} § ${t.section})`);
  }
  console.log(`\n${targets.length} page(s)`);
  process.exit(0);
}

// ── Helpers ─────────────────────────────────────────────────────────────

function loadPromptTemplate(type) {
  const path = join(PROMPTS_DIR, `${type}.txt`);
  if (!existsSync(path)) {
    throw new Error(`No prompt template found at ${path}`);
  }
  return readFileSync(path, 'utf-8');
}

function extractSection(specContent, sectionHeading) {
  if (!sectionHeading) return specContent;

  // Match the heading (any level) and capture until the next heading of same or higher level
  const escapedHeading = sectionHeading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(
    `(^#{1,6}\\s+${escapedHeading}\\s*$)([\\s\\S]*?)(?=^#{1,6}\\s|$(?!\\s))`,
    'm'
  );
  const match = specContent.match(pattern);

  if (match) {
    return (match[1] + match[2]).trim();
  }

  // Fallback: try partial match on heading text
  const lines = specContent.split('\n');
  let start = -1;
  let startLevel = 0;

  for (let i = 0; i < lines.length; i++) {
    const headingMatch = lines[i].match(/^(#{1,6})\s+(.*)/);
    if (headingMatch && headingMatch[2].includes(sectionHeading)) {
      start = i;
      startLevel = headingMatch[1].length;
      break;
    }
  }

  if (start === -1) {
    console.warn(`  Warning: section "${sectionHeading}" not found in spec, using full spec`);
    return specContent;
  }

  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    const headingMatch = lines[i].match(/^(#{1,6})\s+/);
    if (headingMatch && headingMatch[1].length <= startLevel) {
      end = i;
      break;
    }
  }

  return lines.slice(start, end).join('\n').trim();
}

function buildPrompt(template, page, specSection) {
  return template
    .replace('{spec_section}', specSection)
    .replace('{title}', page.title)
    .replace('{description}', page.description)
    .replace('{audience}', page.audience)
    .replace('{order}', String(page.order));
}

// ── Generate ────────────────────────────────────────────────────────────

const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) {
  console.error('ANTHROPIC_API_KEY environment variable is required');
  process.exit(1);
}

const client = new Anthropic();

console.log(`Generating ${targets.length} page(s)...\n`);

for (const page of targets) {
  const specPath = resolve(SPECS_DIR, page.spec);
  if (!existsSync(specPath)) {
    console.error(`  Spec file not found: ${specPath}`);
    continue;
  }

  const specContent = readFileSync(specPath, 'utf-8');
  const specSection = extractSection(specContent, page.section);

  const template = loadPromptTemplate(page.type);
  const systemPrompt = template.split('\n---\n')[0];
  const userPrompt = buildPrompt(template.split('\n---\n')[1] || template, page, specSection);

  const model = MODEL_MAP[page.model];
  if (!model) {
    console.error(`  Unknown model "${page.model}" for ${page.output}`);
    continue;
  }

  console.log(`  Generating: ${page.output} (${page.model}, ${page.type})`);

  try {
    const response = await client.messages.create({
      model,
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    });

    const content = response.content
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('');

    const outPath = resolve(CONTENT_DIR, page.output);
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, content + '\n');

    console.log(`  ✓ Written: ${page.output} (${response.usage.input_tokens}+${response.usage.output_tokens} tokens)`);
  } catch (err) {
    console.error(`  ✗ Error generating ${page.output}: ${err.message}`);
  }
}

console.log('\nDone.');
