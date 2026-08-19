# ERP Flash Deal — Full Interactive Demo

This is a self-contained, browser-based prototype for a ₹1-registration flash-deal marketplace and its ERP administration console. No backend, build tool, package installation, or internet connection is required.

## Start the demo

Open `index.html` directly in a modern browser.

For a local web server, run one of these commands inside this folder:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Demo navigation

Use the **Customer site / Admin ERP** switch in the header. The floating **Demo guide** button opens every major journey with one click.

The prototype saves changes in browser `localStorage`, including created deals, product edits, inventory changes, registrations and orders. In Admin ERP, use **Reset Platform Data** to return to the seeded demo state.

## Customer flows

- Storefront home, categories, deal filtering and countdowns
- Deal detail, product inventory, terms and purchase limits
- ₹1 registration review, terms consent, payment simulation and access pass
- Registered live-deal shopping and stock-aware add-to-cart
- Reserved cart drawer with quantity changes and countdown expiry
- Checkout: cart minimum, delivery address, payment and order confirmation
- Customer account overview
- Registration history and downloadable access pass
- Order history, fulfillment timeline, invoice and cancellation request
- Saved address creation, editing and default selection
- Search and notifications

## Admin ERP flows

- Dashboard KPIs, revenue chart, recent orders and alerts
- Flash-deal list, filters, detail view, edit, duplicate and create
- Low-level deal configuration and desktop/mobile customer preview
- Live deal operations monitor and activity feed
- Product catalog create, edit and delete
- Inventory adjustment and low-stock thresholds
- Order inspection and fulfillment status update
- Registration payment/access records and CSV export
- Customer profiles, participation metrics and CSV export
- Reports and CSV export
- Platform operational defaults and reset/logout flows

## Files

- `index.html` — all storefront, account, checkout and admin screens
- `styles.css` — responsive design system and component styling
- `app.js` — mock domain data, state, persistence, rendering and interactions
- `assets/` — offline product and campaign artwork
- `LOW_LEVEL_DESIGN.md` — component, state and domain design
- `FLOW_MATRIX.md` — screen-by-screen journey coverage
- `screenshots/` — visual reference captures of the main screens
