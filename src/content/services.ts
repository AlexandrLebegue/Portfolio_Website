import type { Lang } from '../i18n';
import type { ServiceCopy } from './types';

/**
 * Copie des 3 offres de service (bilingue FR/EN), HARMONISEE vers le type
 * canonique `ServiceCopy` (voir ./types).
 *
 * Ligne editoriale : le CLIENT est le sujet (« votre produit », « vos
 * donnees », « votre equipe »). Ton professionnel, optimise SEO (solutions IA
 * sur mesure, IA locale / on-premise, developpement produit, MVP, formation
 * IA), avec de tres legeres touches spatiales (decoller, orbite, propulsion).
 *
 * - Offre 02 : porte une `caseStudy` KuryLabs (avec lien + capture du produit
 *   en ligne). La preuve Sodern (01) et la preuve Kurybees-formation (03)
 *   restent cote page A propos.
 * - CTA : `button` obligatoire + champs optionnels (voir ServiceCta).
 */

/** Email de contact unique (etait duplique dans plusieurs fichiers de copie). */
export const CONTACT_EMAIL = 'alexandrelebegue12@gmail.com';

/**
 * Les 3 offres, dans l'ordre d'affichage (01 -> 02 -> 03), par langue.
 * Consommer via `const { lang } = useLang(); SERVICES[lang]`.
 */
