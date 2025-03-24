import 'styled-components';

// Extend the DefaultTheme interface from styled-components
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      tertiary: string;
      background: {
        dark: string;
        light: string;
        code: string;
        current?: string;
      };
      text: {
        primary: string;
        secondary: string;
        dark: string;
        light: string;
        accent: string;
        current?: string;
      };
      ui: {
        border: string;
        hover: string;
        focus: string;
        selection: string;
      };
      status: {
        success: string;
        warning: string;
        error: string;
        info: string;
      };
    };
    fonts: {
      body: string;
      heading: string;
      code: string;
    };
    fontSizes: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
      '5xl': string;
    };
    fontWeights: {
      light: number;
      regular: number;
      medium: number;
      semibold: number;
      bold: number;
    };
    lineHeights: {
      tight: number;
      normal: number;
      loose: number;
    };
    space: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
    };
    breakpoints: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
    };
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      full: string;
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    transitions: {
      fast: string;
      normal: string;
      slow: string;
    };
    zIndices: {
      base: number;
      dropdown: number;
      sticky: number;
      fixed: number;
      modal: number;
      popover: number;
      tooltip: number;
    };
  }
}

export const theme = {
  colors: {
    // Primary colors
    primary: '#0B3D91', // NASA blue
    secondary: '#FC3D21', // NASA red
    tertiary: '#4D7C8A', // Steel blue

    // Background colors
    background: {
      dark: '#121212',
      light: '#F8F9FA',
      code: '#1E1E1E', // VS Code dark theme background
    },

    // Text colors
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
      dark: '#333333',
      light: '#F8F9FA',
      accent: '#00D8FF', // React blue
    },

    // UI element colors
    ui: {
      border: '#30363D',
      hover: 'rgba(56, 139, 253, 0.1)',
      focus: 'rgba(56, 139, 253, 0.4)',
      selection: 'rgba(56, 139, 253, 0.3)',
    },

    // Status colors
    status: {
      success: '#3FB950',
      warning: '#F7B955',
      error: '#F85149',
      info: '#58A6FF',
    },
  },

  // Typography
  fonts: {
    body: '"Roboto", "Segoe UI", sans-serif',
    heading: '"Montserrat", "Segoe UI", sans-serif',
    code: '"Fira Code", "Consolas", monospace',
  },

  // Font sizes
  fontSizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    md: '1rem',       // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
  },

  // Font weights
  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Line heights
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    loose: 1.8,
  },

  // Spacing
  space: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '2.5rem',  // 40px
    '3xl': '3rem',    // 48px
  },

  // Breakpoints for responsive design
  breakpoints: {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    '2xl': '1400px',
  },

  // Border radius
  borderRadius: {
    sm: '0.125rem',   // 2px
    md: '0.25rem',    // 4px
    lg: '0.5rem',     // 8px
    xl: '1rem',       // 16px
    full: '9999px',   // Fully rounded
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.15)',
  },

  // Transitions
  transitions: {
    fast: '0.1s ease-in-out',
    normal: '0.2s ease-in-out',
    slow: '0.3s ease-in-out',
  },

  // Z-index
  zIndices: {
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    modal: 1300,
    popover: 1400,
    tooltip: 1500,
  },
};

export type Theme = typeof theme;
export default theme;