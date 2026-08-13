# Functional Test Report

Validated in headless Chromium at 1440×1000 and 390×844.

## Passed customer scenarios

- Home renders deal/category content and countdowns
- Live deal opens with stock-aware product cards
- Registration review requires terms consent
- UPI/card/wallet registration payment views render
- Successful registration creates an access record and unlocks products
- Cart drawer opens, updates quantities and displays reservation timing
- Checkout minimum validation, address, payment and confirmation complete
- Successful checkout creates an order and updates inventory/deal metrics
- Customer account, registrations, orders and addresses render
- Address creation/default update, invoice/pass downloads and order detail work
- Search, notifications and app switching work

## Passed admin scenarios

- All 11 admin screens navigate correctly
- Dashboard metrics and tables render
- Deal create/edit/duplicate and live preview render
- Product create/edit/delete flow works
- Inventory adjustment updates stock
- Order detail and status transition work
- Registration search/filter/detail/export work
- Customer search/filter/detail/export work
- Reports/settings/reset/logout interactions render and validate

## Static checks

- JavaScript passes `node --check`
- No duplicate HTML IDs
- All runtime image assets are local
- No external font or image dependency
- 27 reference screenshots generated without page errors
