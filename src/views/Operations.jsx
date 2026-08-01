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
import "../styles/admin-interactions.css";

const orderColumns = [
  { id: "new", title: "Awaiting acceptance", tone: "blue", empty: "No orders waiting" },
  { id: "making", title: "In preparation", tone: "orange", empty: "Nothing being prepared" },
  { id: "ready", title: "Ready to serve", tone: "green", empty: "Nothing waiting" },
];

const statusLabel = { new: "Needs acceptance", making: "Preparing", ready: "Ready" };

function OrderTicket({ order, onAdvance, onSelect, compact = false, canAdvance = true, showFinancials = true }) {
  const nextLabel = order.status === "new" ? "Accept & prepare" : order.status === "making" ? "Mark ready" : "Serve order";
  return (
    <article className={`order-ticket ${order.status}${compact ? " compact" : ""}`} onClick={() => onSelect(order)}>
      <header>
        <div><Badge tone={order.status === "new" ? "blue" : order.status === "making" ? "orange" : "green"} dot>{statusLabel[order.status]}</Badge><span className="ticket-time"><Clock3 size={13} />{order.time} ago</span></div>
        <IconButton label="Order options" onClick={(event) => { event.stopPropagation(); onSelect(order); }}><MoreHorizontal size={17} /></IconButton>
      </header>
      <div className="ticket-identity"><span className="ticket-table">{order.table}</span><div><strong>{order.guest}</strong><small>{order.id} • {order.source}</small></div>{showFinancials && <strong className="ticket-total">{order.total.toFixed(3)}</strong>}</div>
      <ul>{order.items.map((item) => <li key={item}>{item}</li>)}</ul>
      {order.note && <div className="ticket-note"><MessageCircle size={14} />{order.note}</div>}
      {showFinancials && <div className="ticket-payment"><CreditCard size={14} /><span>{order.payment}</span>{order.payment.includes("Paid") && <Check size={14} />}</div>}
      {canAdvance && <button className={`ticket-action ${order.status}`} onClick={(event) => { event.stopPropagation(); onAdvance(order.id); }}>{nextLabel}<ArrowRight size={15} /></button>}
    </article>
  );
}

