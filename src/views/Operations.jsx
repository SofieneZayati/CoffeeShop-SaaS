import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BellRing,
  CalendarCheck2,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Coffee,
  CreditCard,
  Download,
  Edit3,
  Eye,
  Filter,
  Grid2X2,
  ImagePlus,
  LayoutGrid,
  ListFilter,
  LockKeyhole,
  Mail,
  MessageCircle,
  Minus,
  MoreHorizontal,
  PackageOpen,
  Phone,
  Plus,
  QrCode,
  ReceiptText,
  Search,
  Send,
  Settings2,
  Sparkles,
  Star,
  TimerReset,
  Trash2,
  UserRound,
  UsersRound,
  UtensilsCrossed,
  X,
  Zap,
} from "lucide-react";
import { Avatar, Badge, Button, Card, IconButton, MetricDelta, PageHeader, Progress, SectionTitle, Segmented, Toggle } from "../components/ui";
import { QrPattern } from "../components/Overlays";
import { StaffLocalized, useStaffLanguage } from "../context/StaffLanguageContext";
import "../styles/admin-interactions.css";

const operationsFr = {
  "Operations": "Opérations",
  "Live orders": "Commandes en direct",
  "Every table, every ticket, perfectly in sync.": "Toutes les tables et toutes les commandes, parfaitement synchronisées.",
  "Board view": "Vue tableau",
  "Barista display": "Écran barista",
  "New order": "Nouvelle commande",
  "Open tickets": "Commandes ouvertes",
  "Average prep": "Préparation moyenne",
  "On target": "Dans les temps",
  "Completed today": "Terminées aujourd’hui",
  "Order value": "Panier moyen",
  "Barista station": "Poste barista",
  "On shift": "En service",
  "Connected": "Connecté",
  "Filter orders": "Filtrer les commandes",
  "All": "Toutes",
  "Awaiting": "En attente",
  "Preparing": "En préparation",
  "Ready": "Prête",
  "Live queue • All stations synced": "File en direct • Tous les postes synchronisés",
  "Barista display mode": "Mode écran barista",
  "High-contrast tickets, large timers, and one-tap progress.": "Tickets très lisibles, grands minuteurs et progression en un geste.",
  "STATION 01": "POSTE 01",
  "Awaiting acceptance": "En attente d’acceptation",
  "In preparation": "En préparation",
  "Ready to serve": "Prête à servir",
  "No orders waiting": "Aucune commande en attente",
  "Nothing being prepared": "Aucune préparation en cours",
  "Nothing waiting": "Aucune commande à servir",
  "Needs acceptance": "À accepter",
  "Accept within 2 min": "Accepter sous 2 min",
  "Target • 10 min": "Objectif • 10 min",
  "Call ticket number": "Appeler le numéro",
  "The board is up to date.": "Le tableau est à jour.",
  "Order options": "Options de la commande",
  "Accept & prepare": "Accepter et préparer",
  "Mark ready": "Marquer prête",
  "Serve order": "Servir la commande",
  "Close order details": "Fermer les détails de la commande",
  "Table session verified": "Session de table vérifiée",
  "Staff-entered waiter order": "Commande saisie par l’équipe",
  "Items": "Articles",
  "Guest note": "Note du client",
  "Payment": "Paiement",
  "Payment status verified": "Statut du paiement vérifié",
  "Receipt": "Reçu",
  "Included": "Inclus",
  "Total": "Total",
  "Review the item breakdown before closing or printing the order.": "Vérifiez le détail avant de clôturer ou d’imprimer la commande.",
  "Timeline": "Suivi",
  "Order received": "Commande reçue",
  "Awaiting staff acceptance": "En attente de l’équipe",
  "Accepted and preparing": "Acceptée et en préparation",
  "Accept before the order reaches the barista queue": "Acceptez avant l’envoi au poste barista",
  "Barista station": "Poste barista",
  "Customer display notified": "Affichage client notifié",
  "Hide receipt": "Masquer le reçu",
  "View receipt": "Voir le reçu",
  "Complete": "Terminer",
  "Sell beautifully": "Une carte qui donne envie",
  "Menu & QR": "Carte et QR",
  "Products, availability, modifiers, and your customer-facing menu.": "Produits, disponibilités, options et carte visible par les clients.",
  "Open customer menu": "Ouvrir la carte client",
  "Add item": "Ajouter un article",
  "Dismiss message": "Fermer le message",
  "menu score": "score de la carte",
  "Excellent": "Excellent",
  "Your menu is ready to sell.": "Votre carte est prête pour le service.",
  "QR MENU": "CARTE QR",
  "Manage QR": "Gérer les QR",
  "Make every item irresistible": "Valorisez chaque article",
  "Stock focus for this shift": "Priorités de stock du service",
  "Write a richer product description in both guest languages.": "Rédigez une description plus attractive dans les deux langues.",
  "One item is low and one is currently unavailable.": "Un article est presque épuisé et un autre est indisponible.",
  "Review suggestion": "Voir la suggestion",
  "Search menu items…": "Rechercher dans la carte…",
  "Low stock only": "Stock faible uniquement",
  "Low-stock filter": "Filtrer le stock faible",
  "Featured": "Vedette",
  "Out of stock": "Épuisé",
  "No menu items found": "Aucun article trouvé",
  "Try another category or search.": "Essayez une autre catégorie ou une autre recherche.",
  "Menu editor": "Éditeur de la carte",
  "Update product details in both guest languages.": "Mettez à jour les détails du produit dans les deux langues.",
  "Close menu editor": "Fermer l’éditeur",
  "Replace image": "Remplacer l’image",
  "Name (English)": "Nom (anglais)",
  "Nom (français)": "Nom (français)",
  "Description (English)": "Description (anglais)",
  "Description (français)": "Description (français)",
  "Polish product copy": "Améliorer la description",
  "Refresh both customer-facing languages together": "Actualiser ensemble les deux langues de la carte",
  "Price (TND)": "Prix (TND)",
  "Stock today": "Stock du jour",
  "Category": "Catégorie",
  "Options & modifiers": "Options et personnalisations",
  "Product-specific choices": "Choix propres au produit",
  "Flavor, breakfast selections, serving or access": "Saveur, choix du petit-déjeuner, service ou accès",
  "Open options": "Ouvrir les options",
  "Extras and notes": "Suppléments et notes",
  "Only options that make sense for this item": "Uniquement les options adaptées à cet article",
  "Add modifier group": "Ajouter un groupe d’options",
  "Remove item": "Supprimer l’article",
  "Save changes": "Enregistrer",
  "All items": "Tous les articles",
  "Coffee": "Cafés",
  "Tea & infusions": "Thés et infusions",
  "Cold drinks": "Boissons froides",
  "Pastries": "Viennoiseries",
  "Desserts": "Pâtisseries",
  "Crepes & waffles": "Crêpes et gaufres",
  "Savory snacks": "Snacks salés",
  "Breakfast": "Petit déjeuner",
  "Kids Park": "Parc enfants",
  "Guest planning": "Accueil des clients",
  "Reservations": "Réservations",
  "A calm, complete view of every booking, reminder, and waitlist guest.": "Une vue claire de chaque réservation, rappel et client en attente.",
  "Export": "Exporter",
  "New reservation": "Nouvelle réservation",
  "Today’s bookings": "Réservations du jour",
  "Pending requests": "Demandes en attente",
  "Oldest waiting 8 min": "Plus ancienne attente : 8 min",
  "Needs review": "À vérifier",
  "All clear": "Tout est à jour",
  "Table fill rate": "Taux de remplissage",
  "For confirmed bookings": "Pour les réservations confirmées",
  "Reminders sent": "Rappels envoyés",
  "Automatic": "Automatique",
  "This week": "Cette semaine",
  "Calendar": "Calendrier",
  "Week": "Semaine",
  "Month": "Mois",
  "Month overview": "Vue du mois",
  "Select a date to inspect its agenda below.": "Sélectionnez une date pour afficher son agenda.",
  "NOW": "MAINTENANT",
  "No bookings on this date": "Aucune réservation à cette date",
  "Select August 8 or 9 to inspect scheduled guests.": "Sélectionnez le 8 ou le 9 août pour voir les réservations.",
  "Request inbox": "Demandes reçues",
  "Reservation filters": "Filtres des réservations",
  "Pending": "En attente",
  "Confirmed": "Confirmée",
  "Accept": "Accepter",
  "Decline": "Refuser",
  "AUTOMATION": "AUTOMATISATION",
  "No-shows are down 31%": "Les absences ont baissé de 31 %",
  "WhatsApp and email reminders go out two hours before every confirmed booking.": "Les rappels WhatsApp et e-mail partent deux heures avant chaque réservation confirmée.",
  "Configure": "Configurer",
  "Waitlist": "Liste d’attente",
  "Estimated wait • 18 min": "Attente estimée • 18 min",
  "Notified": "Notifiée",
  "Notify": "Notifier",
  "Active customer": "Client actif",
  "Close reservation": "Fermer la réservation",
  "Guest messages enabled": "Messages client activés",
  "Booking details": "Détails de la réservation",
  "Date": "Date",
  "Time": "Heure",
  "Party": "Groupe",
  "Table": "Table",
  "No special request": "Aucune demande particulière",
  "Message timeline": "Suivi des messages",
  "Request received": "Demande reçue",
  "Owner notification delivered": "Notification envoyée au propriétaire",
  "Reminder scheduled": "Rappel programmé",
  "2 hours before arrival": "2 heures avant l’arrivée",
  "Message guest": "Écrire au client",
  "Review the message before sending it through the connected channel.": "Vérifiez le message avant son envoi via le canal connecté.",
  "Modify booking": "Modifier la réservation",
  "Review the changes before saving this booking.": "Vérifiez les changements avant d’enregistrer la réservation.",
  "Cancel": "Annuler",
  "Save": "Enregistrer",
  "Message": "Message",
  "Reservation settings": "Paramètres des réservations",
  "Reservation reminders": "Rappels de réservation",
  "Choose when and how confirmed guests receive a reminder.": "Choisissez quand et comment les clients confirmés reçoivent un rappel.",
  "Close reminder settings": "Fermer les paramètres de rappel",
  "Send reminder": "Envoyer le rappel",
  "1 hour before": "1 heure avant",
  "2 hours before": "2 heures avant",
  "Morning of booking": "Le matin de la réservation",
  "1 day before": "1 jour avant",
  "Primary channel": "Canal principal",
  "WhatsApp, then email": "WhatsApp, puis e-mail",
  "Email only": "E-mail uniquement",
  "Message template": "Modèle du message",
  "Live room": "Salle en direct",
  "Floor plan": "Plan de salle",
  "The real café layout—customer seating, PC tables, kitchen, service counter, and kids park.": "Le plan réel du café : tables clients, tables PC, cuisine, comptoir et parc enfants.",
  "Edit layout": "Modifier le plan",
  "Finish layout": "Terminer le plan",
  "Table QR": "QR de table",
  "Available": "Disponible",
  "Occupied": "Occupée",
  "Reserved": "Réservée",
  "Needs reset": "À remettre en place",
  "Current occupancy": "Occupation actuelle",
  "All tables": "Toutes les tables",
  "Customer seating": "Espace clients",
  "PC tables": "Tables PC",
  "Filter floor tables": "Filtrer les tables",
  "Zoom out": "Dézoomer",
  "Zoom in": "Zoomer",
  "Interactive Green Coffee physical floor plan": "Plan interactif du café Green Coffee",
  "BACK OF HOUSE": "ESPACE SERVICE",
  "Kitchen": "Cuisine",
  "Prep • wash • pass": "Préparation • plonge • envoi",
  "Kitchen door": "Porte de la cuisine",
  "Serve / Service Counter": "Comptoir de service",
  "Orders • pickup • handoff": "Commandes • retrait • service",
  "Customer seating area": "Espace clients",
  "8 standard tables • scan QR at the table to order": "8 tables standard • scannez le QR à table pour commander",
  "KIDS PARK": "PARC ENFANTS",
  "Play safely, right in view.": "Jouer en sécurité, toujours en vue.",
  "Soft play • workshops • family seating": "Jeux doux • ateliers • espace familles",
  "Kids park door": "Porte du parc enfants",
  "Park door": "Porte du parc",
  "Main entrance": "Entrée principale",
  "Long PC table": "Longue table PC",
  "Floor plan legend": "Légende du plan",
  "Table status": "État des tables",
  "In use": "Occupée",
  "Reset": "Remise en place",
  "Map": "Plan",
  "Standard table": "Table standard",
  "Service counter": "Comptoir de service",
  "Cleaning": "Nettoyage",
  "Ordering": "Commande en cours",
  "QR-scanned table session": "Session ouverte par QR",
  "Session access": "Accès à la session",
  "Reserved for": "Réservée pour",
  "Ordering access": "Accès à la commande",
  "Previous session ended": "Session précédente terminée",
  "Ordering access is revoked. Mark the table ready after cleaning.": "L’accès aux commandes est fermé. Marquez la table prête après nettoyage.",
  "No guest QR session yet": "Aucune session QR client",
  "Take a waiter order here, or ask the guest to scan the QR fixed to this table.": "Saisissez la commande ici ou invitez le client à scanner le QR de la table.",
  "Ready for guests": "Prête pour les clients",
  "Scanning this table’s QR starts a time-limited ordering session automatically.": "Le scan du QR ouvre automatiquement une session de commande limitée dans le temps.",
  "QR SESSION ACTIVE": "SESSION QR ACTIVE",
  "SESSION EXPIRED": "SESSION EXPIRÉE",
  "TABLE QR READY": "QR DE TABLE PRÊT",
  "Active order": "Commande en cours",
  "Order in progress": "Commande en cours",
  "2 items served": "2 articles servis",
  "Last update 3 min ago": "Dernière mise à jour il y a 3 min",
  "Select a table": "Sélectionnez une table",
  "Details and actions will appear here.": "Les détails et actions apparaîtront ici.",
  "SHIFT NOTE": "NOTE DE SERVICE",
  "Projector remote is behind the bar for tonight’s match.": "La télécommande du projecteur est derrière le bar pour le match de ce soir.",
  "Added by Malek • 10:42": "Ajouté par Malek • 10:42",
  "All handover notes": "Toutes les notes de relève",
  "Table QR": "QR de table",
  "Waiter": "Serveur",
  "Paid online": "Payé en ligne",
  "Paid • Flouci": "Payé • Flouci",
  "Paid • Konnect": "Payé • Konnect",
  "Pay at cashier": "Payer à la caisse",
  "Light ice in one coffee": "Peu de glaçons dans un café",
  "No sugar": "Sans sucre",
  "No added sugar in one juice": "Sans sucre ajouté dans un jus",
  "Today": "Aujourd’hui",
  "Tomorrow": "Demain",
  "Event zone": "Espace événement",
  "Birthday brunch": "Brunch d’anniversaire",
  "Window seat if possible": "Près de la fenêtre si possible",
  "Kids park access ×2": "Accès parc enfants ×2",
  "Champions League table": "Table Ligue des champions",
  "Football night": "Soirée football",
  "confirmed": "confirmée",
  "pending": "en attente",
  "waitlist": "liste d’attente",
  "Customer seating": "Espace clients",
  "PC lounge": "Espace PC",
  " ago": "",
  " seats": " places",
  " guests": " clients",
  " bookings": " réservations",
  " in stock": " en stock",
  " left": " restants",
  "2× Iced coffee": "2× Café glacé",
  "1× Tiramisu": "1× Tiramisu",
  "1× Capucin": "1× Capucin",
  "1× Cookie": "1× Cookie",
  "2× Strawberry juice": "2× Jus de fraise",
  "1× Cheesecake": "1× Cheesecake",
  "1× Espresso": "1× Espresso",
  "2× Capucin": "2× Capucin",
  "1× Chocolate fondant": "1× Fondant au chocolat",
  "1× Direct coffee": "1× Café direct",
  "1× Croissant": "1× Croissant",
};

