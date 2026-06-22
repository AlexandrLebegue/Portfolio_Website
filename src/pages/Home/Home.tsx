import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useLang } from '../../i18n';
import {
  HERO_COPY,
  PROJECTS_TEASER_COPY,
  FEATURED_PRODUCTS,
  FINAL_CTA_COPY,
} from '../../content/home';
import { SERVICES, buildProjectMailto } from '../../content/services';
import type { ServiceCopy, FeaturedProduct } from '../../content/types';
import useFeaturedProjects from '../../hooks/useFeaturedProjects';
import OrbitField from '../../components/OrbitField/OrbitField';

gsap.registerPlugin(ScrollTrigger, SplitText);

/* -------------------------------------------------------------------------- */
/* Accueil — monochrome / carré. Structure qui se TRACE (lignes), texte en      */
/* MACHINE À ÉCRIRE lettre par lettre (cadence aléatoire) piloté par le scroll. */
/* Hero : tape à l'arrivée. Reste : tape/dé-tape au scroll. Numéros en box       */
/* inversée. Offres alternées via UN composant OfferRow. Livrables en accordéon. */
/* -------------------------------------------------------------------------- */

const KEYWORDS: Record<'fr' | 'en', string[]> = {
  fr: ['SOLUTIONS IA', 'IA LOCALE', 'AGENTS OUTILLÉS', 'MVP EN SEMAINES', 'INTÉGRATION CLOUD', 'DONNÉES SENSIBLES', "RIGUEUR D'INGÉNIEUR", 'PRODUITS LIVRÉS'],
  en: ['AI SOLUTIONS', 'LOCAL AI', 'TOOL-EQUIPPED AGENTS', 'MVP IN WEEKS', 'CLOUD INTEGRATION', 'SENSITIVE DATA', 'ENGINEERING RIGOR', 'SHIPPED PRODUCTS'],
};