export const SERVICES: Record<Lang, ServiceCopy[]> = {
  fr: [
    /* ---------------------------------------------------------------- 01 */
    {
      number: '01',
      title: 'Solutions IA sur mesure, déployées chez vous',
      promise:
        'Une IA qui travaille pour vous, sur vos données, et qui produit des résultats concrets — pas une démo.',
      description:
        'J’intègre l’IA au cœur de vos opérations sans jamais confier vos données à un tiers : modèles en local / on-premise, agents outillés connectés à vos systèmes, assistants taillés pour vos processus. De l’audit de votre besoin jusqu’au déploiement, vous gardez la main sur votre stack, vos coûts et vos données.',
      deliverables: [
        {
          label: 'Déploiement d’IA locale / on-premise',
          detail:
            'Vos modèles tournent sur votre infrastructure, vos données ne sortent pas.',
        },
        {
          label: 'Agents IA outillés',
          detail:
            'Connectés à vos outils (fichiers, API, messageries, bases internes) pour automatiser vos tâches réelles.',
        },
        {
          label: 'Fine-tuning & spécialisation',
          detail: 'Des modèles spécialisés sur votre métier et votre vocabulaire.',
        },
        {
          label: 'Sécurité & données sensibles',
          detail:
            'Une architecture pensée pour vos environnements contraints et votre confidentialité.',
        },
        {
          label: 'Assistants self-hosted',
          detail: 'Type OpenClaw / Paperclip, adaptés à vos canaux.',
        },
        {
          label: 'Réduction de vos coûts IA',
          detail:
            'Moins de dépendance aux API facturées au volume, plus de maîtrise pour vous.',
        },
      ],
      cta: {
        button: 'Discutons de votre cas',
        href: 'mailto:alexandrelebegue12@gmail.com?subject=Solutions%20IA%20%E2%80%94%20projet',
      },
    },
    /* ---------------------------------------------------------------- 02 */
    {
      number: '02',
      title: 'Développement de produit rapide',
      promise:
        'De votre idée à un produit qui tourne, en un temps record — sans jamais sacrifier la rigueur d’ingénieur.',
      description:
        'Je conçois et je livre des produits complets, pas des maquettes. Application full-stack, intelligence artificielle intégrée au cœur du produit, branchement au cloud et mise en production : vous repartez avec un outil réel, utilisable par vos clients, construit avec la discipline d’un parcours embarqué et aérospatial. Le développement accéléré par l’IA me permet d’aller vite ; l’ingénierie garantit que ça tienne dans la durée.',
      deliverables: [
        {
          label: 'Application full-stack',
          detail:
            'Interface, logique métier et base de données — un produit de bout en bout, pas un prototype jetable.',
        },
        {
          label: 'IA intégrée',
          detail:
            'Chat de cadrage, agents et outils sur mesure connectés à votre métier, au-delà d’un simple appel d’API.',
        },
        {
          label: 'Intégration cloud',
          detail:
            'Stockage, authentification et services gérés dans le cloud, pour un produit qui passe à l’échelle.',
        },
        {
          label: 'Déploiement',
          detail:
            'Mise en production, environnement accessible en ligne et remise des clés — prêt à être utilisé.',
        },
      ],
      caseStudy: {
        tag: 'Étude de cas réelle',
        client:
          'KuryLabs — produit conçu pour l’entreprise Kurybees, spécialiste des solutions batterie.',
        context:
          'Le besoin : permettre à votre client de spécifier sa tension, son énergie, sa puissance, sa durée de vie et ses contraintes (masse, dimensions), puis de trouver la cellule batterie la plus adaptée et de valider son choix avant de s’engager.',
        built: [
          'Chat IA de cadrage du besoin, qui dialogue avec l’utilisateur puis fige des paramètres éditables.',
          'Matching en base de données pour retrouver les cellules les plus proches du cahier des charges.',
          'Comparaison graphique des cellules candidates pour décider en un coup d’œil.',
          'Simulation du comportement de la cellule selon le cas d’usage.',
          'Rapport final consultable, avec accès aux données brutes.',
        ],
        timeline: 'Environ 2 mois, de la page blanche au produit livré.',
        status: 'Application entièrement fonctionnelle, avec intégration cloud.',
        link: { label: 'Voir KuryLabs en ligne', href: 'https://kurylabs.kurybees.com' },
        preview: '/kurylabs-preview.png',
      },
      cta: {
        kicker: 'Vous avez un produit en tête ?',
        button: 'Lancer mon projet en 1 clic',
        note: 'Un clic ouvre votre messagerie avec un email pré-rempli. Vous complétez, vous envoyez, je réponds.',
        mailtoSubject: 'Demande de projet — [votre produit]',
        mailtoBody:
          'Bonjour Alexandre,\n\nJ’aimerais développer un produit. Voici l’essentiel :\n\n1. Quoi : que doit faire le produit ? (en quelques lignes)\n\n\n2. Pour quand : quelle échéance avez-vous en tête ?\n\n\n3. Contexte : entreprise, utilisateurs visés, contraintes ou budget éventuel.\n\n\nMerci,\n',
      },
    },
    /* ---------------------------------------------------------------- 03 */
    {
      number: '03',
      title: 'Formation & conseil IA',
      promise:
        'Rendez votre équipe autonome sur l’IA — vite, proprement, sans faire exploser vos coûts.',
      description:
        'Un accompagnement concret pour faire passer votre équipe de l’expérimentation à un usage maîtrisé de l’IA. On installe les bons réflexes, les bons outils et les bons garde-fous : votre équipe gagne en vitesse, vous gardez le contrôle des dépenses et la maîtrise de vos données sensibles.',
      deliverables: [
        {
          label: 'Prise en main des outils IA',
          detail:
            'Choix et configuration des assistants et plateformes adaptés à vos usages, mise en main guidée, intégration dans vos flux de travail existants.',
        },
        {
          label: 'Best practices prompt & agents',
          detail:
            'Méthodes de prompting fiables, conception d’agents et d’automatisations utiles, patterns reproductibles pour des résultats constants plutôt qu’aléatoires.',
        },
        {
          label: 'Optimisation & réduction des coûts IA',
          detail:
            'Choix des modèles selon l’usage, mise en cache, dimensionnement des contextes et suivi de la consommation : vous payez pour ce qui apporte de la valeur, pas plus.',
        },
        {
          label: 'Gouvernance & sécurité des données sensibles',
          detail:
            'Règles claires sur ce qui peut — ou non — être envoyé à un modèle, anonymisation, choix d’hébergement et bonnes pratiques pour travailler sur des données confidentielles.',
        },
        {
          label: 'Montée en compétence de l’équipe',
          detail:
            'Transfert de savoir-faire durable : ateliers pratiques, supports de référence et accompagnement pour que vos équipes restent autonomes après la mission.',
        },
      ],
      cta: {
        button: 'Former mon équipe',
        href: 'mailto:alexandrelebegue12@gmail.com?subject=Formation%20%26%20conseil%20IA',
      },
    },
  ],
  en: [
    /* ---------------------------------------------------------------- 01 */
    {
      number: '01',
      title: 'Tailor-made AI solutions, deployed on your side',
      promise:
        'AI that works for you, on your data, and delivers real results — not a demo.',
      description:
        'I bring AI into the core of your operations without ever handing your data to a third party: local / on-premise models, tool-equipped agents wired into your systems, and assistants shaped around your processes. From scoping to deployment, you keep control of your stack, your costs and your data.',
      deliverables: [
        {
          label: 'Local / on-premise AI deployment',
          detail:
            'Your models run on your infrastructure, your data never leaves.',
        },
        {
          label: 'Tool-equipped AI agents',
          detail:
            'Connected to your stack (files, APIs, messaging, internal databases) to automate your real work.',
        },
        {
          label: 'Fine-tuning & specialization',
          detail: 'Models specialized on your domain and your vocabulary.',
        },
        {
          label: 'Security & sensitive data',
          detail:
            'Architecture built for your constrained environments and your confidentiality.',
        },
        {
          label: 'Self-hosted assistants',
          detail: 'In the spirit of OpenClaw / Paperclip, adapted to your channels.',
        },
        {
          label: 'Lower AI costs',
          detail: 'Less reliance on per-token billed APIs, more control for you.',
        },
      ],
      cta: {
        button: 'Let’s talk about your case',
        href: 'mailto:alexandrelebegue12@gmail.com?subject=AI%20solutions%20%E2%80%94%20project',
      },
    },
    /* ---------------------------------------------------------------- 02 */
    {
      number: '02',
      title: 'Rapid product development',
      promise:
        'From your idea to a working product in record time — without ever giving up engineering rigor.',
      description:
        'I design and ship complete products, not mockups. Full-stack application, AI built into the core of the product, cloud wiring and production deployment: you walk away with a real tool your customers can use, built with the discipline of an embedded and aerospace background. AI-accelerated development lets me move fast; engineering makes sure it holds over time.',
      deliverables: [
        {
          label: 'Full-stack application',
          detail:
            'Interface, business logic and database — an end-to-end product, not a throwaway prototype.',
        },
        {
          label: 'Embedded AI',
          detail:
            'Scoping chat, agents and custom tools wired into your domain, well beyond a single API call.',
        },
        {
          label: 'Cloud integration',
          detail:
            'Storage, authentication and managed services in the cloud, for a product that scales.',
        },
        {
          label: 'Deployment',
          detail:
            'Production release, a live environment and a clean handover — ready to be used.',
        },
      ],
      caseStudy: {
        tag: 'Real case study',
        client:
          'KuryLabs — a product built for Kurybees, a company specialized in battery solutions.',
        context:
          'The need: let your client specify voltage, energy, power, lifetime and constraints (mass, dimensions), then find the best-fit battery cell and validate the choice before committing.',
        built: [
          'AI scoping chat that talks the user through the need, then locks in editable parameters.',
          'Database matching to surface the cells closest to the specification.',
          'Graphical comparison of candidate cells to decide at a glance.',
          'Simulation of cell behavior for the target use case.',
          'A final, consultable report with access to the raw data.',
        ],
        timeline: 'Around 2 months, from blank page to delivered product.',
        status: 'Fully functional application, with cloud integration.',
        link: { label: 'See KuryLabs live', href: 'https://kurylabs.kurybees.com' },
        preview: '/kurylabs-preview.png',
      },
      cta: {
        kicker: 'Got a product in mind?',
        button: 'Start my project in 1 click',
        note: 'One click opens your mail app with a pre-filled email. Fill it in, send it, I reply.',
        mailtoSubject: 'Project request — [your product]',
        mailtoBody:
          'Hi Alexandre,\n\nI’d like to build a product. Here’s the gist:\n\n1. What: what should the product do? (a few lines)\n\n\n2. By when: what timeline do you have in mind?\n\n\n3. Context: company, target users, constraints or budget if any.\n\n\nThanks,\n',
      },
    },
    /* ---------------------------------------------------------------- 03 */
    {
      number: '03',
      title: 'AI training & consulting',
      promise:
        'Make your team AI-autonomous — fast, clean, and without blowing up your costs.',
      description:
        'Hands-on support to move your team from experimentation to a controlled use of AI. We install the right habits, the right tools and the right guardrails: your team moves faster, you keep spending under control and your sensitive data under your command.',
      deliverables: [
        {
          label: 'Getting started with AI tools',
          detail:
            'Selecting and configuring the assistants and platforms that fit your use cases, guided onboarding, and integration into your existing workflows.',
        },
        {
          label: 'Prompt & agent best practices',
          detail:
            'Reliable prompting methods, useful agents and automations, and reproducible patterns for consistent results instead of random ones.',
        },
        {
          label: 'AI cost optimization & reduction',
          detail:
            'Picking the right model for each task, caching, sizing contexts and tracking usage: you pay for what creates value, nothing more.',
        },
        {
          label: 'Governance & sensitive-data security',
          detail:
            'Clear rules on what may — or may not — be sent to a model, anonymization, hosting choices and best practices for working with confidential data.',
        },
        {
          label: 'Team skill ramp-up',
          detail:
            'Lasting knowledge transfer: practical workshops, reference materials and support so your teams stay autonomous long after the engagement ends.',
        },
      ],
      cta: {
        button: 'Train my team',
        href: 'mailto:alexandrelebegue12@gmail.com?subject=AI%20training%20%26%20consulting',
      },
    },
  ],
};

/**
 * Construit le lien `mailto:` pre-rempli du CTA "en 1 clic" (offre 02), a
 * partir de son `mailtoSubject` / `mailtoBody`.
 *
 * Encodage : espaces -> %20, sauts de ligne (\n) -> %0A.
 * `URLSearchParams` encode l'espace en "+" ; on le remplace par %20 car
 * `mailto:` attend %20.
 *
 * Helper UNIQUE : remplace les deux helpers `buildProjectMailto` qui
 * existaient en double dans les fichiers de copie.
 */
export function buildProjectMailto(lang: Lang): string {
  const offer = SERVICES[lang].find((s) => s.number === '02');
  const subject = offer?.cta.mailtoSubject ?? '';
  const body = offer?.cta.mailtoBody ?? '';
  const params = new URLSearchParams({ subject, body });
  return `mailto:${CONTACT_EMAIL}?${params.toString().replace(/\+/g, '%20')}`;
}
