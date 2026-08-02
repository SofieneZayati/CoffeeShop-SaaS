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
import { Avatar, Badge, Button, Card, MetricDelta, Progress, SectionTitle } from "../components/ui";
import { StaffLocalized, useStaffLanguage } from "../context/StaffLanguageContext";

const overviewDictionary = { fr: {
  "Revenue trend for the last fourteen days": "Évolution du chiffre d’affaires sur les quatorze derniers jours",
  "Jun 28": "28 juin",
  "Jul 1": "1 juil.",
  "Jul 4": "4 juil.",
  "Jul 7": "7 juil.",
  "Today": "Aujourd’hui",
  "BAR & PICK-UP": "BAR ET RETRAIT",
  "seats": "places",
  "Available": "Disponible",
  "Occupied": "Occupée",
  "Reserved": "Réservée",
  "Add menu item": "Ajouter à la carte",
  "New reservation": "Nouvelle réservation",
  "Create table QR": "Créer un QR de table",
  "Send a campaign": "Envoyer une campagne",
  "Your daily pulse": "Votre activité du jour",
  "Good morning": "Bonjour",
  "Good afternoon": "Bonjour",
  "Good evening": "Bonsoir",
  "The café is flowing nicely. Here’s what deserves your attention.": "Le café fonctionne bien. Voici les points qui méritent votre attention.",
  "Create QR": "Créer un QR",
  "Quick add": "Ajout rapide",
  "Revenue today": "Chiffre d’affaires du jour",
  "vs. 2,204.000 last Friday": "contre 2 204,000 vendredi dernier",
  "Orders today": "Commandes du jour",
  "8.4 min average prep time": "8,4 min de préparation moyenne",
  "Open order board": "Ouvrir le tableau des commandes",
  "Tables occupied": "Tables occupées",
  "Healthy": "Bon rythme",
  "Peak expected around 19:30": "Pic prévu vers 19 h 30",
  "Table occupancy": "Occupation des tables",
  "Loyalty members": "Membres fidélité",
  "36 joined in the last 7 days": "36 inscriptions ces 7 derniers jours",
  "Revenue flow": "Évolution du chiffre d’affaires",
  "Daily net sales • last 14 days": "Ventes nettes quotidiennes • 14 derniers jours",
  "This period": "Période actuelle",
  "Previous": "Précédente",
  "Today’s flow": "Service du jour",
  "Live service health": "État du service en direct",
  "Running smoothly": "Service fluide",
  "Faster service than 82% of your recent Fridays.": "Service plus rapide que lors de 82 % de vos derniers vendredis.",
  "Avg. preparation": "Préparation moyenne",
  "Average order": "Panier moyen",
  "Top performer": "Meilleure performance",
  "Service insight": "Conseil de service",
  "Schedule one extra barista from 19:00–21:00.": "Prévoyez un barista supplémentaire de 19 h à 21 h.",
  "Live orders": "Commandes en direct",
  "View order board": "Voir le tableau des commandes",
  "New": "Nouvelle",
  "Preparing": "En préparation",
  "Ready": "Prête",
  "Start": "Commencer",
  "Floor pulse": "État de la salle",
  "Open map": "Ouvrir le plan",
  "Coming up": "À venir",
  "Reservations & waitlist": "Réservations et liste d’attente",
  "Calendar": "Calendrier",
  "guests": "clients",
  "Table unassigned": "Table non attribuée",
  "1 party on waitlist": "1 groupe sur liste d’attente",
  "Estimated wait • 18 minutes": "Attente estimée • 18 minutes",
  "Best sellers": "Meilleures ventes",
  "By units today": "Par quantité aujourd’hui",
  "Menu": "Carte",
  "Coffee": "Cafés",
  "Iced coffee": "Café glacé",
  "Cold drinks": "Boissons froides",
  "Desserts": "Pâtisseries",
  "Low stock": "Stock faible",
  "Tiramisu has 7 portions left": "Il reste 7 portions de tiramisu",
  "Review": "Vérifier",
  "Next big event": "Prochain grand événement",
  "Champions League final night.": "Soirée finale de la Ligue des champions.",
  "46 of 60 seats already reserved": "46 places sur 60 déjà réservées",
  "Event capacity": "Capacité de l’événement",
  "Manage event": "Gérer l’événement",
  "Move fast": "Gagner du temps",
  "Your most-used actions, one click away.": "Vos actions les plus utilisées, accessibles en un clic.",
  "Aya • 42 orders": "Aya • 42 commandes",
  " Schedule one extra barista from 19:00–21:00.": " Prévoyez un barista supplémentaire de 19 h à 21 h.",
  " seats": " places",
  " guests": " clients",
  " ago": "",
  " • Tiramisu has 7 portions left": " • Il reste 7 portions de tiramisu",
  "Champions League": "Ligue des champions",
  "final night.": "soirée de la finale.",
  "Iced coffee": "Café glacé",
  "2× Iced coffee": "2× Café glacé",
  "1× Tiramisu": "1× Tiramisu",
  "1× Capucin": "1× Capucin",
  "1× Cookie": "1× Cookie",
  "2× Strawberry juice": "2× Jus de fraise",
  "1× Cheesecake": "1× Cheesecake",
  "1× Espresso": "1× Espresso",
  "2× Capucin": "2× Capucin",
  "1× Chocolate fondant": "1× Fondant au chocolat",
  "1× Direct coffee": "1× Café direct",
  "1× Croissant": "1× Croissant",
} };

