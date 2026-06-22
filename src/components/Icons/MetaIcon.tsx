import React from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// MetaIcon — pictogrammes MONOCHROMES en SVG (trait fin), facon « plan technique ».
// Remplace tous les emoji couleur (etoiles, forks, bugs…) par des icones sobres
// qui heritent de la couleur du texte (currentColor) et s'inversent avec le theme.
// ─────────────────────────────────────────────────────────────────────────────

export type IconKind = 'star' | 'fork' | 'clock' | 'eye' | 'bug';

interface MetaIconProps {
  kind: IconKind;
  /** Classe de taille (defaut : 3.5 = 14px, comme les meta de carte). */
  className?: string;
}

export const MetaIcon: React.FC<MetaIconProps> = ({ kind, className = 'h-3.5 w-3.5' }) => {
  const common = {
    className,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    viewBox: '0 0 24 24',
    'aria-hidden': true,
  };

  switch (kind) {
    case 'star':
      return (
        <svg {...common}>
          <path d="M12 3l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.9 6.8 19l1-5.8L3.6 9.1l5.8-.8L12 3z" />
        </svg>
      );
    case 'fork':
      return (
        <svg {...common}>
          <circle cx="6" cy="5" r="2.2" />
          <circle cx="18" cy="5" r="2.2" />
          <circle cx="12" cy="19" r="2.2" />
          <path d="M6 7.2v3.3a3 3 0 003 3h6a3 3 0 003-3V7.2M12 13.5v3.3" />
        </svg>
      );
    case 'clock':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case 'eye':
      return (
        <svg {...common}>
          <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z" />
          <circle cx="12" cy="12" r="2.6" />
        </svg>
      );
    case 'bug':
      return (
        <svg {...common}>
          <path d="M9 7a3 3 0 016 0" />
          <rect x="9" y="8" width="6" height="11" rx="3" />
          <path d="M9 11H4m11 0h5M9 15H4m11 0h5M9 9 6.5 6.5M15 9l2.5-2.5M9 18l-2.5 2.5M15 18l2.5 2.5" />
        </svg>
      );
    default:
      return null;
  }
};

export default MetaIcon;