export function OrdersView({ orders, onAdvanceOrder, onQuick, account, canCreateOrder = true, canAdvanceOrder = () => true, canViewFinancials = true, initialDisplay = "board" }) {
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
    <div className="view operations-view">
      <PageHeader eyebrow="Operations" title="Live orders" description="Every table, every ticket, perfectly in sync."
        actions={<><Button variant="secondary" icon={Eye} onClick={() => setDisplay(display === "kds" ? "board" : "kds")}>{display === "kds" ? "Board view" : "Barista display"}</Button>{canCreateOrder && <Button icon={Plus} onClick={() => onQuick("order")}>New order</Button>}</>}
      />

      <section className="order-metrics">
        <Card><span className="metric-icon blue"><PackageOpen size={18} /></span><div><small>Open tickets</small><strong>{activeOrders.length}</strong></div><MetricDelta>↓ 8%</MetricDelta></Card>
        <Card><span className="metric-icon orange"><Clock3 size={18} /></span><div><small>Average prep</small><strong>8m 24s</strong></div><Badge tone="green">On target</Badge></Card>
        <Card><span className="metric-icon green"><CheckCircle2 size={18} /></span><div><small>Completed today</small><strong>143</strong></div><MetricDelta>↑ 12%</MetricDelta></Card>
        {canViewFinancials ? <Card><span className="metric-icon purple"><CircleDollarSign size={18} /></span><div><small>Order value</small><strong>16.800 TND</strong></div><MetricDelta>↑ 4.2%</MetricDelta></Card> : <Card><span className="metric-icon purple"><Coffee size={18} /></span><div><small>Barista station</small><strong>BAR 01</strong><p>{account.firstName} • On shift</p></div><Badge tone="green" dot>Connected</Badge></Card>}
      </section>

      <section className={`orders-workspace ${display === "kds" ? "kds-mode" : ""}`}>
        <div className="orders-toolbar">
          <Segmented label="Filter orders" value={filter} onChange={setFilter} options={[
            { value: "all", label: "All", count: activeOrders.length }, { value: "new", label: "Awaiting", count: newCount }, { value: "making", label: "Preparing", count: makingCount }, { value: "ready", label: "Ready", count: readyCount },
          ]} />
          <div className="orders-toolbar-right"><span className="live-sync"><i />Interactive demo queue</span></div>
        </div>
        {display === "kds" && <div className="kds-banner"><Zap size={18} /><div><strong>Barista display mode</strong><span>High-contrast tickets, large timers, and one-tap progress.</span></div><Badge tone="dark">STATION 01</Badge></div>}
        <div className="order-board">
          {orderColumns.map((column) => {
            const columnOrders = filtered.filter((order) => order.status === column.id);
            return (
              <section className={`order-column ${column.tone}`} key={column.id}>
                <header><div><i /><strong>{column.title}</strong><span>{columnOrders.length}</span></div><span>{column.id === "new" ? "Accept within 2 min" : column.id === "making" ? "Target • 10 min" : "Call ticket number"}</span></header>
                <div className="ticket-stack">
                  {columnOrders.map((order) => <OrderTicket key={order.id} order={order} onAdvance={onAdvanceOrder} onSelect={(item) => { setSelected(item); setReceiptVisible(false); }} compact={display === "kds"} canAdvance={canAdvanceOrder(order)} showFinancials={canViewFinancials} />)}
                  {columnOrders.length === 0 && <div className="empty-column"><CheckCircle2 size={24} /><strong>{column.empty}</strong><span>The board is up to date.</span></div>}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      {selected && (
        <aside className="detail-panel open">
          <header><div><Badge tone={selected.status === "new" ? "blue" : selected.status === "making" ? "orange" : "green"} dot>{statusLabel[selected.status]}</Badge><h2>Order {selected.id}</h2><p>{selected.source} • {selected.time} ago</p></div><IconButton label="Close order details" onClick={() => setSelected(null)}><X size={19} /></IconButton></header>
          <div className="detail-body">
            <div className="order-detail-table"><span>{selected.table}</span><div><strong>{selected.guest}</strong><small>{selected.sessionId || selected.source?.includes("QR") ? "Table session verified" : "Staff-entered waiter order"}</small></div><LockKeyhole size={17} /></div>
            <section><h3>Items</h3>{selected.items.map((item) => <div className="detail-line" key={item}><span>{item}</span><strong>—</strong></div>)}</section>
            {selected.note && <section><h3>Guest note</h3><div className="detail-note"><MessageCircle size={16} />{selected.note}</div></section>}
            {canViewFinancials && <section><h3>Payment</h3><div className="payment-detail"><CreditCard size={17} /><div><strong>{selected.payment}</strong><small>Payment status verified</small></div><CheckCircle2 size={17} /></div></section>}
            {canViewFinancials && receiptVisible && <section className="admin-inline-editor"><h3>Receipt preview</h3>{selected.items.map((item) => <div className="detail-line" key={`receipt-${item}`}><span>{item}</span><strong>Included</strong></div>)}<div className="detail-line"><strong>Total</strong><strong>{selected.total.toFixed(3)} TND</strong></div><p>This is an on-screen demo receipt; printing and fiscal records require the production checkout service.</p></section>}
            <section><h3>Timeline</h3><ol className="order-history"><li className="done"><i /><span><strong>Order received</strong><small>via {selected.source}</small></span><time>{selected.time} ago</time></li><li className={selected.status !== "new" ? "done" : ""}><i /><span><strong>{selected.status === "new" ? "Awaiting staff acceptance" : "Accepted and preparing"}</strong><small>{selected.status === "new" ? "Accept before the order reaches the barista queue" : "Barista station"}</small></span></li><li className={selected.status === "ready" ? "done" : ""}><i /><span><strong>Ready to serve</strong><small>Customer display notified</small></span></li></ol></section>
          </div>
          <footer>{canViewFinancials && <Button variant="secondary" icon={ReceiptText} onClick={() => setReceiptVisible((current) => !current)}>{receiptVisible ? "Hide receipt" : "Receipt preview"}</Button>}{canAdvanceOrder(selected) && <Button icon={ArrowRight} onClick={() => { onAdvanceOrder(selected.id); setSelected(null); }}>{selected.status === "new" ? "Accept & prepare" : selected.status === "making" ? "Mark ready" : "Complete"}</Button>}</footer>
        </aside>
      )}
      {selected && <button className="drawer-scrim" onClick={() => setSelected(null)} aria-label="Close order details" />}
    </div>
  );
}

const coreCategories = ["Signature", "Hot coffee", "Cold coffee", "Slow coffee", "Desserts", "Bakery"];

export function MenuView({ menuItems, onToggleMenuItem, onQuick, onPreview, canEdit = true, canAdd = true, canPreview = true, canToggleAvailability = true }) {
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
  const filtered = displayItems.filter((item) => (category === "All items" || item.category === category) && item.name.toLowerCase().includes(query.toLowerCase()) && (!lowStockOnly || item.stock <= 7));
  const activeCount = displayItems.filter((item) => item.active).length;

  function openEditor(item) {
    setSelected(item.id);
    setDraft({ ...item });
  }

  function closeEditor() {
    setSelected(null);
    setDraft(null);
  }

  function saveItem() {
    const { name, description, price, stock, category } = draft;
    setItemOverrides((current) => ({ ...current, [selected]: { name, description, price, stock, category } }));
    setNotice(`${draft.name} was updated for this demo session.`);
    closeEditor();
  }

  return (
    <div className="view menu-view">
      <PageHeader eyebrow="Sell beautifully" title="Menu & QR" description="Products, availability, modifiers, and your customer-facing menu."
        actions={<>{canPreview && <Button variant="secondary" icon={Eye} onClick={onPreview}>Preview menu</Button>}{canAdd && <Button icon={Plus} onClick={() => onQuick("menu")}>Add item</Button>}</>}
      />
      {notice && <div className="admin-notice" role="status"><Check size={16} /><span>{notice}</span><button onClick={() => setNotice("")} aria-label="Dismiss message"><X size={15} /></button></div>}
      <section className="menu-summary-grid">
        <Card className="menu-health"><div className="menu-health-ring"><strong>94</strong><span>menu score</span></div><div><Badge tone="green" dot>Excellent</Badge><h3>Your menu is ready to sell.</h3><p>{activeCount} live products • 1 low-stock item • 2 AI tips</p></div></Card>
        <Card className="qr-menu-card"><span className="qr-card-icon"><QrCode size={24} /></span><div><Badge tone="blue">QR MENU</Badge><h3>1,284 scans this week</h3><p>+18% versus the previous week</p></div><button onClick={() => onQuick("qr")}>Manage QR <ChevronRight size={15} /></button></Card>
        <Card className="ai-menu-card"><span><Sparkles size={20} /></span><div><h3>{canEdit ? "Make every item irresistible" : "Stock focus for this shift"}</h3><p>{canEdit ? "Preview a richer product description before saving it locally." : "One item is low and one is currently unavailable."}</p></div>{canEdit && <button onClick={() => openEditor(displayItems[0])}>Review suggestion</button>}</Card>
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
              <button className={`menu-product-image ${item.tone}`} type="button" disabled={!canEdit} onClick={canEdit ? () => openEditor(item) : undefined} aria-label={canEdit ? `Edit ${item.name}` : `${item.name} product image`}>{item.image ? <img src={item.image} alt={item.alt} loading="lazy" width="640" height="480" style={{ objectPosition: item.objectPosition }} /> : <span>{item.emoji}</span>}{item.featured && <Badge tone="dark"><Star size={10} fill="currentColor" /> Featured</Badge>}{item.stock <= 7 && <i>{item.stock === 0 ? "Out of stock" : `${item.stock} left`}</i>}</button>
              <div className="menu-product-body"><div className="product-title-row"><div><span>{item.category}</span><h3>{item.name}</h3></div>{canEdit && <IconButton label={`Edit ${item.name}`} onClick={() => openEditor(item)}><Edit3 size={16} /></IconButton>}</div><p>{item.description}</p><div className="product-tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="product-card-foot"><strong>{item.price.toFixed(3)} TND</strong><span>{item.stock} in stock</span>{canToggleAvailability && <Toggle checked={item.active} onChange={() => onToggleMenuItem(item.id)} label={`Toggle ${item.name} availability`} />}</div></div>
            </article>
          ))}
        </div>
        {filtered.length === 0 && <div className="menu-empty"><Search size={24} /><strong>No menu items found</strong><span>Try another category or search.</span></div>}
      </Card>

      {selected && draft && (
        <aside className="detail-panel open menu-editor">
          <header><div><Badge tone="green">Local demo editor</Badge><h2>{draft.name}</h2><p>Preview changes without writing to a backend.</p></div><IconButton label="Close menu editor" onClick={closeEditor}><X size={19} /></IconButton></header>
          <div className="detail-body">
            <div className={`editor-image ${draft.tone}`}>{draft.image ? <img src={draft.image} alt={draft.alt} style={{ objectPosition: draft.objectPosition }} /> : <span>{draft.emoji}</span>}<button onClick={() => setNotice("Image picker preview opened — uploads need persistent storage in production.")}><ImagePlus size={16} />Replace image</button></div>
            <div className="form-stack"><label><span>Product name</span><input value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} /></label><label><span>Description</span><textarea rows="4" value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} /></label><button className="ai-writing" onClick={() => setDraft({ ...draft, description: `${draft.description} Made to order and served fresh, with a balanced finish.` })}><Sparkles size={17} /><span><strong>Preview polished copy</strong><small>Add a richer customer-facing description</small></span><ChevronRight size={15} /></button><div className="form-grid"><label><span>Price (TND)</span><input type="number" step="0.001" value={draft.price} onChange={(event) => setDraft({ ...draft, price: Number(event.target.value) })} /></label><label><span>Stock today</span><input type="number" value={draft.stock} onChange={(event) => setDraft({ ...draft, stock: Number(event.target.value) })} /></label></div><label><span>Category</span><select value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value })}>{categories.slice(1).map((item) => <option key={item}>{item}</option>)}</select></label></div>
            <section><h3>Options & modifiers</h3><div className="modifier-row"><span><strong>Milk choice</strong><small>Whole, oat, almond</small></span><button onClick={() => setNotice("Milk choices are ready to edit in the full modifier workflow.")}>Preview</button></div><div className="modifier-row"><span><strong>Temperature</strong><small>Hot or iced</small></span><button onClick={() => setNotice("Temperature choices are ready to edit in the full modifier workflow.")}>Preview</button></div><button className="add-modifier" onClick={() => setNotice("A new modifier group would be added here in production.")}><Plus size={15} /> Add modifier group</button></section>
          </div>
          <footer><Button variant="danger" icon={Trash2} onClick={() => { setHiddenIds((current) => [...current, selected]); setNotice(`${draft.name} was removed from this demo session.`); closeEditor(); }}>Remove from demo</Button><Button icon={Check} onClick={saveItem}>Save preview</Button></footer>
        </aside>
      )}
      {selected && <button className="drawer-scrim" onClick={closeEditor} aria-label="Close menu editor" />}
    </div>
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
    <div className="view reservations-view">
      <PageHeader eyebrow="Guest planning" title="Reservations" description="A calm, complete view of every booking, reminder, and waitlist guest."
        actions={<>{canExport && <Button variant="secondary" icon={Download} onClick={() => setNotice("Reservation export preview prepared for the selected week.")}>Export</Button>}<Button icon={Plus} onClick={() => onQuick("reservation")}>New reservation</Button></>}
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
          <div className="calendar-head"><div><button disabled={weekOffset <= -1} onClick={() => setWeekOffset((current) => Math.max(-1, current - 1))} aria-label={`Previous ${calendarMode.toLowerCase()}`}><ChevronLeft size={18} /></button><div><strong>{periodLabel}</strong><span>{weekOffset === 0 ? `Current demo ${calendarMode.toLowerCase()}` : "Calendar preview"}</span></div><button disabled={weekOffset >= 1} onClick={() => setWeekOffset((current) => Math.min(1, current + 1))} aria-label={`Next ${calendarMode.toLowerCase()}`}><ChevronRight size={18} /></button></div><div><button className={calendarMode === "Week" ? "active" : ""} onClick={() => setCalendarMode("Week")}>Week</button><button className={calendarMode === "Month" ? "active" : ""} onClick={() => setCalendarMode("Month")}>Month</button></div></div>
          {calendarMode === "Week" ? <div className="week-strip">{weekDays.map((day) => <button key={day.day} className={selectedDay === day.date ? "current" : ""} onClick={() => setSelectedDay(day.date)}><span>{day.day}</span><strong>{day.date}</strong><small>{weekOffset === 0 ? `${day.count} bookings` : "No demo bookings"}</small></button>)}</div> : <div className="reservation-month-grid">{Array.from({ length: 31 }, (_, index) => index + 1).map((day) => <button key={day} className={selectedDay === day ? "current" : ""} onClick={() => setSelectedDay(day)}><span>{day}</span>{weekOffset === 0 && [8, 9].includes(day) && <i />}</button>)}</div>}
          {calendarMode === "Month" && <div className="calendar-mode-note"><CalendarDays size={16} /><span><strong>Month overview</strong> Select a date to inspect its agenda below.</span></div>}
          <div className="calendar-agenda">
            <div className="time-rail">{["09:00", "11:00", "13:00", "15:00", "17:00", "19:00", "21:00"].map((time) => <span key={time}>{time}</span>)}</div>
            <div className="agenda-track">
              {agendaDate === "Today" && <i className="now-line"><b>NOW</b></i>}
              {agendaReservations.map((item, index) => <button key={item.id} className={`agenda-booking ${item.status}`} style={{ top: `${6 + index * 20}%`, left: `${index % 2 ? 53 : 4}%`, width: "42%" }} onClick={() => setSelected(item)}><strong>{item.time} • {item.name}</strong><span>{item.guests} guests • {item.table}</span></button>)}
              {!agendaReservations.length && <div className="agenda-empty"><CalendarDays size={22} /><strong>No demo bookings on this date</strong><span>Select August 8 or 9 to preview scheduled guests.</span></div>}
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
        <Card><SectionTitle title="Waitlist" subtitle="Estimated wait • 18 min" /><div className="waitlist-person"><Avatar initials="SK" tone={4} /><span><strong>Sarra Khelifi</strong><small>{waitlistNotified ? "Demo notification prepared just now" : "8 guests • joined 7 min ago"}</small></span><Button size="small" variant="secondary" icon={waitlistNotified ? Check : Send} onClick={() => { setWaitlistNotified(true); setNotice("Waitlist notification preview prepared for Sarra."); }}>{waitlistNotified ? "Notified" : "Notify"}</Button></div></Card>
      </section>

      {selected && <ReservationDetail reservation={selected} onClose={() => setSelected(null)} onUpdate={(status) => { onUpdateReservation(selected.id, status); setSelected(null); }} onNotice={setNotice} />}
      {reminderOpen && <ReminderSettings onClose={() => setReminderOpen(false)} onSave={() => { setReminderOpen(false); setNotice("Reminder timing updated for this demo session."); }} />}
    </div>
  );
}

