import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  CakeSlice,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Download,
  Eye,
  FileSpreadsheet,
  Filter,
  Gift,
  Heart,
  Lightbulb,
  Mail,
  MessageCircle,
  MessageSquareText,
  MoreHorizontal,
  MousePointerClick,
  Plus,
  QrCode,
  ReceiptText,
  RefreshCw,
  Search,
  Send,
  Share2,
  ShoppingBag,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Trophy,
  UserPlus,
  UsersRound,
  WalletCards,
  X,
  Zap,
} from "lucide-react";
import { campaigns, customers, feedback, heatmap, menuItemsSeed } from "../data/demoData";
import { Avatar, Badge, Button, Card, IconButton, MetricDelta, PageHeader, Progress, SectionTitle, Segmented } from "../components/ui";

const segmentCards = [
  { label: "VIP & Gold", value: "284", change: "+18 this month", icon: Trophy, tone: "gold", progress: 76 },
  { label: "New guests", value: "156", change: "Last 30 days", icon: UserPlus, tone: "green", progress: 58 },
  { label: "At risk", value: "92", change: "No visit in 30d", icon: Heart, tone: "rose", progress: 36 },
  { label: "Football fans", value: "418", change: "Event opt-ins", icon: Target, tone: "blue", progress: 68 },
];

export function CustomersView({ onQuick }) {
  const [segment, setSegment] = useState("All customers");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const filtered = customers.filter((customer) => customer.name.toLowerCase().includes(query.toLowerCase()) && (segment === "All customers" || customer.tier === segment));
  return (
    <div className="view customers-view">
      <PageHeader eyebrow="Relationships" title="Customers & loyalty" description="Know your regulars, reward their rituals, and make every return feel personal."
        actions={<><Button variant="secondary" icon={Download}>Export customers</Button><Button icon={UserPlus}>Add customer</Button></>}
      />
      <section className="customer-metrics">
        <Card><span className="metric-icon green"><UsersRound size={19} /></span><div><small>Total customers</small><strong>1,842</strong><p>72% opted into marketing</p></div><MetricDelta>↑ 8.2%</MetricDelta></Card>
        <Card><span className="metric-icon purple"><RefreshCw size={19} /></span><div><small>Return rate</small><strong>64.8%</strong><p>+4.1 pts this quarter</p></div><Badge tone="green">Strong</Badge></Card>
        <Card><span className="metric-icon orange"><WalletCards size={19} /></span><div><small>Points redeemed</small><strong>18,420</strong><p>312 rewards this month</p></div><MetricDelta>↑ 14%</MetricDelta></Card>
        <Card><span className="metric-icon blue"><CircleDollarSign size={19} /></span><div><small>Member value</small><strong>28.400 TND</strong><p>1.7× non-member spend</p></div><MetricDelta>↑ 6.5%</MetricDelta></Card>
      </section>

      <section className="segment-grid">
        {segmentCards.map(({ label, value, change, icon: Icon, tone, progress }) => (
          <button className={`segment-card ${tone}`} key={label} onClick={() => setSegment(label === "VIP & Gold" ? "Gold" : "All customers")}>
            <span className="segment-icon"><Icon size={19} /></span><span><small>{label}</small><strong>{value}</strong><em>{change}</em></span><div className="segment-progress"><i style={{ width: `${progress}%` }} /></div><ChevronRight size={16} />
          </button>
        ))}
      </section>

      <div className="customer-main-grid">
        <Card className="customer-directory">
          <div className="directory-head"><SectionTitle title="Customer directory" subtitle="Profiles, visits, preferences, and value" /><Button size="small" variant="secondary" icon={Filter}>Filter</Button></div>
          <div className="directory-toolbar"><div className="menu-search"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search customers…" /></div><div className="category-filter"><select value={segment} onChange={(event) => setSegment(event.target.value)}><option>All customers</option><option>VIP</option><option>Gold</option><option>Silver</option><option>Bronze</option></select><ChevronDown size={15} /></div></div>
          <div className="customer-table" role="table">
            <div className="customer-table-head" role="row"><span>Customer</span><span>Tier</span><span>Visits</span><span>Total spend</span><span>Points</span><span>Last visit</span><span /></div>
            {filtered.map((customer, index) => (
              <button className="customer-table-row" role="row" key={customer.name} onClick={() => setSelected(customer)}>
                <span className="customer-cell"><Avatar initials={customer.initials} tone={index} /><span><strong>{customer.name}</strong><small>Loves {customer.favorite}</small></span></span>
                <span><Badge tone={customer.tier === "VIP" ? "dark" : customer.tier === "Gold" ? "orange" : customer.tier === "Silver" ? "neutral" : "rose"}>{customer.tier}</Badge></span>
                <strong>{customer.visits}</strong><span><strong>{customer.spent.toFixed(3)} TND</strong><small className="positive">{customer.trend}</small></span><strong>{customer.points.toLocaleString()}</strong><span>{customer.last}</span><MoreHorizontal size={17} />
              </button>
            ))}
          </div>
        </Card>
        <div className="customer-side-stack">
          <Card className="loyalty-program-card">
            <div className="loyalty-program-visual"><span><Gift size={24} /></span><i className="spark one">✦</i><i className="spark two">✦</i><b>GREEN<br />REWARDS</b></div>
            <Badge tone="light">LOYALTY PROGRAM</Badge><h2>Turn visits into rituals.</h2><p>1 TND = 10 points • Free drink at 1,000 points</p>
            <div className="loyalty-stats"><div><strong>1,468</strong><span>Active members</span></div><div><strong>72%</strong><span>Repeat visits</span></div></div>
            <button>Manage rewards <ArrowUpRight size={15} /></button>
          </Card>
          <Card className="birthday-card"><span className="birthday-icon"><CakeSlice size={20} /></span><div><Badge tone="purple">5 THIS WEEK</Badge><h3>Birthdays coming up</h3><p>Automatic free-coffee rewards are ready.</p></div><button onClick={() => onQuick("campaign")}>View <ChevronRight size={15} /></button></Card>
          <Card className="referral-card"><div><Share2 size={20} /><span><strong>Refer a friend</strong><small>Both guests earn 150 points</small></span></div><div className="referral-numbers"><span><strong>84</strong> invites</span><span><strong>31%</strong> converted</span></div><button>Configure referral</button></Card>
        </div>
      </div>

      {selected && <CustomerDetail customer={selected} onClose={() => setSelected(null)} onCampaign={() => { setSelected(null); onQuick("campaign"); }} />}
    </div>
  );
}

