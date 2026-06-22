// ─────────────────────────────────────────────────────────────────────────────
// src/content/chatbot/suggestions.ts
//
// Quick-replies de depart (chips cliquables sous le message de bienvenue).
// Chaque suggestion porte un `id` = ChatIntent qui court-circuite le matcher
// et declenche directement reponse + outils.
// ─────────────────────────────────────────────────────────────────────────────

import type { Lang } from '../../i18n';
import type { ChatSuggestion } from './types';

export const CHATBOT_SUGGESTIONS: Record<Lang, ReadonlyArray<ChatSuggestion>> = {
  fr: [
    { id: 'services', label: 'Quels services proposez-vous ?' },
    { id: 'produit_rapide', label: 'Développer mon produit (MVP)' },
    { id: 'solutions_ia', label: 'Mettre en place une IA locale' },
    { id: 'formation', label: 'Me former à l’IA' },
    { id: 'projects', label: 'Voir les projets' },
    { id: 'contact', label: 'Contacter Alexandre' },
  ],
  en: [
    { id: 'services', label: 'What services do you offer?' },
    { id: 'produit_rapide', label: 'Build my product (MVP)' },
    { id: 'solutions_ia', label: 'Set up a local AI' },
    { id: 'formation', label: 'Train me on AI' },
    { id: 'projects', label: 'See the projects' },
    { id: 'contact', label: 'Contact Alexandre' },
  ],
};
