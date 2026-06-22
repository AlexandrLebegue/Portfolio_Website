import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

// ─────────────────────────────────────────────────────────────────────────────
// <OrbitField> — arrière-plan « mise en orbite » (CTA finale)
//
// Version épurée : deux anneaux elliptiques inclinés, compacts, parcourus par un
// satellite chacun (sans noyau central). 100 % monochrome : tout est peint en
// rgb(var(--ink)) à faible opacité, donc l'élément s'inverse avec le thème
// clair/sombre sans code en plus. Strictement décoratif : aria-hidden,
// pointer-events désactivés, et figé sous prefers-reduced-motion.
//
// Les satellites sont des ronds nets dessinés dans le repère NON déformé : leur
// position sur l'ellipse (inclinaison + aplatissement) est calculée à la main,
// ce qui évite toute dépendance au transform-origin et garde le point parfaite-
// ment circulaire (pas d'ovalisation par scale).
// ─────────────────────────────────────────────────────────────────────────────

type Orbit = {
  r: number;       // rayon de l'anneau (repère SVG)
  tilt: number;    // inclinaison de l'ellipse (deg)
  flatten: number; // aplatissement vertical (1 = cercle parfait)
  dur: number;     // période orbitale (s)
  dir: 1 | -1;     // sens de parcours
  phase: number;   // angle de départ (rad)
  sat: number;     // rayon du satellite
  ringOp: number;  // opacité de l'anneau
  satOp: number;   // opacité du satellite
};

const ORBITS: Orbit[] = [
  { r: 92, tilt: -18, flatten: 0.4, dur: 18, dir: 1, phase: 0.4, sat: 2.4, ringOp: 0.16, satOp: 0.30 },
  { r: 150, tilt: 16, flatten: 0.34, dur: 30, dir: -1, phase: 3.3, sat: 2.8, ringOp: 0.12, satOp: 0.35 },
];

const C = 300; // centre du viewBox 600×600

const toRad = (deg: number): number => (deg * Math.PI) / 180;

/** Point d'un satellite sur son ellipse (aplatissement puis inclinaison). */
function ellipsePoint(o: Orbit, a: number): { x: number; y: number } {
  const px = Math.cos(a) * o.r;
  const py = Math.sin(a) * o.r * o.flatten;
  const t = toRad(o.tilt);
  return {
    x: px * Math.cos(t) - py * Math.sin(t),
    y: px * Math.sin(t) + py * Math.cos(t),
  };
}

const ink = (op: number): string => `rgb(var(--ink) / ${op})`;

const OrbitField: React.FC<{ className?: string }> = ({ className }) => {
  const ref = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    const svg = ref.current;
    if (!svg) return undefined;
    // Mouvement réduit : on laisse la composition statique (satellites à leur
    // phase de départ, noyau au repos) et on n'attache aucun tween.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const ctx = gsap.context(() => {
      // Satellites : on anime un angle et on reporte la position sur l'ellipse.
      svg.querySelectorAll<SVGCircleElement>('[data-sat]').forEach((sat) => {
        const o = ORBITS[Number(sat.dataset.i)];
        const state = { a: o.phase };
        gsap.to(state, {
          a: o.phase + o.dir * Math.PI * 2,
          duration: o.dur,
          ease: 'none',
          repeat: -1,
          onUpdate: () => {
            const p = ellipsePoint(o, state.a);
            sat.setAttribute('cx', p.x.toFixed(2));
            sat.setAttribute('cy', p.y.toFixed(2));
          },
        });
      });
    }, svg);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      className={className}
      viewBox="0 0 600 600"
      preserveAspectRatio="xMidYMid slice"
    >
      <g transform={`translate(${C} ${C})`}>
        {/* Anneaux elliptiques inclinés (trait 1px constant via non-scaling-stroke) */}
        {ORBITS.map((o, i) => (
          <g key={`ring-${i}`} transform={`rotate(${o.tilt}) scale(1 ${o.flatten})`}>
            <circle
              r={o.r}
              fill="none"
              vectorEffect="non-scaling-stroke"
              style={{ stroke: ink(o.ringOp), strokeWidth: 1 }}
            />
          </g>
        ))}

        {/* Satellites (ronds nets, position calculée sur l'ellipse) */}
        {ORBITS.map((o, i) => {
          const p = ellipsePoint(o, o.phase);
          return (
            <circle
              key={`sat-${i}`}
              data-sat
              data-i={i}
              cx={p.x.toFixed(2)}
              cy={p.y.toFixed(2)}
              r={o.sat}
              style={{ fill: ink(o.satOp) }}
            />
          );
        })}
      </g>
    </svg>
  );
};

export default OrbitField;
