# Offre 03 — Formation & conseil IA

> Studio **Alexandre Lebegue** — *vibe engineer*. Ton premium, direct, concret. Aucun faux temoignage, aucune metrique inventee : on ne montre que du vrai.

Cette offre s'adresse aux **equipes et entreprises** qui veulent integrer l'IA dans leur quotidien sans perdre le controle des couts ni la maitrise de leurs donnees. Elle combine **formation pratique** (prise en main des outils, best practices de prompting et d'agents) et **conseil strategique** (optimisation des couts, gouvernance, securite des donnees sensibles).

---

## Objet TypeScript bilingue — pret a coller

Le type `Lang` (`'fr' | 'en'`) est defini dans `src/i18n/index.tsx` et consomme via `t(dict)`. Cet objet respecte ce contrat.

```ts
import type { Lang } from '../i18n';

export const SERVICE_FORMATION_COPY: Record<
  Lang,
  {
    number: string;
    title: string;
    promise: string;
    description: string;
    /** Puces du contenu de la formation/conseil, numerotees 01..05 a l'affichage. */
    content: { label: string; text: string }[];
    /** Preuve concrete, sans temoignage fabrique. */
    proof: { label: string; text: string };
    cta: { label: string; href: string };
  }
> = {
  fr: {
    number: '03',
    title: 'Formation & conseil IA',
    promise: 'Rendez votre equipe autonome sur l’IA — vite, proprement, sans exploser vos couts.',
    description:
      'Un accompagnement concret pour passer de l’experimentation a un usage maitrise de l’IA en entreprise. On installe les bons reflexes, les bons outils et les bons garde-fous : votre equipe gagne en vitesse, vous gardez le controle des depenses et la maitrise de vos donnees sensibles.',
    content: [
      {
        label: 'Prise en main des outils IA',
        text: 'Choix et configuration des assistants et plateformes adaptes a vos usages, mise en main guidee, integration dans vos flux de travail existants.',
      },
      {
        label: 'Best practices prompt & agents',
        text: 'Methodes de prompting fiables, conception d’agents et d’automatisations utiles, patterns reproductibles pour des resultats constants plutot qu’aleatoires.',
      },
      {
        label: 'Optimisation & reduction des couts IA',
        text: 'Choix des modeles selon l’usage, mise en cache, dimensionnement des contextes et suivi de la consommation : payer pour ce qui apporte de la valeur, pas plus.',
      },
      {
        label: 'Gouvernance & securite des donnees sensibles',
        text: 'Regles claires sur ce qui peut — ou non — etre envoye a un modele, anonymisation, choix d’hebergement et bonnes pratiques pour travailler sur des donnees confidentielles.',
      },
      {
        label: 'Montee en competence de l’equipe',
        text: 'Transfert de savoir-faire durable : ateliers pratiques, supports de reference et accompagnement pour que vos equipes restent autonomes apres la mission.',
      },
    ],
    proof: {
      label: 'Deja realise',
      text: 'J’ai forme l’equipe de Kurybees a l’utilisation de l’IA : best practices d’usage, reduction des couts lies a l’IA et bonnes pratiques dans un environnement ou les donnees sont sensibles.',
    },
    cta: {
      label: 'Former mon equipe',
      href: 'mailto:alexandrelebegue12@gmail.com?subject=Formation%20%26%20conseil%20IA',
    },
  },
  en: {
    number: '03',
    title: 'AI training & consulting',
    promise: 'Make your team AI-autonomous — fast, clean, and without blowing up your costs.',
    description:
      'Hands-on support to move from experimentation to a controlled use of AI inside your company. We install the right habits, the right tools and the right guardrails: your team moves faster, you keep spending under control and your sensitive data under your command.',
    content: [
      {
        label: 'Getting started with AI tools',
        text: 'Selecting and configuring the assistants and platforms that fit your use cases, guided onboarding, and integration into your existing workflows.',
      },
      {
        label: 'Prompt & agent best practices',
        text: 'Reliable prompting methods, useful agents and automations, and reproducible patterns for consistent results instead of random ones.',
      },
      {
        label: 'AI cost optimization & reduction',
        text: 'Picking the right model for each task, caching, sizing contexts and tracking usage: you pay for what creates value, nothing more.',
      },
      {
        label: 'Governance & sensitive-data security',
        text: 'Clear rules on what may — or may not — be sent to a model, anonymization, hosting choices and best practices for working with confidential data.',
      },
      {
        label: 'Team skill ramp-up',
        text: 'Lasting knowledge transfer: practical workshops, reference materials and support so your teams stay autonomous long after the engagement ends.',
      },
    ],
    proof: {
      label: 'Already delivered',
      text: 'I trained the Kurybees team on using AI: usage best practices, reducing AI-related costs, and good practices in an environment where data is sensitive.',
    },
    cta: {
      label: 'Train my team',
      href: 'mailto:alexandrelebegue12@gmail.com?subject=AI%20training%20%26%20consulting',
    },
  },
};
```

---

## Note — structure visuelle & intention d'animation

- **Layout** : section pleine largeur, en-tete avec gros chiffre `03` en filigrane a gauche, titre + promesse a droite ; la `description` en paragraphe d'accroche dessous.
- **Contenu** : grille de 5 cartes numerotees `01 → 05` (label en gras, texte en dessous), 2 colonnes desktop / 1 colonne mobile, ligne fine entre les cartes pour le cote « ingenieur sobre ».
- **Animation** : *reveal* en cascade des cartes au scroll (decalage ~80 ms, `IntersectionObserver`), leger *parallax* sur le chiffre `03`, et compteur `01..05` qui s'incremente a l'apparition.
- **Preuve** : bloc distinct mis en avant (badge « Deja realise / Already delivered » + mention Kurybees) — affirmation vraie, sans temoignage cite.
- **CTA** : bouton plein contraste ouvrant un mail pre-rempli vers `alexandrelebegue12@gmail.com`, micro-hover (translation + glow discret) coherent avec le ton futuriste sobre.
