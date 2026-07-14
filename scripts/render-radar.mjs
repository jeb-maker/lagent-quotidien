#!/usr/bin/env node
// scripts/render-radar.mjs — HTML interne depuis data/narrative-radar/*.json
// Usage : node scripts/render-radar.mjs

import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { writeRadarPages } from '../lib/radar-page.mjs';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const latest = await writeRadarPages(root);
if (!latest) process.exit(1);