const overviewPatterns = [
  (text, locale) => {
    if (locale !== "fr") return undefined;
    const rules = [
      [/^(\d+) tickets need the team$/, "$1 commandes à traiter"],
      [/^(\d+) of (\d+) tables in service$/, "$1 tables sur $2 en service"],
      [/^(\d+) guests • (.+)$/, "$1 clients • $2"],
      [/^(.+) ago$/, "il y a $1"],
      [/^(\d+) min$/, "il y a $1 min"],
      [/^just now$/, "à l’instant"],
    ];
    for (const [pattern, replacement] of rules) if (pattern.test(text)) return text.replace(pattern, replacement);
    return undefined;
  },
];

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
    <StaffLocalized dictionary={overviewDictionary} patterns={overviewPatterns}>
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
    </StaffLocalized>
  );
}

const statusTone = { new: "blue", making: "orange", ready: "green" };
const statusText = { new: "New", making: "Preparing", ready: "Ready" };

function overviewOrderText(value, isFr) {
  if (!isFr) return value;
  return String(value)
    .replace(/Iced coffee/g, "Café glacé")
    .replace(/Strawberry juice/g, "Jus de fraise")
    .replace(/Chocolate fondant/g, "Fondant au chocolat")
    .replace(/Direct coffee/g, "Café direct");
}

function MiniFloor({ tables, onOpen }) {
  const visible = tables.slice(0, 8);
  return (
    <StaffLocalized dictionary={overviewDictionary} patterns={overviewPatterns}>
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
    </StaffLocalized>
  );
}

const quickActions = [
  { id: "menu", label: "Add menu item", icon: Coffee, tone: "sage" },
  { id: "reservation", label: "New reservation", icon: CalendarDays, tone: "violet" },
  { id: "qr", label: "Create table QR", icon: QrCode, tone: "blue" },
  { id: "campaign", label: "Send a campaign", icon: MessageSquareText, tone: "orange" },
];

