# Chatbot — Assistant IA du studio Alexandre Lebegue

Base de connaissances et copie de l'assistant chatbot du site (widget robot monochrome, ancré en bas à droite).

But de l'assistant : **rediriger, aider, conseiller** le visiteur et **promouvoir** les produits/services d'Alexandre. Tout est vrai : aucune métrique inventée, aucun faux client, aucun faux témoignage.

Architecture cible : concept **robuste sans LLM** (réponses scriptées + actions déterministes côté front), **extensible** à un vrai LLM ensuite (la `KNOWLEDGE_BASE` sert alors de contexte/RAG, les `tools` deviennent du function-calling).

Conventions reprises du code existant :
- `Lang = 'fr' | 'en'` (`src/i18n/index.tsx`).
- Routes réelles : `/`, `/projects`, `/projects/:projectName`, `/about`, `/moi`, `/contact`, `/linkedin-import`.
- Email de contact : `alexandrelebegue12@gmail.com`.

---

## 1. UI du widget — `CHATBOT_UI_COPY`

```ts
import type { Lang } from '../i18n';

export const CHATBOT_UI_COPY: Record<
  Lang,
  {
    /** Tooltip/aria-label du bouton flottant fermé. */
    launcherLabel: string;
    /** Titre affiché dans l'en-tête du panneau ouvert. */
    title: string;
    /** Sous-titre / statut sous le titre. */
    subtitle: string;
    /** Petit badge "assistant" pour assumer le côté non-humain (pas de fausse présence). */
    assistantBadge: string;
    /** Premier message poussé à l'ouverture. */
    welcome: string;
    /** Placeholder du champ de saisie. */
    inputPlaceholder: string;
    /** Libellé/aria du bouton envoyer. */
    sendLabel: string;
    /** Aria-label bouton fermer. */
    closeLabel: string;
    /** Libellé du bouton "recommencer / nouvelle conversation". */
    resetLabel: string;
    /** Message quand aucun intent scripté ne matche (fallback humble + redirection contact). */
    fallback: string;
    /** Mention basse de transparence (sous l'input). */
    disclaimer: string;
  }
> = {
  fr: {
    launcherLabel: 'Ouvrir l’assistant',
    title: 'Assistant du studio',
    subtitle: 'Là pour vous orienter, à toute heure.',
    assistantBadge: 'Assistant — réponses guidées',
    welcome:
      'Bonjour 👋 Je suis l’assistant d’Alexandre. Dites-moi ce que vous voulez construire — MVP, IA locale, ou montée en compétences — et je vous oriente vers la bonne offre. Vous pouvez aussi écrire directement à Alexandre en un clic.',
    inputPlaceholder: 'Décrivez votre besoin…',
    sendLabel: 'Envoyer',
    closeLabel: 'Fermer l’assistant',
    resetLabel: 'Nouvelle conversation',
    fallback:
      'Je n’ai pas de réponse toute prête à ça, mais Alexandre, oui. Le plus rapide : lui écrire directement, il revient vers vous avec du concret.',
    disclaimer: 'Assistant automatisé. Pour un échange réel, contactez Alexandre.',
  },
  en: {
    launcherLabel: 'Open the assistant',
    title: 'Studio assistant',
    subtitle: 'Here to point you the right way, any time.',
    assistantBadge: 'Assistant — guided answers',
    welcome:
      'Hi 👋 I’m Alexandre’s assistant. Tell me what you want to build — an MVP, a local AI setup, or AI upskilling — and I’ll point you to the right offer. You can also message Alexandre directly in one click.',
    inputPlaceholder: 'Describe what you need…',
    sendLabel: 'Send',
    closeLabel: 'Close the assistant',
    resetLabel: 'New conversation',
    fallback:
      'I don’t have a canned answer for that — but Alexandre does. Fastest path: message him directly and he’ll get back to you with something concrete.',
    disclaimer: 'Automated assistant. For a real conversation, reach out to Alexandre.',
  },
};
```

