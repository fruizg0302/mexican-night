// Syntax Highlighting Colors for Mexican Night Theme
// Maps palette colors to programming language tokens

function getSemanticTokenColors(palette) {
  return {
    "parameter.declaration": {
      foreground: palette.neonOrange,
    },
    parameter: {
      foreground: palette.textPrimary,
    },
    "property.declaration": {
      foreground: palette.verdeMexicanoLight,
    },
    "property.defaultLibrary": {
      foreground: palette.accentCyan,
    },
    "*.defaultLibrary": {
      foreground: palette.accentCyan,
    },
    variable: {
      foreground: palette.textPrimary,
    },
    "variable.readonly": {
      foreground: palette.textPrimary,
    },
    "variable.declaration": {
      foreground: palette.textPrimary,
    },
    "function.declaration": {
      foreground: palette.neonBlue,
    },
    type: {
      foreground: palette.accentCyan,
    },
    class: {
      foreground: palette.neonYellow,
    },
    interface: {
      foreground: palette.neonYellow,
    },
  };
}

export const syntaxColors = {
  // Let's enhance Ruby and JavaScript syntax highlighting

  // Comments
  comment: palette.gray400,
  commentDoc: palette.gray500,

  // Keywords & Control Flow
  keyword: palette.purple,
  keywordControl: palette.magenta,
  keywordOperator: palette.cyan,

  // Functions & Methods
  function: palette.blue,
  functionCall: palette.blue,
  method: palette.blue,
  methodCall: palette.blue,

  // Variables & Parameters
  variable: palette.white,
  variableProperty: palette.white,
  parameter: palette.orange,

  // Constants & Literals
  constant: palette.orange,
  constantBuiltin: palette.orange,
  constantLanguage: palette.orange,

  // Strings & Regular Expressions
  string: palette.green,
  stringRegexp: palette.cyan,
  stringEscape: palette.magenta,
  stringInterpolation: palette.cyan,

  // Numbers & Booleans
  number: palette.orange,
  boolean: palette.orange,

  // Types & Classes
  type: palette.cyan,
  typeBuiltin: palette.cyan,
  class: palette.yellow,
  className: palette.yellow,

  // Support & Library
  support: palette.cyan,
  supportFunction: palette.cyan,
  supportMethod: palette.cyan,
  supportClass: palette.yellow,
  supportType: palette.cyan,
  supportConstant: palette.orange,
  supportVariable: palette.white,

  // Punctuation & Operators
  punctuation: palette.gray600,
  punctuationDefinition: palette.gray600,
  punctuationSection: palette.white,
  punctuationTerminator: palette.gray600,
  operator: palette.cyan,

  // Tags (HTML/JSX)
  tag: palette.red,
  tagAttribute: palette.purple,
  tagPunctuation: palette.gray600,

  // Invalid & Deprecated
  invalid: palette.red,
  invalidDeprecated: palette.gray500,

  // Ruby-specific
  rubySymbol: palette.cyan,
  rubyInstanceVariable: palette.magenta,
  rubyClassVariable: palette.magenta,
  rubyGlobalVariable: palette.red,
  rubyPseudoVariable: palette.magenta,
  rubyHeredoc: palette.green,
  rubyInterpolation: palette.cyan,
  rubyRegexp: palette.cyan,

  // JavaScript-specific
  jsThis: palette.magenta,
  jsSuper: palette.magenta,
  jsNull: palette.orange,
  jsUndefined: palette.orange,
  jsNan: palette.orange,
  jsPrototype: palette.cyan,
  jsConstructor: palette.blue,
  jsDecorator: palette.blue,
  jsxComponent: palette.yellow,
  jsxAttribute: palette.purple,
  jsArrowFunction: palette.blue,
  jsTemplateLiteral: palette.green,
  jsTemplateExpression: palette.cyan,
  jsImport: palette.purple,
  jsExport: palette.purple,
  jsAsync: palette.purple,
  jsAwait: palette.purple,

  // Storage modifiers
  storageType: palette.purple,
  storageModifier: palette.purple,

  // Entity names
  entityName: palette.yellow,
  entityNameFunction: palette.blue,
  entityNameType: palette.yellow,
  entityNameTag: palette.red,
  entityNameSection: palette.blue,
  entityOther: palette.orange,

  // Meta
  metaClass: palette.yellow,
  metaFunction: palette.blue,
  metaSelector: palette.purple,
  metaProperty: palette.cyan,
};

