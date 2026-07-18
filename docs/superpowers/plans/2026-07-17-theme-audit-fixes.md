# Mexican Night Theme — Audit Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all 37 verified findings from the 2026-07-17 multi-agent repo audit: duplicate/conflicting token scopes, inert semantic highlighting, contrast failures, packaging bloat, and stale docs — releasing as v1.2.0.

**Architecture:** The theme is generated: `src/colors/{palette,ui,syntax}.js` + `src/generator.js` → `npm run build` → `themes/Mexican Night-color-theme.json`. NEVER edit the generated JSON directly. The core structural fix is a deduplication: `generator.js` has inline `rubyScopes`/`javascriptScopes` arrays whose rules are silently overridden by later rules from `syntax.js getTokenColors()` (VS Code: equally-specific TextMate rules resolve last-wins; a later rule that omits `fontStyle` inherits it from an earlier matching rule). We make `syntax.js` the single owner of every scope it defines and delete/trim the dead inline rules, preserving the currently shipped appearance except for a short list of deliberate fixes documented in each task.

**Tech Stack:** Plain Node ES modules (no framework, no test runner — verification is `npm run build` + a checker script added in Task 2 + git diff). Tools: `vsce` (packaging), GitHub Actions (CI).

**IMPORTANT — plan revision note:** The original audit (and first draft of this plan) ran against local `main` at commit `e630c67`. Before execution began, `origin/main` was discovered to be 5 commits ahead (clean fast-forward, same author, dated 2025-12-27 — 10 days after the v1.0.0 release you already knew about). Those commits added **Java and Elixir syntax highlighting** and changed the publisher name and icon. This plan has been rebased onto that current state (commit `57b030a`). What changed as a result, verified directly against the new content:
- `src/colors/{palette,ui,syntax}.js` and `src/templates/base-theme.js` are **byte-identical** to what was audited — every line reference in Tasks 3, 5, 7, 8 below is still accurate.
- `src/generator.js` gained two new inline arrays, `elixirScopes` (now lines 979-1228) and `javaScopes` (now lines 1231-1539), inserted between `javascriptScopes` and `pythonScopes`. Because the insertion happens after line 976, **`rubyScopes` (lines 21-466) and `javascriptScopes` (lines 469-976) are at their original line numbers** — Task 4's line references for those two arrays are unchanged. `pythonScopes` shifted from 978-1423 to 1542-1986 (+564); Task 4 doesn't touch Python, so this doesn't affect it. The final `tokenColors` assembly (originally 1430-1435) is now at line 1993-1999 and includes two new spreads: `...javaScopes, ...elixirScopes`.
- A direct scope-conflict scan of the current build (287 rules, up from 232) found **61 conflicts — the exact same count and scopes as the original audit**. Java and Elixir introduce zero new conflicts; they don't touch any scope Ruby/JS/Python/syntax.js already define, and have no internal duplicates. **No new dedup work is needed for Task 4/5.**
- One real new finding: `javaScopes` has a `"Java this keyword - Italic"` rule (pre-edit lines 1382-1388) using `palette.redEmphasis` (#d00000) — the identical 2.9:1 contrast bug Task 6 already fixes for JS/TS and Python. Folded into Task 6 below.
- `icon.svg` was **deleted upstream** (icon.png now stands alone, regenerated at a different size). Every plan reference to `icon.svg` below has been removed or corrected.
- Publisher renamed `wowzontle` → `mercuryatlas` in `package.json`; six doc references to the old name remained stale. Folded into Task 11.
- CHANGELOG.md already has a `[1.1.0]` section (Java/Elixir, dated `2024-12-27` — same off-by-one-year bug as the others) that predates this plan's changes; `package.json` was never bumped past `1.0.0` to match it. This plan's version target is now **1.2.0**, and Task 11 fixes the existing 1.1.0 entry's date too.
- `images/*.png` in this worktree are the **original, unoptimized** files (the optimized versions from the earlier session exist only in the non-worktree checkout's working tree, uncommitted, and don't carry over). Task 0 below copies them in rather than re-deriving them.
- Not fixed by this plan (flagged, not actioned — ask before expanding scope): `docs/CONFIGURATION.md`'s per-language color reference and `CLAUDE.md`'s "Language Support" section don't cover Java or Elixir (or, pre-existing, Python) in the same per-token detail as Ruby/JS. Writing that out is a documentation-completeness task, not a bug fix, and is left for a follow-up.

**Task 0 (copy in the pre-optimized screenshots):** `images/*.png` were optimized in a prior session (1.5 MB → ~440 KB, visually lossless 256-color PNG8, no dithering) in the non-worktree checkout at the repo root, but that checkout's working tree is not shared with this worktree. Copy them in and commit:
```bash
cp "/Volumes/MacintoshEDD/workspace/PERSONAL/javascript/mexican-night/images/python_showcase.png" images/python_showcase.png
cp "/Volumes/MacintoshEDD/workspace/PERSONAL/javascript/mexican-night/images/typescript_showcase.png" images/typescript_showcase.png
cp "/Volumes/MacintoshEDD/workspace/PERSONAL/javascript/mexican-night/images/screenshot_2.png" images/screenshot_2.png
git add images/ && git commit -m "chore: optimize screenshots (visually lossless, 72% smaller)"
```
Verify before committing: `file images/*.png` shows the same three PNGs, and `du -sh images/` is ~430-450K (not ~1.5M). Do NOT re-run any image conversion — the optimization is done, this is a copy-in only.

**Baseline invariant (check before Task 1 and after every task):**
```bash
npm run build && git diff --stat -- themes/
```
Before Task 1 this must produce an empty diff (verified true in the worktree at commit `57b030a`). After any task that edits `src/`, the diff shows the intended changes; commit `src/` and `themes/` together.

**Key background facts (verified during the audit — do not re-litigate):**
- VS Code resolves equally-specific TextMate rules **last-wins**; deeper (more-segment / descendant) selectors beat shallower ones regardless of order. A winning rule that sets only `foreground` inherits `fontStyle` from an earlier matching rule (this created accidental hybrids we now make explicit).
- The generated `tokenColors` array is `[...rubyScopes, ...javascriptScopes, ...javaScopes, ...elixirScopes, ...pythonScopes, ...getTokenColors(palette)]` (`src/generator.js:1993-1999`), 287 rules, 61 scopes defined 2–3× with conflicting settings (all within Ruby/JS/Python vs. syntax.js — see revision note above).
- Themes must set `"semanticHighlighting": true` to have their `semanticTokenColors` apply under VS Code's default `editor.semanticHighlighting.enabled = "configuredByTheme"`. This theme never sets it, so its entire semanticTokenColors block is currently dead.
- `vsce` packages the **working tree** (not the git index) minus `.vscodeignore` matches, and rewrites relative README image links to GitHub raw URLs when `package.json` has a `repository` field (it does).
- The project was created December 2025; CHANGELOG dates (2024-12-16/17/27) and LICENSE year (2024) are off by one year.

---

## Task 1: Toolchain baseline — devDependencies, prepublish guard, file perms

Fixes findings: missing devDependencies (nodemon/vsce), stale package-lock.json (records v0.0.1 + engines ^1.102.0), no `vscode:prepublish`, local 600 perms.

**Files:**
- Modify: `package.json` (scripts block, lines 40-45)
- Regenerate: `package-lock.json`
- Perms only: `samples/showcase.py`, `samples/showcase.tsx` (`icon.svg` no longer exists in this checkout — it was deleted upstream before this plan's audit was rebased; skip it)

- [ ] **Step 1: Verify baseline**

Run: `npm run build && git diff --stat -- themes/`
Expected: `✓ Theme generated at: …` and no diff output. If there IS a diff, STOP — the committed theme is stale; investigate before proceeding.

- [ ] **Step 2: Add vscode:prepublish script**

In `package.json`, change the scripts block from:
```json
  "scripts": {
    "build": "node src/generator.js",
    "watch": "nodemon --watch src --exec 'npm run build'",
    "package": "vsce package",
    "publish": "vsce publish"
  },
```
to:
```json
  "scripts": {
    "vscode:prepublish": "npm run build",
    "build": "node src/generator.js",
    "check": "node scripts/check-theme.mjs",
    "watch": "nodemon --watch src --exec 'npm run build'",
    "package": "vsce package",
    "publish": "vsce publish"
  },
```
(The `check` script's target file is created in Task 2.)

- [ ] **Step 3: Install dev dependencies**

Run: `npm install -D nodemon @vscode/vsce`
Expected: `package.json` gains a `devDependencies` block with both packages; `package-lock.json` is regenerated and now records `"version": "1.0.0"` (it previously said 0.0.1). `node_modules/` is already gitignored.

- [ ] **Step 4: Normalize file permissions**

Run: `chmod 644 samples/showcase.py samples/showcase.tsx`
(Git already tracks both as 100644; this is local-working-tree-only, but a .vsix is a zip that preserves unix perms.)

- [ ] **Step 5: Verify scripts resolve locally**

Run: `npx vsce --version && npx nodemon --version`
Expected: two version numbers, no "command not found".

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json
git commit -m "build: declare nodemon/vsce devDependencies, add vscode:prepublish guard"
```

---

## Task 2: Add `scripts/check-theme.mjs` — the failing check that drives Tasks 4–5

A committed checker that fails while duplicate-scope conflicts exist. This is the plan's "test": it must FAIL now (61 conflicts) and PASS after Task 5. It also catches undefined `palette.*` references (guards Task 8's deletions) and reports unused palette keys.

**Files:**
- Create: `scripts/check-theme.mjs`

- [ ] **Step 1: Write the checker**

Create `scripts/check-theme.mjs` with exactly:
```js
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
```

- [ ] **Step 2: Run it to verify it fails (that's expected right now)**

Run: `npm run check`
Expected: 64 `FAIL: scope …` lines (e.g. `constant.other.symbol.ruby`, `keyword.control.import.js`), many `warn: unused palette key` lines, exit code 1. (64, not 61: this checker counts every pairwise transition where a scope's Nth definition differs from its (N-1)th — a scope with 3 conflicting definitions produces 2 FAIL lines. Three scopes here have 3 definitions each, so 61 distinct conflicting scopes → 64 transition-FAILs. Both numbers describe the same underlying set of conflicts; 64 is what this exact script prints.) If it PASSES now, something is wrong — stop and investigate.

**Note on the `codeLines` filter:** without it, the regex also matches the literal text `palette.js` inside each file's own `import { palette } from './colors/palette.js'` line, misreading "js" as an undefined property access. Filtering out lines starting with `import ` avoids this false positive; do not simplify it back to a plain `text.matchAll(...)` over the whole file.

- [ ] **Step 3: Commit**

```bash
git add scripts/check-theme.mjs package.json
git commit -m "build: add check-theme script (duplicate scopes, palette refs)"
```
(package.json only if the `check` script wasn't committed in Task 1.)

---

## Task 3: Enable semantic highlighting and reconcile its colors

Fixes: `semanticTokenColors` block is inert (no `semanticHighlighting: true` anywhere); once enabled, semantic `type`/`interface` would visibly clash with the shipped TextMate colors, so align them.

**Files:**
- Modify: `src/templates/base-theme.js:4-12`
- Modify: `src/colors/syntax.js:62-82` (semantic type/interface entries)

- [ ] **Step 1: Set the flag**

In `src/templates/base-theme.js`, change:
```js
const baseTheme = {
  name: "Mexican Night",
  author: "Fernando Ruiz Guzman",
  type: "dark",
  semanticClass: "mexican-night",
  semanticTokenColors: {},
  colors: {},
  tokenColors: []
};
```
to:
```js
const baseTheme = {
  name: "Mexican Night",
  author: "Fernando Ruiz Guzman",
  type: "dark",
  semanticClass: "mexican-night",
  semanticHighlighting: true,
  semanticTokenColors: {},
  colors: {},
  tokenColors: []
};
```

- [ ] **Step 2: Align semantic type/interface with shipped TextMate colors**

In `src/colors/syntax.js` `getSemanticTokenColors`, the shipped TextMate result for TS is: type names → `accentCyan` (#FF69B4, "TypeScript - Types" rule), interfaces → `neonYellow` ("TypeScript - Interfaces" rule), classes → `neonOrange`. Change the semantic entries to match, so enabling semantic tokens doesn't shift colors for LSP users. Replace (currently lines 62-82):
```js
    // Types (TypeScript)
    type: {
      foreground: palette.neonBlue,         // Turquoise for types
    },
    "type.declaration": {
      foreground: palette.neonOrange,       // Orange for type declarations
    },

    // Classes and Interfaces
    class: {
      foreground: palette.neonOrange,       // Cempasúchil orange
    },
    "class.declaration": {
      foreground: palette.neonOrange,
    },
    interface: {
      foreground: palette.neonOrange,       // Orange for interfaces
    },
    "interface.declaration": {
      foreground: palette.neonOrange,
    },
```
with:
```js
    // Types (TypeScript)
    type: {
      foreground: palette.accentCyan,
    },
    "type.declaration": {
      foreground: palette.neonOrange,
    },

    // Classes and Interfaces
    class: {
      foreground: palette.neonOrange,
    },
    "class.declaration": {
      foreground: palette.neonOrange,
    },
    interface: {
      foreground: palette.neonYellow,
    },
    "interface.declaration": {
      foreground: palette.neonYellow,
    },
```

- [ ] **Step 3: Build and verify**

Run: `npm run build && grep -c '"semanticHighlighting": true' "themes/Mexican Night-color-theme.json"`
Expected: `1`.

- [ ] **Step 4: Commit**

```bash
git add src/templates/base-theme.js src/colors/syntax.js themes/
git commit -m "fix: enable semantic highlighting and align semantic type/interface colors"
```

---

## Task 4: Deduplicate generator.js inline rules (delete/trim the dead rules)

Fixes the root-cause finding: 55 gen-vs-syntax.js conflicts. Policy: **syntax.js `getTokenColors()` owns every scope it defines** (its rules already win today, so this preserves shipped appearance). Rules in `generator.js` whose scopes are ALL overridden are deleted; partially-overridden rules are trimmed. Where a deleted gen rule contributed an inherited `fontStyle` hybrid or a unique scope worth keeping, Task 5 adds it to the owning syntax.js rule explicitly — do Task 4 and Task 5 in sequence and only run the checker after Task 5.

**Java/Elixir note:** `javaScopes` and `elixirScopes` (added to `generator.js` after this plan's original audit — see the plan-revision note up top) were separately checked against the current build: zero scope conflicts, no overlap with any other language block or with syntax.js. They need no deduplication. The only fix they need — a shared contrast bug in `javaScopes`'s `this` keyword rule — is folded into Task 6, not here.

**Files:**
- Modify: `src/generator.js` (line numbers below are pre-edit; work bottom-up within each array so earlier line numbers stay valid, or locate rules by their unique `name:` string)

- [ ] **Step 1: Delete these 18 fully-dead rules from the `rubyScopes` array** (locate each object by its exact `name`, delete the whole `{...},` object):

| # | name | pre-edit lines | why dead (winning rule in syntax.js) |
|---|------|------|------|
| 1 | `Ruby Keywords (def, class, module)` | 40-51 | "Ruby - Module/Class/Method Keywords" (same rosa + bold); `start-block` covered by "Ruby - Block Keywords" |
| 2 | `Ruby Flow Keywords (if, else, return) - Italic` | 59-69 | "Ruby - Control Flow Keywords" (italic added there in Task 5) |
| 3 | `Ruby Class Names` | 96-102 | "Ruby - Module Names" (neonYellow — matches docs "Class names - Marigold") |
| 4 | `Ruby Module Names` | 103-109 | same |
| 5 | `Ruby Support Classes` | 118-124 | same |
| 6 | `Ruby Instance Variables (@var)` | 143-149 | "Ruby - Instance Variables" (accentCyan) |
| 7 | `Ruby Class Variables (@@var)` | 150-156 | "Ruby - Class Variables" (accentMagenta) |
| 8 | `Ruby Global Variables ($var) - Warning Color` | 157-166 | "Ruby - Global Variables"; unique `pre-defined` scope moves there in Task 5 |
| 9 | `Ruby self/super - Italic Warning` | 167-177 | "Ruby - Self" / "Ruby - Super" (#FF69B4 italic) — also kills the #d00000 contrast issue for Ruby |
| 10 | `Ruby Variable Sigils (@, @@, $)` | 185-191 | sigils get per-variable descendant rules in Task 5 |
| 11 | `Ruby Method Parameters - Italic` | 196-203 | "Ruby - Method Parameters" (italic added there in Task 5) |
| 12 | `Ruby Block Parameters - Italic` | 204-211 | "Ruby - Block Parameters" (italic added there in Task 5) |
| 13 | `Ruby Block Parameter Pipes (\|x, y\|)` | 212-218 | "Ruby - Block Parameters" keeps the pipe scope (Task 5 removes it from "Ruby - Punctuation and Operators") |
| 14 | `Ruby Constants (CONSTANT)` | 223-229 | "Ruby - Constants" (neonYellow) |
| 15 | `Ruby Symbols (:symbol)` | 230-239 | "Ruby - Symbols"; unique `constant.language.symbol.ruby` moves there in Task 5 |
| 16 | `Ruby Hash Key Symbols (key: value)` | 240-249 | "Ruby - Symbols"; unique `…hashkey.parameter.function.ruby` moves there in Task 5 |
| 17 | `Ruby nil, true, false` | 250-259 | "Ruby - Boolean and Nil" (neonOrange) |
| 18 | `Ruby String Interpolation Delimiters (#{})` | 283-292 | "Ruby - Interpolated Code" (#FF69B4 — matches docs) |

Also delete these two (same table format):

| # | name | pre-edit lines | why dead |
|---|------|------|------|
| 19 | `Ruby Embedded Code in Interpolation` | 293-302 | both scopes covered: `meta.embedded.line.ruby` by "Ruby - Interpolated Code", `source.ruby.embedded.source` prefix-matched by "Ruby - String Interpolation" (`source.ruby.embedded`) |
| 20 | `Ruby Method Call Separator (.)` | 387-393 | "Ruby - Punctuation and Operators" (accentCyan) |

**Correction found during execution:** the table above missed one rule — `Ruby Regular Expressions` (scope `string.regexp.ruby`, `string.regexp.interpolated.ruby`, `foreground: palette.accentTeal`) is also fully redundant with syntax.js's "Ruby - Regex" rule. It didn't show up in the original audit's conflict count because both rules resolve to the identical color (`accentTeal`), so `check-theme.mjs` — which only flags scopes with *differing* settings — never flagged it; it's dead code by the same "syntax.js owns every scope it defines" policy, just coincidentally harmless. Delete it too, as rule 21 of this table.

- [ ] **Step 2: Delete these 5 fully-dead rules from the `javascriptScopes` array:**

| name | pre-edit lines | why dead |
|------|------|------|
| `JS/TS Import/Export` | 552-567 | "JS/TS - Import/Export" (rosa); unique `keyword.control.as.js/ts` moves there in Task 5 |
| `JS/TS Console` | 596-608 | "JS/TS - Console" (turquoise; bold + function scopes move there in Task 5) |
| `TypeScript Interface Names` | 625-634 | "TypeScript - Interfaces" (neonYellow) |
| `TypeScript Type Annotations` | 851-864 | "TypeScript - Types" + "TypeScript - Type Annotations" cover every scope |
| `JSX/TSX Tags` | 895-907 | "JS/TS - JSX/TSX Tags" (#FF69B4); unique `entity.name.tag.jsx` moves there in Task 5 |

- [ ] **Step 3: Trim (don't delete) these 4 partially-overridden `javascriptScopes` rules:**

`JS/TS Control Flow (italic)` (lines 535-551) — remove the four scopes owned by "JS/TS - Async/Await", keep the unique ones:
```js
    {
      name: "JS/TS Control Flow (italic)",
      scope: [
        "keyword.control.return.js",
        "keyword.control.return.ts",
        "keyword.control.trycatch.js",
        "keyword.control.trycatch.ts"
      ],
      settings: {
        foreground: palette.rosaMexicano,
        fontStyle: "italic"
      }
    },
```

`JS/TS Function Definitions` (lines 572-583) — remove `entity.name.method.js` (owned by syntax.js's `entity.name.method.js` rule, which gains `.ts` in Task 5):
```js
    {
      name: "JS/TS Function Definitions",
      scope: [
        "entity.name.function.js",
        "entity.name.function.ts"
      ],
      settings: {
        foreground: palette.neonBlue
      }
    },
```
(also remove `entity.name.method.ts` from this rule — it moves to the syntax.js rule in Task 5 so `.js`/`.ts` methods are styled identically.)

`TypeScript Type Names` (lines 635-646) — remove the two scopes owned by "TypeScript - Types", keep the alias scopes (deeper selectors, they win on specificity and stay orange as shipped):
```js
    {
      name: "TypeScript Type Names",
      scope: [
        "entity.name.type.alias.ts",
        "entity.name.type.alias.tsx"
      ],
      settings: {
        foreground: palette.neonOrange
      }
    },
```

`JS/TS Object Properties` (lines 789-800) — remove the two object-literal scopes owned by "JS/TS - Object Keys":
```js
    {
      name: "JS/TS Object Properties",
      scope: [
        "variable.other.property.js",
        "variable.other.property.ts"
      ],
      settings: {
        foreground: palette.neonOrange  // Orange is easier on the eyes
      }
    },
```

- [ ] **Step 4: Build (checker still fails — that's expected until Task 5)**

Run: `npm run build`
Expected: success. Run `npm run check` — remaining FAILs should now only involve syntax.js-internal scopes (`constant.other.symbol.ruby`, `punctuation.definition.variable.ruby`, `punctuation.definition.string.begin/end.ruby`, `constant.other.color`, `support.type`, `markup.raw.block.fenced.markdown`, `variable.language.fenced.markdown`, `punctuation.separator.variable.ruby`). Do NOT commit yet — Task 5 completes the change.

---

## Task 5: Fix syntax.js internal conflicts + absorb the scopes/styles Task 4 orphaned

Fixes: Ruby symbols accidentally yellow (docs say Verde), all Ruby sigils orange-bold, regex delimiters green, dead "Colors" rule, `support.type` double-defined, markdown fenced dupes, empty-settings rule — plus makes the previously-inherited italics/bolds explicit.

**Files:**
- Modify: `src/colors/syntax.js` (line numbers are pre-edit)

- [ ] **Step 1: Restore Verde symbols.** In "Ruby - Constants" (lines 945-951) remove `constant.other.symbol.ruby`; in "Ruby - Symbols" (lines 837-846) absorb the orphaned unique scopes:
```js
    {
      name: "Ruby - Symbols",
      scope: [
        "constant.other.symbol.ruby",
        "constant.other.symbol.hashkey.ruby",
        "constant.other.symbol.hashkey.parameter.function.ruby",
        "constant.language.symbol.ruby",
      ],
      settings: {
        foreground: palette.verdeMexicanoLight,
      },
    },
```
```js
    {
      name: "Ruby - Constants",
      scope: ["variable.other.constant.ruby"],
      settings: {
        foreground: palette.neonYellow,
      },
    },
```

- [ ] **Step 2: Per-variable sigil coloring via descendant selectors.** Replace the three variable rules (lines 952-979):
```js
    {
      name: "Ruby - Instance Variables",
      scope: [
        "variable.other.readwrite.instance.ruby",
        "variable.other.readwrite.instance.ruby punctuation.definition.variable.ruby",
      ],
      settings: {
        foreground: palette.accentCyan,
      },
    },
    {
      name: "Ruby - Class Variables",
      scope: [
        "variable.other.readwrite.class.ruby",
        "variable.other.readwrite.class.ruby punctuation.definition.variable.ruby",
      ],
      settings: {
        foreground: palette.accentMagenta,
      },
    },
    {
      name: "Ruby - Global Variables",
      scope: [
        "variable.other.readwrite.global.ruby",
        "variable.other.readwrite.global.pre-defined.ruby",
        "variable.other.readwrite.global.ruby punctuation.definition.variable.ruby",
      ],
      settings: {
        foreground: palette.neonOrange,
        fontStyle: "bold",
      },
    },
```
(Deliberate change: `@` now renders pink like its variable, `@@` magenta, `$` orange — previously ALL sigils were orange-bold because the last bare rule won. Pre-defined globals like `$stdout` join plain globals — they were dark-red `redWarning` via a dead rule.)

- [ ] **Step 3: Regex vs heredoc vs plain string delimiters.** Replace "Ruby - Regex" (lines 987-997) with:
```js
    {
      name: "Ruby - Regex",
      scope: [
        "string.regexp.ruby",
        "string.regexp.interpolated.ruby",
        "string.regexp.ruby punctuation.definition.string.begin.ruby",
        "string.regexp.ruby punctuation.definition.string.end.ruby",
      ],
      settings: {
        foreground: palette.accentTeal,
      },
    },
```
Replace "Ruby - Heredoc" (lines 1146-1156) with:
```js
    {
      name: "Ruby - Heredoc",
      scope: ["string.unquoted.heredoc.ruby"],
      settings: {
        foreground: palette.verdeMexicanoLight,
      },
    },
    {
      name: "Ruby - String Delimiters",
      scope: [
        "punctuation.definition.string.begin.ruby",
        "punctuation.definition.string.end.ruby",
      ],
      settings: {
        foreground: palette.verdeMexicanoLight,
      },
    },
```
(Preserves shipped green quotes; the descendant regex selectors are more specific, so regex delimiters now match their teal body — deliberate fix.)

- [ ] **Step 4: Remove the pipe scope from the operators rule.** In "Ruby - Punctuation and Operators" (lines 998-1011) delete the line `"punctuation.separator.variable.ruby",` — "Ruby - Block Parameters" keeps that scope, so `|x, y|` pipes stay orange (shipped behavior).

- [ ] **Step 5: Make inherited styles explicit.** Add `fontStyle` where a deleted generator rule used to supply it (or where docs specify it):
- "Ruby - Control Flow Keywords" (lines 874-899): add `fontStyle: "italic"` to settings (docs/CONFIGURATION.md:99 documents italic).
- "Ruby - Method Parameters" (lines 1024-1034): add `fontStyle: "italic"`.
- "Ruby - Block Parameters" (lines 1107-1116): add `fontStyle: "italic"`.
- "JS/TS - Console" (lines 1251-1257): replace with:
```js
    {
      name: "JS/TS - Console",
      scope: [
        "support.class.console.js",
        "support.class.console.ts",
        "support.function.console.js",
        "support.function.console.ts",
      ],
      settings: {
        foreground: palette.neonBlue,
        fontStyle: "bold",
      },
    },
```

- [ ] **Step 6: Absorb remaining orphaned scopes.**
- "JS/TS - Import/Export" (lines 1200-1213): add `"keyword.control.as.js",` and `"keyword.control.as.ts",` to the scope list (deliberate normalization: `as` joins import/export in rosa; it was purple).
- `entity.name.method.js` rule (lines 477-484): rename/extend to cover TS too:
```js
    {
      name: "entity.name.method",
      scope: ["entity.name.method.js", "entity.name.method.ts"],
      settings: {
        fontStyle: "italic",
        foreground: palette.neonBlue,
      },
    },
```
- "JS/TS - JSX/TSX Tags" (lines 1221-1232): add `"entity.name.tag.jsx",` to the scope list.

- [ ] **Step 7: Kill generic-rule dupes and the empty rule.**
- "Operator, Misc" (lines 287-306): delete the line `"constant.other.color",` (restores the "Colors" rule → CSS color constants render white as intended).
- "Class, Support" (lines 391-406): delete the line `"support.type",` ("Entity Types" keeps it — shipped behavior).
- "Markdown - Raw Block Fenced" (lines 789-795): delete the whole rule (its only scope is re-defined by "Markdown - Fenced Bode Block Variable", which wins today — shipped appearance keeps `textPrimary`).
- "Markdown - Fenced Bode Block Variable" (lines 803-813): delete the line `"variable.language.fenced.markdown",` ("Markdown - Fenced Language" wins today with `textMuted` — shipped behavior preserved).
- "Ruby - Method Definition Body" (lines 1097-1106): delete the whole rule (empty `settings: {}`, does nothing).

- [ ] **Step 8: Build and run the checker — it must pass now**

Run: `npm run build && npm run check`
Expected: zero `FAIL:` lines, exit 0 (`theme checks passed`; `warn: unused palette key` lines are fine — Task 8 handles them). If any FAIL remains, fix it before committing: every scope must have exactly one owning rule.

- [ ] **Step 9: Commit**

```bash
git add src/generator.js src/colors/syntax.js themes/
git commit -m "fix: single owner per TextMate scope; restore verde symbols, per-sigil colors, regex delimiters"
```

---

## Task 6: Contrast fixes for this/super/arguments and self/cls

Fixes: `#d00000` (`palette.redEmphasis`) ≈ 2.9:1 on the editor background — below the 3:1 minimum. Replace with `palette.error` (#f7768e, "coral red"), keeping the italic.

**Files:**
- Modify: `src/generator.js` (two `settings` blocks)

- [ ] **Step 1: JS/TS.** In the `JS/TS this/super/arguments (italic)` rule (pre-Task-4 lines 746-760; find by name), change `foreground: palette.redEmphasis` → `foreground: palette.error`.

- [ ] **Step 2: Python.** In the `Python self and cls` rule (pre-Task-4 lines 1112-1124; find by name), change `foreground: palette.redEmphasis` → `foreground: palette.error`.

- [ ] **Step 3: Java.** In the `javaScopes` array, the `"Java this keyword - Italic"` rule (pre-edit lines 1382-1388; find by name) has the identical bug — `variable.language.this.java` at `foreground: palette.redEmphasis`. Change it to `foreground: palette.error`, same as Steps 1-2.

- [ ] **Step 4: Build, verify, commit**

Run: `npm run build && grep -c '"#d00000"' "themes/Mexican Night-color-theme.json"`
Expected: `0` (grep exits 1 with count 0 — that's the pass condition).
```bash
git add src/generator.js themes/
git commit -m "fix: readable coral red for this/super/arguments and self/cls (was 2.9:1 contrast)"
```

---

## Task 7: UI fixes — terminal ANSI table, git colors, contrast keys, deprecated keys

Fixes: `terminal.ansiGreen` #006341 ≈ 2.4:1 (unreadable); `ansiCyan` is hot pink and identical to `ansiBrightMagenta`; 5 of 8 bright ANSI colors identical to normal; `gitDecoration.addedResourceForeground` #006341 ≈ 2.2:1; `contrastActiveBorder`/`contrastBorder` draw hot-pink rings on focused UI (they're high-contrast-theme keys); `welcomePage.button*` keys removed from VS Code; `editorIndentGuide.background/activeBackground` deprecated since 1.85.

**Files:**
- Modify: `src/colors/palette.js` (add 3 keys)
- Modify: `src/colors/ui.js`

- [ ] **Step 1: Add the missing hues to the palette.** In `src/colors/palette.js`, in the NEON ACCENT COLORS block (after line 42 `gold: …`), add:
```js
  electricBlue: "#7aa2f7",       // ANSI blue (night-sky electric blue)
  electricBlueBright: "#9ecbff", // ANSI bright blue
  whiteBright: "#ffffff",        // ANSI bright white
```

- [ ] **Step 2: Delete the contrast keys.** In `src/colors/ui.js` remove lines 6-8:
```js
    // Contrast colors
    "contrastActiveBorder": palette.rosaMexicano,
    "contrastBorder": "#16161e",
```
(`focusBorder` on line 11 keeps focus styling.)

- [ ] **Step 3: Rewrite the ANSI table.** Replace lines 219-234 (`"terminal.ansiBlack"` … `"terminal.ansiBrightYellow"`) with:
```js
    "terminal.ansiBlack": palette.nightSky,
    "terminal.ansiRed": palette.error,
    "terminal.ansiGreen": palette.verdeMexicanoLight,
    "terminal.ansiYellow": palette.neonYellow,
    "terminal.ansiBlue": palette.electricBlue,
    "terminal.ansiMagenta": palette.rosaMexicano,
    "terminal.ansiCyan": palette.accentTeal,
    "terminal.ansiWhite": palette.textPrimary,
    "terminal.ansiBrightBlack": palette.textDark,
    "terminal.ansiBrightRed": palette.redBright,
    "terminal.ansiBrightGreen": palette.greenBright,
    "terminal.ansiBrightYellow": palette.yellowBright,
    "terminal.ansiBrightBlue": palette.electricBlueBright,
    "terminal.ansiBrightMagenta": palette.rosaMexicanoLight,
    "terminal.ansiBrightCyan": palette.blueBright,
    "terminal.ansiBrightWhite": palette.whiteBright,
```
Result: green readable (#00d084), cyan is actually cyan-ish turquoise (#06ffc8), blue is blue (#7aa2f7), every bright variant distinct from its normal, magenta pair stays the theme's pinks. (`redBright` #ff5370, `greenBright` #50fa7b, `yellowBright` #f1fa8c, `blueBright` #7FFFD4 already exist in palette.js:88-102.)

- [ ] **Step 4: Fix git added-file color.** Line 240: change `"gitDecoration.addedResourceForeground": palette.verdeMexicano,` → `palette.verdeMexicanoLight,`.

- [ ] **Step 5: Modernize deprecated/removed keys.** Replace lines 115-116:
```js
    "editorIndentGuide.background": palette.nightSkyMedium,
    "editorIndentGuide.activeBackground": palette.textDark,
```
with (keep old keys for VS Code < 1.85, engines allows ^1.74.0):
```js
    "editorIndentGuide.background": palette.nightSkyMedium,
    "editorIndentGuide.activeBackground": palette.textDark,
    "editorIndentGuide.background1": palette.nightSkyMedium,
    "editorIndentGuide.activeBackground1": palette.textDark,
```
Replace lines 284-285:
```js
    "welcomePage.buttonBackground": palette.nightSkyMedium,
    "welcomePage.buttonHoverBackground": palette.nightSkyBright,
```
with:
```js
    "welcomePage.tileBackground": palette.nightSkyMedium,
    "welcomePage.tileHoverBackground": palette.nightSkyBright,
```

- [ ] **Step 6: Build, verify, commit**

Run: `npm run build && npm run check`
Expected: pass. Spot-check: `grep '"terminal.ansiCyan"' "themes/Mexican Night-color-theme.json"` shows `#06ffc8`.
```bash
git add src/colors/palette.js src/colors/ui.js themes/
git commit -m "fix: readable terminal/git greens, real ANSI cyan/blue, distinct brights; drop HC contrast keys"
```

---

## Task 8: Dead code removal — syntaxColors, template leftovers, unused palette keys

Fixes: 116-line `syntaxColors` export imported but never used (and actively wrong as documentation); 60KB `tokyo-night-reference.json` referenced by nothing; unused `semanticTokenCategories`/`tokenColorCategories` exports; ~50 unused palette keys including the entire shadowed `terminal*` block.

**Files:**
- Modify: `src/colors/syntax.js` (delete lines 117-232 `syntaxColors`, and line 4 `import { palette }`)
- Modify: `src/generator.js:11` (import list)
- Modify: `src/templates/base-theme.js` (delete lines 14-122 and the two names from the export)
- Delete: `src/templates/tokyo-night-reference.json`
- Modify: `src/colors/palette.js`

- [ ] **Step 1: Delete `syntaxColors`.** In `src/colors/syntax.js` delete the whole `export const syntaxColors = { … };` block (pre-edit lines 117-232) AND line 4 (`import { palette } from './palette.js';` — the two remaining functions take `palette` as a parameter). In `src/generator.js` line 11 change:
```js
import { syntaxColors, getSemanticTokenColors, getTokenColors } from './colors/syntax.js';
```
to:
```js
import { getSemanticTokenColors, getTokenColors } from './colors/syntax.js';
```

- [ ] **Step 2: Trim base-theme.js.** Delete the `semanticTokenCategories` (lines 14-28) and `tokenColorCategories` (lines 30-122) arrays and change the export to:
```js
export {
  baseTheme
};
```

- [ ] **Step 3: Delete the reference JSON.**

Run: `git rm src/templates/tokyo-night-reference.json`

- [ ] **Step 4: Prune the palette.** Run `npm run check` and delete every key it reports as `warn: unused palette key`. Expected removal set (verify against the checker output, which is authoritative — it reflects your actual edits):
`gray100 gray200 gray300 gray400 gray600 gray700 gray800 gray900 gold clayBrown darkNavy deeperOrange redWarning redEmphasis success red orange orangeBright yellow green cyan cyanBright blue purple purpleBright magenta magentaBright accent bg bgDark bgHighlight bgSelection bgSearch border borderHighlight` plus the entire TERMINAL COLORS block (`terminalBlack` … `terminalBrightWhite`, 16 keys).
Keys that MUST survive because Task 7 now uses them: `redBright greenBright yellowBright blueBright electricBlue electricBlueBright whiteBright`. Also kept: `gray gray500 black white accentTeal accentCyan accentMagenta amber tierraBrown` and all `rosa*/verde*/neon*/nightSky*/text*` + `error warning info`.

- [ ] **Step 5: Build, verify, commit**

Run: `npm run build && npm run check && git diff --stat -- themes/`
Expected: `theme checks passed` with ZERO `warn: unused palette key` lines, and an **empty** themes/ diff (this task deletes only dead code; any theme diff means something deleted was actually live — stop and restore it).
```bash
git add -A src/
git commit -m "refactor: remove dead syntaxColors, template leftovers, and unused palette keys"
```

---

## Task 9: Packaging — .vscodeignore, version bump, leftover files

Fixes: .vsix ships src/, samples/, docs/, images/, CLAUDE.md, and the untracked `.claude/settings.local.json` (leaks local machine paths); leftover `vsc-extension-quickstart.md`; redundant debug sample. (The original audit also flagged `icon.svg` shipping unnecessarily — that file has since been deleted upstream, so there's nothing left to exclude for it.) Excluding `images/` is safe: `repository` is set, so vsce rewrites the README's relative image links to GitHub raw URLs.

**Files:**
- Rewrite: `.vscodeignore`
- Modify: `package.json:5` (version)
- Delete: `vsc-extension-quickstart.md`, `samples/test_ruby_enhanced.rb`
- Modify: `samples/test.rb` (absorb the one thing test_ruby_enhanced covered that test.rb doesn't)

- [ ] **Step 1: Replace `.vscodeignore` entirely with:**
```
.vscode/**
.vscode-test/**
.claude/**
.github/**
.gitignore
.gitattributes
src/**
samples/**
docs/**
images/**
scripts/**
CLAUDE.md
package-lock.json
```
(No `icon.svg` line — that file no longer exists in this checkout, it was deleted upstream.)

- [ ] **Step 2: Delete leftovers**

Run: `git rm vsc-extension-quickstart.md samples/test_ruby_enhanced.rb`

- [ ] **Step 3: Keep loop coverage in samples.** Append to the end of `samples/test.rb`:
```ruby

# Loops (while/until/for)
counter = 0
while counter < 5
  counter += 1
end

until counter.zero?
  counter -= 1
end

for i in 1..3
  puts i
end
```

- [ ] **Step 4: Bump version and fix the description/keywords.** `package.json` currently says `"version": "1.0.0"` even though CHANGELOG.md already has an (unreleased-to-package.json) `[1.1.0]` entry for the Java/Elixir work that landed after this plan's original audit — package.json was simply never bumped to match it. Change `"version": "1.0.0"` → `"version": "1.2.0"` (this release absorbs both the pending 1.1.0 language additions and this plan's fixes). Also update the stale `description` field, which still only lists three languages — change:
```json
  "description": "A vibrant dark theme celebrating Mexico City nights with optimized Python, Ruby, and JavaScript/TypeScript syntax highlighting",
```
to:
```json
  "description": "A vibrant dark theme celebrating Mexico City nights with optimized Python, Ruby, JavaScript/TypeScript, Java, and Elixir syntax highlighting",
```
And add the two missing keywords to the `keywords` array (after `"typescript"`):
```json
    "typescript",
    "java",
    "elixir"
```

- [ ] **Step 5: Verify the package contents**

Run: `npx vsce ls`
Expected output contains ONLY: `package.json`, `README.md` (as extension/readme.md), `CHANGELOG.md`, `LICENSE`, `icon.png`, `themes/Mexican Night-color-theme.json`. No src/, samples/, docs/, images/, .claude/. If `.claude/settings.local.json` appears, the `.claude/**` line is wrong — fix before committing.

- [ ] **Step 6: Commit**

```bash
git add .vscodeignore package.json samples/test.rb
git commit -m "build: ship only runtime files in the vsix; bump to 1.2.0"
```

---

## Task 10: CI guard — build must be in sync, checker must pass

Fixes: no CI; the repo's documented #1 failure mode is editing `src/` and forgetting `npm run build`.

**Files:**
- Create: `.github/workflows/build-check.yml`

- [ ] **Step 1: Write the workflow**

Create `.github/workflows/build-check.yml` with exactly:
```yaml
name: build-check
on:
  push:
    branches: [main]
  pull_request:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - name: Generated theme must be committed
        run: git diff --exit-code -- themes/
      - run: npm run check
```

- [ ] **Step 2: Verify locally that the same commands pass**

Run: `npm ci && npm run build && git diff --exit-code -- themes/ && npm run check`
Expected: all succeed. (`npm ci` works now because Task 1 committed a real lockfile.)

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/build-check.yml
git commit -m "ci: fail when generated theme is stale or scopes conflict"
```

---

## Task 11: Documentation sweep — make every doc match reality

Fixes: wrong hexes, wrong color names, 2024 dates, v0.0.1 references, completed checklist items, false CLAUDE.md claims. Do these as exact edits; where a doc line isn't listed here, leave it alone.

**Files:**
- Modify: `README.md`, `CHANGELOG.md`, `LICENSE`, `CLAUDE.md`, `docs/CONFIGURATION.md`, `docs/DEVELOPMENT.md`, `docs/PUBLISHING.md`

- [ ] **Step 1: CHANGELOG.md.** The file already has an existing `[1.1.0]` section (Java/Elixir support, added upstream after this plan's original audit) that this plan's own version bump (Task 9) now absorbs into 1.2.0 — so fix that section's date too, don't just add a new one on top of it. Current line numbers (re-read the file to confirm before editing, since Task 9 doesn't touch CHANGELOG.md so these should be unchanged):
  - Line 5: `## [1.1.0] - 2024-12-27` → `## [1.1.0] - 2025-12-27`
  - Line 33: `## [1.0.0] - 2024-12-17` → `## [1.0.0] - 2025-12-17`
  - Line 50: `## [0.0.1] - 2024-12-16` → `## [0.0.1] - 2025-12-16`
  - Line 76: `- Verde Mexicano (#00d084) - Strings and success states` → `- Verde Mexicano Light (#00d084) - Strings and success states`
  Insert a new section after line 3 (before the `[1.1.0]` section), using today's actual date:
```markdown
## [1.2.0] - YYYY-MM-DD

### Fixed
- Semantic highlighting now actually enabled (`semanticHighlighting: true`) — it was advertised but inert
- Every TextMate scope now has a single owning rule; removed 25+ dead rules that were silently overridden (Ruby/JS/Python; Java/Elixir were checked and had none)
- Ruby symbols render Verde Mexicano again (an unrelated rule had overridden them to yellow)
- Ruby sigils (`@`, `@@`, `$`) now match their variable's color instead of all rendering orange-bold
- Ruby regex delimiters match the regex body (teal) instead of string green
- Readable contrast for `this`/`super`/`arguments` (JS/TS), `self`/`cls` (Python), and `this` (Java) — was #d00000 at ~2.9:1
- Terminal: readable green, real cyan and blue, all bright variants distinct; readable git "added" color
- Removed high-contrast-only `contrastActiveBorder`/`contrastBorder` (stray pink outlines on focused UI)
- Replaced removed/deprecated workbench color keys (welcomePage buttons, indent guides)

### Changed
- The .vsix now ships only runtime files (theme JSON, icon, README, CHANGELOG, LICENSE) — screenshots load from GitHub
- Optimized screenshots (1.5 MB → ~440 KB, visually lossless)
- Removed dead code: unused `syntaxColors` export, Tokyo Night reference JSON, ~50 unused palette keys
- Added CI: build-freshness and scope-conflict checks
- Updated package.json description and keywords to include Java and Elixir
```

- [ ] **Step 2: LICENSE** — line 3: `Copyright (c) 2024 Fernando Ruiz Guzman` → `Copyright (c) 2025 Fernando Ruiz Guzman`.

- [ ] **Step 3: README.md** — line 21: `**Verde Mexicano** (#00d084)` → `**Verde Mexicano Light** (#00d084)`. (Other listed hexes were verified correct. Line 38's semantic-highlighting claim becomes true via Task 3 — no edit. Line 49's releases link becomes valid via Task 12.) Also restore the Publishing Guide link, dropped from the Documentation list by the upstream Java/Elixir commit even though `docs/PUBLISHING.md` still exists and is still current — line 69 currently reads:
```markdown
- **[Development Guide](docs/DEVELOPMENT.md)** - Build and modify the theme
```
change to:
```markdown
- **[Development Guide](docs/DEVELOPMENT.md)** - Build and modify the theme
- **[Publishing Guide](docs/PUBLISHING.md)** - Publish to VS Code Marketplace
```

- [ ] **Step 4: CLAUDE.md** — six corrections:
1. Project Overview: `Rosa Mexicano (#E4007C)` → `Rosa Mexicano (#ff006e)`.
2. palette.js bullet: delete the sentence `Uses ES6 export syntax but also CommonJS module.exports` (ESM only).
3. base-theme.js bullet: replace `Not actually used by generator currently (generator defines inline)` with `Spread into the theme by generator.js (supplies name/author/type/semanticClass/semanticHighlighting)`.
4. Important Notes (currently line 140): replace `**Theme icon**: No icon defined - add "icon" field to package.json if desired` with `**Theme icon**: icon.png (128x128)`. (Not "generated from icon.svg" — that source file was deleted upstream; icon.png is now the only icon artifact in the repo.)
5. Language Support: `Instance variables: Cyan` → `Instance variables: Mexican Pink (#FF69B4)`; `Object keys: Cyan` → `Object keys: Mexican Pink (#FF69B4)`.
6. Important Notes (currently line 138): `**Publisher name**: Set to "wowzontle" in package.json` → `**Publisher name**: Set to "mercuryatlas" in package.json` (renamed upstream, after this plan's original audit).
Also add one line under Development Workflow: `7. Run npm run check — every TextMate scope must be defined by exactly one rule (CI enforces this)`.

Note (not a task step — flagging only): CLAUDE.md's "Language Support" section documents Ruby and JavaScript/TypeScript token-by-token but has no equivalent section for Python (pre-existing gap) or the newly-added Java/Elixir. Writing that out is a documentation-completeness task, not a bug fix; ask the user before expanding this plan to cover it.

- [ ] **Step 5: docs/CONFIGURATION.md** — line 19: trailing `→ Cyan` → `→ Mexican Pink`; line 43: `"#E4007C"` → `"#ff006e"`; line 89: `Red Emphasis (italic)` → `Coral Red #f7768e (italic)`; line 106: `Instance variables (@var) - Cyan` → `Instance variables (@var) - Mexican Pink (#FF69B4)`; lines 129-131: `JSX tags - Deeper Orange` → `JSX tags - Hot Pink (Rosa Mexicano Light)` and `Component names - Deeper Orange` → `Component names - Hot Pink (Rosa Mexicano Light)`; line 134: `Type annotations - Turquoise` → `Type annotations - Rosa Mexicano`; line 136: `Type definitions - Cempasúchil Orange` → `Type names - Mexican Pink (aliases Cempasúchil Orange)`; line 144: `Red Emphasis` → `Coral Red`.

- [ ] **Step 6: docs/DEVELOPMENT.md** — line 23: `mexican-night-0.0.1.vsix` → `mexican-night-x.x.x.vsix` (matches the placeholder style used at lines 232-242); lines 61-69 structure diagram: replace the samples/ and docs/ listings with the real contents (`test.js test.ts test.py test.rb showcase.py showcase.tsx` / `CONFIGURATION.md DEVELOPMENT.md PUBLISHING.md`), remove the `tokyo-night-reference.json` line, add `scripts/check-theme.mjs` and `.github/workflows/build-check.yml`; lines 84-86: `rosaMexicano: "#E4007C"` → `"#ff006e"`, `neonYellow: "#FFD700"` → `"#ffd60a"`; lines 173-176 transparency examples: `#E4007C` → `#ff006e` (3 occurrences); line 282: `**Publisher**: wowzontle` → `**Publisher**: mercuryatlas` (renamed upstream); line 284: `**Version**: 0.0.1 (update before publishing to marketplace)` → `**Version**: 1.2.0`.

- [ ] **Step 7: docs/PUBLISHING.md** — this file's publisher references are stale in two ways: the name changed (`wowzontle` → `mercuryatlas`, done upstream after this plan's original audit) and the content is instructional/example text, not a status log — so the fix is a mechanical find-and-replace of the publisher name, not a rewrite of the instructions. Replace **all six** occurrences of `wowzontle` with `mercuryatlas`:
  - Line 9: `` package.json updated with correct publisher name (`wowzontle`) and GitHub URL `` → `` package.json updated with correct publisher name (`mercuryatlas`) and GitHub URL ``
  - Line 43: `` **ID**: `wowzontle` (must match package.json) `` → `` **ID**: `mercuryatlas` (must match package.json) ``
  - Line 73: `` vsce login wowzontle `` → `` vsce login mercuryatlas ``
  - Line 97: `` https://marketplace.visualstudio.com/items?itemName=wowzontle.mexican-night `` → `` https://marketplace.visualstudio.com/items?itemName=mercuryatlas.mexican-night ``
  - Line 139: `` vsce unpublish wowzontle.mexican-night `` → `` vsce unpublish mercuryatlas.mexican-night ``
  - Line 148: `` run `vsce login wowzontle` again `` → `` run `vsce login mercuryatlas` again ``
  - Line 150: `` "Publisher 'wowzontle' not found" `` → `` "Publisher 'mercuryatlas' not found" ``
  Also replace the stale "Current Status" list (lines 7-11) — it describes first-commit-era setup (Cmd+K Cmd+T activation, "Git repository initialized with first commit") that predates the v1.0.0 release already in CHANGELOG.md — with what's actually verifiable from repo state (no git tags exist, so do not claim a Marketplace publish happened):
```markdown
✅ **Completed:**
- Published on GitHub: https://github.com/fruizg0302/mexican-night
- package.json configured with publisher `mercuryatlas` and repository URL
- No tagged release yet — see Task 12 of the theme-audit-fixes plan for the gated release step
```
In the "Before Publishing Checklist" (lines 105-111), check off the completed items (screenshots, version 1.0.0, CHANGELOG, LICENSE, icon): change their `- [ ]` to `- [x]` and update line 107 to `- [x] Version updated in package.json`.

- [ ] **Step 8: Commit**

```bash
git add README.md CHANGELOG.md LICENSE CLAUDE.md docs/
git commit -m "docs: sync all docs with actual palette, colors, version, and dates"
```

---

## Task 12: Final verification, package, and gated release

**Files:** none (verification + release commands)

- [ ] **Step 1: Full local gate**

Run: `npm ci && npm run build && git diff --exit-code -- themes/ && npm run check && npx vsce ls && npx vsce package`
Expected: all pass; `mexican-night-1.2.0.vsix` created, roughly 30–80 KB (was ~2 MB territory before the ignore fix). `vsce ls` shows only the six runtime files (see Task 9 Step 5).

- [ ] **Step 2: Visual smoke test (requires a human or a GUI session)**

Press F5 in VS Code → Extension Development Host → open `samples/test.rb`, `samples/showcase.py`, `samples/showcase.tsx`. Verify: Ruby symbols are green, `@var` pink / `@@var` magenta / `$var` orange (sigils matching), regex delimiters teal, `self` coral-red italic in Python, terminal green readable (run `ls` in the integrated terminal). If the session is non-interactive, report this step as PENDING USER VERIFICATION — do not claim it done.

- [ ] **Step 3: Stop here — this is where plan execution ends.** This work happens on branch `worktree-theme-audit-fixes` in an isolated worktree, not on `main`. Do NOT `git push origin main` from here. After this task and its review are marked complete, the outer subagent-driven-development process runs a final whole-branch review, then uses `superpowers:finishing-a-development-branch` to decide how this branch reaches `main` (merge, PR, etc.) — that decision and its execution belong to that flow, not to this plan. Steps 4-5 below are recorded here for completeness but are out of this plan's scope until after that merge.

- [ ] **Step 4: 🛑 GATED, POST-MERGE ONLY — GitHub release (fixes the dead README releases link).** Only after this branch has been merged to `main` and pushed. Ask the user before executing, from `main`, not from this worktree:
```bash
git tag v1.2.0 && git push origin v1.2.0
gh release create v1.2.0 mexican-night-1.2.0.vsix --title "v1.2.0" --notes "See CHANGELOG.md — scope dedup, semantic highlighting enabled, contrast fixes, slim package."
```

- [ ] **Step 5: 🛑 GATED, POST-MERGE ONLY — Marketplace publish.** Only after Step 4. Ask the user before executing.

`npm run publish` (requires the user's `vsce login mercuryatlas` PAT session — publisher was renamed from `wowzontle` upstream). Never run this without explicit confirmation in this session.

**Post-release note for the user (do not do it unprompted):** the Ruby screenshot (`images/screenshot_2.png`) predates the symbol-color fix — Ruby symbols show yellow in it but now render green. Retaking the screenshots is optional manual work; the current ones were freshly optimized (keep any retakes to similar sizes: 256-color PNG8, no dithering, e.g. `magick in.png -strip -dither None -colors 256 PNG8:out.png`).

---

## Deliberate visual changes (everything else preserves the shipped v1.0.0 appearance)

| What | Was (shipped) | Now | Grounding |
|------|------|------|------|
| Semantic highlighting | inert | active (colors aligned to TextMate) | advertised in README/CHANGELOG |
| Ruby symbols | yellow #ffd60a (accident) | verde #00d084 | rule's own name + CLAUDE.md + CONFIGURATION.md |
| Ruby sigils @ @@ $ | all orange bold (accident) | match their variable color | audit C6 fix |
| Ruby pre-defined globals | dark red #dc2f02 | orange bold like other globals | dead-rule cleanup + contrast |
| Ruby regex delimiters | green | teal (match regex body) | audit C6 fix |
| Ruby flow keywords / method+block params | italic via inheritance accident | italic explicit (same look) | docs specify italic |
| JS/TS `as` keyword | purple | rosa like import/export | normalization, CLAUDE.md "Import/export: Rosa" |
| `entity.name.method.ts` | non-italic (js was italic) | italic like `.js` | consistency |
| JS/TS `this`/`super`/`arguments`, Python `self`/`cls`, Java `this` | #d00000 (2.9:1) | #f7768e coral | contrast |
| CSS color constants | pink (accident) | white | "Colors" rule intent |
| Terminal ANSI | green unreadable, cyan=pink=brightMagenta, 5 bright dupes | readable, distinct, real cyan/blue | contrast + ANSI semantics |
| Git "added" files | #006341 (2.2:1) | #00d084 | contrast |
| Focused-UI pink rings | drawn via contrast keys | removed | non-HC theme |

## Execution notes

- Line numbers reference the files as of commit `57b030a` (the `origin/main` state this plan was rebased onto — see the plan-revision note near the top) plus this plan's own commits in order. When in doubt, locate rules by their unique `name:` strings — they are stable identifiers.
- `npm run check` is the arbiter for Tasks 4–5 and 8. Never silence a FAIL by deleting the checker line; fix the rule ownership.
- Commit `src/` and `themes/` together every time — CI (Task 10) will reject stale generated output.
- The generated file path contains a space: always quote `"themes/Mexican Night-color-theme.json"` in shell commands.
- This plan executes on branch `worktree-theme-audit-fixes` inside an isolated git worktree, not on `main`. Task 12 Step 3 marks where this plan's scope ends; branch integration and the gated release steps are sequenced after it, not part of the per-task loop.