/* ── Livrable repliable : clic -> détail (ouverture animée + trait tracé) ── */
const AccordionItem: React.FC<{ label: string; detail: string }> = ({ label, detail }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 py-4 text-left transition-colors duration-200 hover:text-ink sm:px-2"
      >
        <span aria-hidden="true" className="font-mono text-base leading-none text-muted transition-transform duration-300 ease-spatial" style={{ transform: open ? 'rotate(45deg)' : 'none' }}>+</span>
        <span className="flex-1 text-sm font-medium text-ink">{label}</span>
      </button>
      <div className="grid transition-[grid-template-rows] duration-300 ease-spatial" style={{ gridTemplateRows: open ? '1fr' : '0fr' }}>
        <div className="overflow-hidden">
          <div className="pb-5 pl-8 pr-4 sm:pl-10">
            <div className="hline mb-3" style={{ transform: open ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.5s 0.05s cubic-bezier(0.16,1,0.3,1)' }} />
            <p className="text-sm leading-relaxed text-muted">{detail}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Une offre — composant UNIQUE (les 3 partagent ce code) ── */
const OfferRow: React.FC<{ offer: ServiceCopy; flip: boolean }> = ({ offer, flip }) => {
  const { lang, t } = useLang();
  const href = offer.number === '02' ? buildProjectMailto(lang) : offer.cta.href || '#';

  return (
    <div className="grid md:grid-cols-12 md:items-center">
      <div className={`relative flex flex-col items-start gap-3 p-6 md:col-span-4 md:p-10 ${flip ? 'md:order-2' : ''}`}>
        {/* Numéro en box monochrome inversée + frappe au scroll (sans curseur) */}
        <span data-num className="font-heading font-semibold leading-[0.8] text-5xl sm:text-6xl md:text-[7rem]">
          <span className="num-type bg-ink p-4 text-inverse md:p-6">
            {offer.number.split('').map((ch, i) => (
              <span key={i} className="num-char">{ch}</span>
            ))}
          </span>
        </span>
        <span data-type className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted">{t({ fr: 'Offre', en: 'Offer' })} {offer.number}</span>
      </div>

      <div className="hline md:hidden" data-draw="x" />

      <div className={`relative overflow-hidden p-6 md:col-span-8 md:p-10 ${flip ? 'md:order-1' : ''}`}>
        <span className={`vrail hidden md:block ${flip ? 'vrail-r' : 'vrail-l'}`} data-draw="y" />

        <h3 data-type className="font-heading text-2xl font-semibold uppercase tracking-tight md:text-4xl">{offer.title}</h3>
        <p data-type className="mt-4 font-heading text-base font-medium text-ink md:text-lg">{offer.promise}</p>
        <p data-type className="mt-4 max-w-2xl text-muted">{offer.description}</p>

        <div className="mt-7">
          <div className="hline" data-draw="x" />
          {offer.deliverables.map((d, ii) => (
            <React.Fragment key={d.label}>
              {ii > 0 && <div className="hline" data-draw="x" />}
              <AccordionItem label={d.label} detail={d.detail} />
            </React.Fragment>
          ))}
          <div className="hline" data-draw="x" />
        </div>

        <div data-btn className="mt-8 flex flex-wrap">
          <a className="btn-primary no-underline" href={href}>
            {offer.cta.button}
            <span aria-hidden="true">→</span>
          </a>
          <Link to="/services" className="btn-ghost -ml-px no-underline">
            {t({ fr: 'Détails', en: 'Details' })}
          </Link>
        </div>
      </div>
    </div>
  );
};

/* ── Produit phare en production : fenêtre de navigateur + capture réelle ── */
const ProductCard: React.FC<{ product: FeaturedProduct }> = ({ product }) => (
  <a
    href={product.href}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative flex flex-col overflow-hidden border border-line bg-paper no-underline transition-colors duration-200 hover:bg-surface"
  >
    {/* Barre de navigateur monochrome (URL + statut LIVE) */}
    <div className="flex items-center gap-3 border-b border-line bg-surface px-4 py-2.5">
      <span aria-hidden="true" className="flex shrink-0 gap-1.5">
        <span className="h-2 w-2 rounded-full border border-line" />
        <span className="h-2 w-2 rounded-full border border-line" />
        <span className="h-2 w-2 rounded-full border border-line" />
      </span>
      <span className="truncate font-mono text-[0.7rem] text-muted">{product.host}</span>
      <span className="ml-auto whitespace-nowrap font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted">
        {product.kind}
      </span>
    </div>

    {/* Capture du produit en ligne (zoom doux au survol) */}
    <div className="overflow-hidden bg-ink">
      <img
        src={`${process.env.PUBLIC_URL}${product.image}`}
        alt={`Aperçu de ${product.name}`}
        loading="lazy"
        className="block w-full transition-transform duration-[600ms] ease-spatial group-hover:scale-[1.04]"
      />
    </div>

    {/* Méta : nom, accroche, tags, lien */}
    <div className="flex flex-1 flex-col p-6">
      <div className="flex items-center justify-between">
        <h4 className="font-heading text-xl font-semibold uppercase tracking-tight text-ink">{product.name}</h4>
        <span aria-hidden="true" className="font-mono text-muted transition-transform duration-200 group-hover:translate-x-1">↗</span>
      </div>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{product.tagline}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {product.tags.map((tag) => (
          <span key={tag} className="tech-tag">{tag}</span>
        ))}
      </div>
      <span className="mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-ink">
        {product.linkLabel}
        <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
      </span>
    </div>
  </a>
);

const Home: React.FC = () => {
  const { lang, t } = useLang();
  const hero = t(HERO_COPY);
  const projects = t(PROJECTS_TEASER_COPY);
  const featuredProducts = t(FEATURED_PRODUCTS);
  const finalCta = t(FINAL_CTA_COPY);
  const offers = SERVICES[lang];
  const { projects: featured, loading } = useFeaturedProjects();

  // Tirage ALÉATOIRE de 6 projets (différent à chaque visite) — pas toujours les
  // 6 premiers. Mémoïsé tant que la liste ne change pas (donc figé pour la session).
  const shownProjects = useMemo(() => {
    const arr = [...featured];
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, 6);
  }, [featured]);

  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const splits: Array<{ revert: () => void }> = [];

    const ctx = gsap.context(() => {
      if (reduced) return;
      const sp = (axis?: string) => (axis === 'y' ? 'scaleY' : 'scaleX');

      // Découpe un élément texte en mots+lettres (préserve les retours à la ligne).
      const splitItems = (el: HTMLElement): Element[] => {
        const len = (el.textContent || '').trim().length;
        const useWords = len > 90; // longs paragraphes : par mot (perf)
        const s = new SplitText(el, { type: useWords ? 'words' : 'words,chars' });
        splits.push(s as unknown as { revert: () => void });
        return (useWords ? s.words : s.chars) as Element[];
      };

      // ── HERO : cadre dessiné à l'arrivée ──
      gsap.utils.toArray<HTMLElement>('[data-line-in]').forEach((el, i) => {
        const p = sp(el.dataset.lineIn);
        gsap.fromTo(el, { [p]: 0 }, { [p]: 1, duration: 0.85, ease: 'power2.inOut', delay: 0.05 + i * 0.08 });
      });
      // HERO : éléments non-texte (boutons / méta droite / réassurance) en clip.
      gsap.utils.toArray<HTMLElement>('[data-in]').forEach((el, i) => {
        const from = el.dataset.in === 'r' ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)';
        gsap.fromTo(el, { clipPath: from }, { clipPath: 'inset(0 0 0 0)', duration: 0.9, ease: 'power2.out', delay: 0.55 + i * 0.1 });
      });
      // HERO : texte qui se TAPE à l'arrivée (lettre par lettre, cadence aléatoire).
      gsap.utils.toArray<HTMLElement>('[data-type-in]').forEach((el, idx) => {
        const items = splitItems(el);
        gsap.set(items, { opacity: 0 });
        const tl = gsap.timeline({ delay: 0.4 + idx * 0.35 });
        let pos = 0;
        items.forEach((it) => {
          tl.to(it, { opacity: 1, duration: 0.01, ease: 'none' }, pos);
          pos += 0.022 + Math.random() * 0.075; // cadence aléatoire (s)
        });
      });

      // ── Lignes de structure (cascade / individuel) ──
      // ── Lignes de structure (cascade / individuel), scrubbées ──
      gsap.utils.toArray<HTMLElement>('[data-cascade]').forEach((group) => {
        const lines = gsap.utils.toArray<HTMLElement>('[data-draw]', group);
        if (!lines.length) return;
        const tl = gsap.timeline({ scrollTrigger: { trigger: group, start: 'top 85%', end: 'bottom 55%', scrub: 1 } });
        lines.forEach((el, idx) => {
          const p = sp(el.dataset.draw);
          tl.fromTo(el, { [p]: 0 }, { [p]: 1, duration: 1, ease: 'power2.out' }, idx * 0.55);
        });
      });
      gsap.utils.toArray<HTMLElement>('[data-draw]').forEach((el) => {
        if (el.closest('[data-cascade]')) return;
        const axis = el.dataset.draw;
        const p = sp(axis);
        gsap.fromTo(el, { [p]: 0 }, { [p]: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 95%', end: axis === 'y' ? 'top 45%' : 'top 68%', scrub: 1 } });
      });

      // ── Texte : MACHINE À ÉCRIRE lettre par lettre, cadence aléatoire, scrubbée ──
      gsap.utils.toArray<HTMLElement>('[data-type]').forEach((el) => {
        const items = splitItems(el);
        gsap.set(items, { opacity: 0 });
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 90%', end: 'top 50%', scrub: 1 } });
        let pos = 0;
        items.forEach((it) => {
          tl.fromTo(it, { opacity: 0 }, { opacity: 1, duration: 0.01, ease: 'none' }, pos);
          pos += 0.4 + Math.random() * 1.3; // cadence aléatoire
        });
      });

      // ── Éléments de droite (méta/labels) : révélation clip droite→gauche, scrubbée ──
      gsap.utils.toArray<HTMLElement>('[data-r]').forEach((el) => {
        gsap.fromTo(el, { clipPath: 'inset(0 0 0 100%)' }, { clipPath: 'inset(0 0% 0 0)', ease: 'none', scrollTrigger: { trigger: el, start: 'top 90%', end: 'top 56%', scrub: 1 } });
      });

      // ── BOUTONS : apparition douce (fondu + montée + léger scale), pas "brute" ──
      // Hero : à l'arrivée, après que le texte se soit tapé.
      gsap.utils.toArray<HTMLElement>('[data-btn-in]').forEach((el, i) => {
        gsap.from(el, { opacity: 0, y: 22, scale: 0.96, duration: 0.8, ease: 'power3.out', delay: 1.15 + i * 0.12 });
      });
      // Plus bas : à l'entrée dans la vue (une fois, en douceur).
      gsap.utils.toArray<HTMLElement>('[data-btn]').forEach((el) => {
        gsap.from(el, { opacity: 0, y: 22, scale: 0.96, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
      });

      // ── Numéros : box, frappe au scroll + parallaxe (scrubbé) ──
      gsap.utils.toArray<HTMLElement>('[data-num]').forEach((el) => {
        gsap.fromTo(el, { yPercent: 12 }, { yPercent: -12, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
        const chars = gsap.utils.toArray<HTMLElement>('.num-char', el);
        if (chars.length) {
          const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 48%', scrub: 1 } });
          chars.forEach((c, i) => tl.fromTo(c, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'none' }, i * 0.5));
        }
      });

      const track = root.querySelector<HTMLElement>('.marquee-track');
      if (track) gsap.to(track, { xPercent: -50, repeat: -1, duration: 34, ease: 'none' });
    }, root);

    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 220);
    return () => {
      window.clearTimeout(refreshId);
      ctx.revert();
      splits.forEach((s) => s.revert());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useLayoutEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => window.clearTimeout(id);
  }, [featured.length, loading]);

  const marquee = [...KEYWORDS[lang], ...KEYWORDS[lang]];

  return (
    // key={lang} : force le remontage complet au changement de langue. Indispensable
    // car SplitText (effet machine à écrire) remplace les nœuds texte de React par des
    // <span> ; sans remontage, React met à jour des nœuds détachés et le texte reste
    // figé dans l'ancienne langue. (La page « À propos » n'a pas ce souci : pas de SplitText.)
    <div key={lang} ref={rootRef} className="flex flex-col">
      {/* ===== 1. HERO ===== */}
      <section className="fullbleed relative">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[80vh] bg-gradient-trajectory" />
        <div className="container-page">
          <div className="relative">
            <span className="vrail vrail-l" data-line-in="y" />
            <span className="vrail vrail-r" data-line-in="y" />

            {/* Trait du HAUT : ferme le cadre et le sépare de la navbar */}
            <div className="hline" data-line-in="x" />
            <div className="flex items-center justify-between gap-4 px-5 py-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted">
              <span data-type-in>{hero.kicker}</span>
              <span data-in="r" className="hidden sm:inline">Alexandre Lebegue — 2026</span>
            </div>
            <div className="hline" data-line-in="x" />

            <div className="overflow-hidden px-6 py-16 md:px-12 md:py-28">
              <h1 data-type-in className="font-heading font-semibold uppercase tracking-tight leading-[0.98] text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
                {hero.titleLead}
                <span className="gradient-text">{hero.titleHighlight}</span>
                {hero.titleTail}
              </h1>
              <div data-line-in="x" className="hline mt-10 max-w-sm" />
              <p data-type-in className="mt-8 max-w-2xl text-lg text-muted">{hero.subtitle}</p>
              <div data-btn-in className="mt-10 flex flex-wrap">
                <Link to={hero.ctaPrimary.href} className="btn-primary no-underline">
                  {hero.ctaPrimary.label}
                  <span aria-hidden="true">→</span>
                </Link>
                <Link to={hero.ctaSecondary.href} className="btn-ghost -ml-px no-underline">
                  {hero.ctaSecondary.label}
                </Link>
              </div>
            </div>

            <div className="hline" data-line-in="x" />
            <div className="relative grid grid-cols-1 sm:grid-cols-3">
              <span className="vrail hidden sm:block" style={{ left: '33.3333%' }} data-line-in="y" />
              <span className="vrail hidden sm:block" style={{ left: '66.6666%' }} data-line-in="y" />
              {hero.reassurance.map((item, i) => (
                <React.Fragment key={item}>
                  {i > 0 && <div className="hline sm:hidden" data-line-in="x" />}
                  <div data-in="l" className="px-5 py-5">
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted">{`0${i + 1}`}</span>
                    <p className="mt-2 text-sm text-ink">{item}</p>
                  </div>
                </React.Fragment>
              ))}
            </div>
            {/* Trait du BAS : ferme le cadre (largeur conteneur) */}
            <div className="hline" data-line-in="x" />
          </div>
        </div>
      </section>

      {/* ===== 2. MARQUEE (gros texte, MÊME largeur que les cadres : fullbleed > container-page) ===== */}
      <div className="fullbleed">
        <div className="container-page">
          <div className="overflow-hidden border-x border-b border-line">
            <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap py-4">
              {marquee.map((k, i) => (
                <span key={`${k}-${i}`} className="inline-flex items-center gap-8 font-heading text-xl font-semibold uppercase tracking-tight text-ink/20 md:text-2xl">
                  {k}
                  <span className="text-ink/30">/</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===== 3. SERVICES ===== */}
      <section className="fullbleed relative">
        <div className="container-page">
          <div className="relative">
            <span className="vrail vrail-l" data-draw="y" />
            <span className="vrail vrail-r" data-draw="y" />

            <div className="flex items-center justify-between gap-4 px-5 py-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted">
              <span data-type>{'// '}{t({ fr: 'CE QUE JE PROPOSE', en: 'WHAT I OFFER' })}</span>
              <span data-r>{`0${offers.length}`} {t({ fr: 'OFFRES', en: 'OFFERS' })}</span>
            </div>

            {offers.map((o, i) => (
              <div key={o.number} data-cascade>
                <div className="hline" data-draw="x" />
                <OfferRow offer={o} flip={i % 2 === 1} />
              </div>
            ))}
          </div>
        </div>
        <div className="hline" data-draw="x" />
      </section>

      {/* ===== 4. RÉALISATIONS ===== */}
      <section className="fullbleed relative bg-surface">
        <div className="container-page">
          <div className="relative bg-paper">
            <span className="vrail vrail-l" data-draw="y" />
            <span className="vrail vrail-r" data-draw="y" />

            <div className="flex items-center justify-between gap-4 px-5 py-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted">
              <span data-type>{'// '}{projects.eyebrow}</span>
              <span data-r className="inline-flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping bg-ink opacity-50" />
                  <span className="relative inline-flex h-2 w-2 bg-ink" />
                </span>
                GITHUB · LIVE
              </span>
            </div>
            <div className="hline" data-draw="x" />

            <div className="overflow-hidden px-6 py-12 md:px-10 md:py-16">
              <div data-draw="x" className="hline mb-6 max-w-[64px]" />
              <h2 data-type className="font-heading text-3xl font-semibold uppercase tracking-tight md:text-5xl">{projects.title}</h2>
              <p data-type className="mt-6 max-w-2xl text-muted">{projects.passion}</p>
              <p data-type className="mt-3 max-w-2xl text-sm text-muted">{projects.liveNote}</p>
            </div>

            {/* ── Produits phares en production (Launchforge, KuryLabs) ── */}
            <div className="hline" data-draw="x" />
            <div className="px-6 py-12 md:px-10 md:py-16">
              <div className="flex items-center justify-between gap-4 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted">
                <span data-type>{'// '}{featuredProducts.eyebrow}</span>
                <span data-r>{String(featuredProducts.items.length).padStart(2, '0')} {t({ fr: 'PRODUITS', en: 'PRODUCTS' })}</span>
              </div>
              <h3 data-type className="mt-5 font-heading text-2xl font-semibold uppercase tracking-tight md:text-3xl">{featuredProducts.title}</h3>
              <p data-type className="mt-3 max-w-2xl text-sm text-muted">{featuredProducts.intro}</p>
              <div data-btn className="mt-8 grid gap-6 md:grid-cols-2">
                {featuredProducts.items.map((product) => (
                  <ProductCard key={product.name} product={product} />
                ))}
              </div>
            </div>

            <div className="hline" data-draw="x" />
            <div data-cascade className="grid sm:grid-cols-2 lg:grid-cols-3">
              {loading
                ? [0, 1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-44 animate-pulse bg-surface" />
                  ))
                : shownProjects.map((project) => (
                    <Link
                      key={project.id}
                      to={`/projects?repo=${project.name}`}
                      className="group relative flex flex-col overflow-hidden p-6 no-underline transition-colors duration-200 hover:bg-surface"
                    >
                      <span className="vrail vrail-l hidden sm:block" data-draw="y" />
                      <div className="hline absolute left-0 top-0" data-draw="x" />
                      <div className="flex items-center justify-between">
                        <h3 className="font-heading text-lg font-semibold uppercase tracking-tight text-ink">{project.name}</h3>
                        <span aria-hidden="true" className="font-mono text-muted transition-transform duration-200 group-hover:translate-x-1">→</span>
                      </div>
                      <p className="mt-3 line-clamp-3 flex-1 text-sm text-muted">{project.description}</p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span key={tech} className="tech-tag">{tech}</span>
                        ))}
                        {project.language && !project.technologies.includes(project.language) && (
                          <span className="tech-tag">{project.language}</span>
                        )}
                      </div>
                    </Link>
                  ))}
            </div>

            <div className="hline" data-draw="x" />
            <div data-btn className="overflow-hidden p-6 md:px-10">
              <Link to={projects.cta.href} className="btn-ghost no-underline">
                {projects.cta.label}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="hline" data-draw="x" />
      </section>

      {/* ===== 5. CTA FINAL ===== */}
      <section className="fullbleed">
        <div className="container-page py-16 md:py-24">
          <div data-cascade className="relative overflow-hidden px-6 py-16 text-center md:px-12 md:py-24">
            {/* Orbites animées en arrière-plan (« mettons-le en orbite ») */}
            <OrbitField className="pointer-events-none absolute inset-0 h-full w-full" />

            <span className="vrail vrail-l" data-draw="y" />
            <span className="vrail vrail-r" data-draw="y" />
            <div className="hline absolute left-0 top-0" data-draw="x" />
            <div className="hline absolute bottom-0 left-0" data-draw="x" />

            <div className="relative z-10">
              <h2 data-type className="mx-auto max-w-3xl font-heading text-3xl font-semibold uppercase tracking-tight md:text-5xl">{finalCta.title}</h2>
              <p data-type className="mx-auto mt-8 max-w-2xl text-muted">{finalCta.subtitle}</p>
              <div data-btn className="mt-10 flex justify-center">
                <Link to={finalCta.cta.href} className="btn-primary no-underline">
                  {finalCta.cta.label}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
