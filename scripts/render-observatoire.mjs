#!/usr/bin/env node
// scripts/render-observatoire.mjs — HTML public depuis data/observatoire/*.json
// Usage : node scripts/render-observatoire.mjs

import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { writeObservatoirePages } from '../lib/observatoire-page.mjs';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const latest = await writeObservatoirePages(root);
if (!latest) process.exit(1);
