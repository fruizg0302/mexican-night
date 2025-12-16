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
        foreground: palette.textMuted,
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
        foreground: palette.neonYellow
      }
    },
    {
      name: "Ruby Module Names",
      scope: "entity.name.type.module.ruby",
      settings: {
        foreground: palette.neonYellow
      }
    },
    {
      name: "Ruby Inherited Class - Italic",
      scope: "entity.other.inherited-class.ruby",
      settings: {
        foreground: palette.neonYellow,
        fontStyle: "italic"
      }
    },
    {
      name: "Ruby Support Classes",
      scope: "support.class.ruby",
      settings: {
        foreground: palette.neonYellow
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
        foreground: palette.neonOrange
      }
    },
    {
      name: "Ruby Class Variables (@@var)",
      scope: "variable.other.readwrite.class.ruby",
      settings: {
        foreground: palette.magenta
      }
    },
    {
      name: "Ruby Global Variables ($var) - Warning Color",
      scope: [
        "variable.other.readwrite.global.ruby",
        "variable.other.readwrite.global.pre-defined.ruby"
      ],
      settings: {
        foreground: palette.rosaMexicanoLight
      }
    },
    {
      name: "Ruby self/super - Italic Warning",
      scope: [
        "variable.language.self.ruby",
        "variable.language.super.ruby"
      ],
      settings: {
        foreground: palette.rosaMexicanoLight,
        fontStyle: "italic"
      }
    },
    {
      name: "Ruby __FILE__ and __LINE__",
      scope: "variable.language.ruby",
      settings: {
        foreground: palette.neonOrange
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
        foreground: palette.neonOrange,
        fontStyle: "italic"
      }
    },
    {
      name: "Ruby Block Parameters - Italic",
      scope: "variable.other.block.ruby",
      settings: {
        foreground: palette.neonOrange,
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
        foreground: palette.neonOrange
      }
    },
    {
      name: "Ruby Symbols (:symbol)",
      scope: [
        "constant.other.symbol.ruby",
        "constant.language.symbol.ruby"
      ],
      settings: {
        foreground: palette.neonPurple
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
        foreground: palette.neonOrange
      }
    },
    {
      name: "Ruby Numbers",
      scope: "constant.numeric.ruby",
      settings: {
        foreground: palette.neonOrange
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

  // Enhanced JavaScript/TypeScript syntax highlighting
  const javascriptScopes = [
    // JS/TS comments
    {
      name: "JavaScript Comments",
      scope: [
        "comment.block.js",
        "comment.line.double-slash.js",
        "comment.block.documentation.js"
      ],
      settings: {
        foreground: syntaxColors.comment,
        fontStyle: "italic"
      }
    },
    
    // JS/TS keywords
    {
      name: "JavaScript Keywords",
      scope: [
        "keyword.control.js",
        "keyword.control.flow.js",
        "keyword.control.conditional.js",
        "keyword.control.loop.js",
        "storage.type.js",
        "storage.type.function.js",
        "storage.type.class.js"
      ],
      settings: {
        foreground: syntaxColors.keyword
      }
    },
    
    // JS/TS functions
    {
      name: "JavaScript Function Names",
      scope: [
        "entity.name.function.js",
        "meta.function-call.js",
        "support.function.js"
      ],
      settings: {
        foreground: syntaxColors.function
      }
    },
    
    // JS/TS arrow functions
    {
      name: "JavaScript Arrow Functions",
      scope: "storage.type.function.arrow.js",
      settings: {
        foreground: syntaxColors.jsArrowFunction
      }
    },
    
    // JS/TS variables and parameters
    {
      name: "JavaScript Parameters",
      scope: [
        "variable.parameter.js",
        "meta.parameter.js"
      ],
      settings: {
        foreground: syntaxColors.parameter,
        fontStyle: "italic"
      }
    },
    
    // JS/TS this and super
    {
      name: "JavaScript This/Super",
      scope: [
        "variable.language.this.js",
        "variable.language.super.js"
      ],
      settings: {
        foreground: syntaxColors.jsThis,
        fontStyle: "italic"
      }
    },
    
    // JS/TS constants
    {
      name: "JavaScript Constants",
      scope: [
        "constant.language.js",
        "constant.language.null.js",
        "constant.language.undefined.js",
        "constant.language.nan.js",
        "constant.language.infinity.js"
      ],
      settings: {
        foreground: syntaxColors.constant
      }
    },
    
    // JS/TS template literals
    {
      name: "JavaScript Template Literals",
      scope: [
        "string.template.js",
        "meta.template.expression.js"
      ],
      settings: {
        foreground: syntaxColors.jsTemplateLiteral
      }
    },
    
    // JS/TS template expressions
    {
      name: "JavaScript Template Expressions",
      scope: [
        "punctuation.definition.template-expression.begin.js",
        "punctuation.definition.template-expression.end.js",
        "meta.embedded.line.js"
      ],
      settings: {
        foreground: syntaxColors.jsTemplateExpression
      }
    },
    
    // JS/TS classes
    {
      name: "JavaScript Classes",
      scope: [
        "entity.name.type.class.js",
        "entity.name.type.js",
        "support.class.js"
      ],
      settings: {
        foreground: syntaxColors.class
      }
    },
    
    // JS/TS imports/exports
    {
      name: "JavaScript Import/Export",
      scope: [
        "keyword.control.import.js",
        "keyword.control.export.js",
        "keyword.control.from.js",
        "keyword.control.as.js"
      ],
      settings: {
        foreground: syntaxColors.jsImport
      }
    },
    
    // JS/TS async/await
    {
      name: "JavaScript Async/Await",
      scope: [
        "keyword.control.flow.js",
        "storage.modifier.async.js",
        "keyword.control.await.js"
      ],
      settings: {
        foreground: syntaxColors.jsAsync
      }
    },
    
    // JS/TS decorators
    {
      name: "JavaScript Decorators",
      scope: [
        "meta.decorator.js",
        "punctuation.decorator.js"
      ],
      settings: {
        foreground: syntaxColors.jsDecorator
      }
    },
    
    // JS/TS object properties
    {
      name: "JavaScript Object Properties",
      scope: [
        "meta.object-literal.key.js",
        "variable.other.property.js"
      ],
      settings: {
        foreground: syntaxColors.variableProperty
      }
    },
    
    // JS/TS operators
    {
      name: "JavaScript Operators",
      scope: [
        "keyword.operator.js",
        "keyword.operator.assignment.js",
        "keyword.operator.comparison.js",
        "keyword.operator.arithmetic.js",
        "keyword.operator.logical.js",
        "keyword.operator.ternary.js"
      ],
      settings: {
        foreground: syntaxColors.operator
      }
    },
    
    // JSX/TSX
    {
      name: "JSX Component Tags",
      scope: [
        "entity.name.tag.js",
        "support.class.component.js"
      ],
      settings: {
        foreground: syntaxColors.jsxComponent
      }
    },
    {
      name: "JSX Attributes",
      scope: [
        "entity.other.attribute-name.js",
        "meta.tag.attributes.js"
      ],
      settings: {
        foreground: syntaxColors.jsxAttribute
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