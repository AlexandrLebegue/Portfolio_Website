import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ABOUT_COPY } from '../../content/about';
import { useLang } from '../../i18n';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// src/pages/About/About.tsx
//
// « A propos » au MEME format « plan technique » que la home et les realisations :
// un SEUL cadre monochrome qui se trace au scroll (rails lateraux + lignes
// horizontales), sections ATTACHEES (aucun gap), libelles mono, grilles connectees.
// Plus d'arrondi, plus de degrade « propulsion », plus d'anneau d'orbite.
//
// Contenu 100% issu de ABOUT_COPY (bilingue FR/EN) via useLang().t.
// ─────────────────────────────────────────────────────────────────────────────

const About: React.FC = () => {
  const { t, lang } = useLang();
  const copy = t(ABOUT_COPY);

  // ── Lignes de structure : chaque [data-draw] se TRACE au scroll (scaleX/Y 0→1).
  //    Meme effet que la home / la grille projets. Rejoue sur changement de langue.
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
    // Tout est ENCADRE comme la home : fullbleed pour coller a la largeur des cadres.
    <div className="fullbleed py-8 md:py-12">
      <div className="container-page">
        <div ref={rootRef} className="relative">
          {/* Lueur de trajectoire tres discrete (clair, jamais sombre) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[60vh] bg-gradient-trajectory"
          />

          <span className="vrail vrail-l" data-draw="y" />
          <span className="vrail vrail-r" data-draw="y" />

          {/* ── Bandeau de tete (kicker + signature), comme le hero home ── */}
          <div className="hline" data-draw="x" />
          <div className="flex items-center justify-between gap-4 px-5 py-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted">
            <span>{copy.kicker}</span>
            <span className="hidden sm:inline">Alexandre Lebegue — 2026</span>
          </div>
          <div className="hline" data-draw="x" />

          {/* ── Hero editorial : titre XXL + lead ── */}
          <div className="px-6 py-14 md:px-10 md:py-20">
            <h1 className="max-w-4xl font-heading text-4xl font-bold uppercase leading-[1.04] tracking-tight md:text-6xl">
              <span className="gradient-text">{copy.title}</span>
            </h1>
            <div className="hline mt-8 max-w-sm" data-draw="x" />
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted dark:text-text-secondary-dark md:text-xl">
              {copy.lead}
            </p>
          </div>
          <div className="hline" data-draw="x" />

          {/* ── Recit + portrait : 2 colonnes attachees (rail central trace) ── */}
          <div className="relative grid md:grid-cols-12">
            <span
              className="vrail hidden md:block"
              style={{ left: '58.3333%' }}
              data-draw="y"
            />

            {/* Colonne texte (7/12) */}
            <div className="px-6 py-12 md:col-span-7 md:px-10 md:py-14">
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted">
                {'// '}
                {t({ fr: 'PARCOURS', en: 'TRACK RECORD' })}
              </span>
              <div className="mt-6 space-y-6">
                {copy.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-lg leading-relaxed text-ink/80 dark:text-text-secondary-dark"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Separateur mobile entre texte et portrait */}
            <div className="hline md:hidden" data-draw="x" />

            {/* Colonne portrait (5/12) : cadre carre « plan technique » */}
            <div className="px-6 py-12 md:col-span-5 md:px-10 md:py-14">
              <div className="relative w-full overflow-hidden border border-line bg-surface">
                {/* Etiquette + reperes d'angle facon plan */}
                <span className="absolute left-3 top-3 z-10 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted">
                  {t({ fr: 'Portrait', en: 'Portrait' })} · A. Lebegue
                </span>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3 top-3 h-2.5 w-2.5 border-r border-t border-line"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-3 left-3 h-2.5 w-2.5 border-b border-l border-line"
                />
                <img
                  src={require('../../assets/images/me.JPG')}
                  alt="Alexandre Lebegue"
                  className="aspect-[4/5] w-full object-cover grayscale"
                  loading="lazy"
                  onLoad={() => ScrollTrigger.refresh()}
                />
              </div>
            </div>
          </div>
          <div className="hline" data-draw="x" />

          {/* ── Preuves de confiance : grille connectee 01 / 02 / 03 ── */}
          <div className="flex items-center justify-between gap-4 px-5 py-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted">
            <span>
              {'// '}
              {t({ fr: 'PREUVES', en: 'PROOF' })}
            </span>
            <span className="hidden sm:inline">
              {String(copy.proofs.length).padStart(2, '0')}{' '}
              {t({ fr: 'POINTS', en: 'POINTS' })}
            </span>
          </div>
          <div className="hline" data-draw="x" />

          <div className="grid grid-cols-1 sm:grid-cols-3">
            {copy.proofs.map((proof, index) => (
              <div key={proof.label} className="group relative flex flex-col p-6 md:p-8">
                <span className="vrail vrail-l hidden sm:block" data-draw="y" />
                <div className="hline absolute left-0 top-0" data-draw="x" />

                <span className="font-mono text-xs tracking-[0.14em] text-muted">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-5 font-heading text-lg font-semibold uppercase tracking-tight text-ink dark:text-text-primary-dark">
                  {proof.label}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted dark:text-text-secondary-dark">
                  {proof.description}
                </p>
              </div>
            ))}
          </div>
          <div className="hline" data-draw="x" />

          {/* ── Le moteur : ce qui me fait avancer ── */}
          <div className="px-6 py-14 md:px-10 md:py-20">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted">
              {'// '}
              {copy.passion.title}
            </span>
            <p className="mt-6 max-w-3xl font-heading text-2xl font-semibold leading-snug tracking-tight text-ink dark:text-text-primary-dark md:text-4xl">
              {copy.passion.text}
            </p>
          </div>
          <div className="hline" data-draw="x" />

          {/* ── Signature de cloture ── */}
          <div className="px-6 py-12 md:px-10 md:py-16">
            <p className="max-w-3xl font-heading text-2xl font-medium leading-snug tracking-tight md:text-3xl">
              <span className="gradient-text">{copy.signature}</span>
            </p>
            <p className="mt-5 font-mono text-xs uppercase tracking-[0.18em] text-muted dark:text-text-secondary-dark">
              Alexandre Lebegue
            </p>
          </div>

          {/* Ligne de fermeture du cadre */}
          <div className="hline" data-draw="x" />
        </div>
      </div>
    </div>
  );
};

export default About;
