import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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
  // Initialize theme from localStorage or default to dark mode
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });

  // Save theme preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

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
        code: isDarkMode ? '#1E1E1E' : '#F3F4F6',
      },
      text: {
        ...theme.colors.text,
        current: isDarkMode ? theme.colors.text.primary : theme.colors.text.dark,
        primary: isDarkMode ? theme.colors.text.primary : theme.colors.text.dark,
        secondary: isDarkMode ? theme.colors.text.secondary : '#6B7280',
      },
      ui: {
        ...theme.colors.ui,
        border: isDarkMode ? '#30363D' : '#E5E7EB',
        hover: isDarkMode ? 'rgba(56, 139, 253, 0.1)' : 'rgba(59, 130, 246, 0.1)',
        focus: isDarkMode ? 'rgba(56, 139, 253, 0.4)' : 'rgba(59, 130, 246, 0.4)',
        selection: isDarkMode ? 'rgba(56, 139, 253, 0.3)' : 'rgba(59, 130, 246, 0.3)',
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