import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  CalendarDays,
  Camera,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Coffee,
  Copy,
  CreditCard,
  Gamepad2,
  Gift,
  Heart,
  History,
  Home,
  Languages,
  LockKeyhole,
  LogOut,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Plus,
  QrCode,
  RotateCcw,
  ScanLine,
  Search,
  ShoppingBag,
  ShieldCheck,
  Share2,
  Sparkles,
  Star,
  TicketCheck,
  Trash2,
  Trophy,
  UserRound,
  UsersRound,
  WalletCards,
  Timer,
  X,
} from "lucide-react";
import { events, gamesSeed, menuItemsSeed, ordersSeed, reservationsSeed, tablesSeed } from "../data/demoData";
import { usePersistentState } from "../hooks";
import { Avatar, Badge, BrandMark, Button, IconButton, Progress, SectionTitle } from "../components/ui";
import "../styles/customer-experience.css";

const customerTabs = [
  { id: "menu", label: "Menu", labelFr: "Menu", icon: Coffee },
  { id: "orders", label: "My orders", labelFr: "Mes commandes", icon: ShoppingBag },
  { id: "rewards", label: "Rewards", labelFr: "Récompenses", icon: Gift },
  { id: "reservations", label: "Bookings", labelFr: "Réservations", icon: CalendarDays },
  { id: "events", label: "Events", labelFr: "Événements", icon: Gamepad2 },
  { id: "profile", label: "Profile", labelFr: "Profil", icon: UserRound },
];

const customerCategories = ["All", "Coffee", "Tea & infusions", "Cold drinks", "Pastries", "Desserts", "Crepes & waffles", "Savory snacks", "Breakfast", "Kids Park"];
const categoryLabelsFr = {
  All: "Tout",
  Coffee: "Cafés",
  "Tea & infusions": "Thé et infusion",
  "Cold drinks": "Boissons froides",
  Pastries: "Viennoiserie",
  Desserts: "Pâtisserie",
  "Crepes & waffles": "Crêpes et gaufres",
  "Savory snacks": "Snacks salés",
  Breakfast: "Petit déjeuner",
  "Kids Park": "Parc enfants",
};

const customerCopy = {
  en: {
    openUntil: "Open until 23:00", orderingLocked: "Ordering locked", verifyTable: "Verify table", minLeft: "min left", points: "points",
    notifications: "Notifications", allCaughtUp: "You’re all caught up — no new notifications", guestMode: "Guest mode", openDemoRoles: "Choose an account", openProfile: "Open profile", member: "member",
    viewBasket: "View basket", menuNav: "Customer navigation", mobileNav: "Customer mobile navigation",
    added: "customized and added to your basket", tableVerified: "verified • this table visit is ready to order", disconnected: "This device was disconnected from the table session",
    verifyBeforeOrder: "Verify an active table session before placing an order", sentForAcceptance: "was sent to the café for acceptance", scanBeforeGame: "Scan your table QR before requesting a shelf game",
    gateVerified: "IN-CAFÉ SESSION VERIFIED", gateLocked: "SCAN AT YOUR TABLE TO ORDER", tableReady: "is ready for your order.", browseOnly: "Browse anywhere. Order only from your table.",
    visitExpiry: "Your visit session expires in {minutes} minutes and closes when the table is cleared.", scanExplanation: "When you arrive, scan the QR fixed to your table. It identifies your table and starts a short, protected ordering visit.",
    disconnect: "Disconnect device", scanQr: "Scan table QR", realMenu: "REAL MENU • MÉGRINE", heroTitle: "Everything you love,", heroEm: "ready at your table.",
    heroText: "Coffee, cold drinks, breakfast, crêpes, waffles, savory snacks and 5 DT Kids Park access.", exploreMenu: "Explore the menu", guestRating: "4.9 from 286 guests", todayPick: "Today’s pick", todayItem: "Iced coffee",
    rewardTitle: "You’re 80 points from a free drink", rewardText: "One more visit could do it.", seeRewards: "See my rewards",
    menuKicker: "THE REAL GREEN MENU", menuTitle: "Choose what you love.", menuText: "53 real café items, with clear details and the right options for each one.", searchPlaceholder: "Search the menu…", searchLabel: "Search the menu", categoryLabel: "Menu categories",
    popular: "Popular", choose: "Choose", viewDetails: "View {name} details", addFavorite: "Add {name} to favorites", removeFavorite: "Remove {name} from favorites", removeOne: "Remove one {name}", customizeAnother: "Customize another {name}",
    nothingFound: "Nothing found", tryAnother: "Try another search or menu category.",
    productFavorite: "Guest favorite", readyIn: "Ready in 8–12 min", madeToOrder: "Made to order", ingredients: "Ingredients & allergens", listedAllergens: "Listed allergens: {items}.", noAllergens: "No major allergen is listed for this item.", allergyNote: "Please tell the café team about severe allergies or cross-contact concerns.", chooseOne: "Choose one", included: "Included", makeYours: "Make it yours", optionalExtras: "Optional extras", teamNote: "Note for the team", optional: "Optional", notePlaceholder: "For example: sauce on the side", decrease: "Decrease quantity", increase: "Increase quantity", addToBasket: "Add to basket",
    cartEyebrow: "Your table order", cartTitle: "A lovely choice.", verifiedDineIn: "verified dine-in session", checkoutLocked: "Checkout is locked until your table is verified", closeBasket: "Close basket", asListed: "As listed", basketEmpty: "Your basket is empty", basketEmptyText: "Something delicious is waiting on the menu.", subtotal: "Subtotal", service: "Service", total: "Total", placeOrder: "Place order for", scanToOrder: "Scan table QR to order", sessionExpires: "Session expires automatically and closes with the table", remoteBlocked: "Remote checkout is blocked",
    visitActive: "VISIT ACTIVE", onsiteCheck: "ON-SITE TABLE CHECK", scanYourTable: "Scan the QR on your table.", qrVisit: "QR-started table visit", minutesRemaining: "minutes remaining", checkoutBound: "Checkout is bound to", autoExpiry: "The visit expires automatically", staffClears: "Staff clearing the table blocks more orders", disconnectThis: "Disconnect this device", continueOrdering: "Continue ordering", scanTab: "Scan QR", codeTab: "Enter code", startingCamera: "Starting camera…", cameraUnavailable: "Camera unavailable", cameraFallback: "Continue with the table code below.", scanSafety: "The table QR and café network confirm that this device is on site before ordering is unlocked.", recognizing: "Recognizing table…", simulateScan: "Confirm table T08", retryCamera: "Try camera again", manualHelp: "Can’t use the camera? Enter the short code printed beneath the table QR. This is also useful for accessibility.", tableCode: "Table code", demoCodeError: "We couldn’t match that code. Try T08 or GREEN-08.", tableUnavailable: "This table is not ready for ordering. Please choose another table or ask the team for help.", interactiveDemo: "Accepted table codes", codeHint: "Use T08 or GREEN-08 to continue.", startVisit: "Start this table visit", close: "Close",
  },
  fr: {
    openUntil: "Ouvert jusqu’à 23h00", orderingLocked: "Commande verrouillée", verifyTable: "Vérifier la table", minLeft: "min restantes", points: "points",
    notifications: "Notifications", allCaughtUp: "Vous êtes à jour — aucune nouvelle notification", guestMode: "Mode invité", openDemoRoles: "Choisir un compte", openProfile: "Ouvrir le profil", member: "membre",
    viewBasket: "Voir le panier", menuNav: "Navigation client", mobileNav: "Navigation mobile client",
    added: "personnalisé et ajouté au panier", tableVerified: "vérifiée • la visite peut commander", disconnected: "Cet appareil a été déconnecté de la session de table",
    verifyBeforeOrder: "Vérifiez une session de table active avant de commander", sentForAcceptance: "a été envoyée au café pour validation", scanBeforeGame: "Scannez le QR de votre table avant de demander un jeu",
    gateVerified: "SESSION SUR PLACE VÉRIFIÉE", gateLocked: "SCANNEZ À VOTRE TABLE POUR COMMANDER", tableReady: "est prête pour votre commande.", browseOnly: "Consultez le menu partout. Commandez uniquement à votre table.",
    visitExpiry: "Votre session expire dans {minutes} minutes et se ferme lorsque la table est libérée.", scanExplanation: "À votre arrivée, scannez le QR fixé à la table. Il identifie votre table et démarre une visite de commande protégée.",
    disconnect: "Déconnecter l’appareil", scanQr: "Scanner le QR de table", realMenu: "CARTE RÉELLE • MÉGRINE", heroTitle: "Tout ce que vous aimez,", heroEm: "prêt à votre table.",
    heroText: "Cafés, boissons froides, petit déjeuner, crêpes, gaufres, snacks salés et accès parc enfants à 5 DT.", exploreMenu: "Voir la carte", guestRating: "4,9 selon 286 clients", todayPick: "Choix du jour", todayItem: "Café glacé",
    rewardTitle: "Plus que 80 points avant une boisson offerte", rewardText: "Une visite de plus pourrait suffire.", seeRewards: "Voir mes récompenses",
    menuKicker: "LA VRAIE CARTE GREEN", menuTitle: "Choisissez ce qui vous plaît.", menuText: "53 articles réels, avec des détails clairs et les bonnes options pour chacun.", searchPlaceholder: "Rechercher dans la carte…", searchLabel: "Rechercher dans la carte", categoryLabel: "Catégories de la carte",
    popular: "Populaire", choose: "Choisir", viewDetails: "Voir les détails de {name}", addFavorite: "Ajouter {name} aux favoris", removeFavorite: "Retirer {name} des favoris", removeOne: "Retirer un {name}", customizeAnother: "Personnaliser un autre {name}",
    nothingFound: "Aucun résultat", tryAnother: "Essayez une autre recherche ou catégorie.",
    productFavorite: "Favori des clients", readyIn: "Prêt en 8–12 min", madeToOrder: "Préparé à la commande", ingredients: "Ingrédients et allergènes", listedAllergens: "Allergènes indiqués : {items}.", noAllergens: "Aucun allergène majeur n’est indiqué pour cet article.", allergyNote: "Signalez toujours les allergies sévères et risques de contamination à l’équipe.", chooseOne: "Choisissez une option", included: "Inclus", makeYours: "Personnalisez", optionalExtras: "Suppléments facultatifs", teamNote: "Note pour l’équipe", optional: "Facultatif", notePlaceholder: "Exemple : sauce à part", decrease: "Diminuer la quantité", increase: "Augmenter la quantité", addToBasket: "Ajouter au panier",
    cartEyebrow: "Votre commande à table", cartTitle: "Excellent choix.", verifiedDineIn: "session sur place vérifiée", checkoutLocked: "La commande est verrouillée jusqu’à la vérification de votre table", closeBasket: "Fermer le panier", asListed: "Comme indiqué", basketEmpty: "Votre panier est vide", basketEmptyText: "Une belle envie vous attend dans la carte.", subtotal: "Sous-total", service: "Service", total: "Total", placeOrder: "Commander pour", scanToOrder: "Scanner le QR pour commander", sessionExpires: "La session expire automatiquement et se ferme avec la table", remoteBlocked: "La commande à distance est bloquée",
    visitActive: "VISITE ACTIVE", onsiteCheck: "VÉRIFICATION SUR PLACE", scanYourTable: "Scannez le QR sur votre table.", qrVisit: "Visite démarrée par QR", minutesRemaining: "minutes restantes", checkoutBound: "La commande est liée à", autoExpiry: "La visite expire automatiquement", staffClears: "Libérer la table bloque les nouvelles commandes", disconnectThis: "Déconnecter cet appareil", continueOrdering: "Continuer la commande", scanTab: "Scanner le QR", codeTab: "Saisir le code", startingCamera: "Démarrage de la caméra…", cameraUnavailable: "Caméra indisponible", cameraFallback: "Continuez avec le code de table ci-dessous.", scanSafety: "Le QR de table et le réseau du café confirment la présence de cet appareil sur place avant d’autoriser la commande.", recognizing: "Reconnaissance de la table…", simulateScan: "Confirmer la table T08", retryCamera: "Réessayer la caméra", manualHelp: "Caméra indisponible ? Saisissez le code court imprimé sous le QR de la table. Cette option améliore aussi l’accessibilité.", tableCode: "Code de table", demoCodeError: "Code introuvable. Essayez T08 ou GREEN-08.", tableUnavailable: "Cette table n’est pas disponible pour commander. Choisissez-en une autre ou demandez de l’aide à l’équipe.", interactiveDemo: "Codes de table acceptés", codeHint: "Utilisez T08 ou GREEN-08 pour continuer.", startVisit: "Démarrer cette visite", close: "Fermer",
  },
};
const GREEN_COFFEE_MAP_URL = "https://maps.app.goo.gl/43Fah1d5SSyX5r2W6";
const TABLE_SESSION_IDLE_MINUTES = 45;

function formatMoney(value, locale = "en") {
  const amount = Number(value || 0);
  return `${amount.toLocaleString(locale === "fr" ? "fr-TN" : "en-TN", { minimumFractionDigits: 0, maximumFractionDigits: 3 })} DT`;
}

function localizeItem(item, locale) {
  const source = item?._source || item;
  if (locale !== "fr") return { ...source, _source: source };
  return {
    ...source,
    _source: source,
    name: source.nameFr || source.name,
    description: source.descriptionFr || source.description,
    ingredients: source.ingredientsFr || source.ingredients,
    tags: source.tagsFr || source.tags || [],
    alt: source.altFr || `${source.nameFr || source.name} — ${source.descriptionFr || source.description}`,
  };
}

function normalizeSearchText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function localizeCategory(category, locale) {
  return locale === "fr" ? categoryLabelsFr[category] || category : category;
}

function interpolate(template, values) {
  return Object.entries(values).reduce((result, [key, value]) => result.replace(`{${key}}`, value), template);
}

function customerCategoryOf(item) {
  if (item.customerCategory) return item.customerCategory;
  if (["Signature", "Slow coffee", "Coffee"].includes(item.category)) return "Coffee";
  if (["Cold coffee", "Refreshers"].includes(item.category)) return "Cold drinks";
  if (item.category === "Bakery") return "Pastries";
  return item.category;
}

