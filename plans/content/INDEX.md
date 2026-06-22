# INDEX — Copie bilingue (plans/content)

Index des blocs de copie redigees dans `plans/content/*.md`, leur cartographie vers une
structure de fichiers cible `src/content/`, et les incoherences a harmoniser avant integration.

Reference verifiee dans le code :
- `export type Lang = 'fr' | 'en';` -> `src/i18n/index.tsx` (confirme).
- Routes reelles (`src/App.tsx`) : `/`, `/services`, `/projects`, `/projects/:projectName`,
  `/about`, `/moi`, `/contact`, `/linkedin-import`.

---

## 1. Fichiers source et objets COPY exportes

| Fichier source (`plans/content/`) | Objets / types exportes | Forme |
| --- | --- | --- |
| `home.md` | `NavLinkCopy`, `CtaCopy`, `TeaserCard` (types partages) ; `NavCopy` + `NAV_COPY` ; `HeroCopy` + `HERO_COPY` ; `ServicesTeaserCopy` + `SERVICES_TEASER_COPY` ; `ProjectsTeaserCopy` + `PROJECTS_TEASER_COPY` ; `FinalCtaCopy` + `FINAL_CTA_COPY` | `Record<Lang, ...>` |
| `service-ia.md` | `SERVICE_IA_COPY` (type inline) | `Record<Lang, ...>` |
| `service-produit.md` | `PRODUCT_SERVICE_COPY` (type inline) + helper `buildProjectMailto(lang)` | `Record<Lang, ...>` |
| `service-formation.md` | `SERVICE_FORMATION_COPY` (type inline) | `Record<Lang, ...>` |
| `about-contact.md` | `ABOUT_COPY` (type inline) ; `CONTACT_COPY` (type inline) | `Record<Lang, ...>` |
| `chatbot.md` | `CHATBOT_UI_COPY` ; `ChatIntent` + `CHATBOT_SUGGESTIONS` ; types `AppRoute`/`ServiceSlug`/`ProductName` + `ChatbotTools` + `CONTACT_EMAIL` + `buildMailto()` ; `ChatAction` + `KnowledgeEntry` + `CHATBOT_KNOWLEDGE_BASE` | `Record<Lang, ...>` / `Record<ChatIntent, ...>` |

Constantes COPY au total : `NAV_COPY`, `HERO_COPY`, `SERVICES_TEASER_COPY`,
`PROJECTS_TEASER_COPY`, `FINAL_CTA_COPY`, `SERVICE_IA_COPY`, `PRODUCT_SERVICE_COPY`,
`SERVICE_FORMATION_COPY`, `ABOUT_COPY`, `CONTACT_COPY`, `CHATBOT_UI_COPY`,
`CHATBOT_SUGGESTIONS`, `CHATBOT_KNOWLEDGE_BASE`.

---

## 2. Structure de fichiers cible (`src/content/`)

Chaque fichier importe `import type { Lang } from '../i18n';` (chemin valide depuis
`src/content/` vers `src/i18n/index.tsx`).

```
src/content/
  types.ts              // CtaCopy, NavLinkCopy, TeaserCard + types service partages (voir §3)
  home.ts               // NAV_COPY, HERO_COPY, SERVICES_TEASER_COPY,
                        // PROJECTS_TEASER_COPY, FINAL_CTA_COPY
  services.ts           // SERVICE_IA_COPY, PRODUCT_SERVICE_COPY, SERVICE_FORMATION_COPY
                        // (re-export depuis services/ ci-dessous si on prefere 1 fichier/offre)
  services/
    serviceIa.ts        // SERVICE_IA_COPY            (offre 01)
    productService.ts   // PRODUCT_SERVICE_COPY + buildProjectMailto  (offre 02)
    serviceFormation.ts // SERVICE_FORMATION_COPY     (offre 03)
  about.ts              // ABOUT_COPY
  contact.ts            // CONTACT_COPY
  chatbot/
    ui.ts               // CHATBOT_UI_COPY
    suggestions.ts      // ChatIntent + CHATBOT_SUGGESTIONS
    tools.ts            // AppRoute, ServiceSlug, ProductName, ChatbotTools,
                        // CONTACT_EMAIL, buildMailto
    knowledgeBase.ts    // ChatAction, KnowledgeEntry, CHATBOT_KNOWLEDGE_BASE
  index.ts              // barrel: re-exporte tout le contenu
```

Notes de decoupage :
- `chatbot.md` impose deja ses propres chemins relatifs internes (`./suggestions`, `./tools`),
  donc le sous-dossier `src/content/chatbot/` est le mapping direct — a privilegier tel quel.
- Variante minimale acceptable : un seul `src/content/services.ts` regroupant les 3 offres
  (les 3 objets sont independants, pas de dependance croisee).
- `CONTACT_EMAIL` est defini deux fois (chatbot.md `tools.ts` et service-produit.md inline) :
  le centraliser dans `src/content/chatbot/tools.ts` (ou un `src/content/constants.ts`) et le
  reutiliser depuis `productService.ts` pour eviter la duplication.

---

## 3. Incoherences a harmoniser avant integration

### 3.1 Chemin d'import de `Lang` (3 styles differents)
- `home.md` : `../../i18n` (pensait `src/pages/.../*.copy.ts`)
- `service-ia.md` : `@/i18n` (alias non configure dans ce CRA — verifier `tsconfig`/`jsconfig`)
- `service-produit.md`, `service-formation.md`, `about-contact.md`, `chatbot.md` : `../i18n`
> A harmoniser sur **`../i18n`** une fois les fichiers places dans `src/content/`.
> `@/i18n` casse si aucun alias n'est defini — a corriger imperativement.

