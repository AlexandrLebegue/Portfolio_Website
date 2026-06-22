import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProjectData, GitHubRepo, CommitStats } from '../../services/github';
import CommitChart from '../../components/CommitChart/CommitChart';
import AISummary from '../../components/AISummary/AISummary';
import { MetaIcon, IconKind } from '../../components/Icons/MetaIcon';
import { Reveal } from '../../animations';
import { useLang } from '../../i18n';

const extractTechnologies = (topics: string[]): string[] => {
  const nonTechTopics = ['featured', 'portfolio', 'project'];
  return topics.filter(topic => !nonTechTopics.includes(topic));
};

const checkLogoExists = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url);
    const text = await response.text();
    return response.ok && !text.includes("404: Not Found");
  } catch { return false; }
};

const findExistingLogoUrl = async (repoName: string): Promise<string | null> => {
  const branches = ['master', 'main'];
  for (const branch of branches) {
    const logoUrl = `https://raw.githubusercontent.com/AlexandrLebegue/${repoName}/${branch}/logo.png`;
    if (await checkLogoExists(logoUrl)) return logoUrl;
  }
  return null;
};

interface ProjectImageContentProps {
  repoName: string;
  name: string;
}

// Logo distant si disponible, sinon initiale MONOCHROME dans une pastille carree
// bordee (plus d'emoji geant) — coherent avec la vignette de la grille projets.
const ProjectImageContent: React.FC<ProjectImageContentProps> = ({ repoName, name }) => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoLoaded, setLogoLoaded] = useState(false);

  useEffect(() => {
    const findLogo = async () => {
      const existingLogoUrl = await findExistingLogoUrl(repoName);
      setLogoUrl(existingLogoUrl);
      setLogoLoaded(!!existingLogoUrl);
    };
    findLogo();
  }, [repoName]);

  const initial = (repoName.replace(/[^a-zA-Z0-9]/g, '').charAt(0) || '•').toUpperCase();

  return logoLoaded && logoUrl ? (
    <img src={logoUrl} alt={name} className="w-full h-full object-contain" />
  ) : (
    <span
      aria-hidden="true"
      className="flex h-20 w-20 items-center justify-center border border-line bg-paper
        font-heading text-4xl font-bold text-ink"
    >
      {initial}
    </span>
  );
};

