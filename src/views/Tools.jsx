import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Bell,
  BellRing,
  Bot,
  Box,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock3,
  CloudDownload,
  Coffee,
  Copy,
  CreditCard,
  DatabaseBackup,
  Dice5,
  Download,
  Edit3,
  ExternalLink,
  Eye,
  Facebook,
  Gamepad2,
  Gift,
  Globe2,
  Heart,
  Image,
  Instagram,
  KeyRound,
  Languages,
  LayoutTemplate,
  LifeBuoy,
  LockKeyhole,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquareText,
  MonitorSmartphone,
  MoreHorizontal,
  PackageCheck,
  Palette,
  Phone,
  Plus,
  Puzzle,
  QrCode,
  ReceiptText,
  RefreshCw,
  Rocket,
  Search,
  Send,
  Settings2,
  ShieldCheck,
  Sparkles,
  Star,
  Sun,
  TicketCheck,
  ToggleLeft,
  Trophy,
  Upload,
  UserRoundCog,
  UsersRound,
  WandSparkles,
  X,
  Zap,
} from "lucide-react";
import { events, moduleGroups, staff } from "../data/demoData";
import { Avatar, Badge, Button, Card, CheckLine, IconButton, PageHeader, Progress, SectionTitle, Segmented, Toggle } from "../components/ui";
import { QrPattern } from "../components/Overlays";
import "../styles/admin-interactions.css";

const automationIcons = { calendar: CalendarDays, gift: Gift, heart: Heart, box: Box, star: Star };

