# Page d'accueil — Copie bilingue (FR / EN)

Studio **Alexandre Lebegue** — *vibe engineer* : developpement produit accelere par IA + solutions IA.
Ton : direct, concret, futuriste sobre. Rigueur d'ingenieur (parcours embarque / aerospatial, Sodern).
Philosophie : **aucun faux temoignage, aucune metrique inventee** — on montre du vrai (projets GitHub reels, automatiquement a jour).

> Le type `Lang` est defini dans `src/i18n/index.tsx` : `export type Lang = 'fr' | 'en';`
> Chaque objet ci-dessous est pret a coller (par ex. dans `src/pages/Home/home.copy.ts`) avec `import type { Lang } from '../../i18n';`.

---

## Types partages

```ts
import type { Lang } from '../../i18n';

/** Un lien de navigation : libelle affiche + route interne. */
export interface NavLinkCopy {
  label: string;
  href: string;
}

/** Un bouton d'action : libelle + cible (route interne ou ancre). */
export interface CtaCopy {
  label: string;
  href: string;
}

/** Une mini-carte numerotee (teaser services / projets). */
export interface TeaserCard {
  /** Index visuel "01", "02"... gere cote UI, mais expose ici si besoin. */
  index: string;
  title: string;
}
```

---

## 1. Navigation + CTA global

Libelles de la barre de navigation, alignes sur les routes existantes (`/`, `/services`, `/projects`, `/about`, `/contact`) et libelle du CTA principal reutilise dans le header.

```ts
export interface NavCopy {
  links: NavLinkCopy[];
  /** CTA principal du header, pointe vers le contact. */
  cta: CtaCopy;
}

export const NAV_COPY: Record<Lang, NavCopy> = {
  fr: {
    links: [
      { label: 'Accueil', href: '/' },
      { label: 'Services', href: '/services' },
      { label: 'Projets', href: '/projects' },
      { label: 'A propos', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    cta: { label: 'Discutons de votre projet', href: '/contact' },
  },
  en: {
    links: [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/services' },
      { label: 'Projects', href: '/projects' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    cta: { label: "Let's talk about your project", href: '/contact' },
  },
};
```

**Structure visuelle & animation.** Barre fixe, fond translucide avec leger flou (glassmorphism sobre) qui se densifie au scroll. Liens en `font-medium`, soulignement actif anime. Le CTA est un bouton plein (accent) a droite, legerement surligne. Sur mobile, repli en hamburger SVG anime deja en place. Reveal initial : fade-down discret a l'arrivee sur la page.

---

## 2. HERO

Le grand titre integre la tagline **« vous propulse dans le futur »**. Kicker mono facon terminal, sous-titre benefice (vite + rigueur), 2 CTA, et 3 micro-reassurances **vraies** (reponse rapide en direct avec le fondateur / vous restez proprietaire de tout / rigueur d'ingenieur issue de l'embarque).

```ts
export interface HeroCopy {
  /** Kicker mono au-dessus du titre. */
  kicker: string;
  /** Titre en 3 fragments pour permettre un highlight sur la tagline. */
  titleLead: string;
  titleHighlight: string;
  titleTail: string;
  /** Sous-titre benefice. */
  subtitle: string;
  ctaPrimary: CtaCopy;
  ctaSecondary: CtaCopy;
  /** 3 micro-reassurances vraies. */
  reassurance: string[];
}

export const HERO_COPY: Record<Lang, HeroCopy> = {
  fr: {
    kicker: 'STUDIO IA — VIBE ENGINEERING',
    titleLead: 'Mon entreprise vous ',
    titleHighlight: 'propulse dans le futur',
    titleTail: '.',
    subtitle:
      "Je conçois et livre vos produits et vos solutions IA en temps record, avec la rigueur d'un ingenieur formee dans l'embarque et l'aerospatial.",
    ctaPrimary: { label: 'Discutons de votre projet', href: '/contact' },
    ctaSecondary: { label: 'Voir mes realisations', href: '/projects' },
    reassurance: [
      'Reponse rapide, en direct avec le fondateur',
      'Vous restez proprietaire de votre code et de vos donnees',
      "Rigueur d'ingenieur, du prototype a la mise en production",
    ],
  },
  en: {
    kicker: 'AI STUDIO — VIBE ENGINEERING',
    titleLead: 'My company ',
    titleHighlight: 'propels you into the future',
    titleTail: '.',
    subtitle:
      "I design and ship your products and AI solutions in record time, with the rigor of an engineer trained in embedded and aerospace systems.",
    ctaPrimary: { label: "Let's talk about your project", href: '/contact' },
    ctaSecondary: { label: 'See my work', href: '/projects' },
    reassurance: [
      'Fast replies, straight from the founder',
      'You keep full ownership of your code and data',
      'Engineering rigor, from prototype to production',
    ],
  },
};
```

**Structure visuelle & animation.** Hero plein ecran, centre, fond sombre stellaire (champ d'etoiles `twinkle` deja present) + halo radial accent derriere le titre. Sequence reveal echelonnee : kicker (fade-down), titre (fade-up, la portion `titleHighlight` en degrade accent qui « s'allume » au scan), sous-titre (fade-up retarde), puis les 2 CTA (scale-in cote a cote, primaire plein / secondaire ghost). Les 3 micro-reassurances apparaissent en ligne sous les CTA, chacune precedee d'une coche, stagger leger 80 ms. Parallax subtil du halo au mouvement de souris.

---

## 3. TEASER SERVICES

Titre de section + 3 mini-cartes (titres seulement, alignees sur les 3 offres) + libelle « Voir les services ».