export default function Overview({ orders, tables, reservations, onNavigate, onQuick, onAdvanceOrder, account }) {
  const { locale } = useStaffLanguage();
  const isFr = locale === "fr";
  const occupied = tables.filter((table) => ["occupied", "ordering"].includes(table.status)).length;
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  return (
    <StaffLocalized dictionary={overviewDictionary} patterns={overviewPatterns}>
    <div className="view overview-view">
      <section className="welcome-row">
        <div>
          <span className="eyebrow">Your daily pulse</span>
          <h1>{greeting}, {account.firstName}.</h1>
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
          <div className="metric-top"><span className="metric-icon blue"><ShoppingBag size={19} /></span><Badge tone="blue" dot>{isFr ? "5 en direct" : "5 live"}</Badge></div>
          <div><span className="metric-label">Orders today</span><strong>148</strong><p>8.4 min average prep time</p></div>
          <button className="metric-link" onClick={() => onNavigate("orders")}>{isFr ? "Ouvrir le tableau des commandes" : "Open order board"} <ChevronRight size={14} /></button>
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
          <div className="flow-callout"><Sparkles size={17} /><span><strong>Service insight</strong> Schedule one extra barista from 19:00–21:00.</span></div>
        </Card>

        <Card className="orders-card span-7">
          <SectionTitle title="Live orders" subtitle={`${orders.length} tickets need the team`} action="View order board" onAction={() => onNavigate("orders")} />
          <div className="overview-orders">
            {orders.slice(0, 4).map((order, index) => (
              <article key={order.id}>
                <span className={`order-sequence ${order.status}`}>{String(index + 1).padStart(2, "0")}</span>
                <div className="overview-order-main"><div><strong>{order.table}</strong><Badge tone={statusTone[order.status]} dot>{statusText[order.status]}</Badge></div><p>{order.items.map((item) => overviewOrderText(item, isFr)).join(" • ")}</p></div>
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
                <div><strong>{reservation.name}</strong><p>{reservation.guests} {isFr ? "clients" : "guests"} • {reservation.table === "—" ? "Table unassigned" : reservation.table}</p></div>
                <Avatar initials={reservation.initials} size="xs" tone={index + 2} />
              </article>
            ))}
          </div>
          <button className="waitlist-note" onClick={() => onNavigate("reservations")}><UsersRound size={16} /><span><strong>1 party on waitlist</strong><small>Estimated wait • 18 minutes</small></span><ChevronRight size={15} /></button>
        </Card>

        <Card className="bestsellers-card span-4">
          <SectionTitle title="Best sellers" subtitle="By units today" action="Menu" onAction={() => onNavigate("menu")} />
          <ol className="bestseller-list">
            <li><b>1</b><span className="item-pic sage" aria-hidden="true">☕</span><span><strong>Espresso</strong><small>Coffee</small></span><em>92</em></li>
            <li><b>2</b><span className="item-pic sand"><img src="/menu/iced-caramel-latte.webp" alt="" /></span><span><strong>Iced coffee</strong><small>Cold drinks</small></span><em>74</em></li>
            <li><b>3</b><span className="item-pic rose"><img src="/menu/tiramisu-jar.webp" alt="" /></span><span><strong>Tiramisu</strong><small>Desserts</small></span><em>56</em></li>
          </ol>
          <div className="stock-warning"><Coffee size={16} /><span><strong>Low stock</strong> • Tiramisu has 7 portions left</span><button onClick={() => onNavigate("menu")}>Review</button></div>
        </Card>

        <Card className="event-card span-4">
          <div className="event-visual"><span className="event-date"><b>08</b>{isFr ? "AOÛ" : "AUG"}</span><span className="event-ball">⚽</span><i className="event-line one" /><i className="event-line two" /></div>
          <div className="event-copy"><Badge tone="light">Next big event</Badge><h2>Champions League<br />final night.</h2><p>46 of 60 seats already reserved</p><Progress value={77} tone="lime" label="Event capacity" /><button onClick={() => onNavigate("experiences")}>{isFr ? "Gérer l’événement" : "Manage event"} <ArrowUpRight size={14} /></button></div>
        </Card>

        <Card className="quick-card span-12">
          <div className="quick-copy"><span className="metric-icon green"><Zap size={19} /></span><div><h2>Move fast</h2><p>Your most-used actions, one click away.</p></div></div>
          <div className="quick-actions">
            {quickActions.map(({ id, label, icon: Icon, tone }) => <button key={id} onClick={() => onQuick(id)}><span className={tone}><Icon size={18} /></span><strong>{label}</strong><ChevronRight size={15} /></button>)}
          </div>
        </Card>
      </section>
    </div>
    </StaffLocalized>
  );
}