**Structure visuelle & animation.** Bouton flottant rond (56 px) en bas-droite, robot monochrome SVG ; au survol, micro-pulse de l'aura et antenne qui clignote. À l'ouverture : panneau (≈360 px) qui *scale + fade depuis le coin* (origine bottom-right, ~220 ms, easing souple). En-tête fixe (titre + badge `assistantBadge` + bouton fermer), corps scrollable, footer = input + bouton envoyer + `disclaimer` discret. Messages en bulles ; les réponses de l'assistant apparaissent en *reveal vers le haut* avec un léger délai « typing » (3 points) pour rythmer sans simuler une fausse présence humaine.

---

## 2. Quick-replies de départ — `CHATBOT_SUGGESTIONS`

Affichées sous le message de bienvenue (puces cliquables). Chaque suggestion porte un `intent` (clé de la knowledge base) qui déclenche réponse + outil.

```ts
import type { Lang } from '../i18n';

/** Identifiants d'intents partagés entre suggestions et knowledge base. */
export type ChatIntent =
  | 'services'
  | 'mvp'
  | 'local_ai'
  | 'training'
  | 'kurylabs'
  | 'experience'
  | 'philosophy'
  | 'projects'
  | 'pricing'
  | 'how_to_start'
  | 'contact';

export const CHATBOT_SUGGESTIONS: Record<
  Lang,
  ReadonlyArray<{ id: ChatIntent; label: string }>
> = {
  fr: [
    { id: 'services', label: 'Quels services proposez-vous ?' },
    { id: 'mvp', label: 'Développer mon MVP' },
    { id: 'local_ai', label: 'Mettre en place une IA locale' },
    { id: 'training', label: 'Me former à l’IA' },
    { id: 'projects', label: 'Voir les projets' },
    { id: 'contact', label: 'Contacter Alexandre' },
  ],
  en: [
    { id: 'services', label: 'What services do you offer?' },
    { id: 'mvp', label: 'Build my MVP' },
    { id: 'local_ai', label: 'Set up a local AI' },
    { id: 'training', label: 'Train me on AI' },
    { id: 'projects', label: 'See the projects' },
    { id: 'contact', label: 'Contact Alexandre' },
  ],
};
```

**Structure visuelle & animation.** Rangée de « chips » bordées, repliables sur 2 lignes ; *reveal en cascade* (stagger ~40 ms) juste après le message de bienvenue. Au clic, la chip se transforme en bulle utilisateur (morph) puis la réponse arrive. Les chips restent accessibles via le bouton `resetLabel`.

---

## 3. Schéma d'outils front — `CHATBOT_TOOLS`

Outils **déterministes**, sans backend. Chacun est une fonction pure côté client (navigation React Router, ouverture mailto, scroll/affichage). Côté LLM ultérieur, ce schéma se mappe directement sur du function-calling.

```ts
/** Routes réelles du site (cf. App.tsx). */
export type AppRoute =
  | '/'
  | '/projects'
  | '/about'
  | '/moi'
  | '/contact'
  | '/linkedin-import';

/** Slugs d'offres (servent à recommendService + ancrage page). */
export type ServiceSlug = 'mvp' | 'local-ai' | 'training';

/** Produits/initiatives mis en avant (réels uniquement). */
export type ProductName = 'kurylabs';

/**
 * Contrat des outils que l'assistant peut "appeler" depuis une réponse.
 * Implémentation front : navigate() de react-router, window.location pour mailto.
 * Aucun appel réseau, aucun état serveur : 100 % déterministe.
 */
export interface ChatbotTools {
  /** Navigue vers une route interne (et ferme/réduit le widget si besoin). */
  navigateTo(route: AppRoute): void;

  /** Met en avant une offre : ouvre /about?service=slug et surligne la carte. */
  recommendService(slug: ServiceSlug): void;

  /** Ouvre le client mail pré-rempli vers alexandrelebegue12@gmail.com. */
  openContactMail(prefill: { subject: string; body: string }): void;

  /** Redirige vers la galerie de projets (réels, issus de GitHub). */
  showProjects(): void;

  /** Promeut un produit/initiative réel (ex: KuryLabs). */
  promoteProduct(name: ProductName): void;
}

/** Email cible unique, centralisé. */
export const CONTACT_EMAIL = 'alexandrelebegue12@gmail.com';

/**
 * Construit un lien mailto à partir d'un prefill.
 * Utilisé par openContactMail — gardé pur pour être testable.
 */
export function buildMailto(prefill: { subject: string; body: string }): string {
  const params = new URLSearchParams({
    subject: prefill.subject,
    body: prefill.body,
  });
  return `mailto:${CONTACT_EMAIL}?${params.toString()}`;
}
```