function CustomerDetail({ customer, onClose, onCampaign }) {
  return (
    <><aside className="detail-panel open customer-detail"><header><div><Badge tone="green" dot>Active customer</Badge><h2>Customer profile</h2><p>Full history and preferences</p></div><IconButton label="Close customer" onClick={onClose}><X size={19} /></IconButton></header><div className="detail-body">
      <div className="customer-profile-hero"><Avatar initials={customer.initials} size="xl" tone={2} online /><div><h2>{customer.name}</h2><span>Member since October 2024</span><div><Badge tone={customer.tier === "VIP" ? "dark" : "orange"}><Trophy size={11} />{customer.tier}</Badge><Badge tone="green">Marketing opt-in</Badge></div></div></div>
      <div className="profile-kpis"><div><strong>{customer.visits}</strong><span>Visits</span></div><div><strong>{customer.spent.toFixed(3)}</strong><span>TND spent</span></div><div><strong>{customer.points.toLocaleString()}</strong><span>Points</span></div></div>
      <section><h3>Preferences</h3><div className="preference-tags"><span>♥ {customer.favorite}</span><span>Oat milk</span><span>Usually iced</span><span>Afternoon visitor</span></div></section>
      <section><h3>Rewards wallet</h3><div className="wallet-item"><Gift size={18} /><span><strong>Free signature drink</strong><small>Expires July 31</small></span><Badge tone="green">Ready</Badge></div><div className="wallet-item"><ReceiptText size={18} /><span><strong>Receipt history</strong><small>38 synced receipts</small></span><ChevronRight size={15} /></div></section>
      <section><h3>Recent activity</h3><ol className="profile-activity"><li><span className="activity-icon"><ShoppingBag size={15} /></span><span><strong>Ordered {customer.favorite}</strong><small>{customer.last} • 18.500 TND</small></span><b>+185 pts</b></li><li><span className="activity-icon"><Star size={15} /></span><span><strong>Left a 5-star rating</strong><small>“Always my favorite spot.”</small></span></li><li><span className="activity-icon"><QrCode size={15} /></span><span><strong>Scanned receipt QR</strong><small>Points credited automatically</small></span><b>+120 pts</b></li></ol></section>
    </div><footer><Button variant="secondary" icon={Gift}>Add reward</Button><Button icon={Send} onClick={onCampaign}>Send message</Button></footer></aside><button className="drawer-scrim" onClick={onClose} aria-label="Close customer profile" /></>
  );
}

