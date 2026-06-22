// ─────────────────────────────────────────────────────────────────────────────
// src/components/Chatbot/Chatbot.tsx
//
// Assistant IA FRONT-ONLY (façon domo_ai) : un seul prompt système dynamique
// (src/services/aiChat.ts) appelé directement sur OpenRouter côté client. Le
// modèle renvoie du texte + des marqueurs [LINK:...] parsés en liens cliquables.
// Widget : FAB robot monochrome, panneau clair, bouton AGRANDIR, bilingue,
// accessible (aria, focus, Échap), prefers-reduced-motion (cf. Chatbot.css).
// ─────────────────────────────────────────────────────────────────────────────

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../../i18n';
import { CHATBOT_UI_COPY } from '../../content/chatbot/ui';
import { CHATBOT_SUGGESTIONS } from '../../content/chatbot/suggestions';
import {
  askAssistant,
  hasApiKey,
  CONTACT_EMAIL,
  type AssistantLink,
  type ChatTurn,
} from '../../services/aiChat';
import RobotIcon from './RobotIcon';
import MarkdownMessage from './MarkdownMessage';
import './Chatbot.css';

interface Msg {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  links?: AssistantLink[];
  isWelcome?: boolean;
  isError?: boolean;
}

let idCounter = 0;
const nextId = (): string => `cb-${Date.now()}-${idCounter++}`;

/** Liens de repli (clé absente / erreur réseau) : on guide quand même. */
function fallbackLinks(lang: 'fr' | 'en'): AssistantLink[] {
  const subject = encodeURIComponent(lang === 'fr' ? 'Demande de projet' : 'Project request');
  return [
    {
      kind: 'internal',
      href: '/services',
      label: lang === 'fr' ? 'Voir les services' : 'See the services',
    },
    {
      kind: 'mailto',
      href: `mailto:${CONTACT_EMAIL}?subject=${subject}`,
      label: lang === 'fr' ? 'Écrire à Alexandre' : 'Email Alexandre',
    },
  ];
}

