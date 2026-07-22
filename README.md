# frontdesk-data

<!--
abstract: Independent, sourced product and software data — 4,764 products across 359 hardware categories and 267 software categories. Every figure is traced to its source URL and access date; unknown values are null, never a guess. Queryable live over MCP. CC-BY-4.0. Version 2026-06-12.
license: CC-BY-4.0
homepage: https://frontdeskreview.com/data
-->

Independent, sourced data on what things cost and how they actually perform.
**4,764 products** across **359 hardware categories**, plus software pricing across
**267 categories** — every figure traced to its source (the vendor's own page URL and the date
we captured it). Quote-only tiers and unknown specs are recorded as null rather than guessed.
Nothing is invented.

**Current version:** 2026-06-12.

## Query it live from an AI assistant (MCP)

This dataset is served by a live **Model Context Protocol** server. No API key, no account,
read-only. Every record an assistant receives carries its source URL and capture date, so any
figure it repeats can be cited.

**Endpoint:** `https://mcp.frontdeskreview.com/mcp` (Streamable HTTP)

Claude Code:

```bash
claude mcp add --transport http front-desk-review https://mcp.frontdeskreview.com/mcp
```

Claude Desktop, Cursor, Cline, Windsurf — add to the client's MCP config:

```json
{
  "mcpServers": {
    "front-desk-review": {
      "type": "streamable-http",
      "url": "https://mcp.frontdeskreview.com/mcp"
    }
  }
}
```

VS Code (Copilot agent) — `.vscode/mcp.json` uses a top-level `servers` key:

```json
{
  "servers": {
    "front-desk-review": {
      "type": "http",
      "url": "https://mcp.frontdeskreview.com/mcp"
    }
  }
}
```

ChatGPT, Claude and Perplexity can add it from their own connector settings — paste the endpoint
and leave authentication set to **None**. Setup for every client:
https://frontdeskreview.com/connect/

Registry entry: `com.frontdeskreview/front-desk-review-data` · server card: https://mcp.frontdeskreview.com/mcp/server-card

## Tools

All 19 are read-only and annotated as such, so a client can call them without prompting
on every request.

| Tool | What it answers |
| --- | --- |
| `list_sections` | Every software/SaaS pricing theme covered, with slug, label and vendor count. |
| `search_vendors` | Free-text search across a theme's vendors — names, domains, integrations, plan notes, capabilities. |
| `compare` | Named vendors side by side within a theme, full sourced records. |
| `get_normalized_pricing` | Effective monthly cost at a chosen volume, with flat, per-minute and per-call billing reduced to one comparable number. |
| `get_benchmark` | One vendor's card: entry price, cost at reference volumes, compliance, free tier, integration breadth. |
| `find_best` | “Cheapest X with a free tier / HIPAA / SOC 2 / GDPR” — ranked, and never on an unverified claim. |
| `list_coverage` | What the index covers, how many vendors, over what date range — and what it does not cover. |
| `whats_changed` | Recent price changes, each dated and corroborated by two sources. |
| `get_price_history` | The full dated price series for one product or vendor, plus archived points read off Internet Archive snapshots. |
| `price_movers` | What moved most recently across a category or the whole index. |
| `volatility_for_entity` | How much one product's price actually moves — withheld rather than guessed when the record is too thin. |
| `most_volatile_in_category` | The least stable prices in a category, ranked. |
| `list_product_categories` | Every hardware category, with product counts, comparable spec keys and brands. |
| `search_products` | Free-text search inside a hardware category across names, brands and spec values. |
| `compare_products` | Named products lined up on the spec keys that category actually compares on. |
| `find_products` | “Best under $N” or “most <spec>” — filter and rank by price, release date or any spec. |
| `get_independent_test_coverage` | How many independent labs measured a product, and what they measured — a count of evidence, never a rating. |
| `list_cost_decoders` | Which categories have a cost decoder explaining what actually drives the bill. |
| `get_cost_decoder` | The drivers behind a category's real cost, so a quoted price can be read properly. |

## Coverage

- **Hardware** — 359 categories, 4,764 products with specs, prices and independent-test
  coverage.
- **Software** — 267 categories of SMB/SaaS pricing, from AI receptionists and call tracking to
  CRM, VPNs and web hosting.
- **Provenance** — 22,765 source citations; 88% of products carry a published price.

## Files

- `<category>.json` — full records, each figure with provenance (source URL + accessed date)
- `<category>.csv` — one flat row per plan/product, with source columns
- `catalog.json` — schema.org DataCatalog index
- `croissant.json` — ML Commons Croissant 1.1 descriptor (Google Dataset Search / Hugging Face)
- `datapackage.json` — Frictionless Data Package (Table Schema per CSV)
- `CITATION.cff` — machine-readable citation
- `LICENSE` — CC BY 4.0

## Methodology

Published prices are normalized to a common monthly basis; both the raw published figure and the
normalized one are kept. Each row carries its own `accessedAt` date and is re-checked on a rolling
basis. Independent-test coverage counts how many labs measured a product — a count of evidence,
never a rating. Full methodology: https://frontdeskreview.com/data

## License

CC BY 4.0 — free to use with attribution to The Front Desk Review (https://frontdeskreview.com).
See `CITATION.cff`.
