/**
 * Mexican Night Theme - TypeScript/React Showcase
 * Demonstrates vibrant syntax highlighting for modern JS/TS
 */

import React, { useState, useEffect } from 'react';
import type { FC, ReactNode } from 'react';

// Type definitions showcase TypeScript colors
interface ThemeColors {
  rosaMexicano: string;
  verdeMexicano: string;
  neonYellow: string;
  nightSky: string;
}

interface ThemeCardProps {
  title: string;
  colors: ThemeColors;
  downloads?: number;
  children?: ReactNode;
}

// Async function with modern JS features
const fetchThemeStats = async (themeName: string): Promise<number> => {
  const response = await fetch(`/api/themes/${themeName}/stats`);
  const data = await response.json();
  return data.downloads ?? 0;
};

// React component with JSX and hooks
export const ThemeCard: FC<ThemeCardProps> = ({
  title,
  colors,
  downloads = 0,
  children
}) => {
  const [isPopular, setIsPopular] = useState(false);
  const [stats, setStats] = useState<number>(downloads);

  useEffect(() => {
    // Template literal with expression interpolation
    const loadStats = async () => {
      const count = await fetchThemeStats(title);
      setStats(count);
      setIsPopular(count > 1000);

      console.log(`✨ ${title} has ${count.toLocaleString()} downloads`);
    };

    loadStats();
  }, [title]);

  // Object destructuring and spread operator
  const colorValues = Object.values(colors);
  const themeConfig = {
    ...colors,
    background: colors.nightSky,
    accent: colors.rosaMexicano
  };

  // JSX with conditional rendering
  return (
    <div className="theme-card" style={{ background: themeConfig.background }}>
      <h2 className="title">{title}</h2>

      {isPopular && (
        <span className="badge">🔥 Popular</span>
      )}

      <div className="color-palette">
        {colorValues.map((color, index) => (
          <div
            key={`color-${index}`}
            className="color-swatch"
            style={{ backgroundColor: color }}
            aria-label={`Color ${index + 1}`}
          />
        ))}
      </div>

      <p className="downloads">
        {stats.toLocaleString()} downloads
      </p>

      {children}
    </div>
  );
};

// Export default with arrow function
export default ThemeCard;
