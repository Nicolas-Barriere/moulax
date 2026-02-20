# Pactole

> Know where your money is. One dashboard, all accounts, zero fluff.

Pactole is a self-hosted personal finance aggregator for tracking money across multiple bank accounts. Import CSV statements from your banks, categorize transactions, and see where your money goes — all in one clean dashboard.

## Tech Stack

| Layer    | Technology              |
|----------|------------------------|
| Frontend | Next.js 16, React 19, Tailwind CSS 4, Recharts |
| Backend  | Elixir, Phoenix 1.7    |
| Database | PostgreSQL 16          |
| Infra    | Docker Compose         |

## Quick Start

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) (v2+)

### Setup

```bash
# Clone the repo
git clone https://github.com/Nicolas-Barriere/pactole.git
cd pactole

# (Optional) Copy and adjust port config if defaults conflict
cp .env.example .env

# Build and start everything
make setup
```

That's it. Once the containers are ready:

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:4000/api/v1/health](http://localhost:4000/api/v1/health)
- **Database:** `localhost:5434` (user: `postgres`, password: `postgres`)

> **Port conflicts?** Edit `.env` to change `WEB_PORT`, `BACKEND_PORT`, or `DB_PORT`.

### Common Commands

Run `make help` to see all available commands:

```
clean                Stop services and remove all volumes (fresh start)
db.migrate           Run pending database migrations
db.reset             Drop, create, and migrate the database
db.seed              Run database seeds
dev                  Start all services (build if needed)
dev.logs             Start all services with logs in foreground
help                 Show this help
logs                 Follow logs from all services
logs.backend         Follow backend logs only
logs.db              Follow database logs only
logs.web             Follow frontend logs only
restart              Restart all services
setup                Build and start all services for the first time
shell.backend        Open an IEx shell in the backend container
shell.db             Open psql in the database container
shell.web            Open a shell in the frontend container
stop                 Stop all services
test                 Run all tests
test.backend         Run backend (Elixir) tests
test.web             Run frontend (Next.js) linter
```

### Developing Without Docker

If you prefer running services natively:

**Backend (Elixir):**
```bash
cd api
mix deps.get
mix ecto.setup        # requires PostgreSQL running locally
mix phx.server        # starts on port 4000
```

**Frontend (Next.js):**
```bash
cd web
pnpm install
pnpm dev              # starts on port 3000
```

## Project Structure

```
pactole/
├── api/                  # Elixir Phoenix API
│   ├── lib/
│   │   ├── moulax/       # Business logic (contexts)
│   │   └── moulax_web/   # HTTP layer (controllers, router)
│   ├── config/           # Environment configs
│   ├── priv/repo/        # Migrations and seeds
│   ├── test/             # Backend tests
│   ├── mix.exs           # Elixir dependencies
│   └── Dockerfile
├── web/                  # Next.js frontend
│   ├── src/
│   │   ├── app/          # Pages (App Router)
│   │   ├── components/   # Shared UI components
│   │   ├── lib/          # API client, utilities
│   │   └── types/        # TypeScript type definitions
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml    # Full stack orchestration
├── Makefile              # Developer commands
├── V1_SPEC.md            # Detailed product specification
└── README.md
```

## Supported Banks (CSV Import)

- Boursorama (checking + savings)
- Revolut
- Caisse d'Épargne

## License

Private project.
