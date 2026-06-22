// ─────────────────────────────────────────────────────────────────────────────
// src/services/aiChat.ts
//
// Assistant IA FRONT-ONLY (façon domo_ai) : un seul prompt système DYNAMIQUE
// construit au démarrage, qui liste les pages/offres/projets du site avec leurs
// liens. Le modèle répond en insérant des marqueurs [LINK:cible|Libellé] qu'on
// parse ensuite en liens cliquables. Aucun backend : appel direct à OpenRouter
// via src/services/openrouter.ts (clé REACT_APP_*, modèle gratuit).
// ─────────────────────────────────────────────────────────────────────────────

import { generateCompletion, type OpenRouterMessage } from './openrouter';
import type { Lang } from '../i18n';

export const CONTACT_EMAIL = 'alexandrelebegue12@gmail.com';

/** Lien proposé par l'assistant, rendu comme un bouton sous sa réponse. */
export interface AssistantLink {
  kind: 'internal' | 'external' | 'mailto';
  href: string; // route interne ('/services'), URL externe, ou 'mailto:...'
  label: string;
}

export interface AssistantReply {
  text: string;
  links: AssistantLink[];
}

export interface ChatTurn {
  role: 'user' | 'assistant';
  content: string;
}

/** Vrai si une clé OpenRouter est présente (sinon on évite l'appel et on guide). */
export function hasApiKey(): boolean {
  return Boolean(process.env.REACT_APP_OPENROUTER_API_KEY);
}

// ── Projets GitHub réels (récupérés une fois, injectés dans le prompt) ────────
let projectsCache: string | null = null;

async function getProjectsBlock(): Promise<string> {
  if (projectsCache !== null) return projectsCache;
  try {
    const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
    if (process.env.REACT_APP_GITHUB_TOKEN) {
      headers.Authorization = `token ${process.env.REACT_APP_GITHUB_TOKEN}`;
    }
    const res = await fetch(
      'https://api.github.com/users/AlexandrLebegue/repos?sort=updated&per_page=20',
      { headers },
    );
    if (!res.ok) throw new Error(`GitHub ${res.status}`);
    const repos = (await res.json()) as Array<{
      name: string;
      description: string | null;
      fork: boolean;
      html_url: string;
    }>;
    const lines = repos
      .filter((r) => !r.fork)
      .slice(0, 8)
      .map((r) => `- ${r.name}${r.description ? ` — ${r.description}` : ''} (${r.html_url})`);
    projectsCache = lines.join('\n');
  } catch {
    projectsCache = '';
  }
  return projectsCache;
}

