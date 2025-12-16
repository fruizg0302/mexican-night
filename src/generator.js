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
  
  // Enhanced Ruby syntax highlighting
  const rubyScopes = [
    // Ruby comments
    {
      name: "Ruby Comments",
      scope: [
        "comment.line.number-sign.ruby",
        "comment.block.documentation.ruby"
      ],
      settings: {
        foreground: syntaxColors.comment,
        fontStyle: "italic"
      }
    },
    
    // Ruby keywords
    {
      name: "Ruby Keywords",
      scope: [
        "keyword.control.ruby",
        "keyword.control.def.ruby",
        "keyword.control.class.ruby",
        "keyword.control.module.ruby"
      ],
      settings: {
        foreground: syntaxColors.keyword
      }
    },
    
    // Ruby methods and functions
    {
      name: "Ruby Method Definition",
      scope: [
        "entity.name.function.ruby",
        "support.function.kernel.ruby"
      ],
      settings: {
        foreground: syntaxColors.function
      }
    },
    
    // Ruby variables
    {
      name: "Ruby Instance Variables",
      scope: "variable.other.readwrite.instance.ruby",
      settings: {
        foreground: syntaxColors.rubyInstanceVariable
      }
    },
    {
      name: "Ruby Class Variables",
      scope: "variable.other.readwrite.class.ruby",
      settings: {
        foreground: syntaxColors.rubyClassVariable
      }
    },
    {
      name: "Ruby Global Variables",
      scope: "variable.other.readwrite.global.ruby",
      settings: {
        foreground: syntaxColors.rubyGlobalVariable
      }
    },
    
    // Ruby symbols
    {
      name: "Ruby Symbols",
      scope: [
        "constant.language.symbol.ruby",
        "constant.language.symbol.hashkey.ruby"
      ],
      settings: {
        foreground: syntaxColors.rubySymbol
      }
    },
    
    // Ruby strings and interpolation
    {
      name: "Ruby String Interpolation",
      scope: [
        "meta.embedded.line.ruby",
        "punctuation.section.embedded.ruby",
        "source.ruby.embedded.source"
      ],
      settings: {
        foreground: syntaxColors.rubyInterpolation
      }
    },
    
    // Ruby regular expressions
    {
      name: "Ruby Regex",
      scope: "string.regexp.ruby",
      settings: {
        foreground: syntaxColors.rubyRegexp
      }
    },
    
    // Ruby constants and classes
    {
      name: "Ruby Constants",
      scope: [
        "variable.other.constant.ruby",
        "support.class.ruby",
        "entity.name.type.class.ruby",
        "entity.name.type.module.ruby"
      ],
      settings: {
        foreground: syntaxColors.class
      }
    },
    
    // Ruby operators
    {
      name: "Ruby Operators",
      scope: [
        "keyword.operator.assignment.ruby",
        "keyword.operator.comparison.ruby",
        "keyword.operator.arithmetic.ruby",
        "keyword.operator.logical.ruby"
      ],
      settings: {
        foreground: syntaxColors.operator
      }
    },
    
    // Ruby special methods
    {
      name: "Ruby Special Methods",
      scope: [
        "keyword.other.special-method.ruby",
        "support.function.builtin.ruby"
      ],
      settings: {
        foreground: syntaxColors.supportFunction
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
    tokenColors: getTokenColors(palette)
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