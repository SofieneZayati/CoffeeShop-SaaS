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
import { useStaffLanguage } from "../context/StaffLanguageContext";
import "../styles/shell-interactions.css";

const MAPS_URL = "https://maps.app.goo.gl/43Fah1d5SSyX5r2W6";

export const navigation = [
  {
    label: "Workspace",
    labelKey: "nav.workspace",
    items: [
      { id: "overview", label: "Overview", labelKey: "view.overview", icon: LayoutDashboard },
      { id: "orders", label: "Live orders", labelKey: "view.orders", icon: ShoppingBag, badge: "5" },
      { id: "menu", label: "Menu & QR", labelKey: "view.menu", icon: Coffee },
      { id: "reservations", label: "Reservations", labelKey: "view.reservations", icon: CalendarDays, badge: "2" },
      { id: "floor", label: "Floor plan", labelKey: "view.floor", icon: Grid2X2 },
    ],
  },
  {
    label: "Grow",
    labelKey: "nav.grow",
    items: [
      { id: "customers", label: "Customers", labelKey: "view.customers", icon: UsersRound },
      { id: "marketing", label: "Campaigns", labelKey: "view.marketing", icon: Megaphone },
      { id: "insights", label: "Insights", labelKey: "view.insights", icon: BarChart3 },
    ],
  },
  {
    label: "Experience",
    labelKey: "nav.experience",
    items: [
      { id: "automation", label: "AI & automation", labelKey: "view.automation", icon: Sparkles, glow: true },
      { id: "experiences", label: "Games & events", labelKey: "view.experiences", icon: Gamepad2 },
      { id: "settings", label: "Platform setup", labelKey: "view.settings", icon: Settings },
    ],
  },
];

export function filterNavigation(allowedViews) {
  const allowed = new Set(allowedViews);
  return navigation.map((group) => ({ ...group, items: group.items.filter((item) => allowed.has(item.id)) })).filter((group) => group.items.length);
}

