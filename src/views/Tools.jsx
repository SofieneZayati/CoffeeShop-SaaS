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
import { automationRules, events, moduleGroups, staff } from "../data/demoData";
import { Avatar, Badge, Button, Card, CheckLine, IconButton, MetricDelta, PageHeader, Progress, SectionTitle, Segmented, Toggle } from "../components/ui";

const automationIcons = { calendar: CalendarDays, gift: Gift, heart: Heart, box: Box, star: Star };

export function AutomationView({ automations, onToggleAutomation, showToast }) {
  const [aiQuery, setAiQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const ask = (event) => {
    event.preventDefault();
    if (!aiQuery.trim()) return;
    setAnswer("Your Friday 19:00–21:00 window is projected to be busiest. Schedule Aya on bar and one extra floor teammate; prepare 18 pistachio bases before 18:30.");
  };
  return (
    <div className="view automation-view">
      <PageHeader eyebrow="Work smarter" title="AI & automation" description="A thoughtful co-pilot for your menu, guests, stock, and daily service."
        actions={<><Button variant="secondary" icon={Activity}>Run history</Button><Button icon={Plus}>New automation</Button></>}
      />
      <section className="ai-command-card">
        <div className="ai-command-copy"><span className="large-ai-orb"><Sparkles size={30} /></span><div><Badge tone="light">GREEN AI COPILOT</Badge><h2>What would you like to know?</h2><p>Ask about today’s floor, sales, stock, customers, or what to do next.</p></div></div>
        <form onSubmit={ask}><Sparkles size={18} /><input value={aiQuery} onChange={(event) => setAiQuery(event.target.value)} placeholder="Try “How should I staff Friday evening?”" /><button type="submit"><ArrowRight size={18} /></button></form>
        <div className="ai-prompts"><button onClick={() => setAiQuery("What needs my attention today?")}>What needs attention?</button><button onClick={() => setAiQuery("Which items should I promote?")}>What should I promote?</button><button onClick={() => setAiQuery("Summarise this week’s reviews")}>Summarise reviews</button></div>
        {answer && <div className="ai-answer"><span><Bot size={20} /></span><p>{answer}</p><button onClick={() => setAnswer("")}><X size={15} /></button></div>}
        <i className="ai-decoration one">✦</i><i className="ai-decoration two">✦</i>
      </section>
      <section className="automation-stats">
        <Card><span className="metric-icon purple"><Zap size={19} /></span><div><small>Active automations</small><strong>{automations.filter((item) => item.active).length}</strong><p>Saved 14.2 hours this month</p></div><MetricDelta>↑ 22%</MetricDelta></Card>
        <Card><span className="metric-icon green"><Send size={19} /></span><div><small>Messages handled</small><strong>289</strong><p>98.4% delivery rate</p></div><Badge tone="green">Healthy</Badge></Card>
        <Card><span className="metric-icon orange"><PackageCheck size={19} /></span><div><small>Stock alerts</small><strong>7</strong><p>0 surprise stock-outs</p></div><Badge tone="orange">2 open</Badge></Card>
        <Card><span className="metric-icon blue"><Bot size={19} /></span><div><small>Chatbot answers</small><strong>418</strong><p>82% resolved instantly</p></div><MetricDelta>↑ 31%</MetricDelta></Card>
      </section>
      <div className="automation-grid">
        <Card className="rules-card">
          <div className="rules-head"><SectionTitle title="Your automations" subtitle="Always-on workflows that keep the café moving" /><Button size="small" variant="secondary" icon={Plus}>Create rule</Button></div>
          <div className="automation-rule-list">{automations.map((rule, index) => { const Icon = automationIcons[rule.icon] || Zap; return <article key={rule.id}><span className={`rule-icon tone-${index}`}><Icon size={19} /></span><div><div><strong>{rule.name}</strong>{rule.active && <Badge tone="green" dot>Live</Badge>}</div><p>{rule.detail}</p><span>{rule.channel} • {rule.runs}</span></div><Toggle checked={rule.active} onChange={() => onToggleAutomation(rule.id)} label={`Toggle ${rule.name}`} /><IconButton label="Automation options"><MoreHorizontal size={17} /></IconButton></article>; })}</div>
        </Card>
        <Card className="stock-intelligence">
          <SectionTitle title="Stock intelligence" subtitle="AI watches consumption against par levels" />
          <div className="stock-item critical"><span className="stock-visual">🍰</span><div><div><strong>Tiramisu jars</strong><Badge tone="rose">Critical</Badge></div><p>7 left • about 2.5 hours of stock</p><Progress value={28} tone="rose" /></div><button>Restock</button></div>
          <div className="stock-item warning"><span className="stock-visual">🥛</span><div><div><strong>Oat milk</strong><Badge tone="orange">Low</Badge></div><p>9 L left • reorder before tomorrow</p><Progress value={44} tone="orange" /></div><button>Review</button></div>
          <div className="stock-item healthy"><span className="stock-visual">☕</span><div><div><strong>House espresso</strong><Badge tone="green">Healthy</Badge></div><p>18 kg • around 6 days of stock</p><Progress value={76} /></div><button>Details</button></div>
          <div className="stock-forecast"><Sparkles size={17} /><span><strong>Smart forecast:</strong> add 2 kg pistachio cream before Saturday’s event.</span></div>
        </Card>
        <Card className="recommendation-card">
          <div className="recommendation-art"><span className="rec-cup">☕</span><span className="rec-plus">+</span><span className="rec-cake">🍰</span><i>AI PICK</i></div>
          <Badge tone="purple"><Sparkles size={11} />SMART RECOMMENDATION</Badge><h2>A bundle guests will love.</h2><p>Pair Pistachio cloud + Tiramisu jar at <strong>22.500 TND</strong>. Predicted attach rate: 28%.</p><div className="rec-metrics"><span><strong>+182 TND</strong>weekly uplift</span><span><strong>68%</strong>confidence</span></div><Button variant="secondary" onClick={() => showToast("Bundle draft created")}>Create bundle</Button>
        </Card>
        <Card className="chatbot-card">
          <div className="chatbot-head"><span className="chatbot-avatar"><Bot size={20} /><i /></span><div><strong>Green Café Assistant</strong><small>Online • answers in EN & FR</small></div><Toggle checked onChange={() => showToast("Chatbot settings opened")} label="Toggle chatbot" /></div>
          <div className="chat-window"><div className="guest-message">Do you have oat milk and a quiet table?</div><div className="bot-message"><Sparkles size={14} /><span>Yes! Oat milk is available for every coffee. Tables T01 and T10 are currently quiet and free. Would you like to reserve one?</span></div><div className="chat-suggestions"><button>Reserve T10</button><button>See oat drinks</button></div></div>
          <button className="chatbot-settings">Train & customise assistant <ChevronRight size={15} /></button>
        </Card>
      </div>
    </div>
  );
}

export function ExperiencesView({ onQuick }) {
  const [tab, setTab] = useState("Events");
  return (
    <div className="view experiences-view">
      <PageHeader eyebrow="Your signature" title="Games, kids & events" description="Make Green Coffee the place guests choose for more than a great cup."
        actions={<><Button variant="secondary" icon={Eye}>Public page</Button><Button icon={Plus}>Create event</Button></>}
      />
      <section className="experience-hero">
        <div className="experience-hero-copy"><Badge tone="light">WHAT MAKES GREEN, GREEN</Badge><h2>Good coffee.<br />Great reasons to stay.</h2><p>Football nights, board games, and a safe kids park—organized in one joyful calendar.</p><div><Button variant="light" icon={CalendarDays}>Manage calendar</Button><button>Preview guest experience <ArrowUpRight size={15} /></button></div></div>
        <div className="experience-collage"><div className="collage-card football"><span>⚽</span><b>BIG MATCH<br />ENERGY</b><small>Next • Sat 20:00</small></div><div className="collage-card games"><Dice5 size={34} /><b>40+ GAMES</b></div><div className="collage-card kids"><span>★</span><b>KIDS<br />PARK</b><small>Safe • Paid access</small></div></div>
      </section>
      <section className="experience-metrics">
        <Card><span className="metric-icon orange"><TicketCheck size={19} /></span><div><small>Event bookings</small><strong>186</strong><p>This month</p></div><MetricDelta>↑ 28%</MetricDelta></Card>
        <Card><span className="metric-icon blue"><UsersRound size={19} /></span><div><small>Event guests</small><strong>342</strong><p>68% are returning</p></div><MetricDelta>↑ 18%</MetricDelta></Card>
        <Card><span className="metric-icon purple"><Gamepad2 size={19} /></span><div><small>Game check-outs</small><strong>124</strong><p>Uno is #1 this month</p></div><Badge tone="purple">40 games</Badge></Card>
        <Card><span className="metric-icon green"><CircleHelp size={19} /></span><div><small>Kids park visits</small><strong>98</strong><p>1,470.000 TND revenue</p></div><MetricDelta>↑ 12%</MetricDelta></Card>
      </section>
      <div className="experiences-grid">
        <Card className="events-card">
          <div className="events-head"><SectionTitle title="Upcoming experiences" subtitle="Bookings, capacity and promotion status" /><Segmented value={tab} onChange={setTab} label="Experience type" options={[{ value: "Events", label: "Events" }, { value: "Calendar", label: "Calendar" }]} /></div>
          <div className="event-list">{events.map((event, index) => <article key={event.title}><div className={`event-list-date ${event.tone}`}><span>{event.date.split(" • ")[0]}</span><strong>{event.date.split(" ").at(-1)}</strong><small>{event.time}</small></div><div className="event-list-main"><div><Badge tone={index === 0 ? "green" : index === 1 ? "orange" : "purple"}>{event.type}</Badge>{index === 0 && <Badge tone="blue">Notifications scheduled</Badge>}</div><h3>{event.title}</h3><span><UsersRound size={14} />{event.bookings}/{event.capacity} booked</span><Progress value={(event.bookings / event.capacity) * 100} tone={index === 0 ? "green" : index === 1 ? "orange" : "purple"} /></div><div className="event-list-actions"><strong>{Math.round((event.bookings / event.capacity) * 100)}%</strong><button><MoreHorizontal size={18} /></button><button>Manage <ChevronRight size={15} /></button></div></article>)}</div>
        </Card>
        <Card className="match-alert-card">
          <div className="match-alert-top"><span><BellRing size={20} /></span><Badge tone="light">SMART NOTIFICATIONS</Badge></div><h2>Fill the room<br />before the whistle.</h2><p>Green automatically notifies football fans before every big match.</p><div className="match-alert-flow"><div><span className="flow-icon">⚽</span><span><strong>Big match detected</strong><small>Champions League final</small></span></div><i /><div><span className="flow-icon"><UsersRound size={16} /></span><span><strong>1,284 fans selected</strong><small>Based on visits & opt-ins</small></span></div><i /><div><span className="flow-icon"><Send size={16} /></span><span><strong>Send at 18:00</strong><small>WhatsApp + push</small></span></div></div><button onClick={() => onQuick("campaign")}>Review message <ArrowRight size={15} /></button>
        </Card>
        <Card className="games-library">
          <SectionTitle title="Games library" subtitle="Show guests what’s ready to play" action="Manage all 40" />
          <div className="game-covers"><article className="uno"><b>UNO</b><span>★ ★</span><small>2–10 players</small></article><article className="catan"><b>CATAN</b><span>♜</span><small>3–4 players</small></article><article className="cards"><b>PLAYING<br />CARDS</b><span>♠</span><small>2–8 players</small></article><article className="chess"><b>CHESS</b><span>♞</span><small>2 players</small></article></div>
          <div className="game-footer"><span><Badge tone="green" dot>36 available</Badge><Badge tone="orange">4 checked out</Badge></span><button><QrCode size={15} />Game menu QR</button></div>
        </Card>
        <Card className="kids-park-card">
          <div className="kids-art"><span className="kids-star a">★</span><span className="kids-star b">●</span><span className="kids-rainbow">◠</span><strong>PLAY<br />TIME!</strong></div>
          <div className="kids-copy"><Badge tone="purple">KIDS PARK</Badge><h2>Fun for them.<br />A real pause for parents.</h2><p>Paid access, safety rules, capacity, and workshop bookings—clear for every family.</p><div><span><CheckCircle2 size={15} />12 children inside</span><span><Clock3 size={15} />Closes at 21:00</span></div><button>Manage kids park <ArrowUpRight size={15} /></button></div>
        </Card>
      </div>
    </div>
  );
}

const settingTabs = ["Website", "Team & security", "Payments", "All modules"];

export function SettingsView({ theme, onToggleTheme, onPreview, showToast }) {
  const [tab, setTab] = useState("Website");
  return (
    <div className="view settings-view">
      <PageHeader eyebrow="Make it yours" title="Platform setup" description="Your public presence, team access, payments, data, and every enabled module."
        actions={<Button icon={Check} onClick={() => showToast("All platform settings saved")}>Save changes</Button>}
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
          <div className="brand-editor"><div className="tenant-logo"><Coffee size={30} /><span><strong>GREEN</strong><small>COFFEE • GAMES</small></span></div><div><Button size="small" variant="secondary" icon={Upload}>Upload logo</Button><p>PNG or SVG • 2 MB max</p></div></div>
          <div className="form-grid settings-form"><label><span>Café name</span><input defaultValue="Green Coffee Games" /></label><label><span>Tagline</span><input defaultValue="Good coffee. Great reasons to stay." /></label><label className="span-2"><span>Brand story</span><textarea rows="4" defaultValue="A warm neighborhood café in La Marsa, made for specialty coffee, friendly competition, big matches, and easy family time." /></label></div>
        </Card>
        <Card><SectionTitle title="Guest information" subtitle="Keep useful visit details accurate everywhere" /><div className="contact-settings"><label><MapPin size={17} /><span><small>Address</small><input defaultValue="La Marsa, Tunis, Tunisia" /></span></label><label><Phone size={17} /><span><small>Phone</small><input defaultValue="+216 55 321 315" /></span></label><label><Mail size={17} /><span><small>Email</small><input defaultValue="hello@greencoffee.tn" /></span></label></div><div className="social-row"><span><Instagram size={17} />Instagram</span><input defaultValue="@greencoffeegames" /><span><Facebook size={17} />Facebook</span><input defaultValue="Green Coffee Games" /></div></Card>
        <Card><SectionTitle title="Website sections" subtitle="Choose what appears on the customer website" /><div className="setting-toggle-list"><div><span className="setting-list-icon"><Clock3 size={18} /></span><span><strong>Opening hours & closures</strong><small>Weekly schedule with special closure notices</small></span><Toggle checked={hours} onChange={setHours} label="Toggle opening hours" /></div><div><span className="setting-list-icon"><Image size={18} /></span><span><strong>Photo gallery</strong><small>Café, products, games and atmosphere</small></span><Toggle checked={gallery} onChange={setGallery} label="Toggle gallery" /></div><div><span className="setting-list-icon"><MonitorSmartphone size={18} /></span><span><strong>Accessibility mode</strong><small>Keyboard navigation, contrast and semantic content</small></span><Toggle checked={accessible} onChange={setAccessible} label="Toggle accessibility" /></div></div></Card>
      </div>
      <div className="settings-side-stack">
        <Card className="website-preview-card"><div className="browser-bar"><i /><i /><i /><span>greencoffee.tn</span></div><div className="site-preview"><nav><span><Coffee size={17} />GREEN</span><i>Menu &nbsp; Events &nbsp; Visit</i></nav><Badge tone="light">OPEN NOW</Badge><h2>Take a little<br /><em>pause.</em></h2><p>Specialty coffee. Games. Good people.</p><button onClick={onPreview}>Explore our menu</button><div className="preview-cup"><span>☕</span><i /></div></div><Button variant="secondary" icon={ExternalLink} onClick={onPreview}>Open customer preview</Button></Card>
        <Card><SectionTitle title="Appearance" subtitle="Dashboard and customer theme" /><div className="theme-options"><button className={theme !== "dark" ? "active" : ""} onClick={() => theme === "dark" && onToggleTheme()}><span className="theme-swatch light"><i /><i /><i /></span><CheckCircle2 size={16} />Warm light</button><button className={theme === "dark" ? "active" : ""} onClick={() => theme !== "dark" && onToggleTheme()}><span className="theme-swatch dark"><i /><i /><i /></span><CheckCircle2 size={16} />Evening dark</button></div><div className="language-setting"><Languages size={18} /><span><strong>Languages</strong><small>English & French enabled</small></span><button>Manage</button></div></Card>
        <Card className="domain-card"><span className="metric-icon green"><Globe2 size={19} /></span><div><Badge tone="green" dot>CONNECTED</Badge><strong>greencoffee.tn</strong><small>SSL active • Last published 2h ago</small></div><button onClick={() => showToast("Website published successfully")}>Publish</button></Card>
      </div>
    </div>
  );
}

function TeamSettings({ showToast }) {
  return (
    <div className="settings-layout">
      <div className="settings-main-stack">
        <Card><div className="rules-head"><SectionTitle title="Team & permissions" subtitle="Give each person exactly the access they need" /><Button size="small" icon={Plus}>Invite teammate</Button></div><div className="team-table"><div className="team-table-head"><span>Team member</span><span>Role</span><span>Shift</span><span>Status</span><span /></div>{staff.map((person, index) => <div className="team-row" key={person.name}><span><Avatar initials={person.initials} tone={index} online={index < 3} /><span><strong>{person.name}</strong><small>{index === 0 ? "sofiene@greencoffee.tn" : `${person.name.toLowerCase()}@greencoffee.tn`}</small></span></span><Badge tone={person.role === "Owner" ? "dark" : person.role === "Manager" ? "purple" : "neutral"}>{person.role}</Badge><span>{person.shift}</span><Badge tone={person.status === "Break" ? "orange" : "green"} dot>{person.status}</Badge><IconButton label="Team member options"><MoreHorizontal size={17} /></IconButton></div>)}</div></Card>
        <Card><SectionTitle title="Role access" subtitle="Owner, manager and staff permissions" /><div className="role-grid"><article><span><ShieldCheck size={19} /></span><h3>Owner</h3><p>Full platform, billing, exports and security.</p><Badge tone="dark">1 member</Badge></article><article><span><UserRoundCog size={19} /></span><h3>Manager</h3><p>Operations, reports, menu and team shifts.</p><Badge tone="purple">1 member</Badge></article><article><span><Coffee size={19} /></span><h3>Staff</h3><p>Orders, tables, reservations and shift notes.</p><Badge tone="neutral">2 members</Badge></article></div></Card>
      </div>
      <div className="settings-side-stack">
        <Card className="staff-qr-card"><div className="staff-qr-art"><QrCode size={64} /><span><LockKeyhole size={15} />Secure access</span></div><div><Badge tone="blue">STAFF QR LOGIN</Badge><h3>Start a shift in one scan.</h3><p>Rotating QR access opens the staff dashboard without sharing passwords.</p><button onClick={() => showToast("New staff QR generated")}>Generate new QR <RefreshCw size={14} /></button></div></Card>
        <Card><SectionTitle title="Security" subtitle="Your workspace is protected" /><div className="security-list"><div><span><KeyRound size={17} /></span><span><strong>Two-step verification</strong><small>Required for owner and manager</small></span><Badge tone="green">On</Badge></div><div><span><Activity size={17} /></span><span><strong>Activity log</strong><small>164 tracked actions this month</small></span><ChevronRight size={15} /></div><div><span><DatabaseBackup size={17} /></span><span><strong>Automatic backup</strong><small>Today at 04:00 • encrypted</small></span><Badge tone="green">Current</Badge></div></div></Card>
        <Card className="audit-card"><SectionTitle title="Recent activity" subtitle="Important back-office changes" /><ol><li><Avatar initials="MK" size="xs" tone={1} /><span><strong>Price updated</strong><small>Pistachio cloud • 12 min ago</small></span></li><li><Avatar initials="AY" size="xs" tone={2} /><span><strong>Order GC-1045 completed</strong><small>Table 05 • 18 min ago</small></span></li><li><Avatar initials="SZ" size="xs" tone={0} /><span><strong>Campaign scheduled</strong><small>Derby night • 1h ago</small></span></li></ol><button>Full activity log <ChevronRight size={14} /></button></Card>
      </div>
    </div>
  );
}

const paymentProviders = [
  { name: "Konnect", copy: "Cards & local payments", status: "Connected", tone: "blue", mark: "K" },
  { name: "Flouci", copy: "Wallet & QR payments", status: "Connected", tone: "green", mark: "F" },
  { name: "Paymee", copy: "Online card checkout", status: "Available", tone: "purple", mark: "P" },
];

function PaymentSettings({ showToast }) {
  return (
    <div className="settings-layout payments-settings">
      <div className="settings-main-stack">
        <Card><SectionTitle title="Payment providers" subtitle="Accept secure local and online payments" /><div className="provider-list">{paymentProviders.map((provider) => <article key={provider.name}><span className={`provider-mark ${provider.tone}`}>{provider.mark}</span><span><strong>{provider.name}</strong><small>{provider.copy}</small></span><Badge tone={provider.status === "Connected" ? "green" : "neutral"} dot={provider.status === "Connected"}>{provider.status}</Badge><Button size="small" variant="secondary" onClick={() => showToast(`${provider.name} settings opened`)}>{provider.status === "Connected" ? "Manage" : "Connect"}</Button></article>)}</div></Card>
        <Card><SectionTitle title="Checkout preferences" subtitle="How guests pay and receive proof of purchase" /><div className="setting-toggle-list"><div><span className="setting-list-icon"><CreditCard size={18} /></span><span><strong>Online payment</strong><small>Allow payment from the table QR checkout</small></span><Toggle checked onChange={() => {}} label="Online payment" /></div><div><span className="setting-list-icon"><ReceiptText size={18} /></span><span><strong>Digital receipts</strong><small>Email and downloadable PDF after payment</small></span><Toggle checked onChange={() => {}} label="Digital receipts" /></div><div><span className="setting-list-icon"><QrCode size={18} /></span><span><strong>Receipt loyalty sync</strong><small>Receipt QR credits points and saves history</small></span><Toggle checked onChange={() => {}} label="Receipt loyalty sync" /></div></div></Card>
        <Card><SectionTitle title="Payment status rules" subtitle="Make exceptions visible to the team" /><div className="payment-rules"><div><Badge tone="green" dot>Paid</Badge><span>Send receipt and credit loyalty immediately</span></div><div><Badge tone="orange" dot>Pay at cashier</Badge><span>Keep table bill open until staff confirms</span></div><div><Badge tone="rose" dot>Failed</Badge><span>Notify customer and show another payment option</span></div></div></Card>
      </div>
      <div className="settings-side-stack">
        <Card className="payment-summary-card"><span className="metric-icon green"><CreditCard size={21} /></span><Badge tone="green">PAYMENTS HEALTHY</Badge><h2>12,842.500 TND</h2><p>Processed online this month</p><div><span><strong>64%</strong>online</span><span><strong>36%</strong>at cashier</span></div><Progress value={64} /><small>99.8% successful payment rate</small></Card>
        <Card><SectionTitle title="Latest settlements" subtitle="Transfers to your bank" /><div className="settlement-list"><div><span><strong>Jul 10 settlement</strong><small>Konnect + Flouci</small></span><strong>1,842.500 TND</strong><Badge tone="green">Paid</Badge></div><div><span><strong>Jul 8 settlement</strong><small>Konnect + Flouci</small></span><strong>2,106.000 TND</strong><Badge tone="green">Paid</Badge></div><div><span><strong>Jul 6 settlement</strong><small>Konnect</small></span><strong>1,594.500 TND</strong><Badge tone="green">Paid</Badge></div></div><button>View payout report <ChevronRight size={14} /></button></Card>
      </div>
    </div>
  );
}

function ModuleSettings({ showToast }) {
  return (
    <div className="modules-settings">
      <section className="module-intro"><div><Badge tone="light">86 FEATURES MAPPED</Badge><h2>Your complete coffee-shop operating system.</h2><p>Every feature from the Green Coffee proposal is represented across the platform—customer experience, daily service, growth, intelligence, and control.</p></div><span><strong>86</strong><small>capabilities</small></span></section>
      <div className="module-group-grid">{moduleGroups.map((group, index) => <Card key={group.title}><span className={`module-number tone-${index}`}>0{index + 1}</span><h3>{group.title}</h3><ul>{group.features.map((feature) => <CheckLine key={feature}>{feature}</CheckLine>)}</ul><footer><Badge tone="green" dot>Enabled</Badge><button>Configure <ChevronRight size={14} /></button></footer></Card>)}</div>
      <div className="service-grid">
        <Card><span className="service-icon"><Rocket size={21} /></span><div><Badge tone="green">PRODUCTION READY</Badge><h3>Deployment & launch</h3><p>Optimised build, custom domain, SSL, analytics and owner handover.</p></div><button onClick={() => showToast("Deployment checklist opened")}>Launch checklist <ArrowUpRight size={14} /></button></Card>
        <Card><span className="service-icon"><LifeBuoy size={21} /></span><div><Badge tone="blue">PRIORITY CARE</Badge><h3>Maintenance & support</h3><p>Updates, backups, bug fixes and direct help when the team needs it.</p></div><button>View support plan <ArrowUpRight size={14} /></button></Card>
        <Card><span className="service-icon"><CloudDownload size={21} /></span><div><Badge tone="purple">YOUR DATA</Badge><h3>Backup & export</h3><p>Portable customer, sales, reservation and loyalty exports at any time.</p></div><button onClick={() => showToast("Full backup export prepared")}>Export everything <Download size={14} /></button></Card>
      </div>
    </div>
  );
}
