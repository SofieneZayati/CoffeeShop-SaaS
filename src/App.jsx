import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Sidebar, Topbar, MobileNav } from "./components/AppShell";
import { CustomerPreview, NotificationDrawer, QuickCreateModal, SearchPalette } from "./components/Overlays";
import LoginPage from "./components/LoginPage";
import ViewErrorBoundary from "./components/ViewErrorBoundary";
import { usePersistentState } from "./hooks";
import { authenticate, getAccount, getRoleConfig } from "./data/auth";
import {
  automationRules,
  menuItemsSeed,
  ordersSeed,
  reservationsSeed,
  tablesSeed,
} from "./data/demoData";
import Overview from "./views/Overview";
import { FloorView, MenuView, OrdersView, ReservationsView } from "./views/Operations";
import { CustomersView, InsightsView, MarketingView } from "./views/Growth";
import { AutomationView, ExperiencesView, SettingsView } from "./views/Tools";
import { StaffLanguageProvider, useStaffLanguage } from "./context/StaffLanguageContext";

const CustomerPortal = lazy(() => import("./views/CustomerPortal"));

const SESSION_KEY = "green-os-demo-session-v1";
const TABLE_GUEST = {
  id: "table-guest",
  name: "Table Guest",
  firstName: "Guest",
  initials: "TG",
  role: "customer",
  roleLabel: "Table guest",
  points: 0,
  tier: "Guest",
};

const viewTitles = {
  overview: "Overview",
  orders: "Live orders",
  menu: "Menu & QR",
  reservations: "Reservations",
  floor: "Floor plan",
  customers: "Customers & loyalty",
  marketing: "Campaigns & feedback",
  insights: "Insights",
  automation: "AI & automation",
  experiences: "Games & events",
  settings: "Platform setup",
};

function readSession() {
  try {
    const stored = JSON.parse(window.sessionStorage.getItem(SESSION_KEY));
    return typeof stored?.accountId === "string" ? stored.accountId : null;
  } catch {
    return null;
  }
}

export default function App() {
  return <StaffLanguageProvider><AppContent /></StaffLanguageProvider>;
}

function AppContent() {
  const { t } = useStaffLanguage();
  const [accountId, setAccountId] = useState(readSession);
  const [guestMode, setGuestMode] = useState(() => window.location.hash.startsWith("#table"));
  const account = getAccount(accountId);

  useEffect(() => {
    if (account) window.sessionStorage.setItem(SESSION_KEY, JSON.stringify({ accountId: account.id }));
    else window.sessionStorage.removeItem(SESSION_KEY);
  }, [account]);

  useEffect(() => {
    if (!account) document.title = guestMode
      ? t("document.tableOrdering", { en: "Table ordering — Green Coffee Games", fr: "Commande à table — Green Coffee Games" })
      : t("document.signIn", { en: "Sign in — Green Coffee OS", fr: "Connexion — Green Coffee OS" });
    if (!account || account.role === "customer") document.documentElement.dataset.theme = "light";
  }, [account, guestMode, t]);

  function handleLogin(email, password) {
    const authenticated = authenticate(email, password);
    if (!authenticated) return false;
    setAccountId(authenticated.id);
    setGuestMode(false);
    const roleConfig = getRoleConfig(authenticated);
    const requestedView = window.location.hash.replace("#", "");
    const landingView = roleConfig.views.includes(requestedView) ? requestedView : roleConfig.defaultView;
    window.history.replaceState(null, "", authenticated.role === "customer" ? "#customer" : `#${landingView}`);
    return true;
  }

  function signOut() {
    setAccountId(null);
    setGuestMode(false);
    window.history.replaceState(null, "", "#login");
  }

  function openTableOrdering() {
    setGuestMode(true);
    window.history.replaceState(null, "", "#table");
  }

  if (!account && guestMode) return <CustomerExperience account={TABLE_GUEST} onLogout={signOut} onSwitchAccount={signOut} />;
  if (!account) return <LoginPage onLogin={handleLogin} onOpenTableOrdering={openTableOrdering} />;
  if (account.role === "customer") return <CustomerExperience account={account} onLogout={signOut} onSwitchAccount={signOut} />;
  return <Workspace key={account.id} account={account} onLogout={signOut} onSwitchAccount={signOut} />;
}