const operationsDictionary = { fr: operationsFr };
const operationsPatterns = [
  (text, locale) => {
    if (locale !== "fr") return undefined;
    const rules = [
      [/^(\d+) live$/, "$1 en direct"],
      [/^(\d+) tickets need the team$/, "$1 commandes à traiter"],
      [/^(\d+) live products • (\d+) low-stock item • (\d+) smart tips$/, "$1 produits actifs • $2 article presque épuisé • $3 conseils"],
      [/^(\d+) scans this week$/, "$1 scans cette semaine"],
      [/^(\d+) left$/, "$1 restants"],
      [/^(\d+) in stock$/, "$1 en stock"],
      [/^Edit (.+)$/, "Modifier $1"],
      [/^Toggle (.+) availability$/, "Changer la disponibilité de $1"],
      [/^(.+) product image$/, "Image du produit $1"],
      [/^(\d+) bookings$/, "$1 réservations"],
      [/^(\d+) guests$/, "$1 clients"],
      [/^(\d+) need a response$/, "$1 demandes à traiter"],
      [/^Previous (.+)$/, "$1 précédent"],
      [/^Next (.+)$/, "$1 suivant"],
      [/^Reservation #(\d+)$/, "Réservation n° $1"],
      [/^via (.+)$/, "via $1"],
      [/^(\d+) seats$/, "$1 places"],
      [/^(\d+) PC seats$/, "$1 places PC"],
      [/^(.+) • session$/, "$1 • session"],
      [/^(\d+) min$/, "il y a $1 min"],
      [/^just now$/, "à l’instant"],
      [/^Active • (.+)$/, "Active • $1"],
      [/^Expires in (.+) minutes\.(.*)$/, "Expire dans $1 minutes.$2"],
      [/^(.+) permanent QR$/, "QR permanent • $1"],
    ];
    for (const [pattern, replacement] of rules) {
      if (pattern.test(text)) return text.replace(pattern, replacement);
    }
    return undefined;
  },
];

function localizedOrderText(value, isFr) {
  const text = String(value ?? "");
  if (!isFr) return text;
  const exact = {
    ...operationsFr,
    "Table Guest": "Client à table",
    "Verified table QR": "QR de table vérifié",
    "Cash": "Espèces",
    "Card": "Carte",
    "Dine-in": "Sur place",
  };
  if (exact[text]) return exact[text];
  return text
    .replace(/^Dine-in • (T\d+) session verified/, "Sur place • $1 session vérifiée")
    .replace(/\bTable Guest\b/g, "Client à table")
    .replace(/\bVerified table QR\b/g, "QR de table vérifié")
    .replace(/\bIced coffee\b/g, "Café glacé")
    .replace(/\bStrawberry juice\b/g, "Jus de fraise")
    .replace(/\bChocolate fondant\b/g, "Fondant au chocolat")
    .replace(/\bDirect coffee\b/g, "Café direct");
}

function relativeOrderTime(value, isFr) {
  const text = String(value || "").trim();
  if (!text || text.toLowerCase() === "just now") return isFr ? "à l’instant" : "just now";
  return isFr ? `il y a ${text}` : `${text} ago`;
}

const orderColumns = [
  { id: "new", title: "Awaiting acceptance", tone: "blue", empty: "No orders waiting" },
  { id: "making", title: "In preparation", tone: "orange", empty: "Nothing being prepared" },
  { id: "ready", title: "Ready to serve", tone: "green", empty: "Nothing waiting" },
];

const statusLabel = { new: "Needs acceptance", making: "Preparing", ready: "Ready" };

function OrderTicket({ order, onAdvance, onSelect, compact = false, canAdvance = true, showFinancials = true }) {
  const { locale } = useStaffLanguage();
  const isFr = locale === "fr";
  const nextLabel = order.status === "new" ? (isFr ? "Accepter et préparer" : "Accept & prepare") : order.status === "making" ? (isFr ? "Marquer prête" : "Mark ready") : (isFr ? "Servir la commande" : "Serve order");
  return (
    <StaffLocalized dictionary={operationsDictionary} patterns={operationsPatterns}>
    <article className={`order-ticket ${order.status}${compact ? " compact" : ""}`} onClick={() => onSelect(order)}>
      <header>
        <div><Badge tone={order.status === "new" ? "blue" : order.status === "making" ? "orange" : "green"} dot>{isFr ? operationsFr[statusLabel[order.status]] : statusLabel[order.status]}</Badge><span className="ticket-time"><Clock3 size={13} />{relativeOrderTime(order.time, isFr)}</span></div>
        <IconButton label={isFr ? "Options de la commande" : "Order options"} onClick={(event) => { event.stopPropagation(); onSelect(order); }}><MoreHorizontal size={17} /></IconButton>
      </header>
      <div className="ticket-identity"><span className="ticket-table">{order.table}</span><div><strong>{localizedOrderText(order.guest, isFr)}</strong><small>{order.id} • {localizedOrderText(order.source, isFr)}</small></div>{showFinancials && <strong className="ticket-total">{order.total.toFixed(3)}</strong>}</div>
      <ul>{order.items.map((item) => <li key={item}>{localizedOrderText(item, isFr)}</li>)}</ul>
      {order.note && <div className="ticket-note"><MessageCircle size={14} />{localizedOrderText(order.note, isFr)}</div>}
      {showFinancials && <div className="ticket-payment"><CreditCard size={14} /><span>{localizedOrderText(order.payment, isFr)}</span>{order.payment.includes("Paid") && <Check size={14} />}</div>}
      {canAdvance && <button className={`ticket-action ${order.status}`} onClick={(event) => { event.stopPropagation(); onAdvance(order.id); }}>{nextLabel}<ArrowRight size={15} /></button>}
    </article>
    </StaffLocalized>
  );
}

export function OrdersView({ orders, onAdvanceOrder, onQuick, account, canCreateOrder = true, canAdvanceOrder = () => true, canViewFinancials = true, initialDisplay = "board" }) {
  const { locale } = useStaffLanguage();
  const isFr = locale === "fr";
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [receiptVisible, setReceiptVisible] = useState(false);
  const [display, setDisplay] = useState(initialDisplay);
  const activeOrders = orders.filter((order) => orderColumns.some((column) => column.id === order.status));
  const filtered = filter === "all" ? activeOrders : activeOrders.filter((order) => order.status === filter);
  const newCount = activeOrders.filter((order) => order.status === "new").length;
  const makingCount = activeOrders.filter((order) => order.status === "making").length;
  const readyCount = activeOrders.filter((order) => order.status === "ready").length;

  return (
    <StaffLocalized dictionary={operationsDictionary} patterns={operationsPatterns}>
    <div className="view operations-view">
      <PageHeader eyebrow={isFr ? "Opérations" : "Operations"} title={isFr ? "Commandes en direct" : "Live orders"} description={isFr ? "Toutes les tables et toutes les commandes, parfaitement synchronisées." : "Every table, every ticket, perfectly in sync."}
        actions={<><Button variant="secondary" icon={Eye} onClick={() => setDisplay(display === "kds" ? "board" : "kds")}>{display === "kds" ? (isFr ? "Vue tableau" : "Board view") : (isFr ? "Écran barista" : "Barista display")}</Button>{canCreateOrder && <Button icon={Plus} onClick={() => onQuick("order")}>{isFr ? "Nouvelle commande" : "New order"}</Button>}</>}
      />

      <section className="order-metrics">
        <Card><span className="metric-icon blue"><PackageOpen size={18} /></span><div><small>{isFr ? "Commandes ouvertes" : "Open tickets"}</small><strong>{activeOrders.length}</strong></div><MetricDelta>↓ 8%</MetricDelta></Card>
        <Card><span className="metric-icon orange"><Clock3 size={18} /></span><div><small>{isFr ? "Préparation moyenne" : "Average prep"}</small><strong>8m 24s</strong></div><Badge tone="green">{isFr ? "Dans les temps" : "On target"}</Badge></Card>
        <Card><span className="metric-icon green"><CheckCircle2 size={18} /></span><div><small>{isFr ? "Terminées aujourd’hui" : "Completed today"}</small><strong>143</strong></div><MetricDelta>↑ 12%</MetricDelta></Card>
        {canViewFinancials ? <Card><span className="metric-icon purple"><CircleDollarSign size={18} /></span><div><small>{isFr ? "Panier moyen" : "Order value"}</small><strong>16.800 TND</strong></div><MetricDelta>↑ 4.2%</MetricDelta></Card> : <Card><span className="metric-icon purple"><Coffee size={18} /></span><div><small>{isFr ? "Poste barista" : "Barista station"}</small><strong>BAR 01</strong><p>{account.firstName} • {isFr ? "En service" : "On shift"}</p></div><Badge tone="green" dot>{isFr ? "Connecté" : "Connected"}</Badge></Card>}
      </section>

      <section className={`orders-workspace ${display === "kds" ? "kds-mode" : ""}`}>
        <div className="orders-toolbar">
          <Segmented label={isFr ? "Filtrer les commandes" : "Filter orders"} value={filter} onChange={setFilter} options={[
            { value: "all", label: isFr ? "Toutes" : "All", count: activeOrders.length }, { value: "new", label: isFr ? "En attente" : "Awaiting", count: newCount }, { value: "making", label: isFr ? "En préparation" : "Preparing", count: makingCount }, { value: "ready", label: isFr ? "Prêtes" : "Ready", count: readyCount },
          ]} />
          <div className="orders-toolbar-right"><span className="live-sync"><i />{isFr ? "File en direct • Tous les postes synchronisés" : "Live queue • All stations synced"}</span></div>
        </div>
        {display === "kds" && <div className="kds-banner"><Zap size={18} /><div><strong>{isFr ? "Mode écran barista" : "Barista display mode"}</strong><span>{isFr ? "Tickets très lisibles, grands minuteurs et progression en un geste." : "High-contrast tickets, large timers, and one-tap progress."}</span></div><Badge tone="dark">{isFr ? "POSTE 01" : "STATION 01"}</Badge></div>}
        <div className="order-board">
          {orderColumns.map((column) => {
            const columnOrders = filtered.filter((order) => order.status === column.id);
            return (
              <section className={`order-column ${column.tone}`} key={column.id}>
                <header><div><i /><strong>{isFr ? operationsFr[column.title] : column.title}</strong><span>{columnOrders.length}</span></div><span>{column.id === "new" ? (isFr ? "Accepter sous 2 min" : "Accept within 2 min") : column.id === "making" ? (isFr ? "Objectif • 10 min" : "Target • 10 min") : (isFr ? "Appeler le numéro" : "Call ticket number")}</span></header>
                <div className="ticket-stack">
                  {columnOrders.map((order) => <OrderTicket key={order.id} order={order} onAdvance={onAdvanceOrder} onSelect={(item) => { setSelected(item); setReceiptVisible(false); }} compact={display === "kds"} canAdvance={canAdvanceOrder(order)} showFinancials={canViewFinancials} />)}
                  {columnOrders.length === 0 && <div className="empty-column"><CheckCircle2 size={24} /><strong>{isFr ? operationsFr[column.empty] : column.empty}</strong><span>{isFr ? "Le tableau est à jour." : "The board is up to date."}</span></div>}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      {selected && (
        <aside className="detail-panel open">
          <header><div><Badge tone={selected.status === "new" ? "blue" : selected.status === "making" ? "orange" : "green"} dot>{isFr ? operationsFr[statusLabel[selected.status]] : statusLabel[selected.status]}</Badge><h2>{isFr ? "Commande" : "Order"} {selected.id}</h2><p>{localizedOrderText(selected.source, isFr)} • {relativeOrderTime(selected.time, isFr)}</p></div><IconButton label={isFr ? "Fermer les détails de la commande" : "Close order details"} onClick={() => setSelected(null)}><X size={19} /></IconButton></header>
          <div className="detail-body">
            <div className="order-detail-table"><span>{selected.table}</span><div><strong>{localizedOrderText(selected.guest, isFr)}</strong><small>{selected.sessionId || selected.source?.includes("QR") ? (isFr ? "Session de table vérifiée" : "Table session verified") : (isFr ? "Commande saisie par l’équipe" : "Staff-entered waiter order")}</small></div><LockKeyhole size={17} /></div>
            <section><h3>{isFr ? "Articles" : "Items"}</h3>{selected.items.map((item) => <div className="detail-line" key={item}><span>{localizedOrderText(item, isFr)}</span><strong>—</strong></div>)}</section>
            {selected.note && <section><h3>{isFr ? "Note du client" : "Guest note"}</h3><div className="detail-note"><MessageCircle size={16} />{localizedOrderText(selected.note, isFr)}</div></section>}
            {canViewFinancials && <section><h3>Payment</h3><div className="payment-detail"><CreditCard size={17} /><div><strong>{selected.payment}</strong><small>Payment status verified</small></div><CheckCircle2 size={17} /></div></section>}
            {canViewFinancials && receiptVisible && <section className="admin-inline-editor"><h3>Receipt</h3>{selected.items.map((item) => <div className="detail-line" key={`receipt-${item}`}><span>{item}</span><strong>Included</strong></div>)}<div className="detail-line"><strong>Total</strong><strong>{selected.total.toFixed(3)} TND</strong></div><p>Review the item breakdown before closing or printing the order.</p></section>}
            <section><h3>Timeline</h3><ol className="order-history"><li className="done"><i /><span><strong>Order received</strong><small>via {selected.source}</small></span><time>{selected.time} ago</time></li><li className={selected.status !== "new" ? "done" : ""}><i /><span><strong>{selected.status === "new" ? "Awaiting staff acceptance" : "Accepted and preparing"}</strong><small>{selected.status === "new" ? "Accept before the order reaches the barista queue" : "Barista station"}</small></span></li><li className={selected.status === "ready" ? "done" : ""}><i /><span><strong>Ready to serve</strong><small>Customer display notified</small></span></li></ol></section>
          </div>
          <footer>{canViewFinancials && <Button variant="secondary" icon={ReceiptText} onClick={() => setReceiptVisible((current) => !current)}>{receiptVisible ? "Hide receipt" : "View receipt"}</Button>}{canAdvanceOrder(selected) && <Button icon={ArrowRight} onClick={() => { onAdvanceOrder(selected.id); setSelected(null); }}>{selected.status === "new" ? "Accept & prepare" : selected.status === "making" ? "Mark ready" : "Complete"}</Button>}</footer>
        </aside>
      )}
      {selected && <button className="drawer-scrim" onClick={() => setSelected(null)} aria-label="Close order details" />}
    </div>
    </StaffLocalized>
  );
}

const coreCategories = ["Coffee", "Tea & infusions", "Cold drinks", "Pastries", "Desserts", "Crepes & waffles", "Savory snacks", "Breakfast", "Kids Park"];
const formatMenuPrice = (value) => `${Number(value || 0).toLocaleString("en-TN", { maximumFractionDigits: 3 })} DT`;

export function MenuView({ menuItems, onToggleMenuItem, onQuick, onPreview, canEdit = true, canAdd = true, canPreview = true, canToggleAvailability = true }) {
  const { locale } = useStaffLanguage();
  const isFr = locale === "fr";
  const [category, setCategory] = useState("All items");
  const [query, setQuery] = useState("");
  const [layout, setLayout] = useState("grid");
  const [selected, setSelected] = useState(null);
  const [draft, setDraft] = useState(null);
  const [itemOverrides, setItemOverrides] = useState({});
  const [hiddenIds, setHiddenIds] = useState([]);
  const [lowStockOnly, setLowStockOnly] = useState(false);
  const [notice, setNotice] = useState("");
  const displayItems = menuItems.map((item) => ({ ...item, ...itemOverrides[item.id] })).filter((item) => !hiddenIds.includes(item.id));
  const categories = ["All items", ...new Set([...coreCategories, ...displayItems.map((item) => item.category)])];
  const filtered = displayItems.filter((item) => (category === "All items" || item.category === category) && `${item.name} ${item.nameFr || ""} ${item.description || ""} ${item.descriptionFr || ""}`.toLowerCase().includes(query.toLowerCase()) && (!lowStockOnly || item.stock <= 7));
  const activeCount = displayItems.filter((item) => item.active).length;

  function openEditor(item) {
    setSelected(item.id);
    setDraft({
      ...item,
      nameFr: item.nameFr || item.name || "",
      descriptionFr: item.descriptionFr || item.description || "",
    });
  }

  function closeEditor() {
    setSelected(null);
    setDraft(null);
  }

  function saveItem() {
    const name = draft.name?.trim() || draft.nameFr?.trim() || "Untitled menu item";
    const nameFr = draft.nameFr?.trim() || name;
    const description = draft.description?.trim() || draft.descriptionFr?.trim() || "Details coming soon.";
    const descriptionFr = draft.descriptionFr?.trim() || draft.description?.trim() || "Détails à venir.";
    const { price, stock, category } = draft;
    setItemOverrides((current) => ({ ...current, [selected]: { name, nameFr, description, descriptionFr, price, stock, category } }));
    setNotice(`${name} was updated in English and French.`);
    closeEditor();
  }

  return (
    <StaffLocalized dictionary={operationsDictionary} patterns={operationsPatterns}>
    <div className="view menu-view">
      <PageHeader eyebrow={isFr ? "Une carte qui donne envie" : "Sell beautifully"} title={isFr ? "Carte et QR" : "Menu & QR"} description={isFr ? "Produits, disponibilités, options et carte visible par les clients." : "Products, availability, modifiers, and your customer-facing menu."}
        actions={<>{canPreview && <Button variant="secondary" icon={Eye} onClick={onPreview}>{isFr ? "Ouvrir la carte client" : "Open customer menu"}</Button>}{canAdd && <Button icon={Plus} onClick={() => onQuick("menu")}>{isFr ? "Ajouter un article" : "Add item"}</Button>}</>}
      />
      {notice && <div className="admin-notice" role="status"><Check size={16} /><span>{notice}</span><button onClick={() => setNotice("")} aria-label="Dismiss message"><X size={15} /></button></div>}
      <section className="menu-summary-grid">
        <Card className="menu-health"><div className="menu-health-ring"><strong>94</strong><span>{isFr ? "score de la carte" : "menu score"}</span></div><div><Badge tone="green" dot>Excellent</Badge><h3>{isFr ? "Votre carte est prête pour le service." : "Your menu is ready to sell."}</h3><p>{isFr ? `${activeCount} produits actifs • 1 article presque épuisé • 2 conseils` : `${activeCount} live products • 1 low-stock item • 2 smart tips`}</p></div></Card>
        <Card className="qr-menu-card"><span className="qr-card-icon"><QrCode size={24} /></span><div><Badge tone="blue">{isFr ? "CARTE QR" : "QR MENU"}</Badge><h3>{isFr ? "1 284 scans cette semaine" : "1,284 scans this week"}</h3><p>{isFr ? "+18 % par rapport à la semaine précédente" : "+18% versus the previous week"}</p></div><button onClick={() => onQuick("qr")}>{isFr ? "Gérer les QR" : "Manage QR"} <ChevronRight size={15} /></button></Card>
        <Card className="ai-menu-card"><span><Sparkles size={20} /></span><div><h3>{canEdit ? "Make every item irresistible" : "Stock focus for this shift"}</h3><p>{canEdit ? "Write a richer product description in both guest languages." : "One item is low and one is currently unavailable."}</p></div>{canEdit && <button onClick={() => openEditor(displayItems[0])}>Review suggestion</button>}</Card>
      </section>

      <Card className="menu-manager">
        <div className="menu-toolbar">
          <div className="menu-search"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search menu items…" /></div>
          <div className="category-filter"><select value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select><ChevronDown size={15} /></div>
          <button className={lowStockOnly ? "active" : ""} onClick={() => setLowStockOnly((current) => !current)}><Filter size={16} />{lowStockOnly ? "Low stock only" : "Low-stock filter"}</button>
          <div className="layout-toggle"><button className={layout === "grid" ? "active" : ""} onClick={() => setLayout("grid")}><LayoutGrid size={16} /></button><button className={layout === "list" ? "active" : ""} onClick={() => setLayout("list")}><ListFilter size={16} /></button></div>
        </div>
        <div className="menu-category-tabs">{categories.map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}{item === "All items" && <span>{menuItems.length}</span>}</button>)}</div>
        <div className={`menu-products ${layout}`}>
          {filtered.map((item) => (
            <article className={`menu-product-card${!item.active ? " unavailable" : ""}`} key={item.id}>
              <button className={`menu-product-image ${item.tone}`} type="button" disabled={!canEdit} onClick={canEdit ? () => openEditor(item) : undefined} aria-label={canEdit ? `${isFr ? "Modifier" : "Edit"} ${isFr ? item.nameFr || item.name : item.name}` : `${isFr ? item.nameFr || item.name : item.name} ${isFr ? "image du produit" : "product image"}`}>{item.image ? <img src={item.image} alt={isFr ? item.altFr || item.alt : item.alt} loading="lazy" width="640" height="480" style={{ objectPosition: item.objectPosition }} /> : <span>{item.emoji}</span>}{item.featured && <Badge tone="dark"><Star size={10} fill="currentColor" /> {isFr ? "Vedette" : "Featured"}</Badge>}{item.stock <= 7 && <i>{item.stock === 0 ? (isFr ? "Épuisé" : "Out of stock") : `${item.stock} ${isFr ? "restants" : "left"}`}</i>}</button>
              <div className="menu-product-body"><div className="product-title-row"><div><span>{isFr ? item.categoryFr || operationsFr[item.category] || item.category : item.category}</span><h3>{isFr ? item.nameFr || item.name : item.name}</h3>{!isFr && item.nameFr && item.nameFr !== item.name && <small>{item.nameFr}</small>}</div>{canEdit && <IconButton label={`${isFr ? "Modifier" : "Edit"} ${isFr ? item.nameFr || item.name : item.name}`} onClick={() => openEditor(item)}><Edit3 size={16} /></IconButton>}</div><p>{isFr ? item.descriptionFr || item.description : item.description}</p><div className="product-tags">{(isFr ? item.tagsFr || item.tags : item.tags).map((tag) => <span key={tag}>{tag}</span>)}</div><div className="product-card-foot"><strong>{formatMenuPrice(item.price)}</strong><span>{item.stock} {isFr ? "en stock" : "in stock"}</span>{canToggleAvailability && <Toggle checked={item.active} onChange={() => onToggleMenuItem(item.id)} label={`${isFr ? "Changer la disponibilité de" : "Toggle"} ${isFr ? item.nameFr || item.name : item.name}${isFr ? "" : " availability"}`} />}</div></div>
            </article>
          ))}
        </div>
        {filtered.length === 0 && <div className="menu-empty"><Search size={24} /><strong>No menu items found</strong><span>Try another category or search.</span></div>}
      </Card>

      {selected && draft && (
        <aside className="detail-panel open menu-editor">
          <header><div><Badge tone="green">Menu editor</Badge><h2>{locale === "fr" ? draft.nameFr || draft.name : draft.name}</h2><p>Update product details in both guest languages.</p></div><IconButton label="Close menu editor" onClick={closeEditor}><X size={19} /></IconButton></header>
          <div className="detail-body">
            <div className={`editor-image ${draft.tone}`}>{draft.image ? <img src={draft.image} alt={draft.alt} style={{ objectPosition: draft.objectPosition }} /> : <span>{draft.emoji}</span>}<button onClick={() => setNotice("Image options opened.")}><ImagePlus size={16} />Replace image</button></div>
            <div className="form-stack"><label><span>Name (English)</span><input value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} /></label><label><span>Nom (français)</span><input value={draft.nameFr || ""} onChange={(event) => setDraft({ ...draft, nameFr: event.target.value })} /></label><label><span>Description (English)</span><textarea rows="3" value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} /></label><label><span>Description (français)</span><textarea rows="3" value={draft.descriptionFr || ""} onChange={(event) => setDraft({ ...draft, descriptionFr: event.target.value })} /></label><button className="ai-writing" onClick={() => setDraft({ ...draft, description: `${draft.description} Made to order and served fresh, with a balanced finish.`.trim(), descriptionFr: `${draft.descriptionFr || ""} Préparé à la commande et servi frais, avec une finale équilibrée.`.trim() })}><Sparkles size={17} /><span><strong>Polish product copy</strong><small>Refresh both customer-facing languages together</small></span><ChevronRight size={15} /></button><div className="form-grid"><label><span>Price (TND)</span><input type="number" step="0.001" value={draft.price} onChange={(event) => setDraft({ ...draft, price: Number(event.target.value) })} /></label><label><span>Stock today</span><input type="number" value={draft.stock} onChange={(event) => setDraft({ ...draft, stock: Number(event.target.value) })} /></label></div><label><span>Category</span><select value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value })}>{categories.slice(1).map((item) => <option key={item}>{item}</option>)}</select></label></div>
            <section><h3>Options & modifiers</h3><div className="modifier-row"><span><strong>Product-specific choices</strong><small>Flavor, breakfast selections, serving or access</small></span><button onClick={() => setNotice("Product choices opened.")}>Open options</button></div><div className="modifier-row"><span><strong>Extras and notes</strong><small>Only options that make sense for this item</small></span><button onClick={() => setNotice("Customer extras and notes opened.")}>Open options</button></div><button className="add-modifier" onClick={() => setNotice("Modifier group added.")}><Plus size={15} /> Add modifier group</button></section>
          </div>
          <footer><Button variant="danger" icon={Trash2} onClick={() => { setHiddenIds((current) => [...current, selected]); setNotice(`${draft.name} was removed from the menu.`); closeEditor(); }}>Remove item</Button><Button icon={Check} onClick={saveItem}>Save changes</Button></footer>
        </aside>
      )}
      {selected && <button className="drawer-scrim" onClick={closeEditor} aria-label="Close menu editor" />}
    </div>
    </StaffLocalized>
  );
}

