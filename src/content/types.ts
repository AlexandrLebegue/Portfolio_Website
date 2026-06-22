import type { Lang } from '../i18n';

/**
 * Couche contenu — types canoniques partages par les pages.
 *
 * Tous les textes visibles sont bilingues : les constantes de contenu
 * s'exposent typiquement en `Record<Lang, T>` et se consomment via
 * `const { t } = useLang(); t(DICT)` (voir `src/i18n`).
 *
 * IMPORTANT : on importe UNIQUEMENT `import type { Lang } from '../i18n'`,
 * jamais depuis `@/i18n`.
 */

/* -------------------------------------------------------------------------- */
/* Primitifs reutilisables                                                    */
/* -------------------------------------------------------------------------- */

/** Un lien de navigation : libelle affiche + route interne. */
export interface NavLinkCopy {
  label: string;
  href: string;
}

/** Un bouton d'action simple : libelle + cible (route interne ou ancre). */
export interface CtaCopy {
  label: string;
  href: string;
}

/** Une mini-carte numerotee (teaser services / projets). */
export interface TeaserCard {
  /** Index visuel "01", "02"... (gros chiffre filigrane). */
  index: string;
  title: string;
}

/* -------------------------------------------------------------------------- */
/* Type CANONIQUE des offres de service (01 / 02 / 03)                        */
/* -------------------------------------------------------------------------- */

/**
 * Un livrable d'une offre.
 * Forme unique : `label` (titre court) + `detail` (description).
 * Harmonise les schemas divergents des fichiers de copie :
 * - service-ia : `deliverables: string[]`              -> { label, detail }
 * - service-formation : `content: { label, text }[]`   -> { label, detail }
 * - service-produit : `deliverables: { label, detail }[]` (deja conforme)
 */
export interface ServiceDeliverable {
  label: string;
  detail: string;
}

/**
 * Etude de cas reelle attachee a une offre (uniquement l'offre 02 a ce jour).
 * Aucune metrique inventee, aucun temoignage fabrique.
 */
export interface ServiceCaseStudy {
  /** Pseudo-label "Etude de cas reelle". */
  tag: string;
  /** Qui est le client. */
  client: string;
  /** Le besoin / le contexte. */
  context: string;
  /** Ce qui a ete construit, en briques numerotees a l'affichage. */
  built: string[];
  /** Delai de realisation. */
  timeline: string;
  /** Etat final (fonctionnel + cloud). */
  status: string;
  /** Lien vers le produit en ligne (etude de cas live). */
  link?: { label: string; href: string };
  /** Capture d'ecran du produit en production (chemin public/). */
  preview?: string;
}

/**
 * Bloc CTA d'une offre. Harmonise les CTA divergents :
 * - service-ia / service-formation : `cta: { label, href }`
 * - service-produit : `cta: { kicker, button, note, mailtoSubject, mailtoBody }`
 *
 * Schema canonique : `button` (obligatoire) + champs optionnels.
 * - `href`            : lien direct (mailto pre-encode) quand pas de body genere.
 * - `mailtoSubject` / `mailtoBody` : presents pour les CTA qui generent un
 *   brouillon via `buildProjectMailto` (offre 02).
 */
export interface ServiceCta {
  /** Petite accroche au-dessus du bouton. */
  kicker?: string;
  /** Libelle du bouton (obligatoire). */
  button: string;
  /** Micro-texte rassurant sous le bouton. */
  note?: string;
  /** Lien direct (mailto deja encode) pour les CTA sans corps genere. */
  href?: string;
  /** Sujet de l'email pre-rempli (CTA generant un brouillon). */
  mailtoSubject?: string;
  /** Corps de l'email pre-rempli (\n pour sauts de ligne). */
  mailtoBody?: string;
}

/**
 * Type CANONIQUE couvrant les 3 offres (01 Solutions IA, 02 Developpement
 * produit rapide, 03 Formation & conseil IA). Les 3 offres sont harmonisees
 * vers cette forme unique.
 */
