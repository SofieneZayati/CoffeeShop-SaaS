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
import { events, menuItemsSeed, ordersSeed, reservationsSeed, tablesSeed } from "../data/demoData";
import { usePersistentState } from "../hooks";
import { Avatar, Badge, BrandMark, Button, IconButton, Progress, SectionTitle } from "../components/ui";
import "../styles/customer-experience.css";

const customerTabs = [
  { id: "menu", label: "Menu", icon: Coffee },
  { id: "orders", label: "My orders", icon: ShoppingBag },
  { id: "rewards", label: "Rewards", icon: Gift },
  { id: "reservations", label: "Bookings", icon: CalendarDays },
  { id: "events", label: "Events", icon: Gamepad2 },
  { id: "profile", label: "Profile", icon: UserRound },
];

const customerCategories = ["All", "Coffee", "Cold drinks", "Sandwiches", "Crepes", "Pastries", "Desserts", "Snacks"];
const TABLE_SESSION_IDLE_MINUTES = 45;

const gameLibrary = [
  { id: "catan", name: "Catan", type: "Strategy", players: "3–4", duration: "60–90 min", difficulty: "Thinky", emoji: "🏝️", available: 2 },
  { id: "uno", name: "Color Clash", type: "Cards", players: "2–8", duration: "15–25 min", difficulty: "Easy", emoji: "🃏", available: 4 },
  { id: "chess", name: "Chess", type: "Classic", players: "2", duration: "20–45 min", difficulty: "Classic", emoji: "♟️", available: 3 },
  { id: "jenga", name: "Tower Tumble", type: "Party", players: "2–6", duration: "15–30 min", difficulty: "Easy", emoji: "🧱", available: 2 },
  { id: "dixit", name: "Story Cards", type: "Creative", players: "3–6", duration: "30 min", difficulty: "Social", emoji: "🎨", available: 1 },
  { id: "backgammon", name: "Backgammon", type: "Classic", players: "2", duration: "20–40 min", difficulty: "Classic", emoji: "🎲", available: 3 },
];

function formatMoney(value) {
  return `${Number(value || 0).toFixed(3)} TND`;
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
  const name = item.name.toLowerCase();
  if (category === "Coffee" || item.category === "Cold coffee") return {
    choices: [
      { label: "Size", values: [{ name: "Regular", price: 0 }, { name: "Large", price: 2.5 }] },
      { label: "Milk", values: [{ name: "Whole milk", price: 0 }, { name: "Oat milk", price: 1.5 }, { name: "Almond milk", price: 1.5 }] },
      { label: "Sweetness", values: [{ name: "No sugar", price: 0 }, { name: "Light", price: 0 }, { name: "Regular", price: 0 }] },
    ],
    addOns: [{ name: "Extra espresso shot", price: 2.5 }, { name: "Vanilla syrup", price: 1.5 }, { name: "Cold foam", price: 2 }],
  };
  if (name.includes("matcha")) return {
    choices: [
      { label: "Size", values: [{ name: "Regular", price: 0 }, { name: "Large", price: 2.5 }] },
      { label: "Milk", values: [{ name: "Oat milk", price: 0 }, { name: "Whole milk", price: 0 }, { name: "Almond milk", price: 1.5 }] },
      { label: "Sweetness", values: [{ name: "No added sugar", price: 0 }, { name: "Light", price: 0 }, { name: "Regular", price: 0 }] },
    ],
    addOns: [{ name: "Fresh strawberries", price: 2.5 }, { name: "Matcha shot", price: 2.5 }, { name: "Cold foam", price: 2 }],
  };
  if (category === "Cold drinks") return {
    choices: [
      { label: "Size", values: [{ name: "Regular", price: 0 }, { name: "Large", price: 2.5 }] },
      { label: "Sweetness", values: [{ name: "No added sugar", price: 0 }, { name: "Light", price: 0 }, { name: "Regular", price: 0 }] },
      { label: "Ice", values: [{ name: "Regular ice", price: 0 }, { name: "Light ice", price: 0 }, { name: "No ice", price: 0 }] },
    ],
    addOns: [{ name: "Fresh mint", price: 1 }, { name: "Fresh lemon", price: 1 }, { name: "Sparkling water", price: 1.5 }],
  };
  if (category === "Crepes" && !name.includes("savory")) return {
    choices: [
      { label: "Serving", values: [{ name: "Warm", price: 0 }, { name: "Room temperature", price: 0 }] },
      { label: "Sweetness", values: [{ name: "As prepared", price: 0 }, { name: "Light topping", price: 0 }] },
    ],
    addOns: [{ name: "Vanilla ice cream", price: 3 }, { name: "Fresh strawberries", price: 2.5 }, { name: "Chocolate drizzle", price: 1.5 }],
  };
  if (["Sandwiches", "Crepes"].includes(category)) return {
    choices: [
      { label: "Serving", values: [{ name: "As prepared", price: 0 }, { name: "Extra toasted", price: 0 }] },
      { label: "Side", values: [{ name: "No side", price: 0 }, { name: "Side salad", price: 3 }, { name: "Fries", price: 4 }] },
    ],
    addOns: [{ name: "Extra cheese", price: 2 }, { name: "Avocado", price: 3.5 }, { name: "House dip", price: 1.5 }],
  };
  if (category === "Snacks") return {
    choices: [{ label: "Serving", values: [{ name: "As prepared", price: 0 }, { name: "Extra crispy", price: 0 }] }],
    addOns: [{ name: "Extra house dip", price: 1.5 }, { name: "Extra fries", price: 4 }, { name: "Side salad", price: 3 }],
  };
  return {
    choices: [{ label: "Serving", values: [{ name: "As prepared", price: 0 }, { name: "Warm", price: 0 }] }],
    addOns: [{ name: "Vanilla ice cream", price: 3 }, { name: "Fresh strawberries", price: 2.5 }, { name: "Chocolate drizzle", price: 1.5 }],
  };
}

