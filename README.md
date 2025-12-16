# 🌃 Mexican Night Theme

A vibrant VS Code theme that celebrates the lights of Mexico City at night, featuring Rosa Mexicano and Verde Mexicano as primary accent colors. Optimized for Python, Ruby, and JavaScript/TypeScript development with comprehensive syntax highlighting.

## 🎨 Color Palette

Mexican Night uses authentic Mexican-inspired colors:

- **Rosa Mexicano** (#ff006e) - Keywords, control flow, and primary accents
- **Verde Mexicano** (#00d084) - Strings, success states, and secondary accents
- **Cempasúchil Orange** (#ff9500) - Classes, types, and built-in objects
- **Turquoise** (#06ffc8) - Functions, methods, and operators
- **Marigold Yellow** (#ffd60a) - Parameters and special variables
- **Neon Purple** (#BB9AF7) - Decorators, async/await, and special keywords
- **Tierra Brown** (#8b7355) - Comments and docstrings
- **Amber** (#ffba08) - Constants and numbers
- **Night Sky** (#16161E - #3B3B52) - Background gradient from darkest to lightest

## ✨ Features

- **🐍 Python Support** - Comprehensive highlighting for Python 3.5+ including type annotations, f-strings, decorators, and async/await
- **💎 Ruby Support** - Full coverage of Ruby syntax including symbols, string interpolation, blocks, and Rails patterns
- **⚡ JavaScript/TypeScript Support** - Modern JS/TS features including JSX/TSX, template literals, decorators, and async/await
- **Bracket Pair Colorization** - Rainbow brackets using theme colors
- **Semantic Highlighting** - Enhanced token colors for modern language features
- **High Contrast Accents** - Rosa Mexicano highlights make important code elements pop
- **Modular Architecture** - Built with maintainable, modular code structure

## 📦 Installation

### From VS Code Marketplace
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
3. Search for "Mexican Night"
4. Click Install

### Manual Installation
1. Download the latest `.vsix` file from releases
2. Open VS Code
3. Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
4. Click "..." menu → "Install from VSIX..."
5. Select the downloaded file

### From Source
```bash
git clone https://github.com/fruizg0302/mexican-night.git
cd mexican-night
npm install
npm run build
```

Press F5 to test the theme in a new VS Code window.

## 🚀 Usage

1. Open Command Palette (Ctrl+Shift+P / Cmd+Shift+P)
2. Type "Color Theme"
3. Select "Mexican Night"

## 🔧 Customization

You can customize the theme in your `settings.json`:

```json
"workbench.colorCustomizations": {
  "[Mexican Night]": {
    "editor.background": "#0D0E18",
    "editor.foreground": "#C0CAF5"
  }
},
"editor.tokenColorCustomizations": {
  "[Mexican Night]": {
    "keywords": "#E4007C"
  }
}
```

## 🛠️ Development

### Building the Theme
```bash
npm run build        # Generate theme from source
npm run watch       # Auto-rebuild on changes
npm run package     # Create .vsix package
```

### Project Structure
```
mexican-night/
├── src/
│   ├── colors/
│   │   ├── palette.js    # Core color definitions
│   │   ├── ui.js         # UI element colors
│   │   └── syntax.js     # Syntax highlighting
│   ├── generator.js      # Theme builder
│   └── templates/        # Theme structure
├── themes/               # Generated theme files
└── samples/              # Test files for different languages
```

## 🎯 Language Support

Mexican Night provides exceptional syntax highlighting for three languages:

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
- `self` and `cls` - Red Emphasis (italic)
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
- Instance variables (`@var`) - Cyan
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
- JSX tags - Deeper Orange
- JSX attributes - Marigold Yellow (italic)
- Component names - Deeper Orange

**TypeScript Specific**
- Type annotations - Turquoise
- Interfaces - Marigold Yellow
- Type definitions - Cempasúchil Orange
- Decorators - Rosa Mexicano

**Objects & Functions**
- Function calls - Turquoise
- Object keys - Mexican Pink
- Built-in objects (`document`, `window`) - Cempasúchil Orange
- Parameters - Marigold Yellow (italic)
- `this` and `super` - Red Emphasis

### 📝 General Language Features
All languages benefit from:
- **Operators** - Turquoise (arithmetic, comparison)
- **Numbers** - Amber (all number types)
- **Comments** - Tierra Brown (italic)
- **Strings** - Verde Mexicano
- **Punctuation** - Subtle gray (reduced visual noise)
- **Semantic Tokens** - Enhanced highlighting via language servers

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Inspired by the vibrant lights and colors of Mexico City at night
- Structure influenced by the Tokyo Night theme
- Built with love for the Python, Ruby, and JavaScript communities

---

**Enjoy coding with the colors of Mexico City nights! 🇲🇽✨**