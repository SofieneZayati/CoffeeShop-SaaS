import { useMemo, useState } from "react";
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
  Merge,
  MessageCircle,
  Minus,
  MoreHorizontal,
  PackageOpen,
  Phone,
  Plus,
  Printer,
  QrCode,
  ReceiptText,
  RotateCcw,
  Search,
  Send,
  Settings2,
  Sparkles,
  Split,
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

const orderColumns = [
  { id: "new", title: "New orders", tone: "blue", empty: "No new orders" },
  { id: "making", title: "In preparation", tone: "orange", empty: "Nothing being prepared" },
  { id: "ready", title: "Ready to serve", tone: "green", empty: "Nothing waiting" },
];

const statusLabel = { new: "New", making: "Preparing", ready: "Ready" };

function OrderTicket({ order, onAdvance, onSelect, compact = false, canAdvance = true, showFinancials = true }) {
  const nextLabel = order.status === "new" ? "Start preparing" : order.status === "making" ? "Mark ready" : "Serve order";
  return (
    <article className={`order-ticket ${order.status}${compact ? " compact" : ""}`} onClick={() => onSelect(order)}>
      <header>
        <div><Badge tone={order.status === "new" ? "blue" : order.status === "making" ? "orange" : "green"} dot>{statusLabel[order.status]}</Badge><span className="ticket-time"><Clock3 size={13} />{order.time} ago</span></div>
        <IconButton label="Order options"><MoreHorizontal size={17} /></IconButton>
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
  const [display, setDisplay] = useState(initialDisplay);
  const filtered = filter === "all" ? orders : orders.filter((order) => order.status === filter);
  const newCount = orders.filter((order) => order.status === "new").length;
  const makingCount = orders.filter((order) => order.status === "making").length;
  const readyCount = orders.filter((order) => order.status === "ready").length;

  return (
    <div className="view operations-view">
      <PageHeader eyebrow="Operations" title="Live orders" description="Every table, every ticket, perfectly in sync."
        actions={<><Button variant="secondary" icon={Eye} onClick={() => setDisplay(display === "kds" ? "board" : "kds")}>{display === "kds" ? "Board view" : "Barista display"}</Button>{canCreateOrder && <Button icon={Plus} onClick={() => onQuick("order")}>New order</Button>}</>}
      />

      <section className="order-metrics">
        <Card><span className="metric-icon blue"><PackageOpen size={18} /></span><div><small>Open tickets</small><strong>{orders.length}</strong></div><MetricDelta>↓ 8%</MetricDelta></Card>
        <Card><span className="metric-icon orange"><Clock3 size={18} /></span><div><small>Average prep</small><strong>8m 24s</strong></div><Badge tone="green">On target</Badge></Card>
        <Card><span className="metric-icon green"><CheckCircle2 size={18} /></span><div><small>Completed today</small><strong>143</strong></div><MetricDelta>↑ 12%</MetricDelta></Card>
        {canViewFinancials ? <Card><span className="metric-icon purple"><CircleDollarSign size={18} /></span><div><small>Order value</small><strong>16.800 TND</strong></div><MetricDelta>↑ 4.2%</MetricDelta></Card> : <Card><span className="metric-icon purple"><Coffee size={18} /></span><div><small>{account.role === "barista" ? "Barista station" : "Service station"}</small><strong>{account.role === "barista" ? "BAR 01" : "FLOOR 01"}</strong><p>{account.firstName} • On shift</p></div><Badge tone="green" dot>Connected</Badge></Card>}
      </section>

      <section className={`orders-workspace ${display === "kds" ? "kds-mode" : ""}`}>
        <div className="orders-toolbar">
          <Segmented label="Filter orders" value={filter} onChange={setFilter} options={[
            { value: "all", label: "All", count: orders.length }, { value: "new", label: "New", count: newCount }, { value: "making", label: "Preparing", count: makingCount }, { value: "ready", label: "Ready", count: readyCount },
          ]} />
          <div className="orders-toolbar-right"><span className="live-sync"><i />Live sync</span><button><ListFilter size={16} />Filters</button><button><Printer size={16} />Print</button></div>
        </div>
        {display === "kds" && <div className="kds-banner"><Zap size={18} /><div><strong>Barista display mode</strong><span>High-contrast tickets, large timers, and one-tap progress.</span></div><Badge tone="dark">STATION 01</Badge></div>}
        <div className="order-board">
          {orderColumns.map((column) => {
            const columnOrders = filtered.filter((order) => order.status === column.id);
            return (
              <section className={`order-column ${column.tone}`} key={column.id}>
                <header><div><i /><strong>{column.title}</strong><span>{columnOrders.length}</span></div><span>{column.id === "new" ? "Accept within 2 min" : column.id === "making" ? "Target • 10 min" : "Call ticket number"}</span></header>
                <div className="ticket-stack">
                  {columnOrders.map((order) => <OrderTicket key={order.id} order={order} onAdvance={onAdvanceOrder} onSelect={setSelected} compact={display === "kds"} canAdvance={canAdvanceOrder(order)} showFinancials={canViewFinancials} />)}
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
            <div className="order-detail-table"><span>{selected.table}</span><div><strong>{selected.guest}</strong><small>Table session verified</small></div><LockKeyhole size={17} /></div>
            <section><h3>Items</h3>{selected.items.map((item) => <div className="detail-line" key={item}><span>{item}</span><strong>—</strong></div>)}</section>
            {selected.note && <section><h3>Guest note</h3><div className="detail-note"><MessageCircle size={16} />{selected.note}</div></section>}
            {canViewFinancials && <section><h3>Payment</h3><div className="payment-detail"><CreditCard size={17} /><div><strong>{selected.payment}</strong><small>Payment status verified</small></div><CheckCircle2 size={17} /></div></section>}
            <section><h3>Timeline</h3><ol className="order-history"><li className="done"><i /><span><strong>Order received</strong><small>via {selected.source}</small></span><time>{selected.time} ago</time></li><li className={selected.status !== "new" ? "done" : ""}><i /><span><strong>Preparation started</strong><small>Barista station</small></span></li><li className={selected.status === "ready" ? "done" : ""}><i /><span><strong>Ready to serve</strong><small>Customer display notified</small></span></li></ol></section>
          </div>
          <footer>{canViewFinancials && <Button variant="secondary" icon={ReceiptText}>Receipt</Button>}{canAdvanceOrder(selected) && <Button icon={ArrowRight} onClick={() => { onAdvanceOrder(selected.id); setSelected(null); }}>{selected.status === "new" ? "Start preparing" : selected.status === "making" ? "Mark ready" : "Complete"}</Button>}</footer>
        </aside>
      )}
      {selected && <button className="drawer-scrim" onClick={() => setSelected(null)} aria-label="Close order details" />}
    </div>
  );
}

const categories = ["All items", "Signature", "Hot coffee", "Cold coffee", "Slow coffee", "Desserts", "Bakery"];

export function MenuView({ menuItems, onToggleMenuItem, onQuick, onPreview, canEdit = true, canAdd = true, canPreview = true, canToggleAvailability = true }) {
  const [category, setCategory] = useState("All items");
  const [query, setQuery] = useState("");
  const [layout, setLayout] = useState("grid");
  const [selected, setSelected] = useState(null);
  const filtered = menuItems.filter((item) => (category === "All items" || item.category === category) && item.name.toLowerCase().includes(query.toLowerCase()));
  const activeCount = menuItems.filter((item) => item.active).length;

  return (
    <div className="view menu-view">
      <PageHeader eyebrow="Sell beautifully" title="Menu & QR" description="Products, availability, modifiers, and your customer-facing menu."
        actions={<>{canPreview && <Button variant="secondary" icon={Eye} onClick={onPreview}>Preview menu</Button>}{canAdd && <Button icon={Plus} onClick={() => onQuick("menu")}>Add item</Button>}</>}
      />
      <section className="menu-summary-grid">
        <Card className="menu-health"><div className="menu-health-ring"><strong>94</strong><span>menu score</span></div><div><Badge tone="green" dot>Excellent</Badge><h3>Your menu is ready to sell.</h3><p>{activeCount} live products • 1 low-stock item • 2 AI tips</p></div></Card>
        <Card className="qr-menu-card"><span className="qr-card-icon"><QrCode size={24} /></span><div><Badge tone="blue">QR MENU</Badge><h3>1,284 scans this week</h3><p>+18% versus the previous week</p></div><button onClick={() => onQuick("qr")}>Manage QR <ChevronRight size={15} /></button></Card>
        <Card className="ai-menu-card"><span><Sparkles size={20} /></span><div><h3>{canEdit ? "Make every item irresistible" : "Stock focus for this shift"}</h3><p>{canEdit ? "AI can improve 4 short descriptions and translate them to French." : "One item is low and one is currently unavailable."}</p></div>{canEdit && <button onClick={() => setSelected(menuItems[0])}>Review suggestions</button>}</Card>
      </section>

      <Card className="menu-manager">
        <div className="menu-toolbar">
          <div className="menu-search"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search menu items…" /></div>
          <div className="category-filter"><select value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select><ChevronDown size={15} /></div>
          <button><Filter size={16} />Filters</button>
          <div className="layout-toggle"><button className={layout === "grid" ? "active" : ""} onClick={() => setLayout("grid")}><LayoutGrid size={16} /></button><button className={layout === "list" ? "active" : ""} onClick={() => setLayout("list")}><ListFilter size={16} /></button></div>
        </div>
        <div className="menu-category-tabs">{categories.map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}{item === "All items" && <span>{menuItems.length}</span>}</button>)}</div>
        <div className={`menu-products ${layout}`}>
          {filtered.map((item) => (
            <article className={`menu-product-card${!item.active ? " unavailable" : ""}`} key={item.id}>
              <button className={`menu-product-image ${item.tone}`} onClick={canEdit ? () => setSelected(item) : undefined} aria-label={canEdit ? `Edit ${item.name}` : item.name}>{item.image ? <img src={item.image} alt={item.alt} loading="lazy" width="640" height="480" style={{ objectPosition: item.objectPosition }} /> : <span>{item.emoji}</span>}{item.featured && <Badge tone="dark"><Star size={10} fill="currentColor" /> Featured</Badge>}{item.stock <= 7 && <i>{item.stock === 0 ? "Out of stock" : `${item.stock} left`}</i>}</button>
              <div className="menu-product-body"><div className="product-title-row"><div><span>{item.category}</span><h3>{item.name}</h3></div>{canEdit && <IconButton label={`Edit ${item.name}`} onClick={() => setSelected(item)}><Edit3 size={16} /></IconButton>}</div><p>{item.description}</p><div className="product-tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="product-card-foot"><strong>{item.price.toFixed(3)} TND</strong><span>{item.stock} in stock</span>{canToggleAvailability && <Toggle checked={item.active} onChange={() => onToggleMenuItem(item.id)} label={`Toggle ${item.name} availability`} />}</div></div>
            </article>
          ))}
        </div>
        {filtered.length === 0 && <div className="menu-empty"><Search size={24} /><strong>No menu items found</strong><span>Try another category or search.</span></div>}
      </Card>

      {selected && (
        <aside className="detail-panel open menu-editor">
          <header><div><Badge tone="green">Menu editor</Badge><h2>{selected.name}</h2><p>Update the product customers see.</p></div><IconButton label="Close menu editor" onClick={() => setSelected(null)}><X size={19} /></IconButton></header>
          <div className="detail-body">
            <div className={`editor-image ${selected.tone}`}>{selected.image ? <img src={selected.image} alt={selected.alt} style={{ objectPosition: selected.objectPosition }} /> : <span>{selected.emoji}</span>}<button><ImagePlus size={16} />Replace image</button></div>
            <div className="form-stack"><label><span>Product name</span><input defaultValue={selected.name} /></label><label><span>Description</span><textarea rows="4" defaultValue={selected.description} /></label><button className="ai-writing"><Sparkles size={17} /><span><strong>Polish with Green AI</strong><small>Generate a richer description + FR translation</small></span><ChevronRight size={15} /></button><div className="form-grid"><label><span>Price (TND)</span><input type="number" defaultValue={selected.price} /></label><label><span>Stock today</span><input type="number" defaultValue={selected.stock} /></label></div><label><span>Category</span><select defaultValue={selected.category}>{categories.slice(1).map((item) => <option key={item}>{item}</option>)}</select></label></div>
            <section><h3>Options & modifiers</h3><div className="modifier-row"><span><strong>Milk choice</strong><small>Whole, oat, almond</small></span><button>Edit</button></div><div className="modifier-row"><span><strong>Temperature</strong><small>Hot or iced</small></span><button>Edit</button></div><button className="add-modifier"><Plus size={15} /> Add modifier group</button></section>
          </div>
          <footer><Button variant="danger" icon={Trash2}>Delete</Button><Button icon={Check} onClick={() => setSelected(null)}>Save changes</Button></footer>
        </aside>
      )}
      {selected && <button className="drawer-scrim" onClick={() => setSelected(null)} aria-label="Close menu editor" />}
    </div>
  );
}

const weekDays = [
  { day: "MON", date: 6, count: 4 }, { day: "TUE", date: 7, count: 5 }, { day: "WED", date: 8, count: 7 }, { day: "THU", date: 9, count: 6 }, { day: "FRI", date: 10, count: 9 }, { day: "SAT", date: 11, count: 12, current: true }, { day: "SUN", date: 12, count: 8 },
];

export function ReservationsView({ reservations, onUpdateReservation, onQuick, canExport = true }) {
  const [tab, setTab] = useState("all");
  const [selected, setSelected] = useState(null);
  const filtered = tab === "all" ? reservations : reservations.filter((item) => item.status === tab);
  const pending = reservations.filter((item) => item.status === "pending").length;
  return (
    <div className="view reservations-view">
      <PageHeader eyebrow="Guest planning" title="Reservations" description="A calm, complete view of every booking, reminder, and waitlist guest."
        actions={<>{canExport && <Button variant="secondary" icon={Download}>Export</Button>}<Button icon={Plus} onClick={() => onQuick("reservation")}>New reservation</Button></>}
      />
      <section className="reservation-overview">
        <Card><span className="metric-icon purple"><CalendarCheck2 size={19} /></span><div><small>Today’s bookings</small><strong>12</strong><p>38 expected guests</p></div><MetricDelta>↑ 9%</MetricDelta></Card>
        <Card><span className="metric-icon orange"><TimerReset size={19} /></span><div><small>Pending requests</small><strong>{pending}</strong><p>Oldest waiting 8 min</p></div><Badge tone={pending ? "orange" : "green"}>{pending ? "Needs review" : "All clear"}</Badge></Card>
        <Card><span className="metric-icon green"><UsersRound size={19} /></span><div><small>Table fill rate</small><strong>78%</strong><p>For confirmed bookings</p></div><Progress value={78} /></Card>
        <Card><span className="metric-icon blue"><BellRing size={19} /></span><div><small>Reminders sent</small><strong>9</strong><p>100% delivered today</p></div><Badge tone="green">Automatic</Badge></Card>
      </section>
      <div className="reservations-layout">
        <Card className="calendar-card">
          <div className="calendar-head"><div><button><ChevronLeft size={18} /></button><div><strong>July 6–12, 2026</strong><span>This week</span></div><button><ChevronRight size={18} /></button></div><div><button className="active">Week</button><button>Month</button></div></div>
          <div className="week-strip">{weekDays.map((day) => <button key={day.day} className={day.current ? "current" : ""}><span>{day.day}</span><strong>{day.date}</strong><small>{day.count} bookings</small></button>)}</div>
          <div className="calendar-agenda">
            <div className="time-rail">{["09:00", "11:00", "13:00", "15:00", "17:00", "19:00", "21:00"].map((time) => <span key={time}>{time}</span>)}</div>
            <div className="agenda-track">
              <i className="now-line"><b>NOW</b></i>
              {reservations.filter((item) => item.date === "Today").map((item, index) => <button key={item.id} className={`agenda-booking ${item.status}`} style={{ top: `${6 + index * 20}%`, left: `${index % 2 ? 53 : 4}%`, width: "42%" }} onClick={() => setSelected(item)}><strong>{item.time} • {item.name}</strong><span>{item.guests} guests • {item.table}</span></button>)}
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
        <Card className="reminder-card"><span className="reminder-visual"><BellRing size={25} /><i /></span><div><Badge tone="purple">AUTOMATION</Badge><h3>No-shows are down 31%</h3><p>WhatsApp and email reminders go out two hours before every confirmed booking.</p></div><button>Configure <ChevronRight size={15} /></button></Card>
        <Card><SectionTitle title="Waitlist" subtitle="Estimated wait • 18 min" /><div className="waitlist-person"><Avatar initials="SK" tone={4} /><span><strong>Sarra Khelifi</strong><small>8 guests • joined 7 min ago</small></span><Button size="small" variant="secondary" icon={Send}>Notify</Button></div></Card>
      </section>

      {selected && <ReservationDetail reservation={selected} onClose={() => setSelected(null)} onUpdate={(status) => { onUpdateReservation(selected.id, status); setSelected(null); }} />}
    </div>
  );
}

function ReservationDetail({ reservation, onClose, onUpdate }) {
  return (
    <><aside className="detail-panel open"><header><div><Badge tone={reservation.status === "pending" ? "orange" : "green"}>{reservation.status}</Badge><h2>{reservation.name}</h2><p>Reservation #{String(reservation.id).padStart(4, "0")}</p></div><IconButton label="Close reservation" onClick={onClose}><X size={19} /></IconButton></header><div className="detail-body">
      <div className="guest-profile"><Avatar initials={reservation.initials} size="lg" tone={3} /><div><strong>{reservation.name}</strong><span><Phone size={14} />{reservation.phone}</span><span><Mail size={14} />Guest messages enabled</span></div></div>
      <section><h3>Booking details</h3><div className="booking-facts"><div><CalendarDays size={17} /><span><small>Date</small><strong>{reservation.date}</strong></span></div><div><Clock3 size={17} /><span><small>Time</small><strong>{reservation.time}</strong></span></div><div><UsersRound size={17} /><span><small>Party</small><strong>{reservation.guests} guests</strong></span></div><div><Grid2X2 size={17} /><span><small>Table</small><strong>{reservation.table}</strong></span></div></div></section>
      <section><h3>Guest note</h3><div className="detail-note"><MessageCircle size={16} />{reservation.note || "No special request"}</div></section>
      <section><h3>Message timeline</h3><div className="message-status"><CheckCircle2 size={17} /><span><strong>Request received</strong><small>Owner notification delivered</small></span></div><div className="message-status"><BellRing size={17} /><span><strong>Reminder scheduled</strong><small>2 hours before arrival</small></span></div></section>
    </div><footer>{reservation.status === "pending" ? <><Button variant="danger" icon={X} onClick={() => onUpdate("declined")}>Decline</Button><Button icon={Check} onClick={() => onUpdate("confirmed")}>Accept booking</Button></> : <><Button variant="secondary" icon={MessageCircle}>Message</Button><Button icon={Edit3}>Modify booking</Button></>}</footer></aside><button className="drawer-scrim" onClick={onClose} aria-label="Close reservation" /></>
  );
}

const floorStatusLabel = { available: "Available", occupied: "Occupied", ordering: "Ordering", reserved: "Reserved", cleaning: "Cleaning" };

export function FloorView({ tables, onUpdateTable, onQuick, canEditLayout = true, canGenerateQr = true }) {
  const [selected, setSelected] = useState(tables[2]);
  const [zone, setZone] = useState("All zones");
  const filtered = zone === "All zones" ? tables : tables.filter((table) => table.zone === zone);
  const occupied = tables.filter((table) => ["occupied", "ordering"].includes(table.status)).length;
  return (
    <div className="view floor-view">
      <PageHeader eyebrow="Live room" title="Floor plan" description="See every table, session, reservation, and order at a glance."
        actions={<>{canEditLayout && <Button variant="secondary" icon={Settings2}>Edit layout</Button>}{canGenerateQr && <Button icon={QrCode} onClick={() => onQuick("qr")}>Table QR</Button>}</>}
      />
      <section className="floor-summary">
        <div><span><i className="available" />Available</span><strong>{tables.filter((item) => item.status === "available").length}</strong></div>
        <div><span><i className="occupied" />Occupied</span><strong>{occupied}</strong></div>
        <div><span><i className="reserved" />Reserved</span><strong>{tables.filter((item) => item.status === "reserved").length}</strong></div>
        <div><span><i className="cleaning" />Needs reset</span><strong>{tables.filter((item) => item.status === "cleaning").length}</strong></div>
        <div className="occupancy-total"><span>Current occupancy</span><strong>{Math.round((occupied / tables.length) * 100)}%</strong><Progress value={(occupied / tables.length) * 100} /></div>
      </section>
      <div className="floor-workspace">
        <Card className="floor-canvas-card">
          <div className="floor-toolbar"><div className="zone-tabs">{["All zones", "Main room", "Window", "Games", "Terrace"].map((item) => <button key={item} className={zone === item ? "active" : ""} onClick={() => setZone(item)}>{item}</button>)}</div><div><button><Minus size={16} /></button><span>100%</span><button><Plus size={16} /></button></div></div>
          <div className="floor-canvas">
            <div className="floor-wall top"><span>WINDOW VIEW</span></div>
            <div className="bar-counter"><Coffee size={19} /><span>BAR & PICK-UP</span><i /><i /><i /><i /></div>
            <div className="games-zone"><span>GAMES CORNER</span><div>♟</div></div>
            <div className="terrace-label">TERRACE →</div>
            <div className="entrance-label">ENTRANCE</div>
            {filtered.map((table) => (
              <button key={table.id} className={`floor-table ${table.shape} ${table.status}${selected?.id === table.id ? " selected" : ""}`} style={{ left: `${table.x}%`, top: `${table.y}%` }} onClick={() => setSelected(table)}>
                <i className="chair c1" /><i className="chair c2" /><i className="chair c3" /><i className="chair c4" />
                <span><strong>{table.id}</strong><small>{table.status === "reserved" ? table.reservedFor : table.status === "occupied" || table.status === "ordering" ? table.duration : `${table.seats} seats`}</small></span>
              </button>
            ))}
          </div>
        </Card>
        <Card className="table-inspector">
          {selected ? <>
            <div className="inspector-head"><span className={`big-table-status ${selected.status}`}><Grid2X2 size={22} /></span><div><Badge tone={selected.status === "available" ? "green" : selected.status === "reserved" ? "purple" : selected.status === "cleaning" ? "neutral" : "orange"} dot>{floorStatusLabel[selected.status]}</Badge><h2>{selected.id}</h2><p>{selected.zone} • {selected.seats} seats</p></div><IconButton label="Table options"><MoreHorizontal size={18} /></IconButton></div>
            <div className="table-session">
              {["occupied", "ordering"].includes(selected.status) ? <><div><span>Current session</span><strong>{selected.duration}</strong></div><div><span>Running bill</span><strong>{selected.spend?.toFixed(3)} TND</strong></div><div><span>Payment</span><Badge tone="orange">Open</Badge></div></> : selected.status === "reserved" ? <><div><span>Reserved for</span><strong>{selected.reservedFor}</strong></div><div><span>Session</span><strong>Starts on arrival</strong></div></> : <div className="empty-session"><CheckCircle2 size={20} /><span><strong>Ready for guests</strong><small>No active table session</small></span></div>}
            </div>
            <div className="table-qr-preview"><QrPattern size={88} /><div><Badge tone="blue"><LockKeyhole size={11} />SECURE QR</Badge><strong>{selected.id} ordering link</strong><span>Session locks when guests arrive</span>{canGenerateQr && <button onClick={() => onQuick("qr")}><Download size={14} />Download</button>}</div></div>
            {["occupied", "ordering"].includes(selected.status) && <div className="table-order-summary"><h3>Active order</h3><div><UtensilsCrossed size={17} /><span><strong>{selected.status === "ordering" ? "Order in progress" : "2 items served"}</strong><small>Last update 3 min ago</small></span><ChevronRight size={15} /></div></div>}
            <div className="table-actions"><button><Split size={16} />Split bill</button><button><Merge size={16} />Merge table</button><button onClick={() => { onUpdateTable(selected.id, "available"); setSelected({ ...selected, status: "available" }); }}><RotateCcw size={16} />Clear table</button></div>
            <Button icon={selected.status === "available" ? UsersRound : ReceiptText} onClick={() => { const next = selected.status === "available" ? "occupied" : "available"; onUpdateTable(selected.id, next); setSelected({ ...selected, status: next }); }}>{selected.status === "available" ? "Seat new guests" : "Open table bill"}</Button>
          </> : <div className="inspector-empty"><Grid2X2 size={30} /><strong>Select a table</strong><span>Details and actions will appear here.</span></div>}
        </Card>
      </div>
      <Card className="shift-handover"><span className="metric-icon orange"><AlertTriangle size={18} /></span><div><Badge tone="orange">SHIFT NOTE</Badge><strong>Projector remote is behind the bar for tonight’s match.</strong><small>Added by Malek • 10:42</small></div><button>All handover notes <ChevronRight size={15} /></button></Card>
    </div>
  );
}
