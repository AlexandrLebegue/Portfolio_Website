import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../../i18n';
import { SERVICES, buildProjectMailto } from '../../content/services';
import type { ServiceCopy, ServiceCaseStudy } from '../../content/types';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// Page Services — MEME format « plan technique » que la home / les realisations.
// Un SEUL cadre monochrome qui se trace au scroll (rails + lignes horizontales).
// Chaque offre = un bloc ATTACHE : en-tete (numero + titre + promesse), grille
// de livrables connectee, etude de cas optionnelle (offre 02), puis CTA.
// Plus d'arrondi, plus de degrade « propulsion », plus de gros chiffre filigrane.
// Contenu 100% issu de src/content/services.ts (bilingue FR/EN) via useLang().t.
// ─────────────────────────────────────────────────────────────────────────────

const PAGE = {
  fr: {
    kicker: 'SERVICES',
    title: 'Ce que je construis pour vous',
    deliverablesLabel: 'CE QUE VOUS OBTENEZ',
    sectionOf: 'Offre',
    intro:
      "Trois facons de vous propulser : des solutions IA qui tournent sur vos donnees, des produits livres vite et bien, et la montee en competence de vos equipes. Pas des demos — des outils reels, mis en orbite.",
  },
  en: {
    kicker: 'SERVICES',
    title: 'What I build for you',
    deliverablesLabel: 'WHAT YOU GET',
    sectionOf: 'Offer',
    intro:
      'Three ways to propel you forward: AI solutions that run on your data, products shipped fast and clean, and teams leveled up. Not demos — real tools, put into orbit.',
  },
};

const CASE_STUDY_LABELS = {
  fr: { built: 'CE QUI A ETE CONSTRUIT', timeline: 'Timeline', status: 'Statut' },
  en: { built: 'WHAT WAS BUILT', timeline: 'Timeline', status: 'Status' },
};

/* Helper : "1" -> "01". */
function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

// ─────────────────────────────────────────────────────────────────────────────
// Etude de cas (offre 02) — sous-bloc encadre : tag + client + contexte, les
// briques « built » en grille connectee, puis une rangee timeline / statut.
// ─────────────────────────────────────────────────────────────────────────────
interface CaseStudyBlockProps {
  caseStudy: ServiceCaseStudy;
  labels: { built: string; timeline: string; status: string };
}

