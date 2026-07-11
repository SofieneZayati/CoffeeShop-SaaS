import { useCallback, useEffect, useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Sidebar, Topbar, MobileNav } from "./components/AppShell";
import { CustomerPreview, NotificationDrawer, QuickCreateModal, SearchPalette } from "./components/Overlays";
import LoginPage from "./components/LoginPage";
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
  const account = getAccount(accountId);

  useEffect(() => {
    if (account) window.sessionStorage.setItem(SESSION_KEY, JSON.stringify({ accountId: account.id }));
    else window.sessionStorage.removeItem(SESSION_KEY);
  }, [account]);

  useEffect(() => {
    if (!account) document.title = "Sign in — Green Coffee OS";
    if (!account || account.role === "customer") document.documentElement.dataset.theme = "light";
  }, [account]);

  function handleLogin(email, password) {
    const authenticated = authenticate(email, password);
    if (!authenticated) return false;
    setAccountId(authenticated.id);
    const defaultView = getRoleConfig(authenticated).defaultView;
    window.history.replaceState(null, "", authenticated.role === "customer" ? "#customer" : `#${defaultView}`);
    return true;
  }

  function signOut() {
    setAccountId(null);
    window.history.replaceState(null, "", "#login");
  }

  if (!account) return <LoginPage onLogin={handleLogin} />;
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
  const [menuItems, setMenuItems] = usePersistentState("green-os-menu-v2", menuItemsSeed);
  const [reservations, setReservations] = usePersistentState("green-os-reservations", reservationsSeed);
  const [tables, setTables] = usePersistentState("green-os-tables", tablesSeed);
  const [automations, setAutomations] = usePersistentState("green-os-automations", automationRules);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(account.role === "barista" ? 2 : account.role === "floor" ? 2 : 3);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [quickType, setQuickType] = useState(null);
  const [toast, setToast] = useState("");

  const isOwner = account.role === "owner";
  const isManager = account.role === "manager";
  const isBarista = account.role === "barista";
  const isFloor = account.role === "floor";
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

  function openQuick(type) {
    if (!allowedQuickActions.includes(type)) {
      showToast(`That action is not available in the ${account.roleLabel.toLowerCase()} workspace`);
      return;
    }
    setQuickType(type);
  }

  function canAdvanceOrder(order) {
    if (canManage) return true;
    if (isBarista) return order.status === "new" || order.status === "making";
    if (isFloor) return order.status === "ready";
    return false;
  }

  function advanceOrder(orderId) {
    const order = orders.find((item) => item.id === orderId);
    if (!order || !canAdvanceOrder(order)) {
      showToast(`This order step belongs to another station`);
      return;
    }
    if (order.status === "ready") {
      setOrders((current) => current.filter((item) => item.id !== orderId));
      showToast(`${order.id} served and completed`);
      return;
    }
    const nextStatus = order.status === "new" ? "making" : "ready";
    setOrders((current) => current.map((item) => item.id === orderId ? { ...item, status: nextStatus, time: "just now" } : item));
    showToast(nextStatus === "making" ? `${order.id} sent to the barista` : `${order.id} is ready to serve`);
  }

  function toggleMenuItem(itemId) {
    if (!(canManage || isBarista)) return showToast("Menu availability is not available for this account");
    setMenuItems((current) => current.map((item) => item.id === itemId ? { ...item, active: !item.active } : item));
    showToast("Menu availability updated");
  }

  function updateReservation(reservationId, status) {
    if (!(canManage || isFloor)) return showToast("Reservation changes are not available for this account");
    setReservations((current) => current.map((item) => item.id === reservationId ? { ...item, status } : item));
    showToast(status === "confirmed" ? "Reservation confirmed and guest notified" : "Reservation declined and guest notified");
  }

  function updateTable(tableId, status) {
    if (!(canManage || isFloor)) return showToast("Table controls are not available for this account");
    setTables((current) => current.map((item) => item.id === tableId ? { ...item, status, duration: status === "occupied" ? "0m" : item.duration, spend: status === "occupied" ? 0 : item.spend } : item));
    showToast(status === "available" ? `${tableId} is ready for guests` : `${tableId} session started`);
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
      const nextNumber = Math.max(1048, ...orders.map((item) => Number(item.id.replace("GC-", "")) || 0)) + 1;
      const newOrder = { id: `GC-${nextNumber}`, table: form.table, guest: form.table.replace("T", "Table "), source: "Waiter", time: "just now", total: product?.price || 0, status: "new", payment: form.payment || "Pay at cashier", items: [`1× ${product?.name || "House coffee"}`], note: form.note || "" };
      setOrders((current) => [newOrder, ...current]);
      showToast(`${newOrder.id} added to the live board`);
      navigate("orders");
    } else if (type === "menu") {
      const item = { id: Date.now(), name: form.name || "New coffee", category: form.category, price: Number(form.price) || 0, sales: 0, stock: 20, active: true, featured: false, emoji: "☕", tone: "sage", description: "A new Green Coffee creation, ready for its final description.", tags: ["New"] };
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
      showToast(`Secure QR generated for ${form.table}`);
      navigate("floor");
    }
    setQuickType(null);
  }

  let content;
  switch (activeView) {
    case "orders": content = <OrdersView orders={orders} onAdvanceOrder={advanceOrder} onQuick={openQuick} account={account} canCreateOrder={canManage || isFloor} canAdvanceOrder={canAdvanceOrder} canViewFinancials={canManage} initialDisplay={isBarista ? "kds" : "board"} />; break;
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
      <a className="skip-link" href="#workspace-main">Skip to workspace</a>
      <Sidebar active={activeView} onNavigate={navigate} open={sidebarOpen} onClose={() => setSidebarOpen(false)} allowedViews={allowedViews} account={account} onLogout={onLogout} onSwitchAccount={onSwitchAccount} />
      <div className="workspace">
        <Topbar onOpenNav={() => setSidebarOpen(true)} onSearch={() => setSearchOpen(true)} onNotifications={() => setNotificationsOpen(true)} onPreview={() => setPreviewOpen(true)} theme={theme} onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")} unread={unreadNotifications} account={account} canPreview={canManage} />
        <main className="workspace-content" id="workspace-main" key={activeView}>{content}</main>
      </div>
      <MobileNav active={activeView} onNavigate={navigate} allowedViews={allowedViews} onOpenMore={() => setSidebarOpen(true)} />

      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} onNavigate={navigate} onQuick={openQuick} allowedViews={allowedViews} allowedQuickActions={allowedQuickActions} />
      <NotificationDrawer open={notificationsOpen} onClose={() => setNotificationsOpen(false)} onNavigate={navigate} unread={unreadNotifications} onMarkRead={() => { setUnreadNotifications(0); showToast("All notifications marked as read"); }} allowedViews={allowedViews} />
      {canManage && <CustomerPreview open={previewOpen} onClose={() => setPreviewOpen(false)} menuItems={menuItems} />}
      {quickType && <QuickCreateModal type={quickType} onClose={() => setQuickType(null)} onSubmit={handleQuickSubmit} />}
      <div className={`toast${toast ? " show" : ""}`} role="status" aria-live="polite"><CheckCircle2 size={17} />{toast}</div>
    </div>
  );
}
