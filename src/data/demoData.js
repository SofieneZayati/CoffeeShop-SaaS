export const ordersSeed = [
  {
    id: "GC-1048",
    table: "T08",
    guest: "Table 08",
    source: "Table QR",
    time: "2 min",
    total: 32.5,
    status: "new",
    payment: "Paid online",
    items: ["2× Pistachio latte", "1× Tiramisu"],
    note: "One latte with oat milk",
  },
  {
    id: "GC-1047",
    table: "T03",
    guest: "Amel B.",
    source: "Waiter",
    time: "6 min",
    total: 18,
    status: "making",
    payment: "Pay at cashier",
    items: ["1× Flat white", "1× Cookie"],
    note: "No sugar",
  },
  {
    id: "GC-1046",
    table: "T11",
    guest: "Table 11",
    source: "Table QR",
    time: "9 min",
    total: 41.5,
    status: "making",
    payment: "Paid • Flouci",
    items: ["2× Iced caramel", "1× Cheesecake", "1× Espresso"],
    note: "Extra ice on one drink",
  },
  {
    id: "GC-1045",
    table: "TA2",
    guest: "Terrace A2",
    source: "Table QR",
    time: "12 min",
    total: 24,
    status: "ready",
    payment: "Paid • Konnect",
    items: ["2× Cappuccino", "1× Brownie"],
    note: "",
  },
  {
    id: "GC-1044",
    table: "T05",
    guest: "Table 05",
    source: "Waiter",
    time: "14 min",
    total: 15.5,
    status: "ready",
    payment: "Pay at cashier",
    items: ["1× V60 Ethiopia", "1× Croissant"],
    note: "",
  },
];

