# Green Coffee OS

A polished, responsive front-end concept for running a modern coffee shop. It turns the selectable scope in `GreenCoffeeGamesFeatures` into a coherent staff and customer demo.

## What is included

- Live QR and staff-entered order board with New → Preparing → Ready → Served workflow
- Barista/KDS display mode, order details, guest notes, payments, and receipts
- Menu manager with the 53-entry real café catalogue, exact DT prices, availability, stock, product-appropriate modifiers, allergens, featured products, and AI copy suggestions
- Reservation inbox, approvals, calendar, guest messages, reminders, cancellations, waitlist, and event bookings
- Interactive venue-accurate floor map with eight standard tables, three long PC tables, kitchen, service counter, Kids Park and entrances, plus scan-started 45-minute table sessions and staff acceptance
- Customer CRM, profiles, preferences, receipt history, loyalty points, rewards wallet, birthdays, referrals, and VIP tiers
- WhatsApp/email/push campaigns, customer segments, coupons, feedback QR, ratings, and AI review summaries
- Revenue, order, product, reservation, QR-scan, customer-behaviour, and peak-hour analytics
- AI operations assistant, recommendations, chatbot, stock forecasts, and configurable automations
- A dedicated Games / Kids Park / Football Events experience with a 5 DT per-child park access item and capacity check-in preview
- Website studio, public customer menu preview, light/dark themes, and clearly labelled concepts for payments, staff roles, audit, backups, deployment, and support
- Demo authentication with focused owner, manager, barista, and customer experiences
- No-login bilingual English/French guest menu at `#table`; scanning a table QR starts the simulated on-site session and customer-submitted orders wait for staff acceptance
- Served orders remain in history instead of disappearing from shared demo data
- Six optimized representative menu photographs shared across admin, analytics, login, and customer ordering

See [FEATURE_MAP.md](./FEATURE_MAP.md) for the full source-feature mapping.

## Demo accounts

| Actor | Email | Password | Default experience |
|---|---|---|---|
| Owner — Sofiene | `sofiene@greencoffee.tn` | `GreenOwner26!` | Full platform overview |
| Manager — Malek | `malek@greencoffee.tn` | `GreenManager26!` | Operations and growth |
| Barista — Aya | `aya@greencoffee.tn` | `GreenBarista26!` | Barista/KDS order board |
| Customer — Mariem | `mariem@greencoffee.tn` | `GreenGuest26!` | Customer menu, orders and rewards |

The login screen can fill any account automatically. See [DEMO_ACCOUNTS.md](./DEMO_ACCOUNTS.md) for the full permission matrix and [IMAGE_ASSETS.md](./IMAGE_ASSETS.md) for generated asset provenance.

## Run locally

Requires Node.js 20.19+ (or Node.js 22.12+).

```bash
npm install
npm run dev
```

Open the Vite URL shown in the terminal. Navigation also supports hashes, for example:

```text
http://localhost:5173/#orders
http://localhost:5173/#floor
http://localhost:5173/#table
http://localhost:5173/#experiences
```

## Production build

```bash
npm run build
npm run preview
```

The deployable output is written to `dist/`.

## Demo behaviour

This project is a high-fidelity interactive front-end prototype. The signed-in account ID and the current device's verified table are stored in `sessionStorage`; no password is stored in the session. Shared shop data such as orders, menu availability, reservations, table states, automations, and theme is stored in browser `localStorage` so switching demo actors keeps the same café state.

For the client walkthrough, open the no-account table-ordering entry, switch between English and French, start the demo scanner, and scan/select a table. That scan creates the 45-minute device session; the customer can then customize products—including the 5 DT Kids Park access—and send an order for staff acceptance. A manager can enter a waiter order instead when a guest does not scan. Clearing the table revokes its previous device session.

The bundled login, roles, and table-session checks are demo-only. A live release must create opaque table sessions server-side, validate them on every order, require staff acceptance of customer-submitted tickets, and enforce idle/absolute expiry, revocation, rate limits, duplicate-order protection, and an audit trail. Strict remote-order prevention additionally needs a rotating proof or another reliable on-site check; a photographed permanent QR alone cannot prove presence. Real authentication, authorization, tenant isolation, database storage, real-time sockets, messaging, payment providers, receipts, uploads, and production AI also require backend services and provider credentials.

## Stack

- React 19
- Vite 8
- Lucide icons
- Plain CSS design system (no UI framework)
