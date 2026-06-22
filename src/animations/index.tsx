// ─────────────────────────────────────────────────────────────────────────────
// src/animations/index.tsx
//
// Boîte à outils d'animations GSAP du portfolio « vibe engineer ».
// Technique inspirée de Launchforge : gsap.context + ScrollTrigger, fromTo,
// stagger, scrub, et respect strict de prefers-reduced-motion.
//
// Exports (contrat) :
//   - Reveal          : fade + translate au scroll (une seule fois)
//   - ScrollProgress  : barre de progression « propulsion » en haut de page
//   - Parallax        : translation douce au scroll (scrub)
//   - useReveal       : applique le reveal en stagger sur les .gs-reveal d'un sous-arbre
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Sous les typings React 19, l'espace de noms global `JSX` n'est plus déclaré
// globalement (il vit sous `React.JSX`). Le contrat impose pourtant des
// signatures de retour `JSX.Element`. On ré-expose donc l'espace global `JSX`
// en l'aliasant sur `React.JSX`, ce qui rend `JSX.Element` résolvable partout
// sans modifier d'autre fichier.
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    type Element = React.JSX.Element;
    type ElementClass = React.JSX.ElementClass;
    type ElementAttributesProperty = React.JSX.ElementAttributesProperty;
    type ElementChildrenAttribute = React.JSX.ElementChildrenAttribute;
    type LibraryManagedAttributes<C, P> = React.JSX.LibraryManagedAttributes<C, P>;
    type IntrinsicAttributes = React.JSX.IntrinsicAttributes;
    type IntrinsicClassAttributes<T> = React.JSX.IntrinsicClassAttributes<T>;
    type IntrinsicElements = React.JSX.IntrinsicElements;
  }
}

// On enregistre le plugin une seule fois pour tout le module (idempotent côté GSAP,
// mais le garde explicite évite tout double appel inutile au fil des rechargements).
let pluginRegistered = false;
if (!pluginRegistered) {
  gsap.registerPlugin(ScrollTrigger);
  pluginRegistered = true;
}

/**
 * Indique si l'utilisateur préfère un mouvement réduit.
 * Renvoie `false` côté serveur / sans matchMedia (sécurité défensive).
 */
function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// ─────────────────────────────────────────────────────────────────────────────
// <Reveal> — fade + translate au scroll, joué une seule fois (once)
// ─────────────────────────────────────────────────────────────────────────────

interface RevealProps {
  children: React.ReactNode;
  /** Décalage vertical de départ en pixels (par défaut 28). */
  y?: number;
  /** Délai avant le démarrage de l'animation, en secondes. */
  delay?: number;
  className?: string;
}

/**
 * Enveloppe un contenu et l'anime au scroll : de {opacity:0, y} vers
 * {opacity:1, y:0}, easing power3.out, déclenché lorsque le haut de l'élément
 * atteint 85% du viewport. Ne se joue qu'une fois (`once: true`).
 * Sous prefers-reduced-motion : le contenu reste visible, aucune animation.
 */
