# Moulax

Personal finance app — track transactions, manage accounts, and visualise spending.

| Component | Stack               | Directory |
| --------- | -------------------- | --------- |
| API       | Elixir / Phoenix     | `api/`    |
| Frontend  | Next.js / React / TW | `web/`    |
| Database  | PostgreSQL 17        | —         |

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) & Docker Compose v2+

That's it. Everything else runs inside containers.

## Quick Start

```bash
# Clone the repo
git clone <repo-url> && cd moulax

# Start all services (builds images on first run)
make dev
```

Once the containers are up:

| Service  | URL                          |
| -------- | ---------------------------- |
| Frontend | <http://localhost:3000>      |
| API      | <http://localhost:4000>      |
| Postgres | `localhost:5432` (user/pass: `postgres`/`postgres`) |

## Make Commands

Run `make help` for a full list. Highlights:

| Command        | Description                                  |
| -------------- | -------------------------------------------- |
| `make dev`     | Start all services with hot reload           |
| `make stop`    | Stop all services                            |
| `make reset`   | Stop services and destroy volumes            |
| `make logs`    | Tail logs from all services                  |
| `make test`    | Run API tests                                |
| `make shell-api` | Open a shell in the API container          |
| `make shell-web` | Open a shell in the frontend container     |
| `make db-console` | Open a psql console                       |
| `make db-migrate` | Run Ecto migrations                       |
| `make db-reset`   | Drop, create, migrate, and seed the DB    |

## Project Layout

```
├── api/                 # Elixir Phoenix API (port 4000)
│   ├── config/
│   ├── lib/
│   ├── priv/
│   ├── test/
│   ├── Dockerfile.dev
│   └── mix.exs
├── web/                 # Next.js frontend (port 3000)
│   ├── src/
│   ├── Dockerfile.dev
│   └── package.json
├── docker-compose.yml
├── Makefile
└── README.md
```

## Development Without Docker

If you prefer running services natively, install the versions listed in `.tool-versions` (via [asdf](https://asdf-vm.com/) or [mise](https://mise.jdx.dev/)):

```bash
# API
cd api
mix setup        # install deps, create DB, run migrations
mix phx.server   # start on :4000

# Frontend
cd web
pnpm install
pnpm dev         # start on :3000
```

You'll need a local PostgreSQL instance running with user `postgres` / password `postgres`.