export const menuItemsSeed = [
  { id: 1, name: "Pistachio cloud", category: "Signature", customerCategory: "Coffee", price: 14.5, sales: 86, stock: 18, active: true, featured: true, emoji: "☁️", tone: "sage", image: "/menu/pistachio-cloud.webp", alt: "Iced pistachio latte with silky cold foam and crushed pistachios", objectPosition: "50% 53%", description: "Espresso, pistachio cream and silky cold foam", ingredients: "Double espresso, pistachio cream, milk and cold foam", tags: ["Contains nuts", "Best seller"] },
  { id: 2, name: "Iced caramel latte", category: "Cold coffee", customerCategory: "Cold drinks", price: 12, sales: 74, stock: 31, active: true, featured: true, emoji: "🧊", tone: "sand", image: "/menu/iced-caramel-latte.webp", alt: "Layered iced caramel latte with espresso, milk and clear ice", objectPosition: "50% 54%", description: "Double espresso, fresh milk and salted caramel", ingredients: "Double espresso, milk, salted caramel and ice", tags: ["Cold", "Milk"] },
  { id: 3, name: "V60 Ethiopia", category: "Slow coffee", customerCategory: "Coffee", price: 11, sales: 43, stock: 12, active: true, featured: false, emoji: "◌", tone: "clay", image: "/menu/v60-ethiopia.webp", alt: "Ethiopian V60 filter coffee with ceramic cup and glass pour-over", objectPosition: "50% 58%", description: "Floral filter coffee with peach and bergamot notes", ingredients: "Freshly ground Ethiopian single-origin coffee and filtered water", tags: ["Vegan", "Single origin"] },
  { id: 4, name: "Tiramisu jar", category: "Desserts", customerCategory: "Desserts", price: 10.5, sales: 56, stock: 7, active: true, featured: true, emoji: "🍰", tone: "rose", image: "/menu/tiramisu-jar.webp", alt: "Glass tiramisu jar with mascarpone layers and cocoa dusting", objectPosition: "50% 52%", description: "Mascarpone, cocoa and Green Coffee espresso", ingredients: "Mascarpone, sponge, espresso, cocoa and eggs", tags: ["Egg", "Milk"] },
  { id: 5, name: "Matcha strawberry", category: "Signature", customerCategory: "Cold drinks", price: 15, sales: 39, stock: 14, active: true, featured: false, emoji: "🍓", tone: "berry", image: "/menu/matcha-strawberry.webp", alt: "Layered strawberry matcha latte with oat milk and fresh strawberry", objectPosition: "50% 54%", description: "Ceremonial matcha, strawberry and oat milk", ingredients: "Ceremonial matcha, strawberry purée, oat milk and ice", tags: ["Oat milk", "New"] },
  { id: 6, name: "Butter croissant", category: "Bakery", customerCategory: "Pastries", price: 5.5, sales: 61, stock: 16, active: true, featured: false, emoji: "🥐", tone: "amber", image: "/menu/butter-croissant.webp", alt: "Golden all-butter croissant with crisp flaky layers", objectPosition: "50% 56%", description: "Flaky, all-butter croissant baked every morning", ingredients: "Wheat flour, cultured butter, yeast, milk and eggs", tags: ["Gluten", "Milk"] },
  { id: 7, name: "Chicken pesto focaccia", category: "Kitchen", customerCategory: "Sandwiches", price: 16.5, sales: 48, stock: 14, active: true, featured: true, emoji: "🥪", tone: "sage", description: "Grilled chicken, basil pesto, mozzarella and rocket", ingredients: "Focaccia, chicken breast, basil pesto, mozzarella, rocket and tomato", tags: ["Made to order", "Contains nuts"] },
  { id: 8, name: "Tunisian tuna baguette", category: "Kitchen", customerCategory: "Sandwiches", price: 14, sales: 42, stock: 19, active: true, featured: false, emoji: "🥖", tone: "sand", description: "Tuna, méchouia, egg, olives and a touch of harissa", ingredients: "Baguette, tuna, grilled pepper salad, egg, olives and harissa", tags: ["Local favorite", "Spicy option"] },
  { id: 9, name: "Turkey croque", category: "Kitchen", customerCategory: "Sandwiches", price: 15, sales: 36, stock: 17, active: true, featured: false, emoji: "🥪", tone: "clay", description: "Smoked turkey, emmental and creamy mustard béchamel", ingredients: "Country bread, smoked turkey, emmental, béchamel and mustard", tags: ["Hot", "Cheesy"] },
  { id: 10, name: "Banana chocolate crêpe", category: "Crêpes", customerCategory: "Crepes", price: 12.5, sales: 53, stock: 24, active: true, featured: true, emoji: "🍫", tone: "amber", description: "Warm crêpe, banana, chocolate-hazelnut spread and biscuit crunch", ingredients: "Crêpe batter, banana, chocolate-hazelnut spread and biscuit", tags: ["Sweet", "Contains nuts"] },
  { id: 11, name: "Honey ricotta crêpe", category: "Crêpes", customerCategory: "Crepes", price: 12, sales: 28, stock: 18, active: true, featured: false, emoji: "🍯", tone: "rose", description: "Whipped ricotta, local honey, orange zest and almonds", ingredients: "Crêpe batter, ricotta, honey, orange and toasted almonds", tags: ["Vegetarian", "Contains nuts"] },
  { id: 12, name: "Savory forest crêpe", category: "Crêpes", customerCategory: "Crepes", price: 14.5, sales: 31, stock: 15, active: true, featured: false, emoji: "🍄", tone: "sage", description: "Mushrooms, emmental, herbs and light cream", ingredients: "Crêpe batter, mushrooms, emmental, cream and parsley", tags: ["Vegetarian", "Hot"] },
  { id: 13, name: "Pain au chocolat", category: "Bakery", customerCategory: "Pastries", price: 6, sales: 58, stock: 13, active: true, featured: false, emoji: "🥐", tone: "clay", description: "Buttery laminated pastry with dark chocolate", ingredients: "Wheat flour, butter, dark chocolate, yeast, milk and eggs", tags: ["Baked today", "Chocolate"] },
  { id: 14, name: "Cinnamon roll", category: "Bakery", customerCategory: "Pastries", price: 7.5, sales: 47, stock: 11, active: true, featured: true, emoji: "🌀", tone: "rose", description: "Soft cinnamon swirl with a light cream-cheese glaze", ingredients: "Wheat flour, cinnamon, butter, brown sugar and cream cheese", tags: ["Warm it up", "Milk"] },
  { id: 15, name: "Fudge brownie", category: "Desserts", customerCategory: "Desserts", price: 8, sales: 51, stock: 12, active: true, featured: false, emoji: "🍫", tone: "clay", description: "Dark chocolate brownie with sea salt and walnut", ingredients: "Dark chocolate, butter, eggs, flour, cocoa and walnut", tags: ["Rich", "Contains nuts"] },
  { id: 16, name: "Mint lemonade", category: "Refreshers", customerCategory: "Cold drinks", price: 8.5, sales: 64, stock: 40, active: true, featured: false, emoji: "🍋", tone: "sage", description: "Fresh lemon, mint and sparkling water", ingredients: "Fresh lemon juice, mint, sparkling water and cane sugar", tags: ["Fresh", "Caffeine free"] },
  { id: 17, name: "Peach iced tea", category: "Refreshers", customerCategory: "Cold drinks", price: 9, sales: 41, stock: 28, active: true, featured: false, emoji: "🍑", tone: "amber", description: "House black tea, peach and a squeeze of lemon", ingredients: "Black tea, peach purée, lemon and ice", tags: ["House-made", "Cold"] },
  { id: 18, name: "Flat white", category: "Coffee", customerCategory: "Coffee", price: 8.5, sales: 79, stock: 50, active: true, featured: false, emoji: "☕", tone: "sand", description: "Double ristretto with silky textured milk", ingredients: "Double ristretto and steamed milk", tags: ["Strong", "Milk options"] },
  { id: 19, name: "Espresso", category: "Coffee", customerCategory: "Coffee", price: 5, sales: 92, stock: 50, active: true, featured: false, emoji: "☕", tone: "clay", description: "A balanced double shot with cocoa and citrus notes", ingredients: "Green Coffee house espresso blend", tags: ["Vegan", "Double shot"] },
  { id: 20, name: "Game-night snack board", category: "Kitchen", customerCategory: "Snacks", price: 18, sales: 33, stock: 10, active: true, featured: true, emoji: "🎲", tone: "berry", description: "Fries, crispy chicken bites, dips and olives to share", ingredients: "Potato fries, chicken bites, olives, barbecue dip and garlic sauce", tags: ["Serves 2", "Game-night pick"] },
];