// ── Prompt système dynamique ─────────────────────────────────────────────────
function buildSystemPrompt(lang: Lang, projectsBlock: string): string {
  const projects = projectsBlock || (lang === 'fr'
    ? '(voir la page projets pour la liste à jour)'
    : '(see the projects page for the live list)');

  if (lang === 'en') {
    return `You are the AI assistant on Alexandre Lebegue's studio website. Alexandre is a "vibe engineer":
he ships products and AI solutions in record time, with the rigor of an embedded/aerospace software
engineer (Sodern, critical systems).

YOUR JOB: answer briefly (2–4 sentences), in ENGLISH, concrete and warm, and POINT the visitor to the
right page using LINKS. Always end by inviting them to reach out for a project when relevant.

LINK FORMAT — to propose a link, use EXACTLY: [LINK:target|Label]
Examples: [LINK:/services#produit-rapide|See product development] — [LINK:mailto:${CONTACT_EMAIL}?subject=Project|Email Alexandre]
You can include several links. NEVER invent URLs — only use the ones listed below.

FORMATTING: you may use light Markdown to structure your answer — **bold**, *italics*, bullet or
numbered lists, short sub-headings. Keep it compact (it renders inside a small chat bubble). Do NOT
wrap the [LINK:...] markers in Markdown (no bold or brackets around them).

AVAILABLE LINKS:
- Home: /
- All services: /services
- Offer 01 — AI Solutions (local/on-prem AI, tooled agents, fine-tuning, sensitive-data AI, cost cutting; proof: Sodern): /services#solutions-ia
- Offer 02 — Rapid product development (idea → full-stack product + AI + cloud, fast; case study: KuryLabs for Kurybees, ~2 months): /services#produit-rapide
- Offer 03 — AI training & consulting (team upskilling, best practices, AI cost reduction, sensitive data; proof: Kurybees team): /services#formation
- Projects (auto-synced from GitHub): /projects
- About: /about
- Contact / email: mailto:${CONTACT_EMAIL}
- Start a project in one click (pre-filled email): mailto:${CONTACT_EMAIL}?subject=Project%20request

REAL PROJECTS (live from GitHub):
${projects}

RULES: stay factual (no fake clients or metrics), be helpful, and steer toward how Alexandre can help.
If the question is off-topic, still give the most useful pointer plus the contact link.`;
  }

  return `Tu es l'assistant IA du site du studio d'Alexandre Lebegue. Alexandre est un « vibe engineer » :
il livre des produits et des solutions IA en temps record, avec la rigueur d'un ingénieur logiciel
embarqué/aérospatial (Sodern, systèmes critiques).

TON RÔLE : répondre brièvement (2 à 4 phrases), en FRANÇAIS, de façon concrète et chaleureuse, et
ORIENTER le visiteur vers la bonne page avec des LIENS. Termine par une invitation à contacter Alexandre
pour un projet quand c'est pertinent.

FORMAT DE LIEN — pour proposer un lien, utilise EXACTEMENT : [LINK:cible|Libellé]
Exemples : [LINK:/services#produit-rapide|Voir le développement produit] — [LINK:mailto:${CONTACT_EMAIL}?subject=Projet|Écrire à Alexandre]
Tu peux mettre plusieurs liens. N'invente JAMAIS d'URL — utilise uniquement celles listées ci-dessous.

MISE EN FORME : tu peux utiliser un Markdown léger pour structurer ta réponse — **gras**, *italique*,
listes à puces ou numérotées, courts sous-titres. Reste compact (l'affichage se fait dans une petite
bulle de chat). N'entoure PAS les marqueurs [LINK:...] de Markdown (pas de gras ni de crochets autour).

LIENS DISPONIBLES :
- Accueil : /
- Tous les services : /services
- Offre 01 — Solutions IA (IA locale/on-prem, agents outillés, fine-tuning, IA sur données sensibles, réduction des coûts ; preuve : Sodern) : /services#solutions-ia
- Offre 02 — Développement de produit rapide (idée → produit full-stack + IA + cloud, vite ; étude de cas : KuryLabs pour Kurybees, ~2 mois) : /services#produit-rapide
- Offre 03 — Formation & conseil IA (montée en compétence, best practices, réduction des coûts IA, données sensibles ; preuve : équipe Kurybees) : /services#formation
- Projets (synchronisés depuis GitHub) : /projects
- À propos : /about
- Contact / email : mailto:${CONTACT_EMAIL}
- Démarrer un projet en 1 clic (email pré-rempli) : mailto:${CONTACT_EMAIL}?subject=Demande%20de%20projet

PROJETS RÉELS (en direct de GitHub) :
${projects}

RÈGLES : reste factuel (pas de faux client ni de chiffre inventé), sois utile, et oriente vers ce
qu'Alexandre peut faire. Si la question sort du périmètre, donne quand même la piste la plus utile + le
lien de contact.`;
}

// ── Parsing des marqueurs [LINK:cible|Libellé] ───────────────────────────────
const LINK_RE = /\[LINK:\s*([^\]|]+?)\s*(?:\|\s*([^\]]+?)\s*)?\]/g;

