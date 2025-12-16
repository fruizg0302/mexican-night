// Base theme structure extracted from Tokyo Night
// This provides the skeleton for our Mexican Night theme

const baseTheme = {
  name: "Mexican Night",
  author: "Fernando Ruiz Guzman",
  type: "dark",
  semanticClass: "mexican-night",
  semanticTokenColors: {},
  colors: {},
  tokenColors: []
};

// Semantic token categories from Tokyo Night
const semanticTokenCategories = [
  'parameter.declaration',
  'parameter',
  'property.declaration',
  'property.defaultLibrary',
  '*.defaultLibrary',
  'variable',
  'variable.readonly',
  'variable.declaration',
  'function.declaration',
  'type',
  'class',
  'interface'
];

// Token color categories for syntax highlighting
const tokenColorCategories = [
  // General
  'Comment',
  'Variables',
  'Colors',
  'Invalid',
  'Invalid - Illegal',
  'Carriage Return',
  
  // Keywords & Storage
  'Keyword, Storage',
  'Operator, Misc',
  
  // Tags & Functions
  'Tag',
  'Function, Special Method',
  'Function Call',
  'Block Level Variables',
  'Other Variable, String Link',
  
  // Constants & Numbers
  'Number, Constant, Function Argument, Tag Attribute, Embedded',
  'Symbols',
  
  // Strings & Classes
  'String, Symbols, Inherited Class, Markup Heading',
  'Class, Support',
  'Entity Types',
  
  // CSS
  'CSS Class and Support',
  'CSS Property Name',
  'CSS browser prefix',
  'CSS Pseudo Class',
  
  // Language specific
  'Sub-methods',
  'Language methods',
  'entity.name.method.js',
  'meta.method.js',
  
  // Attributes
  'Attributes',
  'HTML Attributes',
  'CSS Classes',
  'CSS ID',
  
  // Markup
  'Inserted',
  'Deleted', 
  'Changed',
  'Regular Expressions',
  'Escape Characters',
  'URL',
  
  // Decorators & Special
  'Decorators',
  'ES7 Bind Operator',
  
  // JSON
  'JSON Key - Level 0',
  'JSON Key - Level 1',
  'JSON Key - Level 2',
  'JSON Key - Level 3',
  'JSON Key - Level 4',
  'JSON Key - Level 5',
  'JSON Key - Level 6',
  'JSON Key - Level 7',
  'JSON Key - Level 8',
  
  // Markdown
  'Markdown - Plain',
  'Markdown - Markup Raw Inline',
  'Markdown - Markup Raw Inline Punctuation',
  'Markdown - Heading',
  'Markup - Italic',
  'Markup - Bold',
  'Markup - Bold-Italic',
  'Markup - Underline',
  'Markdown - Blockquote',
  'Markup - Quote',
  'Markdown - Link',
  'Markdown - Link Description',
  'Markdown - Link Anchor',
  'Markup - Raw Block',
  'Markdown - Raw Block Fenced',
  'Markdown - Fenced Bode Block',
  'Markdown - Fenced Bode Block Variable',
  'Markdown - Fenced Language',
  'Markdown - Separator',
  'Markup - Table'
];

export {
  baseTheme,
  semanticTokenCategories,
  tokenColorCategories
};