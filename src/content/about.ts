import type { Lang } from '../i18n';
import type { AboutCopy } from './types';

/**
 * Section "A propos" recadree comme PREUVE DE CONFIANCE (bilingue FR/EN).
 * Source : plans/content/about-contact.md.
 *
 * Toutes les affirmations sont vraies (parcours reel chez Sodern : viseurs
 * d'etoiles en C, simulateur de voute celeste en C++, usine logicielle / CI,
 * travail actuel sur les LLM). Aucun client, metrique ou temoignage invente.
 */
export const ABOUT_COPY: Record<Lang, AboutCopy> = {
  fr: {
    kicker: 'À propos',
    title: "La rigueur de l'embarqué, la vitesse de l'IA.",
    lead:
      "Je suis Alexandre Lebegue. J'ai construit des systèmes où un bug n'est pas une option — aujourd'hui, j'applique cette discipline à livrer vos produits en temps record.",
    paragraphs: [
      "Ingénieur logiciel embarqué chez Sodern, j'ai développé des viseurs d'étoiles en C dans des environnements contraints, un simulateur de voûte céleste en C++, et lancé l'usine logicielle d'intégration continue. Des systèmes critiques, destinés à l'espace, où la précision et la fiabilité ne se négocient pas.",
      "Cette exigence ne disparaît pas quand on accélère. Je conçois et livre des produits avec l'IA comme co-pilote : moins de temps perdu, des fondations solides, du code qu'on peut faire évoluer. La vitesse n'est utile que si ce qu'on livre tient.",
    ],
    proofs: [
      {
        label: 'Systèmes critiques',
        description:
          "Un parcours dans l'aérospatial (Sodern) où l'erreur coûte cher. La même rigueur appliquée à chacun de vos livrables.",
      },
      {
        label: 'Livraison accélérée par IA',
        description:
          "J'utilise les LLM pour aller vite sans sacrifier la qualité : prototypes en jours, pas en mois, sur des bases maintenables.",
      },
      {
        label: "Du concret, rien d'inventé",
        description:
          "Pas de faux témoignages, pas de métriques gonflées. Je montre du vrai : des projets réels, du code réel, des résultats vérifiables.",
      },
    ],
    passion: {
      title: 'Ce qui me fait avancer',
      text:
        "J'aime créer, construire et exposer ce que je fais. Chaque projet est une occasion de repousser une limite — et de le montrer, ouvertement.",
    },
    signature: "L'ingénierie au service de la vitesse. Pas l'inverse.",
  },
  en: {
    kicker: 'About',
    title: 'Embedded-grade rigor, AI-grade speed.',
    lead:
      "I'm Alexandre Lebegue. I've built systems where a bug isn't an option — now I bring that discipline to shipping your products in record time.",
    paragraphs: [
      "As an embedded software engineer at Sodern, I developed star trackers in C within tightly constrained environments, a celestial-vault simulator in C++, and launched the continuous-integration software factory. Mission-critical, space-bound systems where precision and reliability aren't up for debate.",
      "That standard doesn't vanish when you move fast. I design and ship products with AI as a co-pilot: less wasted time, solid foundations, code you can actually build on. Speed only matters if what you ship holds up.",
    ],
    proofs: [
      {
        label: 'Mission-critical systems',
        description:
          "An aerospace background (Sodern) where mistakes are expensive. The same rigor, applied to everything I deliver for you.",
      },
      {
        label: 'AI-accelerated delivery',
        description:
          "I use LLMs to move fast without trading away quality: prototypes in days, not months, on maintainable foundations.",
      },
      {
        label: 'Real work, nothing faked',
        description:
          "No fake testimonials, no inflated numbers. I show the real thing: real projects, real code, results you can verify.",
      },
    ],
    passion: {
      title: 'What drives me',
      text:
        "I love to create, build, and put my work out in the open. Every project is a chance to push a limit — and to show it, transparently.",
    },
    signature: 'Engineering in service of speed. Not the other way around.',
  },
};
