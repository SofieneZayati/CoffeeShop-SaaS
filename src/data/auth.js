export const DEMO_ACCOUNTS = [
  {
    id: "owner",
    email: "sofiene@greencoffee.tn",
    password: "GreenOwner26!",
    name: "Sofiene Zayati",
    firstName: "Sofiene",
    initials: "SZ",
    role: "owner",
    roleLabel: "Owner",
    description: "Full business, finance, team and platform access",
    color: "green",
  },
  {
    id: "manager",
    email: "malek@greencoffee.tn",
    password: "GreenManager26!",
    name: "Malek Khemiri",
    firstName: "Malek",
    initials: "MK",
    role: "manager",
    roleLabel: "Manager",
    description: "Daily operations, growth, reports and experiences",
    color: "purple",
  },
  {
    id: "barista",
    email: "aya@greencoffee.tn",
    password: "GreenBarista26!",
    name: "Aya Mansour",
    firstName: "Aya",
    initials: "AY",
    role: "barista",
    roleLabel: "Barista",
    description: "Order preparation and product availability",
    color: "orange",
  },
  {
    id: "floor",
    email: "fares@greencoffee.tn",
    password: "GreenFloor26!",
    name: "Fares Ben Ali",
    firstName: "Fares",
    initials: "FA",
    role: "floor",
    roleLabel: "Floor staff",
    description: "Tables, service, bookings and waiter orders",
    color: "blue",
  },
  {
    id: "customer",
    email: "mariem@greencoffee.tn",
    password: "GreenGuest26!",
    name: "Mariem Ben Ali",
    firstName: "Mariem",
    initials: "MB",
    role: "customer",
    roleLabel: "Customer",
    description: "Personal menu, orders, bookings and rewards",
    color: "rose",
    points: 1280,
    tier: "Gold",
  },
];

const allStaffViews = ["overview", "orders", "menu", "reservations", "floor", "customers", "marketing", "insights", "automation", "experiences", "settings"];

export const ROLE_CONFIG = {
  owner: {
    defaultView: "overview",
    views: allStaffViews,
    quickActions: ["order", "menu", "reservation", "qr", "campaign"],
    permissions: ["all"],
  },
  manager: {
    defaultView: "overview",
    views: allStaffViews.filter((view) => view !== "settings"),
    quickActions: ["order", "menu", "reservation", "qr", "campaign"],
    permissions: ["operate", "manage_menu", "manage_guests", "manage_growth", "view_insights", "manage_events"],
  },
  barista: {
    defaultView: "orders",
    views: ["orders", "menu"],
    quickActions: [],
    permissions: ["prepare_orders", "toggle_availability", "view_stock"],
  },
  floor: {
    defaultView: "floor",
    views: ["floor", "orders", "reservations"],
    quickActions: ["order", "reservation"],
    permissions: ["serve_orders", "manage_floor", "manage_reservations", "create_waiter_order"],
  },
  customer: {
    defaultView: "customer",
    views: [],
    quickActions: [],
    permissions: ["own_profile", "own_orders", "own_reservations", "own_rewards"],
  },
};

export function authenticate(email, password) {
  const normalizedEmail = email.trim().toLowerCase();
  return DEMO_ACCOUNTS.find((account) => account.email.toLowerCase() === normalizedEmail && account.password === password) || null;
}

export function getAccount(accountId) {
  return DEMO_ACCOUNTS.find((account) => account.id === accountId) || null;
}

export function getRoleConfig(account) {
  return ROLE_CONFIG[account?.role] || ROLE_CONFIG.customer;
}

export function can(account, permission) {
  const permissions = getRoleConfig(account).permissions;
  return permissions.includes("all") || permissions.includes(permission);
}
