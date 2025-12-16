// Mexican Night Theme - TypeScript Sample
// This file showcases the theme's TypeScript syntax highlighting

// Import with types (Rosa Mexicano keywords)
import { Component, OnInit } from '@angular/core';
import type { Theme, ColorPalette } from './types';

// Interface definition (yellow)
interface MexicanThemeConfig {
  name: string;
  version: string;
  colors: ColorPalette;
  isDark: boolean;
}

// Type alias (cyan for type keyword)
type ColorHex = `#${string}`;
type ThemeMode = 'light' | 'dark' | 'auto';

// Enum (yellow for name)
enum ThemeColors {
  RosaMexicano = '#E4007C',
  VerdeMexicano = '#006341',
  NeonYellow = '#FFD700',
  NeonBlue = '#00B4D8'
}

// Generic class with type parameters
class ThemeManager<T extends MexicanThemeConfig> {
  private theme: T;
  private listeners: Set<(theme: T) => void>;
  
  constructor(initialTheme: T) {
    this.theme = initialTheme;
    this.listeners = new Set();
  }
  
  // Method with type annotations (Rosa Mexicano for colons)
  public setTheme(newTheme: T): void {
    this.theme = newTheme;
    this.notifyListeners();
  }
  
  // Generic method
  public updateColor<K extends keyof T['colors']>(
    colorKey: K,
    value: T['colors'][K]
  ): void {
    this.theme.colors[colorKey] = value;
  }
  
  // Async with Promise return type
  public async loadTheme(id: string): Promise<T> {
    const response = await fetch(`/api/themes/${id}`);
    return response.json() as Promise<T>;
  }
  
  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.theme));
  }
}

// Type guards
function isHexColor(value: unknown): value is ColorHex {
  return typeof value === 'string' && /^#[0-9A-Fa-f]{6}$/.test(value);
}

// Utility types
type ReadonlyTheme = Readonly<MexicanThemeConfig>;
type PartialTheme = Partial<MexicanThemeConfig>;
type ThemeKeys = keyof MexicanThemeConfig;

// Mapped types
type NullableTheme = {
  [K in keyof MexicanThemeConfig]: MexicanThemeConfig[K] | null;
};

// Conditional types
type ThemeProperty<T> = T extends { colors: infer C } ? C : never;

// Decorators (blue italic)
function LogTheme(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function(...args: any[]) {
    console.log(`Calling ${key} with`, args);
    return original.apply(this, args);
  };
}

// Angular-style component
@Component({
  selector: 'app-theme',
  template: `
    <div [style.color]="currentColor">
      {{ themeName }}
    </div>
  `
})
class ThemeComponent implements OnInit {
  themeName: string = 'Mexican Night';
  currentColor: ColorHex = ThemeColors.RosaMexicano;
  
  @LogTheme
  ngOnInit(): void {
    this.loadThemeSettings();
  }
  
  private async loadThemeSettings(): Promise<void> {
    try {
      const settings = await this.fetchSettings();
      this.applySettings(settings);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Failed to load:', error.message);
      }
    }
  }
  
  private fetchSettings(): Promise<MexicanThemeConfig> {
    return Promise.resolve({
      name: 'Mexican Night',
      version: '1.0.0',
      colors: {
        primary: ThemeColors.RosaMexicano,
        secondary: ThemeColors.VerdeMexicano,
        accent: ThemeColors.NeonYellow
      },
      isDark: true
    });
  }
  
  private applySettings(settings: MexicanThemeConfig): void {
    this.themeName = settings.name;
    this.currentColor = settings.colors.primary as ColorHex;
  }
}

// Namespace
namespace MexicanNight {
  export const version = '1.0.0';
  export interface Config extends MexicanThemeConfig {}
  
  export function create(name: string): Config {
    return {
      name,
      version,
      colors: {
        primary: ThemeColors.RosaMexicano,
        secondary: ThemeColors.VerdeMexicano,
        accent: ThemeColors.NeonYellow
      },
      isDark: true
    };
  }
}

// Module augmentation
declare module './types' {
  interface ColorPalette {
    primary: ColorHex;
    secondary: ColorHex;
    accent: ColorHex;
  }
}

// Export with type
export type { MexicanThemeConfig, ColorHex, ThemeMode };
export { ThemeManager, ThemeComponent, MexicanNight };