function classify(target: string): AssistantLink['kind'] {
  if (target.startsWith('mailto:')) return 'mailto';
  if (/^https?:\/\//i.test(target)) return 'external';
  return 'internal';
}

function defaultLabel(target: string, lang: Lang): string {
  if (target.startsWith('mailto:')) return lang === 'fr' ? 'Écrire à Alexandre' : 'Email Alexandre';
  if (/^https?:\/\//i.test(target)) {
    try {
      return new URL(target).hostname.replace(/^www\./, '');
    } catch {
      return target;
    }
  }
  const map: Record<string, [string, string]> = {
    '/': ['Accueil', 'Home'],
    '/services': ['Voir les services', 'See the services'],
    '/services#solutions-ia': ["Voir l'offre Solutions IA", 'See AI Solutions'],
    '/services#produit-rapide': ["Voir le développement produit", 'See product development'],
    '/services#formation': ['Voir la formation IA', 'See AI training'],
    '/projects': ['Voir les projets', 'See the projects'],
    '/about': ['À propos', 'About'],
  };
  const hit = map[target];
  if (hit) return lang === 'fr' ? hit[0] : hit[1];
  return lang === 'fr' ? 'Ouvrir' : 'Open';
}

/** Extrait les liens, nettoie le texte (retire les marqueurs), déduplique. */
export function parseReply(raw: string, lang: Lang): AssistantReply {
  const links: AssistantLink[] = [];
  const seen = new Set<string>();
  let m: RegExpExecArray | null;
  LINK_RE.lastIndex = 0;
  // eslint-disable-next-line no-cond-assign
  while ((m = LINK_RE.exec(raw)) !== null) {
    const target = (m[1] || '').trim();
    if (!target || seen.has(target)) continue;
    seen.add(target);
    links.push({
      kind: classify(target),
      href: target,
      label: (m[2] || '').trim() || defaultLabel(target, lang),
    });
  }

  // NB : on ne collapse PAS les espaces multiples — l'indentation est désormais
  // significative (le texte est rendu en Markdown : listes imbriquées, etc.).
  let text = raw
    // Un [LINK] entouré d'emphase (**…**, *…*, __…__, _…_) est retiré comme un
    // tout — le lien est déjà extrait plus haut — pour ne laisser aucune emphase
    // vide (« **** »). On ne touche pas aux emphases légitimes adjacentes.
    .replace(/(\*\*|__|\*|_)\[LINK:[^\]]*\]\1/g, '')
    // Retire les marqueurs [LINK:…] restants (non entourés d'emphase).
    .replace(LINK_RE, '')
    // Séparateur orphelin en tête de puce (« -  — texte » → « - texte »).
    .replace(/^([ \t]*[-*+])[ \t]+[—–-][ \t]+/gm, '$1 ')
    // Espace résiduel avant un point/une virgule (sûr en français, contrairement
    // à « : ; ! ? » qui prennent une espace).
    .replace(/ +([.,])/g, '$1')
    // Au plus une ligne vide entre blocs.
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  // Réponse tronquée (maxTokens) finissant sur un bloc de code non fermé : on
  // ajoute la clôture pour éviter que toute la fin devienne un gros bloc de code.
  if (((text.match(/```/g) || []).length) % 2 === 1) text += '\n```';

  return { text, links };
}

/**
 * Pose une question à l'assistant : construit le prompt dynamique, appelle
 * OpenRouter (côté client) et renvoie texte nettoyé + liens.
 */
export async function askAssistant(
  history: ChatTurn[],
  userMessage: string,
  lang: Lang,
): Promise<AssistantReply> {
  const projectsBlock = await getProjectsBlock();
  const system = buildSystemPrompt(lang, projectsBlock);

  const messages: OpenRouterMessage[] = [
    { role: 'system', content: system },
    ...history.slice(-10).map((t) => ({ role: t.role, content: t.content })),
    { role: 'user', content: userMessage },
  ];

  const raw = await generateCompletion(messages, { maxTokens: 600, temperature: 0.6 });
  return parseReply(raw, lang);
}
