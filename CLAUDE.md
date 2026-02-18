# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Moulax is a self-hosted personal finance aggregator. Users import CSV bank statements, categorize transactions (manually or via keyword rules), and view aggregated dashboards. Single-user, no auth.

## Tech Stack

- **Backend**: Elixir/Phoenix 1.8 (API-only, no LiveView) with Ecto + PostgreSQL
- **Frontend**: Next.js (App Router) + React 19 + TypeScript + Tailwind CSS 4
- **Infrastructure**: Docker Compose (db, backend, web containers)
- **Package manager (frontend)**: pnpm

## Common Commands

All development runs through Docker Compose via the Makefile:

```bash
make setup          # First-time: build + start everything
make dev            # Start services (build if needed)
make stop           # Stop all services
make test.backend   # Run Elixir tests: docker compose exec backend mix test
make test.web       # Run frontend lint: docker compose exec web pnpm lint
make db.migrate     # Run pending migrations
make db.reset       # Drop, create, migrate, seed
make db.seed        # Seed default categories
make shell.backend  # IEx shell in backend container
make shell.db       # psql shell (user: postgres, db: moulax_dev)
```

Run a single backend test file:
```bash
docker compose exec backend mix test test/path/to_test.exs
```

Backend precommit check (compile warnings + format + tests):
```bash
docker compose exec backend mix precommit
```

Generate a migration:
```bash
docker compose exec backend mix ecto.gen.migration migration_name
```

## Architecture

### Backend (`api/`)

Phoenix contexts pattern — each domain has a context module in `lib/moulax/`:

| Context | Responsibility |
|---------|---------------|
| `Accounts` | Account CRUD, computed balance (initial_balance + sum of transactions) |
| `Transactions` | CRUD with filtering (account, category, date range, search), pagination, bulk categorize |
| `Categories` | Category and categorization rule management |
| `Imports` | CSV import pipeline: detect parser → parse → deduplicate → auto-categorize → insert |
| `Parsers` | Bank-specific CSV parsers (Boursorama, Revolut, Caisse d'Epargne); each implements `Moulax.Parsers.Parser` behaviour |
| `Dashboard` | SQL-based aggregations (net worth, spending breakdown, monthly trends, top expenses) |

API routes are all under `/api/v1` — see `lib/moulax_web/router.ex`.

Key database constraints:
- Transaction deduplication: unique index on `(account_id, date, amount, original_label)`
- Accounts use soft delete (archived flag)
- Monetary amounts use `Decimal` (returned as strings in JSON)

### Frontend (`web/`)

- Next.js App Router with pages at `src/app/{accounts,transactions,categories,import}/`
- Centralized API client in `src/lib/api.ts` (all backend calls go through this)
- TypeScript interfaces in `src/types/index.ts` mirror backend JSON shapes
- Reusable components in `src/components/` (sidebar, toast, confirm-dialog, skeleton)
- Dark theme only (forced in layout.tsx)

### Ports (configurable via `.env`)

| Service | Internal | External default |
|---------|----------|-----------------|
| Frontend | 3000 | 3005 (WEB_PORT) |
| Backend | 4000 | 4001 (BACKEND_PORT) |
| Database | 5432 | 5434 (DB_PORT) |

## Elixir Conventions (from AGENTS.md)

- Use `mix precommit` after completing changes
- Use `:req` for HTTP requests (not HTTPoison/Tesla)
- Never nest multiple modules in the same file
- Never use map access syntax (`changeset[:field]`) on structs — use `Ecto.Changeset.get_field/2` for changesets or `struct.field` for direct access
- Predicate functions end with `?` (reserve `is_` prefix for guards)
- Use `start_supervised!/1` in tests; avoid `Process.sleep/1`
- Ecto `:text` columns use `:string` type in schemas
- Fields set programmatically (like `user_id`) must not be in `cast` calls

## Adding a New CSV Parser

1. Create `lib/moulax/parsers/bank_name.ex` implementing `Moulax.Parsers.Parser` behaviour
2. Register it in `lib/moulax/parsers.ex` detection logic (match on CSV headers)
3. Parser must normalize rows to: `date`, `label`, `amount`, `currency`, `original_label`, `category`, `bank_reference`
