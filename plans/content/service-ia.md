# Offre 01 — Accompagnement & mise en place de solutions IA

> Section "Services" du site. Bloc bilingue (FR/EN) prêt à coller.
> Type `Lang` importé depuis `src/i18n/index.tsx` (`export type Lang = 'fr' | 'en'`).

## Objet TypeScript (prêt à coller)

```ts
import type { Lang } from '@/i18n';

export const SERVICE_IA_COPY: Record<
  Lang,
  {
    number: string;
    title: string;
    promise: string;
    description: string;
    deliverables: string[];
    proof: { label: string; text: string };
    cta: { label: string; href: string };
  }
> = {
  fr: {
    number: '01',
    title: 'Accompagnement & mise en place de solutions IA',
    promise:
      'Une IA qui tourne chez vous, sur vos données, et qui produit des résultats — pas une démo.',
    description:
      'J’intègre l’IA dans vos opérations sans envoyer vos données à un tiers : modèles en local / on-premise, agents outillés connectés à vos systèmes, et assistants taillés pour vos processus. De l’audit du besoin jusqu’au déploiement, vous gardez le contrôle de votre stack et de vos données.',
    deliverables: [
      'Déploiement d’IA locale / on-premise — vos modèles tournent sur votre infrastructure, vos données ne sortent pas.',
      'Agents IA outillés, connectés à vos outils (fichiers, API, messageries, bases internes) pour automatiser des tâches réelles.',
      'Fine-tuning et spécialisation de modèles sur votre métier et votre vocabulaire.',
      'Sécurité & données sensibles : architecture pensée pour les environnements contraints et la confidentialité.',
      'Mise en place d’assistants self-hosted type OpenClaw / Paperclip, adaptés à vos canaux.',
      'Réduction des coûts : moins de dépendance aux API facturées au volume, plus de maîtrise.',
    ],
    proof: {
      label: 'Preuve',
      text:
        'Chez Sodern (aérospatial / optique), j’ai conçu et déployé des outils IA fine-tunés pour un service interne, en environnement contraint et sur données sensibles. Concrètement : faire fonctionner l’IA là où le cloud public n’est pas une option, avec une rigueur d’ingénieur embarqué.',
    },
    cta: {
      label: 'Discutons de votre cas',
      href: 'mailto:alexandrelebegue12@gmail.com?subject=Solutions%20IA%20%E2%80%94%20projet',
    },
  },
  en: {
    number: '01',
    title: 'AI solutions — guidance & deployment',
    promise:
      'AI that runs on your side, on your data, and delivers results — not a demo.',
    description:
      'I bring AI into your operations without handing your data to a third party: local / on-premise models, tool-equipped agents wired into your systems, and assistants shaped around your processes. From scoping to deployment, you stay in control of your stack and your data.',
    deliverables: [
      'Local / on-premise AI deployment — your models run on your infrastructure, your data never leaves.',
      'Tool-equipped AI agents connected to your stack (files, APIs, messaging, internal databases) to automate real work.',
      'Fine-tuning and model specialization on your domain and vocabulary.',
      'Security & sensitive data: architecture built for constrained environments and confidentiality.',
      'Self-hosted assistants in the spirit of OpenClaw / Paperclip, adapted to your channels.',
      'Cost reduction: less reliance on per-token billed APIs, more control.',
    ],
    proof: {
      label: 'Proof',
      text:
        'At Sodern (aerospace / optics), I designed and deployed fine-tuned AI tools for an internal team, in a constrained environment and on sensitive data. In short: making AI work where the public cloud isn’t an option, with embedded-engineer rigor.',
    },
    cta: {
      label: 'Let’s talk about your case',
      href: 'mailto:alexandrelebegue12@gmail.com?subject=AI%20solutions%20%E2%80%94%20project',
    },
  },
};
```

## Note structure visuelle & intention d'animation

- Carte numérotée `01` en très grand chiffre fantôme (filigrane) en haut/gauche, titre et promesse en gras juste à côté — pose le rythme de la liste d'offres (01/02/03).
- Layout 2 colonnes au-dessus de `md` : à gauche promesse + description, à droite la liste de livrables en puces avec un petit chevron/point lumineux par item.
- Bloc `proof` détaché en bas (encadré sobre, ton "credibility line"), suivi du CTA en bouton plein, aligné fin de carte.
- Animation : `reveal` au scroll (fade + translate-y) en cascade — d'abord le chiffre `01`, puis titre, puis puces décalées (~60ms de stagger) ; léger `parallax` sur le chiffre filigrane pour la profondeur. Respecter `prefers-reduced-motion`.
