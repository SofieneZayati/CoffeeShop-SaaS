# Green Coffee OS

A polished, responsive SaaS front-end for running a modern coffee shop. It turns the 86 capabilities from `GreenCoffeeGamesFeatures` into an operational product instead of another proposal/feature-selector screen.

## What is included

- Live QR and staff-entered order board with New → Preparing → Ready → Served workflow
- Barista/KDS display mode, order details, guest notes, payments, and receipts
- Menu manager with categories, product cards, availability, stock, modifiers, allergens, featured products, and AI copy suggestions
- Reservation inbox, approvals, calendar, guest messages, reminders, cancellations, waitlist, and event bookings
- Interactive floor map with table sessions, occupancy, secure table QR codes, split/merge controls, and shift notes
- Customer CRM, profiles, preferences, receipt history, loyalty points, rewards wallet, birthdays, referrals, and VIP tiers
- WhatsApp/email/push campaigns, customer segments, coupons, feedback QR, ratings, and AI review summaries
- Revenue, order, product, reservation, QR-scan, customer-behaviour, and peak-hour analytics
- AI operations assistant, recommendations, chatbot, stock forecasts, and configurable automations
- A dedicated Games / Kids Park / Football Events experience
- Website studio, public customer menu preview, EN/FR readiness, light/dark themes, payments, staff roles, audit log, backups, deployment, and support modules
- Demo authentication with protected owner, manager, barista, floor-staff, and customer experiences
- Six original, optimized menu photographs shared across admin, analytics, login, and customer ordering

See [FEATURE_MAP.md](./FEATURE_MAP.md) for the full source-feature mapping.

## Demo accounts

| Actor | Email | Password | Default experience |
|---|---|---|---|
| Owner — Sofiene | `sofiene@greencoffee.tn` | `GreenOwner26!` | Full platform overview |
| Manager — Malek | `malek@greencoffee.tn` | `GreenManager26!` | Operations and growth |
| Barista — Aya | `aya@greencoffee.tn` | `GreenBarista26!` | Barista/KDS order board |
| Floor staff — Fares | `fares@greencoffee.tn` | `GreenFloor26!` | Floor plan and service |
| Customer — Mariem | `mariem@greencoffee.tn` | `GreenGuest26!` | Customer menu, orders and rewards |

The login screen can fill any account automatically. See [DEMO_ACCOUNTS.md](./DEMO_ACCOUNTS.md) for the full permission matrix and [IMAGE_ASSETS.md](./IMAGE_ASSETS.md) for generated asset provenance.

## Run locally

```bash
npm install
npm run dev
```

Open the Vite URL shown in the terminal. Navigation also supports hashes, for example:

```text
http://localhost:5173/#orders
http://localhost:5173/#floor
http://localhost:5173/#experiences
```

## Production build

```bash
npm run build
npm run preview
```

The deployable output is written to `dist/`.

## Demo behaviour

This project is a high-fidelity interactive front-end prototype. The signed-in account ID is stored in `sessionStorage`; no password is stored in the session. Shared shop data such as orders, menu availability, reservations, table states, automations, and theme is stored in browser `localStorage` so switching staff accounts feels like one connected café.

The bundled login and permissions are demo-only. Real authentication, server-side authorization, tenant isolation, database storage, real-time sockets, email/WhatsApp delivery, payment providers, PDF receipts, uploads, and production AI calls require backend services and provider credentials before a live client launch.

## Stack

- React 19
- Vite 8
- Lucide icons
- Plain CSS design system (no UI framework)
