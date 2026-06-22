import React from 'react';
import { useLang } from '../../i18n';
import { Reveal, Parallax } from '../../animations';
import {
  SERVICES,
  buildProjectMailto,
} from '../../content/services';
import type {
  ServiceCopy,
  ServiceCta,
  ServiceCaseStudy,
} from '../../content/types';

// ─────────────────────────────────────────────────────────────────────────────
// Page Services — vitrine CLAIRE & spatiale (theme clair par defaut).
//
// Esthetique blanche epuree facon sunmetalon.com : enorme whitespace, titres
// XXL (Space Grotesk), cartes numerotees 01/02/03 avec gros chiffre filigrane
// mono, accent indigo (#2B2BE0) + cyan (#00C2FF), degrade « propulsion »
// ponctuel. Identite spatiale SOBRE (propulsion, trajectoire, orbite) — jamais
// de fond sombre etoile.
//
// Contenu : les 3 offres harmonisees de src/content/services.ts, consommees via
// useLang().t (bilingue FR/EN). L'offre 02 porte une etude de cas KuryLabs et
// le CTA mailto « en 1 clic » (buildProjectMailto).
//
// Animations : <Reveal> en cascade au scroll, <Parallax> doux sur les gros
// chiffres filigranes. prefers-reduced-motion est gere par la lib d'animation.
// ─────────────────────────────────────────────────────────────────────────────

/* Micro-copie bilingue propre a la page (en-tete + libelles structurels). */
const PAGE = {
  fr: {
    kicker: 'SERVICES',
    title: 'Ce que je construis pour vous',
    titleAccent: 'pour vous',
    intro:
      "Trois façons de faire décoller votre projet : des solutions IA qui tournent sur vos données, des produits livrés vite et bien, et vos équipes qui montent en compétence. Pas des démos — des outils réels, mis en production.",
    deliverablesLabel: 'Ce que vous obtenez',
    sectionOf: 'Offre',
  },
  en: {
    kicker: 'SERVICES',
    title: 'What I build for you',
    titleAccent: 'for you',
    intro:
      'Three ways to get your project off the ground: AI solutions that run on your data, products shipped fast and clean, and teams leveled up. Not demos — real tools, in production.',
    deliverablesLabel: 'What you get',
    sectionOf: 'Offer',
  },
};

const CASE_STUDY_LABELS = {
  fr: {
    built: 'Ce qui a ete construit',
    timeline: 'Timeline',
    status: 'Statut',
    live: 'En ligne',
  },
  en: {
    built: 'What was built',
    timeline: 'Timeline',
    status: 'Status',
    live: 'Live',
  },
};

/* Helper : "01" -> entier d'index lisible. */
function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

// ─────────────────────────────────────────────────────────────────────────────
// Bloc CTA d'une offre (commun aux 3 offres). L'offre 02 genere un mailto
// pre-rempli via buildProjectMailto ; les autres utilisent cta.href.
// ─────────────────────────────────────────────────────────────────────────────
interface OfferCtaProps {
  cta: ServiceCta;
  href: string;
}

