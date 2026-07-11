import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Coffee,
  CreditCard,
  Gamepad2,
  Gift,
  Heart,
  History,
  Home,
  LogOut,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Plus,
  QrCode,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  TicketCheck,
  Trash2,
  Trophy,
  UserRound,
  UsersRound,
  WalletCards,
  X,
} from "lucide-react";
import { events, menuItemsSeed, ordersSeed, reservationsSeed } from "../data/demoData";
import { usePersistentState } from "../hooks";
import { Avatar, Badge, BrandMark, Button, IconButton, Progress, SectionTitle } from "../components/ui";

const customerTabs = [
  { id: "menu", label: "Menu", icon: Coffee },
  { id: "orders", label: "My orders", icon: ShoppingBag },
  { id: "rewards", label: "Rewards", icon: Gift },
  { id: "reservations", label: "Bookings", icon: CalendarDays },
  { id: "events", label: "Events", icon: Gamepad2 },
  { id: "profile", label: "Profile", icon: UserRound },
];

const customerCategories = ["All", "Signature", "Cold coffee", "Slow coffee", "Desserts", "Bakery"];

export default function CustomerPortal({ account, onLogout, onSwitchAccount }) {
  const [activeTab, setActiveTab] = useState("menu");
  const [menuItems] = usePersistentState("green-os-menu-v2", menuItemsSeed);
  const [orders, setOrders] = usePersistentState("green-os-orders", ordersSeed);
  const [reservations, setReservations] = usePersistentState("green-os-reservations", reservationsSeed);
  const [cart, setCart] = usePersistentState(`green-customer-cart-${account.id}`, {});
  const [cartOpen, setCartOpen] = useState(false);
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [favoriteIds, setFavoriteIds] = usePersistentState(`green-customer-favorites-${account.id}`, [1, 5]);
  const [toast, setToast] = useState("");

  const activeItems = useMemo(() => menuItems.filter((item) => item.active), [menuItems]);
  const filteredItems = activeItems.filter((item) => (category === "All" || item.category === category) && item.name.toLowerCase().includes(query.toLowerCase()));
  const cartLines = activeItems.filter((item) => cart[item.id]).map((item) => ({ ...item, quantity: cart[item.id] }));
  const cartCount = cartLines.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartLines.reduce((total, item) => total + item.price * item.quantity, 0);
  const customerOrders = orders.filter((order) => order.customerId === account.id || order.guest === account.name);

  function notify(message) {
    setToast(message);
    window.clearTimeout(notify.timer);
    notify.timer = window.setTimeout(() => setToast(""), 2400);
  }

  function adjust(itemId, delta) {
    setCart((current) => {
      const next = Math.max(0, (current[itemId] || 0) + delta);
      const updated = { ...current, [itemId]: next };
      if (!next) delete updated[itemId];
      return updated;
    });
  }

  function toggleFavorite(itemId) {
    setFavoriteIds((current) => current.includes(itemId) ? current.filter((id) => id !== itemId) : [...current, itemId]);
  }

  function checkout() {
    if (!cartLines.length) return;
    const nextNumber = Math.max(1048, ...orders.map((item) => Number(item.id.replace("GC-", "")) || 0)) + 1;
    const order = {
      id: `GC-${nextNumber}`,
      customerId: account.id,
      table: "PICKUP",
      guest: account.name,
      source: "Customer app",
      time: "just now",
      total: cartTotal,
      status: "new",
      payment: "Paid online • Konnect",
      items: cartLines.map((item) => `${item.quantity}× ${item.name}`),
      note: "Pickup at the bar",
    };
    setOrders((current) => [order, ...current]);
    setCart({});
    setCartOpen(false);
    setActiveTab("orders");
    notify(`${order.id} is with the café team`);
  }

  const renderContent = () => {
    if (activeTab === "orders") return <CustomerOrders orders={customerOrders} onBrowse={() => setActiveTab("menu")} />;
    if (activeTab === "rewards") return <CustomerRewards account={account} />;
    if (activeTab === "reservations") return <CustomerReservations account={account} reservations={reservations} setReservations={setReservations} notify={notify} />;
    if (activeTab === "events") return <CustomerEvents notify={notify} />;
    if (activeTab === "profile") return <CustomerProfile account={account} onSwitchAccount={onSwitchAccount} onLogout={onLogout} />;
    return (
      <CustomerMenu
        items={filteredItems}
        category={category}
        setCategory={setCategory}
        query={query}
        setQuery={setQuery}
        cart={cart}
        adjust={adjust}
        favorites={favoriteIds}
        toggleFavorite={toggleFavorite}
        onOpenCart={() => setCartOpen(true)}
        cartCount={cartCount}
      />
    );
  };

  return (
    <div className="customer-portal">
      <header className="customer-portal-header">
        <button className="customer-brand" onClick={() => setActiveTab("menu")}><BrandMark /><span><strong>Green Coffee Games</strong><small><MapPin size={12} />La Marsa • Open until 23:00</small></span></button>
        <nav aria-label="Customer navigation">
          {customerTabs.map(({ id, label }) => <button key={id} className={activeTab === id ? "active" : ""} aria-current={activeTab === id ? "page" : undefined} onClick={() => setActiveTab(id)}>{label}</button>)}
        </nav>
        <div className="customer-header-actions">
          <button className="customer-points" onClick={() => setActiveTab("rewards")}><Gift size={17} /><span><strong>{account.points?.toLocaleString() || "1,280"}</strong><small>points</small></span></button>
          <IconButton label="Notifications"><Bell size={18} /></IconButton>
          <button className="customer-account-button" onClick={() => setActiveTab("profile")}><Avatar initials={account.initials} tone={0} /><span><strong>{account.firstName}</strong><small>{account.tier || "Gold"} member</small></span></button>
        </div>
      </header>

      <main className="customer-portal-main">{renderContent()}</main>

      <nav className="customer-mobile-nav" aria-label="Customer mobile navigation">
        {customerTabs.slice(0, 5).map(({ id, label, icon: Icon }) => <button key={id} className={activeTab === id ? "active" : ""} onClick={() => setActiveTab(id)}><Icon size={20} /><span>{label.replace("My ", "")}</span></button>)}
      </nav>

      {cartCount > 0 && activeTab === "menu" && <button className="floating-customer-cart" onClick={() => setCartOpen(true)}><span><b>{cartCount}</b><ShoppingBag size={18} />View basket</span><strong>{cartTotal.toFixed(3)} TND</strong></button>}
      <CustomerCart open={cartOpen} onClose={() => setCartOpen(false)} lines={cartLines} adjust={adjust} total={cartTotal} onCheckout={checkout} />
      <div className={`customer-toast${toast ? " show" : ""}`} role="status"><CheckCircle2 size={17} />{toast}</div>
    </div>
  );
}

