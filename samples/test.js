// Mexican Night Theme - JavaScript Sample
// This file showcases the theme's JavaScript syntax highlighting

// Import statements (Rosa Mexicano)
import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import * as utils from './utils';

// Constants (yellow highlighting)
const THEME_NAME = 'Mexican Night';
const ROSA_MEXICANO = '#E4007C';
const VERDE_MEXICANO = '#006341';

// Class definition (yellow)
class MexicanTheme {
  constructor(name) {
    this.name = name;
    this.colors = {
      primary: ROSA_MEXICANO,
      secondary: VERDE_MEXICANO,
      accent: '#FFD700'
    };
  }
  
  // Method (blue highlighting)
  getColor(type) {
    return this.colors[type] || '#FFFFFF';
  }
  
  // Async method (purple italic)
  async loadTheme() {
    try {
      const response = await fetch('/api/theme');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  }
}

// Arrow function (Rosa Mexicano arrow)
const createTheme = (name, colors) => ({
  name,
  colors,
  timestamp: Date.now()
});

// React component with JSX
const ThemeDisplay = ({ theme }) => {
  // Hooks (blue)
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(null);
  
  // useEffect with async
  useEffect(() => {
    const loadThemeData = async () => {
      const data = await theme.loadTheme();
      setCurrentTheme(data);
      setIsLoaded(true);
    };
    
    loadThemeData();
  }, [theme]);
  
  // Template literal (green)
  const themeInfo = `Theme: ${theme.name} - Primary: ${theme.colors.primary}`;
  
  // JSX (Rosa Mexicano for tags, yellow for attributes)
  return (
    <ThemeProvider theme={currentTheme}>
      <div className="theme-container" id="main">
        <h1 style={{ color: ROSA_MEXICANO }}>
          {THEME_NAME}
        </h1>
        <p>{themeInfo}</p>
        {isLoaded && (
          <ColorPalette colors={theme.colors} />
        )}
      </div>
    </ThemeProvider>
  );
};

// Object destructuring
const { primary, secondary, accent } = new MexicanTheme('Night').colors;

// Array destructuring and methods
const [first, second, ...rest] = ['Rosa', 'Verde', 'Azul', 'Amarillo'];
const upperColors = rest.map(color => color.toUpperCase());

// Promise usage (magenta)
const loadConfig = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ theme: 'Mexican Night' });
    }, 1000);
  });
};

// Modern JavaScript features
const themeConfig = {
  ...createTheme('Mexican Night', { primary: ROSA_MEXICANO }),
  // Object method shorthand
  display() {
    console.log(this.name);
  },
  // Computed property
  [`color_${Date.now()}`]: '#FFD700'
};

// Regular expression (cyan)
const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;
const isValidColor = hexColorRegex.test(ROSA_MEXICANO);

// Template literal with expression
const generateCSS = (theme) => `
  :root {
    --primary: ${theme.colors.primary};
    --secondary: ${theme.colors.secondary};
    --accent: ${theme.colors.accent};
  }
  
  .theme-${theme.name.toLowerCase().replace(/\s+/g, '-')} {
    background: var(--primary);
  }
`;

// Export statements (Rosa Mexicano)
export default MexicanTheme;
export { ThemeDisplay, createTheme, generateCSS };