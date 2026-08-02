import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  CalendarDays,
  Check,
  ChevronRight,
  Coffee,
  Gift,
  Globe2,
  MapPin,
  Megaphone,
  MessageCircle,
  Minus,
  Plus,
  QrCode,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  UsersRound,
  X,
  Zap,
} from "lucide-react";
import { navigation } from "./AppShell";
import { Badge, BrandMark, Button, IconButton } from "./ui";
import { useStaffLanguage } from "../context/StaffLanguageContext";
import "../styles/overlay-interactions.css";

const MAPS_URL = "https://maps.app.goo.gl/43Fah1d5SSyX5r2W6";

function useEscape(onClose) {
  useEffect(() => {
    const listener = (event) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, [onClose]);
}

export function Modal({ open, onClose, title, description, children, className = "" }) {
  const { t } = useStaffLanguage();
  useEscape(onClose);
  if (!open) return null;
  return (
    <div className="modal-layer" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className={`modal-card ${className}`.trim()} role="dialog" aria-modal="true" aria-label={title}>
        <header className="modal-head">
          <div><h2>{title}</h2>{description && <p>{description}</p>}</div>
          <IconButton label={t("common.close", { en: "Close", fr: "Fermer" })} onClick={onClose}><X size={19} /></IconButton>
        </header>
        {children}
      </section>
    </div>
  );
}

export function SearchPalette({ open, onClose, onNavigate, onQuick, allowedViews, allowedQuickActions }) {
  const { t } = useStaffLanguage();
  const [query, setQuery] = useState("");
  const quickItems = [
    { id: "quick-order", actionId: "order", label: t("search.addOrder", { en: "Add a counter order", fr: "Ajouter une commande comptoir" }), subtitle: t("view.orders", "Live orders"), icon: ShoppingBag, action: () => onQuick("order") },
    { id: "quick-menu", actionId: "menu", label: t("search.addMenu", { en: "Add a menu item", fr: "Ajouter un article" }), subtitle: t("view.menu", "Menu & QR"), icon: Plus, action: () => onQuick("menu") },
    { id: "quick-res", actionId: "reservation", label: t("search.addReservation", { en: "Create a reservation", fr: "Créer une réservation" }), subtitle: t("view.reservations", "Reservations"), icon: CalendarDays, action: () => onQuick("reservation") },
    { id: "quick-campaign", actionId: "campaign", label: t("search.addCampaign", { en: "Launch a campaign", fr: "Lancer une campagne" }), subtitle: t("view.marketing", "Campaigns"), icon: Megaphone, action: () => onQuick("campaign") },
    { id: "quick-qr", actionId: "qr", label: t("search.addQr", { en: "Generate a table QR", fr: "Générer un QR de table" }), subtitle: t("view.floor", "Floor plan"), icon: QrCode, action: () => onQuick("qr") },
  ].filter((item) => allowedQuickActions.includes(item.actionId));
  const allowed = new Set(allowedViews);
  const pages = navigation.flatMap((group) => group.items).filter((item) => allowed.has(item.id)).map((item) => ({ ...item, label: t(item.labelKey, item.label), subtitle: t("search.goToPage", { en: "Go to page", fr: "Ouvrir la page" }), action: () => onNavigate(item.id) }));
  const matches = [...quickItems, ...pages].filter((item) => `${item.label} ${item.subtitle}`.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => { if (!open) setQuery(""); }, [open]);
  useEscape(onClose);
  if (!open) return null;

  return (
    <div className="modal-layer palette-layer" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="command-palette" role="dialog" aria-label={t("search.workspace", { en: "Search the workspace", fr: "Rechercher dans l’espace" })}>
        <div className="palette-input"><Search size={20} /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("search.placeholder", { en: "Search pages and actions…", fr: "Rechercher des pages et des actions…" })} /><kbd>ESC</kbd></div>
        <div className="palette-results">
          <span className="palette-label">{query ? t("search.results", { en: "{{count}} results", fr: "{{count}} résultats" }, { count: matches.length }) : t("search.suggested", { en: "Suggested", fr: "Suggestions" })}</span>
          {matches.map(({ id, label, subtitle, icon: Icon, action }) => (
            <button key={id} onClick={() => { action(); onClose(); }}>
              <span className="palette-icon"><Icon size={18} /></span>
              <span><strong>{label}</strong><small>{subtitle}</small></span>
              <ChevronRight size={16} />
            </button>
          ))}
          {matches.length === 0 && <div className="palette-empty"><Search size={24} /><strong>{t("search.noMatches", { en: "No matches", fr: "Aucun résultat" })}</strong><span>{t("search.tryAgain", { en: "Try a customer, feature, or page name.", fr: "Essayez un client, une fonction ou un nom de page." })}</span></div>}
        </div>
        <footer><span><kbd>↑</kbd><kbd>↓</kbd> {t("search.toNavigate", { en: "to navigate", fr: "pour naviguer" })}</span><span><kbd>↵</kbd> {t("search.toSelect", { en: "to select", fr: "pour sélectionner" })}</span></footer>
      </section>
    </div>
  );
}