export interface ServiceCopy {
  /** Numero de l'offre, affiche en gros (01 / 02 / 03). */
  number: string;
  /** Titre principal de l'offre. */
  title: string;
  /** Promesse en une phrase, sous le titre. */
  promise: string;
  /** Paragraphe de description du service. */
  description: string;
  /** Livrables (cartes ou puces numerotees). */
  deliverables: ServiceDeliverable[];
  /** Etude de cas reelle (optionnelle — presente sur l'offre 02). */
  caseStudy?: ServiceCaseStudy;
  /** Bloc d'appel a l'action. */
  cta: ServiceCta;
}

/* -------------------------------------------------------------------------- */
/* Types des sections de la page d'accueil                                    */
/* -------------------------------------------------------------------------- */

/** Navigation + CTA principal du header. */
export interface NavCopy {
  links: NavLinkCopy[];
  /** CTA principal du header, pointe vers le contact. */
  cta: CtaCopy;
}

/** Hero : titre fragmente pour highlighter la tagline + reassurances vraies. */
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

/** Teaser de la section Services (3 mini-cartes). */
export interface ServicesTeaserCopy {
  /** Surtitre mono optionnel. */
  eyebrow: string;
  title: string;
  /** Phrase d'intro courte sous le titre. */
  intro: string;
  cards: TeaserCard[];
  cta: CtaCopy;
}

/** Teaser de la section Projets (passion + synchro GitHub live). */
export interface ProjectsTeaserCopy {
  eyebrow: string;
  title: string;
  /** Phrase forte sur la passion de creer / construire / exposer. */
  passion: string;
  /** Mention de la synchro GitHub automatique. */
  liveNote: string;
  cta: CtaCopy;
}

/** Bande CTA finale (closing direct vers le contact). */
export interface FinalCtaCopy {
  title: string;
  subtitle: string;
  cta: CtaCopy;
}

/**
 * Un produit phare en production, mis en avant dans la section « Je construis »
 * de la home : capture d'ecran reelle + lien externe vers le produit live.
 */
export interface FeaturedProduct {
  /** Etiquette de categorie ("Produit phare" / "Produit client"). */
  kind: string;
  /** Nom du produit. */
  name: string;
  /** Accroche d'une phrase, orientee benefice client. */
  tagline: string;
  /** Hote affiche dans la barre du navigateur (ex: launchforge.alexandre-lebegue.com). */
  host: string;
  /** URL complete du produit en ligne. */
  href: string;
  /** Libelle du lien ("Decouvrir Launchforge"). */
  linkLabel: string;
  /** Capture d'ecran (chemin relatif a public/, ex: /launchforge-preview.png). */
  image: string;
  /** Petits tags techno / categorie. */
  tags: string[];
}

/** Bloc « produits en production » mis en avant sur la home. */
export interface FeaturedProductsCopy {
  /** Surtitre mono (ex: "EN PRODUCTION"). */
  eyebrow: string;
  /** Titre de la mini-section. */
  title: string;
  /** Phrase d'intro courte. */
  intro: string;
  /** Les produits phares (Launchforge, KuryLabs...). */
  items: FeaturedProduct[];
}

/* -------------------------------------------------------------------------- */
/* Types des sections A propos & Contact                                      */
/* -------------------------------------------------------------------------- */

/** Section "A propos" recadree comme preuve de confiance. */
export interface AboutCopy {
  /** Micro-titre mono / kicker au-dessus du titre. */
  kicker: string;
  /** Promesse principale. */
  title: string;
  /** Accroche forte, 1 a 2 phrases. */
  lead: string;
  /** 2 paragraphes courts (rigueur embarquee -> livraison IA). */
  paragraphs: string[];
  /** 3 piliers de confiance, cartes 01 / 02 / 03. */
  proofs: { label: string; description: string }[];
  /** Le moteur : creer, construire, exposer. */
  passion: { title: string; text: string };
  /** Phrase de cloture, ton studio. */
  signature: string;
}

/** Un canal de contact (email, LinkedIn, GitHub). */
export interface ContactChannel {
  label: string;
  value: string;
  href: string;
}

/** Section "Contact" : inviter a lancer un projet. */
export interface ContactCopy {
  kicker: string;
  title: string;
  subtitle: string;
  channels: {
    email: ContactChannel;
    linkedin: ContactChannel;
    github: ContactChannel;
  };
  cta: {
    heading: string;
    button: string;
    reassurance: string;
  };
}