function CustomerMenu({ items, category, setCategory, query, setQuery, cart, adjust, favorites, toggleFavorite, cartCount }) {
  return (
    <div className="customer-menu-page">
      <section className="customer-store-hero">
        <div className="store-hero-copy"><Badge tone="light" dot>Made fresh in La Marsa</Badge><h1>Your favorite pause,<br /><em>ready when you are.</em></h1><p>Signature coffee, slow brews, fresh bakes—and something playful for every table.</p><div><button onClick={() => document.getElementById("customer-menu-grid")?.scrollIntoView({ behavior: "smooth" })}>Order something lovely <ArrowRight size={16} /></button><span><Star size={15} fill="currentColor" />4.9 from 286 guests</span></div></div>
        <div className="store-hero-products" aria-hidden="true"><figure className="hero-product large"><img src="/menu/pistachio-cloud.webp" alt="" /></figure><figure className="hero-product small top"><img src="/menu/tiramisu-jar.webp" alt="" /></figure><figure className="hero-product small bottom"><img src="/menu/matcha-strawberry.webp" alt="" /></figure><span className="hero-product-label"><Sparkles size={14} /><b>Today’s pick</b>Pistachio cloud</span></div>
      </section>

      <section className="customer-reward-banner"><span className="reward-banner-icon"><Gift size={22} /></span><div><strong>You’re 80 points from a free drink</strong><span>One more visit could do it.</span></div><Progress value={92} tone="lime" /><button>See my rewards <ChevronRight size={16} /></button></section>

      <section className="customer-menu-section" id="customer-menu-grid">
        <div className="customer-menu-heading"><div><span className="customer-kicker">THE GREEN MENU</span><h2>Find your next favorite.</h2><p>Every drink can be made just the way you like it.</p></div><div className="customer-menu-search"><Search size={18} /><input aria-label="Search the menu" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search coffee, dessert…" /></div></div>
        <div className="customer-category-tabs" role="tablist" aria-label="Menu categories">{customerCategories.map((item) => <button role="tab" aria-selected={category === item} key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div>
        <div className="customer-product-grid">
          {items.map((item) => (
            <article className="store-product-card" key={item.id}>
              <div className="store-product-photo"><img src={item.image} alt={item.alt} loading="lazy" width="640" height="640" style={{ objectPosition: item.objectPosition }} />{item.featured && <Badge tone="light"><Sparkles size={11} />Popular</Badge>}<button className={favorites.includes(item.id) ? "favorite active" : "favorite"} onClick={() => toggleFavorite(item.id)} aria-label={`${favorites.includes(item.id) ? "Remove" : "Add"} ${item.name} ${favorites.includes(item.id) ? "from" : "to"} favorites`} aria-pressed={favorites.includes(item.id)}><Heart size={18} fill={favorites.includes(item.id) ? "currentColor" : "none"} /></button></div>
              <div className="store-product-copy"><span>{item.category}</span><h3>{item.name}</h3><p>{item.description}</p><div className="store-product-tags">{item.tags.map((tag) => <small key={tag}>{tag}</small>)}</div><div className="store-product-foot"><strong>{item.price.toFixed(3)} TND</strong>{(cart[item.id] || 0) === 0 ? <button onClick={() => adjust(item.id,1)}><Plus size={17} />Add</button> : <div className="store-quantity"><button aria-label={`Remove one ${item.name}`} onClick={() => adjust(item.id,-1)}><Minus size={15} /></button><b>{cart[item.id]}</b><button aria-label={`Add one ${item.name}`} onClick={() => adjust(item.id,1)}><Plus size={15} /></button></div>}</div></div>
            </article>
          ))}
        </div>
        {!items.length && <div className="customer-menu-empty"><Search size={25} /><strong>Nothing found</strong><p>Try another search or menu category.</p></div>}
      </section>
    </div>
  );
}

function CustomerCart({ open, onClose, lines, adjust, total, onCheckout }) {
  return <><aside className={`customer-cart-drawer${open ? " open" : ""}`} aria-hidden={!open}><header><div><span>Your order</span><h2>A lovely choice.</h2><p>Pickup at the Green Coffee bar</p></div><IconButton label="Close basket" onClick={onClose}><X size={20} /></IconButton></header><div className="customer-cart-lines">{lines.map((item) => <article key={item.id}><img src={item.image} alt="" style={{ objectPosition: item.objectPosition }} /><div><strong>{item.name}</strong><small>Regular • As listed</small><span>{(item.price * item.quantity).toFixed(3)} TND</span></div><div className="store-quantity"><button aria-label={`Remove one ${item.name}`} onClick={() => adjust(item.id,-1)}><Minus size={14} /></button><b>{item.quantity}</b><button aria-label={`Add one ${item.name}`} onClick={() => adjust(item.id,1)}><Plus size={14} /></button></div></article>)}{!lines.length && <div className="empty-customer-cart"><ShoppingBag size={28} /><strong>Your basket is empty</strong><span>Something delicious is waiting on the menu.</span></div>}</div>{lines.length > 0 && <footer><div><span>Subtotal</span><strong>{total.toFixed(3)} TND</strong></div><div><span>Service</span><strong>0.000 TND</strong></div><div className="cart-total"><span>Total</span><strong>{total.toFixed(3)} TND</strong></div><button onClick={onCheckout}><LockKeyholeIcon />Pay securely <ArrowRight size={17} /></button><small><CreditCard size={13} />Konnect • Flouci • Card</small></footer>}</aside>{open && <button className="drawer-scrim" onClick={onClose} aria-label="Close basket" />}</>;
}

function LockKeyholeIcon() { return <CreditCard size={17} />; }

function CustomerOrders({ orders, onBrowse }) {
  const active = orders.find((order) => order.status !== "served");
  return <div className="customer-subpage"><header className="customer-subpage-head"><span className="customer-kicker">ORDER HISTORY</span><h1>My orders</h1><p>Track what’s being made and revisit your favorites.</p></header>{active ? <section className="customer-active-order"><div className="active-order-top"><span className="order-live-icon"><Coffee size={22} /><i /></span><div><Badge tone={active.status === "new" ? "blue" : active.status === "making" ? "orange" : "green"} dot>{active.status === "new" ? "Order received" : active.status === "making" ? "Being prepared" : "Ready for pickup"}</Badge><h2>{active.status === "ready" ? "Your order is ready." : "We’re making something good."}</h2><p>{active.id} • Pickup at the bar • {active.time}</p></div><strong>{active.total.toFixed(3)} TND</strong></div><div className="customer-order-progress"><div className="done"><i><Check size={14} /></i><span><strong>Confirmed</strong><small>Payment accepted</small></span></div><b /><div className={active.status !== "new" ? "done" : "current"}><i><Coffee size={14} /></i><span><strong>Preparing</strong><small>At the barista station</small></span></div><b /><div className={active.status === "ready" ? "done" : ""}><i><ShoppingBag size={14} /></i><span><strong>Ready</strong><small>We’ll let you know</small></span></div></div><div className="customer-order-items">{active.items.map((item) => <span key={item}>{item}</span>)}</div></section> : <section className="customer-empty-state"><span><ShoppingBag size={30} /></span><h2>No active order—yet.</h2><p>Your next favorite is only a few taps away.</p><Button icon={Coffee} onClick={onBrowse}>Browse the menu</Button></section>}<section className="past-orders"><SectionTitle title="Past orders" subtitle="Receipts, points and quick reorders" /><article><span className="past-order-date"><b>08</b>JUL</span><div><strong>Pistachio cloud + Tiramisu jar</strong><small>GC-1021 • 25.000 TND • +250 points</small></div><Badge tone="green">Completed</Badge><button onClick={onBrowse}>Order again <ChevronRight size={15} /></button></article><article><span className="past-order-date"><b>02</b>JUL</span><div><strong>Matcha strawberry</strong><small>GC-0987 • 15.000 TND • +150 points</small></div><Badge tone="green">Completed</Badge><button onClick={onBrowse}>Order again <ChevronRight size={15} /></button></article></section></div>;
}

function CustomerRewards({ account }) {
  return <div className="customer-subpage"><header className="customer-subpage-head"><span className="customer-kicker">GREEN REWARDS</span><h1>Your rituals, rewarded.</h1><p>Earn 10 points for every dinar and keep every treat in one place.</p></header><section className="rewards-hero"><div><Badge tone="light"><Trophy size={12} />{account.tier || "Gold"} member</Badge><h2>{(account.points || 1280).toLocaleString()}</h2><span>available points</span><p>80 points until your next free signature drink.</p><Progress value={92} tone="lime" /></div><span className="rewards-card-art"><Gift size={46} /><b>GREEN<br />REWARDS</b><i>•••• 1280</i></span></section><div className="reward-grid"><article><span className="reward-photo"><img src="/menu/pistachio-cloud.webp" alt="Pistachio cloud reward" /></span><Badge tone="green">READY TO USE</Badge><h3>Free signature drink</h3><p>Your Gold reward. Valid on any signature drink.</p><button>Use reward <ArrowRight size={15} /></button></article><article><span className="reward-icon orange"><Clock3 size={25} /></span><Badge tone="orange">HAPPY HOUR</Badge><h3>20% off from 14:00</h3><p>Weekdays, 14:00–17:00. Applied automatically.</p><button>View details <ChevronRight size={15} /></button></article><article><span className="reward-icon purple"><UsersRound size={25} /></span><Badge tone="purple">REFER A FRIEND</Badge><h3>150 points for both</h3><p>Share your code when a friend joins Green Rewards.</p><button>Share my invite <ArrowRight size={15} /></button></article></div><section className="receipt-sync"><span><QrCode size={23} /></span><div><h3>Have a paper receipt?</h3><p>Scan its QR to save the receipt and credit your points automatically.</p></div><button><QrCode size={16} />Scan receipt</button></section></div>;
}

function CustomerReservations({ account, reservations, setReservations, notify }) {
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState({ date: "2026-07-18", time: "18:30", guests: 2, note: "" });
  const ownReservations = reservations.filter((item) => item.customerId === account.id || item.name === account.name);
  function create(event) { event.preventDefault(); const reservation = { id: Date.now(), customerId: account.id, name: account.name, initials: account.initials, time: form.time, date: form.date, guests: Number(form.guests), table: "—", status: "pending", note: form.note || "Customer app request", phone: "+216 22 456 880" }; setReservations((current) => [reservation,...current]); setFormOpen(false); notify("Reservation request sent to the café"); }
  return <div className="customer-subpage"><header className="customer-subpage-head with-action"><div><span className="customer-kicker">YOUR TABLE</span><h1>Bookings</h1><p>Plan a coffee, a game night, or the big match.</p></div><Button icon={Plus} onClick={() => setFormOpen(true)}>New booking</Button></header><section className="upcoming-customer-booking"><div className="booking-date-block"><span>SAT</span><strong>18</strong><small>JUL</small></div><div><Badge tone="green" dot>Confirmed</Badge><h2>Table for 4 at 18:30</h2><p><MapPin size={14} />Green Coffee Games • Window table</p><span>Reminder scheduled for 16:30</span></div><div><button>Modify</button><button>Cancel</button></div></section>{ownReservations.length > 0 && <section className="customer-request-list"><SectionTitle title="Requests" subtitle="Waiting for the café team" />{ownReservations.map((item) => <article key={item.id}><CalendarDays size={19} /><span><strong>{item.date} at {item.time}</strong><small>{item.guests} guests • {item.note}</small></span><Badge tone={item.status === "confirmed" ? "green" : "orange"}>{item.status}</Badge></article>)}</section>}<section className="booking-ideas"><article className="football"><span>⚽</span><div><Badge tone="light">EVENT BOOKING</Badge><h3>Champions League final</h3><p>Saturday • 20:00 • 14 seats left</p></div><button>Reserve <ArrowRight size={15} /></button></article><article className="games"><Gamepad2 size={27} /><div><h3>Book a game table</h3><p>40+ games ready to play.</p></div><button>Explore <ChevronRight size={15} /></button></article></section>{formOpen && <div className="customer-form-modal"><form onSubmit={create}><header><div><span>New reservation</span><h2>Save your table.</h2></div><IconButton type="button" label="Close" onClick={() => setFormOpen(false)}><X size={19} /></IconButton></header><div className="form-grid"><label><span>Date</span><input type="date" value={form.date} onChange={(event) => setForm({...form,date:event.target.value})} /></label><label><span>Time</span><input type="time" value={form.time} onChange={(event) => setForm({...form,time:event.target.value})} /></label><label><span>Guests</span><input type="number" min="1" max="12" value={form.guests} onChange={(event) => setForm({...form,guests:event.target.value})} /></label><label className="span-2"><span>Anything we should know?</span><textarea rows="3" value={form.note} onChange={(event) => setForm({...form,note:event.target.value})} /></label></div><Button type="submit" icon={CalendarDays}>Send request</Button></form></div>}</div>;
}

function CustomerEvents({ notify }) {
  return <div className="customer-subpage"><header className="customer-subpage-head"><span className="customer-kicker">MORE THAN COFFEE</span><h1>What’s happening</h1><p>Big matches, friendly competition, and family time.</p></header><section className="customer-event-feature"><div><Badge tone="light">SATURDAY • 20:00</Badge><h2>The final,<br />on the big screen.</h2><p>Champions League final • live at Green Coffee</p><span><UsersRound size={15} />46 of 60 seats booked</span><button onClick={() => notify("Your event seat is reserved")}>Reserve my seat <ArrowRight size={16} /></button></div><span>⚽</span></section><div className="customer-event-grid">{events.slice(1).map((event,index) => <article key={event.title}><div className={`event-photo ${index ? "kids" : "games"}`}>{index ? <span>★</span> : <Gamepad2 size={42} />}</div><Badge tone={index ? "purple" : "orange"}>{event.type}</Badge><h3>{event.title}</h3><p>{event.date} • {event.time}</p><div><span><UsersRound size={14} />{event.bookings}/{event.capacity} booked</span><button onClick={() => notify(`Seat requested for ${event.title}`)}>Join <ChevronRight size={15} /></button></div></article>)}<article className="games-library-event"><DiceCards /><h3>Explore 40+ games</h3><p>See what’s available before your next visit.</p><button>Open games menu <ArrowRight size={15} /></button></article></div></div>;
}

function DiceCards() { return <span className="dice-cards"><Gamepad2 size={35} /></span>; }

function CustomerProfile({ account, onSwitchAccount, onLogout }) {
  return <div className="customer-subpage profile-page"><header className="customer-subpage-head"><span className="customer-kicker">YOUR SPACE</span><h1>Profile</h1><p>Preferences, contact details, and account access.</p></header><div className="profile-page-grid"><section className="customer-profile-card"><Avatar initials={account.initials} size="xl" tone={0} online /><div><Badge tone="orange"><Trophy size={11} />{account.tier || "Gold"} member</Badge><h2>{account.name}</h2><p>{account.email}</p><span>Member since October 2024</span></div><button>Edit profile</button></section><section className="customer-preference-card"><SectionTitle title="Coffee preferences" subtitle="Used for smarter recommendations" /><div><button className="active"><Check size={14} />Oat milk</button><button className="active"><Check size={14} />Usually iced</button><button><Plus size={14} />No sugar</button><button><Plus size={14} />Extra shot</button></div></section><section className="profile-links"><button><Heart size={18} /><span><strong>Favorite items</strong><small>2 saved drinks</small></span><ChevronRight size={16} /></button><button><History size={18} /><span><strong>Receipt history</strong><small>38 synced receipts</small></span><ChevronRight size={16} /></button><button><CreditCard size={18} /><span><strong>Payment methods</strong><small>1 saved card</small></span><ChevronRight size={16} /></button><button><MessageCircle size={18} /><span><strong>Help & feedback</strong><small>Talk to Green Coffee</small></span><ChevronRight size={16} /></button></section><section className="customer-account-actions"><button onClick={onSwitchAccount}><UsersRound size={18} /><span><strong>Switch demo account</strong><small>Preview another actor’s workspace</small></span><ChevronRight size={16} /></button><button onClick={onLogout}><LogOut size={18} /><span><strong>Sign out</strong><small>Return to the demo login</small></span><ChevronRight size={16} /></button></section></div></div>;
}