export const reservationsSeed = [
  { id: 1, name: "Yasmine Trabelsi", initials: "YT", time: "10:30", date: "Today", guests: 4, table: "T04", status: "confirmed", note: "Birthday brunch", phone: "+216 22 412 880" },
  { id: 2, name: "Mehdi Ben Salem", initials: "MB", time: "13:00", date: "Today", guests: 2, table: "T09", status: "pending", note: "Window seat if possible", phone: "+216 55 103 617" },
  { id: 3, name: "Ines Marzouki", initials: "IM", time: "16:30", date: "Today", guests: 6, table: "—", status: "pending", note: "Kids park access ×2", phone: "+216 29 761 404" },
  { id: 4, name: "Ahmed Jlassi", initials: "AJ", time: "19:45", date: "Today", guests: 4, table: "T12", status: "confirmed", note: "Champions League table", phone: "+216 98 330 152" },
  { id: 5, name: "Sarra Khelifi", initials: "SK", time: "20:15", date: "Tomorrow", guests: 8, table: "Event zone", status: "waitlist", note: "Football night", phone: "+216 52 680 921" },
];

const demoSessionExpiry = (minutes) => new Date(Date.now() + minutes * 60_000).toISOString();

export const tablesSeed = [
  { id: "T01", seats: 2, status: "available", zone: "Window", x: 7, y: 10, shape: "round", sessionActive: false },
  { id: "T02", seats: 2, status: "occupied", zone: "Window", x: 29, y: 10, shape: "round", spend: 22, duration: "34m", sessionActive: true, sessionCode: "GREEN-02", sessionExpiresAt: demoSessionExpiry(36) },
  { id: "T03", seats: 4, status: "ordering", zone: "Main room", x: 57, y: 10, shape: "square", spend: 18, duration: "19m", sessionActive: true, sessionCode: "GREEN-03", sessionExpiresAt: demoSessionExpiry(41) },
  { id: "T04", seats: 4, status: "reserved", zone: "Main room", x: 80, y: 10, shape: "square", reservedFor: "10:30" },
  { id: "T05", seats: 4, status: "occupied", zone: "Main room", x: 8, y: 47, shape: "square", spend: 15.5, duration: "27m", sessionActive: true, sessionCode: "GREEN-05", sessionExpiresAt: demoSessionExpiry(33) },
  { id: "T06", seats: 6, status: "available", zone: "Main room", x: 34, y: 45, shape: "long", sessionActive: false },
  { id: "T07", seats: 2, status: "cleaning", zone: "Games", x: 68, y: 47, shape: "round" },
  { id: "T08", seats: 4, status: "ordering", zone: "Games", x: 84, y: 47, shape: "square", spend: 32.5, duration: "12m", sessionActive: true, sessionCode: "GREEN-08", sessionExpiresAt: demoSessionExpiry(28) },
  { id: "T09", seats: 2, status: "reserved", zone: "Terrace", x: 7, y: 78, shape: "round", reservedFor: "13:00" },
  { id: "T10", seats: 4, status: "available", zone: "Terrace", x: 31, y: 78, shape: "square", sessionActive: false },
  { id: "T11", seats: 4, status: "occupied", zone: "Terrace", x: 57, y: 78, shape: "square", spend: 41.5, duration: "42m", sessionActive: true, sessionCode: "GREEN-11", sessionExpiresAt: demoSessionExpiry(44) },
  { id: "T12", seats: 6, status: "reserved", zone: "Screen", x: 82, y: 78, shape: "long", reservedFor: "19:45" },
];

