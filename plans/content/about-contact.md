# Contenu — À propos & Contact

Copies bilingues (FR/ER) prêtes à coller pour les sections **À propos** (preuve de confiance) et **Contact** du site `Alexandre Lebegue — vibe engineer`.

Le type `Lang` est défini dans `src/i18n/index.tsx` :

```ts
import type { Lang } from '../i18n';
```

Toutes les affirmations ci-dessous sont **vraies** : parcours réel chez Sodern (viseurs d'étoiles en C, simulateur de voûte céleste en C++, lancement de l'usine logicielle / intégration continue, travail actuel sur les LLM pour l'aide au développement). Aucun client, aucune métrique et aucun témoignage inventé.

---

## 1) ABOUT_COPY — « À propos » comme preuve de confiance

```ts
import type { Lang } from '../i18n';

/**
 * Section "À propos" recadrée comme PREUVE DE CONFIANCE.
 * Pas un CV : la raison pour laquelle on peut me confier un produit.
 * - kicker        : micro-titre mono / kicker au-dessus du titre
 * - title         : promesse principale
 * - lead          : accroche forte, 1 à 2 phrases
 * - paragraphs    : 2 paragraphes courts (rigueur embarquée -> livraison IA)
 * - proofs        : 3 piliers de confiance (label + description), cartes 01/02/03
 * - passion       : le moteur : créer, construire, exposer
 * - signature     : phrase de clôture, ton studio
 */
export const ABOUT_COPY: Record<
  Lang,
  {
    kicker: string;
    title: string;
    lead: string;
    paragraphs: string[];
    proofs: { label: string; description: string }[];
    passion: { title: string; text: string };
    signature: string;
  }
> = {
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
        label: 'Du concret, rien d'inventé',
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
```

**Structure visuelle & animation.** Layout en deux temps : un bloc d'en-tête (kicker mono + `title` large + `lead`) en `reveal` `fadeUp` séquencé, puis les 2 `paragraphs` en colonne aérée. Les 3 `proofs` deviennent des **cartes numérotées 01 / 02 / 03** en grille (reveal en cascade, `delay` incrémental ~120 ms, légère élévation au hover). Le bloc `passion` se détache sur fond accent discret (parallax léger ou bordure primary). `signature` ferme la section en gros texte, fade simple. Intention : sobre, premium, démonstratif — on prouve, on ne se vante pas.

---

## 2) CONTACT_COPY — Lancer un projet

```ts
import type { Lang } from '../i18n';

/**
 * Section "Contact" : inviter à lancer un projet, pas juste "écrire un mail".
 * - kicker     : micro-titre mono
 * - title      : titre invitant
 * - subtitle   : sous-titre, invitation concrète à démarrer
 * - channels   : canaux de contact (email, LinkedIn, GitHub)
 * - cta        : bloc "demande en 1 clic" (bouton + réassurance réponse rapide)
 */
export const CONTACT_COPY: Record<
  Lang,
  {
    kicker: string;
    title: string;
    subtitle: string;
    channels: {
      email: { label: string; value: string; href: string };
      linkedin: { label: string; value: string; href: string };
      github: { label: string; value: string; href: string };
    };
    cta: {
      heading: string;
      button: string;
      reassurance: string;
    };
  }
> = {
  fr: {
    kicker: 'Contact',
    title: 'Un projet à propulser ?',
    subtitle:
      "Décrivez votre idée en quelques lignes. Je vous dis vite si je peux la livrer, comment, et en combien de temps.",
    channels: {
      email: {
        label: 'Email',
        value: 'alexandrelebegue12@gmail.com',
        href: 'mailto:alexandrelebegue12@gmail.com',
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
        value: 'alexandrelebegue12@gmail.com',
        href: 'mailto:alexandrelebegue12@gmail.com',
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
```

**Structure visuelle & animation.** Deux colonnes : à gauche le bloc texte (`kicker` mono + `title` + `subtitle`) et la liste des `channels` (icône + label + valeur, lien hover primary, fadeLeft en cascade) ; à droite le **bloc CTA "1 clic"** en carte accent — `heading`, gros `button` primary (le `href` du bouton pointe vers `channels.email.href`, scale/glow au hover) et `reassurance` en petit texte rassurant juste dessous. Reveal `fadeUp` séquencé à l'entrée, le bouton arrivant en dernier pour capter l'œil. Ton chaleureux mais pro : on invite à démarrer, pas seulement à « écrire ».