const notifications = [
  { destination: "orders", icon: ShoppingBag, tone: "blue", title: "New QR order • Table 08", titleFr: "Nouvelle commande QR • Table 08", copy: "3 items • 22 DT • Paid online", copyFr: "3 articles • 22 DT • Payée en ligne", time: "2 min" },
  { destination: "reservations", icon: CalendarDays, tone: "violet", title: "Reservation needs approval", titleFr: "Réservation à approuver", copy: "Mehdi Ben Salem • 2 guests at 13:00", copyFr: "Mehdi Ben Salem • 2 personnes à 13h00", time: "8 min" },
  { destination: "menu", icon: Coffee, tone: "orange", title: "Tiramisu is running low", titleFr: "Le tiramisu est bientôt épuisé", copy: "7 portions left • below your par level of 10", copyFr: "7 portions restantes • seuil prévu : 10", time: "21 min" },
  { destination: "marketing", icon: Star, tone: "green", title: "A new 5-star review", titleFr: "Un nouvel avis 5 étoiles", copy: "“The iced coffee was perfect…”", copyFr: "« Le café glacé était parfait… »", time: "1 h" },
];

export function NotificationDrawer({ open, onClose, onNavigate, unread = 3, onMarkRead, allowedViews }) {
  const { locale, t } = useStaffLanguage();
  const [tab, setTab] = useState("inbox");
  const allowed = new Set(allowedViews);
  const visibleNotifications = notifications.filter((item) => allowed.has(item.destination));
  const visibleUnread = Math.min(unread, visibleNotifications.length);
  useEscape(onClose);
  return (
    <>
      <aside className={`notification-drawer${open ? " open" : ""}`} aria-hidden={!open}>
        <header><div><h2>{t("notifications.title", { en: "Notifications", fr: "Notifications" })}</h2><p>{t("notifications.subtitle", { en: "Everything that needs your attention.", fr: "Tout ce qui requiert votre attention." })}</p></div><IconButton label={t("notifications.close", { en: "Close notifications", fr: "Fermer les notifications" })} onClick={onClose}><X size={19} /></IconButton></header>
        <div className="notification-tabs"><button className={tab === "inbox" ? "active" : ""} onClick={() => setTab("inbox")}>{t("notifications.inbox", { en: "Inbox", fr: "Boîte de réception" })} {visibleUnread > 0 && <b>{visibleUnread}</b>}</button><button className={tab === "activity" ? "active" : ""} onClick={() => setTab("activity")}>{t("notifications.activity", { en: "Activity", fr: "Activité" })}</button></div>
        <div className="notification-list">
          {tab === "inbox" && visibleNotifications.map(({ destination, icon: Icon, tone, title, titleFr, copy, copyFr, time }, index) => (
            <button key={title} className={index < visibleUnread ? "unread" : ""} onClick={() => { onNavigate(destination); onClose(); }}>
              <span className={`notification-icon ${tone}`}><Icon size={18} /></span>
              <span><strong>{locale === "fr" ? titleFr || title : title}</strong><small>{locale === "fr" ? copyFr || copy : copy}</small><time>{locale === "fr" ? `il y a ${time}` : `${time} ago`}</time></span>
            </button>
          ))}
          {tab === "inbox" && visibleNotifications.length === 0 && <div className="palette-empty"><Bell size={24} /><strong>{t("notifications.none", { en: "No notifications for this role", fr: "Aucune notification pour ce rôle" })}</strong><span>{t("notifications.clear", { en: "Your focused inbox is clear.", fr: "Votre boîte de réception est à jour." })}</span></div>}
          {tab === "activity" && <div className="notification-activity"><article><span className="notification-icon green"><Check size={17} /></span><span><strong>{t("activity.orderAccepted", { en: "Table 08 order accepted", fr: "Commande de la table 08 acceptée" })}</strong><small>{t("activity.managerReview", { en: "Manager review • 4 minutes ago", fr: "Validation responsable • il y a 4 minutes" })}</small></span></article><article><span className="notification-icon violet"><UsersRound size={17} /></span><span><strong>{t("activity.reservationUpdated", { en: "Reservation updated", fr: "Réservation mise à jour" })}</strong><small>{t("activity.reservationTime", { en: "Yasmine Trabelsi • 18 minutes ago", fr: "Yasmine Trabelsi • il y a 18 minutes" })}</small></span></article><article><span className="notification-icon orange"><Coffee size={17} /></span><span><strong>{t("activity.menuChanged", { en: "Menu availability changed", fr: "Disponibilité de la carte modifiée" })}</strong><small>{t("activity.menuTime", { en: "Tiramisu • 36 minutes ago", fr: "Tiramisu • il y a 36 minutes" })}</small></span></article></div>}
        </div>
        <footer>{tab === "inbox" ? <Button variant="secondary" onClick={onMarkRead}>{unread ? t("notifications.markRead", { en: "Mark all as read", fr: "Tout marquer comme lu" }) : t("notifications.inboxClear", { en: "Inbox is clear", fr: "Boîte de réception à jour" })}</Button> : <span className="activity-caption">{t("activity.caption", { en: "Activity updates as actions are completed.", fr: "L’activité se met à jour à mesure que les actions sont terminées." })}</span>}</footer>
      </aside>
      {open && <button className="drawer-scrim" onClick={onClose} aria-label={t("notifications.close", { en: "Close notifications", fr: "Fermer les notifications" })} />}
    </>
  );
}

