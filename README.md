# 🌃 Mexican Night Theme

A vibrant VS Code theme that celebrates the lights of Mexico City at night, featuring Rosa Mexicano (#E4007C) and Verde Mexicano (#006341) as primary accent colors. Optimized for Ruby and JavaScript development.

## 🎨 Color Palette

- **Rosa Mexicano** (#E4007C) - Keywords, selections, and primary accents
- **Verde Mexicano** (#006341) - Strings, success states, and secondary accents
- **Neon Yellow** (#FFD700) - Classes, types, and warnings
- **Neon Blue** (#00B4D8) - Functions and info states
- **Deep Night** (#0D0E18, #1A1B26) - Background colors inspired by night sky

## ✨ Features

- **Optimized for Ruby & JavaScript/TypeScript** - Special attention to syntax highlighting for these languages
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

### Ruby Highlights
- Symbols in Verde Mexicano
- String interpolation in Rosa Mexicano
- Instance variables in cyan
- Class variables in magenta

### JavaScript/TypeScript Highlights
- Import/export keywords in Rosa Mexicano
- Template literals in Verde Mexicano
- Async/await in purple italic
- JSX tags in Rosa Mexicano light

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Inspired by the vibrant lights and colors of Mexico City at night
- Structure influenced by the Tokyo Night theme
- Built with love for the Ruby and JavaScript communities

---

**Enjoy coding with the colors of Mexico City nights! 🇲🇽✨**