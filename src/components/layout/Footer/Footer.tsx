import React from 'react';
import { Link } from 'react-router-dom';
import { useLang, type Lang } from '../../../i18n';
import { Reveal } from '../../../animations';

/**
 * Dictionnaire bilingue inline, resolu via useLang().t.
 * Chaque entree expose ses variantes { fr, en }.
 */
const DICT = {
  brand: { fr: 'Alexandre Lebegue', en: 'Alexandre Lebegue' },
  tagline: {
    fr: 'Studio IA — je fais décoller vos produits et vos solutions IA sur mesure.',
    en: 'AI Studio — I get your products and tailor-made AI solutions off the ground.',
  },
  navTitle: { fr: 'Navigation', en: 'Navigation' },
  navHome: { fr: 'Accueil', en: 'Home' },
  navServices: { fr: 'Services', en: 'Services' },
  navProjects: { fr: 'Projets', en: 'Projects' },
  navAbout: { fr: 'À propos', en: 'About' },
  navContact: { fr: 'Contact', en: 'Contact' },
  contactTitle: { fr: 'Contact', en: 'Contact' },
  rights: { fr: 'Tous droits réservés.', en: 'All rights reserved.' },
} satisfies Record<string, Record<Lang, string>>;

/** Liens de navigation interne du footer (avec la nouvelle entree Services). */
const NAV_LINKS = [
  { to: '/', key: 'navHome' as const },
  { to: '/services', key: 'navServices' as const },
  { to: '/projects', key: 'navProjects' as const },
  { to: '/about', key: 'navAbout' as const },
  { to: '/contact', key: 'navContact' as const },
];

const Footer: React.FC = () => {
  const { t } = useLang();
  const currentYear = new Date().getFullYear();

  /** Style commun des liens : neutre discret, vire vers l'accent au survol. */
  const linkClass =
    'text-muted hover:text-primary transition-colors duration-200 no-underline w-fit';

  return (
    <footer className="border-t border-line bg-paper mt-24">
      <div className="container-page py-20 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-12">
          {/* Marque + tagline */}
          <Reveal className="relative" delay={0}>
            <div className="relative flex flex-col gap-5">
              <h3 className="font-heading text-3xl md:text-4xl tracking-tight text-ink">
                {t(DICT.brand)}
              </h3>
              <p className="max-w-xs text-muted leading-relaxed">
                {t(DICT.tagline)}
              </p>
              <div className="flex gap-3 pt-2">
                <a
                  href="https://github.com/AlexandrLebegue"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface text-muted transition-colors duration-200 hover:text-primary hover:border-primary"
                >
                  <i className="not-italic">&#xf09b;</i>
                </a>
                <a
                  href="https://www.linkedin.com/in/alexandre-lebegue-6a3718151/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface text-muted transition-colors duration-200 hover:text-primary hover:border-primary"
                >
                  <i className="not-italic">&#xf08c;</i>
                </a>
              </div>
            </div>
          </Reveal>

          {/* Navigation */}
          <Reveal className="relative" delay={0.08}>
            <div className="relative flex flex-col gap-4">
              <span className="kicker text-primary">{t(DICT.navTitle)}</span>
              <nav className="flex flex-col gap-3">
                {NAV_LINKS.map(({ to, key }) => (
                  <Link key={to} to={to} className={linkClass}>
                    {t(DICT[key])}
                  </Link>
                ))}
              </nav>
            </div>
          </Reveal>

          {/* Contact */}
          <Reveal className="relative" delay={0.16}>
            <div className="relative flex flex-col gap-4">
              <span className="kicker text-primary">{t(DICT.contactTitle)}</span>
              <a
                href="mailto:alexandrelebegue12@gmail.com"
                className={`flex items-center gap-2 ${linkClass}`}
              >
                <span aria-hidden="true">&#9993;</span>
                alexandrelebegue12@gmail.com
              </a>
              <a
                href="https://github.com/AlexandrLebegue"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/alexandre-lebegue-6a3718151/"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                LinkedIn
              </a>
            </div>
          </Reveal>
        </div>

        {/* Copyright */}
        <div className="mt-20 pt-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted">
          <span>
            &copy; {currentYear} {t(DICT.brand)}. {t(DICT.rights)}
          </span>
          <span className="font-code text-xs uppercase tracking-wider">
            <span className="gradient-text">Propulsion</span> · {currentYear}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