function ReservationDetail({ reservation, onClose, onUpdate, onNotice }) {
  const [action, setAction] = useState(null);
  return (
    <><aside className="detail-panel open"><header><div><Badge tone={reservation.status === "pending" ? "orange" : "green"}>{reservation.status}</Badge><h2>{reservation.name}</h2><p>Reservation #{String(reservation.id).padStart(4, "0")}</p></div><IconButton label="Close reservation" onClick={onClose}><X size={19} /></IconButton></header><div className="detail-body">
      <div className="guest-profile"><Avatar initials={reservation.initials} size="lg" tone={3} /><div><strong>{reservation.name}</strong><span><Phone size={14} />{reservation.phone}</span><span><Mail size={14} />Guest messages enabled</span></div></div>
      <section><h3>Booking details</h3><div className="booking-facts"><div><CalendarDays size={17} /><span><small>Date</small><strong>{reservation.date}</strong></span></div><div><Clock3 size={17} /><span><small>Time</small><strong>{reservation.time}</strong></span></div><div><UsersRound size={17} /><span><small>Party</small><strong>{reservation.guests} guests</strong></span></div><div><Grid2X2 size={17} /><span><small>Table</small><strong>{reservation.table}</strong></span></div></div></section>
      <section><h3>Guest note</h3><div className="detail-note"><MessageCircle size={16} />{reservation.note || "No special request"}</div></section>
      <section><h3>Message timeline</h3><div className="message-status"><CheckCircle2 size={17} /><span><strong>Request received</strong><small>Owner notification delivered</small></span></div><div className="message-status"><BellRing size={17} /><span><strong>Reminder scheduled</strong><small>2 hours before arrival</small></span></div></section>
      {action === "message" && <section className="admin-inline-editor"><h3>Message guest</h3><textarea rows="4" defaultValue={`Hi ${reservation.name.split(" ")[0]}, your booking for ${reservation.guests} at ${reservation.time} is confirmed. We look forward to seeing you!`} /><p>No message is sent from this front-end demo.</p></section>}
      {action === "modify" && <section className="admin-inline-editor"><h3>Modify booking preview</h3><div className="form-grid"><label><span>Time</span><input type="time" defaultValue={reservation.time} /></label><label><span>Guests</span><input type="number" min="1" defaultValue={reservation.guests} /></label><label className="span-2"><span>Table</span><input defaultValue={reservation.table} /></label></div><p>Changes remain visual until a reservation backend is connected.</p></section>}
    </div><footer>{reservation.status === "pending" ? <><Button variant="danger" icon={X} onClick={() => onUpdate("declined")}>Decline</Button><Button icon={Check} onClick={() => onUpdate("confirmed")}>Accept booking</Button></> : action ? <><Button variant="secondary" onClick={() => setAction(null)}>Cancel</Button><Button icon={Check} onClick={() => { onNotice(action === "message" ? "Guest message preview prepared." : "Booking changes previewed for this session."); onClose(); }}>Save preview</Button></> : <><Button variant="secondary" icon={MessageCircle} onClick={() => setAction("message")}>Message</Button><Button icon={Edit3} onClick={() => setAction("modify")}>Modify booking</Button></>}</footer></aside><button className="drawer-scrim" onClick={onClose} aria-label="Close reservation" /></>
  );
}

