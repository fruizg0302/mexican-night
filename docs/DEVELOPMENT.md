# Development Guide

Guide for developing and testing the Mexican Night VS Code theme.

## Quick Start

### Testing the Theme Locally

**Method 1: Extension Development Host (Recommended)**
1. Open this project in VS Code
2. Press **F5** (or Run > Start Debugging)
3. A new "Extension Development Host" window opens
4. In that window: **Cmd+K Cmd+T** (Mac) or **Ctrl+K Ctrl+T** (Windows/Linux)
5. Select "Mexican Night" from the theme list
6. Changes to theme files auto-reload in the Extension Host window

**Method 2: Install VSIX Locally**
```bash
# Package the extension
vsce package

# Install in your VS Code
code --install-extension mexican-night-0.0.1.vsix

# Activate: Cmd+K Cmd+T → "Mexican Night"
```

### Making Changes to the Theme

**IMPORTANT**: This theme uses a modular build system. Never edit the generated JSON file directly.

#### Workflow:
1. Edit source files in `src/` directory
2. Run `npm run build` to regenerate theme
3. Test changes (see above)
4. Commit changes

#### Watch Mode (Auto-rebuild):
```bash
npm run watch
```
This watches `src/` and automatically rebuilds when you make changes.

## Project Structure

```
mexican-night/
├── src/                          # Source files (EDIT THESE)
│   ├── colors/
│   │   ├── palette.js           # Color definitions
│   │   ├── ui.js                # VS Code UI colors
│   │   └── syntax.js            # Syntax highlighting rules
│   ├── templates/
│   │   ├── base-theme.js        # Theme metadata
│   │   └── tokyo-night-reference.json
│   └── generator.js             # Build script
│
├── themes/                       # Generated files (DO NOT EDIT)
│   └── Mexican Night-color-theme.json
│
├── samples/                      # Test files for different languages
│   ├── test.js
│   ├── test.ts
│   ├── test.rb
│   └── test_ruby_enhanced.rb
│
├── docs/                         # Documentation
│   ├── DEVELOPMENT.md           # This file
│   └── PUBLISHING.md            # Publishing guide
│
└── package.json                 # Extension manifest
```

## Editing the Theme

### Adding/Changing Colors

**Edit**: `src/colors/palette.js`

Example:
```javascript
export const palette = {
  // Mexican Colors
  rosaMexicano: "#E4007C",
  verdeMexicano: "#006341",
  neonYellow: "#FFD700",

  // Add new colors here
  customColor: "#ABCDEF",

  // ...
};
```

Then rebuild: `npm run build`

### Changing UI Colors

**Edit**: `src/colors/ui.js`

This maps palette colors to VS Code UI elements like editor background, sidebar, status bar, etc.

Example:
```javascript
function getUIColors(palette) {
  return {
    "editor.background": palette.nightSkyLight,
    "statusBar.background": palette.nightSky,
    // ...
  };
}
```

### Changing Syntax Highlighting

**Edit**: `src/colors/syntax.js`

This defines how different code tokens are colored using TextMate scopes.

Example:
```javascript
{
  name: "Ruby Symbols",
  scope: [
    "constant.other.symbol.ruby",
    "constant.other.symbol.hashkey.ruby"
  ],
  settings: {
    foreground: palette.verdeMexicanoLight
  }
}
```

## Testing Syntax Highlighting

### Using Sample Files

The `samples/` directory contains test files for different languages:

1. Open a sample file in the Extension Development Host
2. Use **Developer: Inspect Editor Tokens and Scopes** command
3. Click on any token to see its scopes and applied colors
4. Adjust scope rules in `src/colors/syntax.js` as needed

### Testing Your Own Files

1. Open your actual project files in the Extension Development Host
2. Check if colors look correct
3. Use token inspector to identify scopes that need adjustment

## Understanding TextMate Scopes

VS Code uses TextMate grammar for syntax highlighting. Each token has one or more scopes.

