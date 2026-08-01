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
import "../styles/overlay-interactions.css";

function useEscape(onClose) {
  useEffect(() => {
    const listener = (event) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, [onClose]);
}

export function Modal({ open, onClose, title, description, children, className = "" }) {
  useEscape(onClose);
  if (!open) return null;
  return (
    <div className="modal-layer" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className={`modal-card ${className}`.trim()} role="dialog" aria-modal="true" aria-label={title}>
        <header className="modal-head">
          <div><h2>{title}</h2>{description && <p>{description}</p>}</div>
          <IconButton label="Close" onClick={onClose}><X size={19} /></IconButton>
        </header>
        {children}
      </section>
    </div>
  );
}

export function SearchPalette({ open, onClose, onNavigate, onQuick, allowedViews, allowedQuickActions }) {
  const [query, setQuery] = useState("");
  const quickItems = [
    { id: "quick-order", actionId: "order", label: "Add a counter order", subtitle: "Live orders", icon: ShoppingBag, action: () => onQuick("order") },
    { id: "quick-menu", actionId: "menu", label: "Add a menu item", subtitle: "Menu & QR", icon: Plus, action: () => onQuick("menu") },
    { id: "quick-res", actionId: "reservation", label: "Create a reservation", subtitle: "Reservations", icon: CalendarDays, action: () => onQuick("reservation") },
    { id: "quick-campaign", actionId: "campaign", label: "Launch a campaign", subtitle: "Campaigns", icon: Megaphone, action: () => onQuick("campaign") },
    { id: "quick-qr", actionId: "qr", label: "Generate a table QR", subtitle: "Floor plan", icon: QrCode, action: () => onQuick("qr") },
  ].filter((item) => allowedQuickActions.includes(item.actionId));
  const allowed = new Set(allowedViews);
  const pages = navigation.flatMap((group) => group.items).filter((item) => allowed.has(item.id)).map((item) => ({ ...item, subtitle: "Go to page", action: () => onNavigate(item.id) }));
  const matches = [...quickItems, ...pages].filter((item) => `${item.label} ${item.subtitle}`.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => { if (!open) setQuery(""); }, [open]);
  useEscape(onClose);
  if (!open) return null;

  return (
    <div className="modal-layer palette-layer" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="command-palette" role="dialog" aria-label="Search the workspace">
        <div className="palette-input"><Search size={20} /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search pages and actions…" /><kbd>ESC</kbd></div>
        <div className="palette-results">
          <span className="palette-label">{query ? `${matches.length} results` : "Suggested"}</span>
          {matches.map(({ id, label, subtitle, icon: Icon, action }) => (
            <button key={id} onClick={() => { action(); onClose(); }}>
              <span className="palette-icon"><Icon size={18} /></span>
              <span><strong>{label}</strong><small>{subtitle}</small></span>
              <ChevronRight size={16} />
            </button>
          ))}
          {matches.length === 0 && <div className="palette-empty"><Search size={24} /><strong>No matches</strong><span>Try a customer, feature, or page name.</span></div>}
        </div>
        <footer><span><kbd>↑</kbd><kbd>↓</kbd> to navigate</span><span><kbd>↵</kbd> to select</span></footer>
      </section>
    </div>
  );
}

const notifications = [
  { destination: "orders", icon: ShoppingBag, tone: "blue", title: "New QR order • Table 08", copy: "3 items • 32.500 TND • Paid online", time: "2 min" },
  { destination: "reservations", icon: CalendarDays, tone: "violet", title: "Reservation needs approval", copy: "Mehdi Ben Salem • 2 guests at 13:00", time: "8 min" },
  { destination: "menu", icon: Coffee, tone: "orange", title: "Tiramisu jars are running low", copy: "7 portions left • below your par level of 10", time: "21 min" },
  { destination: "marketing", icon: Star, tone: "green", title: "A new 5-star review", copy: "“The pistachio latte was perfect…”", time: "1 h" },
];

export function NotificationDrawer({ open, onClose, onNavigate, unread = 3, onMarkRead, allowedViews }) {
  const [tab, setTab] = useState("inbox");
  const allowed = new Set(allowedViews);
  const visibleNotifications = notifications.filter((item) => allowed.has(item.destination));
  const visibleUnread = Math.min(unread, visibleNotifications.length);
  useEscape(onClose);
  return (
    <>
      <aside className={`notification-drawer${open ? " open" : ""}`} aria-hidden={!open}>
        <header><div><h2>Notifications</h2><p>Everything that needs your attention.</p></div><IconButton label="Close notifications" onClick={onClose}><X size={19} /></IconButton></header>
        <div className="notification-tabs"><button className={tab === "inbox" ? "active" : ""} onClick={() => setTab("inbox")}>Inbox {visibleUnread > 0 && <b>{visibleUnread}</b>}</button><button className={tab === "activity" ? "active" : ""} onClick={() => setTab("activity")}>Activity</button></div>
        <div className="notification-list">
          {tab === "inbox" && visibleNotifications.map(({ destination, icon: Icon, tone, title, copy, time }, index) => (
            <button key={title} className={index < visibleUnread ? "unread" : ""} onClick={() => { onNavigate(destination); onClose(); }}>
              <span className={`notification-icon ${tone}`}><Icon size={18} /></span>
              <span><strong>{title}</strong><small>{copy}</small><time>{time} ago</time></span>
            </button>
          ))}
          {tab === "inbox" && visibleNotifications.length === 0 && <div className="palette-empty"><Bell size={24} /><strong>No notifications for this role</strong><span>Your focused inbox is clear.</span></div>}
          {tab === "activity" && <div className="notification-activity"><article><span className="notification-icon green"><Check size={17} /></span><span><strong>Table 08 order accepted</strong><small>Manager review • 4 minutes ago</small></span></article><article><span className="notification-icon violet"><UsersRound size={17} /></span><span><strong>Reservation updated</strong><small>Yasmine Trabelsi • 18 minutes ago</small></span></article><article><span className="notification-icon orange"><Coffee size={17} /></span><span><strong>Menu availability changed</strong><small>Tiramisu jar • 36 minutes ago</small></span></article></div>}
        </div>
        <footer>{tab === "inbox" ? <Button variant="secondary" onClick={onMarkRead}>{unread ? "Mark all as read" : "Inbox is clear"}</Button> : <span className="activity-caption">Demo activity updates as actions are simulated.</span>}</footer>
      </aside>
      {open && <button className="drawer-scrim" onClick={onClose} aria-label="Close notifications" />}
    </>
  );
}

export function QuickCreateModal({ type, onClose, onSubmit, initialValues = {}, menuItems = [] }) {
  const availableItems = menuItems.filter((item) => item.active);
  const [form, setForm] = useState({ name: "", price: "", category: "Signature", date: "", time: "", guests: "2", phone: "", audience: "Loyal regulars", channel: "WhatsApp", table: "T01", item: availableItems[0]?.name || "Pistachio cloud", quantity: "1", payment: "Pay at cashier", note: "", ...initialValues });
  const update = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));
  const config = {
    order: { title: "New counter order", description: "Add a staff-entered ticket directly to the live order board.", icon: ShoppingBag, submit: "Send to order board" },
    menu: { title: "Add a menu item", description: "Create a product now—you can add modifiers and translations later.", icon: Coffee, submit: "Add to menu" },
    reservation: { title: "New reservation", description: "Add a phone or walk-in booking to today’s calendar.", icon: CalendarDays, submit: "Create reservation" },
    campaign: { title: "Create a campaign", description: "Reach the right guests with a timely message.", icon: Megaphone, submit: "Save campaign" },
    qr: { title: "Generate table QR", description: "Create a unique table marker. Scanning it starts a short-lived ordering session.", icon: QrCode, submit: "Prepare table QR" },
  }[type];
  if (!config) return null;
  const Icon = config.icon;
  const submit = (event) => { event.preventDefault(); onSubmit(type, form); };

  return (
    <Modal open onClose={onClose} title={config.title} description={config.description} className="quick-modal">
      <form onSubmit={submit}>
        <div className="form-hero"><Icon size={22} /><span>Quick create</span></div>
        {type === "order" && (
          <div className="form-grid">
            <label><span>Table</span><select value={form.table} onChange={update("table")}>{Array.from({ length: 12 }, (_, i) => <option key={i}>T{String(i + 1).padStart(2, "0")}</option>)}</select></label>
            <label><span>Item</span><select value={form.item} onChange={update("item")}>{availableItems.map((item) => <option key={item.id}>{item.name}</option>)}</select></label>
            <label><span>Quantity</span><input type="number" min="1" max="20" value={form.quantity} onChange={update("quantity")} /></label>
            <label><span>Payment</span><select value={form.payment} onChange={update("payment")}><option>Pay at cashier</option><option>Paid • Cash</option><option>Paid • Card</option></select></label>
            <label className="span-2"><span>Customization / note</span><input value={form.note} onChange={update("note")} placeholder="No sugar, oat milk, sauce on the side…" /></label>
          </div>
        )}
        {type === "menu" && (
          <div className="form-grid">
            <label className="span-2"><span>Item name</span><input required autoFocus placeholder="e.g. Hazelnut cold brew" value={form.name} onChange={update("name")} /></label>
            <label><span>Category</span><select value={form.category} onChange={update("category")}><option>Signature</option><option>Coffee</option><option>Cold coffee</option><option>Slow coffee</option><option>Refreshers</option><option>Sandwiches</option><option>Snacks</option><option>Crêpes</option><option>Desserts</option><option>Bakery</option></select></label>
            <label><span>Price (TND)</span><input required type="number" min="0" step="0.5" placeholder="12.5" value={form.price} onChange={update("price")} /></label>
          </div>
        )}
        {type === "reservation" && (
          <div className="form-grid">
            <label className="span-2"><span>Guest name</span><input required autoFocus placeholder="Full name" value={form.name} onChange={update("name")} /></label>
            <label><span>Date</span><input required type="date" value={form.date} onChange={update("date")} /></label>
            <label><span>Time</span><input required type="time" value={form.time} onChange={update("time")} /></label>
            <label><span>Guests</span><input type="number" min="1" max="20" value={form.guests} onChange={update("guests")} /></label>
            <label><span>Phone</span><input placeholder="+216" value={form.phone} onChange={update("phone")} /></label>
          </div>
        )}
        {type === "campaign" && (
          <div className="form-grid">
            <label className="span-2"><span>Campaign name</span><input required autoFocus placeholder="e.g. Weekend happy hour" value={form.name} onChange={update("name")} /></label>
            <label><span>Audience</span><select value={form.audience} onChange={update("audience")}><option>Loyal regulars</option><option>Inactive 30d</option><option>Football fans</option><option>All opted-in guests</option></select></label>
            <label><span>Channel</span><select value={form.channel} onChange={update("channel")}><option>WhatsApp</option><option>Email</option><option>Push</option></select></label>
            <label className="span-2"><span>Message</span><textarea placeholder="Write something your guests will love…" rows="4" /></label>
          </div>
        )}
        {type === "qr" && (
          <div className="qr-create-layout">
            <div className="qr-demo"><QrPattern /><span>Permanent table marker</span></div>
            <div className="form-stack">
              <label><span>Table</span><select value={form.table} onChange={update("table")}>{Array.from({ length: 12 }, (_, i) => <option key={i}>T{String(i + 1).padStart(2, "0")}</option>)}</select></label>
              <label><span>Ordering session</span><input value="45-minute visit • starts on scan" readOnly /></label>
              <div className="form-note"><Zap size={16} /> Customer orders wait for staff acceptance; production also validates and expires the device session.</div>
            </div>
          </div>
        )}
        <footer className="modal-actions"><Button type="button" variant="ghost" onClick={onClose}>Cancel</Button><Button type="submit" icon={Check}>{config.submit}</Button></footer>
      </form>
    </Modal>
  );
}