export function MarketingView({ onQuick }) {
  const [campaignTab, setCampaignTab] = useState("All");
  const filteredCampaigns = campaignTab === "All" ? campaigns : campaigns.filter((item) => item.status === campaignTab);
  return (
    <div className="view marketing-view">
      <PageHeader eyebrow="Bring them back" title="Campaigns & feedback" description="Timely messages, honest guest feedback, and growth you can feel."
        actions={<><Button variant="secondary" icon={QrCode}>Feedback QR</Button><Button icon={Plus} onClick={() => onQuick("campaign")}>New campaign</Button></>}
      />
      <section className="marketing-metrics">
        <Card><span className="metric-icon purple"><Send size={19} /></span><div><small>Messages sent</small><strong>4,286</strong><p>Across all channels</p></div><MetricDelta>↑ 22%</MetricDelta></Card>
        <Card><span className="metric-icon green"><MousePointerClick size={19} /></span><div><small>Avg. conversion</small><strong>18.6%</strong><p>Industry benchmark 9.4%</p></div><Badge tone="green">2× benchmark</Badge></Card>
        <Card><span className="metric-icon orange"><Star size={19} /></span><div><small>Guest rating</small><strong>4.9 <small>/ 5</small></strong><p>286 verified ratings</p></div><MetricDelta>↑ 0.2</MetricDelta></Card>
        <Card><span className="metric-icon blue"><MessageSquareText size={19} /></span><div><small>Feedback rate</small><strong>34.2%</strong><p>Via table QR</p></div><MetricDelta>↑ 6.8%</MetricDelta></Card>
      </section>
      <div className="marketing-grid">
        <Card className="campaign-list-card">
          <div className="campaign-list-head"><SectionTitle title="Campaigns" subtitle="Recent and scheduled broadcasts" /><Button size="small" variant="secondary" icon={Filter}>Filter</Button></div>
          <Segmented value={campaignTab} onChange={setCampaignTab} label="Campaign status" options={[{ value: "All", label: "All", count: campaigns.length }, { value: "Live", label: "Live" }, { value: "Scheduled", label: "Scheduled" }, { value: "Completed", label: "Completed" }]} />
          <div className="campaign-table"><div className="campaign-table-head"><span>Campaign</span><span>Audience</span><span>Reach</span><span>Conversion</span><span>Status</span><span /></div>{filteredCampaigns.map((campaign) => <button className="campaign-row" key={campaign.name}><span><span className={`channel-icon ${campaign.type.toLowerCase()}`}>{campaign.type === "WhatsApp" ? <MessageCircle size={17} /> : campaign.type === "Email" ? <Mail size={17} /> : campaign.type === "Push" ? <Bell size={17} /> : <Zap size={17} />}</span><span><strong>{campaign.name}</strong><small>{campaign.type} • {campaign.date}</small></span></span><span>{campaign.audience}</span><strong>{campaign.reach}</strong><strong>{campaign.conversion}</strong><Badge tone={campaign.status === "Live" ? "green" : campaign.status === "Scheduled" ? "blue" : campaign.status === "Always on" ? "purple" : "neutral"} dot>{campaign.status}</Badge><MoreHorizontal size={17} /></button>)}</div>
        </Card>
        <Card className="campaign-spotlight">
          <div className="spotlight-art"><span>⚽</span><i>DERBY<br />NIGHT</i><b>13 JUL</b></div>
          <Badge tone="light">SCHEDULED</Badge><h2>A full house,<br />before kick-off.</h2><p>Your big-match message will reach 1,284 football fans at 18:00.</p>
          <div className="spotlight-audience"><div className="member-stack"><Avatar initials="MB" size="xs" tone={1} /><Avatar initials="AG" size="xs" tone={3} /><Avatar initials="RK" size="xs" tone={4} /></div><span>+1,281 opted-in guests</span></div>
          <button>Review campaign <ArrowUpRight size={15} /></button>
        </Card>
        <Card className="feedback-card">
          <div className="feedback-card-head"><SectionTitle title="Fresh feedback" subtitle="Latest from your guests" action="View all" /><div className="rating-summary"><strong>4.9</strong><span>★★★★★<small>286 reviews</small></span></div></div>
          <div className="feedback-list">{feedback.map((item, index) => <article key={item.name}><Avatar initials={item.name.slice(0, 2).toUpperCase()} size="sm" tone={index + 1} /><div><div><strong>{item.name}</strong><span>{"★".repeat(item.rating)}</span></div><p>{item.text}</p><small><Badge tone="neutral">{item.tag}</Badge>{item.time}</small></div><button><MessageCircle size={15} />Reply</button></article>)}</div>
        </Card>
        <Card className="review-ai-card"><span className="ai-orb"><Sparkles size={23} /></span><div><Badge tone="purple">AI REVIEW DIGEST</Badge><h3>Guests love the service speed.</h3><p>“Friendly team” and “fast QR ordering” appeared 18 times this week. The main request is more single-origin coffee.</p><div><span><Check size={14} />Positive sentiment 92%</span><span><Lightbulb size={14} />1 menu opportunity</span></div></div><button>Full AI summary <ChevronRight size={15} /></button></Card>
      </div>
    </div>
  );
}