```ts
export interface ServicesTeaserCopy {
  /** Surtitre mono optionnel. */
  eyebrow: string;
  title: string;
  /** Phrase d'intro courte sous le titre. */
  intro: string;
  cards: TeaserCard[];
  cta: CtaCopy;
}

export const SERVICES_TEASER_COPY: Record<Lang, ServicesTeaserCopy> = {
  fr: {
    eyebrow: 'CE QUE JE FAIS',
    title: 'Trois façons de vous propulser',
    intro:
      "De l'idee au produit livre, ou de l'IA integree a vos outils : une expertise, trois portes d'entree.",
    cards: [
      { index: '01', title: 'Solutions IA' },
      { index: '02', title: 'Developpement produit rapide' },
      { index: '03', title: 'Formation & conseil IA' },
    ],
    cta: { label: 'Voir les services', href: '/services' },
  },
  en: {
    eyebrow: 'WHAT I DO',
    title: 'Three ways to propel you forward',
    intro:
      'From idea to shipped product, or AI woven into your existing tools: one expertise, three ways in.',
    cards: [
      { index: '01', title: 'AI solutions' },
      { index: '02', title: 'Rapid product development' },
      { index: '03', title: 'AI training & consulting' },
    ],
    cta: { label: 'See the services', href: '/services' },
  },
};
```

**Structure visuelle & animation.** Bloc 3 colonnes (grille responsive 1 → 3). Chaque carte affiche son index `01 / 02 / 03` en gros chiffre mono filigrane, le titre en dessous, fine bordure qui s'illumine en accent au hover (translateY -4px + glow). Reveal en stagger lateral (fade-up decale de 120 ms par carte). Le CTA « Voir les services » est un lien-fleche centre sous la grille.

---

## 4. TEASER PROJETS

Titre + phrase forte sur la **passion de construire** + mention que les projets GitHub sont **automatiquement a jour** + CTA « Explorer mes projets ».

```ts
export interface ProjectsTeaserCopy {
  eyebrow: string;
  title: string;
  /** Phrase forte sur la passion de creer / construire / exposer. */
  passion: string;
  /** Mention de la synchro GitHub automatique. */
  liveNote: string;
  cta: CtaCopy;
}

export const PROJECTS_TEASER_COPY: Record<Lang, ProjectsTeaserCopy> = {
  fr: {
    eyebrow: 'MES PROJETS',
    title: 'Avant tout, je construis',
    passion:
      "Avant tout, ce qui me passionne c'est creer, construire et exposer mes projets. Chaque ligne de code est un terrain d'experimentation ou je repousse mes limites.",
    liveNote:
      'Cette vitrine se synchronise automatiquement avec mon GitHub : ce que vous voyez est toujours a jour, jamais une capture figee.',
    cta: { label: 'Explorer mes projets', href: '/projects' },
  },
  en: {
    eyebrow: 'MY PROJECTS',
    title: 'Above all, I build',
    passion:
      'Above all, what drives me is creating, building and shipping my own projects. Every line of code is a place to experiment and push my limits.',
    liveNote:
      'This showcase syncs automatically with my GitHub: what you see is always up to date, never a frozen snapshot.',
    cta: { label: 'Explore my projects', href: '/projects' },
  },
};
```

**Structure visuelle & animation.** Bande pleine largeur sur fond legerement contraste. A gauche, le titre + la phrase de passion en gros corps editorial ; a droite (ou dessous sur mobile), un encart « live » discret : petit point pulsant + icone GitHub + `liveNote`, signalant la synchro auto. Reveal : titre en fade-right, phrase passion en fade-up, encart live en fade-left avec point qui se met a pulser une fois visible. Optionnel : apercu en arriere-plan d'une grille de cartes projets qui defile en parallax lent.

---

## 5. BANDE CTA finale

Titre + sous-titre + bouton contact. Closing direct et concret.

```ts
export interface FinalCtaCopy {
  title: string;
  subtitle: string;
  cta: CtaCopy;
}

export const FINAL_CTA_COPY: Record<Lang, FinalCtaCopy> = {
  fr: {
    title: 'Un projet en tete ? Mettons-le en orbite.',
    subtitle:
      "Decrivez-moi votre idee : je reviens vers vous rapidement avec une approche claire et un plan d'action concret.",
    cta: { label: 'Discutons de votre projet', href: '/contact' },
  },
  en: {
    title: 'Got a project in mind? Let’s put it into orbit.',
    subtitle:
      'Tell me about your idea: I get back to you quickly with a clear approach and a concrete action plan.',
    cta: { label: "Let's talk about your project", href: '/contact' },
  },
};
```

**Structure visuelle & animation.** Section finale ramassee, centree, sur fond accent profond ou degrade radial sombre → accent. Titre fort sur une ou deux lignes, sous-titre secondaire, un seul bouton plein bien visible (meme libelle/cible que le CTA du header pour la coherence). Reveal scale-in du bloc a l'entree dans le viewport ; leger glow pulsant sur le bouton pour attirer le clic. Pas de second CTA : on canalise vers le contact.

---

### Recapitulatif des exports

| Constante | Section | Cible CTA |
| --- | --- | --- |
| `NAV_COPY` | Navigation + CTA header | `/contact` |
| `HERO_COPY` | Hero (tagline + reassurances) | `/contact` + `/projects` |
| `SERVICES_TEASER_COPY` | Teaser 3 offres | `/services` |
| `PROJECTS_TEASER_COPY` | Teaser projets (passion + live GitHub) | `/projects` |
| `FINAL_CTA_COPY` | Bande CTA finale | `/contact` |

**Note de veracite.** Aucune affirmation chiffree ni client cite : les 3 micro-reassurances (reponse rapide en direct, propriete du code/donnees, rigueur d'ingenieur issue de l'embarque/aerospatial) et la synchro GitHub auto sont toutes vraies et verifiables sur le site lui-meme.