const weekDays = [
  { day: "MON", date: 3, count: 4 }, { day: "TUE", date: 4, count: 5 }, { day: "WED", date: 5, count: 7 }, { day: "THU", date: 6, count: 6 }, { day: "FRI", date: 7, count: 9 }, { day: "SAT", date: 8, count: 12, current: true }, { day: "SUN", date: 9, count: 8 },
];

export function ReservationsView({ reservations, onUpdateReservation, onQuick, canExport = true }) {
  const [tab, setTab] = useState("all");
  const [selected, setSelected] = useState(null);
  const [selectedDay, setSelectedDay] = useState(8);
  const [weekOffset, setWeekOffset] = useState(0);
  const [calendarMode, setCalendarMode] = useState("Week");
  const [notice, setNotice] = useState("");
  const [reminderOpen, setReminderOpen] = useState(false);
  const [waitlistNotified, setWaitlistNotified] = useState(false);
  const filtered = tab === "all" ? reservations : reservations.filter((item) => item.status === tab);
  const pending = reservations.filter((item) => item.status === "pending").length;
  const weekLabel = weekOffset === 0 ? "August 3–9, 2026" : weekOffset < 0 ? "July 27–August 2, 2026" : "August 10–16, 2026";
  const periodLabel = calendarMode === "Month" ? (weekOffset === 0 ? "August 2026" : weekOffset < 0 ? "July 2026" : "September 2026") : weekLabel;
  const agendaDate = weekOffset === 0 && selectedDay === 8 ? "Today" : weekOffset === 0 && selectedDay === 9 ? "Tomorrow" : null;
  const agendaReservations = agendaDate ? reservations.filter((item) => item.date === agendaDate) : [];
  return (
    <StaffLocalized dictionary={operationsDictionary} patterns={operationsPatterns}>
    <div className="view reservations-view">
      <PageHeader eyebrow="Guest planning" title="Reservations" description="A calm, complete view of every booking, reminder, and waitlist guest."
        actions={<>{canExport && <Button variant="secondary" icon={Download} onClick={() => setNotice("Reservation export prepared for the selected week.")}>Export</Button>}<Button icon={Plus} onClick={() => onQuick("reservation")}>New reservation</Button></>}
      />
      {notice && <div className="admin-notice" role="status"><Check size={16} /><span>{notice}</span><button onClick={() => setNotice("")} aria-label="Dismiss message"><X size={15} /></button></div>}
      <section className="reservation-overview">
        <Card><span className="metric-icon purple"><CalendarCheck2 size={19} /></span><div><small>Today’s bookings</small><strong>12</strong><p>38 expected guests</p></div><MetricDelta>↑ 9%</MetricDelta></Card>
        <Card><span className="metric-icon orange"><TimerReset size={19} /></span><div><small>Pending requests</small><strong>{pending}</strong><p>Oldest waiting 8 min</p></div><Badge tone={pending ? "orange" : "green"}>{pending ? "Needs review" : "All clear"}</Badge></Card>
        <Card><span className="metric-icon green"><UsersRound size={19} /></span><div><small>Table fill rate</small><strong>78%</strong><p>For confirmed bookings</p></div><Progress value={78} /></Card>
        <Card><span className="metric-icon blue"><BellRing size={19} /></span><div><small>Reminders sent</small><strong>9</strong><p>100% delivered today</p></div><Badge tone="green">Automatic</Badge></Card>
      </section>
      <div className="reservations-layout">
        <Card className="calendar-card">
          <div className="calendar-head"><div><button disabled={weekOffset <= -1} onClick={() => setWeekOffset((current) => Math.max(-1, current - 1))} aria-label={`Previous ${calendarMode.toLowerCase()}`}><ChevronLeft size={18} /></button><div><strong>{periodLabel}</strong><span>{weekOffset === 0 ? "This week" : "Calendar"}</span></div><button disabled={weekOffset >= 1} onClick={() => setWeekOffset((current) => Math.min(1, current + 1))} aria-label={`Next ${calendarMode.toLowerCase()}`}><ChevronRight size={18} /></button></div><div><button className={calendarMode === "Week" ? "active" : ""} onClick={() => setCalendarMode("Week")}>Week</button><button className={calendarMode === "Month" ? "active" : ""} onClick={() => setCalendarMode("Month")}>Month</button></div></div>
          {calendarMode === "Week" ? <div className="week-strip">{weekDays.map((day) => <button key={day.day} className={selectedDay === day.date ? "current" : ""} onClick={() => setSelectedDay(day.date)}><span>{day.day}</span><strong>{day.date}</strong><small>{weekOffset === 0 ? `${day.count} bookings` : "No bookings"}</small></button>)}</div> : <div className="reservation-month-grid">{Array.from({ length: 31 }, (_, index) => index + 1).map((day) => <button key={day} className={selectedDay === day ? "current" : ""} onClick={() => setSelectedDay(day)}><span>{day}</span>{weekOffset === 0 && [8, 9].includes(day) && <i />}</button>)}</div>}
          {calendarMode === "Month" && <div className="calendar-mode-note"><CalendarDays size={16} /><span><strong>Month overview</strong> Select a date to inspect its agenda below.</span></div>}
          <div className="calendar-agenda">
            <div className="time-rail">{["09:00", "11:00", "13:00", "15:00", "17:00", "19:00", "21:00"].map((time) => <span key={time}>{time}</span>)}</div>
            <div className="agenda-track">
              {agendaDate === "Today" && <i className="now-line"><b>NOW</b></i>}
              {agendaReservations.map((item, index) => <button key={item.id} className={`agenda-booking ${item.status}`} style={{ top: `${6 + index * 20}%`, left: `${index % 2 ? 53 : 4}%`, width: "42%" }} onClick={() => setSelected(item)}><strong>{item.time} • {item.name}</strong><span>{item.guests} guests • {item.table}</span></button>)}
              {!agendaReservations.length && <div className="agenda-empty"><CalendarDays size={22} /><strong>No bookings on this date</strong><span>Select August 8 or 9 to inspect scheduled guests.</span></div>}
            </div>
          </div>
        </Card>
        <Card className="request-inbox">
          <SectionTitle title="Request inbox" subtitle={`${pending} need a response`} />
          <Segmented label="Reservation filters" value={tab} onChange={setTab} options={[{ value: "all", label: "All", count: reservations.length }, { value: "pending", label: "Pending", count: pending }, { value: "confirmed", label: "Confirmed" }]} />
          <div className="reservation-request-list">
            {filtered.map((item, index) => (
              <article key={item.id} onClick={() => setSelected(item)}>
                <Avatar initials={item.initials} tone={index} />
                <div className="request-copy"><div><strong>{item.name}</strong><Badge tone={item.status === "pending" ? "orange" : item.status === "confirmed" ? "green" : "purple"}>{item.status}</Badge></div><span>{item.date} • {item.time} • {item.guests} guests</span><small>{item.note}</small>
                  {item.status === "pending" && <div className="request-actions"><button onClick={(event) => { event.stopPropagation(); onUpdateReservation(item.id, "confirmed"); }}><Check size={14} />Accept</button><button onClick={(event) => { event.stopPropagation(); onUpdateReservation(item.id, "declined"); }}><X size={14} />Decline</button></div>}
                </div>
                <ChevronRight size={16} />
              </article>
            ))}
          </div>
        </Card>
      </div>
      <section className="reservation-bottom-grid">
        <Card className="reminder-card"><span className="reminder-visual"><BellRing size={25} /><i /></span><div><Badge tone="purple">AUTOMATION</Badge><h3>No-shows are down 31%</h3><p>WhatsApp and email reminders go out two hours before every confirmed booking.</p></div><button onClick={() => setReminderOpen(true)}>Configure <ChevronRight size={15} /></button></Card>
        <Card><SectionTitle title="Waitlist" subtitle="Estimated wait • 18 min" /><div className="waitlist-person"><Avatar initials="SK" tone={4} /><span><strong>Sarra Khelifi</strong><small>{waitlistNotified ? "Notification prepared just now" : "8 guests • joined 7 min ago"}</small></span><Button size="small" variant="secondary" icon={waitlistNotified ? Check : Send} onClick={() => { setWaitlistNotified(true); setNotice("Waitlist notification prepared for Sarra."); }}>{waitlistNotified ? "Notified" : "Notify"}</Button></div></Card>
      </section>

      {selected && <ReservationDetail reservation={selected} onClose={() => setSelected(null)} onUpdate={(status) => { onUpdateReservation(selected.id, status); setSelected(null); }} onNotice={setNotice} />}
      {reminderOpen && <ReminderSettings onClose={() => setReminderOpen(false)} onSave={() => { setReminderOpen(false); setNotice("Reminder timing updated."); }} />}
    </div>
    </StaffLocalized>
  );
}