function CustomerExperience(props) {
  const { t } = useStaffLanguage();
  return <Suspense fallback={<div className="route-loading" role="status"><span>☕</span><strong>Green Coffee</strong><small>{t("loading.guestMenu", { en: "Opening the guest menu…", fr: "Ouverture de la carte…" })}</small></div>}><CustomerPortal {...props} /></Suspense>;
}

function Workspace({ account, onLogout, onSwitchAccount }) {
  const { locale, t } = useStaffLanguage();
  const roleConfig = useMemo(() => getRoleConfig(account), [account]);
  const allowedViews = roleConfig.views;
  const allowedQuickActions = roleConfig.quickActions;
  const resolveView = useCallback((requested) => allowedViews.includes(requested) ? requested : roleConfig.defaultView, [allowedViews, roleConfig.defaultView]);
  const [activeView, setActiveView] = useState(() => resolveView(window.location.hash.replace("#", "")));
  const [theme, setTheme] = usePersistentState("green-os-theme", "light");
  const [orders, setOrders] = usePersistentState("green-os-orders-v2", ordersSeed);
  const [menuItems, setMenuItems] = usePersistentState("green-os-menu-v4", menuItemsSeed);
  const [reservations, setReservations] = usePersistentState("green-os-reservations", reservationsSeed);
  const [tables, setTables] = usePersistentState("green-os-tables-v3", tablesSeed);
  const [automations, setAutomations] = usePersistentState("green-os-automations", automationRules);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(account.role === "barista" ? 2 : 3);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [quickType, setQuickType] = useState(null);
  const [quickDefaults, setQuickDefaults] = useState({});
  const [toast, setToast] = useState("");

  const isOwner = account.role === "owner";
  const isManager = account.role === "manager";
  const isBarista = account.role === "barista";
  const canManage = isOwner || isManager;

  const showToast = useCallback((message) => {
    setToast(message);
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => setToast(""), 2600);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.lang = locale;
    document.title = `${t(`view.${activeView}`, viewTitles[activeView])} — Green Coffee OS`;
  }, [theme, activeView, locale, t]);

  useEffect(() => {
    const listener = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, []);

  useEffect(() => {
    const syncHash = () => {
      const requested = window.location.hash.replace("#", "");
      const nextView = resolveView(requested);
      setActiveView(nextView);
      if (nextView !== requested) {
        window.history.replaceState(null, "", `#${nextView}`);
        showToast(t("access.opened", {
          en: "{{role}} access opened on {{view}}",
          fr: "Accès {{role}} ouvert sur {{view}}",
        }, { role: t(`role.${account.role}`, account.roleLabel), view: t(`view.${nextView}`, viewTitles[nextView]) }));
      }
    };
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("popstate", syncHash);
    syncHash();
    return () => {
      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("popstate", syncHash);
    };
  }, [account.role, account.roleLabel, resolveView, showToast, t]);

  function navigate(nextView) {
    if (!allowedViews.includes(nextView)) {
      showToast(t("access.denied", {
        en: "{{role}} accounts do not have access to that page",
        fr: "Les comptes {{role}} n’ont pas accès à cette page",
      }, { role: t(`role.${account.role}`, account.roleLabel) }));
      return;
    }
    setActiveView(nextView);
    window.history.pushState(null, "", `#${nextView}`);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openQuick(type, defaults = {}) {
    if (!allowedQuickActions.includes(type)) {
      showToast(t("access.actionDenied", {
        en: "That action is not available in the {{role}} workspace",
        fr: "Cette action n’est pas disponible dans l’espace {{role}}",
      }, { role: t(`role.${account.role}`, account.roleLabel).toLowerCase() }));
      return;
    }
    setQuickDefaults(defaults);
    setQuickType(type);
  }

  function canAdvanceOrder(order) {
    if (canManage) return true;
    if (isBarista) return order.status === "new" || order.status === "making";
    return false;
  }

  function advanceOrder(orderId) {
    const order = orders.find((item) => item.id === orderId);
    if (!order || !canAdvanceOrder(order)) {
      showToast(t("toast.otherStation", { en: "This order step belongs to another station", fr: "Cette étape de commande appartient à un autre poste" }));
      return;
    }
    if (order.status === "ready") {
      setOrders((current) => current.map((item) => item.id === orderId ? { ...item, status: "served", time: "just now", completedAt: new Date().toISOString() } : item));
      showToast(t("toast.orderServed", { en: "{{id}} served and moved to order history", fr: "{{id}} servie et déplacée dans l’historique" }, { id: order.id }));
      return;
    }
    const nextStatus = order.status === "new" ? "making" : "ready";
    setOrders((current) => current.map((item) => item.id === orderId ? { ...item, status: nextStatus, time: "just now" } : item));
    showToast(nextStatus === "making"
      ? t("toast.orderAccepted", { en: "{{id}} accepted and sent to the barista", fr: "{{id}} acceptée et envoyée au barista" }, { id: order.id })
      : t("toast.orderReady", { en: "{{id}} is ready to serve", fr: "{{id}} est prête à servir" }, { id: order.id }));
  }

  function toggleMenuItem(itemId) {
    if (!(canManage || isBarista)) return showToast(t("toast.menuUnavailable", { en: "Menu availability is not available for this account", fr: "La disponibilité de la carte n’est pas accessible à ce compte" }));
    setMenuItems((current) => current.map((item) => item.id === itemId ? { ...item, active: !item.active } : item));
    showToast(t("toast.menuUpdated", { en: "Menu availability updated", fr: "Disponibilité de la carte mise à jour" }));
  }

  function updateReservation(reservationId, status) {
    if (!canManage) return showToast(t("toast.reservationAccess", { en: "Reservation changes require manager access", fr: "La modification des réservations nécessite un accès responsable" }));
    setReservations((current) => current.map((item) => item.id === reservationId ? { ...item, status } : item));
    showToast(status === "confirmed"
      ? t("toast.reservationConfirmed", { en: "Reservation confirmed and guest notified", fr: "Réservation confirmée et client informé" })
      : t("toast.reservationDeclined", { en: "Reservation declined and guest notified", fr: "Réservation refusée et client informé" }));
  }

  function updateTable(tableId, status) {
    if (!canManage) return showToast(t("toast.tableAccess", { en: "Table controls require manager access", fr: "Les commandes de table nécessitent un accès responsable" }));
    const closingTable = status === "available" || status === "cleaning";
    setTables((current) => current.map((item) => item.id === tableId ? {
      ...item,
      status,
      duration: status === "occupied" ? (item.duration || "0m") : "",
      spend: closingTable ? 0 : item.spend,
      sessionActive: closingTable ? false : item.sessionActive,
      sessionCode: closingTable ? null : item.sessionCode,
      sessionExpiresAt: closingTable ? null : item.sessionExpiresAt,
    } : item));
    showToast(closingTable
      ? t("toast.tableCleared", { en: "{{table}} cleared • its previous QR session is now blocked", fr: "{{table}} libérée • sa session QR précédente est désormais bloquée" }, { table: tableId })
      : t("toast.tableStatus", { en: "{{table}} marked {{status}} • guests can start ordering by scanning its QR", fr: "{{table}} marquée {{status}} • les clients peuvent commander en scannant son QR" }, { table: tableId, status }));
  }

  function toggleAutomation(ruleId) {
    if (!canManage) return showToast(t("toast.automationAccess", { en: "Automation controls require manager access", fr: "Les automatisations nécessitent un accès responsable" }));
    setAutomations((current) => current.map((item) => item.id === ruleId ? { ...item, active: !item.active } : item));
    showToast(t("toast.automationUpdated", { en: "Automation updated", fr: "Automatisation mise à jour" }));
  }

  function handleQuickSubmit(type, form) {
    if (!allowedQuickActions.includes(type)) {
      setQuickType(null);
      return showToast(t("toast.quickDenied", { en: "This quick action is not permitted for the current account", fr: "Cette action rapide n’est pas autorisée pour ce compte" }));
    }
    if (type === "order") {
      const product = menuItems.find((item) => item.name === form.item) || menuItems[0];
      const quantity = Math.max(1, Number(form.quantity) || 1);
      const orderTotal = Number(product?.price || 0) * quantity;
      const nextNumber = Math.max(1048, ...orders.map((item) => Number(item.id.replace("GC-", "")) || 0)) + 1;
      const newOrder = { id: `GC-${nextNumber}`, table: form.table, guest: form.table.replace("T", "Table "), source: "Waiter", time: "just now", total: orderTotal, status: "new", payment: form.payment || "Pay at cashier", items: [`${quantity}× ${product?.name || "House coffee"}`], note: form.note || "" };
      setOrders((current) => [newOrder, ...current]);
      setTables((current) => current.map((table) => table.id === form.table ? {
        ...table,
        status: "occupied",
        duration: table.duration || "just seated",
        spend: Number(table.spend || 0) + orderTotal,
      } : table));
      showToast(t("toast.orderAdded", { en: "{{id}} added for {{table}} and sent for acceptance", fr: "{{id}} ajoutée pour {{table}} et envoyée pour acceptation" }, { id: newOrder.id, table: form.table }));
      navigate("orders");
    } else if (type === "menu") {
      const customerCategory = form.category;
      const name = form.name?.trim() || form.nameFr?.trim() || "New menu item";
      const nameFr = form.nameFr?.trim() || name;
      const description = form.description?.trim() || form.descriptionFr?.trim() || "A new Green Coffee item, ready for its final details.";
      const descriptionFr = form.descriptionFr?.trim() || form.description?.trim() || "Un nouvel article Green Coffee, prêt pour ses détails définitifs.";
      const item = { id: Date.now(), name, nameFr, category: form.category, customerCategory, price: Number(form.price) || 0, sales: 0, stock: 20, active: true, featured: false, emoji: form.category === "Kids Park" ? "⭐" : "☕", tone: "sage", description, descriptionFr, ingredients: "Ingredients pending final café review", ingredientsFr: "Ingrédients à confirmer par le café", tags: ["New"], tagsFr: ["Nouveau"] };
      setMenuItems((current) => [item, ...current]);
      showToast(t("toast.menuAdded", { en: "{{name}} added to the menu", fr: "{{name}} ajouté à la carte" }, { name: locale === "fr" ? item.nameFr : item.name }));
      navigate("menu");
    } else if (type === "reservation") {
      const initials = (form.name || "New Guest").split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
      setReservations((current) => [{ id: Date.now(), name: form.name || "New guest", initials, time: form.time || "12:00", date: form.date || "Today", guests: Number(form.guests) || 2, table: "—", status: "pending", note: "Added manually", phone: form.phone || "+216 —" }, ...current]);
      showToast(t("toast.reservationAdded", { en: "Reservation added to the inbox", fr: "Réservation ajoutée à la boîte de réception" }));
      navigate("reservations");
    } else if (type === "campaign") {
      showToast(t("toast.campaignSaved", { en: "{{channel}} campaign saved as a draft", fr: "Campagne {{channel}} enregistrée comme brouillon" }, { channel: form.channel }));
      navigate("marketing");
    } else if (type === "qr") {
      showToast(t("toast.qrPrepared", { en: "{{table}} QR prepared • scanning it starts an on-site table session", fr: "QR de {{table}} prêt • le scan démarre une session sur place" }, { table: form.table }));
      navigate("floor");
    }
    setQuickType(null);
    setQuickDefaults({});
  }

  let content;
  switch (activeView) {
    case "orders": content = <OrdersView orders={orders} onAdvanceOrder={advanceOrder} onQuick={openQuick} account={account} canCreateOrder={canManage} canAdvanceOrder={canAdvanceOrder} canViewFinancials={canManage} initialDisplay={isBarista ? "kds" : "board"} />; break;
    case "menu": content = <MenuView menuItems={menuItems} onToggleMenuItem={toggleMenuItem} onQuick={openQuick} onPreview={() => setPreviewOpen(true)} canEdit={canManage} canAdd={canManage} canPreview={canManage} canToggleAvailability={canManage || isBarista} />; break;
    case "reservations": content = <ReservationsView reservations={reservations} onUpdateReservation={updateReservation} onQuick={openQuick} canExport={canManage} />; break;
    case "floor": content = <FloorView tables={tables} onUpdateTable={updateTable} onQuick={openQuick} canEditLayout={canManage} canGenerateQr={canManage} />; break;
    case "customers": content = <CustomersView onQuick={openQuick} />; break;
    case "marketing": content = <MarketingView onQuick={openQuick} />; break;
    case "insights": content = <InsightsView showToast={showToast} />; break;
    case "automation": content = <AutomationView automations={automations} onToggleAutomation={toggleAutomation} showToast={showToast} />; break;
    case "experiences": content = <ExperiencesView onQuick={openQuick} />; break;
    case "settings": content = <SettingsView theme={theme} onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")} onPreview={() => setPreviewOpen(true)} showToast={showToast} />; break;
    default: content = <Overview orders={orders} tables={tables} reservations={reservations} onAdvanceOrder={advanceOrder} onNavigate={navigate} onQuick={openQuick} showToast={showToast} account={account} />;
  }

  return (
    <div className={`app-shell role-${account.role}`}>
      <a className="skip-link" href="#workspace-main" onClick={(event) => { event.preventDefault(); document.getElementById("workspace-main")?.focus(); }}>{t("a11y.skipWorkspace", { en: "Skip to workspace", fr: "Aller à l’espace de travail" })}</a>
      <Sidebar active={activeView} onNavigate={navigate} open={sidebarOpen} onClose={() => setSidebarOpen(false)} allowedViews={allowedViews} account={account} onLogout={onLogout} onSwitchAccount={onSwitchAccount} />
      <div className="workspace">
        <Topbar onOpenNav={() => setSidebarOpen(true)} onSearch={() => setSearchOpen(true)} onNotifications={() => setNotificationsOpen(true)} onPreview={() => setPreviewOpen(true)} theme={theme} onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")} unread={unreadNotifications} account={account} canPreview={canManage} />
        <main className="workspace-content" id="workspace-main" tabIndex="-1" key={activeView}><ViewErrorBoundary resetKey={activeView}>{content}</ViewErrorBoundary></main>
      </div>
      <MobileNav active={activeView} onNavigate={navigate} allowedViews={allowedViews} onOpenMore={() => setSidebarOpen(true)} />

      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} onNavigate={navigate} onQuick={openQuick} allowedViews={allowedViews} allowedQuickActions={allowedQuickActions} />
      <NotificationDrawer open={notificationsOpen} onClose={() => setNotificationsOpen(false)} onNavigate={navigate} unread={unreadNotifications} onMarkRead={() => { setUnreadNotifications(0); showToast(t("toast.notificationsRead", { en: "All notifications marked as read", fr: "Toutes les notifications sont marquées comme lues" })); }} allowedViews={allowedViews} />
      {canManage && <CustomerPreview open={previewOpen} onClose={() => setPreviewOpen(false)} menuItems={menuItems} />}
      {quickType && <QuickCreateModal type={quickType} initialValues={quickDefaults} menuItems={menuItems} onClose={() => { setQuickType(null); setQuickDefaults({}); }} onSubmit={handleQuickSubmit} />}
      <div className={`toast${toast ? " show" : ""}`} role="status" aria-live="polite"><CheckCircle2 size={17} />{toast}</div>
    </div>
  );
}