const Chatbot: React.FC = () => {
  const { lang, t } = useLang();
  const navigate = useNavigate();
  const copy = CHATBOT_UI_COPY[lang];
  const suggestions = CHATBOT_SUGGESTIONS[lang];

  const [open, setOpen] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showChips, setShowChips] = useState(true);

  const panelRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);
  // Référence vivante des messages pour construire l'historique sans closure obsolète.
  const msgsRef = useRef<Msg[]>([]);
  msgsRef.current = messages;

  const resetConversation = useCallback(() => {
    setMessages([{ id: nextId(), role: 'assistant', text: copy.welcome, isWelcome: true }]);
    setShowChips(true);
    setLoading(false);
  }, [copy.welcome]);

  // (Ré)initialise à l'ouverture et au changement de langue.
  useEffect(() => {
    if (open) resetConversation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, lang]);

  // Auto-scroll en bas.
  useEffect(() => {
    const el = messagesRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  // Focus sur l'input à l'ouverture.
  useEffect(() => {
    if (open) {
      const id = window.setTimeout(() => inputRef.current?.focus(), 60);
      return () => window.clearTimeout(id);
    }
    return undefined;
  }, [open]);

  // Échap ferme.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        setOpen(false);
        setMaximized(false);
        fabRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const pushMsg = useCallback((m: Msg) => {
    setMessages((prev) => [...prev, m]);
  }, []);

  /** Envoie une question à l'IA et pousse la réponse (texte + liens). */
  const send = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || loading) return;

      setInput('');
      setShowChips(false);
      pushMsg({ id: nextId(), role: 'user', text });
      setLoading(true);

      // Pas de clé : on guide gracieusement, sans appel réseau.
      if (!hasApiKey()) {
        pushMsg({
          id: nextId(),
          role: 'assistant',
          isError: true,
          text:
            lang === 'fr'
              ? "L'assistant IA n'est pas encore configuré, mais je peux vous orienter : voici les services, ou écrivez directement à Alexandre."
              : "The AI assistant isn't configured yet, but I can still point you the right way: here are the services, or email Alexandre directly.",
          links: fallbackLinks(lang),
        });
        setLoading(false);
        return;
      }

      const history: ChatTurn[] = msgsRef.current
        .filter((m) => !m.isError && !m.isWelcome)
        .map((m) => ({ role: m.role, content: m.text }));

      try {
        const reply = await askAssistant(history, text, lang);
        pushMsg({
          id: nextId(),
          role: 'assistant',
          text: reply.text || copy.fallback,
          links: reply.links,
        });
      } catch (e) {
        pushMsg({
          id: nextId(),
          role: 'assistant',
          isError: true,
          text:
            lang === 'fr'
              ? "Je n'arrive pas à joindre l'assistant pour l'instant. Le plus sûr : écrire à Alexandre, ou parcourir les services."
              : "I can't reach the assistant right now. Safest path: email Alexandre, or browse the services.",
          links: fallbackLinks(lang),
        });
      } finally {
        setLoading(false);
      }
    },
    [loading, lang, copy.fallback, pushMsg],
  );

  /** Suit un lien proposé par l'assistant. */
  const followLink = useCallback(
    (link: AssistantLink) => {
      if (link.kind === 'internal') {
        // Navigation interne : on ferme le chat pour révéler la page ciblée.
        setOpen(false);
        setMaximized(false);
        navigate(link.href);
      } else if (link.kind === 'mailto') {
        window.location.href = link.href;
      } else {
        window.open(link.href, '_blank', 'noopener,noreferrer');
      }
    },
    [navigate],
  );

  /** Navigation depuis un lien Markdown interne : ferme le chat puis route. */
  const navigateFromMarkdown = useCallback(
    (href: string) => {
      setOpen(false);
      setMaximized(false);
      navigate(href);
    },
    [navigate],
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void send(input);
  };

  const maximizeLabel = maximized
    ? t({ fr: 'Réduire la fenêtre', en: 'Restore window' })
    : t({ fr: 'Agrandir la fenêtre', en: 'Maximize window' });

  return (
    <div className={`chatbot-root${maximized ? ' cb-rooted-max' : ''}`}>
      {open && (
        <div
          ref={panelRef}
          className={`chatbot-panel${maximized ? ' cb-max' : ''}`}
          role="dialog"
          aria-modal="false"
          aria-label={copy.title}
        >
          {/* En-tête */}
          <header className="chatbot-header">
            <span aria-hidden="true" style={{ color: 'var(--cb-primary)' }}>
              <RobotIcon className="" />
            </span>
            <div className="cb-headtext">
              <div className="cb-title">{copy.title}</div>
              <div className="cb-subtitle cb-muted">{copy.subtitle}</div>
              <span className="cb-badge">{copy.assistantBadge}</span>
            </div>

            <div className="cb-head-actions">
              <button
                type="button"
                className="chatbot-iconbtn"
                aria-label={maximizeLabel}
                title={maximizeLabel}
                aria-pressed={maximized}
                onClick={() => setMaximized((v) => !v)}
              >
                {maximized ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="4 14 10 14 10 20" />
                    <polyline points="20 10 14 10 14 4" />
                    <line x1="14" y1="10" x2="21" y2="3" />
                    <line x1="3" y1="21" x2="10" y2="14" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="15 3 21 3 21 9" />
                    <polyline points="9 21 3 21 3 15" />
                    <line x1="21" y1="3" x2="14" y2="10" />
                    <line x1="3" y1="21" x2="10" y2="14" />
                  </svg>
                )}
              </button>
              <button
                type="button"
                className="chatbot-iconbtn"
                aria-label={copy.closeLabel}
                title={copy.closeLabel}
                onClick={() => {
                  setOpen(false);
                  setMaximized(false);
                  fabRef.current?.focus();
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              </button>
            </div>
          </header>

          {/* Messages */}
          <div ref={messagesRef} className="chatbot-messages" role="log" aria-live="polite">
            {messages.map((m) => (
              <React.Fragment key={m.id}>
                <div className={`cb-row ${m.role === 'user' ? 'cb-user' : 'cb-assistant'}`}>
                  <div className="cb-bubble">
                    {m.role === 'assistant' && !m.isWelcome && !m.isError ? (
                      <MarkdownMessage text={m.text} onNavigate={navigateFromMarkdown} />
                    ) : (
                      m.text
                    )}
                  </div>
                </div>
                {m.role === 'assistant' && m.links && m.links.length > 0 && (
                  <div className="cb-actions">
                    {m.links.map((link, i) => (
                      <button
                        key={`${m.id}-l-${i}`}
                        type="button"
                        className={`cb-action ${i === 0 ? 'cb-action-primary' : ''}`}
                        onClick={() => followLink(link)}
                      >
                        {link.label}
                        {link.kind === 'external' && (
                          <span aria-hidden="true" style={{ marginLeft: 4 }}>↗</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </React.Fragment>
            ))}

            {loading && (
              <div className="cb-row cb-assistant">
                <div className="cb-bubble" aria-label="…">
                  <span className="cb-typing" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Suggestions de départ */}
          {showChips && !loading && (
            <div className="cb-chips" role="group" aria-label={copy.title}>
              {suggestions.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className="cb-chip"
                  onClick={() => void send(s.label)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}

          {/* Footer : input + envoyer */}
          <form className="chatbot-footer" onSubmit={onSubmit}>
            <div className="chatbot-inputrow">
              <input
                ref={inputRef}
                type="text"
                className="chatbot-input"
                placeholder={copy.inputPlaceholder}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                aria-label={copy.inputPlaceholder}
                disabled={loading}
              />
              <button
                type="submit"
                className="chatbot-send"
                aria-label={copy.sendLabel}
                disabled={input.trim().length === 0 || loading}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
            <div className="chatbot-disclaimer">
              {copy.disclaimer}{' '}
              <button type="button" className="chatbot-reset" onClick={resetConversation}>
                {copy.resetLabel}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Bouton flottant (FAB) */}
      <button
        ref={fabRef}
        type="button"
        className="chatbot-fab"
        aria-label={copy.launcherLabel}
        aria-expanded={open}
        title={copy.launcherLabel}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        ) : (
          <RobotIcon className="" />
        )}
      </button>
    </div>
  );
};

export default Chatbot;
