import React from 'react';
import { CONTACT_COPY } from '../../content/contact';
import { buildProjectMailto } from '../../content/services';
import { Reveal, Parallax } from '../../animations';
import { useLang } from '../../i18n';

// ─────────────────────────────────────────────────────────────────────────────
// Page Contact — theme clair spatial (reference sunmetalon.com)
//
// Fond blanc / surface tres claire, enorme whitespace, titre XXL en
// Space Grotesk, accroche degrade « propulsion », cartes numerotees 01/02/03
// (gros chiffre filigrane mono en parallaxe douce) pour les canaux de contact,
// puis un bloc CTA « demande en 1 clic » qui ouvre un brouillon d'email
// pre-rempli (buildProjectMailto) avec reassurance « reponse rapide ».
//
// Tout le texte visible vient de CONTACT_COPY via useLang().t (bilingue FR/EN).
// Identite spatiale SOBRE : aucun fond sombre, aucun champ d'etoiles.
// ─────────────────────────────────────────────────────────────────────────────

// Micro-copie d'interface non couverte par CONTACT_COPY (bilingue).
const UI_COPY = {
  fr: {
    channelsLabel: 'Mes canaux',
    open: 'Ouvrir',
    fastReply: 'Reponse rapide',
  },
  en: {
    channelsLabel: 'My channels',
    open: 'Open',
    fastReply: 'Fast reply',
  },
};

// Petite fleche « trajectoire » reutilisable pour les liens / CTA.
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

  // Ordre d'affichage des canaux + numero filigrane associe.
  const channels = [
    { index: '01', ...c.channels.email, external: false },
    { index: '02', ...c.channels.linkedin, external: true },
    { index: '03', ...c.channels.github, external: true },
  ];

  // Lien mailto pre-rempli (sujet + corps de l'offre 02) pour le CTA « 1 clic ».
  const projectMailto = buildProjectMailto(lang);

  return (
    <section className="section">
      {/* ── En-tete : kicker mono + titre XXL + sous-titre invitant ── */}
      <Reveal>
        <p className="kicker">{c.kicker}</p>
        <h1 className="mt-6 font-heading font-bold tracking-tight text-ink dark:text-text-primary-dark text-4xl sm:text-5xl md:text-6xl max-w-4xl">
          {c.title}
        </h1>
        <p className="mt-7 max-w-2xl text-lg md:text-xl leading-relaxed text-muted dark:text-text-secondary-dark">
          {c.subtitle}
        </p>
      </Reveal>

      {/* ── Canaux de contact : cartes claires numerotees 01 / 02 / 03 ── */}
      <div className="mt-16 md:mt-20">
        <Reveal>
          <p className="font-code text-xs uppercase tracking-[0.18em] text-muted dark:text-text-secondary-dark">
            {ui.channelsLabel}
          </p>
        </Reveal>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {channels.map((channel, i) => (
            <Reveal key={channel.label} delay={i * 0.08}>
              <a
                href={channel.href}
                {...(channel.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="card lift group relative block h-full overflow-hidden p-7 sm:p-8"
              >
                {/* Gros chiffre filigrane mono, en parallaxe douce */}
                <Parallax
                  speed={0.12}
                  className="pointer-events-none absolute -right-2 -top-4 select-none"
                >
                  <span className="font-code font-bold leading-none text-6xl sm:text-7xl text-ink/[0.04] dark:text-text-primary-dark/[0.06]">
                    {channel.index}
                  </span>
                </Parallax>

                <div className="relative">
                  <h2 className="font-heading font-bold text-xl text-ink dark:text-text-primary-dark">
                    {channel.label}
                  </h2>
                  <p className="mt-2 font-code text-sm text-muted dark:text-text-secondary-dark break-words">
                    {channel.value}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary dark:text-primary-300 transition-transform duration-200 ease-spatial group-hover:gap-3">
                    {ui.open}
                    <ArrowIcon className="h-4 w-4 transition-transform duration-200 ease-spatial group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ── Bloc CTA « demande en 1 clic » ── */}
      <div className="mt-16 md:mt-24">
        <Reveal>
          <div className="card relative overflow-hidden p-8 sm:p-12 md:p-16">
            {/* Halo « trajectoire » tres discret en arriere-plan (clair) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-trajectory opacity-70"
            />

            <div className="relative max-w-2xl">
              <h2 className="font-heading font-bold tracking-tight text-3xl sm:text-4xl md:text-5xl">
                <span className="gradient-text">{c.cta.heading}</span>
              </h2>

              <p className="mt-6 text-lg leading-relaxed text-muted dark:text-text-secondary-dark">
                {c.cta.reassurance}
              </p>

              <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                <a href={projectMailto} className="btn-primary">
                  {c.cta.button}
                  <ArrowIcon className="h-4 w-4" />
                </a>

                {/* Reassurance « reponse rapide » avec point pulsant accent */}
                <span className="inline-flex items-center gap-2 font-code text-xs uppercase tracking-[0.18em] text-muted dark:text-text-secondary-dark">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                  </span>
                  {ui.fastReply}
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
