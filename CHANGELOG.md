# Change Log

All notable changes to the Mexican Night theme extension.

## [1.2.0] - 2026-07-17

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

## [1.1.0] - 2025-12-27

### Added
- ☕ **Java Support** - Comprehensive Java syntax highlighting
  - Keywords and control flow (if, while, return, try/catch)
  - Primitive types and class/enum/record definitions
  - Annotations (@Override, @Deprecated, etc.)
  - Lambda expressions with arrow operator (->)
  - Generic type parameters
  - Javadoc comments with special tags
  - Method definitions and calls
  - Package and import statements
- 💧 **Elixir Support** - Full Elixir language highlighting
  - Module definitions (defmodule, defp, def)
  - Function definitions and calls
  - Pipe operator (|>) with bold emphasis
  - Atoms and symbols
  - Module attributes (@moduledoc, @spec, etc.)
  - Sigils and regular expressions (~r, ~s, etc.)
  - String interpolation
  - Pattern matching and function captures
  - Special methods (alias, require, import, use)

### Changed
- 📝 Updated README to highlight Java and Elixir support
- 🏷️ Updated publisher name from "wowzontle" to "mercuryatlas"
- 🖼️ Converted theme icon from SVG to PNG format

## [1.0.0] - 2025-12-17

### Added
- 🎨 Theme icon featuring "MN" monogram with Rosa Mexicano and Verde Mexicano colors
- 📸 Screenshot showcases for Python, TypeScript/React, and Ruby
- 📚 Comprehensive documentation structure
  - Configuration guide (docs/CONFIGURATION.md) with customization examples
  - Development guide (docs/DEVELOPMENT.md)
  - Publishing guide (docs/PUBLISHING.md)
- 🌈 Rainbow bracket colorization setup guide in README
- 📝 Sample files (showcase.py, showcase.tsx) for syntax demonstrations

### Changed
- ♻️ Reorganized README - slimmed down from 228 to 82 lines
- 📂 Moved detailed customization and language support docs to CONFIGURATION.md
- 📦 Ready for VS Code Marketplace publication

## [0.0.1] - 2025-12-16

### Added
- 🎨 Initial release of Mexican Night theme
- 🇲🇽 Authentic Mexican color palette inspired by Mexico City nights
- 🐍 **Python Support** - Comprehensive syntax highlighting for Python 3.5+
  - Type annotations and f-strings
  - Decorators and magic methods
  - Async/await support
  - Complete control flow and operator highlighting
- 💎 **Ruby Support** - Full Ruby syntax highlighting
  - Symbols and string interpolation
  - Instance, class, and global variables
  - Rails patterns (ActiveRecord, validations, ERB)
  - Block syntax and special methods
- ⚡ **JavaScript/TypeScript Support** - Modern JS/TS features
  - JSX/TSX component highlighting
  - Template literals and expressions
  - Async/await and decorators
  - Import/export statements
- 🌈 Bracket pair colorization with theme colors
- ✨ Semantic token highlighting support
- 📦 Modular architecture with maintainable code structure

### Color Palette
- Rosa Mexicano (#ff006e) - Keywords and primary accents
- Verde Mexicano Light (#00d084) - Strings and success states
- Cempasúchil Orange (#ff9500) - Classes and types
- Turquoise (#06ffc8) - Functions and methods
- Marigold Yellow (#ffd60a) - Parameters
- Neon Purple (#BB9AF7) - Decorators and special keywords
- Tierra Brown (#8b7355) - Comments and docstrings
- Night Sky backgrounds (#16161E to #3B3B52)