function ReservationDetail({ reservation, onClose, onUpdate, onNotice }) {
  const [action, setAction] = useState(null);
  return (
    <StaffLocalized dictionary={operationsDictionary} patterns={operationsPatterns}>
    <><aside className="detail-panel open"><header><div><Badge tone={reservation.status === "pending" ? "orange" : "green"}>{reservation.status}</Badge><h2>{reservation.name}</h2><p>Reservation #{String(reservation.id).padStart(4, "0")}</p></div><IconButton label="Close reservation" onClick={onClose}><X size={19} /></IconButton></header><div className="detail-body">
      <div className="guest-profile"><Avatar initials={reservation.initials} size="lg" tone={3} /><div><strong>{reservation.name}</strong><span><Phone size={14} />{reservation.phone}</span><span><Mail size={14} />Guest messages enabled</span></div></div>
      <section><h3>Booking details</h3><div className="booking-facts"><div><CalendarDays size={17} /><span><small>Date</small><strong>{reservation.date}</strong></span></div><div><Clock3 size={17} /><span><small>Time</small><strong>{reservation.time}</strong></span></div><div><UsersRound size={17} /><span><small>Party</small><strong>{reservation.guests} guests</strong></span></div><div><Grid2X2 size={17} /><span><small>Table</small><strong>{reservation.table}</strong></span></div></div></section>
      <section><h3>Guest note</h3><div className="detail-note"><MessageCircle size={16} />{reservation.note || "No special request"}</div></section>
      <section><h3>Message timeline</h3><div className="message-status"><CheckCircle2 size={17} /><span><strong>Request received</strong><small>Owner notification delivered</small></span></div><div className="message-status"><BellRing size={17} /><span><strong>Reminder scheduled</strong><small>2 hours before arrival</small></span></div></section>
      {action === "message" && <section className="admin-inline-editor"><h3>Message guest</h3><textarea rows="4" defaultValue={`Hi ${reservation.name.split(" ")[0]}, your booking for ${reservation.guests} at ${reservation.time} is confirmed. We look forward to seeing you!`} /><p>Review the message before sending it through the connected channel.</p></section>}
      {action === "modify" && <section className="admin-inline-editor"><h3>Modify booking</h3><div className="form-grid"><label><span>Time</span><input type="time" defaultValue={reservation.time} /></label><label><span>Guests</span><input type="number" min="1" defaultValue={reservation.guests} /></label><label className="span-2"><span>Table</span><input defaultValue={reservation.table} /></label></div><p>Review the changes before saving this booking.</p></section>}
    </div><footer>{reservation.status === "pending" ? <><Button variant="danger" icon={X} onClick={() => onUpdate("declined")}>Decline</Button><Button icon={Check} onClick={() => onUpdate("confirmed")}>Accept booking</Button></> : action ? <><Button variant="secondary" onClick={() => setAction(null)}>Cancel</Button><Button icon={Check} onClick={() => { onNotice(action === "message" ? "Guest message prepared." : "Booking changes saved."); onClose(); }}>Save</Button></> : <><Button variant="secondary" icon={MessageCircle} onClick={() => setAction("message")}>Message</Button><Button icon={Edit3} onClick={() => setAction("modify")}>Modify booking</Button></>}</footer></aside><button className="drawer-scrim" onClick={onClose} aria-label="Close reservation" /></>
    </StaffLocalized>
  );
}

