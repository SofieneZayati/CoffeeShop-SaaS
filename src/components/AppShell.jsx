import { useState } from "react";
import {
  BarChart3,
  Bell,
  CalendarDays,
  ChevronDown,
  Coffee,
  ExternalLink,
  Gamepad2,
  Grid2X2,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Menu,
  Megaphone,
  Moon,
  Search,
  Settings,
  ShoppingBag,
  Sparkles,
  Sun,
  UserRoundCog,
  UsersRound,
  X,
} from "lucide-react";
import { Badge, BrandMark, IconButton } from "./ui";
import "../styles/shell-interactions.css";

export const navigation = [
  {
    label: "Workspace",
    items: [
      { id: "overview", label: "Overview", icon: LayoutDashboard },
      { id: "orders", label: "Live orders", icon: ShoppingBag, badge: "5" },
      { id: "menu", label: "Menu & QR", icon: Coffee },
      { id: "reservations", label: "Reservations", icon: CalendarDays, badge: "2" },
      { id: "floor", label: "Floor plan", icon: Grid2X2 },
    ],
  },
  {
    label: "Grow",
    items: [
      { id: "customers", label: "Customers", icon: UsersRound },
      { id: "marketing", label: "Campaigns", icon: Megaphone },
      { id: "insights", label: "Insights", icon: BarChart3 },
    ],
  },
  {
    label: "Experience",
    items: [
      { id: "automation", label: "AI & automation", icon: Sparkles, glow: true },
      { id: "experiences", label: "Games & events", icon: Gamepad2 },
      { id: "settings", label: "Platform setup", icon: Settings },
    ],
  },
];

export function filterNavigation(allowedViews) {
  const allowed = new Set(allowedViews);
  return navigation.map((group) => ({ ...group, items: group.items.filter((item) => allowed.has(item.id)) })).filter((group) => group.items.length);
}

export function Sidebar({ active, onNavigate, open, onClose, allowedViews, account, onLogout, onSwitchAccount }) {
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const visibleNavigation = filterNavigation(allowedViews);
  return (
    <>
      <aside className={`sidebar${open ? " open" : ""}`}>
        <div className="sidebar-head">
          <BrandMark />
          <IconButton label="Close navigation" className="sidebar-close" onClick={onClose}><X size={19} /></IconButton>
        </div>

        <button className="location-switcher" aria-expanded={locationOpen} onClick={() => setLocationOpen((value) => !value)}>
          <span className="location-thumb"><Coffee size={18} /></span>
          <span><strong>Green Coffee Games</strong><small>La Marsa • Open</small></span>
          <ChevronDown size={15} className={locationOpen ? "rotated" : ""} />
        </button>
        {locationOpen && <div className="sidebar-location-card" role="status"><span className="location-thumb"><Coffee size={17} /></span><span><strong>La Marsa</strong><small>Current demo location • open until 23:00</small></span><Badge tone="green">Selected</Badge></div>}

        <nav className="main-nav" aria-label="Main navigation">
          {visibleNavigation.map((group) => (
            <div className="nav-group" key={group.label}>
              <span className="nav-label">{group.label}</span>
              {group.items.map(({ id, label, icon: Icon, badge, glow }) => (
                <button
                  key={id}
                  className={`nav-item${active === id ? " active" : ""}${glow ? " ai-nav" : ""}`}
                  aria-current={active === id ? "page" : undefined}
                  onClick={() => { onNavigate(id); onClose(); }}
                >
                  <Icon size={18} strokeWidth={1.9} />
                  <span>{label}</span>
                  {badge && <b>{badge}</b>}
                  {glow && <i>AI</i>}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-foot">
          {supportOpen && <div className="sidebar-support-card"><strong>Demo help</strong><span>Use the sidebar to change areas. Press Ctrl/⌘ K for quick navigation.</span><button type="button" onClick={() => setSupportOpen(false)}>Got it</button></div>}
          <button className="support-link" aria-expanded={supportOpen} onClick={() => setSupportOpen((value) => !value)}><LifeBuoy size={17} /><span>Help & support</span></button>
          <div className="sidebar-account-wrap">
            {accountMenuOpen && <div className="sidebar-account-menu">
              <div><span className="user-avatar">{account.initials}<i /></span><span><strong>{account.name}</strong><small>{account.email}</small></span></div>
              <button onClick={onSwitchAccount}><UserRoundCog size={16} /><span>Switch demo account</span></button>
              <button onClick={onLogout}><LogOut size={16} /><span>Sign out</span></button>
            </div>}
            <button className="sidebar-user" aria-expanded={accountMenuOpen} onClick={() => setAccountMenuOpen((value) => !value)}>
              <span className="user-avatar">{account.initials}<i /></span>
              <span><strong>{account.firstName}</strong><small>{account.roleLabel}</small></span>
              <ChevronDown size={16} className={accountMenuOpen ? "rotated" : ""} />
            </button>
          </div>
        </div>
      </aside>
      {open && <button className="sidebar-scrim" aria-label="Close navigation" onClick={onClose} />}
    </>
  );
}

export function Topbar({ onOpenNav, onSearch, onNotifications, onPreview, theme, onToggleTheme, unread = 3, account, canPreview = true }) {
  const dateLabel = new Intl.DateTimeFormat("en", { weekday: "long", month: "long", day: "numeric" }).format(new Date());
  return (
    <header className="topbar">
      <IconButton label="Open navigation" className="mobile-menu" onClick={onOpenNav}><Menu size={20} /></IconButton>
      <div className="today-copy">
        <span>{dateLabel}</span>
        <strong><i /> Demo scenario running <em>• {account.roleLabel} view</em></strong>
      </div>
      <button className="top-search" onClick={onSearch}>
        <Search size={17} />
        <span>Search anything…</span>
        <kbd>⌘ K</kbd>
      </button>
      <div className="top-actions">
        <Badge tone="purple">Interactive demo</Badge>
        <IconButton label="Toggle color theme" onClick={onToggleTheme}>{theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}</IconButton>
        <IconButton label="Notifications" className="notification-button" onClick={onNotifications}>
          <Bell size={18} />
          {unread > 0 && <b>{unread}</b>}
        </IconButton>
        {canPreview && <button className="preview-button" onClick={onPreview}>
          <ExternalLink size={16} />
          <span>Customer view</span>
        </button>}
      </div>
    </header>
  );
}

export function MobileNav({ active, onNavigate, allowedViews, onOpenMore }) {
  const visibleItems = filterNavigation(allowedViews).flatMap((group) => group.items);
  const mobileItems = visibleItems.slice(0, 4);
  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile navigation" style={{ "--mobile-nav-count": mobileItems.length + 1 }}>
      {mobileItems.map(({ id, label, icon: Icon }) => (
        <button key={id} className={active === id ? "active" : ""} aria-current={active === id ? "page" : undefined} onClick={() => onNavigate(id)}>
          <Icon size={20} />
          <span>{label.replace("Live ", "")}</span>
        </button>
      ))}
      <button className={!mobileItems.some((item) => item.id === active) ? "active" : ""} onClick={onOpenMore}>
        <Menu size={20} /><span>More</span>
      </button>
    </nav>
  );
}