const ProjectDetail: React.FC = () => {
  const { projectName } = useParams<{ projectName: string }>();
  const navigate = useNavigate();
  const { t } = useLang();

  // ── Dictionnaire de libellés bilingue (inline) ──
  const labels = {
    back: t({ fr: 'Retour aux projets', en: 'Back to projects' }),
    loading: t({ fr: 'Chargement du projet…', en: 'Loading project…' }),
    notFound: t({ fr: 'Projet non trouvé', en: 'Project not found' }),
    errorLoad: t({ fr: 'Erreur lors du chargement du projet', en: 'Error loading project' }),
    missingName: t({ fr: 'Nom du projet manquant', en: 'Missing project name' }),
    noDescription: t({ fr: 'Aucune description disponible', en: 'No description available' }),
    github: t({ fr: 'Voir sur GitHub', en: 'View on GitHub' }),
    demo: t({ fr: 'Démo en direct', en: 'Live demo' }),
    kicker: t({ fr: 'Projet', en: 'Project' }),
    overview: t({ fr: 'Aperçu', en: 'Overview' }),
    statsKicker: t({ fr: 'Statistiques', en: 'Statistics' }),
    statsTitle: t({ fr: 'Le projet en chiffres', en: 'The project in numbers' }),
    commitsKicker: t({ fr: 'Historique', en: 'History' }),
    commitsTitle: t({ fr: 'Activité des commits', en: 'Commit activity' }),
    stars: t({ fr: 'Étoiles', en: 'Stars' }),
    forks: t({ fr: 'Forks', en: 'Forks' }),
    watchers: t({ fr: 'Observateurs', en: 'Watchers' }),
    issues: t({ fr: 'Issues ouvertes', en: 'Open issues' }),
  };

  const [project, setProject] = useState<GitHubRepo | null>(null);
  const [readmeContent, setReadmeContent] = useState<string | null>(null);
  const [commitStats, setCommitStats] = useState<CommitStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!projectName) {
        setError(labels.missingName);
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const projectData = await fetchProjectData(projectName);
        setProject(projectData.repo);
        setReadmeContent(projectData.readmeContent);
        setCommitStats(projectData.commitStats);
      } catch (err) {
        console.error('Error fetching project data:', err);
        setError(labels.errorLoad);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectName]);

  const handleBackClick = () => navigate('/projects');

  // ── Bouton retour réutilisable (style ghost clair) ──
  const BackButton = () => (
    <button
      onClick={handleBackClick}
      className="btn-ghost group inline-flex items-center gap-2 px-5 py-2.5 text-sm"
    >
      <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
      {labels.back}
    </button>
  );

  if (loading) {
    return (
      <div className="container-page section">
        <BackButton />
        <p className="mt-10 text-center text-muted dark:text-text-secondary-dark">
          {labels.loading}
        </p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="container-page section">
        <BackButton />
        <p className="mt-10 text-center text-error">{error || labels.notFound}</p>
      </div>
    );
  }

  const technologies = extractTechnologies(project.topics);

  const stats: Array<{ icon: IconKind; value: number; label: string }> = [
    { icon: 'star', value: project.stargazers_count, label: labels.stars },
    { icon: 'fork', value: project.forks_count, label: labels.forks },
    { icon: 'eye', value: project.watchers_count, label: labels.watchers },
    { icon: 'bug', value: project.open_issues_count, label: labels.issues },
  ];

  return (
    <div className="container-page py-12 md:py-16 flex flex-col gap-16">
      {/* Back Button */}
      <Reveal y={16}>
        <BackButton />
      </Reveal>

      {/* Project Header */}
      <header className="grid grid-cols-1 md:grid-cols-[minmax(0,420px)_1fr] gap-10 items-center">
        {/* Image / Logo — cadre carre « plan technique » : etiquette mono + reperes d'angle */}
        <Reveal>
          <div className="relative w-full aspect-[16/10] max-w-[420px] border border-line bg-surface overflow-hidden">
            {/* Etiquette d'identification facon plan */}
            <span className="absolute left-3 top-3 z-10 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted">
              {labels.kicker} · {project.name}
            </span>
            {/* Reperes d'angle (coins du cadre) */}
            <span aria-hidden="true" className="pointer-events-none absolute right-3 top-3 h-2.5 w-2.5 border-r border-t border-line" />
            <span aria-hidden="true" className="pointer-events-none absolute bottom-3 left-3 h-2.5 w-2.5 border-b border-l border-line" />
            <div className="relative z-0 flex h-full w-full items-center justify-center p-8">
              <ProjectImageContent repoName={project.name} name={project.name} />
            </div>
          </div>
        </Reveal>

        {/* Info */}
        <div className="flex flex-col gap-5">
          <Reveal y={20}>
            <span className="kicker">{labels.kicker}</span>
          </Reveal>

          <Reveal y={24} delay={0.05}>
            <h1 className="font-heading font-bold text-ink dark:text-text-primary-dark
              text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05]">
              <span className="gradient-text">{project.name}</span>
            </h1>
          </Reveal>

          <Reveal y={20} delay={0.1}>
            <p className="text-lg leading-relaxed text-muted dark:text-text-secondary-dark max-w-2xl">
              {project.description || labels.noDescription}
            </p>
          </Reveal>

          {(technologies.length > 0 || project.language) && (
            <Reveal y={16} delay={0.15}>
              <div className="flex flex-wrap gap-2">
                {technologies.map(tech => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
                {project.language && !technologies.includes(project.language) && (
                  <span key={project.language} className="tech-tag">{project.language}</span>
                )}
              </div>
            </Reveal>
          )}

          <Reveal y={16} delay={0.2}>
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={project.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary no-underline"
              >
                {labels.github} <span aria-hidden="true">↗</span>
              </a>
              {project.homepage && (
                <a
                  href={project.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost no-underline"
                >
                  {labels.demo} <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </header>

      {/* AI Summary */}
      <section>
        <Reveal y={20}>
          <span className="kicker mb-4">{labels.overview}</span>
        </Reveal>
        <Reveal y={28} delay={0.05}>
          <AISummary repo={project} readmeContent={readmeContent} />
        </Reveal>
      </section>

      {/* Stats Section */}
      <section>
        <Reveal y={20}>
          <span className="kicker">{labels.statsKicker}</span>
        </Reveal>
        <Reveal y={24} delay={0.05}>
          <h2 className="section-title">{labels.statsTitle}</h2>
        </Reveal>

        {/* Grille connectee (cellules attachees, separateurs traces par les bordures) */}
        <Reveal y={24} delay={0.05}>
          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 border-l border-t border-line">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-start gap-3 border-b border-r border-line p-6
                  transition-colors duration-200 hover:bg-surface"
              >
                <MetaIcon kind={stat.icon} className="h-5 w-5 text-muted" />
                <div className="font-heading font-bold text-3xl md:text-4xl text-ink dark:text-text-primary-dark">
                  {stat.value}
                </div>
                <div className="font-mono text-xs uppercase tracking-[0.14em] text-muted dark:text-text-secondary-dark">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Commit Chart */}
      {commitStats.length > 0 && (
        <section>
          <Reveal y={20}>
            <span className="kicker">{labels.commitsKicker}</span>
          </Reveal>
          <Reveal y={24} delay={0.05}>
            <h2 className="section-title">{labels.commitsTitle}</h2>
          </Reveal>
          <Reveal y={28} delay={0.1}>
            <div className="card p-6 md:p-8 mt-8">
              <CommitChart data={commitStats} />
            </div>
          </Reveal>
        </section>
      )}
    </div>
  );
};

export default ProjectDetail;