function productAllergens(item) {
  const text = `${item.ingredients || ""} ${(item.tags || []).join(" ")}`.toLowerCase();
  const allergens = [];
  if (/wheat|flour|baguette|bread|focaccia|crêpe|biscuit|croissant|pastry/.test(text)) allergens.push("Gluten");
  if (/milk|butter|cream|cheese|mozzarella|emmental|ricotta|mascarpone|béchamel/.test(text)) allergens.push("Milk");
  if (/egg/.test(text)) allergens.push("Egg");
  if (/pistachio|almond|walnut|hazelnut|pesto|contains nuts/.test(text)) allergens.push("Tree nuts");
  if (/tuna/.test(text)) allergens.push("Fish");
  if (/mustard/.test(text)) allergens.push("Mustard");
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

export default function CustomerPortal({ account, onLogout, onSwitchAccount }) {
  const isGuest = account.id === "table-guest";
  const visibleTabs = isGuest ? customerTabs.filter((tab) => ["menu", "orders", "events"].includes(tab.id)) : customerTabs;
  const [activeTab, setActiveTab] = useState("menu");
  const [menuItems] = usePersistentState("green-os-menu-v3", menuItemsSeed);
  const [orders, setOrders] = usePersistentState("green-os-orders", ordersSeed);
  const [reservations, setReservations] = usePersistentState("green-os-reservations", reservationsSeed);
  const [tables, setTables] = usePersistentState("green-os-tables-v2", tablesSeed);
  const [cart, setCart] = usePersistentState(`green-customer-cart-${account.id}`, {});
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

  const activeItems = useMemo(() => menuItems.filter((item) => item.active), [menuItems]);
  const filteredItems = activeItems.filter((item) => {
    const searchTarget = `${item.name} ${item.description} ${item.tags?.join(" ")}`.toLowerCase();
    return (category === "All" || customerCategoryOf(item) === category) && searchTarget.includes(query.toLowerCase());
  });
  const cartLines = useMemo(() => Object.entries(cart || {}).flatMap(([lineId, value]) => {
    const itemId = typeof value === "object" ? value.itemId : Number(lineId);
    const item = activeItems.find((entry) => entry.id === Number(itemId));
    const quantity = typeof value === "object" ? Number(value.quantity || 0) : Number(value || 0);
    if (!item || quantity < 1) return [];
    return [{ ...item, lineId, quantity, selections: typeof value === "object" ? value.selections || [] : [], addOns: typeof value === "object" ? value.addOns || [] : [], note: typeof value === "object" ? value.note || "" : "", unitPrice: typeof value === "object" ? Number(value.unitPrice || item.price) : item.price }];
  }), [activeItems, cart]);
  const cartQuantityByItem = useMemo(() => cartLines.reduce((result, line) => ({ ...result, [line.id]: (result[line.id] || 0) + line.quantity }), {}), [cartLines]);
  const cartCount = cartLines.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartLines.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
  const customerOrders = orders.filter((order) => order.customerId === account.id || order.guest === account.name);
  const activeTable = tables.find((table) => table.id === verifiedSession?.tableId && table.sessionCode === verifiedSession?.sessionCode);
  const activeSession = isOrderableTable(activeTable) ? activeTable : null;

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
    const signature = [...choices.map((choice) => choice.name), ...addOns.map((choice) => choice.name), configuration.note || ""].join("|");
    const lineId = `${item.id}-${signature || "custom"}`.replace(/[^a-zA-Z0-9-]/g, "-").slice(0, 100);
    const unitPrice = item.price + choices.reduce((sum, choice) => sum + Number(choice.price || 0), 0) + addOns.reduce((sum, choice) => sum + Number(choice.price || 0), 0);
    setCart((current) => {
      const existing = current[lineId];
      const existingQuantity = typeof existing === "object" ? Number(existing.quantity || 0) : 0;
      return { ...current, [lineId]: { itemId: item.id, quantity: existingQuantity + Number(configuration.quantity || 1), selections: choices, addOns, note: configuration.note || "", unitPrice } };
    });
    setProductOpen(null);
    setCartOpen(true);
    notify(`${item.name} customized and added to your basket`);
  }

  function toggleFavorite(itemId) {
    setFavoriteIds((current) => current.includes(itemId) ? current.filter((id) => id !== itemId) : [...current, itemId]);
  }

  function verifyTableSession(rawCode) {
    const code = String(rawCode || "").trim().toUpperCase().replace(/\s+/g, "-");
    const tableNumber = code.match(/(?:GREEN-|TABLE-|T)?(\d{1,2})$/)?.[1];
    const table = tables.find((item) => item.sessionCode === code || item.id === `T${String(tableNumber || "").padStart(2, "0")}`);
    if (!table) return false;
    const sessionCode = `GREEN-${table.id.replace("T", "")}`;
    setTables((current) => current.map((item) => item.id === table.id ? { ...item, status: "ordering", sessionActive: true, sessionCode, sessionExpiresAt: new Date(Date.now() + TABLE_SESSION_IDLE_MINUTES * 60_000).toISOString() } : item));
    setVerifiedSession({ tableId: table.id, sessionCode });
    setSessionOpen(false);
    notify(`${table.id} verified • this table visit is ready to order`);
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
    notify("This device was disconnected from the table session");
  }

  function checkout() {
    if (!cartLines.length) return;
    if (!activeSession) {
      setCartOpen(false);
      setSessionOpen(true);
      notify("Verify an active table session before placing an order");
      return;
    }
    const nextNumber = Math.max(1048, ...orders.map((item) => Number(item.id.replace("GC-", "")) || 0)) + 1;
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
      items: cartLines.map((item) => `${item.quantity}× ${item.name}${item.selections.length || item.addOns.length ? ` (${[...item.selections, ...item.addOns].map((choice) => choice.name).join(", ")})` : ""}`),
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
    notify(`${order.id} was sent to the café for acceptance`);
  }

  const renderContent = () => {
    if (activeTab === "orders") return <CustomerOrders orders={customerOrders} onBrowse={() => setActiveTab("menu")} />;
    if (activeTab === "rewards") return <CustomerRewards account={account} notify={notify} />;
    if (activeTab === "reservations") return <CustomerReservations account={account} reservations={reservations} setReservations={setReservations} notify={notify} onOpenGames={() => setGamesOpen(true)} />;
    if (activeTab === "events") return <CustomerEvents notify={notify} onOpenGames={() => setGamesOpen(true)} />;
    if (activeTab === "profile") return <CustomerProfile account={account} onSwitchAccount={onSwitchAccount} onLogout={onLogout} notify={notify} />;
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
      />
    );
  };

  return (
    <div className="customer-portal">
      <header className="customer-portal-header">
        <button className="customer-brand" onClick={() => setActiveTab("menu")}><BrandMark /><span><strong>Green Coffee Games</strong><small><MapPin size={12} />La Marsa • Open until 23:00</small></span></button>
        <nav aria-label="Customer navigation">
          {visibleTabs.map(({ id, label }) => <button key={id} className={activeTab === id ? "active" : ""} aria-current={activeTab === id ? "page" : undefined} onClick={() => setActiveTab(id)}>{label}</button>)}
        </nav>
        <div className="customer-header-actions">
          <button className={`customer-session-pill${activeSession ? " verified" : ""}`} onClick={() => setSessionOpen(true)}>
            {activeSession ? <ShieldCheck size={17} /> : <LockKeyhole size={17} />}
            <span><strong>{activeSession ? activeSession.id : "Ordering locked"}</strong><small>{activeSession ? `${sessionMinutesLeft(activeSession)} min left` : "Verify table"}</small></span>
          </button>
          {!isGuest && <button className="customer-points" onClick={() => setActiveTab("rewards")}><Gift size={17} /><span><strong>{account.points?.toLocaleString() || "1,280"}</strong><small>points</small></span></button>}
          <IconButton label="Notifications" onClick={() => notify("You’re all caught up — no new notifications")}><Bell size={18} /></IconButton>
          {isGuest ? <button className="customer-account-button" aria-label="Open demo roles" onClick={onSwitchAccount}><Avatar initials={account.initials} tone={0} /><span><strong>Guest mode</strong><small>Open demo roles</small></span></button> : <button className="customer-account-button" aria-label={`Open ${account.firstName} profile`} onClick={() => setActiveTab("profile")}><Avatar initials={account.initials} tone={0} /><span><strong>{account.firstName}</strong><small>{account.tier || "Gold"} member</small></span></button>}
        </div>
      </header>

      <main className="customer-portal-main">{renderContent()}</main>

      <nav className="customer-mobile-nav" aria-label="Customer mobile navigation">
        {visibleTabs.slice(0, 5).map(({ id, label, icon: Icon }) => <button key={id} className={activeTab === id ? "active" : ""} onClick={() => setActiveTab(id)}><Icon size={20} /><span>{label.replace("My ", "")}</span></button>)}
      </nav>

      {cartCount > 0 && activeTab === "menu" && <button className="floating-customer-cart" onClick={() => setCartOpen(true)}><span><b>{cartCount}</b><ShoppingBag size={18} />View basket</span><strong>{cartTotal.toFixed(3)} TND</strong></button>}
      <CustomerCart open={cartOpen} onClose={() => setCartOpen(false)} lines={cartLines} adjustLine={adjustLine} total={cartTotal} onCheckout={checkout} activeSession={activeSession} onOpenSession={() => { setCartOpen(false); setSessionOpen(true); }} onEdit={(item) => { setCartOpen(false); setProductOpen(item); }} />
      <ProductDetailModal item={productOpen} onClose={() => setProductOpen(null)} onAdd={addConfiguredItem} />
      <TableSessionModal open={sessionOpen} activeSession={activeSession} onClose={() => setSessionOpen(false)} onVerify={verifyTableSession} onScan={scanTableQr} onDisconnect={endLocalSession} />
      <GamesLibrary open={gamesOpen} onClose={() => setGamesOpen(false)} notify={notify} activeSession={activeSession} onNeedSession={() => { setGamesOpen(false); setSessionOpen(true); notify("Scan your table QR before requesting a shelf game"); }} />
      <div className={`customer-toast${toast ? " show" : ""}`} role="status"><CheckCircle2 size={17} />{toast}</div>
    </div>
  );
}