export function QuickCreateModal({ type, onClose, onSubmit, initialValues = {}, menuItems = [] }) {
  const { locale, t } = useStaffLanguage();
  const availableItems = menuItems.filter((item) => item.active);
  const [form, setForm] = useState({ name: "", nameFr: "", description: "", descriptionFr: "", price: "", category: "Coffee", date: "", time: "", guests: "2", phone: "", audience: "Loyal regulars", channel: "WhatsApp", table: "T01", item: availableItems[0]?.name || "Espresso", quantity: "1", payment: "Pay at cashier", note: "", ...initialValues });
  const update = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));
  const config = {
    order: { title: t("quick.order.title", { en: "New counter order", fr: "Nouvelle commande comptoir" }), description: t("quick.order.description", { en: "Add a staff-entered ticket directly to the live order board.", fr: "Ajoutez directement une commande saisie par l’équipe au tableau en direct." }), icon: ShoppingBag, submit: t("quick.order.submit", { en: "Send to order board", fr: "Envoyer au tableau" }) },
    menu: { title: t("quick.menu.title", { en: "Add a menu item", fr: "Ajouter un article" }), description: t("quick.menu.description", { en: "Create an operational item for the bilingual café catalogue.", fr: "Créez un article pour la carte bilingue du café." }), icon: Coffee, submit: t("quick.menu.submit", { en: "Add to menu", fr: "Ajouter à la carte" }) },
    reservation: { title: t("quick.reservation.title", { en: "New reservation", fr: "Nouvelle réservation" }), description: t("quick.reservation.description", { en: "Add a phone or walk-in booking to today’s calendar.", fr: "Ajoutez une réservation téléphonique ou sur place au calendrier du jour." }), icon: CalendarDays, submit: t("quick.reservation.submit", { en: "Create reservation", fr: "Créer la réservation" }) },
    campaign: { title: t("quick.campaign.title", { en: "Create a campaign", fr: "Créer une campagne" }), description: t("quick.campaign.description", { en: "Reach the right guests with a timely message.", fr: "Contactez les bons clients avec un message au bon moment." }), icon: Megaphone, submit: t("quick.campaign.submit", { en: "Save campaign", fr: "Enregistrer la campagne" }) },
    qr: { title: t("quick.qr.title", { en: "Generate table QR", fr: "Générer le QR d’une table" }), description: t("quick.qr.description", { en: "Create a unique table marker. Scanning it starts a short-lived ordering session.", fr: "Créez un repère unique pour la table. Son scan démarre une session de commande temporaire." }), icon: QrCode, submit: t("quick.qr.submit", { en: "Prepare table QR", fr: "Préparer le QR de table" }) },
  }[type];
  if (!config) return null;
  const Icon = config.icon;
  const submit = (event) => { event.preventDefault(); onSubmit(type, form); };

  return (
    <Modal open onClose={onClose} title={config.title} description={config.description} className="quick-modal">
      <form onSubmit={submit}>
        <div className="form-hero"><Icon size={22} /><span>{t("quick.hero", { en: "Quick create", fr: "Création rapide" })}</span></div>
        {type === "order" && (
          <div className="form-grid">
            <label><span>{t("common.table", { en: "Table", fr: "Table" })}</span><select value={form.table} onChange={update("table")}>{Array.from({ length: 11 }, (_, i) => <option key={i}>T{String(i + 1).padStart(2, "0")}</option>)}</select></label>
            <label><span>{t("common.item", { en: "Item", fr: "Article" })}</span><select value={form.item} onChange={update("item")}>{availableItems.map((item) => <option key={item.id} value={item.name}>{locale === "fr" ? item.nameFr || item.name : item.name}</option>)}</select></label>
            <label><span>{t("common.quantity", { en: "Quantity", fr: "Quantité" })}</span><input type="number" min="1" max="20" value={form.quantity} onChange={update("quantity")} /></label>
            <label><span>{t("common.payment", { en: "Payment", fr: "Paiement" })}</span><select value={form.payment} onChange={update("payment")}><option value="Pay at cashier">{t("payment.cashier", { en: "Pay at cashier", fr: "Payer à la caisse" })}</option><option value="Paid • Cash">{t("payment.cash", { en: "Paid • Cash", fr: "Payé • Espèces" })}</option><option value="Paid • Card">{t("payment.card", { en: "Paid • Card", fr: "Payé • Carte" })}</option></select></label>
            <label className="span-2"><span>{t("order.customization", { en: "Customization / note", fr: "Personnalisation / note" })}</span><input value={form.note} onChange={update("note")} placeholder={t("order.notePlaceholder", { en: "No sugar, oat milk, sauce on the side…", fr: "Sans sucre, lait d’avoine, sauce à part…" })} /></label>
          </div>
        )}
        {type === "menu" && (
          <div className="form-grid">
            <label><span>{t("menu.nameEn", { en: "Name (English)", fr: "Nom (anglais)" })}</span><input required autoFocus placeholder={t("menu.nameEnPlaceholder", { en: "e.g. Hazelnut cold brew", fr: "ex. Cold brew noisette" })} value={form.name} onChange={update("name")} /></label>
            <label><span>{t("menu.nameFr", { en: "Name (French)", fr: "Nom (français)" })}</span><input placeholder={t("menu.nameFrPlaceholder", { en: "e.g. Cold brew noisette", fr: "ex. Cold brew noisette" })} value={form.nameFr} onChange={update("nameFr")} /></label>
            <label><span>{t("menu.descriptionEn", { en: "Description (English)", fr: "Description (anglais)" })}</span><textarea rows="3" placeholder={t("menu.descriptionPlaceholder", { en: "What the customer should expect", fr: "Ce que le client doit savoir" })} value={form.description} onChange={update("description")} /></label>
            <label><span>{t("menu.descriptionFr", { en: "Description (French)", fr: "Description (français)" })}</span><textarea rows="3" placeholder={t("menu.descriptionFrPlaceholder", { en: "What the customer should know in French", fr: "Ce que le client doit savoir" })} value={form.descriptionFr} onChange={update("descriptionFr")} /></label>
            <label><span>{t("common.category", { en: "Category", fr: "Catégorie" })}</span><select value={form.category} onChange={update("category")}><option value="Coffee">{t("category.coffee", { en: "Coffee", fr: "Cafés" })}</option><option value="Tea & infusions">{t("category.tea", { en: "Tea & infusions", fr: "Thés et infusions" })}</option><option value="Cold drinks">{t("category.cold", { en: "Cold drinks", fr: "Boissons froides" })}</option><option value="Pastries">{t("category.pastries", { en: "Pastries", fr: "Viennoiseries" })}</option><option value="Desserts">{t("category.desserts", { en: "Desserts", fr: "Pâtisserie" })}</option><option value="Crepes & waffles">{t("category.crepes", { en: "Crepes & waffles", fr: "Crêpes et gaufres" })}</option><option value="Savory snacks">{t("category.savory", { en: "Savory snacks", fr: "Snacks salés" })}</option><option value="Breakfast">{t("category.breakfast", { en: "Breakfast", fr: "Petit déjeuner" })}</option><option value="Kids Park">{t("category.park", { en: "Kids Park", fr: "Parc enfants" })}</option></select></label>
            <label><span>{t("common.price", { en: "Price (DT)", fr: "Prix (DT)" })}</span><input required type="number" min="0" step="0.1" placeholder="5" value={form.price} onChange={update("price")} /></label>
            <p className="form-note span-2">{t("menu.languageNote", { en: "Leave a French field empty to reuse its English copy. You can refine either language later.", fr: "Laissez un champ français vide pour reprendre le texte anglais. Vous pourrez affiner les deux langues plus tard." })}</p>
          </div>
        )}
        {type === "reservation" && (
          <div className="form-grid">
            <label className="span-2"><span>{t("reservation.guestName", { en: "Guest name", fr: "Nom du client" })}</span><input required autoFocus placeholder={t("reservation.fullName", { en: "Full name", fr: "Nom complet" })} value={form.name} onChange={update("name")} /></label>
            <label><span>{t("common.date", { en: "Date", fr: "Date" })}</span><input required type="date" value={form.date} onChange={update("date")} /></label>
            <label><span>{t("common.time", { en: "Time", fr: "Heure" })}</span><input required type="time" value={form.time} onChange={update("time")} /></label>
            <label><span>{t("common.guests", { en: "Guests", fr: "Personnes" })}</span><input type="number" min="1" max="20" value={form.guests} onChange={update("guests")} /></label>
            <label><span>{t("common.phone", { en: "Phone", fr: "Téléphone" })}</span><input placeholder="+216" value={form.phone} onChange={update("phone")} /></label>
          </div>
        )}
        {type === "campaign" && (
          <div className="form-grid">
            <label className="span-2"><span>{t("campaign.name", { en: "Campaign name", fr: "Nom de la campagne" })}</span><input required autoFocus placeholder={t("campaign.namePlaceholder", { en: "e.g. Weekend happy hour", fr: "ex. Offre du week-end" })} value={form.name} onChange={update("name")} /></label>
            <label><span>{t("common.audience", { en: "Audience", fr: "Audience" })}</span><select value={form.audience} onChange={update("audience")}><option value="Loyal regulars">{t("audience.loyal", { en: "Loyal regulars", fr: "Habitués fidèles" })}</option><option value="Inactive 30d">{t("audience.inactive", { en: "Inactive 30d", fr: "Inactifs depuis 30 j" })}</option><option value="Football fans">{t("audience.football", { en: "Football fans", fr: "Fans de football" })}</option><option value="All opted-in guests">{t("audience.all", { en: "All opted-in guests", fr: "Tous les clients inscrits" })}</option></select></label>
            <label><span>{t("common.channel", { en: "Channel", fr: "Canal" })}</span><select value={form.channel} onChange={update("channel")}><option>WhatsApp</option><option>Email</option><option>Push</option></select></label>
            <label className="span-2"><span>{t("common.message", { en: "Message", fr: "Message" })}</span><textarea placeholder={t("campaign.messagePlaceholder", { en: "Write something your guests will love…", fr: "Écrivez un message que vos clients apprécieront…" })} rows="4" /></label>
          </div>
        )}
        {type === "qr" && (
          <div className="qr-create-layout">
            <div className="qr-demo"><QrPattern /><span>{t("qr.permanent", { en: "Permanent table marker", fr: "Repère permanent de la table" })}</span></div>
            <div className="form-stack">
              <label><span>{t("common.table", { en: "Table", fr: "Table" })}</span><select value={form.table} onChange={update("table")}>{Array.from({ length: 11 }, (_, i) => <option key={i}>T{String(i + 1).padStart(2, "0")}</option>)}</select></label>
              <label><span>{t("qr.session", { en: "Ordering session", fr: "Session de commande" })}</span><input value={t("qr.sessionValue", { en: "45-minute visit • starts on scan", fr: "Visite de 45 minutes • démarre au scan" })} readOnly /></label>
              <div className="form-note"><Zap size={16} /> {t("qr.sessionNote", { en: "Customer orders wait for staff acceptance; the device session is validated and expires automatically.", fr: "Les commandes clients attendent l’acceptation de l’équipe ; la session de l’appareil est validée puis expire automatiquement." })}</div>
            </div>
          </div>
        )}
        <footer className="modal-actions"><Button type="button" variant="ghost" onClick={onClose}>{t("common.cancel", { en: "Cancel", fr: "Annuler" })}</Button><Button type="submit" icon={Check}>{config.submit}</Button></footer>
      </form>
    </Modal>
  );
}