function getTokenColors(palette) {
  return [
    {
      name: "Comment",
      scope: ["comment", "punctuation.definition.comment"],
      settings: {
        fontStyle: "italic",
        foreground: palette.textMuted,
      },
    },
    {
      name: "Variables",
      scope: ["variable", "string constant.other.placeholder"],
      settings: {
        foreground: palette.textPrimary,
      },
    },
    {
      name: "Colors",
      scope: ["constant.other.color"],
      settings: {
        foreground: palette.white,
      },
    },
    {
      name: "Invalid",
      scope: ["invalid", "invalid.illegal"],
      settings: {
        foreground: palette.error,
      },
    },
    {
      name: "Invalid - Illegal",
      scope: ["invalid.illegal"],
      settings: {
        foreground: palette.error,
      },
    },
    {
      name: "Carriage Return",
      scope: ["carriage-return"],
      settings: {
        fontStyle: "italic underline",
        foreground: palette.nightSkyBright,
      },
    },
    {
      name: "Keyword, Storage",
      scope: ["keyword", "storage.type", "storage.modifier"],
      settings: {
        foreground: palette.rosaMexicano,
      },
    },
    {
      name: "Operator, Misc",
      scope: [
        "keyword.control",
        "constant.other.color",
        "punctuation",
        "meta.tag",
        "punctuation.definition.tag",
        "punctuation.separator.inheritance.php",
        "punctuation.definition.tag.html",
        "punctuation.definition.tag.begin.html",
        "punctuation.definition.tag.end.html",
        "punctuation.section.embedded",
        "keyword.other.template",
        "keyword.other.substitution",
      ],
      settings: {
        foreground: palette.accentCyan,
      },
    },
    {
      name: "Tag",
      scope: ["entity.name.tag", "meta.tag.sgml", "markup.deleted.git_gutter"],
      settings: {
        foreground: palette.rosaMexicanoLight,
      },
    },
    {
      name: "Function, Special Method",
      scope: [
        "entity.name.function",
        "meta.function-call",
        "variable.function",
        "support.function",
        "keyword.other.special-method",
      ],
      settings: {
        foreground: palette.neonBlue,
      },
    },
    {
      name: "Function Call",
      scope: [
        "variable.function",
        "variable.annotation",
        "meta.function-call.generic",
        "support.function.go",
      ],
      settings: {
        foreground: palette.neonBlue,
      },
    },
    {
      name: "Block Level Variables",
      scope: ["meta.block variable.other"],
      settings: {
        foreground: palette.textPrimary,
      },
    },
    {
      name: "Other Variable, String Link",
      scope: ["support.other.variable", "string.other.link"],
      settings: {
        foreground: palette.rosaMexicanoLight,
      },
    },
    {
      name: "Number, Constant, Function Argument, Tag Attribute, Embedded",
      scope: [
        "constant.numeric",
        "constant.language",
        "support.constant",
        "constant.character",
        "constant.escape",
        "variable.parameter",
        "keyword.other.unit",
        "keyword.other",
      ],
      settings: {
        foreground: palette.neonOrange,
      },
    },
    {
      name: "Symbols",
      scope: ["constant.other.symbol", "constant.other.key"],
      settings: {
        foreground: palette.verdeMexicanoLight,
      },
    },
    {
      name: "String, Symbols, Inherited Class, Markup Heading",
      scope: [
        "string",
        "constant.other.symbol",
        "constant.other.key",
        "entity.other.inherited-class",
        "markup.heading",
        "markup.inserted.git_gutter",
        "meta.group.braces.curly constant.other.object.key.js string.unquoted.label.js",
      ],
      settings: {
        foreground: palette.verdeMexicanoLight,
      },
    },
    {
      name: "Class, Support",
      scope: [
        "entity.name",
        "support.type",
        "support.class",
        "support.other.namespace.use.php",
        "meta.use.php",
        "support.other.namespace.php",
        "markup.changed.git_gutter",
        "support.type.sys-types",
      ],
      settings: {
        foreground: palette.neonYellow,
      },
    },
    {
      name: "Entity Types",
      scope: ["support.type"],
      settings: {
        foreground: palette.accentCyan,
      },
    },
    {
      name: "CSS Class and Support",
      scope: [
        "source.css support.type.property-name",
        "source.sass support.type.property-name",
        "source.scss support.type.property-name",
        "source.less support.type.property-name",
        "source.stylus support.type.property-name",
        "source.postcss support.type.property-name",
      ],
      settings: {
        foreground: palette.accentCyan,
      },
    },
    {
      name: "CSS Property Name",
      scope: [
        "support.type.vendored.property-name",
        "support.type.property-name",
      ],
      settings: {
        foreground: palette.neonBlue,
      },
    },
    {
      name: "CSS browser prefix",
      scope: [
        "source.css support.type",
        "source.sass support.type",
        "source.scss support.type",
        "source.less support.type",
        "source.stylus support.type",
      ],
      settings: {
        foreground: palette.textMuted,
      },
    },
    {
      name: "CSS Pseudo Class",
      scope: ["entity.other.attribute-name.pseudo-class"],
      settings: {
        foreground: palette.rosaMexicano,
      },
    },
    {
      name: "Sub-methods",
      scope: [
        "entity.name.module.js",
        "variable.import.parameter.js",
        "variable.other.class.js",
      ],
      settings: {
        foreground: palette.rosaMexicanoLight,
      },
    },
    {
      name: "Language methods",
      scope: ["variable.language"],
      settings: {
        fontStyle: "italic",
        foreground: palette.rosaMexicanoLight,
      },
    },
    {
      name: "entity.name.method.js",
      scope: ["entity.name.method.js"],
      settings: {
        fontStyle: "italic",
        foreground: palette.neonBlue,
      },
    },
    {
      name: "meta.method.js",
      scope: [
        "meta.class-method.js entity.name.function.js",
        "variable.function.constructor",
      ],
      settings: {
        foreground: palette.neonBlue,
      },
    },
    {
      name: "Attributes",
      scope: ["entity.other.attribute-name"],
      settings: {
        foreground: palette.rosaMexicano,
      },
    },
    {
      name: "HTML Attributes",
      scope: [
        "text.html.basic entity.other.attribute-name.html",
        "text.html.basic entity.other.attribute-name",
      ],
      settings: {
        fontStyle: "italic",
        foreground: palette.neonYellow,
      },
    },
    {
      name: "CSS Classes",
      scope: ["entity.other.attribute-name.class"],
      settings: {
        foreground: palette.neonYellow,
      },
    },
    {
      name: "CSS ID",
      scope: ["source.sass keyword.control", "entity.other.attribute-name.id"],
      settings: {
        foreground: palette.neonBlue,
      },
    },
    {
      name: "Inserted",
      scope: ["markup.inserted"],
      settings: {
        foreground: palette.verdeMexicanoLight,
      },
    },
    {
      name: "Deleted",
      scope: ["markup.deleted"],
      settings: {
        foreground: palette.error,
      },
    },
    {
      name: "Changed",
      scope: ["markup.changed"],
      settings: {
        foreground: palette.rosaMexicano,
      },
    },
    {
      name: "Regular Expressions",
      scope: ["string.regexp"],
      settings: {
        foreground: palette.accentCyan,
      },
    },
    {
      name: "Escape Characters",
      scope: ["constant.character.escape"],
      settings: {
        foreground: palette.accentCyan,
      },
    },
    {
      name: "URL",
      scope: ["*url*", "*link*", "*uri*"],
      settings: {
        fontStyle: "underline",
      },
    },
    {
      name: "Decorators",
      scope: [
        "tag.decorator.js entity.name.tag.js",
        "tag.decorator.js punctuation.definition.tag.js",
      ],
      settings: {
        fontStyle: "italic",
        foreground: palette.neonBlue,
      },
    },
    {
      name: "ES7 Bind Operator",
      scope: [
        "source.js constant.other.object.key.js string.unquoted.label.js",
      ],
      settings: {
        fontStyle: "italic",
        foreground: palette.rosaMexicanoLight,
      },
    },
    {
      name: "JSON Key - Level 0",
      scope: [
        "source.json meta.structure.dictionary.json support.type.property-name.json",
      ],
      settings: {
        foreground: palette.rosaMexicano,
      },
    },
    {
      name: "JSON Key - Level 1",
      scope: [
        "source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json",
      ],
      settings: {
        foreground: palette.neonYellow,
      },
    },
    {
      name: "JSON Key - Level 2",
      scope: [
        "source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json",
      ],
      settings: {
        foreground: palette.neonOrange,
      },
    },
    {
      name: "JSON Key - Level 3",
      scope: [
        "source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json",
      ],
      settings: {
        foreground: palette.rosaMexicanoLight,
      },
    },
    {
      name: "JSON Key - Level 4",
      scope: [
        "source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json",
      ],
      settings: {
        foreground: palette.accentTeal,
      },
    },
    {
      name: "JSON Key - Level 5",
      scope: [
        "source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json",
      ],
      settings: {
        foreground: palette.neonBlue,
      },
    },
    {
      name: "JSON Key - Level 6",
      scope: [
        "source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json",
      ],
      settings: {
        foreground: palette.verdeMexicanoLight,
      },
    },
    {
      name: "JSON Key - Level 7",
      scope: [
        "source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json",
      ],
      settings: {
        foreground: palette.rosaMexicano,
      },
    },
    {
      name: "JSON Key - Level 8",
      scope: [
        "source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json",
      ],
      settings: {
        foreground: palette.verdeMexicanoLight,
      },
    },
    {
      name: "Markdown - Plain",
      scope: [
        "text.html.markdown",
        "punctuation.definition.list_item.markdown",
      ],
      settings: {
        foreground: palette.textPrimary,
      },
    },
    {
      name: "Markdown - Markup Raw Inline",
      scope: ["text.html.markdown markup.inline.raw.markdown"],
      settings: {
        foreground: palette.rosaMexicano,
      },
    },
    {
      name: "Markdown - Markup Raw Inline Punctuation",
      scope: [
        "text.html.markdown markup.inline.raw.markdown punctuation.definition.raw.markdown",
      ],
      settings: {
        foreground: palette.textMuted,
      },
    },
    {
      name: "Markdown - Heading",
      scope: [
        "markdown.heading",
        "markup.heading | markup.heading entity.name",
        "markup.heading.markdown punctuation.definition.heading.markdown",
      ],
      settings: {
        foreground: palette.verdeMexicanoLight,
      },
    },
    {
      name: "Markup - Italic",
      scope: ["markup.italic"],
      settings: {
        fontStyle: "italic",
        foreground: palette.rosaMexicanoLight,
      },
    },
    {
      name: "Markup - Bold",
      scope: ["markup.bold", "markup.bold string"],
      settings: {
        fontStyle: "bold",
        foreground: palette.rosaMexicanoLight,
      },
    },
    {
      name: "Markup - Bold-Italic",
      scope: [
        "markup.bold markup.italic",
        "markup.italic markup.bold",
        "markup.quote markup.bold",
        "markup.bold markup.italic string",
        "markup.italic markup.bold string",
        "markup.quote markup.bold string",
      ],
      settings: {
        fontStyle: "bold",
        foreground: palette.rosaMexicanoLight,
      },
    },
    {
      name: "Markup - Underline",
      scope: ["markup.underline"],
      settings: {
        fontStyle: "underline",
        foreground: palette.neonOrange,
      },
    },
    {
      name: "Markdown - Blockquote",
      scope: ["markup.quote punctuation.definition.blockquote.markdown"],
      settings: {
        foreground: palette.textMuted,
      },
    },
    {
      name: "Markup - Quote",
      scope: ["markup.quote"],
      settings: {
        fontStyle: "italic",
      },
    },
    {
      name: "Markdown - Link",
      scope: ["string.other.link.title.markdown"],
      settings: {
        foreground: palette.neonBlue,
      },
    },
    {
      name: "Markdown - Link Description",
      scope: ["string.other.link.description.title.markdown"],
      settings: {
        foreground: palette.rosaMexicano,
      },
    },
    {
      name: "Markdown - Link Anchor",
      scope: ["constant.other.reference.link.markdown"],
      settings: {
        foreground: palette.neonYellow,
      },
    },
    {
      name: "Markup - Raw Block",
      scope: ["markup.raw.block"],
      settings: {
        foreground: palette.rosaMexicano,
      },
    },
    {
      name: "Markdown - Raw Block Fenced",
      scope: ["markup.raw.block.fenced.markdown"],
      settings: {
        foreground: palette.textDark,
      },
    },
    {
      name: "Markdown - Fenced Bode Block",
      scope: ["punctuation.definition.fenced.markdown"],
      settings: {
        foreground: palette.textDark,
      },
    },
    {
      name: "Markdown - Fenced Bode Block Variable",
      scope: [
        "markup.raw.block.fenced.markdown",
        "variable.language.fenced.markdown",
        "punctuation.section.class.end",
      ],
      settings: {
        foreground: palette.textPrimary,
      },
    },
    {
      name: "Markdown - Fenced Language",
      scope: ["variable.language.fenced.markdown"],
      settings: {
        foreground: palette.textMuted,
      },
    },
    {
      name: "Markdown - Separator",
      scope: ["meta.separator"],
      settings: {
        fontStyle: "bold",
        foreground: palette.textMuted,
      },
    },
    {
      name: "Markup - Table",
      scope: ["markup.table"],
      settings: {
        foreground: palette.textPrimary,
      },
    },
    // Ruby-specific enhancements
    {
      name: "Ruby - Symbols",
      scope: [
        "constant.other.symbol.ruby",
        "constant.other.symbol.hashkey.ruby",
      ],
      settings: {
        foreground: palette.verdeMexicanoLight,
      },
    },
    {
      name: "Ruby - String Interpolation",
      scope: ["punctuation.section.embedded.ruby", "source.ruby.embedded"],
      settings: {
        foreground: palette.rosaMexicano,
      },
    },
    {
      name: "Ruby - Module/Class/Method Keywords",
      scope: [
        "keyword.control.module.ruby",
        "keyword.control.class.ruby",
        "keyword.control.def.ruby",
      ],
      settings: {
        foreground: palette.rosaMexicano,
        fontStyle: "bold",
      },
    },
    {
      name: "Ruby - End Keyword",
      scope: ["keyword.control.end.ruby", "keyword.control.end"],
      settings: {
        foreground: palette.rosaMexicano,
        fontStyle: "bold",
      },
    },
    {
      name: "Ruby - Control Flow Keywords",
      scope: [
        "keyword.control.conditional.ruby",
        "keyword.control.conditional.if.ruby",
        "keyword.control.conditional.unless.ruby",
        "keyword.control.conditional.case.ruby",
        "keyword.control.conditional.when.ruby",
        "keyword.control.conditional.else.ruby",
        "keyword.control.conditional.elsif.ruby",
        "keyword.control.loop.ruby",
        "keyword.control.loop.while.ruby",
        "keyword.control.loop.until.ruby",
        "keyword.control.loop.for.ruby",
        "keyword.control.iteration.ruby",
        "keyword.control.flow.ruby",
        "keyword.control.flow.break.ruby",
        "keyword.control.flow.next.ruby",
        "keyword.control.flow.return.ruby",
        "keyword.control.flow.redo.ruby",
        "keyword.control.flow.retry.ruby",
      ],
      settings: {
        foreground: palette.rosaMexicano,
      },
    },
    {
      name: "Ruby - Block Keywords",
      scope: [
        "keyword.control.start-block.ruby",
        "keyword.control.do.ruby",
        "keyword.control.block.ruby",
      ],
      settings: {
        foreground: palette.rosaMexicano,
      },
    },
    {
      name: "Ruby - Exception Handling",
      scope: [
        "keyword.control.exception.ruby",
        "keyword.control.exception.begin.ruby",
        "keyword.control.exception.rescue.ruby",
        "keyword.control.exception.ensure.ruby",
        "keyword.control.exception.raise.ruby",
        "keyword.control.exception.retry.ruby",
      ],
      settings: {
        foreground: palette.neonPurple,
      },
    },
    {
      name: "Ruby - Access Control",
      scope: [
        "keyword.other.special-method.ruby",
        "keyword.control.access.ruby",
        "keyword.other.special-method.ruby.private",
        "keyword.other.special-method.ruby.protected",
        "keyword.other.special-method.ruby.public",
      ],
      settings: {
        foreground: palette.neonPurple,
      },
    },
    {
      name: "Ruby - Boolean and Nil",
      scope: ["constant.language.boolean.ruby", "constant.language.nil.ruby"],
      settings: {
        foreground: palette.neonOrange,
      },
    },
    {
      name: "Ruby - Constants",
      scope: ["variable.other.constant.ruby", "constant.other.symbol.ruby"],
      settings: {
        foreground: palette.neonYellow,
      },
    },
    {
      name: "Ruby - Instance Variables",
      scope: [
        "variable.other.readwrite.instance.ruby",
        "punctuation.definition.variable.ruby",
      ],
      settings: {
        foreground: palette.accentCyan,
      },
    },
    {
      name: "Ruby - Class Variables",
      scope: ["variable.other.readwrite.class.ruby"],
      settings: {
        foreground: palette.accentMagenta,
      },
    },
    {
      name: "Ruby - Global Variables",
      scope: [
        "variable.other.readwrite.global.ruby",
        "punctuation.definition.variable.ruby",
      ],
      settings: {
        foreground: palette.neonOrange,
        fontStyle: "bold",
      },
    },
    {
      name: "Ruby - Method Names",
      scope: ["entity.name.function.ruby", "meta.function.method.ruby"],
      settings: {
        foreground: palette.neonBlue,
      },
    },
    {
      name: "Ruby - Regex",
      scope: [
        "string.regexp.ruby",
        "punctuation.definition.string.begin.ruby",
        "punctuation.definition.string.end.ruby",
      ],
      settings: {
        foreground: palette.accentTeal,
      },
    },
    {
      name: "Ruby - Punctuation and Operators",
      scope: [
        "keyword.operator.assignment.ruby",
        "keyword.operator.comparison.ruby",
        "keyword.operator.logical.ruby",
        "punctuation.separator.method.ruby",
        "punctuation.separator.variable.ruby",
        "punctuation.separator.key-value.ruby",
      ],
      settings: {
        foreground: palette.accentCyan,
      },
    },
    // Additional Ruby-specific rules for better method content highlighting
    {
      name: "Ruby - Method Calls",
      scope: [
        "meta.function-call.ruby",
        "meta.method-call.ruby",
        "support.function.kernel.ruby",
      ],
      settings: {
        foreground: palette.neonBlue,
      },
    },
    {
      name: "Ruby - Method Parameters",
      scope: [
        "meta.function.parameters.ruby",
        "variable.parameter.function.ruby",
        "meta.function.optional-parameters.ruby",
      ],
      settings: {
        foreground: palette.neonOrange,
      },
    },
    {
      name: "Ruby - Self",
      scope: ["variable.language.self.ruby"],
      settings: {
        foreground: palette.rosaMexicanoLight,
        fontStyle: "italic",
      },
    },
    {
      name: "Ruby - Super",
      scope: ["variable.language.super.ruby"],
      settings: {
        foreground: palette.rosaMexicanoLight,
        fontStyle: "italic",
      },
    },
    {
      name: "Ruby - Require/Load",
      scope: [
        "keyword.other.special-method.ruby.require",
        "keyword.other.special-method.ruby.load",
        "keyword.other.special-method.ruby.require_relative",
      ],
      settings: {
        foreground: palette.rosaMexicano,
      },
    },
    {
      name: "Ruby - attr_* methods",
      scope: [
        "keyword.other.special-method.ruby.attr_reader",
        "keyword.other.special-method.ruby.attr_writer",
        "keyword.other.special-method.ruby.attr_accessor",
      ],
      settings: {
        foreground: palette.neonPurple,
      },
    },
    {
      name: "Ruby - Yield",
      scope: ["keyword.control.yield.ruby"],
      settings: {
        foreground: palette.rosaMexicano,
      },
    },
    {
      name: "Ruby - Lambda",
      scope: [
        "keyword.control.lambda.ruby",
        "punctuation.definition.lambda.ruby",
      ],
      settings: {
        foreground: palette.rosaMexicano,
      },
    },
    {
      name: "Ruby - Hash Rockets",
      scope: ["punctuation.separator.key-value.ruby"],
      settings: {
        foreground: palette.accentCyan,
      },
    },
    {
      name: "Ruby - Method Definition Body",
      scope: [
        "meta.function.method.with-arguments.ruby",
        "meta.function.method.without-arguments.ruby",
      ],
      settings: {
        // This ensures method content inherits proper coloring
      },
    },
    {
      name: "Ruby - Block Parameters",
      scope: [
        "variable.other.block.ruby",
        "punctuation.separator.variable.ruby",
      ],
      settings: {
        foreground: palette.neonOrange,
      },
    },
    {
      name: "Ruby - String Symbols",
      scope: ["string.quoted.symbol.ruby"],
      settings: {
        foreground: palette.verdeMexicanoLight,
      },
    },
    {
      name: "Ruby - Interpolated Code",
      scope: [
        "meta.embedded.line.ruby",
        "punctuation.section.embedded.begin.ruby",
        "punctuation.section.embedded.end.ruby",
      ],
      settings: {
        foreground: palette.rosaMexicanoLight,
      },
    },
    {
      name: "Ruby - Module Names",
      scope: [
        "entity.name.type.module.ruby",
        "support.class.ruby",
        "entity.name.type.class.ruby",
      ],
      settings: {
        foreground: palette.neonYellow,
      },
    },
    {
      name: "Ruby - Heredoc",
      scope: [
        "string.unquoted.heredoc.ruby",
        "punctuation.definition.string.begin.ruby",
        "punctuation.definition.string.end.ruby",
      ],
      settings: {
        foreground: palette.verdeMexicanoLight,
      },
    },
    // JavaScript/TypeScript enhancements
    {
      name: "JS/TS - Template Literals",
      scope: [
        "string.template.js",
        "string.template.ts",
        "punctuation.definition.template-expression.begin",
        "punctuation.definition.template-expression.end",
      ],
      settings: {
        foreground: palette.verdeMexicanoLight,
      },
    },
    {
      name: "JS/TS - Template Expression",
      scope: ["meta.embedded.line.js", "meta.embedded.line.ts"],
      settings: {
        foreground: palette.rosaMexicanoLight,
      },
    },
    {
      name: "JS/TS - Arrow Functions",
      scope: [
        "storage.type.function.arrow.js",
        "storage.type.function.arrow.ts",
      ],
      settings: {
        foreground: palette.rosaMexicano,
      },
    },
    {
      name: "JS/TS - Async/Await",
      scope: [
        "keyword.control.flow.js",
        "keyword.control.flow.ts",
        "storage.modifier.async.js",
        "storage.modifier.async.ts",
      ],
      settings: {
        foreground: palette.neonPurple,
        fontStyle: "italic",
      },
    },
    {
      name: "JS/TS - Import/Export",
      scope: [
        "keyword.control.import.js",
        "keyword.control.export.js",
        "keyword.control.import.ts",
        "keyword.control.export.ts",
        "keyword.control.from.js",
        "keyword.control.from.ts",
      ],
      settings: {
        foreground: palette.rosaMexicano,
      },
    },
    {
      name: "JS/TS - Object Keys",
      scope: ["meta.object-literal.key.js", "meta.object-literal.key.ts"],
      settings: {
        foreground: palette.accentCyan,
      },
    },
    {
      name: "JS/TS - JSX/TSX Tags",
      scope: [
        "entity.name.tag.js",
        "entity.name.tag.tsx",
        "support.class.component.js",
        "support.class.component.tsx",
      ],
      settings: {
        foreground: palette.rosaMexicanoLight,
      },
    },
    {
      name: "JS/TS - JSX/TSX Attributes",
      scope: [
        "entity.other.attribute-name.js",
        "entity.other.attribute-name.tsx",
      ],
      settings: {
        foreground: palette.neonYellow,
        fontStyle: "italic",
      },
    },
    {
      name: "JS/TS - Destructuring",
      scope: ["variable.object.property.js", "variable.object.property.ts"],
      settings: {
        foreground: palette.textPrimary,
      },
    },
    {
      name: "JS/TS - Console",
      scope: ["support.class.console.js", "support.class.console.ts"],
      settings: {
        foreground: palette.neonBlue,
      },
    },
    {
      name: "JS/TS - Promise",
      scope: ["support.class.promise.js", "support.class.promise.ts"],
      settings: {
        foreground: palette.accentMagenta,
      },
    },
    {
      name: "TypeScript - Types",
      scope: [
        "entity.name.type.ts",
        "entity.name.type.tsx",
        "support.type.primitive.ts",
        "support.type.primitive.tsx",
      ],
      settings: {
        foreground: palette.accentCyan,
      },
    },
    {
      name: "TypeScript - Interfaces",
      scope: [
        "entity.name.type.interface.ts",
        "entity.name.type.interface.tsx",
      ],
      settings: {
        foreground: palette.neonYellow,
      },
    },
    {
      name: "TypeScript - Type Annotations",
      scope: [
        "meta.type.annotation.ts",
        "meta.type.annotation.tsx",
        "keyword.operator.type.annotation.ts",
        "keyword.operator.type.annotation.tsx",
      ],
      settings: {
        foreground: palette.rosaMexicano,
      },
    },
  ];
}

module.exports = {
  getSemanticTokenColors,
  getTokenColors,
};