function productOptions(item) {
  const category = customerCategoryOf(item);
  const name = `${item.name || ""} ${item.nameFr || ""}`.toLowerCase();
  if (category === "Breakfast") {
    const addOns = [];
    if (item.id === 51 || /classic|classique/.test(name)) addOns.push({ name: "Tuna omelette upgrade", price: 2 });
    if (item.id === 52 || /green coffee games/.test(name)) addOns.push({ name: "Extra crepe", price: 4 });
    return {
      choices: [
        { label: "Coffee", values: [{ name: "Espresso", price: 0 }, { name: "Direct coffee", price: 0 }, { name: "Capucin", price: 0 }, { name: "Nescafe", price: 0 }] },
        { label: "Pastry", values: [{ name: "Croissant", price: 0 }, { name: "Pain au chocolat", price: 0 }] },
        { label: "Juice", values: [{ name: "Orange juice", price: 0 }, { name: "Strawberry juice", price: 0 }, { name: "Kiwi juice", price: 0 }] },
      ],
      addOns,
    };
  }
  if (category === "Desserts") {
    const servings = [{ name: "As prepared", price: 0 }];
    if (item.id === 29 || /fondant/.test(name)) servings.push({ name: "Warm", price: 0 });
    return { choices: [{ label: "Serving", values: servings }], addOns: [] };
  }
  if (category === "Pastries") return {
    choices: [{ label: "Serving", values: [{ name: "As prepared", price: 0 }, { name: "Warm", price: 0 }] }],
    addOns: [],
  };
  if (category === "Kids Park") return {
    choices: [{ label: "Access", values: [{ name: "One child • current visit", price: 0 }] }],
    addOns: [],
  };
  if (item.id === 49) return {
    choices: [{ label: "Supplement", values: [{ name: "Fries", price: 0 }, { name: "Cheese", price: 0 }] }],
    addOns: [],
  };
  if (category === "Coffee") return {
    choices: [{ label: "Sweetness", values: [{ name: "As prepared", price: 0 }, { name: "No sugar", price: 0 }, { name: "Light sugar", price: 0 }] }],
    addOns: name.includes("chocolat") ? [] : [{ name: "Extra espresso shot", price: 2.5 }],
  };
  if (category === "Tea & infusions") return {
    choices: [{ label: "Sweetness", values: [{ name: "As prepared", price: 0 }, { name: "No sugar", price: 0 }, { name: "Light sugar", price: 0 }] }],
    addOns: [{ name: "Fresh mint", price: 1 }],
  };
  if (category === "Cold drinks") return {
    choices: name.includes("your choice") || name.includes("au choix") ? [
      { label: "Flavor", values: name.includes("smoothie") ? [{ name: "Orange", price: 0 }, { name: "Strawberry", price: 0 }, { name: "Kiwi", price: 0 }] : [{ name: "Classic", price: 0 }, { name: "Chocolate", price: 0 }, { name: "Strawberry", price: 0 }] },
      { label: "Ice", values: [{ name: "Regular ice", price: 0 }, { name: "Light ice", price: 0 }] },
    ] : [{ label: "Serving", values: [{ name: "As prepared", price: 0 }, { name: "Light ice", price: 0 }, { name: "No ice", price: 0 }] }],
    addOns: name.includes("water") || name.includes("eau") || name.includes("soda") ? [] : [{ name: "Fresh mint", price: 1 }, { name: "Fresh lemon", price: 1 }],
  };
  if (category === "Crepes & waffles") return {
    choices: [
      { label: "Serving", values: [{ name: "Warm", price: 0 }, { name: "Room temperature", price: 0 }] },
    ],
    addOns: [{ name: "Banana", price: 2 }, { name: "Chocolate", price: 2.5 }, { name: "Almonds", price: 2.5 }],
  };
  if (category === "Savory snacks") return {
    choices: [
      { label: "Serving", values: [{ name: "As prepared", price: 0 }, { name: "Extra toasted", price: 0 }] },
    ],
    addOns: [{ name: "Extra fries", price: 2.5 }, { name: "Extra cheese", price: 2.5 }],
  };
  return {
    choices: [{ label: "Serving", values: [{ name: "As prepared", price: 0 }, { name: "Warm", price: 0 }] }],
    addOns: [],
  };
}

const modifierTranslationsFr = {
  Access: "Accès", "One child • current visit": "Un enfant • visite en cours", Coffee: "Café", Pastry: "Viennoiserie", Juice: "Jus", Espresso: "Expresso", "Direct coffee": "Direct", Capucin: "Capucin", Nescafé: "Nescafé", Croissant: "Croissant", "Pain au chocolat": "Pain au chocolat", "Orange juice": "Jus d’orange", "Strawberry juice": "Jus de fraise", "Kiwi juice": "Jus de kiwi", "Tuna omelette upgrade": "Option omelette au thon", "Extra crêpe": "Crêpe supplémentaire",
  Supplement: "Supplément", Fries: "Frites", Cheese: "Fromage", Sweetness: "Sucre", "As prepared": "Comme préparé", "No sugar": "Sans sucre", "Light sugar": "Peu sucré", "Extra espresso shot": "Dose d’expresso supplémentaire", "Fresh mint": "Menthe fraîche", Flavor: "Parfum", Orange: "Orange", Strawberry: "Fraise", Kiwi: "Kiwi", Classic: "Classique", Chocolate: "Chocolat", Ice: "Glaçons", "Regular ice": "Glaçons normaux", "Light ice": "Peu de glaçons", Serving: "Service", "No ice": "Sans glaçons", Warm: "Chaud", "Room temperature": "Température ambiante", Banana: "Banane", Almonds: "Amandes", "Extra toasted": "Bien grillé", "Extra fries": "Frites supplémentaires", "Extra cheese": "Fromage supplémentaire",
};

const modifierTranslationsFrExtra = {
  Nescafe: "Nescafé",
  "Extra crepe": "Crêpe supplémentaire",
  "Fresh lemon": "Citron frais",
};

function modifierFrenchName(name) {
  return modifierTranslationsFrExtra[name] || modifierTranslationsFr[name] || name;
}

const modifierNamesEnByFr = Object.fromEntries(
  [...Object.entries(modifierTranslationsFr), ...Object.entries(modifierTranslationsFrExtra)].map(([en, fr]) => [fr, en])
);

function modifierId(value) {
  return normalizeSearchText(value).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "option";
}

function canonicalModifierChoice(choice) {
  const fallbackName = choice?.name || "";
  const nameEn = choice?.nameEn || modifierNamesEnByFr[fallbackName] || fallbackName;
  const nameFr = choice?.nameFr || modifierFrenchName(nameEn);
  return {
    id: choice?.id || modifierId(nameEn),
    name: nameEn,
    nameEn,
    nameFr,
    price: Number(choice?.price || 0),
  };
}

function localizeStoredModifier(choice, locale) {
  const canonical = canonicalModifierChoice(choice);
  return { ...canonical, name: locale === "fr" ? canonical.nameFr : canonical.nameEn };
}

function localizeOrderLine(line, locale) {
  if (typeof line === "string") return line;
  const name = locale === "fr" ? line.nameFr || line.nameEn : line.nameEn || line.nameFr;
  const modifiers = (line.modifiers || []).map((choice) => localizeStoredModifier(choice, locale).name);
  return `${Number(line.quantity || 1)}× ${name || "Item"}${modifiers.length ? ` (${modifiers.join(", ")})` : ""}`;
}

function localizeRelativeTime(value, locale) {
  if (locale !== "fr" || !value) return value;
  if (value === "just now") return "à l’instant";
  return String(value)
    .replace(/^(\d+)m ago$/i, "il y a $1 min")
    .replace(/^(\d+) min ago$/i, "il y a $1 min")
    .replace(/^today$/i, "aujourd’hui");
}

function localizedProductOptions(item, locale) {
  const options = productOptions(item?._source || item);
  return {
    choices: options.choices.map((group) => {
      const labelEn = group.labelEn || group.label;
      const labelFr = group.labelFr || modifierFrenchName(labelEn);
      return {
        ...group,
        id: group.id || modifierId(labelEn),
        labelEn,
        labelFr,
        label: locale === "fr" ? labelFr : labelEn,
        values: group.values.map((choice) => localizeStoredModifier(choice, locale)),
      };
    }),
    addOns: options.addOns.map((choice) => localizeStoredModifier(choice, locale)),
  };
}

function productAllergens(item) {
  const source = item?._source || item;
  const text = normalizeSearchText([
    source.name,
    source.nameFr,
    source.description,
    source.descriptionFr,
    source.ingredients,
    source.ingredientsFr,
    ...(source.tags || []),
    ...(source.tagsFr || []),
  ].join(" "));
  const allergens = [];
  if (/\b(gluten|wheat|ble|flour|farine|baguette|bread|pain|focaccia|crepe|biscuit|croissant|pastry|viennoiserie|pate|waffle|gaufre|pancake|millefeuille)\b/.test(text)) allergens.push("Gluten");
  if (/\b(milk|lait|butter|beurre|cream|creme|cheese|fromage|mozzarella|emmental|ricotta|mascarpone|bechamel|yogurt|yaourt)\b/.test(text)) allergens.push("Milk");
  if (/\b(egg|eggs|oeuf|oeufs|omelette)\b/.test(text)) allergens.push("Egg");
  if (/\b(nut|nuts|noix|pistachio|pistache|almond|almonds|amande|amandes|walnut|hazelnut|noisette|noisettes|pesto|nutella)\b|fruits? a coque/.test(text)) allergens.push("Tree nuts");
  if (/\b(tuna|thon|fish|poisson)\b/.test(text)) allergens.push("Fish");
  if (/\b(mustard|moutarde)\b/.test(text)) allergens.push("Mustard");
  return [...new Set(allergens)];
}

function readVerifiedSession(accountId) {
  try {
    return JSON.parse(window.sessionStorage.getItem(`green-table-session-${accountId}`)) || null;
  } catch {
    return null;
  }
}

function sessionMinutesLeft(table) {
  if (!table?.sessionExpiresAt) return 0;
  return Math.max(0, Math.ceil((new Date(table.sessionExpiresAt).getTime() - Date.now()) / 60_000));
}

function isOrderableTable(table) {
  return Boolean(
    table?.sessionActive &&
    ["occupied", "ordering"].includes(table.status) &&
    sessionMinutesLeft(table) > 0
  );
}

function canStartTableSession(table) {
  return Boolean(table && ["available", "occupied", "ordering"].includes(table.status));
}