function CustomerMenu({ items, category, setCategory, query, setQuery, cart, adjust, favorites, toggleFavorite, activeSession, onOpenSession, onEndSession, onOpenProduct, onRewards, isGuest }) {
  return (
    <div className="customer-menu-page">
      <section className={`table-session-gate${activeSession ? " verified" : ""}`}>
        <span className="session-gate-icon">{activeSession ? <ShieldCheck size={23} /> : <LockKeyhole size={23} />}</span>
        <div>
          <Badge tone={activeSession ? "green" : "orange"} dot>{activeSession ? "IN-CAFÉ SESSION VERIFIED" : "SCAN AT YOUR TABLE TO ORDER"}</Badge>
          <h2>{activeSession ? `${activeSession.id} is ready for your order.` : "Browse anywhere. Order only from your table."}</h2>
          <p>{activeSession ? `Your visit session expires in ${sessionMinutesLeft(activeSession)} minutes and closes when the table is cleared.` : "When you arrive, scan the QR fixed to your table. It identifies your table and starts a short, protected ordering visit."}</p>
        </div>
        <button onClick={activeSession ? onEndSession : onOpenSession}>{activeSession ? "Disconnect device" : "Scan table QR"}<ArrowRight size={16} /></button>
      </section>
      <section className="customer-store-hero">
        <div className="store-hero-copy"><Badge tone="light" dot>Made fresh in La Marsa</Badge><h1>Your favorite pause,<br /><em>ready when you are.</em></h1><p>Signature coffee, slow brews, fresh bakes—and something playful for every table.</p><div><button onClick={() => document.getElementById("customer-menu-grid")?.scrollIntoView({ behavior: "smooth" })}>Order something lovely <ArrowRight size={16} /></button><span><Star size={15} fill="currentColor" />4.9 from 286 guests</span></div></div>
        <div className="store-hero-products" aria-hidden="true"><figure className="hero-product large"><img src="/menu/pistachio-cloud.webp" alt="" /></figure><figure className="hero-product small top"><img src="/menu/tiramisu-jar.webp" alt="" /></figure><figure className="hero-product small bottom"><img src="/menu/matcha-strawberry.webp" alt="" /></figure><span className="hero-product-label"><Sparkles size={14} /><b>Today’s pick</b>Pistachio cloud</span></div>
      </section>

      {!isGuest && <section className="customer-reward-banner"><span className="reward-banner-icon"><Gift size={22} /></span><div><strong>You’re 80 points from a free drink</strong><span>One more visit could do it.</span></div><Progress value={92} tone="lime" /><button onClick={onRewards}>See my rewards <ChevronRight size={16} /></button></section>}

      <section className="customer-menu-section" id="customer-menu-grid">
        <div className="customer-menu-heading"><div><span className="customer-kicker">THE GREEN MENU</span><h2>Find your next favorite.</h2><p>Every drink can be made just the way you like it.</p></div><div className="customer-menu-search"><Search size={18} /><input aria-label="Search the menu" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search coffee, dessert…" /></div></div>
        <div className="customer-category-tabs" role="tablist" aria-label="Menu categories">{customerCategories.map((item) => <button role="tab" aria-selected={category === item} key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div>
        <div className="customer-product-grid">
          {items.map((item) => (
            <article className="store-product-card cx-product-card" key={item.id}>
              <button className={`store-product-photo cx-product-photo tone-${item.tone || "sage"}`} onClick={() => onOpenProduct(item)} aria-label={`View ${item.name} details`}>
                {item.image ? <img src={item.image} alt={item.alt} loading="lazy" width="640" height="640" style={{ objectPosition: item.objectPosition }} /> : <span className="cx-menu-art" aria-hidden="true">{item.emoji || "☕"}</span>}
                {item.featured && <Badge tone="light"><Sparkles size={11} />Popular</Badge>}
              </button>
              <button className={favorites.includes(item.id) ? "favorite active cx-favorite" : "favorite cx-favorite"} onClick={() => toggleFavorite(item.id)} aria-label={`${favorites.includes(item.id) ? "Remove" : "Add"} ${item.name} ${favorites.includes(item.id) ? "from" : "to"} favorites`} aria-pressed={favorites.includes(item.id)}><Heart size={18} fill={favorites.includes(item.id) ? "currentColor" : "none"} /></button>
              <div className="store-product-copy"><span>{customerCategoryOf(item)}</span><button className="cx-product-name" onClick={() => onOpenProduct(item)}><h3>{item.name}</h3></button><p>{item.description}</p><div className="store-product-tags">{item.tags.map((tag) => <small key={tag}>{tag}</small>)}</div><div className="store-product-foot"><strong>{formatMoney(item.price)}</strong>{(cart[item.id] || 0) === 0 ? <button onClick={() => onOpenProduct(item)}><Plus size={17} />Choose</button> : <div className="store-quantity"><button aria-label={`Remove one ${item.name}`} onClick={() => adjust(item.id,-1)}><Minus size={15} /></button><b>{cart[item.id]}</b><button aria-label={`Customize another ${item.name}`} onClick={() => onOpenProduct(item)}><Plus size={15} /></button></div>}</div></div>
            </article>
          ))}
        </div>
        {!items.length && <div className="customer-menu-empty"><Search size={25} /><strong>Nothing found</strong><p>Try another search or menu category.</p></div>}
      </section>
    </div>
  );
}

function ProductDetailModal({ item, onClose, onAdd }) {
  const [selections, setSelections] = useState({});
  const [addOns, setAddOns] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!item) return;
    const options = productOptions(item);
    setSelections(Object.fromEntries(options.choices.map((group) => [group.label, group.values[0]])));
    setAddOns([]);
    setQuantity(1);
    setNote("");
  }, [item]);

  if (!item) return null;
  const options = productOptions(item);
  const selectedValues = Object.values(selections);
  const unitPrice = item.price + selectedValues.reduce((sum, choice) => sum + Number(choice?.price || 0), 0) + addOns.reduce((sum, choice) => sum + Number(choice.price || 0), 0);

  function toggleAddOn(addOn) {
    setAddOns((current) => current.some((choice) => choice.name === addOn.name) ? current.filter((choice) => choice.name !== addOn.name) : [...current, addOn]);
  }

  return <div className="cx-modal-layer" role="presentation">
    <button className="cx-modal-scrim" aria-label="Close product details" onClick={onClose} />
    <section className="cx-product-modal" role="dialog" aria-modal="true" aria-labelledby="cx-product-title">
      <button className="cx-modal-close" aria-label="Close product details" onClick={onClose}><X size={20} /></button>
      <div className={`cx-product-modal-art tone-${item.tone || "sage"}`}>
        {item.image ? <img src={item.image} alt={item.alt} style={{ objectPosition: item.objectPosition }} /> : <span>{item.emoji || "☕"}</span>}
        {item.featured && <Badge tone="light"><Sparkles size={12} />Guest favorite</Badge>}
      </div>
      <div className="cx-product-modal-content">
        <span className="customer-kicker">{customerCategoryOf(item)}</span>
        <h2 id="cx-product-title">{item.name}</h2>
        <p className="cx-product-lead">{item.description}</p>
        <div className="cx-product-meta"><span><Clock3 size={15} />Ready in 8–12 min</span><span><Sparkles size={15} />Made to order</span></div>
        <details className="cx-ingredients"><summary>Ingredients & allergens</summary><p>{item.ingredients || item.description}.</p><strong>{productAllergens(item).length ? `Listed allergens: ${productAllergens(item).join(", ")}.` : "No major allergen is listed in this demo."}</strong><small>Please tell the café team about severe allergies or cross-contact concerns.</small></details>
        {options.choices.map((group) => <fieldset className="cx-option-group" key={group.label}>
          <legend>{group.label}<small>Choose one</small></legend>
          <div>{group.values.map((choice) => <button type="button" key={choice.name} className={selections[group.label]?.name === choice.name ? "active" : ""} onClick={() => setSelections((current) => ({ ...current, [group.label]: choice }))}><span>{choice.name}</span><small>{choice.price ? `+${formatMoney(choice.price)}` : "Included"}</small><i>{selections[group.label]?.name === choice.name && <Check size={13} />}</i></button>)}</div>
        </fieldset>)}
        <fieldset className="cx-option-group cx-addons">
          <legend>Make it yours<small>Optional extras</small></legend>
          <div>{options.addOns.map((addOn) => { const active = addOns.some((choice) => choice.name === addOn.name); return <button type="button" key={addOn.name} className={active ? "active" : ""} onClick={() => toggleAddOn(addOn)}><span>{addOn.name}</span><small>+{formatMoney(addOn.price)}</small><i>{active && <Check size={13} />}</i></button>; })}</div>
        </fieldset>
        <label className="cx-order-note"><span>Note for the team <small>Optional</small></span><textarea rows="2" maxLength="90" value={note} onChange={(event) => setNote(event.target.value)} placeholder="For example: sauce on the side" /><small>{note.length}/90</small></label>
        <footer className="cx-product-modal-footer">
          <div className="store-quantity"><button aria-label="Decrease quantity" onClick={() => setQuantity((current) => Math.max(1, current - 1))}><Minus size={16} /></button><b>{quantity}</b><button aria-label="Increase quantity" onClick={() => setQuantity((current) => Math.min(12, current + 1))}><Plus size={16} /></button></div>
          <button className="cx-add-button" onClick={() => onAdd(item, { selections: selectedValues, addOns, quantity, note })}><span>Add to basket</span><strong>{formatMoney(unitPrice * quantity)}</strong></button>
        </footer>
      </div>
    </section>
  </div>;
}

