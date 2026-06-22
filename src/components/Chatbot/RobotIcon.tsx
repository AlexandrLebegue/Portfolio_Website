import React from 'react';

/**
 * Icone ROBOT MONOCHROME (currentColor). Pas de couleur en dur : prend la
 * couleur du parent, donc adaptable au theme clair/sombre.
 * L'antenne porte la classe `cb-antenna` pour le micro-pulse (CSS).
 */
const RobotIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    {/* Antenne */}
    <line className="cb-antenna" x1="12" y1="3" x2="12" y2="6" />
    <circle className="cb-antenna" cx="12" cy="2.4" r="1" fill="currentColor" stroke="none" />
    {/* Tete */}
    <rect x="4.5" y="6" width="15" height="11" rx="3" />
    {/* Yeux */}
    <circle cx="9" cy="11.5" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="15" cy="11.5" r="1.2" fill="currentColor" stroke="none" />
    {/* Bouche */}
    <line x1="9.5" y1="14.4" x2="14.5" y2="14.4" />
    {/* Oreilles / capteurs */}
    <line x1="4.5" y1="10" x2="3" y2="10" />
    <line x1="19.5" y1="10" x2="21" y2="10" />
    {/* Socle / cou */}
    <line x1="12" y1="17" x2="12" y2="19" />
    <line x1="9" y1="19" x2="15" y2="19" />
  </svg>
);

export default RobotIcon;