**Common Scopes:**
- `keyword.control` - Control flow keywords (if, for, while)
- `entity.name.function` - Function names
- `variable.other` - Variable names
- `string.quoted` - String literals
- `comment.line` - Line comments

**Language-Specific Scopes:**
- `keyword.control.ruby` - Ruby-specific keywords
- `meta.embedded.line.ruby` - Ruby string interpolation
- `entity.name.tag.js` - JSX/TSX tags

**Resources:**
- [TextMate Scope Naming](https://macromates.com/manual/en/language_grammars#naming_conventions)
- [VS Code Theme Color Reference](https://code.visualstudio.com/api/references/theme-color)

## Color Transparency

VS Code supports hex colors with alpha transparency:
- `#E4007C` - Solid color
- `#E4007C30` - 30% opacity (hex: 30 ≈ 19% in decimal, use online converter)
- `#E4007C88` - ~50% opacity

Common opacity values:
- `10` = ~6%
- `20` = ~12%
- `30` = ~19%
- `40` = ~25%
- `50` = ~31%
- `80` = ~50%
- `CC` = ~80%

## Common Development Tasks

### Add a new color to the palette
1. Edit `src/colors/palette.js`
2. Add your color: `newColor: "#HEXCODE"`
3. Run `npm run build`
4. Use it: `palette.newColor` in ui.js or syntax.js

### Change keyword color globally
1. Edit `src/colors/syntax.js`
2. Find the token rule with scope `keyword` or `keyword.control`
3. Change the `foreground` color
4. Run `npm run build`

### Fix a specific Ruby syntax issue
1. Open a Ruby sample file in Extension Development Host
2. Find the token with wrong color
3. Use "Inspect Editor Tokens and Scopes" to see its scope
4. Edit `src/colors/syntax.js` and find/add rule for that scope
5. Run `npm run build`
6. Reload Extension Development Host (Cmd+R)

### Add bracket pair colors
Already configured in `src/colors/ui.js`:
```javascript
"editorBracketHighlight.foreground1": palette.rosaMexicano,
"editorBracketHighlight.foreground2": palette.verdeMexicanoLight,
// ...
```

### Test with your own VS Code settings
In Extension Development Host, your settings.json is separate. To test with specific settings:
1. In Extension Host: Open Settings (Cmd+,)
2. Search for relevant settings (e.g., "bracket pairs")
3. Adjust and test

## Packaging and Distribution

### Create a .vsix package
```bash
npm run package
# or
vsce package
```

Output: `mexican-night-x.x.x.vsix`

### Install locally for testing
```bash
code --install-extension mexican-night-x.x.x.vsix
```

### Share with others
Send them the .vsix file, they can install via:
- VS Code: Extensions view → "..." menu → "Install from VSIX..."
- Command line: `code --install-extension mexican-night-x.x.x.vsix`

## Troubleshooting

**Problem**: Changes not reflecting in Extension Host
**Solution**: Press **Cmd+R** (Reload Window) in Extension Host

**Problem**: `npm run build` fails
**Solution**: Check syntax errors in src/ files, ensure all palette colors are defined

**Problem**: Theme looks broken
**Solution**: Validate the generated JSON at `themes/Mexican Night-color-theme.json`

**Problem**: Can't find the right scope for a token
**Solution**: Use "Developer: Inspect Editor Tokens and Scopes" command

**Problem**: Colors look different than expected
**Solution**: Check if transparency is applied, ensure monitor color calibration

## Git Workflow

```bash
# Make changes to src/
git status
git add src/

# Build theme
npm run build
git add themes/

# Commit
git commit -m "Description of changes"

# Push
git push
```

## Current Configuration

- **GitHub**: https://github.com/fruizg0302/mexican-night
- **Publisher**: wowzontle
- **Theme Name**: Mexican Night
- **Version**: 0.0.1 (update before publishing to marketplace)

## Next Steps

See [PUBLISHING.md](./PUBLISHING.md) for instructions on publishing to GitHub and VS Code Marketplace.
