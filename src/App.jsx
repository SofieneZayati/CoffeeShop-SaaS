import { useCallback, useEffect, useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Sidebar, Topbar, MobileNav } from "./components/AppShell";
import { CustomerPreview, NotificationDrawer, QuickCreateModal, SearchPalette } from "./components/Overlays";
import LoginPage from "./components/LoginPage";
import ViewErrorBoundary from "./components/ViewErrorBoundary";
import CustomerPortal from "./views/CustomerPortal";
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
  const [accountId, setAccountId] = useState(readSession);
  const [guestMode, setGuestMode] = useState(() => window.location.hash.startsWith("#table"));
  const account = getAccount(accountId);

  useEffect(() => {
    if (account) window.sessionStorage.setItem(SESSION_KEY, JSON.stringify({ accountId: account.id }));
    else window.sessionStorage.removeItem(SESSION_KEY);
  }, [account]);

  useEffect(() => {
    if (!account) document.title = guestMode ? "Table ordering — Green Coffee Games" : "Sign in — Green Coffee OS";
    if (!account || account.role === "customer") document.documentElement.dataset.theme = "light";
  }, [account, guestMode]);

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

  if (!account && guestMode) return <CustomerPortal account={TABLE_GUEST} onLogout={signOut} onSwitchAccount={signOut} />;
  if (!account) return <LoginPage onLogin={handleLogin} onOpenTableOrdering={openTableOrdering} />;
  if (account.role === "customer") return <CustomerPortal account={account} onLogout={signOut} onSwitchAccount={signOut} />;
  return <Workspace key={account.id} account={account} onLogout={signOut} onSwitchAccount={signOut} />;
}

