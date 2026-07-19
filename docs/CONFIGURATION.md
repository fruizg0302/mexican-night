# Configuration & Customization

This guide covers how to configure and customize the Mexican Night theme for your needs.

## 🌈 Enable Rainbow Brackets

Mexican Night includes beautiful rainbow bracket colorization using VS Code's built-in bracket pair colorization feature.

Add this to your `settings.json`:

```json
{
  "editor.bracketPairColorization.enabled": true,
  "editor.guides.bracketPairs": "active"
}
```

This will colorize your brackets using the theme's Mexican colors:
- Rosa Mexicano (pink) → Verde Mexicano (green) → Neon Blue → Neon Yellow → Magenta → Mexican Pink

## 🔧 Customization

You can customize the theme colors in your `settings.json`:

### Customize Workbench Colors

```json
"workbench.colorCustomizations": {
  "[Mexican Night]": {
    "editor.background": "#0D0E18",
    "editor.foreground": "#C0CAF5",
    "activityBar.background": "#1A1B26",
    "statusBar.background": "#16161E"
  }
}
```

### Customize Token Colors

```json
"editor.tokenColorCustomizations": {
  "[Mexican Night]": {
    "keywords": "#ff006e",
    "strings": "#00D084",
    "comments": "#8B7355"
  }
}
```

### Customize Semantic Highlighting

```json
"editor.semanticTokenColorCustomizations": {
  "[Mexican Night]": {
    "enabled": true,
    "rules": {
      "*.declaration": { "fontStyle": "bold" },
      "function": { "foreground": "#06FFC8" }
    }
  }
}
```

## 🎯 Language Support

Mexican Night provides exceptional syntax highlighting for Python, Ruby, and JavaScript/TypeScript.

### 🐍 Python (Full Support)

**Keywords & Control Flow**
- `def`, `class`, `if`, `for`, `while` - Rosa Mexicano (italic)
- `import`, `from`, `as` - Neon Purple
- `try`, `except`, `raise`, `finally` - Neon Purple (italic)

**Functions & Classes**
- Function definitions - Turquoise
- Class names - Cempasúchil Orange
- Built-in functions (`print`, `len`, `range`) - Turquoise
- Magic methods (`__init__`, `__str__`) - Neon Purple (italic)

**Strings & F-Strings**
- Regular strings - Verde Mexicano
- F-string interpolation `{...}` - Rosa Mexicano
- Format specifiers (`:02d`, `:.2f`) - Neon Purple
- Escape characters - Rosa Mexicano

**Special Elements**
- Parameters - Marigold Yellow (italic)
- `self` and `cls` - Coral Red #f7768e (italic)
- Decorators (`@property`, `@staticmethod`) - Neon Purple (italic)
- Type annotations - Turquoise
- Constants (`None`, `True`, `False`) - Amber
- Comments & docstrings - Tierra Brown (italic)

### 💎 Ruby (Full Support)

**Keywords & Control Flow**
- `def`, `class`, `module`, `end` - Rosa Mexicano (bold)
- `if`, `unless`, `case`, `when` - Rosa Mexicano (italic)
- `begin`, `rescue`, `ensure` - Neon Purple
- Special methods (`private`, `attr_accessor`) - Neon Purple

**Ruby-Specific Elements**
- Symbols (`:symbol`, `:key`) - Verde Mexicano
- String interpolation `#{...}` - Rosa Mexicano Light
- Instance variables (`@var`) - Mexican Pink (#FF69B4)
- Class variables (`@@var`) - Magenta
- Global variables (`$var`) - Cempasúchil Orange (bold)
- Method definitions - Turquoise
- Class names - Marigold Yellow
- Regex patterns - Turquoise

**Rails Support**
- ActiveRecord methods - Turquoise
- Validations - Neon Purple
- Callbacks - Verde Mexicano
- ERB delimiters (`<%`, `%>`) - Rosa Mexicano

### ⚡ JavaScript/TypeScript (Full Support)

**Modern JS/TS Features**
- `import`/`export` - Rosa Mexicano
- `async`/`await` - Neon Purple (italic)
- Arrow functions (`=>`) - Rosa Mexicano
- Template literals - Verde Mexicano
- Template expressions `${...}` - Rosa Mexicano Light

**JSX/TSX Support**
- JSX tags - Hot Pink (Rosa Mexicano Light)
- JSX attributes - Marigold Yellow (italic)
- Component names - Hot Pink (Rosa Mexicano Light)

**TypeScript Specific**
- Type annotations - Rosa Mexicano
- Interfaces - Marigold Yellow
- Type names - Mexican Pink (aliases Cempasúchil Orange)
- Decorators - Rosa Mexicano

**Objects & Functions**
- Function calls - Turquoise
- Object keys - Mexican Pink
- Built-in objects (`document`, `window`) - Cempasúchil Orange
- Parameters - Marigold Yellow (italic)
- `this` and `super` - Coral Red

### 📝 General Language Features

All languages benefit from:
- **Operators** - Turquoise (arithmetic, comparison)
- **Numbers** - Amber (all number types)
- **Comments** - Tierra Brown (italic)
- **Strings** - Verde Mexicano
- **Punctuation** - Subtle gray (reduced visual noise)
- **Semantic Tokens** - Enhanced highlighting via language servers

## Additional Resources

- [Development Guide](DEVELOPMENT.md) - Build and modify the theme
- [Publishing Guide](PUBLISHING.md) - Publish to VS Code Marketplace