function CustomerCart({ open, onClose, lines, adjustLine, total, onCheckout, activeSession, onOpenSession, onEdit }) {
  return <>
    <aside className={`customer-cart-drawer${open ? " open" : ""}`} aria-hidden={!open}>
      <header>
        <div><span>Your table order</span><h2>A lovely choice.</h2><p>{activeSession ? `${activeSession.id} • verified dine-in session` : "Checkout is locked until your table is verified"}</p></div>
        <IconButton label="Close basket" onClick={onClose}><X size={20} /></IconButton>
      </header>
      <div className="customer-cart-lines">
        {lines.map((item) => <article key={item.lineId} className="cx-cart-line">
          {item.image ? <img src={item.image} alt="" style={{ objectPosition: item.objectPosition }} /> : <span className={`cx-cart-art tone-${item.tone || "sage"}`}>{item.emoji || "☕"}</span>}
          <div><strong>{item.name}</strong><small>{[...item.selections, ...item.addOns].map((choice) => choice.name).join(" • ") || "As listed"}</small>{item.note && <small>“{item.note}”</small>}<span>{formatMoney(item.unitPrice * item.quantity)}</span><button className="cx-cart-edit" onClick={() => onEdit(item)}>Customize another</button></div>
          <div className="store-quantity"><button aria-label={`Remove one ${item.name}`} onClick={() => adjustLine(item.lineId,-1)}><Minus size={14} /></button><b>{item.quantity}</b><button aria-label={`Add one ${item.name}`} onClick={() => adjustLine(item.lineId,1)}><Plus size={14} /></button></div>
        </article>)}
        {!lines.length && <div className="empty-customer-cart"><ShoppingBag size={28} /><strong>Your basket is empty</strong><span>Something delicious is waiting on the menu.</span></div>}
      </div>
      {lines.length > 0 && <footer>
        <div><span>Subtotal</span><strong>{formatMoney(total)}</strong></div>
        <div><span>Service</span><strong>0.000 TND</strong></div>
        <div className="cart-total"><span>Total</span><strong>{formatMoney(total)}</strong></div>
        {activeSession ? <button onClick={onCheckout}><ShieldCheck size={17} />Place order for {activeSession.id}<ArrowRight size={17} /></button> : <button className="session-required" onClick={onOpenSession}><QrCode size={17} />Scan table QR to order<ArrowRight size={17} /></button>}
        <small>{activeSession ? <><Timer size={13} />Session expires automatically and closes with the table</> : <><LockKeyhole size={13} />Remote checkout is blocked</>}</small>
      </footer>}
    </aside>
    {open && <button className="drawer-scrim" onClick={onClose} aria-label="Close basket" />}
  </>;
}