export function Reveal({ children, y = 28, delay = 0, className }: RevealProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Mouvement réduit : on garde le contenu visible et on sort sans animer.
    if (prefersReducedMotion()) {
      gsap.set(el, { clearProps: 'all', opacity: 1, y: 0 });
      return;
    }

    // gsap.context isole les tweens/ScrollTriggers créés ici pour un revert propre.
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true, // jamais rejoué ni réinitialisé par un refresh
          },
        }
      );
    }, ref);

    // Nettoyage : tue tweens + ScrollTriggers attachés à ce contexte.
    return () => ctx.revert();
  }, [y, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// <ScrollProgress> — barre fine de progression « propulsion » en haut de page
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Barre fixée en haut de la fenêtre dont l'échelle horizontale (scaleX) passe de
 * 0 à 1 au fil du défilement du document, façon jauge de propulsion.
 * La classe `.scroll-progress` peut porter le dégradé via le CSS ; un dégradé de
 * secours est aussi posé en inline pour rester autonome.
 * Sous prefers-reduced-motion : la barre reste à 0 (pas de scrub).
 */
export function ScrollProgress(): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Mouvement réduit : on n'attache aucun ScrollTrigger.
    if (prefersReducedMotion()) {
      gsap.set(el, { scaleX: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          transformOrigin: 'left center',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.4, // suit le scroll en douceur
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="scroll-progress"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: 2,
        zIndex: 100,
        transform: 'scaleX(0)',
        transformOrigin: 'left center',
        // Encre monochrome (s'inverse avec le thème via la variable --ink).
        background: 'rgb(var(--ink))',
        pointerEvents: 'none',
      }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// <Parallax> — translation verticale douce au scroll (scrub)
// ─────────────────────────────────────────────────────────────────────────────

interface ParallaxProps {
  children: React.ReactNode;
  /**
   * Intensité de l'effet. > 0 : l'élément « remonte » au scroll (avant-plan rapide).
   * < 0 : il « descend » (arrière-plan lent). Par défaut 0.2.
   */
  speed?: number;
  className?: string;
}

/**
 * Translate doucement son contenu sur l'axe vertical en fonction du défilement,
 * lié au scroll via `scrub`. L'amplitude est proportionnelle à `speed`.
 * Sous prefers-reduced-motion : aucun déplacement.
 */
export function Parallax({ children, speed = 0.2, className }: ParallaxProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { clearProps: 'all', y: 0 });
      return;
    }

    // Amplitude du déplacement : ~120px de course par unité de speed.
    const shift = speed * 120;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: shift },
        {
          y: -shift,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true, // lié image par image au scroll
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// useReveal — reveal en stagger sur les .gs-reveal d'un sous-arbre
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Applique le reveal au scroll sur tous les `.gs-reveal` contenus dans
 * `rootRef.current`, en stagger (cascade). Chaque révélation se joue une seule
 * fois (`once: true`). Le contexte GSAP est revert au démontage / changement de
 * dépendance.
 *
 * À utiliser dans une page/section :
 *   const rootRef = useRef<HTMLDivElement>(null);
 *   useReveal(rootRef);
 *   return <div ref={rootRef}>…<div className="gs-reveal">…</div>…</div>;
 *
 * Sous prefers-reduced-motion : tous les `.gs-reveal` sont rendus visibles
 * immédiatement, sans animation.
 */
export function useReveal(rootRef: React.RefObject<HTMLElement>): void {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Mouvement réduit : on force la visibilité et on sort.
    if (prefersReducedMotion()) {
      const targets = root.querySelectorAll<HTMLElement>('.gs-reveal');
      if (targets.length) {
        gsap.set(targets, { clearProps: 'all', opacity: 1, y: 0 });
      }
      return;
    }

    // gsap.context scopé à la racine : tous les sélecteurs sont relatifs au sous-arbre.
    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>('.gs-reveal');
      targets.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: 'power3.out',
            // stagger : décalage progressif basé sur la position dans le sous-arbre.
            delay: targets.indexOf(el) * 0.08,
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              once: true,
            },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, [rootRef]);
}

// ─────────────────────────────────────────────────────────────────────────────
// useSmoothScroll — défilement fluide (Lenis) synchronisé avec ScrollTrigger
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Active un défilement fluide / inertiel (Lenis) sur toute la page et le
 * synchronise avec GSAP ScrollTrigger : les animations « scrubbées » suivent
 * alors le scroll lissé (sensation de défilement lent et continu).
 * Désactivé sous prefers-reduced-motion.
 */
export function useSmoothScroll(): void {
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    // duration élevé + wheelMultiplier < 1 => défilement nettement plus lent,
    // pour laisser les animations « scrubbées » durer.
    const lenis = new Lenis({ duration: 1.7, wheelMultiplier: 0.8, smoothWheel: true });
    lenis.on('scroll', () => ScrollTrigger.update());

    const onRaf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onRaf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onRaf);
      lenis.destroy();
    };
  }, []);
}