export function AutomationView({ automations, onToggleAutomation, showToast }) {
  const [aiQuery, setAiQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const ask = (event) => {
    event.preventDefault();
    if (!aiQuery.trim()) return;
    setAnswer("Your Friday 19:00–21:00 window is projected to be busiest. Schedule Aya on bar and one extra service teammate; prepare 18 pistachio bases before 18:30.");
  };
  return (
    <div className="view automation-view">
      <PageHeader eyebrow="Concept preview" title="AI & automation" description="Explore proposed AI-assisted workflows using illustrative demo data. Production AI and messaging integrations are not connected."
        actions={<><Button variant="secondary" icon={Activity} onClick={() => setAnswer("Demo history: birthday reward previewed, low-stock alert reviewed, and Friday staffing insight requested.")}>Preview history</Button><Button icon={Plus} onClick={() => showToast("Automation builder opened in preview mode")}>Draft automation</Button></>}
      />
      <section className="ai-command-card">
        <div className="ai-command-copy"><span className="large-ai-orb"><Sparkles size={30} /></span><div><Badge tone="light">AI CONCEPT PREVIEW</Badge><h2>Try a sample operations insight.</h2><p>Responses are prebuilt examples of how a future AI service could use café data.</p></div></div>
        <form onSubmit={ask}><Sparkles size={18} /><input value={aiQuery} onChange={(event) => setAiQuery(event.target.value)} placeholder="Try “How should I staff Friday evening?”" /><button type="submit"><ArrowRight size={18} /></button></form>
        <div className="ai-prompts"><button onClick={() => setAiQuery("What needs my attention today?")}>What needs attention?</button><button onClick={() => setAiQuery("Which items should I promote?")}>What should I promote?</button><button onClick={() => setAiQuery("Summarise this week’s reviews")}>Summarise reviews</button></div>
        {answer && <div className="ai-answer"><span><Bot size={20} /></span><p>{answer}</p><button onClick={() => setAnswer("")}><X size={15} /></button></div>}
        <i className="ai-decoration one">✦</i><i className="ai-decoration two">✦</i>
      </section>
      <section className="automation-stats">
        <Card><span className="metric-icon purple"><Zap size={19} /></span><div><small>Demo automations</small><strong>{automations.filter((item) => item.active).length}</strong><p>Illustrative workflow state</p></div><Badge tone="purple">Sample</Badge></Card>
        <Card><span className="metric-icon green"><Send size={19} /></span><div><small>Sample messages</small><strong>289</strong><p>Messaging provider required</p></div><Badge tone="neutral">Illustrative</Badge></Card>
        <Card><span className="metric-icon orange"><PackageCheck size={19} /></span><div><small>Sample stock alerts</small><strong>7</strong><p>Inventory integration required</p></div><Badge tone="orange">Concept</Badge></Card>
        <Card><span className="metric-icon blue"><Bot size={19} /></span><div><small>Sample chatbot answers</small><strong>418</strong><p>AI service required</p></div><Badge tone="blue">Concept</Badge></Card>
      </section>
      <div className="automation-grid">
        <Card className="rules-card">
          <div className="rules-head"><SectionTitle title="Automation concepts" subtitle="Example workflows to validate before provider integration" /><Button size="small" variant="secondary" icon={Plus} onClick={() => showToast("New automation rule drafted for this demo")}>Draft rule</Button></div>
          <div className="automation-rule-list">{automations.map((rule, index) => { const Icon = automationIcons[rule.icon] || Zap; return <article key={rule.id}><span className={`rule-icon tone-${index}`}><Icon size={19} /></span><div><div><strong>{rule.name}</strong>{rule.active && <Badge tone="purple">Demo on</Badge>}</div><p>{rule.detail}</p><span>{rule.channel} concept • {rule.runs}</span></div><Toggle checked={rule.active} onChange={() => onToggleAutomation(rule.id)} label={`Toggle ${rule.name} demo state`} /><IconButton label={`Options for ${rule.name}`} onClick={() => showToast(`${rule.name} settings opened in preview mode`)}><MoreHorizontal size={17} /></IconButton></article>; })}</div>
        </Card>
        <Card className="stock-intelligence">
          <SectionTitle title="Stock intelligence concept" subtitle="Illustrative inventory and forecast data" />
          <div className="stock-item critical"><span className="stock-visual">🍰</span><div><div><strong>Tiramisu jars</strong><Badge tone="rose">Critical</Badge></div><p>7 left • about 2.5 hours of stock</p><Progress value={28} tone="rose" /></div><button onClick={() => showToast("Tiramisu restock task added to the demo shift list")}>Restock</button></div>
          <div className="stock-item warning"><span className="stock-visual">🥛</span><div><div><strong>Oat milk</strong><Badge tone="orange">Low</Badge></div><p>9 L left • reorder before tomorrow</p><Progress value={44} tone="orange" /></div><button onClick={() => showToast("Oat milk stock details opened")}>Review</button></div>
          <div className="stock-item healthy"><span className="stock-visual">☕</span><div><div><strong>House espresso</strong><Badge tone="green">Healthy</Badge></div><p>18 kg • around 6 days of stock</p><Progress value={76} /></div><button onClick={() => showToast("House espresso forecast is healthy for six days")}>Details</button></div>
          <div className="stock-forecast"><Sparkles size={17} /><span><strong>Illustrative forecast:</strong> add 2 kg pistachio cream before Saturday’s event.</span></div>
        </Card>
        <Card className="recommendation-card">
          <div className="recommendation-art"><span className="rec-cup">☕</span><span className="rec-plus">+</span><span className="rec-cake">🍰</span><i>AI PICK</i></div>
          <Badge tone="purple"><Sparkles size={11} />SAMPLE RECOMMENDATION</Badge><h2>A bundle guests may love.</h2><p>Pair Pistachio cloud + Tiramisu jar at <strong>22.500 TND</strong>. Illustrative attach rate: 28%.</p><div className="rec-metrics"><span><strong>Sample</strong>uplift estimate</span><span><strong>Demo</strong>confidence</span></div><Button variant="secondary" onClick={() => showToast("Sample bundle draft created")}>Create sample bundle</Button>
        </Card>
        <Card className="chatbot-card">
          <div className="chatbot-head"><span className="chatbot-avatar"><Bot size={20} /><i /></span><div><strong>Green Café Assistant</strong><small>Concept preview • AI integration required</small></div><Toggle checked onChange={() => showToast("This previews the future chatbot control") } label="Preview chatbot control" /></div>
          <div className="chat-window"><div className="guest-message">Do you have oat milk and a quiet table?</div><div className="bot-message"><Sparkles size={14} /><span>Yes! Oat milk is available for every coffee. Tables T01 and T10 are currently quiet and free. Would you like to reserve one?</span></div><div className="chat-suggestions"><button onClick={() => showToast("Assistant reservation example opened for T10")}>Reserve T10</button><button onClick={() => showToast("Assistant filtered the sample menu to oat drinks")}>See oat drinks</button></div></div>
          <button className="chatbot-settings" onClick={() => showToast("Assistant training workspace opened in preview mode")}>Train & customise assistant <ChevronRight size={15} /></button>
        </Card>
      </div>
    </div>
  );
}

const gamesSeed = [
  { id: "uno", name: "UNO", symbol: "★ ★", players: "2–10 players", status: "available", className: "uno" },
  { id: "catan", name: "CATAN", symbol: "♜", players: "3–4 players", status: "checked-out", className: "catan" },
  { id: "cards", name: "PLAYING CARDS", symbol: "♠", players: "2–8 players", status: "available", className: "cards" },
  { id: "chess", name: "CHESS", symbol: "♞", players: "2 players", status: "available", className: "chess" },
  { id: "scrabble", name: "SCRABBLE", symbol: "A Z", players: "2–4 players", status: "available", className: "catan" },
  { id: "dominoes", name: "DOMINOES", symbol: "••", players: "2–4 players", status: "checked-out", className: "cards" },
];

function formatEventDate(value) {
  const [year, month, day] = String(value || "2026-08-22").split("-").map(Number);
  const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const weekday = weekdays[new Date(Date.UTC(year, month - 1, day)).getUTCDay()] || "SAT";
  return `${weekday} • ${months[month - 1] || "AUG"} ${day || 22}`;
}

function eventDateInput(value) {
  const day = Number(String(value || "").split(" ").at(-1)) || 22;
  return `2026-08-${String(day).padStart(2, "0")}`;
}

export function ExperiencesView({ onQuick }) {
  const [tab, setTab] = useState("Events");
  const [experienceEvents, setExperienceEvents] = useState(events);
  const [games, setGames] = useState(gamesSeed);
  const [panel, setPanel] = useState(null);
  const [kidsCount, setKidsCount] = useState(12);
  const availableGames = games.filter((game) => game.status === "available").length;

  function createEvent(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = String(data.get("title") || "").trim();
    if (!title) return;
    setExperienceEvents((current) => [...current, { title, date: formatEventDate(data.get("date")), time: String(data.get("time") || "18:00"), bookings: 0, capacity: Number(data.get("capacity")) || 30, type: String(data.get("type") || "Community event"), tone: "green", guestInfo: "Arrive 20 minutes early. Tables are held for 15 minutes after the event starts." }]);
    setPanel(null);
    setTab("Events");
  }

  function saveEvent(original, event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setExperienceEvents((current) => current.map((item) => item.title === original.title ? {
      ...item,
      title: String(data.get("title") || item.title).trim() || item.title,
      date: formatEventDate(data.get("date")),
      time: String(data.get("time") || item.time),
      capacity: Math.max(2, Number(data.get("capacity")) || item.capacity),
      guestInfo: String(data.get("guestInfo") || ""),
    } : item));
    setPanel(null);
    setTab("Events");
  }

  function toggleGame(id) {
    setGames((current) => current.map((game) => game.id === id ? { ...game, status: game.status === "available" ? "checked-out" : "available" } : game));
  }

  return (
    <div className="view experiences-view">
      <PageHeader eyebrow="Experience concept" title="Games, kids & events" description="Manage a clear, interactive preview of events, game availability, and family activities."
        actions={<><Button variant="secondary" icon={Eye} onClick={() => setPanel({ kind: "public" })}>Public page</Button><Button icon={Plus} onClick={() => setPanel({ kind: "create" })}>Create event</Button></>}
      />
      <section className="experience-hero">
        <div className="experience-hero-copy"><Badge tone="light">WHAT MAKES GREEN, GREEN</Badge><h2>Good coffee.<br />Great reasons to stay.</h2><p>Football nights, board games, and a safe kids park—organized in one joyful calendar.</p><div><Button variant="light" icon={CalendarDays} onClick={() => setTab("Calendar")}>Manage calendar</Button><button onClick={() => setPanel({ kind: "public" })}>Preview guest experience <ArrowUpRight size={15} /></button></div></div>
        <div className="experience-collage"><button className="collage-card football" onClick={() => setPanel({ kind: "event", item: experienceEvents[0] })}><span>⚽</span><b>BIG MATCH<br />ENERGY</b><small>Next • Sat 20:00</small></button><button className="collage-card games" onClick={() => setPanel({ kind: "games" })}><Dice5 size={34} /><b>GAME LIBRARY</b></button><button className="collage-card kids" onClick={() => setPanel({ kind: "kids" })}><span>★</span><b>KIDS<br />PARK</b><small>Safe • supervised</small></button></div>
      </section>
      <section className="experience-metrics">
        <Card><span className="metric-icon orange"><TicketCheck size={19} /></span><div><small>Sample event bookings</small><strong>186</strong><p>Illustrative month</p></div><Badge tone="orange">Sample</Badge></Card>
        <Card><span className="metric-icon blue"><UsersRound size={19} /></span><div><small>Sample event guests</small><strong>342</strong><p>Illustrative audience</p></div><Badge tone="blue">Sample</Badge></Card>
        <Card><span className="metric-icon purple"><Gamepad2 size={19} /></span><div><small>Games available now</small><strong>{availableGames}</strong><p>Interactive demo library</p></div><Badge tone="purple">Demo</Badge></Card>
        <Card><span className="metric-icon green"><CircleHelp size={19} /></span><div><small>Kids currently inside</small><strong>{kidsCount}</strong><p>Illustrative capacity state</p></div><Badge tone="green">Demo</Badge></Card>
      </section>
      <div className="experiences-grid">
        <Card className="events-card">
          <div className="events-head"><SectionTitle title="Upcoming experiences" subtitle="Bookings, capacity and promotion status" /><Segmented value={tab} onChange={setTab} label="Experience type" options={[{ value: "Events", label: "Events" }, { value: "Calendar", label: "Calendar" }]} /></div>
          {tab === "Events" ? <div className="event-list">{experienceEvents.map((event, index) => <article key={event.title}><div className={`event-list-date ${event.tone}`}><span>{event.date.split(" • ")[0]}</span><strong>{event.date.split(" ").at(-1)}</strong><small>{event.time}</small></div><div className="event-list-main"><div><Badge tone={index === 0 ? "green" : index === 1 ? "orange" : "purple"}>{event.type}</Badge>{index === 0 && <Badge tone="blue">Notification concept</Badge>}</div><h3>{event.title}</h3><span><UsersRound size={14} />{event.bookings}/{event.capacity} sample bookings</span><Progress value={(event.bookings / event.capacity) * 100} tone={index === 0 ? "green" : index === 1 ? "orange" : "purple"} /></div><div className="event-list-actions"><strong>{Math.round((event.bookings / event.capacity) * 100)}%</strong><button aria-label={`More options for ${event.title}`} onClick={() => setPanel({ kind: "event", item: event })}><MoreHorizontal size={18} /></button><button onClick={() => setPanel({ kind: "event", item: event })}>Manage <ChevronRight size={15} /></button></div></article>)}</div> : <div className="experience-calendar-preview">{[8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map((day) => { const event = experienceEvents.find((item) => Number(item.date.split(" ").at(-1)) === day); return <button key={day} className={event ? "has-event" : ""} onClick={() => event ? setPanel({ kind: "event", item: event }) : setPanel({ kind: "create", day })}><span>AUG</span><strong>{day}</strong>{event ? <small>{event.title}</small> : <small>Add event</small>}</button>; })}</div>}
        </Card>
        <Card className="match-alert-card">
          <div className="match-alert-top"><span><BellRing size={20} /></span><Badge tone="light">NOTIFICATION CONCEPT</Badge></div><h2>Fill the room<br />before the whistle.</h2><p>Green could notify opted-in football fans once messaging providers are connected.</p><div className="match-alert-flow"><div><span className="flow-icon">⚽</span><span><strong>Big match detected</strong><small>Example: Champions League final</small></span></div><i /><div><span className="flow-icon"><UsersRound size={16} /></span><span><strong>Sample audience selected</strong><small>Would use visits & opt-ins</small></span></div><i /><div><span className="flow-icon"><Send size={16} /></span><span><strong>Example send at 18:00</strong><small>WhatsApp + push integration required</small></span></div></div><button onClick={() => onQuick("campaign")}>Review sample message <ArrowRight size={15} /></button>
        </Card>
        <Card className="games-library">
          <SectionTitle title="Games library" subtitle="Click a game to check it out or return it" action={`Manage all ${games.length}`} onAction={() => setPanel({ kind: "games" })} />
          <div className="game-covers">{games.slice(0, 4).map((game) => <button key={game.id} className={`game-cover-button ${game.className}`} onClick={() => setPanel({ kind: "game", item: game })}><b>{game.name}</b><span>{game.symbol}</span><small>{game.players}</small><i>{game.status === "available" ? "Available" : "Checked out"}</i></button>)}</div>
          <div className="game-footer"><span><Badge tone="green" dot>{availableGames} available</Badge><Badge tone="orange">{games.length - availableGames} checked out</Badge></span><button onClick={() => setPanel({ kind: "qr" })}><QrCode size={15} />Open game menu QR</button></div>
        </Card>
        <Card className="kids-park-card">
          <div className="kids-art"><span className="kids-star a">★</span><span className="kids-star b">●</span><span className="kids-rainbow">◠</span><strong>PLAY<br />TIME!</strong></div>
          <div className="kids-copy"><Badge tone="purple">KIDS PARK</Badge><h2>Fun for them.<br />A real pause for parents.</h2><p>Capacity, safety rules, guardian contact, and workshop bookings—clear for every family.</p><div><span><CheckCircle2 size={15} />{kidsCount} children inside</span><span><Clock3 size={15} />Closes at 21:00</span></div><button onClick={() => setPanel({ kind: "kids" })}>Manage kids park <ArrowUpRight size={15} /></button></div>
        </Card>
      </div>
      {panel && <ExperiencePanel panel={panel} games={games} kidsCount={kidsCount} onClose={() => setPanel(null)} onCreate={createEvent} onSaveEvent={saveEvent} onToggleGame={toggleGame} onKidsCount={setKidsCount} />}
    </div>
  );
}

function ExperiencePanel({ panel, games, kidsCount, onClose, onCreate, onSaveEvent, onToggleGame, onKidsCount }) {
  const title = panel.kind === "public" ? "Guest experience preview" : panel.kind === "create" ? "Create an event" : panel.kind === "event" ? panel.item.title : panel.kind === "games" ? "Games library" : panel.kind === "game" ? panel.item.name : panel.kind === "qr" ? "Game menu QR" : "Kids park check-in";
  const currentGame = panel.kind === "game" ? games.find((game) => game.id === panel.item.id) : null;
  return (
    <><aside className="detail-panel open admin-detail-panel experience-panel"><header><div><Badge tone="purple">Interactive demo</Badge><h2>{title}</h2><p>All changes remain on this page until it is refreshed.</p></div><IconButton label={`Close ${title}`} onClick={onClose}><X size={19} /></IconButton></header><div className="detail-body">
      {panel.kind === "public" && <div className="experience-public-preview"><Badge tone="green">TODAY AT GREEN</Badge><h3>Stay for more than coffee.</h3><p>Browse games before arriving, see what is available now, and reserve a place at the next community event.</p><div><article><span>⚽</span><strong>Match nights</strong><small>Bookings and table capacity</small></article><article><Dice5 size={24} /><strong>Games menu</strong><small>Availability and player count</small></article><article><span>★</span><strong>Kids park</strong><small>Rules, hours and workshops</small></article></div></div>}
      {panel.kind === "create" && <form id="create-event-demo" className="admin-form-stack" onSubmit={onCreate}><label><span>Event title</span><input name="title" required autoFocus placeholder="Community quiz night" /></label><label><span>Experience type</span><select name="type"><option>Community event</option><option>Football night</option><option>Board games</option><option>Kids park</option></select></label><div className="form-grid"><label><span>Date</span><input name="date" type="date" defaultValue={`2026-08-${String(panel.day || 22).padStart(2, "0")}`} /></label><label><span>Time</span><input name="time" type="time" defaultValue="18:00" /></label><label><span>Capacity</span><input name="capacity" type="number" min="2" defaultValue="30" /></label></div><p className="admin-helper">The preview adds the event to this page only.</p></form>}
      {panel.kind === "event" && <form id="edit-event-demo" className="admin-form-stack" onSubmit={(event) => onSaveEvent(panel.item, event)}><div className="admin-summary-card"><CalendarDays size={20} /><span><strong>{panel.item.date} • {panel.item.time}</strong><small>{panel.item.bookings} of {panel.item.capacity} sample places booked</small></span><Badge tone="green">{panel.item.type}</Badge></div><label><span>Event name</span><input name="title" defaultValue={panel.item.title} /></label><div className="form-grid"><label><span>Date</span><input name="date" type="date" defaultValue={eventDateInput(panel.item.date)} /></label><label><span>Start time</span><input name="time" type="time" defaultValue={panel.item.time} /></label><label><span>Capacity</span><input name="capacity" type="number" min="2" defaultValue={panel.item.capacity} /></label></div><label><span>Guest information</span><textarea name="guestInfo" rows="4" defaultValue={panel.item.guestInfo || "Arrive 20 minutes early. Tables are held for 15 minutes after the event starts."} /></label></form>}
      {panel.kind === "games" && <div className="admin-game-list">{games.map((game) => <article key={game.id}><span className={game.className}>{game.symbol}</span><div><strong>{game.name}</strong><small>{game.players}</small></div><Badge tone={game.status === "available" ? "green" : "orange"}>{game.status === "available" ? "Available" : "Checked out"}</Badge><Button size="small" variant="secondary" onClick={() => onToggleGame(game.id)}>{game.status === "available" ? "Check out" : "Return"}</Button></article>)}</div>}
      {panel.kind === "game" && currentGame && <div className="game-detail-preview"><span className={currentGame.className}>{currentGame.symbol}</span><Badge tone={currentGame.status === "available" ? "green" : "orange"}>{currentGame.status === "available" ? "AVAILABLE NOW" : "CHECKED OUT"}</Badge><h3>{currentGame.name}</h3><p>{currentGame.players} • Ask the barista for the game pieces. Please return every component to the box.</p><ul><li><Check size={14} />ID or table number recorded at checkout</li><li><Check size={14} />Missing-piece check on return</li><li><Check size={14} />Guest sees availability on the public menu</li></ul></div>}
      {panel.kind === "qr" && <div className="admin-qr-preview"><QrPattern size={132} /><h3>Browse games on your phone</h3><p>This simulated QR would open the public game library with live availability and rules.</p><code>greencoffee.demo/games</code></div>}
      {panel.kind === "kids" && <div className="kids-checkin-preview"><div><button onClick={() => onKidsCount(Math.max(0, kidsCount - 1))} aria-label="Check one child out">−</button><span><strong>{kidsCount}</strong><small>children inside</small></span><button onClick={() => onKidsCount(Math.min(18, kidsCount + 1))} aria-label="Check one child in">+</button></div><Progress value={(kidsCount / 18) * 100} tone={kidsCount >= 16 ? "orange" : "green"} /><p>Demo capacity: {kidsCount}/18. A production check-in would also record guardian contact, child name, check-in time, and safety consent.</p><div className="admin-summary-card"><ShieldCheck size={20} /><span><strong>Safety checklist</strong><small>Guardian confirmed • wristband assigned • allergies reviewed</small></span><Badge tone="green">Ready</Badge></div></div>}
    </div><footer><Button variant="secondary" onClick={onClose}>Close</Button>{panel.kind === "create" && <Button icon={Plus} type="submit" form="create-event-demo">Add demo event</Button>}{panel.kind === "event" && <Button icon={Check} type="submit" form="edit-event-demo">Save preview</Button>}{panel.kind === "game" && currentGame && <Button icon={currentGame.status === "available" ? TicketCheck : RefreshCw} onClick={() => onToggleGame(currentGame.id)}>{currentGame.status === "available" ? "Check out game" : "Return game"}</Button>}</footer></aside><button className="drawer-scrim" onClick={onClose} aria-label={`Close ${title}`} /></>
  );
}

const settingTabs = ["Website", "Team & security", "Payments", "All modules"];

export function SettingsView({ theme, onToggleTheme, onPreview, showToast }) {
  const [tab, setTab] = useState("Website");
  return (
    <div className="view settings-view">
      <PageHeader eyebrow="Configuration preview" title="Platform setup" description="Explore proposed website, team, payment, and data controls. Provider-backed settings require production implementation."
        actions={<Button icon={Check} onClick={() => showToast("Demo configuration reviewed")}>Review demo changes</Button>}
      />
      <div className="settings-tabs">{settingTabs.map((item) => <button key={item} className={tab === item ? "active" : ""} onClick={() => setTab(item)}>{item}</button>)}</div>
      {tab === "Website" && <WebsiteSettings theme={theme} onToggleTheme={onToggleTheme} onPreview={onPreview} showToast={showToast} />}
      {tab === "Team & security" && <TeamSettings showToast={showToast} />}
      {tab === "Payments" && <PaymentSettings showToast={showToast} />}
      {tab === "All modules" && <ModuleSettings showToast={showToast} />}
    </div>
  );
}

function WebsiteSettings({ theme, onToggleTheme, onPreview, showToast }) {
  const [hours, setHours] = useState(true);
  const [gallery, setGallery] = useState(true);
  const [accessible, setAccessible] = useState(true);
  return (
    <div className="settings-layout">
      <div className="settings-main-stack">
        <Card><SectionTitle title="Brand & public website" subtitle="The story and details guests see before they visit" />
          <div className="brand-editor"><div className="tenant-logo"><img src="/logo.jpg" alt="Green Coffee Games logo" /></div><div><Button size="small" variant="secondary" icon={Upload} onClick={() => showToast("Logo upload preview opened; no file is sent in this demo")}>Replace logo concept</Button><p>Real café logo used in this demo</p></div></div>
          <div className="form-grid settings-form"><label><span>Café name</span><input defaultValue="Green Coffee Games" /></label><label><span>Tagline</span><input defaultValue="Good coffee. Great reasons to stay." /></label><label className="span-2"><span>Brand story</span><textarea rows="4" defaultValue="A warm neighborhood café in La Marsa, made for specialty coffee, friendly competition, big matches, and easy family time." /></label></div>
        </Card>
        <Card><SectionTitle title="Guest information" subtitle="Keep useful visit details accurate everywhere" /><div className="contact-settings"><label><MapPin size={17} /><span><small>Address</small><input defaultValue="La Marsa, Tunis, Tunisia" /></span></label><label><Phone size={17} /><span><small>Phone</small><input defaultValue="+216 55 321 315" /></span></label><label><Mail size={17} /><span><small>Email</small><input defaultValue="hello@greencoffee.tn" /></span></label></div><div className="social-row"><span><Instagram size={17} />Instagram</span><input defaultValue="@greencoffeegames" /><span><Facebook size={17} />Facebook</span><input defaultValue="Green Coffee Games" /></div></Card>
        <Card><SectionTitle title="Website sections" subtitle="Choose what appears on the customer website" /><div className="setting-toggle-list"><div><span className="setting-list-icon"><Clock3 size={18} /></span><span><strong>Opening hours & closures</strong><small>Weekly schedule with special closure notices</small></span><Toggle checked={hours} onChange={setHours} label="Toggle opening hours" /></div><div><span className="setting-list-icon"><Image size={18} /></span><span><strong>Photo gallery</strong><small>Café, products, games and atmosphere</small></span><Toggle checked={gallery} onChange={setGallery} label="Toggle gallery" /></div><div><span className="setting-list-icon"><MonitorSmartphone size={18} /></span><span><strong>Accessibility mode</strong><small>Keyboard navigation, contrast and semantic content</small></span><Toggle checked={accessible} onChange={setAccessible} label="Toggle accessibility" /></div></div></Card>
      </div>
      <div className="settings-side-stack">
        <Card className="website-preview-card"><div className="browser-bar"><i /><i /><i /><span>greencoffee.demo</span></div><div className="site-preview"><nav><span><Coffee size={17} />GREEN</span><i>Menu &nbsp; Events &nbsp; Visit</i></nav><Badge tone="light">DEMO PREVIEW</Badge><h2>Take a little<br /><em>pause.</em></h2><p>Specialty coffee. Games. Good people.</p><button onClick={onPreview}>Explore our menu</button><div className="preview-cup"><span>☕</span><i /></div></div><Button variant="secondary" icon={ExternalLink} onClick={onPreview}>Open customer preview</Button></Card>
        <Card><SectionTitle title="Appearance" subtitle="Dashboard and customer theme" /><div className="theme-options"><button className={theme !== "dark" ? "active" : ""} onClick={() => theme === "dark" && onToggleTheme()}><span className="theme-swatch light"><i /><i /><i /></span><CheckCircle2 size={16} />Warm light</button><button className={theme === "dark" ? "active" : ""} onClick={() => theme !== "dark" && onToggleTheme()}><span className="theme-swatch dark"><i /><i /><i /></span><CheckCircle2 size={16} />Evening dark</button></div><div className="language-setting"><Languages size={18} /><span><strong>Languages</strong><small>English shown • French integration planned</small></span><button onClick={() => showToast("Language plan: English now, French and Arabic in production")}>Language plan</button></div></Card>
        <Card className="domain-card"><span className="metric-icon green"><Globe2 size={19} /></span><div><Badge tone="neutral">SETUP REQUIRED</Badge><strong>Custom domain</strong><small>Domain, hosting and SSL require deployment</small></div><button onClick={() => showToast("Publishing requires hosting and domain setup")}>Preview publish</button></Card>
      </div>
    </div>
  );
}

function TeamSettings({ showToast }) {
  return (
    <div className="settings-layout">
      <div className="settings-main-stack">
        <Card><div className="rules-head"><SectionTitle title="Team & permissions concept" subtitle="Illustrative roles; production access requires server-side authentication" /><Button size="small" icon={Plus} onClick={() => showToast("Team invitation preview opened")}>Preview invite</Button></div><div className="team-table"><div className="team-table-head"><span>Team member</span><span>Role</span><span>Shift</span><span>Demo status</span><span /></div>{staff.map((person, index) => <div className="team-row" key={person.name}><span><Avatar initials={person.initials} tone={index} online={index < 3} /><span><strong>{person.name}</strong><small>{index === 0 ? "sofiene@greencoffee.tn" : `${person.name.toLowerCase()}@greencoffee.tn`}</small></span></span><Badge tone={person.role === "Owner" ? "dark" : person.role === "Manager" ? "purple" : "neutral"}>{person.role}</Badge><span>{person.shift}</span><Badge tone={person.status === "Break" ? "orange" : "purple"}>{person.status} sample</Badge><IconButton label={`Options for ${person.name}`} onClick={() => showToast(`${person.name}'s team profile opened in preview mode`)}><MoreHorizontal size={17} /></IconButton></div>)}</div></Card>
        <Card><SectionTitle title="Role access" subtitle="Three clear staff workspaces" /><div className="role-grid"><article><span><ShieldCheck size={19} /></span><h3>Owner</h3><p>Full platform, billing, exports and security.</p><Badge tone="dark">1 member</Badge></article><article><span><UserRoundCog size={19} /></span><h3>Manager</h3><p>Operations, reports, tables, reservations and team shifts.</p><Badge tone="purple">1 member</Badge></article><article><span><Coffee size={19} /></span><h3>Barista</h3><p>Order preparation and menu availability.</p><Badge tone="neutral">Bar station</Badge></article></div></Card>
      </div>
      <div className="settings-side-stack">
        <Card className="staff-qr-card"><div className="staff-qr-art"><QrCode size={64} /><span><LockKeyhole size={15} />Demo QR</span></div><div><Badge tone="blue">QR ACCESS CONCEPT</Badge><h3>Start a shift in one scan.</h3><p>Secure rotating staff access would require backend identity, expiry, and audit controls.</p><button onClick={() => showToast("Staff QR access requires backend integration")}>Preview QR flow <RefreshCw size={14} /></button></div></Card>
        <Card><SectionTitle title="Security plan" subtitle="Production controls require backend integration" /><div className="security-list"><div><span><KeyRound size={17} /></span><span><strong>Two-step verification</strong><small>Planned for owner and manager</small></span><Badge tone="neutral">Required</Badge></div><div><span><Activity size={17} /></span><span><strong>Activity log concept</strong><small>Sample events shown below</small></span><ChevronRight size={15} /></div><div><span><DatabaseBackup size={17} /></span><span><strong>Automatic backup</strong><small>Encrypted cloud storage required</small></span><Badge tone="neutral">Planned</Badge></div></div></Card>
        <Card className="audit-card"><SectionTitle title="Sample activity" subtitle="Illustrative audit entries" /><ol><li><Avatar initials="MK" size="xs" tone={1} /><span><strong>Price updated</strong><small>Pistachio cloud • sample event</small></span></li><li><Avatar initials="AY" size="xs" tone={2} /><span><strong>Order GC-1045 completed</strong><small>Table 05 • sample event</small></span></li><li><Avatar initials="SZ" size="xs" tone={0} /><span><strong>Campaign scheduled</strong><small>Derby night • sample event</small></span></li></ol><button onClick={() => showToast("Full sample activity log opened")}>Preview activity log <ChevronRight size={14} /></button></Card>
      </div>
    </div>
  );
}

const paymentProviders = [
  { name: "Konnect", copy: "Cards & local payments", status: "Integration required", tone: "blue", mark: "K" },
  { name: "Flouci", copy: "Wallet & QR payments", status: "Integration required", tone: "green", mark: "F" },
  { name: "Paymee", copy: "Online card checkout", status: "Optional integration", tone: "purple", mark: "P" },
];

function PaymentSettings({ showToast }) {
  return (
    <div className="settings-layout payments-settings">
      <div className="settings-main-stack">
        <Card><SectionTitle title="Payment integration options" subtitle="Provider credentials and secure backend checkout are required" /><div className="provider-list">{paymentProviders.map((provider) => <article key={provider.name}><span className={`provider-mark ${provider.tone}`}>{provider.mark}</span><span><strong>{provider.name}</strong><small>{provider.copy}</small></span><Badge tone="neutral">{provider.status}</Badge><Button size="small" variant="secondary" onClick={() => showToast(`${provider.name} requires production integration`)}>View requirements</Button></article>)}</div></Card>
        <Card><SectionTitle title="Checkout concepts" subtitle="Proposed options after payment integration" /><div className="setting-toggle-list"><div><span className="setting-list-icon"><CreditCard size={18} /></span><span><strong>Online payment</strong><small>Concept for table QR checkout</small></span><Toggle checked={false} onChange={() => showToast("Online payment requires a provider integration")} label="Preview online payment setting" /></div><div><span className="setting-list-icon"><ReceiptText size={18} /></span><span><strong>Digital receipts</strong><small>Email and PDF service required</small></span><Toggle checked={false} onChange={() => showToast("Digital receipts require backend delivery")} label="Preview digital receipts setting" /></div><div><span className="setting-list-icon"><QrCode size={18} /></span><span><strong>Receipt loyalty sync</strong><small>Concept requiring signed receipt records</small></span><Toggle checked={false} onChange={() => showToast("Receipt sync requires backend integration")} label="Preview receipt loyalty setting" /></div></div></Card>
        <Card><SectionTitle title="Payment status concept" subtitle="Proposed states for the future checkout workflow" /><div className="payment-rules"><div><Badge tone="green" dot>Paid</Badge><span>Would send a receipt and credit loyalty</span></div><div><Badge tone="orange" dot>Pay at cashier</Badge><span>Would remain open until staff confirms</span></div><div><Badge tone="rose" dot>Failed</Badge><span>Would offer another payment option</span></div></div></Card>
      </div>
      <div className="settings-side-stack">
        <Card className="payment-summary-card"><span className="metric-icon green"><CreditCard size={21} /></span><Badge tone="neutral">ILLUSTRATIVE DATA</Badge><h2>Example payment mix</h2><p>No live transactions are connected</p><div><span><strong>64%</strong>online example</span><span><strong>36%</strong>cashier example</span></div><Progress value={64} /><small>Provider integration required before launch</small></Card>
        <Card><SectionTitle title="Settlement layout preview" subtitle="Example rows — no bank transfers" /><div className="settlement-list"><div><span><strong>Sample settlement A</strong><small>Konnect + Flouci concept</small></span><strong>—</strong><Badge tone="neutral">Preview</Badge></div><div><span><strong>Sample settlement B</strong><small>Konnect + Flouci concept</small></span><strong>—</strong><Badge tone="neutral">Preview</Badge></div><div><span><strong>Sample settlement C</strong><small>Konnect concept</small></span><strong>—</strong><Badge tone="neutral">Preview</Badge></div></div><button onClick={() => showToast("Sample payout report opened; no banking data is connected")}>Preview payout report <ChevronRight size={14} /></button></Card>
      </div>
    </div>
  );
}

function ModuleSettings({ showToast }) {
  return (
    <div className="modules-settings">
      <section className="module-intro"><div><Badge tone="light">COMPLETE PLATFORM CONCEPT</Badge><h2>A complete coffee-shop operating vision.</h2><p>The demo brings customer experience, daily service, growth, intelligence, and control into one coherent front-end concept. Final scope follows the client’s selected modules.</p></div><span><strong>OS</strong><small>concept</small></span></section>
      <div className="module-group-grid">{moduleGroups.map((group, index) => <Card key={group.title}><span className={`module-number tone-${index}`}>0{index + 1}</span><h3>{group.title}</h3><ul>{group.features.map((feature) => <CheckLine key={feature}>{feature}</CheckLine>)}</ul><footer><Badge tone="purple">Concept included</Badge><button onClick={() => showToast(`${group.title} scope is represented in the interactive demo`)}>Explore <ChevronRight size={14} /></button></footer></Card>)}</div>
      <div className="service-grid">
        <Card><span className="service-icon"><Rocket size={21} /></span><div><Badge tone="orange">DEPLOYMENT REQUIRED</Badge><h3>Deployment & launch</h3><p>This front-end demo builds successfully; a live release still needs backend services, domain, SSL, monitoring, and handover.</p></div><button onClick={() => showToast("Production launch requires the remaining implementation checklist")}>View requirements <ArrowUpRight size={14} /></button></Card>
        <Card><span className="service-icon"><LifeBuoy size={21} /></span><div><Badge tone="blue">SERVICE OPTION</Badge><h3>Maintenance & support</h3><p>A future care plan can cover updates, backups, bug fixes, monitoring, and direct help.</p></div><button onClick={() => showToast("Support plan preview: updates, monitoring, backups and response times")}>Review support concept <ArrowUpRight size={14} /></button></Card>
        <Card><span className="service-icon"><CloudDownload size={21} /></span><div><Badge tone="purple">EXPORT CONCEPT</Badge><h3>Backup & export</h3><p>Portable exports require persistent backend storage, access controls, and a tested backup policy.</p></div><button onClick={() => showToast("Backup and export require backend storage")}>View export concept <Download size={14} /></button></Card>
      </div>
    </div>
  );
}