export const customers = [
  { name: "Mariem Ben Ali", initials: "MB", tier: "Gold", visits: 38, spent: 824, points: 1280, last: "Today", favorite: "Pistachio cloud", trend: "+18%", segments: ["VIP & Gold", "Football fans"] },
  { name: "Aziz Gharbi", initials: "AG", tier: "Silver", visits: 24, spent: 517, points: 760, last: "Yesterday", favorite: "V60 Ethiopia", trend: "+9%", segments: ["New guests"] },
  { name: "Rim Kacem", initials: "RK", tier: "VIP", visits: 51, spent: 1236, points: 2420, last: "Jul 8", favorite: "Iced caramel", trend: "+24%", segments: ["VIP & Gold", "Football fans"] },
  { name: "Wael Mansour", initials: "WM", tier: "Bronze", visits: 9, spent: 188, points: 260, last: "Jul 6", favorite: "Flat white", trend: "+4%", segments: ["New guests", "At risk"] },
  { name: "Lina Ayadi", initials: "LA", tier: "Gold", visits: 32, spent: 705, points: 1105, last: "Jul 5", favorite: "Matcha strawberry", trend: "+14%", segments: ["VIP & Gold", "At risk"] },
];

export const campaigns = [
  { name: "Derby night at Green", type: "WhatsApp", status: "Scheduled", audience: "Football fans", reach: "1,284", conversion: "—", date: "Aug 8 • 18:00" },
  { name: "Your afternoon pick-me-up", type: "Push", status: "Live", audience: "Nearby customers", reach: "846", conversion: "12.8%", date: "Until Aug 14" },
  { name: "We miss you, have 20%", type: "Email", status: "Completed", audience: "Inactive 30d", reach: "392", conversion: "18.4%", date: "Jul 7" },
  { name: "Birthday coffee is on us", type: "Automation", status: "Always on", audience: "Birthdays", reach: "68", conversion: "42.6%", date: "Monthly" },
];