export default function CustomerPortal({ account, onLogout, onSwitchAccount }) {
  const isGuest = account.id === "table-guest";
  const visibleTabs = isGuest ? customerTabs.filter((tab) => ["menu", "orders", "events"].includes(tab.id)) : customerTabs;
  const [activeTab, setActiveTab] = useState("menu");
  const [locale, setLocale] = usePersistentState("green-customer-language", "en");
  const [menuItems] = usePersistentState("green-os-menu-v4", menuItemsSeed);
  const [orders, setOrders] = usePersistentState("green-os-orders-v2", ordersSeed);
  const [reservations, setReservations] = usePersistentState("green-os-reservations", reservationsSeed);
  const [tables, setTables] = usePersistentState("green-os-tables-v3", tablesSeed);
  const [games, setGames] = usePersistentState("green-os-games-v1", gamesSeed);
  const [cart, setCart] = usePersistentState(`green-customer-cart-v2-${account.id}`, {});
  const [cartOpen, setCartOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(null);
  const [gamesOpen, setGamesOpen] = useState(false);
  const [sessionOpen, setSessionOpen] = useState(false);
  const [verifiedSession, setVerifiedSession] = useState(() => readVerifiedSession(account.id));
  const [, setSessionClock] = useState(() => Date.now());
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [favoriteIds, setFavoriteIds] = usePersistentState(`green-customer-favorites-${account.id}`, [1, 5]);
  const [toast, setToast] = useState("");
  const copy = customerCopy[locale] || customerCopy.en;

  const activeItemsRaw = useMemo(() => menuItems.filter((item) => item.active), [menuItems]);
  const activeItems = useMemo(() => activeItemsRaw.map((item) => localizeItem(item, locale)), [activeItemsRaw, locale]);
  const filteredItems = useMemo(() => {
    const normalizedQuery = normalizeSearchText(query);
    return activeItemsRaw
      .filter((item) => {
        const searchTarget = normalizeSearchText([
          item.name,
          item.nameFr,
          item.description,
          item.descriptionFr,
          item.ingredients,
          item.ingredientsFr,
          ...(item.tags || []),
          ...(item.tagsFr || []),
        ].join(" "));
        return (category === "All" || customerCategoryOf(item) === category) && searchTarget.includes(normalizedQuery);
      })
      .map((item) => localizeItem(item, locale));
  }, [activeItemsRaw, category, locale, query]);
  const cartLines = useMemo(() => Object.entries(cart || {}).flatMap(([lineId, value]) => {
    const itemId = typeof value === "object" ? value.itemId : Number(lineId);
    const item = activeItems.find((entry) => entry.id === Number(itemId));
    const quantity = typeof value === "object" ? Number(value.quantity || 0) : Number(value || 0);
    if (!item || quantity < 1) return [];
    const selections = typeof value === "object" ? (value.selections || []).map((choice) => localizeStoredModifier(choice, locale)) : [];
    const addOns = typeof value === "object" ? (value.addOns || []).map((choice) => localizeStoredModifier(choice, locale)) : [];
    return [{ ...item, lineId, quantity, selections, addOns, note: typeof value === "object" ? value.note || "" : "", unitPrice: typeof value === "object" ? Number(value.unitPrice || item.price) : item.price }];
  }), [activeItems, cart]);
  const cartQuantityByItem = useMemo(() => cartLines.reduce((result, line) => ({ ...result, [line.id]: (result[line.id] || 0) + line.quantity }), {}), [cartLines]);
  const cartCount = cartLines.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartLines.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
  const customerOrders = orders.filter((order) => order.customerId === account.id || order.guest === account.name);
  const activeTable = tables.find((table) => table.id === verifiedSession?.tableId && table.sessionCode === verifiedSession?.sessionCode);
  const activeSession = isOrderableTable(activeTable) ? activeTable : null;

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = locale === "fr" ? "Green Coffee Games — Carte et commande" : "Green Coffee Games — Menu & ordering";
  }, [locale]);

  useEffect(() => {
    if (activeSession) {
      window.sessionStorage.setItem(`green-table-session-${account.id}`, JSON.stringify({ tableId: activeSession.id, sessionCode: activeSession.sessionCode }));
    } else {
      window.sessionStorage.removeItem(`green-table-session-${account.id}`);
    }
  }, [account.id, activeSession]);

  useEffect(() => {
    const timer = window.setInterval(() => setSessionClock(Date.now()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  function notify(message) {
    setToast(message);
    window.clearTimeout(notify.timer);
    notify.timer = window.setTimeout(() => setToast(""), 2400);
  }

  function adjust(itemId, delta) {
    setCart((current) => {
      const directKey = String(itemId);
      const configuredKey = Object.keys(current).find((key) => typeof current[key] === "object" && Number(current[key].itemId) === Number(itemId));
      const targetKey = current[directKey] != null ? directKey : configuredKey;
      if (!targetKey) return current;
      const currentValue = current[targetKey];
      const currentQuantity = typeof currentValue === "object" ? Number(currentValue.quantity || 0) : Number(currentValue || 0);
      const next = Math.max(0, currentQuantity + delta);
      const updated = { ...current, [targetKey]: typeof currentValue === "object" ? { ...currentValue, quantity: next } : next };
      if (!next) delete updated[targetKey];
      return updated;
    });
  }

  function adjustLine(lineId, delta) {
    setCart((current) => {
      const value = current[lineId];
      if (value == null) return current;
      const quantity = typeof value === "object" ? Number(value.quantity || 0) : Number(value || 0);
      const nextQuantity = Math.max(0, quantity + delta);
      const updated = { ...current };
      if (!nextQuantity) delete updated[lineId];
      else updated[lineId] = typeof value === "object" ? { ...value, quantity: nextQuantity } : nextQuantity;
      return updated;
    });
  }

  function addConfiguredItem(item, configuration) {
    const choices = configuration.selections || [];
    const addOns = configuration.addOns || [];
    const storedChoices = choices.map(canonicalModifierChoice);
    const storedAddOns = addOns.map(canonicalModifierChoice);
    const signature = [...storedChoices.map((choice) => choice.id), ...storedAddOns.map((choice) => choice.id), configuration.note || ""].join("|");
    const lineId = `${item.id}-${signature || "custom"}`.replace(/[^a-zA-Z0-9-]/g, "-").slice(0, 100);
    const unitPrice = item.price + storedChoices.reduce((sum, choice) => sum + Number(choice.price || 0), 0) + storedAddOns.reduce((sum, choice) => sum + Number(choice.price || 0), 0);
    setCart((current) => {
      const existing = current[lineId];
      const existingQuantity = typeof existing === "object" ? Number(existing.quantity || 0) : 0;
      return { ...current, [lineId]: { itemId: item.id, quantity: existingQuantity + Number(configuration.quantity || 1), selections: storedChoices, addOns: storedAddOns, note: configuration.note || "", unitPrice } };
    });
    setProductOpen(null);
    setCartOpen(true);
    notify(`${item.name} ${copy.added}`);
  }

  function toggleFavorite(itemId) {
    setFavoriteIds((current) => current.includes(itemId) ? current.filter((id) => id !== itemId) : [...current, itemId]);
  }

  function verifyTableSession(rawCode) {
    const code = String(rawCode || "").trim().toUpperCase().replace(/\s+/g, "-");
    const tableNumber = code.match(/(?:GREEN-|TABLE-|T)?(\d{1,2})$/)?.[1];
    const table = tables.find((item) => item.sessionCode === code || item.id === `T${String(tableNumber || "").padStart(2, "0")}`);
    if (!table) return false;
    if (!canStartTableSession(table)) return "unavailable";
    const sessionCode = `GREEN-${table.id.replace("T", "")}`;
    setTables((current) => current.map((item) => item.id === table.id ? { ...item, status: "ordering", sessionActive: true, sessionCode, sessionExpiresAt: new Date(Date.now() + TABLE_SESSION_IDLE_MINUTES * 60_000).toISOString() } : item));
    setVerifiedSession({ tableId: table.id, sessionCode });
    setSessionOpen(false);
    notify(`${table.id} ${copy.tableVerified}`);
    return true;
  }

  function scanTableQr(tableId = "T08") {
    const table = tables.find((item) => item.id === tableId) || tables.find((item) => item.status === "available") || tables[0];
    if (!table) return false;
    return verifyTableSession(table.id);
  }

  function endLocalSession() {
    setVerifiedSession(null);
    window.sessionStorage.removeItem(`green-table-session-${account.id}`);
    notify(copy.disconnected);
  }

  function checkout() {
    if (!cartLines.length) return;
    if (!activeSession) {
      setCartOpen(false);
      setSessionOpen(true);
      notify(copy.verifyBeforeOrder);
      return;
    }
    const nextNumber = Math.max(1048, ...orders.map((item) => Number(item.id.replace("GC-", "")) || 0)) + 1;
    const itemDetails = cartLines.map((item) => {
      const source = item._source || item;
      return {
        itemId: item.id,
        quantity: item.quantity,
        nameEn: source.name,
        nameFr: source.nameFr || source.name,
        modifiers: [...item.selections, ...item.addOns].map(canonicalModifierChoice),
      };
    });
    const order = {
      id: `GC-${nextNumber}`,
      customerId: account.id,
      table: activeSession.id,
      guest: account.name,
      source: "Verified table QR",
      sessionId: activeSession.sessionCode,
      time: "just now",
      total: cartTotal,
      status: "new",
      payment: "Pay at cashier",
      items: itemDetails.map((item) => localizeOrderLine(item, "en")),
      itemDetails,
      note: `Dine-in • ${activeSession.id} session verified${cartLines.some((item) => item.note) ? ` • ${cartLines.filter((item) => item.note).map((item) => item.note).join("; ")}` : ""}`,
    };
    setOrders((current) => [order, ...current]);
    setTables((current) => current.map((table) => table.id === activeSession.id ? {
      ...table,
      status: "ordering",
      spend: Number(table.spend || 0) + cartTotal,
    } : table));
    setCart({});
    setCartOpen(false);
    setActiveTab("orders");
    notify(`${order.id} ${copy.sentForAcceptance}`);
  }

  const renderContent = () => {
    if (activeTab === "orders") return <CustomerOrders orders={customerOrders} onBrowse={() => setActiveTab("menu")} locale={locale} />;
    if (activeTab === "rewards") return <CustomerRewards account={account} notify={notify} locale={locale} />;
    if (activeTab === "reservations") return <CustomerReservations account={account} reservations={reservations} setReservations={setReservations} notify={notify} onOpenGames={() => setGamesOpen(true)} locale={locale} />;
    if (activeTab === "events") return <CustomerEvents notify={notify} onOpenGames={() => setGamesOpen(true)} locale={locale} />;
    if (activeTab === "profile") return <CustomerProfile account={account} onSwitchAccount={onSwitchAccount} onLogout={onLogout} notify={notify} locale={locale} favoriteItems={activeItems.filter((item) => favoriteIds.includes(item.id))} onToggleFavorite={toggleFavorite} orders={customerOrders} onOpenFavorite={(item) => { setActiveTab("menu"); setProductOpen(item); }} onBrowseMenu={() => setActiveTab("menu")} />;
    return (
      <CustomerMenu
        items={filteredItems}
        category={category}
        setCategory={setCategory}
        query={query}
        setQuery={setQuery}
        cart={cartQuantityByItem}
        adjust={adjust}
        favorites={favoriteIds}
        toggleFavorite={toggleFavorite}
        onOpenCart={() => setCartOpen(true)}
        cartCount={cartCount}
        activeSession={activeSession}
        onOpenSession={() => setSessionOpen(true)}
        onEndSession={endLocalSession}
        onOpenProduct={setProductOpen}
        onRewards={() => setActiveTab("rewards")}
        isGuest={isGuest}
        locale={locale}
        copy={copy}
      />
    );
  };

  return (
    <div className="customer-portal" lang={locale}>
      <header className="customer-portal-header">
        <div className="customer-brand-block">
          <button className="customer-brand" aria-label={locale === "fr" ? "Revenir à la carte" : "Return to menu"} onClick={() => setActiveTab("menu")}><BrandMark /></button>
          <span className="customer-brand-copy"><button onClick={() => setActiveTab("menu")}>Green Coffee Games</button><a className="customer-map-link" href={GREEN_COFFEE_MAP_URL} target="_blank" rel="noreferrer" aria-label={locale === "fr" ? "Ouvrir Green Coffee Games Mégrine dans Google Maps" : "Open Green Coffee Games Mégrine in Google Maps"}><MapPin size={12} />Mégrine • {copy.openUntil}</a></span>
          <a className="customer-mobile-map-link" href={GREEN_COFFEE_MAP_URL} target="_blank" rel="noreferrer" aria-label={locale === "fr" ? "Ouvrir l’adresse dans Google Maps" : "Open location in Google Maps"}><MapPin size={17} /></a>
        </div>
        <nav aria-label={copy.menuNav}>
          {visibleTabs.map(({ id, label, labelFr }) => <button key={id} className={activeTab === id ? "active" : ""} aria-current={activeTab === id ? "page" : undefined} onClick={() => setActiveTab(id)}>{locale === "fr" ? labelFr : label}</button>)}
        </nav>
        <div className="customer-header-actions">
          <div className="customer-language-switch" role="group" aria-label={locale === "fr" ? "Choisir la langue" : "Choose language"}><Languages size={16} /><button className={locale === "en" ? "active" : ""} aria-pressed={locale === "en"} onClick={() => setLocale("en")}>EN</button><button className={locale === "fr" ? "active" : ""} aria-pressed={locale === "fr"} onClick={() => setLocale("fr")}>FR</button></div>
          <button className={`customer-session-pill${activeSession ? " verified" : ""}`} onClick={() => setSessionOpen(true)}>
            {activeSession ? <ShieldCheck size={17} /> : <LockKeyhole size={17} />}
            <span><strong>{activeSession ? activeSession.id : copy.orderingLocked}</strong><small>{activeSession ? `${sessionMinutesLeft(activeSession)} ${copy.minLeft}` : copy.verifyTable}</small></span>
          </button>
          {!isGuest && <button className="customer-points" onClick={() => setActiveTab("rewards")}><Gift size={17} /><span><strong>{account.points?.toLocaleString() || "1,280"}</strong><small>{copy.points}</small></span></button>}
          <IconButton label={copy.notifications} onClick={() => notify(copy.allCaughtUp)}><Bell size={18} /></IconButton>
          {isGuest ? <button className="customer-account-button" aria-label={copy.openDemoRoles} onClick={onSwitchAccount}><Avatar initials={account.initials} tone={0} /><span><strong>{copy.guestMode}</strong><small>{copy.openDemoRoles}</small></span></button> : <button className="customer-account-button" aria-label={`${copy.openProfile}: ${account.firstName}`} onClick={() => setActiveTab("profile")}><Avatar initials={account.initials} tone={0} /><span><strong>{account.firstName}</strong><small>{account.tier || "Gold"} {copy.member}</small></span></button>}
        </div>
      </header>

      <main className="customer-portal-main">{renderContent()}</main>

      <nav className="customer-mobile-nav" aria-label={copy.mobileNav} style={{ "--customer-mobile-nav-count": Math.min(visibleTabs.length, 5) }}>
        {visibleTabs.slice(0, 5).map(({ id, label, labelFr, icon: Icon }) => { const tabLabel = locale === "fr" ? labelFr : label; return <button key={id} className={activeTab === id ? "active" : ""} onClick={() => setActiveTab(id)}><Icon size={20} /><span>{tabLabel.replace("My ", "")}</span></button>; })}
      </nav>

      {cartCount > 0 && activeTab === "menu" && <button className="floating-customer-cart" onClick={() => setCartOpen(true)}><span><b>{cartCount}</b><ShoppingBag size={18} />{copy.viewBasket}</span><strong>{formatMoney(cartTotal, locale)}</strong></button>}
      <CustomerCart open={cartOpen} onClose={() => setCartOpen(false)} lines={cartLines} adjustLine={adjustLine} total={cartTotal} onCheckout={checkout} activeSession={activeSession} onOpenSession={() => { setCartOpen(false); setSessionOpen(true); }} onEdit={(item) => { setCartOpen(false); setProductOpen(item); }} locale={locale} copy={copy} />
      <ProductDetailModal item={productOpen} onClose={() => setProductOpen(null)} onAdd={addConfiguredItem} locale={locale} copy={copy} />
      <TableSessionModal open={sessionOpen} activeSession={activeSession} onClose={() => setSessionOpen(false)} onVerify={verifyTableSession} onScan={scanTableQr} onDisconnect={endLocalSession} locale={locale} copy={copy} />
      <GamesLibrary open={gamesOpen} onClose={() => setGamesOpen(false)} notify={notify} activeSession={activeSession} onNeedSession={() => { setGamesOpen(false); setSessionOpen(true); notify(copy.scanBeforeGame); }} locale={locale} games={games} setGames={setGames} />
      <div className={`customer-toast${toast ? " show" : ""}`} role="status"><CheckCircle2 size={17} />{toast}</div>
    </div>
  );
}

function CustomerMenu({ items, category, setCategory, query, setQuery, cart, adjust, favorites, toggleFavorite, activeSession, onOpenSession, onEndSession, onOpenProduct, onRewards, isGuest, locale, copy }) {
  const menuGroups = category === "All"
    ? customerCategories.slice(1).map((group) => ({ category: group, items: items.filter((item) => customerCategoryOf(item) === group) })).filter((group) => group.items.length)
    : [{ category, items }];

  return (
    <div className="customer-menu-page">
      <section className={`table-session-gate${activeSession ? " verified" : ""}`}>
        <span className="session-gate-icon">{activeSession ? <ShieldCheck size={23} /> : <LockKeyhole size={23} />}</span>
        <div>
          <Badge tone={activeSession ? "green" : "orange"} dot>{activeSession ? copy.gateVerified : copy.gateLocked}</Badge>
          <h2>{activeSession ? `${activeSession.id} ${copy.tableReady}` : copy.browseOnly}</h2>
          <p>{activeSession ? interpolate(copy.visitExpiry, { minutes: sessionMinutesLeft(activeSession) }) : copy.scanExplanation}</p>
        </div>
        <button onClick={activeSession ? onEndSession : onOpenSession}>{activeSession ? copy.disconnect : copy.scanQr}<ArrowRight size={16} /></button>
      </section>
      <section className="customer-store-hero">
        <div className="store-hero-copy"><Badge tone="light" dot>{copy.realMenu}</Badge><h1>{copy.heroTitle}<br /><em>{copy.heroEm}</em></h1><p>{copy.heroText}</p><div><button onClick={() => document.getElementById("customer-menu-grid")?.scrollIntoView({ behavior: "smooth" })}>{copy.exploreMenu} <ArrowRight size={16} /></button><span><Star size={15} fill="currentColor" />{copy.guestRating}</span></div></div>
        <div className="store-hero-products" aria-hidden="true"><figure className="hero-product large"><img src="/menu/iced-caramel-latte.webp" alt="" /></figure><figure className="hero-product small top"><img src="/menu/tiramisu-jar.webp" alt="" /></figure><figure className="hero-product small bottom"><img src="/menu/butter-croissant.webp" alt="" /></figure><span className="hero-product-label"><Sparkles size={14} /><b>{copy.todayPick}</b>{copy.todayItem}</span></div>
      </section>

      {!isGuest && <section className="customer-reward-banner"><span className="reward-banner-icon"><Gift size={22} /></span><div><strong>{copy.rewardTitle}</strong><span>{copy.rewardText}</span></div><Progress value={92} tone="lime" /><button onClick={onRewards}>{copy.seeRewards} <ChevronRight size={16} /></button></section>}

      <section className="customer-menu-section" id="customer-menu-grid">
        <div className="customer-menu-heading"><div><span className="customer-kicker">{copy.menuKicker}</span><h2>{copy.menuTitle}</h2><p>{copy.menuText}</p></div><div className="customer-menu-search"><Search size={18} /><input aria-label={copy.searchLabel} value={query} onChange={(event) => setQuery(event.target.value)} placeholder={copy.searchPlaceholder} /></div></div>
        <div className="customer-category-tabs" role="tablist" aria-label={copy.categoryLabel}>{customerCategories.map((item) => <button role="tab" aria-selected={category === item} key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{localizeCategory(item, locale)}</button>)}</div>
        <div className={`customer-menu-groups${category === "All" ? " grouped" : ""}`}>
          {menuGroups.map((group) => {
            const headingId = `customer-category-${group.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
            return <section className="customer-category-group" key={group.category} aria-labelledby={category === "All" ? headingId : undefined}>
              {category === "All" && <header className="customer-category-group-head">
                <div><span className="customer-category-group-tag">{localizeCategory(group.category, locale)}</span><h3 id={headingId}>{localizeCategory(group.category, locale)}</h3></div>
                <span>{group.items.length} {locale === "fr" ? (group.items.length > 1 ? "articles" : "article") : (group.items.length > 1 ? "items" : "item")}</span>
              </header>}
              <div className="customer-product-grid">
                {group.items.map((item) => <CustomerProductCard key={item.id} item={item} cart={cart} adjust={adjust} favorites={favorites} toggleFavorite={toggleFavorite} onOpenProduct={onOpenProduct} locale={locale} copy={copy} />)}
              </div>
            </section>;
          })}
        </div>
        {!items.length && <div className="customer-menu-empty"><Search size={25} /><strong>{copy.nothingFound}</strong><p>{copy.tryAnother}</p></div>}
      </section>
    </div>
  );
}

function CustomerProductCard({ item, cart, adjust, favorites, toggleFavorite, onOpenProduct, locale, copy }) {
  const isFavorite = favorites.includes(item.id);
  return <article className="store-product-card cx-product-card">
    <button className={`store-product-photo cx-product-photo tone-${item.tone || "sage"}`} onClick={() => onOpenProduct(item)} aria-label={interpolate(copy.viewDetails, { name: item.name })}>
      {item.image ? <img src={item.image} alt={item.alt} loading="lazy" width="640" height="640" style={{ objectPosition: item.objectPosition }} /> : <span className="cx-menu-art" aria-hidden="true">{item.emoji || "☕"}</span>}
      {item.featured && <Badge tone="light"><Sparkles size={11} />{copy.popular}</Badge>}
    </button>
    <button className={isFavorite ? "favorite active cx-favorite" : "favorite cx-favorite"} onClick={() => toggleFavorite(item.id)} aria-label={interpolate(isFavorite ? copy.removeFavorite : copy.addFavorite, { name: item.name })} aria-pressed={isFavorite}><Heart size={18} fill={isFavorite ? "currentColor" : "none"} /></button>
    <div className="store-product-copy"><span>{localizeCategory(customerCategoryOf(item), locale)}</span><button className="cx-product-name" onClick={() => onOpenProduct(item)}><h3>{item.name}</h3></button><p>{item.description}</p><div className="store-product-tags">{(item.tags || []).map((tag) => <small key={tag}>{tag}</small>)}</div><div className="store-product-foot"><strong>{formatMoney(item.price, locale)}</strong>{(cart[item.id] || 0) === 0 ? <button onClick={() => onOpenProduct(item)}><Plus size={17} />{copy.choose}</button> : <div className="store-quantity"><button aria-label={interpolate(copy.removeOne, { name: item.name })} onClick={() => adjust(item.id,-1)}><Minus size={15} /></button><b>{cart[item.id]}</b><button aria-label={interpolate(copy.customizeAnother, { name: item.name })} onClick={() => onOpenProduct(item)}><Plus size={15} /></button></div>}</div></div>
  </article>;
}

function ProductDetailModal({ item, onClose, onAdd, locale, copy }) {
  const [selections, setSelections] = useState({});
  const [addOns, setAddOns] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!item) return;
    const options = localizedProductOptions(item, locale);
    setSelections(Object.fromEntries(options.choices.map((group) => [group.id, group.values[0]])));
    setAddOns([]);
    setQuantity(1);
    setNote("");
  }, [item?.id]);

  if (!item) return null;
  const options = localizedProductOptions(item, locale);
  const selectedValues = Object.values(selections);
  const unitPrice = item.price + selectedValues.reduce((sum, choice) => sum + Number(choice?.price || 0), 0) + addOns.reduce((sum, choice) => sum + Number(choice.price || 0), 0);
  const allergenMapFr = { Gluten: "Gluten", Milk: "Lait", Egg: "Œuf", "Tree nuts": "Fruits à coque", Fish: "Poisson", Mustard: "Moutarde" };
  const allergens = productAllergens(item).map((allergen) => locale === "fr" ? allergenMapFr[allergen] || allergen : allergen);

  function toggleAddOn(addOn) {
    setAddOns((current) => current.some((choice) => choice.id === addOn.id) ? current.filter((choice) => choice.id !== addOn.id) : [...current, addOn]);
  }

  return <div className="cx-modal-layer" role="presentation">
    <button className="cx-modal-scrim" aria-label={copy.close} onClick={onClose} />
    <section className="cx-product-modal" role="dialog" aria-modal="true" aria-labelledby="cx-product-title">
      <button className="cx-modal-close" aria-label={copy.close} onClick={onClose}><X size={20} /></button>
      <div className={`cx-product-modal-art tone-${item.tone || "sage"}`}>
        {item.image ? <img src={item.image} alt={item.alt} style={{ objectPosition: item.objectPosition }} /> : <span>{item.emoji || "☕"}</span>}
        {item.featured && <Badge tone="light"><Sparkles size={12} />{copy.productFavorite}</Badge>}
      </div>
      <div className="cx-product-modal-content">
        <span className="customer-kicker">{localizeCategory(customerCategoryOf(item), locale)}</span>
        <h2 id="cx-product-title">{item.name}</h2>
        <p className="cx-product-lead">{item.description}</p>
        <div className="cx-product-meta"><span><Clock3 size={15} />{copy.readyIn}</span><span><Sparkles size={15} />{copy.madeToOrder}</span></div>
        <details className="cx-ingredients"><summary>{copy.ingredients}</summary><p>{item.ingredients || item.description}.</p><strong>{allergens.length ? interpolate(copy.listedAllergens, { items: allergens.join(", ") }) : copy.noAllergens}</strong><small>{copy.allergyNote}</small></details>
        {options.choices.map((group) => <fieldset className="cx-option-group" key={group.label}>
          <legend>{group.label}<small>{copy.chooseOne}</small></legend>
          <div>{group.values.map((choice) => <button type="button" key={choice.id} className={selections[group.id]?.id === choice.id ? "active" : ""} onClick={() => setSelections((current) => ({ ...current, [group.id]: choice }))}><span>{choice.name}</span><small>{choice.price ? `+${formatMoney(choice.price, locale)}` : copy.included}</small><i>{selections[group.id]?.id === choice.id && <Check size={13} />}</i></button>)}</div>
        </fieldset>)}
        {options.addOns.length > 0 && <fieldset className="cx-option-group cx-addons">
          <legend>{copy.makeYours}<small>{copy.optionalExtras}</small></legend>
          <div>{options.addOns.map((addOn) => { const active = addOns.some((choice) => choice.id === addOn.id); return <button type="button" key={addOn.id} className={active ? "active" : ""} onClick={() => toggleAddOn(addOn)}><span>{addOn.name}</span><small>+{formatMoney(addOn.price, locale)}</small><i>{active && <Check size={13} />}</i></button>; })}</div>
        </fieldset>}
        <label className="cx-order-note"><span>{copy.teamNote} <small>{copy.optional}</small></span><textarea rows="2" maxLength="90" value={note} onChange={(event) => setNote(event.target.value)} placeholder={copy.notePlaceholder} /><small>{note.length}/90</small></label>
        <footer className="cx-product-modal-footer">
          <div className="store-quantity"><button aria-label={copy.decrease} onClick={() => setQuantity((current) => Math.max(1, current - 1))}><Minus size={16} /></button><b>{quantity}</b><button aria-label={copy.increase} onClick={() => setQuantity((current) => Math.min(12, current + 1))}><Plus size={16} /></button></div>
          <button className="cx-add-button" onClick={() => onAdd(item, { selections: selectedValues, addOns, quantity, note })}><span>{copy.addToBasket}</span><strong>{formatMoney(unitPrice * quantity, locale)}</strong></button>
        </footer>
      </div>
    </section>
  </div>;
}

function CustomerCart({ open, onClose, lines, adjustLine, total, onCheckout, activeSession, onOpenSession, onEdit, locale, copy }) {
  return <>
    <aside className={`customer-cart-drawer${open ? " open" : ""}`} aria-hidden={!open}>
      <header>
        <div><span>{copy.cartEyebrow}</span><h2>{copy.cartTitle}</h2><p>{activeSession ? `${activeSession.id} • ${copy.verifiedDineIn}` : copy.checkoutLocked}</p></div>
        <IconButton label={copy.closeBasket} onClick={onClose}><X size={20} /></IconButton>
      </header>
      <div className="customer-cart-lines">
        {lines.map((item) => <article key={item.lineId} className="cx-cart-line">
          {item.image ? <img src={item.image} alt="" style={{ objectPosition: item.objectPosition }} /> : <span className={`cx-cart-art tone-${item.tone || "sage"}`}>{item.emoji || "☕"}</span>}
          <div><strong>{item.name}</strong><small>{[...item.selections, ...item.addOns].map((choice) => choice.name).join(" • ") || copy.asListed}</small>{item.note && <small>“{item.note}”</small>}<span>{formatMoney(item.unitPrice * item.quantity, locale)}</span><button className="cx-cart-edit" onClick={() => onEdit(item)}>{interpolate(copy.customizeAnother, { name: "" }).trim()}</button></div>
          <div className="store-quantity"><button aria-label={interpolate(copy.removeOne, { name: item.name })} onClick={() => adjustLine(item.lineId,-1)}><Minus size={14} /></button><b>{item.quantity}</b><button aria-label={interpolate(copy.customizeAnother, { name: item.name })} onClick={() => adjustLine(item.lineId,1)}><Plus size={14} /></button></div>
        </article>)}
        {!lines.length && <div className="empty-customer-cart"><ShoppingBag size={28} /><strong>{copy.basketEmpty}</strong><span>{copy.basketEmptyText}</span></div>}
      </div>
      {lines.length > 0 && <footer>
        <div><span>{copy.subtotal}</span><strong>{formatMoney(total, locale)}</strong></div>
        <div><span>{copy.service}</span><strong>{formatMoney(0, locale)}</strong></div>
        <div className="cart-total"><span>{copy.total}</span><strong>{formatMoney(total, locale)}</strong></div>
        {activeSession ? <button onClick={onCheckout}><ShieldCheck size={17} />{copy.placeOrder} {activeSession.id}<ArrowRight size={17} /></button> : <button className="session-required" onClick={onOpenSession}><QrCode size={17} />{copy.scanToOrder}<ArrowRight size={17} /></button>}
        <small>{activeSession ? <><Timer size={13} />{copy.sessionExpires}</> : <><LockKeyhole size={13} />{copy.remoteBlocked}</>}</small>
      </footer>}
    </aside>
    {open && <button className="drawer-scrim" onClick={onClose} aria-label={copy.closeBasket} />}
  </>;
}

function TableSessionModal({ open, activeSession, onClose, onVerify, onScan, onDisconnect, copy }) {
  const [code, setCode] = useState("T08");
  const [error, setError] = useState("");
  const [mode, setMode] = useState("scan");
  const [cameraState, setCameraState] = useState("idle");
  const [scanProgress, setScanProgress] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  function stopCamera() {
    streamRef.current?.getTracks?.().forEach((track) => track.stop());
    streamRef.current = null;
  }

  async function startCamera() {
    stopCamera();
    setCameraState("loading");
    try {
      if (!navigator.mediaDevices?.getUserMedia) throw new Error("Camera preview unavailable here");
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" } }, audio: false });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setCameraState("ready");
    } catch {
      setCameraState("demo");
    }
  }

  useEffect(() => {
    if (open && !activeSession && mode === "scan") startCamera();
    else stopCamera();
    return stopCamera;
  }, [open, activeSession, mode]);

  if (!open) return null;

  function submit(event) {
    event.preventDefault();
    const result = onVerify(code);
    if (result === true) setError("");
    else setError(result === "unavailable" ? copy.tableUnavailable : copy.demoCodeError);
  }

  function simulateScan() {
    setScanProgress(true);
    window.setTimeout(() => {
      stopCamera();
      const result = onScan("T08");
      setError(result === true ? "" : result === "unavailable" ? copy.tableUnavailable : copy.demoCodeError);
      setScanProgress(false);
    }, 900);
  }

  return <div className="table-session-modal-layer" role="presentation">
    <button className="table-session-modal-scrim" aria-label={copy.close} onClick={onClose} />
    <section className="table-session-modal cx-session-modal" role="dialog" aria-modal="true" aria-labelledby="table-session-title">
      <header>
        <span>{activeSession ? <ShieldCheck size={23} /> : <QrCode size={23} />}</span>
        <div><Badge tone={activeSession ? "green" : "orange"}>{activeSession ? copy.visitActive : copy.onsiteCheck}</Badge><h2 id="table-session-title">{activeSession ? `${activeSession.id} ${copy.tableReady}` : copy.scanYourTable}</h2></div>
        <IconButton label={copy.close} onClick={onClose}><X size={20} /></IconButton>
      </header>
      {activeSession ? <>
        <div className="verified-session-card"><ShieldCheck size={26} /><span><strong>{copy.qrVisit}</strong><small>{sessionMinutesLeft(activeSession)} {copy.minutesRemaining} • {activeSession.sessionCode}</small></span></div>
        <ul><li><Check size={15} />{copy.checkoutBound} {activeSession.id}</li><li><Check size={15} />{copy.autoExpiry}</li><li><Check size={15} />{copy.staffClears}</li></ul>
        <div className="session-modal-actions"><Button variant="secondary" onClick={onDisconnect}>{copy.disconnectThis}</Button><Button onClick={onClose}>{copy.continueOrdering}</Button></div>
      </> : <>
        <div className="cx-session-tabs" role="tablist"><button role="tab" aria-selected={mode === "scan"} className={mode === "scan" ? "active" : ""} onClick={() => setMode("scan")}><ScanLine size={16} />{copy.scanTab}</button><button role="tab" aria-selected={mode === "code"} className={mode === "code" ? "active" : ""} onClick={() => setMode("code")}><QrCode size={16} />{copy.codeTab}</button></div>
        {mode === "scan" ? <div className="cx-scanner">
          <div className={`cx-camera-frame ${cameraState}`}>
            <video ref={videoRef} autoPlay muted playsInline />
            <div className="cx-camera-fallback"><Camera size={38} /><strong>{cameraState === "loading" ? copy.startingCamera : copy.cameraUnavailable}</strong><small>{copy.cameraFallback}</small></div>
            <span className="cx-scan-target"><i /><i /><i /><i /></span>
            {scanProgress && <span className="cx-scan-beam" />}
          </div>
          <p><ShieldCheck size={15} />{copy.scanSafety}</p>
          <Button icon={ScanLine} onClick={simulateScan} disabled={scanProgress}>{scanProgress ? copy.recognizing : copy.simulateScan}</Button>
          {error && <div className="session-code-error" role="alert">{error}</div>}
          {cameraState === "demo" && <button className="cx-camera-retry" onClick={startCamera}><RotateCcw size={15} />{copy.retryCamera}</button>}
        </div> : <form onSubmit={submit} className="cx-manual-code">
          <p>{copy.manualHelp}</p>
          <label><span>{copy.tableCode}</span><input autoFocus value={code} onChange={(event) => { setCode(event.target.value.toUpperCase()); setError(""); }} placeholder="T08" /></label>
          {error && <div className="session-code-error" role="alert">{error}</div>}
          <div className="demo-code-note"><QrCode size={18} /><span><strong>{copy.interactiveDemo}</strong><small>{copy.codeHint}</small></span></div>
          <Button type="submit" icon={ShieldCheck}>{copy.startVisit}</Button>
        </form>}
      </>}
    </section>
  </div>;
}

function CustomerOrders({ orders, onBrowse, locale = "en" }) {
  const active = orders.find((order) => order.status !== "served");
  const completed = orders.filter((order) => order.status === "served");
  const awaitingAcceptance = active?.status === "new";
  const c = locale === "fr" ? {
    kicker: "HISTORIQUE DES COMMANDES", title: "Mes commandes", intro: "Suivez la préparation et retrouvez vos favoris.", waiting: "En attente de l’équipe", preparing: "En préparation", readyServe: "Prête à servir", waitingTitle: "Votre commande attend une vérification rapide.", readyTitle: "Votre commande à table est prête.", makingTitle: "Nous préparons votre commande.", pickup: "Retrait au comptoir", serving: "Service", sent: "Envoyée au café", verified: "Session de table vérifiée", submitted: "Commande envoyée", acceptance: "Validation de l’équipe", accepted: "Acceptée", twoMinutes: "Généralement sous deux minutes", barista: "Envoyée au poste barista", ready: "Prête", prepare: "Préparation", collect: "À retirer au comptoir", bring: "L’équipe vous l’apporte", station: "Au poste barista", noActive: "Aucune commande active pour le moment.", emptyText: "Votre prochain favori est à quelques clics.", browse: "Voir la carte", past: "Commandes passées", pastSub: "Reçus, points et commandes rapides", done: "TERMINÉE", completed: "Terminée", reorder: "Commander à nouveau",
  } : {
    kicker: "ORDER HISTORY", title: "My orders", intro: "Track what’s being made and revisit your favorites.", waiting: "Waiting for staff", preparing: "Being prepared", readyServe: "Ready to serve", waitingTitle: "Your order is waiting for a quick check.", readyTitle: "Your table order is ready.", makingTitle: "We’re making something good.", pickup: "Pickup at the bar", serving: "Serving", sent: "Sent to café", verified: "Table session verified", submitted: "Order submitted", acceptance: "Staff acceptance", accepted: "Accepted", twoMinutes: "Usually within two minutes", barista: "Sent to the barista station", ready: "Ready", prepare: "Preparing", collect: "Collect at the bar", bring: "Staff will bring it over", station: "At the barista station", noActive: "No active order—yet.", emptyText: "Your next favorite is only a few taps away.", browse: "Browse the menu", past: "Past orders", pastSub: "Receipts, points and quick reorders", done: "DONE", completed: "Completed", reorder: "Order again",
  };

  return <div className="customer-subpage">
    <header className="customer-subpage-head"><span className="customer-kicker">{c.kicker}</span><h1>{c.title}</h1><p>{c.intro}</p></header>
    {active ? <section className="customer-active-order">
      <div className="active-order-top"><span className="order-live-icon"><Coffee size={22} /><i /></span><div><Badge tone={awaitingAcceptance ? "blue" : active.status === "making" ? "orange" : "green"} dot>{awaitingAcceptance ? c.waiting : active.status === "making" ? c.preparing : c.readyServe}</Badge><h2>{awaitingAcceptance ? c.waitingTitle : active.status === "ready" ? c.readyTitle : c.makingTitle}</h2><p>{active.id} • {active.table === "PICKUP" ? c.pickup : `${c.serving} ${active.table}`} • {localizeRelativeTime(active.time, locale)}</p></div><strong>{formatMoney(active.total, locale)}</strong></div>
      <div className="customer-order-progress"><div className="done"><i><Check size={14} /></i><span><strong>{c.sent}</strong><small>{active.sessionId ? c.verified : c.submitted}</small></span></div><b /><div className={awaitingAcceptance ? "current" : "done"}><i>{awaitingAcceptance ? <Timer size={14} /> : <Check size={14} />}</i><span><strong>{awaitingAcceptance ? c.acceptance : c.accepted}</strong><small>{awaitingAcceptance ? c.twoMinutes : c.barista}</small></span></div><b /><div className={active.status === "ready" ? "done" : active.status === "making" ? "current" : ""}><i><Coffee size={14} /></i><span><strong>{active.status === "ready" ? c.ready : c.prepare}</strong><small>{active.status === "ready" ? (active.table === "PICKUP" ? c.collect : c.bring) : c.station}</small></span></div></div>
      <div className="customer-order-items">{(active.itemDetails || active.items).map((item, index) => <span key={`${active.id}-${index}`}>{localizeOrderLine(item, locale)}</span>)}</div>
    </section> : <section className="customer-empty-state"><span><ShoppingBag size={30} /></span><h2>{c.noActive}</h2><p>{c.emptyText}</p><Button icon={Coffee} onClick={onBrowse}>{c.browse}</Button></section>}
    <section className="past-orders"><SectionTitle title={c.past} subtitle={c.pastSub} />{completed.map((order) => <article key={order.id}><span className="past-order-date"><b>✓</b>{c.done}</span><div><strong>{(order.itemDetails || order.items).map((item) => localizeOrderLine(item, locale)).join(" + ")}</strong><small>{order.id} • {order.table} • {formatMoney(order.total, locale)}</small></div><Badge tone="green">{c.completed}</Badge></article>)}<article><span className="past-order-date"><b>08</b>JUL</span><div><strong>{locale === "fr" ? "Café glacé + Tiramisu" : "Iced coffee + Tiramisu"}</strong><small>GC-1021 • {formatMoney(16, locale)} • +160 points</small></div><Badge tone="green">{c.completed}</Badge><button onClick={onBrowse}>{c.reorder} <ChevronRight size={15} /></button></article><article><span className="past-order-date"><b>02</b>JUL</span><div><strong>{locale === "fr" ? "Jus Green Coffee Games" : "Green Coffee Games juice"}</strong><small>GC-0987 • {formatMoney(10, locale)} • +100 points</small></div><Badge tone="green">{c.completed}</Badge><button onClick={onBrowse}>{c.reorder} <ChevronRight size={15} /></button></article></section>
  </div>;
}

function CustomerRewards({ account, notify, locale = "en" }) {
  const [inviteOpen, setInviteOpen] = useState(false);
  const [scannerOpen, setScannerOpen] = useState(false);
  const [rewardOpen, setRewardOpen] = useState(false);
  const [happyHourOpen, setHappyHourOpen] = useState(false);
  const [rewardReady, setRewardReady] = useState(true);
  const fr = locale === "fr";
  const c = fr ? {
    kicker: "RÉCOMPENSES GREEN", title: "Vos habitudes sont récompensées.", intro: "Gagnez 10 points par dinar et retrouvez tous vos avantages au même endroit.", member: "membre", available: "points disponibles", next: "Plus que 80 points avant votre prochaine boisson offerte.", ready: "PRÊT À UTILISER", added: "AJOUTÉ À LA COMMANDE", free: "Café offert", freeText: "Votre avantage Gold, valable sur un café de la carte réelle.", use: "Utiliser", view: "Voir l’avantage", happy: "HEURE VERTE", off: "-20 % dès 14h00", offText: "En semaine, de 14h00 à 17h00. Application automatique.", details: "Voir les détails", refer: "PARRAINER UN AMI", both: "150 points chacun", bothText: "Partagez votre code lorsqu’un ami rejoint Green Rewards.", share: "Partager mon invitation", receipt: "Vous avez un ticket papier ?", receiptText: "Scannez son QR pour enregistrer le ticket et créditer automatiquement vos points.", scan: "Scanner le ticket",
  } : {
    kicker: "GREEN REWARDS", title: "Your rituals, rewarded.", intro: "Earn 10 points for every dinar and keep every treat in one place.", member: "member", available: "available points", next: "80 points until your next free signature drink.", ready: "READY TO USE", added: "ADDED TO ORDER", free: "Free coffee", freeText: "Your Gold reward. Valid on one coffee from the real café menu.", use: "Use reward", view: "View reward", happy: "HAPPY HOUR", off: "20% off from 14:00", offText: "Weekdays, 14:00–17:00. Applied automatically.", details: "View details", refer: "REFER A FRIEND", both: "150 points for both", bothText: "Share your code when a friend joins Green Rewards.", share: "Share my invite", receipt: "Have a paper receipt?", receiptText: "Scan its QR to save the receipt and credit your points automatically.", scan: "Scan receipt",
  };

  function activateReward() {
    setRewardReady(false);
    setRewardOpen(false);
    notify(fr ? "Avantage ajouté à votre prochaine commande à table" : "Reward added to your next eligible table order");
  }

  return <div className="customer-subpage">
    <header className="customer-subpage-head"><span className="customer-kicker">{c.kicker}</span><h1>{c.title}</h1><p>{c.intro}</p></header>
    <section className="rewards-hero"><div><Badge tone="light"><Trophy size={12} />{account.tier || "Gold"} {c.member}</Badge><h2>{(account.points || 1280).toLocaleString(fr ? "fr-TN" : "en-TN")}</h2><span>{c.available}</span><p>{c.next}</p><Progress value={92} tone="lime" /></div><span className="rewards-card-art"><Gift size={46} /><b>GREEN<br />REWARDS</b><i>•••• 1280</i></span></section>
    <div className="reward-grid">
      <article><span className="reward-photo"><img src="/menu/pistachio-cloud.webp" alt="" /></span><Badge tone={rewardReady ? "green" : "blue"}>{rewardReady ? c.ready : c.added}</Badge><h3>{c.free}</h3><p>{c.freeText}</p><button onClick={() => setRewardOpen(true)}>{rewardReady ? c.use : c.view} <ArrowRight size={15} /></button></article>
      <article><span className="reward-icon orange"><Clock3 size={25} /></span><Badge tone="orange">{c.happy}</Badge><h3>{c.off}</h3><p>{c.offText}</p><button onClick={() => setHappyHourOpen(true)}>{c.details} <ChevronRight size={15} /></button></article>
      <article><span className="reward-icon purple"><UsersRound size={25} /></span><Badge tone="purple">{c.refer}</Badge><h3>{c.both}</h3><p>{c.bothText}</p><button onClick={() => setInviteOpen(true)}>{c.share} <ArrowRight size={15} /></button></article>
    </div>
    <section className="receipt-sync"><span><QrCode size={23} /></span><div><h3>{c.receipt}</h3><p>{c.receiptText}</p></div><button onClick={() => setScannerOpen(true)}><QrCode size={16} />{c.scan}</button></section>
    <InviteModal open={inviteOpen} account={account} onClose={() => setInviteOpen(false)} notify={notify} locale={locale} />
    <ReceiptScanner open={scannerOpen} onClose={() => setScannerOpen(false)} onComplete={() => { setScannerOpen(false); notify(fr ? "Ticket GC-1052 enregistré • 120 points ajoutés" : "Receipt GC-1052 saved • 120 points added"); }} locale={locale} />
    <InfoModal open={rewardOpen} title={fr ? "Café offert" : "Free signature drink"} eyebrow={rewardReady ? c.ready : (fr ? "PRÊT SUR VOTRE PROCHAINE COMMANDE" : "READY ON YOUR NEXT ORDER")} onClose={() => setRewardOpen(false)} locale={locale}><p>{fr ? "Choisissez un café pendant une visite à table active. L’avantage est appliqué avant confirmation." : "Choose any signature drink during an active table visit. Your reward is applied before you confirm."}</p>{rewardReady ? <Button icon={Gift} onClick={activateReward}>{fr ? "Ajouter à la prochaine commande" : "Add reward to next order"}</Button> : <Button onClick={() => setRewardOpen(false)}>{fr ? "Compris" : "Got it"}</Button>}</InfoModal>
    <InfoModal open={happyHourOpen} title={fr ? "Les après-midi ont meilleur goût" : "Afternoons taste better"} eyebrow={fr ? "EN SEMAINE • 14H00–17H00" : "WEEKDAYS • 14:00–17:00"} onClose={() => setHappyHourOpen(false)} locale={locale}><p>{fr ? "La réduction éligible apparaît automatiquement dans le panier pendant l’heure verte, une fois par membre et par visite." : "The eligible discount appears automatically in your basket during happy hour. It applies once per member per visit."}</p><Button onClick={() => setHappyHourOpen(false)}>{fr ? "Parfait" : "Sounds good"}</Button></InfoModal>
  </div>;
}

function InfoModal({ open, title, eyebrow, onClose, children, locale = "en", className = "" }) {
  if (!open) return null;
  const closeLabel = locale === "fr" ? `Fermer ${title}` : `Close ${title}`;
  return <div className="cx-modal-layer"><button className="cx-modal-scrim" aria-label={closeLabel} onClick={onClose} /><section className={`cx-info-modal ${className}`.trim()} role="dialog" aria-modal="true"><button className="cx-modal-close" aria-label={locale === "fr" ? "Fermer" : "Close"} onClick={onClose}><X size={19} /></button><span className="customer-kicker">{eyebrow}</span><h2>{title}</h2>{children}</section></div>;
}

function ProfileExamplePanel({ kind, locale, account, favoriteItems, onToggleFavorite, orders, onOpenFavorite, onBrowseMenu, onClose, notify }) {
  const fr = locale === "fr";
  const [selectedReceipt, setSelectedReceipt] = useState("GC-1021");
  const [paymentChoice, setPaymentChoice] = useState("visa");
  const [addPaymentOpen, setAddPaymentOpen] = useState(false);
  const [cardLabel, setCardLabel] = useState("");
  const [lastFour, setLastFour] = useState("");
  const [savedCard, setSavedCard] = useState(null);
  const [helpTopic, setHelpTopic] = useState("order");
  const [helpMessage, setHelpMessage] = useState("");

  if (!kind) return null;

  const copy = fr ? {
    favoritesTitle: "Articles favoris", favoritesEyebrow: "VOTRE SÉLECTION", favoriteIntro: "Vos favoris suivent vos choix sur la carte.", emptyFavorites: "Vous n’avez encore aucun favori.", browse: "Voir la carte", remove: "Retirer des favoris", open: "Voir et personnaliser",
    receiptsTitle: "Historique des tickets", receiptsEyebrow: "38 TICKETS ENREGISTRÉS", receiptIntro: "Touchez un ticket pour consulter les articles et le paiement.", completed: "Payé", table: "Table", payment: "Paiement", pointsEarned: "Points gagnés", sendReceipt: "Envoyer par e-mail", sentReceipt: "Ticket envoyé à votre adresse e-mail",
    paymentsTitle: "Moyens de paiement", paymentsEyebrow: "VOTRE PORTEFEUILLE", default: "Par défaut", expires: "Expire 09/28", counter: "Payer au comptoir", counterText: "Réglez auprès de l’équipe après votre commande.", useThis: "Utiliser ce moyen", addPayment: "Ajouter une carte", cardName: "Nom de la carte", cardNamePlaceholder: "Ex. Carte personnelle", finalDigits: "4 derniers chiffres", saveCard: "Enregistrer la carte", secureNote: "Les données de carte sont sécurisées ; seuls les quatre derniers chiffres sont affichés.", paymentUpdated: "Moyen de paiement préféré mis à jour", cardSaved: "Carte enregistrée et sélectionnée",
    helpTitle: "Aide et avis", helpEyebrow: "NOUS VOUS ÉCOUTONS", helpIntro: "Envoyez une question ou un avis directement à l’équipe Green Coffee.", topic: "Sujet", topics: { order: "Une commande", booking: "Une réservation", rewards: "Récompenses", other: "Autre" }, message: "Votre message", messagePlaceholder: "Expliquez-nous comment nous pouvons vous aider…", replyTo: "Réponse à", send: "Envoyer le message", helpSent: "Message envoyé • référence GC-204", responseTime: "Réponse habituelle sous 24 heures.",
  } : {
    favoritesTitle: "Favorite items", favoritesEyebrow: "YOUR SHORTLIST", favoriteIntro: "Your favorites stay in sync with the hearts you tap on the menu.", emptyFavorites: "You have no favorites yet.", browse: "Browse menu", remove: "Remove from favorites", open: "View and customize",
    receiptsTitle: "Receipt history", receiptsEyebrow: "38 RECEIPTS SAVED", receiptIntro: "Tap a receipt to review its items and payment details.", completed: "Paid", table: "Table", payment: "Payment", pointsEarned: "Points earned", sendReceipt: "Send by email", sentReceipt: "Receipt sent to your email address",
    paymentsTitle: "Payment methods", paymentsEyebrow: "YOUR WALLET", default: "Default", expires: "Expires 09/28", counter: "Pay at counter", counterText: "Settle with the team after placing your order.", useThis: "Use this method", addPayment: "Add a card", cardName: "Card name", cardNamePlaceholder: "e.g. Personal card", finalDigits: "Last 4 digits", saveCard: "Save card", secureNote: "Card data is secured; only the final four digits are shown.", paymentUpdated: "Preferred payment method updated", cardSaved: "Card saved and selected",
    helpTitle: "Help & feedback", helpEyebrow: "WE’RE LISTENING", helpIntro: "Send a question or feedback directly to the Green Coffee team.", topic: "Topic", topics: { order: "An order", booking: "A booking", rewards: "Rewards", other: "Something else" }, message: "Your message", messagePlaceholder: "Tell us how we can help…", replyTo: "Reply to", send: "Send message", helpSent: "Message sent • reference GC-204", responseTime: "We usually reply within 24 hours.",
  };

  const sampleReceipts = [
    { id: "GC-1021", date: fr ? "8 juillet 2026" : "8 July 2026", table: "T08", total: 16, payment: fr ? "Visa •••• 4242" : "Visa •••• 4242", points: 160, items: fr ? ["1× Café glacé", "1× Tiramisu"] : ["1× Iced coffee", "1× Tiramisu"] },
    { id: "GC-1008", date: fr ? "3 juillet 2026" : "3 July 2026", table: "T04", total: 6, payment: fr ? "Comptoir" : "At counter", points: 60, items: fr ? ["1× Direct", "1× Croissant"] : ["1× Direct coffee", "1× Croissant"] },
    { id: "GC-0987", date: fr ? "28 juin 2026" : "28 June 2026", table: "T11", total: 7, payment: "Visa •••• 4242", points: 70, items: [fr ? "1× Petit déjeuner Speed" : "1× Speed breakfast"] },
  ];
  const completedOrders = (orders || []).filter((order) => ["served", "completed", "paid"].includes(order.status)).map((order) => ({
    id: order.id,
    date: fr ? "Aujourd’hui" : "Today",
    table: order.table,
    total: order.total,
    payment: order.payment,
    points: Math.round(Number(order.total || 0) * 10),
    items: (order.itemDetails || order.items || []).map((item) => localizeOrderLine(item, locale)),
  }));
  const receipts = [...completedOrders, ...sampleReceipts].filter((receipt, index, all) => all.findIndex((item) => item.id === receipt.id) === index).slice(0, 4);
  const activeReceipt = receipts.find((receipt) => receipt.id === selectedReceipt) || receipts[0];
  const titles = {
    favorites: [copy.favoritesTitle, copy.favoritesEyebrow],
    receipts: [copy.receiptsTitle, copy.receiptsEyebrow],
    payments: [copy.paymentsTitle, copy.paymentsEyebrow],
    help: [copy.helpTitle, copy.helpEyebrow],
  };
  const [title, eyebrow] = titles[kind] || titles.favorites;

  function savePayment(event) {
    event.preventDefault();
    const digits = lastFour.replace(/\D/g, "").slice(0, 4);
    if (digits.length !== 4) return;
    const next = { id: `saved-${digits}`, label: cardLabel.trim() || (fr ? "Ma carte" : "My card"), lastFour: digits };
    setSavedCard(next);
    setPaymentChoice(next.id);
    setAddPaymentOpen(false);
    notify(copy.cardSaved);
  }

  function sendHelp(event) {
    event.preventDefault();
    notify(copy.helpSent);
    onClose();
  }

  return <InfoModal open title={title} eyebrow={eyebrow} onClose={onClose} locale={locale} className="cx-profile-panel-modal">
    {kind === "favorites" && <div className="cx-profile-panel">
      <p className="cx-profile-panel-intro">{copy.favoriteIntro}</p>
      <div className="cx-profile-favorite-list">
        {favoriteItems.length ? favoriteItems.map((item) => <article key={item.id}>
          <button className={`cx-profile-favorite-art tone-${item.tone || "sage"}`} onClick={() => onOpenFavorite(item)} aria-label={`${copy.open}: ${item.name}`}>{item.image ? <img src={item.image} alt={item.alt} /> : <span aria-hidden="true">{item.emoji || "☕"}</span>}</button>
          <button className="cx-profile-favorite-copy" onClick={() => onOpenFavorite(item)}><small>{localizeCategory(customerCategoryOf(item), locale)}</small><strong>{item.name}</strong><span>{formatMoney(item.price, locale)} · {copy.open}</span></button>
          <button className="cx-profile-heart active" aria-label={`${copy.remove}: ${item.name}`} onClick={() => onToggleFavorite(item.id)}><Heart size={17} fill="currentColor" /></button>
        </article>) : <div className="cx-profile-empty"><Heart size={25} /><strong>{copy.emptyFavorites}</strong></div>}
      </div>
      <Button icon={Coffee} onClick={() => { onClose(); onBrowseMenu(); }}>{copy.browse}</Button>
    </div>}

    {kind === "receipts" && <div className="cx-profile-panel">
      <p className="cx-profile-panel-intro">{copy.receiptIntro}</p>
      <div className="cx-profile-receipt-list">
        {receipts.map((receipt) => <button key={receipt.id} className={activeReceipt?.id === receipt.id ? "active" : ""} onClick={() => setSelectedReceipt(receipt.id)} aria-pressed={activeReceipt?.id === receipt.id}><span><History size={17} /></span><div><strong>{receipt.id}</strong><small>{receipt.date} · {receipt.items.join(" + ")}</small></div><b>{formatMoney(receipt.total, locale)}</b><ChevronRight size={16} /></button>)}
      </div>
      {activeReceipt && <section className="cx-profile-receipt-detail" aria-live="polite"><header><div><span>{activeReceipt.id}</span><strong>{activeReceipt.date}</strong></div><Badge tone="green"><Check size={11} />{copy.completed}</Badge></header><div className="cx-profile-receipt-items">{activeReceipt.items.map((item) => <span key={item}>{item}</span>)}</div><dl><div><dt>{copy.table}</dt><dd>{activeReceipt.table}</dd></div><div><dt>{copy.payment}</dt><dd>{activeReceipt.payment}</dd></div><div><dt>{copy.pointsEarned}</dt><dd>+{activeReceipt.points}</dd></div><div className="total"><dt>Total</dt><dd>{formatMoney(activeReceipt.total, locale)}</dd></div></dl><Button variant="secondary" icon={Share2} onClick={() => notify(copy.sentReceipt)}>{copy.sendReceipt}</Button></section>}
    </div>}

    {kind === "payments" && <div className="cx-profile-panel">
      <div className="cx-wallet-card"><span className="cx-wallet-chip" /><div><small>GREEN WALLET</small><strong>•••• 4242</strong></div><footer><span>VISA</span><small>{copy.expires}</small></footer>{paymentChoice === "visa" && <Badge tone="light"><Check size={11} />{copy.default}</Badge>}</div>
      <div className="cx-payment-options" role="radiogroup" aria-label={copy.paymentsTitle}>
        <button className={paymentChoice === "visa" ? "active" : ""} onClick={() => { setPaymentChoice("visa"); notify(copy.paymentUpdated); }} role="radio" aria-checked={paymentChoice === "visa"}><CreditCard size={18} /><span><strong>Visa •••• 4242</strong><small>{copy.expires}</small></span><i>{paymentChoice === "visa" && <Check size={13} />}</i></button>
        {savedCard && <button className={paymentChoice === savedCard.id ? "active" : ""} onClick={() => { setPaymentChoice(savedCard.id); notify(copy.paymentUpdated); }} role="radio" aria-checked={paymentChoice === savedCard.id}><WalletCards size={18} /><span><strong>{savedCard.label} •••• {savedCard.lastFour}</strong><small>{copy.secureNote}</small></span><i>{paymentChoice === savedCard.id && <Check size={13} />}</i></button>}
        <button className={paymentChoice === "counter" ? "active" : ""} onClick={() => { setPaymentChoice("counter"); notify(copy.paymentUpdated); }} role="radio" aria-checked={paymentChoice === "counter"}><Coffee size={18} /><span><strong>{copy.counter}</strong><small>{copy.counterText}</small></span><i>{paymentChoice === "counter" && <Check size={13} />}</i></button>
      </div>
      {!addPaymentOpen ? <Button variant="secondary" icon={Plus} onClick={() => setAddPaymentOpen(true)}>{copy.addPayment}</Button> : <form className="cx-add-payment-form" onSubmit={savePayment}><label><span>{copy.cardName}</span><input value={cardLabel} onChange={(event) => setCardLabel(event.target.value)} placeholder={copy.cardNamePlaceholder} required /></label><label><span>{copy.finalDigits}</span><input value={lastFour} onChange={(event) => setLastFour(event.target.value.replace(/\D/g, "").slice(0, 4))} inputMode="numeric" pattern="[0-9]{4}" maxLength="4" placeholder="1234" required /></label><Button type="submit" icon={LockKeyhole}>{copy.saveCard}</Button></form>}
      <p className="cx-profile-security"><ShieldCheck size={15} />{copy.secureNote}</p>
    </div>}

    {kind === "help" && <form className="cx-profile-panel cx-help-form" onSubmit={sendHelp}>
      <p className="cx-profile-panel-intro">{copy.helpIntro}</p>
      <label><span>{copy.topic}</span><select value={helpTopic} onChange={(event) => setHelpTopic(event.target.value)}>{Object.entries(copy.topics).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
      <label><span>{copy.message}</span><textarea rows="5" maxLength="300" value={helpMessage} onChange={(event) => setHelpMessage(event.target.value)} placeholder={copy.messagePlaceholder} required /><small>{helpMessage.length}/300</small></label>
      <div className="cx-help-reply"><MessageCircle size={17} /><span><small>{copy.replyTo}</small><strong>{account.email}</strong></span></div>
      <Button type="submit" icon={ArrowRight}>{copy.send}</Button><small className="cx-help-response-time">{copy.responseTime}</small>
    </form>}
  </InfoModal>;
}

function InviteModal({ open, account, onClose, notify, locale = "en" }) {
  const inviteCode = `${(account.firstName || "GREEN").toUpperCase()}-150`;
  const inviteUrl = `${window.location.origin}/#table?ref=${encodeURIComponent(inviteCode)}`;
  const fr = locale === "fr";

  async function copyInvite() {
    let copied = false;
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard API unavailable");
      await Promise.race([
        navigator.clipboard.writeText(inviteUrl),
        new Promise((_, reject) => window.setTimeout(() => reject(new Error("Clipboard timed out")), 600)),
      ]);
      copied = true;
    } catch {
      const field = document.createElement("textarea");
      field.value = inviteUrl;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      try { copied = document.execCommand("copy"); } catch { copied = false; }
      field.remove();
    }
    notify(copied ? (fr ? "Lien copié — partagez-le avec un ami" : "Invite link copied — share it with a friend") : (fr ? "Le lien est prêt — copiez-le depuis cette fenêtre" : "Invite link is ready — copy it from the dialog"));
  }

  async function shareInvite() {
    if (navigator.share) {
      try { await navigator.share({ title: fr ? "Rejoignez-moi chez Green Coffee" : "Join me at Green Coffee", text: fr ? "Nous gagnons chacun 150 points Green Rewards." : "We both get 150 Green Rewards points.", url: inviteUrl }); return; } catch { /* cancelled or unavailable */ }
    }
    copyInvite();
  }

  if (!open) return null;
  return <div className="cx-modal-layer"><button className="cx-modal-scrim" aria-label={fr ? "Fermer l’invitation" : "Close invite"} onClick={onClose} /><section className="cx-invite-modal" role="dialog" aria-modal="true" aria-labelledby="cx-invite-title"><button className="cx-modal-close" aria-label={fr ? "Fermer" : "Close"} onClick={onClose}><X size={19} /></button><span className="cx-invite-icon"><Gift size={28} /></span><span className="customer-kicker">{fr ? "DONNEZ 150 • RECEVEZ 150" : "GIVE 150 • GET 150"}</span><h2 id="cx-invite-title">{fr ? "Le café est meilleur à plusieurs." : "Coffee is better together."}</h2><p>{fr ? "Lorsqu’un ami s’inscrit avec votre lien et termine sa première visite, vous recevez chacun 150 points." : "When a friend joins with your link and completes their first café visit, you both receive 150 points."}</p><div className="cx-invite-link"><span>{inviteUrl}</span><button onClick={copyInvite} aria-label={fr ? "Copier le lien" : "Copy invite link"}><Copy size={17} /></button></div><div className="cx-invite-actions"><Button icon={Share2} onClick={shareInvite}>{fr ? "Partager" : "Share invite"}</Button><Button variant="secondary" icon={Copy} onClick={copyInvite}>{fr ? "Copier le lien" : "Copy link"}</Button></div><small>{fr ? "Votre lien personnel peut être copié ou partagé depuis cet appareil." : "Your personal link can be copied or shared from this device."}</small></section></div>;
}

function ReceiptScanner({ open, onClose, onComplete, locale = "en" }) {
  const [state, setState] = useState("loading");
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  function stop() { streamRef.current?.getTracks?.().forEach((track) => track.stop()); streamRef.current = null; }
  async function start() {
    stop(); setState("loading");
    try {
      if (!navigator.mediaDevices?.getUserMedia) throw new Error("unavailable");
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" } }, audio: false });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setState("ready");
    } catch { setState("demo"); }
  }
  useEffect(() => { if (open) start(); else stop(); return stop; }, [open]);
  if (!open) return null;
  const fr = locale === "fr";
  function scanDemo() { setState("scanning"); window.setTimeout(onComplete, 1100); }
  return <div className="cx-modal-layer cx-dark-layer"><button className="cx-modal-scrim" aria-label={fr ? "Fermer le scanner" : "Close receipt scanner"} onClick={onClose} /><section className="cx-receipt-scanner" role="dialog" aria-modal="true"><header><div><span>{fr ? "SCANNER DE TICKET" : "RECEIPT SCANNER"}</span><h2>{fr ? "Placez le QR dans le cadre." : "Place the QR inside the frame."}</h2></div><button aria-label={fr ? "Fermer" : "Close scanner"} onClick={onClose}><X size={21} /></button></header><div className={`cx-receipt-camera ${state}`}><video ref={videoRef} autoPlay muted playsInline /><span className="cx-receipt-frame"><i /><i /><i /><i /></span>{state !== "ready" && <div><Camera size={38} /><strong>{state === "loading" ? (fr ? "Démarrage de la caméra…" : "Starting camera…") : state === "scanning" ? (fr ? "Lecture du ticket…" : "Reading receipt…") : (fr ? "Caméra indisponible" : "Camera not available")}</strong><small>{fr ? "Vous pouvez toujours confirmer le ticket avec le bouton ci-dessous." : "You can still confirm the receipt with the button below."}</small></div>}{state === "scanning" && <span className="cx-scan-beam" />}</div><Button icon={ScanLine} onClick={scanDemo} disabled={state === "scanning"}>{state === "scanning" ? (fr ? "Lecture du ticket…" : "Reading receipt…") : (fr ? "Scanner le ticket" : "Scan receipt")}</Button>{state === "demo" && <button className="cx-camera-retry" onClick={start}><RotateCcw size={15} />{fr ? "Réessayer la caméra" : "Try camera again"}</button>}<p>{fr ? "L’accès caméra reste sur cet appareil. Aucune image n’est envoyée." : "Camera access stays on this device. No image is uploaded."}</p></section></div>;
}

function CustomerReservations({ account, reservations, setReservations, notify, onOpenGames, locale = "en" }) {
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState({ date: "2026-08-08", time: "18:30", guests: 2, note: "" });
  const ownReservations = reservations.filter((item) => item.customerId === account.id || item.name === account.name);
  const fr = locale === "fr";
  function create(event) { event.preventDefault(); const reservation = { id: Date.now(), customerId: account.id, name: account.name, initials: account.initials, time: form.time, date: form.date, guests: Number(form.guests), table: "—", status: "pending", note: form.note || (fr ? "Demande depuis l’application client" : "Customer app request"), phone: "+216 22 456 880" }; setReservations((current) => [reservation,...current]); setFormOpen(false); notify(fr ? "Demande de réservation envoyée au café" : "Reservation request sent to the café"); }
  if (fr) return <div className="customer-subpage">
    <header className="customer-subpage-head with-action"><div><span className="customer-kicker">VOTRE TABLE</span><h1>Réservations</h1><p>Prévoyez un café, une soirée jeux ou le grand match.</p></div><Button icon={Plus} onClick={() => setFormOpen(true)}>Nouvelle réservation</Button></header>
    <section className="upcoming-customer-booking"><div className="booking-date-block"><span>SAM</span><strong>08</strong><small>AOÛ</small></div><div><Badge tone="green" dot>Réservation confirmée</Badge><h2>Table pour 4 à 18h30</h2><p><MapPin size={14} />Green Coffee Games • Table près de la fenêtre</p><span>Rappel prévu à 16h30</span></div><div><small>À venir</small></div></section>
    {ownReservations.length > 0 && <section className="customer-request-list"><SectionTitle title="Demandes" subtitle="En attente de l’équipe du café" />{ownReservations.map((item) => <article key={item.id}><CalendarDays size={19} /><span><strong>{item.date} à {item.time}</strong><small>{item.guests} personnes • {item.note}</small></span><Badge tone={item.status === "confirmed" ? "green" : "orange"}>{item.status === "confirmed" ? "confirmée" : item.status === "waitlist" ? "liste d’attente" : "en attente"}</Badge></article>)}</section>}
    <section className="booking-ideas"><article className="football"><span>⚽</span><div><Badge tone="light">RÉSERVATION ÉVÉNEMENT</Badge><h3>Finale de la Ligue des champions</h3><p>Samedi • 20h00 • 14 places restantes</p></div><button onClick={() => { setForm((current) => ({ ...current, note: "Finale de la Ligue des champions" })); setFormOpen(true); }}>Réserver <ArrowRight size={15} /></button></article><article className="games"><Gamepad2 size={27} /><div><h3>Réserver une table de jeux</h3><p>Plus de 40 jeux prêts à jouer.</p></div><button onClick={onOpenGames}>Explorer <ChevronRight size={15} /></button></article></section>
    {formOpen && <div className="customer-form-modal"><form onSubmit={create}><header><div><span>Nouvelle réservation</span><h2>Gardez votre table.</h2></div><IconButton type="button" label="Fermer" onClick={() => setFormOpen(false)}><X size={19} /></IconButton></header><div className="form-grid"><label><span>Date</span><input type="date" value={form.date} onChange={(event) => setForm({...form,date:event.target.value})} /></label><label><span>Heure</span><input type="time" value={form.time} onChange={(event) => setForm({...form,time:event.target.value})} /></label><label><span>Personnes</span><input type="number" min="1" max="12" value={form.guests} onChange={(event) => setForm({...form,guests:event.target.value})} /></label><label className="span-2"><span>Une information à nous communiquer ?</span><textarea rows="3" value={form.note} onChange={(event) => setForm({...form,note:event.target.value})} /></label></div><Button type="submit" icon={CalendarDays}>Envoyer la demande</Button></form></div>}
  </div>;
  return <div className="customer-subpage"><header className="customer-subpage-head with-action"><div><span className="customer-kicker">YOUR TABLE</span><h1>Bookings</h1><p>Plan a coffee, a game night, or the big match.</p></div><Button icon={Plus} onClick={() => setFormOpen(true)}>New booking</Button></header><section className="upcoming-customer-booking"><div className="booking-date-block"><span>SAT</span><strong>08</strong><small>AUG</small></div><div><Badge tone="green" dot>Confirmed booking</Badge><h2>Table for 4 at 18:30</h2><p><MapPin size={14} />Green Coffee Games • Window table</p><span>Reminder scheduled for 16:30</span></div><div><small>Upcoming</small></div></section>{ownReservations.length > 0 && <section className="customer-request-list"><SectionTitle title="Requests" subtitle="Waiting for the café team" />{ownReservations.map((item) => <article key={item.id}><CalendarDays size={19} /><span><strong>{item.date} at {item.time}</strong><small>{item.guests} guests • {item.note}</small></span><Badge tone={item.status === "confirmed" ? "green" : "orange"}>{item.status}</Badge></article>)}</section>}<section className="booking-ideas"><article className="football"><span>⚽</span><div><Badge tone="light">EVENT BOOKING</Badge><h3>Champions League final</h3><p>Saturday • 20:00 • 14 seats left</p></div><button onClick={() => { setForm((current) => ({ ...current, note: "Champions League final" })); setFormOpen(true); }}>Reserve <ArrowRight size={15} /></button></article><article className="games"><Gamepad2 size={27} /><div><h3>Book a game table</h3><p>40+ games ready to play.</p></div><button onClick={onOpenGames}>Explore <ChevronRight size={15} /></button></article></section>{formOpen && <div className="customer-form-modal"><form onSubmit={create}><header><div><span>New reservation</span><h2>Save your table.</h2></div><IconButton type="button" label="Close" onClick={() => setFormOpen(false)}><X size={19} /></IconButton></header><div className="form-grid"><label><span>Date</span><input type="date" value={form.date} onChange={(event) => setForm({...form,date:event.target.value})} /></label><label><span>Time</span><input type="time" value={form.time} onChange={(event) => setForm({...form,time:event.target.value})} /></label><label><span>Guests</span><input type="number" min="1" max="12" value={form.guests} onChange={(event) => setForm({...form,guests:event.target.value})} /></label><label className="span-2"><span>Anything we should know?</span><textarea rows="3" value={form.note} onChange={(event) => setForm({...form,note:event.target.value})} /></label></div><Button type="submit" icon={CalendarDays}>Send request</Button></form></div>}</div>;
}

function CustomerEvents({ notify, onOpenGames, locale = "en" }) {
  const fr = locale === "fr";
  const eventNamesFr = { "Catan community night": "Soirée communautaire Catan", "Sunday kids workshop": "Atelier enfants du dimanche" };
  const eventTypesFr = { "Board games": "Jeux de société", "Kids park": "Parc enfants" };
  const eventDatesFr = { "WED • AUG 12": "MER • 12 AOÛ", "SUN • AUG 16": "DIM • 16 AOÛ" };
  return <div className="customer-subpage"><header className="customer-subpage-head"><span className="customer-kicker">{fr ? "PLUS QU’UN CAFÉ" : "MORE THAN COFFEE"}</span><h1>{fr ? "Au programme" : "What’s happening"}</h1><p>{fr ? "Grands matchs, jeux entre amis et moments en famille." : "Big matches, friendly competition, and family time."}</p></header><section className="customer-event-feature"><div><Badge tone="light">{fr ? "SAMEDI • 20H00" : "SATURDAY • 20:00"}</Badge><h2>{fr ? <>La finale,<br />sur grand écran.</> : <>The final,<br />on the big screen.</>}</h2><p>{fr ? "Finale de la Ligue des champions • en direct chez Green Coffee" : "Champions League final • live at Green Coffee"}</p><span><UsersRound size={15} />46/60 {fr ? "places réservées" : "seats booked"}</span><button onClick={() => notify(fr ? "Votre place est réservée" : "Your event seat is reserved")}>{fr ? "Réserver ma place" : "Reserve my seat"} <ArrowRight size={16} /></button></div><span>⚽</span></section><div className="customer-event-grid">{events.slice(1).map((event,index) => <article key={event.title}><div className={`event-photo ${index ? "kids" : "games"}`}>{index ? <span>★</span> : <Gamepad2 size={42} />}</div><Badge tone={index ? "purple" : "orange"}>{fr ? eventTypesFr[event.type] || event.type : event.type}</Badge><h3>{fr ? eventNamesFr[event.title] || event.title : event.title}</h3><p>{fr ? eventDatesFr[event.date] || event.date : event.date} • {event.time}</p><div><span><UsersRound size={14} />{event.bookings}/{event.capacity} {fr ? "réservées" : "booked"}</span><button onClick={() => notify(fr ? `Place demandée pour ${eventNamesFr[event.title] || event.title}` : `Seat requested for ${event.title}`)}>{fr ? "Participer" : "Join"} <ChevronRight size={15} /></button></div></article>)}<article className="games-library-event"><DiceCards /><h3>{fr ? "Plus de 40 jeux" : "Explore 40+ games"}</h3><p>{fr ? "Consultez les disponibilités avant votre prochaine visite." : "See what’s available before your next visit."}</p><button onClick={onOpenGames}>{fr ? "Ouvrir le menu des jeux" : "Open games menu"} <ArrowRight size={15} /></button></article></div></div>;
}

function DiceCards() { return <span className="dice-cards"><Gamepad2 size={35} /></span>; }

function GamesLibrary({ open, onClose, notify, activeSession, onNeedSession, locale = "en", games, setGames }) {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [requested, setRequested] = useState(null);
  const [quickGame, setQuickGame] = useState(false);
  const [playerRoll, setPlayerRoll] = useState(null);
  const [houseRoll, setHouseRoll] = useState(null);
  const fr = locale === "fr";

  useEffect(() => {
    if (!open) return undefined;
    function escape(event) { if (event.key === "Escape") onClose(); }
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [open, onClose]);

  if (!open) return null;
  const types = ["All", ...new Set(games.map((game) => game.type))];
  const visibleGames = games
    .filter((game) => (filter === "All" || game.type === filter) && normalizeSearchText(`${game.name} ${game.nameFr || ""}`).includes(normalizeSearchText(query)))
    .map((game) => ({
      ...game,
      displayName: fr ? game.nameFr || game.name : game.name,
      displayType: fr ? game.typeFr || game.type : game.type,
      displayDifficulty: fr ? game.difficultyFr || game.difficulty : game.difficulty,
    }));

  function requestGame(game) {
    if (game.status !== "available") {
      notify(fr ? `${game.displayName} est actuellement emprunté` : `${game.displayName} is currently checked out`);
      return;
    }
    if (!activeSession) {
      onNeedSession();
      return;
    }
    setRequested(game.id);
    setGames((current) => current.map((item) => item.id === game.id ? { ...item, status: "checked-out", checkedOutBy: activeSession.id } : item));
    notify(fr ? `${game.displayName} demandé pour ${activeSession.id} • l’équipe va l’apporter` : `${game.displayName} requested for ${activeSession.id} • the team will bring it over`);
  }

  function roll() {
    setPlayerRoll(Math.floor(Math.random() * 6) + 1);
    setHouseRoll(Math.floor(Math.random() * 6) + 1);
  }

  return <div className="cx-games-layer" role="presentation">
    <button className="cx-modal-scrim" aria-label={fr ? "Fermer le menu des jeux" : "Close games menu"} onClick={onClose} />
    <section className="cx-games-library" role="dialog" aria-modal="true" aria-labelledby="cx-games-title">
      <header><div><span className="customer-kicker">{fr ? "JOUEZ CHEZ GREEN" : "PLAY AT GREEN"}</span><h2 id="cx-games-title">{fr ? "Choisissez un jeu pour votre table." : "Pick a game for your table."}</h2><p>{fr ? "Consultez les jeux disponibles, demandez-en un ou jouez tout de suite." : "Browse what’s on the shelf, request it, or try a tiny game right now."}</p></div><button aria-label={fr ? "Fermer le menu des jeux" : "Close games menu"} onClick={onClose}><X size={21} /></button></header>
      <div className="cx-games-tools"><label><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={fr ? "Rechercher un jeu" : "Search games"} aria-label={fr ? "Rechercher un jeu" : "Search games"} /></label><button className="cx-quick-game-button" onClick={() => setQuickGame(true)}><Gamepad2 size={17} />{fr ? "Jouer à Brew Dice" : "Play Brew Dice"}</button></div>
      <div className="cx-game-filters" role="tablist">{types.map((type) => { const sample = games.find((game) => game.type === type); const label = type === "All" ? (fr ? "Tous" : "All") : fr ? sample?.typeFr || type : type; return <button key={type} role="tab" aria-selected={filter === type} className={filter === type ? "active" : ""} onClick={() => setFilter(type)}>{label}</button>; })}</div>
      <div className="cx-game-grid">{visibleGames.map((game) => { const unavailable = game.status !== "available"; return <article key={game.id}><span className="cx-game-art">{game.emoji}</span><div><span>{game.displayType} • {game.displayDifficulty}</span><h3>{game.displayName}</h3><p><UsersRound size={14} />{game.players} {fr ? "joueurs" : "players"} <Clock3 size={14} />{game.duration}</p></div><footer><small><i />{unavailable ? (fr ? "Emprunté" : "Checked out") : (fr ? "Disponible" : "Available")}</small><button className={requested === game.id ? "requested" : ""} disabled={unavailable && requested !== game.id} onClick={() => requestGame(game)}>{requested === game.id ? <><Check size={15} />{fr ? "Demandé" : "Requested"}</> : unavailable ? <>{fr ? "Indisponible" : "Unavailable"}</> : activeSession ? <>{fr ? `Demander pour ${activeSession.id}` : `Request for ${activeSession.id}`} <ArrowRight size={15} /></> : <><QrCode size={15} />{fr ? "Scanner pour demander" : "Scan to request"}</>}</button></footer></article>; })}</div>
      {!visibleGames.length && <div className="customer-menu-empty"><Search size={25} /><strong>{fr ? "Aucun jeu trouvé" : "No game found"}</strong><p>{fr ? "Essayez un autre titre ou type de jeu." : "Try another title or game type."}</p></div>}
      <footer className="cx-games-note"><Gamepad2 size={19} /><span><strong>{fr ? "Comment ça marche" : "How it works"}</strong><small>{fr ? "Demandez un jeu après vous être installé. L’équipe l’apporte et suit sa disponibilité." : "Request a game after you sit down. Staff brings it over and tracks its availability."}</small></span></footer>
    </section>
    {quickGame && <section className="cx-dice-game" role="dialog" aria-modal="true" aria-labelledby="cx-dice-title"><button className="cx-modal-close" aria-label={fr ? "Fermer le mini-jeu" : "Close mini game"} onClick={() => setQuickGame(false)}><X size={19} /></button><span className="cx-dice-logo">🎲</span><span className="customer-kicker">{fr ? "JEU RAPIDE À TABLE" : "QUICK TABLE GAME"}</span><h2 id="cx-dice-title">Brew Dice</h2><p>{fr ? "Le meilleur lancer gagne, le temps que votre café soit prêt." : "Highest roll wins. Perfect while your coffee is being made."}</p><div className="cx-dice-board"><article><span>{fr ? "Vous" : "You"}</span><strong>{playerRoll || "–"}</strong></article><b>VS</b><article><span>Green</span><strong>{houseRoll || "–"}</strong></article></div>{playerRoll && <strong className="cx-dice-result">{playerRoll === houseRoll ? (fr ? "Égalité — relancez !" : "It’s a draw — roll again!") : playerRoll > houseRoll ? (fr ? "Vous gagnez cette manche !" : "You win this round!") : (fr ? "Green gagne — revanche ?" : "Green wins — rematch?")}</strong>}<Button icon={Gamepad2} onClick={roll}>{playerRoll ? (fr ? "Relancer" : "Roll again") : (fr ? "Lancer les dés" : "Roll the dice")}</Button>{playerRoll && <button className="cx-reset-game" onClick={() => { setPlayerRoll(null); setHouseRoll(null); }}><RotateCcw size={15} />{fr ? "Recommencer" : "Reset game"}</button>}<small>{fr ? "Jeu de table • les scores sont réinitialisés à la fermeture" : "Table game • scores reset when closed"}</small></section>}
  </div>;
}

function CustomerProfile({ account, onSwitchAccount, onLogout, notify, locale = "en", favoriteItems = [], onToggleFavorite, orders = [], onOpenFavorite, onBrowseMenu }) {
  const [preferences, setPreferences] = useState(["Oat milk", "Usually iced"]);
  const [editOpen, setEditOpen] = useState(false);
  const [panel, setPanel] = useState(null);
  const [profile, setProfile] = useState({ name: account.name, email: account.email });
  const choices = ["Oat milk", "Usually iced", "No sugar", "Extra shot"];
  const fr = locale === "fr";
  const preferenceLabelsFr = { "Oat milk": "Lait d’avoine", "Usually iced": "Souvent glacé", "No sugar": "Sans sucre", "Extra shot": "Dose supplémentaire" };

  function togglePreference(choice) {
    setPreferences((current) => current.includes(choice) ? current.filter((item) => item !== choice) : [...current, choice]);
    notify(fr ? `Préférence « ${preferenceLabelsFr[choice] || choice} » mise à jour` : `${choice} preference updated`);
  }

  function saveProfile(event) {
    event.preventDefault();
    setEditOpen(false);
    notify(fr ? "Modifications du profil enregistrées sur cet appareil" : "Profile changes saved on this device");
  }

  if (fr) return <div className="customer-subpage profile-page">
    <header className="customer-subpage-head"><span className="customer-kicker">VOTRE ESPACE</span><h1>Profil</h1><p>Préférences, coordonnées et accès au compte.</p></header>
    <div className="profile-page-grid">
      <section className="customer-profile-card"><Avatar initials={account.initials} size="xl" tone={0} online /><div><Badge tone="orange"><Trophy size={11} />Membre {account.tier || "Gold"}</Badge><h2>{profile.name}</h2><p>{profile.email}</p><span>Membre depuis octobre 2024</span></div><button onClick={() => setEditOpen(true)}>Modifier le profil</button></section>
      <section className="customer-preference-card"><SectionTitle title="Préférences café" subtitle="Touchez pour améliorer les recommandations" /><div>{choices.map((choice) => { const active = preferences.includes(choice); return <button key={choice} className={active ? "active" : ""} aria-pressed={active} onClick={() => togglePreference(choice)}>{active ? <Check size={14} /> : <Plus size={14} />}{preferenceLabelsFr[choice] || choice}</button>; })}</div></section>
      <section className="profile-links">
        <button onClick={() => window.open(GREEN_COFFEE_MAP_URL, "_blank", "noopener,noreferrer")}><MapPin size={18} /><span><strong>Nous trouver à Mégrine</strong><small>Ouvrir Google Maps</small></span><ChevronRight size={16} /></button>
        <button onClick={() => setPanel("favorites")}><Heart size={18} /><span><strong>Articles favoris</strong><small>{favoriteItems.length} {favoriteItems.length > 1 ? "articles enregistrés" : "article enregistré"}</small></span><ChevronRight size={16} /></button>
        <button onClick={() => setPanel("receipts")}><History size={18} /><span><strong>Historique des tickets</strong><small>38 tickets synchronisés</small></span><ChevronRight size={16} /></button>
        <button onClick={() => setPanel("payments")}><CreditCard size={18} /><span><strong>Moyens de paiement</strong><small>Visa •••• 4242</small></span><ChevronRight size={16} /></button>
        <button onClick={() => setPanel("help")}><MessageCircle size={18} /><span><strong>Aide et avis</strong><small>Parler à Green Coffee</small></span><ChevronRight size={16} /></button>
      </section>
      <section className="customer-account-actions"><button onClick={onSwitchAccount}><UsersRound size={18} /><span><strong>Changer de compte</strong><small>Choisir un autre espace</small></span><ChevronRight size={16} /></button><button onClick={onLogout}><LogOut size={18} /><span><strong>Se déconnecter</strong><small>Retourner à la connexion</small></span><ChevronRight size={16} /></button></section>
    </div>
    {editOpen && <div className="cx-modal-layer"><button className="cx-modal-scrim" aria-label="Fermer l’éditeur du profil" onClick={() => setEditOpen(false)} /><form className="cx-profile-editor" onSubmit={saveProfile}><button type="button" className="cx-modal-close" aria-label="Fermer" onClick={() => setEditOpen(false)}><X size={19} /></button><span className="customer-kicker">INFORMATIONS DU COMPTE</span><h2>Modifier votre profil</h2><label><span>Nom</span><input value={profile.name} onChange={(event) => setProfile((current) => ({ ...current, name: event.target.value }))} required /></label><label><span>E-mail</span><input type="email" value={profile.email} onChange={(event) => setProfile((current) => ({ ...current, email: event.target.value }))} required /></label><Button type="submit">Enregistrer</Button><small>Les modifications sont enregistrées sur cet appareil.</small></form></div>}
    <ProfileExamplePanel kind={panel} locale={locale} account={account} favoriteItems={favoriteItems} onToggleFavorite={onToggleFavorite} orders={orders} onOpenFavorite={onOpenFavorite} onBrowseMenu={onBrowseMenu} onClose={() => setPanel(null)} notify={notify} />
  </div>;

  return <div className="customer-subpage profile-page">
    <header className="customer-subpage-head"><span className="customer-kicker">YOUR SPACE</span><h1>Profile</h1><p>Preferences, contact details, and account access.</p></header>
    <div className="profile-page-grid">
      <section className="customer-profile-card"><Avatar initials={account.initials} size="xl" tone={0} online /><div><Badge tone="orange"><Trophy size={11} />{account.tier || "Gold"} member</Badge><h2>{profile.name}</h2><p>{profile.email}</p><span>Member since October 2024</span></div><button onClick={() => setEditOpen(true)}>Edit profile</button></section>
      <section className="customer-preference-card"><SectionTitle title="Coffee preferences" subtitle="Tap to improve recommendations" /><div>{choices.map((choice) => { const active = preferences.includes(choice); return <button key={choice} className={active ? "active" : ""} aria-pressed={active} onClick={() => togglePreference(choice)}>{active ? <Check size={14} /> : <Plus size={14} />}{choice}</button>; })}</div></section>
      <section className="profile-links">
        <button onClick={() => window.open(GREEN_COFFEE_MAP_URL, "_blank", "noopener,noreferrer")}><MapPin size={18} /><span><strong>Find us in Mégrine</strong><small>Open Google Maps</small></span><ChevronRight size={16} /></button>
        <button onClick={() => setPanel("favorites")}><Heart size={18} /><span><strong>Favorite items</strong><small>{favoriteItems.length} saved {favoriteItems.length === 1 ? "item" : "items"}</small></span><ChevronRight size={16} /></button>
        <button onClick={() => setPanel("receipts")}><History size={18} /><span><strong>Receipt history</strong><small>38 synced receipts</small></span><ChevronRight size={16} /></button>
        <button onClick={() => setPanel("payments")}><CreditCard size={18} /><span><strong>Payment methods</strong><small>Visa •••• 4242</small></span><ChevronRight size={16} /></button>
        <button onClick={() => setPanel("help")}><MessageCircle size={18} /><span><strong>Help & feedback</strong><small>Talk to Green Coffee</small></span><ChevronRight size={16} /></button>
      </section>
      <section className="customer-account-actions"><button onClick={onSwitchAccount}><UsersRound size={18} /><span><strong>Switch account</strong><small>Choose another workspace</small></span><ChevronRight size={16} /></button><button onClick={onLogout}><LogOut size={18} /><span><strong>Sign out</strong><small>Return to sign in</small></span><ChevronRight size={16} /></button></section>
    </div>
    {editOpen && <div className="cx-modal-layer"><button className="cx-modal-scrim" aria-label="Close profile editor" onClick={() => setEditOpen(false)} /><form className="cx-profile-editor" onSubmit={saveProfile}><button type="button" className="cx-modal-close" aria-label="Close" onClick={() => setEditOpen(false)}><X size={19} /></button><span className="customer-kicker">ACCOUNT DETAILS</span><h2>Edit your profile</h2><label><span>Name</span><input value={profile.name} onChange={(event) => setProfile((current) => ({ ...current, name: event.target.value }))} required /></label><label><span>Email</span><input type="email" value={profile.email} onChange={(event) => setProfile((current) => ({ ...current, email: event.target.value }))} required /></label><Button type="submit">Save changes</Button><small>Changes are saved on this device.</small></form></div>}
    <ProfileExamplePanel kind={panel} locale={locale} account={account} favoriteItems={favoriteItems} onToggleFavorite={onToggleFavorite} orders={orders} onOpenFavorite={onOpenFavorite} onBrowseMenu={onBrowseMenu} onClose={() => setPanel(null)} notify={notify} />
  </div>;
}