function TableSessionModal({ open, activeSession, onClose, onVerify, onScan, onDisconnect }) {
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
    if (onVerify(code)) setError("");
    else setError("We couldn’t match that code. Try T08 for this interactive demo.");
  }

  function simulateScan() {
    setScanProgress(true);
    window.setTimeout(() => {
      stopCamera();
      onScan("T08");
      setScanProgress(false);
    }, 900);
  }

  return <div className="table-session-modal-layer" role="presentation">
    <button className="table-session-modal-scrim" aria-label="Close table verification" onClick={onClose} />
    <section className="table-session-modal cx-session-modal" role="dialog" aria-modal="true" aria-labelledby="table-session-title">
      <header>
        <span>{activeSession ? <ShieldCheck size={23} /> : <QrCode size={23} />}</span>
        <div><Badge tone={activeSession ? "green" : "orange"}>{activeSession ? "VISIT ACTIVE" : "ON-SITE TABLE CHECK"}</Badge><h2 id="table-session-title">{activeSession ? `${activeSession.id} is ready.` : "Scan the QR on your table."}</h2></div>
        <IconButton label="Close" onClick={onClose}><X size={20} /></IconButton>
      </header>
      {activeSession ? <>
        <div className="verified-session-card"><ShieldCheck size={26} /><span><strong>QR-started table visit</strong><small>{sessionMinutesLeft(activeSession)} minutes remaining • {activeSession.sessionCode}</small></span></div>
        <ul><li><Check size={15} />Checkout is bound to {activeSession.id}</li><li><Check size={15} />The visit expires automatically</li><li><Check size={15} />Staff clearing the table blocks more orders</li></ul>
        <div className="session-modal-actions"><Button variant="secondary" onClick={onDisconnect}>Disconnect this device</Button><Button onClick={onClose}>Continue ordering</Button></div>
      </> : <>
        <div className="cx-session-tabs" role="tablist"><button role="tab" aria-selected={mode === "scan"} className={mode === "scan" ? "active" : ""} onClick={() => setMode("scan")}><ScanLine size={16} />Scan QR</button><button role="tab" aria-selected={mode === "code"} className={mode === "code" ? "active" : ""} onClick={() => setMode("code")}><QrCode size={16} />Enter code</button></div>
        {mode === "scan" ? <div className="cx-scanner">
          <div className={`cx-camera-frame ${cameraState}`}>
            <video ref={videoRef} autoPlay muted playsInline />
            <div className="cx-camera-fallback"><Camera size={38} /><strong>{cameraState === "loading" ? "Starting camera…" : "Camera preview unavailable"}</strong><small>You can still run the complete scan demonstration.</small></div>
            <span className="cx-scan-target"><i /><i /><i /><i /></span>
            {scanProgress && <span className="cx-scan-beam" />}
          </div>
          <p><ShieldCheck size={15} />In production, the QR and café network validate that you are at this table. This preview safely simulates that check.</p>
          <Button icon={ScanLine} onClick={simulateScan} disabled={scanProgress}>{scanProgress ? "Recognizing table…" : "Simulate scanning table T08"}</Button>
          {cameraState === "demo" && <button className="cx-camera-retry" onClick={startCamera}><RotateCcw size={15} />Try camera again</button>}
        </div> : <form onSubmit={submit} className="cx-manual-code">
          <p>Can’t use the camera? Enter the short code printed beneath the table QR. This is also useful for accessibility.</p>
          <label><span>Table code</span><input autoFocus value={code} onChange={(event) => { setCode(event.target.value.toUpperCase()); setError(""); }} placeholder="T08" /></label>
          {error && <div className="session-code-error" role="alert">{error}</div>}
          <div className="demo-code-note"><QrCode size={18} /><span><strong>Interactive demo</strong><small>Use T08 or GREEN-08 to simulate on-site validation.</small></span></div>
          <Button type="submit" icon={ShieldCheck}>Start this table visit</Button>
        </form>}
      </>}
    </section>
  </div>;
}

function CustomerOrders({ orders, onBrowse }) {
  const active = orders.find((order) => order.status !== "served");
  const completed = orders.filter((order) => order.status === "served");
  const awaitingAcceptance = active?.status === "new";

  return <div className="customer-subpage"><header className="customer-subpage-head"><span className="customer-kicker">ORDER HISTORY</span><h1>My orders</h1><p>Track what’s being made and revisit your favorites.</p></header>{active ? <section className="customer-active-order"><div className="active-order-top"><span className="order-live-icon"><Coffee size={22} /><i /></span><div><Badge tone={awaitingAcceptance ? "blue" : active.status === "making" ? "orange" : "green"} dot>{awaitingAcceptance ? "Waiting for staff" : active.status === "making" ? "Being prepared" : "Ready to serve"}</Badge><h2>{awaitingAcceptance ? "Your order is waiting for a quick check." : active.status === "ready" ? "Your table order is ready." : "We’re making something good."}</h2><p>{active.id} • {active.table === "PICKUP" ? "Pickup at the bar" : `Serving ${active.table}`} • {active.time}</p></div><strong>{active.total.toFixed(3)} TND</strong></div><div className="customer-order-progress"><div className="done"><i><Check size={14} /></i><span><strong>Sent to café</strong><small>{active.sessionId ? "Table session verified" : "Order submitted"}</small></span></div><b /><div className={awaitingAcceptance ? "current" : "done"}><i>{awaitingAcceptance ? <Timer size={14} /> : <Check size={14} />}</i><span><strong>{awaitingAcceptance ? "Staff acceptance" : "Accepted"}</strong><small>{awaitingAcceptance ? "Usually within two minutes" : "Sent to the barista station"}</small></span></div><b /><div className={active.status === "ready" ? "done" : active.status === "making" ? "current" : ""}><i><Coffee size={14} /></i><span><strong>{active.status === "ready" ? "Ready" : "Preparing"}</strong><small>{active.status === "ready" ? (active.table === "PICKUP" ? "Collect at the bar" : "Staff will bring it over") : "At the barista station"}</small></span></div></div><div className="customer-order-items">{active.items.map((item) => <span key={item}>{item}</span>)}</div></section> : <section className="customer-empty-state"><span><ShoppingBag size={30} /></span><h2>No active order—yet.</h2><p>Your next favorite is only a few taps away.</p><Button icon={Coffee} onClick={onBrowse}>Browse the menu</Button></section>}<section className="past-orders"><SectionTitle title="Past orders" subtitle="Receipts, points and quick reorders" />{completed.map((order) => <article key={order.id}><span className="past-order-date"><b>✓</b>DONE</span><div><strong>{order.items.join(" + ")}</strong><small>{order.id} • {order.table} • {order.total.toFixed(3)} TND</small></div><Badge tone="green">Completed</Badge></article>)}<article><span className="past-order-date"><b>08</b>JUL</span><div><strong>Pistachio cloud + Tiramisu jar</strong><small>GC-1021 • 25.000 TND • +250 points</small></div><Badge tone="green">Completed</Badge><button onClick={onBrowse}>Order again <ChevronRight size={15} /></button></article><article><span className="past-order-date"><b>02</b>JUL</span><div><strong>Matcha strawberry</strong><small>GC-0987 • 15.000 TND • +150 points</small></div><Badge tone="green">Completed</Badge><button onClick={onBrowse}>Order again <ChevronRight size={15} /></button></article></section></div>;
}