export function QrPattern({ size = 132 }) {
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
    <svg className="qr-pattern" width={size} height={size} viewBox="0 0 13 13" aria-label="Sample QR code">
      <rect width="13" height="13" rx="1" fill="#fff" />
      {cells.map(([x, y]) => <rect key={`${x}-${y}`} x={x + .08} y={y + .08} width=".84" height=".84" rx=".08" fill="currentColor" />)}
    </svg>
  );
}

export function CustomerPreview({ open, onClose, menuItems }) {
  const [category, setCategory] = useState("Featured");
  const [cart, setCart] = useState({});
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const categories = ["Featured", "Coffee", "Cold drinks", "Sandwiches", "Crepes", "Desserts"];
  const visibleItems = useMemo(() => menuItems.filter((item) => {
    if (!item.active) return false;
    if (category === "Featured") return item.featured;
    return item.customerCategory === category;
  }).slice(0, 5), [category, menuItems]);
  const cartCount = Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  const total = menuItems.reduce((sum, item) => sum + (cart[item.id] || 0) * item.price, 0);
  const adjust = (id, delta) => setCart((current) => ({ ...current, [id]: Math.max(0, (current[id] || 0) + delta) }));
  useEscape(onClose);
  return (
    <>
      <aside className={`customer-preview${open ? " open" : ""}`} aria-hidden={!open}>
        <header className="preview-shell-head"><div><span>Customer view</span><small>Table 08 • live preview</small></div><IconButton label="Close customer preview" onClick={onClose}><X size={19} /></IconButton></header>
        <div className="phone-frame">
          <div className="phone-island" />
          <div className="customer-screen">
            <section className="customer-hero">
              <div className="customer-nav"><BrandMark compact /><span><Globe2 size={15} /> EN</span></div>
              <Badge tone="light" dot>Open until 23:00</Badge>
              <h2>Take a little<br /><em>pause.</em></h2>
              <p>Good coffee, playful moments, made for your table.</p>
              <div className="customer-meta"><span><MapPin size={13} /> La Marsa</span><span>★ 4.9 (286)</span></div>
            </section>
            <section className="loyalty-strip"><span className="loyalty-icon"><Gift size={18} /></span><span><strong>Welcome back, Mariem</strong><small>80 pts to your next free coffee</small></span><b>1,280 pts</b></section>
            <nav className="customer-categories">{categories.map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</nav>
            <section className="customer-menu-list">
              <div className="customer-menu-title"><div><span>Handpicked for you</span><h3>{category}</h3></div><Sparkles size={18} /></div>
              {visibleItems.map((item) => (
                <article className="customer-product" key={item.id}>
                  <div className={`customer-product-image ${item.tone}`}>{item.image ? <img src={item.image} alt={item.alt} loading="lazy" style={{ objectPosition: item.objectPosition }} /> : <span>{item.emoji}</span>}{item.featured && <i>Popular</i>}</div>
                  <div className="customer-product-copy"><h4>{item.name}</h4><p>{item.description}</p><strong>{item.price.toFixed(3)} TND</strong></div>
                  {(cart[item.id] || 0) === 0 ? (
                    <button className="product-add" onClick={() => adjust(item.id, 1)} aria-label={`Add ${item.name}`}><Plus size={17} /></button>
                  ) : (
                    <div className="quantity-stepper"><button onClick={() => adjust(item.id, -1)}><Minus size={13} /></button><b>{cart[item.id]}</b><button onClick={() => adjust(item.id, 1)}><Plus size={13} /></button></div>
                  )}
                </article>
              ))}
              {!visibleItems.length && <div className="palette-empty"><Coffee size={22} /><strong>No products in this preview category</strong><span>Choose another menu section.</span></div>}
            </section>
            {assistantOpen && <section className="preview-assistant"><header><strong>Green helper</strong><button onClick={() => setAssistantOpen(false)} aria-label="Close café assistant"><X size={14} /></button></header><p>Hi Mariem! I can help with allergens, coffee choices, or finding a game for your table.</p><div><button onClick={() => setCategory("Coffee")}>Recommend coffee</button><button onClick={() => setCategory("Dessert")}>See desserts</button></div></section>}
            <button className="chat-bubble" aria-label="Open café assistant" aria-expanded={assistantOpen} onClick={() => setAssistantOpen((value) => !value)}><MessageCircle size={20} /><i /></button>
            {cartCount > 0 && <button className="customer-cart" onClick={() => setCartOpen(true)}><span><b>{cartCount}</b> View my order</span><strong>{total.toFixed(3)} TND</strong></button>}
            {cartOpen && <section className="preview-cart-sheet"><header><span><strong>Your table order</strong><small>{cartCount} item{cartCount === 1 ? "" : "s"} • preview</small></span><button onClick={() => setCartOpen(false)} aria-label="Close order preview"><X size={15} /></button></header><div><span>Estimated total</span><strong>{total.toFixed(3)} TND</strong></div><button onClick={() => setCartOpen(false)}>Continue browsing</button><button onClick={() => { setCart({}); setCartOpen(false); }}>Clear preview order</button></section>}
          </div>
        </div>
      </aside>
      {open && <button className="drawer-scrim" aria-label="Close customer preview" onClick={onClose} />}
    </>
  );
}