function SmallAreaChart({ values, tone = "green" }) {
  const width = 500; const height = 190; const max = Math.max(...values); const min = Math.min(...values);
  const points = values.map((value, index) => `${(index / (values.length - 1)) * width},${height - ((value - min) / (max - min || 1)) * (height - 24) - 12}`);
  const line = `M${points.join(" L")}`; const area = `${line} L${width},${height} L0,${height} Z`;
  return <svg className={`small-area-chart ${tone}`} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none"><defs><linearGradient id={`area-${tone}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="currentColor" stopOpacity=".22" /><stop offset="1" stopColor="currentColor" stopOpacity="0" /></linearGradient></defs>{[38, 83, 128, 173].map((y) => <line key={y} x1="0" y1={y} x2={width} y2={y} />)}<path d={area} fill={`url(#area-${tone})`} /><path d={line} className="data-line" /></svg>;
}

const salesTrend = [22, 28, 26, 34, 31, 40, 46, 43, 52, 49, 59, 63, 58, 70, 68, 76];
const ordersTrend = [18, 23, 21, 29, 26, 33, 31, 38, 35, 43, 47, 44, 51, 49, 56, 61];

export function InsightsView({ showToast }) {
  const [metric, setMetric] = useState("revenue");
  const [period, setPeriod] = useState("30 days");
  const series = metric === "revenue" ? salesTrend : ordersTrend;
  return (
    <div className="view insights-view">
      <PageHeader eyebrow="Know what works" title="Insights" description="Clear answers about sales, guests, QR activity, and the hours that shape your day."
        actions={<><div className="period-select"><CalendarDays size={16} /><select value={period} onChange={(event) => setPeriod(event.target.value)}><option>Last 7 days</option><option>30 days</option><option>Quarter</option><option>This year</option></select><ChevronDown size={14} /></div><Button icon={FileSpreadsheet} onClick={() => showToast("CSV report prepared for download")}>Export report</Button></>}
      />
      <section className="insight-kpis">
        <Card><div><span>Net revenue</span><Badge tone="green">+14.2%</Badge></div><strong>38,924.500 <small>TND</small></strong><p><TrendingUp size={14} /> 4,842.000 more than last period</p></Card>
        <Card><div><span>Orders</span><Badge tone="green">+9.8%</Badge></div><strong>2,316</strong><p>74.7 orders per day</p></Card>
        <Card><div><span>Avg. order value</span><Badge tone="green">+4.1%</Badge></div><strong>16.807 <small>TND</small></strong><p>Best at dinner • 19.420</p></Card>
        <Card><div><span>Returning customers</span><Badge tone="green">+6.3%</Badge></div><strong>64.8%</strong><p>1,501 repeat visits</p></Card>
      </section>
      <div className="insights-grid">
        <Card className="main-insight-chart span-8">
          <div className="insight-chart-head"><SectionTitle title="Performance trend" subtitle={`${period} compared with previous period`} /><Segmented value={metric} onChange={setMetric} label="Chart metric" options={[{ value: "revenue", label: "Revenue" }, { value: "orders", label: "Orders" }]} /></div>
          <div className="big-chart-number"><strong>{metric === "revenue" ? "38,924.500 TND" : "2,316 orders"}</strong><MetricDelta>↑ {metric === "revenue" ? "14.2" : "9.8"}%</MetricDelta></div>
          <SmallAreaChart values={series} />
          <div className="insight-axis"><span>Jun 12</span><span>Jun 18</span><span>Jun 24</span><span>Jun 30</span><span>Jul 6</span><span>Today</span></div>
        </Card>
        <Card className="sales-mix span-4">
          <SectionTitle title="Sales mix" subtitle="Revenue by category" />
          <div className="donut-wrap"><div className="sales-donut"><span><strong>38.9k</strong><small>TND total</small></span></div></div>
          <div className="mix-legend"><div><span><i className="mix-a" />Coffee</span><strong>48%</strong></div><div><span><i className="mix-b" />Cold drinks</span><strong>24%</strong></div><div><span><i className="mix-c" />Desserts</span><strong>18%</strong></div><div><span><i className="mix-d" />Bakery & other</span><strong>10%</strong></div></div>
        </Card>
        <Card className="peak-card span-7">
          <SectionTitle title="Peak-hour heatmap" subtitle="Orders by hour and weekday • darker means busier" />
          <div className="heatmap-wrap"><div className="heatmap-times">{["09", "11", "13", "15", "17", "19", "21", "23"].map((time) => <span key={time}>{time}:00</span>)}</div><div className="heatmap-grid">{heatmap.map((row, rowIndex) => row.map((level, columnIndex) => <i key={`${rowIndex}-${columnIndex}`} data-level={level} title={`${level * 12} orders`} />))}</div><div className="heatmap-days">{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => <span key={day}>{day}</span>)}</div></div>
          <div className="peak-insight"><Lightbulb size={17} /><span><strong>Your busiest window is Friday–Sunday, 18:00–21:00.</strong> Plan +1 floor team member and pre-batch cold brew.</span></div>
        </Card>
        <Card className="qr-analytics span-5">
          <SectionTitle title="QR performance" subtitle="Menu, table, receipts & feedback" />
          <div className="qr-total"><span className="metric-icon blue"><QrCode size={19} /></span><div><strong>3,842 scans</strong><span>+18.4% this period</span></div><MetricDelta>↑ 18.4%</MetricDelta></div>
          <div className="qr-sources"><div><span><i className="table" />Table ordering</span><strong>2,106</strong><Progress value={55} tone="blue" /></div><div><span><i className="menu" />Storefront menu</span><strong>984</strong><Progress value={26} tone="purple" /></div><div><span><i className="receipt" />Receipt loyalty</span><strong>518</strong><Progress value={13} tone="orange" /></div><div><span><i className="feedback" />Feedback</span><strong>234</strong><Progress value={6} tone="green" /></div></div>
        </Card>
        <Card className="product-performance span-7">
          <SectionTitle title="Product performance" subtitle="Top items by revenue and momentum" action="Full report" />
          <div className="product-performance-table"><div className="performance-head"><span>Product</span><span>Units</span><span>Revenue</span><span>Trend</span></div>{menuItemsSeed.slice(0, 4).map((item, index) => <div className="performance-row" key={item.id}><span><span className={`item-pic ${item.tone}`}>{item.image ? <img src={item.image} alt="" style={{ objectPosition: item.objectPosition }} /> : item.emoji}</span><span><strong>{item.name}</strong><small>{item.category}</small></span></span><strong>{item.sales * 8}</strong><strong>{(item.sales * item.price * 8).toFixed(3)} TND</strong><MetricDelta>{index === 2 ? "↑ 5.4%" : `↑ ${18 - index * 3}.2%`}</MetricDelta></div>)}</div>
        </Card>
        <Card className="ai-insights span-5">
          <div className="ai-insights-head"><span className="ai-orb"><Sparkles size={22} /></span><div><Badge tone="purple">GREEN AI</Badge><h2>Three things worth knowing.</h2></div></div>
          <ol><li><span>01</span><div><strong>Pistachio is your growth engine</strong><p>Signature items drive 31% of new-customer second visits.</p></div></li><li><span>02</span><div><strong>Thursday has room to grow</strong><p>A 15:00 happy hour could add an estimated 210 TND weekly.</p></div></li><li><span>03</span><div><strong>Football guests spend more</strong><p>Event-night order value is 22% above your average.</p></div></li></ol>
          <button>Ask Green AI <ArrowRight size={15} /></button>
        </Card>
      </div>
    </div>
  );
}