const CaseStudyBlock: React.FC<CaseStudyBlockProps> = ({ caseStudy, labels }) => (
  <>
    <div className="hline" data-draw="x" />
    <div className="px-6 py-10 md:px-10 md:py-12">
      <span className="kicker">{caseStudy.tag}</span>
      <h3 className="mt-4 font-heading text-2xl font-semibold uppercase tracking-tight text-ink dark:text-text-primary-dark md:text-3xl">
        {caseStudy.client}
      </h3>
      <p className="mt-4 max-w-3xl leading-relaxed text-muted dark:text-text-secondary-dark">
        {caseStudy.context}
      </p>
      <p className="mt-8 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted">
        {'// '}
        {labels.built}
      </p>
    </div>
    <div className="hline" data-draw="x" />

    {/* Briques « built » en grille connectee */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {caseStudy.built.map((brick, i) => (
        <div key={brick} className="relative flex flex-col p-6">
          <span className="vrail vrail-l hidden sm:block" data-draw="y" />
          <div className="hline absolute left-0 top-0" data-draw="x" />
          <span className="font-mono text-xs tracking-[0.14em] text-muted">{pad2(i + 1)}</span>
          <p className="mt-3 leading-relaxed text-ink dark:text-text-primary-dark">{brick}</p>
        </div>
      ))}
    </div>
    <div className="hline" data-draw="x" />

    {/* Rangee timeline + statut */}
    <div className="grid grid-cols-1 sm:grid-cols-2">
      <div className="relative p-6">
        <span className="vrail vrail-l hidden sm:block" data-draw="y" />
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">{labels.timeline}</p>
        <p className="mt-1 font-heading font-semibold text-ink dark:text-text-primary-dark">
          {caseStudy.timeline}
        </p>
      </div>
      <div className="relative p-6">
        <span className="vrail vrail-l hidden sm:block" data-draw="y" />
        <div className="hline absolute left-0 top-0 sm:hidden" data-draw="x" />
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">{labels.status}</p>
        <p className="mt-1 inline-flex items-center gap-2 font-heading font-semibold text-ink dark:text-text-primary-dark">
          <span aria-hidden="true" className="inline-block h-2 w-2 bg-ink" />
          {caseStudy.status}
        </p>
      </div>
    </div>
  </>
);

// ─────────────────────────────────────────────────────────────────────────────
// Un bloc OFFRE attache : en-tete (numero + titre + promesse + description),
// libelle livrables, grille de livrables connectee, etude de cas, puis CTA.
// ─────────────────────────────────────────────────────────────────────────────
interface OfferBlockProps {
  offer: ServiceCopy;
  ctaHref: string;
  pageLabels: { deliverablesLabel: string; sectionOf: string };
  caseLabels: { built: string; timeline: string; status: string };
}

const OfferBlock: React.FC<OfferBlockProps> = ({ offer, ctaHref, pageLabels, caseLabels }) => (
  <>
    <div className="hline" data-draw="x" />

    {/* En-tete de l'offre : numero (colonne) + contenu */}
    <div className="relative grid md:grid-cols-12">
      <span className="vrail hidden md:block" style={{ left: '33.3333%' }} data-draw="y" />

      <div className="px-6 py-10 md:col-span-4 md:px-10 md:py-12">
        <span className="inline-flex items-center justify-center bg-ink px-5 py-4 font-heading text-5xl font-semibold leading-none text-inverse md:text-6xl">
          {offer.number}
        </span>
        <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted">
          {pageLabels.sectionOf} {offer.number}
        </p>
      </div>

      <div className="px-6 py-10 md:col-span-8 md:px-10 md:py-12">
        <h2 className="font-heading text-2xl font-semibold uppercase tracking-tight text-ink dark:text-text-primary-dark md:text-4xl">
          {offer.title}
        </h2>
        <p className="mt-4 font-heading text-base font-medium text-ink dark:text-text-primary-dark md:text-lg">
          {offer.promise}
        </p>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted dark:text-text-secondary-dark">
          {offer.description}
        </p>
      </div>
    </div>

    {/* Livrables */}
    <div className="hline" data-draw="x" />
    <div className="px-5 py-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted">
      {'// '}
      {pageLabels.deliverablesLabel}
    </div>
    <div className="hline" data-draw="x" />

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {offer.deliverables.map((d, i) => (
        <div key={d.label} className="relative flex flex-col p-6">
          <span className="vrail vrail-l hidden sm:block" data-draw="y" />
          <div className="hline absolute left-0 top-0" data-draw="x" />
          <span className="font-mono text-xs tracking-[0.14em] text-muted">{pad2(i + 1)}</span>
          <h3 className="mt-4 font-heading text-lg font-semibold uppercase tracking-tight text-ink dark:text-text-primary-dark">
            {d.label}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted dark:text-text-secondary-dark">
            {d.detail}
          </p>
        </div>
      ))}
    </div>

    {/* Etude de cas (offre 02) */}
    {offer.caseStudy && <CaseStudyBlock caseStudy={offer.caseStudy} labels={caseLabels} />}

    {/* CTA de l'offre */}
    <div className="hline" data-draw="x" />
    <div className="px-6 py-10 md:px-10 md:py-12">
      {offer.cta.kicker && (
        <p className="mb-4 font-heading text-xl font-semibold text-ink dark:text-text-primary-dark">
          {offer.cta.kicker}
        </p>
      )}
      <a className="btn-primary no-underline" href={ctaHref}>
        {offer.cta.button}
        <span aria-hidden="true">→</span>
      </a>
      {offer.cta.note && (
        <p className="mt-3 max-w-md text-sm text-muted dark:text-text-secondary-dark">
          {offer.cta.note}
        </p>
      )}
    </div>
  </>
);

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────
const Services: React.FC = () => {
  const { lang, t } = useLang();
  const page = t(PAGE);
  const caseLabels = t(CASE_STUDY_LABELS);
  const offers = SERVICES[lang];

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
            <span>{page.kicker}</span>
            <span className="hidden sm:inline">
              {pad2(offers.length)} {t({ fr: 'OFFRES', en: 'OFFERS' })}
            </span>
          </div>
          <div className="hline" data-draw="x" />

          {/* ── Hero : titre XXL + intro ── */}
          <div className="px-6 py-14 md:px-10 md:py-20">
            <h1 className="max-w-4xl font-heading text-4xl font-bold uppercase leading-[1.04] tracking-tight md:text-6xl">
              <span className="gradient-text">{page.title}</span>
            </h1>
            <div className="hline mt-8 max-w-sm" data-draw="x" />
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted dark:text-text-secondary-dark md:text-xl">
              {page.intro}
            </p>
          </div>

          {/* ── Les 3 offres, attachees dans le meme cadre ── */}
          {offers.map((offer) => (
            <OfferBlock
              key={offer.number}
              offer={offer}
              ctaHref={offer.number === '02' ? buildProjectMailto(lang) : offer.cta.href ?? '#'}
              pageLabels={{
                deliverablesLabel: page.deliverablesLabel,
                sectionOf: page.sectionOf,
              }}
              caseLabels={caseLabels}
            />
          ))}

          {/* Ligne de fermeture du cadre */}
          <div className="hline" data-draw="x" />
        </div>
      </div>
    </div>
  );
};

export default Services;