### 3.2 Forme du type des objets COPY
- `home.md` definit des **interfaces nommees exportees** (`HeroCopy`, `NavCopy`, ...).
- Les 5 autres blocs utilisent des **types inline** dans `Record<Lang, { ... }>`.
> Recommandation : extraire des interfaces nommees pour les offres
> (`ServiceIaCopy`, `ProductServiceCopy`, `ServiceFormationCopy`, `AboutCopy`,
> `ContactCopy`) dans `src/content/types.ts` pour la coherence et la reutilisation.

### 3.3 Schema des 3 offres non aligne
Les 3 offres devraient partager un socle commun mais divergent :
- `service-ia.md` : `{ number, title, promise, description, deliverables: string[], proof, cta }`
  — **pas d'`eyebrow`**, `deliverables` = `string[]`.
- `service-produit.md` : `{ number, eyebrow, title, promise, description,
  deliverables: {label, detail}[], caseStudy, cta }` — a un `eyebrow`, `deliverables` structures,
  bloc `caseStudy` riche, `cta` enrichi (`{kicker, button, note, mailtoSubject, mailtoBody}`).
- `service-formation.md` : `{ number, title, promise, description,
  content: {label, text}[], proof, cta }` — **pas d'`eyebrow`**, la liste s'appelle
  **`content`** (pas `deliverables`), item = `{label, text}`.
> A harmoniser : nommer la liste de la même façon (ex. `deliverables`) avec une forme
> commune `{ label: string; detail/text: string }[]`, decider si `eyebrow` est present
> partout, et factoriser `proof` vs `caseStudy` (l'offre 02 a `caseStudy`, les offres 01/03
> ont `proof`) — soit un champ optionnel unique, soit deux champs clairement optionnels.

### 3.4 Forme du `cta` divergente
- `home.md`, `service-ia.md`, `service-formation.md` : `cta = { label, href }`.
- `service-produit.md` : `cta = { kicker, button, note, mailtoSubject, mailtoBody }`
  (+ helper `buildProjectMailto`).
- `about-contact.md` (`CONTACT_COPY`) : `cta = { heading, button, reassurance }`,
  le `href` pointant implicitement vers `channels.email.href`.
> Convention `CtaCopy` partagee (`{label, href}`) pour les CTA simples ; traiter les CTA
> "mailto pre-rempli" (offre 02, chatbot) via un type dedie + helper unique de construction.

### 3.5 Construction du mailto dupliquee / divergente
- `service-produit.md` `buildProjectMailto` : `URLSearchParams` puis `.replace(/\+/g, '%20')`.
- `chatbot.md` `buildMailto` : `URLSearchParams` **sans** le remplacement `+` -> `%20`.
> Risque : encodage d'espaces incoherent entre les deux. Centraliser **un seul** helper
> `buildMailto(prefill)` (avec remplacement `+` -> `%20`) dans `src/content/chatbot/tools.ts`
> et le reutiliser partout.

### 3.6 Slugs de services incoherents entre blocs
- Teaser/offres (home + fichiers service) : ordre/labels = 01 Solutions IA, 02 Dev produit,
  03 Formation.
- `chatbot.md` : `ServiceSlug = 'mvp' | 'local-ai' | 'training'` et libelle l'offre 01 comme
  **"Développement de MVP"** alors que la page "offre 01" est **"Solutions IA"** et l'offre 02
  est le **developpement produit**. Le mapping intent/offre du chatbot melange donc MVP (=dev
  produit, offre 02) et IA locale (offre 01).
> A clarifier : aligner les `ServiceSlug` du chatbot sur les 3 offres reelles
> (ex. `ai` / `product` / `training`) et corriger les libelles, sinon le chatbot oriente
> vers la mauvaise offre.

### 3.7 Route ciblee par `recommendService` invalide
- `chatbot.md` `ChatbotTools.recommendService` documente : "ouvre `/about?service=slug`".
- Or il existe une vraie route **`/services`** (et `AppRoute` du chatbot ne liste meme pas
  `/services`).
> Corriger : `recommendService` doit pointer vers `/services` (ancre/param), et ajouter
> `'/services'` dans le type `AppRoute`.

### 3.8 Coquilles mineures
- `about-contact.md` ligne 2 : "(FR/ER)" -> devrait etre "(FR/EN)".
- Accents incoherents entre blocs : `home.md` est majoritairement sans accents,
  les autres avec accents. Harmoniser (de preference **avec** accents pour le rendu).
- `service-produit.md` `buildProjectMailto` importe `from './productServiceCopy'` :
  ajuster au nom de fichier cible reel (`./productService` ou `../content/services`).

---

## 4. Recap CTA / cibles (verite verifiable)

| Constante | Cible | Note |
| --- | --- | --- |
| `NAV_COPY` / `HERO_COPY` / `FINAL_CTA_COPY` | `/contact` (+ `/projects` pour hero secondaire) | routes valides |
| `SERVICES_TEASER_COPY` | `/services` | route valide |
| `PROJECTS_TEASER_COPY` | `/projects` | route valide |
| `SERVICE_IA_COPY` / `PRODUCT_SERVICE_COPY` / `SERVICE_FORMATION_COPY` | `mailto:alexandrelebegue12@gmail.com` | CTA mailto |
| `ABOUT_COPY` | section interne | pas de CTA route |
| `CONTACT_COPY` | `mailto:` + LinkedIn + GitHub (liens reels) | OK |
| `CHATBOT_*` | outils deterministes (`navigateTo`, `recommendService`, `openContactMail`, `showProjects`, `promoteProduct`) | voir §3.6/§3.7 |
```
