# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Mexican Night is a VS Code color theme extension that celebrates the lights of Mexico City at night. Features Rosa Mexicano (#E4007C) and Verde Mexicano (#006341) as primary accent colors with special optimization for Ruby and JavaScript/TypeScript development.

## Development Commands

### Building and Testing
- **Build theme**: `npm run build` - Generates theme JSON from modular source files
- **Watch mode**: `npm run watch` - Auto-rebuilds theme on source changes (requires nodemon)
- **Test theme**: Press `F5` in VS Code to launch Extension Development Host
- **Select theme**: In Extension Host: File > Preferences > Theme > Color Theme > Mexican Night
- **Inspect tokens**: Use `Developer: Inspect Editor Tokens and Scopes` command to examine syntax highlighting

### Packaging and Publishing
- **Package extension**: `npm run package` (requires @vscode/vsce)
- **Publish**: `npm run publish` (requires publisher account)

## Architecture

### Modular Build System

The theme is **generated** from modular JavaScript files, not manually edited. The workflow is:

1. Source files in `src/` define colors, UI, and syntax rules
2. `npm run build` runs `src/generator.js` to produce the final theme JSON
3. Generated file: `themes/Mexican Night-color-theme.json` (consumed by VS Code)

**IMPORTANT**: Always edit source files in `src/`, never the generated JSON file directly. After editing sources, run `npm run build` to regenerate the theme.

### Directory Structure

```
src/
  ├── colors/
  │   ├── palette.js       # Core color definitions (base, grays, Mexican colors)
  │   ├── ui.js           # VS Code UI element colors (function: getUIColors)
  │   └── syntax.js       # Syntax highlighting rules (functions: getTokenColors, getSemanticTokenColors)
  ├── templates/
  │   ├── base-theme.js   # Theme metadata and structure skeleton
  │   └── tokyo-night-reference.json  # Reference theme structure
  └── generator.js        # Main build script that combines everything

themes/                  # Generated theme files (do not edit directly)
samples/                # Test files for verifying syntax highlighting
```

### Key Files

**`src/colors/palette.js`**
- Core color palette definitions
- Exports: `palette` object with all theme colors
- Uses ES6 export syntax but also CommonJS module.exports
- Defines Mexican theme colors (rosaMexicano, verdeMexicano, neonYellow, neonBlue, etc.)
- Background colors (nightSky variants), text colors, terminal colors

**`src/colors/ui.js`**
- Maps palette colors to VS Code UI elements
- Exports: `getUIColors(palette)` function
- Returns object with VS Code color keys (editor.background, statusBar.foreground, etc.)
- Includes bracket pair colorization config
- Uses hex colors with transparency suffixes (e.g., "#E4007C30" for 30% opacity)

**`src/colors/syntax.js`**
- Defines TextMate scope rules for syntax highlighting
- Exports: `getTokenColors(palette)` and `getSemanticTokenColors(palette)`
- Contains extensive Ruby-specific and JavaScript/TypeScript-specific scopes
- Token colors array has name, scope, and settings (foreground, fontStyle)

**`src/generator.js`**
- Main build script that orchestrates theme generation
- Combines base theme + UI colors + syntax colors + semantic tokens
- Includes inline Ruby and JavaScript scope definitions (not yet externalized)
- Writes final JSON to `themes/Mexican Night-color-theme.json`
- Can be required as module or run directly

**`src/templates/base-theme.js`**
- Theme metadata skeleton (name, author, type, semanticClass)
- Reference lists of semantic token and token color categories
- Not actually used by generator currently (generator defines inline)

### Color Palette

The theme references these color variables from palette.js:

**Mexican Colors (Primary Brand)**
- `rosaMexicano` / `rosaMexicanoLight` - Keywords, selections, primary accents
- `verdeMexicano` / `verdeMexicanoLight` - Strings, success states, secondary accents
- `neonYellow` - Classes, types, warnings
- `neonBlue` - Functions, info states
- `neonOrange` - Parameters, constants
- `neonPurple` - Async/await, special keywords

**Background & UI**
- `nightSky` / `nightSkyLight` / `nightSkyMedium` / `nightSkyBright` - Background variations
- `textPrimary` / `textSecondary` / `textMuted` / `textDark` - Text variations
- `error`, `warning`, `info`, `success` - Semantic state colors

**Note**: The palette.js file references many colors that may not all exist yet. When editing, ensure referenced colors are defined.

### Language Support

**Ruby Enhancements**
- Symbols: Verde Mexicano
- String interpolation: Rosa Mexicano
- Instance variables: Cyan
- Class variables: Magenta
- Control flow keywords (if/unless/case/when): Rosa Mexicano
- Exception handling (begin/rescue/ensure): Neon Purple
- Access control (private/protected/public): Neon Purple

**JavaScript/TypeScript Enhancements**
- Import/export: Rosa Mexicano
- Template literals: Verde Mexicano
- Template expressions: Rosa Mexicano Light
- Async/await: Neon Purple (italic)
- Arrow functions: Rosa Mexicano
- JSX tags: Rosa Mexicano Light
- JSX attributes: Neon Yellow (italic)
- Object keys: Cyan

## Development Workflow

1. Edit source files in `src/colors/` or `src/generator.js`
2. Run `npm run build` to regenerate theme JSON
3. Press F5 to test in Extension Development Host
4. Changes auto-reload in Extension Host (no restart needed)
5. Use sample files in `samples/` to verify syntax highlighting
6. Inspect tokens with `Developer: Inspect Editor Tokens and Scopes` to debug scopes

**See [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) for detailed development guide.**

## Important Notes

- **Publisher name**: Set to "wowzontle" in package.json
- **Repository URL**: https://github.com/fruizg0302/mexican-night
- **Theme icon**: No icon defined - add "icon" field to package.json if desired
- **Color transparency**: Use hex with alpha suffix (e.g., "#E4007C30" for 30% opacity)
- **Scope specificity**: More specific scopes override general ones (TextMate rule)
- **Font styles**: Options are "italic", "bold", "italic bold", "underline"
- **Generated files**: The JSON in `themes/` is generated - do not edit directly

## Publishing

**See [docs/PUBLISHING.md](docs/PUBLISHING.md) for complete publishing instructions** including:
- Pushing to GitHub
- Creating VS Code Marketplace publisher account
- Generating Personal Access Token
- Publishing with vsce
