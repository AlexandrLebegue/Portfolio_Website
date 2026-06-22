import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '../../utils/cn';
import useGitHubRepos from '../../hooks/useGitHubRepos';
import { MetaIcon } from '../../components/Icons/MetaIcon';
import { useLang } from '../../i18n';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// Dictionnaire inline bilingue (FR / EN) — page REALISATIONS / WORK.
// On reste autonome : pas de fichier de traduction externe.
// ─────────────────────────────────────────────────────────────────────────────
const copy = {
  kicker: { fr: 'RÉALISATIONS', en: 'WORK' },
  title: { fr: 'Ce que je construis', en: 'What I build' },
  // L'intro reprend la passion de construire + la note de synchro auto.
  intro: {
    fr:
      "Ce qui me fait avancer, c’est créer, construire et exposer mes projets. " +
      "Chaque dépôt ci-dessous est une preuve concrète de ce que je fabrique — et de ce que je peux construire pour vous.",
    en:
      "What drives me is creating, building and showcasing my projects. " +
      "Each repository below is concrete proof of what I make — and of what I can build for you.",
  },
  syncNote: {
    fr: 'Synchronisé automatiquement avec mon GitHub, toujours à jour.',
    en: 'Automatically synced with my GitHub, always up to date.',
  },
  all: { fr: 'Tous', en: 'All' },
  showForks: { fr: 'Afficher les forks', en: 'Show forks' },
  hideForks: { fr: 'Masquer les forks', en: 'Hide forks' },
  loading: { fr: 'Chargement des projets…', en: 'Loading projects…' },
  errorTitle: {
    fr: 'Erreur lors du chargement des projets.',
    en: 'Failed to load projects.',
  },
  errorFallback: {
    fr: 'Affichage des données de remplacement.',
    en: 'Showing fallback data.',
  },
  empty: {
    fr: 'Aucun projet ne correspond à ce filtre.',
    en: 'No project matches this filter.',
  },
  noDescription: { fr: 'Pas de description fournie.', en: 'No description provided.' },
  github: { fr: 'Code', en: 'Code' },
  demo: { fr: 'Démo', en: 'Live demo' },
  countLabel: { fr: 'projets live', en: 'live projects' },
} as const;

// Topics purement "marketing" a ne pas afficher comme techno.
const NON_TECH_TOPICS = ['featured', 'portfolio', 'project'];

const extractTechnologies = (topics: string[]): string[] =>
  topics.filter((topic) => !NON_TECH_TOPICS.includes(topic));

// ─────────────────────────────────────────────────────────────────────────────
// Chargement distant du logo (logique conservee depuis la version d'origine).
// On teste master puis main, et on detecte le faux 200 "404: Not Found" de raw.
// ─────────────────────────────────────────────────────────────────────────────
const checkLogoExists = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url);
    const text = await response.text();
    return response.ok && !text.includes('404: Not Found');
  } catch {
    return false;
  }
};

const findExistingLogoUrl = async (repoName: string): Promise<string | null> => {
  const branches = ['master', 'main'];
  for (const branch of branches) {
    const logoUrl = `https://raw.githubusercontent.com/AlexandrLebegue/${repoName}/${branch}/logo.png`;
    // eslint-disable-next-line no-await-in-loop
    if (await checkLogoExists(logoUrl)) return logoUrl;
  }
  return null;
};

// ─────────────────────────────────────────────────────────────────────────────
// Vignette de projet : logo distant si disponible, sinon fallback SOBRE
// (initiale monochrome dans une pastille claire — plus d'emoji geant).
// ─────────────────────────────────────────────────────────────────────────────
interface ProjectThumbProps {
  repoName: string;
}

const ProjectThumb: React.FC<ProjectThumbProps> = ({ repoName }) => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    findExistingLogoUrl(repoName).then((url) => {
      if (active) setLogoUrl(url);
    });
    return () => {
      active = false;
    };
  }, [repoName]);

  const initial = (repoName.replace(/[^a-zA-Z0-9]/g, '').charAt(0) || '•').toUpperCase();

  // Vignette CARREE plate, bordee comme un cadre de plan technique (pas d'arrondi).
  return (
    <div className="relative flex h-[150px] items-center justify-center overflow-hidden border border-line bg-surface">
      {logoUrl ? (
        <img
          src={logoUrl}
          alt={repoName}
          className="h-full w-full object-contain p-6"
          loading="lazy"
        />
      ) : (
        <span
          aria-hidden="true"
          className="flex h-14 w-14 items-center justify-center border border-line bg-paper
            font-heading text-2xl font-bold text-ink"
        >
          {initial}
        </span>
      )}
    </div>
  );
};