function ReminderSettings({ onClose, onSave }) {
  return (
    <StaffLocalized dictionary={operationsDictionary} patterns={operationsPatterns}>
    <><aside className="detail-panel open admin-detail-panel"><header><div><Badge tone="purple">Reservation settings</Badge><h2>Reservation reminders</h2><p>Choose when and how confirmed guests receive a reminder.</p></div><IconButton label="Close reminder settings" onClick={onClose}><X size={19} /></IconButton></header><div className="detail-body"><div className="admin-form-stack"><label><span>Send reminder</span><select defaultValue="2 hours before"><option>1 hour before</option><option>2 hours before</option><option>Morning of booking</option><option>1 day before</option></select></label><label><span>Primary channel</span><select defaultValue="WhatsApp, then email"><option>WhatsApp, then email</option><option>Email only</option><option>SMS</option></select></label><label><span>Message template</span><textarea rows="5" defaultValue="Your table at Green Coffee Games is reserved. Reply if your plans change so we can help another guest." /></label><p className="admin-helper">Sending requires a connected, consent-enabled messaging channel.</p></div></div><footer><Button variant="secondary" onClick={onClose}>Cancel</Button><Button icon={Check} onClick={onSave}>Save</Button></footer></aside><button className="drawer-scrim" onClick={onClose} aria-label="Close reminder settings" /></>
    </StaffLocalized>
  );
}

