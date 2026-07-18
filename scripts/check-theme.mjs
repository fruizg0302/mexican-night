// Fails if (1) src references an undefined palette key, or (2) any TextMate
// scope is defined by two tokenColors rules with different settings.
// Warns (non-fatal) on unused palette keys.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { palette } from '../src/colors/palette.js';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
let failed = false;

const srcFiles = [
  'src/generator.js',
  'src/colors/ui.js',
  'src/colors/syntax.js',
  'src/templates/base-theme.js',
];
const referenced = new Set();
for (const f of srcFiles) {
  const text = fs.readFileSync(path.join(root, f), 'utf8');
  const codeLines = text.split('\n').filter((line) => !line.trim().startsWith('import '));
  for (const line of codeLines) {
    for (const m of line.matchAll(/palette\.([A-Za-z0-9_]+)/g)) {
      referenced.add(m[1]);
      if (!(m[1] in palette)) {
        console.error(`FAIL: ${f} references undefined palette key "${m[1]}"`);
        failed = true;
      }
    }
  }
}
for (const key of Object.keys(palette)) {
  if (!referenced.has(key)) console.warn(`warn: unused palette key "${key}"`);
}

const themePath = path.join(root, 'themes', 'Mexican Night-color-theme.json');
const theme = JSON.parse(fs.readFileSync(themePath, 'utf8'));
const seen = new Map();
for (const rule of theme.tokenColors) {
  const scopes = Array.isArray(rule.scope) ? rule.scope : [rule.scope];
  const sig = JSON.stringify(rule.settings);
  for (const s of scopes) {
    const prev = seen.get(s);
    if (prev && prev.sig !== sig) {
      console.error(
        `FAIL: scope "${s}" has conflicting definitions: "${prev.name}" vs "${rule.name}"`
      );
      failed = true;
    }
    seen.set(s, { sig, name: rule.name ?? '(unnamed)' });
  }
}

if (failed) process.exit(1);
console.log('theme checks passed');
