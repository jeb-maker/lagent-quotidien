#!/usr/bin/env node
// scripts/build-datasets.mjs — compile data/harvest/*-primary.json → /datasets/ (CSV + JSON + page).
// Usage : node scripts/build-datasets.mjs   (npm run datasets)

import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { writeDatasets } from '../lib/datasets-page.mjs';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const manifest = await writeDatasets(root);
if (!manifest) process.exit(1);