function CustomerRewards({ account, notify }) {
  const [inviteOpen, setInviteOpen] = useState(false);
  const [scannerOpen, setScannerOpen] = useState(false);
  const [rewardOpen, setRewardOpen] = useState(false);
  const [happyHourOpen, setHappyHourOpen] = useState(false);
  const [rewardReady, setRewardReady] = useState(true);

  function activateReward() {
    setRewardReady(false);
    setRewardOpen(false);
    notify("Reward added to your next eligible table order");
  }

  return <div className="customer-subpage">
    <header className="customer-subpage-head"><span className="customer-kicker">GREEN REWARDS</span><h1>Your rituals, rewarded.</h1><p>Earn 10 points for every dinar and keep every treat in one place.</p></header>
    <section className="rewards-hero"><div><Badge tone="light"><Trophy size={12} />{account.tier || "Gold"} member</Badge><h2>{(account.points || 1280).toLocaleString()}</h2><span>available points</span><p>80 points until your next free signature drink.</p><Progress value={92} tone="lime" /></div><span className="rewards-card-art"><Gift size={46} /><b>GREEN<br />REWARDS</b><i>•••• 1280</i></span></section>
    <div className="reward-grid">
      <article><span className="reward-photo"><img src="/menu/pistachio-cloud.webp" alt="Pistachio cloud reward" /></span><Badge tone={rewardReady ? "green" : "blue"}>{rewardReady ? "READY TO USE" : "ADDED TO ORDER"}</Badge><h3>Free signature drink</h3><p>Your Gold reward. Valid on any signature drink.</p><button onClick={() => setRewardOpen(true)}>{rewardReady ? "Use reward" : "View reward"} <ArrowRight size={15} /></button></article>
      <article><span className="reward-icon orange"><Clock3 size={25} /></span><Badge tone="orange">HAPPY HOUR</Badge><h3>20% off from 14:00</h3><p>Weekdays, 14:00–17:00. Applied automatically.</p><button onClick={() => setHappyHourOpen(true)}>View details <ChevronRight size={15} /></button></article>
      <article><span className="reward-icon purple"><UsersRound size={25} /></span><Badge tone="purple">REFER A FRIEND</Badge><h3>150 points for both</h3><p>Share your code when a friend joins Green Rewards.</p><button onClick={() => setInviteOpen(true)}>Share my invite <ArrowRight size={15} /></button></article>
    </div>
    <section className="receipt-sync"><span><QrCode size={23} /></span><div><h3>Have a paper receipt?</h3><p>Scan its QR to save the receipt and credit your points automatically.</p></div><button onClick={() => setScannerOpen(true)}><QrCode size={16} />Scan receipt</button></section>
    <InviteModal open={inviteOpen} account={account} onClose={() => setInviteOpen(false)} notify={notify} />
    <ReceiptScanner open={scannerOpen} onClose={() => setScannerOpen(false)} onComplete={() => { setScannerOpen(false); notify("Demo receipt GC-1052 saved • 120 points added"); }} />
    <InfoModal open={rewardOpen} title="Free signature drink" eyebrow={rewardReady ? "READY TO USE" : "READY ON YOUR NEXT ORDER"} onClose={() => setRewardOpen(false)}><p>Choose any signature drink during an active table visit. Your reward is applied before you confirm.</p>{rewardReady ? <Button icon={Gift} onClick={activateReward}>Add reward to next order</Button> : <Button onClick={() => setRewardOpen(false)}>Got it</Button>}</InfoModal>
    <InfoModal open={happyHourOpen} title="Afternoons taste better" eyebrow="WEEKDAYS • 14:00–17:00" onClose={() => setHappyHourOpen(false)}><p>The eligible discount appears automatically in your basket during happy hour. It applies once per member per visit.</p><Button onClick={() => setHappyHourOpen(false)}>Sounds good</Button></InfoModal>
  </div>;
}

function InfoModal({ open, title, eyebrow, onClose, children }) {
  if (!open) return null;
  return <div className="cx-modal-layer"><button className="cx-modal-scrim" aria-label={`Close ${title}`} onClick={onClose} /><section className="cx-info-modal" role="dialog" aria-modal="true"><button className="cx-modal-close" aria-label="Close" onClick={onClose}><X size={19} /></button><span className="customer-kicker">{eyebrow}</span><h2>{title}</h2>{children}</section></div>;
}

function InviteModal({ open, account, onClose, notify }) {
  const inviteUrl = `https://green.coffee/join/${(account.firstName || "GREEN").toUpperCase()}-150`;

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
    notify(copied ? "Invite link copied — share it with a friend" : "Invite link is ready — copy it from the dialog");
  }

  async function shareInvite() {
    if (navigator.share) {
      try { await navigator.share({ title: "Join me at Green Coffee", text: "We both get 150 Green Rewards points.", url: inviteUrl }); return; } catch { /* cancelled or unavailable */ }
    }
    copyInvite();
  }

  if (!open) return null;
  return <div className="cx-modal-layer"><button className="cx-modal-scrim" aria-label="Close invite" onClick={onClose} /><section className="cx-invite-modal" role="dialog" aria-modal="true" aria-labelledby="cx-invite-title"><button className="cx-modal-close" aria-label="Close" onClick={onClose}><X size={19} /></button><span className="cx-invite-icon"><Gift size={28} /></span><span className="customer-kicker">GIVE 150 • GET 150</span><h2 id="cx-invite-title">Coffee is better together.</h2><p>When a friend joins with your link and completes their first café visit, you both receive 150 points.</p><div className="cx-invite-link"><span>{inviteUrl}</span><button onClick={copyInvite} aria-label="Copy invite link"><Copy size={17} /></button></div><div className="cx-invite-actions"><Button icon={Share2} onClick={shareInvite}>Share invite</Button><Button variant="secondary" icon={Copy} onClick={copyInvite}>Copy link</Button></div><small>This is an interactive preview; no real invitation is sent.</small></section></div>;
}

function ReceiptScanner({ open, onClose, onComplete }) {
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
  function scanDemo() { setState("scanning"); window.setTimeout(onComplete, 1100); }
  return <div className="cx-modal-layer cx-dark-layer"><button className="cx-modal-scrim" aria-label="Close receipt scanner" onClick={onClose} /><section className="cx-receipt-scanner" role="dialog" aria-modal="true"><header><div><span>RECEIPT SCANNER</span><h2>Place the QR inside the frame.</h2></div><button aria-label="Close scanner" onClick={onClose}><X size={21} /></button></header><div className={`cx-receipt-camera ${state}`}><video ref={videoRef} autoPlay muted playsInline /><span className="cx-receipt-frame"><i /><i /><i /><i /></span>{state !== "ready" && <div><Camera size={38} /><strong>{state === "loading" ? "Starting camera…" : state === "scanning" ? "Reading receipt…" : "Camera not available"}</strong><small>The preview still lets you demonstrate the complete flow.</small></div>}{state === "scanning" && <span className="cx-scan-beam" />}</div><Button icon={ScanLine} onClick={scanDemo} disabled={state === "scanning"}>{state === "scanning" ? "Reading demo receipt…" : "Scan demo receipt"}</Button>{state === "demo" && <button className="cx-camera-retry" onClick={start}><RotateCcw size={15} />Try camera again</button>}<p>Camera access stays on this device. This demo does not upload images.</p></section></div>;
}