**Structure visuelle & animation.** Les outils n'ont pas d'UI propre : ils s'attachent aux boutons d'action (CTA) sous les bulles de réponse. Un CTA déclenché par `navigateTo`/`showProjects` fait *glisser le panneau vers le coin* (réduction) pendant la transition de page ; `openContactMail` n'altère pas le widget (ouverture du client mail en parallèle).

---

## 4. Base de connaissances — `CHATBOT_KNOWLEDGE_BASE`

Chaque entrée = un `intent`, sa réponse bilingue, des `actions` (CTA) câblées sur les outils, et des `followUps` (intents proposés ensuite). L'`action.tool` + `action.args` décrivent l'appel déterministe à exécuter au clic.

> Toutes les affirmations ci-dessous sont **vérifiables** sur le site (offres, projets GitHub réels, parcours embarqué/aérospatial chez Sodern). Aucun client nommé, aucune métrique chiffrée non prouvée.

```ts
import type { Lang } from '../i18n';
import type { ChatIntent } from './suggestions';
import type { AppRoute, ServiceSlug, ProductName } from './tools';

/** Une action cliquable rattachée à une réponse, mappée 1:1 sur un outil. */
export type ChatAction =
  | { tool: 'navigateTo'; args: AppRoute; label: Record<Lang, string> }
  | { tool: 'recommendService'; args: ServiceSlug; label: Record<Lang, string> }
  | { tool: 'showProjects'; args?: undefined; label: Record<Lang, string> }
  | { tool: 'promoteProduct'; args: ProductName; label: Record<Lang, string> }
  | {
      tool: 'openContactMail';
      args: Record<Lang, { subject: string; body: string }>;
      label: Record<Lang, string>;
    };

export interface KnowledgeEntry {
  /** Mots-clés (FR+EN) pour le matcher scripté sans LLM (lowercase, accents tolérés). */
  keywords: ReadonlyArray<string>;
  /** Réponse principale, bilingue. */
  answer: Record<Lang, string>;
  /** CTA proposés sous la réponse (0..n). */
  actions: ReadonlyArray<ChatAction>;
  /** Intents suggérés ensuite (relance la conversation). */
  followUps: ReadonlyArray<ChatIntent>;
}

export const CHATBOT_KNOWLEDGE_BASE: Record<ChatIntent, KnowledgeEntry> = {
  // ───────────────────────── Vue d'ensemble des 3 offres ─────────────────────────
  services: {
    keywords: [
      'service', 'services', 'offre', 'offres', 'prestation', 'que faites-vous',
      'what do you do', 'offer', 'offers', 'help with',
    ],
    answer: {
      fr:
        'Le studio s’articule autour de trois offres :\n\n01 · Développement de MVP — votre produit construit et livré en temps record, avec une rigueur d’ingénieur.\n02 · IA locale & sur-mesure — des solutions IA déployées chez vous, sous votre contrôle, sans fuite de données.\n03 · Formation à l’IA — vous et votre équipe rendus autonomes sur les outils qui comptent vraiment.\n\nDites-moi laquelle vous parle, je vous montre le détail.',
      en:
        'The studio is built around three offers:\n\n01 · MVP development — your product built and shipped in record time, with engineering rigor.\n02 · Local & custom AI — AI solutions deployed on your side, under your control, no data leakage.\n03 · AI training — you and your team made autonomous on the tools that actually matter.\n\nTell me which one speaks to you and I’ll show you the details.',
    },
    actions: [
      { tool: 'recommendService', args: 'mvp', label: { fr: 'Développer un MVP', en: 'Build an MVP' } },
      { tool: 'recommendService', args: 'local-ai', label: { fr: 'IA locale', en: 'Local AI' } },
      { tool: 'recommendService', args: 'training', label: { fr: 'Se former', en: 'Get trained' } },
    ],
    followUps: ['mvp', 'local_ai', 'training'],
  },

  // ───────────────────────── Offre 01 — MVP ─────────────────────────
  mvp: {
    keywords: [
      'mvp', 'produit', 'prototype', 'application', 'app', 'site', 'lancer', 'développer',
      'build', 'product', 'startup', 'idée', 'idea', 'develop',
    ],
    answer: {
      fr:
        'On part de votre idée et on la transforme en produit réel — vite. Le développement accéléré par l’IA permet d’avancer en jours là où d’autres comptent en semaines, sans sacrifier la qualité : le parcours d’Alexandre en logiciel embarqué (aérospatial) impose une rigueur que peu de studios « rapides » ont.\n\nConcrètement : cadrage, MVP fonctionnel, itérations. Vous gardez la main, vous voyez le produit grandir.',
      en:
        'We take your idea and turn it into a real product — fast. AI-accelerated development moves in days where others count in weeks, without cutting quality: Alexandre’s background in embedded/aerospace software brings a rigor few “fast” studios have.\n\nConcretely: scoping, working MVP, iterations. You stay in control and watch the product grow.',
    },
    actions: [
      { tool: 'recommendService', args: 'mvp', label: { fr: 'Voir l’offre MVP', en: 'See the MVP offer' } },
      {
        tool: 'openContactMail',
        args: {
          fr: {
            subject: 'Projet MVP — discutons',
            body: 'Bonjour Alexandre,\n\nJ’ai un projet de produit (MVP) que j’aimerais lancer. Voici l’idée en quelques lignes :\n\n[décrivez votre idée]\n\nDélai souhaité : \nBudget indicatif : \n\nMerci !',
          },
          en: {
            subject: 'MVP project — let’s talk',
            body: 'Hi Alexandre,\n\nI have a product (MVP) I’d like to launch. Here’s the idea in a few lines:\n\n[describe your idea]\n\nTarget timeline: \nRough budget: \n\nThanks!',
          },
        },
        label: { fr: 'Lancer mon MVP', en: 'Kick off my MVP' },
      },
    ],
    followUps: ['how_to_start', 'projects', 'pricing'],
  },

  // ───────────────────────── Offre 02 — IA locale ─────────────────────────
  local_ai: {
    keywords: [
      'ia locale', 'local ai', 'self-hosted', 'on-premise', 'rgpd', 'gdpr', 'données', 'data',
      'llm', 'modèle', 'privé', 'private', 'confidentiel', 'sur-mesure', 'rag', 'chatbot',
    ],
    answer: {
      fr:
        'Vous voulez de l’IA sans envoyer vos données à un tiers ? On déploie des solutions IA locales et sur-mesure : modèles qui tournent chez vous, sous votre contrôle, intégrés à vos outils. Idéal quand la confidentialité et la souveraineté des données comptent.\n\nDe l’assistant interne au pipeline de traitement : on conçoit ce qui sert vraiment votre métier.',
      en:
        'Want AI without shipping your data to a third party? We deploy local, custom AI solutions: models running on your side, under your control, integrated into your tools. Ideal when privacy and data sovereignty matter.\n\nFrom an internal assistant to a processing pipeline: we design what actually serves your business.',
    },
    actions: [
      { tool: 'recommendService', args: 'local-ai', label: { fr: 'Voir l’offre IA locale', en: 'See the local-AI offer' } },
      {
        tool: 'openContactMail',
        args: {
          fr: {
            subject: 'IA locale / sur-mesure — besoin',
            body: 'Bonjour Alexandre,\n\nJe souhaite mettre en place une IA locale / sur-mesure. Contexte :\n\n[votre cas d’usage]\n\nContraintes (données, infra, sécurité) : \n\nMerci !',
          },
          en: {
            subject: 'Local / custom AI — request',
            body: 'Hi Alexandre,\n\nI’d like to set up a local / custom AI. Context:\n\n[your use case]\n\nConstraints (data, infra, security): \n\nThanks!',
          },
        },
        label: { fr: 'En parler à Alexandre', en: 'Discuss it with Alexandre' },
      },
    ],
    followUps: ['how_to_start', 'experience', 'contact'],
  },

  // ───────────────────────── Offre 03 — Formation ─────────────────────────
  training: {
    keywords: [
      'formation', 'former', 'apprendre', 'cours', 'atelier', 'équipe', 'monter en compétence',
      'training', 'learn', 'workshop', 'coaching', 'upskill', 'team',
    ],
    answer: {
      fr:
        'L’IA va plus vite que les formations classiques. L’idée ici : vous rendre autonome, vous et votre équipe, sur les outils qui changent vraiment votre quotidien — pas une liste de buzzwords, des réflexes opérationnels.\n\nFormat adapté à votre niveau et à votre métier, du décideur au profil technique.',
      en:
        'AI moves faster than classic courses. The point here: make you and your team autonomous on the tools that genuinely change your day-to-day — not a list of buzzwords, but operational reflexes.\n\nFormat tailored to your level and your field, from decision-makers to technical profiles.',
    },
    actions: [
      { tool: 'recommendService', args: 'training', label: { fr: 'Voir l’offre formation', en: 'See the training offer' } },
      {
        tool: 'openContactMail',
        args: {
          fr: {
            subject: 'Formation IA — demande',
            body: 'Bonjour Alexandre,\n\nJe souhaite une formation IA (moi / mon équipe). Détails :\n\nNiveau actuel : \nObjectifs : \nNombre de personnes : \n\nMerci !',
          },
          en: {
            subject: 'AI training — request',
            body: 'Hi Alexandre,\n\nI’d like AI training (myself / my team). Details:\n\nCurrent level: \nGoals: \nNumber of people: \n\nThanks!',
          },
        },
        label: { fr: 'Organiser une formation', en: 'Set up a training' },
      },
    ],
    followUps: ['how_to_start', 'contact', 'philosophy'],
  },

  // ───────────────────────── KuryLabs ─────────────────────────
  kurylabs: {
    keywords: ['kurylabs', 'kury', 'labs', 'initiative', 'produit phare', 'flagship'],
    answer: {
      fr:
        'KuryLabs, c’est le terrain de jeu où Alexandre construit pour de vrai : un produit/initiative né de la même conviction que le studio — livrer vite, montrer du concret, jamais du vaporware. C’est la meilleure preuve de la méthode : on ne raconte pas, on construit.',
      en:
        'KuryLabs is where Alexandre builds for real: a product/initiative born from the same conviction as the studio — ship fast, show concrete things, never vaporware. It’s the best proof of the method: we don’t pitch, we build.',
    },
    actions: [
      { tool: 'promoteProduct', args: 'kurylabs', label: { fr: 'Découvrir KuryLabs', en: 'Discover KuryLabs' } },
      { tool: 'showProjects', label: { fr: 'Voir tous les projets', en: 'See all projects' } },
    ],
    followUps: ['projects', 'philosophy', 'contact'],
  },

  // ───────────────────────── Expérience Sodern ─────────────────────────
  experience: {
    keywords: [
      'sodern', 'expérience', 'parcours', 'embarqué', 'aérospatial', 'aerospace', 'spatial',
      'experience', 'background', 'ingénieur', 'engineer', 'cv', 'qui est', 'who is',
    ],
    answer: {
      fr:
        'Alexandre vient du logiciel embarqué dans l’aérospatial (Sodern). Concrètement : du code où l’erreur n’est pas une option, des exigences de fiabilité extrêmes. C’est exactement cette rigueur qu’il injecte dans des produits livrés à grande vitesse — la vitesse sans le bricolage.',
      en:
        'Alexandre comes from embedded software in aerospace (Sodern). In practice: code where failure isn’t an option, extreme reliability requirements. That’s precisely the rigor he brings to products shipped at high speed — speed without the duct tape.',
    },
    actions: [
      { tool: 'navigateTo', args: '/about', label: { fr: 'Lire son parcours', en: 'Read his background' } },
      { tool: 'navigateTo', args: '/moi', label: { fr: 'En savoir plus sur lui', en: 'More about him' } },
    ],
    followUps: ['philosophy', 'services', 'contact'],
  },

  // ───────────────────────── Philosophie / passion de construire ─────────────────────────
  philosophy: {
    keywords: [
      'philosophie', 'valeurs', 'passion', 'construire', 'approche', 'méthode', 'pourquoi',
      'philosophy', 'values', 'why', 'approach', 'build', 'no fake', 'testimonial',
    ],
    answer: {
      fr:
        'Une conviction simple : on construit, on ne brode pas. Pas de faux témoignages, pas de métriques inventées — du vrai, montré. Derrière, une vraie passion de bâtir des choses qui marchent, et l’envie de vous propulser dans le futur, sobrement, concrètement.',
      en:
        'One simple conviction: we build, we don’t embellish. No fake testimonials, no invented metrics — real things, shown. Behind it, a genuine passion for building things that work, and the drive to propel you into the future — soberly, concretely.',
    },
    actions: [
      { tool: 'showProjects', label: { fr: 'Voir le vrai travail', en: 'See the real work' } },
      { tool: 'promoteProduct', args: 'kurylabs', label: { fr: 'Découvrir KuryLabs', en: 'Discover KuryLabs' } },
    ],
    followUps: ['kurylabs', 'services', 'how_to_start'],
  },

  // ───────────────────────── Projets ─────────────────────────
  projects: {
    keywords: [
      'projet', 'projets', 'réalisation', 'portfolio', 'exemple', 'travaux', 'github',
      'project', 'projects', 'work', 'examples', 'case', 'demo', 'voir',
    ],
    answer: {
      fr:
        'La meilleure façon de juger : regarder ce qui est déjà construit. La galerie de projets rassemble du travail réel — pas des maquettes. Jetez-y un œil, puis dites-moi ce qui ressemble le plus à votre besoin.',
      en:
        'The best way to judge: look at what’s already built. The projects gallery gathers real work — not mockups. Take a look, then tell me what’s closest to your need.',
    },
    actions: [
      { tool: 'showProjects', label: { fr: 'Ouvrir les projets', en: 'Open the projects' } },
    ],
    followUps: ['services', 'kurylabs', 'contact'],
  },

  // ───────────────────────── Tarifs / délais ─────────────────────────
  pricing: {
    keywords: [
      'prix', 'tarif', 'coût', 'budget', 'devis', 'combien', 'délai', 'rapidité', 'quand',
      'price', 'cost', 'quote', 'how much', 'budget', 'timeline', 'how long',
    ],
    answer: {
      fr:
        'Chaque projet est différent, donc pas de grille figée : le prix et le délai dépendent du périmètre. Ce qui ne change pas, c’est la vitesse de livraison et la transparence. Décrivez votre besoin à Alexandre — il vous revient avec un cadrage clair et honnête.',
      en:
        'Every project is different, so no fixed grid: price and timeline depend on scope. What doesn’t change is delivery speed and transparency. Describe your need to Alexandre — he’ll come back with a clear, honest scope.',
    },
    actions: [
      {
        tool: 'openContactMail',
        args: {
          fr: {
            subject: 'Demande de cadrage / devis',
            body: 'Bonjour Alexandre,\n\nJ’aimerais un cadrage (périmètre, délai, budget) pour :\n\n[votre projet]\n\nMerci !',
          },
          en: {
            subject: 'Scoping / quote request',
            body: 'Hi Alexandre,\n\nI’d like a scope (perimeter, timeline, budget) for:\n\n[your project]\n\nThanks!',
          },
        },
        label: { fr: 'Demander un cadrage', en: 'Request a scope' },
      },
      { tool: 'navigateTo', args: '/contact', label: { fr: 'Page contact', en: 'Contact page' } },
    ],
    followUps: ['how_to_start', 'services'],
  },

  // ───────────────────────── Comment démarrer (mailto 1 clic) ─────────────────────────
  how_to_start: {
    keywords: [
      'démarrer', 'commencer', 'comment', 'première étape', 'go', 'lancer',
      'start', 'begin', 'how do i', 'next step', 'get started', 'kickoff',
    ],
    answer: {
      fr:
        'C’est simple : un email, et c’est parti. Vous décrivez votre besoin en quelques lignes, Alexandre revient vers vous avec une première lecture concrète et les prochaines étapes. Un clic ci-dessous pré-remplit le message pour vous.',
      en:
        'It’s simple: one email and you’re off. You describe your need in a few lines, Alexandre comes back with a concrete first read and the next steps. One click below pre-fills the message for you.',
    },
    actions: [
      {
        tool: 'openContactMail',
        args: {
          fr: {
            subject: 'Démarrer un projet avec le studio',
            body: 'Bonjour Alexandre,\n\nJe veux démarrer un projet. En quelques lignes :\n\nBesoin : \nDélai souhaité : \nContexte : \n\nÀ très vite !',
          },
          en: {
            subject: 'Start a project with the studio',
            body: 'Hi Alexandre,\n\nI want to start a project. In a few lines:\n\nNeed: \nTarget timeline: \nContext: \n\nTalk soon!',
          },
        },
        label: { fr: 'Écrire à Alexandre', en: 'Email Alexandre' },
      },
    ],
    followUps: ['services', 'contact'],
  },

  // ───────────────────────── Prise de contact ─────────────────────────
  contact: {
    keywords: [
      'contact', 'contacter', 'joindre', 'email', 'mail', 'appeler', 'rendez-vous', 'parler',
      'reach', 'get in touch', 'talk to', 'message', 'rdv',
    ],
    answer: {
      fr:
        'Le plus direct : un email à Alexandre — il lit et répond lui-même. Cliquez ci-dessous, le message est déjà pré-rempli ; vous n’avez qu’à ajouter votre contexte.',
      en:
        'The most direct way: an email to Alexandre — he reads and replies himself. Click below, the message is already pre-filled; just add your context.',
    },
    actions: [
      {
        tool: 'openContactMail',
        args: {
          fr: {
            subject: 'Prise de contact',
            body: 'Bonjour Alexandre,\n\n[votre message]\n\nMerci !',
          },
          en: {
            subject: 'Getting in touch',
            body: 'Hi Alexandre,\n\n[your message]\n\nThanks!',
          },
        },
        label: { fr: 'Envoyer un email', en: 'Send an email' },
      },
      { tool: 'navigateTo', args: '/contact', label: { fr: 'Voir la page contact', en: 'See contact page' } },
    ],
    followUps: ['services', 'how_to_start'],
  },
};
```

