# Service 02 — Developpement de produit rapide

Contenu bilingue (FR + EN) pret a coller pour la section "Offre 02" du site Alexandre Lebegue.

Le type `Lang` est importe depuis `src/i18n/index.tsx` :

```ts
import type { Lang } from '../i18n';
```

---

## Objet TypeScript — `PRODUCT_SERVICE_COPY`

```ts
import type { Lang } from '../i18n';

export const PRODUCT_SERVICE_COPY: Record<
  Lang,
  {
    /** Numero de l'offre, affiche en gros (01 / 02 / ...) */
    number: string;
    /** Eyebrow / sur-titre court au-dessus du titre */
    eyebrow: string;
    /** Titre principal de la section */
    title: string;
    /** Promesse en une phrase, sous le titre */
    promise: string;
    /** Paragraphe de description du service */
    description: string;
    /** Liste des livrables (cartes ou puces) */
    deliverables: { label: string; detail: string }[];
    /** Etude de cas reelle KuryLabs / Kurybees */
    caseStudy: {
      tag: string;          // pseudo-label "Etude de cas"
      client: string;       // qui est le client
      context: string;      // le besoin / le contexte
      built: string[];      // ce qui a ete construit, en briques
      timeline: string;     // delai de realisation
      status: string;       // etat final (fonctionnel + cloud)
    };
    /** Bloc d'appel a l'action "en 1 clic" */
    cta: {
      kicker: string;       // petite accroche au-dessus du bouton
      button: string;       // libelle du bouton
      note: string;         // micro-texte rassurant sous le bouton
      mailtoSubject: string; // sujet de l'email pre-rempli
      mailtoBody: string;    // corps de l'email pre-rempli (\n pour sauts de ligne)
    };
  }
> = {
  fr: {
    number: '02',
    eyebrow: 'Offre 02',
    title: 'Developpement de produit rapide',
    promise:
      'De l’idee a un produit fonctionnel en un temps record — sans sacrifier la rigueur d’ingenieur.',
    description:
      'Je conçois et je livre des produits complets, pas des maquettes. Application full-stack, intelligence artificielle integree au coeur du produit, branchement au cloud et mise en production : vous repartez avec un outil reel, utilisable par vos clients, construit avec la discipline d’un parcours embarque et aerospatial. Le developpement accelere par l’IA me permet d’aller vite ; l’ingenierie garantit que ça tienne.',
    deliverables: [
      {
        label: 'Application full-stack',
        detail:
          'Interface, logique metier et base de donnees — un produit de bout en bout, pas un prototype jetable.',
      },
      {
        label: 'IA integree',
        detail:
          'Chat de cadrage, agents et outils sur mesure connectes a votre metier, au-dela d’un simple appel d’API.',
      },
      {
        label: 'Integration cloud',
        detail:
          'Stockage, authentification et services geres dans le cloud pour un produit qui passe a l’echelle.',
      },
      {
        label: 'Deploiement',
        detail:
          'Mise en production, environnement accessible en ligne et remise des cles — pret a etre utilise.',
      },
    ],
    caseStudy: {
      tag: 'Etude de cas reelle',
      client:
        'KuryLabs — produit conçu pour l’entreprise Kurybees, specialiste des solutions batterie.',
      context:
        'Le besoin : permettre a un client de specifier sa tension, son energie, sa puissance, sa duree de vie et ses contraintes (masse, dimensions), puis de trouver la cellule batterie la plus adaptee et de valider son choix avant de s’engager.',
      built: [
        'Chat IA de cadrage du besoin, qui dialogue avec l’utilisateur puis fige des parametres editables.',
        'Matching en base de donnees pour retrouver les cellules les plus proches du cahier des charges.',
        'Comparaison graphique des cellules candidates pour decider en un coup d’oeil.',
        'Simulation du comportement de la cellule selon le cas d’usage.',
        'Rapport final consultable, avec acces aux donnees brutes.',
      ],
      timeline: 'Environ 2 mois, de la page blanche au produit livre.',
      status: 'Application entierement fonctionnelle, avec integration cloud.',
    },
    cta: {
      kicker: 'Vous avez un produit en tete ?',
      button: 'Lancer mon projet en 1 clic',
      note:
        'Un clic ouvre votre messagerie avec un email pre-rempli. Vous completez, vous envoyez, je reponds.',
      mailtoSubject: 'Demande de projet — [votre produit]',
      mailtoBody:
        'Bonjour Alexandre,\n\nJ’aimerais developper un produit. Voici l’essentiel :\n\n1. Quoi : que doit faire le produit ? (en quelques lignes)\n\n\n2. Pour quand : quelle echeance avez-vous en tete ?\n\n\n3. Contexte : entreprise, utilisateurs vises, contraintes ou budget eventuel.\n\n\nMerci,\n',
    },
  },
  en: {
    number: '02',
    eyebrow: 'Offer 02',
    title: 'Rapid product development',
    promise:
      'From idea to a working product in record time — without giving up engineering rigor.',
    description:
      'I design and ship complete products, not mockups. Full-stack application, AI built into the core of the product, cloud wiring and production deployment: you walk away with a real tool your customers can use, built with the discipline of an embedded and aerospace background. AI-accelerated development lets me move fast; engineering makes sure it holds.',
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
        'The need: let a client specify voltage, energy, power, lifetime and constraints (mass, dimensions), then find the best-fit battery cell and validate the choice before committing.',
      built: [
        'AI scoping chat that talks the user through the need, then locks in editable parameters.',
        'Database matching to surface the cells closest to the specification.',
        'Graphical comparison of candidate cells to decide at a glance.',
        'Simulation of cell behavior for the target use case.',
        'A final, consultable report with access to the raw data.',
      ],
      timeline: 'Around 2 months, from blank page to delivered product.',
      status: 'Fully functional application, with cloud integration.',
    },
    cta: {
      kicker: 'Got a product in mind?',
      button: 'Start my project in 1 click',
      note:
        'One click opens your mail app with a pre-filled email. Fill it in, send it, I reply.',
      mailtoSubject: 'Project request — [your product]',
      mailtoBody:
        'Hi Alexandre,\n\nI’d like to build a product. Here’s the gist:\n\n1. What: what should the product do? (a few lines)\n\n\n2. By when: what timeline do you have in mind?\n\n\n3. Context: company, target users, constraints or budget if any.\n\n\nThanks,\n',
    },
  },
};
```