export function QrPattern({ size = 132 }) {
  const { t } = useStaffLanguage();
  const cells = [
    [0,0],[1,0],[2,0],[3,0],[4,0],[6,0],[8,0],[9,0],[10,0],[11,0],[12,0],
    [0,1],[4,1],[6,1],[8,1],[12,1],[0,2],[2,2],[4,2],[5,2],[6,2],[8,2],[10,2],[12,2],
    [0,3],[2,3],[4,3],[7,3],[8,3],[10,3],[12,3],[0,4],[1,4],[2,4],[3,4],[4,4],[6,4],[8,4],[9,4],[10,4],[11,4],[12,4],
    [6,5],[7,5],[1,6],[2,6],[4,6],[5,6],[6,6],[8,6],[10,6],[11,6],[12,6],[0,7],[3,7],[7,7],[9,7],[11,7],
    [0,8],[1,8],[2,8],[3,8],[4,8],[6,8],[7,8],[8,8],[10,8],[12,8],[0,9],[4,9],[6,9],[9,9],[12,9],
    [0,10],[2,10],[4,10],[5,10],[7,10],[8,10],[10,10],[11,10],[12,10],[0,11],[2,11],[4,11],[6,11],[8,11],[11,11],
    [0,12],[1,12],[2,12],[3,12],[4,12],[6,12],[7,12],[9,12],[10,12],[12,12],
  ];
  return (
    <svg className="qr-pattern" width={size} height={size} viewBox="0 0 13 13" aria-label={t("qr.code", { en: "Table QR code", fr: "Code QR de la table" })}>
      <rect width="13" height="13" rx="1" fill="#fff" />
      {cells.map(([x, y]) => <rect key={`${x}-${y}`} x={x + .08} y={y + .08} width=".84" height=".84" rx=".08" fill="currentColor" />)}
    </svg>
  );
}

