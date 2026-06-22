import type { Lang } from '../i18n';
import type {
  NavCopy,
  HeroCopy,
  ServicesTeaserCopy,
  ProjectsTeaserCopy,
  FeaturedProductsCopy,
  FinalCtaCopy,
} from './types';

/**
 * Copie de la page d'accueil (bilingue FR/EN).
 *
 * Ligne editoriale : le CLIENT est le sujet (« votre produit », « votre
 * entreprise »), jamais « mon entreprise ». Ton professionnel, optimise SEO
 * (developpement produit, solutions IA sur mesure, MVP, IA locale...), avec de
 * tres legeres touches spatiales (decoller, orbite, trajectoire, propulsion).
 *
 * Exports : NAV_COPY, HERO_COPY, SERVICES_TEASER_COPY,
 * PROJECTS_TEASER_COPY, FEATURED_PRODUCTS, FINAL_CTA_COPY.
 */

/* -------------------------------------------------------------------------- */
/* 1. Navigation + CTA global                                                 */
/* -------------------------------------------------------------------------- */

export const NAV_COPY: Record<Lang, NavCopy> = {
  fr: {
    links: [
      { label: 'Accueil', href: '/' },
      { label: 'Services', href: '/services' },
      { label: 'Projets', href: '/projects' },
      { label: 'À propos', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    cta: { label: 'Lancer mon projet', href: '/contact' },
  },
  en: {
    links: [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/services' },
      { label: 'Projects', href: '/projects' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    cta: { label: 'Start my project', href: '/contact' },
  },
};

/* -------------------------------------------------------------------------- */
/* 2. Hero                                                                     */
/* -------------------------------------------------------------------------- */

export const HERO_COPY: Record<Lang, HeroCopy> = {
  fr: {
    kicker: 'STUDIO IA · DÉVELOPPEMENT PRODUIT',
    titleLead: 'Votre produit ',
    titleHighlight: 'prêt à décoller',
    titleTail: ', en temps record.',
    subtitle:
      'Une idée à concrétiser, une entreprise à faire grandir ? Je conçois et je livre vos produits web et vos solutions IA sur mesure à vitesse record — avec la rigueur d’un ingénieur formé dans l’embarqué et l’aérospatial.',
    ctaPrimary: { label: 'Lancer mon projet', href: '/contact' },
    ctaSecondary: { label: 'Voir mes réalisations', href: '/projects' },
    reassurance: [
      'Vous échangez en direct avec le fondateur, réponse rapide',
      'Vous restez seul propriétaire de votre code et de vos données',
      'Une rigueur d’ingénieur, du prototype à la mise en production',
    ],
  },
  en: {
    kicker: 'AI STUDIO · PRODUCT DEVELOPMENT',
    titleLead: 'Your product ',
    titleHighlight: 'ready for liftoff',
    titleTail: ', in record time.',
    subtitle:
      'An idea to ship, a business to grow? I design and deliver your web products and tailor-made AI solutions at record speed — with the rigor of an engineer trained in embedded and aerospace systems.',
    ctaPrimary: { label: 'Start my project', href: '/contact' },
    ctaSecondary: { label: 'See my work', href: '/projects' },
    reassurance: [
      'You talk straight to the founder, fast replies',
      'You stay the sole owner of your code and your data',
      'Engineering rigor, from prototype to production',
    ],
  },
};

/* -------------------------------------------------------------------------- */
/* 3. Teaser Services                                                         */
/* -------------------------------------------------------------------------- */

export const SERVICES_TEASER_COPY: Record<Lang, ServicesTeaserCopy> = {
  fr: {
    eyebrow: 'CE QUE JE FAIS POUR VOUS',
    title: 'Trois façons de faire décoller votre projet',
    intro:
      'De la première idée au produit en production, ou de l’IA branchée sur vos outils existants : une seule expertise, trois trajectoires pour vous emmener plus loin.',
    cards: [
      { index: '01', title: 'Solutions IA sur mesure' },
      { index: '02', title: 'Développement produit rapide' },
      { index: '03', title: 'Formation & conseil IA' },
    ],
    cta: { label: 'Voir les services', href: '/services' },
  },
  en: {
    eyebrow: 'WHAT I DO FOR YOU',
    title: 'Three ways to get your project off the ground',
    intro:
      'From the first idea to a product in production, or AI wired into your existing tools: one expertise, three trajectories to take you further.',
    cards: [
      { index: '01', title: 'Tailor-made AI solutions' },
      { index: '02', title: 'Rapid product development' },
      { index: '03', title: 'AI training & consulting' },
    ],
    cta: { label: 'See the services', href: '/services' },
  },
};

/* -------------------------------------------------------------------------- */
/* 4. Teaser Projets                                                          */
/* -------------------------------------------------------------------------- */

export const PROJECTS_TEASER_COPY: Record<Lang, ProjectsTeaserCopy> = {
  fr: {
    eyebrow: 'CE QUE JE CONSTRUIS',
    title: 'Avant tout, je construis',
    passion:
      'Ce qui me fait avancer, c’est créer, construire et mettre en orbite des produits réels. Chaque ligne de code est un terrain d’expérimentation où je repousse mes limites — et où votre projet trouve un développeur qui aime vraiment ce qu’il fabrique.',
    liveNote:
      'Cette vitrine se synchronise en direct avec mon GitHub : ce que vous voyez est toujours à jour, jamais une capture figée.',
    cta: { label: 'Explorer mes projets', href: '/projects' },
  },
  en: {
    eyebrow: 'WHAT I BUILD',
    title: 'Above all, I build',
    passion:
      'What drives me is creating, building and putting real products into orbit. Every line of code is a place to experiment and push my limits — and where your project finds a developer who genuinely loves what he ships.',
    liveNote:
      'This showcase syncs live with my GitHub: what you see is always up to date, never a frozen snapshot.',
    cta: { label: 'Explore my projects', href: '/projects' },
  },
};

/* -------------------------------------------------------------------------- */
/* 5. Produits phares en production (Launchforge, KuryLabs)                   */
/* -------------------------------------------------------------------------- */

export const FEATURED_PRODUCTS: Record<Lang, FeaturedProductsCopy> = {
  fr: {
    eyebrow: 'EN PRODUCTION',
    title: 'Des produits livrés, en ligne',
    intro:
      'Pas des maquettes : des produits réels, en production, que vous pouvez ouvrir et essayer dès maintenant.',
    items: [
      {
        kind: 'Produit phare',
        name: 'Launchforge',
        tagline:
          'La plateforme qui pilote vos réseaux sociaux avec un agent IA et donne de la traction à votre startup.',
        host: 'launchforge.alexandre-lebegue.com',
        href: 'https://launchforge.alexandre-lebegue.com',
        linkLabel: 'Découvrir Launchforge',
        image: '/launchforge-preview.png',
        tags: ['Agent IA', 'Réseaux sociaux', 'SaaS'],
      },
      {
        kind: 'Produit client',
        name: 'KuryLabs',
        tagline:
          'L’outil IA conçu pour Kurybees : spécifier, comparer et simuler la cellule batterie idéale en quelques minutes.',
        host: 'kurylabs.kurybees.com',
        href: 'https://kurylabs.kurybees.com',
        linkLabel: 'Voir KuryLabs en ligne',
        image: '/kurylabs-preview.png',
        tags: ['IA', 'Full-stack', 'Cloud'],
      },
    ],
  },
  en: {
    eyebrow: 'IN PRODUCTION',
    title: 'Shipped products, live online',
    intro:
      'Not mockups: real products, in production, that you can open and try right now.',
    items: [
      {
        kind: 'Flagship product',
        name: 'Launchforge',
        tagline:
          'The platform that runs your social media with an AI agent and builds real traction for your startup.',
        host: 'launchforge.alexandre-lebegue.com',
        href: 'https://launchforge.alexandre-lebegue.com',
        linkLabel: 'Discover Launchforge',
        image: '/launchforge-preview.png',
        tags: ['AI agent', 'Social media', 'SaaS'],
      },
      {
        kind: 'Client product',
        name: 'KuryLabs',
        tagline:
          'The AI tool built for Kurybees: spec, compare and simulate the ideal battery cell in minutes.',
        host: 'kurylabs.kurybees.com',
        href: 'https://kurylabs.kurybees.com',
        linkLabel: 'See KuryLabs live',
        image: '/kurylabs-preview.png',
        tags: ['AI', 'Full-stack', 'Cloud'],
      },
    ],
  },
};

/* -------------------------------------------------------------------------- */
/* 6. Bande CTA finale                                                        */
/* -------------------------------------------------------------------------- */

export const FINAL_CTA_COPY: Record<Lang, FinalCtaCopy> = {
  fr: {
    title: 'Un projet en tête ? Mettons-le en orbite.',
    subtitle:
      'Décrivez-moi votre idée : je reviens vers vous rapidement avec une approche claire, un plan d’action concret et une première estimation de délai.',
    cta: { label: 'Lancer mon projet', href: '/contact' },
  },
  en: {
    title: 'Got a project in mind? Let’s put it into orbit.',
    subtitle:
      'Tell me about your idea: I get back to you quickly with a clear approach, a concrete action plan and a first timeline estimate.',
    cta: { label: 'Start my project', href: '/contact' },
  },
};
