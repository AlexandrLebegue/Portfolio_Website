import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

/**
 * Langues supportees par le site.
 * Le contrat impose exactement ces deux valeurs.
 */
export type Lang = 'fr' | 'en';

/** Cle de persistance dans le localStorage. */
const STORAGE_KEY = 'lang';

/** Langues valides (utilise pour valider la valeur stockee). */
const SUPPORTED_LANGS: readonly Lang[] = ['fr', 'en'];

/** Verifie qu'une chaine inconnue est bien une Lang supportee. */
function isLang(value: unknown): value is Lang {
  return typeof value === 'string' && (SUPPORTED_LANGS as readonly string[]).includes(value);
}

/**
 * Determine la langue initiale :
 * 1. valeur valide en localStorage si presente,
 * 2. sinon detection via navigator.language (commence par 'fr' -> 'fr'),
 * 3. defaut 'fr'.
 */
function getInitialLang(): Lang {
  // SSR / environnements sans window : on retombe sur le defaut.
  if (typeof window === 'undefined') {
    return 'fr';
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLang(stored)) {
      return stored;
    }
  } catch {
    // localStorage peut etre indisponible (mode prive, etc.) : on ignore.
  }

  const nav = typeof navigator !== 'undefined' ? navigator.language : '';
  return nav && nav.toLowerCase().startsWith('fr') ? 'fr' : 'en';
}

/** Type du contexte de langue. */
type LangContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  /**
   * Traduction : renvoie l'entree du dictionnaire correspondant a la langue
   * active. Generique pour accepter des chaines, des noeuds React, etc.
   */
  t: <T,>(dict: Record<Lang, T>) => T;
};

// Contexte type avec un defaut coherent (sera ecrase par le Provider).
const LangContext = createContext<LangContextType>({
  lang: 'fr',
  setLang: () => {},
  t: (dict) => dict.fr,
});

/**
 * Fournit la langue active a tout l'arbre.
 * - langue par defaut 'fr'
 * - persiste le choix dans localStorage (clef 'lang')
 * - met a jour document.documentElement.lang
 */
export function LanguageProvider(props: { children: React.ReactNode }): React.JSX.Element {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  // Synchronise l'attribut lang du <html> a chaque changement.
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  // Met a jour l'etat + persiste le choix utilisateur.
  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // Persistance best-effort : on ignore les erreurs de stockage.
    }
  }, []);

  // Fonction de traduction stable, recreee uniquement quand la langue change.
  const t = useCallback(
    <T,>(dict: Record<Lang, T>): T => dict[lang],
    [lang],
  );

  const value = useMemo<LangContextType>(
    () => ({ lang, setLang, t }),
    [lang, setLang, t],
  );

  return <LangContext.Provider value={value}>{props.children}</LangContext.Provider>;
}

/**
 * Hook d'acces a la langue active et a l'aide de traduction.
 * Exemple : const { t } = useLang(); t({ fr: 'Bonjour', en: 'Hello' })
 */
export function useLang(): LangContextType {
  return useContext(LangContext);
}

/**
 * Petit toggle FR | EN.
 * Bouton actif en accent (primary), style sobre mono facon kicker.
 * Accessible via aria-pressed sur chaque option.
 */
export function LangSwitch(): React.JSX.Element {
  const { lang, setLang } = useLang();

  // Rendu d'un bouton de langue : actif = primary, inactif = neutre discret.
  const renderButton = (value: Lang, label: string) => {
    const active = lang === value;
    return (
      <button
        type="button"
        aria-pressed={active}
        aria-label={value === 'fr' ? 'Francais' : 'English'}
        onClick={() => setLang(value)}
        className={[
          'px-2 py-1 text-xs font-code uppercase tracking-wider rounded-md',
          'transition-colors duration-normal',
          active
            ? 'bg-primary text-white'
            : 'text-text-secondary-dark hover:text-primary',
        ].join(' ')}
      >
        {label}
      </button>
    );
  };

  return (
    <div
      role="group"
      aria-label="Language selector"
      className="inline-flex items-center gap-1 rounded-lg border border-ui-border-light p-0.5"
    >
      {renderButton('fr', 'FR')}
      <span aria-hidden="true" className="text-ui-border-light select-none">
        |
      </span>
      {renderButton('en', 'EN')}
    </div>
  );
}
