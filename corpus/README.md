# The Front Desk Review — open pricing & product-facts corpus

An independent, methodologically documented **transparency dataset** of published pricing and buyer-critical product facts across **268 software, SaaS and subscription categories** (**2112 vendors**, **7255 plan records**), last updated 2026-06-26.

Built for price-transparency research and reproducibility: every figure is traced to its primary source (the vendor's own page URL and the date it was captured) and, where possible, corroborated by a second independent source. Quote-only and enterprise tiers are recorded with a **null** price rather than a guessed value. Selected categories also carry verified product facts beyond price — HIPAA/SOC 2/GDPR compliance, free-tier availability, usage limits, key integrations and differentiating features — each with its own provenance.

## Files
- `all-plans.csv` / `all-plans.jsonl` — one row per (category, vendor, plan): the full flat corpus.
- `vendors.jsonl` — one row per vendor with entry price + compliance flags.
- `index.json` — schema.org DataCatalog manifest (categories, counts, provenance method).
- `themes/<category>.json` — the full per-category dataset (vendors, plans, sources, enrichment).
- `all-products.jsonl` — one row per physical product with flattened specs (spec_*) + price.
- `products/<category>.json` — the full product-spec dataset (phones, laptops, GPUs, ...; 2474 products across 213 categories).

## Provenance & method
Each record carries `source.url` + `source.accessedAt`. Counts and date ranges are derived from those captures. No figure is invented; unpriceable/quote-only tiers are null. Compliance facts are confirmed from each vendor's own trust/security page where possible.

## License
[CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/). Attribution: "The Front Desk Review" (https://frontdeskreview.com).

Canonical, continuously updated version and full methodology: https://frontdeskreview.com/data
