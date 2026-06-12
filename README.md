# frontdesk-data

Independent, sourced pricing and capability data for the software that runs the front
office of a local-service business. Every figure is traced to its source (the vendor
pricing page URL + the date we captured it) and, where possible, corroborated by a second
independent source. Quote-only / enterprise tiers are recorded with a null price rather
than a guess. Nothing is invented.

## Coverage
- `ai-receptionists` — AI receptionists / answering services
- `call-tracking` — call tracking & call analytics
- `business-texting` — business texting / SMS
- `online-booking` — appointment scheduling / online booking

## Files
- `<section>.json` — full vendor + plan records, each figure with provenance (source URL + accessed date)
- `<section>.csv` — one row per plan, flat, with source columns
- `catalog.json` — schema.org DataCatalog index
- `croissant.json` — ML Commons Croissant 1.0 descriptor (Google Dataset Search / Hugging Face ingestible)

## Methodology
Published prices are normalized to a common monthly basis; the raw published price and the
normalized figure are both preserved. Each row carries its own `accessedAt` date and is
re-checked on a rolling basis. Canonical, human-readable methodology and the live data:
https://frontdeskreview.com/data and https://frontdeskreview.com/

## License
CC BY 4.0 — free to use with attribution to The Front Desk Review (https://frontdeskreview.com).

## How to cite
> Front-office SMB software pricing data — The Front Desk Review,
> https://frontdeskreview.com/data (as of the accessedAt date recorded in each record).