function Workspace({ account, onLogout, onSwitchAccount }) {
  const roleConfig = useMemo(() => getRoleConfig(account), [account]);
  const allowedViews = roleConfig.views;
  const allowedQuickActions = roleConfig.quickActions;
  const resolveView = useCallback((requested) => allowedViews.includes(requested) ? requested : roleConfig.defaultView, [allowedViews, roleConfig.defaultView]);
  const [activeView, setActiveView] = useState(() => resolveView(window.location.hash.replace("#", "")));
  const [theme, setTheme] = usePersistentState("green-os-theme", "light");
  const [orders, setOrders] = usePersistentState("green-os-orders", ordersSeed);
  const [menuItems, setMenuItems] = usePersistentState("green-os-menu-v3", menuItemsSeed);
  const [reservations, setReservations] = usePersistentState("green-os-reservations", reservationsSeed);
  const [tables, setTables] = usePersistentState("green-os-tables-v2", tablesSeed);
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
    document.title = `${viewTitles[activeView]} — Green Coffee OS`;
  }, [theme, activeView]);

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
        showToast(`${account.roleLabel} access opened on ${viewTitles[nextView]}`);
      }
    };
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("popstate", syncHash);
    syncHash();
    return () => {
      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("popstate", syncHash);
    };
  }, [account.roleLabel, resolveView, showToast]);

  function navigate(nextView) {
    if (!allowedViews.includes(nextView)) {
      showToast(`${account.roleLabel} accounts do not have access to that page`);
      return;
    }
    setActiveView(nextView);
    window.history.pushState(null, "", `#${nextView}`);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openQuick(type, defaults = {}) {
    if (!allowedQuickActions.includes(type)) {
      showToast(`That action is not available in the ${account.roleLabel.toLowerCase()} workspace`);
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
      showToast(`This order step belongs to another station`);
      return;
    }
    if (order.status === "ready") {
      setOrders((current) => current.map((item) => item.id === orderId ? { ...item, status: "served", time: "just now", completedAt: new Date().toISOString() } : item));
      showToast(`${order.id} served and moved to order history`);
      return;
    }
    const nextStatus = order.status === "new" ? "making" : "ready";
    setOrders((current) => current.map((item) => item.id === orderId ? { ...item, status: nextStatus, time: "just now" } : item));
    showToast(nextStatus === "making" ? `${order.id} accepted and sent to the barista` : `${order.id} is ready to serve`);
  }

  function toggleMenuItem(itemId) {
    if (!(canManage || isBarista)) return showToast("Menu availability is not available for this account");
    setMenuItems((current) => current.map((item) => item.id === itemId ? { ...item, active: !item.active } : item));
    showToast("Menu availability updated");
  }

  function updateReservation(reservationId, status) {
    if (!canManage) return showToast("Reservation changes require manager access");
    setReservations((current) => current.map((item) => item.id === reservationId ? { ...item, status } : item));
    showToast(status === "confirmed" ? "Reservation confirmed and guest notified" : "Reservation declined and guest notified");
  }

  function updateTable(tableId, status) {
    if (!canManage) return showToast("Table controls require manager access");
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
      ? `${tableId} cleared • its previous QR session is now blocked`
      : `${tableId} marked ${status} • guests can start ordering by scanning its QR`);
  }

  function toggleAutomation(ruleId) {
    if (!canManage) return showToast("Automation controls require manager access");
    setAutomations((current) => current.map((item) => item.id === ruleId ? { ...item, active: !item.active } : item));
    showToast("Automation updated");
  }

  function handleQuickSubmit(type, form) {
    if (!allowedQuickActions.includes(type)) {
      setQuickType(null);
      return showToast("This quick action is not permitted for the current account");
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
      showToast(`${newOrder.id} added for ${form.table} and sent for acceptance`);
      navigate("orders");
    } else if (type === "menu") {
      const customerCategory = ({ Signature: "Coffee", Coffee: "Coffee", "Hot coffee": "Coffee", "Cold coffee": "Cold drinks", "Slow coffee": "Coffee", Refreshers: "Cold drinks", Kitchen: "Sandwiches", Sandwiches: "Sandwiches", Snacks: "Snacks", "Crêpes": "Crepes", Desserts: "Desserts", Bakery: "Pastries" })[form.category] || form.category;
      const item = { id: Date.now(), name: form.name || "New coffee", category: form.category, customerCategory, price: Number(form.price) || 0, sales: 0, stock: 20, active: true, featured: false, emoji: "☕", tone: "sage", description: "A new Green Coffee creation, ready for its final description.", ingredients: "Ingredients pending final café review", tags: ["New"] };
      setMenuItems((current) => [item, ...current]);
      showToast(`${item.name} added to the menu`);
      navigate("menu");
    } else if (type === "reservation") {
      const initials = (form.name || "New Guest").split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
      setReservations((current) => [{ id: Date.now(), name: form.name || "New guest", initials, time: form.time || "12:00", date: form.date || "Today", guests: Number(form.guests) || 2, table: "—", status: "pending", note: "Added manually", phone: form.phone || "+216 —" }, ...current]);
      showToast("Reservation added to the inbox");
      navigate("reservations");
    } else if (type === "campaign") {
      showToast(`${form.channel} campaign saved as a draft`);
      navigate("marketing");
    } else if (type === "qr") {
      showToast(`${form.table} QR prepared • scanning it starts an on-site table session`);
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
      <a className="skip-link" href="#workspace-main" onClick={(event) => { event.preventDefault(); document.getElementById("workspace-main")?.focus(); }}>Skip to workspace</a>
      <Sidebar active={activeView} onNavigate={navigate} open={sidebarOpen} onClose={() => setSidebarOpen(false)} allowedViews={allowedViews} account={account} onLogout={onLogout} onSwitchAccount={onSwitchAccount} />
      <div className="workspace">
        <Topbar onOpenNav={() => setSidebarOpen(true)} onSearch={() => setSearchOpen(true)} onNotifications={() => setNotificationsOpen(true)} onPreview={() => setPreviewOpen(true)} theme={theme} onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")} unread={unreadNotifications} account={account} canPreview={canManage} />
        <main className="workspace-content" id="workspace-main" tabIndex="-1" key={activeView}><ViewErrorBoundary resetKey={activeView}>{content}</ViewErrorBoundary></main>
      </div>
      <MobileNav active={activeView} onNavigate={navigate} allowedViews={allowedViews} onOpenMore={() => setSidebarOpen(true)} />

      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} onNavigate={navigate} onQuick={openQuick} allowedViews={allowedViews} allowedQuickActions={allowedQuickActions} />
      <NotificationDrawer open={notificationsOpen} onClose={() => setNotificationsOpen(false)} onNavigate={navigate} unread={unreadNotifications} onMarkRead={() => { setUnreadNotifications(0); showToast("All notifications marked as read"); }} allowedViews={allowedViews} />
      {canManage && <CustomerPreview open={previewOpen} onClose={() => setPreviewOpen(false)} menuItems={menuItems} />}
      {quickType && <QuickCreateModal type={quickType} initialValues={quickDefaults} menuItems={menuItems} onClose={() => { setQuickType(null); setQuickDefaults({}); }} onSubmit={handleQuickSubmit} />}
      <div className={`toast${toast ? " show" : ""}`} role="status" aria-live="polite"><CheckCircle2 size={17} />{toast}</div>
    </div>
  );
}