export function Sidebar({ active, onNavigate, open, onClose, allowedViews, account, onLogout, onSwitchAccount }) {
  const { t } = useStaffLanguage();
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const visibleNavigation = filterNavigation(allowedViews);
  return (
    <>
      <aside className={`sidebar${open ? " open" : ""}`}>
        <div className="sidebar-head">
          <BrandMark />
          <IconButton label={t("shell.closeNavigation", { en: "Close navigation", fr: "Fermer la navigation" })} className="sidebar-close" onClick={onClose}><X size={19} /></IconButton>
        </div>

        <button className="location-switcher" aria-expanded={locationOpen} onClick={() => setLocationOpen((value) => !value)}>
          <span className="location-thumb"><Coffee size={18} /></span>
          <span><strong>Green Coffee Games</strong><small>{t("location.summary", { en: "Mégrine • Open", fr: "Mégrine • Ouvert" })}</small></span>
          <ChevronDown size={15} className={locationOpen ? "rotated" : ""} />
        </button>
        {locationOpen && <a className="sidebar-location-card" href={MAPS_URL} target="_blank" rel="noreferrer"><span className="location-thumb"><Coffee size={17} /></span><span><strong>Mégrine</strong><small>{t("location.hours", { en: "Open in Google Maps • open until 23:00", fr: "Ouvrir dans Google Maps • ouvert jusqu’à 23h00" })}</small></span><Badge tone="green">{t("location.selected", { en: "Selected", fr: "Sélectionné" })}</Badge></a>}

        <nav className="main-nav" aria-label={t("shell.mainNavigation", { en: "Main navigation", fr: "Navigation principale" })}>
          {visibleNavigation.map((group) => (
            <div className="nav-group" key={group.label}>
              <span className="nav-label">{t(group.labelKey, group.label)}</span>
              {group.items.map(({ id, label, labelKey, icon: Icon, badge, glow }) => (
                <button
                  key={id}
                  className={`nav-item${active === id ? " active" : ""}${glow ? " ai-nav" : ""}`}
                  aria-current={active === id ? "page" : undefined}
                  onClick={() => { onNavigate(id); onClose(); }}
                >
                  <Icon size={18} strokeWidth={1.9} />
                  <span>{t(labelKey, label)}</span>
                  {badge && <b>{badge}</b>}
                  {glow && <i>AI</i>}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-foot">
          {supportOpen && <div className="sidebar-support-card"><strong>{t("support.title", { en: "Workspace help", fr: "Aide de l’espace" })}</strong><span>{t("support.copy", { en: "Use the sidebar to change areas. Press Ctrl/⌘ K for quick navigation.", fr: "Utilisez la barre latérale pour changer de section. Appuyez sur Ctrl/⌘ K pour naviguer rapidement." })}</span><button type="button" onClick={() => setSupportOpen(false)}>{t("support.gotIt", { en: "Got it", fr: "Compris" })}</button></div>}
          <button className="support-link" aria-expanded={supportOpen} onClick={() => setSupportOpen((value) => !value)}><LifeBuoy size={17} /><span>{t("support.link", { en: "Help & support", fr: "Aide et assistance" })}</span></button>
          <div className="sidebar-account-wrap">
            {accountMenuOpen && <div className="sidebar-account-menu">
              <div><span className="user-avatar">{account.initials}<i /></span><span><strong>{account.name}</strong><small>{account.email}</small></span></div>
              <button onClick={onSwitchAccount}><UserRoundCog size={16} /><span>{t("account.switch", { en: "Switch account", fr: "Changer de compte" })}</span></button>
              <button onClick={onLogout}><LogOut size={16} /><span>{t("account.signOut", { en: "Sign out", fr: "Se déconnecter" })}</span></button>
            </div>}
            <button className="sidebar-user" aria-expanded={accountMenuOpen} onClick={() => setAccountMenuOpen((value) => !value)}>
              <span className="user-avatar">{account.initials}<i /></span>
              <span><strong>{account.firstName}</strong><small>{t(`role.${account.role}`, account.roleLabel)}</small></span>
              <ChevronDown size={16} className={accountMenuOpen ? "rotated" : ""} />
            </button>
          </div>
        </div>
      </aside>
      {open && <button className="sidebar-scrim" aria-label={t("shell.closeNavigation", { en: "Close navigation", fr: "Fermer la navigation" })} onClick={onClose} />}
    </>
  );
}

export function Topbar({ onOpenNav, onSearch, onNotifications, onPreview, theme, onToggleTheme, unread = 3, account, canPreview = true }) {
  const { locale, t } = useStaffLanguage();
  const dateLabel = new Intl.DateTimeFormat(locale === "fr" ? "fr-TN" : "en-TN", { weekday: "long", month: "long", day: "numeric" }).format(new Date());
  return (
    <header className="topbar">
      <IconButton label={t("shell.openNavigation", { en: "Open navigation", fr: "Ouvrir la navigation" })} className="mobile-menu" onClick={onOpenNav}><Menu size={20} /></IconButton>
      <div className="today-copy">
        <span>{dateLabel}</span>
        <strong><i /> {t("topbar.open", { en: "Mégrine • Open", fr: "Mégrine • Ouvert" })} <em>• {t("topbar.roleView", { en: "{{role}} view", fr: "Vue {{role}}" }, { role: t(`role.${account.role}`, account.roleLabel) })}</em></strong>
      </div>
      <button className="top-search" onClick={onSearch}>
        <Search size={17} />
        <span>{t("search.anything", { en: "Search anything…", fr: "Rechercher…" })}</span>
        <kbd>⌘ K</kbd>
      </button>
      <div className="top-actions">
        <StaffLanguageSwitch />
        <Badge tone="purple">{t("topbar.live", { en: "Live workspace", fr: "Espace actif" })}</Badge>
        <IconButton label={t("theme.toggle", { en: "Toggle color theme", fr: "Changer le thème" })} onClick={onToggleTheme}>{theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}</IconButton>
        <IconButton label={t("notifications.title", { en: "Notifications", fr: "Notifications" })} className="notification-button" onClick={onNotifications}>
          <Bell size={18} />
          {unread > 0 && <b>{unread}</b>}
        </IconButton>
        {canPreview && <button className="preview-button" onClick={onPreview}>
          <ExternalLink size={16} />
          <span>{t("topbar.customerView", { en: "Customer view", fr: "Vue client" })}</span>
        </button>}
      </div>
    </header>
  );
}

export function MobileNav({ active, onNavigate, allowedViews, onOpenMore }) {
  const { t } = useStaffLanguage();
  const visibleItems = filterNavigation(allowedViews).flatMap((group) => group.items);
  const mobileItems = visibleItems.slice(0, 4);
  return (
    <nav className="mobile-bottom-nav" aria-label={t("shell.mobileNavigation", { en: "Mobile navigation", fr: "Navigation mobile" })} style={{ "--mobile-nav-count": mobileItems.length + 1 }}>
      {mobileItems.map(({ id, label, labelKey, icon: Icon }) => (
        <button key={id} className={active === id ? "active" : ""} aria-current={active === id ? "page" : undefined} onClick={() => onNavigate(id)}>
          <Icon size={20} />
          <span>{t(labelKey, label).replace(localePrefix(t, labelKey), "")}</span>
        </button>
      ))}
      <button className={!mobileItems.some((item) => item.id === active) ? "active" : ""} onClick={onOpenMore}>
        <Menu size={20} /><span>{t("nav.more", { en: "More", fr: "Plus" })}</span>
      </button>
    </nav>
  );
}

function localePrefix(t, labelKey) {
  return labelKey === "view.orders" ? t("nav.livePrefix", { en: "Live ", fr: "" }) : "";
}

export function StaffLanguageSwitch({ className = "" }) {
  const { locale, setLocale, t } = useStaffLanguage();
  return (
    <div className={`segmented staff-language-switch ${className}`.trim()} role="group" aria-label={t("language.choose", { en: "Choose workspace language", fr: "Choisir la langue de l’espace" })}>
      <button type="button" className={locale === "en" ? "active" : ""} aria-pressed={locale === "en"} onClick={() => setLocale("en")}>EN</button>
      <button type="button" className={locale === "fr" ? "active" : ""} aria-pressed={locale === "fr"} onClick={() => setLocale("fr")}>FR</button>
    </div>
  );
}
