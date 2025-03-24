import { createGlobalStyle } from 'styled-components';

// Now using DefaultTheme from styled-components which we extended in theme.ts
const GlobalStyles = createGlobalStyle`
  /* Fonts are imported in index.html */

  /* CSS Reset */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Set base font size for rem units */
  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes.md};
    line-height: ${({ theme }) => theme.lineHeights.normal};
    background-color: ${({ theme }) => theme.colors.background.dark};
    color: ${({ theme }) => theme.colors.text.primary};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    line-height: ${({ theme }) => theme.lineHeights.tight};
    margin-bottom: ${({ theme }) => theme.space.md};
  }

  h1 {
    font-size: ${({ theme }) => theme.fontSizes['4xl']};
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
  }

  h4 {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }

  h5 {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }

  h6 {
    font-size: ${({ theme }) => theme.fontSizes.md};
  }

  p {
    margin-bottom: ${({ theme }) => theme.space.md};
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: color ${({ theme }) => theme.transitions.normal};

    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }

  /* Code blocks */
  pre, code {
    font-family: ${({ theme }) => theme.fonts.code};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    background-color: ${({ theme }) => theme.colors.background.code};
    border-radius: ${({ theme }) => theme.borderRadius.md};
  }

  code {
    padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.sm};
  }

  pre {
    padding: ${({ theme }) => theme.space.md};
    overflow-x: auto;
    margin-bottom: ${({ theme }) => theme.space.md};

    code {
      padding: 0;
      background-color: transparent;
    }
  }

  /* Lists */
  ul, ol {
    margin-bottom: ${({ theme }) => theme.space.md};
    padding-left: ${({ theme }) => theme.space.xl};
  }

  li {
    margin-bottom: ${({ theme }) => theme.space.xs};
  }

  /* Images */
  img {
    max-width: 100%;
    height: auto;
  }

  /* Form elements */
  input, textarea, select, button {
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes.md};
  }

  button {
    cursor: pointer;
  }

  /* Utility classes */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.space.md};
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  /* Animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  /* Responsive adjustments */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    html {
      font-size: 14px;
    }

    h1 {
      font-size: ${({ theme }) => theme.fontSizes['3xl']};
    }

    h2 {
      font-size: ${({ theme }) => theme.fontSizes['2xl']};
    }

    h3 {
      font-size: ${({ theme }) => theme.fontSizes.xl};
    }
  }

  /* Dark scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background.dark};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.ui.border};
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.primary};
  }
`;

export default GlobalStyles;