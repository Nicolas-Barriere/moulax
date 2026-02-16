.PHONY: setup dev stop test logs clean reset

## ── Development ──────────────────────────────────────────

setup: ## Build images and start all services
	docker compose build
	docker compose up -d

dev: ## Start all services (build if needed)
	docker compose up --build

stop: ## Stop all services
	docker compose down

reset: ## Stop services and destroy volumes (full reset)
	docker compose down -v

logs: ## Tail logs from all services
	docker compose logs -f

## ── Per-service shortcuts ────────────────────────────────

logs-api: ## Tail API logs
	docker compose logs -f api

logs-web: ## Tail frontend logs
	docker compose logs -f web

logs-db: ## Tail database logs
	docker compose logs -f db

shell-api: ## Open a shell in the API container
	docker compose exec api bash

shell-web: ## Open a shell in the frontend container
	docker compose exec web sh

## ── Testing ──────────────────────────────────────────────

test: ## Run API tests
	docker compose exec api mix test

test-web: ## Run frontend lint
	docker compose exec web pnpm lint

## ── Database ─────────────────────────────────────────────

db-migrate: ## Run Ecto migrations
	docker compose exec api mix ecto.migrate

db-rollback: ## Rollback the last Ecto migration
	docker compose exec api mix ecto.rollback

db-reset: ## Drop, create, migrate, and seed the database
	docker compose exec api mix ecto.reset

db-console: ## Open a psql console
	docker compose exec db psql -U postgres -d moulax_dev

## ── Help ─────────────────────────────────────────────────

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'
