# Billing ERP — Web (Next.js)

A Next.js 14 (App Router) rebuild of the LassiCorner Flutter billing app,
talking to your existing Express/MySQL backend. Same Firebase auth, same
API — one small backend addition for reporting (see `backend-changes/`).

## Stack

- Next.js 14 App Router, TypeScript
- Plain CSS (CSS variables + hand-authored component styles) — **no Tailwind**.
  UI components follow the shadcn/ui *API shape* (`<Button variant="outline">`,
  `<Dialog>`, `<Table>`…) so the code is familiar, but they're implemented
  with plain `.css` files, not Tailwind utility classes or Radix.
- Firebase Auth (email/password) — same project as the Flutter app
- `recharts` for the reports chart

## Folder structure

```
src/
  app/                     App Router routes
    (auth)/login/
    (dashboard)/           protected shell: sidebar + topbar
      billing/             POS — the main cashier screen
      items/                catalog CRUD
      customers/            customer CRUD
      invoices/             list + [id] detail/print
      reports/              weekly/monthly reporting
  components/
    ui/                    Button, Input, Card, Table, Dialog, Tabs, Toast…
    layout/                Sidebar, Topbar
    auth/                  AuthGuard
    providers/             AuthProvider
  features/                one folder per domain, matching your existing
    items/                 Flutter/Express project layout:
      types.ts               types.ts
      repository/            repository/  (API calls)
      hooks/                 hooks/       (state + data fetching)
      components/            components/  (forms, tables)
    customers/
    invoices/                also owns the cart (POS state) — see
                              features/invoices/hooks/useCart.tsx
    reports/
  lib/                     apiClient.ts, firebase.ts, money.ts, utils.ts
```

## Setup

```bash
npm install
cp .env.local.example .env.local
# fill in NEXT_PUBLIC_API_BASE_URL and the Firebase keys
npm run dev
```

Firebase values: copy from `lib/firebase_options.dart` in the Flutter repo,
or the Firebase console (Project settings → your web app, or register a new
web app in the same project).

## Backend

See `backend-changes/README.md`. Short version: drop `backend-changes/reports.js`
into `src/Modules/reports.js` and add one line to `server.js`:

```js
app.use("/reports", require("./Modules/reports"));
```

Everything else (`items.js`, `invoices.js`, `customers.js`) is used exactly
as you shared it — no changes needed there.

## How the two requirements map to code

**Dual pricing (walk-in / cloud kitchen) on items**
`features/items/components/ItemForm.tsx` — two price fields, with a "same
price for both" toggle. Saved as `walk_in_price` / `cloud_kitchen_price`,
matching your `items` table.

**Channel selection at billing time**
`features/invoices/hooks/useCart.tsx` holds a `channel` (`walk_in` |
`cloud_kitchen`) alongside the cart lines. Switching it recalculates every
line's price live from the item's two stored prices. `ChannelToggle` is
pinned at the top of the cart panel on `/billing` — it's the first thing a
cashier touches. Walk-in orders auto-attach the existing "Walk-in Customer"
record (`GET /customers/walk-in`) so there's zero extra steps; cloud kitchen
orders get a customer dropdown + inline "add customer". Checkout is one
button: **Generate & print bill** → `POST /invoices` with `sales_channel`
set → redirect straight to a print-ready receipt.

**Accurate weekly/monthly reporting by channel**
`backend-changes/reports.js` — `SUM()`/`COUNT()` grouped by `sales_channel`
in SQL (never summed client-side), with week/month boundaries computed
explicitly in JS rather than relying on MySQL's `WEEK()` mode. Drafts and
archived invoices are excluded. `/reports` page shows Today / This week /
This month, each broken into Walk-in vs Cloud kitchen vs Combined, plus a
day-by-day stacked chart.

## What's not wired up (by design, not oversight)

- **Inventory / stock movements, estimates, employees, payroll, PDF
  download** — your backend already has these modules mounted
  (`/inventory`, `/estimates`, `/employees`, `/payroll`, `/pdf`); the
  Flutter app only had Items/Billing/Reports UI to convert from, so those
  are the three feature areas this app has screens for. The `items` table's
  `track_inventory` stock count is displayed read-only in the Items table.
- **Firebase config values** — left as placeholders in `.env.local.example`;
  drop in your real project keys.
- Build was verified with `npm run build` (full TypeScript + route
  compilation passes). Google Fonts are fetched at build time — make sure
  the build machine has outbound internet, or swap `next/font/google` for
  self-hosted fonts if it's air-gapped.