export function CustomerPreview({ open, onClose, menuItems }) {
  const [category, setCategory] = useState("Featured");
  const [locale, setLocale] = useState("en");
  const [cart, setCart] = useState({});
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const categories = ["Featured", "Coffee", "Tea & infusions", "Cold drinks", "Pastries", "Desserts", "Crepes & waffles", "Savory snacks", "Breakfast", "Kids Park"];
  const labelsFr = { Featured: "À la une", Coffee: "Cafés", "Tea & infusions": "Thé", "Cold drinks": "Boissons froides", Pastries: "Viennoiserie", Desserts: "Pâtisserie", "Crepes & waffles": "Crêpes & gaufres", "Savory snacks": "Snacks salés", Breakfast: "Petit déjeuner", "Kids Park": "Parc enfants" };
  const visibleItems = useMemo(() => menuItems.filter((item) => {
    if (!item.active) return false;
    if (category === "Featured") return item.featured;
    return item.customerCategory === category;
  }).slice(0, 5), [category, menuItems]);
  const cartCount = Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  const total = menuItems.reduce((sum, item) => sum + (cart[item.id] || 0) * item.price, 0);
  const adjust = (id, delta) => setCart((current) => ({ ...current, [id]: Math.max(0, (current[id] || 0) + delta) }));
  const money = (value) => `${Number(value || 0).toLocaleString(locale === "fr" ? "fr-TN" : "en-TN", { maximumFractionDigits: 3 })} DT`;
  const categoryLabel = (value) => locale === "fr" ? labelsFr[value] || value : value;
  useEscape(onClose);
  return (
    <>
      <aside className={`customer-preview${open ? " open" : ""}`} aria-hidden={!open}>
        <header className="preview-shell-head"><div><span>{locale === "fr" ? "Vue client" : "Customer view"}</span><small>{locale === "fr" ? "Table 08 • session client" : "Table 08 • customer session"}</small></div><IconButton label={locale === "fr" ? "Fermer la vue client" : "Close customer view"} onClick={onClose}><X size={19} /></IconButton></header>
        <div className="phone-frame">
          <div className="phone-island" />
          <div className="customer-screen">
            <section className="customer-hero">
              <div className="customer-nav"><BrandMark compact /><span className="preview-language-switch"><Globe2 size={15} /><button className={locale === "en" ? "active" : ""} onClick={() => setLocale("en")}>EN</button><button className={locale === "fr" ? "active" : ""} onClick={() => setLocale("fr")}>FR</button></span></div>
              <Badge tone="light" dot>{locale === "fr" ? "Ouvert jusqu’à 23h00" : "Open until 23:00"}</Badge>
              <h2>{locale === "fr" ? "Votre vraie" : "Your real"}<br /><em>{locale === "fr" ? "carte." : "menu."}</em></h2>
              <p>{locale === "fr" ? "53 articles, deux langues et une commande liée à votre table." : "53 items, two languages, and ordering tied to your table."}</p>
              <div className="customer-meta"><span><a href={MAPS_URL} target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}><MapPin size={13} /> Mégrine</a></span><span>★ 4.9 (286)</span></div>
            </section>
            <section className="loyalty-strip"><span className="loyalty-icon"><Gift size={18} /></span><span><strong>{locale === "fr" ? "Bon retour, Mariem" : "Welcome back, Mariem"}</strong><small>{locale === "fr" ? "Encore 80 pts avant un café offert" : "80 pts to your next free coffee"}</small></span><b>1,280 pts</b></section>
            <nav className="customer-categories">{categories.map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{categoryLabel(item)}</button>)}</nav>
            <section className="customer-menu-list">
              <div className="customer-menu-title"><div><span>{locale === "fr" ? "Choisi pour vous" : "Handpicked for you"}</span><h3>{categoryLabel(category)}</h3></div><Sparkles size={18} /></div>
              {visibleItems.map((item) => { const name = locale === "fr" ? item.nameFr || item.name : item.name; const description = locale === "fr" ? item.descriptionFr || item.description : item.description; return (
                <article className="customer-product" key={item.id}>
                  <div className={`customer-product-image ${item.tone}`}>{item.image ? <img src={item.image} alt={item.alt} loading="lazy" style={{ objectPosition: item.objectPosition }} /> : <span>{item.emoji}</span>}{item.featured && <i>{locale === "fr" ? "Populaire" : "Popular"}</i>}</div>
                  <div className="customer-product-copy"><h4>{name}</h4><p>{description}</p><strong>{money(item.price)}</strong></div>
                  {(cart[item.id] || 0) === 0 ? (
                    <button className="product-add" onClick={() => adjust(item.id, 1)} aria-label={`${locale === "fr" ? "Ajouter" : "Add"} ${name}`}><Plus size={17} /></button>
                  ) : (
                    <div className="quantity-stepper"><button onClick={() => adjust(item.id, -1)}><Minus size={13} /></button><b>{cart[item.id]}</b><button onClick={() => adjust(item.id, 1)}><Plus size={13} /></button></div>
                  )}
                </article>
              ); })}
              {!visibleItems.length && <div className="palette-empty"><Coffee size={22} /><strong>{locale === "fr" ? "Aucun article dans cette catégorie" : "No products in this category"}</strong><span>{locale === "fr" ? "Choisissez une autre section." : "Choose another menu section."}</span></div>}
            </section>
            {assistantOpen && <section className="preview-assistant"><header><strong>{locale === "fr" ? "Assistant Green" : "Green helper"}</strong><button onClick={() => setAssistantOpen(false)} aria-label={locale === "fr" ? "Fermer l’assistant" : "Close café assistant"}><X size={14} /></button></header><p>{locale === "fr" ? "Bonjour Mariem ! Je peux vous aider avec les allergènes, les cafés ou les jeux." : "Hi Mariem! I can help with allergens, coffee choices, or finding a game for your table."}</p><div><button onClick={() => setCategory("Coffee")}>{locale === "fr" ? "Choisir un café" : "Recommend coffee"}</button><button onClick={() => setCategory("Desserts")}>{locale === "fr" ? "Voir la pâtisserie" : "See desserts"}</button></div></section>}
            <button className="chat-bubble" aria-label={locale === "fr" ? "Ouvrir l’assistant du café" : "Open café assistant"} aria-expanded={assistantOpen} onClick={() => setAssistantOpen((value) => !value)}><MessageCircle size={20} /><i /></button>
            {cartCount > 0 && <button className="customer-cart" onClick={() => setCartOpen(true)}><span><b>{cartCount}</b> {locale === "fr" ? "Voir ma commande" : "View my order"}</span><strong>{money(total)}</strong></button>}
            {cartOpen && <section className="preview-cart-sheet"><header><span><strong>{locale === "fr" ? "Votre commande à table" : "Your table order"}</strong><small>{cartCount} {locale === "fr" ? "article(s)" : `item${cartCount === 1 ? "" : "s"}`}</small></span><button onClick={() => setCartOpen(false)} aria-label={locale === "fr" ? "Fermer la commande" : "Close order"}><X size={15} /></button></header><div><span>{locale === "fr" ? "Total estimé" : "Estimated total"}</span><strong>{money(total)}</strong></div><button onClick={() => setCartOpen(false)}>{locale === "fr" ? "Continuer" : "Continue browsing"}</button><button onClick={() => { setCart({}); setCartOpen(false); }}>{locale === "fr" ? "Vider la commande" : "Clear order"}</button></section>}
          </div>
        </div>
      </aside>
      {open && <button className="drawer-scrim" aria-label={locale === "fr" ? "Fermer la vue client" : "Close customer view"} onClick={onClose} />}
    </>
  );
}
