# Demo accounts and permissions

The project contains five actor-focused accounts. Select any actor on the login screen to fill their credentials automatically.

| Actor | Email | Password | Default view | Access |
|---|---|---|---|---|
| Owner — Sofiene Zayati | `sofiene@greencoffee.tn` | `GreenOwner26!` | Overview | Full operations, finance, growth, team, security, website, payments, exports and platform setup |
| Manager — Malek Khemiri | `malek@greencoffee.tn` | `GreenManager26!` | Overview | Operations, menu, reservations, floor, customers, campaigns, insights, automations and events; no owner platform setup |
| Barista — Aya Mansour | `aya@greencoffee.tn` | `GreenBarista26!` | KDS orders | Live orders and menu availability; can move New → Preparing → Ready but cannot serve, create orders, edit products or view payment totals |
| Floor staff — Fares Ben Ali | `fares@greencoffee.tn` | `GreenFloor26!` | Floor plan | Tables, live orders and reservations; can create waiter orders and move Ready → Served but cannot prepare tickets, edit layout or generate QR codes |
| Customer — Mariem Ben Ali | `mariem@greencoffee.tn` | `GreenGuest26!` | Customer storefront | Own menu/cart, online checkout, order tracking, bookings, rewards, events, favorites and profile; no staff shell is rendered |

## Guarded surfaces

Permissions apply to more than sidebar visibility:

- Direct hashes are checked and redirected to the actor’s safe landing page.
- Desktop and mobile navigation are filtered.
- Global search, notifications and quick-create actions are filtered.
- Order transitions are station-specific for barista and floor staff.
- Menu editing, QR generation, exports, customer preview and platform setup are action-guarded.
- Switching accounts or signing out clears the demo session without deleting shared café data.

## Production warning

The accounts and plaintext fixture passwords are bundled for client demonstration. This is not production security. A live SaaS requires backend authentication, hashed passwords, protected/HttpOnly sessions, server-side role checks, tenant IDs, rate limiting, audit trails and real two-factor authentication.