function ReminderSettings({ onClose, onSave }) {
  return (
    <><aside className="detail-panel open admin-detail-panel"><header><div><Badge tone="purple">Interactive demo</Badge><h2>Reservation reminders</h2><p>Preview the timing and channels guests would receive.</p></div><IconButton label="Close reminder settings" onClick={onClose}><X size={19} /></IconButton></header><div className="detail-body"><div className="admin-form-stack"><label><span>Send reminder</span><select defaultValue="2 hours before"><option>1 hour before</option><option>2 hours before</option><option>Morning of booking</option><option>1 day before</option></select></label><label><span>Primary channel</span><select defaultValue="WhatsApp, then email"><option>WhatsApp, then email</option><option>Email only</option><option>SMS</option></select></label><label><span>Message preview</span><textarea rows="5" defaultValue="Your table at Green Coffee Games is reserved. Reply if your plans change so we can help another guest." /></label><p className="admin-helper">Production reminders require verified opt-in and a connected messaging provider.</p></div></div><footer><Button variant="secondary" onClick={onClose}>Cancel</Button><Button icon={Check} onClick={onSave}>Save preview</Button></footer></aside><button className="drawer-scrim" onClick={onClose} aria-label="Close reminder settings" /></>
  );
}

const floorStatusLabel = { available: "Available", occupied: "Occupied", ordering: "Ordering", reserved: "Reserved", cleaning: "Cleaning" };

