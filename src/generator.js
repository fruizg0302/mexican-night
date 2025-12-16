// Theme Generator for Mexican Night
// Combines all modules to generate the final theme JSON

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { palette } from './colors/palette.js';
import { baseTheme } from './templates/base-theme.js';
import { getUIColors } from './colors/ui.js';
import { syntaxColors, getSemanticTokenColors, getTokenColors } from './colors/syntax.js';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to generate the complete theme
function generateTheme() {
  
  // Enhanced Ruby syntax highlighting - Comprehensive coverage
  const rubyScopes = [
    // ==========================================
    // COMMENTS
    // ==========================================
    {
      name: "Ruby Comments",
      scope: [
        "comment.line.number-sign.ruby",
        "comment.block.documentation.ruby"
      ],
      settings: {
        foreground: palette.tierraBrown,
        fontStyle: "italic"
      }
    },

    // ==========================================
    // KEYWORDS AND CONTROL FLOW
    // ==========================================
    {
      name: "Ruby Keywords (def, class, module)",
      scope: [
        "keyword.control.def.ruby",
        "keyword.control.class.ruby",
        "keyword.control.module.ruby",
        "keyword.control.start-block.ruby"
      ],
      settings: {
        foreground: palette.rosaMexicano
      }
    },
    {
      name: "Ruby Control Keywords",
      scope: "keyword.control.ruby",
      settings: {
        foreground: palette.rosaMexicano
      }
    },
    {
      name: "Ruby Flow Keywords (if, else, return) - Italic",
      scope: [
        "keyword.control.conditional.ruby",
        "keyword.control.loop.ruby"
      ],
      settings: {
        foreground: palette.rosaMexicano,
        fontStyle: "italic"
      }
    },
    {
      name: "Ruby Pseudo Methods (break, next, return, yield)",
      scope: "keyword.control.pseudo-method.ruby",
      settings: {
        foreground: palette.rosaMexicano,
        fontStyle: "italic"
      }
    },
    {
      name: "Ruby Special Methods (require, include, attr_accessor, private)",
      scope: "keyword.other.special-method.ruby",
      settings: {
        foreground: palette.neonPurple
      }
    },

    // ==========================================
    // METHODS, CLASSES, AND MODULES
    // ==========================================
    {
      name: "Ruby Method Definitions",
      scope: "entity.name.function.ruby",
      settings: {
        foreground: palette.neonBlue
      }
    },
    {
      name: "Ruby Class Names",
      scope: "entity.name.type.class.ruby",
      settings: {
        foreground: palette.neonOrange
      }
    },
    {
      name: "Ruby Module Names",
      scope: "entity.name.type.module.ruby",
      settings: {
        foreground: palette.neonOrange
      }
    },
    {
      name: "Ruby Inherited Class - Italic",
      scope: "entity.other.inherited-class.ruby",
      settings: {
        foreground: palette.neonOrange,
        fontStyle: "italic"
      }
    },
    {
      name: "Ruby Support Classes",
      scope: "support.class.ruby",
      settings: {
        foreground: palette.neonOrange
      }
    },
    {
      name: "Ruby Kernel Methods (puts, print, lambda, proc)",
      scope: "support.function.kernel.ruby",
      settings: {
        foreground: palette.neonBlue
      }
    },
    {
      name: "Ruby Built-in Functions",
      scope: "support.function.builtin.ruby",
      settings: {
        foreground: palette.neonBlue
      }
    },

    // ==========================================
    // VARIABLES - SIGIL SYSTEM
    // ==========================================
    {
      name: "Ruby Instance Variables (@var)",
      scope: "variable.other.readwrite.instance.ruby",
      settings: {
        foreground: palette.neonYellow
      }
    },
    {
      name: "Ruby Class Variables (@@var)",
      scope: "variable.other.readwrite.class.ruby",
      settings: {
        foreground: palette.deeperOrange
      }
    },
    {
      name: "Ruby Global Variables ($var) - Warning Color",
      scope: [
        "variable.other.readwrite.global.ruby",
        "variable.other.readwrite.global.pre-defined.ruby"
      ],
      settings: {
        foreground: palette.redWarning
      }
    },
    {
      name: "Ruby self/super - Italic Warning",
      scope: [
        "variable.language.self.ruby",
        "variable.language.super.ruby"
      ],
      settings: {
        foreground: palette.redEmphasis,
        fontStyle: "italic"
      }
    },
    {
      name: "Ruby __FILE__ and __LINE__",
      scope: "variable.language.ruby",
      settings: {
        foreground: palette.neonYellow
      }
    },
    {
      name: "Ruby Variable Sigils (@, @@, $)",
      scope: "punctuation.definition.variable.ruby",
      settings: {
        foreground: palette.textSecondary
      }
    },

    // ==========================================
    // PARAMETERS
    // ==========================================
    {
      name: "Ruby Method Parameters - Italic",
      scope: "variable.parameter.function.ruby",
      settings: {
        foreground: palette.neonYellow,
        fontStyle: "italic"
      }
    },
    {
      name: "Ruby Block Parameters - Italic",
      scope: "variable.other.block.ruby",
      settings: {
        foreground: palette.neonYellow,
        fontStyle: "italic"
      }
    },
    {
      name: "Ruby Block Parameter Pipes (|x, y|)",
      scope: "punctuation.separator.variable.ruby",
      settings: {
        foreground: palette.textMuted
      }
    },

    // ==========================================
    // CONSTANTS AND SYMBOLS
    // ==========================================
    {
      name: "Ruby Constants (CONSTANT)",
      scope: "variable.other.constant.ruby",
      settings: {
        foreground: palette.amber
      }
    },
    {
      name: "Ruby Symbols (:symbol)",
      scope: [
        "constant.other.symbol.ruby",
        "constant.language.symbol.ruby"
      ],
      settings: {
        foreground: palette.neonBlue
      }
    },
    {
      name: "Ruby Hash Key Symbols (key: value)",
      scope: [
        "constant.other.symbol.hashkey.ruby",
        "constant.other.symbol.hashkey.parameter.function.ruby"
      ],
      settings: {
        foreground: palette.accentCyan
      }
    },
    {
      name: "Ruby nil, true, false",
      scope: [
        "constant.language.nil.ruby",
        "constant.language.boolean.ruby"
      ],
      settings: {
        foreground: palette.amber
      }
    },
    {
      name: "Ruby Numbers",
      scope: "constant.numeric.ruby",
      settings: {
        foreground: palette.amber
      }
    },

    // ==========================================
    // STRINGS AND INTERPOLATION
    // ==========================================
    {
      name: "Ruby Strings",
      scope: [
        "string.quoted.single.ruby",
        "string.quoted.double.interpolated.ruby",
        "string.quoted.other.ruby",
        "string.quoted.other.interpolated.ruby"
      ],
      settings: {
        foreground: palette.verdeMexicanoLight
      }
    },
    {
      name: "Ruby String Interpolation Delimiters (#{})",
      scope: [
        "punctuation.section.embedded.begin.ruby",
        "punctuation.section.embedded.end.ruby"
      ],
      settings: {
        foreground: palette.rosaMexicano
      }
    },
    {
      name: "Ruby Embedded Code in Interpolation",
      scope: [
        "meta.embedded.line.ruby",
        "source.ruby.embedded.source"
      ],
      settings: {
        foreground: palette.textPrimary
      }
    },
    {
      name: "Ruby Heredocs",
      scope: "string.unquoted.heredoc.ruby",
      settings: {
        foreground: palette.verdeMexicanoLight
      }
    },
    {
      name: "Ruby Regular Expressions",
      scope: [
        "string.regexp.ruby",
        "string.regexp.interpolated.ruby"
      ],
      settings: {
        foreground: palette.accentTeal
      }
    },
    {
      name: "Ruby Backtick Commands",
      scope: "string.interpolated.ruby",
      settings: {
        foreground: palette.verdeMexicanoLight
      }
    },

    // ==========================================
    // OPERATORS
    // ==========================================
    {
      name: "Ruby Assignment Operators",
      scope: [
        "keyword.operator.assignment.ruby",
        "keyword.operator.assignment.augmented.ruby"
      ],
      settings: {
        foreground: palette.accentCyan
      }
    },
    {
      name: "Ruby Comparison Operators",
      scope: "keyword.operator.comparison.ruby",
      settings: {
        foreground: palette.accentCyan
      }
    },
    {
      name: "Ruby Logical Operators",
      scope: "keyword.operator.logical.ruby",
      settings: {
        foreground: palette.accentCyan
      }
    },
    {
      name: "Ruby Arithmetic Operators",
      scope: "keyword.operator.arithmetic.ruby",
      settings: {
        foreground: palette.accentCyan
      }
    },
    {
      name: "Ruby Other Operators",
      scope: "keyword.operator.other.ruby",
      settings: {
        foreground: palette.accentCyan
      }
    },

    // ==========================================
    // PUNCTUATION AND STRUCTURE
    // ==========================================
    {
      name: "Ruby Namespace Separator (::)",
      scope: "punctuation.separator.namespace.ruby",
      settings: {
        foreground: palette.textSecondary
      }
    },
    {
      name: "Ruby Inheritance Separator (<)",
      scope: "punctuation.separator.inheritance.ruby",
      settings: {
        foreground: palette.textSecondary
      }
    },
    {
      name: "Ruby Method Call Separator (.)",
      scope: "punctuation.separator.method.ruby",
      settings: {
        foreground: palette.textSecondary
      }
    },
    {
      name: "Ruby Hash Rocket (=>)",
      scope: "punctuation.separator.key-value",
      settings: {
        foreground: palette.rosaMexicano
      }
    },

    // ==========================================
    // RAILS-SPECIFIC (if Rails extension installed)
    // ==========================================
    {
      name: "Rails ActiveRecord Methods",
      scope: "support.function.activerecord.rails",
      settings: {
        foreground: palette.neonBlue
      }
    },
    {
      name: "Rails Validations",
      scope: "support.function.validation.rails",
      settings: {
        foreground: palette.neonPurple
      }
    },
    {
      name: "Rails Callbacks",
      scope: "support.function.callback.rails",
      settings: {
        foreground: palette.verdeMexicanoLight
      }
    },
    {
      name: "Rails View Helpers",
      scope: "support.function.view.rails",
      settings: {
        foreground: palette.neonBlue
      }
    },
    {
      name: "Rails Routing Methods",
      scope: "support.function.routing.rails",
      settings: {
        foreground: palette.neonPurple
      }
    },

    // ==========================================
    // ERB TEMPLATES
    // ==========================================
    {
      name: "ERB Delimiters (<%, %>)",
      scope: [
        "punctuation.section.embedded.begin.erb",
        "punctuation.section.embedded.end.erb",
        "punctuation.section.embedded.ruby"
      ],
      settings: {
        foreground: palette.rosaMexicano
      }
    },
    {
      name: "ERB Comments",
      scope: [
        "comment.block.erb",
        "comment.line.number-sign.erb"
      ],
      settings: {
        foreground: palette.textMuted,
        fontStyle: "italic"
      }
    }
  ];

  // Enhanced JavaScript/TypeScript syntax highlighting - Mexican Night
  const javascriptScopes = [
    // ==========================================
    // COMMENTS
    // ==========================================
    {
      name: "JS/TS Comments",
      scope: [
        "comment.line.double-slash.js",
        "comment.line.double-slash.ts",
        "comment.block.js",
        "comment.block.ts"
      ],
      settings: {
        foreground: palette.tierraBrown,
        fontStyle: "italic"
      }
    },
    {
      name: "JSDoc Comments",
      scope: [
        "comment.block.documentation.js",
        "comment.block.documentation.ts"
      ],
      settings: {
        foreground: palette.tierraBrown,
        fontStyle: "italic"
      }
    },
    {
      name: "JSDoc Tags",
      scope: [
        "storage.type.class.jsdoc",
        "punctuation.definition.block.tag.jsdoc"
      ],
      settings: {
        foreground: palette.neonPurple
      }
    },
    {
      name: "JSDoc Types",
      scope: [
        "entity.name.type.instance.jsdoc"
      ],
      settings: {
        foreground: palette.neonBlue,
        fontStyle: "italic"
      }
    },

    // ==========================================
    // KEYWORDS AND CONTROL FLOW
    // ==========================================
    {
      name: "JS/TS Keywords",
      scope: [
        "keyword.control.js",
        "keyword.control.ts",
        "storage.type.js",
        "storage.type.ts",
        "keyword.operator.new.js",
        "keyword.operator.new.ts"
      ],
      settings: {
        foreground: palette.rosaMexicano
      }
    },
    {
      name: "JS/TS Control Flow (italic)",
      scope: [
        "keyword.control.flow.js",
        "keyword.control.flow.ts",
        "keyword.control.return.js",
        "keyword.control.return.ts",
        "keyword.control.trycatch.js",
        "keyword.control.trycatch.ts",
        "storage.modifier.async.js",
        "storage.modifier.async.ts"
      ],
      settings: {
        foreground: palette.rosaMexicano,
        fontStyle: "italic"
      }
    },
    {
      name: "JS/TS Import/Export",
      scope: [
        "keyword.control.import.js",
        "keyword.control.import.ts",
        "keyword.control.export.js",
        "keyword.control.export.ts",
        "keyword.control.from.js",
        "keyword.control.from.ts",
        "keyword.control.as.js",
        "keyword.control.as.ts"
      ],
      settings: {
        foreground: palette.neonPurple
      }
    },

    // ==========================================
    // FUNCTIONS AND METHODS
    // ==========================================
    {
      name: "JS/TS Function Definitions",
      scope: [
        "entity.name.function.js",
        "entity.name.function.ts",
        "entity.name.method.js",
        "entity.name.method.ts"
      ],
      settings: {
        foreground: palette.neonBlue
      }
    },
    {
      name: "JS/TS Built-in Functions",
      scope: [
        "support.function.js",
        "support.function.ts",
        "support.function.dom.js",
        "support.function.dom.ts"
      ],
      settings: {
        foreground: palette.neonBlue
      }
    },
    {
      name: "JS/TS Console",
      scope: [
        "support.function.console.js",
        "support.function.console.ts",
        "support.class.console.js",
        "support.class.console.ts"
      ],
      settings: {
        foreground: palette.neonYellow,
        fontStyle: "bold"
      }
    },

    // ==========================================
    // CLASSES AND TYPES
    // ==========================================
    {
      name: "JS/TS Class Names",
      scope: [
        "entity.name.type.class.js",
        "entity.name.type.class.ts",
        "support.class.js",
        "support.class.ts"
      ],
      settings: {
        foreground: palette.neonOrange
      }
    },
    {
      name: "TypeScript Interface Names",
      scope: [
        "entity.name.type.interface.ts",
        "entity.name.type.interface.tsx"
      ],
      settings: {
        foreground: palette.neonOrange
      }
    },
    {
      name: "TypeScript Type Names",
      scope: [
        "entity.name.type.ts",
        "entity.name.type.tsx",
        "entity.name.type.alias.ts",
        "entity.name.type.alias.tsx"
      ],
      settings: {
        foreground: palette.neonOrange
      }
    },

    // ==========================================
    // STRINGS AND TEMPLATES
    // ==========================================
    {
      name: "JS/TS Strings",
      scope: [
        "string.quoted.single.js",
        "string.quoted.single.ts",
        "string.quoted.double.js",
        "string.quoted.double.ts"
      ],
      settings: {
        foreground: palette.verdeMexicanoLight
      }
    },
    {
      name: "JS/TS Template Literals",
      scope: [
        "string.template.js",
        "string.template.ts"
      ],
      settings: {
        foreground: palette.verdeMexicanoLight
      }
    },
    {
      name: "JS/TS Template Interpolation Delimiters",
      scope: [
        "punctuation.definition.template-expression.begin.js",
        "punctuation.definition.template-expression.begin.ts",
        "punctuation.definition.template-expression.end.js",
        "punctuation.definition.template-expression.end.ts"
      ],
      settings: {
        foreground: palette.rosaMexicano
      }
    },
    {
      name: "JS/TS Embedded Code in Templates",
      scope: [
        "meta.template.expression.js",
        "meta.template.expression.ts"
      ],
      settings: {
        foreground: palette.textPrimary
      }
    },

    // ==========================================
    // VARIABLES AND CONSTANTS
    // ==========================================
    {
      name: "JS/TS Variables",
      scope: [
        "variable.other.readwrite.js",
        "variable.other.readwrite.ts",
        "variable.other.object.js",
        "variable.other.object.ts"
      ],
      settings: {
        foreground: palette.neonYellow
      }
    },
    {
      name: "JS/TS Constants",
      scope: [
        "variable.other.constant.js",
        "variable.other.constant.ts",
        "constant.numeric.js",
        "constant.numeric.ts",
        "constant.numeric.decimal.js",
        "constant.numeric.decimal.ts",
        "constant.numeric.hex.js",
        "constant.numeric.hex.ts"
      ],
      settings: {
        foreground: palette.amber
      }
    },

    // ==========================================
    // PARAMETERS
    // ==========================================
    {
      name: "JS/TS Function Parameters (italic)",
      scope: [
        "variable.parameter.js",
        "variable.parameter.ts"
      ],
      settings: {
        foreground: palette.neonYellow,
        fontStyle: "italic"
      }
    },

    // ==========================================
    // SPECIAL LANGUAGE VARIABLES
    // ==========================================
    {
      name: "JS/TS this/super/arguments (italic)",
      scope: [
        "variable.language.this.js",
        "variable.language.this.ts",
        "variable.language.super.js",
        "variable.language.super.ts",
        "variable.language.arguments.js",
        "variable.language.arguments.ts"
      ],
      settings: {
        foreground: palette.redEmphasis,
        fontStyle: "italic"
      }
    },

    // ==========================================
    // BOOLEANS, NULL, UNDEFINED
    // ==========================================
    {
      name: "JS/TS Booleans & null/undefined",
      scope: [
        "constant.language.boolean.true.js",
        "constant.language.boolean.true.ts",
        "constant.language.boolean.false.js",
        "constant.language.boolean.false.ts",
        "constant.language.null.js",
        "constant.language.null.ts",
        "constant.language.undefined.js",
        "constant.language.undefined.ts",
        "constant.language.nan.js",
        "constant.language.nan.ts",
        "constant.language.infinity.js",
        "constant.language.infinity.ts"
      ],
      settings: {
        foreground: palette.amber
      }
    },

    // ==========================================
    // OBJECT PROPERTIES
    // ==========================================
    {
      name: "JS/TS Object Properties",
      scope: [
        "variable.other.property.js",
        "variable.other.property.ts",
        "meta.object-literal.key.js",
        "meta.object-literal.key.ts"
      ],
      settings: {
        foreground: palette.neonYellow
      }
    },

    // ==========================================
    // OPERATORS
    // ==========================================
    {
      name: "JS/TS Operators",
      scope: [
        "keyword.operator.arithmetic.js",
        "keyword.operator.arithmetic.ts",
        "keyword.operator.comparison.js",
        "keyword.operator.comparison.ts",
        "keyword.operator.logical.js",
        "keyword.operator.logical.ts",
        "keyword.operator.assignment.js",
        "keyword.operator.assignment.ts",
        "keyword.operator.assignment.compound.js",
        "keyword.operator.assignment.compound.ts",
        "keyword.operator.bitwise.js",
        "keyword.operator.bitwise.ts",
        "keyword.operator.ternary.js",
        "keyword.operator.ternary.ts",
        "keyword.operator.spread.js",
        "keyword.operator.spread.ts"
      ],
      settings: {
        foreground: palette.neonBlue
      }
    },

    // ==========================================
    // TYPESCRIPT TYPE ANNOTATIONS
    // ==========================================
    {
      name: "TypeScript Type Annotations",
      scope: [
        "meta.type.annotation.ts",
        "meta.type.annotation.tsx",
        "support.type.primitive.ts",
        "support.type.primitive.tsx",
        "keyword.operator.type.annotation.ts",
        "keyword.operator.type.annotation.tsx"
      ],
      settings: {
        foreground: palette.neonBlue
      }
    },
    {
      name: "TypeScript Optional Chaining & Nullish Coalescing",
      scope: [
        "keyword.operator.optional.ts",
        "keyword.operator.optional.tsx",
        "keyword.operator.nullish-coalescing.ts",
        "keyword.operator.nullish-coalescing.tsx"
      ],
      settings: {
        foreground: palette.neonBlue
      }
    },

    // ==========================================
    // REGULAR EXPRESSIONS
    // ==========================================
    {
      name: "JS/TS Regular Expressions",
      scope: [
        "string.regexp.js",
        "string.regexp.ts"
      ],
      settings: {
        foreground: palette.neonPurple
      }
    },

    // ==========================================
    // JSX/TSX
    // ==========================================
    {
      name: "JSX/TSX Tags",
      scope: [
        "entity.name.tag.js",
        "entity.name.tag.jsx",
        "entity.name.tag.tsx",
        "support.class.component.js",
        "support.class.component.tsx"
      ],
      settings: {
        foreground: palette.deeperOrange
      }
    },
    {
      name: "JSX/TSX Attributes",
      scope: [
        "entity.other.attribute-name.js",
        "entity.other.attribute-name.jsx",
        "entity.other.attribute-name.tsx"
      ],
      settings: {
        foreground: palette.neonYellow,
        fontStyle: "italic"
      }
    },

    // ==========================================
    // DECORATORS
    // ==========================================
    {
      name: "JS/TS Decorators",
      scope: [
        "meta.decorator.js",
        "meta.decorator.ts",
        "entity.name.function.decorator.js",
        "entity.name.function.decorator.ts",
        "punctuation.decorator.js",
        "punctuation.decorator.ts"
      ],
      settings: {
        foreground: palette.rosaMexicano
      }
    },

    // ==========================================
    // PUNCTUATION
    // ==========================================
    {
      name: "JS/TS Punctuation",
      scope: [
        "punctuation.separator.comma.js",
        "punctuation.separator.comma.ts",
        "punctuation.terminator.statement.js",
        "punctuation.terminator.statement.ts",
        "punctuation.accessor.js",
        "punctuation.accessor.ts",
        "punctuation.accessor.optional.js",
        "punctuation.accessor.optional.ts"
      ],
      settings: {
        foreground: palette.textSecondary
      }
    }
  ];

  // Combine all parts
  const theme = {
    ...baseTheme,
    colors: getUIColors(palette),
    semanticTokenColors: getSemanticTokenColors(palette),
    tokenColors: [
      ...rubyScopes,
      ...javascriptScopes,
      ...getTokenColors(palette)
    ]
  };
  
  return theme;
}

// Function to write theme to file
function writeTheme(theme, outputPath) {
  const themeJson = JSON.stringify(theme, null, 2);
  fs.writeFileSync(outputPath, themeJson);
  console.log(`✓ Theme generated at: ${outputPath}`);
}

// Main execution
function main() {
  try {
    const theme = generateTheme();
    const outputPath = path.join(__dirname, '..', 'themes', 'Mexican Night-color-theme.json');
    writeTheme(theme, outputPath);
  } catch (error) {
    console.error('Error generating theme:', error);
    process.exit(1);
  }
}

// Export for use in other scripts
export {
  generateTheme,
  writeTheme
};

// Run if called directly (ES module check)
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}