const Projects: React.FC = () => {
  const { t, lang } = useLang();
  const navigate = useNavigate();

  const [filter, setFilter] = useState<string | null>(null);
  const [showForks, setShowForks] = useState<boolean>(false);

  // Hook conserve tel quel : fetch live + exclusion des forks pilotee par l'option.
  const { repos, loading, error } = useGitHubRepos({ excludeForks: !showForks });

  const locale = lang === 'fr' ? 'fr-FR' : 'en-US';

  const processedRepos = repos.map((repo) => ({
    id: repo.id,
    name: repo.name,
    description: repo.description || t(copy.noDescription),
    technologies: extractTechnologies(repo.topics),
    language: repo.language,
    githubUrl: repo.html_url,
    demoUrl: repo.homepage,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    updatedAt: new Date(repo.updated_at),
  }));

  const allTechnologies = processedRepos.flatMap((project) => project.technologies);
  const uniqueTechnologies = [...new Set(allTechnologies)].sort();
  const languages = processedRepos
    .map((project) => project.language)
    .filter(
      (language): language is string =>
        language !== null && !allTechnologies.includes(language),
    );
  const uniqueLanguages = [...new Set(languages)];
  const allFilterOptions = [...uniqueTechnologies, ...uniqueLanguages];

  const filteredProjects = filter
    ? processedRepos.filter(
        (project) =>
          project.technologies.includes(filter) || project.language === filter,
      )
    : processedRepos;

  const handleProjectClick = (projectName: string) => {
    navigate(`/projects/${projectName}`);
  };

  // ── Lignes de structure « plan technique » : chaque [data-draw] se TRACE au
  // scroll (scaleX/scaleY 0→1), comme sur la home. On rejoue l'effet quand la
  // grille change (filtre / forks / arrivee des donnees) : sinon les nouvelles
  // cellules resteraient a scale 0, donc invisibles.
  const gridRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const root = gridRef.current;
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

    // La grille se peuple en asynchrone (fetch GitHub) : on recalcule les
    // positions des declencheurs une fois le layout pose.
    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => {
      window.clearTimeout(refreshId);
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, filter, showForks, loading, filteredProjects.length]);

  // Classe commune des pills de filtre (carre mono, actif en encre pleine).
  const pillClass = (active: boolean) =>
    cn(
      'px-4 py-1.5 font-mono text-xs uppercase tracking-[0.12em] transition-colors duration-200',
      'border focus:outline-none focus:ring-1 focus:ring-ink focus:ring-offset-2 focus:ring-offset-paper',
      active
        ? 'bg-ink text-inverse border-ink'
        : 'bg-paper text-muted border-line hover:border-ink hover:text-ink',
    );

  return (
    // ── Tout est ENCADRE comme la home : un seul cadre « plan technique » qui se
    //    trace (rails lateraux + lignes horizontales) autour de l'en-tete, des
    //    filtres et de la grille. fullbleed pour coller a la largeur des cadres home.
    <div className="fullbleed py-8 md:py-12">
      <div className="container-page">
        <div ref={gridRef} className="relative">
          <span className="vrail vrail-l" data-draw="y" />
          <span className="vrail vrail-r" data-draw="y" />

          {/* ── Bandeau de tete (kicker + signature), comme le hero home ── */}
          <div className="hline" data-draw="x" />
          <div className="flex items-center justify-between gap-4 px-5 py-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted">
            <span>{t(copy.kicker)}</span>
            <span className="hidden sm:inline">Alexandre Lebegue — 2026</span>
          </div>
          <div className="hline" data-draw="x" />

          {/* ── En-tete : titre + intro + note de synchro ── */}
          <div className="px-6 py-12 md:px-10 md:py-14">
            <h1 className="font-heading text-5xl font-bold tracking-tight md:text-6xl">
              <span className="gradient-text">{t(copy.title)}</span>
            </h1>
            <div className="hline mt-8 max-w-sm" data-draw="x" />
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted dark:text-text-secondary-dark">
              {t(copy.intro)}
            </p>
            <p className="mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-muted dark:text-text-secondary-dark">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-pulse-slow bg-ink opacity-70" />
                <span className="relative inline-flex h-2 w-2 bg-ink" />
              </span>
              {t(copy.syncNote)}
            </p>
          </div>
          <div className="hline" data-draw="x" />

          {/* ── Filtres ── */}
          <div className="flex flex-wrap items-center gap-3 px-6 py-6 md:px-10">
            <button
              type="button"
              onClick={() => setFilter(null)}
              className={pillClass(filter === null)}
            >
              {t(copy.all)}
            </button>

            {allFilterOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setFilter(option)}
                className={pillClass(filter === option)}
              >
                {option}
              </button>
            ))}

            <span className="mx-1 hidden h-5 w-px bg-line sm:block" />

            <button
              type="button"
              onClick={() => setShowForks((prev) => !prev)}
              className={pillClass(showForks)}
            >
              {showForks ? t(copy.hideForks) : t(copy.showForks)}
            </button>
          </div>
          <div className="hline" data-draw="x" />

          {/* ── Etats / Grille (toujours DANS le cadre) ── */}
          {loading ? (
            <div className="px-6 py-12 md:px-10">
              <p className="text-muted dark:text-text-secondary-dark">{t(copy.loading)}</p>
            </div>
          ) : error ? (
            <div className="px-6 py-10 md:px-10">
              <p className="mb-1 font-medium text-error">{t(copy.errorTitle)}</p>
              <p className="text-sm text-muted dark:text-text-secondary-dark">
                {t(copy.errorFallback)}
              </p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="px-6 py-12 md:px-10">
              <p className="text-muted dark:text-text-secondary-dark">{t(copy.empty)}</p>
            </div>
          ) : (
            <>
              {/* Bandeau meta : compteur live + statut GitHub (echo de la home) */}
              <div className="flex items-center justify-between gap-4 px-5 py-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted">
                <span>
                  {String(filteredProjects.length).padStart(2, '0')} {t(copy.countLabel)}
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping bg-ink opacity-50" />
                    <span className="relative inline-flex h-2 w-2 bg-ink" />
                  </span>
                  GITHUB · LIVE
                </span>
              </div>
              <div className="hline" data-draw="x" />

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <article
                key={project.id}
                onClick={() => handleProjectClick(project.name)}
                className="group relative flex cursor-pointer flex-col p-6 transition-colors duration-200 hover:bg-surface"
              >
                {/* Separateurs internes traces : rail gauche (colonnes) + ligne haute (rangees) */}
                <span className="vrail vrail-l hidden sm:block" data-draw="y" />
                <div className="hline absolute left-0 top-0" data-draw="x" />

                {/* Numero + fleche */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-[0.14em] text-muted">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-mono text-muted transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </div>

                <div className="mt-4">
                  <ProjectThumb repoName={project.name} />
                </div>

                <h3 className="mt-5 font-heading text-lg font-semibold uppercase tracking-tight text-ink">
                  {project.name}
                </h3>

                <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>

                {/* Tags techno */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                  {project.language &&
                    !project.technologies.includes(project.language) && (
                      <span className="tech-tag">{project.language}</span>
                    )}
                </div>

                {/* Meta (etoiles / forks / date) — pousse les liens en bas */}
                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-line pt-4 text-xs text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <MetaIcon kind="star" />
                    {project.stars}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MetaIcon kind="fork" />
                    {project.forks}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MetaIcon kind="clock" />
                    {project.updatedAt.toLocaleDateString(locale)}
                  </span>
                </div>

                {/* Liens */}
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs uppercase tracking-[0.12em]">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-ink no-underline hover:underline"
                  >
                    {t(copy.github)} <span aria-hidden="true">↗</span>
                  </a>
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-ink no-underline hover:underline"
                    >
                      {t(copy.demo)} <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              </article>
                ))}
              </div>
            </>
          )}

          {/* Ligne de fermeture du cadre */}
          <div className="hline" data-draw="x" />
        </div>
      </div>
    </div>
  );
};

export default Projects;
