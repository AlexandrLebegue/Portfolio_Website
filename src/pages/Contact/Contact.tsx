import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONTACT_COPY } from '../../content/contact';
import { buildProjectMailto } from '../../content/services';
import { useLang } from '../../i18n';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// Page Contact — MEME format « plan technique » que la home / les realisations :
// un SEUL cadre monochrome qui se trace au scroll (rails + lignes), canaux en
// grille connectee (cellules attachees), CTA « 1 clic » en bas. Plus d'arrondi,
// plus de degrade « propulsion ». Texte 100% issu de CONTACT_COPY (FR/EN).
// ─────────────────────────────────────────────────────────────────────────────

// Micro-copie d'interface non couverte par CONTACT_COPY (bilingue).
const UI_COPY = {
  fr: { channelsLabel: 'MES CANAUX', open: 'Ouvrir', fastReply: 'Reponse rapide' },
  en: { channelsLabel: 'MY CHANNELS', open: 'Open', fastReply: 'Fast reply' },
};

// Petite fleche « trajectoire » monochrome reutilisable.
const ArrowIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

const Contact: React.FC = () => {
  const { lang, t } = useLang();
  const c = t(CONTACT_COPY);
  const ui = t(UI_COPY);

  // Ordre d'affichage des canaux + numero associe.
  const channels = [
    { index: '01', ...c.channels.email, external: false },
    { index: '02', ...c.channels.linkedin, external: true },
    { index: '03', ...c.channels.github, external: true },
  ];

  const projectMailto = buildProjectMailto(lang);

  // ── Lignes de structure : chaque [data-draw] se TRACE au scroll (scaleX/Y 0→1).
  const rootRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-draw]').forEach((el) => {
        const axis = el.dataset.draw;
        const prop = axis === 'y' ? 'scaleY' : 'scaleX';
        gsap.fromTo(
          el,
          { [prop]: 0 },
          {
            [prop]: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top 95%',
              end: axis === 'y' ? 'top 45%' : 'top 70%',
              scrub: 1,
            },
          },
        );
      });
    }, root);

    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => {
      window.clearTimeout(refreshId);
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  return (
    <div className="fullbleed py-8 md:py-12">
      <div className="container-page">
        <div ref={rootRef} className="relative">
          <span className="vrail vrail-l" data-draw="y" />
          <span className="vrail vrail-r" data-draw="y" />

          {/* ── Bandeau de tete ── */}
          <div className="hline" data-draw="x" />
          <div className="flex items-center justify-between gap-4 px-5 py-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted">
            <span>{c.kicker}</span>
            <span className="hidden sm:inline">Alexandre Lebegue — 2026</span>
          </div>
          <div className="hline" data-draw="x" />

          {/* ── Hero : titre XXL + sous-titre ── */}
          <div className="px-6 py-14 md:px-10 md:py-20">
            <h1 className="max-w-4xl font-heading text-4xl font-bold uppercase leading-[1.04] tracking-tight md:text-6xl">
              <span className="gradient-text">{c.title}</span>
            </h1>
            <div className="hline mt-8 max-w-sm" data-draw="x" />
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted dark:text-text-secondary-dark md:text-xl">
              {c.subtitle}
            </p>
          </div>
          <div className="hline" data-draw="x" />

          {/* ── Canaux : grille connectee 01 / 02 / 03 ── */}
          <div className="px-5 py-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted">
            {'// '}
            {ui.channelsLabel}
          </div>
          <div className="hline" data-draw="x" />

          <div className="grid grid-cols-1 sm:grid-cols-3">
            {channels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                {...(channel.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="group relative flex flex-col p-6 no-underline transition-colors duration-200 hover:bg-surface md:p-8"
              >
                <span className="vrail vrail-l hidden sm:block" data-draw="y" />
                <div className="hline absolute left-0 top-0" data-draw="x" />

                <span className="font-mono text-xs tracking-[0.14em] text-muted">
                  {channel.index}
                </span>
                <h2 className="mt-5 font-heading text-lg font-semibold uppercase tracking-tight text-ink dark:text-text-primary-dark">
                  {channel.label}
                </h2>
                <p className="mt-2 break-words font-mono text-sm text-muted dark:text-text-secondary-dark">
                  {channel.value}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-ink transition-all duration-200 group-hover:gap-3 dark:text-text-primary-dark">
                  {ui.open}
                  <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </a>
            ))}
          </div>
          <div className="hline" data-draw="x" />

          {/* ── CTA « demande en 1 clic » ── */}
          <div className="relative overflow-hidden px-6 py-14 md:px-10 md:py-20">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 bg-gradient-trajectory opacity-70"
            />
            <h2 className="max-w-2xl font-heading text-3xl font-bold uppercase tracking-tight sm:text-4xl md:text-5xl">
              <span className="gradient-text">{c.cta.heading}</span>
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted dark:text-text-secondary-dark">
              {c.cta.reassurance}
            </p>
            <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <a href={projectMailto} className="btn-primary no-underline">
                {c.cta.button}
                <ArrowIcon className="h-4 w-4" />
              </a>
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted dark:text-text-secondary-dark">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping bg-ink opacity-70" />
                  <span className="relative inline-flex h-2 w-2 bg-ink" />
                </span>
                {ui.fastReply}
              </span>
            </div>
          </div>

          {/* Ligne de fermeture du cadre */}
          <div className="hline" data-draw="x" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