function CustomerReservations({ account, reservations, setReservations, notify, onOpenGames }) {
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState({ date: "2026-08-08", time: "18:30", guests: 2, note: "" });
  const ownReservations = reservations.filter((item) => item.customerId === account.id || item.name === account.name);
  function create(event) { event.preventDefault(); const reservation = { id: Date.now(), customerId: account.id, name: account.name, initials: account.initials, time: form.time, date: form.date, guests: Number(form.guests), table: "—", status: "pending", note: form.note || "Customer app request", phone: "+216 22 456 880" }; setReservations((current) => [reservation,...current]); setFormOpen(false); notify("Reservation request sent to the café"); }
  return <div className="customer-subpage"><header className="customer-subpage-head with-action"><div><span className="customer-kicker">YOUR TABLE</span><h1>Bookings</h1><p>Plan a coffee, a game night, or the big match.</p></div><Button icon={Plus} onClick={() => setFormOpen(true)}>New booking</Button></header><section className="upcoming-customer-booking"><div className="booking-date-block"><span>SAT</span><strong>08</strong><small>AUG</small></div><div><Badge tone="green" dot>Example confirmed booking</Badge><h2>Table for 4 at 18:30</h2><p><MapPin size={14} />Green Coffee Games • Window table</p><span>Reminder scheduled for 16:30</span></div><div><small>Preview data</small></div></section>{ownReservations.length > 0 && <section className="customer-request-list"><SectionTitle title="Requests" subtitle="Waiting for the café team" />{ownReservations.map((item) => <article key={item.id}><CalendarDays size={19} /><span><strong>{item.date} at {item.time}</strong><small>{item.guests} guests • {item.note}</small></span><Badge tone={item.status === "confirmed" ? "green" : "orange"}>{item.status}</Badge></article>)}</section>}<section className="booking-ideas"><article className="football"><span>⚽</span><div><Badge tone="light">EVENT BOOKING</Badge><h3>Champions League final</h3><p>Saturday • 20:00 • 14 seats left</p></div><button onClick={() => { setForm((current) => ({ ...current, note: "Champions League final" })); setFormOpen(true); }}>Reserve <ArrowRight size={15} /></button></article><article className="games"><Gamepad2 size={27} /><div><h3>Book a game table</h3><p>40+ games ready to play.</p></div><button onClick={onOpenGames}>Explore <ChevronRight size={15} /></button></article></section>{formOpen && <div className="customer-form-modal"><form onSubmit={create}><header><div><span>New reservation</span><h2>Save your table.</h2></div><IconButton type="button" label="Close" onClick={() => setFormOpen(false)}><X size={19} /></IconButton></header><div className="form-grid"><label><span>Date</span><input type="date" value={form.date} onChange={(event) => setForm({...form,date:event.target.value})} /></label><label><span>Time</span><input type="time" value={form.time} onChange={(event) => setForm({...form,time:event.target.value})} /></label><label><span>Guests</span><input type="number" min="1" max="12" value={form.guests} onChange={(event) => setForm({...form,guests:event.target.value})} /></label><label className="span-2"><span>Anything we should know?</span><textarea rows="3" value={form.note} onChange={(event) => setForm({...form,note:event.target.value})} /></label></div><Button type="submit" icon={CalendarDays}>Send request</Button></form></div>}</div>;
}

function CustomerEvents({ notify, onOpenGames }) {
  return <div className="customer-subpage"><header className="customer-subpage-head"><span className="customer-kicker">MORE THAN COFFEE</span><h1>What’s happening</h1><p>Big matches, friendly competition, and family time.</p></header><section className="customer-event-feature"><div><Badge tone="light">SATURDAY • 20:00</Badge><h2>The final,<br />on the big screen.</h2><p>Champions League final • live at Green Coffee</p><span><UsersRound size={15} />46 of 60 seats booked</span><button onClick={() => notify("Your event seat is reserved")}>Reserve my seat <ArrowRight size={16} /></button></div><span>⚽</span></section><div className="customer-event-grid">{events.slice(1).map((event,index) => <article key={event.title}><div className={`event-photo ${index ? "kids" : "games"}`}>{index ? <span>★</span> : <Gamepad2 size={42} />}</div><Badge tone={index ? "purple" : "orange"}>{event.type}</Badge><h3>{event.title}</h3><p>{event.date} • {event.time}</p><div><span><UsersRound size={14} />{event.bookings}/{event.capacity} booked</span><button onClick={() => notify(`Seat requested for ${event.title}`)}>Join <ChevronRight size={15} /></button></div></article>)}<article className="games-library-event"><DiceCards /><h3>Explore 40+ games</h3><p>See what’s available before your next visit.</p><button onClick={onOpenGames}>Open games menu <ArrowRight size={15} /></button></article></div></div>;
}

function DiceCards() { return <span className="dice-cards"><Gamepad2 size={35} /></span>; }

