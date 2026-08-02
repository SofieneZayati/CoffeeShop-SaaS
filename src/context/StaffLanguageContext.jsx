import { cloneElement, createContext, isValidElement, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "green-coffee-staff-language-v1";

const sharedMessages = {
  en: {
    "role.owner": "Owner",
    "role.manager": "Manager",
    "role.barista": "Barista",
    "role.customer": "Customer",
    "role.tableGuest": "Table guest",
    "nav.workspace": "Workspace",
    "nav.grow": "Grow",
    "nav.experience": "Experience",
    "view.overview": "Overview",
    "view.orders": "Live orders",
    "view.menu": "Menu & QR",
    "view.reservations": "Reservations",
    "view.floor": "Floor plan",
    "view.customers": "Customers & loyalty",
    "view.marketing": "Campaigns & feedback",
    "view.insights": "Insights",
    "view.automation": "AI & automation",
    "view.experiences": "Games & events",
    "view.settings": "Platform setup",
  },
  fr: {
    "role.owner": "Propriétaire",
    "role.manager": "Responsable",
    "role.barista": "Barista",
    "role.customer": "Client",
    "role.tableGuest": "Client à table",
    "nav.workspace": "Espace de travail",
    "nav.grow": "Développer",
    "nav.experience": "Expérience",
    "view.overview": "Vue d’ensemble",
    "view.orders": "Commandes en direct",
    "view.menu": "Carte et QR",
    "view.reservations": "Réservations",
    "view.floor": "Plan de salle",
    "view.customers": "Clients et fidélité",
    "view.marketing": "Campagnes et avis",
    "view.insights": "Analyses",
    "view.automation": "IA et automatisation",
    "view.experiences": "Jeux et événements",
    "view.settings": "Configuration",
  },
};

const StaffLanguageContext = createContext(null);

function initialLocale() {
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === "fr" ? "fr" : "en";
}

function interpolate(message, variables = {}) {
  return Object.entries(variables).reduce(
    (text, [name, value]) => text.replaceAll(`{{${name}}}`, String(value)),
    String(message),
  );
}

export function translateStaffText(text, locale, dictionary = {}, patterns = []) {
  if (typeof text !== "string") return text;
  let translated = dictionary[locale]?.[text] ?? dictionary.en?.[text] ?? text;
  for (const pattern of patterns) {
    if (typeof pattern === "function") {
      translated = pattern(translated, locale) ?? translated;
    } else if (pattern?.pattern) {
      const replacement = typeof pattern.replace === "function"
        ? (...args) => pattern.replace(locale, ...args)
        : pattern[locale] ?? pattern.replace;
      if (replacement !== undefined) translated = translated.replace(pattern.pattern, replacement);
    }
  }
  return translated;
}

export function StaffLanguageProvider({ children }) {
  const [locale, setLocaleState] = useState(initialLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((nextLocale) => {
    const normalized = nextLocale === "fr" ? "fr" : "en";
    setLocaleState(normalized);
    if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, normalized);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((current) => {
      const next = current === "en" ? "fr" : "en";
      if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const t = useCallback((key, fallback, variables) => {
    const localizedFallback = fallback && typeof fallback === "object"
      ? fallback[locale] ?? fallback.en ?? fallback.fr
      : fallback;
    const message = sharedMessages[locale]?.[key]
      ?? localizedFallback
      ?? sharedMessages.en[key]
      ?? key;
    return interpolate(message, variables);
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale, toggleLocale, t }), [locale, setLocale, toggleLocale, t]);
  return <StaffLanguageContext.Provider value={value}>{children}</StaffLanguageContext.Provider>;
}

const TRANSLATED_PROPS = ["title", "subtitle", "description", "action", "label", "aria-label", "placeholder", "alt"];

export function StaffLocalized({ children, dictionary = {}, patterns = [] }) {
  const { locale } = useStaffLanguage();

  const localizeNode = useCallback((node) => {
    if (typeof node === "string") return translateStaffText(node, locale, dictionary, patterns);
    if (Array.isArray(node)) return node.map(localizeNode);
    if (!isValidElement(node)) return node;

    const nextProps = {};
    for (const propName of TRANSLATED_PROPS) {
      if (typeof node.props[propName] === "string") {
        nextProps[propName] = translateStaffText(node.props[propName], locale, dictionary, patterns);
      }
    }
    if (node.props.children !== undefined) nextProps.children = localizeNode(node.props.children);
    if (node.type === "option" && node.props.value === undefined && typeof node.props.children === "string") {
      nextProps.value = node.props.children;
    }
    return cloneElement(node, nextProps);
  }, [dictionary, locale, patterns]);

  return localizeNode(children);
}

export function useStaffLanguage() {
  const context = useContext(StaffLanguageContext);
  if (!context) throw new Error("useStaffLanguage must be used inside StaffLanguageProvider");
  return context;
}
