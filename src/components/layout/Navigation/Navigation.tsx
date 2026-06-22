import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { NavLink } from 'react-router-dom';
import gsap from 'gsap';
import { cn } from '../../../utils/cn';
import { useLang } from '../../../i18n';

// Libellés bilingues de la navigation (FR / EN).
const NAV_LABELS = {
  fr: { home: 'Accueil', services: 'Services', projects: 'Projets', about: 'À propos', contact: 'Contact' },
  en: { home: 'Home', services: 'Services', projects: 'Projects', about: 'About', contact: 'Contact' },
};

const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const Navigation: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { t } = useLang();
  const labels = t(NAV_LABELS);

  const navItems = [
    { path: '/', label: labels.home },
    { path: '/services', label: labels.services },
    { path: '/projects', label: labels.projects },
    { path: '/about', label: labels.about },
    { path: '/contact', label: labels.contact },
  ];

  const desktopRef = useRef<HTMLElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  // Desktop : les cases encadrées apparaissent une à une (trait gauche→droite).
  useEffect(() => {
    if (prefersReduced()) return;
    const cells = desktopRef.current?.querySelectorAll('.nav-cell');
    if (cells && cells.length) {
      // One-shot : chaque case encadrée se trace (gauche→droite) une fois, au montage.
      // IMPORTANT : fin explicite inset(0 0 0 0) — `gsap.from` vers `clip-path:none`
      // n'est PAS interpolable (les cases resteraient clippées/invisibles).
      gsap.fromTo(
        cells,
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        { clipPath: 'inset(0 0 0 0)', opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.08, delay: 0.35 },
      );
    }
  }, []);

  // Mobile : verrou de scroll + révélation des lignes à l'ouverture.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (open && !prefersReduced() && mobileRef.current) {
      const rows = mobileRef.current.querySelectorAll('.m-row');
      // One-shot : les lignes du menu se tracent à l'ouverture.
      gsap.fromTo(
        rows,
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.5, ease: 'power3.out', stagger: 0.08, delay: 0.08 },
      );
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* ── Desktop : segments encadrés ── */}
      <nav ref={desktopRef} className="hidden md:flex" aria-label="Navigation principale">
        {navItems.map((item, i) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              cn(
                'nav-cell border border-line px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.12em] no-underline transition-colors duration-200',
                i > 0 && '-ml-px',
                isActive ? 'border-ink bg-ink text-inverse' : 'text-ink hover:border-ink hover:bg-ink hover:text-inverse',
              )
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* ── Mobile : déclencheur (plus de hamburger) ── */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ouvrir le menu"
        aria-expanded={open}
        className="flex h-9 items-center border border-line px-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink transition-colors duration-200 hover:bg-ink hover:text-inverse md:hidden"
      >
        Menu
      </button>

      {/* ── Mobile : plein écran OPAQUE (style chatbot). Rendu via PORTAL sur
          document.body pour échapper au transform du header (sinon le menu se
          dimensionne au header au lieu du viewport). ── */}
      {open && createPortal(
        <div
          ref={mobileRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation"
          className="fixed inset-0 z-modal flex h-[100dvh] w-screen flex-col bg-paper"
        >
          <div className="flex items-center justify-between border-b border-line px-5 py-4 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted">
            <span>Navigation</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fermer le menu"
              className="flex h-9 w-9 items-center justify-center border border-line text-ink transition-colors duration-200 hover:bg-ink hover:text-inverse"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <line x1="2" y1="2" x2="14" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="14" y1="2" x2="2" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-1 flex-col" aria-label="Navigation mobile">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'm-row flex items-center justify-between border-b border-line px-5 py-6 font-heading text-2xl font-semibold uppercase tracking-tight no-underline transition-colors duration-200',
                    isActive ? 'bg-ink text-inverse' : 'text-ink hover:bg-surface',
                  )
                }
              >
                {item.label}
                <span aria-hidden="true" className="font-mono text-base text-muted">↗</span>
              </NavLink>
            ))}
          </nav>
        </div>,
        document.body,
      )}
    </>
  );
};

export default Navigation;
