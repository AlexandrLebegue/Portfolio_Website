import type { Lang } from '../i18n';
import type { ContactCopy } from './types';
import { CONTACT_EMAIL } from './services';

/**
 * Section "Contact" (bilingue FR/EN) : inviter a lancer un projet.
 * Source : plans/content/about-contact.md.
 *
 * `CONTACT_EMAIL` est reexporte ici par commodite, mais reste defini une
 * seule fois dans `./services` (etait duplique dans les fichiers de copie).
 */
export { CONTACT_EMAIL };

export const CONTACT_COPY: Record<Lang, ContactCopy> = {
  fr: {
    kicker: 'Contact',
    title: 'Un projet à propulser ?',
    subtitle:
      "Décrivez votre idée en quelques lignes. Je vous dis vite si je peux la livrer, comment, et en combien de temps.",
    channels: {
      email: {
        label: 'Email',
        value: CONTACT_EMAIL,
        href: `mailto:${CONTACT_EMAIL}`,
      },
      linkedin: {
        label: 'LinkedIn',
        value: 'Alexandre Lebegue',
        href: 'https://www.linkedin.com/in/alexandre-lebegue-6a3718151/',
      },
      github: {
        label: 'GitHub',
        value: 'AlexandrLebegue',
        href: 'https://github.com/AlexandrLebegue',
      },
    },
    cta: {
      heading: 'Lancez votre projet en 1 clic',
      button: 'Démarrer la conversation',
      reassurance: 'Réponse rapide, en personne. Pas de bot, pas de formulaire interminable.',
    },
  },
  en: {
    kicker: 'Contact',
    title: 'Got a project to launch?',
    subtitle:
      "Tell me your idea in a few lines. I'll quickly let you know if I can build it, how, and how fast.",
    channels: {
      email: {
        label: 'Email',
        value: CONTACT_EMAIL,
        href: `mailto:${CONTACT_EMAIL}`,
      },
      linkedin: {
        label: 'LinkedIn',
        value: 'Alexandre Lebegue',
        href: 'https://www.linkedin.com/in/alexandre-lebegue-6a3718151/',
      },
      github: {
        label: 'GitHub',
        value: 'AlexandrLebegue',
        href: 'https://github.com/AlexandrLebegue',
      },
    },
    cta: {
      heading: 'Launch your project in one click',
      button: 'Start the conversation',
      reassurance: 'A fast, personal reply. No bot, no endless form.',
    },
  },
};

/**
 * Helper mailto generique vers `CONTACT_EMAIL`, optionnellement avec un sujet.
 * Pour le brouillon "en 1 clic" complet (sujet + corps de l'offre 02),
 * utiliser `buildProjectMailto` depuis `./services`.
 *
 * Encodage : espaces -> %20 (URLSearchParams encode l'espace en "+", remplace).
 */
export function buildMailto(subject?: string): string {
  if (!subject) {
    return `mailto:${CONTACT_EMAIL}`;
  }
  const params = new URLSearchParams({ subject });
  return `mailto:${CONTACT_EMAIL}?${params.toString().replace(/\+/g, '%20')}`;
}