---

## Note — structure visuelle & intention d'animation

Section pleine largeur, fond sombre premium. A gauche, le numero **02** en tres grand (chiffre fantome) avec eyebrow + titre + promesse ; a droite, la grille des 4 livrables en cartes numerotees discretes. Sous le bloc principal, l'**etude de cas KuryLabs** occupe un encart contraste (tag "Etude de cas", client, contexte, puis les 5 briques "built" en cartes numerotees 01 -> 05) avec un bandeau timeline/status en pied. Le CTA "en 1 clic" ferme la section, centre, bouton lumineux.

Animations : `reveal` au scroll (fade + translate-y) en cascade sur titre puis livrables ; leger `parallax` sur le grand chiffre 02 ; apparition sequencee (stagger) des briques de l'etude de cas en cartes numerotees ; le bouton CTA fait un subtil glow/scale au hover. Tout reste sobre — pas de mouvement gratuit, on souligne le contenu reel.

---

## Note — SPEC du lien `mailto:` pre-rempli (mecanisme "EN 1 CLIC")

Le bouton CTA est un lien `mailto:` vers **alexandrelebegue12@gmail.com**, avec sujet et corps pre-remplis selon la langue active. A l'ouverture, la messagerie par defaut du visiteur s'ouvre avec un brouillon deja redige — il ne reste qu'a completer les 3 questions et a envoyer.

### Parametres

- **Destinataire** : `alexandrelebegue12@gmail.com`
- **Sujet (FR)** : `Demande de projet — [votre produit]`
- **Sujet (EN)** : `Project request — [your product]`
- **Corps (FR)** : 3 questions — Quoi / Pour quand / Contexte (voir `mailtoBody` ci-dessus).
- **Corps (EN)** : 3 questions — What / By when / Context (voir `mailtoBody` ci-dessus).

### Construction de l'URL (encodage obligatoire)

`subject` et `body` doivent etre passes via `encodeURIComponent` ; les sauts de ligne `\n` sont alors encodes en `%0A`.

```ts
import type { Lang } from '../i18n';
import { PRODUCT_SERVICE_COPY } from './productServiceCopy';

const CONTACT_EMAIL = 'alexandrelebegue12@gmail.com';

export function buildProjectMailto(lang: Lang): string {
  const { mailtoSubject, mailtoBody } = PRODUCT_SERVICE_COPY[lang].cta;
  const params = new URLSearchParams({
    subject: mailtoSubject,
    body: mailtoBody,
  });
  // URLSearchParams encode l'espace en "+"; mailto attend %20 -> on remplace.
  return `mailto:${CONTACT_EMAIL}?${params.toString().replace(/\+/g, '%20')}`;
}
```

Usage dans le composant :

```tsx
<a className="product-cta-button" href={buildProjectMailto(lang)}>
  {PRODUCT_SERVICE_COPY[lang].cta.button}
</a>
```

### Resultat attendu (exemple FR, decode pour lisibilite)

```
mailto:alexandrelebegue12@gmail.com?subject=Demande%20de%20projet%20—%20[votre%20produit]&body=Bonjour%20Alexandre,%0A%0AJ’aimerais%20developper%20un%20produit.%20...
```

Notes d'implementation :
- Pas de formulaire, pas de backend : un simple `<a href="mailto:...">`, zero dependance.
- Toutes les affirmations de cette section sont vraies : un seul produit reel (KuryLabs pour Kurybees), aucun temoignage ni metrique invente.