function GamesLibrary({ open, onClose, notify, activeSession, onNeedSession }) {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [requested, setRequested] = useState(null);
  const [quickGame, setQuickGame] = useState(false);
  const [playerRoll, setPlayerRoll] = useState(null);
  const [houseRoll, setHouseRoll] = useState(null);

  useEffect(() => {
    if (!open) return undefined;
    function escape(event) { if (event.key === "Escape") onClose(); }
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [open, onClose]);

  if (!open) return null;
  const types = ["All", ...new Set(gameLibrary.map((game) => game.type))];
  const games = gameLibrary.filter((game) => (filter === "All" || game.type === filter) && game.name.toLowerCase().includes(query.toLowerCase()));

  function requestGame(game) {
    if (!activeSession) {
      onNeedSession();
      return;
    }
    setRequested(game.id);
    notify(`${game.name} requested for ${activeSession.id} • the team will bring it over`);
  }

  function roll() {
    setPlayerRoll(Math.floor(Math.random() * 6) + 1);
    setHouseRoll(Math.floor(Math.random() * 6) + 1);
  }

  return <div className="cx-games-layer" role="presentation">
    <button className="cx-modal-scrim" aria-label="Close games menu" onClick={onClose} />
    <section className="cx-games-library" role="dialog" aria-modal="true" aria-labelledby="cx-games-title">
      <header><div><span className="customer-kicker">PLAY AT GREEN</span><h2 id="cx-games-title">Pick a game for your table.</h2><p>Browse what’s on the shelf, request it, or try a tiny game right now.</p></div><button aria-label="Close games menu" onClick={onClose}><X size={21} /></button></header>
      <div className="cx-games-tools"><label><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search games" aria-label="Search games" /></label><button className="cx-quick-game-button" onClick={() => setQuickGame(true)}><Gamepad2 size={17} />Play Brew Dice</button></div>
      <div className="cx-game-filters" role="tablist">{types.map((type) => <button key={type} role="tab" aria-selected={filter === type} className={filter === type ? "active" : ""} onClick={() => setFilter(type)}>{type}</button>)}</div>
      <div className="cx-game-grid">{games.map((game) => <article key={game.id}><span className="cx-game-art">{game.emoji}</span><div><span>{game.type} • {game.difficulty}</span><h3>{game.name}</h3><p><UsersRound size={14} />{game.players} players <Clock3 size={14} />{game.duration}</p></div><footer><small><i />{game.available} available</small><button className={requested === game.id ? "requested" : ""} onClick={() => requestGame(game)}>{requested === game.id ? <><Check size={15} />Requested</> : activeSession ? <>Request for {activeSession.id} <ArrowRight size={15} /></> : <><QrCode size={15} />Scan to request</>}</button></footer></article>)}</div>
      {!games.length && <div className="customer-menu-empty"><Search size={25} /><strong>No game found</strong><p>Try another title or game type.</p></div>}
      <footer className="cx-games-note"><Gamepad2 size={19} /><span><strong>How it works</strong><small>Request a game after you sit down. Staff brings it over and marks it as in use. No separate checkout in this preview.</small></span></footer>
    </section>
    {quickGame && <section className="cx-dice-game" role="dialog" aria-modal="true" aria-labelledby="cx-dice-title"><button className="cx-modal-close" aria-label="Close mini game" onClick={() => setQuickGame(false)}><X size={19} /></button><span className="cx-dice-logo">🎲</span><span className="customer-kicker">QUICK TABLE GAME</span><h2 id="cx-dice-title">Brew Dice</h2><p>Highest roll wins. Perfect while your coffee is being made.</p><div className="cx-dice-board"><article><span>You</span><strong>{playerRoll || "–"}</strong></article><b>VS</b><article><span>Green</span><strong>{houseRoll || "–"}</strong></article></div>{playerRoll && <strong className="cx-dice-result">{playerRoll === houseRoll ? "It’s a draw — roll again!" : playerRoll > houseRoll ? "You win this round!" : "Green wins — rematch?"}</strong>}<Button icon={Gamepad2} onClick={roll}>{playerRoll ? "Roll again" : "Roll the dice"}</Button>{playerRoll && <button className="cx-reset-game" onClick={() => { setPlayerRoll(null); setHouseRoll(null); }}><RotateCcw size={15} />Reset game</button>}<small>Interactive demo game • no scores are saved</small></section>}
  </div>;
}

function CustomerProfile({ account, onSwitchAccount, onLogout, notify }) {
  const [preferences, setPreferences] = useState(["Oat milk", "Usually iced"]);
  const [editOpen, setEditOpen] = useState(false);
  const [panel, setPanel] = useState(null);
  const [profile, setProfile] = useState({ name: account.name, email: account.email });
  const choices = ["Oat milk", "Usually iced", "No sugar", "Extra shot"];

  function togglePreference(choice) {
    setPreferences((current) => current.includes(choice) ? current.filter((item) => item !== choice) : [...current, choice]);
    notify(`${choice} preference updated`);
  }

  function saveProfile(event) {
    event.preventDefault();
    setEditOpen(false);
    notify("Profile changes saved in this demo");
  }

  return <div className="customer-subpage profile-page">
    <header className="customer-subpage-head"><span className="customer-kicker">YOUR SPACE</span><h1>Profile</h1><p>Preferences, contact details, and account access.</p></header>
    <div className="profile-page-grid">
      <section className="customer-profile-card"><Avatar initials={account.initials} size="xl" tone={0} online /><div><Badge tone="orange"><Trophy size={11} />{account.tier || "Gold"} member</Badge><h2>{profile.name}</h2><p>{profile.email}</p><span>Member since October 2024</span></div><button onClick={() => setEditOpen(true)}>Edit profile</button></section>
      <section className="customer-preference-card"><SectionTitle title="Coffee preferences" subtitle="Tap to improve recommendations" /><div>{choices.map((choice) => { const active = preferences.includes(choice); return <button key={choice} className={active ? "active" : ""} aria-pressed={active} onClick={() => togglePreference(choice)}>{active ? <Check size={14} /> : <Plus size={14} />}{choice}</button>; })}</div></section>
      <section className="profile-links">
        <button onClick={() => setPanel({ title: "Favorite items", eyebrow: "YOUR SHORTLIST", body: "Pistachio cloud and Matcha strawberry are saved. Tap the heart on any menu item to update this list." })}><Heart size={18} /><span><strong>Favorite items</strong><small>2 saved drinks</small></span><ChevronRight size={16} /></button>
        <button onClick={() => setPanel({ title: "Receipt history", eyebrow: "38 RECEIPTS SAVED", body: "Your latest receipt is GC-1021 from 8 July. Receipt export is represented as a concept in this interactive demo." })}><History size={18} /><span><strong>Receipt history</strong><small>38 synced receipts</small></span><ChevronRight size={16} /></button>
        <button onClick={() => setPanel({ title: "Payment methods", eyebrow: "DEMO WALLET", body: "Visa ending in 4242 is shown as a saved demo method. No real card data or payment is processed." })}><CreditCard size={18} /><span><strong>Payment methods</strong><small>1 saved card</small></span><ChevronRight size={16} /></button>
        <button onClick={() => setPanel({ title: "Help & feedback", eyebrow: "WE’RE LISTENING", body: "In production this opens WhatsApp or in-app support. For the demo, send a sample note to see the response." })}><MessageCircle size={18} /><span><strong>Help & feedback</strong><small>Talk to Green Coffee</small></span><ChevronRight size={16} /></button>
      </section>
      <section className="customer-account-actions"><button onClick={onSwitchAccount}><UsersRound size={18} /><span><strong>Switch demo account</strong><small>Preview another actor’s workspace</small></span><ChevronRight size={16} /></button><button onClick={onLogout}><LogOut size={18} /><span><strong>Sign out</strong><small>Return to the demo login</small></span><ChevronRight size={16} /></button></section>
    </div>
    {editOpen && <div className="cx-modal-layer"><button className="cx-modal-scrim" aria-label="Close profile editor" onClick={() => setEditOpen(false)} /><form className="cx-profile-editor" onSubmit={saveProfile}><button type="button" className="cx-modal-close" aria-label="Close" onClick={() => setEditOpen(false)}><X size={19} /></button><span className="customer-kicker">ACCOUNT DETAILS</span><h2>Edit your profile</h2><label><span>Name</span><input value={profile.name} onChange={(event) => setProfile((current) => ({ ...current, name: event.target.value }))} required /></label><label><span>Email</span><input type="email" value={profile.email} onChange={(event) => setProfile((current) => ({ ...current, email: event.target.value }))} required /></label><Button type="submit">Save changes</Button><small>Changes are stored only for this interactive preview.</small></form></div>}
    <InfoModal open={Boolean(panel)} title={panel?.title || ""} eyebrow={panel?.eyebrow || ""} onClose={() => setPanel(null)}><p>{panel?.body}</p><Button onClick={() => { if (panel?.title === "Help & feedback") notify("Sample feedback sent — thank you"); setPanel(null); }}>{panel?.title === "Help & feedback" ? "Send sample feedback" : "Done"}</Button></InfoModal>
  </div>;
}
