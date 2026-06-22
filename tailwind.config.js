/** @type {import('tailwindcss').Config} */

/* Couleur depuis une variable CSS en canaux RGB -> supporte l'opacité Tailwind
   (text-ink/25, etc.) ET l'inversion clair/sombre via :root / .dark (index.css). */
const v = (name) => `rgb(var(${name}) / <alpha-value>)`;

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        /* ── MONOCHROME : noir / blanc / gris, inversé par le thème ──
         * Tous les tokens pointent vers des variables CSS (canaux RGB).
         * Plus aucune couleur (ni bleu ni cyan) : que de l'encre et du papier.
         */
        ink: v('--ink'), // texte / traits forts
        inverse: v('--base'), // texte sur fond encre (boutons pleins)
        paper: v('--base'), // fond principal (renommé de "base" : collision avec text-base)
        surface: v('--surface'), // panneau subtil
        'surface-2': v('--surface-2'),
        line: v('--line'), // bordures fines
        muted: v('--muted'), // texte secondaire

        /* Tokens hérités -> remappés en monochrome (compatibilité totale) */
        primary: v('--ink'),
        'primary-700': v('--ink'),
        'primary-300': v('--muted'),
        secondary: v('--ink'),
        tertiary: v('--muted'),
        accent: v('--ink'),
        'accent-700': v('--ink'),
        'bg-light': v('--base'),
        'bg-dark': v('--base'),
        'bg-dark-2': v('--surface'),
        'bg-code': v('--surface'),
        'bg-code-light': v('--surface'),
        'text-dark': v('--ink'),
        'text-light': v('--base'),
        'text-primary-dark': v('--ink'),
        'text-secondary-dark': v('--muted'),
        'ui-border-light': v('--line'),
        'ui-border': v('--line'),
        'ui-hover': 'rgb(var(--ink) / 0.06)',
        'ui-hover-light': 'rgb(var(--ink) / 0.05)',
        'ui-focus': 'rgb(var(--ink) / 0.25)',
        'ui-focus-light': 'rgb(var(--ink) / 0.20)',
        'ui-selection': 'rgb(var(--ink) / 0.14)',

        /* Statuts : neutralisés (sauf erreur, fonctionnelle) */
        success: v('--ink'),
        warning: v('--ink'),
        error: '#DC2626',
        info: v('--ink'),
      },
      fontFamily: {
        /* Police carrée/futuriste pour les titres ; Inter pour le corps ; mono technique. */
        body: ['"Inter"', '"Segoe UI"', 'system-ui', 'sans-serif'],
        heading: ['"Sora"', '"Inter"', '"Segoe UI"', 'sans-serif'],
        code: ['"JetBrains Mono"', '"Consolas"', 'monospace'],
        mono: ['"JetBrains Mono"', '"Consolas"', 'monospace'],
      },
      fontSize: {
        xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem', xl: '1.25rem',
        '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.25rem', '5xl': '3rem',
        '6xl': '3.75rem', '7xl': '4.5rem', '8xl': '6rem',
      },
      maxWidth: { container: '1280px' },
      screens: {
        xs: '320px', sm: '576px', md: '768px', lg: '992px', xl: '1200px', '2xl': '1400px',
      },
      /* CARRÉ : rayon 0 partout (aucun arrondi). */
      borderRadius: {
        none: '0', sm: '0', DEFAULT: '0', md: '0', lg: '0', xl: '0', '2xl': '0', '3xl': '0', full: '0',
      },
      /* Pas d'ombres : ce sont les bordures qui structurent. */
      boxShadow: {
        sm: 'none', DEFAULT: 'none', md: 'none', lg: 'none', xl: 'none',
        lift: 'none', glow: 'none', 'glow-accent': 'none',
      },
      zIndex: {
        dropdown: '1000', sticky: '1100', fixed: '1200', modal: '1300', popover: '1400', tooltip: '1500',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        fadeInUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        pulse: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.5' } },
        spin: { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } },
        scanline: { '0%': { transform: 'translateY(0)' }, '100%': { transform: 'translateY(100%)' } },
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'pulse-slow': 'pulse 1.6s ease-in-out infinite',
        'spin-slow': 'spin 1s linear infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
        /* "dégradés" remappés en encre solide (monochrome) */
        'gradient-propulsion': 'linear-gradient(135deg, rgb(var(--ink)), rgb(var(--ink)))',
        'gradient-primary': 'linear-gradient(135deg, rgb(var(--ink)), rgb(var(--ink)))',
        'gradient-ai': 'linear-gradient(135deg, rgb(var(--ink)), rgb(var(--ink)))',
        /* Texture de fond très subtile (grille / lueur grise quasi nulle) */
        'gradient-trajectory': 'radial-gradient(1100px 560px at 82% -12%, rgb(var(--ink) / 0.035), transparent 60%)',
      },
      transitionTimingFunction: {
        spatial: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: { fast: '100ms', normal: '200ms', slow: '300ms' },
    },
  },
  plugins: [],
};
