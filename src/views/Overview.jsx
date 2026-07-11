import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Coffee,
  Gift,
  Grid2X2,
  MessageSquareText,
  MoreHorizontal,
  Plus,
  QrCode,
  ShoppingBag,
  Sparkles,
  Trophy,
  UsersRound,
  WalletCards,
  Zap,
} from "lucide-react";
import { previousSeries, revenueSeries } from "../data/demoData";
import { Avatar, Badge, Button, Card, IconButton, MetricDelta, Progress, SectionTitle } from "../components/ui";

function makeLine(values, width = 620, height = 180, padding = 10) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  return values.map((value, index) => {
    const x = padding + (index / (values.length - 1)) * (width - padding * 2);
    const y = height - padding - ((value - min) / (max - min || 1)) * (height - padding * 2);
    return `${index === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(" ");
}

function RevenueChart() {
  const line = makeLine(revenueSeries);
  const previous = makeLine(previousSeries);
  const area = `${line} L610,180 L10,180 Z`;
  return (
    <div className="revenue-chart">
      <div className="chart-axis"><span>3k</span><span>2k</span><span>1k</span><span>0</span></div>
      <svg viewBox="0 0 620 180" preserveAspectRatio="none" aria-label="Revenue trend for the last fourteen days">
        <defs>
          <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--green)" stopOpacity=".22" /><stop offset="1" stopColor="var(--green)" stopOpacity="0" /></linearGradient>
        </defs>
        {[20, 65, 110, 155].map((y) => <line key={y} x1="10" y1={y} x2="610" y2={y} className="chart-gridline" />)}
        <path d={area} fill="url(#revenueFill)" />
        <path d={previous} className="chart-line previous" />
        <path d={line} className="chart-line current" />
        <circle cx="610" cy="10" r="5" className="chart-point-halo" />
        <circle cx="610" cy="10" r="3" className="chart-point" />
      </svg>
      <div className="chart-days"><span>Jun 28</span><span>Jul 1</span><span>Jul 4</span><span>Jul 7</span><span>Today</span></div>
    </div>
  );
}

const statusTone = { new: "blue", making: "orange", ready: "green" };
const statusText = { new: "New", making: "Preparing", ready: "Ready" };

function MiniFloor({ tables, onOpen }) {
  const visible = tables.slice(0, 8);
  return (
    <div className="mini-floor">
      <div className="mini-floor-bar"><span>BAR & PICK-UP</span><i /><i /><i /></div>
      <div className="mini-floor-grid">
        {visible.map((table) => (
          <button key={table.id} className={`mini-table ${table.status}`} onClick={onOpen}>
            <span>{table.id.replace("T0", "")}</span><small>{table.seats} seats</small>
          </button>
        ))}
      </div>
      <div className="floor-legend"><span><i className="available" />Available</span><span><i className="occupied" />Occupied</span><span><i className="reserved" />Reserved</span></div>
    </div>
  );
}

const quickActions = [
  { id: "menu", label: "Add menu item", icon: Coffee, tone: "sage" },
  { id: "reservation", label: "New reservation", icon: CalendarDays, tone: "violet" },
  { id: "qr", label: "Create table QR", icon: QrCode, tone: "blue" },
  { id: "campaign", label: "Send a campaign", icon: MessageSquareText, tone: "orange" },
];

export default function Overview({ orders, tables, reservations, onNavigate, onQuick, onAdvanceOrder, account }) {
  const occupied = tables.filter((table) => ["occupied", "ordering"].includes(table.status)).length;
  return (
    <div className="view overview-view">
      <section className="welcome-row">
        <div>
          <span className="eyebrow">Your daily pulse</span>
          <h1>Good morning, {account.firstName}.</h1>
          <p>The café is flowing nicely. Here’s what deserves your attention.</p>
        </div>
        <div className="welcome-actions">
          <Button variant="secondary" icon={QrCode} onClick={() => onQuick("qr")}>Create QR</Button>
          <Button icon={Plus} onClick={() => onQuick("menu")}>Quick add</Button>
        </div>
      </section>

      <section className="metrics-grid">
        <Card className="metric-card revenue">
          <div className="metric-top"><span className="metric-icon"><CircleDollarSign size={19} /></span><MetricDelta>↑ 12.8%</MetricDelta></div>
          <div><span className="metric-label">Revenue today</span><strong>2,486.500 <small>TND</small></strong><p>vs. 2,204.000 last Friday</p></div>
          <div className="metric-spark">{[30,38,34,48,44,57,52,69,63,74,68,82].map((n, i) => <i key={i} style={{ height: `${n}%` }} />)}</div>
        </Card>
        <Card className="metric-card">
          <div className="metric-top"><span className="metric-icon blue"><ShoppingBag size={19} /></span><Badge tone="blue" dot>5 live</Badge></div>
          <div><span className="metric-label">Orders today</span><strong>148</strong><p>8.4 min average prep time</p></div>
          <button className="metric-link" onClick={() => onNavigate("orders")}>Open order board <ChevronRight size={14} /></button>
        </Card>
        <Card className="metric-card">
          <div className="metric-top"><span className="metric-icon purple"><Grid2X2 size={19} /></span><Badge tone="green" dot>Healthy</Badge></div>
          <div><span className="metric-label">Tables occupied</span><strong>{occupied}<small> / {tables.length}</small></strong><p>Peak expected around 19:30</p></div>
          <Progress value={(occupied / tables.length) * 100} label="Table occupancy" />
        </Card>
        <Card className="metric-card">
          <div className="metric-top"><span className="metric-icon orange"><UsersRound size={19} /></span><MetricDelta>↑ 8.2%</MetricDelta></div>
          <div><span className="metric-label">Loyalty members</span><strong>1,842</strong><p>36 joined in the last 7 days</p></div>
          <div className="member-stack"><Avatar initials="MB" size="xs" tone={0} /><Avatar initials="AG" size="xs" tone={1} /><Avatar initials="RK" size="xs" tone={2} /><span>+33</span></div>
        </Card>
      </section>

      <section className="overview-grid">
        <Card className="revenue-card span-8">
          <SectionTitle title="Revenue flow" subtitle="Daily net sales • last 14 days" />
          <div className="chart-summary"><div><strong>18,924.500 TND</strong><MetricDelta>↑ 14.2%</MetricDelta></div><div className="chart-legend"><span><i className="current" />This period</span><span><i className="previous" />Previous</span></div></div>
          <RevenueChart />
        </Card>

        <Card className="today-card span-4">
          <SectionTitle title="Today’s flow" subtitle="Live service health" />
          <div className="service-score">
            <div className="score-ring" style={{ "--score": "88deg" }}><span><strong>88</strong><small>/100</small></span></div>
            <div><Badge tone="green" dot>Running smoothly</Badge><p>Faster service than 82% of your recent Fridays.</p></div>
          </div>
          <div className="flow-stats">
            <div><span><Clock3 size={15} />Avg. preparation</span><strong>8m 24s</strong></div>
            <div><span><WalletCards size={15} />Average order</span><strong>16.800 TND</strong></div>
            <div><span><Trophy size={15} />Top performer</span><strong>Aya • 42 orders</strong></div>
          </div>
          <div className="flow-callout"><Sparkles size={17} /><span><strong>AI note</strong> Schedule one extra barista from 19:00–21:00.</span></div>
        </Card>

        <Card className="orders-card span-7">
          <SectionTitle title="Live orders" subtitle={`${orders.length} tickets need the team`} action="View order board" onAction={() => onNavigate("orders")} />
          <div className="overview-orders">
            {orders.slice(0, 4).map((order, index) => (
              <article key={order.id}>
                <span className={`order-sequence ${order.status}`}>{String(index + 1).padStart(2, "0")}</span>
                <div className="overview-order-main"><div><strong>{order.table}</strong><Badge tone={statusTone[order.status]} dot>{statusText[order.status]}</Badge></div><p>{order.items.join(" • ")}</p></div>
                <div className="overview-order-meta"><strong>{order.total.toFixed(3)} TND</strong><span>{order.time} ago</span></div>
                {order.status !== "ready" ? <button className="order-next" onClick={() => onAdvanceOrder(order.id)}>{order.status === "new" ? "Start" : "Ready"}<ChevronRight size={14} /></button> : <span className="ready-check"><CheckCircle2 size={18} /></span>}
              </article>
            ))}
          </div>
        </Card>

        <Card className="floor-card span-5">
          <SectionTitle title="Floor pulse" subtitle={`${occupied} of ${tables.length} tables in service`} action="Open map" onAction={() => onNavigate("floor")} />
          <MiniFloor tables={tables} onOpen={() => onNavigate("floor")} />
        </Card>

        <Card className="reservations-card span-4">
          <SectionTitle title="Coming up" subtitle="Reservations & waitlist" action="Calendar" onAction={() => onNavigate("reservations")} />
          <div className="reservation-timeline">
            {reservations.slice(0, 3).map((reservation, index) => (
              <article key={reservation.id}>
                <time>{reservation.time}</time><span className={`timeline-node ${reservation.status}`} />
                <div><strong>{reservation.name}</strong><p>{reservation.guests} guests • {reservation.table === "—" ? "Table unassigned" : reservation.table}</p></div>
                <Avatar initials={reservation.initials} size="xs" tone={index + 2} />
              </article>
            ))}
          </div>
          <button className="waitlist-note" onClick={() => onNavigate("reservations")}><UsersRound size={16} /><span><strong>1 party on waitlist</strong><small>Estimated wait • 18 minutes</small></span><ChevronRight size={15} /></button>
        </Card>

        <Card className="bestsellers-card span-4">
          <SectionTitle title="Best sellers" subtitle="By units today" action="Menu" onAction={() => onNavigate("menu")} />
          <ol className="bestseller-list">
            <li><b>1</b><span className="item-pic sage"><img src="/menu/pistachio-cloud.webp" alt="" /></span><span><strong>Pistachio cloud</strong><small>Signature</small></span><em>86</em></li>
            <li><b>2</b><span className="item-pic sand"><img src="/menu/iced-caramel-latte.webp" alt="" /></span><span><strong>Iced caramel latte</strong><small>Cold coffee</small></span><em>74</em></li>
            <li><b>3</b><span className="item-pic rose"><img src="/menu/tiramisu-jar.webp" alt="" /></span><span><strong>Tiramisu jar</strong><small>Dessert</small></span><em>56</em></li>
          </ol>
          <div className="stock-warning"><Coffee size={16} /><span><strong>Low stock</strong> • Tiramisu has 7 portions left</span><button onClick={() => onNavigate("menu")}>Review</button></div>
        </Card>

        <Card className="event-card span-4">
          <div className="event-visual"><span className="event-date"><b>13</b>JUL</span><span className="event-ball">⚽</span><i className="event-line one" /><i className="event-line two" /></div>
          <div className="event-copy"><Badge tone="light">Next big event</Badge><h2>Champions League<br />final night.</h2><p>46 of 60 seats already reserved</p><Progress value={77} tone="lime" label="Event capacity" /><button onClick={() => onNavigate("experiences")}>Manage event <ArrowUpRight size={14} /></button></div>
        </Card>

        <Card className="quick-card span-12">
          <div className="quick-copy"><span className="metric-icon green"><Zap size={19} /></span><div><h2>Move fast</h2><p>Your most-used actions, one click away.</p></div></div>
          <div className="quick-actions">
            {quickActions.map(({ id, label, icon: Icon, tone }) => <button key={id} onClick={() => onQuick(id)}><span className={tone}><Icon size={18} /></span><strong>{label}</strong><ChevronRight size={15} /></button>)}
          </div>
          <IconButton label="More quick actions"><MoreHorizontal size={18} /></IconButton>
        </Card>
      </section>
    </div>
  );
}