const floorStatusLabel = { available: "Available", occupied: "Occupied", ordering: "Ordering", reserved: "Reserved", cleaning: "Cleaning" };
const floorFilters = [
  { id: "all", label: "All tables" },
  { id: "standard", label: "Customer seating" },
  { id: "pc", label: "PC tables" },
];

function floorTableKind(table) {
  return table?.kind === "pc" ? "pc" : "standard";
}

function sessionMinutesRemaining(expiresAt, now) {
  if (!expiresAt) return null;
  const expiry = new Date(expiresAt).getTime();
  if (!Number.isFinite(expiry)) return null;
  return Math.max(0, Math.ceil((expiry - now) / 60_000));
}

export function FloorView({ tables, onUpdateTable, onQuick, canEditLayout = true, canGenerateQr = true }) {
  const { locale } = useStaffLanguage();
  const isFr = locale === "fr";
  const [selectedId, setSelectedId] = useState(() => tables[2]?.id || tables[0]?.id || null);
  const [zone, setZone] = useState("all");
  const [now, setNow] = useState(() => Date.now());
  const [zoom, setZoom] = useState(100);
  const [layoutEditing, setLayoutEditing] = useState(false);
  const [notice, setNotice] = useState("");
  const selected = tables.find((table) => table.id === selectedId) || tables[0] || null;
  const filtered = zone === "all" ? tables : tables.filter((table) => floorTableKind(table) === zone);
  const occupied = tables.filter((table) => ["occupied", "ordering"].includes(table.status)).length;
  const minutesRemaining = selected ? sessionMinutesRemaining(selected.sessionExpiresAt, now) : null;
  const sessionOpen = Boolean(selected?.sessionActive && selected?.sessionCode);
  const sessionExpired = sessionOpen && minutesRemaining === 0;
  const sessionValid = sessionOpen && !sessionExpired;

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  function changeZone(nextZone) {
    setZone(nextZone);
    const firstVisible = nextZone === "all" ? tables[0] : tables.find((table) => floorTableKind(table) === nextZone);
    if (firstVisible && floorTableKind(selected) !== nextZone && nextZone !== "all") setSelectedId(firstVisible.id);
  }

  function handleTableAction() {
    if (!selected) return;
    if (selected.status === "cleaning") {
      onUpdateTable(selected.id, "available");
      setNotice(`${selected.id} is ready for the next guests.`);
      return;
    }
    if (sessionOpen) {
      onUpdateTable(selected.id, "cleaning");
      setNotice(`${selected.id} session ended and its QR ordering access was revoked.`);
      return;
    }
    onQuick("order", { table: selected.id });
  }

  const actionLabel = selected?.status === "cleaning"
    ? (isFr ? "Marquer la table prête" : "Mark table ready")
    : sessionOpen
      ? (isFr ? "Terminer la session et libérer" : "End table session & clear")
      : ["occupied", "ordering"].includes(selected?.status)
        ? (isFr ? "Ajouter une commande serveur" : "Add waiter order")
        : (isFr ? "Installer les clients / ajouter une commande" : "Seat guests / add waiter order");
  const actionIcon = selected?.status === "cleaning" ? CheckCircle2 : sessionOpen ? LockKeyhole : UsersRound;
  return (
    <StaffLocalized dictionary={operationsDictionary} patterns={operationsPatterns}>
    <div className="view floor-view">
      <PageHeader eyebrow={isFr ? "Salle en direct" : "Live room"} title={isFr ? "Plan de salle" : "Floor plan"} description={isFr ? "Le plan réel du café : tables clients, tables PC, cuisine, comptoir et parc enfants." : "The real café layout—customer seating, PC tables, kitchen, service counter, and kids park."}
        actions={<>{canEditLayout && <Button variant="secondary" icon={Settings2} onClick={() => { setLayoutEditing((current) => !current); setNotice(layoutEditing ? "Layout mode closed." : "Layout editing mode enabled."); }}>{layoutEditing ? (isFr ? "Terminer le plan" : "Finish layout") : (isFr ? "Modifier le plan" : "Edit layout")}</Button>}{canGenerateQr && <Button icon={QrCode} onClick={() => onQuick("qr")}>{isFr ? "QR de table" : "Table QR"}</Button>}</>}
      />
      {notice && <div className="admin-notice" role="status"><Check size={16} /><span>{notice}</span><button onClick={() => setNotice("")} aria-label="Dismiss message"><X size={15} /></button></div>}
      <section className="floor-summary">
        <div><span><i className="available" />Available</span><strong>{tables.filter((item) => item.status === "available").length}</strong></div>
        <div><span><i className="occupied" />Occupied</span><strong>{occupied}</strong></div>
        <div><span><i className="reserved" />Reserved</span><strong>{tables.filter((item) => item.status === "reserved").length}</strong></div>
        <div><span><i className="cleaning" />Needs reset</span><strong>{tables.filter((item) => item.status === "cleaning").length}</strong></div>
        <div className="occupancy-total"><span>Current occupancy</span><strong>{tables.length ? Math.round((occupied / tables.length) * 100) : 0}%</strong><Progress value={tables.length ? (occupied / tables.length) * 100 : 0} /></div>
      </section>
      <div className="floor-workspace">
        <Card className="floor-canvas-card">
          <div className="floor-toolbar">
            <div className="zone-tabs" aria-label="Filter floor tables">{floorFilters.map((item) => <button key={item.id} className={zone === item.id ? "active" : ""} onClick={() => changeZone(item.id)}>{item.label}</button>)}</div>
            <div className="floor-zoom-controls"><button onClick={() => setZoom((value) => Math.max(80, value - 10))} aria-label="Zoom out"><Minus size={16} /></button><span>{zoom}%</span><button onClick={() => setZoom((value) => Math.min(120, value + 10))} aria-label="Zoom in"><Plus size={16} /></button></div>
          </div>
          <div className="floor-canvas-scroll">
            <div className="floor-canvas-zoom" style={{ width: `${zoom}%` }}>
              <section className={`floor-canvas${layoutEditing ? " layout-preview" : ""}`} aria-label="Interactive Green Coffee physical floor plan">
                <div className="floor-kitchen"><span>BACK OF HOUSE</span><strong>Kitchen</strong><small>Prep • wash • pass</small></div>
                <div className="kitchen-door" aria-label="Kitchen door"><span>Kitchen door</span><i /></div>
                <div className="service-counter"><Coffee size={22} /><span><strong>Serve / Service Counter</strong><small>Orders • pickup • handoff</small></span></div>
                <div className="customer-area-label"><strong>Customer seating area</strong><span>8 standard tables • scan QR at the table to order</span></div>
                <div className="kids-park-zone"><span>{isFr ? "PARC ENFANTS" : "KIDS PARK"}</span><strong>{isFr ? "Jouer en sécurité," : "Play safely,"}<br />{isFr ? "toujours en vue." : "right in view."}</strong><small>{isFr ? "Jeux doux • ateliers • espace familles" : "Soft play • workshops • family seating"}</small><div className="kids-play-shapes" aria-hidden="true"><i /><i /><i /></div></div>
                <div className="park-door" aria-label={isFr ? "Porte du parc enfants" : "Kids park door"}><span>{isFr ? "Porte du" : "Park"}<br />{isFr ? "parc" : "door"}</span><i /></div>
                <div className="main-entrance" aria-label="Main entrance"><span>Main entrance</span><i /></div>
                {filtered.map((table) => {
                  const kind = floorTableKind(table);
                  const detail = table.status === "reserved" ? table.reservedFor : table.sessionActive ? `${table.duration || "0m"} • session` : table.status === "cleaning" ? (isFr ? "Remise en place nécessaire" : "Reset needed") : `${table.seats} ${isFr ? "places" : "seats"}`;
                  return (
                    <button
                      key={table.id}
                      className={`floor-table ${kind === "pc" ? `pc-table ${table.orientation || "horizontal"}` : "standard-table"} ${table.status}${selected?.id === table.id ? " selected" : ""}`}
                      style={{ left: `${table.x}%`, top: `${table.y}%` }}
                      onClick={() => setSelectedId(table.id)}
                      aria-label={`${table.id}, ${kind === "pc" ? (isFr ? "longue table PC" : "long PC table") : (isFr ? "table standard" : "standard table")}, ${isFr ? operationsFr[floorStatusLabel[table.status]] || floorStatusLabel[table.status] : floorStatusLabel[table.status]}, ${detail}`}
                    >
                      <span className={`floor-table-status ${table.status}`} aria-hidden="true" />
                      {kind === "pc" ? <>
                        <span className="pc-monitor-bank" aria-hidden="true"><i /><i /><i /><i /></span>
                        <span className="floor-table-copy"><strong>{table.id}</strong><small>Long PC table</small></span>
                      </> : <>
                        <span className="standard-table-surface" aria-hidden="true" />
                        <span className="floor-table-copy"><strong>{table.id}</strong><small>{detail}</small></span>
                      </>}
                    </button>
                  );
                })}
              </section>
            </div>
          </div>
          <div className="floor-map-legend" aria-label="Floor plan legend">
            <div className="floor-legend-group"><strong>Table status</strong><span><i className="legend-status available" />Available</span><span><i className="legend-status occupied" />In use</span><span><i className="legend-status reserved" />Reserved</span><span><i className="legend-status cleaning" />Reset</span></div>
            <div className="floor-legend-group"><strong>{isFr ? "Plan" : "Map"}</strong><span><i className="legend-fixture standard" />{isFr ? "Table standard" : "Standard table"}</span><span><i className="legend-fixture pc" />{isFr ? "Longue table PC" : "Long PC table"}</span><span><i className="legend-fixture service" />{isFr ? "Comptoir de service" : "Service counter"}</span><span><i className="legend-fixture kitchen" />{isFr ? "Cuisine" : "Kitchen"}</span><span><i className="legend-fixture kids" />{isFr ? "Parc enfants" : "Kids park"}</span></div>
          </div>
        </Card>
        <Card className="table-inspector">
          {selected ? <>
            <div className="inspector-head"><span className={`big-table-status ${selected.status}`}><Grid2X2 size={22} /></span><div><Badge tone={selected.status === "available" ? "green" : selected.status === "reserved" ? "purple" : selected.status === "cleaning" ? "neutral" : "orange"} dot>{floorStatusLabel[selected.status]}</Badge><h2>{selected.id}</h2><p>{selected.zone} • {selected.seats} {floorTableKind(selected) === "pc" ? (isFr ? "places PC" : "PC seats") : (isFr ? "places" : "seats")}</p></div></div>
            <div className="table-session">
              {sessionOpen ? <><div><span>{isFr ? "Session de table ouverte par QR" : "QR-scanned table session"}</span><strong>{sessionExpired ? (isFr ? "Expirée — commandes bloquées" : "Expired — orders blocked") : `${isFr ? "Active" : "Active"} • ${selected.duration || (isFr ? "vient de commencer" : "just started")}`}</strong></div><div><span>{isFr ? "Accès à la session" : "Session access"}</span><strong>{selected.sessionCode} • {minutesRemaining === null ? (isFr ? "table vérifiée" : "table verified") : `${minutesRemaining} ${isFr ? "min restantes" : "min left"}`}</strong></div></> : selected.status === "reserved" ? <><div><span>Reserved for</span><strong>{selected.reservedFor || "Upcoming guest"}</strong></div><div><span>Ordering</span><strong>Guest scans this table’s QR after sitting down</strong></div></> : selected.status === "cleaning" ? <div className="empty-session"><LockKeyhole size={20} /><span><strong>Previous session ended</strong><small>Ordering access is revoked. Mark the table ready after cleaning.</small></span></div> : ["occupied", "ordering"].includes(selected.status) ? <div className="empty-session"><AlertTriangle size={20} /><span><strong>No guest QR session yet</strong><small>Take a waiter order here, or ask the guest to scan the QR fixed to this table.</small></span></div> : <div className="empty-session"><CheckCircle2 size={20} /><span><strong>Ready for guests</strong><small>Scanning this table’s QR starts a time-limited ordering session automatically.</small></span></div>}
            </div>
              <div className="table-qr-preview"><QrPattern size={88} /><div><Badge tone={sessionValid ? "blue" : sessionExpired ? "rose" : "neutral"}><LockKeyhole size={11} />{sessionValid ? (isFr ? "SESSION QR ACTIVE" : "QR SESSION ACTIVE") : sessionExpired ? (isFr ? "SESSION EXPIRÉE" : "SESSION EXPIRED") : (isFr ? "QR DE TABLE PRÊT" : "TABLE QR READY")}</Badge><strong>{sessionOpen ? `${selected.id} • ${selected.sessionCode}` : `${selected.id} ${isFr ? "QR permanent" : "permanent QR"}`}</strong><span>{sessionValid ? (isFr ? `Expire dans ${minutesRemaining ?? "—"} minutes. La session a démarré depuis le QR de cette table et ne peut pas être réutilisée ailleurs.` : `Expires in ${minutesRemaining ?? "—"} minutes. The session began from this table’s QR and cannot be reused for another table.`) : sessionExpired ? (isFr ? "Cette session ne peut plus envoyer de commandes. Terminez-la et libérez la table avant la prochaine visite." : "This session can no longer submit orders. End and clear the table before the next visit.") : (isFr ? "Le client assis ici scanne le QR physique pour commencer à commander. L’équipe peut toujours saisir une commande serveur." : "A guest seated here scans the physical QR to begin ordering. Staff can always add a waiter order instead.")}</span></div></div>
            {["occupied", "ordering"].includes(selected.status) && <div className="table-order-summary"><h3>Active order</h3><div><UtensilsCrossed size={17} /><span><strong>{selected.status === "ordering" ? "Order in progress" : "2 items served"}</strong><small>Last update 3 min ago</small></span><ChevronRight size={15} /></div></div>}
            <Button variant={sessionOpen ? "danger" : "primary"} icon={actionIcon} onClick={handleTableAction}>{actionLabel}</Button>
          </> : <div className="inspector-empty"><Grid2X2 size={30} /><strong>Select a table</strong><span>Details and actions will appear here.</span></div>}
        </Card>
      </div>
      <Card className="shift-handover"><span className="metric-icon orange"><AlertTriangle size={18} /></span><div><Badge tone="orange">SHIFT NOTE</Badge><strong>Projector remote is behind the bar for tonight’s match.</strong><small>Added by Malek • 10:42</small></div><button onClick={() => setNotice("Handover notes opened: projector remote, terrace heater check, and oat milk restock.")}>{isFr ? "Toutes les notes de relève" : "All handover notes"} <ChevronRight size={15} /></button></Card>
    </div>
    </StaffLocalized>
  );
}
