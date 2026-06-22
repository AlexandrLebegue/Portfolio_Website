// ─────────────────────────────────────────────────────────────────────────────
// src/content/chatbot/types.ts
//
// Types LOCAUX de l'assistant chatbot (concept sans backend ni LLM).
// On n'importe RIEN de src/content/types.ts : tout est defini ici, seul `Lang`
// vient du contrat i18n du site.
//
// Les slugs d'offres sont ALIGNES sur les 3 vraies offres de la page /services :
//   01 · Solutions IA              -> 'solutions-ia'
//   02 · Developpement produit rapide (MVP) -> 'produit-rapide'
//   03 · Formation & conseil IA    -> 'formation'
// ─────────────────────────────────────────────────────────────────────────────

import type { Lang } from '../../i18n';

/**
 * Identifiants d'intents partages entre suggestions, knowledge base et matcher.
 * Chaque intent possede une entree dans la KNOWLEDGE_BASE.
 */
export type ChatIntent =
  | 'services'
  | 'solutions_ia'
  | 'produit_rapide'
  | 'formation'
  | 'kurylabs'
  | 'experience'
  | 'philosophy'
  | 'projects'
  | 'pricing'
  | 'how_to_start'
  | 'contact';

/** Routes reelles du site (cf. App.tsx). */
export type AppRoute =
  | '/'
  | '/services'
  | '/projects'
  | '/about'
  | '/moi'
  | '/contact'
  | '/linkedin-import';

/**
 * Slugs d'offres — ALIGNES sur les 3 vraies offres du site.
 * Servent a recommendService (ancrage sur la carte correspondante de /services).
 */
export type ServiceSlug = 'solutions-ia' | 'produit-rapide' | 'formation';

/** Produits / initiatives mis en avant (reels uniquement). */
export type ProductName = 'kurylabs';

/** Prefill bilingue d'un email (sujet + corps). */
export interface MailPrefill {
  subject: string;
  body: string;
}

/**
 * Contrat des outils que l'assistant peut "appeler" depuis une reponse.
 * Implementation front : navigate() de react-router, window.location pour mailto.
 * Aucun appel reseau, aucun etat serveur : 100 % deterministe.
 */
export interface ChatbotTools {
  /** Navigue vers une route interne (et reduit le widget). */
  navigateTo(route: AppRoute): void;
  /** Met en avant une offre : ouvre /services et cible la carte du slug. */
  recommendService(slug: ServiceSlug): void;
  /** Ouvre le client mail pre-rempli vers le CONTACT_EMAIL. */
  openContactMail(prefill: MailPrefill): void;
  /** Redirige vers la galerie de projets reels. */
  showProjects(): void;
  /** Promeut un produit / initiative reel (ex: KuryLabs). */
  promoteProduct(name: ProductName): void;
}

/**
 * Une action cliquable rattachee a une reponse, mappee 1:1 sur un outil.
 * Le `label` est bilingue ; `args` decrit l'appel deterministe a executer au clic.
 */
export type ChatAction =
  | { tool: 'navigateTo'; args: AppRoute; label: Record<Lang, string> }
  | { tool: 'recommendService'; args: ServiceSlug; label: Record<Lang, string> }
  | { tool: 'showProjects'; args?: undefined; label: Record<Lang, string> }
  | { tool: 'promoteProduct'; args: ProductName; label: Record<Lang, string> }
  | {
      tool: 'openContactMail';
      args: Record<Lang, MailPrefill>;
      label: Record<Lang, string>;
    };

/** Une entree de la base de connaissances : reponse + CTA + relances. */
export interface KnowledgeEntry {
  /** Mots-cles (FR+EN) pour le matcher scripte sans LLM (lowercase, accents tolere). */
  keywords: ReadonlyArray<string>;
  /** Reponse principale, bilingue. */
  answer: Record<Lang, string>;
  /** CTA proposes sous la reponse (0..n). */
  actions: ReadonlyArray<ChatAction>;
  /** Intents suggeres ensuite (relance la conversation). */
  followUps: ReadonlyArray<ChatIntent>;
}

/** Une suggestion (quick-reply) de depart : un libelle pointant vers un intent. */
export interface ChatSuggestion {
  id: ChatIntent;
  label: string;
}

/** Role d'un message dans le fil de conversation. */
export type ChatRole = 'assistant' | 'user';

/** Un message affiche dans le fil (l'assistant peut porter des actions/followUps). */
export interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
  actions?: ReadonlyArray<ChatAction>;
  followUps?: ReadonlyArray<ChatIntent>;
}
