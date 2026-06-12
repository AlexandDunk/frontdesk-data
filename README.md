# frontdesk-data

<!--
abstract: Independent, sourced pricing and capability data for front-office SMB software (AI receptionists, call tracking, business texting, online booking). Every figure is traced to its source URL and access date; quote-only tiers carry a null price, never a guess. CC-BY-4.0. Version 2026-06-12.
license: CC-BY-4.0
homepage: https://frontdeskreview.com/data
-->

Independent, sourced pricing and capability data for the software that runs the front
office of a local-service business. Every figure is traced to its source (the vendor
pricing page URL + the date we captured it) and, where possible, corroborated by a second
independent source. Quote-only / enterprise tiers are recorded with a null price rather
than a guess. Nothing is invented.

**Current version:** 2026-06-12 (the newest section revision date).

## Coverage
- `ai-receptionists` — AI receptionists / answering services
- `call-tracking` — call tracking & call analytics
- `business-texting` — business texting / SMS
- `online-booking` — appointment scheduling / online booking

## Files
- `<section>.json` — full vendor + plan records, each figure with provenance (source URL + accessed date)
- `<section>.csv` — one row per plan, flat, with source columns
- `catalog.json` — schema.org DataCatalog index
- `croissant.json` — ML Commons Croissant 1.1 descriptor (Google Dataset Search / Hugging Face ingestible)
- `datapackage.json` — Frictionless Data Package (Table Schema per section CSV; v1)
- `CITATION.cff` — Citation File Format 1.2.0 (how to cite this dataset)
- `LICENSE` — CC BY 4.0 legal summary

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

See `CITATION.cff` for a machine-readable citation.
