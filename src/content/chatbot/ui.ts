// ─────────────────────────────────────────────────────────────────────────────
// src/content/chatbot/ui.ts
//
// Copie de l'interface du widget assistant (bilingue FR/EN).
// Aucune fausse presence humaine : on assume le cote "assistant guide".
// ─────────────────────────────────────────────────────────────────────────────

import type { Lang } from '../../i18n';

export interface ChatbotUiCopy {
  /** Tooltip / aria-label du bouton flottant ferme. */
  launcherLabel: string;
  /** Titre affiche dans l'en-tete du panneau ouvert. */
  title: string;
  /** Sous-titre / statut sous le titre. */
  subtitle: string;
  /** Petit badge "assistant" (transparence : pas de fausse presence). */
  assistantBadge: string;
  /** Premier message pousse a l'ouverture. */
  welcome: string;
  /** Placeholder du champ de saisie. */
  inputPlaceholder: string;
  /** Libelle / aria du bouton envoyer. */
  sendLabel: string;
  /** Aria-label du bouton fermer. */
  closeLabel: string;
  /** Libelle du bouton "recommencer / nouvelle conversation". */
  resetLabel: string;
  /** Message quand aucun intent scripte ne matche (fallback + redirection contact). */
  fallback: string;
  /** Mention basse de transparence (sous l'input). */
  disclaimer: string;
}

export const CHATBOT_UI_COPY: Record<Lang, ChatbotUiCopy> = {
  fr: {
    launcherLabel: 'Ouvrir l’assistant',
    title: 'Assistant du studio',
    subtitle: 'Là pour vous orienter, à toute heure.',
    assistantBadge: 'Assistant — réponses guidées',
    welcome:
      'Bonjour 👋 Je suis l’assistant d’Alexandre. Dites-moi ce que vous voulez construire — un produit (MVP), une IA locale, ou monter en compétences — et je vous oriente vers la bonne offre. Vous pouvez aussi écrire directement à Alexandre en un clic.',
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
      'Hi 👋 I’m Alexandre’s assistant. Tell me what you want to build — a product (MVP), a local AI setup, or AI upskilling — and I’ll point you to the right offer. You can also message Alexandre directly in one click.',
    inputPlaceholder: 'Describe what you need…',
    sendLabel: 'Send',
    closeLabel: 'Close the assistant',
    resetLabel: 'New conversation',
    fallback:
      'I don’t have a canned answer for that — but Alexandre does. Fastest path: message him directly and he’ll get back to you with something concrete.',
    disclaimer: 'Automated assistant. For a real conversation, reach out to Alexandre.',
  },
};
