// ─────────────────────────────────────────────────────────────────────────────
// src/components/Chatbot/MarkdownMessage.tsx
//
// Rendu Markdown des réponses de l'assistant (inspiré du MarkdownRenderer de
// domo_ai : react-markdown + remark-gfm). Différences pour ce site :
//  - thème MONOCHROME / CARRÉ (styles dans Chatbot.css → .cb-markdown) ;
//  - PAS de HTML brut (sécurité anti-XSS : le texte vient du modèle, on l'échappe
//    en n'utilisant pas rehype-raw + skipHtml) ;
//  - liens internes ('/...' ou '#...') interceptés pour la navigation SPA
//    (react-router) au lieu d'un rechargement de page.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';

/**
 * Vrai si le lien doit être traité comme interne (navigation SPA). On exige une
 * cible same-origin : une ancre '#…', ou un chemin '/…' qui, résolu contre
 * l'origine, reste sur le même domaine. Cela bloque les liens du modèle de type
 * '//evil.com' ou '/\\evil.com' (que le navigateur résout cross-origin) qui
 * sinon déclencheraient une navigation pleine page non sécurisée via react-router.
 */
function isInternalLink(target: string): boolean {
  if (target.startsWith('#')) return true;
  if (!target.startsWith('/')) return false;
  try {
    return new URL(target, window.location.origin).origin === window.location.origin;
  } catch {
    return false;
  }
}

interface MarkdownMessageProps {
  text: string;
  /** Appelé pour les liens internes ('/services', '#formation', …). */
  onNavigate: (href: string) => void;
}

const MarkdownMessage: React.FC<MarkdownMessageProps> = ({ text, onNavigate }) => (
  <div className="cb-markdown">
    <ReactMarkdown
      // remarkBreaks : un saut de ligne simple devient <br> (convention chat,
      // comme l'ancien white-space: pre-line) ; gfm : tableaux, listes de tâches…
      remarkPlugins={[remarkGfm, remarkBreaks]}
      // Le HTML brut éventuel du modèle reste échappé (pas de rehype-raw).
      skipHtml
      // Pas d'images (évite les beacons distants dans une bulle de chat).
      disallowedElements={['img']}
      unwrapDisallowed
      components={{
        a: ({ href, children }) => {
          const target = href ?? '';
          if (isInternalLink(target)) {
            return (
              <a
                href={target}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(target);
                }}
              >
                {children}
              </a>
            );
          }
          return (
            <a href={target} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          );
        },
      }}
    >
      {text}
    </ReactMarkdown>
  </div>
);

export default MarkdownMessage;