function sessionMinutesRemaining(expiresAt, now) {
  if (!expiresAt) return null;
  const expiry = new Date(expiresAt).getTime();
  if (!Number.isFinite(expiry)) return null;
  return Math.max(0, Math.ceil((expiry - now) / 60_000));
}

export function FloorView({ tables, onUpdateTable, onQuick, canEditLayout = true, canGenerateQr = true }) {
  const [selectedId, setSelectedId] = useState(() => tables[2]?.id || tables[0]?.id || null);
  const [zone, setZone] = useState("All zones");
  const [now, setNow] = useState(() => Date.now());
  const [zoom, setZoom] = useState(100);
  const [layoutEditing, setLayoutEditing] = useState(false);
  const [notice, setNotice] = useState("");
  const selected = tables.find((table) => table.id === selectedId) || tables[0] || null;
  const filtered = zone === "All zones" ? tables : tables.filter((table) => table.zone === zone);
  const occupied = tables.filter((table) => ["occupied", "ordering"].includes(table.status)).length;
  const minutesRemaining = selected ? sessionMinutesRemaining(selected.sessionExpiresAt, now) : null;
  const sessionOpen = Boolean(selected?.sessionActive && selected?.sessionCode);
  const sessionExpired = sessionOpen && minutesRemaining === 0;
  const sessionValid = sessionOpen && !sessionExpired;

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

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
    ? "Mark table ready"
    : sessionOpen
      ? "End table session & clear"
      : ["occupied", "ordering"].includes(selected?.status)
        ? "Add waiter order"
        : "Seat guests / add waiter order";
  const actionIcon = selected?.status === "cleaning" ? CheckCircle2 : sessionOpen ? LockKeyhole : UsersRound;
  return (
    <div className="view floor-view">
      <PageHeader eyebrow="Live room" title="Floor plan" description="See every table, session, reservation, and order at a glance."
        actions={<>{canEditLayout && <Button variant="secondary" icon={Settings2} onClick={() => { setLayoutEditing((current) => !current); setNotice(layoutEditing ? "Layout preview closed." : "Layout editing preview enabled. Dragging requires the production floor editor."); }}>{layoutEditing ? "Finish layout preview" : "Edit layout"}</Button>}{canGenerateQr && <Button icon={QrCode} onClick={() => onQuick("qr")}>Table QR</Button>}</>}
      />
      {notice && <div className="admin-notice" role="status"><Check size={16} /><span>{notice}</span><button onClick={() => setNotice("")} aria-label="Dismiss message"><X size={15} /></button></div>}
      <section className="floor-summary">
        <div><span><i className="available" />Available</span><strong>{tables.filter((item) => item.status === "available").length}</strong></div>
        <div><span><i className="occupied" />Occupied</span><strong>{occupied}</strong></div>
        <div><span><i className="reserved" />Reserved</span><strong>{tables.filter((item) => item.status === "reserved").length}</strong></div>
        <div><span><i className="cleaning" />Needs reset</span><strong>{tables.filter((item) => item.status === "cleaning").length}</strong></div>
        <div className="occupancy-total"><span>Current occupancy</span><strong>{Math.round((occupied / tables.length) * 100)}%</strong><Progress value={(occupied / tables.length) * 100} /></div>
      </section>
      <div className="floor-workspace">
        <Card className="floor-canvas-card">
          <div className="floor-toolbar"><div className="zone-tabs">{["All zones", "Main room", "Window", "Games", "Terrace"].map((item) => <button key={item} className={zone === item ? "active" : ""} onClick={() => setZone(item)}>{item}</button>)}</div><div><button onClick={() => setZoom((value) => Math.max(80, value - 10))} aria-label="Zoom out"><Minus size={16} /></button><span>{zoom}%</span><button onClick={() => setZoom((value) => Math.min(120, value + 10))} aria-label="Zoom in"><Plus size={16} /></button></div></div>
          <div className={`floor-canvas${layoutEditing ? " layout-preview" : ""}`} style={{ transform: `scale(${zoom / 100})` }}>
            <div className="floor-wall top"><span>WINDOW VIEW</span></div>
            <div className="bar-counter"><Coffee size={19} /><span>BAR & PICK-UP</span><i /><i /><i /><i /></div>
            <div className="games-zone"><span>GAMES CORNER</span><div>♟</div></div>
            <div className="terrace-label">TERRACE →</div>
            <div className="entrance-label">ENTRANCE</div>
            {filtered.map((table) => (
              <button key={table.id} className={`floor-table ${table.shape} ${table.status}${selected?.id === table.id ? " selected" : ""}`} style={{ left: `${table.x}%`, top: `${table.y}%` }} onClick={() => setSelectedId(table.id)}>
                <i className="chair c1" /><i className="chair c2" /><i className="chair c3" /><i className="chair c4" />
                <span><strong>{table.id}</strong><small>{table.status === "reserved" ? table.reservedFor : table.sessionActive ? `${table.duration || "0m"} • session` : table.status === "cleaning" ? "Reset needed" : `${table.seats} seats`}</small></span>
              </button>
            ))}
          </div>
        </Card>
        <Card className="table-inspector">
          {selected ? <>
            <div className="inspector-head"><span className={`big-table-status ${selected.status}`}><Grid2X2 size={22} /></span><div><Badge tone={selected.status === "available" ? "green" : selected.status === "reserved" ? "purple" : selected.status === "cleaning" ? "neutral" : "orange"} dot>{floorStatusLabel[selected.status]}</Badge><h2>{selected.id}</h2><p>{selected.zone} • {selected.seats} seats</p></div></div>
            <div className="table-session">
              {sessionOpen ? <><div><span>QR-scanned table session</span><strong>{sessionExpired ? "Expired — orders blocked" : `Active • ${selected.duration || "just started"}`}</strong></div><div><span>Session access</span><strong>{selected.sessionCode} • {minutesRemaining === null ? "table verified" : `${minutesRemaining} min left`}</strong></div></> : selected.status === "reserved" ? <><div><span>Reserved for</span><strong>{selected.reservedFor || "Upcoming guest"}</strong></div><div><span>Ordering</span><strong>Guest scans this table’s QR after sitting down</strong></div></> : selected.status === "cleaning" ? <div className="empty-session"><LockKeyhole size={20} /><span><strong>Previous session ended</strong><small>Ordering access is revoked. Mark the table ready after cleaning.</small></span></div> : ["occupied", "ordering"].includes(selected.status) ? <div className="empty-session"><AlertTriangle size={20} /><span><strong>No guest QR session yet</strong><small>Take a waiter order here, or ask the guest to scan the QR fixed to this table.</small></span></div> : <div className="empty-session"><CheckCircle2 size={20} /><span><strong>Ready for guests</strong><small>Scanning this table’s QR starts a time-limited ordering session automatically.</small></span></div>}
            </div>
            <div className="table-qr-preview"><QrPattern size={88} /><div><Badge tone={sessionValid ? "blue" : sessionExpired ? "rose" : "neutral"}><LockKeyhole size={11} />{sessionValid ? "QR SESSION ACTIVE" : sessionExpired ? "SESSION EXPIRED" : "TABLE QR READY"}</Badge><strong>{sessionOpen ? `${selected.id} • ${selected.sessionCode}` : `${selected.id} permanent QR`}</strong><span>{sessionValid ? `Expires in ${minutesRemaining ?? "—"} minutes. The session began from this table’s QR and cannot be reused for another table.` : sessionExpired ? "This session can no longer submit orders. End and clear the table before the next visit." : "A guest seated here scans the physical QR to begin ordering. Staff can always add a waiter order instead."}</span></div></div>
            {["occupied", "ordering"].includes(selected.status) && <div className="table-order-summary"><h3>Active order</h3><div><UtensilsCrossed size={17} /><span><strong>{selected.status === "ordering" ? "Order in progress" : "2 items served"}</strong><small>Last update 3 min ago</small></span><ChevronRight size={15} /></div></div>}
            <Button variant={sessionOpen ? "danger" : "primary"} icon={actionIcon} onClick={handleTableAction}>{actionLabel}</Button>
          </> : <div className="inspector-empty"><Grid2X2 size={30} /><strong>Select a table</strong><span>Details and actions will appear here.</span></div>}
        </Card>
      </div>
      <Card className="shift-handover"><span className="metric-icon orange"><AlertTriangle size={18} /></span><div><Badge tone="orange">SHIFT NOTE</Badge><strong>Projector remote is behind the bar for tonight’s match.</strong><small>Added by Malek • 10:42</small></div><button onClick={() => setNotice("Handover preview: projector remote, terrace heater check, and oat milk restock are recorded for the next shift.")}>All handover notes <ChevronRight size={15} /></button></Card>
    </div>
  );
}
