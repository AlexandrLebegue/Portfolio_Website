import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import GlobalStyles from '../styles/globalStyles';

// Define theme context type
type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

// Create context with default values
const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: true,
  toggleTheme: () => {},
});

// Custom hook to use theme context
export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // We'll start with dark mode by default since our theme is designed for it
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Function to toggle between light and dark mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // For now, we'll use the same theme object but in the future we could
  // extend this to have separate light/dark themes or modify theme values
  const currentTheme = {
    ...theme,
    // Override background and text colors based on mode
    colors: {
      ...theme.colors,
      background: {
        ...theme.colors.background,
        current: isDarkMode ? theme.colors.background.dark : theme.colors.background.light,
      },
      text: {
        ...theme.colors.text,
        current: isDarkMode ? theme.colors.text.primary : theme.colors.text.dark,
      },
    },
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <StyledThemeProvider theme={currentTheme}>
        <GlobalStyles />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;