export const feedback = [
  { name: "Anonymous • T04", rating: 5, text: "The pistachio latte was perfect and the team was so kind.", time: "12 min ago", tag: "Service" },
  { name: "Mariem B.", rating: 5, text: "Love the QR ordering. Super fast even when the café is full.", time: "1h ago", tag: "Ordering" },
  { name: "Aziz G.", rating: 4, text: "Great V60. Would love one more single-origin choice.", time: "Yesterday", tag: "Menu" },
];

export const revenueSeries = [42, 48, 44, 58, 54, 68, 63, 71, 69, 82, 78, 89, 84, 96];
export const previousSeries = [36, 39, 42, 41, 50, 49, 56, 57, 61, 65, 66, 69, 72, 75];

export const heatmap = [
  [1, 1, 2, 2, 3, 2, 1],
  [1, 2, 3, 3, 4, 3, 2],
  [2, 3, 4, 4, 4, 4, 3],
  [1, 2, 3, 4, 4, 3, 2],
  [1, 1, 2, 3, 3, 2, 2],
  [2, 2, 3, 4, 4, 4, 3],
  [3, 3, 4, 4, 4, 4, 4],
  [2, 3, 4, 4, 4, 4, 3],
];

export const automationRules = [
  { id: 1, name: "Reservation reminders", detail: "2 hours before every confirmed booking", channel: "WhatsApp + email", runs: "128 this month", active: true, icon: "calendar" },
  { id: 2, name: "Birthday delight", detail: "Send a free-coffee reward at 09:00", channel: "Push + email", runs: "16 this month", active: true, icon: "gift" },
  { id: 3, name: "Win back quiet regulars", detail: "No visit for 30 days → 20% coupon", channel: "WhatsApp", runs: "42 this month", active: true, icon: "heart" },
  { id: 4, name: "Low-stock warning", detail: "Alert when an ingredient falls below par", channel: "Team notification", runs: "7 this month", active: true, icon: "box" },
  { id: 5, name: "Review follow-up", detail: "Thank 4–5★ guests and recover 1–3★ visits", channel: "Email", runs: "96 this month", active: false, icon: "star" },
];

export const events = [
  { title: "Champions League final", date: "SAT • AUG 8", time: "20:00", bookings: 46, capacity: 60, type: "Football night", tone: "green" },
  { title: "Catan community night", date: "WED • AUG 12", time: "18:30", bookings: 18, capacity: 28, type: "Board games", tone: "orange" },
  { title: "Sunday kids workshop", date: "SUN • AUG 16", time: "11:00", bookings: 12, capacity: 18, type: "Kids park", tone: "purple" },
];

export const staff = [
  { name: "Sofiene", role: "Owner", initials: "SZ", status: "Online", shift: "08:00–18:00" },
  { name: "Malek", role: "Manager", initials: "MK", status: "On shift", shift: "10:00–20:00" },
  { name: "Aya", role: "Barista", initials: "AY", status: "On shift", shift: "08:00–16:00" },
];

export const moduleGroups = [
  {
    title: "Customer experience",
    features: ["Responsive café website", "Digital & QR menu", "Product options and allergens", "Customer accounts & favourites", "Games and kids park showcase", "Map, contact, social links and opening hours"],
  },
  {
    title: "Service & operations",
    features: ["Scan-started, expiring table ordering", "Live barista / kitchen display", "Floor map and session lifecycle", "Reservations, waitlist and reminders", "Daily cash and shift close", "Order-ready customer display"],
  },
  {
    title: "Revenue & retention",
    features: ["Online payments & digital receipts", "Points, coupons and happy hours", "Receipt QR loyalty sync", "Rewards wallet, birthdays and VIP tiers", "Campaign broadcasts and referrals", "Events and big-match notifications"],
  },
  {
    title: "Intelligence & control",
    features: ["Sales, QR and reservation reports", "Peak-hour and behaviour insights", "Session abuse controls and audit", "Optional AI-assisted concepts", "Low-stock and message automations", "Roles, activity log, backup and export"],
  },
];