function OfferCta({ cta, href }: OfferCtaProps): JSX.Element {
  return (
    <div className="mt-10">
      {cta.kicker && (
        <p className="font-heading font-semibold text-xl text-ink dark:text-text-primary-dark mb-4">
          {cta.kicker}
        </p>
      )}
      <a className="btn-primary" href={href}>
        {cta.button}
        <span aria-hidden="true">→</span>
      </a>
      {cta.note && (
        <p className="mt-3 max-w-md text-sm text-muted dark:text-text-secondary-dark">
          {cta.note}
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Encart ETUDE DE CAS KuryLabs (offre 02) — carte claire premium :
// tag + client + contexte, les 5 briques « built » en cartes numerotees,
// puis un bandeau timeline (~2 mois) + statut (fonctionnel / cloud).
// ─────────────────────────────────────────────────────────────────────────────
interface CaseStudyProps {
  caseStudy: ServiceCaseStudy;
  labels: { built: string; timeline: string; status: string; live: string };
}

function CaseStudyCard({ caseStudy, labels }: CaseStudyProps): JSX.Element {
  return (
    <Reveal className="mt-12">
      <div className="relative overflow-hidden rounded-2xl border border-ui-border-light bg-surface dark:bg-bg-dark-2 dark:border-ui-border shadow-md">
        {/* Trajectoire douce en filigrane (clair, jamais sombre). */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-trajectory opacity-70"
        />

        <div className="relative p-8 md:p-12">
          {/* Tag + client */}
          <span className="kicker">{caseStudy.tag}</span>
          <h3 className="mt-4 font-heading font-bold text-2xl md:text-3xl tracking-tight text-ink dark:text-text-primary-dark">
            {caseStudy.client}
          </h3>
          <p className="mt-4 max-w-3xl text-base md:text-lg leading-relaxed text-muted dark:text-text-secondary-dark">
            {caseStudy.context}
          </p>

          {/* Les 5 briques « built » en cartes numerotees */}
          <p className="kicker mt-10">{labels.built}</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {caseStudy.built.map((brick, i) => (
              <Reveal key={brick} delay={i * 0.06}>
                <article className="card lift relative h-full overflow-hidden p-6 bg-paper dark:bg-bg-dark">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-2 right-3 font-code font-bold text-5xl leading-none text-primary/10 dark:text-primary-300/15 select-none"
                  >
                    {pad2(i + 1)}
                  </span>
                  <span className="font-code text-xs tracking-[0.18em] text-primary">
                    {pad2(i + 1)}
                  </span>
                  <p className="mt-3 leading-relaxed text-ink dark:text-text-primary-dark">
                    {brick}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Bandeau timeline + statut */}
          <Reveal delay={0.1}>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-ui-border-light dark:border-ui-border bg-paper/70 dark:bg-bg-dark/60 px-5 py-4">
                <p className="font-code text-xs uppercase tracking-[0.18em] text-muted dark:text-text-secondary-dark">
                  {labels.timeline}
                </p>
                <p className="mt-1 font-heading font-semibold text-ink dark:text-text-primary-dark">
                  {caseStudy.timeline}
                </p>
              </div>
              <div className="rounded-xl border border-ui-border-light dark:border-ui-border bg-paper/70 dark:bg-bg-dark/60 px-5 py-4">
                <p className="font-code text-xs uppercase tracking-[0.18em] text-muted dark:text-text-secondary-dark">
                  {labels.status}
                </p>
                <p className="mt-1 inline-flex items-center gap-2 font-heading font-semibold text-ink dark:text-text-primary-dark">
                  <span
                    aria-hidden="true"
                    className="inline-block h-2 w-2 rounded-full bg-success"
                  />
                  {caseStudy.status}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Aperçu du produit en ligne : fenêtre de navigateur + capture réelle */}
          {caseStudy.preview && caseStudy.link && (
            <Reveal delay={0.12}>
              <a
                href={caseStudy.link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={caseStudy.link.label}
                className="group mt-10 block overflow-hidden rounded-2xl border border-ui-border-light dark:border-ui-border shadow-md no-underline"
              >
                {/* Barre de navigateur */}
                <div className="flex items-center gap-3 border-b border-ui-border-light dark:border-ui-border bg-surface dark:bg-bg-dark-2 px-4 py-3">
                  <span aria-hidden="true" className="flex shrink-0 gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-ui-border-light dark:bg-ui-border" />
                    <span className="h-2.5 w-2.5 rounded-full bg-ui-border-light dark:bg-ui-border" />
                    <span className="h-2.5 w-2.5 rounded-full bg-ui-border-light dark:bg-ui-border" />
                  </span>
                  <span className="truncate font-code text-xs text-muted dark:text-text-secondary-dark">
                    {caseStudy.link.href.replace(/^https?:\/\//, '')}
                  </span>
                  <span className="ml-auto inline-flex items-center gap-1.5 whitespace-nowrap font-code text-[0.65rem] uppercase tracking-[0.18em] text-muted dark:text-text-secondary-dark">
                    <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-success" />
                    {labels.live}
                  </span>
                </div>
                {/* Capture réelle de la production (zoom doux au survol) */}
                <div className="overflow-hidden bg-bg-dark">
                  <img
                    src={`${process.env.PUBLIC_URL}${caseStudy.preview}`}
                    alt={caseStudy.link.label}
                    loading="lazy"
                    className="block w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>
              </a>
            </Reveal>
          )}

          {/* Lien direct vers le produit en ligne */}
          {caseStudy.link && (
            <Reveal delay={0.14}>
              <a
                href={caseStudy.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-8 no-underline"
              >
                {caseStudy.link.label}
                <span aria-hidden="true">↗</span>
              </a>
            </Reveal>
          )}
        </div>
      </div>
    </Reveal>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Une OFFRE pleine largeur (alternee gauche / droite via `flip`).
// Gros numero filigrane (parallaxe), titre XXL, promesse, description,
// grille de livrables numerotes, etude de cas optionnelle, puis CTA.
// ─────────────────────────────────────────────────────────────────────────────
interface OfferSectionProps {
  offer: ServiceCopy;
  flip: boolean;
  ctaHref: string;
  pageLabels: { deliverablesLabel: string; sectionOf: string };
  caseLabels: { built: string; timeline: string; status: string; live: string };
}

function OfferSection({
  offer,
  flip,
  ctaHref,
  pageLabels,
  caseLabels,
}: OfferSectionProps): JSX.Element {
  return (
    <section className="relative border-t border-ui-border-light dark:border-ui-border py-20 md:py-28">
      {/* En-tete de l'offre : gros numero filigrane + titre + promesse */}
      <div
        className={[
          'flex flex-col gap-8 lg:items-start',
          flip ? 'lg:flex-row-reverse' : 'lg:flex-row',
        ].join(' ')}
      >
        {/* Colonne numero filigrane (parallaxe douce) */}
        <div className="lg:w-2/5">
          <Parallax speed={0.12}>
            <span
              aria-hidden="true"
              className="block font-code font-bold leading-none text-[7rem] md:text-[10rem] gradient-text select-none"
            >
              {offer.number}
            </span>
          </Parallax>
          <p className="mt-2 font-code text-xs uppercase tracking-[0.18em] text-muted dark:text-text-secondary-dark">
            {pageLabels.sectionOf} {offer.number}
          </p>
        </div>

        {/* Colonne contenu */}
        <div className="lg:w-3/5">
          <Reveal>
            <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tight text-ink dark:text-text-primary-dark">
              {offer.title}
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-5 font-heading font-semibold text-xl md:text-2xl leading-snug gradient-text">
              {offer.promise}
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-muted dark:text-text-secondary-dark">
              {offer.description}
            </p>
          </Reveal>
        </div>
      </div>

      {/* Grille des livrables — cartes numerotees */}
      <Reveal className="mt-14">
        <p className="kicker">{pageLabels.deliverablesLabel}</p>
      </Reveal>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {offer.deliverables.map((d, i) => (
          <Reveal key={d.label} delay={i * 0.07}>
            <article className="card lift relative h-full overflow-hidden p-6">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-3 right-4 font-code font-bold text-6xl leading-none text-primary/[0.08] dark:text-primary-300/15 select-none"
              >
                {pad2(i + 1)}
              </span>
              <span className="font-code text-xs tracking-[0.18em] text-primary">
                {pad2(i + 1)}
              </span>
              <h3 className="mt-3 font-heading font-semibold text-lg text-ink dark:text-text-primary-dark">
                {d.label}
              </h3>
              <p className="mt-2 leading-relaxed text-muted dark:text-text-secondary-dark">
                {d.detail}
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      {/* Etude de cas (offre 02 uniquement) */}
      {offer.caseStudy && (
        <CaseStudyCard caseStudy={offer.caseStudy} labels={caseLabels} />
      )}

      {/* CTA de l'offre */}
      <Reveal>
        <OfferCta cta={offer.cta} href={ctaHref} />
      </Reveal>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────
const Services: React.FC = () => {
  const { lang, t } = useLang();
  const page = t(PAGE);
  const caseLabels = t(CASE_STUDY_LABELS);
  const offers = SERVICES[lang];

  // Titre avec accent en degrade sur la fin ("pour vous" / "for you").
  const [titleLead] = page.title.split(page.titleAccent);

  return (
    <div className="bg-paper dark:bg-bg-dark">
      {/* ── En-tete de page : kicker + titre XXL + intro ── */}
      <header className="pt-6 pb-4 md:pt-10">
        <Reveal>
          <p className="kicker">{page.kicker}</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="mt-5 max-w-4xl font-heading font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight text-ink dark:text-text-primary-dark">
            {titleLead}
            <span className="gradient-text">{page.titleAccent}</span>
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-muted dark:text-text-secondary-dark">
            {page.intro}
          </p>
        </Reveal>
      </header>

      {/* ── Les 3 offres en sections alternees pleine largeur ── */}
      {offers.map((offer, i) => (
        <OfferSection
          key={offer.number}
          offer={offer}
          flip={i % 2 === 1}
          ctaHref={
            offer.number === '02'
              ? buildProjectMailto(lang)
              : offer.cta.href ?? '#'
          }
          pageLabels={{
            deliverablesLabel: page.deliverablesLabel,
            sectionOf: page.sectionOf,
          }}
          caseLabels={caseLabels}
        />
      ))}
    </div>
  );
};

export default Services;