**Structure visuelle & animation.** Sous chaque réponse, les `actions` s'affichent en boutons compacts (primaire = accent, secondaires = bordés) en *reveal cascade* ; les `followUps` réapparaissent en chips sous les actions pour relancer. Le bloc « 01/02/03 » de l'intent `services` se prête à un rendu en **mini-cartes numérotées** dans la bulle (compteur mono en accent), écho visuel des cartes d'offres de la page d'accueil.

---

## 5. Mapping intent → outil (récap déterministe)

| Intent | Outil principal déclenché | Args | Effet |
|---|---|---|---|
| `services` | `recommendService` ×3 | `mvp` / `local-ai` / `training` | oriente vers chaque offre |
| `mvp` | `recommendService` + `openContactMail` | `mvp` / prefill MVP | montre l'offre, pré-remplit l'email |
| `local_ai` | `recommendService` + `openContactMail` | `local-ai` / prefill IA | montre l'offre, pré-remplit l'email |
| `training` | `recommendService` + `openContactMail` | `training` / prefill formation | montre l'offre, pré-remplit l'email |
| `kurylabs` | `promoteProduct` + `showProjects` | `kurylabs` | met en avant le produit réel |
| `experience` | `navigateTo` | `/about`, `/moi` | parcours Sodern / embarqué |
| `philosophy` | `showProjects` + `promoteProduct` | — / `kurylabs` | « on montre du vrai » |
| `projects` | `showProjects` | — | galerie de projets réels |
| `pricing` | `openContactMail` + `navigateTo` | prefill cadrage / `/contact` | cadrage honnête sur mesure |
| `how_to_start` | `openContactMail` | prefill démarrage | mailto 1 clic |
| `contact` | `openContactMail` + `navigateTo` | prefill contact / `/contact` | contact direct |

**Matcher sans LLM.** À l'envoi, on normalise l'input (lowercase, sans accents), on score chaque entrée par nombre de `keywords` présents, on prend le meilleur score > 0, sinon `CHATBOT_UI_COPY[lang].fallback` (qui pousse vers `openContactMail`). Les quick-replies court-circuitent le matcher en passant l'`intent` directement.

**Extension LLM.** La `CHATBOT_KNOWLEDGE_BASE` (réponses + parcours + offres) devient le contexte système / corpus RAG ; `ChatbotTools` se déclare en function-calling (un outil = une fonction). Le garde-fou reste : l'assistant ne promet que des choses vraies et ramène toujours vers `openContactMail`. Migration LLM : voir le guide API si besoin, mais le widget reste pleinement fonctionnel en mode scripté seul.
